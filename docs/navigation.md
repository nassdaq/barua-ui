# Navigation — bars, sidebars, tabs, menus, command palette

Source: https://ui.barua.tz/docs/navigation.html
Rules and conventions: https://ui.barua.tz/llms.txt

## Top Navigation

.b-topnav is the sticky glass chrome bar you are looking at right now — brand, inline links, and trailing actions separated by a .b-spacer . Reach for it on marketing pages and docs with a handful of destinations; move to a sidebar or rail once the map outgrows one row. Demoed with position: static so it stays in the box.

- Documentation: https://ui.barua.tz/docs/navigation.html#top-navigation
- Classes: `b-btn` `b-btn--ghost` `b-btn--primary` `b-btn--sm` `b-spacer` `b-topnav` `b-topnav__brand` `b-topnav__link` `b-topnav__links`

```html
<header class="b-topnav" style="position: static">
  <a class="b-topnav__brand" href="#top-navigation">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="var(--b-color-accent)"/><path d="M8 12.5 11 15l5-6" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
    Acme
  </a>
  <nav class="b-topnav__links" aria-label="Primary">
    <a class="b-topnav__link is-active" aria-current="page" href="#top-navigation">Overview</a>
    <a class="b-topnav__link" href="#top-navigation">Projects</a>
    <a class="b-topnav__link" href="#top-navigation">Activity</a>
    <a class="b-topnav__link" href="#top-navigation">Docs</a>
  </nav>
  <span class="b-spacer"></span>
  <button class="b-btn b-btn--ghost b-btn--sm">Sign in</button>
  <button class="b-btn b-btn--primary b-btn--sm">Get started</button>
</header>
```

```tsx
import { Button, Spacer, TopNav, TopNavBrand, TopNavLinks } from "barua-ui";

<TopNav style={{ position: "static" }}>
  <TopNavBrand href="#top-navigation">
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" fill="var(--b-color-accent)" />
      <path d="M8 12.5 11 15l5-6" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
    Acme
  </TopNavBrand>
  <TopNavLinks aria-label="Primary">
    <a
      className="b-topnav__link is-active"
      aria-current="page"
      href="#top-navigation"
    >
      Overview
    </a>
    <a className="b-topnav__link" href="#top-navigation">Projects</a>
    <a className="b-topnav__link" href="#top-navigation">Activity</a>
    <a className="b-topnav__link" href="#top-navigation">Docs</a>
  </TopNavLinks>
  <Spacer></Spacer>
  <Button variant="ghost" size="sm">Sign in</Button>
  <Button variant="primary" size="sm">Get started</Button>
</TopNav>
```

## Sidebar

.b-sidebar stacks grouped items with uppercase headings — the pattern for apps with many destinations (this docs site uses one). Items take an optional icon and a trailing .b-badge for counts; add .b-sidebar--surface when it needs its own background and end hairline. Boxed here at a fixed height to show the built-in scroll.

- Documentation: https://ui.barua.tz/docs/navigation.html#sidebar
- Classes: `b-badge` `b-badge--accent` `b-sidebar` `b-sidebar__group` `b-sidebar__heading` `b-sidebar__item`

```html
<nav class="b-sidebar" style="height: 100%" aria-label="Mail">
  <div class="b-sidebar__group">
    <div class="b-sidebar__heading">Mailboxes</div>
    <a class="b-sidebar__item is-active" aria-current="page" href="#sidebar">
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M3.5 11.5 5 5h10l1.5 6.5v2.5a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1v-2.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M3.5 11.5h4l1 1.5h3l1-1.5h4" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
      Inbox
      <span class="b-badge b-badge--accent">24</span>
    </a>
    <a class="b-sidebar__item" href="#sidebar">
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M17 3.5 3 8.5l5.5 2.5L10.5 16.5 17 3.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
      Sent
    </a>
    <a class="b-sidebar__item" href="#sidebar">
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M13.5 3.5 16.5 6.5 7 16H4v-3l9.5-9.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
      Drafts
      <span class="b-badge">3</span>
    </a>
    <a class="b-sidebar__item" href="#sidebar">
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="3" y="4" width="14" height="4" rx="1" stroke="currentColor" stroke-width="1.5"/><path d="M4.5 8v6.5A1.5 1.5 0 0 0 6 16h8a
```

