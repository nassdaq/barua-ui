# System pages — errors, empty, onboarding

Source: https://ui.barua.tz/docs/system.html
Rules and conventions: https://ui.barua.tz/llms.txt

## Error Page Anatomy

Every error page is the same four pieces stacked on .b-syspage , a flex column that centers itself in the viewport: .b-syspage__code — the oversized status number wearing the accent-to-indigo gradient — .b-syspage__title for the human headline, .b-syspage__desc for one or two sentences on what actually happened, and .b-syspage__actions , a button row with exactly one primary way out. Swap the code for an icon and the same scaffold covers maintenance and any other full-page interruption.

- Documentation: https://ui.barua.tz/docs/system.html#error-page-anatomy

## 404 Page

The classic. Keep the description honest — most 404s are stale links, not user error — and route people home or to a human. The demo pins min-height: 0 ; the real page keeps the default 60vh so it centers in the viewport.

- Documentation: https://ui.barua.tz/docs/system.html#404-page
- Classes: `b-btn` `b-btn--ghost` `b-btn--primary` `b-syspage` `b-syspage__actions` `b-syspage__code` `b-syspage__desc` `b-syspage__title`

```html
<div class="b-syspage" style="min-height: 0">
  <div class="b-syspage__code">404</div>
  <div class="b-syspage__title">Page not found</div>
  <p class="b-syspage__desc">The page you're looking for was moved, renamed, or never existed. Check the address, or head back somewhere familiar.</p>
  <div class="b-syspage__actions">
    <a class="b-btn b-btn--primary" href="#404-page">Go home</a>
    <a class="b-btn b-btn--ghost" href="#404-page">Contact support</a>
  </div>
</div>
```

```tsx
import { ButtonLink, SysPage } from "barua-ui";

<SysPage style={{ minHeight: "0" }}>
  <div className="b-syspage__code">404</div>
  <div className="b-syspage__title">Page not found</div>
  <p className="b-syspage__desc">The page you're looking for was moved, renamed, or never existed. Check the address, or head back somewhere familiar.</p>
  <div className="b-syspage__actions">
    <ButtonLink variant="primary" href="#404-page">Go home</ButtonLink>
    <ButtonLink variant="ghost" href="#404-page">Contact support</ButtonLink>
  </div>
</SysPage>
```

## 403 Page

Denied, not broken. Offer the two exits people actually want: request access, or hop identities. Pair "Switch account" with the Account Switcher from Authentication so nobody has to sign out just to sign back in.

- Documentation: https://ui.barua.tz/docs/system.html#403-page
- Classes: `b-btn` `b-btn--ghost` `b-btn--primary` `b-syspage` `b-syspage__actions` `b-syspage__code` `b-syspage__desc` `b-syspage__title`

```html
<div class="b-syspage" style="min-height: 0">
  <div class="b-syspage__code">403</div>
  <div class="b-syspage__title">Access denied</div>
  <p class="b-syspage__desc">Your account doesn't have permission to view this workspace. Ask an admin to let you in, or try a different account.</p>
  <div class="b-syspage__actions">
    <button class="b-btn b-btn--primary">Request access</button>
    <button class="b-btn b-btn--ghost">Switch account</button>
  </div>
</div>
```

```tsx
import { Button, SysPage } from "barua-ui";

<SysPage style={{ minHeight: "0" }}>
  <div className="b-syspage__code">403</div>
  <div className="b-syspage__title">Access denied</div>
  <p className="b-syspage__desc">Your account doesn't have permission to view this workspace. Ask an admin to let you in, or try a different account.</p>
  <div className="b-syspage__actions">
    <Button variant="primary">Request access</Button>
    <Button variant="ghost">Switch account</Button>
  </div>
</SysPage>
```

## 500 Page

Own it. Say the fault is on your side, promise the data is safe, and hand over a reference code support can actually use — a plain <code> line tucked under the actions.

- Documentation: https://ui.barua.tz/docs/system.html#500-page
- Classes: `b-btn` `b-btn--ghost` `b-btn--primary` `b-footnote` `b-syspage` `b-syspage__actions` `b-syspage__code` `b-syspage__desc` `b-syspage__title` `b-text-tertiary`

```html
<div class="b-syspage" style="min-height: 0">
  <div class="b-syspage__code">500</div>
  <div class="b-syspage__title">Something broke on our side</div>
  <p class="b-syspage__desc">An unexpected error stopped this request. It's not you — your mail is safe, and the team has already been paged.</p>
  <div class="b-syspage__actions">
    <button class="b-btn b-btn--primary">Try again</button>
    <a class="b-btn b-btn--ghost" href="#500-page">View status page</a>
  </div>
  <p class="b-footnote b-text-tertiary">Reference: <code>ERR-2AF4-9C01</code></p>
</div>
```

