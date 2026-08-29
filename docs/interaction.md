# Interaction — states, drag and drop, shortcuts

Source: https://ui.barua.tz/docs/interaction.html
Rules and conventions: https://ui.barua.tz/llms.txt

## State Conventions

Barua uses one small vocabulary everywhere. Native pseudo-classes do the work when the browser can ( :hover , :active , :disabled , :focus-visible ); a matching is-* class exists for every state your JavaScript needs to drive itself.

- Documentation: https://ui.barua.tz/docs/interaction.html#state-conventions
- Classes: `b-btn` `b-table` `b-table-wrap`

```html
<button class="b-btn">Default</button>
<button class="b-btn is-pressed">Pressed</button>
<button class="b-btn is-active">Active</button>
<button class="b-btn is-dragging" draggable="true">Dragging</button>
<button class="b-btn" disabled>Disabled</button>
<button class="b-btn is-disabled" aria-disabled="true">Disabled (class)</button>
```

```tsx
import { Button } from "barua-ui";

<Button>Default</Button>
<Button className="is-pressed">Pressed</Button>
<Button active>Active</Button>
<Button className="is-dragging" draggable="true">Dragging</Button>
<Button disabled>Disabled</Button>
<Button className="is-disabled" aria-disabled="true">Disabled (class)</Button>
```

## Hover State

Hover is an invitation, not information: the surface tint deepens one step ( --b-fill-quaternary → --b-fill-tertiary ) and interactive cards lift 2px. Treat it as enhancement only — touch screens never fire it, so nothing may exist solely behind a hover.

- Documentation: https://ui.barua.tz/docs/interaction.html#hover-state
- Classes: `b-badge` `b-badge--accent` `b-badge--success` `b-card` `b-card--interactive` `b-card__body` `b-card__subtitle` `b-card__title` `b-grid` `b-grid--2` `b-list` `b-list-item` `b-list-item--interactive` `b-list-item__chevron` `b-list-item__content` `b-list-item__subtitle` `b-list-item__title` `b-table` `b-table--hover` `b-table-wrap`

```html
<div class="b-grid b-grid--2">
  <div class="b-card b-card--interactive">
    <div class="b-card__body">
      <div class="b-card__title">Weekly digest</div>
      <div class="b-card__subtitle">Hover me — I lift and gain elevation</div>
    </div>
  </div>
  <div class="b-card b-card--interactive">
    <div class="b-card__body">
      <div class="b-card__title">Team inbox</div>
      <div class="b-card__subtitle">.b-card--interactive opts a card in</div>
    </div>
  </div>
</div>
```

```tsx
import { Card, CardBody, CardSubtitle, CardTitle, Grid } from "barua-ui";

<Grid cols={2}>
  <Card className="b-card--interactive">
    <CardBody>
      <CardTitle>Weekly digest</CardTitle>
      <CardSubtitle>Hover me — I lift and gain elevation</CardSubtitle>
    </CardBody>
  </Card>
  <Card className="b-card--interactive">
    <CardBody>
      <CardTitle>Team inbox</CardTitle>
      <CardSubtitle>.b-card--interactive opts a card in</CardSubtitle>
    </CardBody>
  </Card>
</Grid>
```

## Pressed State

Buttons compress to scale: 0.97 on :active — a 100ms ( --b-duration-instant ) squeeze that makes every press feel physical, the way Apple's controls do. When state is driven from JavaScript instead of the pointer — keyboard activation, pointer capture on a custom control — apply .is-pressed to get the identical physics.

- Documentation: https://ui.barua.tz/docs/interaction.html#pressed-state
- Classes: `b-btn` `b-btn--primary` `b-btn--tinted`

```html
<button class="b-btn b-btn--primary">Press and hold</button>
<button class="b-btn">Press and hold</button>
<button class="b-btn b-btn--tinted is-pressed">.is-pressed</button>
```

```tsx
import { Button } from "barua-ui";

<Button variant="primary">Press and hold</Button>
<Button>Press and hold</Button>
<Button variant="tinted" className="is-pressed">.is-pressed</Button>
```

## Active & Selected State

.is-active means "you are here" or "this is on" — navigation items, segmented controls, toggles. .is-selected means "this is chosen and something will happen to it" — list rows, chips, cards in a picker. Both tint with --b-color-accent-soft so the whole system re-themes from one accent token.