```tsx
import { Badge, Sidebar, SidebarGroup, SidebarHeading } from "barua-ui";

<Sidebar style={{ height: "100%" }} aria-label="Mail">
  <SidebarGroup>
    <SidebarHeading>Mailboxes</SidebarHeading>
    <a
      className="b-sidebar__item is-active"
      aria-current="page"
      href="#sidebar"
    >
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M3.5 11.5 5 5h10l1.5 6.5v2.5a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1v-2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M3.5 11.5h4l1 1.5h3l1-1.5h4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
      Inbox
      <Badge variant="accent">24</Badge>
    </a>
    <a className="b-sidebar__item" href="#sidebar">
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M17 3.5 3 8.5l5.5 2.5L10.5 16.5 17 3.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
      Sent
    </a>
    <a className="b-sidebar__item" href="#sidebar">
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M13.5 3.5 16.5 6.5 7 16H4v-3l9.5-9.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
      Drafts
      <Badge>3</Badge>
    </a>
    <a className="b-sidebar__item" href="#sidebar">
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="3" y="4" width="14" height="4" rx="1" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </a>
  </SidebarGroup>
</Sidebar>
```

## Navigation Rail

.b-rail is the sidebar's compact sibling: icon-first items with tiny labels on a narrow strip. Use it when you have four to seven top-level destinations and want to spend the horizontal space on content — or as the collapsed state of a full sidebar.

- Documentation: https://ui.barua.tz/docs/navigation.html#navigation-rail
- Classes: `b-rail` `b-rail__item`

```html
<nav class="b-rail" style="height: 17rem" aria-label="Primary">
  <a class="b-rail__item is-active" aria-current="page" href="#navigation-rail">
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M3.5 8.5 10 3l6.5 5.5v7a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1v-7Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
    <span>Home</span>
  </a>
  <a class="b-rail__item" href="#navigation-rail">
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="9" cy="9" r="5.5" stroke="currentColor" stroke-width="1.5"/><path d="m13 13 3.5 3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
    <span>Search</span>
  </a>
  <a class="b-rail__item" href="#navigation-rail">
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M3.5 5.5A1.5 1.5 0 0 1 5 4h3l1.5 2H15a1.5 1.5 0 0 1 1.5 1.5V14a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 14V5.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
    <span>Library</span>
  </a>
  <a class="b-rail__item" href="#navigation-rail">
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4 6.5h6m4 0h2M4 13.5h2m4 0h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="12" cy="6.5" r="1.8" stroke="currentColor" stroke-width="1.5"/><circle cx="8" cy="13.5" r="1.8" stroke="currentColor" stroke-width="1.5"/></svg>

```

```tsx
import { Rail, RailItem } from "barua-ui";

<Rail style={{ height: "17rem" }} aria-label="Primary">
  <RailItem active aria-current="page" href="#navigation-rail">
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M3.5 8.5 10 3l6.5 5.5v7a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1v-7Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
    <span>Home</span>
  </RailItem>
  <RailItem href="#navigation-rail">
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="m13 13 3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
    <span>Search</span>
  </RailItem>
  <RailItem href="#navigation-rail">
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M3.5 5.5A1.5 1.5 0 0 1 5 4h3l1.5 2H15a1.5 1.5 0 0 1 1.5 1.5V14a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 14V5.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
    <span>Library</span>
  </RailItem>
  <RailItem href="#navigation-rail">
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4 6.5h6m4 0h2M4 13.5h2m4 0h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="6.5" r="1.8" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="8" cy="13.5" r="1.8" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  </RailItem>
</Rail>
```

## Bottom Navigation

.b-bottomnav is the phone-sized counterpart: a fixed glass tab bar with three to five destinations, safe-area padding included. The active item tints accent; the rest stay quiet. Demoed with position: static .

- Documentation: https://ui.barua.tz/docs/navigation.html#bottom-navigation
- Classes: `b-bottomnav` `b-bottomnav__item`

