# Barua UI

An interface design system with Apple's design language, rebuilt natively for
the web. Plain HTML and CSS you can read — one stylesheet, no build step, and a
small vanilla JavaScript file for the parts that genuinely need it.

**Documentation and live demos → [ui.barua.tz](https://ui.barua.tz)**

## Quick start

```html
<link rel="stylesheet" href="css/barua.css">
<script defer src="js/barua.js"></script>

<button class="b-btn b-btn--primary">Habari, Barua!</button>
```

That is the whole installation. The script is optional sugar — toasts, tabs,
⌘K, the adaptive accent — everything else is CSS on semantic HTML.

## What's inside

- **200+ documented components**, from buttons and forms through to command
  palettes, file browsers, calendars and control-centre panels.
- **Real materials**, not flat cards: five levels of glass with specular edges,
  plus a Liquid Glass mode that re-skins the whole system
  (`<html data-glass="liquid">`).
- **Adaptive accent** — `Barua.adapt(image)` learns the accent colour from a
  picture and whether the interface should be light or dark.
- **A neutral card material** that stays readable over any background, photo or
  artwork.
- **Light and dark** through `light-dark()` and `data-theme`, with the whole
  palette re-tintable from one `data-accent` attribute.
- **Eight complete example screens** in [`examples/`](examples): a dashboard, an
  ambient widget wall, settings, checkout, sign-in, analytics, an inbox and a
  music player.

## The opinion

On desktop, surfaces don't scroll. A screen ends at the screen — chrome stays
put, and only the panes that should move, move. `.b-stage` and `.b-scroll-area`
exist to make that easy, and every example is built that way.

## For AI agents

Barua UI is published in machine-readable form, so an agent can build with it
without guessing class names:

| What | Where |
| --- | --- |
| Short map, read first | [llms.txt](https://ui.barua.tz/llms.txt) |
| Whole system as markdown | [llms-full.txt](https://ui.barua.tz/llms-full.txt) |
| Complete index as JSON | [barua-ui.json](https://ui.barua.tz/barua-ui.json) |

Every entry carries the component's classes and **the canonical markup taken
from its own live demo**, so the index cannot describe something the system
does not have, and cannot drift when a component changes.

Two commands keep generated work honest:

```bash
python3 tools/build-ai-index.py        # regenerate the index from the docs
python3 tools/barua-lint.py <path>     # check markup against the system
```

The linter reads the stylesheets for the real inventory and fails on unknown
classes, hardcoded colour, undocumented inline custom properties, native
`<select>` and date inputs, emoji used as icons, and scroll panes that cannot
scroll.

The rules an agent must follow are in [AGENTS.md](AGENTS.md), and
[`skills/barua-ui`](skills/barua-ui/SKILL.md) packages them as a Claude Code
skill.

## Conventions

Classes are `.b-block__element--modifier`, states are `.is-*` plus the matching
ARIA attribute, design tokens are `--b-*`, and JavaScript hooks are `data-b-*`
and progressive-enhancement only. Icons are inline 20×20 SVGs on a 1.5px stroke
using `currentColor`; the set lives in
[the icon library](https://ui.barua.tz/docs/icons.html).

Every component is documented on its category page with a live demo, and the
code block under each demo is generated from that demo's own markup — so the
documentation cannot drift from what the component actually is.

## Repository layout

```
css/        the system: tokens, base, utilities, one file per component family
js/         barua.js — progressive enhancement helpers, no dependencies
docs/       the documentation site (static HTML)
examples/   eight complete screens built only from documented components
packages/   the React wrapper (barua-ui), typed thin components over the CSS
skills/     the Barua UI skill for coding agents
tools/      index generator, system linter, documentation validator
AGENTS.md   the rules an agent must follow
```

## React

`packages/react` publishes as the `barua-ui` npm module: typed wrappers over the
same CSS, with a `BaruaProvider` for theme, accent, glass and refraction. It is
built but not yet on the npm registry.

## Licence

MIT — see [LICENSE](LICENSE).

Made in Dar es Salaam. *Barua* means "letter" in Swahili.
