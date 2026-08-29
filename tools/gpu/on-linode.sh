#!/usr/bin/env bash
#
# Rent a GPU, generate the pack, bring the pictures home, hand the machine back.
#
# The same shape the photo fleet in nasiemails already runs on: a node exists
# only while there is work for it. The difference here is that this is a one-off
# batch rather than a queue, so the lifetime is this script's lifetime — and the
# trap is the important line in the file. A forgotten GPU node bills all night.
#
#   LINODE_TOKEN=... tools/gpu/on-linode.sh --set ambient
#
set -euo pipefail

PLAN="${PLAN:-g2-gpu-rtx4000a1-s}"      # RTX 4000 Ada, $0.52/hr at the time of writing
REGION="${REGION:-jp-osa}"              # where the photo fleet already runs
IMAGE="${IMAGE:-linode/ubuntu24.04}"
LABEL="barua-wallpaper-$(date +%s)"
TAG="barua-wallpaper"
OUT="${OUT:-tools/gpu/out}"
ARGS="${*:---set ambient}"

: "${LINODE_TOKEN:?set LINODE_TOKEN (the same token the mail app uses)}"

api() {
  curl -sS --max-time 30 \
    -H "Authorization: Bearer $LINODE_TOKEN" \
    -H "Content-Type: application/json" "$@"
}

ID=""
cleanup() {
  if [ -n "$ID" ]; then
    echo "→ destroying $ID"
    api -X DELETE "https://api.linode.com/v4/linode/instances/$ID" >/dev/null || \
      echo "!! COULD NOT DESTROY $ID — go and delete it by hand, it is billing"
  fi
}
# Any exit at all: finished, failed, or the operator pressing ctrl-c.
trap cleanup EXIT INT TERM

PASS="$(head -c 18 /dev/urandom | base64 | tr -d '/+=' )Aa1!"
KEY="$(cat ~/.ssh/id_ed25519.pub 2>/dev/null || cat ~/.ssh/id_rsa.pub)"

echo "→ creating $PLAN in $REGION"
CREATED="$(api -X POST "https://api.linode.com/v4/linode/instances" -d @- <<JSON
{
  "label": "$LABEL",
  "type": "$PLAN",
  "region": "$REGION",
  "image": "$IMAGE",
  "root_pass": "$PASS",
  "authorized_keys": ["$KEY"],
  "tags": ["$TAG"],
  "booted": true
}
JSON
)"
ID="$(echo "$CREATED" | python3 -c 'import json,sys; print(json.load(sys.stdin).get("id",""))')"
[ -n "$ID" ] || { echo "$CREATED"; exit 1; }

IP=""
for _ in $(seq 1 60); do
  STATE="$(api "https://api.linode.com/v4/linode/instances/$ID")"
  if [ "$(echo "$STATE" | python3 -c 'import json,sys; print(json.load(sys.stdin)["status"])')" = "running" ]; then
    IP="$(echo "$STATE" | python3 -c 'import json,sys; print(json.load(sys.stdin)["ipv4"][0])')"
    break
  fi
  sleep 5
done
[ -n "$IP" ] || { echo "never came up"; exit 1; }
echo "→ $ID is up at $IP"

for _ in $(seq 1 60); do
  ssh -o StrictHostKeyChecking=no -o ConnectTimeout=5 "root@$IP" true 2>/dev/null && break
  sleep 5
done

# The driver install is lifted from the photo node, including the reboot: the
# NVIDIA module is built for the kernel apt just installed, not the running one.
echo "→ installing driver and torch (a few minutes)"
ssh -o StrictHostKeyChecking=no "root@$IP" 'bash -s' <<'REMOTE'
set -e
export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
apt-get install -y -qq ubuntu-drivers-common python3-venv python3-pip libgl1 libglib2.0-0
ubuntu-drivers install --gpgpu >/dev/null 2>&1 || true
modprobe nvidia 2>/dev/null || true
python3 -m venv /opt/gen
/opt/gen/bin/pip install -q --upgrade pip
/opt/gen/bin/pip install -q torch --index-url https://download.pytorch.org/whl/cu124
/opt/gen/bin/pip install -q diffusers transformers accelerate safetensors
nvidia-smi || echo "no nvidia-smi yet — the generator will say what it found"
REMOTE

echo "→ generating"
scp -o StrictHostKeyChecking=no -q tools/gpu/generate.py tools/gpu/prompts.json "root@$IP:/opt/gen/"
ssh -o StrictHostKeyChecking=no "root@$IP" \
  "cd /opt/gen && ./bin/python generate.py $ARGS --out /opt/gen/out"

echo "→ collecting"
mkdir -p "$OUT"
scp -o StrictHostKeyChecking=no -q "root@$IP:/opt/gen/out/*.png" "$OUT/" || echo "nothing came back"

echo "→ done. Bake them:"
echo "   python3 tools/bake-wallpaper.py $OUT/*.png --credit 'Generated'"