- Documentation: https://ui.barua.tz/docs/interaction.html#active-selected-state
- Classes: `b-card` `b-card--flat` `b-card__body` `b-card__subtitle` `b-card__title` `b-chip` `b-grid` `b-grid--3` `b-list` `b-list-item` `b-list-item--interactive` `b-list-item__content` `b-list-item__title` `b-list-item__trailing` `b-segmented` `b-segmented__item` `b-selectable` `b-sidebar` `b-sidebar__item`

```html
<div class="b-segmented">
  <button class="b-segmented__item is-active">List</button>
  <button class="b-segmented__item">Board</button>
  <button class="b-segmented__item">Timeline</button>
</div>
<button class="b-chip is-selected">Design</button>
<button class="b-chip">Engineering</button>
<button class="b-chip">Marketing</button>
```

```tsx
import { Chip, Segmented } from "barua-ui";

<Segmented>
  <button className="b-segmented__item is-active">List</button>
  <button className="b-segmented__item">Board</button>
  <button className="b-segmented__item">Timeline</button>
</Segmented>
<Chip selected>Design</Chip>
<Chip>Engineering</Chip>
<Chip>Marketing</Chip>
```

## Disabled State

Disabled controls fade to --b-opacity-disabled (0.4) and swap to a not-allowed cursor. The native disabled attribute is the default; the .is-disabled class produces the same look on elements that can't take the attribute (links, custom widgets).

- Documentation: https://ui.barua.tz/docs/interaction.html#disabled-state
- Classes: `b-btn` `b-btn--primary` `b-checkbox` `b-input` `b-select` `b-switch`

```html
<button class="b-btn b-btn--primary" disabled>Send</button>
<button class="b-btn is-disabled" aria-disabled="true">Archive</button>
<input class="b-input" style="width: 11rem;" placeholder="Recipient" disabled>
<!-- barua-lint disable native-select: showing the disabled state of a platform control -->
<select class="b-select" style="width: 9rem;" disabled>
  <option>Read only</option>
</select>
<label class="b-switch"><input type="checkbox" checked disabled> Auto-reply</label>
<label class="b-checkbox"><input type="checkbox" disabled> Cc me</label>
```

```tsx
import { Button, Checkbox, Input, Select, Switch } from "barua-ui";

<Button variant="primary" disabled>Send</Button>
<Button className="is-disabled" aria-disabled="true">Archive</Button>
<Input style={{ width: "11rem" }} placeholder="Recipient" disabled />
<Select style={{ width: "9rem" }} disabled>
  <option>Read only</option>
</Select>
<Switch>
  <input type="checkbox" checked disabled />
  Auto-reply
</Switch>
<Checkbox>
  <input type="checkbox" disabled />
  Cc me
</Checkbox>
```

## Dragging State

Mid-drag, the grabbed element takes .is-dragging : opacity drops to 0.55 and the cursor switches to grabbing — on .b-task cards it also tilts 2° for a picked-up feel. Leave a .b-drag-ghost copy (50% opacity) at the origin so the layout doesn't jump. Anything with draggable="true" shows a grab cursor at rest.

- Documentation: https://ui.barua.tz/docs/interaction.html#dragging-state
- Classes: `b-drag-ghost` `b-task` `b-task__meta` `b-task__title`

```html
<div class="b-task" draggable="true" style="width: 12.5rem;">
  <div class="b-task__title">At rest</div>
  <div class="b-task__meta">cursor: grab</div>
</div>
<div class="b-task b-drag-ghost" style="width: 12.5rem;">
  <div class="b-task__title">Origin ghost</div>
  <div class="b-task__meta">.b-drag-ghost</div>
</div>
<div class="b-task is-dragging" style="width: 12.5rem;">
  <div class="b-task__title">Being dragged</div>
  <div class="b-task__meta">.is-dragging</div>
</div>
```

