# Feedback — alerts, toasts, progress, skeletons, empty states

Source: https://ui.barua.tz/docs/feedback.html
Rules and conventions: https://ui.barua.tz/llms.txt

## Alert

An inline, contextual message that sits in the page flow. The default is informational; add .b-alert--success , .b-alert--warning or .b-alert--danger . A close button with data-b-dismiss removes the alert with zero extra JS.

- Documentation: https://ui.barua.tz/docs/feedback.html#alert
- Classes: `b-alert` `b-alert--danger` `b-alert--success` `b-alert--warning` `b-alert__close` `b-alert__content` `b-alert__desc` `b-alert__icon` `b-alert__title`

```html
<div class="b-alert" role="status">
  <span class="b-alert__icon">
    <svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8.25" stroke="currentColor" stroke-width="1.5"/><path d="M10 9v5m0-8v.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
  </span>
  <div class="b-alert__content">
    <div class="b-alert__title">A new version is available</div>
    <div class="b-alert__desc">Refresh to load Barua UI v0.2 — no data will be lost.</div>
  </div>
  <button class="b-alert__close" data-b-dismiss aria-label="Dismiss">
    <svg viewBox="0 0 20 20" fill="none" width="14" height="14"><path d="m5.5 5.5 9 9m0-9-9 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
  </button>
</div>
<div class="b-alert b-alert--success" role="status">
  <span class="b-alert__icon">
    <svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8.25" stroke="currentColor" stroke-width="1.5"/><path d="m6.5 10.3 2.3 2.3 4.7-5.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
  </span>
  <div class="b-alert__content">
    <div class="b-alert__title">Backup complete</div>
    <div class="b-alert__desc">All 1,284 files are safely stored. Next backup runs tonight at 02:00.</div>
  </div>
  <button class="b-alert__close" data-b-dismiss aria-label="Dismiss">
    <svg viewBox="0 0 20 20" fill="none"
```

```tsx
import { Alert } from "barua-ui";

<Alert role="status">
  <span className="b-alert__icon">
    <svg viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="8.25" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 9v5m0-8v.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  </span>
  <div className="b-alert__content">
    <div className="b-alert__title">A new version is available</div>
    <div className="b-alert__desc">Refresh to load Barua UI v0.2 — no data will be lost.</div>
  </div>
  <button className="b-alert__close" data-b-dismiss="" aria-label="Dismiss">
    <svg viewBox="0 0 20 20" fill="none" width="14" height="14">
      <path d="m5.5 5.5 9 9m0-9-9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  </button>
</Alert>
<Alert variant="success" role="status">
  <span className="b-alert__icon">
    <svg viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="8.25" stroke="currentColor" strokeWidth="1.5" />
      <path d="m6.5 10.3 2.3 2.3 4.7-5.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </span>
  <div className="b-alert__content">
    <div className="b-alert__title">Backup complete</div>
    <div className="b-alert__desc">All 1,284 files are safely stored. Next backup runs tonight at 02:00.</div>
  </div>
  <button className="b-alert__close" data-b-dismiss="" aria-label="Dismiss"></button>
</Alert>
```

## Banner

A full-width announcement pinned above the app chrome. The default wears the accent gradient; .b-banner--neutral sits quietly on a surface color for less urgent notices. The close button uses data-b-dismiss .

- Documentation: https://ui.barua.tz/docs/feedback.html#banner
- Classes: `b-banner` `b-banner--neutral` `b-banner__close`

```html
<div class="b-banner" role="status">
  <span>Barua UI v0.2 ships glass navigation and charts. <a href="#banner">See what's new</a></span>
  <button class="b-banner__close" data-b-dismiss aria-label="Dismiss announcement">
    <svg viewBox="0 0 20 20" fill="none" width="14" height="14"><path d="m5.5 5.5 9 9m0-9-9 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
  </button>
</div>
<div class="b-banner b-banner--neutral" role="status">
  <span>Scheduled maintenance Saturday 02:00–04:00 UTC. <a href="#banner">Status page</a></span>
  <button class="b-banner__close" data-b-dismiss aria-label="Dismiss notice">
    <svg viewBox="0 0 20 20" fill="none" width="14" height="14"><path d="m5.5 5.5 9 9m0-9-9 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
  </button>
</div>
```

