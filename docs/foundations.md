# Foundations — tokens, colour, type, materials, motion

Source: https://ui.barua.tz/docs/foundations.html
Rules and conventions: https://ui.barua.tz/llms.txt

## Color System

Every color token is a light-dark() pair, so a single name is always correct in either scheme. The accent family drives buttons, links, focus and selection; re-tint the whole system with data-accent="indigo|purple|pink|teal|green" on <html> .

- Documentation: https://ui.barua.tz/docs/foundations.html#color-system
- Classes: `b-badge` `b-badge--accent` `b-btn` `b-btn--ghost` `b-btn--glass` `b-btn--primary` `b-btn--sm` `b-card` `b-card--glass` `b-card--neutral` `b-card__body` `b-card__header` `b-card__title` `b-footnote` `b-gap-2` `b-gap-3` `b-hstack` `b-link` `b-stack` `b-stack--wrap` `b-text-secondary` `b-wall` `b-wallpaper-scope`

```html
<div class="b-hstack b-stack--wrap b-gap-2">
  <button class="b-btn b-btn--glass b-btn--sm" onclick="baruaWallDemo('../examples/assets/ambient-bg.svg')">Papercut</button>
  <button class="b-btn b-btn--glass b-btn--sm" onclick="baruaWallDemo('../examples/assets/cave-wall.svg')">Cave wall</button>
  <label class="b-btn b-btn--primary b-btn--sm">
    Choose an image…
    <input type="file" accept="image/*" style="display: none" onchange="baruaWallFile(this.files[0])">
  </label>
  <button class="b-btn b-btn--ghost b-btn--sm" onclick="baruaWallDemo(null)">Bare wall</button>
</div>

<div id="wall-demo-frame">
  <div class="b-wall b-wallpaper-scope" id="wall-demo" style="padding: var(--b-space-6); border-radius: var(--b-radius-xl)">
    <article class="b-card b-card--neutral" style="max-width: 21rem">
      <div class="b-card__header">
        <div class="b-card__title">Glass needs a backdrop</div>
        <span class="b-badge b-badge--accent">Live</span>
      </div>
      <div class="b-card__body b-stack b-gap-2">
        <p class="b-footnote b-text-secondary" style="margin: 0">
          Change the wall and watch the material, the ink and the
          accent all answer to the picture.
        </p>
        <span><button class="b-btn b-btn--primary b-btn--sm">Action</button></span>
      </div>
    </article>
  </div>
</div>

<p class="b-footnote b-text-secondary" style="margin: 0"
```

```tsx
import { Badge, Button, Card, CardBody, CardHeader, CardTitle, Footnote, Wall } from "barua-ui";

<div className="b-hstack b-stack--wrap b-gap-2">
  <Button
    variant="glass"
    size="sm"
    onclick="baruaWallDemo('../examples/assets/ambient-bg.svg')"
  >
    Papercut
  </Button>
  <Button
    variant="glass"
    size="sm"
    onclick="baruaWallDemo('../examples/assets/cave-wall.svg')"
  >
    Cave wall
  </Button>
  <Button variant="primary" size="sm">
    Choose an image…
    <input type="file" accept="image/*" style={{ display: "none" }} onchange="baruaWallFile(this.files[0])" />
  </Button>
  <Button variant="ghost" size="sm" onclick="baruaWallDemo(null)">Bare wall</Button>
</div>
<div id="wall-demo-frame">
  <Wall
    className="b-wallpaper-scope"
    id="wall-demo"
    style={{ padding: "var(--b-space-6)", borderRadius: "var(--b-radius-xl)" }}
  >
    <Card className="b-card--neutral" style={{ maxWidth: "21rem" }}>
      <CardHeader>
        <CardTitle>Glass needs a backdrop</CardTitle>
        <Badge variant="accent">Live</Badge>
      </CardHeader>
      <CardBody className="b-stack b-gap-2">
        <Footnote className="b-text-secondary" style={{ margin: "0" }}>Change the wall and watch the material, the ink and the accent all answer to the picture.</Footnote>
        <span>
          <Button variant="primary" size="sm">Action</Button>
        </span>
      </CardBody>
    </Card>
  </Wall>
</div>
```

## Typography

