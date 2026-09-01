# Dashboards — archetypes, composition, choosing a chart, and the four states every widget has

Source: https://ui.barua.tz/docs/dashboards.html
Rules and conventions: https://ui.barua.tz/llms.txt

## Name the question first

A dashboard answers one question, for one person, on one visit: is anything wrong , how are we doing , what needs me today . Everything on the screen either serves that question or is decoration. A page that answers three answers none of them well — that is what a second dashboard is for.

- Documentation: https://ui.barua.tz/docs/dashboards.html#the-question

## The five layers

A dashboard is not a grid of cards, it is a page read from the top down, and each band answers the same question at a different depth: what , then why , then what now . In the survey a figure came first on 40 of 51 pages, and the strongest adjacency of all was a figure followed by a list — 36 occurrences. That order is not a convention, it is how people read.

- Documentation: https://ui.barua.tz/docs/dashboards.html#layers
- Classes: `b-gap-2` `b-hstack` `b-stack` `b-table` `b-table-wrap`

```html
<div class="b-stack b-gap-2 docs-layers">
  <div class="docs-layer docs-layer--ctx"><span>1 · context</span></div>
  <div class="b-hstack b-gap-2">
    <div class="docs-layer" style="flex: 3"><span>2 · verdict</span></div>
    <div class="docs-layer" style="flex: 3"></div>
    <div class="docs-layer" style="flex: 3"></div>
    <div class="docs-layer" style="flex: 3"></div>
  </div>
  <div class="b-hstack b-gap-2">
    <div class="docs-layer docs-layer--tall" style="flex: 8"><span>3 · evidence</span></div>
    <div class="docs-layer docs-layer--tall" style="flex: 4"></div>
  </div>
  <div class="b-hstack b-gap-2">
    <div class="docs-layer" style="flex: 6"><span>4 · detail</span></div>
    <div class="docs-layer" style="flex: 6"></div>
  </div>
  <div class="docs-layer docs-layer--ctx"><span>5 · tail</span></div>
</div>
```

## Six archetypes

Variety comes from choosing a different archetype, not from decorating the same one. Most dashboards are an Overview because it is the shape that gets built by reflex.

- Documentation: https://ui.barua.tz/docs/dashboards.html#archetypes
- Classes: `b-table` `b-table-wrap`

## Composition

Widths are full, half, third or quarter, and spans in a row total twelve. Those four are the entire vocabulary the surveyed templates use; anything else reads as a mistake.

- Documentation: https://ui.barua.tz/docs/dashboards.html#composition
- Classes: `b-card` `b-card--compact` `b-card__body` `b-card__header` `b-card__title` `b-columns` `b-columns__bar` `b-dashboard` `b-empty` `b-empty__desc` `b-empty__title` `b-span-3` `b-span-4` `b-span-8` `b-stat` `b-stat__label` `b-stat__value`

```html
<div class="b-dashboard">
  <article class="b-card b-card--compact b-span-3"><div class="b-card__body"><div class="b-stat"><span class="b-stat__label">Sent</span><span class="b-stat__value">12,480</span></div></div></article>
  <article class="b-card b-card--compact b-span-3"><div class="b-card__body"><div class="b-stat"><span class="b-stat__label">Opened</span><span class="b-stat__value">61%</span></div></div></article>
  <article class="b-card b-card--compact b-span-3"><div class="b-card__body"><div class="b-stat"><span class="b-stat__label">Replied</span><span class="b-stat__value">18%</span></div></div></article>
  <article class="b-card b-card--compact b-span-3"><div class="b-card__body"><div class="b-stat"><span class="b-stat__label">Bounced</span><span class="b-stat__value">0.4%</span></div></div></article>
  <article class="b-card b-span-8"><div class="b-card__header"><div class="b-card__title">Delivery, last 7 days</div></div><div class="b-card__body"><div class="b-columns" style="--b-chart-h: 8rem" role="img" aria-label="Delivery peaked Thursday at 4,120."><div class="b-columns__bar" data-label="M" style="--v: 62%"></div><div class="b-columns__bar" data-label="T" style="--v: 71%"></div><div class="b-columns__bar" data-label="W" style="--v: 58%"></div><div class="b-columns__bar" data-label="T" style="--v: 100%"></div><div class="b-columns__bar" data-label="F" style="--
```

