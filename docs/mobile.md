# Mobile — headers, tab bars, sheets, safe areas

Source: https://ui.barua.tz/docs/mobile.html
Rules and conventions: https://ui.barua.tz/llms.txt

## Mobile Header

.b-mobile-header is the sticky glass chrome at the top of a mobile view: a three-column __bar with a .b-back-btn at the start, a centered __title and an __action--end slot. One note on the demos on this page: mobile chrome is normally position: fixed or sticky , so each demo sits inside a phone-width frame and the component gets an inline position: static override to render inside it — drop the override in a real app.

- Documentation: https://ui.barua.tz/docs/mobile.html#mobile-header
- Classes: `b-back-btn` `b-btn` `b-btn--ghost` `b-icon-btn` `b-mobile-header` `b-mobile-header__action--end` `b-mobile-header__action--start` `b-mobile-header__bar` `b-mobile-header__large-title` `b-mobile-header__title`

```html
<header class="b-mobile-header" style="position: static">
  <div class="b-mobile-header__bar">
    <button class="b-back-btn b-mobile-header__action--start">Inbox</button>
    <div class="b-mobile-header__title">Message</div>
    <button class="b-btn b-icon-btn b-btn--ghost b-mobile-header__action--end" aria-label="Reply">
      <svg viewBox="0 0 20 20" fill="none"><path d="M8 5 3.5 9.5 8 14M3.5 9.5H12a4.5 4.5 0 0 1 4.5 4.5V16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </button>
  </div>
</header>
<div style="height: 4.5rem"></div>
```

```tsx
import { BackButton, Button } from "barua-ui";

<header className="b-mobile-header" style={{ position: "static" }}>
  <div className="b-mobile-header__bar">
    <BackButton className="b-mobile-header__action--start">Inbox</BackButton>
    <div className="b-mobile-header__title">Message</div>
    <Button
      icon
      variant="ghost"
      className="b-mobile-header__action--end"
      aria-label="Reply"
    >
      <svg viewBox="0 0 20 20" fill="none">
        <path d="M8 5 3.5 9.5 8 14M3.5 9.5H12a4.5 4.5 0 0 1 4.5 4.5V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Button>
  </div>
</header>
<div style={{ height: "4.5rem" }}></div>
```

## Mobile Navigation

Mobile navigation is a pattern, not one component. Follow the iOS conventions: the back button sits at the start of the header, is labelled with the previous screen's title (never just "Back"), and the current screen's title stays centered. Push deeper views onto a stack; switch top-level sections with the Bottom Tab Bar below. For overflow destinations, use the navigation drawer from the Navigation page, or the Mobile Menu as a full-screen list.

- Documentation: https://ui.barua.tz/docs/mobile.html#mobile-navigation

## Bottom Tab Bar

.b-bottomnav fixes a glass tab bar to the bottom edge with safe-area padding built in. Use three to five __item s, mark the current one with .is-active , and attach a .b-badge--count to an icon for unread counts.

- Documentation: https://ui.barua.tz/docs/mobile.html#bottom-tab-bar
- Classes: `b-badge` `b-badge--count` `b-bottomnav` `b-bottomnav__item`

```html
<div style="height: 4.5rem"></div>
<nav class="b-bottomnav" style="position: static" aria-label="Primary">
  <a class="b-bottomnav__item" href="#bottom-tab-bar">
    <svg viewBox="0 0 20 20" fill="none"><path d="M4 9.5 10 4l6 5.5V16a1 1 0 0 1-1 1h-3v-4H8v4H5a1 1 0 0 1-1-1V9.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
    Home
  </a>
  <a class="b-bottomnav__item is-active" href="#bottom-tab-bar" aria-current="page">
    <span style="position: relative; display: inline-flex">
      <svg viewBox="0 0 20 20" fill="none"><rect x="3" y="5" width="14" height="11" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="m4.5 7.5 5.5 4 5.5-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      <span class="b-badge b-badge--count" style="position: absolute; top: -0.4rem; inset-inline-end: -0.7rem">3</span>
    </span>
    Inbox
  </a>
  <a class="b-bottomnav__item" href="#bottom-tab-bar">
    <svg viewBox="0 0 20 20" fill="none"><circle cx="9" cy="9" r="5" stroke="currentColor" stroke-width="1.5"/><path d="m13 13 3.5 3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
    Search
  </a>
  <a class="b-bottomnav__item" href="#bottom-tab-bar">
    <svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="7" r="3" stroke="currentColor" stroke-width="1.5"/><path d="M4.5 16.5a5.5 5.5 0 0
```