```tsx
import { Task } from "barua-ui";

<Task draggable="true" style={{ width: "12.5rem" }}>
  <div className="b-task__title">At rest</div>
  <div className="b-task__meta">cursor: grab</div>
</Task>
<Task className="b-drag-ghost" style={{ width: "12.5rem" }}>
  <div className="b-task__title">Origin ghost</div>
  <div className="b-task__meta">.b-drag-ghost</div>
</Task>
<Task className="is-dragging" style={{ width: "12.5rem" }}>
  <div className="b-task__title">Being dragged</div>
  <div className="b-task__meta">.is-dragging</div>
</Task>
```

## Drag & Drop

The full pattern composes four pieces: .b-dropzone around any list (its 2px dashed border is transparent until needed), .is-dropover when a drag hovers a valid target (dashed accent border + accent-soft wash), .b-drop-indicator as the insertion line between items, and .is-dragging on the grabbed card. The HTML5 dragstart / dragover / drop wiring — and toggling these classes — is app-side JavaScript; Barua supplies the states, not the engine.

- Documentation: https://ui.barua.tz/docs/interaction.html#drag-and-drop
- Classes: `b-drag-handle` `b-drop-indicator` `b-dropzone` `b-gap-2` `b-grid` `b-grid--2` `b-list` `b-list-item` `b-list-item__content` `b-list-item__title` `b-list-item__trailing` `b-overline` `b-stack` `b-task` `b-task__meta` `b-task__title`

```html
<div class="b-grid b-grid--2">
  <div class="b-dropzone" style="padding: var(--b-space-3);">
    <div class="b-stack b-gap-2">
      <div class="b-overline">Backlog</div>
      <div class="b-task" draggable="true">
        <div class="b-task__title">Refactor tokens</div>
        <div class="b-task__meta">BAR-201</div>
      </div>
      <div class="b-task is-dragging" draggable="true">
        <div class="b-task__title">Ship dark mode</div>
        <div class="b-task__meta">BAR-202</div>
      </div>
    </div>
  </div>
  <div class="b-dropzone is-dropover" style="padding: var(--b-space-3);">
    <div class="b-stack b-gap-2">
      <div class="b-overline">This week</div>
      <div class="b-task" draggable="true">
        <div class="b-task__title">Draft changelog</div>
        <div class="b-task__meta">BAR-198</div>
      </div>
      <div class="b-drop-indicator" aria-hidden="true"></div>
      <div class="b-task" draggable="true">
        <div class="b-task__title">QA pass</div>
        <div class="b-task__meta">BAR-199</div>
      </div>
    </div>
  </div>
</div>
```

```tsx
import { Dropzone, Grid, Overline, Task } from "barua-ui";

<Grid cols={2}>
  <Dropzone style={{ padding: "var(--b-space-3)" }}>
    <div className="b-stack b-gap-2">
      <Overline>Backlog</Overline>
      <Task draggable="true">
        <div className="b-task__title">Refactor tokens</div>
        <div className="b-task__meta">BAR-201</div>
      </Task>
      <Task className="is-dragging" draggable="true">
        <div className="b-task__title">Ship dark mode</div>
        <div className="b-task__meta">BAR-202</div>
      </Task>
    </div>
  </Dropzone>
  <Dropzone className="is-dropover" style={{ padding: "var(--b-space-3)" }}>
    <div className="b-stack b-gap-2">
      <Overline>This week</Overline>
      <Task draggable="true">
        <div className="b-task__title">Draft changelog</div>
        <div className="b-task__meta">BAR-198</div>
      </Task>
      <div className="b-drop-indicator" aria-hidden="true"></div>
      <Task draggable="true">
        <div className="b-task__title">QA pass</div>
        <div className="b-task__meta">BAR-199</div>
      </Task>
    </div>
  </Dropzone>
</Grid>
```

## Resizable Handle

Place a .b-resize-handle between two .b-panel children of a .b-split . The 9px grab strip renders as a hairline; on hover — or with .is-active while dragging — it thickens into an accent bar. The pointer-tracking that actually resizes the panels is app-side JavaScript.

- Documentation: https://ui.barua.tz/docs/interaction.html#resizable-handle
- Classes: `b-footnote` `b-overline` `b-panel` `b-resizable` `b-resize-handle` `b-split` `b-text-secondary`

