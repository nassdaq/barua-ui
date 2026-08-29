# Layout — stacks, grids, containers, stage, scroll areas

Source: https://ui.barua.tz/docs/layout.html
Rules and conventions: https://ui.barua.tz/llms.txt

## Container

.b-container centers content and clamps its width — the default cap is --b-container-lg (64rem). Size variants swap the cap; --fluid removes it. Wider variants clamp to this page's width here, which is exactly what they'd do on a narrow viewport.

- Documentation: https://ui.barua.tz/docs/layout.html#container
- Classes: `b-card__body` `b-container` `b-container--fluid` `b-container--md` `b-container--sm` `b-container--xl`

```html
<div class="b-container b-container--sm">
  <div class="b-card__body" style="background: var(--b-color-accent-soft); border-radius: var(--b-radius-md); padding: var(--b-space-3); text-align: center;">--sm · 40rem</div>
</div>
<div class="b-container b-container--md">
  <div class="b-card__body" style="background: var(--b-color-accent-soft); border-radius: var(--b-radius-md); padding: var(--b-space-3); text-align: center;">--md · 48rem</div>
</div>
<div class="b-container">
  <div class="b-card__body" style="background: var(--b-color-accent-soft); border-radius: var(--b-radius-md); padding: var(--b-space-3); text-align: center;">default · 64rem</div>
</div>
<div class="b-container b-container--xl">
  <div class="b-card__body" style="background: var(--b-color-accent-soft); border-radius: var(--b-radius-md); padding: var(--b-space-3); text-align: center;">--xl · 80rem</div>
</div>
<div class="b-container b-container--fluid">
  <div class="b-card__body" style="background: var(--b-color-accent-soft); border-radius: var(--b-radius-md); padding: var(--b-space-3); text-align: center;">--fluid · no cap</div>
</div>
```

```tsx
import { CardBody, Container } from "barua-ui";

<Container size="sm">
  <CardBody
    style={{ background: "var(--b-color-accent-soft)", borderRadius: "var(--b-radius-md)", padding: "var(--b-space-3)", textAlign: "center" }}
  >
    --sm · 40rem
  </CardBody>
</Container>
<Container size="md">
  <CardBody
    style={{ background: "var(--b-color-accent-soft)", borderRadius: "var(--b-radius-md)", padding: "var(--b-space-3)", textAlign: "center" }}
  >
    --md · 48rem
  </CardBody>
</Container>
<Container>
  <CardBody
    style={{ background: "var(--b-color-accent-soft)", borderRadius: "var(--b-radius-md)", padding: "var(--b-space-3)", textAlign: "center" }}
  >
    default · 64rem
  </CardBody>
</Container>
<Container size="xl">
  <CardBody
    style={{ background: "var(--b-color-accent-soft)", borderRadius: "var(--b-radius-md)", padding: "var(--b-space-3)", textAlign: "center" }}
  >
    --xl · 80rem
  </CardBody>
</Container>
<Container size="fluid">
  <CardBody
    style={{ background: "var(--b-color-accent-soft)", borderRadius: "var(--b-radius-md)", padding: "var(--b-space-3)", textAlign: "center" }}
  >
    --fluid · no cap
  </CardBody>
</Container>
```

## Stack (VStack)

.b-stack (alias .b-vstack ) is a vertical flex column with a token gap — the default building block for any view. Tune spacing with the gap scale — .b-gap-0 , .b-gap-1 , .b-gap-2 , .b-gap-3 , .b-gap-4 , .b-gap-6 , .b-gap-8 — instead of margins on children.

- Documentation: https://ui.barua.tz/docs/layout.html#stack
- Classes: `b-card__body` `b-gap-2` `b-grid` `b-grid--3` `b-stack` `b-stack--center` `b-stack--end` `b-stack--start`

```html
<div class="b-stack b-gap-2">
  <div class="b-card__body" style="background: var(--b-color-accent-soft); border-radius: var(--b-radius-md); padding: var(--b-space-3); text-align: center;">1</div>
  <div class="b-card__body" style="background: var(--b-color-accent-soft); border-radius: var(--b-radius-md); padding: var(--b-space-3); text-align: center;">2</div>
  <div class="b-card__body" style="background: var(--b-color-accent-soft); border-radius: var(--b-radius-md); padding: var(--b-space-3); text-align: center;">3</div>
</div>
```