A text style is a whole set of metrics, not a size: every role below states its own size, weight, leading and tracking together. Small text is not body text made smaller — a caption opens its tracking slightly and tightens its leading, which is why inheriting those values from the page would be wrong. Headings of the same size as a role use the same metrics as that role, so <h5> and .b-headline are typographically identical.

- Documentation: https://ui.barua.tz/docs/foundations.html#typography
- Classes: `b-table` `b-table-wrap`

## Font Scale

The Apple HIG scale, exposed as one class per role. Elements h1 – h6 map onto it automatically; use the classes when semantics and size need to differ — a card title that is an h3 but should read as a headline, for instance.

- Documentation: https://ui.barua.tz/docs/foundations.html#font-scale
- Classes: `b-body` `b-callout` `b-caption` `b-footnote` `b-headline` `b-large-title` `b-overline` `b-subheadline` `b-tabular-nums` `b-text-tertiary` `b-text-uppercase` `b-title1` `b-title2` `b-title3` `b-truncate`

## Spacing

A 4px base scale. Use 1–3 for padding inside controls, 4–6 between related elements, 8–12 between groups, and 16–24 between page sections. If a gap isn't on the scale, it isn't in the system.

- Documentation: https://ui.barua.tz/docs/foundations.html#spacing

## Grid

.b-grid is 12 columns by default; set --b-cols or use .b-grid--2/3/4/6 for equal tracks, and span with .b-col-span-* . .b-grid--auto auto-fills against --b-col-min , and .b-card-grid / .b-masonry handle card walls without media queries. Gaps come from the spacing scale via .b-gap-* .

- Documentation: https://ui.barua.tz/docs/foundations.html#grid
- Classes: `b-col-span-4` `b-col-span-6` `b-col-span-full` `b-footnote` `b-grid` `b-grid--3` `b-panel` `b-text-center`

```html
<div class="b-grid b-grid--3">
  <div class="b-panel b-text-center b-footnote" style="padding: var(--b-space-3)">1 / 3</div>
  <div class="b-panel b-text-center b-footnote" style="padding: var(--b-space-3)">1 / 3</div>
  <div class="b-panel b-text-center b-footnote" style="padding: var(--b-space-3)">1 / 3</div>
</div>
<div class="b-grid">
  <div class="b-panel b-text-center b-footnote b-col-span-6" style="padding: var(--b-space-3)">span 6</div>
  <div class="b-panel b-text-center b-footnote b-col-span-6" style="padding: var(--b-space-3)">span 6</div>
  <div class="b-panel b-text-center b-footnote b-col-span-4" style="padding: var(--b-space-3)">span 4</div>
  <div class="b-panel b-text-center b-footnote b-col-span-4" style="padding: var(--b-space-3)">span 4</div>
  <div class="b-panel b-text-center b-footnote b-col-span-4" style="padding: var(--b-space-3)">span 4</div>
  <div class="b-panel b-text-center b-footnote b-col-span-full" style="padding: var(--b-space-3)">span full</div>
</div>
```

```tsx
import { Footnote, Grid } from "barua-ui";

<Grid cols={3}>
  <Footnote
    className="b-panel b-text-center"
    style={{ padding: "var(--b-space-3)" }}
  >
    1 / 3
  </Footnote>
  <Footnote
    className="b-panel b-text-center"
    style={{ padding: "var(--b-space-3)" }}
  >
    1 / 3
  </Footnote>
  <Footnote
    className="b-panel b-text-center"
    style={{ padding: "var(--b-space-3)" }}
  >
    1 / 3
  </Footnote>
</Grid>
<Grid>
  <Footnote
    className="b-panel b-text-center b-col-span-6"
    style={{ padding: "var(--b-space-3)" }}
  >
    span 6
  </Footnote>
  <Footnote
    className="b-panel b-text-center b-col-span-6"
    style={{ padding: "var(--b-space-3)" }}
  >
    span 6
  </Footnote>
  <Footnote
    className="b-panel b-text-center b-col-span-4"
    style={{ padding: "var(--b-space-3)" }}
  >
    span 4
  </Footnote>
  <Footnote
    className="b-panel b-text-center b-col-span-4"
    style={{ padding: "var(--b-space-3)" }}
  >
    span 4
  </Footnote>
  <Footnote
    className="b-panel b-text-center b-col-span-4"
    style={{ padding: "var(--b-space-3)" }}
  >
    span 4
  </Footnote>
  <Footnote
    className="b-panel b-text-center b-col-span-full"
    style={{ padding: "var(--b-space-3)" }}
  >
    span full
  </Footnote>
</Grid>
```

