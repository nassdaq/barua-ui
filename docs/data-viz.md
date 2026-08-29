# Data visualization — CSS charts

Source: https://ui.barua.tz/docs/data-viz.html
Rules and conventions: https://ui.barua.tz/llms.txt

## Chart Anatomy

.b-chart is the frame: a titled column that stacks .b-chart__title , a .b-chart__canvas (position-relative, so gridlines and tooltips can float inside it), and a .b-legend . Axes sit beside or below the canvas. Everything below is this one recipe, swapping the middle.

- Documentation: https://ui.barua.tz/docs/data-viz.html#chart-anatomy
- Classes: `b-axis` `b-axis--y` `b-chart` `b-chart__canvas` `b-chart__title` `b-columns` `b-columns__bar` `b-gridlines` `b-legend` `b-legend__swatch`

```html
<figure class="b-chart" style="max-width: 30rem; width: 100%; margin: 0" role="img" aria-label="Column chart: messages delivered per day last week, peaking Thursday at 4,120.">
  <figcaption class="b-chart__title">Messages delivered — last 7 days</figcaption>
  <div style="display: grid; grid-template-columns: max-content 1fr; gap: var(--b-space-3)">
    <div class="b-axis b-axis--y" style="padding-block-end: 1.4rem" aria-hidden="true">
      <span>4k</span><span>2k</span><span>0</span>
    </div>
    <div class="b-chart__canvas">
      <div class="b-gridlines" style="inset-block-end: 1.4rem" aria-hidden="true"><i></i><i></i><i></i></div>
      <div class="b-columns">
        <div class="b-columns__bar" style="--v: 62%" data-label="Mon"></div>
        <div class="b-columns__bar" style="--v: 48%" data-label="Tue"></div>
        <div class="b-columns__bar" style="--v: 71%" data-label="Wed"></div>
        <div class="b-columns__bar" style="--v: 88%" data-label="Thu"></div>
        <div class="b-columns__bar" style="--v: 76%" data-label="Fri"></div>
        <div class="b-columns__bar" style="--v: 34%" data-label="Sat"></div>
        <div class="b-columns__bar" style="--v: 26%" data-label="Sun"></div>
      </div>
    </div>
  </div>
  <ul class="b-legend">
    <li><span class="b-legend__swatch"></span>Delivered</li>
  </ul>
</figure>
```

```tsx
import { Axis, Chart, Columns, GridLines, Legend } from "barua-ui";

<Chart
  style={{ maxWidth: "30rem", width: "100%", margin: "0" }}
  role="img"
  aria-label="Column chart: messages delivered per day last week, peaking Thursday at 4,120."
>
  <figcaption className="b-chart__title">Messages delivered — last 7 days</figcaption>
  <div
    style={{ display: "grid", gridTemplateColumns: "max-content 1fr", gap: "var(--b-space-3)" }}
  >
    <Axis
      className="b-axis--y"
      style={{ paddingBlockEnd: "1.4rem" }}
      aria-hidden="true"
    >
      <span>4k</span>
      <span>2k</span>
      <span>0</span>
    </Axis>
    <div className="b-chart__canvas">
      <GridLines style={{ insetBlockEnd: "1.4rem" }} aria-hidden="true">
        <i></i>
        <i></i>
        <i></i>
      </GridLines>
      <Columns>
        <div className="b-columns__bar" style={{ "--v": "62%" }} data-label="Mon"></div>
        <div className="b-columns__bar" style={{ "--v": "48%" }} data-label="Tue"></div>
        <div className="b-columns__bar" style={{ "--v": "71%" }} data-label="Wed"></div>
        <div className="b-columns__bar" style={{ "--v": "88%" }} data-label="Thu"></div>
        <div className="b-columns__bar" style={{ "--v": "76%" }} data-label="Fri"></div>
        <div className="b-columns__bar" style={{ "--v": "34%" }} data-label="Sat"></div>
        <div className="b-columns__bar" style={{ "--v": "26%" }} data-label="Sun"></div>
      </Columns>
    </div>
  </div>
  <Legend>
    <li>
      <span className="b-legend__swatch"></span>
      Delivered
    </li>
  </Legend>
</Chart>
```

## Column Chart

.b-columns lays vertical bars on a flex baseline. Each .b-columns__bar takes its height from --v (a percentage of the chart height, --b-chart-h , default 10rem) and its x-label from data-label . Recolor any bar with --b-chart-color — here Thursday's peak.

- Documentation: https://ui.barua.tz/docs/data-viz.html#column-chart
- Classes: `b-chart` `b-columns` `b-columns--rounded` `b-columns__bar` `b-legend` `b-legend__swatch`

```html
<div class="b-columns" style="max-width: 30rem; width: 100%">
  <div class="b-columns__bar" style="--v: 62%" data-label="Mon"></div>
  <div class="b-columns__bar" style="--v: 45%" data-label="Tue"></div>
  <div class="b-columns__bar" style="--v: 70%" data-label="Wed"></div>
  <div class="b-columns__bar" style="--v: 84%; --b-chart-color: var(--b-chart-4)" data-label="Thu"></div>
  <div class="b-columns__bar" style="--v: 58%" data-label="Fri"></div>
  <div class="b-columns__bar" style="--v: 32%" data-label="Sat"></div>
  <div class="b-columns__bar" style="--v: 24%" data-label="Sun"></div>
</div>
```

```tsx
import { Columns } from "barua-ui";

<Columns style={{ maxWidth: "30rem", width: "100%" }}>
  <div className="b-columns__bar" style={{ "--v": "62%" }} data-label="Mon"></div>
  <div className="b-columns__bar" style={{ "--v": "45%" }} data-label="Tue"></div>
  <div className="b-columns__bar" style={{ "--v": "70%" }} data-label="Wed"></div>
  <div
    className="b-columns__bar"
    style={{ "--v": "84%", "--b-chart-color": "var(--b-chart-4)" }}
    data-label="Thu"
  ></div>
  <div className="b-columns__bar" style={{ "--v": "58%" }} data-label="Fri"></div>
  <div className="b-columns__bar" style={{ "--v": "32%" }} data-label="Sat"></div>
  <div className="b-columns__bar" style={{ "--v": "24%" }} data-label="Sun"></div>
</Columns>
```

## Bar Chart

