# Content — cards, lists, tables, badges, avatars

Source: https://ui.barua.tz/docs/content.html
Rules and conventions: https://ui.barua.tz/llms.txt

## Card

A bordered surface with optional .b-card__header , .b-card__body and .b-card__footer regions. Title and subtitle classes keep the type ramp consistent across products.

- Documentation: https://ui.barua.tz/docs/content.html#card
- Classes: `b-badge` `b-badge--success` `b-btn` `b-btn--ghost` `b-btn--pill` `b-btn--primary` `b-btn--sm` `b-btn--tinted` `b-card` `b-card--accent` `b-card--compact` `b-card--elevated` `b-card--flush` `b-card--glass` `b-card--icon` `b-card--interactive` `b-card--media-overlay` `b-card--neutral` `b-card__art` `b-card__body` `b-card__eyebrow` `b-card__footer` `b-card__header` `b-card__media` `b-card__overlay` `b-card__subtitle` `b-card__title` `b-gap-3` `b-grow` `b-hstack` `b-icon-tile` `b-icon-tile--gray` `b-icon-tile--green` `b-icon-tile--indigo` `b-icon-tile--orange` `b-icon-tile--purple` `b-icon-tile--red` `b-icon-tile--sm` `b-icon-tile--solid` `b-icon-tile--teal` `b-list` `b-list--inset-divider` `b-list--plain` `b-list-item` `b-list-item--interactive` `b-list-item__chevron` `b-list-item__content` `b-list-item__leading` `b-list-item__title` `b-list-item__trailing` `b-wallpaper-scope`

```html
<article class="b-card" style="max-width: 26rem">
  <header class="b-card__header">
    <div>
      <div class="b-card__title">Safari itinerary</div>
      <div class="b-card__subtitle">Serengeti &amp; Ngorongoro · 5 days</div>
    </div>
    <button class="b-btn b-btn--ghost b-btn--sm">Edit</button>
  </header>
  <div class="b-card__body">
    Depart Arusha at dawn, overnight in Seronera, then descend into the
    crater on day four. Amina Hassan is confirmed as your guide.
  </div>
  <footer class="b-card__footer">
    <button class="b-btn b-btn--primary b-btn--sm">Book trip</button>
    <button class="b-btn b-btn--ghost b-btn--sm">Share</button>
  </footer>
</article>
```

```tsx
import { Button, Card, CardBody, CardFooter, CardHeader, CardSubtitle, CardTitle } from "barua-ui";

<Card style={{ maxWidth: "26rem" }}>
  <CardHeader>
    <div>
      <CardTitle>Safari itinerary</CardTitle>
      <CardSubtitle>Serengeti & Ngorongoro · 5 days</CardSubtitle>
    </div>
    <Button variant="ghost" size="sm">Edit</Button>
  </CardHeader>
  <CardBody>Depart Arusha at dawn, overnight in Seronera, then descend into the crater on day four. Amina Hassan is confirmed as your guide.</CardBody>
  <CardFooter>
    <Button variant="primary" size="sm">Book trip</Button>
    <Button variant="ghost" size="sm">Share</Button>
  </CardFooter>
</Card>
```

## List & List Item

iOS-style grouped list. Each .b-list-item slots a leading icon, a content column with title and subtitle, trailing detail text and an optional chevron. Add .b-list-item--interactive for hover feedback and .is-selected for the accent wash.

- Documentation: https://ui.barua.tz/docs/content.html#list
- Classes: `b-badge` `b-badge--accent` `b-badge--count` `b-list` `b-list--inset-divider` `b-list-item` `b-list-item--interactive` `b-list-item__chevron` `b-list-item__content` `b-list-item__leading` `b-list-item__subtitle` `b-list-item__title` `b-list-item__trailing`

```html
<ul class="b-list" style="max-width: 26rem">
  <li class="b-list-item b-list-item--interactive">
    <span class="b-list-item__leading">
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="2.5" y="4.5" width="15" height="11" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="m4.5 7 5.5 4 5.5-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </span>
    <div class="b-list-item__content">
      <div class="b-list-item__title">Amina Hassan</div>
      <div class="b-list-item__subtitle">Customs forms for the Dar es Salaam container</div>
    </div>
    <span class="b-list-item__trailing">09:41</span>
    <span class="b-list-item__chevron" aria-hidden="true">›</span>
  </li>
  <li class="b-list-item b-list-item--interactive is-selected">
    <span class="b-list-item__leading">
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m10 2.5 6.5 3.5v8L10 17.5 3.5 14V6L10 2.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M3.5 6 10 9.5 16.5 6M10 9.5v8" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
    </span>
    <div class="b-list-item__content">
      <div class="b-list-item__title">Parcel BR-2609</div>
      <div class="b-list-item__subtitle">Out for delivery — Westlands, Nairobi</div>
    </div>
    <span class="b-list-item__trailing
```