```html
<nav class="b-bottomnav" style="position: static" aria-label="Primary">
  <a class="b-bottomnav__item is-active" aria-current="page" href="#bottom-navigation">
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M3.5 8.5 10 3l6.5 5.5v7a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1v-7Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
    <span>Home</span>
  </a>
  <a class="b-bottomnav__item" href="#bottom-navigation">
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="9" cy="9" r="5.5" stroke="currentColor" stroke-width="1.5"/><path d="m13 13 3.5 3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
    <span>Search</span>
  </a>
  <a class="b-bottomnav__item" href="#bottom-navigation">
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 3.5a4.5 4.5 0 0 1 4.5 4.5c0 3 1 4 1.5 4.5H4c.5-.5 1.5-1.5 1.5-4.5A4.5 4.5 0 0 1 10 3.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M8.5 15.5a1.5 1.5 0 0 0 3 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
    <span>Alerts</span>
  </a>
  <a class="b-bottomnav__item" href="#bottom-navigation">
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="7" r="3" stroke="currentColor" stroke-width="1.5"/><path d="M4.5 16.5a5.5 5.5 0 0 1 11 0" stroke="currentColor" stroke-width=
```

```tsx
import { BottomNav } from "barua-ui";

<BottomNav style={{ position: "static" }} aria-label="Primary">
  <a
    className="b-bottomnav__item is-active"
    aria-current="page"
    href="#bottom-navigation"
  >
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M3.5 8.5 10 3l6.5 5.5v7a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1v-7Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
    <span>Home</span>
  </a>
  <a className="b-bottomnav__item" href="#bottom-navigation">
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="m13 13 3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
    <span>Search</span>
  </a>
  <a className="b-bottomnav__item" href="#bottom-navigation">
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 3.5a4.5 4.5 0 0 1 4.5 4.5c0 3 1 4 1.5 4.5H4c.5-.5 1.5-1.5 1.5-4.5A4.5 4.5 0 0 1 10 3.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M8.5 15.5a1.5 1.5 0 0 0 3 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
    <span>Alerts</span>
  </a>
  <a className="b-bottomnav__item" href="#bottom-navigation">
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  </a>
</BottomNav>
```

## Tab Bar

.b-segmented is the iOS-style segmented control: pill segments on a recessed fill, the selected one lifted on a white chip. Use it to switch views of the same content (Day / Week / Month); use underline Tabs for page-level sections. .b-segmented--block stretches it full width. Both .is-active and [aria-selected="true"] light a segment.

- Documentation: https://ui.barua.tz/docs/navigation.html#tab-bar
- Classes: `b-segmented` `b-segmented--block` `b-segmented__item`

```html
<div class="b-segmented" role="group" aria-label="Range">
  <button class="b-segmented__item is-active">Day</button>
  <button class="b-segmented__item">Week</button>
  <button class="b-segmented__item">Month</button>
  <button class="b-segmented__item">Year</button>
</div>
<div class="b-segmented b-segmented--block" role="group" aria-label="Message filter">
  <button class="b-segmented__item is-active">All</button>
  <button class="b-segmented__item">Unread</button>
  <button class="b-segmented__item">Flagged</button>
</div>
```

```tsx
import { Segmented } from "barua-ui";

<Segmented role="group" aria-label="Range">
  <button className="b-segmented__item is-active">Day</button>
  <button className="b-segmented__item">Week</button>
  <button className="b-segmented__item">Month</button>
  <button className="b-segmented__item">Year</button>
</Segmented>
<Segmented block role="group" aria-label="Message filter">
  <button className="b-segmented__item is-active">All</button>
  <button className="b-segmented__item">Unread</button>
  <button className="b-segmented__item">Flagged</button>
</Segmented>
```

## Tabs

Underline tabs for sectioning a page. Wrap everything in a data-b-tabs container, give triggers role="tab" and panels role="tabpanel" , and mark the initial tab aria-selected="true" — barua.js wires selection, panel visibility and the roving tabindex from there. The tab list scrolls horizontally when it overflows.

- Documentation: https://ui.barua.tz/docs/navigation.html#tabs
- Classes: `b-tab` `b-tabpanel` `b-tabs`