```tsx
import { Banner } from "barua-ui";

<Banner role="status">
  <span>
    Barua UI v0.2 ships glass navigation and charts.
    <a href="#banner">See what's new</a>
  </span>
  <button
    className="b-banner__close"
    data-b-dismiss=""
    aria-label="Dismiss announcement"
  >
    <svg viewBox="0 0 20 20" fill="none" width="14" height="14">
      <path d="m5.5 5.5 9 9m0-9-9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  </button>
</Banner>
<Banner neutral role="status">
  <span>
    Scheduled maintenance Saturday 02:00–04:00 UTC.
    <a href="#banner">Status page</a>
  </span>
  <button
    className="b-banner__close"
    data-b-dismiss=""
    aria-label="Dismiss notice"
  >
    <svg viewBox="0 0 20 20" fill="none" width="14" height="14">
      <path d="m5.5 5.5 9 9m0-9-9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  </button>
</Banner>
```

## Toast

A transient, glassy confirmation that floats in from the bottom corner and dismisses itself. At runtime toasts live inside an auto-created .b-toast-region ; the static markup below shows each variant's anatomy — icon, content and an optional trailing action.

- Documentation: https://ui.barua.tz/docs/feedback.html#toast
- Classes: `b-btn` `b-btn--ghost` `b-btn--outline` `b-btn--tinted` `b-table` `b-table-wrap` `b-toast` `b-toast--danger` `b-toast--success` `b-toast--warning` `b-toast__action` `b-toast__content` `b-toast__desc` `b-toast__icon` `b-toast__title`

```html
<div class="b-toast" role="status">
  <span class="b-toast__icon">
    <svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8.25" stroke="currentColor" stroke-width="1.5"/><path d="M10 9v5m0-8v.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
  </span>
  <div class="b-toast__content">
    <div class="b-toast__title">New sign-in</div>
    <div class="b-toast__desc">Safari on macOS, Arusha TZ</div>
  </div>
</div>
<div class="b-toast b-toast--success" role="status">
  <span class="b-toast__icon">
    <svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8.25" stroke="currentColor" stroke-width="1.5"/><path d="m6.5 10.3 2.3 2.3 4.7-5.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
  </span>
  <div class="b-toast__content">
    <div class="b-toast__title">Saved</div>
    <div class="b-toast__desc">Profile updated</div>
  </div>
</div>
<div class="b-toast b-toast--warning" role="status">
  <span class="b-toast__icon">
    <svg viewBox="0 0 20 20" fill="none"><path d="M10 3.5 18 17H2L10 3.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M10 8.5v3.5m0 2.2v.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
  </span>
  <div class="b-toast__content">
    <div class="b-toast__title">Working offline</div>
    <div class="b-toast__desc">C
```

## Snackbar

A snackbar is the same .b-toast component anchored to the bottom center of the viewport — wrap it in <div class="b-toast-region b-toast-region--center" aria-live="polite"> instead of the default corner region. It usually skips the icon and always offers one action.

- Documentation: https://ui.barua.tz/docs/feedback.html#snackbar
- Classes: `b-toast` `b-toast-region` `b-toast-region--center` `b-toast__action` `b-toast__content` `b-toast__title`

```html
<div class="b-toast" role="status">
  <div class="b-toast__content">
    <div class="b-toast__title">Conversation moved to Trash</div>
  </div>
  <button class="b-toast__action">Undo</button>
</div>
```

## Notification

A rich, macOS-style notification card: source app, title, body and timestamp beside an avatar or app mark. It shares the toast's glass treatment and works with data-b-dismiss on any child button.

- Documentation: https://ui.barua.tz/docs/feedback.html#notification
- Classes: `b-avatar` `b-avatar--square` `b-notification` `b-notification__app` `b-notification__body` `b-notification__desc` `b-notification__time` `b-notification__title`

