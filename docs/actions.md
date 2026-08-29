# Actions — buttons, icon buttons, toolbars, links

Source: https://ui.barua.tz/docs/actions.html
Rules and conventions: https://ui.barua.tz/llms.txt

## Button

The workhorse. Default is a neutral filled button; add .b-btn--primary for the main action of a view — aim for one primary per view, like Apple does.

- Documentation: https://ui.barua.tz/docs/actions.html#button
- Classes: `b-btn` `b-btn--block` `b-btn--danger` `b-btn--danger-tinted` `b-btn--ghost` `b-btn--glass` `b-btn--lg` `b-btn--liquid` `b-btn--outline` `b-btn--pill` `b-btn--primary` `b-btn--sm` `b-btn--tinted` `b-btn--xl` `b-btn--xs`

```html
<button class="b-btn b-btn--primary">Continue</button>
<button class="b-btn b-btn--tinted">Duplicate</button>
<button class="b-btn">Default</button>
<button class="b-btn b-btn--outline">Outline</button>
<button class="b-btn b-btn--ghost">Ghost</button>
<button class="b-btn b-btn--glass">Glass</button>
<button class="b-btn b-btn--liquid">Liquid</button>
<button class="b-btn b-btn--danger">Delete</button>
<button class="b-btn b-btn--danger-tinted">Remove</button>
```

```tsx
import { Button } from "barua-ui";

<Button variant="primary">Continue</Button>
<Button variant="tinted">Duplicate</Button>
<Button>Default</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="glass">Glass</Button>
<Button variant="liquid">Liquid</Button>
<Button variant="danger">Delete</Button>
<Button variant="danger-tinted">Remove</Button>
```

## Icon Button

Square variant for icon-only actions. Always provide aria-label ; add .b-tooltip-host with data-tooltip for a hover hint.

- Documentation: https://ui.barua.tz/docs/actions.html#icon-button
- Classes: `b-btn` `b-btn--danger-tinted` `b-btn--ghost` `b-btn--primary` `b-btn--sm` `b-icon-btn` `b-tooltip-host`

```html
<button class="b-btn b-icon-btn b-btn--primary" aria-label="Compose">
  <svg viewBox="0 0 20 20" fill="none"><path d="M13.5 3.5 16.5 6.5 7 16H4v-3l9.5-9.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
</button>
<button class="b-btn b-icon-btn" aria-label="Archive">
  <svg viewBox="0 0 20 20" fill="none"><rect x="3" y="4" width="14" height="4" rx="1" stroke="currentColor" stroke-width="1.5"/><path d="M4.5 8v6.5A1.5 1.5 0 0 0 6 16h8a1.5 1.5 0 0 0 1.5-1.5V8M8.5 11h3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
</button>
<button class="b-btn b-icon-btn b-btn--ghost b-tooltip-host" data-tooltip="More options" aria-label="More options">
  <svg viewBox="0 0 20 20" fill="currentColor"><circle cx="4.5" cy="10" r="1.4"/><circle cx="10" cy="10" r="1.4"/><circle cx="15.5" cy="10" r="1.4"/></svg>
</button>
<button class="b-btn b-icon-btn b-btn--danger-tinted b-btn--sm" aria-label="Delete">
  <svg viewBox="0 0 20 20" fill="none"><path d="M4 6h12M8 6V4.5A1.5 1.5 0 0 1 9.5 3h1A1.5 1.5 0 0 1 12 4.5V6m2.5 0-.7 9.1A1.5 1.5 0 0 1 12.3 16H7.7a1.5 1.5 0 0 1-1.5-.9L5.5 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
</button>
```

```tsx
import { Button, Tooltip } from "barua-ui";

<Button icon variant="primary" aria-label="Compose">
  <svg viewBox="0 0 20 20" fill="none">
    <path d="M13.5 3.5 16.5 6.5 7 16H4v-3l9.5-9.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
</Button>
<Button icon aria-label="Archive">
  <svg viewBox="0 0 20 20" fill="none">
    <rect x="3" y="4" width="14" height="4" rx="1" stroke="currentColor" strokeWidth="1.5" />
    <path d="M4.5 8v6.5A1.5 1.5 0 0 0 6 16h8a1.5 1.5 0 0 0 1.5-1.5V8M8.5 11h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
</Button>
<Tooltip
  className="b-btn b-icon-btn b-btn--ghost"
  data-tooltip="More options"
  aria-label="More options"
>
  <svg viewBox="0 0 20 20" fill="currentColor">
    <circle cx="4.5" cy="10" r="1.4" />
    <circle cx="10" cy="10" r="1.4" />
    <circle cx="15.5" cy="10" r="1.4" />
  </svg>
</Tooltip>
<Button icon variant="danger-tinted" size="sm" aria-label="Delete">
  <svg viewBox="0 0 20 20" fill="none">
    <path d="M4 6h12M8 6V4.5A1.5 1.5 0 0 1 9.5 3h1A1.5 1.5 0 0 1 12 4.5V6m2.5 0-.7 9.1A1.5 1.5 0 0 1 12.3 16H7.7a1.5 1.5 0 0 1-1.5-.9L5.5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
</Button>
```