```tsx
import { Button, ButtonLink, Footnote, SysPage } from "barua-ui";

<SysPage style={{ minHeight: "0" }}>
  <div className="b-syspage__code">500</div>
  <div className="b-syspage__title">Something broke on our side</div>
  <p className="b-syspage__desc">An unexpected error stopped this request. It's not you — your mail is safe, and the team has already been paged.</p>
  <div className="b-syspage__actions">
    <Button variant="primary">Try again</Button>
    <ButtonLink variant="ghost" href="#500-page">View status page</ButtonLink>
  </div>
  <Footnote className="b-text-tertiary">
    Reference:
    <code>ERR-2AF4-9C01</code>
  </Footnote>
</SysPage>
```

## Maintenance Page

The same scaffold minus the status code — an icon where the number would be, a concrete time window, and an indeterminate .b-progress so the page feels alive rather than abandoned.

- Documentation: https://ui.barua.tz/docs/system.html#maintenance-page
- Classes: `b-footnote` `b-progress` `b-progress--indeterminate` `b-progress__fill` `b-syspage` `b-syspage__desc` `b-syspage__title` `b-text-tertiary`

```html
<div class="b-syspage" style="min-height: 0">
  <svg width="44" height="44" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" stroke="var(--b-color-accent)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
  <div class="b-syspage__title">Scheduled maintenance</div>
  <p class="b-syspage__desc">Barua is getting a planned upgrade between 02:00 and 04:30 UTC. Mail keeps arriving the whole time and will be waiting when we're back.</p>
  <div class="b-progress b-progress--indeterminate" style="max-width: 20rem">
    <div class="b-progress__fill"></div>
  </div>
  <p class="b-footnote b-text-tertiary">Started 02:00 UTC · Live updates on the status page</p>
</div>
```

```tsx
import { Footnote, Progress, SysPage } from "barua-ui";

<SysPage style={{ minHeight: "0" }}>
  <svg
    width="44"
    height="44"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" stroke="var(--b-color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
  <div className="b-syspage__title">Scheduled maintenance</div>
  <p className="b-syspage__desc">Barua is getting a planned upgrade between 02:00 and 04:30 UTC. Mail keeps arriving the whole time and will be waiting when we're back.</p>
  <Progress className="b-progress--indeterminate" style={{ maxWidth: "20rem" }}>
    <div className="b-progress__fill"></div>
  </Progress>
  <Footnote className="b-text-tertiary">Started 02:00 UTC · Live updates on the status page</Footnote>
</SysPage>
```

## Offline State

A .b-result--warning panel, not a dead end — reassure people their drafts are safe locally. Toggling it (listening to navigator.onLine and the online / offline events) is app-side wiring; Barua ships the look.

- Documentation: https://ui.barua.tz/docs/system.html#offline-state
- Classes: `b-btn` `b-btn--primary` `b-result` `b-result--warning` `b-result__actions` `b-result__desc` `b-result__icon` `b-result__title`

```html
<div class="b-result b-result--warning">
  <div class="b-result__icon" aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="none"><path d="M2 8.5a14.5 14.5 0 0 1 20 0M5.5 12a9.7 9.7 0 0 1 13 0M9 15.5a4.6 4.6 0 0 1 6 0" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><circle cx="12" cy="19" r="1.2" fill="currentColor"/><path d="m4 4 16 16" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
  </div>
  <div class="b-result__title">You're offline</div>
  <p class="b-result__desc">Barua can't reach the network. Drafts are saved on this device and will send themselves the moment you're back online.</p>
  <div class="b-result__actions">
    <button class="b-btn b-btn--primary">Retry connection</button>
  </div>
</div>
```

```tsx
import { Button, Result } from "barua-ui";

<Result tone="warning">
  <div className="b-result__icon" aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M2 8.5a14.5 14.5 0 0 1 20 0M5.5 12a9.7 9.7 0 0 1 13 0M9 15.5a4.6 4.6 0 0 1 6 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="12" cy="19" r="1.2" fill="currentColor" />
      <path d="m4 4 16 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  </div>
  <div className="b-result__title">You're offline</div>
  <p className="b-result__desc">Barua can't reach the network. Drafts are saved on this device and will send themselves the moment you're back online.</p>
  <div className="b-result__actions">
    <Button variant="primary">Retry connection</Button>
  </div>
</Result>
```

## Permission State

Ask in context, right before the capability is used. A .b-result--confirm panel primes the real browser prompt — explain the payoff first and the OS dialog stops feeling like an ambush.

