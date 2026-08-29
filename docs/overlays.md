# Overlays — modals, sheets, popovers, tooltips, lightbox

Source: https://ui.barua.tz/docs/overlays.html
Rules and conventions: https://ui.barua.tz/llms.txt

## Modal

A <dialog class="b-modal"> opened with showModal() . Any trigger with data-b-dialog="#id" opens it; anything inside carrying data-b-dialog-close closes it — no bespoke JS. Sizes: .b-modal--sm , the 28rem default, .b-modal--lg and .b-modal--xl . Add .b-modal--glass for a translucent material that blurs the content behind it.

- Documentation: https://ui.barua.tz/docs/overlays.html#modal
- Classes: `b-btn` `b-btn--primary` `b-modal` `b-modal__body` `b-modal__close` `b-modal__footer` `b-modal__header` `b-modal__title`

```html
<button class="b-btn b-btn--primary" data-b-dialog="#demo-modal">Open modal</button>
<dialog class="b-modal" id="demo-modal" aria-labelledby="demo-modal-title">
  <header class="b-modal__header">
    <h2 class="b-modal__title" id="demo-modal-title">Rename mailbox</h2>
    <button class="b-modal__close" data-b-dialog-close aria-label="Close">✕</button>
  </header>
  <div class="b-modal__body">
    <p>Choose a new name for this mailbox. Filters and rules that
    reference it will update automatically.</p>
  </div>
  <footer class="b-modal__footer">
    <button class="b-btn" data-b-dialog-close>Cancel</button>
    <button class="b-btn b-btn--primary" data-b-dialog-close>Rename</button>
  </footer>
</dialog>
```

```tsx
import { Button, Modal } from "barua-ui";

<Button variant="primary" data-b-dialog="#demo-modal">Open modal</Button>
<Modal id="demo-modal" aria-labelledby="demo-modal-title">
  <header className="b-modal__header">
    <h2 className="b-modal__title" id="demo-modal-title">Rename mailbox</h2>
    <button className="b-modal__close" data-b-dialog-close="" aria-label="Close">✕</button>
  </header>
  <div className="b-modal__body">
    <p>Choose a new name for this mailbox. Filters and rules that reference it will update automatically.</p>
  </div>
  <footer className="b-modal__footer">
    <Button data-b-dialog-close="">Cancel</Button>
    <Button variant="primary" data-b-dialog-close="">Rename</Button>
  </footer>
</Modal>
```

## Dialog vs Modal

One element, two behaviours. <dialog> opened with showModal() is modal : it sits in the browser's top layer, renders a ::backdrop scrim, and blocks the page behind it. The same element opened with show() is a non-modal dialog — an inline panel the user can ignore, with no backdrop, no focus trap and no Esc handling. Barua styles both from the same .b-modal class.

- Documentation: https://ui.barua.tz/docs/overlays.html#dialog-vs-modal

## Alert Dialog

A compact, centered confirmation in the iOS style: title, one-sentence description, then full-width stacked actions separated by hairlines. Mark the destructive choice with .is-destructive and the preferred one with .is-primary . Add .b-alert-dialog__actions--row for the two-button side-by-side arrangement, shown statically below with show() -style inline rendering.

- Documentation: https://ui.barua.tz/docs/overlays.html#alert-dialog
- Classes: `b-alert-dialog` `b-alert-dialog__actions` `b-alert-dialog__actions--row` `b-alert-dialog__desc` `b-alert-dialog__title` `b-btn` `b-btn--danger-tinted` `b-modal` `b-modal__body`

```html
<button class="b-btn b-btn--danger-tinted" data-b-dialog="#demo-alert">Delete draft…</button>
<dialog class="b-modal b-alert-dialog" id="demo-alert" aria-labelledby="demo-alert-title" aria-describedby="demo-alert-desc">
  <div class="b-modal__body">
    <h2 class="b-alert-dialog__title" id="demo-alert-title">Delete draft?</h2>
    <p class="b-alert-dialog__desc" id="demo-alert-desc">This draft will be removed from all your devices. You can't undo this.</p>
  </div>
  <div class="b-alert-dialog__actions">
    <button class="is-destructive" data-b-dialog-close>Delete draft</button>
    <button class="is-primary" data-b-dialog-close>Keep editing</button>
  </div>
</dialog>
```