## Floating Action Button

.b-fab pins to the bottom-trailing corner with safe-area padding and an accent glow. Shown here inline with position: static for the demo.

- Documentation: https://ui.barua.tz/docs/actions.html#fab
- Classes: `b-btn` `b-fab` `b-fab--extended` `b-icon-btn`

```html
<button class="b-btn b-icon-btn b-fab" style="position: static" aria-label="New message">
  <svg viewBox="0 0 20 20" fill="none"><path d="M10 4v12M4 10h12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
</button>
<button class="b-btn b-fab b-fab--extended" style="position: static">
  <svg viewBox="0 0 20 20" fill="none"><path d="M10 4v12M4 10h12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
  Compose
</button>
```

```tsx
import { Fab } from "barua-ui";

<Fab
  className="b-btn b-icon-btn"
  style={{ position: "static" }}
  aria-label="New message"
>
  <svg viewBox="0 0 20 20" fill="none">
    <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
</Fab>
<Fab extended className="b-btn" style={{ position: "static" }}>
  <svg viewBox="0 0 20 20" fill="none">
    <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
  Compose
</Fab>
```

## Button Group

Related actions fused into one control. Use .b-btn-group--attached for a hairline between segments.

- Documentation: https://ui.barua.tz/docs/actions.html#button-group
- Classes: `b-btn` `b-btn--outline` `b-btn-group` `b-btn-group--attached`

```html
<div class="b-btn-group b-btn-group--attached" role="group" aria-label="Text alignment">
  <button class="b-btn">Left</button>
  <button class="b-btn is-active">Center</button>
  <button class="b-btn">Right</button>
</div>
<div class="b-btn-group" role="group" aria-label="Zoom">
  <button class="b-btn b-btn--outline">−</button>
  <button class="b-btn b-btn--outline">100%</button>
  <button class="b-btn b-btn--outline">+</button>
</div>
```

```tsx
import { Button, ButtonGroup } from "barua-ui";

<ButtonGroup attached role="group" aria-label="Text alignment">
  <Button>Left</Button>
  <Button active>Center</Button>
  <Button>Right</Button>
</ButtonGroup>
<ButtonGroup role="group" aria-label="Zoom">
  <Button variant="outline">−</Button>
  <Button variant="outline">100%</Button>
  <Button variant="outline">+</Button>
</ButtonGroup>
```

## Split Button

Primary action plus a chevron that opens related choices.

- Documentation: https://ui.barua.tz/docs/actions.html#split-button
- Classes: `b-btn` `b-btn--primary` `b-dropdown` `b-menu` `b-menu__item` `b-split-btn`

```html
<details class="b-dropdown">
  <summary>
    <span class="b-split-btn">
      <span class="b-btn b-btn--primary">Merge branch</span>
      <span class="b-btn b-btn--primary" aria-label="More merge options">
        <svg viewBox="0 0 20 20" fill="none" width="14" height="14"><path d="m5 8 5 5 5-5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </span>
    </span>
  </summary>
  <ul class="b-menu">
    <li><button class="b-menu__item">Merge commit</button></li>
    <li><button class="b-menu__item">Squash and merge</button></li>
    <li><button class="b-menu__item">Rebase and merge</button></li>
  </ul>
</details>
```

```tsx
import { Button, Dropdown, Menu, SplitButton } from "barua-ui";

<Dropdown>
  <summary>
    <SplitButton>
      <Button variant="primary">Merge branch</Button>
      <Button variant="primary" aria-label="More merge options">
        <svg viewBox="0 0 20 20" fill="none" width="14" height="14">
          <path d="m5 8 5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Button>
    </SplitButton>
  </summary>
  <Menu>
    <li>
      <button className="b-menu__item">Merge commit</button>
    </li>
    <li>
      <button className="b-menu__item">Squash and merge</button>
    </li>
    <li>
      <button className="b-menu__item">Rebase and merge</button>
    </li>
  </Menu>
</Dropdown>
```

## Toggle Button

A button with on/off state. Reflect state with aria-pressed ; the accent tint appears automatically.

- Documentation: https://ui.barua.tz/docs/actions.html#toggle-button
- Classes: `b-btn` `b-icon-btn` `b-toggle-btn`