```html
<div data-b-tabs>
  <div class="b-tabs" role="tablist" aria-label="Project sections">
    <button class="b-tab" id="demo-tab-overview" role="tab" aria-selected="true" aria-controls="demo-panel-overview">Overview</button>
    <button class="b-tab" id="demo-tab-commits" role="tab" aria-selected="false" aria-controls="demo-panel-commits">Commits</button>
    <button class="b-tab" id="demo-tab-settings" role="tab" aria-selected="false" aria-controls="demo-panel-settings">Settings</button>
  </div>
  <div class="b-tabpanel" id="demo-panel-overview" role="tabpanel" aria-labelledby="demo-tab-overview">
    A calm summary of the project: readme, recent activity, and the
    people involved.
  </div>
  <div class="b-tabpanel" id="demo-panel-commits" role="tabpanel" aria-labelledby="demo-tab-commits" hidden>
    128 commits on <code>main</code>, most recently "Polish glass
    materials".
  </div>
  <div class="b-tabpanel" id="demo-panel-settings" role="tabpanel" aria-labelledby="demo-tab-settings" hidden>
    Rename, transfer or archive the project. Danger lives behind a
    confirm dialog.
  </div>
</div>
```

```tsx
import { Tabs } from "barua-ui";

<div data-b-tabs="">
  <Tabs role="tablist" aria-label="Project sections">
    <button
      className="b-tab"
      id="demo-tab-overview"
      role="tab"
      aria-selected="true"
      aria-controls="demo-panel-overview"
    >
      Overview
    </button>
    <button
      className="b-tab"
      id="demo-tab-commits"
      role="tab"
      aria-selected="false"
      aria-controls="demo-panel-commits"
    >
      Commits
    </button>
    <button
      className="b-tab"
      id="demo-tab-settings"
      role="tab"
      aria-selected="false"
      aria-controls="demo-panel-settings"
    >
      Settings
    </button>
  </Tabs>
  <div
    className="b-tabpanel"
    id="demo-panel-overview"
    role="tabpanel"
    aria-labelledby="demo-tab-overview"
  >
    A calm summary of the project: readme, recent activity, and the people involved.
  </div>
  <div
    className="b-tabpanel"
    id="demo-panel-commits"
    role="tabpanel"
    aria-labelledby="demo-tab-commits"
    hidden
  >
    128 commits on
    <code>main</code>
    , most recently "Polish glass materials".
  </div>
  <div
    className="b-tabpanel"
    id="demo-panel-settings"
    role="tabpanel"
    aria-labelledby="demo-tab-settings"
    hidden
  >
    Rename, transfer or archive the project. Danger lives behind a confirm dialog.
  </div>
</div>
```

## Breadcrumbs

A trail from root to here, separated by hairline chevrons. Use them in hierarchies deeper than two levels; the last crumb is the current page — give it aria-current="page" and no link.

- Documentation: https://ui.barua.tz/docs/navigation.html#breadcrumbs
- Classes: `b-breadcrumbs`

```html
<nav aria-label="Breadcrumb">
  <ol class="b-breadcrumbs">
    <li><a href="#breadcrumbs">Home</a></li>
    <li><a href="#breadcrumbs">Projects</a></li>
    <li><a href="#breadcrumbs">Barua UI</a></li>
    <li><span aria-current="page">Navigation</span></li>
  </ol>
</nav>
```

```tsx
import { Breadcrumbs } from "barua-ui";

<nav aria-label="Breadcrumb">
  <Breadcrumbs>
    <li>
      <a href="#breadcrumbs">Home</a>
    </li>
    <li>
      <a href="#breadcrumbs">Projects</a>
    </li>
    <li>
      <a href="#breadcrumbs">Barua UI</a>
    </li>
    <li>
      <span aria-current="page">Navigation</span>
    </li>
  </Breadcrumbs>
</nav>
```

## Pagination

Numbered page controls with tabular figures so widths never jitter. The current page fills accent via .is-active or [aria-current="page"] ; collapse long runs with .b-pagination__ellipsis .