## Layout

SwiftUI-style primitives: .b-vstack and .b-hstack flow content with a token gap, and .b-spacer absorbs the leftover space — that trio builds most toolbars and headers. .b-container centers a page column, .b-section spaces bands of content, and .b-split + .b-panel make resizable multi-pane layouts.

- Documentation: https://ui.barua.tz/docs/foundations.html#layout
- Classes: `b-btn` `b-btn--primary` `b-btn--sm` `b-footnote` `b-gap-1` `b-headline` `b-hstack` `b-panel` `b-spacer` `b-table` `b-table-wrap` `b-text-secondary` `b-vstack`

```html
<div class="b-hstack b-panel" style="padding: var(--b-space-3)">
  <span class="b-headline">Inbox</span>
  <span class="b-spacer"></span>
  <button class="b-btn b-btn--sm">Filter</button>
  <button class="b-btn b-btn--primary b-btn--sm">Compose</button>
</div>
<div class="b-vstack b-gap-1 b-panel" style="padding: var(--b-space-3)">
  <span class="b-headline">VStack</span>
  <span class="b-footnote b-text-secondary">Children flow vertically; the gap comes from --b-gap.</span>
</div>
```

```tsx
import { Button, Footnote, Spacer } from "barua-ui";

<div className="b-hstack b-panel" style={{ padding: "var(--b-space-3)" }}>
  <span className="b-headline">Inbox</span>
  <Spacer></Spacer>
  <Button size="sm">Filter</Button>
  <Button variant="primary" size="sm">Compose</Button>
</div>
<div
  className="b-vstack b-gap-1 b-panel"
  style={{ padding: "var(--b-space-3)" }}
>
  <span className="b-headline">VStack</span>
  <Footnote className="b-text-secondary">Children flow vertically; the gap comes from --b-gap.</Footnote>
</div>
```

## Breakpoints

Custom properties can't drive @media , so breakpoints are a convention: six shared stops, written by value, always mobile-first with @media (min-width: …) . Base styles serve the phone; each stop only adds.

- Documentation: https://ui.barua.tz/docs/foundations.html#breakpoints
- Classes: `b-table` `b-table-wrap`

## Border Radius

Corners grow with the surface, Apple-style: xs for inline code and checkboxes, sm for chips and kbd, md for buttons, inputs and menus, lg for panels and toolbars, xl for cards and modals, 2xl for sheets, and full for pills and avatars. Never give a small control a bigger radius than the surface it sits on.

- Documentation: https://ui.barua.tz/docs/foundations.html#border-radius
- Classes: `b-caption2` `b-gap-1` `b-stack` `b-stack--center` `b-text-tertiary`

```html
<div class="b-stack b-stack--center b-gap-1">
  <div style="width: 6rem; height: 4rem; background: var(--b-color-accent-soft); border: 1px solid var(--b-color-accent); border-radius: var(--b-radius-xs)"></div>
  <code>--b-radius-xs</code>
  <span class="b-caption2 b-text-tertiary">4px</span>
</div>
<div class="b-stack b-stack--center b-gap-1">
  <div style="width: 6rem; height: 4rem; background: var(--b-color-accent-soft); border: 1px solid var(--b-color-accent); border-radius: var(--b-radius-sm)"></div>
  <code>--b-radius-sm</code>
  <span class="b-caption2 b-text-tertiary">6px</span>
</div>
<div class="b-stack b-stack--center b-gap-1">
  <div style="width: 6rem; height: 4rem; background: var(--b-color-accent-soft); border: 1px solid var(--b-color-accent); border-radius: var(--b-radius-md)"></div>
  <code>--b-radius-md</code>
  <span class="b-caption2 b-text-tertiary">10px</span>
</div>
<div class="b-stack b-stack--center b-gap-1">
  <div style="width: 6rem; height: 4rem; background: var(--b-color-accent-soft); border: 1px solid var(--b-color-accent); border-radius: var(--b-radius-lg)"></div>
  <code>--b-radius-lg</code>
  <span class="b-caption2 b-text-tertiary">14px</span>
</div>
<div class="b-stack b-stack--center b-gap-1">
  <div style="width: 6rem; height: 4rem; background: var(--b-color-accent-soft); border: 1px solid var(--b-color-accent); border-radius: var(--b-radius-
```