Horizontal bars for ranked categories with long labels. Each .b-bars__row is a three-column grid: label, track, value. Fill width comes from --v ; widen the label column with --b-bars-label-w when city names need room.

- Documentation: https://ui.barua.tz/docs/data-viz.html#bar-chart
- Classes: `b-bars` `b-bars__label` `b-bars__row` `b-bars__track` `b-bars__value`

```html
<div class="b-bars" style="max-width: 30rem; width: 100%; --b-bars-label-w: 7.5rem">
  <div class="b-bars__row">
    <span class="b-bars__label">Dar es Salaam</span>
    <div class="b-bars__track"><i style="--v: 90%"></i></div>
    <span class="b-bars__value">$120k</span>
  </div>
  <div class="b-bars__row">
    <span class="b-bars__label">Nairobi</span>
    <div class="b-bars__track"><i style="--v: 75%"></i></div>
    <span class="b-bars__value">$100k</span>
  </div>
  <div class="b-bars__row">
    <span class="b-bars__label">Kampala</span>
    <div class="b-bars__track"><i style="--v: 54%"></i></div>
    <span class="b-bars__value">$72k</span>
  </div>
  <div class="b-bars__row">
    <span class="b-bars__label">Kigali</span>
    <div class="b-bars__track"><i style="--v: 42%"></i></div>
    <span class="b-bars__value">$56k</span>
  </div>
  <div class="b-bars__row">
    <span class="b-bars__label">Zanzibar</span>
    <div class="b-bars__track"><i style="--v: 27%"></i></div>
    <span class="b-bars__value">$36k</span>
  </div>
</div>
```

```tsx
import { Bars } from "barua-ui";

<Bars
  style={{ maxWidth: "30rem", width: "100%", "--b-bars-label-w": "7.5rem" }}
>
  <div className="b-bars__row">
    <span className="b-bars__label">Dar es Salaam</span>
    <div className="b-bars__track">
      <i style={{ "--v": "90%" }}></i>
    </div>
    <span className="b-bars__value">$120k</span>
  </div>
  <div className="b-bars__row">
    <span className="b-bars__label">Nairobi</span>
    <div className="b-bars__track">
      <i style={{ "--v": "75%" }}></i>
    </div>
    <span className="b-bars__value">$100k</span>
  </div>
  <div className="b-bars__row">
    <span className="b-bars__label">Kampala</span>
    <div className="b-bars__track">
      <i style={{ "--v": "54%" }}></i>
    </div>
    <span className="b-bars__value">$72k</span>
  </div>
  <div className="b-bars__row">
    <span className="b-bars__label">Kigali</span>
    <div className="b-bars__track">
      <i style={{ "--v": "42%" }}></i>
    </div>
    <span className="b-bars__value">$56k</span>
  </div>
  <div className="b-bars__row">
    <span className="b-bars__label">Zanzibar</span>
    <div className="b-bars__track">
      <i style={{ "--v": "27%" }}></i>
    </div>
    <span className="b-bars__value">$36k</span>
  </div>
</Bars>
```

## Line Chart

Lines are plain inline SVG — you own the coordinates, the stylesheet owns the look. Give the polyline path class="b-series" inside an svg.b-line-svg ; add dashed .b-svg-grid lines and .b-svg-axis-label texts. The stroke stays 2px at any size thanks to vector-effect: non-scaling-stroke .

- Documentation: https://ui.barua.tz/docs/data-viz.html#line-chart
- Classes: `b-chart` `b-chart__title` `b-line-svg` `b-series` `b-svg-axis-label` `b-svg-grid`

```html
<div class="b-chart" style="max-width: 30rem; width: 100%">
  <div class="b-chart__title">New subscribers — six months</div>
  <svg class="b-line-svg" viewBox="0 0 300 120" role="img" aria-label="Line chart: new subscribers rising from about 1,200 in March to 4,800 in August, with a dip in May.">
    <line class="b-svg-grid" x1="0" y1="10" x2="300" y2="10"/>
    <line class="b-svg-grid" x1="0" y1="50" x2="300" y2="50"/>
    <line class="b-svg-grid" x1="0" y1="90" x2="300" y2="90"/>
    <path class="b-series" d="M10 84 L66 66 L122 72 L178 40 L234 48 L290 14"/>
    <text class="b-svg-axis-label" x="10" y="112" text-anchor="middle">Mar</text>
    <text class="b-svg-axis-label" x="66" y="112" text-anchor="middle">Apr</text>
    <text class="b-svg-axis-label" x="122" y="112" text-anchor="middle">May</text>
    <text class="b-svg-axis-label" x="178" y="112" text-anchor="middle">Jun</text>
    <text class="b-svg-axis-label" x="234" y="112" text-anchor="middle">Jul</text>
    <text class="b-svg-axis-label" x="290" y="112" text-anchor="middle">Aug</text>
  </svg>
</div>
```

```tsx
import { Chart, LineChart } from "barua-ui";

<Chart style={{ maxWidth: "30rem", width: "100%" }}>
  <div className="b-chart__title">New subscribers — six months</div>
  <LineChart
    viewBox="0 0 300 120"
    role="img"
    aria-label="Line chart: new subscribers rising from about 1,200 in March to 4,800 in August, with a dip in May."
  >
    <line className="b-svg-grid" x1="0" y1="10" x2="300" y2="10" />
    <line className="b-svg-grid" x1="0" y1="50" x2="300" y2="50" />
    <line className="b-svg-grid" x1="0" y1="90" x2="300" y2="90" />
    <path className="b-series" d="M10 84 L66 66 L122 72 L178 40 L234 48 L290 14" />
    <text className="b-svg-axis-label" x="10" y="112" textAnchor="middle">Mar</text>
    <text className="b-svg-axis-label" x="66" y="112" textAnchor="middle">Apr</text>
    <text className="b-svg-axis-label" x="122" y="112" textAnchor="middle">May</text>
    <text className="b-svg-axis-label" x="178" y="112" textAnchor="middle">Jun</text>
    <text className="b-svg-axis-label" x="234" y="112" textAnchor="middle">Jul</text>
    <text className="b-svg-axis-label" x="290" y="112" textAnchor="middle">Aug</text>
  </LineChart>
</Chart>
```

## Area Chart

