#!/usr/bin/env bash
#
# Rent a GPU, generate the pack, bring the pictures home, hand the machine back.
#
#   LINODE_TOKEN=... tools/gpu/on-linode.sh --set ambient --count 6
#
# Two things here were learned the expensive way.
#
# The driver is installed with dkms, not `ubuntu-drivers install --gpgpu`. That
# command picks no-dkms packages, compiles nothing for the running kernel, skips
# the utilities, and exits 0 — so the first sign of trouble is generation
# quietly running on the CPU at an hour per picture.
#
# And long steps run detached, with the node owning the work and this script
# asking whether it finished. Holding an ssh session open across a multi-gigabyte
# download is how three runs died at exit 255.
#
# To see what this has left behind, filter with the header. A ?tag= query string
# is accepted and silently ignored, returning the whole account:
#
#   curl -H "Authorization: Bearer $LINODE_TOKEN" \
#        -H 'X-Filter: {"tags":"barua-wallpaper"}' \
#        https://api.linode.com/v4/linode/instances
#
set -uo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PLAN="${PLAN:-g2-gpu-rtx4000a1-s}"
REGION="${REGION:-jp-osa}"
OUT="${OUT:-$HERE/out}"
ARGS="${*:---set ambient --count 6}"
SSHOPTS="-o StrictHostKeyChecking=no -o ServerAliveInterval=15 -o ServerAliveCountMax=20 -o ConnectTimeout=10"

: "${LINODE_TOKEN:?set LINODE_TOKEN}"
for f in "$HERE/generate.py" "$HERE/prompts.json"; do
  [ -f "$f" ] || { echo "missing: $f"; exit 1; }
done
[ -f ~/.ssh/id_ed25519.pub ] || { echo "no ssh key — the node would be unreachable"; exit 1; }

api() { curl -sS --max-time 60 -H "Authorization: Bearer $LINODE_TOKEN" -H "Content-Type: application/json" "$@"; }
jq_() { python3 -c "import json,sys; d=json.load(sys.stdin); print($1)"; }

ID=""
cleanup() {
  if [ -n "$ID" ]; then
    echo "→ destroying $ID"
    api -X DELETE "https://api.linode.com/v4/linode/instances/$ID" >/dev/null ||
      echo "!! COULD NOT DESTROY $ID — delete it by hand, it is billing"
  fi
}
trap cleanup EXIT INT TERM

wait_ssh() {
  for _ in $(seq 1 60); do
    ssh $SSHOPTS "root@$1" true 2>/dev/null && return 0
    sleep 5
  done
  return 1
}

# Leave the work running on the node and ask about it, so a dropped link costs
# a retry instead of the step.
run_detached() {
  local ip="$1" name="$2" minutes="$3"
  scp $SSHOPTS -q "/tmp/$name.sh" "root@$ip:/root/$name.sh" || return 1
  ssh $SSHOPTS "root@$ip" "chmod +x /root/$name.sh; rm -f /root/$name.done; nohup sh -c '/root/$name.sh > /root/$name.log 2>&1; echo \$? > /root/$name.done' >/dev/null 2>&1 &" || return 1
  for _ in $(seq 1 $((minutes * 6))); do
    sleep 10
    local code
    code=$(ssh $SSHOPTS "root@$ip" "cat /root/$name.done 2>/dev/null" 2>/dev/null || true)
    if [ -n "$code" ]; then
      ssh $SSHOPTS "root@$ip" "tail -8 /root/$name.log" 2>/dev/null || true
      return "$code"
    fi
  done
  echo "!! $name did not finish within $minutes minutes"
  return 1
}

PASS="$(head -c 18 /dev/urandom | base64 | tr -d '/+=')Aa1!"
KEY="$(cat ~/.ssh/id_ed25519.pub)"

