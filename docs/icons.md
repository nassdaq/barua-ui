# Icons — the 20×20 glyph set

Source: https://ui.barua.tz/docs/icons.html
Rules and conventions: https://ui.barua.tz/llms.txt

## Usage

Size icons with .b-icon (1.25rem), .b-icon--sm (1rem) or .b-icon--lg (1.75rem) instead of width/height attributes. Icons inherit currentColor , so they recolor with the component state — a tinted button tints its glyph for free. Decorative icons take aria-hidden="true" ; icon-only buttons carry the label via aria-label .

- Documentation: https://ui.barua.tz/docs/icons.html#icon-usage
- Classes: `b-btn` `b-btn--ghost` `b-btn--glass` `b-btn--primary` `b-icon` `b-icon--sm` `b-icon-btn` `b-tooltip-host`

```html
<button class="b-btn b-btn--primary">
  <svg class="b-icon b-icon--sm" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m3.5 10 13-6-3.5 13-3.5-4.5L3.5 10Zm6 2.5L13 7" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
  Send
</button>
<button class="b-btn b-btn--glass">
  <svg class="b-icon b-icon--sm" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 12.5v-9M7 6l3-2.8L13 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.5 9.5H5A1.5 1.5 0 0 0 3.5 11v4A1.5 1.5 0 0 0 5 16.5h10a1.5 1.5 0 0 0 1.5-1.5v-4A1.5 1.5 0 0 0 15 9.5h-.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
  Share
</button>
<button class="b-btn b-icon-btn b-btn--ghost b-tooltip-host" data-tooltip="Notifications" aria-label="Notifications">
  <svg class="b-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 3.5A4.5 4.5 0 0 1 14.5 8c0 3 1 4 1.5 4.5H4c.5-.5 1.5-1.5 1.5-4.5A4.5 4.5 0 0 1 10 3.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M8.5 15.5a1.6 1.6 0 0 0 3 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
</button>
```

```tsx
import { Button, Icon, Tooltip } from "barua-ui";

<Button variant="primary">
  <Icon
    className="b-icon--sm"
    viewBox="0 0 20 20"
    fill="none"
    aria-hidden="true"
  >
    <path d="m3.5 10 13-6-3.5 13-3.5-4.5L3.5 10Zm6 2.5L13 7" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </Icon>
  Send
</Button>
<Button variant="glass">
  <Icon
    className="b-icon--sm"
    viewBox="0 0 20 20"
    fill="none"
    aria-hidden="true"
  >
    <path d="M10 12.5v-9M7 6l3-2.8L13 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5.5 9.5H5A1.5 1.5 0 0 0 3.5 11v4A1.5 1.5 0 0 0 5 16.5h10a1.5 1.5 0 0 0 1.5-1.5v-4A1.5 1.5 0 0 0 15 9.5h-.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </Icon>
  Share
</Button>
<Tooltip
  className="b-btn b-icon-btn b-btn--ghost"
  data-tooltip="Notifications"
  aria-label="Notifications"
>
  <Icon viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M10 3.5A4.5 4.5 0 0 1 14.5 8c0 3 1 4 1.5 4.5H4c.5-.5 1.5-1.5 1.5-4.5A4.5 4.5 0 0 1 10 3.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M8.5 15.5a1.6 1.6 0 0 0 3 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </Icon>
</Tooltip>
```

## Symbol effects

A glyph that answers an action is the cheapest feedback an interface has. Add one class to the icon rather than to the control, so a button keeps its own states. The division that matters is whether an effect plays once or repeats : one acknowledges something that just happened, the other describes something still happening. A repeating effect used as an acknowledgement is just noise.

- Documentation: https://ui.barua.tz/docs/icons.html#symbol-effects
- Classes: `b-btn` `b-btn--primary` `b-btn--sm` `b-btn--tinted` `b-caption` `b-caption2` `b-code` `b-code__header` `b-gap-2` `b-gap-4` `b-hstack` `b-icon` `b-icon--bounce` `b-icon--breathe` `b-icon--pulse` `b-icon--replace` `b-icon--rotate` `b-icon--scale` `b-icon--sm` `b-icon--wiggle` `b-stack--wrap` `b-table` `b-table-wrap` `b-text-secondary` `b-vstack`

```html
<div class="docs-replay">
  <button class="b-btn b-btn--tinted b-btn--sm" data-docs-replay="#symbol-demo">Play</button>
  <span class="b-caption b-text-secondary">the one-shot effects have already run — press to see them</span>
</div>
<div class="b-hstack b-gap-4 b-stack--wrap">
  <span class="b-vstack b-gap-2" style="align-items: center; min-width: 5rem">
    <svg class="b-icon b-icon--bounce" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m3.5 10 13-6-3.5 13-3.5-4.5L3.5 10Zm6 2.5L13 7" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
    <code class="b-caption2">--bounce</code>
  </span>
  <span class="b-vstack b-gap-2" style="align-items: center; min-width: 5rem">
    <svg class="b-icon b-icon--scale" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 3l1.2 3.3 3.3 1.2-3.3 1.2L10 12 8.8 8.7 5.5 7.5l3.3-1.2L10 3Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
    <code class="b-caption2">--scale</code>
  </span>
  <span class="b-vstack b-gap-2" style="align-items: center; min-width: 5rem">
    <svg class="b-icon b-icon--wiggle" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 3.5 3.5 15h13L10 3.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M10 8v3M10 13h.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
    <code class="b-capti
```

```tsx
import { Button, Icon } from "barua-ui";

<div className="docs-replay">
  <Button variant="tinted" size="sm" data-docs-replay="#symbol-demo">Play</Button>
  <span className="b-caption b-text-secondary">the one-shot effects have already run — press to see them</span>
</div>
<div className="b-hstack b-gap-4 b-stack--wrap">
  <span
    className="b-vstack b-gap-2"
    style={{ alignItems: "center", minWidth: "5rem" }}
  >
    <Icon
      className="b-icon--bounce"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path d="m3.5 10 13-6-3.5 13-3.5-4.5L3.5 10Zm6 2.5L13 7" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </Icon>
    <code className="b-caption2">--bounce</code>
  </span>
  <span
    className="b-vstack b-gap-2"
    style={{ alignItems: "center", minWidth: "5rem" }}
  >
    <Icon
      className="b-icon--scale"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path d="M10 3l1.2 3.3 3.3 1.2-3.3 1.2L10 12 8.8 8.7 5.5 7.5l3.3-1.2L10 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </Icon>
    <code className="b-caption2">--scale</code>
  </span>
  <span
    className="b-vstack b-gap-2"
    style={{ alignItems: "center", minWidth: "5rem" }}
  >
    <Icon
      className="b-icon--wiggle"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path d="M10 3.5 3.5 15h13L10 3.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M10 8v3M10 13h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </Icon>
  </span>
</div>
```

## Library

Fifty-nine core glyphs. Click to copy the SVG — paste it inline and add .b-icon . New icons must keep the grid, stroke and naming conventions; propose them here before using them in product.

- Documentation: https://ui.barua.tz/docs/icons.html#icon-library
- Classes: `b-icon`