An svg.b-area-svg with two paths: a closed .b-area-fill underneath (same points, dropped to the baseline) and the .b-series stroke on top. The fill is an 18% tint of the series color, so one --b-chart-color on the <svg> retints both.

- Documentation: https://ui.barua.tz/docs/data-viz.html#area-chart
- Classes: `b-area-fill` `b-area-svg` `b-chart` `b-chart__title` `b-series` `b-svg-axis-label` `b-svg-grid`

```html
<div class="b-chart" style="max-width: 30rem; width: 100%">
  <div class="b-chart__title">Weekly active readers</div>
  <svg class="b-area-svg" viewBox="0 0 300 120" style="--b-chart-color: var(--b-chart-2)" role="img" aria-label="Area chart: weekly active readers growing from 3,100 in March to 7,400 in August.">
    <line class="b-svg-grid" x1="0" y1="10" x2="300" y2="10"/>
    <line class="b-svg-grid" x1="0" y1="50" x2="300" y2="50"/>
    <line class="b-svg-grid" x1="0" y1="90" x2="300" y2="90"/>
    <path class="b-area-fill" d="M10 78 L66 62 L122 68 L178 36 L234 44 L290 16 L290 90 L10 90 Z"/>
    <path class="b-series" d="M10 78 L66 62 L122 68 L178 36 L234 44 L290 16"/>
    <text class="b-svg-axis-label" x="10" y="112" text-anchor="middle">Mar</text>
    <text class="b-svg-axis-label" x="122" y="112" text-anchor="middle">May</text>
    <text class="b-svg-axis-label" x="234" y="112" text-anchor="middle">Jul</text>
  </svg>
</div>
```

```tsx
import { AreaChart, Chart } from "barua-ui";

<Chart style={{ maxWidth: "30rem", width: "100%" }}>
  <div className="b-chart__title">Weekly active readers</div>
  <AreaChart
    viewBox="0 0 300 120"
    style={{ "--b-chart-color": "var(--b-chart-2)" }}
    role="img"
    aria-label="Area chart: weekly active readers growing from 3,100 in March to 7,400 in August."
  >
    <line className="b-svg-grid" x1="0" y1="10" x2="300" y2="10" />
    <line className="b-svg-grid" x1="0" y1="50" x2="300" y2="50" />
    <line className="b-svg-grid" x1="0" y1="90" x2="300" y2="90" />
    <path className="b-area-fill" d="M10 78 L66 62 L122 68 L178 36 L234 44 L290 16 L290 90 L10 90 Z" />
    <path className="b-series" d="M10 78 L66 62 L122 68 L178 36 L234 44 L290 16" />
    <text className="b-svg-axis-label" x="10" y="112" textAnchor="middle">Mar</text>
    <text className="b-svg-axis-label" x="122" y="112" textAnchor="middle">May</text>
    <text className="b-svg-axis-label" x="234" y="112" textAnchor="middle">Jul</text>
  </AreaChart>
</Chart>
```

## Pie Chart

A single div and a conic-gradient . Pass color stops through --b-pie as color start end triplets covering 0–100%; size it with --b-pie-size (default 9rem). Always pair with a legend — the wedges carry no text of their own.

- Documentation: https://ui.barua.tz/docs/data-viz.html#pie-chart
- Classes: `b-legend` `b-legend__swatch` `b-pie`

```html
<div class="b-pie" style="--b-pie: var(--b-chart-1) 0 45%, var(--b-chart-2) 45% 78%, var(--b-chart-3) 78% 100%" role="img" aria-label="Pie chart: mobile 45%, desktop 33%, tablet 22%."></div>
<ul class="b-legend" style="flex-direction: column">
  <li><span class="b-legend__swatch"></span>Mobile · 45%</li>
  <li><span class="b-legend__swatch" style="background: var(--b-chart-2)"></span>Desktop · 33%</li>
  <li><span class="b-legend__swatch" style="background: var(--b-chart-3)"></span>Tablet · 22%</li>
</ul>
```

```tsx
import { Legend } from "barua-ui";

<div
  className="b-pie"
  style={{ "--b-pie": "var(--b-chart-1) 0 45%, var(--b-chart-2) 45% 78%, var(--b-chart-3) 78% 100%" }}
  role="img"
  aria-label="Pie chart: mobile 45%, desktop 33%, tablet 22%."
></div>
<Legend style={{ flexDirection: "column" }}>
  <li>
    <span className="b-legend__swatch"></span>
    Mobile · 45%
  </li>
  <li>
    <span
      className="b-legend__swatch"
      style={{ background: "var(--b-chart-2)" }}
    ></span>
    Desktop · 33%
  </li>
  <li>
    <span
      className="b-legend__swatch"
      style={{ background: "var(--b-chart-3)" }}
    ></span>
    Tablet · 22%
  </li>
</Legend>
```

## Donut Chart

Wrap a .b-pie in .b-donut : a radial mask punches the hole and .b-donut__center stacks on the same grid cell for a headline stat. The hole radius is --b-donut-hole , default 62% — raise it for a thinner ring.

- Documentation: https://ui.barua.tz/docs/data-viz.html#donut-chart
- Classes: `b-donut` `b-donut__center` `b-legend` `b-legend__swatch` `b-pie` `b-stat__label` `b-stat__value`

```html
<div class="b-donut">
  <div class="b-pie" style="--b-pie: var(--b-chart-1) 0 52%, var(--b-chart-4) 52% 81%, var(--b-chart-6) 81% 100%" role="img" aria-label="Donut chart of 18,200 sends: newsletter 52%, product updates 29%, digests 19%."></div>
  <div class="b-donut__center">
    <div class="b-stat__value">18.2k</div>
    <div class="b-stat__label">sends</div>
  </div>
</div>
<ul class="b-legend" style="flex-direction: column">
  <li><span class="b-legend__swatch"></span>Newsletter · 52%</li>
  <li><span class="b-legend__swatch" style="background: var(--b-chart-4)"></span>Product updates · 29%</li>
  <li><span class="b-legend__swatch" style="background: var(--b-chart-6)"></span>Digests · 19%</li>
</ul>
```

