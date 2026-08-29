# Infrastructure — naming, theming, accessibility, contribution

Source: https://ui.barua.tz/docs/infrastructure.html
Rules and conventions: https://ui.barua.tz/llms.txt

## MCP server

The system is also a service. Rather than loading a 500 KB index into context, an agent can ask it questions — and, more usefully, hand back the markup it just wrote to be judged before shipping it. Hosted, so a coding agent that has never seen this repository can still use the system correctly:

- Documentation: https://ui.barua.tz/docs/infrastructure.html#mcp
- Classes: `b-code` `b-code__copy` `b-code__header`

## Design Tokens

Every visual decision is a custom property prefixed --b- , defined once in css/tokens.css . Tokens come in three tiers: primitives are raw values ( --b-blue-500 is Barua blue), semantic tokens give values meaning and carry the light/dark pair ( --b-color-accent ), and components consume the semantic tier — never the primitives.

- Documentation: https://ui.barua.tz/docs/infrastructure.html#design-tokens
- Classes: `b-code` `b-code__header` `b-table` `b-table-wrap`

## Architecture & Layers

Barua is one stylesheet with a declared cascade. css/barua.css opens with @layer tokens, base, utilities, components; — later layers win, so components can rely on base and utilities without specificity wars. Your own overrides live unlayered , and unlayered CSS always beats layered rules: a plain .b-btn { border-radius: 0 } in your app stylesheet wins without !important .

- Documentation: https://ui.barua.tz/docs/infrastructure.html#architecture-layers
- Classes: `b-code` `b-code__copy` `b-code__header`

## Naming Conventions

BEM with a b- namespace. If a class starts with .b- it ships with Barua; if it starts with .is- it is runtime state; if an attribute starts with data-b- it is a JS behavior hook, never a styling hook.

- Documentation: https://ui.barua.tz/docs/infrastructure.html#naming-conventions
- Classes: `b-table` `b-table-wrap`

## Component Variants

Variants are modifier classes along two standard axes. The visual axis sets prominence — primary, tinted, outline, ghost, glass, danger — and reads the same on every component that offers it. Buttons carry the full set:

- Documentation: https://ui.barua.tz/docs/infrastructure.html#component-variants
- Classes: `b-badge` `b-badge--danger` `b-badge--success` `b-badge--warning` `b-btn` `b-btn--danger` `b-btn--danger-tinted` `b-btn--ghost` `b-btn--glass` `b-btn--outline` `b-btn--primary` `b-btn--sm` `b-btn--success` `b-btn--tinted`

```html
<button class="b-btn b-btn--primary">Primary</button>
<button class="b-btn b-btn--tinted">Tinted</button>
<button class="b-btn">Default</button>
<button class="b-btn b-btn--outline">Outline</button>
<button class="b-btn b-btn--ghost">Ghost</button>
<button class="b-btn b-btn--glass">Glass</button>
<button class="b-btn b-btn--danger">Danger</button>
```

```tsx
import { Button } from "barua-ui";

<Button variant="primary">Primary</Button>
<Button variant="tinted">Tinted</Button>
<Button>Default</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="glass">Glass</Button>
<Button variant="danger">Danger</Button>
```

## Component States

State is expressed twice: an aria-* attribute for assistive technology and, where no semantic attribute exists, an .is-* class for styling. Barua's selectors target both, so setting the aria attribute alone is enough for the components below. The full state language lives in Interaction .

- Documentation: https://ui.barua.tz/docs/infrastructure.html#component-states
- Classes: `b-btn` `b-btn--primary` `b-chip` `b-table` `b-table-wrap` `b-toggle-btn`

```html
<button class="b-btn b-toggle-btn" aria-pressed="true">Watching</button>
<button class="b-chip is-selected">Design</button>
<button class="b-btn is-active">Active</button>
<button class="b-btn b-btn--primary is-loading">Saving…</button>
<button class="b-btn" disabled>Disabled</button>
```