```html
<div class="b-split" style="height: 9rem;">
  <div class="b-panel" style="flex: 1; padding: var(--b-space-4);">
    <div class="b-overline">Folders</div>
  </div>
  <div class="b-resize-handle" role="separator" aria-orientation="vertical" aria-label="Resize panels" tabindex="0"></div>
  <div class="b-panel" style="flex: 2; padding: var(--b-space-4);">
    <div class="b-overline">Messages</div>
  </div>
</div>
```

```tsx
import { Overline, ResizeHandle, Split } from "barua-ui";

<Split style={{ height: "9rem" }}>
  <div
    className="b-panel"
    style={{ flex: "1", padding: "var(--b-space-4)" }}
  >
    <Overline>Folders</Overline>
  </div>
  <ResizeHandle
    role="separator"
    aria-orientation="vertical"
    aria-label="Resize panels"
    tabIndex="0"
  ></ResizeHandle>
  <div
    className="b-panel"
    style={{ flex: "2", padding: "var(--b-space-4)" }}
  >
    <Overline>Messages</Overline>
  </div>
</Split>
```

## Selection & Multi-Selection

Multi-selection layers three pieces: .b-selectable items (with .is-selected ), a .b-selection-rect marquee drawn while the pointer rubber-bands across the surface, and a .b-selection-count readout. The rect is normally position: fixed and sized from pointer coordinates — it's frozen here with inline positioning so you can see it.

- Documentation: https://ui.barua.tz/docs/interaction.html#selection-multi-selection
- Classes: `b-btn` `b-btn--ghost` `b-btn--sm` `b-card` `b-card--flat` `b-card__body` `b-card__subtitle` `b-card__title` `b-grid` `b-grid--3` `b-hstack` `b-relative` `b-selectable` `b-selection-count` `b-selection-rect`

```html
<div class="b-relative">
  <div class="b-grid b-grid--3">
    <div class="b-card b-card--flat b-selectable is-selected">
      <div class="b-card__body">
        <div class="b-card__title">photo-01.heic ✓</div>
        <div class="b-card__subtitle">2.4 MB</div>
      </div>
    </div>
    <div class="b-card b-card--flat b-selectable is-selected">
      <div class="b-card__body">
        <div class="b-card__title">photo-02.heic ✓</div>
        <div class="b-card__subtitle">3.1 MB</div>
      </div>
    </div>
    <div class="b-card b-card--flat b-selectable">
      <div class="b-card__body">
        <div class="b-card__title">notes.txt</div>
        <div class="b-card__subtitle">4 KB</div>
      </div>
    </div>
  </div>
  <div class="b-selection-rect" style="position: absolute; left: 4%; top: 22%; width: 58%; height: 68%;"></div>
</div>
<div class="b-hstack" style="margin-block-start: var(--b-space-4);">
  <span class="b-selection-count">2 selected</span>
  <button class="b-btn b-btn--sm">Move</button>
  <button class="b-btn b-btn--sm b-btn--ghost">Deselect</button>
</div>
```

```tsx
import { Button, Card, CardBody, CardSubtitle, CardTitle, Grid, SelectionCount } from "barua-ui";

<div className="b-relative">
  <Grid cols={3}>
    <Card selected className="b-card--flat b-selectable">
      <CardBody>
        <CardTitle>photo-01.heic ✓</CardTitle>
        <CardSubtitle>2.4 MB</CardSubtitle>
      </CardBody>
    </Card>
    <Card selected className="b-card--flat b-selectable">
      <CardBody>
        <CardTitle>photo-02.heic ✓</CardTitle>
        <CardSubtitle>3.1 MB</CardSubtitle>
      </CardBody>
    </Card>
    <Card className="b-card--flat b-selectable">
      <CardBody>
        <CardTitle>notes.txt</CardTitle>
        <CardSubtitle>4 KB</CardSubtitle>
      </CardBody>
    </Card>
  </Grid>
  <div
    className="b-selection-rect"
    style={{ position: "absolute", left: "4%", top: "22%", width: "58%", height: "68%" }}
  ></div>
</div>
<div
  className="b-hstack"
  style={{ marginBlockStart: "var(--b-space-4)" }}
>
  <SelectionCount>2 selected</SelectionCount>
  <Button size="sm">Move</Button>
  <Button size="sm" variant="ghost">Deselect</Button>
</div>
```

## Keyboard Shortcut