```tsx
import { CardBody } from "barua-ui";

<div className="b-stack b-gap-2">
  <CardBody
    style={{ background: "var(--b-color-accent-soft)", borderRadius: "var(--b-radius-md)", padding: "var(--b-space-3)", textAlign: "center" }}
  >
    1
  </CardBody>
  <CardBody
    style={{ background: "var(--b-color-accent-soft)", borderRadius: "var(--b-radius-md)", padding: "var(--b-space-3)", textAlign: "center" }}
  >
    2
  </CardBody>
  <CardBody
    style={{ background: "var(--b-color-accent-soft)", borderRadius: "var(--b-radius-md)", padding: "var(--b-space-3)", textAlign: "center" }}
  >
    3
  </CardBody>
</div>
```

## HStack

.b-hstack lays children out in a row, vertically centered. The alignment modifiers are shared with Stack — add .b-stack--between to spread children across the row.

- Documentation: https://ui.barua.tz/docs/layout.html#hstack
- Classes: `b-badge` `b-badge--accent` `b-btn` `b-btn--sm` `b-btn--tinted` `b-card__body` `b-gap-2` `b-headline` `b-hstack` `b-spacer` `b-stack--between`

```html
<div class="b-hstack b-gap-2">
  <div class="b-card__body" style="background: var(--b-color-accent-soft); border-radius: var(--b-radius-md); padding: var(--b-space-3); text-align: center;">1</div>
  <div class="b-card__body" style="background: var(--b-color-accent-soft); border-radius: var(--b-radius-md); padding: var(--b-space-3); text-align: center;">2</div>
  <div class="b-card__body" style="background: var(--b-color-accent-soft); border-radius: var(--b-radius-md); padding: var(--b-space-3); text-align: center;">3</div>
</div>
<div class="b-hstack b-stack--between">
  <div class="b-card__body" style="background: var(--b-color-accent-soft); border-radius: var(--b-radius-md); padding: var(--b-space-3); text-align: center;">1</div>
  <div class="b-card__body" style="background: var(--b-color-accent-soft); border-radius: var(--b-radius-md); padding: var(--b-space-3); text-align: center;">2</div>
  <div class="b-card__body" style="background: var(--b-color-accent-soft); border-radius: var(--b-radius-md); padding: var(--b-space-3); text-align: center;">3</div>
</div>
```

```tsx
import { CardBody } from "barua-ui";

<div className="b-hstack b-gap-2">
  <CardBody
    style={{ background: "var(--b-color-accent-soft)", borderRadius: "var(--b-radius-md)", padding: "var(--b-space-3)", textAlign: "center" }}
  >
    1
  </CardBody>
  <CardBody
    style={{ background: "var(--b-color-accent-soft)", borderRadius: "var(--b-radius-md)", padding: "var(--b-space-3)", textAlign: "center" }}
  >
    2
  </CardBody>
  <CardBody
    style={{ background: "var(--b-color-accent-soft)", borderRadius: "var(--b-radius-md)", padding: "var(--b-space-3)", textAlign: "center" }}
  >
    3
  </CardBody>
</div>
<div className="b-hstack b-stack--between">
  <CardBody
    style={{ background: "var(--b-color-accent-soft)", borderRadius: "var(--b-radius-md)", padding: "var(--b-space-3)", textAlign: "center" }}
  >
    1
  </CardBody>
  <CardBody
    style={{ background: "var(--b-color-accent-soft)", borderRadius: "var(--b-radius-md)", padding: "var(--b-space-3)", textAlign: "center" }}
  >
    2
  </CardBody>
  <CardBody
    style={{ background: "var(--b-color-accent-soft)", borderRadius: "var(--b-radius-md)", padding: "var(--b-space-3)", textAlign: "center" }}
  >
    3
  </CardBody>
</div>
```

## Grid

.b-grid is a 12-column grid by default — set --b-cols (or a .b-grid--2/3/4/6 preset) and place children with .b-col-span-* classes.

- Documentation: https://ui.barua.tz/docs/layout.html#grid
- Classes: `b-card__body` `b-col-span-4` `b-col-span-6` `b-col-span-full` `b-grid` `b-grid--auto`

```html
<div class="b-grid">
  <div class="b-col-span-4 b-card__body" style="background: var(--b-color-accent-soft); border-radius: var(--b-radius-md); padding: var(--b-space-3); text-align: center;">span 4</div>
  <div class="b-col-span-4 b-card__body" style="background: var(--b-color-accent-soft); border-radius: var(--b-radius-md); padding: var(--b-space-3); text-align: center;">span 4</div>
  <div class="b-col-span-4 b-card__body" style="background: var(--b-color-accent-soft); border-radius: var(--b-radius-md); padding: var(--b-space-3); text-align: center;">span 4</div>
  <div class="b-col-span-6 b-card__body" style="background: var(--b-color-accent-soft); border-radius: var(--b-radius-md); padding: var(--b-space-3); text-align: center;">span 6</div>
  <div class="b-col-span-6 b-card__body" style="background: var(--b-color-accent-soft); border-radius: var(--b-radius-md); padding: var(--b-space-3); text-align: center;">span 6</div>
  <div class="b-col-span-full b-card__body" style="background: var(--b-color-accent-soft); border-radius: var(--b-radius-md); padding: var(--b-space-3); text-align: center;">span full</div>
</div>
```

