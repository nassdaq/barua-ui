#!/usr/bin/env bash
#
# Solve the driver once and keep the answer.
#
# ubuntu-drivers picks the "no-dkms" packages, which ship modules prebuilt for
# one kernel ABI and none for the one actually running. No reboot can load a
# module nobody compiled — and the utilities are not installed either, so even
# nvidia-smi is missing. The DKMS path builds against the running kernel, which
# is the whole point.
#
# Doing that on every run is ten minutes of apt each time. So do it once, take
# an image of the result, and boot from that afterwards: about a minute, with a
# card that already works. This is what the photo fleet's PHOTO_IMAGE setting is
# waiting for.
#
#   LINODE_TOKEN=... tools/gpu/build-image.sh
#
set -uo pipefail
: "${LINODE_TOKEN:?set LINODE_TOKEN}"

LABEL="barua-gpu-$(date +%Y%m%d)"
REGION="${REGION:-jp-osa}"
PLAN="${PLAN:-g2-gpu-rtx4000a1-s}"

api() { curl -sS --max-time 60 -H "Authorization: Bearer $LINODE_TOKEN" -H "Content-Type: application/json" "$@"; }
jq_() { python3 -c "import json,sys; d=json.load(sys.stdin); print($1)"; }


# Keepalives, because a pip download is minutes of near-silence and something
# between here and Japan will happily drop an idle connection.
SSHOPTS="-o StrictHostKeyChecking=no -o ServerAliveInterval=15 -o ServerAliveCountMax=20 -o ConnectTimeout=10"

wait_ssh() {
  for _ in $(seq 1 60); do
    ssh $SSHOPTS "root@$1" true 2>/dev/null && return 0
    sleep 5
  done
  return 1
}

# Long work does not hold a session open. The script is left running on the node
# and we ask, periodically, whether it finished — so a dropped connection costs
# a retry rather than the whole step. This is the difference between a step that
# fails at ten minutes and one that simply carries on.
run_detached() {
  local ip="$1" name="$2" minutes="$3"
  scp $SSHOPTS -q /tmp/$name.sh "root@$ip:/root/$name.sh" || return 1
  ssh $SSHOPTS "root@$ip" "chmod +x /root/$name.sh; rm -f /root/$name.done; nohup sh -c '/root/$name.sh > /root/$name.log 2>&1; echo \$? > /root/$name.done' >/dev/null 2>&1 &" || return 1
  for _ in $(seq 1 $((minutes * 6))); do
    sleep 10
    code=$(ssh $SSHOPTS "root@$ip" "cat /root/$name.done 2>/dev/null" 2>/dev/null || true)
    if [ -n "$code" ]; then
      ssh $SSHOPTS "root@$ip" "tail -6 /root/$name.log" 2>/dev/null || true
      return "$code"
    fi
  done
  echo "!! $name did not finish within $minutes minutes"
  return 1
}

ID=""
KEEP=0
cleanup() {
  if [ -n "$ID" ] && [ "$KEEP" = 0 ]; then
    echo "→ destroying $ID"
    api -X DELETE "https://api.linode.com/v4/linode/instances/$ID" >/dev/null ||
      echo "!! COULD NOT DESTROY $ID — delete it by hand, it is billing"
  fi
}
trap cleanup EXIT INT TERM

PASS="$(head -c 18 /dev/urandom | base64 | tr -d '/+=')Aa1!"
KEY="$(cat ~/.ssh/id_ed25519.pub)"

echo "→ creating $PLAN in $REGION"
ID=$(api -X POST https://api.linode.com/v4/linode/instances -d "{\"label\":\"$LABEL-build\",\"type\":\"$PLAN\",\"region\":\"$REGION\",\"image\":\"linode/ubuntu24.04\",\"root_pass\":\"$PASS\",\"authorized_keys\":[\"$KEY\"],\"tags\":[\"barua-wallpaper\"],\"booted\":true}" | jq_ 'd.get("id","")')
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

echo "→ building the driver against this kernel (not a prebuilt one)"
ssh $SSHOPTS "root@$IP" 'bash -s' <<'REMOTE'
set -e
export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
# dkms and the headers are the part ubuntu-drivers skipped. Without them the
# module is never compiled, and the failure is silent until nvidia-smi is missing.
apt-get install -y -qq dkms build-essential "linux-headers-$(uname -r)" pkg-config libglvnd-dev
installed=""
for v in 580-server 570-server 550-server 535-server; do
  if apt-get install -y -qq "nvidia-driver-$v" "nvidia-utils-$v" 2>/dev/null; then
    installed="$v"; break
  fi
done
[ -n "$installed" ] || { echo "no nvidia driver package would install"; exit 1; }
echo "installed nvidia-driver-$installed"
modprobe nvidia
nvidia-smi --query-gpu=name,memory.total,driver_version --format=csv,noheader
REMOTE
driver_status=$?
if [ $driver_status -ne 0 ]; then
  echo "!! driver step failed (exit $driver_status) — see the output above; not imaging"
  exit 1
fi

echo "→ waiting for the host after the driver install"
wait_ssh "$IP" || { echo "!! host never came back after the driver install"; exit 1; }

echo "→ torch and diffusers (detached; a dropped connection no longer kills it)"
cat > /tmp/torchsetup.sh <<'REMOTE'
#!/bin/bash
set -e
export DEBIAN_FRONTEND=noninteractive
apt-get install -y -qq python3-venv python3-pip libgl1 libglib2.0-0
python3 -m venv /opt/gen
/opt/gen/bin/pip install -q --upgrade pip
/opt/gen/bin/pip install -q torch torchvision --index-url https://download.pytorch.org/whl/cu124
/opt/gen/bin/pip install -q diffusers transformers accelerate safetensors
/opt/gen/bin/python -c "import torch; assert torch.cuda.is_available(), 'torch cannot see the card'; print('torch', torch.__version__, '| cuda visible: True |', torch.cuda.get_device_name(0))"
REMOTE
if ! run_detached "$IP" torchsetup 25; then
  echo "!! torch setup failed — see /root/torchsetup.log on the node (now destroyed)"
  exit 1
fi

echo "→ shutting down to take the image"
api -X POST "https://api.linode.com/v4/linode/instances/$ID/shutdown" >/dev/null
for _ in $(seq 1 60); do
  [ "$(api "https://api.linode.com/v4/linode/instances/$ID" | jq_ 'd["status"]')" = offline ] && break
  sleep 5
done

DISK=$(api "https://api.linode.com/v4/linode/instances/$ID/disks" | jq_ '[x["id"] for x in d["data"] if x["filesystem"]!="swap"][0]')
echo "→ imaging disk $DISK"
IMAGE=$(api -X POST https://api.linode.com/v4/images -d "{\"disk_id\":$DISK,\"label\":\"$LABEL\",\"description\":\"NVIDIA driver built with dkms, torch cu124, diffusers. Boot GPU nodes from this instead of installing.\"}" | jq_ 'd.get("id","")')
[ -n "$IMAGE" ] || { echo "!! image creation failed"; exit 1; }

for _ in $(seq 1 120); do
  ST=$(api "https://api.linode.com/v4/images/$IMAGE" | jq_ 'd["status"]')
  [ "$ST" = available ] && break
  sleep 10
done

echo
echo "=================================================="
echo "  image: $IMAGE   ($ST)"
echo "  use it:  IMAGE=$IMAGE tools/gpu/on-linode.sh --set ambient"
echo "=================================================="