- Documentation: https://ui.barua.tz/docs/navigation.html#pagination
- Classes: `b-pagination` `b-pagination__ellipsis` `b-pagination__item`

```html
<nav aria-label="Pagination">
  <ul class="b-pagination">
    <li>
      <a class="b-pagination__item" href="#pagination" aria-label="Previous page">
        <svg viewBox="0 0 20 20" fill="none" width="14" height="14" aria-hidden="true"><path d="m12 5-5 5 5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </a>
    </li>
    <li><a class="b-pagination__item" href="#pagination">1</a></li>
    <li><a class="b-pagination__item" href="#pagination">2</a></li>
    <li><a class="b-pagination__item" aria-current="page" href="#pagination">3</a></li>
    <li><a class="b-pagination__item" href="#pagination">4</a></li>
    <li><span class="b-pagination__ellipsis" aria-hidden="true">…</span></li>
    <li><a class="b-pagination__item" href="#pagination">12</a></li>
    <li>
      <a class="b-pagination__item" href="#pagination" aria-label="Next page">
        <svg viewBox="0 0 20 20" fill="none" width="14" height="14" aria-hidden="true"><path d="m8 5 5 5-5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </a>
    </li>
  </ul>
</nav>
```

```tsx
import { Pagination, PaginationEllipsis, PaginationItem } from "barua-ui";

<nav aria-label="Pagination">
  <Pagination>
    <li>
      <PaginationItem href="#pagination" aria-label="Previous page">
        <svg
          viewBox="0 0 20 20"
          fill="none"
          width="14"
          height="14"
          aria-hidden="true"
        >
          <path d="m12 5-5 5 5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </PaginationItem>
    </li>
    <li>
      <PaginationItem href="#pagination">1</PaginationItem>
    </li>
    <li>
      <PaginationItem href="#pagination">2</PaginationItem>
    </li>
    <li>
      <PaginationItem aria-current="page" href="#pagination">3</PaginationItem>
    </li>
    <li>
      <PaginationItem href="#pagination">4</PaginationItem>
    </li>
    <li>
      <PaginationEllipsis aria-hidden="true">…</PaginationEllipsis>
    </li>
    <li>
      <PaginationItem href="#pagination">12</PaginationItem>
    </li>
    <li>
      <PaginationItem href="#pagination" aria-label="Next page">
        <svg
          viewBox="0 0 20 20"
          fill="none"
          width="14"
          height="14"
          aria-hidden="true"
        >
          <path d="m8 5 5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </PaginationItem>
    </li>
  </Pagination>
</nav>
```

## Stepper

.b-steps shows progress through a linear flow. Each li carries its number in data-step ; .is-complete swaps it for an accent checkmark and fills the connector, .is-active rings the current step. Keep labels to one or two words.

- Documentation: https://ui.barua.tz/docs/navigation.html#stepper
- Classes: `b-steps`

```html
<ol class="b-steps" aria-label="Checkout progress">
  <li class="is-complete" data-step="1">Account</li>
  <li class="is-complete" data-step="2">Shipping</li>
  <li class="is-active" data-step="3" aria-current="step">Payment</li>
  <li data-step="4">Review</li>
</ol>
```

```tsx
import { Steps } from "barua-ui";

<Steps aria-label="Checkout progress">
  <li className="is-complete" data-step="1">Account</li>
  <li className="is-complete" data-step="2">Shipping</li>
  <li className="is-active" data-step="3" aria-current="step">Payment</li>
  <li data-step="4">Review</li>
</Steps>
```

## Menu Bar

.b-menubar is the desktop-app strip of menu titles. Hover, .is-active and [aria-expanded="true"] all paint the solid accent highlight, so an open dropdown keeps its title lit. Pair each title with a dropdown menu for the real thing.

- Documentation: https://ui.barua.tz/docs/navigation.html#menu-bar
- Classes: `b-menubar` `b-menubar__item`

```html
<div class="b-menubar" aria-label="Application menu">
  <button class="b-menubar__item is-active">File</button>
  <button class="b-menubar__item">Edit</button>
  <button class="b-menubar__item">View</button>
  <button class="b-menubar__item">Window</button>
  <button class="b-menubar__item">Help</button>
</div>
```