```tsx
import { CardBody, Grid } from "barua-ui";

<Grid>
  <CardBody
    className="b-col-span-4"
    style={{ background: "var(--b-color-accent-soft)", borderRadius: "var(--b-radius-md)", padding: "var(--b-space-3)", textAlign: "center" }}
  >
    span 4
  </CardBody>
  <CardBody
    className="b-col-span-4"
    style={{ background: "var(--b-color-accent-soft)", borderRadius: "var(--b-radius-md)", padding: "var(--b-space-3)", textAlign: "center" }}
  >
    span 4
  </CardBody>
  <CardBody
    className="b-col-span-4"
    style={{ background: "var(--b-color-accent-soft)", borderRadius: "var(--b-radius-md)", padding: "var(--b-space-3)", textAlign: "center" }}
  >
    span 4
  </CardBody>
  <CardBody
    className="b-col-span-6"
    style={{ background: "var(--b-color-accent-soft)", borderRadius: "var(--b-radius-md)", padding: "var(--b-space-3)", textAlign: "center" }}
  >
    span 6
  </CardBody>
  <CardBody
    className="b-col-span-6"
    style={{ background: "var(--b-color-accent-soft)", borderRadius: "var(--b-radius-md)", padding: "var(--b-space-3)", textAlign: "center" }}
  >
    span 6
  </CardBody>
  <CardBody
    className="b-col-span-full"
    style={{ background: "var(--b-color-accent-soft)", borderRadius: "var(--b-radius-md)", padding: "var(--b-space-3)", textAlign: "center" }}
  >
    span full
  </CardBody>
</Grid>
```

## Flex

A thin display: flex shorthand for when a stack is too opinionated. --center and --between handle both axes; .b-grow and .b-shrink-0 tune individual children.

- Documentation: https://ui.barua.tz/docs/layout.html#flex
- Classes: `b-card__body` `b-flex` `b-flex--between` `b-grow` `b-shrink-0`

```html
<div class="b-flex b-flex--between">
  <div class="b-card__body" style="background: var(--b-color-accent-soft); border-radius: var(--b-radius-md); padding: var(--b-space-3); text-align: center;">--between</div>
  <div class="b-card__body" style="background: var(--b-color-accent-soft); border-radius: var(--b-radius-md); padding: var(--b-space-3); text-align: center;">--between</div>
  <div class="b-card__body" style="background: var(--b-color-accent-soft); border-radius: var(--b-radius-md); padding: var(--b-space-3); text-align: center;">--between</div>
</div>
<div class="b-flex">
  <div class="b-shrink-0 b-card__body" style="background: var(--b-color-accent-soft); border-radius: var(--b-radius-md); padding: var(--b-space-3); text-align: center;">fixed</div>
  <div class="b-grow b-card__body" style="background: var(--b-color-accent-soft); border-radius: var(--b-radius-md); padding: var(--b-space-3); text-align: center;">b-grow</div>
  <div class="b-shrink-0 b-card__body" style="background: var(--b-color-accent-soft); border-radius: var(--b-radius-md); padding: var(--b-space-3); text-align: center;">fixed</div>
</div>
```

```tsx
import { CardBody, Grow } from "barua-ui";

<div className="b-flex b-flex--between">
  <CardBody
    style={{ background: "var(--b-color-accent-soft)", borderRadius: "var(--b-radius-md)", padding: "var(--b-space-3)", textAlign: "center" }}
  >
    --between
  </CardBody>
  <CardBody
    style={{ background: "var(--b-color-accent-soft)", borderRadius: "var(--b-radius-md)", padding: "var(--b-space-3)", textAlign: "center" }}
  >
    --between
  </CardBody>
  <CardBody
    style={{ background: "var(--b-color-accent-soft)", borderRadius: "var(--b-radius-md)", padding: "var(--b-space-3)", textAlign: "center" }}
  >
    --between
  </CardBody>
</div>
<div className="b-flex">
  <CardBody
    className="b-shrink-0"
    style={{ background: "var(--b-color-accent-soft)", borderRadius: "var(--b-radius-md)", padding: "var(--b-space-3)", textAlign: "center" }}
  >
    fixed
  </CardBody>
  <Grow
    className="b-card__body"
    style={{ background: "var(--b-color-accent-soft)", borderRadius: "var(--b-radius-md)", padding: "var(--b-space-3)", textAlign: "center" }}
  >
    b-grow
  </Grow>
  <CardBody
    className="b-shrink-0"
    style={{ background: "var(--b-color-accent-soft)", borderRadius: "var(--b-radius-md)", padding: "var(--b-space-3)", textAlign: "center" }}
  >
    fixed
  </CardBody>
</div>
```