```tsx
import { Donut, Legend } from "barua-ui";

<Donut>
  <div
    className="b-pie"
    style={{ "--b-pie": "var(--b-chart-1) 0 52%, var(--b-chart-4) 52% 81%, var(--b-chart-6) 81% 100%" }}
    role="img"
    aria-label="Donut chart of 18,200 sends: newsletter 52%, product updates 29%, digests 19%."
  ></div>
  <div className="b-donut__center">
    <div className="b-stat__value">18.2k</div>
    <div className="b-stat__label">sends</div>
  </div>
</Donut>
<Legend style={{ flexDirection: "column" }}>
  <li>
    <span className="b-legend__swatch"></span>
    Newsletter · 52%
  </li>
  <li>
    <span
      className="b-legend__swatch"
      style={{ background: "var(--b-chart-4)" }}
    ></span>
    Product updates · 29%
  </li>
  <li>
    <span
      className="b-legend__swatch"
      style={{ background: "var(--b-chart-6)" }}
    ></span>
    Digests · 19%
  </li>
</Legend>
```

## Scatter Plot

An svg.b-scatter-svg full of circle.b-dot elements — you supply cx , cy and r . Dots default to --b-chart-1 ; put --b-chart-color on individual circles for a second series. Session length against pages read, mobile vs desktop:

- Documentation: https://ui.barua.tz/docs/data-viz.html#scatter-plot
- Classes: `b-chart` `b-chart__title` `b-dot` `b-legend` `b-legend__swatch` `b-scatter-svg` `b-svg-axis-label` `b-svg-grid`

```html
<div class="b-chart" style="max-width: 30rem; width: 100%">
  <div class="b-chart__title">Session length vs pages read</div>
  <svg class="b-scatter-svg" viewBox="0 0 300 140" role="img" aria-label="Scatter plot: desktop sessions read more pages than mobile at every session length.">
    <line class="b-svg-grid" x1="0" y1="20" x2="300" y2="20"/>
    <line class="b-svg-grid" x1="0" y1="70" x2="300" y2="70"/>
    <line class="b-svg-grid" x1="0" y1="120" x2="300" y2="120"/>
    <circle class="b-dot" cx="30" cy="110" r="4"/>
    <circle class="b-dot" cx="55" cy="96" r="4"/>
    <circle class="b-dot" cx="80" cy="100" r="4"/>
    <circle class="b-dot" cx="110" cy="78" r="4"/>
    <circle class="b-dot" cx="140" cy="84" r="4"/>
    <circle class="b-dot" cx="170" cy="62" r="4"/>
    <circle class="b-dot" cx="60" cy="72" r="4" style="--b-chart-color: var(--b-chart-4)"/>
    <circle class="b-dot" cx="95" cy="56" r="4" style="--b-chart-color: var(--b-chart-4)"/>
    <circle class="b-dot" cx="130" cy="46" r="4" style="--b-chart-color: var(--b-chart-4)"/>
    <circle class="b-dot" cx="180" cy="34" r="4" style="--b-chart-color: var(--b-chart-4)"/>
    <circle class="b-dot" cx="220" cy="40" r="4" style="--b-chart-color: var(--b-chart-4)"/>
    <circle class="b-dot" cx="260" cy="22" r="4" style="--b-chart-color: var(--b-chart-4)"/>
    <text class="b-svg-axis-label" x="0" y="136">0 min</text>
 
```

```tsx
import { Chart, ScatterChart } from "barua-ui";

<Chart style={{ maxWidth: "30rem", width: "100%" }}>
  <div className="b-chart__title">Session length vs pages read</div>
  <ScatterChart
    viewBox="0 0 300 140"
    role="img"
    aria-label="Scatter plot: desktop sessions read more pages than mobile at every session length."
  >
    <line className="b-svg-grid" x1="0" y1="20" x2="300" y2="20" />
    <line className="b-svg-grid" x1="0" y1="70" x2="300" y2="70" />
    <line className="b-svg-grid" x1="0" y1="120" x2="300" y2="120" />
    <circle className="b-dot" cx="30" cy="110" r="4" />
    <circle className="b-dot" cx="55" cy="96" r="4" />
    <circle className="b-dot" cx="80" cy="100" r="4" />
    <circle className="b-dot" cx="110" cy="78" r="4" />
    <circle className="b-dot" cx="140" cy="84" r="4" />
    <circle className="b-dot" cx="170" cy="62" r="4" />
    <circle className="b-dot" cx="60" cy="72" r="4" style={{ "--b-chart-color": "var(--b-chart-4)" }} />
    <circle className="b-dot" cx="95" cy="56" r="4" style={{ "--b-chart-color": "var(--b-chart-4)" }} />
    <circle className="b-dot" cx="130" cy="46" r="4" style={{ "--b-chart-color": "var(--b-chart-4)" }} />
    <circle className="b-dot" cx="180" cy="34" r="4" style={{ "--b-chart-color": "var(--b-chart-4)" }} />
    <circle className="b-dot" cx="220" cy="40" r="4" style={{ "--b-chart-color": "var(--b-chart-4)" }} />
    <circle className="b-dot" cx="260" cy="22" r="4" style={{ "--b-chart-color": "var(--b-chart-4)" }} />
    <text className="b-svg-axis-label" x="0" y="136">0 min</text>
  </ScatterChart>
</Chart>
```

## Radar Chart

Concentric polygon.b-web rings and line.b-web spokes form the web; the filled polygon.b-series plots the values. Five axes on a 200×200 viewBox, center (100,100), outer radius 80.

- Documentation: https://ui.barua.tz/docs/data-viz.html#radar-chart
- Classes: `b-radar-svg` `b-series` `b-svg-axis-label` `b-web`

```html
<svg class="b-radar-svg" viewBox="0 0 200 200" role="img" aria-label="Radar chart of team coverage: design 90%, code 75%, data 60%, ops 80%, docs 70%.">
  <polygon class="b-web" points="100,20 176,75 147,165 53,165 24,75"/>
  <polygon class="b-web" points="100,60 138,88 124,132 76,132 62,88"/>
  <line class="b-web" x1="100" y1="100" x2="100" y2="20"/>
  <line class="b-web" x1="100" y1="100" x2="176" y2="75"/>
  <line class="b-web" x1="100" y1="100" x2="147" y2="165"/>
  <line class="b-web" x1="100" y1="100" x2="53" y2="165"/>
  <line class="b-web" x1="100" y1="100" x2="24" y2="75"/>
  <polygon class="b-series" points="100,28 157,81 128,139 62,152 47,83"/>
  <text class="b-svg-axis-label" x="100" y="12" text-anchor="middle">Design</text>
  <text class="b-svg-axis-label" x="182" y="72" text-anchor="start">Code</text>
  <text class="b-svg-axis-label" x="152" y="180" text-anchor="middle">Data</text>
  <text class="b-svg-axis-label" x="48" y="180" text-anchor="middle">Ops</text>
  <text class="b-svg-axis-label" x="18" y="72" text-anchor="end">Docs</text>
</svg>
```

