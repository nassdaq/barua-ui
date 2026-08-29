# Generating wallpapers on a GPU

Two ways in, one script. `generate.py` picks CUDA if it can see it, then Apple's
GPU through MPS, then complains honestly rather than spending an hour on a CPU.

## On this Mac

```sh
python3 -m venv .venv && . .venv/bin/activate
pip install torch diffusers transformers accelerate safetensors
python3 tools/gpu/generate.py --set ambient --count 2
```

An M4 with 16 GB will produce SDXL frames at roughly a minute each, and a
fanless Air will slow down as it warms up. That is fine for what this path is
for: trying prompts, judging a look, throwing most of them away. It is the
wrong tool for producing a finished pack.

## On a rented GPU

```sh
LINODE_TOKEN=... tools/gpu/on-linode.sh --set ambient
```

Creates `g2-gpu-rtx4000a1-s` — RTX 4000 Ada, $0.52/hour at the time of writing —
installs the driver and torch, generates, copies the pictures back, and destroys
the machine. The destroy runs from a trap on `EXIT INT TERM`, so it happens
whether the run finishes, fails, or you press ctrl-c. If it ever cannot destroy
the node it says so loudly, because a forgotten GPU bills all night.

Everything it creates is tagged `barua-wallpaper`, so this answers "what am I
paying for right now" without touching anything else in the account:

```sh
curl -H "Authorization: Bearer $LINODE_TOKEN" \
  -H 'X-Filter: {"tags":"barua-wallpaper"}' \
  https://api.linode.com/v4/linode/instances
```

Use the header. A `?tag=` query string is accepted and silently ignored — it
returns the entire account, so it either looks alarming or looks fine, and
means neither.

The bootstrap is copied from the photo fleet in `nasiemails`, reboot and all —
the NVIDIA module is built for the kernel `apt` just installed, not the one
running. That project has already paid for those lessons.

## Then bake

Generation is the expensive half; baking is what makes the result shippable.

```sh
python3 tools/bake-wallpaper.py tools/gpu/out/*.png --credit "Generated"
python3 tools/build-wallpaper-gallery.py
```

Each picture comes out sized, with its 2 KB blur, its accent and its scheme —
and appears in the gallery with a snippet somebody can paste.

## What is worth generating

Anything with one fixed answer that a browser would otherwise recompute forever:

- **Wallpapers** — the wall itself, and the baked blur behind every glass panel.
- **Mesh gradients** — genuinely WebGL at runtime, free once they are an image.
- **Displacement and normal maps** for liquid refraction, baked at a quality the
  runtime SVG approximation cannot reach.
- **Tileable grain** for frosted materials.

The test for adding to this list is always the same: does it have one answer? If
it does, computing it on every visitor's device is repeating a settled question.