## Split View

Master–detail in one line of markup: .b-split stretches .b-panel children to equal height with a .b-resize-handle between them. Make the sidebar .b-resizable and dragging is native CSS resize — no JavaScript.

- Documentation: https://ui.barua.tz/docs/layout.html#split-view
- Classes: `b-card__body` `b-grow` `b-panel` `b-resizable` `b-resize-handle` `b-split`

```html
<div class="b-split" style="height: 12rem;">
  <div class="b-panel b-resizable" style="flex: none; width: 13rem;">
    <div class="b-card__body">Sidebar</div>
  </div>
  <div class="b-resize-handle" role="separator" aria-orientation="vertical" aria-label="Resize sidebar"></div>
  <div class="b-panel b-grow">
    <div class="b-card__body">Detail</div>
  </div>
</div>
```

```tsx
import { CardBody, Grow, Resizable, ResizeHandle, Split } from "barua-ui";

<Split style={{ height: "12rem" }}>
  <Resizable className="b-panel" style={{ flex: "none", width: "13rem" }}>
    <CardBody>Sidebar</CardBody>
  </Resizable>
  <ResizeHandle
    role="separator"
    aria-orientation="vertical"
    aria-label="Resize sidebar"
  ></ResizeHandle>
  <Grow className="b-panel">
    <CardBody>Detail</CardBody>
  </Grow>
</Split>
```

## Resizable Panel

.b-resizable adds the browser's native resize grip to any panel — horizontal by default, --vertical for height. Look for the grip in the bottom-trailing corner; min and max bounds are built in.

- Documentation: https://ui.barua.tz/docs/layout.html#resizable-panel
- Classes: `b-card__body` `b-panel` `b-resizable` `b-resizable--vertical`

```html
<div class="b-panel b-resizable" style="width: 15rem;">
  <div class="b-card__body">Drag my corner →</div>
</div>
<div class="b-panel b-resizable b-resizable--vertical" style="width: 15rem; height: 7rem;">
  <div class="b-card__body">Drag me taller ↓</div>
</div>
```

```tsx
import { CardBody, Resizable } from "barua-ui";

<Resizable className="b-panel" style={{ width: "15rem" }}>
  <CardBody>Drag my corner →</CardBody>
</Resizable>
<Resizable
  className="b-panel b-resizable--vertical"
  style={{ width: "15rem", height: "7rem" }}
>
  <CardBody>Drag me taller ↓</CardBody>
</Resizable>
```

## Panel

.b-panel is the plain workhorse surface: surface background, hairline border, large radius. --plain strips the chrome for panels that only exist to scroll or resize.

- Documentation: https://ui.barua.tz/docs/layout.html#panel
- Classes: `b-card__body` `b-grid` `b-grid--2` `b-panel` `b-panel--plain`

```html
<div class="b-grid b-grid--2">
  <div class="b-panel">
    <div class="b-card__body">b-panel</div>
  </div>
  <div class="b-panel b-panel--plain">
    <div class="b-card__body">b-panel--plain</div>
  </div>
</div>
```

```tsx
import { CardBody, Grid } from "barua-ui";

<Grid cols={2}>
  <div className="b-panel">
    <CardBody>b-panel</CardBody>
  </div>
  <div className="b-panel b-panel--plain">
    <CardBody>b-panel--plain</CardBody>
  </div>
</Grid>
```

## Section

.b-section adds generous block padding between page regions — the vertical rhythm of a landing or settings page. --tight is the compact cut. Dividers shown here only to make the padding visible.

- Documentation: https://ui.barua.tz/docs/layout.html#section
- Classes: `b-card__body` `b-divider` `b-section` `b-section--tight`

```html
<div>
  <hr class="b-divider">
  <div class="b-section b-section--tight">
    <div class="b-card__body" style="background: var(--b-color-accent-soft); border-radius: var(--b-radius-md); padding: var(--b-space-3); text-align: center;">b-section--tight</div>
  </div>
  <hr class="b-divider">
  <div class="b-section">
    <div class="b-card__body" style="background: var(--b-color-accent-soft); border-radius: var(--b-radius-md); padding: var(--b-space-3); text-align: center;">b-section</div>
  </div>
  <hr class="b-divider">
</div>
```