```tsx
import { Button, Chip, ToggleButton } from "barua-ui";

<ToggleButton className="b-btn" aria-pressed="true">Watching</ToggleButton>
<Chip selected>Design</Chip>
<Button active>Active</Button>
<Button variant="primary" loading>Saving…</Button>
<Button disabled>Disabled</Button>
```

## Component Sizes

One height scale for every control, held in the --b-control-h-* tokens. Modifiers are --xs , --sm , medium by default, --lg , --xl ; font size and radius step down or up with the height.

- Documentation: https://ui.barua.tz/docs/infrastructure.html#component-sizes
- Classes: `b-btn` `b-btn--lg` `b-btn--sm` `b-btn--xl` `b-btn--xs` `b-hstack` `b-input` `b-input--lg` `b-input--sm` `b-stack--wrap` `b-table` `b-table-wrap` `b-table__num`

```html
<div class="b-hstack b-stack--wrap">
  <button class="b-btn b-btn--xs">Extra small</button>
  <button class="b-btn b-btn--sm">Small</button>
  <button class="b-btn">Medium</button>
  <button class="b-btn b-btn--lg">Large</button>
  <button class="b-btn b-btn--xl">Extra large</button>
</div>
<div class="b-hstack b-stack--wrap">
  <input class="b-input b-input--sm" style="max-width: 11rem" placeholder="Small input">
  <input class="b-input" style="max-width: 11rem" placeholder="Medium input">
  <input class="b-input b-input--lg" style="max-width: 11rem" placeholder="Large input">
</div>
```

```tsx
import { Button, Input } from "barua-ui";

<div className="b-hstack b-stack--wrap">
  <Button size="xs">Extra small</Button>
  <Button size="sm">Small</Button>
  <Button>Medium</Button>
  <Button size="lg">Large</Button>
  <Button size="xl">Extra large</Button>
</div>
<div className="b-hstack b-stack--wrap">
  <Input className="b-input--sm" style={{ maxWidth: "11rem" }} placeholder="Small input" />
  <Input style={{ maxWidth: "11rem" }} placeholder="Medium input" />
  <Input className="b-input--lg" style={{ maxWidth: "11rem" }} placeholder="Large input" />
</div>
```

## Icon System

Icons are inline SVGs on a 20×20 viewBox: 1.5px strokes, round caps and joins, fill="none" , and currentColor throughout so they inherit text color in every variant and theme. The .b-icon wrapper sizes them — --sm 16px, default 20px, --lg 24px, --xl 32px. Inside buttons no wrapper is needed; the button scales its own SVG.

- Documentation: https://ui.barua.tz/docs/infrastructure.html#icon-system
- Classes: `b-code` `b-code__header` `b-gap-2` `b-hstack` `b-icon` `b-icon--lg` `b-icon--sm`

```html
<div class="b-hstack b-gap-2" aria-label="Envelope at 16, 20 and 24 pixels">
  <span class="b-icon b-icon--sm"><svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="2" y="4.5" width="16" height="11" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="m3.5 6.5 6.5 4.5 6.5-4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
  <span class="b-icon"><svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="2" y="4.5" width="16" height="11" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="m3.5 6.5 6.5 4.5 6.5-4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
  <span class="b-icon b-icon--lg"><svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="2" y="4.5" width="16" height="11" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="m3.5 6.5 6.5 4.5 6.5-4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
</div>
<div class="b-hstack b-gap-2" aria-label="Search at 16, 20 and 24 pixels">
  <span class="b-icon b-icon--sm"><svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="9" cy="9" r="5.5" stroke="currentColor" stroke-width="1.5"/><path d="m13.4 13.4 3.6 3.6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></span>
  <span class="b-icon"
```

