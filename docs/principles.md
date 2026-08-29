# Principles — the eight ideas the system is built on, and what enforces each

Source: https://ui.barua.tz/docs/principles.html
Rules and conventions: https://ui.barua.tz/llms.txt

## Purpose

Make something meaningful.

- Documentation: https://ui.barua.tz/docs/principles.html#purpose
- Classes: `b-footnote` `b-list__header` `b-text-secondary`

```html
<div class="b-list__header">What holds it up</div>
<ul>
  <li>Every component is documented with a live demo; if it cannot be demonstrated, it is not ready.</li>
  <li>The linter rejects invented classes, so a new idea must be promoted into the system rather than smuggled into a page.</li>
  <li>The examples are built only from documented components — they are proof, not decoration.</li>
</ul>
```

```tsx
import { ListHeader } from "barua-ui";

<ListHeader>What holds it up</ListHeader>
<ul>
  <li>Every component is documented with a live demo; if it cannot be demonstrated, it is not ready.</li>
  <li>The linter rejects invented classes, so a new idea must be promoted into the system rather than smuggled into a page.</li>
  <li>The examples are built only from documented components — they are proof, not decoration.</li>
</ul>
```

## Agency

Let people do things their own way.

- Documentation: https://ui.barua.tz/docs/principles.html#agency
- Classes: `b-footnote` `b-list__header` `b-text-secondary`

```html
<div class="b-list__header">What holds it up</div>
<ul>
  <li>Theme, accent and wallpaper belong to the person: <code>data-theme</code>, <code>data-accent</code> and <code>Barua.wallpaper</code>.</li>
  <li>Overlays close the way people expect — Escape, outside click, and a visible control, everywhere.</li>
  <li>Destructive actions say what they will do, and are never the default in a row of buttons.</li>
</ul>
```

```tsx
import { ListHeader } from "barua-ui";

<ListHeader>What holds it up</ListHeader>
<ul>
  <li>
    Theme, accent and wallpaper belong to the person:
    <code>data-theme</code>
    ,
    <code>data-accent</code>
    and
    <code>Barua.wallpaper</code>
    .
  </li>
  <li>Overlays close the way people expect — Escape, outside click, and a visible control, everywhere.</li>
  <li>Destructive actions say what they will do, and are never the default in a row of buttons.</li>
</ul>
```

## Responsibility

Act in people’s best interest.

- Documentation: https://ui.barua.tz/docs/principles.html#responsibility
- Classes: `b-footnote` `b-list__header` `b-text-secondary`

```html
<div class="b-list__header">What holds it up</div>
<ul>
  <li><code>.b-redacted</code> and its privacy variant hide sensitive content deliberately, and look different from loading.</li>
  <li>Empty and error states explain the situation and the way out rather than apologising.</li>
  <li>Marketing claims carry footnotes: a figure with its conditions stated is worth more than a figure without.</li>
</ul>
```

```tsx
import { ListHeader } from "barua-ui";

<ListHeader>What holds it up</ListHeader>
<ul>
  <li>
    <code>.b-redacted</code>
    and its privacy variant hide sensitive content deliberately, and look different from loading.
  </li>
  <li>Empty and error states explain the situation and the way out rather than apologising.</li>
  <li>Marketing claims carry footnotes: a figure with its conditions stated is worth more than a figure without.</li>
</ul>
```

## Familiarity

Build on what people know.

- Documentation: https://ui.barua.tz/docs/principles.html#familiarity
- Classes: `b-footnote` `b-list__header` `b-text-secondary`

```html
<div class="b-list__header">What holds it up</div>
<ul>
  <li>Native elements first — <code>&lt;dialog&gt;</code>, the Popover API, <code>&lt;details&gt;</code> — so platform behaviour arrives correct and free.</li>
  <li>One grammar throughout: <code>.b-block__element--modifier</code>, <code>.is-*</code> for state, <code>--b-*</code> for values.</li>
  <li>States stay distinct and consistent: hover is a quiet fill, selection is accent-soft, focus is the ring.</li>
</ul>
```

```tsx
import { ListHeader } from "barua-ui";

<ListHeader>What holds it up</ListHeader>
<ul>
  <li>
    Native elements first —
    <code>
      <dialog>
    </code>
    , the Popover API,
    <code>
      <details>
    </code>
    — so platform behaviour arrives correct and free.
  </li>
  <li>
    One grammar throughout:
    <code>.b-block__element--modifier</code>
    ,
    <code>.is-*</code>
    for state,
    <code>--b-*</code>
    for values.
  </li>
  <li>States stay distinct and consistent: hover is a quiet fill, selection is accent-soft, focus is the ring.</li>
</ul>
```

## Flexibility