```tsx
import { CardBody, Divider, Section } from "barua-ui";

<div>
  <Divider />
  <Section className="b-section--tight">
    <CardBody
      style={{ background: "var(--b-color-accent-soft)", borderRadius: "var(--b-radius-md)", padding: "var(--b-space-3)", textAlign: "center" }}
    >
      b-section--tight
    </CardBody>
  </Section>
  <Divider />
  <Section>
    <CardBody
      style={{ background: "var(--b-color-accent-soft)", borderRadius: "var(--b-radius-md)", padding: "var(--b-space-3)", textAlign: "center" }}
    >
      b-section
    </CardBody>
  </Section>
  <Divider />
</div>
```

## Card Grid

A responsive shelf of cards: auto-fill columns at least 17rem wide, token gap, no breakpoints. The default answer for dashboards and galleries.

- Documentation: https://ui.barua.tz/docs/layout.html#card-grid
- Classes: `b-card` `b-card-grid` `b-card__body` `b-card__subtitle` `b-card__title`

```html
<div class="b-card-grid">
  <article class="b-card">
    <div class="b-card__body">
      <div class="b-card__title">Reports</div>
      <div class="b-card__subtitle">Weekly digest</div>
    </div>
  </article>
  <article class="b-card">
    <div class="b-card__body">
      <div class="b-card__title">Automations</div>
      <div class="b-card__subtitle">4 running</div>
    </div>
  </article>
  <article class="b-card">
    <div class="b-card__body">
      <div class="b-card__title">Contacts</div>
      <div class="b-card__subtitle">1,208 people</div>
    </div>
  </article>
  <article class="b-card">
    <div class="b-card__body">
      <div class="b-card__title">Billing</div>
      <div class="b-card__subtitle">Paid until March</div>
    </div>
  </article>
</div>
```

```tsx
import { Card, CardBody, CardGrid, CardSubtitle, CardTitle } from "barua-ui";

<CardGrid>
  <Card>
    <CardBody>
      <CardTitle>Reports</CardTitle>
      <CardSubtitle>Weekly digest</CardSubtitle>
    </CardBody>
  </Card>
  <Card>
    <CardBody>
      <CardTitle>Automations</CardTitle>
      <CardSubtitle>4 running</CardSubtitle>
    </CardBody>
  </Card>
  <Card>
    <CardBody>
      <CardTitle>Contacts</CardTitle>
      <CardSubtitle>1,208 people</CardSubtitle>
    </CardBody>
  </Card>
  <Card>
    <CardBody>
      <CardTitle>Billing</CardTitle>
      <CardSubtitle>Paid until March</CardSubtitle>
    </CardBody>
  </Card>
</CardGrid>
```

## Masonry

CSS-columns masonry for content of uneven height — pins, notes, image cards. Items flow down each column in source order; cap the column count with --b-masonry-cols .

- Documentation: https://ui.barua.tz/docs/layout.html#masonry
- Classes: `b-card` `b-card__body` `b-masonry`

```html
<div class="b-masonry">
  <article class="b-card">
    <div class="b-card__body" style="min-height: 5rem;">1</div>
  </article>
  <article class="b-card">
    <div class="b-card__body" style="min-height: 8rem;">2</div>
  </article>
  <article class="b-card">
    <div class="b-card__body" style="min-height: 3rem;">3</div>
  </article>
  <article class="b-card">
    <div class="b-card__body" style="min-height: 6rem;">4</div>
  </article>
  <article class="b-card">
    <div class="b-card__body" style="min-height: 4rem;">5</div>
  </article>
  <article class="b-card">
    <div class="b-card__body" style="min-height: 7rem;">6</div>
  </article>
</div>
```

```tsx
import { Card, CardBody } from "barua-ui";

<div className="b-masonry">
  <Card>
    <CardBody style={{ minHeight: "5rem" }}>1</CardBody>
  </Card>
  <Card>
    <CardBody style={{ minHeight: "8rem" }}>2</CardBody>
  </Card>
  <Card>
    <CardBody style={{ minHeight: "3rem" }}>3</CardBody>
  </Card>
  <Card>
    <CardBody style={{ minHeight: "6rem" }}>4</CardBody>
  </Card>
  <Card>
    <CardBody style={{ minHeight: "4rem" }}>5</CardBody>
  </Card>
  <Card>
    <CardBody style={{ minHeight: "7rem" }}>6</CardBody>
  </Card>
</div>
```

## Scroll Area