```tsx
import { Badge, BottomNav } from "barua-ui";

<div style={{ height: "4.5rem" }}></div>
<BottomNav style={{ position: "static" }} aria-label="Primary">
  <a className="b-bottomnav__item" href="#bottom-tab-bar">
    <svg viewBox="0 0 20 20" fill="none">
      <path d="M4 9.5 10 4l6 5.5V16a1 1 0 0 1-1 1h-3v-4H8v4H5a1 1 0 0 1-1-1V9.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
    Home
  </a>
  <a
    className="b-bottomnav__item is-active"
    href="#bottom-tab-bar"
    aria-current="page"
  >
    <span style={{ position: "relative", display: "inline-flex" }}>
      <svg viewBox="0 0 20 20" fill="none">
        <rect x="3" y="5" width="14" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="m4.5 7.5 5.5 4 5.5-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <Badge
        className="b-badge--count"
        style={{ position: "absolute", top: "-0.4rem", insetInlineEnd: "-0.7rem" }}
      >
        3
      </Badge>
    </span>
    Inbox
  </a>
  <a className="b-bottomnav__item" href="#bottom-tab-bar">
    <svg viewBox="0 0 20 20" fill="none">
      <circle cx="9" cy="9" r="5" stroke="currentColor" strokeWidth="1.5" />
      <path d="m13 13 3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
    Search
  </a>
  <a className="b-bottomnav__item" href="#bottom-tab-bar">
    <svg viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  </a>
</BottomNav>
```

## Bottom Sheet

The full .b-bottom-sheet — a <dialog> that springs up from the bottom edge with a scrim — is documented on the Overlays page. Shown here statically inside the frame: a __grabber pill on top of a __body list of actions.

- Documentation: https://ui.barua.tz/docs/mobile.html#bottom-sheet
- Classes: `b-bottom-sheet` `b-bottom-sheet__body` `b-bottom-sheet__grabber` `b-list` `b-list--plain` `b-list-item` `b-list-item--interactive` `b-list-item__content` `b-list-item__leading` `b-list-item__title`

```html
<div style="height: 3rem"></div>
<dialog class="b-bottom-sheet" open style="position: static; width: 100%">
  <div class="b-bottom-sheet__grabber"></div>
  <div class="b-bottom-sheet__body">
    <ul class="b-list b-list--plain">
      <li class="b-list-item b-list-item--interactive">
        <span class="b-list-item__leading">
          <svg viewBox="0 0 20 20" fill="none"><path d="M8 5 3.5 9.5 8 14M3.5 9.5H12a4.5 4.5 0 0 1 4.5 4.5V16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </span>
        <div class="b-list-item__content"><div class="b-list-item__title">Reply</div></div>
      </li>
      <li class="b-list-item b-list-item--interactive">
        <span class="b-list-item__leading">
          <svg viewBox="0 0 20 20" fill="none"><path d="M12 5l4.5 4.5L12 14M16.5 9.5H8A4.5 4.5 0 0 0 3.5 14V16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </span>
        <div class="b-list-item__content"><div class="b-list-item__title">Forward</div></div>
      </li>
      <li class="b-list-item b-list-item--interactive">
        <span class="b-list-item__leading">
          <svg viewBox="0 0 20 20" fill="none"><rect x="3" y="4" width="14" height="4" rx="1" stroke="currentColor" stroke-width="1.5"/><path d="M4.5 8v6.5A1.5 1.5 0 0 0 6 16h8a1.5 1.5 0 0 0 1.5-1.5V8M8.5 11h3" str
```