```html
<div class="b-notification" role="status">
  <span class="b-avatar">AK</span>
  <div class="b-notification__body">
    <div class="b-notification__app">Messages</div>
    <div class="b-notification__title">Amina Kimaro</div>
    <div class="b-notification__desc">Uploaded the Q3 launch deck — take a look before standup.</div>
  </div>
  <span class="b-notification__time">now</span>
</div>
<div class="b-notification" role="status">
  <span class="b-avatar b-avatar--square">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="4" fill="var(--b-color-accent)"/><path d="m4 7 8 6 8-6" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
  </span>
  <div class="b-notification__body">
    <div class="b-notification__app">Barua Mail</div>
    <div class="b-notification__title">Weekly digest ready</div>
    <div class="b-notification__desc">12 threads resolved, 3 waiting on you.</div>
  </div>
  <span class="b-notification__time">9:41</span>
</div>
```

```tsx
import { Avatar, Notification } from "barua-ui";

<Notification role="status">
  <Avatar>AK</Avatar>
  <div className="b-notification__body">
    <div className="b-notification__app">Messages</div>
    <div className="b-notification__title">Amina Kimaro</div>
    <div className="b-notification__desc">Uploaded the Q3 launch deck — take a look before standup.</div>
  </div>
  <span className="b-notification__time">now</span>
</Notification>
<Notification role="status">
  <Avatar className="b-avatar--square">
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect x="2" y="4" width="20" height="16" rx="4" fill="var(--b-color-accent)" />
      <path d="m4 7 8 6 8-6" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </Avatar>
  <div className="b-notification__body">
    <div className="b-notification__app">Barua Mail</div>
    <div className="b-notification__title">Weekly digest ready</div>
    <div className="b-notification__desc">12 threads resolved, 3 waiting on you.</div>
  </div>
  <span className="b-notification__time">9:41</span>
</Notification>
```

## Tip

A TipKit-style callout: glass card with an icon tile, one-line promise, quiet explanation, inline actions and a dismiss. For teaching a feature in place — once, then it leaves.

- Documentation: https://ui.barua.tz/docs/feedback.html#tip
- Classes: `b-link` `b-link--muted` `b-tip` `b-tip__actions` `b-tip__close` `b-tip__content` `b-tip__desc` `b-tip__icon` `b-tip__title`

```html
<div class="b-tip" style="max-width: 26rem">
  <span class="b-tip__icon">
    <svg viewBox="0 0 20 20" fill="none"><path d="M10 2.5v2M4.7 4.7l1.4 1.4M2.5 10h2M15.3 4.7l-1.4 1.4M17.5 10h-2M7.5 15.5h5M8.5 18h3M10 6a4 4 0 0 1 2.5 7.1c-.5.4-.8 1-.8 1.6v.3h-3.4v-.3c0-.6-.3-1.2-.8-1.6A4 4 0 0 1 10 6Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
  </span>
  <span class="b-tip__content">
    <span class="b-tip__title">Swipe to archive</span>
    <span class="b-tip__desc">Drag any conversation left to file it without opening it.</span>
    <span class="b-tip__actions">
      <button class="b-link">Try it</button>
      <button class="b-link b-link--muted">Not now</button>
    </span>
  </span>
  <button class="b-tip__close" aria-label="Dismiss tip" data-b-dismiss>✕</button>
</div>
```

```tsx
import { Link, Tip } from "barua-ui";

<Tip style={{ maxWidth: "26rem" }}>
  <span className="b-tip__icon">
    <svg viewBox="0 0 20 20" fill="none">
      <path d="M10 2.5v2M4.7 4.7l1.4 1.4M2.5 10h2M15.3 4.7l-1.4 1.4M17.5 10h-2M7.5 15.5h5M8.5 18h3M10 6a4 4 0 0 1 2.5 7.1c-.5.4-.8 1-.8 1.6v.3h-3.4v-.3c0-.6-.3-1.2-.8-1.6A4 4 0 0 1 10 6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </span>
  <span className="b-tip__content">
    <span className="b-tip__title">Swipe to archive</span>
    <span className="b-tip__desc">Drag any conversation left to file it without opening it.</span>
    <span className="b-tip__actions">
      <Link>Try it</Link>
      <Link className="b-link--muted">Not now</Link>
    </span>
  </span>
  <button className="b-tip__close" aria-label="Dismiss tip" data-b-dismiss="">✕</button>
</Tip>
```