```tsx
import { List, ListItem } from "barua-ui";

<List style={{ maxWidth: "26rem" }}>
  <ListItem interactive>
    <span className="b-list-item__leading">
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <rect x="2.5" y="4.5" width="15" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="m4.5 7 5.5 4 5.5-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
    <div className="b-list-item__content">
      <div className="b-list-item__title">Amina Hassan</div>
      <div className="b-list-item__subtitle">Customs forms for the Dar es Salaam container</div>
    </div>
    <span className="b-list-item__trailing">09:41</span>
    <span className="b-list-item__chevron" aria-hidden="true">›</span>
  </ListItem>
  <ListItem interactive selected>
    <span className="b-list-item__leading">
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="m10 2.5 6.5 3.5v8L10 17.5 3.5 14V6L10 2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M3.5 6 10 9.5 16.5 6M10 9.5v8" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    </span>
    <div className="b-list-item__content">
      <div className="b-list-item__title">Parcel BR-2609</div>
      <div className="b-list-item__subtitle">Out for delivery — Westlands, Nairobi</div>
    </div>
  </ListItem>
</List>
```

## List Header & Footer

iOS grouped-list captions: an uppercase .b-list__header above the group and a quiet explanatory .b-list__footer beneath — the Settings-app pattern for telling people what a group does.

- Documentation: https://ui.barua.tz/docs/content.html#list-captions
- Classes: `b-list` `b-list--inset-divider` `b-list-item` `b-list-item__content` `b-list-item__title` `b-list-item__trailing` `b-list__footer` `b-list__header` `b-switch` `b-switch--sm`

```html
<div class="b-list__header">Notifications</div>
<ul class="b-list b-list--inset-divider">
  <li class="b-list-item">
    <span class="b-list-item__content"><span class="b-list-item__title">New mail</span></span>
    <span class="b-list-item__trailing"><label class="b-switch b-switch--sm"><input type="checkbox" checked></label></span>
  </li>
  <li class="b-list-item">
    <span class="b-list-item__content"><span class="b-list-item__title">Mentions</span></span>
    <span class="b-list-item__trailing"><label class="b-switch b-switch--sm"><input type="checkbox"></label></span>
  </li>
</ul>
<div class="b-list__footer">Delivered quietly between 22:00 and 07:00.</div>
```

```tsx
import { List, ListFooter, ListHeader, ListItem, Switch } from "barua-ui";

<ListHeader>Notifications</ListHeader>
<List insetDividers>
  <ListItem>
    <span className="b-list-item__content">
      <span className="b-list-item__title">New mail</span>
    </span>
    <span className="b-list-item__trailing">
      <Switch small>
        <input type="checkbox" checked />
      </Switch>
    </span>
  </ListItem>
  <ListItem>
    <span className="b-list-item__content">
      <span className="b-list-item__title">Mentions</span>
    </span>
    <span className="b-list-item__trailing">
      <Switch small>
        <input type="checkbox" />
      </Switch>
    </span>
  </ListItem>
</List>
<ListFooter>Delivered quietly between 22:00 and 07:00.</ListFooter>
```

## Description List

Label–value pairs on a two-column grid. Use for read-only detail panes; switch to .b-dl--stacked in narrow columns.

- Documentation: https://ui.barua.tz/docs/content.html#description-list
- Classes: `b-dl` `b-dl--stacked`

```html
<dl class="b-dl">
  <dt>Full name</dt><dd>Amina Hassan</dd>
  <dt>Route</dt><dd>Dar es Salaam → Zanzibar</dd>
  <dt>Vessel</dt><dd>MV Kilimanjaro IV, deck 2</dd>
  <dt>Booking reference</dt><dd><code>ZNZ-88214</code></dd>
</dl>
```

```tsx
import { DescriptionList } from "barua-ui";

<DescriptionList>
  <dt>Full name</dt>
  <dd>Amina Hassan</dd>
  <dt>Route</dt>
  <dd>Dar es Salaam → Zanzibar</dd>
  <dt>Vessel</dt>
  <dd>MV Kilimanjaro IV, deck 2</dd>
  <dt>Booking reference</dt>
  <dd>
    <code>ZNZ-88214</code>
  </dd>
</DescriptionList>
```

## GroupBox

SwiftUI's GroupBox for the web: a quiet, labeled enclosure for related content — softer than a card, and it nests (a nested box flips back to surface so depth stays readable).

- Documentation: https://ui.barua.tz/docs/content.html#groupbox
- Classes: `b-groupbox` `b-groupbox__label` `b-labeled` `b-labeled__label` `b-labeled__value` `b-progress` `b-progress__fill`

```html
<div class="b-groupbox" style="max-width: 24rem">
  <div class="b-groupbox__label">
    <svg viewBox="0 0 20 20" fill="none"><path d="M10 3.5c-2.5 3-4.5 5.2-4.5 7.4a4.5 4.5 0 0 0 9 0c0-2.2-2-4.4-4.5-7.4Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
    Hydration
  </div>
  <div class="b-labeled">
    <span class="b-labeled__label">Today</span>
    <span class="b-labeled__value">1.2 L of 2 L</span>
  </div>
  <div class="b-progress"><div class="b-progress__fill" style="width: 60%"></div></div>
</div>
```

```tsx
import { GroupBox, Labeled, Progress } from "barua-ui";

<GroupBox style={{ maxWidth: "24rem" }}>
  <div className="b-groupbox__label">
    <svg viewBox="0 0 20 20" fill="none">
      <path d="M10 3.5c-2.5 3-4.5 5.2-4.5 7.4a4.5 4.5 0 0 0 9 0c0-2.2-2-4.4-4.5-7.4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
    Hydration
  </div>
  <Labeled>
    <span className="b-labeled__label">Today</span>
    <span className="b-labeled__value">1.2 L of 2 L</span>
  </Labeled>
  <Progress>
    <div className="b-progress__fill" style={{ width: "60%" }}></div>
  </Progress>
</GroupBox>
```