```tsx
import { RadarChart, Web } from "barua-ui";

<RadarChart
  viewBox="0 0 200 200"
  role="img"
  aria-label="Radar chart of team coverage: design 90%, code 75%, data 60%, ops 80%, docs 70%."
>
  <Web points="100,20 176,75 147,165 53,165 24,75" />
  <Web points="100,60 138,88 124,132 76,132 62,88" />
  <Web x1="100" y1="100" x2="100" y2="20" />
  <Web x1="100" y1="100" x2="176" y2="75" />
  <Web x1="100" y1="100" x2="147" y2="165" />
  <Web x1="100" y1="100" x2="53" y2="165" />
  <Web x1="100" y1="100" x2="24" y2="75" />
  <polygon className="b-series" points="100,28 157,81 128,139 62,152 47,83" />
  <text className="b-svg-axis-label" x="100" y="12" textAnchor="middle">Design</text>
  <text className="b-svg-axis-label" x="182" y="72" textAnchor="start">Code</text>
  <text className="b-svg-axis-label" x="152" y="180" textAnchor="middle">Data</text>
  <text className="b-svg-axis-label" x="48" y="180" textAnchor="middle">Ops</text>
  <text className="b-svg-axis-label" x="18" y="72" textAnchor="end">Docs</text>
</RadarChart>
```

## Heatmap

A CSS grid of <i> cells. Column count comes from --b-heatmap-cols ; each cell's --v is an intensity from 0 to 1, mixed into the series color with color-mix() — 0 renders the empty fill, 1 the full --b-chart-color . Twelve months of commits, one row per week of the month:

- Documentation: https://ui.barua.tz/docs/data-viz.html#heatmap
- Classes: `b-axis` `b-chart` `b-heatmap`

```html
<div class="b-chart" style="max-width: 26rem; width: 100%">
  <div class="b-heatmap" style="--b-heatmap-cols: 12">
    <i style="--v: 0.1"></i><i style="--v: 0.2"></i><i style="--v: 0.1"></i><i style="--v: 0.3"></i><i style="--v: 0.4"></i><i style="--v: 0.5"></i><i style="--v: 0.7"></i><i style="--v: 0.8"></i><i style="--v: 0.6"></i><i style="--v: 0.4"></i><i style="--v: 0.2"></i><i style="--v: 0.1"></i>
    <i style="--v: 0.2"></i><i style="--v: 0.1"></i><i style="--v: 0.3"></i><i style="--v: 0.4"></i><i style="--v: 0.6"></i><i style="--v: 0.7"></i><i style="--v: 0.9"></i><i style="--v: 1"></i><i style="--v: 0.7"></i><i style="--v: 0.5"></i><i style="--v: 0.3"></i><i style="--v: 0.1"></i>
    <i style="--v: 0"></i><i style="--v: 0.2"></i><i style="--v: 0.2"></i><i style="--v: 0.5"></i><i style="--v: 0.5"></i><i style="--v: 0.8"></i><i style="--v: 0.8"></i><i style="--v: 0.9"></i><i style="--v: 0.6"></i><i style="--v: 0.4"></i><i style="--v: 0.2"></i><i style="--v: 0"></i>
    <i style="--v: 0.1"></i><i style="--v: 0.3"></i><i style="--v: 0.4"></i><i style="--v: 0.4"></i><i style="--v: 0.7"></i><i style="--v: 0.6"></i><i style="--v: 1"></i><i style="--v: 0.8"></i><i style="--v: 0.5"></i><i style="--v: 0.3"></i><i style="--v: 0.1"></i><i style="--v: 0.2"></i>
  </div>
  <div class="b-axis">
    <span>Jan</span><span>Jun</span><span>Dec</span>
  </div>
</div>
```

```tsx
import { Axis, Chart, Heatmap } from "barua-ui";

<Chart style={{ maxWidth: "26rem", width: "100%" }}>
  <Heatmap style={{ "--b-heatmap-cols": "12" }}>
    <i style={{ "--v": "0.1" }}></i>
    <i style={{ "--v": "0.2" }}></i>
    <i style={{ "--v": "0.1" }}></i>
    <i style={{ "--v": "0.3" }}></i>
    <i style={{ "--v": "0.4" }}></i>
    <i style={{ "--v": "0.5" }}></i>
    <i style={{ "--v": "0.7" }}></i>
    <i style={{ "--v": "0.8" }}></i>
    <i style={{ "--v": "0.6" }}></i>
    <i style={{ "--v": "0.4" }}></i>
    <i style={{ "--v": "0.2" }}></i>
    <i style={{ "--v": "0.1" }}></i>
    <i style={{ "--v": "0.2" }}></i>
    <i style={{ "--v": "0.1" }}></i>
    <i style={{ "--v": "0.3" }}></i>
    <i style={{ "--v": "0.4" }}></i>
    <i style={{ "--v": "0.6" }}></i>
    <i style={{ "--v": "0.7" }}></i>
    <i style={{ "--v": "0.9" }}></i>
    <i style={{ "--v": "1" }}></i>
    <i style={{ "--v": "0.7" }}></i>
    <i style={{ "--v": "0.5" }}></i>
    <i style={{ "--v": "0.3" }}></i>
    <i style={{ "--v": "0.1" }}></i>
    <i style={{ "--v": "0" }}></i>
    <i style={{ "--v": "0.2" }}></i>
    <i style={{ "--v": "0.2" }}></i>
    <i style={{ "--v": "0.5" }}></i>
    <i style={{ "--v": "0.5" }}></i>
    <i style={{ "--v": "0.8" }}></i>
    <i style={{ "--v": "0.8" }}></i>
    <i style={{ "--v": "0.9" }}></i>
    <i style={{ "--v": "0.6" }}></i>
    <i style={{ "--v": "0.4" }}></i>
    <i style={{ "--v": "0.2" }}></i>
    <i style={{ "--v": "0" }}></i>
    <i style={{ "--v": "0.1" }}></i>
    <i style={{ "--v": "0.3" }}></i>
    <i style={{ "--v": "0.4" }}></i>
    <i style={{ "--v": "0.4" }}></i>
    <i style={{ "--v": "0.7" }}></i>
    <i style={{ "--v": "0.6" }}></i>
    <i style={{ "--v": "1" }}></i>
    <i style={{ "--v": "0.8" }}></i>
    <i style={{ "--v": "0.5" }}></i>
    <i style={{ "--v": "0.3" }}></i>
    <i style={{ "--v": "0.1" }}></i>
    <i style={{ "--v": "0.2" }}></i>
  </Heatmap>
  <Axis>
    <span>Jan</span>
    <span>Jun</span>
    <span>Dec</span>
  </Axis>
</Chart>
```