```tsx
import { MenuBar, MenuBarItem } from "barua-ui";

<MenuBar aria-label="Application menu">
  <MenuBarItem active>File</MenuBarItem>
  <MenuBarItem>Edit</MenuBarItem>
  <MenuBarItem>View</MenuBarItem>
  <MenuBarItem>Window</MenuBarItem>
  <MenuBarItem>Help</MenuBarItem>
</MenuBar>
```

## Dropdown Menu

details.b-dropdown opens a glass .b-menu with zero JavaScript. Menus compose from items with optional .b-menu__shortcut hints, a .b-menu__label , hairline .b-menu__separator s, disabled items, and a .b-menu__item--danger kept last. Add .b-dropdown--end to right-align the panel.

- Documentation: https://ui.barua.tz/docs/navigation.html#dropdown-menu
- Classes: `b-btn` `b-dropdown` `b-menu` `b-menu__item` `b-menu__item--danger` `b-menu__label` `b-menu__separator` `b-menu__shortcut`

```html
<details class="b-dropdown">
  <summary class="b-btn">
    Options
    <svg viewBox="0 0 20 20" fill="none" width="14" height="14" aria-hidden="true"><path d="m5 8 5 5 5-5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
  </summary>
  <ul class="b-menu">
    <li class="b-menu__label">Repository</li>
    <li><button class="b-menu__item">Clone<span class="b-menu__shortcut">⌘⇧C</span></button></li>
    <li><button class="b-menu__item">Open in editor<span class="b-menu__shortcut">⌘O</span></button></li>
    <li><button class="b-menu__item" disabled>Sync fork</button></li>
    <li><hr class="b-menu__separator"></li>
    <li><button class="b-menu__item b-menu__item--danger">Delete repository<span class="b-menu__shortcut">⌫</span></button></li>
  </ul>
</details>
```

```tsx
import { Button, Dropdown, Menu, MenuLabel, MenuSeparator } from "barua-ui";

<Dropdown>
  <Button>
    Options
    <svg
      viewBox="0 0 20 20"
      fill="none"
      width="14"
      height="14"
      aria-hidden="true"
    >
      <path d="m5 8 5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </Button>
  <Menu>
    <MenuLabel>Repository</MenuLabel>
    <li>
      <button className="b-menu__item">
        Clone
        <span className="b-menu__shortcut">⌘⇧C</span>
      </button>
    </li>
    <li>
      <button className="b-menu__item">
        Open in editor
        <span className="b-menu__shortcut">⌘O</span>
      </button>
    </li>
    <li>
      <button className="b-menu__item" disabled>Sync fork</button>
    </li>
    <li>
      <MenuSeparator />
    </li>
    <li>
      <button className="b-menu__item b-menu__item--danger">
        Delete repository
        <span className="b-menu__shortcut">⌫</span>
      </button>
    </li>
  </Menu>
</Dropdown>
```

## Context Menu

The same .b-menu component, summoned by right-click instead of a trigger button. In production, listen for contextmenu , show the menu with the popover attribute and position it at the pointer — the glass panel, items and states are identical. Shown here as a static instance.

- Documentation: https://ui.barua.tz/docs/navigation.html#context-menu
- Classes: `b-menu` `b-menu__item` `b-menu__item--danger` `b-menu__separator` `b-menu__shortcut`

```html
<ul class="b-menu">
  <li><button class="b-menu__item">Reply<span class="b-menu__shortcut">R</span></button></li>
  <li><button class="b-menu__item">Reply all<span class="b-menu__shortcut">⇧R</span></button></li>
  <li><button class="b-menu__item">Forward<span class="b-menu__shortcut">F</span></button></li>
  <li><hr class="b-menu__separator"></li>
  <li><button class="b-menu__item">Mark as read</button></li>
  <li><button class="b-menu__item b-menu__item--danger">Move to Trash<span class="b-menu__shortcut">⌫</span></button></li>
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
      Reply all
      <span className="b-menu__shortcut">⇧R</span>
    </button>
  </li>
  <li>
    <button className="b-menu__item">
      Forward
      <span className="b-menu__shortcut">F</span>
    </button>
  </li>
  <li>
    <MenuSeparator />
  </li>
  <li>
    <button className="b-menu__item">Mark as read</button>
  </li>
  <li>
    <button className="b-menu__item b-menu__item--danger">
      Move to Trash
      <span className="b-menu__shortcut">⌫</span>
    </button>
  </li>
</Menu>
```