echo "→ creating $PLAN in $REGION"
ID=$(api -X POST https://api.linode.com/v4/linode/instances -d "{\"label\":\"barua-wallpaper-$(date +%s)\",\"type\":\"$PLAN\",\"region\":\"$REGION\",\"image\":\"linode/ubuntu24.04\",\"root_pass\":\"$PASS\",\"authorized_keys\":[\"$KEY\"],\"tags\":[\"barua-wallpaper\"],\"booted\":true}" | jq_ 'd.get("id","")')
[ -n "$ID" ] || { echo "create failed"; exit 1; }

IP=""
for _ in $(seq 1 60); do
  S=$(api "https://api.linode.com/v4/linode/instances/$ID")
  [ "$(echo "$S" | jq_ 'd["status"]')" = running ] && { IP=$(echo "$S" | jq_ 'd["ipv4"][0]'); break; }
  sleep 5
done
[ -n "$IP" ] || { echo "never came up"; exit 1; }
echo "→ $ID at $IP"
wait_ssh "$IP" || { echo "never accepted ssh"; exit 1; }

cat > /tmp/setup.sh <<'REMOTE'
#!/bin/bash
set -e
export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
# dkms + headers are the part ubuntu-drivers skips; without them nothing is
# compiled for this kernel and nvidia-smi is never installed at all.
apt-get install -y -qq dkms build-essential "linux-headers-$(uname -r)" pkg-config libglvnd-dev
for v in 580-server 570-server 550-server 535-server; do
  if apt-get install -y -qq "nvidia-driver-$v" "nvidia-utils-$v" 2>/dev/null; then break; fi
done
modprobe nvidia
nvidia-smi --query-gpu=name,memory.total,driver_version --format=csv,noheader
apt-get install -y -qq python3-venv python3-pip libgl1 libglib2.0-0
python3 -m venv /opt/gen
/opt/gen/bin/pip install -q --upgrade pip
/opt/gen/bin/pip install -q torch torchvision --index-url https://download.pytorch.org/whl/cu124
/opt/gen/bin/pip install -q diffusers transformers accelerate safetensors
/opt/gen/bin/python -c "import torch; assert torch.cuda.is_available(); print('cuda visible:', torch.cuda.get_device_name(0))"
REMOTE
echo "→ driver and torch (detached, up to 30 min)"
run_detached "$IP" setup 30 || { echo "!! setup failed — see the tail above"; exit 1; }

echo "→ generating"
scp $SSHOPTS -q "$HERE/generate.py" "$HERE/prompts.json" "root@$IP:/opt/gen/"
cat > /tmp/gen.sh <<REMOTE
#!/bin/bash
set -e
cd /opt/gen
./bin/python generate.py $ARGS --require-gpu --out /opt/gen/out
ls -la /opt/gen/out
REMOTE
run_detached "$IP" gen 40 || { echo "!! generation failed — see the tail above"; exit 1; }

# Collect with tar over a single stream, not scp with a remote glob. OpenSSH 9
# moved scp onto SFTP, which does not expand wildcards on the far side — the
# first run generated six pictures and then dropped every one of them here,
# reporting success, because the failure was quiet and unchecked.
echo "→ collecting"
mkdir -p "$OUT"
collected=0
for attempt in 1 2 3; do
  if ssh $SSHOPTS "root@$IP" "cd /opt/gen/out && tar cf - ." 2>/dev/null | tar xf - -C "$OUT" 2>/dev/null; then
    collected=$(find "$OUT" -name '*.png' -type f | wc -l | tr -d ' ')
    [ "$collected" -gt 0 ] && break
  fi
  echo "   attempt $attempt brought nothing back; retrying"
  sleep 5
done

if [ "$collected" -eq 0 ]; then
  echo "!! COLLECTED NOTHING — the pictures exist on $IP:/opt/gen/out and this"
  echo "   script is about to destroy that machine. Copy them now if you want them:"
  echo "   ssh root@$IP 'cd /opt/gen/out && tar cf - .' | tar xf - -C ."
  exit 1
fi

echo "→ collected $collected picture(s)"
find "$OUT" -name '*.png' -type f -exec ls -la {} \; | awk '{printf "   %-44s %d KB\n", $NF, $5/1024}'
echo "→ done"