## Status Indicator

A dot plus label for presence and system health. Presence modifiers --online , --busy and --away have semantic aliases --success , --danger and --warning for non-people states; add --pulse to animate live activity.

- Documentation: https://ui.barua.tz/docs/feedback.html#status-indicator
- Classes: `b-status` `b-status--away` `b-status--busy` `b-status--danger` `b-status--online` `b-status--pulse` `b-status--success` `b-status--warning`

```html
<span class="b-status">Offline</span>
<span class="b-status b-status--online">Online</span>
<span class="b-status b-status--away">Away</span>
<span class="b-status b-status--busy">Busy</span>
<span class="b-status b-status--online b-status--pulse">Live</span>
<span class="b-status b-status--success">Operational</span>
<span class="b-status b-status--warning">Degraded</span>
<span class="b-status b-status--danger">Major outage</span>
```

```tsx
import { StatusDot } from "barua-ui";

<StatusDot>Offline</StatusDot>
<StatusDot className="b-status--online">Online</StatusDot>
<StatusDot className="b-status--away">Away</StatusDot>
<StatusDot className="b-status--busy">Busy</StatusDot>
<StatusDot className="b-status--online b-status--pulse">Live</StatusDot>
<StatusDot className="b-status--success">Operational</StatusDot>
<StatusDot className="b-status--warning">Degraded</StatusDot>
<StatusDot className="b-status--danger">Major outage</StatusDot>
```

## Progress Bar

A determinate track whose fill width comes from the --b-progress custom property, e.g. style="--b-progress: 65%" . The fill animates smoothly when the value changes.

- Documentation: https://ui.barua.tz/docs/feedback.html#progress-bar
- Classes: `b-progress` `b-progress--danger` `b-progress--indeterminate` `b-progress--lg` `b-progress--sm` `b-progress--success` `b-progress--warning` `b-progress__fill`

```html
<div class="b-progress" role="progressbar" aria-label="Upload progress" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100" style="--b-progress: 65%">
  <div class="b-progress__fill"></div>
</div>
```

```tsx
import { Progress } from "barua-ui";

<Progress
  role="progressbar"
  aria-label="Upload progress"
  aria-valuenow="65"
  aria-valuemin="0"
  aria-valuemax="100"
  style={{ "--b-progress": "65%" }}
>
  <div className="b-progress__fill"></div>
</Progress>
```

## Circular Progress

A conic-gradient ring driven by a unitless --b-progress value from 0–100 set on .b-circular . Wrap it in .b-circular-wrap to center a .b-circular__label in the ring; resize with --b-circular-size and --b-circular-track .

- Documentation: https://ui.barua.tz/docs/feedback.html#circular-progress
- Classes: `b-circular` `b-circular-wrap` `b-circular__label`

```html
<div class="b-circular-wrap">
  <div class="b-circular" role="progressbar" aria-label="Sync" aria-valuenow="72" aria-valuemin="0" aria-valuemax="100" style="--b-progress: 72"></div>
  <span class="b-circular__label">72%</span>
</div>
<div class="b-circular-wrap">
  <div class="b-circular" role="progressbar" aria-label="Storage" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style="--b-progress: 45; --b-circular-size: 4.5rem"></div>
  <span class="b-circular__label">45%</span>
</div>
<div class="b-circular-wrap">
  <div class="b-circular" role="progressbar" aria-label="Goal" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100" style="--b-progress: 90; --b-circular-size: 6rem; --b-circular-track: 6px"></div>
  <span class="b-circular__label">90%</span>
</div>
```