Give it a height and .b-scroll-area contains the scrolling: overscroll never leaks to the page and the scrollbar gutter stays stable. --fade masks both edges so clipped content looks intentional.

- Documentation: https://ui.barua.tz/docs/layout.html#scroll-area
- Classes: `b-card__body` `b-gap-2` `b-grid` `b-grid--2` `b-scroll-area` `b-scroll-area--fade` `b-stack`

```html
<div class="b-grid b-grid--2">
  <div class="b-scroll-area" style="height: 10rem;" tabindex="0" role="region" aria-label="Recent activity">
    <div class="b-stack b-gap-2">
      <div class="b-card__body" style="background: var(--b-color-accent-soft); border-radius: var(--b-radius-md); padding: var(--b-space-3); text-align: center;">Row 1</div>
      <div class="b-card__body" style="background: var(--b-color-accent-soft); border-radius: var(--b-radius-md); padding: var(--b-space-3); text-align: center;">Row 2</div>
      <div class="b-card__body" style="background: var(--b-color-accent-soft); border-radius: var(--b-radius-md); padding: var(--b-space-3); text-align: center;">Row 3</div>
      <div class="b-card__body" style="background: var(--b-color-accent-soft); border-radius: var(--b-radius-md); padding: var(--b-space-3); text-align: center;">Row 4</div>
      <div class="b-card__body" style="background: var(--b-color-accent-soft); border-radius: var(--b-radius-md); padding: var(--b-space-3); text-align: center;">Row 5</div>
      <div class="b-card__body" style="background: var(--b-color-accent-soft); border-radius: var(--b-radius-md); padding: var(--b-space-3); text-align: center;">Row 6</div>
    </div>
  </div>
  <div class="b-scroll-area b-scroll-area--fade" style="height: 10rem;" tabindex="0" role="region" aria-label="Recent activity, faded edges">
    <div class="b-st
```

```tsx
import { CardBody, Grid, ScrollArea } from "barua-ui";

<Grid cols={2}>
  <ScrollArea
    style={{ height: "10rem" }}
    tabIndex="0"
    role="region"
    aria-label="Recent activity"
  >
    <div className="b-stack b-gap-2">
      <CardBody
        style={{ background: "var(--b-color-accent-soft)", borderRadius: "var(--b-radius-md)", padding: "var(--b-space-3)", textAlign: "center" }}
      >
        Row 1
      </CardBody>
      <CardBody
        style={{ background: "var(--b-color-accent-soft)", borderRadius: "var(--b-radius-md)", padding: "var(--b-space-3)", textAlign: "center" }}
      >
        Row 2
      </CardBody>
      <CardBody
        style={{ background: "var(--b-color-accent-soft)", borderRadius: "var(--b-radius-md)", padding: "var(--b-space-3)", textAlign: "center" }}
      >
        Row 3
      </CardBody>
      <CardBody
        style={{ background: "var(--b-color-accent-soft)", borderRadius: "var(--b-radius-md)", padding: "var(--b-space-3)", textAlign: "center" }}
      >
        Row 4
      </CardBody>
      <CardBody
        style={{ background: "var(--b-color-accent-soft)", borderRadius: "var(--b-radius-md)", padding: "var(--b-space-3)", textAlign: "center" }}
      >
        Row 5
      </CardBody>
      <CardBody
        style={{ background: "var(--b-color-accent-soft)", borderRadius: "var(--b-radius-md)", padding: "var(--b-space-3)", textAlign: "center" }}
      >
        Row 6
      </CardBody>
    </div>
  </ScrollArea>
  <ScrollArea
    className="b-scroll-area--fade"
    style={{ height: "10rem" }}
    tabIndex="0"
    role="region"
    aria-label="Recent activity, faded edges"
  ></ScrollArea>
</Grid>
```

## Spacer

Straight from SwiftUI: .b-spacer is an empty flex-1 element that absorbs leftover space. Push row siblings apart, or pin a footer to the bottom of a fixed-height stack.

- Documentation: https://ui.barua.tz/docs/layout.html#spacer
- Classes: `b-card__body` `b-hstack` `b-spacer` `b-stack`

```html
<div class="b-hstack">
  <div class="b-card__body" style="background: var(--b-color-accent-soft); border-radius: var(--b-radius-md); padding: var(--b-space-3); text-align: center;">Leading</div>
  <span class="b-spacer"></span>
  <div class="b-card__body" style="background: var(--b-color-accent-soft); border-radius: var(--b-radius-md); padding: var(--b-space-3); text-align: center;">Trailing</div>
</div>
<div class="b-stack" style="height: 9rem;">
  <div class="b-card__body" style="background: var(--b-color-accent-soft); border-radius: var(--b-radius-md); padding: var(--b-space-3); text-align: center;">Content</div>
  <span class="b-spacer"></span>
  <div class="b-card__body" style="background: var(--b-color-accent-soft); border-radius: var(--b-radius-md); padding: var(--b-space-3); text-align: center;">Pinned footer</div>
</div>
```