## Gauge

A half-donut for a single 0–100 reading. Set --b-progress as a unitless number (here 68 — note the linear progress bar takes a percentage instead), size with --b-gauge-size , and recolor with --b-chart-color . The label hangs below the arc, so leave it some room.

- Documentation: https://ui.barua.tz/docs/data-viz.html#gauge
- Classes: `b-gauge` `b-gauge__label` `b-gauge__value`

```html
<div class="b-gauge" style="--b-progress: 68" role="img" aria-label="Gauge: storage 68% used.">
  <div class="b-gauge__value">68%</div>
  <div class="b-gauge__label">Storage used</div>
</div>
```

```tsx
import { Gauge } from "barua-ui";

<Gauge
  style={{ "--b-progress": "68" }}
  role="img"
  aria-label="Gauge: storage 68% used."
>
  <div className="b-gauge__value">68%</div>
  <div className="b-gauge__label">Storage used</div>
</Gauge>
```

## Sparkline

A word-sized trend for stat cards and table cells: svg.b-sparkline stretches its single path across a 2rem-tall box ( preserveAspectRatio="none" lets it fill; the stroke never distorts). Purely decorative — keep it aria-hidden and let the stat carry the numbers.

- Documentation: https://ui.barua.tz/docs/data-viz.html#sparkline
- Classes: `b-card` `b-card__body` `b-sparkline` `b-stat` `b-stat__delta` `b-stat__label` `b-stat__value`

```html
<div class="b-card" style="width: 100%; max-width: 14rem">
  <div class="b-card__body">
    <div class="b-stat">
      <span class="b-stat__label">Messages sent</span>
      <span class="b-stat__value">12,480</span>
      <span class="b-stat__delta is-up">↑ 8.2% this week</span>
      <svg class="b-sparkline" viewBox="0 0 100 24" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 18 L12 15 L24 16 L36 11 L48 13 L60 8 L72 10 L84 5 L100 3"/>
      </svg>
    </div>
  </div>
</div>
<div class="b-card" style="width: 100%; max-width: 14rem">
  <div class="b-card__body">
    <div class="b-stat">
      <span class="b-stat__label">Open rate</span>
      <span class="b-stat__value">38.4%</span>
      <span class="b-stat__delta is-down">↓ 2.1 pts this week</span>
      <svg class="b-sparkline" viewBox="0 0 100 24" preserveAspectRatio="none" aria-hidden="true" style="--b-chart-color: var(--b-chart-4)">
        <path d="M0 5 L12 8 L24 6 L36 11 L48 9 L60 14 L72 12 L84 17 L100 19"/>
      </svg>
    </div>
  </div>
</div>
```

```tsx
import { Card, CardBody, Sparkline, Stat } from "barua-ui";

<Card style={{ width: "100%", maxWidth: "14rem" }}>
  <CardBody>
    <Stat>
      <span className="b-stat__label">Messages sent</span>
      <span className="b-stat__value">12,480</span>
      <span className="b-stat__delta is-up">↑ 8.2% this week</span>
      <Sparkline viewBox="0 0 100 24" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 18 L12 15 L24 16 L36 11 L48 13 L60 8 L72 10 L84 5 L100 3" />
      </Sparkline>
    </Stat>
  </CardBody>
</Card>
<Card style={{ width: "100%", maxWidth: "14rem" }}>
  <CardBody>
    <Stat>
      <span className="b-stat__label">Open rate</span>
      <span className="b-stat__value">38.4%</span>
      <span className="b-stat__delta is-down">↓ 2.1 pts this week</span>
      <Sparkline
        viewBox="0 0 100 24"
        preserveAspectRatio="none"
        aria-hidden="true"
        style={{ "--b-chart-color": "var(--b-chart-4)" }}
      >
        <path d="M0 5 L12 8 L24 6 L36 11 L48 9 L60 14 L72 12 L84 17 L100 19" />
      </Sparkline>
    </Stat>
  </CardBody>
</Card>
```

## Progress Chart

Stacked .b-progress-chart__row s, each a __head (label left, value right) over a standard .b-progress bar from Feedback . Here --b-progress is a width percentage on the fill — 96% , unit included.

- Documentation: https://ui.barua.tz/docs/data-viz.html#progress-chart
- Classes: `b-progress` `b-progress-chart` `b-progress-chart__head` `b-progress-chart__row` `b-progress__fill`

```html
<div class="b-progress-chart" style="max-width: 24rem; width: 100%">
  <div class="b-progress-chart__row">
    <div class="b-progress-chart__head"><span>Newsletter</span><span>96%</span></div>
    <div class="b-progress"><div class="b-progress__fill" style="--b-progress: 96%"></div></div>
  </div>
  <div class="b-progress-chart__row">
    <div class="b-progress-chart__head"><span>Product updates</span><span>88%</span></div>
    <div class="b-progress"><div class="b-progress__fill" style="--b-progress: 88%"></div></div>
  </div>
  <div class="b-progress-chart__row">
    <div class="b-progress-chart__head"><span>Onboarding series</span><span>72%</span></div>
    <div class="b-progress"><div class="b-progress__fill" style="--b-progress: 72%"></div></div>
  </div>
  <div class="b-progress-chart__row">
    <div class="b-progress-chart__head"><span>Win-back</span><span>41%</span></div>
    <div class="b-progress"><div class="b-progress__fill" style="--b-progress: 41%"></div></div>
  </div>
</div>
```