- Documentation: https://ui.barua.tz/docs/system.html#permission-state
- Classes: `b-btn` `b-btn--ghost` `b-btn--primary` `b-result` `b-result--confirm` `b-result__actions` `b-result__desc` `b-result__icon` `b-result__title`

```html
<div class="b-result b-result--confirm">
  <div class="b-result__icon" aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="none"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
  </div>
  <div class="b-result__title">Turn on notifications?</div>
  <p class="b-result__desc">Get a ping the moment important mail lands — VIP senders and mentions only, never the newsletter flood.</p>
  <div class="b-result__actions">
    <button class="b-btn b-btn--primary">Allow notifications</button>
    <button class="b-btn b-btn--ghost">Not now</button>
  </div>
</div>
```

```tsx
import { Button, Result } from "barua-ui";

<Result tone="confirm">
  <div className="b-result__icon" aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  </div>
  <div className="b-result__title">Turn on notifications?</div>
  <p className="b-result__desc">Get a ping the moment important mail lands — VIP senders and mentions only, never the newsletter flood.</p>
  <div className="b-result__actions">
    <Button variant="primary">Allow notifications</Button>
    <Button variant="ghost">Not now</Button>
  </div>
</Result>
```

## Loading State

Two tools, both from Feedback : a centered spinner when you don't know the shape of what's coming, skeletons when you do. Full-page loading is a .b-spinner--lg plus one quiet line of .b-footnote text — never a paragraph.

- Documentation: https://ui.barua.tz/docs/system.html#loading-state
- Classes: `b-card` `b-card-grid` `b-card__body` `b-footnote` `b-gap-3` `b-skeleton` `b-skeleton--card` `b-skeleton--text` `b-skeleton--title` `b-spinner` `b-spinner--lg` `b-stack--center` `b-text-secondary` `b-vstack`

```html
<div class="b-vstack b-stack--center b-gap-3" role="status" aria-busy="true">
  <span class="b-spinner b-spinner--lg" aria-hidden="true"></span>
  <p class="b-footnote b-text-secondary">Loading your inbox…</p>
</div>
```

```tsx
import { Footnote, Spinner } from "barua-ui";

<div
  className="b-vstack b-stack--center b-gap-3"
  role="status"
  aria-busy="true"
>
  <Spinner size="lg" aria-hidden="true"></Spinner>
  <Footnote className="b-text-secondary">Loading your inbox…</Footnote>
</div>
```

## Empty State

The component lives in Content — this is the pattern. On first run, render .b-empty inside the exact container the content will eventually fill, with the creation action right there instead of hidden in a toolbar.

- Documentation: https://ui.barua.tz/docs/system.html#empty-state
- Classes: `b-btn` `b-btn--ghost` `b-btn--primary` `b-btn--sm` `b-card` `b-card__header` `b-card__title` `b-empty` `b-empty__desc` `b-empty__icon` `b-empty__title`

```html
<div class="b-card">
  <div class="b-card__header">
    <div class="b-card__title">Rules</div>
    <button class="b-btn b-btn--ghost b-btn--sm">Import</button>
  </div>
  <div class="b-empty">
    <div class="b-empty__icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none"><path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </div>
    <div class="b-empty__title">No rules yet</div>
    <p class="b-empty__desc">Rules file, label and archive mail before it ever hits your inbox. Start with one for newsletters — future you says thanks.</p>
    <button class="b-btn b-btn--primary">Create your first rule</button>
  </div>
</div>
```

```tsx
import { Button, Card, CardHeader, CardTitle, EmptyState } from "barua-ui";

<Card>
  <CardHeader>
    <CardTitle>Rules</CardTitle>
    <Button variant="ghost" size="sm">Import</Button>
  </CardHeader>
  <EmptyState>
    <div className="b-empty__icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
    <div className="b-empty__title">No rules yet</div>
    <p className="b-empty__desc">Rules file, label and archive mail before it ever hits your inbox. Start with one for newsletters — future you says thanks.</p>
    <Button variant="primary">Create your first rule</Button>
  </EmptyState>
</Card>
```

## Onboarding

The pitch page. .b-onboarding__hero gives one word the gradient treatment via <em> , a single primary CTA leads, and at most three .b-onboarding-feature rows carry the argument — icons from .b-icon-tile .

- Documentation: https://ui.barua.tz/docs/system.html#onboarding
- Classes: `b-btn` `b-btn--ghost` `b-btn--lg` `b-btn--primary` `b-callout` `b-gap-4` `b-hstack` `b-icon-tile` `b-onboarding` `b-onboarding-feature` `b-onboarding-feature__desc` `b-onboarding-feature__title` `b-onboarding__hero` `b-text-secondary` `b-vstack`