## Shadows

Soft, layered, never harsh — each token stacks a contact shadow with a wide ambient one, and --b-shadow-color deepens automatically in dark mode. --b-shadow-accent is a blue glow reserved for the FAB and other floating accent controls. Prefer the elevation tokens below, which pair these with a hairline ring.

- Documentation: https://ui.barua.tz/docs/foundations.html#shadows
- Classes: `b-gap-1` `b-stack` `b-stack--center`

```html
<div class="b-stack b-stack--center b-gap-1">
  <div style="width: 6.5rem; height: 4rem; border-radius: var(--b-radius-lg); background: var(--b-surface); box-shadow: var(--b-shadow-xs)"></div>
  <code>--b-shadow-xs</code>
</div>
<div class="b-stack b-stack--center b-gap-1">
  <div style="width: 6.5rem; height: 4rem; border-radius: var(--b-radius-lg); background: var(--b-surface); box-shadow: var(--b-shadow-sm)"></div>
  <code>--b-shadow-sm</code>
</div>
<div class="b-stack b-stack--center b-gap-1">
  <div style="width: 6.5rem; height: 4rem; border-radius: var(--b-radius-lg); background: var(--b-surface); box-shadow: var(--b-shadow-md)"></div>
  <code>--b-shadow-md</code>
</div>
<div class="b-stack b-stack--center b-gap-1">
  <div style="width: 6.5rem; height: 4rem; border-radius: var(--b-radius-lg); background: var(--b-surface); box-shadow: var(--b-shadow-lg)"></div>
  <code>--b-shadow-lg</code>
</div>
<div class="b-stack b-stack--center b-gap-1">
  <div style="width: 6.5rem; height: 4rem; border-radius: var(--b-radius-lg); background: var(--b-surface); box-shadow: var(--b-shadow-xl)"></div>
  <code>--b-shadow-xl</code>
</div>
<div class="b-stack b-stack--center b-gap-1">
  <div style="width: 6.5rem; height: 4rem; border-radius: var(--b-radius-lg); background: var(--b-surface); box-shadow: var(--b-shadow-accent)"></div>
  <code>--b-shadow-accent</code>
</div>
```

## Elevation

The elevation ladder pairs each shadow with a 1px hairline ring ( --b-ring ) so edges stay crisp on any background. Use the utilities: 1 for resting cards, 2 for raised cards and glass toolbars, 3 for menus and popovers, 4 for modals and drawers, 5 for the command palette. Level 0 removes elevation for flush surfaces.

- Documentation: https://ui.barua.tz/docs/foundations.html#elevation
- Classes: `b-elevation-1` `b-elevation-2` `b-elevation-3` `b-elevation-4` `b-elevation-5` `b-gap-2` `b-radius-lg` `b-stack` `b-stack--center`

```html
<div class="b-stack b-stack--center b-gap-2">
  <div class="b-elevation-1 b-radius-lg" style="width: 6.5rem; height: 4rem; background: var(--b-surface)"></div>
  <code>.b-elevation-1</code>
</div>
<div class="b-stack b-stack--center b-gap-2">
  <div class="b-elevation-2 b-radius-lg" style="width: 6.5rem; height: 4rem; background: var(--b-surface)"></div>
  <code>.b-elevation-2</code>
</div>
<div class="b-stack b-stack--center b-gap-2">
  <div class="b-elevation-3 b-radius-lg" style="width: 6.5rem; height: 4rem; background: var(--b-surface)"></div>
  <code>.b-elevation-3</code>
</div>
<div class="b-stack b-stack--center b-gap-2">
  <div class="b-elevation-4 b-radius-lg" style="width: 6.5rem; height: 4rem; background: var(--b-surface)"></div>
  <code>.b-elevation-4</code>
</div>
<div class="b-stack b-stack--center b-gap-2">
  <div class="b-elevation-5 b-radius-lg" style="width: 6.5rem; height: 4rem; background: var(--b-surface)"></div>
  <code>.b-elevation-5</code>
</div>
```