```tsx
import { Icon } from "barua-ui";

<div
  className="b-hstack b-gap-2"
  aria-label="Envelope at 16, 20 and 24 pixels"
>
  <Icon className="b-icon--sm">
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="2" y="4.5" width="16" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="m3.5 6.5 6.5 4.5 6.5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </Icon>
  <Icon>
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="2" y="4.5" width="16" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="m3.5 6.5 6.5 4.5 6.5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </Icon>
  <Icon className="b-icon--lg">
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="2" y="4.5" width="16" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="m3.5 6.5 6.5 4.5 6.5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </Icon>
</div>
<div
  className="b-hstack b-gap-2"
  aria-label="Search at 16, 20 and 24 pixels"
>
  <Icon className="b-icon--sm">
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="m13.4 13.4 3.6 3.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  </Icon>
</div>
```

## Theme System

Every color token is declared once with light-dark() and :root sets color-scheme: light dark , so with no attribute at all the UI follows the system appearance. Setting data-theme="light" or data-theme="dark" on <html> forces a scheme by flipping color-scheme — no second stylesheet, no class swap. Each docs page restores the saved choice before first paint:

- Documentation: https://ui.barua.tz/docs/infrastructure.html#theme-system
- Classes: `b-btn` `b-btn--primary` `b-btn--sm` `b-code` `b-code__header` `b-table` `b-table-wrap`

```html
<button class="b-btn b-btn--primary b-btn--sm">Blue</button>
<span data-accent="indigo"><button class="b-btn b-btn--primary b-btn--sm">Indigo</button></span>
<span data-accent="purple"><button class="b-btn b-btn--primary b-btn--sm">Purple</button></span>
<span data-accent="pink"><button class="b-btn b-btn--primary b-btn--sm">Pink</button></span>
<span data-accent="teal"><button class="b-btn b-btn--primary b-btn--sm">Teal</button></span>
<span data-accent="green"><button class="b-btn b-btn--primary b-btn--sm">Green</button></span>
```

```tsx
import { Button } from "barua-ui";

<Button variant="primary" size="sm">Blue</Button>
<span data-accent="indigo">
  <Button variant="primary" size="sm">Indigo</Button>
</span>
<span data-accent="purple">
  <Button variant="primary" size="sm">Purple</Button>
</span>
<span data-accent="pink">
  <Button variant="primary" size="sm">Pink</Button>
</span>
<span data-accent="teal">
  <Button variant="primary" size="sm">Teal</Button>
</span>
<span data-accent="green">
  <Button variant="primary" size="sm">Green</Button>
</span>
```

## Responsive System

Mobile-first: base styles target small screens and min-width queries layer on refinements at the breakpoint values below (a documented convention in tokens.css — media queries cannot read custom properties, so the values are used literally).

- Documentation: https://ui.barua.tz/docs/infrastructure.html#responsive-system
- Classes: `b-badge` `b-badge--accent` `b-hide-desktop` `b-hide-mobile` `b-table` `b-table-wrap` `b-table__num`

```html
<span class="b-badge b-badge--accent b-hide-mobile">Desktop only (≥768px)</span>
<span class="b-badge b-badge--accent b-hide-desktop">Mobile only (&lt;768px)</span>
<span class="b-badge">Always visible</span>
```

```tsx
import { Badge } from "barua-ui";

<Badge variant="accent" className="b-hide-mobile">Desktop only (≥768px)</Badge>
<Badge variant="accent" className="b-hide-desktop">Mobile only (<768px)</Badge>
<Badge>Always visible</Badge>
```

## Accessibility System

Accessibility is infrastructure, not a per-component afterthought. The baseline contract every component inherits:

- Documentation: https://ui.barua.tz/docs/infrastructure.html#accessibility-system
- Classes: `b-table` `b-table-wrap`

## Motion System

Five durations, five curves — all tokens, so timing stays consistent across components. Small feedback is near-instant; the bigger the surface, the longer and springier the move.