Shortcuts render with the native <kbd> element — or .b-kbd on a span — styled as a small key cap with a weighted bottom edge. Show them inline in help text, in menus and in the command palette so they're learnable, not secret.

- Documentation: https://ui.barua.tz/docs/interaction.html#keyboard-shortcut
- Classes: `b-kbd` `b-menu` `b-menu__item` `b-menu__separator` `b-menu__shortcut` `b-table` `b-table-wrap`

```html
<span>Open the palette with <kbd>⌘K</kbd>, save with <kbd>⌘S</kbd>, close with <kbd>esc</kbd> or press <span class="b-kbd">⇧⌘P</span> for actions.</span>
```

```tsx
import { Kbd } from "barua-ui";

<span>
  Open the palette with
  <kbd>⌘K</kbd>
  , save with
  <kbd>⌘S</kbd>
  , close with
  <kbd>esc</kbd>
  or press
  <Kbd>⇧⌘P</Kbd>
  for actions.
</span>
```

## Focus Ring

Every focusable element shares one ring: --b-focus-ring , a 3.5px accent glow at 30% opacity. It attaches via :focus-visible , so it appears for keyboard and assistive tech but not for mouse clicks — press Tab below to walk it across four different control types. Inputs pair the ring with an accent border. Custom focusable elements can opt in with the .b-focus-ring class.

- Documentation: https://ui.barua.tz/docs/interaction.html#focus-ring
- Classes: `b-btn` `b-checkbox` `b-input` `b-link`

```html
<button class="b-btn">Tab to me</button>
<input class="b-input" style="width: 11rem;" placeholder="Then me">
<a class="b-link" href="#focus-ring">Then this link</a>
<label class="b-checkbox"><input type="checkbox"> And this</label>
```

```tsx
import { Button, Checkbox, Input, Link } from "barua-ui";

<Button>Tab to me</Button>
<Input style={{ width: "11rem" }} placeholder="Then me" />
<Link href="#focus-ring">Then this link</Link>
<Checkbox>
  <input type="checkbox" />
  And this
</Checkbox>
```

## Contextual Actions

Row-level actions stay hidden until the row is hovered, keeping dense lists calm. Inside a .b-datagrid this is automatic — .b-row-actions cells flip from visibility: hidden to visible on tr:hover . The list below recreates both moments statically: the first row is at rest, the second is shown as if hovered.

- Documentation: https://ui.barua.tz/docs/interaction.html#contextual-actions
- Classes: `b-btn` `b-btn--ghost` `b-btn--sm` `b-icon-btn` `b-list` `b-list-item` `b-list-item__content` `b-list-item__subtitle` `b-list-item__title` `b-row-actions`

```html
<ul class="b-list">
  <li class="b-list-item">
    <div class="b-list-item__content">
      <div class="b-list-item__title">Quarterly-report.pdf</div>
      <div class="b-list-item__subtitle">Edited 2 hours ago</div>
    </div>
    <span class="b-row-actions" style="visibility: hidden; display: inline-flex; gap: var(--b-space-1);">
      <button class="b-btn b-icon-btn b-btn--ghost b-btn--sm" aria-label="Star">
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m10 3 2.1 4.4 4.9.6-3.6 3.3.9 4.7L10 13.7 5.7 16l.9-4.7L3 8l4.9-.6L10 3Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
      </button>
      <button class="b-btn b-icon-btn b-btn--ghost b-btn--sm" aria-label="Delete">
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4 6h12M8 6V4.5A1.5 1.5 0 0 1 9.5 3h1A1.5 1.5 0 0 1 12 4.5V6m2.5 0-.7 9.1A1.5 1.5 0 0 1 12.3 16H7.7a1.5 1.5 0 0 1-1.5-.9L5.5 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
      </button>
    </span>
  </li>
  <li class="b-list-item" style="background: var(--b-fill-quaternary);">
    <div class="b-list-item__content">
      <div class="b-list-item__title">Launch-plan.key</div>
      <div class="b-list-item__subtitle">Edited yesterday — hovered, actions revealed</div>
    </div>
    <span class="b-row-actions" style="display: inline-flex; gap: var(--b-space-1)
```