## Opacity

Three stops, three meanings. hover (0.85) dims media and imagery under the pointer, muted (0.6) de-emphasizes without disabling, and disabled (0.4) is applied automatically by :disabled and .is-disabled — never hand-roll a disabled look.

- Documentation: https://ui.barua.tz/docs/foundations.html#opacity
- Classes: `b-caption2` `b-gap-1` `b-stack` `b-stack--center` `b-text-tertiary`

```html
<div class="b-stack b-stack--center b-gap-1">
  <div style="width: 5.5rem; height: 3.5rem; border-radius: var(--b-radius-md); background: var(--b-color-accent)"></div>
  <code>base</code>
  <span class="b-caption2 b-text-tertiary">1</span>
</div>
<div class="b-stack b-stack--center b-gap-1">
  <div style="width: 5.5rem; height: 3.5rem; border-radius: var(--b-radius-md); background: var(--b-color-accent); opacity: var(--b-opacity-hover)"></div>
  <code>--b-opacity-hover</code>
  <span class="b-caption2 b-text-tertiary">0.85</span>
</div>
<div class="b-stack b-stack--center b-gap-1">
  <div style="width: 5.5rem; height: 3.5rem; border-radius: var(--b-radius-md); background: var(--b-color-accent); opacity: var(--b-opacity-muted)"></div>
  <code>--b-opacity-muted</code>
  <span class="b-caption2 b-text-tertiary">0.6</span>
</div>
<div class="b-stack b-stack--center b-gap-1">
  <div style="width: 5.5rem; height: 3.5rem; border-radius: var(--b-radius-md); background: var(--b-color-accent); opacity: var(--b-opacity-disabled)"></div>
  <code>--b-opacity-disabled</code>
  <span class="b-caption2 b-text-tertiary">0.4</span>
</div>
```

## Blur

The blur scale feeds the glass materials. Rather than using raw blur values, reach for the composite filters: --b-glass-light (blur-sm + saturate 1.6), --b-glass (blur-lg + saturate 1.8) and --b-glass-heavy (blur-xl + saturate 2) — the saturation boost is what makes color glow through the pane.

- Documentation: https://ui.barua.tz/docs/foundations.html#blur
- Classes: `b-caption2` `b-gap-1` `b-stack` `b-stack--center` `b-text-tertiary`

```html
<div class="b-stack b-stack--center b-gap-1">
  <div style="width: 6.5rem; height: 4rem; border-radius: var(--b-radius-lg); border: 1px solid var(--b-hairline); -webkit-backdrop-filter: blur(var(--b-blur-xs)); backdrop-filter: blur(var(--b-blur-xs))"></div>
  <code>--b-blur-xs</code>
  <span class="b-caption2 b-text-tertiary">4px</span>
</div>
<div class="b-stack b-stack--center b-gap-1">
  <div style="width: 6.5rem; height: 4rem; border-radius: var(--b-radius-lg); border: 1px solid var(--b-hairline); -webkit-backdrop-filter: blur(var(--b-blur-sm)); backdrop-filter: blur(var(--b-blur-sm))"></div>
  <code>--b-blur-sm</code>
  <span class="b-caption2 b-text-tertiary">8px</span>
</div>
<div class="b-stack b-stack--center b-gap-1">
  <div style="width: 6.5rem; height: 4rem; border-radius: var(--b-radius-lg); border: 1px solid var(--b-hairline); -webkit-backdrop-filter: blur(var(--b-blur-md)); backdrop-filter: blur(var(--b-blur-md))"></div>
  <code>--b-blur-md</code>
  <span class="b-caption2 b-text-tertiary">16px</span>
</div>
<div class="b-stack b-stack--center b-gap-1">
  <div style="width: 6.5rem; height: 4rem; border-radius: var(--b-radius-lg); border: 1px solid var(--b-hairline); -webkit-backdrop-filter: blur(var(--b-blur-lg)); backdrop-filter: blur(var(--b-blur-lg))"></div>
  <code>--b-blur-lg</code>
  <span class="b-caption2 b-text-tertiary">24px</span>
</div>
<div class="b-
```

## Materials