## Labeled Content

SwiftUI's LabeledContent : the standard label-left, value-right row for settings and detail screens. Rows separate with hairlines automatically; the label takes an optional small second line.

- Documentation: https://ui.barua.tz/docs/content.html#labeled-content
- Classes: `b-labeled` `b-labeled__label` `b-labeled__value` `b-switch`

```html
<div class="b-labeled">
  <span class="b-labeled__label">Plan</span>
  <span class="b-labeled__value">Barua Business</span>
</div>
<div class="b-labeled">
  <span class="b-labeled__label">Storage<small>Mail and Drive combined</small></span>
  <span class="b-labeled__value">8.2 GB of 15 GB</span>
</div>
<div class="b-labeled">
  <span class="b-labeled__label">Two-factor</span>
  <span class="b-labeled__value"><label class="b-switch"><input type="checkbox" checked></label></span>
</div>
```

```tsx
import { Labeled, Switch } from "barua-ui";

<Labeled>
  <span className="b-labeled__label">Plan</span>
  <span className="b-labeled__value">Barua Business</span>
</Labeled>
<Labeled>
  <span className="b-labeled__label">
    Storage
    <small>Mail and Drive combined</small>
  </span>
  <span className="b-labeled__value">8.2 GB of 15 GB</span>
</Labeled>
<Labeled>
  <span className="b-labeled__label">Two-factor</span>
  <span className="b-labeled__value">
    <Switch>
      <input type="checkbox" checked />
    </Switch>
  </span>
</Labeled>
```

## Table

Wrap every .b-table in a .b-table-wrap so it scrolls horizontally instead of breaking the page. Sortable columns put a .b-table__sort button inside the header cell; .is-asc / .is-desc flip the arrow. Numeric columns take .b-table__num for right-aligned tabular figures.

- Documentation: https://ui.barua.tz/docs/content.html#table
- Classes: `b-table` `b-table--compact` `b-table--hover` `b-table--striped` `b-table-wrap` `b-table__num` `b-table__sort`

```html
<div class="b-table-wrap">
  <table class="b-table b-table--hover">
    <thead>
      <tr>
        <th scope="col" aria-sort="ascending"><button class="b-table__sort is-asc">Route</button></th>
        <th scope="col"><button class="b-table__sort">Next departure</button></th>
        <th scope="col" class="b-table__num">Seats</th>
        <th scope="col" class="b-table__num">Fare (TZS)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Dar es Salaam → Zanzibar</td>
        <td>Today 15:45</td>
        <td class="b-table__num">64</td>
        <td class="b-table__num">35,000</td>
      </tr>
      <tr class="is-selected">
        <td>Nairobi → Mombasa</td>
        <td>Today 20:35</td>
        <td class="b-table__num">118</td>
        <td class="b-table__num">58,500</td>
      </tr>
      <tr>
        <td>Arusha → Moshi</td>
        <td>Tomorrow 07:10</td>
        <td class="b-table__num">42</td>
        <td class="b-table__num">12,000</td>
      </tr>
      <tr>
        <td>Dodoma → Dar es Salaam</td>
        <td>Tomorrow 09:00</td>
        <td class="b-table__num">51</td>
        <td class="b-table__num">41,000</td>
      </tr>
    </tbody>
  </table>
</div>
```

```tsx
import { Table, TableNum, TableWrap } from "barua-ui";

<TableWrap>
  <Table hover>
    <thead>
      <tr>
        <th scope="col" aria-sort="ascending">
          <button className="b-table__sort is-asc">Route</button>
        </th>
        <th scope="col">
          <button className="b-table__sort">Next departure</button>
        </th>
        <TableNum scope="col">Seats</TableNum>
        <TableNum scope="col">Fare (TZS)</TableNum>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Dar es Salaam → Zanzibar</td>
        <td>Today 15:45</td>
        <TableNum>64</TableNum>
        <TableNum>35,000</TableNum>
      </tr>
      <tr className="is-selected">
        <td>Nairobi → Mombasa</td>
        <td>Today 20:35</td>
        <TableNum>118</TableNum>
        <TableNum>58,500</TableNum>
      </tr>
      <tr>
        <td>Arusha → Moshi</td>
        <td>Tomorrow 07:10</td>
        <TableNum>42</TableNum>
        <TableNum>12,000</TableNum>
      </tr>
      <tr>
        <td>Dodoma → Dar es Salaam</td>
        <td>Tomorrow 09:00</td>
        <TableNum>51</TableNum>
        <TableNum>41,000</TableNum>
      </tr>
    </tbody>
  </Table>
</TableWrap>
```

## Data Grid

Add .b-datagrid to the table wrap for a scrolling body with a sticky header — height comes from the --b-datagrid-h custom property. Row actions in a .b-row-actions span stay hidden until the row is hovered.

- Documentation: https://ui.barua.tz/docs/content.html#data-grid
- Classes: `b-btn` `b-btn--ghost` `b-btn--sm` `b-datagrid` `b-icon-btn` `b-row-actions` `b-table` `b-table--hover` `b-table-wrap` `b-table__num`