```html
<div class="b-onboarding">
  <div class="b-onboarding__hero">Email that finally feels <em>effortless</em></div>
  <p class="b-callout b-text-secondary" style="max-width: 34rem">One inbox for every account, triaged before you even open it. No folders to invent, no zero to chase.</p>
  <div class="b-hstack">
    <button class="b-btn b-btn--primary b-btn--lg">Get started</button>
    <button class="b-btn b-btn--ghost b-btn--lg">Watch demo</button>
  </div>
  <div class="b-vstack b-gap-4">
    <div class="b-onboarding-feature">
      <span class="b-icon-tile" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none"><path d="M22 12h-6l-2 3h-4l-2-3H2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </span>
      <div>
        <div class="b-onboarding-feature__title">Smart triage</div>
        <div class="b-onboarding-feature__desc">People, receipts and newsletters sort themselves into calm, separate lanes.</div>
      </div>
    </div>
    <div class="b-onboarding-feature">
      <span class="b-icon-tile" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="8" stroke="currentColor" 
```

```tsx
import { Button, Callout, IconTile, Onboarding, OnboardingHero } from "barua-ui";

<Onboarding>
  <OnboardingHero>
    Email that finally feels
    <em>effortless</em>
  </OnboardingHero>
  <Callout className="b-text-secondary" style={{ maxWidth: "34rem" }}>One inbox for every account, triaged before you even open it. No folders to invent, no zero to chase.</Callout>
  <div className="b-hstack">
    <Button variant="primary" size="lg">Get started</Button>
    <Button variant="ghost" size="lg">Watch demo</Button>
  </div>
  <div className="b-vstack b-gap-4">
    <div className="b-onboarding-feature">
      <IconTile aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M22 12h-6l-2 3h-4l-2-3H2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </IconTile>
      <div>
        <div className="b-onboarding-feature__title">Smart triage</div>
        <div className="b-onboarding-feature__desc">People, receipts and newsletters sort themselves into calm, separate lanes.</div>
      </div>
    </div>
    <div className="b-onboarding-feature">
      <IconTile aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none"></svg>
      </IconTile>
    </div>
  </div>
</Onboarding>
```

## Welcome Screen

The Apple-style first-launch sheet: app icon up top ( .b-auth-card__logo ), a "Welcome to" hero, a short feature list, and a single Continue button in a .b-form-actions footer. In a real sheet, pin that footer to the bottom edge so Continue never scrolls away.

- Documentation: https://ui.barua.tz/docs/system.html#welcome-screen
- Classes: `b-auth-card__logo` `b-btn` `b-btn--lg` `b-btn--primary` `b-form-actions` `b-gap-4` `b-icon-tile` `b-onboarding` `b-onboarding-feature` `b-onboarding-feature__desc` `b-onboarding-feature__title` `b-onboarding__hero` `b-vstack`

```html
<div class="b-onboarding">
  <div class="b-auth-card__logo" aria-hidden="true">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="2.5" y="4.5" width="19" height="15" rx="3.5" stroke="currentColor" stroke-width="1.5"/><path d="m5 8.2 7 5.3 7-5.3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
  </div>
  <div class="b-onboarding__hero">Welcome to <em>Barua</em></div>
  <div class="b-vstack b-gap-4">
    <div class="b-onboarding-feature">
      <span class="b-icon-tile" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.6"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
      </span>
      <div>
        <div class="b-onboarding-feature__title">All of your accounts</div>
        <div class="b-onboarding-feature__desc">Work, personal and that address from 2011 — unified in one inbox, color-coded per identity.</div>
      </div>
    </div>
    <div class="b-onboarding-feature">
      <span class="b-icon-tile" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </span>
      <div>
        <div class
```

```tsx
import { IconTile, Onboarding, OnboardingHero } from "barua-ui";

<Onboarding>
  <div className="b-auth-card__logo" aria-hidden="true">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="2.5" y="4.5" width="19" height="15" rx="3.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="m5 8.2 7 5.3 7-5.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
  <OnboardingHero>
    Welcome to
    <em>Barua</em>
  </OnboardingHero>
  <div className="b-vstack b-gap-4">
    <div className="b-onboarding-feature">
      <IconTile aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
          <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </IconTile>
      <div>
        <div className="b-onboarding-feature__title">All of your accounts</div>
        <div className="b-onboarding-feature__desc">Work, personal and that address from 2011 — unified in one inbox, color-coded per identity.</div>
      </div>
    </div>
    <div className="b-onboarding-feature">
      <IconTile aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </IconTile>
      <div></div>
    </div>
  </div>
</Onboarding>
```