```tsx
import { Button, Modal } from "barua-ui";

<Button variant="danger-tinted" data-b-dialog="#demo-alert">Delete draft…</Button>
<Modal
  className="b-alert-dialog"
  id="demo-alert"
  aria-labelledby="demo-alert-title"
  aria-describedby="demo-alert-desc"
>
  <div className="b-modal__body">
    <h2 className="b-alert-dialog__title" id="demo-alert-title">Delete draft?</h2>
    <p className="b-alert-dialog__desc" id="demo-alert-desc">This draft will be removed from all your devices. You can't undo this.</p>
  </div>
  <div className="b-alert-dialog__actions">
    <button className="is-destructive" data-b-dialog-close="">Delete draft</button>
    <button className="is-primary" data-b-dialog-close="">Keep editing</button>
  </div>
</Modal>
```

## Action Sheet

SwiftUI's confirmationDialog : a bottom-anchored glass stack of choices with a separate Cancel group. Destructive choices take .is-destructive . Built on native <dialog> like every Barua overlay.

- Documentation: https://ui.barua.tz/docs/overlays.html#action-sheet
- Classes: `b-action-sheet` `b-action-sheet__cancel` `b-action-sheet__group` `b-action-sheet__title` `b-btn`

```html
<button class="b-btn" data-b-dialog="#demo-action-sheet">Delete conversation…</button>
<dialog class="b-action-sheet" id="demo-action-sheet" aria-label="Delete conversation">
  <div class="b-action-sheet__group">
    <p class="b-action-sheet__title">This conversation will be removed from all your devices.</p>
    <button class="is-destructive" data-b-dialog-close>Delete for everyone</button>
    <button data-b-dialog-close>Archive instead</button>
  </div>
  <div class="b-action-sheet__group b-action-sheet__cancel">
    <button data-b-dialog-close>Cancel</button>
  </div>
</dialog>
```

```tsx
import { ActionSheet, Button } from "barua-ui";

<Button data-b-dialog="#demo-action-sheet">Delete conversation…</Button>
<ActionSheet id="demo-action-sheet" aria-label="Delete conversation">
  <div className="b-action-sheet__group">
    <p className="b-action-sheet__title">This conversation will be removed from all your devices.</p>
    <button className="is-destructive" data-b-dialog-close="">Delete for everyone</button>
    <button data-b-dialog-close="">Archive instead</button>
  </div>
  <div className="b-action-sheet__group b-action-sheet__cancel">
    <button data-b-dialog-close="">Cancel</button>
  </div>
</ActionSheet>
```

## Sheet

A full-height panel that springs in from the trailing edge — the macOS/iPadOS inspector pattern. It is still a <dialog> , so it gets the scrim, focus trap and Esc handling of a modal while reading as a side panel.

- Documentation: https://ui.barua.tz/docs/overlays.html#sheet
- Classes: `b-btn` `b-modal__close` `b-modal__title` `b-sheet` `b-sheet__body` `b-sheet__header`

```html
<button class="b-btn" data-b-dialog="#demo-sheet">Open sheet</button>
<dialog class="b-sheet" id="demo-sheet" aria-labelledby="demo-sheet-title">
  <header class="b-sheet__header">
    <h2 class="b-modal__title" id="demo-sheet-title">Message details</h2>
    <button class="b-modal__close" data-b-dialog-close aria-label="Close">✕</button>
  </header>
  <div class="b-sheet__body">
    <p>From <strong>Amina Otieno</strong> · Today at 09:41</p>
    <p>Encrypted in transit · Signed · 2 attachments</p>
    <p>Sheets suit secondary detail and editing tasks that relate to
    the content behind them — the page stays visible under the
    scrim to preserve context.</p>
  </div>
</dialog>
```