```html
<div class="b-table-wrap b-datagrid" style="--b-datagrid-h: 17rem">
  <table class="b-table b-table--hover">
    <thead>
      <tr>
        <th scope="col">Invoice</th>
        <th scope="col">Customer</th>
        <th scope="col">City</th>
        <th scope="col" class="b-table__num">Amount (TZS)</th>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>BR-2610</td><td>Amina Hassan</td><td>Dar es Salaam</td><td class="b-table__num">240,000</td>
        <td><span class="b-row-actions">
          <button class="b-btn b-icon-btn b-btn--ghost b-btn--sm" aria-label="Edit BR-2610"><svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M13.5 3.5 16.5 6.5 7 16H4v-3l9.5-9.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg></button>
          <button class="b-btn b-icon-btn b-btn--ghost b-btn--sm" aria-label="Delete BR-2610"><svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4 6h12M8 6V4.5A1.5 1.5 0 0 1 9.5 3h1A1.5 1.5 0 0 1 12 4.5V6m2.5 0-.7 9.1A1.5 1.5 0 0 1 12.3 16H7.7a1.5 1.5 0 0 1-1.5-.9L5.5 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></button>
        </span></td>
      </tr>
      <tr>
        <td>BR-2609</td><td>Baraka Mwangi</td><td>Nairobi</td><td class="b-table__num">96,500</td>
        <td><span class="b-row-actions">
          <button class="b-btn b-ic
```

```tsx
import { Button, Table, TableNum, TableWrap } from "barua-ui";

<TableWrap className="b-datagrid" style={{ "--b-datagrid-h": "17rem" }}>
  <Table hover>
    <thead>
      <tr>
        <th scope="col">Invoice</th>
        <th scope="col">Customer</th>
        <th scope="col">City</th>
        <TableNum scope="col">Amount (TZS)</TableNum>
        <th scope="col">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>BR-2610</td>
        <td>Amina Hassan</td>
        <td>Dar es Salaam</td>
        <TableNum>240,000</TableNum>
        <td>
          <span className="b-row-actions">
            <Button icon variant="ghost" size="sm" aria-label="Edit BR-2610">
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M13.5 3.5 16.5 6.5 7 16H4v-3l9.5-9.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
            </Button>
            <Button icon variant="ghost" size="sm" aria-label="Delete BR-2610">
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M4 6h12M8 6V4.5A1.5 1.5 0 0 1 9.5 3h1A1.5 1.5 0 0 1 12 4.5V6m2.5 0-.7 9.1A1.5 1.5 0 0 1 12.3 16H7.7a1.5 1.5 0 0 1-1.5-.9L5.5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </Button>
          </span>
        </td>
      </tr>
      <tr>
        <td>BR-2609</td>
        <td>Baraka Mwangi</td>
        <td>Nairobi</td>
        <TableNum>96,500</TableNum>
        <td>
          <span className="b-row-actions"></span>
        </td>
      </tr>
    </tbody>
  </Table>
</TableWrap>
```

## Tree

Nested <details> elements with the .b-tree-item class — branches expand natively, no JavaScript. Leaves are plain .b-tree-item__row divs indented to align with branch labels.

- Documentation: https://ui.barua.tz/docs/content.html#tree
- Classes: `b-tree` `b-tree-item` `b-tree-item__row`

```html
<ul class="b-tree" style="max-width: 22rem">
  <li>
    <details class="b-tree-item" open>
      <summary>
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M3 5.5A1.5 1.5 0 0 1 4.5 4h3l2 2.5h6A1.5 1.5 0 0 1 17 8v6.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 3 14.5v-9Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
        Reports
      </summary>
      <ul class="b-tree">
        <li>
          <details class="b-tree-item" open>
            <summary>
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M3 5.5A1.5 1.5 0 0 1 4.5 4h3l2 2.5h6A1.5 1.5 0 0 1 17 8v6.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 3 14.5v-9Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
              Q3 2026
            </summary>
            <ul class="b-tree">
              <li>
                <div class="b-tree-item__row is-selected">
                  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M5 2.5h7l3 3v12H5v-15Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M12 2.5v3h3" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
                  nairobi-sales.numbers
                </div>
              </li>
              <li>
                <div class="b-tree-item__row">
                  <svg viewBox="0 0 20 20" fill="none" aria-
```

```tsx
import { Tree, TreeItem } from "barua-ui";

<Tree style={{ maxWidth: "22rem" }}>
  <li>
    <TreeItem open>
      <summary>
        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M3 5.5A1.5 1.5 0 0 1 4.5 4h3l2 2.5h6A1.5 1.5 0 0 1 17 8v6.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 3 14.5v-9Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
        Reports
      </summary>
      <Tree>
        <li>
          <TreeItem open>
            <summary>
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M3 5.5A1.5 1.5 0 0 1 4.5 4h3l2 2.5h6A1.5 1.5 0 0 1 17 8v6.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 3 14.5v-9Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
              Q3 2026
            </summary>
            <Tree>
              <li>
                <div className="b-tree-item__row is-selected">
                  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M5 2.5h7l3 3v12H5v-15Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                    <path d="M12 2.5v3h3" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                  </svg>
                  nairobi-sales.numbers
                </div>
              </li>
              <li>
                <div className="b-tree-item__row"></div>
              </li>
            </Tree>
          </TreeItem>
        </li>
      </Tree>
    </TreeItem>
  </li>
</Tree>
```

## Timeline

A vertical sequence of events. Mark finished steps .is-complete (filled accent dot) and the current one .is-active (accent ring); untouched steps stay gray.