```tsx
import { BottomSheet, List, ListItem } from "barua-ui";

<div style={{ height: "3rem" }}></div>
<BottomSheet open style={{ position: "static", width: "100%" }}>
  <div className="b-bottom-sheet__grabber"></div>
  <div className="b-bottom-sheet__body">
    <List plain>
      <ListItem interactive>
        <span className="b-list-item__leading">
          <svg viewBox="0 0 20 20" fill="none">
            <path d="M8 5 3.5 9.5 8 14M3.5 9.5H12a4.5 4.5 0 0 1 4.5 4.5V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <div className="b-list-item__content">
          <div className="b-list-item__title">Reply</div>
        </div>
      </ListItem>
      <ListItem interactive>
        <span className="b-list-item__leading">
          <svg viewBox="0 0 20 20" fill="none">
            <path d="M12 5l4.5 4.5L12 14M16.5 9.5H8A4.5 4.5 0 0 0 3.5 14V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <div className="b-list-item__content">
          <div className="b-list-item__title">Forward</div>
        </div>
      </ListItem>
      <ListItem interactive>
        <span className="b-list-item__leading">
          <svg viewBox="0 0 20 20" fill="none">
            <rect x="3" y="4" width="14" height="4" rx="1" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </span>
      </ListItem>
    </List>
  </div>
</BottomSheet>
```

## Mobile Menu

.b-mobile-menu is a full-width list of big, thumb-sized rows — each at least the 44px touch target tall. Use it inside a drawer or a full-screen sheet; mark the current destination with .is-active .

- Documentation: https://ui.barua.tz/docs/mobile.html#mobile-menu
- Classes: `b-mobile-menu`

```html
<ul class="b-mobile-menu">
  <li>
    <a class="is-active" href="#mobile-menu" aria-current="page">
      <svg viewBox="0 0 20 20" fill="none" width="20" height="20"><rect x="3" y="5" width="14" height="11" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="m4.5 7.5 5.5 4 5.5-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      Inbox
    </a>
  </li>
  <li>
    <a href="#mobile-menu">
      <svg viewBox="0 0 20 20" fill="none" width="20" height="20"><path d="m10 3 2.1 4.4 4.9.6-3.6 3.3.9 4.7L10 13.7 5.7 16l.9-4.7L3 8l4.9-.6L10 3Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
      Starred
    </a>
  </li>
  <li>
    <a href="#mobile-menu">
      <svg viewBox="0 0 20 20" fill="none" width="20" height="20"><path d="M6 3h6l3 3v11H6V3Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M12 3v3h3" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
      Drafts
    </a>
  </li>
  <li>
    <a href="#mobile-menu">
      <svg viewBox="0 0 20 20" fill="none" width="20" height="20"><rect x="3" y="4" width="14" height="4" rx="1" stroke="currentColor" stroke-width="1.5"/><path d="M4.5 8v6.5A1.5 1.5 0 0 0 6 16h8a1.5 1.5 0 0 0 1.5-1.5V8M8.5 11h3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
      Archive
    </a>
  </li>
  <li>
    <a
```

## Mobile Toolbar

.b-mobile-toolbar is the bottom action bar for the current screen — glass, hairline on top, safe-area padding below, and icon buttons bumped up to the large control size for easy reach.

- Documentation: https://ui.barua.tz/docs/mobile.html#mobile-toolbar
- Classes: `b-btn` `b-btn--ghost` `b-icon-btn` `b-mobile-toolbar`

```html
</div>
<div class="b-mobile-toolbar" style="position: static" role="toolbar" aria-label="Message actions">
  <button class="b-btn b-icon-btn b-btn--ghost" aria-label="Reply">
    <svg viewBox="0 0 20 20" fill="none"><path d="M8 5 3.5 9.5 8 14M3.5 9.5H12a4.5 4.5 0 0 1 4.5 4.5V16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
  </button>
  <button class="b-btn b-icon-btn b-btn--ghost" aria-label="Archive">
    <svg viewBox="0 0 20 20" fill="none"><rect x="3" y="4" width="14" height="4" rx="1" stroke="currentColor" stroke-width="1.5"/><path d="M4.5 8v6.5A1.5 1.5 0 0 0 6 16h8a1.5 1.5 0 0 0 1.5-1.5V8M8.5 11h3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
  </button>
  <button class="b-btn b-icon-btn b-btn--ghost" aria-label="Flag">
    <svg viewBox="0 0 20 20" fill="none"><path d="M5 17V4h9.5l-2 3.5 2 3.5H5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
  </button>
  <button class="b-btn b-icon-btn b-btn--ghost" aria-label="Delete">
    <svg viewBox="0 0 20 20" fill="none"><path d="M4 6h12M8 6V4.5A1.5 1.5 0 0 1 9.5 3h1A1.5 1.5 0 0 1 12 4.5V6m2.5 0-.7 9.1A1.5 1.5 0 0 1 12.3 16H7.7a1.5 1.5 0 0 1-1.5-.9L5.5 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
  </button>
```