```html
<button class="b-btn b-toggle-btn" aria-pressed="true" onclick="this.setAttribute('aria-pressed', this.getAttribute('aria-pressed')==='true'?'false':'true')">
  <svg viewBox="0 0 20 20" fill="none" width="16" height="16"><path d="M10 3.5c-4 0-6.5 4.5-6.5 6.5S6 16.5 10 16.5s6.5-4.5 6.5-6.5S14 3.5 10 3.5Z" stroke="currentColor" stroke-width="1.5"/><circle cx="10" cy="10" r="2.5" stroke="currentColor" stroke-width="1.5"/></svg>
  Watching
</button>
<button class="b-btn b-icon-btn b-toggle-btn" aria-pressed="false" aria-label="Bold" onclick="this.setAttribute('aria-pressed', this.getAttribute('aria-pressed')==='true'?'false':'true')"><strong>B</strong></button>
<button class="b-btn b-icon-btn b-toggle-btn" aria-pressed="true" aria-label="Italic" onclick="this.setAttribute('aria-pressed', this.getAttribute('aria-pressed')==='true'?'false':'true')"><em>I</em></button>
```

```tsx
import { ToggleButton } from "barua-ui";

<ToggleButton
  className="b-btn"
  aria-pressed="true"
  onclick="this.setAttribute('aria-pressed', this.getAttribute('aria-pressed')==='true'?'false':'true')"
>
  <svg viewBox="0 0 20 20" fill="none" width="16" height="16">
    <path d="M10 3.5c-4 0-6.5 4.5-6.5 6.5S6 16.5 10 16.5s6.5-4.5 6.5-6.5S14 3.5 10 3.5Z" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
  </svg>
  Watching
</ToggleButton>
<ToggleButton
  className="b-btn b-icon-btn"
  aria-pressed="false"
  aria-label="Bold"
  onclick="this.setAttribute('aria-pressed', this.getAttribute('aria-pressed')==='true'?'false':'true')"
>
  <strong>B</strong>
</ToggleButton>
<ToggleButton
  className="b-btn b-icon-btn"
  aria-pressed="true"
  aria-label="Italic"
  onclick="this.setAttribute('aria-pressed', this.getAttribute('aria-pressed')==='true'?'false':'true')"
>
  <em>I</em>
</ToggleButton>
```

## Link

Inline navigation. Plain <a> elements are accent colored by default; .b-link adds icon alignment and muted/danger variants.

- Documentation: https://ui.barua.tz/docs/actions.html#link
- Classes: `b-link` `b-link--danger` `b-link--muted`

```html
<a class="b-link" href="#link">View documentation
  <svg viewBox="0 0 20 20" fill="none" width="14" height="14"><path d="M7 5h8v8M15 5 5 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
</a>
<a class="b-link b-link--muted" href="#link">Secondary link</a>
<a class="b-link b-link--danger" href="#link">Remove account</a>
```

```tsx
import { Link } from "barua-ui";

<Link href="#link">
  View documentation
  <svg viewBox="0 0 20 20" fill="none" width="14" height="14">
    <path d="M7 5h8v8M15 5 5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
</Link>
<Link className="b-link--muted" href="#link">Secondary link</Link>
<Link className="b-link--danger" href="#link">Remove account</Link>
```

## Link Group

A wrapping row of related links, optionally dot-separated.

- Documentation: https://ui.barua.tz/docs/actions.html#link-group
- Classes: `b-link` `b-link--muted` `b-link-group`

```html
<nav class="b-link-group" aria-label="Footer">
  <a class="b-link b-link--muted" href="#link-group">Privacy</a>
  <a class="b-link b-link--muted" href="#link-group">Terms</a>
  <a class="b-link b-link--muted" href="#link-group">Status</a>
  <a class="b-link b-link--muted" href="#link-group">Contact</a>
</nav>
```

```tsx
import { Link, LinkGroup } from "barua-ui";

<LinkGroup aria-label="Footer">
  <Link className="b-link--muted" href="#link-group">Privacy</Link>
  <Link className="b-link--muted" href="#link-group">Terms</Link>
  <Link className="b-link--muted" href="#link-group">Status</Link>
  <Link className="b-link--muted" href="#link-group">Contact</Link>
</LinkGroup>
```

## Toolbar

Compact strip of small controls with hairline dividers. Add .b-toolbar--glass when it floats above content.

- Documentation: https://ui.barua.tz/docs/actions.html#toolbar
- Classes: `b-btn` `b-btn--ghost` `b-btn--sm` `b-btn--tinted` `b-divider` `b-divider--vertical` `b-icon-btn` `b-toolbar` `b-toolbar--glass`

