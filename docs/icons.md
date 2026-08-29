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

A glyph can answer an action. .b-icon--bounce plays once — the acknowledgement when something is sent, saved or added — and .b-icon--pulse repeats while something is genuinely ongoing. Both respect reduced motion, and both are effects on the icon rather than on the control, so a button keeps its own states.

- Documentation: https://ui.barua.tz/docs/icons.html#symbol-effects
- Classes: `b-btn` `b-btn--ghost` `b-btn--glass` `b-icon` `b-icon--bounce` `b-icon--pulse` `b-icon--sm`

```html
<button class="b-btn b-btn--glass" onclick="this.querySelector('svg').classList.remove('b-icon--bounce'); void this.offsetWidth; this.querySelector('svg').classList.add('b-icon--bounce')">
  <svg class="b-icon b-icon--sm b-icon--bounce" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m3.5 10 13-6-3.5 13-3.5-4.5L3.5 10Zm6 2.5L13 7" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
  Send again
</button>
<span class="b-btn b-btn--ghost" aria-live="polite">
  <svg class="b-icon b-icon--sm b-icon--pulse" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="6.5" stroke="currentColor" stroke-width="1.5"/><path d="M10 6.5V10l2.5 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
  Syncing
</span>
```

```tsx
import { Button, Icon } from "barua-ui";

<Button
  variant="glass"
  onclick="this.querySelector('svg').classList.remove('b-icon--bounce'); void this.offsetWidth; this.querySelector('svg').classList.add('b-icon--bounce')"
>
  <Icon
    className="b-icon--sm b-icon--bounce"
    viewBox="0 0 20 20"
    fill="none"
    aria-hidden="true"
  >
    <path d="m3.5 10 13-6-3.5 13-3.5-4.5L3.5 10Zm6 2.5L13 7" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </Icon>
  Send again
</Button>
<Button variant="ghost" aria-live="polite">
  <Icon
    className="b-icon--sm b-icon--pulse"
    viewBox="0 0 20 20"
    fill="none"
    aria-hidden="true"
  >
    <circle cx="10" cy="10" r="6.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10 6.5V10l2.5 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </Icon>
  Syncing
</Button>
```

## Library

Fifty-nine core glyphs. Click to copy the SVG — paste it inline and add .b-icon . New icons must keep the grid, stroke and naming conventions; propose them here before using them in product.

- Documentation: https://ui.barua.tz/docs/icons.html#icon-library
- Classes: `b-icon`