Five glass thicknesses, from a whisper to nearly opaque. Thinner materials show more of what's behind but hold less legible content — use ultrathin and thin for hover surfaces, regular for floating toolbars and glass cards, thick for sheets, and chrome for app bars. .b-material-accent adds a Barua-blue tint. Each class pairs its --b-material-*-bg token with the --b-glass backdrop filter and a hairline border.

- Documentation: https://ui.barua.tz/docs/foundations.html#materials
- Classes: `b-callout` `b-code` `b-code__header` `b-flex` `b-flex--center` `b-gap-2` `b-material-chrome` `b-material-regular` `b-material-thick` `b-material-thin` `b-material-ultrathin` `b-radius-lg` `b-stack` `b-stack--center`

```html
<div class="b-stack b-stack--center b-gap-2">
  <div class="b-material-ultrathin b-radius-lg b-flex b-flex--center b-callout" style="width: 7rem; height: 4.5rem">Aa</div>
  <code>.b-material-ultrathin</code>
</div>
<div class="b-stack b-stack--center b-gap-2">
  <div class="b-material-thin b-radius-lg b-flex b-flex--center b-callout" style="width: 7rem; height: 4.5rem">Aa</div>
  <code>.b-material-thin</code>
</div>
<div class="b-stack b-stack--center b-gap-2">
  <div class="b-material-regular b-radius-lg b-flex b-flex--center b-callout" style="width: 7rem; height: 4.5rem">Aa</div>
  <code>.b-material-regular</code>
</div>
<div class="b-stack b-stack--center b-gap-2">
  <div class="b-material-thick b-radius-lg b-flex b-flex--center b-callout" style="width: 7rem; height: 4.5rem">Aa</div>
  <code>.b-material-thick</code>
</div>
<div class="b-stack b-stack--center b-gap-2">
  <div class="b-material-chrome b-radius-lg b-flex b-flex--center b-callout" style="width: 7rem; height: 4.5rem">Aa</div>
  <code>.b-material-chrome</code>
</div>
```

```tsx
import { Callout } from "barua-ui";

<div className="b-stack b-stack--center b-gap-2">
  <Callout
    className="b-material-ultrathin b-radius-lg b-flex b-flex--center"
    style={{ width: "7rem", height: "4.5rem" }}
  >
    Aa
  </Callout>
  <code>.b-material-ultrathin</code>
</div>
<div className="b-stack b-stack--center b-gap-2">
  <Callout
    className="b-material-thin b-radius-lg b-flex b-flex--center"
    style={{ width: "7rem", height: "4.5rem" }}
  >
    Aa
  </Callout>
  <code>.b-material-thin</code>
</div>
<div className="b-stack b-stack--center b-gap-2">
  <Callout
    className="b-material-regular b-radius-lg b-flex b-flex--center"
    style={{ width: "7rem", height: "4.5rem" }}
  >
    Aa
  </Callout>
  <code>.b-material-regular</code>
</div>
<div className="b-stack b-stack--center b-gap-2">
  <Callout
    className="b-material-thick b-radius-lg b-flex b-flex--center"
    style={{ width: "7rem", height: "4.5rem" }}
  >
    Aa
  </Callout>
  <code>.b-material-thick</code>
</div>
<div className="b-stack b-stack--center b-gap-2">
  <Callout
    className="b-material-chrome b-radius-lg b-flex b-flex--center"
    style={{ width: "7rem", height: "4.5rem" }}
  >
    Aa
  </Callout>
  <code>.b-material-chrome</code>
</div>
```

## Borders & Dividers

Four weights of edge, all translucent so they sit naturally on any surface: --b-hairline for glass edges and elevation rings, --b-separator for list rows and card borders, --b-border for inputs and controls, and --b-border-strong for their hover state. .b-divider draws separator rules — vertical inside an hstack, labeled for timeline breaks, and inset to align with list content.

- Documentation: https://ui.barua.tz/docs/foundations.html#borders-dividers
- Classes: `b-divider` `b-divider--label` `b-divider--vertical` `b-hstack`

```html
<div class="b-hstack">
  <span>Reply</span>
  <hr class="b-divider b-divider--vertical">
  <span>Forward</span>
  <hr class="b-divider b-divider--vertical">
  <span>Archive</span>
</div>
<hr class="b-divider">
<div class="b-divider b-divider--label">Yesterday</div>
```

