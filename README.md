# Barua UI

A web design system with Apple DNA — Barua blue, glass materials, precise
typography — built as **pure HTML + CSS** (plus a small optional JS
enhancement layer). For any product, any team. No build step, no framework.

Barua ("letter" in Swahili) layers our look on top of Apple's design language.
The `apple-docs/` mirror of the SwiftUI documentation (fetched with
`apple-docs-dl.py`) is the reference DNA for naming, type scale, palette and
motion feel.

## Quick start

```html
<link rel="stylesheet" href="css/barua.css">
<script defer src="js/barua.js"></script>

<button class="b-btn b-btn--primary">Habari, Barua!</button>
```

### React

The system also ships as an npm module (`packages/react` → package name
`barua-ui`): typed React components over the same CSS.

```tsx
import "barua-ui/css";
import { BaruaProvider, Button } from "barua-ui";

<BaruaProvider theme="auto">
  <Button variant="primary">Habari, Barua!</Button>
</BaruaProvider>
```

Build with `cd packages/react && npm run build`; `npm pack` produces the
installable tarball. See `packages/react/README.md`.

Open `index.html` for the docs site (serve the folder with any static server,
e.g. `python3 -m http.server`, so CSS `@import` and fonts behave).

## Layout

```
css/
  barua.css          entry point — @layer order + imports
  tokens.css         design tokens (color, type, space, radius, shadow,
                     materials, motion, z) — light-dark() theming
  base.css           reset, typography, focus ring, states, scrollbars
  utilities.css      Stack/HStack/Grid/Container/Divider/materials/text roles
  components/        actions, nav, forms, content, feedback, overlays,
                     charts, media, specialized, productivity, mobile, auth
js/barua.js          optional: toasts, tabs, theme, OTP, carousel, palette
docs/                documentation site (one page per category)
index.html           landing + getting started
apple-docs-dl.py     Apple Developer docs mirror tool (any framework)
apple-docs/          downloaded SwiftUI reference (8,965 pages)
```

## Conventions

- Classes: `.b-block`, `.b-block__element`, `.b-block--modifier`
- States: `.is-active`, `.is-selected`, `.is-dragging` + native `aria-*`
- Tokens: `--b-*` custom properties; components consume semantic tokens only
- Theming: `<html data-theme="light|dark">` (unset = follow system);
  re-tint with `data-accent="indigo|purple|pink|teal|green"`
- Layers: `tokens < base < utilities < components`; your unlayered
  overrides always win
- JS hooks: `data-b-*` attributes; everything degrades gracefully without JS

## Browser support

Modern evergreen browsers (Safari 17.5+, Chrome 123+, Firefox 127+):
uses `light-dark()`, `color-mix()`, `@layer`, `:has()`, Popover API,
`<dialog>`, `@starting-style`.

## Docs

Start at `index.html` → Foundations. Every component page shows live demos;
the code block under each demo is generated from the demo markup itself
(`docs/docs.js`), so examples can't drift from reality. ⌘K opens the
component search palette.
