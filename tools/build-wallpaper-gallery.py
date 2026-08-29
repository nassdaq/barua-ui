#!/usr/bin/env python3
"""Write docs/wallpapers.html from wallpapers/index.json.

Each wallpaper ships as a finished thing: the picture, its baked blur, the
accent it wants and the scheme it needs — all worked out beforehand. What a
person copies is the whole result, including the preload that starts the
download before the stylesheet asks for it. Nothing is computed in their
browser, because it was all computed here.
"""
import html, json, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
SITE = "https://ui.barua.tz"


def snippet(w: dict) -> str:
    accent = ""
    if w.get("accent"):
        accent = (f"\n    --b-color-accent:       {w['accent']};"
                  f"\n    --b-color-accent-hover: {w['accentHover']};"
                  f"\n    --b-color-accent-text:  {w['accentText']};")
    return f"""&lt;!-- Start the picture downloading before the stylesheet asks for it --&gt;
&lt;link rel="preload" as="image" href="{SITE}/{w['full']}"&gt;

&lt;style&gt;
  :root {{
    --b-wall-image: url("{SITE}/{w['full']}");
    --b-wall-blur:  url("{SITE}/{w['blur']}");{accent}
  }}
&lt;/style&gt;

&lt;!-- baked: the blur is the {w['bytes']['blur']:,}-byte copy, not the GPU --&gt;
&lt;html class="b-has-wallpaper" data-wall-scheme="{w['scheme']}" data-b-glass="baked"&gt;
  &lt;body class="b-wall"&gt; … &lt;/body&gt;
&lt;/html&gt;"""


def card(w: dict, i: int) -> str:
    swatch = (f'<span class="docs-wall__swatch" style="background: {w["accent"]}"></span>'
              f'<code>{w["accent"]}</code>' if w.get("accent")
              else '<span class="b-text-tertiary">no strong hue — keeps the stock accent</span>')
    saving = w["bytes"]["full"] / max(1, w["bytes"]["blur"])
    return f"""
      <section class="docs-section" id="wall-{w['name']}">
        <h2>{html.escape(w['name'].replace('-', ' ').title())}</h2>
        <div class="docs-demo" data-no-code>
          <div class="docs-wall" style="background-image: url('../{w['full']}')">
            <div class="docs-wall__panel">
              <div class="docs-wall__panel-label">Baked glass over this picture</div>
              <p class="b-caption b-text-secondary">Blurred once, at build time.</p>
            </div>
          </div>
        </div>
        <div class="b-hstack b-gap-4 b-stack--wrap docs-wall__meta">
          <span class="docs-wall__fact">{w['width']}&times;{w['height']}</span>
          <span class="docs-wall__fact">{w['bytes']['full'] // 1024} KB picture</span>
          <span class="docs-wall__fact">{w['bytes']['blur']:,} B blur &mdash; {saving:.0f}&times; smaller</span>
          <span class="docs-wall__fact">wants <strong>{w['scheme']}</strong></span>
          <span class="docs-wall__fact">{swatch}</span>
        </div>
        <div class="b-code">
          <div class="b-code__header"><span>Paste this</span>
            <button class="b-code__copy" data-b-copy="#snip-{w['name']}">Copy</button>
          </div>
          <pre><code id="snip-{w['name']}">{snippet(w)}</code></pre>
        </div>
      </section>"""


def main() -> None:
    index = json.loads((ROOT / "wallpapers/index.json").read_text())["wallpapers"]
    skeleton = (ROOT / "docs/react.html").read_text()
    head = skeleton.split('<main class="docs-main" id="main">')[0].replace(
        "<title>React — Barua UI</title>", "<title>Wallpapers — Barua UI</title>")

    intro = f"""    <main class="docs-main" id="main">
      <header class="docs-hero">
        <div class="docs-hero__eyebrow">Foundations</div>
        <h1>Wallpapers</h1>
        <p class="docs-hero__lede">
          Every one of these is finished. The picture is sized, the blur behind
          the glass is already computed, and the accent and colour scheme the
          picture wants have been worked out and written down. Copy the snippet
          and the work is done — none of it happens again in anyone's browser.
        </p>
      </header>

      <section class="docs-section" id="what-is-baked">
        <h2>What was worked out beforehand</h2>
        <p>
          Four things, each with exactly one answer per picture, so computing
          them per visitor is repeating a settled question:
        </p>
        <ul>
          <li><strong>The picture</strong>, capped at 2560px — nobody needs a
              12-megapixel original to decorate with.</li>
          <li><strong>The blur</strong>, as a 64px copy. Drawn back at cover
              size it <em>is</em> the blur, so
              <a href="foundations.html#baked-glass">baked glass</a> needs no
              <code>backdrop-filter</code> at all.</li>
          <li><strong>The accent</strong>, from a vibrancy-weighted hue
              histogram — the same algorithm <code>Barua.adapt</code> runs live,
              ported so the two agree exactly rather than approximately.</li>
          <li><strong>The scheme</strong>, from average luminance: a dark
              picture asks for light ink, and the reverse.</li>
        </ul>
        <p>
          The snippets include a <code>&lt;link rel="preload"&gt;</code>, which
          starts the download before the stylesheet gets round to asking. The
          wall is the first thing anyone sees; it should not wait its turn.
        </p>
      </section>
"""
    cards = "".join(card(w, i) for i, w in enumerate(index))
    tail = "    </main>\n  </div>\n</body>\n</html>\n"
    (ROOT / "docs/wallpapers.html").write_text(head + intro + cards + tail)
    print(f"docs/wallpapers.html: {len(index)} wallpaper(s)")


if __name__ == "__main__":
    main()