## Command Menu

.b-cmdk is the ⌘K palette: a search field over a grouped command list on heavy glass. In this docs site it lives in a <dialog data-b-cmdk-root> — any button with data-b-cmdk="#id" opens it, and barua.js binds ⌘K / Ctrl K globally (try it). Below is a static inline instance showing the anatomy.

- Documentation: https://ui.barua.tz/docs/navigation.html#command-menu
- Classes: `b-cmdk` `b-cmdk__footer` `b-cmdk__group-label` `b-cmdk__input` `b-cmdk__item` `b-cmdk__list`

```html
<div class="b-cmdk">
  <input class="b-cmdk__input" type="search" placeholder="Type a command or search…" aria-label="Command menu">
  <ul class="b-cmdk__list">
    <li class="b-cmdk__group-label">Navigate</li>
    <li>
      <button class="b-cmdk__item is-active">
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M3.5 11.5 5 5h10l1.5 6.5v2.5a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1v-2.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M3.5 11.5h4l1 1.5h3l1-1.5h4" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
        Go to Inbox
        <kbd>G I</kbd>
      </button>
    </li>
    <li>
      <button class="b-cmdk__item">
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M3.5 5.5A1.5 1.5 0 0 1 5 4h3l1.5 2H15a1.5 1.5 0 0 1 1.5 1.5V14a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 14V5.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
        Go to Projects
        <kbd>G P</kbd>
      </button>
    </li>
    <li class="b-cmdk__group-label">Actions</li>
    <li>
      <button class="b-cmdk__item">
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M13.5 3.5 16.5 6.5 7 16H4v-3l9.5-9.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
        Compose message
        <kbd>C</kbd>
      </button>
    </li>
    <li>
      <butt
```

```tsx
import { CommandGroupLabel, CommandList, CommandPalette } from "barua-ui";

<CommandPalette>
  <input className="b-cmdk__input" type="search" placeholder="Type a command or search…" aria-label="Command menu" />
  <CommandList>
    <CommandGroupLabel>Navigate</CommandGroupLabel>
    <li>
      <button className="b-cmdk__item is-active">
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M3.5 11.5 5 5h10l1.5 6.5v2.5a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1v-2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M3.5 11.5h4l1 1.5h3l1-1.5h4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
        Go to Inbox
        <kbd>G I</kbd>
      </button>
    </li>
    <li>
      <button className="b-cmdk__item">
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M3.5 5.5A1.5 1.5 0 0 1 5 4h3l1.5 2H15a1.5 1.5 0 0 1 1.5 1.5V14a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 14V5.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
        Go to Projects
        <kbd>G P</kbd>
      </button>
    </li>
    <CommandGroupLabel>Actions</CommandGroupLabel>
    <li>
      <button className="b-cmdk__item">
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M13.5 3.5 16.5 6.5 7 16H4v-3l9.5-9.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
        Compose message
        <kbd>C</kbd>
      </button>
    </li>
    <li></li>
  </CommandList>
</CommandPalette>
```

## Navigation Drawer

.b-drawer slides a full-height glass panel over the page — the mobile home for a sidebar. The demo uses the native popover attribute with popovertarget buttons: top layer, light dismiss and the spring slide-in for free. Use .b-drawer--end for the trailing edge, or a <dialog> opened via data-b-dialog="#id" when you need a true modal with focus trapping.

- Documentation: https://ui.barua.tz/docs/navigation.html#navigation-drawer
- Classes: `b-btn` `b-btn--ghost` `b-drawer` `b-drawer__body` `b-drawer__header` `b-icon-btn` `b-sidebar` `b-sidebar__group` `b-sidebar__heading` `b-sidebar__item`