- Documentation: https://ui.barua.tz/docs/content.html#timeline
- Classes: `b-timeline` `b-timeline__body` `b-timeline__time` `b-timeline__title`

```html
<ol class="b-timeline" style="max-width: 26rem">
  <li class="is-complete">
    <div class="b-timeline__time">Mon 24 Aug · 08:12</div>
    <div class="b-timeline__title">Order placed</div>
    <div class="b-timeline__body">Amina Hassan paid TZS 240,000 via mobile money.</div>
  </li>
  <li class="is-complete">
    <div class="b-timeline__time">Mon 24 Aug · 16:40</div>
    <div class="b-timeline__title">Packed in Dar es Salaam</div>
    <div class="b-timeline__body">Two parcels sealed at the Ubungo depot.</div>
  </li>
  <li class="is-active">
    <div class="b-timeline__time">Wed 26 Aug · 06:55</div>
    <div class="b-timeline__title">In transit to Nairobi</div>
    <div class="b-timeline__body">Cleared Namanga border, ETA tonight.</div>
  </li>
  <li>
    <div class="b-timeline__time">Pending</div>
    <div class="b-timeline__title">Delivered</div>
    <div class="b-timeline__body">Signature required on arrival.</div>
  </li>
</ol>
```

```tsx
import { Timeline } from "barua-ui";

<Timeline style={{ maxWidth: "26rem" }}>
  <li className="is-complete">
    <div className="b-timeline__time">Mon 24 Aug · 08:12</div>
    <div className="b-timeline__title">Order placed</div>
    <div className="b-timeline__body">Amina Hassan paid TZS 240,000 via mobile money.</div>
  </li>
  <li className="is-complete">
    <div className="b-timeline__time">Mon 24 Aug · 16:40</div>
    <div className="b-timeline__title">Packed in Dar es Salaam</div>
    <div className="b-timeline__body">Two parcels sealed at the Ubungo depot.</div>
  </li>
  <li className="is-active">
    <div className="b-timeline__time">Wed 26 Aug · 06:55</div>
    <div className="b-timeline__title">In transit to Nairobi</div>
    <div className="b-timeline__body">Cleared Namanga border, ETA tonight.</div>
  </li>
  <li>
    <div className="b-timeline__time">Pending</div>
    <div className="b-timeline__title">Delivered</div>
    <div className="b-timeline__body">Signature required on arrival.</div>
  </li>
</Timeline>
```

## Feed

Avatar-plus-bubble rows for comments and activity streams. The bubble is a bordered surface; .b-feed__meta carries the byline.

- Documentation: https://ui.barua.tz/docs/content.html#feed
- Classes: `b-avatar` `b-feed` `b-feed__bubble` `b-feed__item` `b-feed__meta`

```html
<div class="b-feed" style="max-width: 30rem">
  <div class="b-feed__item">
    <span class="b-avatar">AH</span>
    <div class="b-feed__bubble">
      Customs cleared the container this morning — paperwork is in the
      shared folder.
      <div class="b-feed__meta">Amina Hassan · 2 h ago · Dar es Salaam</div>
    </div>
  </div>
  <div class="b-feed__item">
    <span class="b-avatar">BM</span>
    <div class="b-feed__bubble">
      Asante! I&rsquo;ll schedule the Nairobi leg for tomorrow at dawn.
      <div class="b-feed__meta">Baraka Mwangi · 1 h ago · Nairobi</div>
    </div>
  </div>
  <div class="b-feed__item">
    <span class="b-avatar">NJ</span>
    <div class="b-feed__bubble">
      Flag anything fragile — the Zanzibar ferry crossing is rough this
      week.
      <div class="b-feed__meta">Neema Joseph · 20 min ago · Zanzibar</div>
    </div>
  </div>
</div>
```

```tsx
import { Avatar, Feed } from "barua-ui";

<Feed style={{ maxWidth: "30rem" }}>
  <div className="b-feed__item">
    <Avatar>AH</Avatar>
    <div className="b-feed__bubble">
      Customs cleared the container this morning — paperwork is in the shared folder.
      <div className="b-feed__meta">Amina Hassan · 2 h ago · Dar es Salaam</div>
    </div>
  </div>
  <div className="b-feed__item">
    <Avatar>BM</Avatar>
    <div className="b-feed__bubble">
      Asante! I’ll schedule the Nairobi leg for tomorrow at dawn.
      <div className="b-feed__meta">Baraka Mwangi · 1 h ago · Nairobi</div>
    </div>
  </div>
  <div className="b-feed__item">
    <Avatar>NJ</Avatar>
    <div className="b-feed__bubble">
      Flag anything fragile — the Zanzibar ferry crossing is rough this week.
      <div className="b-feed__meta">Neema Joseph · 20 min ago · Zanzibar</div>
    </div>
  </div>
</Feed>
```

## Accordion & Disclosure

A .b-accordion stacks details.b-disclosure panels with hairlines between them — native open/close semantics and keyboard support for free. Use a lone .b-disclosure--plain for an inline “show more”.

- Documentation: https://ui.barua.tz/docs/content.html#accordion
- Classes: `b-accordion` `b-disclosure` `b-disclosure--plain` `b-disclosure__body`