```tsx
import { CircularProgress } from "barua-ui";

<div className="b-circular-wrap">
  <CircularProgress
    role="progressbar"
    aria-label="Sync"
    aria-valuenow="72"
    aria-valuemin="0"
    aria-valuemax="100"
    style={{ "--b-progress": "72" }}
  ></CircularProgress>
  <span className="b-circular__label">72%</span>
</div>
<div className="b-circular-wrap">
  <CircularProgress
    role="progressbar"
    aria-label="Storage"
    aria-valuenow="45"
    aria-valuemin="0"
    aria-valuemax="100"
    style={{ "--b-progress": "45", "--b-circular-size": "4.5rem" }}
  ></CircularProgress>
  <span className="b-circular__label">45%</span>
</div>
<div className="b-circular-wrap">
  <CircularProgress
    role="progressbar"
    aria-label="Goal"
    aria-valuenow="90"
    aria-valuemin="0"
    aria-valuemax="100"
    style={{ "--b-progress": "90", "--b-circular-size": "6rem", "--b-circular-track": "6px" }}
  ></CircularProgress>
  <span className="b-circular__label">90%</span>
</div>
```

## Loading Spinner

A lightweight indeterminate ring in three sizes. For buttons, prefer the built-in .b-btn.is-loading state from Actions — it swaps the label for a spinner while keeping the accessible name.

- Documentation: https://ui.barua.tz/docs/feedback.html#loading-spinner
- Classes: `b-btn` `b-btn--primary` `b-spinner` `b-spinner--lg` `b-spinner--sm`

```html
<span class="b-spinner b-spinner--sm" role="status" aria-label="Loading"></span>
<span class="b-spinner" role="status" aria-label="Loading"></span>
<span class="b-spinner b-spinner--lg" role="status" aria-label="Loading"></span>
<button class="b-btn b-btn--primary is-loading" aria-busy="true">Saving…</button>
```

```tsx
import { Button, Spinner } from "barua-ui";

<Spinner size="sm" role="status" aria-label="Loading"></Spinner>
<Spinner role="status" aria-label="Loading"></Spinner>
<Spinner size="lg" role="status" aria-label="Loading"></Spinner>
<Button variant="primary" loading aria-busy="true">Saving…</Button>
```

## Skeleton

Shimmering placeholders that hold layout while content loads. Four shapes — --text , --title , --circle and --card — compose into a ghost of the real screen.

- Documentation: https://ui.barua.tz/docs/feedback.html#skeleton
- Classes: `b-card` `b-card__body` `b-skeleton` `b-skeleton--card` `b-skeleton--circle` `b-skeleton--text` `b-skeleton--title`

```html
<div class="b-skeleton b-skeleton--title"></div>
<div class="b-skeleton b-skeleton--text"></div>
<div class="b-skeleton b-skeleton--text" style="width: 75%"></div>
<div class="b-skeleton b-skeleton--circle" style="width: 3rem"></div>
<div class="b-skeleton b-skeleton--card" style="max-width: 18rem"></div>
```

```tsx
import { Skeleton } from "barua-ui";

<Skeleton className="b-skeleton--title"></Skeleton>
<Skeleton className="b-skeleton--text"></Skeleton>
<Skeleton className="b-skeleton--text" style={{ width: "75%" }}></Skeleton>
<Skeleton className="b-skeleton--circle" style={{ width: "3rem" }}></Skeleton>
<Skeleton className="b-skeleton--card" style={{ maxWidth: "18rem" }}></Skeleton>
```

## Result States

A full-panel outcome message for the end of a flow — one component, four modifiers. .b-result--success , .b-result--error , .b-result--warning and .b-result--confirm compose the Success State, Error State, Warning State and Confirmation State patterns from the component list. Each pairs a tinted icon disc with a title, supporting copy and clear next actions.

- Documentation: https://ui.barua.tz/docs/feedback.html#result-states
- Classes: `b-btn` `b-btn--ghost` `b-btn--primary` `b-divider` `b-result` `b-result--confirm` `b-result--error` `b-result--success` `b-result--warning` `b-result__actions` `b-result__desc` `b-result__icon` `b-result__title`