```tsx
import { Button } from "barua-ui";

<div
  className="b-mobile-toolbar"
  style={{ position: "static" }}
  role="toolbar"
  aria-label="Message actions"
>
  <Button icon variant="ghost" aria-label="Reply">
    <svg viewBox="0 0 20 20" fill="none">
      <path d="M8 5 3.5 9.5 8 14M3.5 9.5H12a4.5 4.5 0 0 1 4.5 4.5V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </Button>
  <Button icon variant="ghost" aria-label="Archive">
    <svg viewBox="0 0 20 20" fill="none">
      <rect x="3" y="4" width="14" height="4" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4.5 8v6.5A1.5 1.5 0 0 0 6 16h8a1.5 1.5 0 0 0 1.5-1.5V8M8.5 11h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  </Button>
  <Button icon variant="ghost" aria-label="Flag">
    <svg viewBox="0 0 20 20" fill="none">
      <path d="M5 17V4h9.5l-2 3.5 2 3.5H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </Button>
  <Button icon variant="ghost" aria-label="Delete">
    <svg viewBox="0 0 20 20" fill="none">
      <path d="M4 6h12M8 6V4.5A1.5 1.5 0 0 1 9.5 3h1A1.5 1.5 0 0 1 12 4.5V6m2.5 0-.7 9.1A1.5 1.5 0 0 1 12.3 16H7.7a1.5 1.5 0 0 1-1.5-.9L5.5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  </Button>
</div>
```

## Swipe Actions

.b-swipe is a CSS-only take on the iOS swipe-to-act row: a horizontal scroller with scroll-snap-type: x mandatory . The __content row fills 100% of the width and snaps to the start; the __actions sit just off-screen and snap to the end. Dragging left reveals them, and the scroll snap makes the row rest either fully closed or fully open — try it, the demo below actually scrolls.

- Documentation: https://ui.barua.tz/docs/mobile.html#swipe-actions
- Classes: `b-avatar` `b-list-item` `b-list-item__content` `b-list-item__subtitle` `b-list-item__title` `b-swipe` `b-swipe__actions` `b-swipe__content`

```html
<div class="b-swipe">
  <div class="b-swipe__content b-list-item">
    <span class="b-avatar">AK</span>
    <div class="b-list-item__content">
      <div class="b-list-item__title">Amina Kassim</div>
      <div class="b-list-item__subtitle">Q3 launch review — moved to Thursday, can you make it?</div>
    </div>
  </div>
  <div class="b-swipe__actions">
    <button class="is-flag">
      <svg viewBox="0 0 20 20" fill="none"><path d="M5 17V4h9.5l-2 3.5 2 3.5H5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      Flag
    </button>
    <button class="is-danger">
      <svg viewBox="0 0 20 20" fill="none"><path d="M4 6h12M8 6V4.5A1.5 1.5 0 0 1 9.5 3h1A1.5 1.5 0 0 1 12 4.5V6m2.5 0-.7 9.1A1.5 1.5 0 0 1 12.3 16H7.7a1.5 1.5 0 0 1-1.5-.9L5.5 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
      Delete
    </button>
  </div>
</div>
```

```tsx
import { Avatar, ListItem } from "barua-ui";

<div className="b-swipe">
  <ListItem className="b-swipe__content">
    <Avatar>AK</Avatar>
    <div className="b-list-item__content">
      <div className="b-list-item__title">Amina Kassim</div>
      <div className="b-list-item__subtitle">Q3 launch review — moved to Thursday, can you make it?</div>
    </div>
  </ListItem>
  <div className="b-swipe__actions">
    <button className="is-flag">
      <svg viewBox="0 0 20 20" fill="none">
        <path d="M5 17V4h9.5l-2 3.5 2 3.5H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Flag
    </button>
    <button className="is-danger">
      <svg viewBox="0 0 20 20" fill="none">
        <path d="M4 6h12M8 6V4.5A1.5 1.5 0 0 1 9.5 3h1A1.5 1.5 0 0 1 12 4.5V6m2.5 0-.7 9.1A1.5 1.5 0 0 1 12.3 16H7.7a1.5 1.5 0 0 1-1.5-.9L5.5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      Delete
    </button>
  </div>
</div>
```