```tsx
import { Card, CardBody, CardHeader, CardTitle, Columns, Dashboard, Stat } from "barua-ui";

<Dashboard>
  <Card compact className="b-span-3">
    <CardBody>
      <Stat>
        <span className="b-stat__label">Sent</span>
        <span className="b-stat__value">12,480</span>
      </Stat>
    </CardBody>
  </Card>
  <Card compact className="b-span-3">
    <CardBody>
      <Stat>
        <span className="b-stat__label">Opened</span>
        <span className="b-stat__value">61%</span>
      </Stat>
    </CardBody>
  </Card>
  <Card compact className="b-span-3">
    <CardBody>
      <Stat>
        <span className="b-stat__label">Replied</span>
        <span className="b-stat__value">18%</span>
      </Stat>
    </CardBody>
  </Card>
  <Card compact className="b-span-3">
    <CardBody>
      <Stat>
        <span className="b-stat__label">Bounced</span>
        <span className="b-stat__value">0.4%</span>
      </Stat>
    </CardBody>
  </Card>
  <Card className="b-span-8">
    <CardHeader>
      <CardTitle>Delivery, last 7 days</CardTitle>
    </CardHeader>
    <CardBody>
      <Columns
        style={{ "--b-chart-h": "8rem" }}
        role="img"
        aria-label="Delivery peaked Thursday at 4,120."
      >
        <div className="b-columns__bar" data-label="M" style={{ "--v": "62%" }}></div>
        <div className="b-columns__bar" data-label="T" style={{ "--v": "71%" }}></div>
        <div className="b-columns__bar" data-label="W" style={{ "--v": "58%" }}></div>
        <div className="b-columns__bar" data-label="T" style={{ "--v": "100%" }}></div>
      </Columns>
    </CardBody>
  </Card>
</Dashboard>
```

## White space

Space is the only thing on a dashboard doing structural work that nobody notices. Four rules cover almost every case.

- Documentation: https://ui.barua.tz/docs/dashboards.html#whitespace

## Text on a dashboard

Nothing here is prose. A dashboard is read in glances, so every string is a label, a figure or a caption — and if something genuinely needs a sentence to explain it, it belongs on a detail page.

- Documentation: https://ui.barua.tz/docs/dashboards.html#dashboard-type

## How many pages a dashboard product has

Counted across the same six products — 163 genuine product pages, once component demos are set aside. It is a useful check on whether a product is finished.

- Documentation: https://ui.barua.tz/docs/dashboards.html#page-set
- Classes: `b-table` `b-table-wrap`

## Choosing a chart

Time is a line or an area. Comparison across categories is a bar. Those three were 84% of every chart in the survey — 97 of 115.

- Documentation: https://ui.barua.tz/docs/dashboards.html#charts
- Classes: `b-table` `b-table-wrap`

## Four states, not one

Every widget has a loading state, an empty state, an error state and a loaded state. Design all four or the page only works on a good day. In 457 pages, three had a message for having no data.

- Documentation: https://ui.barua.tz/docs/dashboards.html#states
- Classes: `b-alert` `b-alert--danger` `b-alert__content` `b-card` `b-card--compact` `b-card__body` `b-empty` `b-empty__desc` `b-empty__title` `b-gap-2` `b-gap-3` `b-grid` `b-grid--3` `b-skeleton` `b-skeleton--text` `b-stack`

```html
<div class="b-grid b-grid--3 b-gap-3">
  <article class="b-card b-card--compact"><div class="b-card__body b-stack b-gap-2"><span class="b-skeleton b-skeleton--text" style="width: 40%"></span><span class="b-skeleton b-skeleton--text" style="width: 70%"></span></div></article>
  <article class="b-card b-card--compact"><div class="b-card__body"><div class="b-empty"><div class="b-empty__title">No invoices yet</div><p class="b-empty__desc">They appear here once you send one.</p></div></div></article>
  <article class="b-card b-card--compact"><div class="b-card__body"><div class="b-alert b-alert--danger" role="alert"><div class="b-alert__content">Could not reach billing. Retrying in 30s.</div></div></div></article>
</div>
```

```tsx
import { Alert, Card, CardBody, EmptyState, Grid, Skeleton } from "barua-ui";

<Grid cols={3} className="b-gap-3">
  <Card compact>
    <CardBody className="b-stack b-gap-2">
      <Skeleton className="b-skeleton--text" style={{ width: "40%" }}></Skeleton>
      <Skeleton className="b-skeleton--text" style={{ width: "70%" }}></Skeleton>
    </CardBody>
  </Card>
  <Card compact>
    <CardBody>
      <EmptyState>
        <div className="b-empty__title">No invoices yet</div>
        <p className="b-empty__desc">They appear here once you send one.</p>
      </EmptyState>
    </CardBody>
  </Card>
  <Card compact>
    <CardBody>
      <Alert variant="danger" role="alert">
        <div className="b-alert__content">Could not reach billing. Retrying in 30s.</div>
      </Alert>
    </CardBody>
  </Card>
</Grid>
```

## Density

A table on a dashboard shows five to ten rows and links to the full list — it is a sample, not the archive. Columns of figures take .b-tabular-nums or the digits jitter as they update. A delta states direction and period together: "↑ 8.2% this week", never a bare arrow.

- Documentation: https://ui.barua.tz/docs/dashboards.html#density