```tsx
import { Button, Sheet } from "barua-ui";

<Button data-b-dialog="#demo-sheet">Open sheet</Button>
<Sheet id="demo-sheet" aria-labelledby="demo-sheet-title">
  <header className="b-sheet__header">
    <h2 className="b-modal__title" id="demo-sheet-title">Message details</h2>
    <button className="b-modal__close" data-b-dialog-close="" aria-label="Close">✕</button>
  </header>
  <div className="b-sheet__body">
    <p>
      From
      <strong>Amina Otieno</strong>
      · Today at 09:41
    </p>
    <p>Encrypted in transit · Signed · 2 attachments</p>
    <p>Sheets suit secondary detail and editing tasks that relate to the content behind them — the page stays visible under the scrim to preserve context.</p>
  </div>
</Sheet>
```

## Bottom Sheet

Slides up from the bottom edge on a thick glass material, with a grabber affordance and safe-area padding. This is the preferred modal surface on mobile — thumb-reachable, dismissible, and familiar from every iOS share sheet.

- Documentation: https://ui.barua.tz/docs/overlays.html#bottom-sheet
- Classes: `b-bottom-sheet` `b-bottom-sheet__body` `b-bottom-sheet__grabber` `b-btn` `b-btn--block` `b-btn--primary` `b-modal__title`

```html
<button class="b-btn" data-b-dialog="#demo-bottom-sheet">Open bottom sheet</button>
<dialog class="b-bottom-sheet" id="demo-bottom-sheet" aria-labelledby="demo-bottom-sheet-title">
  <div class="b-bottom-sheet__grabber" aria-hidden="true"></div>
  <div class="b-bottom-sheet__body">
    <h2 class="b-modal__title" id="demo-bottom-sheet-title">Move to…</h2>
    <p>Pick a destination mailbox. On phone-width layouts, prefer a
    bottom sheet over a centered modal for any picker or short
    form.</p>
    <button class="b-btn b-btn--primary b-btn--block" data-b-dialog-close>Done</button>
  </div>
</dialog>
```

```tsx
import { BottomSheet, Button } from "barua-ui";

<Button data-b-dialog="#demo-bottom-sheet">Open bottom sheet</Button>
<BottomSheet id="demo-bottom-sheet" aria-labelledby="demo-bottom-sheet-title">
  <div className="b-bottom-sheet__grabber" aria-hidden="true"></div>
  <div className="b-bottom-sheet__body">
    <h2 className="b-modal__title" id="demo-bottom-sheet-title">Move to…</h2>
    <p>Pick a destination mailbox. On phone-width layouts, prefer a bottom sheet over a centered modal for any picker or short form.</p>
    <Button variant="primary" block data-b-dialog-close="">Done</Button>
  </div>
</BottomSheet>
```

## Sheet Detents

SwiftUI's presentationDetents for the bottom sheet: .b-bottom-sheet--medium caps the sheet at half the viewport, --large at 92%. The default remains content-sized up to 85%.

- Documentation: https://ui.barua.tz/docs/overlays.html#sheet-detents
- Classes: `b-bottom-sheet` `b-bottom-sheet--medium` `b-bottom-sheet__body` `b-bottom-sheet__grabber` `b-btn` `b-btn--block` `b-btn--primary` `b-headline` `b-subheadline` `b-text-secondary`

```html
<button class="b-btn" data-b-dialog="#demo-detent">Open medium sheet</button>
<dialog class="b-bottom-sheet b-bottom-sheet--medium" id="demo-detent" aria-label="Filters">
  <div class="b-bottom-sheet__grabber" aria-hidden="true"></div>
  <div class="b-bottom-sheet__body">
    <h3 class="b-headline">Filters</h3>
    <p class="b-subheadline b-text-secondary">A medium-detent sheet holds to half the screen.</p>
    <button class="b-btn b-btn--primary b-btn--block" data-b-dialog-close>Done</button>
  </div>
</dialog>
```

```tsx
import { BottomSheet, Button } from "barua-ui";

<Button data-b-dialog="#demo-detent">Open medium sheet</Button>
<BottomSheet
  className="b-bottom-sheet--medium"
  id="demo-detent"
  aria-label="Filters"
>
  <div className="b-bottom-sheet__grabber" aria-hidden="true"></div>
  <div className="b-bottom-sheet__body">
    <h3 className="b-headline">Filters</h3>
    <p className="b-subheadline b-text-secondary">A medium-detent sheet holds to half the screen.</p>
    <Button variant="primary" block data-b-dialog-close="">Done</Button>
  </div>
</BottomSheet>
```