```tsx
import { Progress } from "barua-ui";

<div
  className="b-progress-chart"
  style={{ maxWidth: "24rem", width: "100%" }}
>
  <div className="b-progress-chart__row">
    <div className="b-progress-chart__head">
      <span>Newsletter</span>
      <span>96%</span>
    </div>
    <Progress>
      <div className="b-progress__fill" style={{ "--b-progress": "96%" }}></div>
    </Progress>
  </div>
  <div className="b-progress-chart__row">
    <div className="b-progress-chart__head">
      <span>Product updates</span>
      <span>88%</span>
    </div>
    <Progress>
      <div className="b-progress__fill" style={{ "--b-progress": "88%" }}></div>
    </Progress>
  </div>
  <div className="b-progress-chart__row">
    <div className="b-progress-chart__head">
      <span>Onboarding series</span>
      <span>72%</span>
    </div>
    <Progress>
      <div className="b-progress__fill" style={{ "--b-progress": "72%" }}></div>
    </Progress>
  </div>
  <div className="b-progress-chart__row">
    <div className="b-progress-chart__head">
      <span>Win-back</span>
      <span>41%</span>
    </div>
    <Progress>
      <div className="b-progress__fill" style={{ "--b-progress": "41%" }}></div>
    </Progress>
  </div>
</div>
```

## Legend

A wrapping ul.b-legend of swatch + label pairs. The .b-legend__swatch defaults to --b-chart-1 ; set the others inline. The six series tokens resolve to accent blue, teal, purple, orange, pink and green — and re-tune automatically in dark mode.

- Documentation: https://ui.barua.tz/docs/data-viz.html#legend
- Classes: `b-legend` `b-legend__swatch`

```html
<ul class="b-legend">
  <li><span class="b-legend__swatch"></span>Email</li>
  <li><span class="b-legend__swatch" style="background: var(--b-chart-2)"></span>Push</li>
  <li><span class="b-legend__swatch" style="background: var(--b-chart-3)"></span>In-app</li>
  <li><span class="b-legend__swatch" style="background: var(--b-chart-4)"></span>SMS</li>
  <li><span class="b-legend__swatch" style="background: var(--b-chart-5)"></span>Social</li>
  <li><span class="b-legend__swatch" style="background: var(--b-chart-6)"></span>Webhooks</li>
</ul>
```

```tsx
import { Legend } from "barua-ui";

<Legend>
  <li>
    <span className="b-legend__swatch"></span>
    Email
  </li>
  <li>
    <span
      className="b-legend__swatch"
      style={{ background: "var(--b-chart-2)" }}
    ></span>
    Push
  </li>
  <li>
    <span
      className="b-legend__swatch"
      style={{ background: "var(--b-chart-3)" }}
    ></span>
    In-app
  </li>
  <li>
    <span
      className="b-legend__swatch"
      style={{ background: "var(--b-chart-4)" }}
    ></span>
    SMS
  </li>
  <li>
    <span
      className="b-legend__swatch"
      style={{ background: "var(--b-chart-5)" }}
    ></span>
    Social
  </li>
  <li>
    <span
      className="b-legend__swatch"
      style={{ background: "var(--b-chart-6)" }}
    ></span>
    Webhooks
  </li>
</Legend>
```

## Axis & Gridlines

.b-axis spreads tick labels across a row in tabular figures; .b-axis--y stacks them beside a canvas. .b-gridlines floats dashed rules through a position-relative canvas — one <i> per line. Columns reserve a 1.4rem label strip at the bottom, so give the gridlines inset-block-end: 1.4rem and the y-axis the same bottom padding to keep “0” on the baseline.

- Documentation: https://ui.barua.tz/docs/data-viz.html#axis-gridlines
- Classes: `b-axis` `b-axis--y` `b-chart` `b-chart__canvas` `b-columns` `b-columns__bar` `b-gridlines`

```html
<div class="b-chart" style="max-width: 30rem; width: 100%">
  <div style="display: grid; grid-template-columns: max-content 1fr; gap: var(--b-space-3)">
    <div class="b-axis b-axis--y" style="padding-block-end: 1.4rem" aria-hidden="true">
      <span>600</span><span>300</span><span>0</span>
    </div>
    <div class="b-chart__canvas">
      <div class="b-gridlines" style="inset-block-end: 1.4rem" aria-hidden="true"><i></i><i></i><i></i></div>
      <div class="b-columns">
        <div class="b-columns__bar" style="--v: 55%" data-label="Mon"></div>
        <div class="b-columns__bar" style="--v: 40%" data-label="Tue"></div>
        <div class="b-columns__bar" style="--v: 70%" data-label="Wed"></div>
        <div class="b-columns__bar" style="--v: 85%" data-label="Thu"></div>
        <div class="b-columns__bar" style="--v: 65%" data-label="Fri"></div>
        <div class="b-columns__bar" style="--v: 30%" data-label="Sat"></div>
        <div class="b-columns__bar" style="--v: 20%" data-label="Sun"></div>
      </div>
    </div>
  </div>
</div>
```

```tsx
import { Axis, Chart, Columns, GridLines } from "barua-ui";

<Chart style={{ maxWidth: "30rem", width: "100%" }}>
  <div
    style={{ display: "grid", gridTemplateColumns: "max-content 1fr", gap: "var(--b-space-3)" }}
  >
    <Axis
      className="b-axis--y"
      style={{ paddingBlockEnd: "1.4rem" }}
      aria-hidden="true"
    >
      <span>600</span>
      <span>300</span>
      <span>0</span>
    </Axis>
    <div className="b-chart__canvas">
      <GridLines style={{ insetBlockEnd: "1.4rem" }} aria-hidden="true">
        <i></i>
        <i></i>
        <i></i>
      </GridLines>
      <Columns>
        <div className="b-columns__bar" style={{ "--v": "55%" }} data-label="Mon"></div>
        <div className="b-columns__bar" style={{ "--v": "40%" }} data-label="Tue"></div>
        <div className="b-columns__bar" style={{ "--v": "70%" }} data-label="Wed"></div>
        <div className="b-columns__bar" style={{ "--v": "85%" }} data-label="Thu"></div>
        <div className="b-columns__bar" style={{ "--v": "65%" }} data-label="Fri"></div>
        <div className="b-columns__bar" style={{ "--v": "30%" }} data-label="Sat"></div>
        <div className="b-columns__bar" style={{ "--v": "20%" }} data-label="Sun"></div>
      </Columns>
    </div>
  </div>
</Chart>
```