```html
<div class="b-toolbar b-toolbar--glass" role="toolbar" aria-label="Formatting">
  <button class="b-btn b-icon-btn b-btn--ghost" aria-label="Bold"><strong>B</strong></button>
  <button class="b-btn b-icon-btn b-btn--ghost" aria-label="Italic"><em>I</em></button>
  <button class="b-btn b-icon-btn b-btn--ghost" aria-label="Underline"><u>U</u></button>
  <hr class="b-divider b-divider--vertical">
  <button class="b-btn b-btn--ghost b-btn--sm">H1</button>
  <button class="b-btn b-btn--ghost b-btn--sm">H2</button>
  <hr class="b-divider b-divider--vertical">
  <button class="b-btn b-btn--tinted b-btn--sm">Publish</button>
</div>
```

```tsx
import { Button, Divider, Toolbar } from "barua-ui";

<Toolbar glass role="toolbar" aria-label="Formatting">
  <Button icon variant="ghost" aria-label="Bold">
    <strong>B</strong>
  </Button>
  <Button icon variant="ghost" aria-label="Italic">
    <em>I</em>
  </Button>
  <Button icon variant="ghost" aria-label="Underline">
    <u>U</u>
  </Button>
  <Divider vertical />
  <Button variant="ghost" size="sm">H1</Button>
  <Button variant="ghost" size="sm">H2</Button>
  <Divider vertical />
  <Button variant="tinted" size="sm">Publish</Button>
</Toolbar>
```

## Action Menu

An icon button opening a .b-menu . Uses <details> for a zero-JS dropdown — see Navigation for the full menu family.

- Documentation: https://ui.barua.tz/docs/actions.html#action-menu
- Classes: `b-btn` `b-dropdown` `b-icon-btn` `b-menu` `b-menu__item` `b-menu__item--danger` `b-menu__separator` `b-menu__shortcut`

```html
<details class="b-dropdown">
  <summary class="b-btn b-icon-btn" aria-label="Row actions">
    <svg viewBox="0 0 20 20" fill="currentColor"><circle cx="4.5" cy="10" r="1.4"/><circle cx="10" cy="10" r="1.4"/><circle cx="15.5" cy="10" r="1.4"/></svg>
  </summary>
  <ul class="b-menu">
    <li><button class="b-menu__item">Open<span class="b-menu__shortcut">⏎</span></button></li>
    <li><button class="b-menu__item">Rename<span class="b-menu__shortcut">⌘R</span></button></li>
    <li><button class="b-menu__item">Duplicate<span class="b-menu__shortcut">⌘D</span></button></li>
    <li><hr class="b-menu__separator"></li>
    <li><button class="b-menu__item b-menu__item--danger">Delete<span class="b-menu__shortcut">⌫</span></button></li>
  </ul>
</details>
```

```tsx
import { Button, Dropdown, Menu, MenuSeparator } from "barua-ui";

<Dropdown>
  <Button icon aria-label="Row actions">
    <svg viewBox="0 0 20 20" fill="currentColor">
      <circle cx="4.5" cy="10" r="1.4" />
      <circle cx="10" cy="10" r="1.4" />
      <circle cx="15.5" cy="10" r="1.4" />
    </svg>
  </Button>
  <Menu>
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
      <MenuSeparator />
    </li>
    <li>
      <button className="b-menu__item b-menu__item--danger">
        Delete
        <span className="b-menu__shortcut">⌫</span>
      </button>
    </li>
  </Menu>
</Dropdown>
```

## Share

SwiftUI's ShareLink : any button with data-b-share opens the system share sheet ( navigator.share ), falling back to copying the link with a confirming toast. Pass a URL in the attribute or leave it empty to share the current page.

- Documentation: https://ui.barua.tz/docs/actions.html#share
- Classes: `b-btn` `b-share`

```html
<button class="b-btn b-share" data-b-share="https://barua.tz" data-b-share-title="Barua">
  <svg viewBox="0 0 20 20" fill="none"><path d="M10 12.5v-9m0 0L6.8 6.7M10 3.5l3.2 3.2M4.5 10v5A1.5 1.5 0 0 0 6 16.5h8a1.5 1.5 0 0 0 1.5-1.5v-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
  Share
</button>
```

```tsx
import { Share } from "barua-ui";

<Share
  className="b-btn"
  data-b-share="https://barua.tz"
  data-b-share-title="Barua"
>
  <svg viewBox="0 0 20 20" fill="none">
    <path d="M10 12.5v-9m0 0L6.8 6.7M10 3.5l3.2 3.2M4.5 10v5A1.5 1.5 0 0 0 6 16.5h8a1.5 1.5 0 0 0 1.5-1.5v-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
  Share
</Share>
```