- Documentation: https://ui.barua.tz/docs/infrastructure.html#motion-system
- Classes: `b-table` `b-table-wrap` `b-table__num`

## Interaction States

The full interaction-state language — hover, pressed ( :active / .is-pressed ), drag ( .is-dragging , [draggable] cursors), selection rectangles, drop indicators and focus choreography — is a pattern page of its own. This page defines the naming; see Interaction for live demos of each state applied across components.

- Documentation: https://ui.barua.tz/docs/infrastructure.html#interaction-states

## Composition Patterns

Big surfaces are assembled, not invented. An auth screen is .b-card + .b-field + .b-btn (packaged as .b-auth-card on Authentication ); a dashboard is .b-grid + .b-card + .b-stat + .b-chart (see Productivity and Data Visualization ). The same three primitives compose a working sign-in card with zero new CSS:

- Documentation: https://ui.barua.tz/docs/infrastructure.html#composition-patterns
- Classes: `b-btn` `b-btn--block` `b-btn--primary` `b-card` `b-card__body` `b-card__subtitle` `b-card__title` `b-field` `b-gap-4` `b-input` `b-label` `b-stack`

```html
<div class="b-card" style="width: min(22rem, 100%)">
  <div class="b-card__body b-stack b-gap-4">
    <div>
      <div class="b-card__title">Sign in</div>
      <div class="b-card__subtitle">Card + field + button — nothing else.</div>
    </div>
    <div class="b-field">
      <label class="b-label" for="infra-email">Email</label>
      <input class="b-input" id="infra-email" type="email" placeholder="you@example.com">
    </div>
    <button class="b-btn b-btn--primary b-btn--block">Continue</button>
  </div>
</div>
```

```tsx
import { Button, Card, CardBody, CardSubtitle, CardTitle, Field, Input, Label } from "barua-ui";

<Card style={{ width: "min(22rem, 100%)" }}>
  <CardBody className="b-stack b-gap-4">
    <div>
      <CardTitle>Sign in</CardTitle>
      <CardSubtitle>Card + field + button — nothing else.</CardSubtitle>
    </div>
    <Field>
      <Label htmlFor="infra-email">Email</Label>
      <Input id="infra-email" type="email" placeholder="you@example.com" />
    </Field>
    <Button variant="primary" block>Continue</Button>
  </CardBody>
</Card>
```

## Content Guidelines

Voice is part of the system. Buttons are verb-first and specific — they say what happens, not what the dialog is about. Sentence case everywhere: buttons, labels, headings, menu items. Errors say what went wrong and what to do next, in words a person would use; error codes belong in logs, not in .b-error text.

- Documentation: https://ui.barua.tz/docs/infrastructure.html#content-guidelines

## Usage & Contribution Guidelines

Compose first. If a design can be assembled from existing components plus layout utilities, compose it in markup — do not add CSS. Add a new component only when a pattern recurs across several screens or needs its own state contract. New components get a block name, live in css/components/ inside @layer components , and are imported from barua.css . Before shipping one:

- Documentation: https://ui.barua.tz/docs/infrastructure.html#usage-contribution
- Classes: `b-list` `b-list-item` `b-list-item__content` `b-list-item__leading` `b-list-item__subtitle` `b-list-item__title`

## Documentation Conventions

These docs are themselves built from Barua — docs.css styles only the chrome (shell, hero, demo frames), so every demo you see is the real system rendering itself. Each section follows one anatomy: .docs-section with an h2[id] , short prose, a live .docs-demo , and a .docs-a11y note where the component has sharp edges. docs.js generates the collapsible HTML block under every demo from its actual markup — the code you copy is the code that rendered, and can never drift. Demos marked data-no-code skip the block when the markup would be noise. The same script builds the right-rail table of contents from the section headings and feeds the ⌘K palette from the sidebar, so navigation stays in sync with the pages for free.

- Documentation: https://ui.barua.tz/docs/infrastructure.html#documentation-conventions

