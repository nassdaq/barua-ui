#!/usr/bin/env python3
"""Bake a wallpaper into everything a page needs to show it instantly.

The expensive parts of hanging a wallpaper — resizing it, blurring it, working
out which accent and which colour scheme it wants — all have exactly one answer
per picture. Computing them in every visitor's browser, every load, is work
nobody needs to repeat. This does it once and writes the answers down.

Out of one image:
  full.jpg   the picture, capped at 2560px
  blur.jpg   a 64px copy: drawn at cover size it IS the blur, at ~2 KB
  meta       accent, hover and text colours, the scheme, the average luminance

The accent is the same algorithm Barua.adapt runs in the browser, ported here
so the baked answer and the live one agree. If they disagreed, the baked value
would be a lie the moment anyone re-derived it.

Standard library plus sips, which ships with macOS. No imaging dependency.
"""
import argparse, colorsys, json, pathlib, struct, subprocess, sys, zlib

ROOT = pathlib.Path(__file__).resolve().parent.parent


def sips(*args) -> None:
    result = subprocess.run(["sips", *args], capture_output=True)
    if result.returncode:
        raise SystemExit(f"sips failed: {result.stderr.decode().strip()}")


def read_png(path: pathlib.Path):
    """Decode a PNG to (width, height, [(r,g,b), ...])."""
    data = path.read_bytes()
    pos, width, height, colour, idat = 8, 0, 0, 0, b""
    while pos < len(data):
        length = struct.unpack(">I", data[pos:pos + 4])[0]
        kind = data[pos + 4:pos + 8]
        body = data[pos + 8:pos + 8 + length]
        if kind == b"IHDR":
            width, height, _bits, colour = struct.unpack(">IIBB", body[:10])
        elif kind == b"IDAT":
            idat += body
        pos += 12 + length
    raw = zlib.decompress(idat)
    channels = {0: 1, 2: 3, 4: 2, 6: 4}[colour]
    stride = width * channels
    rows, prev, i = [], bytearray(stride), 0
    for _ in range(height):
        filt = raw[i]; i += 1
        line = bytearray(raw[i:i + stride]); i += stride
        for x in range(stride):
            a = line[x - channels] if x >= channels else 0
            b = prev[x]
            c = prev[x - channels] if x >= channels else 0
            if filt == 1: line[x] = (line[x] + a) & 255
            elif filt == 2: line[x] = (line[x] + b) & 255
            elif filt == 3: line[x] = (line[x] + (a + b) // 2) & 255
            elif filt == 4:
                p = a + b - c
                pa, pb, pc = abs(p - a), abs(p - b), abs(p - c)
                line[x] = (line[x] + (a if pa <= pb and pa <= pc else b if pb <= pc else c)) & 255
        rows.append(bytes(line)); prev = line
    pixels = [
        (rows[y][x * channels], rows[y][x * channels + 1], rows[y][x * channels + 2])
        for y in range(height) for x in range(width)
    ]
    return width, height, pixels


def analyse(pixels):
    """The accent a picture wants, and the scheme it needs.

    A port of Barua.adapt: brightness picks the scheme, then a vibrancy-weighted
    hue histogram picks the accent. Grey pictures keep the stock accent — they
    have no opinion, and inventing one for them produces mud.
    """
    luminance = sum(
        (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255 for r, g, b in pixels
    ) / max(1, len(pixels))
    scheme = "dark" if luminance < 0.45 else "light"

    buckets = 24
    weights = [0.0] * buckets
    sums = [[0.0, 0.0, 0.0, 0.0] for _ in range(buckets)]
    for r, g, b in pixels:
        h, l, s = colorsys.rgb_to_hls(r / 255, g / 255, b / 255)
        if s < 0.18 or l < 0.12 or l > 0.92:
            continue
        w = s * (1 - abs(l - 0.5) * 1.3)
        if w <= 0:
            continue
        index = int(h * buckets) % buckets
        weights[index] += w
        sums[index][0] += h * w
        sums[index][1] += s * w
        sums[index][2] += l * w
        sums[index][3] += w
    best = weights.index(max(weights))
    if weights[best] <= 0:
        return {"accent": None, "scheme": scheme, "luminance": round(luminance, 3)}

    hs, ss, ls, total = sums[best]
    h = hs / total
    s = min(0.9, max(0.45, ss / total * 1.15))
    base = min(0.58, max(0.44, ls / total))

    def hexof(hue, sat, light):
        r, g, b = colorsys.hls_to_rgb(hue, light, sat)
        return "#%02x%02x%02x" % (round(r * 255), round(g * 255), round(b * 255))

    return {
        "accent": hexof(h, s, base),
        "accentHover": hexof(h, s, max(0.3, base - 0.09)),
        "accentText": hexof(h, min(0.95, s * 1.05), min(0.46, base)),
        "scheme": scheme,
        "luminance": round(luminance, 3),
    }


def bake(source: pathlib.Path, name: str, out_dir: pathlib.Path, credit: str = "",
         max_edge: int = 2560, blur_edge: int = 64) -> dict:
    folder = out_dir / name
    folder.mkdir(parents=True, exist_ok=True)
    full = folder / "full.jpg"
    blur = folder / "blur.jpg"
    probe = folder / ".probe.png"

    sips("-Z", str(max_edge), "-s", "format", "jpeg", "-s", "formatOptions", "82",
         str(source), "--out", str(full))
    # Re-encoding can cost more than it saves: a picture already smaller than the
    # cap comes back bigger at quality 82 than it went in. Shipping that would
    # make "already built for you" mean "already made worse for you".
    if full.stat().st_size >= source.stat().st_size and source.suffix.lower() in (".jpg", ".jpeg"):
        full.write_bytes(source.read_bytes())
    sips("-Z", str(blur_edge), "-s", "format", "jpeg", "-s", "formatOptions", "70",
         str(source), "--out", str(blur))
    sips("-Z", "48", "-s", "format", "png", str(source), "--out", str(probe))

    _w, _h, pixels = read_png(probe)
    meta = analyse(pixels)
    probe.unlink()

    dims = subprocess.run(["sips", "-g", "pixelWidth", "-g", "pixelHeight", str(full)],
                          capture_output=True, text=True).stdout
    width = int([l for l in dims.splitlines() if "pixelWidth" in l][0].split(":")[1])
    height = int([l for l in dims.splitlines() if "pixelHeight" in l][0].split(":")[1])

    return {
        "name": name,
        "credit": credit,
        "full": f"wallpapers/{name}/full.jpg",
        "blur": f"wallpapers/{name}/blur.jpg",
        "width": width,
        "height": height,
        "bytes": {"full": full.stat().st_size, "blur": blur.stat().st_size},
        **meta,
    }


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("images", nargs="+", type=pathlib.Path)
    parser.add_argument("--out", type=pathlib.Path, default=ROOT / "wallpapers")
    parser.add_argument("--credit", default="")
    args = parser.parse_args()

    index_path = args.out / "index.json"
    index = json.loads(index_path.read_text())["wallpapers"] if index_path.exists() else []
    known = {w["name"]: i for i, w in enumerate(index)}

    for image in args.images:
        if not image.exists():
            print(f"skipped, not found: {image}", file=sys.stderr)
            continue
        name = image.stem.lower().replace(" ", "-")
        entry = bake(image, name, args.out, args.credit)
        if name in known:
            index[known[name]] = entry
        else:
            index.append(entry)
        saving = entry["bytes"]["full"] / max(1, entry["bytes"]["blur"])
        print(f"{name:12} {entry['width']}x{entry['height']}  "
              f"accent {entry['accent'] or 'none (grey)'}  {entry['scheme']:5}  "
              f"blur {entry['bytes']['blur']}B ({saving:.0f}x smaller)")

    args.out.mkdir(parents=True, exist_ok=True)
    index_path.write_text(json.dumps({"wallpapers": index}, indent=2) + "\n")
    # A tidy relative path when the output is inside the project, the real one
    # when it is not. Printing a path should never be the thing that fails.
    try:
        shown = index_path.relative_to(ROOT)
    except ValueError:
        shown = index_path
    print(f"\n{shown}: {len(index)} wallpaper(s)")


if __name__ == "__main__":
    main()