```tsx
import { Divider } from "barua-ui";

<div className="b-hstack">
  <span>Reply</span>
  <Divider vertical />
  <span>Forward</span>
  <Divider vertical />
  <span>Archive</span>
</div>
<Divider />
<Divider label>Yesterday</Divider>
```

## Motion

Motion is quick, physical and quiet: five durations, five curves, and nothing animates that doesn't communicate. Small state changes use instant and fast ; surfaces that move use slow with the spring curve. Everything collapses to near zero under prefers-reduced-motion — see Accessibility.

- Documentation: https://ui.barua.tz/docs/foundations.html#motion
- Classes: `b-btn` `b-btn--primary` `b-card` `b-card--interactive` `b-card__body` `b-chip` `b-footnote` `b-progress` `b-progress--indeterminate` `b-progress__fill` `b-spinner` `b-spinner--lg` `b-table` `b-table-wrap`

```html
<span class="b-chip">instant · 100ms</span>
<span class="b-chip">fast · 150ms</span>
<span class="b-chip">normal · 250ms</span>
<span class="b-chip">slow · 350ms</span>
<span class="b-chip">slower · 500ms</span>
<span class="b-chip">standard · default</span>
<span class="b-chip">out · entrances</span>
<span class="b-chip">in · exits</span>
<span class="b-chip">spring · sheets</span>
<span class="b-chip">bounce · overshoot</span>
```

```tsx
import { Chip } from "barua-ui";

<Chip>instant · 100ms</Chip>
<Chip>fast · 150ms</Chip>
<Chip>normal · 250ms</Chip>
<Chip>slow · 350ms</Chip>
<Chip>slower · 500ms</Chip>
<Chip>standard · default</Chip>
<Chip>out · entrances</Chip>
<Chip>in · exits</Chip>
<Chip>spring · sheets</Chip>
<Chip>bounce · overshoot</Chip>
```

## Iconography

Icons are inline SVG — no font, no sprite request. Draw on a 20×20 viewBox with a 1.5 stroke, stroke="currentColor" and round caps and joins, so every icon inherits text color and matches the SF Symbols weight. .b-icon sizes the box ( --sm 16, default 20, --lg 24, --xl 32) and .b-icon-tile seats an icon on an accent-soft tile for list leaders and feature rows. Decorative icons take aria-hidden="true" .

- Documentation: https://ui.barua.tz/docs/foundations.html#iconography
- Classes: `b-icon` `b-icon--lg` `b-icon--sm` `b-icon--xl` `b-icon-tile`

```html
<span class="b-icon b-icon--sm">
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M13.5 3.5 16.5 6.5 7 16H4v-3l9.5-9.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
</span>
<span class="b-icon">
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M13.5 3.5 16.5 6.5 7 16H4v-3l9.5-9.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
</span>
<span class="b-icon b-icon--lg">
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M13.5 3.5 16.5 6.5 7 16H4v-3l9.5-9.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
</span>
<span class="b-icon b-icon--xl">
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M13.5 3.5 16.5 6.5 7 16H4v-3l9.5-9.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
</span>
<span class="b-icon-tile">
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="2.5" y="4.5" width="15" height="11" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="m4 7 6 4.5L16 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
</span>
<span class="b-icon-tile">
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M13.5 3.5 16.5 6.5 7 16H4v-3l9.5-9.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
</span>
```

```tsx
import { Icon, IconTile } from "barua-ui";

<Icon className="b-icon--sm">
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M13.5 3.5 16.5 6.5 7 16H4v-3l9.5-9.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
</Icon>
<Icon>
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M13.5 3.5 16.5 6.5 7 16H4v-3l9.5-9.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
</Icon>
<Icon className="b-icon--lg">
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M13.5 3.5 16.5 6.5 7 16H4v-3l9.5-9.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
</Icon>
<Icon className="b-icon--xl">
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M13.5 3.5 16.5 6.5 7 16H4v-3l9.5-9.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
</Icon>
<IconTile>
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <rect x="2.5" y="4.5" width="15" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="m4 7 6 4.5L16 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
</IconTile>
<IconTile>
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M13.5 3.5 16.5 6.5 7 16H4v-3l9.5-9.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
</IconTile>
```