## Pull to Refresh

.b-ptr is the visual affordance above a list. It sits at height: 0 until your scroll handler adds a state class: .is-pulling springs it open to its full height as the user drags, .is-ready rotates the __arrow 180° to signal "release to refresh", and .is-refreshing swaps the arrow for a spinner while data loads. Shown here frozen in the refreshing state.

- Documentation: https://ui.barua.tz/docs/mobile.html#pull-to-refresh
- Classes: `b-avatar` `b-avatar--sm` `b-list` `b-list--plain` `b-list-item` `b-list-item__content` `b-list-item__subtitle` `b-list-item__title` `b-ptr` `b-spinner` `b-spinner--sm`

```html
<div class="b-ptr is-refreshing">
  <span class="b-spinner b-spinner--sm"></span>
  Refreshing…
</div>
<ul class="b-list b-list--plain">
  <li class="b-list-item">
    <span class="b-avatar b-avatar--sm">JM</span>
    <div class="b-list-item__content">
      <div class="b-list-item__title">Joseph Mwangi</div>
      <div class="b-list-item__subtitle">Invoice #2214 approved</div>
    </div>
  </li>
  <li class="b-list-item">
    <span class="b-avatar b-avatar--sm">ZH</span>
    <div class="b-list-item__content">
      <div class="b-list-item__title">Zawadi Hassan</div>
      <div class="b-list-item__subtitle">Design tokens are ready for review</div>
    </div>
  </li>
</ul>
```

```tsx
import { Avatar, List, ListItem, Spinner } from "barua-ui";

<div className="b-ptr is-refreshing">
  <Spinner size="sm"></Spinner>
  Refreshing…
</div>
<List plain>
  <ListItem>
    <Avatar className="b-avatar--sm">JM</Avatar>
    <div className="b-list-item__content">
      <div className="b-list-item__title">Joseph Mwangi</div>
      <div className="b-list-item__subtitle">Invoice #2214 approved</div>
    </div>
  </ListItem>
  <ListItem>
    <Avatar className="b-avatar--sm">ZH</Avatar>
    <div className="b-list-item__content">
      <div className="b-list-item__title">Zawadi Hassan</div>
      <div className="b-list-item__subtitle">Design tokens are ready for review</div>
    </div>
  </ListItem>
</List>
```

## Touch Target

Small controls stay small visually but should never be small to a thumb. The .b-touch-target utility overlays an invisible ::after hit area of at least var(--b-touch-target) — 44px — centered on the control, so a compact close button still catches an imprecise tap. The button below renders at its extra-small size; the whole 44×44 area around it is pressable.

- Documentation: https://ui.barua.tz/docs/mobile.html#touch-target
- Classes: `b-badge` `b-btn` `b-btn--xs` `b-icon-btn` `b-touch-target`

```html
<button class="b-btn b-icon-btn b-btn--xs b-touch-target" aria-label="Dismiss">
  <svg viewBox="0 0 20 20" fill="none" width="12" height="12"><path d="m5 5 10 10M15 5 5 15" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
</button>
<span class="b-badge">← 44×44 hit area around a tiny button</span>
```

```tsx
import { Badge, Button } from "barua-ui";

<Button icon size="xs" className="b-touch-target" aria-label="Dismiss">
  <svg viewBox="0 0 20 20" fill="none" width="12" height="12">
    <path d="m5 5 10 10M15 5 5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
</Button>
<Badge>← 44×44 hit area around a tiny button</Badge>
```

## Safe Area

On notched and home-indicator phones, the OS reserves the screen edges and reports them as env(safe-area-inset-*) values. Barua's fixed chrome — .b-mobile-header , .b-bottomnav , .b-mobile-toolbar , .b-bottom-sheet — already pads with them. For your own bars, use .b-safe-area (all four edges) or .b-safe-bottom , which pads with max(var(--b-space-3), env(safe-area-inset-bottom)) so it still breathes on squared-off screens.