## Chart Tooltip

.b-chart-tip is a floating value bubble for the nearest data point: absolutely positioned inside the relative .b-chart__canvas , self-centered above its anchor via translate , with a small caret. Barua ships the look only — tracking the pointer, picking the point and setting left / top is app-side JavaScript. Shown pinned over Thursday:

- Documentation: https://ui.barua.tz/docs/data-viz.html#chart-tooltip
- Classes: `b-chart` `b-chart-tip` `b-chart__canvas` `b-columns` `b-columns__bar`

```html
<div class="b-chart" style="max-width: 30rem; width: 100%">
  <div class="b-chart__canvas">
    <div class="b-chart-tip" style="left: 50%; top: 14%">Thu · 4,120</div>
    <div class="b-columns">
      <div class="b-columns__bar" style="--v: 62%" data-label="Mon"></div>
      <div class="b-columns__bar" style="--v: 45%" data-label="Tue"></div>
      <div class="b-columns__bar" style="--v: 70%" data-label="Wed"></div>
      <div class="b-columns__bar" style="--v: 84%" data-label="Thu"></div>
      <div class="b-columns__bar" style="--v: 58%" data-label="Fri"></div>
      <div class="b-columns__bar" style="--v: 32%" data-label="Sat"></div>
      <div class="b-columns__bar" style="--v: 24%" data-label="Sun"></div>
    </div>
  </div>
</div>
```

```tsx
import { Chart, ChartTip, Columns } from "barua-ui";

<Chart style={{ maxWidth: "30rem", width: "100%" }}>
  <div className="b-chart__canvas">
    <ChartTip style={{ left: "50%", top: "14%" }}>Thu · 4,120</ChartTip>
    <Columns>
      <div className="b-columns__bar" style={{ "--v": "62%" }} data-label="Mon"></div>
      <div className="b-columns__bar" style={{ "--v": "45%" }} data-label="Tue"></div>
      <div className="b-columns__bar" style={{ "--v": "70%" }} data-label="Wed"></div>
      <div className="b-columns__bar" style={{ "--v": "84%" }} data-label="Thu"></div>
      <div className="b-columns__bar" style={{ "--v": "58%" }} data-label="Fri"></div>
      <div className="b-columns__bar" style={{ "--v": "32%" }} data-label="Sat"></div>
      <div className="b-columns__bar" style={{ "--v": "24%" }} data-label="Sun"></div>
    </Columns>
  </div>
</Chart>
```

## Rule Mark

Swift Charts' RuleMark : a dashed goal or threshold line laid over any chart canvas. Position with bottom as a percentage of the scale; --accent recolors it for targets rather than limits.

- Documentation: https://ui.barua.tz/docs/data-viz.html#rule-mark
- Classes: `b-columns` `b-columns__bar` `b-rule` `b-rule__label`

```html
<div class="b-columns" style="--b-chart-h: 9rem; max-width: 26rem; position: relative">
  <div class="b-rule" style="bottom: calc(1.4rem + (9rem - 1.4rem) * 0.7)"><span class="b-rule__label">SLA 70%</span></div>
  <div class="b-columns__bar" style="--v: 48%" data-label="Mon"></div>
  <div class="b-columns__bar" style="--v: 64%" data-label="Tue"></div>
  <div class="b-columns__bar" style="--v: 82%" data-label="Wed"></div>
  <div class="b-columns__bar" style="--v: 58%" data-label="Thu"></div>
  <div class="b-columns__bar" style="--v: 74%" data-label="Fri"></div>
</div>
```

```tsx
import { Columns } from "barua-ui";

<Columns
  style={{ "--b-chart-h": "9rem", maxWidth: "26rem", position: "relative" }}
>
  <div
    className="b-rule"
    style={{ bottom: "calc(1.4rem + (9rem - 1.4rem) * 0.7)" }}
  >
    <span className="b-rule__label">SLA 70%</span>
  </div>
  <div className="b-columns__bar" style={{ "--v": "48%" }} data-label="Mon"></div>
  <div className="b-columns__bar" style={{ "--v": "64%" }} data-label="Tue"></div>
  <div className="b-columns__bar" style={{ "--v": "82%" }} data-label="Wed"></div>
  <div className="b-columns__bar" style={{ "--v": "58%" }} data-label="Thu"></div>
  <div className="b-columns__bar" style={{ "--v": "74%" }} data-label="Fri"></div>
</Columns>
```

## Linear Gauge

SwiftUI's linear Gauge style: a graded track with a marker at the current value ( --v ) and min/max labels beneath. Use __track--plain for a neutral track.

- Documentation: https://ui.barua.tz/docs/data-viz.html#linear-gauge
- Classes: `b-gauge-linear` `b-gauge-linear__labels` `b-gauge-linear__marker` `b-gauge-linear__track` `b-gauge-linear__track--plain`

```html
<div class="b-gauge-linear">
  <div class="b-gauge-linear__track"><span class="b-gauge-linear__marker" style="--v: 68%"></span></div>
  <div class="b-gauge-linear__labels"><span>0 GB</span><span>15 GB</span></div>
</div>
<div class="b-gauge-linear">
  <div class="b-gauge-linear__track b-gauge-linear__track--plain"><span class="b-gauge-linear__marker" style="--v: 35%"></span></div>
  <div class="b-gauge-linear__labels"><span>Min</span><span>Max</span></div>
</div>
```

```tsx
import { LinearGauge } from "barua-ui";

<LinearGauge>
  <div className="b-gauge-linear__track">
    <span className="b-gauge-linear__marker" style={{ "--v": "68%" }}></span>
  </div>
  <div className="b-gauge-linear__labels">
    <span>0 GB</span>
    <span>15 GB</span>
  </div>
</LinearGauge>
<LinearGauge>
  <div className="b-gauge-linear__track b-gauge-linear__track--plain">
    <span className="b-gauge-linear__marker" style={{ "--v": "35%" }}></span>
  </div>
  <div className="b-gauge-linear__labels">
    <span>Min</span>
    <span>Max</span>
  </div>
</LinearGauge>
```