## Accessibility

Accessibility is baked into the tokens, not bolted on. The focus ring ( --b-focus-ring , a 3.5px accent halo) appears on :focus-visible only — keyboards get it, mouse clicks don't. Tab through this demo to see it.

- Documentation: https://ui.barua.tz/docs/foundations.html#accessibility
- Classes: `b-btn` `b-btn--primary` `b-input`

```html
<button class="b-btn">Tab to me</button>
<button class="b-btn b-btn--primary">Then me</button>
<input class="b-input" style="max-width: 16rem" type="text" placeholder="Focus shows the ring">
```

```tsx
import { Button, Input } from "barua-ui";

<Button>Tab to me</Button>
<Button variant="primary">Then me</Button>
<Input style={{ maxWidth: "16rem" }} type="text" placeholder="Focus shows the ring" />
```

## Dark Mode & Light Mode

The root declares color-scheme: light dark and every color token is a light-dark() pair, so the whole system follows the OS by default. Set data-theme="light|dark" on <html> to force a scheme — the topbar's data-b-theme-toggle button does exactly that and persists the choice, which the inline <head> script restores before first paint to avoid a flash.

- Documentation: https://ui.barua.tz/docs/foundations.html#dark-light
- Classes: `b-card` `b-card__body` `b-card__subtitle` `b-card__title`

```html
<div class="b-card" style="width: 14rem">
    <div class="b-card__body">
      <div class="b-card__title">Light</div>
      <div class="b-card__subtitle">color-scheme: light</div>
    </div>
  </div>
</div>
<div style="color-scheme: dark; background: var(--b-bg); padding: var(--b-space-4); border-radius: var(--b-radius-lg)">
  <div class="b-card" style="width: 14rem">
    <div class="b-card__body">
      <div class="b-card__title">Dark</div>
      <div class="b-card__subtitle">color-scheme: dark</div>
    </div>
  </div>
```

```tsx
import { Card, CardBody, CardSubtitle, CardTitle } from "barua-ui";

<Card style={{ width: "14rem" }}>
  <CardBody>
    <CardTitle>Light</CardTitle>
    <CardSubtitle>color-scheme: light</CardSubtitle>
  </CardBody>
</Card>
<div
  style={{ colorScheme: "dark", background: "var(--b-bg)", padding: "var(--b-space-4)", borderRadius: "var(--b-radius-lg)" }}
>
  <Card style={{ width: "14rem" }}>
    <CardBody>
      <CardTitle>Dark</CardTitle>
      <CardSubtitle>color-scheme: dark</CardSubtitle>
    </CardBody>
  </Card>
</div>
```

## Responsive Rules

Mobile first, always: base styles serve the smallest screen, and each of the six breakpoints only adds. Most layouts shouldn't need media queries at all — .b-grid--auto , .b-card-grid and the stack primitives reflow on their own. When you do write one, use min-width at a shared stop.

- Documentation: https://ui.barua.tz/docs/foundations.html#responsive-rules

## View Transitions

Two things, on the platform's View Transitions API. Opt in with data-vt on <html> and same-origin navigations cross-fade on the system's motion tokens (180ms out, 220ms in). Off by default, disabled automatically under reduced motion, and inert in browsers without the API.

- Documentation: https://ui.barua.tz/docs/foundations.html#view-transitions
- Classes: `b-btn` `b-btn--ghost` `b-btn--glass` `b-btn--sm` `b-card` `b-card__body` `b-card__subtitle` `b-card__title` `b-code` `b-code__header` `b-footnote` `b-gap-3` `b-hstack` `b-stack` `b-text-secondary` `b-thumb`

```html
<div class="b-code">
  <div class="b-code__header"><span>Page transitions</span></div>
  <pre><code>&lt;html data-vt&gt;   &lt;!-- pages now cross-fade on navigation --&gt;</code></pre>
</div>
```

```tsx
import { CodeBlock } from "barua-ui";

<CodeBlock>
  <div className="b-code__header">
    <span>Page transitions</span>
  </div>
  <pre>
    <code>
      <html data-vt> <!-- pages now cross-fade on navigation -->
    </code>
  </pre>
</CodeBlock>
```