Adapt to diverse contexts and needs.

- Documentation: https://ui.barua.tz/docs/principles.html#flexibility
- Classes: `b-footnote` `b-list__header` `b-text-secondary`

```html
<div class="b-list__header">What holds it up</div>
<ul>
  <li>Light and dark through <code>light-dark()</code>; a wallpaper can set the scheme for the surface it backs.</li>
  <li>Every size is in <code>rem</code>, so the system text-size preference scales the whole interface.</li>
  <li>Reduced motion is honoured globally; every interactive element carries its keyboard path and accessible name.</li>
  <li>Components reflow on their own — most layouts need no media query at all.</li>
</ul>
```

```tsx
import { ListHeader } from "barua-ui";

<ListHeader>What holds it up</ListHeader>
<ul>
  <li>
    Light and dark through
    <code>light-dark()</code>
    ; a wallpaper can set the scheme for the surface it backs.
  </li>
  <li>
    Every size is in
    <code>rem</code>
    , so the system text-size preference scales the whole interface.
  </li>
  <li>Reduced motion is honoured globally; every interactive element carries its keyboard path and accessible name.</li>
  <li>Components reflow on their own — most layouts need no media query at all.</li>
</ul>
```

## Simplicity

Be clear and direct.

- Documentation: https://ui.barua.tz/docs/principles.html#simplicity
- Classes: `b-footnote` `b-list__header` `b-text-secondary`

```html
<div class="b-list__header">What holds it up</div>
<ul>
  <li>The type ramp is eleven roles, each with complete metrics — hierarchy is a decision, not a font size.</li>
  <li>A screen ends at the screen: chrome stays put and only designated panes scroll.</li>
  <li>Surfaces never stack materials; a panel inside glass is a fill.</li>
  <li>Labels are written, not generated: a button says what will happen.</li>
</ul>
```

```tsx
import { ListHeader } from "barua-ui";

<ListHeader>What holds it up</ListHeader>
<ul>
  <li>The type ramp is eleven roles, each with complete metrics — hierarchy is a decision, not a font size.</li>
  <li>A screen ends at the screen: chrome stays put and only designated panes scroll.</li>
  <li>Surfaces never stack materials; a panel inside glass is a fill.</li>
  <li>Labels are written, not generated: a button says what will happen.</li>
</ul>
```

## Craft

Care about every detail.

- Documentation: https://ui.barua.tz/docs/principles.html#craft
- Classes: `b-footnote` `b-list__header` `b-text-secondary`

```html
<div class="b-list__header">What holds it up</div>
<ul>
  <li>Every text style carries its own leading and tracking; small text opens up rather than borrowing body metrics.</li>
  <li>Charts have ceilings as well as floors, so a component that reads correctly in a demo still reads correctly in a wide card.</li>
  <li>Glass carries a specular edge, and the mail pane is literally the same card as everything else rather than a copy of its values.</li>
  <li>The validator and the linter run over the documentation itself — the docs obey the rules they publish.</li>
</ul>
```

```tsx
import { ListHeader } from "barua-ui";

<ListHeader>What holds it up</ListHeader>
<ul>
  <li>Every text style carries its own leading and tracking; small text opens up rather than borrowing body metrics.</li>
  <li>Charts have ceilings as well as floors, so a component that reads correctly in a demo still reads correctly in a wide card.</li>
  <li>Glass carries a specular edge, and the mail pane is literally the same card as everything else rather than a copy of its values.</li>
  <li>The validator and the linter run over the documentation itself — the docs obey the rules they publish.</li>
</ul>
```

## Delight

Make it human.

- Documentation: https://ui.barua.tz/docs/principles.html#delight
- Classes: `b-footnote` `b-list__header` `b-text-secondary`

```html
<div class="b-list__header">What holds it up</div>
<ul>
  <li>Motion runs on spring easings, and shared elements morph rather than cross-fade.</li>
  <li>Symbol effects answer an action: a bounce on send, a pulse while something is genuinely happening.</li>
  <li>Liquid Glass is one attribute, so a product can change its whole character without changing its markup.</li>
  <li>A wallpaper makes the glass mean something — the person&rsquo;s own picture, and the system learning its colour from it.</li>
</ul>
```

```tsx
import { ListHeader } from "barua-ui";

<ListHeader>What holds it up</ListHeader>
<ul>
  <li>Motion runs on spring easings, and shared elements morph rather than cross-fade.</li>
  <li>Symbol effects answer an action: a bounce on send, a pulse while something is genuinely happening.</li>
  <li>Liquid Glass is one attribute, so a product can change its whole character without changing its markup.</li>
  <li>A wallpaper makes the glass mean something — the person’s own picture, and the system learning its colour from it.</li>
</ul>
```