## Popover

A light glass card for transient detail, built on the native Popover API: popovers open centered in the viewport by default — add .b-popover--anchored (or .b-menu--anchored ) only when you position one against its trigger yourself. Point popovertarget at the popover's id and the browser handles toggling, light-dismiss and Esc — zero JS. Where you need guaranteed positioning without anchor support, wrap trigger and card in .b-popover-anchor to pin the card under its anchor (shown statically below).

- Documentation: https://ui.barua.tz/docs/overlays.html#popover
- Classes: `b-avatar` `b-avatar--xs` `b-btn` `b-btn--ghost` `b-btn--primary` `b-btn--sm` `b-btn--tinted` `b-field` `b-gap-3` `b-input` `b-input--sm` `b-label` `b-popover` `b-popover--arrow-bottom` `b-popover--card` `b-popover-anchor` `b-popover__body` `b-popover__footer` `b-popover__header` `b-popover__title` `b-stack` `b-switch`

```html
<button class="b-btn" popovertarget="p1">Storage details</button>
<div class="b-popover" popover id="p1">
  <div class="b-popover__title">Storage</div>
  8.2 GB of 15 GB used. Attachments account for most of it — sweep
  anything older than a year.
</div>
```

```tsx
import { Button, Popover } from "barua-ui";

<Button popovertarget="p1">Storage details</Button>
<Popover popover="" id="p1">
  <div className="b-popover__title">Storage</div>
  8.2 GB of 15 GB used. Attachments account for most of it — sweep anything older than a year.
</Popover>
```

## Tooltip

CSS-only. Add .b-tooltip-host and a data-tooltip label to any button or link; the tip fades in above after a 350ms delay so it never flickers during casual mouse travel. Use .b-tooltip-host--bottom when the control sits near the top of the viewport.

- Documentation: https://ui.barua.tz/docs/overlays.html#tooltip
- Classes: `b-btn` `b-icon-btn` `b-link` `b-tooltip-host` `b-tooltip-host--bottom`

```html
<button class="b-btn b-icon-btn b-tooltip-host" data-tooltip="Archive conversation" aria-label="Archive conversation">
  <svg viewBox="0 0 20 20" fill="none"><rect x="3" y="4" width="14" height="4" rx="1" stroke="currentColor" stroke-width="1.5"/><path d="M4.5 8v6.5A1.5 1.5 0 0 0 6 16h8a1.5 1.5 0 0 0 1.5-1.5V8M8.5 11h3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
</button>
<button class="b-btn b-tooltip-host" data-tooltip="Sends in ~3 seconds">Send later</button>
<a class="b-link b-tooltip-host b-tooltip-host--bottom" data-tooltip="Opens keyboard reference" href="#tooltip">Shortcuts</a>
```

```tsx
import { Link, Tooltip } from "barua-ui";

<Tooltip
  className="b-btn b-icon-btn"
  data-tooltip="Archive conversation"
  aria-label="Archive conversation"
>
  <svg viewBox="0 0 20 20" fill="none">
    <rect x="3" y="4" width="14" height="4" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <path d="M4.5 8v6.5A1.5 1.5 0 0 0 6 16h8a1.5 1.5 0 0 0 1.5-1.5V8M8.5 11h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
</Tooltip>
<Tooltip className="b-btn" data-tooltip="Sends in ~3 seconds">Send later</Tooltip>
<Link
  className="b-tooltip-host b-tooltip-host--bottom"
  data-tooltip="Opens keyboard reference"
  href="#tooltip"
>
  Shortcuts
</Link>
```

## Hover Card

A richer preview that appears when hovering or focusing a reference to a person or object — GitHub-style. Wrap the link in .b-hover-card-host ; the card fades in below after a 250ms delay and stays while hovered.

