# React — the typed bindings: install, Server Components, and the component index

Source: https://ui.barua.tz/docs/react.html
Rules and conventions: https://ui.barua.tz/llms.txt

## Install

One package, one stylesheet. The CSS is the system; the components only spare you from typing class names.

- Documentation: https://ui.barua.tz/docs/react.html#install
- Classes: `b-code` `b-code__header`

## The first component

Props are the modifiers you already know. b-btn--primary is variant="primary" ; there is nothing else to learn.

- Documentation: https://ui.barua.tz/docs/react.html#first
- Classes: `b-btn` `b-btn--ghost` `b-btn--primary` `b-gap-2` `b-hstack`

```html
<div class="b-hstack b-gap-2">
  <button class="b-btn b-btn--primary">Send invoice</button>
  <button class="b-btn b-btn--ghost">Save draft</button>
</div>
```

```tsx
import { Button } from "barua-ui";

<div className="b-hstack b-gap-2">
  <Button variant="primary">Send invoice</Button>
  <Button variant="ghost">Save draft</Button>
</div>
```

## Server Components

The bundle carries its own "use client" , so importing from a Server Component works. Components that hold state — the provider, toasts, the command palette — still need a client boundary of their own, which is ordinary React, not a quirk of this library.

- Documentation: https://ui.barua.tz/docs/react.html#server-components

## Theme

Light and dark come from light-dark() in the CSS, so the system already follows the operating system with no JavaScript at all. Reach for the provider only to override that choice, and add ThemeScript to stop the first paint flashing the wrong way.

- Documentation: https://ui.barua.tz/docs/react.html#theme
- Classes: `b-code` `b-code__header`

## Icons

The glyph library ships as a component, generated from the icons page — the same 59 glyphs, by name, with the sizes on the .b-icon scale.

- Documentation: https://ui.barua.tz/docs/react.html#icons
- Classes: `b-code` `b-code__header` `b-gap-3` `b-hstack` `b-icon`

```html
<div class="b-hstack b-gap-3">
  <svg class="b-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4 10.5 8.5 15 16 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
  <svg class="b-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="9" cy="9" r="5.5" stroke="currentColor" stroke-width="1.5"/><path d="m13.5 13.5 3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
  <svg class="b-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 3.5A4.5 4.5 0 0 1 14.5 8c0 3 1 4 1.5 4.5H4c.5-.5 1.5-1.5 1.5-4.5A4.5 4.5 0 0 1 10 3.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M8.5 15.5a1.6 1.6 0 0 0 3 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
</div>
```

```tsx
import { Icon } from "barua-ui";

<div className="b-hstack b-gap-3">
  <Icon viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M4 10.5 8.5 15 16 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </Icon>
  <Icon viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="m13.5 13.5 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </Icon>
  <Icon viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M10 3.5A4.5 4.5 0 0 1 14.5 8c0 3 1 4 1.5 4.5H4c.5-.5 1.5-1.5 1.5-4.5A4.5 4.5 0 0 1 10 3.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M8.5 15.5a1.6 1.6 0 0 0 3 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </Icon>
</div>
```

## When a component is in the way

Nothing here is compulsory. Every component forwards className and its ref, so a class the props do not cover can always be added by hand — and any element can carry a system class directly. The React layer is a convenience, never a gate.

- Documentation: https://ui.barua.tz/docs/react.html#escape-hatch
- Classes: `b-code` `b-code__header`

## What is exported

278 components and hooks, covering every block in the system. The list is generated from the package, so it never claims more than it ships.

- Documentation: https://ui.barua.tz/docs/react.html#components
- Classes: `b-table` `b-table-wrap`