```tsx
import { CardBody, Spacer } from "barua-ui";

<div className="b-hstack">
  <CardBody
    style={{ background: "var(--b-color-accent-soft)", borderRadius: "var(--b-radius-md)", padding: "var(--b-space-3)", textAlign: "center" }}
  >
    Leading
  </CardBody>
  <Spacer></Spacer>
  <CardBody
    style={{ background: "var(--b-color-accent-soft)", borderRadius: "var(--b-radius-md)", padding: "var(--b-space-3)", textAlign: "center" }}
  >
    Trailing
  </CardBody>
</div>
<div className="b-stack" style={{ height: "9rem" }}>
  <CardBody
    style={{ background: "var(--b-color-accent-soft)", borderRadius: "var(--b-radius-md)", padding: "var(--b-space-3)", textAlign: "center" }}
  >
    Content
  </CardBody>
  <Spacer></Spacer>
  <CardBody
    style={{ background: "var(--b-color-accent-soft)", borderRadius: "var(--b-radius-md)", padding: "var(--b-space-3)", textAlign: "center" }}
  >
    Pinned footer
  </CardBody>
</div>
```

## Divider

Hairline separators drawn with --b-separator . Horizontal by default; use them sparingly — a stack gap is often separation enough.

- Documentation: https://ui.barua.tz/docs/layout.html#divider
- Classes: `b-avatar` `b-avatar--sm` `b-body` `b-btn` `b-btn--primary` `b-divider` `b-divider--inset` `b-divider--label` `b-divider--vertical` `b-gap-3` `b-hstack` `b-link` `b-link--danger` `b-list` `b-list-item` `b-list-item__content` `b-list-item__subtitle` `b-list-item__title` `b-stack`

```html
<div class="b-stack">
  <p class="b-body">Above the fold</p>
  <hr class="b-divider">
  <p class="b-body">Below the fold</p>
</div>
```

```tsx
import { Divider } from "barua-ui";

<div className="b-stack">
  <p className="b-body">Above the fold</p>
  <Divider />
  <p className="b-body">Below the fold</p>
</div>
```

## Responsive

Barua is mobile-first and the components own their own shrinking — pages should not need bespoke media queries. .b-dashboard spans collapse to full width below md (768px) and the column grid engages above it. Floating surfaces clamp themselves to the viewport: toasts, notifications, menus and the command palette cap their width, and the dock tray scrolls when crowded. The breakpoint scale lives in Foundations ; when a component should respond to its box rather than the viewport, use container queries below.

- Documentation: https://ui.barua.tz/docs/layout.html#responsive
- Classes: `b-badge` `b-badge--accent` `b-btn` `b-btn--glass` `b-btn--primary` `b-btn--sm` `b-gap-2` `b-hide-desktop` `b-hide-mobile` `b-hstack` `b-spacer` `b-stack--wrap`

```html
<div class="b-hstack b-stack--wrap b-gap-2" style="max-width: 20rem">
  <span class="b-badge b-badge--accent">Inbox</span>
  <span class="b-badge">Sent</span>
  <span class="b-badge">Archive</span>
  <span class="b-spacer"></span>
  <button class="b-btn b-btn--glass b-btn--sm">Filter</button>
  <button class="b-btn b-btn--primary b-btn--sm">Compose</button>
</div>
```

```tsx
import { Badge, Button, Spacer } from "barua-ui";

<div
  className="b-hstack b-stack--wrap b-gap-2"
  style={{ maxWidth: "20rem" }}
>
  <Badge variant="accent">Inbox</Badge>
  <Badge>Sent</Badge>
  <Badge>Archive</Badge>
  <Spacer></Spacer>
  <Button variant="glass" size="sm">Filter</Button>
  <Button variant="primary" size="sm">Compose</Button>
</div>
```

## Stage

.b-stage turns a page into a fixed screen: full viewport height, no scrolling — the layout for ambient walls, kiosks and TV-style surfaces where everything must be visible at once. Its .b-container child stretches, a .b-dashboard inside shares the remaining height between rows, and cards clip internally instead of growing the page. Below md it steps aside and the page scrolls like any phone screen. The ambient example is built on it.