- Documentation: https://ui.barua.tz/docs/overlays.html#hover-card
- Classes: `b-avatar` `b-avatar--lg` `b-badge` `b-hover-card` `b-hover-card-host` `b-link`

```html
<div>
  Assigned to
  <span class="b-hover-card-host">
    <a class="b-link" href="#hover-card">@amina</a>
    <div class="b-hover-card">
      <div style="display: flex; gap: 0.75rem; align-items: center;">
        <div class="b-avatar b-avatar--lg">AO</div>
        <div>
          <strong>Amina Otieno</strong><br>
          <span class="b-badge">Platform team</span>
        </div>
      </div>
      <p style="margin: 0.75rem 0 0;">Nairobi · joined 2021<br>412 threads · 38 shared labels</p>
    </div>
  </span>
  for review.
</div>
```

```tsx
import { Avatar, Badge, HoverCard, HoverCardHost, Link } from "barua-ui";

<div>
  Assigned to
  <HoverCardHost>
    <Link href="#hover-card">@amina</Link>
    <HoverCard>
      <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
        <Avatar className="b-avatar--lg">AO</Avatar>
        <div>
          <strong>Amina Otieno</strong>
          <br />
          <Badge>Platform team</Badge>
        </div>
      </div>
      <p style={{ margin: "0.75rem 0 0" }}>
        Nairobi · joined 2021
        <br />
        412 threads · 38 shared labels
      </p>
    </HoverCard>
  </HoverCardHost>
  for review.
</div>
```

## Dropdown

Dropdowns belong to the menu family documented in Navigation : a zero-JS <details class="b-dropdown"> disclosure holding a .b-menu . One compact demo here for completeness.

- Documentation: https://ui.barua.tz/docs/overlays.html#dropdown
- Classes: `b-btn` `b-dropdown` `b-menu` `b-menu__item`

```html
<details class="b-dropdown">
  <summary class="b-btn">Sort by
    <svg viewBox="0 0 20 20" fill="none" width="14" height="14"><path d="m5 8 5 5 5-5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
  </summary>
  <ul class="b-menu">
    <li><button class="b-menu__item is-active">Newest first</button></li>
    <li><button class="b-menu__item">Oldest first</button></li>
    <li><button class="b-menu__item">Sender A–Z</button></li>
  </ul>
</details>
```

```tsx
import { Button, Dropdown, Menu } from "barua-ui";

<Dropdown>
  <Button>
    Sort by
    <svg viewBox="0 0 20 20" fill="none" width="14" height="14">
      <path d="m5 8 5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </Button>
  <Menu>
    <li>
      <button className="b-menu__item is-active">Newest first</button>
    </li>
    <li>
      <button className="b-menu__item">Oldest first</button>
    </li>
    <li>
      <button className="b-menu__item">Sender A–Z</button>
    </li>
  </Menu>
</Dropdown>
```

## Context Menu

Right-click menus reuse .b-menu unchanged — see Navigation for menu items, shortcuts, separators and danger rows. Position it at the pointer with your own contextmenu handler; the surface is shown statically here.

- Documentation: https://ui.barua.tz/docs/overlays.html#context-menu
- Classes: `b-menu` `b-menu__item` `b-menu__item--danger` `b-menu__separator` `b-menu__shortcut`

```html
<ul class="b-menu">
  <li><button class="b-menu__item">Reply<span class="b-menu__shortcut">R</span></button></li>
  <li><button class="b-menu__item">Forward<span class="b-menu__shortcut">F</span></button></li>
  <li><button class="b-menu__item">Mark as unread<span class="b-menu__shortcut">⇧U</span></button></li>
  <li><hr class="b-menu__separator"></li>
  <li><button class="b-menu__item b-menu__item--danger">Delete<span class="b-menu__shortcut">⌫</span></button></li>
</ul>
```

```tsx
import { Menu, MenuSeparator } from "barua-ui";

<Menu>
  <li>
    <button className="b-menu__item">
      Reply
      <span className="b-menu__shortcut">R</span>
    </button>
  </li>
  <li>
    <button className="b-menu__item">
      Forward
      <span className="b-menu__shortcut">F</span>
    </button>
  </li>
  <li>
    <button className="b-menu__item">
      Mark as unread
      <span className="b-menu__shortcut">⇧U</span>
    </button>
  </li>
  <li>
    <MenuSeparator />
  </li>
  <li>
    <button className="b-menu__item b-menu__item--danger">
      Delete
      <span className="b-menu__shortcut">⌫</span>
    </button>
  </li>
</Menu>
```