```html
<div class="b-accordion" style="max-width: 32rem">
  <details class="b-disclosure" open>
    <summary>How long does delivery to Zanzibar take?</summary>
    <div class="b-disclosure__body">
      Parcels leave Dar es Salaam on the 15:45 ferry daily. Most
      deliveries land in Stone Town the same evening; the east-coast
      villages add one day.
    </div>
  </details>
  <details class="b-disclosure">
    <summary>Which cities do you cover?</summary>
    <div class="b-disclosure__body">
      Dar es Salaam, Nairobi, Mombasa, Arusha, Dodoma, Kampala and
      Kigali — with partner depots in Moshi and Tanga.
    </div>
  </details>
  <details class="b-disclosure">
    <summary>Can I change the delivery address?</summary>
    <div class="b-disclosure__body">
      Yes, until the parcel is marked out for delivery. Edits after
      dispatch reroute on the next leg.
    </div>
  </details>
</div>
```

```tsx
import { Accordion, Disclosure } from "barua-ui";

<Accordion style={{ maxWidth: "32rem" }}>
  <Disclosure open>
    <summary>How long does delivery to Zanzibar take?</summary>
    <div className="b-disclosure__body">Parcels leave Dar es Salaam on the 15:45 ferry daily. Most deliveries land in Stone Town the same evening; the east-coast villages add one day.</div>
  </Disclosure>
  <Disclosure>
    <summary>Which cities do you cover?</summary>
    <div className="b-disclosure__body">Dar es Salaam, Nairobi, Mombasa, Arusha, Dodoma, Kampala and Kigali — with partner depots in Moshi and Tanga.</div>
  </Disclosure>
  <Disclosure>
    <summary>Can I change the delivery address?</summary>
    <div className="b-disclosure__body">Yes, until the parcel is marked out for delivery. Edits after dispatch reroute on the next leg.</div>
  </Disclosure>
</Accordion>
```

## Badge

Small status labels. --dot prefixes a colored point, --count is the red numeric pill, and --solid fills with the accent for maximum emphasis.

- Documentation: https://ui.barua.tz/docs/content.html#badge
- Classes: `b-badge` `b-badge--accent` `b-badge--count` `b-badge--danger` `b-badge--dot` `b-badge--solid` `b-badge--success` `b-badge--warning`

```html
<span class="b-badge">Default</span>
<span class="b-badge b-badge--accent">Accent</span>
<span class="b-badge b-badge--success">Delivered</span>
<span class="b-badge b-badge--warning">Held at customs</span>
<span class="b-badge b-badge--danger">Failed</span>
<span class="b-badge b-badge--solid">Solid</span>
<span class="b-badge b-badge--success b-badge--dot">Online</span>
<span class="b-badge b-badge--danger b-badge--dot">Offline</span>
<span class="b-badge b-badge--count">12</span>
```

```tsx
import { Badge } from "barua-ui";

<Badge>Default</Badge>
<Badge variant="accent">Accent</Badge>
<Badge variant="success">Delivered</Badge>
<Badge variant="warning">Held at customs</Badge>
<Badge variant="danger">Failed</Badge>
<Badge className="b-badge--solid">Solid</Badge>
<Badge variant="success" dot>Online</Badge>
<Badge variant="danger" dot>Offline</Badge>
<Badge className="b-badge--count">12</Badge>
```

## Tag & Chip

Tags are quiet, outlined metadata — never click targets. Chips are interactive: real buttons that toggle with .is-selected (or aria-pressed ) and can carry a .b-chip__remove affordance.

- Documentation: https://ui.barua.tz/docs/content.html#tag-chip
- Classes: `b-chip` `b-chip__remove` `b-tag`

```html
<span class="b-tag">fragile</span>
<span class="b-tag">express</span>
<span class="b-tag">cold-chain</span>
<span class="b-tag">v0.1</span>
```

```tsx
import { Tag } from "barua-ui";

<Tag>fragile</Tag>
<Tag>express</Tag>
<Tag>cold-chain</Tag>
<Tag>v0.1</Tag>
```

## Avatar & Avatar Group

Initials on the accent-soft fill are the built-in fallback — no broken-image state, ever. Sizes run --xs to --xl ; --square suits workspaces and files, --online adds the presence dot.

- Documentation: https://ui.barua.tz/docs/content.html#avatar
- Classes: `b-avatar` `b-avatar--lg` `b-avatar--more` `b-avatar--online` `b-avatar--sm` `b-avatar--square` `b-avatar--xl` `b-avatar--xs` `b-avatar-group`

```html
<span class="b-avatar b-avatar--xs">AH</span>
<span class="b-avatar b-avatar--sm">BM</span>
<span class="b-avatar">NJ</span>
<span class="b-avatar b-avatar--lg">JA</span>
<span class="b-avatar b-avatar--xl">KO</span>
<span class="b-avatar b-avatar--square">DK</span>
<span class="b-avatar b-avatar--online">FS</span>
```

```tsx
import { Avatar } from "barua-ui";

<Avatar className="b-avatar--xs">AH</Avatar>
<Avatar className="b-avatar--sm">BM</Avatar>
<Avatar>NJ</Avatar>
<Avatar className="b-avatar--lg">JA</Avatar>
<Avatar className="b-avatar--xl">KO</Avatar>
<Avatar className="b-avatar--square">DK</Avatar>
<Avatar className="b-avatar--online">FS</Avatar>
```

## Icon