```html
<div class="b-result b-result--success">
  <div class="b-result__icon">
    <svg viewBox="0 0 20 20" fill="none"><path d="m4.5 10.5 3.5 3.5 7.5-8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
  </div>
  <div class="b-result__title">Payment complete</div>
  <div class="b-result__desc">Your receipt is on its way to your inbox. Funds typically arrive within two business days.</div>
  <div class="b-result__actions">
    <button class="b-btn b-btn--primary">View receipt</button>
    <button class="b-btn b-btn--ghost">Done</button>
  </div>
</div>
<hr class="b-divider">
<div class="b-result b-result--error" role="alert">
  <div class="b-result__icon">
    <svg viewBox="0 0 20 20" fill="none"><path d="m5.5 5.5 9 9m0-9-9 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
  </div>
  <div class="b-result__title">Something went wrong</div>
  <div class="b-result__desc">We couldn't process the transfer and no money left your account. Try again, or contact support if it keeps happening.</div>
  <div class="b-result__actions">
    <button class="b-btn b-btn--primary">Try again</button>
    <button class="b-btn b-btn--ghost">Contact support</button>
  </div>
</div>
<hr class="b-divider">
<div class="b-result b-result--warning">
  <div class="b-result__icon">
    <svg viewBox="0 0 20 20" fill="none"><path d="M10 3 18.5 
```

```tsx
import { Button, Divider, Result } from "barua-ui";

<Result tone="success">
  <div className="b-result__icon">
    <svg viewBox="0 0 20 20" fill="none">
      <path d="m4.5 10.5 3.5 3.5 7.5-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
  <div className="b-result__title">Payment complete</div>
  <div className="b-result__desc">Your receipt is on its way to your inbox. Funds typically arrive within two business days.</div>
  <div className="b-result__actions">
    <Button variant="primary">View receipt</Button>
    <Button variant="ghost">Done</Button>
  </div>
</Result>
<Divider />
<Result tone="error" role="alert">
  <div className="b-result__icon">
    <svg viewBox="0 0 20 20" fill="none">
      <path d="m5.5 5.5 9 9m0-9-9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  </div>
  <div className="b-result__title">Something went wrong</div>
  <div className="b-result__desc">We couldn't process the transfer and no money left your account. Try again, or contact support if it keeps happening.</div>
  <div className="b-result__actions">
    <Button variant="primary">Try again</Button>
    <Button variant="ghost">Contact support</Button>
  </div>
</Result>
<Divider />
<Result tone="warning">
  <div className="b-result__icon">
    <svg viewBox="0 0 20 20" fill="none"></svg>
  </div>
</Result>
```

## Redacted

SwiftUI's .redacted(reason: .placeholder) : add .b-redacted to any element and its real content renders as a breathing placeholder block — same box, same layout, no skeleton markup to maintain. Remove the class when data arrives.

- Documentation: https://ui.barua.tz/docs/feedback.html#redacted
- Classes: `b-card` `b-card__body` `b-card__subtitle` `b-card__title` `b-redacted`

```html
<div class="b-card" style="width: 15rem"><div class="b-card__body">
  <div class="b-card__title">Amina Hassan</div>
  <div class="b-card__subtitle">Reconciled 14 invoices</div>
</div></div>
<div class="b-card" style="width: 15rem"><div class="b-card__body">
  <div class="b-card__title b-redacted">Amina Hassan</div>
  <div class="b-card__subtitle b-redacted">Reconciled 14 invoices</div>
</div></div>
```

```tsx
import { Card, CardBody, CardSubtitle, CardTitle } from "barua-ui";

<Card style={{ width: "15rem" }}>
  <CardBody>
    <CardTitle>Amina Hassan</CardTitle>
    <CardSubtitle>Reconciled 14 invoices</CardSubtitle>
  </CardBody>
</Card>
<Card style={{ width: "15rem" }}>
  <CardBody>
    <CardTitle className="b-redacted">Amina Hassan</CardTitle>
    <CardSubtitle className="b-redacted">Reconciled 14 invoices</CardSubtitle>
  </CardBody>
</Card>
```