- Documentation: https://ui.barua.tz/docs/layout.html#stage
- Classes: `b-card` `b-card--compact` `b-card__body` `b-card__header` `b-card__title` `b-container` `b-dashboard` `b-gap-3` `b-span-6` `b-stack` `b-stage`

```html
<div class="b-stage" style="height: 16rem">
  <div class="b-container b-stack b-gap-3">
    <div class="b-dashboard">
      <article class="b-card b-card--compact b-span-6">
        <div class="b-card__header"><div class="b-card__title">Fits</div></div>
        <div class="b-card__body">Rows share the stage height.</div>
      </article>
      <article class="b-card b-card--compact b-span-6">
        <div class="b-card__header"><div class="b-card__title">Clips</div></div>
        <div class="b-card__body">Overflowing content clips inside the card — the page never scrolls.</div>
      </article>
    </div>
  </div>
</div>
```

```tsx
import { Card, CardBody, CardHeader, CardTitle, Container, Dashboard, Stage } from "barua-ui";

<Stage style={{ height: "16rem" }}>
  <Container className="b-stack b-gap-3">
    <Dashboard>
      <Card compact className="b-span-6">
        <CardHeader>
          <CardTitle>Fits</CardTitle>
        </CardHeader>
        <CardBody>Rows share the stage height.</CardBody>
      </Card>
      <Card compact className="b-span-6">
        <CardHeader>
          <CardTitle>Clips</CardTitle>
        </CardHeader>
        <CardBody>Overflowing content clips inside the card — the page never scrolls.</CardBody>
      </Card>
    </Dashboard>
  </Container>
</Stage>
```

## Container Queries

SwiftUI's ViewThatFits , the CSS way: mark a wrapper .b-cq and children respond to the container's width — .b-cq-show-sm/md/lg appear at ≥24/40/56rem, .b-cq-hide-* retire. The same component adapts in a sidebar and in a full-width main without media queries.

- Documentation: https://ui.barua.tz/docs/layout.html#container-queries
- Classes: `b-card` `b-card__body` `b-cq` `b-cq-hide-sm` `b-cq-show-sm` `b-footnote` `b-text-secondary`

```html
<div class="b-cq b-card" style="max-width: 20rem">
  <div class="b-card__body">
    <span class="b-cq-hide-sm b-footnote b-text-secondary">Narrow container → compact</span>
    <span class="b-cq-show-sm">Wide container content</span>
  </div>
</div>
<div class="b-cq b-card">
  <div class="b-card__body">
    <span class="b-cq-hide-sm b-footnote b-text-secondary">Narrow container → compact</span>
    <span class="b-cq-show-sm">Wide container content — this card is past the 24rem detent, so the fuller layout renders.</span>
  </div>
</div>
```

```tsx
import { Card, CardBody, Footnote } from "barua-ui";

<Card className="b-cq" style={{ maxWidth: "20rem" }}>
  <CardBody>
    <Footnote className="b-cq-hide-sm b-text-secondary">Narrow container → compact</Footnote>
    <span className="b-cq-show-sm">Wide container content</span>
  </CardBody>
</Card>
<Card className="b-cq">
  <CardBody>
    <Footnote className="b-cq-hide-sm b-text-secondary">Narrow container → compact</Footnote>
    <span className="b-cq-show-sm">Wide container content — this card is past the 24rem detent, so the fuller layout renders.</span>
  </CardBody>
</Card>
```

## Text that fits

SwiftUI has minimumScaleFactor ; CSS has no direct equivalent, but a container query unit does the same job honestly. .b-fit-text sizes its child as a fraction of the container's width, clamped so it can never become unreadable at one end or absurd at the other.

- Documentation: https://ui.barua.tz/docs/layout.html#fit-text
- Classes: `b-fit-text` `b-gap-3` `b-stack` `b-stat__value`

```html
<div class="b-stack b-gap-3">
  <div class="b-fit-text" style="width: 100%"><div class="b-stat__value">TZS 4,208,500</div></div>
  <div class="b-fit-text" style="width: 60%"><div class="b-stat__value">TZS 4,208,500</div></div>
  <div class="b-fit-text" style="width: 34%"><div class="b-stat__value">TZS 4,208,500</div></div>
</div>
```

```tsx
import { FitText } from "barua-ui";

<div className="b-stack b-gap-3">
  <FitText style={{ width: "100%" }}>
    <div className="b-stat__value">TZS 4,208,500</div>
  </FitText>
  <FitText style={{ width: "60%" }}>
    <div className="b-stat__value">TZS 4,208,500</div>
  </FitText>
  <FitText style={{ width: "34%" }}>
    <div className="b-stat__value">TZS 4,208,500</div>
  </FitText>
</div>
```