```tsx
import { Button, List, ListItem } from "barua-ui";

<List>
  <ListItem>
    <div className="b-list-item__content">
      <div className="b-list-item__title">Quarterly-report.pdf</div>
      <div className="b-list-item__subtitle">Edited 2 hours ago</div>
    </div>
    <span
      className="b-row-actions"
      style={{ visibility: "hidden", display: "inline-flex", gap: "var(--b-space-1)" }}
    >
      <Button icon variant="ghost" size="sm" aria-label="Star">
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="m10 3 2.1 4.4 4.9.6-3.6 3.3.9 4.7L10 13.7 5.7 16l.9-4.7L3 8l4.9-.6L10 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      </Button>
      <Button icon variant="ghost" size="sm" aria-label="Delete">
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M4 6h12M8 6V4.5A1.5 1.5 0 0 1 9.5 3h1A1.5 1.5 0 0 1 12 4.5V6m2.5 0-.7 9.1A1.5 1.5 0 0 1 12.3 16H7.7a1.5 1.5 0 0 1-1.5-.9L5.5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </Button>
    </span>
  </ListItem>
  <ListItem style={{ background: "var(--b-fill-quaternary)" }}>
    <div className="b-list-item__content">
      <div className="b-list-item__title">Launch-plan.key</div>
      <div className="b-list-item__subtitle">Edited yesterday — hovered, actions revealed</div>
    </div>
  </ListItem>
</List>
```

## Scroll reveal

SwiftUI has scrollTransition ; the web now has a scroll timeline. .b-reveal ties an entrance animation to the element's own position in the scrollport, so the browser drives it — no observer, no scroll listener, nothing on the main thread.

- Documentation: https://ui.barua.tz/docs/interaction.html#scroll-reveal
- Classes: `b-btn` `b-btn--sm` `b-btn--tinted` `b-caption` `b-card` `b-card__body` `b-code` `b-code__header` `b-footnote` `b-gap-3` `b-reveal` `b-reveal--end` `b-reveal--fade` `b-reveal--scale` `b-reveal--start` `b-stack` `b-text-secondary`

```html
<div class="docs-replay">
  <button class="b-btn b-btn--tinted b-btn--sm" data-docs-replay="#reveal-box">Play</button>
  <span class="b-caption b-text-secondary">or scroll inside the box</span>
</div>
<div class="docs-scrollbox" id="reveal-box">
  <div class="docs-scrollbox__spacer">scroll down ↓</div>
  <div class="b-stack b-gap-3">
    <article class="b-card b-reveal"><div class="b-card__body">Rises as it enters</div></article>
    <article class="b-card b-reveal b-reveal--fade"><div class="b-card__body"><code>--fade</code></div></article>
    <article class="b-card b-reveal b-reveal--scale"><div class="b-card__body"><code>--scale</code></div></article>
    <article class="b-card b-reveal b-reveal--start"><div class="b-card__body"><code>--start</code>, from the leading edge</div></article>
    <article class="b-card b-reveal b-reveal--end"><div class="b-card__body"><code>--end</code>, from the trailing edge</div></article>
  </div>
  <div class="docs-scrollbox__spacer">scroll back up to replay ↑</div>
</div>
```

```tsx
import { Button, CardBody, Reveal } from "barua-ui";

<div className="docs-replay">
  <Button variant="tinted" size="sm" data-docs-replay="#reveal-box">Play</Button>
  <span className="b-caption b-text-secondary">or scroll inside the box</span>
</div>
<div className="docs-scrollbox" id="reveal-box">
  <div className="docs-scrollbox__spacer">scroll down ↓</div>
  <div className="b-stack b-gap-3">
    <Reveal className="b-card">
      <CardBody>Rises as it enters</CardBody>
    </Reveal>
    <Reveal className="b-card b-reveal--fade">
      <CardBody>
        <code>--fade</code>
      </CardBody>
    </Reveal>
    <Reveal className="b-card b-reveal--scale">
      <CardBody>
        <code>--scale</code>
      </CardBody>
    </Reveal>
    <Reveal className="b-card b-reveal--start">
      <CardBody>
        <code>--start</code>
        , from the leading edge
      </CardBody>
    </Reveal>
    <Reveal className="b-card b-reveal--end">
      <CardBody>
        <code>--end</code>
        , from the trailing edge
      </CardBody>
    </Reveal>
  </div>
  <div className="docs-scrollbox__spacer">scroll back up to replay ↑</div>
</div>
```

