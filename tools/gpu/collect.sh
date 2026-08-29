#!/usr/bin/env bash
#
# Bring generated pictures home, bake them, publish the gallery.
#
# The generation happens on a rented card reached from the barua server, since
# that machine is the one with a route to the Linode API. This is the last leg:
# pictures back to the working copy, through the baker, into the gallery.
#
set -euo pipefail
HOST="${HOST:-root@172.233.46.254}"
REMOTE="${REMOTE:-/opt/wallgen/out}"
LOCAL="${LOCAL:-tools/gpu/out}"

mkdir -p "$LOCAL"
echo "→ collecting from $HOST:$REMOTE"
scp -q "$HOST:$REMOTE/*.png" "$LOCAL/" 2>/dev/null || { echo "nothing there yet"; exit 1; }
ls -la "$LOCAL"/*.png | awk '{print "   ", $NF, $5"B"}'

echo "→ baking"
python3 tools/bake-wallpaper.py "$LOCAL"/*.png --credit "Generated for Barua UI"

echo "→ rebuilding the gallery"
python3 tools/build-wallpaper-gallery.py
python3 tools/build-ai-index.py >/dev/null

echo "→ done. Deploy with the usual rsync, then check:"
echo "   https://ui.barua.tz/docs/wallpapers.html"