```html
<button class="b-btn" popovertarget="demo-drawer">Open drawer</button>
<nav class="b-drawer" popover id="demo-drawer" aria-label="Drawer">
  <div class="b-drawer__header">
    Menu
    <button class="b-btn b-icon-btn b-btn--ghost" popovertarget="demo-drawer" popovertargetaction="hide" aria-label="Close menu">
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m5 5 10 10M15 5 5 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
    </button>
  </div>
  <div class="b-drawer__body">
    <div class="b-sidebar">
      <div class="b-sidebar__group">
        <div class="b-sidebar__heading">Browse</div>
        <a class="b-sidebar__item is-active" href="#navigation-drawer">Home</a>
        <a class="b-sidebar__item" href="#navigation-drawer">Discover</a>
        <a class="b-sidebar__item" href="#navigation-drawer">Library</a>
      </div>
      <div class="b-sidebar__group">
        <div class="b-sidebar__heading">Account</div>
        <a class="b-sidebar__item" href="#navigation-drawer">Settings</a>
        <a class="b-sidebar__item" href="#navigation-drawer">Sign out</a>
      </div>
    </div>
  </div>
</nav>
```

```tsx
import { Button, Drawer, DrawerBody, DrawerHeader, Sidebar, SidebarGroup, SidebarHeading } from "barua-ui";

<Button popovertarget="demo-drawer">Open drawer</Button>
<Drawer popover="" id="demo-drawer" aria-label="Drawer">
  <DrawerHeader>
    Menu
    <Button
      icon
      variant="ghost"
      popovertarget="demo-drawer"
      popovertargetaction="hide"
      aria-label="Close menu"
    >
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="m5 5 10 10M15 5 5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </Button>
  </DrawerHeader>
  <DrawerBody>
    <Sidebar>
      <SidebarGroup>
        <SidebarHeading>Browse</SidebarHeading>
        <a className="b-sidebar__item is-active" href="#navigation-drawer">Home</a>
        <a className="b-sidebar__item" href="#navigation-drawer">Discover</a>
        <a className="b-sidebar__item" href="#navigation-drawer">Library</a>
      </SidebarGroup>
      <SidebarGroup>
        <SidebarHeading>Account</SidebarHeading>
        <a className="b-sidebar__item" href="#navigation-drawer">Settings</a>
        <a className="b-sidebar__item" href="#navigation-drawer">Sign out</a>
      </SidebarGroup>
    </Sidebar>
  </DrawerBody>
</Drawer>
```

## Submenu

A nested flyout inside any .b-menu : wrap the item and its child menu in .b-menu__sub . The chevron is drawn for you; the flyout opens on hover or keyboard focus.

- Documentation: https://ui.barua.tz/docs/navigation.html#menu-submenu
- Classes: `b-menu` `b-menu__item` `b-menu__item--danger` `b-menu__separator` `b-menu__sub`

```html
<ul class="b-menu" style="position: relative">
  <li><button class="b-menu__item">New message</button></li>
  <li class="b-menu__sub">
    <button class="b-menu__item" aria-haspopup="menu">Move to</button>
    <ul class="b-menu">
      <li><button class="b-menu__item">Archive</button></li>
      <li><button class="b-menu__item">Receipts</button></li>
      <li><button class="b-menu__item">Travel</button></li>
    </ul>
  </li>
  <li><hr class="b-menu__separator"></li>
  <li><button class="b-menu__item b-menu__item--danger">Delete</button></li>
</ul>
```

```tsx
import { Menu, MenuSeparator } from "barua-ui";

<Menu style={{ position: "relative" }}>
  <li>
    <button className="b-menu__item">New message</button>
  </li>
  <li className="b-menu__sub">
    <button className="b-menu__item" aria-haspopup="menu">Move to</button>
    <Menu>
      <li>
        <button className="b-menu__item">Archive</button>
      </li>
      <li>
        <button className="b-menu__item">Receipts</button>
      </li>
      <li>
        <button className="b-menu__item">Travel</button>
      </li>
    </Menu>
  </li>
  <li>
    <MenuSeparator />
  </li>
  <li>
    <button className="b-menu__item b-menu__item--danger">Delete</button>
  </li>
</Menu>
```