.b-icon is a sized slot for any inline SVG — it inherits currentColor , so icons re-tint with their context. .b-icon-tile wraps one in the rounded accent square used across settings lists and feature grids.

- Documentation: https://ui.barua.tz/docs/content.html#icon
- Classes: `b-icon` `b-icon--lg` `b-icon--sm` `b-icon--xl` `b-icon-tile`

```html
<span class="b-icon b-icon--sm"><svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m10 3 2.1 4.4 4.9.6-3.6 3.3.9 4.7L10 13.7 5.7 16l.9-4.7L3 8l4.9-.6L10 3Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg></span>
<span class="b-icon"><svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m10 3 2.1 4.4 4.9.6-3.6 3.3.9 4.7L10 13.7 5.7 16l.9-4.7L3 8l4.9-.6L10 3Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg></span>
<span class="b-icon b-icon--lg"><svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m10 3 2.1 4.4 4.9.6-3.6 3.3.9 4.7L10 13.7 5.7 16l.9-4.7L3 8l4.9-.6L10 3Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg></span>
<span class="b-icon b-icon--xl"><svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m10 3 2.1 4.4 4.9.6-3.6 3.3.9 4.7L10 13.7 5.7 16l.9-4.7L3 8l4.9-.6L10 3Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg></span>
<span class="b-icon-tile"><svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="2.5" y="4.5" width="15" height="11" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="m4.5 7 5.5 4 5.5-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
<span class="b-icon-tile"><svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 3a4.
```

```tsx
import { Icon, IconTile } from "barua-ui";

<Icon className="b-icon--sm">
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="m10 3 2.1 4.4 4.9.6-3.6 3.3.9 4.7L10 13.7 5.7 16l.9-4.7L3 8l4.9-.6L10 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
</Icon>
<Icon>
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="m10 3 2.1 4.4 4.9.6-3.6 3.3.9 4.7L10 13.7 5.7 16l.9-4.7L3 8l4.9-.6L10 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
</Icon>
<Icon className="b-icon--lg">
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="m10 3 2.1 4.4 4.9.6-3.6 3.3.9 4.7L10 13.7 5.7 16l.9-4.7L3 8l4.9-.6L10 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
</Icon>
<Icon className="b-icon--xl">
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="m10 3 2.1 4.4 4.9.6-3.6 3.3.9 4.7L10 13.7 5.7 16l.9-4.7L3 8l4.9-.6L10 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
</Icon>
<IconTile>
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <rect x="2.5" y="4.5" width="15" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="m4.5 7 5.5 4 5.5-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
</IconTile>
<IconTile>
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"></svg>
</IconTile>
```

## Image

.b-img rounds and crops; --framed adds a soft elevation shadow. .b-figure pairs an image with a quiet caption. Gradients stand in for photography below.

- Documentation: https://ui.barua.tz/docs/content.html#image
- Classes: `b-figure` `b-img` `b-img--framed`

```html
<div class="b-img" style="width:14rem;aspect-ratio:4/3;background:linear-gradient(135deg,var(--b-color-accent),var(--b-color-indigo))"></div>
<figure class="b-figure" style="max-width: 16rem">
  <div class="b-img b-img--framed" style="aspect-ratio:16/10;background:linear-gradient(160deg,var(--b-color-teal),var(--b-color-accent))"></div>
  <figcaption>Forodhani Gardens at dusk, Zanzibar.</figcaption>
</figure>
```

```tsx
import { Figure } from "barua-ui";

<div
  className="b-img"
  style={{ width: "14rem", aspectRatio: "4/3", background: "linear-gradient(135deg,var(--b-color-accent),var(--b-color-indigo))" }}
></div>
<Figure style={{ maxWidth: "16rem" }}>
  <div
    className="b-img b-img--framed"
    style={{ aspectRatio: "16/10", background: "linear-gradient(160deg,var(--b-color-teal),var(--b-color-accent))" }}
  ></div>
  <figcaption>Forodhani Gardens at dusk, Zanzibar.</figcaption>
</Figure>
```

## Code Block

Always dark, regardless of theme. The header slot names the file and hosts a .b-code__copy button — point data-b-copy at the id of the <code> element and Barua handles the clipboard.

- Documentation: https://ui.barua.tz/docs/content.html#code-block
- Classes: `b-code` `b-code__copy` `b-code__header`

```html
<div class="b-code" style="max-width: 34rem">
            <div class="b-code__header">
              <span>install.sh</span>
              <button class="b-code__copy" data-b-copy="#code-install">Copy</button>
            </div>
            <pre><code id="code-install">npm install barua-ui
# or just link the stylesheet
&lt;link rel="stylesheet" href="css/barua.css"&gt;</code></pre>
          </div>
```

```tsx
import { CodeBlock } from "barua-ui";

<CodeBlock style={{ maxWidth: "34rem" }}>
  <div className="b-code__header">
    <span>install.sh</span>
    <button className="b-code__copy" data-b-copy="#code-install">Copy</button>
  </div>
  <pre>
    <code id="code-install">npm install barua-ui # or just link the stylesheet <link rel="stylesheet" href="css/barua.css"></code>
  </pre>
</CodeBlock>
```

## Quote

Accent-washed pull quote with an inline-start rule. Keep the <cite> inside the blockquote for attribution.

- Documentation: https://ui.barua.tz/docs/content.html#quote
- Classes: `b-quote`