## Context menu

SwiftUI's contextMenu , on the platform's own event. Point any element at a .b-menu and a right-click — or a long press, which the browser reports as the same event — opens it where the pointer is.

- Documentation: https://ui.barua.tz/docs/interaction.html#context-menu
- Classes: `b-list` `b-list-item` `b-list-item__content` `b-list-item__subtitle` `b-list-item__title` `b-menu` `b-menu__item` `b-menu__item--danger` `b-menu__shortcut`

```html
<div class="b-list">
  <div class="b-list-item" data-b-contextmenu="#demo-context">
    <div class="b-list-item__content">
      <div class="b-list-item__title">Q3 invoice.pdf</div>
      <div class="b-list-item__subtitle">Right-click, or long-press on a touch screen</div>
    </div>
  </div>
</div>
<ul class="b-menu" id="demo-context" hidden>
  <li><button class="b-menu__item">Open<span class="b-menu__shortcut">⏎</span></button></li>
  <li><button class="b-menu__item">Rename<span class="b-menu__shortcut">⌘R</span></button></li>
  <li><button class="b-menu__item">Duplicate<span class="b-menu__shortcut">⌘D</span></button></li>
  <li><button class="b-menu__item b-menu__item--danger">Delete</button></li>
</ul>
```

```tsx
import { List, ListItem, Menu } from "barua-ui";

<List>
  <ListItem data-b-contextmenu="#demo-context">
    <div className="b-list-item__content">
      <div className="b-list-item__title">Q3 invoice.pdf</div>
      <div className="b-list-item__subtitle">Right-click, or long-press on a touch screen</div>
    </div>
  </ListItem>
</List>
<Menu id="demo-context" hidden>
  <li>
    <button className="b-menu__item">
      Open
      <span className="b-menu__shortcut">⏎</span>
    </button>
  </li>
  <li>
    <button className="b-menu__item">
      Rename
      <span className="b-menu__shortcut">⌘R</span>
    </button>
  </li>
  <li>
    <button className="b-menu__item">
      Duplicate
      <span className="b-menu__shortcut">⌘D</span>
    </button>
  </li>
  <li>
    <button className="b-menu__item b-menu__item--danger">Delete</button>
  </li>
</Menu>
```

## Rolling numbers

SwiftUI's contentTransition(.numericText()) . A figure that changes should travel to its new value rather than blink to it — on a dashboard the movement is what tells you something happened at all.

- Documentation: https://ui.barua.tz/docs/interaction.html#rolling-numbers
- Classes: `b-btn` `b-btn--sm` `b-btn--tinted` `b-code` `b-code__header` `b-gap-6` `b-hstack` `b-stack--wrap` `b-stat` `b-stat__label` `b-stat__value`

```html
<div class="docs-replay">
  <button class="b-btn b-btn--tinted b-btn--sm" data-docs-replay="#count-demo">Play</button>
</div>
<div class="b-hstack b-gap-6 b-stack--wrap">
  <div class="b-stat">
    <span class="b-stat__label">Messages sent</span>
    <span class="b-stat__value" data-b-count="12480" data-docs-from="0">0</span>
  </div>
  <div class="b-stat">
    <span class="b-stat__label">Outstanding</span>
    <span class="b-stat__value" data-b-count="4.2" data-docs-from="TZS 0.0M">TZS 0.0M</span>
  </div>
</div>
```

```tsx
import { Button, Stat } from "barua-ui";

<div className="docs-replay">
  <Button variant="tinted" size="sm" data-docs-replay="#count-demo">Play</Button>
</div>
<div className="b-hstack b-gap-6 b-stack--wrap">
  <Stat>
    <span className="b-stat__label">Messages sent</span>
    <span className="b-stat__value" data-b-count="12480" data-docs-from="0">0</span>
  </Stat>
  <Stat>
    <span className="b-stat__label">Outstanding</span>
    <span
      className="b-stat__value"
      data-b-count="4.2"
      data-docs-from="TZS 0.0M"
    >
      TZS 0.0M
    </span>
  </Stat>
</div>
```