- Documentation: https://ui.barua.tz/docs/mobile.html#safe-area
- Classes: `b-btn` `b-btn--ghost` `b-code` `b-code__header` `b-icon-btn` `b-mobile-toolbar` `b-safe-bottom`

```html
</div>
<div class="b-mobile-toolbar b-safe-bottom" style="position: static" role="toolbar" aria-label="Editor actions">
  <button class="b-btn b-icon-btn b-btn--ghost" aria-label="Compose">
    <svg viewBox="0 0 20 20" fill="none"><path d="M13.5 3.5 16.5 6.5 7 16H4v-3l9.5-9.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
  </button>
  <button class="b-btn b-icon-btn b-btn--ghost" aria-label="Search">
    <svg viewBox="0 0 20 20" fill="none"><circle cx="9" cy="9" r="5" stroke="currentColor" stroke-width="1.5"/><path d="m13 13 3.5 3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
  </button>
  <button class="b-btn b-icon-btn b-btn--ghost" aria-label="More options">
    <svg viewBox="0 0 20 20" fill="currentColor"><circle cx="4.5" cy="10" r="1.4"/><circle cx="10" cy="10" r="1.4"/><circle cx="15.5" cy="10" r="1.4"/></svg>
  </button>
```

```tsx
import { Button } from "barua-ui";

<div
  className="b-mobile-toolbar b-safe-bottom"
  style={{ position: "static" }}
  role="toolbar"
  aria-label="Editor actions"
>
  <Button icon variant="ghost" aria-label="Compose">
    <svg viewBox="0 0 20 20" fill="none">
      <path d="M13.5 3.5 16.5 6.5 7 16H4v-3l9.5-9.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  </Button>
  <Button icon variant="ghost" aria-label="Search">
    <svg viewBox="0 0 20 20" fill="none">
      <circle cx="9" cy="9" r="5" stroke="currentColor" strokeWidth="1.5" />
      <path d="m13 13 3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  </Button>
  <Button icon variant="ghost" aria-label="More options">
    <svg viewBox="0 0 20 20" fill="currentColor">
      <circle cx="4.5" cy="10" r="1.4" />
      <circle cx="10" cy="10" r="1.4" />
      <circle cx="15.5" cy="10" r="1.4" />
    </svg>
  </Button>
</div>
```

## Collapsing Large Title

NavigationStack's signature move: the large title shrinks away as content scrolls, and the bar title fades in. Add data-b-collapse to a .b-mobile-header — barua.js watches the nearest scroll parent and toggles .is-collapsed .

- Documentation: https://ui.barua.tz/docs/mobile.html#collapsing-title
- Classes: `b-footnote` `b-mobile-header` `b-mobile-header__bar` `b-mobile-header__large-title` `b-mobile-header__title` `b-subheadline` `b-text-secondary` `b-text-tertiary`

```html
<header class="b-mobile-header" data-b-collapse style="position: sticky">
  <div class="b-mobile-header__bar">
    <span class="b-mobile-header__title">Inbox</span>
  </div>
  <h1 class="b-mobile-header__large-title">Inbox</h1>
</header>
<div style="padding: var(--b-space-4)">
  <p class="b-subheadline b-text-secondary">Scroll this panel — the large title collapses into the bar.</p>
  <div style="height: 30rem"></div>
  <p class="b-footnote b-text-tertiary">The end.</p>
</div>
```

```tsx
import { Footnote } from "barua-ui";

<header
  className="b-mobile-header"
  data-b-collapse=""
  style={{ position: "sticky" }}
>
  <div className="b-mobile-header__bar">
    <span className="b-mobile-header__title">Inbox</span>
  </div>
  <h1 className="b-mobile-header__large-title">Inbox</h1>
</header>
<div style={{ padding: "var(--b-space-4)" }}>
  <p className="b-subheadline b-text-secondary">Scroll this panel — the large title collapses into the bar.</p>
  <div style={{ height: "30rem" }}></div>
  <Footnote className="b-text-tertiary">The end.</Footnote>
</div>
```