```html
<blockquote class="b-quote" style="max-width: 32rem">
  <p>
    Barua turned a two-day paperwork run into an afternoon. We clear a
    full container out of Dar es Salaam before lunch now.
  </p>
  <cite>Khadija Omar — Operations lead, Mombasa</cite>
</blockquote>
```

```tsx
import { Quote } from "barua-ui";

<Quote style={{ maxWidth: "32rem" }}>
  <p>Barua turned a two-day paperwork run into an afternoon. We clear a full container out of Dar es Salaam before lunch now.</p>
  <cite>Khadija Omar — Operations lead, Mombasa</cite>
</Quote>
```

## Statistic

Big tabular-numeral values with a label and an optional delta. .is-up renders green, .is-down red — pick metrics where the direction matches the sentiment.

- Documentation: https://ui.barua.tz/docs/content.html#statistic
- Classes: `b-grid` `b-grid--3` `b-stat` `b-stat__delta` `b-stat__label` `b-stat__value`

```html
<div class="b-grid b-grid--3">
  <div class="b-stat">
    <div class="b-stat__label">Deliveries this month</div>
    <div class="b-stat__value">4,807</div>
    <span class="b-stat__delta is-up">↑ 12.4% vs July</span>
  </div>
  <div class="b-stat">
    <div class="b-stat__label">On-time rate</div>
    <div class="b-stat__value">96.2%</div>
    <span class="b-stat__delta is-up">↑ 1.1 pts</span>
  </div>
  <div class="b-stat">
    <div class="b-stat__label">Revenue (TZS)</div>
    <div class="b-stat__value">86.4M</div>
    <span class="b-stat__delta is-down">↓ 3.2% vs July</span>
  </div>
</div>
```

```tsx
import { Grid, Stat } from "barua-ui";

<Grid cols={3}>
  <Stat>
    <div className="b-stat__label">Deliveries this month</div>
    <div className="b-stat__value">4,807</div>
    <span className="b-stat__delta is-up">↑ 12.4% vs July</span>
  </Stat>
  <Stat>
    <div className="b-stat__label">On-time rate</div>
    <div className="b-stat__value">96.2%</div>
    <span className="b-stat__delta is-up">↑ 1.1 pts</span>
  </Stat>
  <Stat>
    <div className="b-stat__label">Revenue (TZS)</div>
    <div className="b-stat__value">86.4M</div>
    <span className="b-stat__delta is-down">↓ 3.2% vs July</span>
  </Stat>
</Grid>
```

## Empty State

Centered icon, headline, one supportive sentence, one action. Never leave a blank pane — tell people what belongs here and how to start.

- Documentation: https://ui.barua.tz/docs/content.html#empty-state
- Classes: `b-btn` `b-btn--primary` `b-empty` `b-empty__desc` `b-empty__icon` `b-empty__title`

```html
<div class="b-empty">
  <div class="b-empty__icon">
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M5 4.5h10l2 6.5v4.5H3V11L5 4.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M3.5 11h4l1 2h3l1-2h4" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
  </div>
  <div class="b-empty__title">No shipments yet</div>
  <p class="b-empty__desc">
    When you book a pickup or send a parcel, it appears here with live
    tracking from depot to doorstep.
  </p>
  <button class="b-btn b-btn--primary">Create shipment</button>
</div>
```

```tsx
import { Button, EmptyState } from "barua-ui";

<EmptyState>
  <div className="b-empty__icon">
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M5 4.5h10l2 6.5v4.5H3V11L5 4.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M3.5 11h4l1 2h3l1-2h4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  </div>
  <div className="b-empty__title">No shipments yet</div>
  <p className="b-empty__desc">When you book a pickup or send a parcel, it appears here with live tracking from depot to doorstep.</p>
  <Button variant="primary">Create shipment</Button>
</EmptyState>
```

## Rich Media & Text

Video and audio players live on the Media page. For rendered markdown and rich text, Barua’s base typography does the work — headings, paragraphs, inline code, quotes and lists inherit the ramp, so a .b-card__body is all a prose container needs.

- Documentation: https://ui.barua.tz/docs/content.html#rich-media-text
- Classes: `b-card` `b-card__body`

```html
<article class="b-card" style="max-width: 36rem">
  <div class="b-card__body">
    <h3>Shipping to Zanzibar</h3>
    <p>
      Parcels bound for the islands route through the
      <code>ZNZ</code> depot and cross on the afternoon ferry from Dar
      es Salaam.
    </p>
    <blockquote>
      Book before 13:00 EAT to make the same-day crossing.
    </blockquote>
    <ul>
      <li>Stone Town — same evening</li>
      <li>Nungwi and the east coast — next morning</li>
      <li>Pemba — every Tuesday and Friday</li>
    </ul>
  </div>
</article>
```

```tsx
import { Card, CardBody } from "barua-ui";

<Card style={{ maxWidth: "36rem" }}>
  <CardBody>
    <h3>Shipping to Zanzibar</h3>
    <p>
      Parcels bound for the islands route through the
      <code>ZNZ</code>
      depot and cross on the afternoon ferry from Dar es Salaam.
    </p>
    <blockquote>Book before 13:00 EAT to make the same-day crossing.</blockquote>
    <ul>
      <li>Stone Town — same evening</li>
      <li>Nungwi and the east coast — next morning</li>
      <li>Pemba — every Tuesday and Friday</li>
    </ul>
  </CardBody>
</Card>
```