## Lightbox

A borderless <dialog> that centers media over a near-black blurred backdrop, with a floating close control pinned to the top corner. Drop an <img> straight in — a gradient placeholder stands in for one here.

- Documentation: https://ui.barua.tz/docs/overlays.html#lightbox
- Classes: `b-btn` `b-btn--ghost` `b-btn--glass` `b-btn--sm` `b-footnote` `b-headline` `b-lightbox` `b-lightbox__actions` `b-lightbox__caption` `b-lightbox__empty` `b-lightbox__frame` `b-modal__close`

```html
<button class="b-btn" data-b-dialog="#demo-lightbox">View attachment</button>
<dialog class="b-lightbox" id="demo-lightbox" aria-label="Attachment preview">
  <button class="b-modal__close" data-b-dialog-close aria-label="Close">✕</button>
  <div style="width:640px;max-width:80vw;aspect-ratio:16/10;background:linear-gradient(135deg,var(--b-color-accent),var(--b-color-purple));border-radius:var(--b-radius-lg)"></div>
  <p class="b-lightbox__caption">sunset-over-zanzibar.jpg · 4.2 MB</p>
</dialog>
```

```tsx
import { Button, Lightbox } from "barua-ui";

<Button data-b-dialog="#demo-lightbox">View attachment</Button>
<Lightbox id="demo-lightbox" aria-label="Attachment preview">
  <button className="b-modal__close" data-b-dialog-close="" aria-label="Close">✕</button>
  <div
    style={{ width: "640px", maxWidth: "80vw", aspectRatio: "16/10", background: "linear-gradient(135deg,var(--b-color-accent),var(--b-color-purple))", borderRadius: "var(--b-radius-lg)" }}
  ></div>
  <p className="b-lightbox__caption">sunset-over-zanzibar.jpg · 4.2 MB</p>
</Lightbox>
```

## Fullscreen Overlay

Takes over the entire viewport for immersive tasks — composing, onboarding, distraction-free reading. A top bar keeps the exit visible at all times; the body scrolls independently beneath it.

- Documentation: https://ui.barua.tz/docs/overlays.html#fullscreen-overlay
- Classes: `b-btn` `b-btn--tinted` `b-fullscreen` `b-fullscreen__bar` `b-fullscreen__body` `b-modal__close` `b-modal__title`

```html
<button class="b-btn b-btn--tinted" data-b-dialog="#demo-fullscreen">Enter focus mode</button>
<dialog class="b-fullscreen" id="demo-fullscreen" aria-labelledby="demo-fullscreen-title">
  <div class="b-fullscreen__bar">
    <h2 class="b-modal__title" id="demo-fullscreen-title">Focus mode</h2>
    <button class="b-modal__close" data-b-dialog-close aria-label="Exit focus mode">✕</button>
  </div>
  <div class="b-fullscreen__body">
    <p>Everything else fades away. Esc or the close control returns
    you exactly where you left off, with focus restored to the
    trigger.</p>
  </div>
</dialog>
```

```tsx
import { Button } from "barua-ui";

<Button variant="tinted" data-b-dialog="#demo-fullscreen">Enter focus mode</Button>
<dialog
  className="b-fullscreen"
  id="demo-fullscreen"
  aria-labelledby="demo-fullscreen-title"
>
  <div className="b-fullscreen__bar">
    <h2 className="b-modal__title" id="demo-fullscreen-title">Focus mode</h2>
    <button
      className="b-modal__close"
      data-b-dialog-close=""
      aria-label="Exit focus mode"
    >
      ✕
    </button>
  </div>
  <div className="b-fullscreen__body">
    <p>Everything else fades away. Esc or the close control returns you exactly where you left off, with focus restored to the trigger.</p>
  </div>
</dialog>
```

