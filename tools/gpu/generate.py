#!/usr/bin/env python3
"""Generate wallpapers, on whatever GPU is in front of it.

The same script runs on an Apple GPU through MPS and on an NVIDIA card through
CUDA, because the only difference that matters is which device torch is told to
use. Iterate on a laptop, produce the pack on a rented card, and the pictures
come out of the same code either way.

What comes out is raw material. tools/bake-wallpaper.py turns each picture into
the thing people actually copy: sized, blurred, with its accent and scheme
worked out.

    python3 tools/gpu/generate.py --set ambient --count 8
    python3 tools/gpu/generate.py --prompt "..." --out /tmp/wall
"""
import argparse, json, pathlib, sys, time

ROOT = pathlib.Path(__file__).resolve().parent.parent.parent
PROMPTS = pathlib.Path(__file__).resolve().parent / "prompts.json"


def pick_device():
    """CUDA if it is there, then Apple, then give up honestly rather than
    spending an hour on a CPU pretending it is fine."""
    import torch
    if torch.cuda.is_available():
        name = torch.cuda.get_device_name(0)
        return "cuda", torch.float16, f"CUDA · {name}"
    if getattr(torch.backends, "mps", None) and torch.backends.mps.is_available():
        return "mps", torch.float16, "Apple GPU · Metal"
    return "cpu", torch.float32, "CPU — this will be slow enough to regret"


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--set", dest="preset", help="a named set from prompts.json")
    parser.add_argument("--prompt", help="a single prompt instead of a set")
    parser.add_argument("--count", type=int, default=0, help="how many from the set (default: all)")
    parser.add_argument("--out", type=pathlib.Path, default=ROOT / "tools/gpu/out")
    parser.add_argument("--model", default="stabilityai/stable-diffusion-xl-base-1.0")
    parser.add_argument("--steps", type=int, default=30)
    parser.add_argument("--width", type=int, default=1536)
    parser.add_argument("--height", type=int, default=1024)
    parser.add_argument("--seed", type=int, default=0)
    parser.add_argument("--dry-run", action="store_true", help="show the plan, load nothing")
    parser.add_argument("--require-gpu", action="store_true",
                        help="stop rather than fall back to the CPU (always set on a rented card)")
    args = parser.parse_args()

    if args.prompt:
        jobs = [{"name": "custom", "prompt": args.prompt}]
    else:
        book = json.loads(PROMPTS.read_text())
        preset = args.preset or book["default"]
        if preset not in book["sets"]:
            raise SystemExit(f"no set called {preset!r}. Have: {', '.join(book['sets'])}")
        jobs = book["sets"][preset]["prompts"]
        if args.count:
            jobs = jobs[: args.count]

    args.out.mkdir(parents=True, exist_ok=True)
    print(f"{len(jobs)} picture(s) → {args.out}")

    if args.dry_run:
        for job in jobs:
            print(f"  {job['name']:<18} {job['prompt'][:70]}…")
        return

    import torch
    from diffusers import StableDiffusionXLPipeline

    device, dtype, label = pick_device()
    print(f"device: {label}", flush=True)
    if args.require_gpu and device == "cpu":
        raise SystemExit(
            "refusing to run on the CPU.\n"
            "This machine was rented for a GPU and torch cannot see one — usually the\n"
            "driver is installed but not loaded, which needs a reboot. Fix that rather\n"
            "than waiting: SDXL on these cores is hours per picture, billed by the hour."
        )

    pipe = StableDiffusionXLPipeline.from_pretrained(
        args.model, torch_dtype=dtype, use_safetensors=True, variant="fp16" if dtype == torch.float16 else None
    ).to(device)
    pipe.set_progress_bar_config(disable=True)

    negative = ("text, watermark, logo, signature, people, faces, ui, interface, "
                "harsh contrast, oversaturated, cluttered, busy detail")

    for i, job in enumerate(jobs, 1):
        started = time.time()
        generator = torch.Generator(device="cpu").manual_seed(args.seed + i)
        image = pipe(
            prompt=job["prompt"],
            negative_prompt=job.get("negative", negative),
            num_inference_steps=args.steps,
            width=args.width,
            height=args.height,
            generator=generator,
        ).images[0]
        path = args.out / f"{job['name']}.png"
        image.save(path)
        print(f"  [{i}/{len(jobs)}] {job['name']:<18} {time.time() - started:5.1f}s  {path.name}")

    print("\nNow bake them:")
    print(f"  python3 tools/bake-wallpaper.py {args.out}/*.png")


if __name__ == "__main__":
    main()
