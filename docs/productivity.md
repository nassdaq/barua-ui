# Productivity — dashboards, workspace, dock, control centre

Source: https://ui.barua.tz/docs/productivity.html
Rules and conventions: https://ui.barua.tz/llms.txt

## Workspace Shell

.b-workspace is a full-height CSS grid with four named areas: topbar spanning the top, then sidebar / main / inspector below. Children slot in by class — a .b-topnav takes the topbar, a .b-sidebar (or .b-rail ) takes the sidebar, .b-workspace__main is the one scrolling work surface, and an optional .b-inspector docks on the trailing edge. Drop the inspector and main simply stretches. The shell defaults to 100dvh ; the demo constrains it to a miniature.

- Documentation: https://ui.barua.tz/docs/productivity.html#workspace-shell
- Classes: `b-avatar` `b-avatar--xs` `b-card` `b-card__body` `b-dl` `b-dl--stacked` `b-inspector` `b-inspector__header` `b-inspector__section` `b-sidebar` `b-sidebar--surface` `b-sidebar__group` `b-sidebar__item` `b-spacer` `b-stat` `b-stat__delta` `b-stat__label` `b-stat__value` `b-status` `b-status--online` `b-topnav` `b-topnav__brand` `b-workspace` `b-workspace__main`

```html
<div class="b-workspace" style="height: 100%">
  <header class="b-topnav">
    <span class="b-topnav__brand">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="4" fill="var(--b-color-accent)"/><path d="m4 7 8 6 8-6" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      Sema
    </span>
    <span class="b-spacer"></span>
    <span class="b-status b-status--online">Live</span>
    <span class="b-avatar b-avatar--xs">AH</span>
  </header>
  <aside class="b-sidebar b-sidebar--surface" style="width: 10rem" aria-label="Workspace">
    <nav class="b-sidebar__group">
      <a class="b-sidebar__item is-active" href="#workspace-shell">Overview</a>
      <a class="b-sidebar__item" href="#workspace-shell">Campaigns</a>
      <a class="b-sidebar__item" href="#workspace-shell">Tickets</a>
    </nav>
  </aside>
  <main class="b-workspace__main">
    <article class="b-card">
      <div class="b-card__body">
        <div class="b-stat">
          <span class="b-stat__label">Calls today</span>
          <span class="b-stat__value">214</span>
          <span class="b-stat__delta is-up">▲ 9%</span>
        </div>
      </div>
    </article>
  </main>
  <aside class="b-inspector" style="--b-inspector-w: 10.5rem" aria-label="Inspector">
    <div class="b-inspector__header">Inspect
```

```tsx
import { Avatar, Card, CardBody, Inspector, Sidebar, SidebarGroup, Spacer, Stat, StatusDot, TopNav, TopNavBrand, Workspace, WorkspaceMain } from "barua-ui";

<Workspace style={{ height: "100%" }}>
  <TopNav>
    <TopNavBrand>
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <rect x="2" y="4" width="20" height="16" rx="4" fill="var(--b-color-accent)" />
        <path d="m4 7 8 6 8-6" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Sema
    </TopNavBrand>
    <Spacer></Spacer>
    <StatusDot className="b-status--online">Live</StatusDot>
    <Avatar className="b-avatar--xs">AH</Avatar>
  </TopNav>
  <Sidebar material="surface" style={{ width: "10rem" }} aria-label="Workspace">
    <SidebarGroup>
      <a className="b-sidebar__item is-active" href="#workspace-shell">Overview</a>
      <a className="b-sidebar__item" href="#workspace-shell">Campaigns</a>
      <a className="b-sidebar__item" href="#workspace-shell">Tickets</a>
    </SidebarGroup>
  </Sidebar>
  <WorkspaceMain>
    <Card>
      <CardBody>
        <Stat>
          <span className="b-stat__label">Calls today</span>
          <span className="b-stat__value">214</span>
          <span className="b-stat__delta is-up">▲ 9%</span>
        </Stat>
      </CardBody>
    </Card>
  </WorkspaceMain>
  <Inspector style={{ "--b-inspector-w": "10.5rem" }} aria-label="Inspector">
    <div className="b-inspector__header">Inspect</div>
  </Inspector>
</Workspace>
```

## Dashboard

.b-dashboard is a 12-column grid. Cards claim width with one of .b-span-2 , .b-span-3 , .b-span-4 , .b-span-5 , .b-span-6 , .b-span-7 , .b-span-8 , .b-span-9 , .b-span-10 , .b-span-11 or .b-span-12 from 768px up, and stack to a single column below. Spans in one row should total twelve — 5 + 4 + 3 reads as well as 4 + 4 + 4 , and a row that overflows wraps a card onto its own line. Compose it from .b-card + .b-stat for KPIs and the CSS charts from Data Visualization for trends.

- Documentation: https://ui.barua.tz/docs/productivity.html#dashboard
- Classes: `b-avatar` `b-avatar--sm` `b-card` `b-card__body` `b-card__header` `b-card__title` `b-chart` `b-chart__title` `b-columns` `b-columns__bar` `b-dashboard` `b-list` `b-list--plain` `b-list-item` `b-list-item__content` `b-list-item__leading` `b-list-item__subtitle` `b-list-item__title` `b-list-item__trailing` `b-span-4` `b-span-8` `b-sparkline` `b-stat` `b-stat__delta` `b-stat__label` `b-stat__value`

```html
<div class="b-dashboard">
  <article class="b-card b-span-4">
    <div class="b-card__body">
      <div class="b-stat">
        <span class="b-stat__label">Calls handled</span>
        <span class="b-stat__value">4,182</span>
        <span class="b-stat__delta is-up">▲ 12% vs last week</span>
      </div>
      <svg class="b-sparkline" viewBox="0 0 100 24" preserveAspectRatio="none" aria-hidden="true"><path d="M0 19 14 15 28 17 42 10 56 12 70 7 84 9 100 4"/></svg>
    </div>
  </article>
  <article class="b-card b-span-4">
    <div class="b-card__body">
      <div class="b-stat">
        <span class="b-stat__label">Tickets resolved</span>
        <span class="b-stat__value">318</span>
        <span class="b-stat__delta is-up">▲ 6% vs last week</span>
      </div>
    </div>
  </article>
  <article class="b-card b-span-4">
    <div class="b-card__body">
      <div class="b-stat">
        <span class="b-stat__label">Avg. handle time</span>
        <span class="b-stat__value">3m 42s</span>
        <span class="b-stat__delta is-down">▼ 21s over target</span>
      </div>
    </div>
  </article>
  <article class="b-card b-span-8">
    <div class="b-card__body">
      <div class="b-chart">
        <div class="b-chart__title">Calls per day</div>
        <div class="b-columns" style="--b-chart-h: 9rem">
          <div class="b-columns__bar" style="--v: 44%" data-label="Mon"></div>
    
```

```tsx
import { Card, CardBody, Chart, Columns, Dashboard, Sparkline, Stat } from "barua-ui";

<Dashboard>
  <Card className="b-span-4">
    <CardBody>
      <Stat>
        <span className="b-stat__label">Calls handled</span>
        <span className="b-stat__value">4,182</span>
        <span className="b-stat__delta is-up">▲ 12% vs last week</span>
      </Stat>
      <Sparkline viewBox="0 0 100 24" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 19 14 15 28 17 42 10 56 12 70 7 84 9 100 4" />
      </Sparkline>
    </CardBody>
  </Card>
  <Card className="b-span-4">
    <CardBody>
      <Stat>
        <span className="b-stat__label">Tickets resolved</span>
        <span className="b-stat__value">318</span>
        <span className="b-stat__delta is-up">▲ 6% vs last week</span>
      </Stat>
    </CardBody>
  </Card>
  <Card className="b-span-4">
    <CardBody>
      <Stat>
        <span className="b-stat__label">Avg. handle time</span>
        <span className="b-stat__value">3m 42s</span>
        <span className="b-stat__delta is-down">▼ 21s over target</span>
      </Stat>
    </CardBody>
  </Card>
  <Card className="b-span-8">
    <CardBody>
      <Chart>
        <div className="b-chart__title">Calls per day</div>
        <Columns style={{ "--b-chart-h": "9rem" }}>
          <div className="b-columns__bar" style={{ "--v": "44%" }} data-label="Mon"></div>
        </Columns>
      </Chart>
    </CardBody>
  </Card>
</Dashboard>
```

## Command Center

A search-first hero for the top of a workspace: .b-command-center centers a big .b-input-group (capped at 34rem ) with a row of quick-action .b-chip s underneath. It answers "where do I start?" before the user has picked a surface.

- Documentation: https://ui.barua.tz/docs/productivity.html#command-center
- Classes: `b-chip` `b-command-center` `b-gap-2` `b-hstack` `b-input` `b-input-affix` `b-input-affix--end` `b-input-affix--start` `b-input-group` `b-search` `b-stack--wrap`

```html
<div class="b-command-center">
  <h3>Good morning, Asha</h3>
  <p>Search across calls, tickets and campaigns — or jump straight in.</p>
  <div class="b-input-group b-search">
    <span class="b-input-affix b-input-affix--start">
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="9" cy="9" r="5.5" stroke="currentColor" stroke-width="1.5"/><path d="m13.5 13.5 3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
    </span>
    <input class="b-input" type="search" placeholder="Search Sema…" aria-label="Search Sema">
    <span class="b-input-affix b-input-affix--end"><kbd>⌘K</kbd></span>
  </div>
  <div class="b-hstack b-stack--wrap b-gap-2" style="justify-content: center">
    <button class="b-chip">New campaign</button>
    <button class="b-chip">Push leads</button>
    <button class="b-chip">Open queue</button>
    <button class="b-chip">Today's report</button>
  </div>
</div>
```

```tsx
import { Chip, CommandCenter, Input, InputGroup } from "barua-ui";

<CommandCenter>
  <h3>Good morning, Asha</h3>
  <p>Search across calls, tickets and campaigns — or jump straight in.</p>
  <InputGroup className="b-search">
    <span className="b-input-affix b-input-affix--start">
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="m13.5 13.5 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </span>
    <Input type="search" placeholder="Search Sema…" aria-label="Search Sema" />
    <span className="b-input-affix b-input-affix--end">
      <kbd>⌘K</kbd>
    </span>
  </InputGroup>
  <div
    className="b-hstack b-stack--wrap b-gap-2"
    style={{ justifyContent: "center" }}
  >
    <Chip>New campaign</Chip>
    <Chip>Push leads</Chip>
    <Chip>Open queue</Chip>
    <Chip>Today's report</Chip>
  </div>
</CommandCenter>
```

## Kanban Board

.b-kanban is a horizontally scrolling row of .b-kanban-col columns, each with a __header (title + __count ) and a __list of task cards . During drag, mark the grabbed card .is-dragging and the hovered column .is-dropover — shown frozen mid-drag below, with a card leaving "In Progress" for "Done".

- Documentation: https://ui.barua.tz/docs/productivity.html#kanban-board
- Classes: `b-avatar` `b-badge` `b-badge--accent` `b-kanban` `b-kanban-col` `b-kanban-col__count` `b-kanban-col__header` `b-kanban-col__list` `b-task` `b-task__meta` `b-task__title`

## Task & Task List

.b-task is the draggable unit of work: a __title plus a __meta row of badge, due date and an avatar that auto-shrinks and pushes to the trailing edge. It lifts on hover and tilts while .is-dragging .

- Documentation: https://ui.barua.tz/docs/productivity.html#task-and-task-list
- Classes: `b-avatar` `b-badge` `b-badge--accent` `b-badge--danger` `b-checkbox` `b-task` `b-task-list` `b-task-row` `b-task-row__due` `b-task-row__title` `b-task__meta` `b-task__title`

```html
<div class="b-task" style="width: 16rem">
  <div class="b-task__title">Wire USSD flow</div>
  <div class="b-task__meta">
    <span class="b-badge b-badge--accent">USSD</span>
    <span>Sep 2</span>
    <span class="b-avatar">AH</span>
  </div>
</div>
<div class="b-task is-dragging" style="width: 16rem">
  <div class="b-task__title">Fix webhook retries</div>
  <div class="b-task__meta">
    <span class="b-badge b-badge--danger">Bug</span>
    <span>Aug 28</span>
    <span class="b-avatar">JK</span>
  </div>
</div>
```

```tsx
import { Avatar, Badge, Task } from "barua-ui";

<Task style={{ width: "16rem" }}>
  <div className="b-task__title">Wire USSD flow</div>
  <div className="b-task__meta">
    <Badge variant="accent">USSD</Badge>
    <span>Sep 2</span>
    <Avatar>AH</Avatar>
  </div>
</Task>
<Task className="is-dragging" style={{ width: "16rem" }}>
  <div className="b-task__title">Fix webhook retries</div>
  <div className="b-task__meta">
    <Badge variant="danger">Bug</Badge>
    <span>Aug 28</span>
    <Avatar>JK</Avatar>
  </div>
</Task>
```

## Calendar View

.b-calview is a 7-column month grid: one __head cell per weekday, then a __cell per day holding a __date and stacked .b-event pills ( --green , --orange , --purple recolor them). .is-today fills the date disc with accent; .is-other-month dims spillover days. Two weeks are enough to show the pattern — a real month just repeats the same cells.

- Documentation: https://ui.barua.tz/docs/productivity.html#calendar-view
- Classes: `b-calview` `b-calview__cell` `b-calview__date` `b-calview__head` `b-event` `b-event--green` `b-event--orange` `b-event--purple`

```html
<div class="b-calview">
  <div class="b-calview__head">Mon</div>
  <div class="b-calview__head">Tue</div>
  <div class="b-calview__head">Wed</div>
  <div class="b-calview__head">Thu</div>
  <div class="b-calview__head">Fri</div>
  <div class="b-calview__head">Sat</div>
  <div class="b-calview__head">Sun</div>
  <div class="b-calview__cell">
    <span class="b-calview__date">24</span>
    <span class="b-event">Standup</span>
  </div>
  <div class="b-calview__cell">
    <span class="b-calview__date">25</span>
    <span class="b-event b-event--purple">USSD demo</span>
  </div>
  <div class="b-calview__cell is-today">
    <span class="b-calview__date">26</span>
    <span class="b-event">Sprint review</span>
    <span class="b-event b-event--green">1:1 Asha</span>
  </div>
  <div class="b-calview__cell">
    <span class="b-calview__date">27</span>
  </div>
  <div class="b-calview__cell">
    <span class="b-calview__date">28</span>
    <span class="b-event b-event--orange">Campaign launch</span>
  </div>
  <div class="b-calview__cell">
    <span class="b-calview__date">29</span>
  </div>
  <div class="b-calview__cell">
    <span class="b-calview__date">30</span>
  </div>
  <div class="b-calview__cell">
    <span class="b-calview__date">31</span>
    <span class="b-event">Retro</span>
  </div>
  <div class="b-calview__cell is-other-month">
    <span class="b-calview__date">1</span>
  
```

```tsx
import { CalendarView, CalendarViewCell, CalendarViewHead, Event } from "barua-ui";

<CalendarView>
  <CalendarViewHead>Mon</CalendarViewHead>
  <CalendarViewHead>Tue</CalendarViewHead>
  <CalendarViewHead>Wed</CalendarViewHead>
  <CalendarViewHead>Thu</CalendarViewHead>
  <CalendarViewHead>Fri</CalendarViewHead>
  <CalendarViewHead>Sat</CalendarViewHead>
  <CalendarViewHead>Sun</CalendarViewHead>
  <CalendarViewCell>
    <span className="b-calview__date">24</span>
    <Event>Standup</Event>
  </CalendarViewCell>
  <CalendarViewCell>
    <span className="b-calview__date">25</span>
    <Event tone="purple">USSD demo</Event>
  </CalendarViewCell>
  <CalendarViewCell today>
    <span className="b-calview__date">26</span>
    <Event>Sprint review</Event>
    <Event tone="green">1:1 Asha</Event>
  </CalendarViewCell>
  <CalendarViewCell>
    <span className="b-calview__date">27</span>
  </CalendarViewCell>
  <CalendarViewCell>
    <span className="b-calview__date">28</span>
    <Event tone="orange">Campaign launch</Event>
  </CalendarViewCell>
  <CalendarViewCell>
    <span className="b-calview__date">29</span>
  </CalendarViewCell>
  <CalendarViewCell>
    <span className="b-calview__date">30</span>
  </CalendarViewCell>
  <CalendarViewCell>
    <span className="b-calview__date">31</span>
    <Event>Retro</Event>
  </CalendarViewCell>
  <CalendarViewCell className="is-other-month">
    <span className="b-calview__date">1</span>
  </CalendarViewCell>
</CalendarView>
```

## Gantt View

.b-gantt pairs a __label column with __row tracks. Each .b-gantt__bar is placed with two variables — --start and --len — and an inner <i> fills to --done for progress. Recolor per bar with --b-chart-color . The background grid divides into --b-gantt-units columns (default 12 ) — set it on the container to match your timescale.

- Documentation: https://ui.barua.tz/docs/productivity.html#gantt-view
- Classes: `b-gantt` `b-gantt__bar` `b-gantt__label` `b-gantt__row`

```html
<div class="b-gantt" style="--b-gantt-units: 8">
  <div class="b-gantt__label">Wire USSD flow</div>
  <div class="b-gantt__row">
    <div class="b-gantt__bar" style="--start: 0%; --len: 30%"><i style="--done: 70%"></i></div>
  </div>
  <div class="b-gantt__label">IVR prompts</div>
  <div class="b-gantt__row">
    <div class="b-gantt__bar" style="--start: 22%; --len: 32%; --b-chart-color: var(--b-chart-3)"><i style="--done: 45%"></i></div>
  </div>
  <div class="b-gantt__label">Agent console</div>
  <div class="b-gantt__row">
    <div class="b-gantt__bar" style="--start: 48%; --len: 38%; --b-chart-color: var(--b-chart-4)"><i style="--done: 20%"></i></div>
  </div>
  <div class="b-gantt__label">Campaign launch</div>
  <div class="b-gantt__row">
    <div class="b-gantt__bar" style="--start: 82%; --len: 14%; --b-chart-color: var(--b-chart-6)"><i style="--done: 0%"></i></div>
  </div>
</div>
```

```tsx
import { Gantt, GanttBar, GanttRow } from "barua-ui";

<Gantt style={{ "--b-gantt-units": "8" }}>
  <div className="b-gantt__label">Wire USSD flow</div>
  <GanttRow>
    <GanttBar style={{ "--start": "0%", "--len": "30%" }}>
      <i style={{ "--done": "70%" }}></i>
    </GanttBar>
  </GanttRow>
  <div className="b-gantt__label">IVR prompts</div>
  <GanttRow>
    <GanttBar
      style={{ "--start": "22%", "--len": "32%", "--b-chart-color": "var(--b-chart-3)" }}
    >
      <i style={{ "--done": "45%" }}></i>
    </GanttBar>
  </GanttRow>
  <div className="b-gantt__label">Agent console</div>
  <GanttRow>
    <GanttBar
      style={{ "--start": "48%", "--len": "38%", "--b-chart-color": "var(--b-chart-4)" }}
    >
      <i style={{ "--done": "20%" }}></i>
    </GanttBar>
  </GanttRow>
  <div className="b-gantt__label">Campaign launch</div>
  <GanttRow>
    <GanttBar
      style={{ "--start": "82%", "--len": "14%", "--b-chart-color": "var(--b-chart-6)" }}
    >
      <i style={{ "--done": "0%" }}></i>
    </GanttBar>
  </GanttRow>
</Gantt>
```

## Activity Panel

There is no dedicated activity component — compose an inspector-style card from .b-card and the Content page's .b-timeline : time, title, body per event, with .is-complete / .is-active dots marking progress.

- Documentation: https://ui.barua.tz/docs/productivity.html#activity-panel
- Classes: `b-badge` `b-card` `b-card__body` `b-card__header` `b-card__title` `b-timeline` `b-timeline__body` `b-timeline__time` `b-timeline__title`

```html
<div class="b-card" style="max-width: 24rem">
  <div class="b-card__header">
    <div class="b-card__title">Activity</div>
    <span class="b-badge">Today</span>
  </div>
  <div class="b-card__body">
    <ol class="b-timeline">
      <li class="is-complete">
        <div class="b-timeline__time">09:14</div>
        <div class="b-timeline__title">Ticket #4821 resolved</div>
        <div class="b-timeline__body">Asha closed the billing escalation after a callback.</div>
      </li>
      <li class="is-active">
        <div class="b-timeline__time">11:02</div>
        <div class="b-timeline__title">USSD flow v3 deployed</div>
        <div class="b-timeline__body">Baraka pushed the new menu tree to staging.</div>
      </li>
      <li>
        <div class="b-timeline__time">13:40</div>
        <div class="b-timeline__title">Campaign queued</div>
        <div class="b-timeline__body">Nane Nane follow-ups scheduled for 15:00.</div>
      </li>
    </ol>
  </div>
</div>
```

```tsx
import { Badge, Card, CardBody, CardHeader, CardTitle, Timeline } from "barua-ui";

<Card style={{ maxWidth: "24rem" }}>
  <CardHeader>
    <CardTitle>Activity</CardTitle>
    <Badge>Today</Badge>
  </CardHeader>
  <CardBody>
    <Timeline>
      <li className="is-complete">
        <div className="b-timeline__time">09:14</div>
        <div className="b-timeline__title">Ticket #4821 resolved</div>
        <div className="b-timeline__body">Asha closed the billing escalation after a callback.</div>
      </li>
      <li className="is-active">
        <div className="b-timeline__time">11:02</div>
        <div className="b-timeline__title">USSD flow v3 deployed</div>
        <div className="b-timeline__body">Baraka pushed the new menu tree to staging.</div>
      </li>
      <li>
        <div className="b-timeline__time">13:40</div>
        <div className="b-timeline__title">Campaign queued</div>
        <div className="b-timeline__body">Nane Nane follow-ups scheduled for 15:00.</div>
      </li>
    </Timeline>
  </CardBody>
</Card>
```

## Inspector & Properties Panel

.b-inspector is the trailing panel of the workspace shell : a sticky __header with a close button, then stacked __section s each led by an <h6> . Inside, .b-props lays out label-control rows ( __key at a fixed 6rem ; inputs and selects auto-shrink to the small control height). Shown standalone here — inside a shell it docks with only a hairline start border.

- Documentation: https://ui.barua.tz/docs/productivity.html#inspector-and-properties-panel
- Classes: `b-btn` `b-btn--ghost` `b-btn--sm` `b-dl` `b-icon-btn` `b-input` `b-inspector` `b-inspector__header` `b-inspector__section` `b-props` `b-props__key` `b-props__row` `b-select` `b-slider`

```html
<aside class="b-inspector" style="height: 20rem; border: 1px solid var(--b-separator); border-radius: var(--b-radius-xl);" aria-label="Inspector">
  <header class="b-inspector__header">
    Inspector
    <button class="b-btn b-icon-btn b-btn--ghost b-btn--sm" aria-label="Close inspector">
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="m5.5 5.5 9 9m0-9-9 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
    </button>
  </header>
  <div class="b-inspector__section">
    <h6>Properties</h6>
    <div class="b-props">
      <div class="b-props__row">
        <label class="b-props__key" for="insp-name">Name</label>
        <input class="b-input" id="insp-name" value="Wire USSD flow">
      </div>
      <div class="b-props__row">
        <label class="b-props__key" for="insp-status">Status</label>
        <!-- barua-lint disable native-select: a stand-in control inside a layout demo; forms.html documents the menu select -->
        <select class="b-select" id="insp-status">
          <option>Backlog</option>
          <option selected>In progress</option>
          <option>Done</option>
        </select>
      </div>
      <div class="b-props__row">
        <label class="b-props__key" for="insp-width">Width</label>
        <input class="b-slider" id="insp-width" type="range" min="0" max="100" value="64" style="--b-slider-fill: 64%">
   
```

```tsx
import { Button, Input, Inspector, Select, Slider } from "barua-ui";

<Inspector
  style={{ height: "20rem", border: "1px solid var(--b-separator)", borderRadius: "var(--b-radius-xl)" }}
  aria-label="Inspector"
>
  <header className="b-inspector__header">
    Inspector
    <Button icon variant="ghost" size="sm" aria-label="Close inspector">
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="m5.5 5.5 9 9m0-9-9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </Button>
  </header>
  <div className="b-inspector__section">
    <h6>Properties</h6>
    <div className="b-props">
      <div className="b-props__row">
        <label className="b-props__key" htmlFor="insp-name">Name</label>
        <Input id="insp-name" value="Wire USSD flow" />
      </div>
      <div className="b-props__row">
        <label className="b-props__key" htmlFor="insp-status">Status</label>
        <Select id="insp-status">
          <option>Backlog</option>
          <option selected>In progress</option>
          <option>Done</option>
        </Select>
      </div>
      <div className="b-props__row">
        <label className="b-props__key" htmlFor="insp-width">Width</label>
        <Slider id="insp-width" type="range" min="0" max="100" value="64" style={{ "--b-slider-fill": "64%" }} />
      </div>
    </div>
  </div>
</Inspector>
```

## Detail View & Master-Detail

.b-master-detail splits a __list (a .b-list of interactive rows, one .is-selected ) from a __detail pane. Below 768px the panes collapse to one at a time: the list shows by default, and toggling .is-detail-open on the container swaps in the detail — pair it with a back button in the detail header.

- Documentation: https://ui.barua.tz/docs/productivity.html#detail-view-and-master-detail
- Classes: `b-avatar` `b-avatar--sm` `b-badge` `b-badge--warning` `b-btn` `b-btn--primary` `b-dl` `b-hstack` `b-list` `b-list--plain` `b-list-item` `b-list-item--interactive` `b-list-item__content` `b-list-item__leading` `b-list-item__subtitle` `b-list-item__title` `b-list-item__trailing` `b-master-detail` `b-master-detail__detail` `b-master-detail__list`

```html
<div class="b-master-detail">
  <div class="b-master-detail__list">
    <ul class="b-list b-list--plain">
      <li class="b-list-item b-list-item--interactive">
        <span class="b-list-item__leading"><span class="b-avatar b-avatar--sm">AH</span></span>
        <div class="b-list-item__content">
          <div class="b-list-item__title">#4821 — Billing escalation</div>
          <div class="b-list-item__subtitle">Resolved · Asha</div>
        </div>
        <span class="b-list-item__trailing">2h</span>
      </li>
      <li class="b-list-item b-list-item--interactive is-selected">
        <span class="b-list-item__leading"><span class="b-avatar b-avatar--sm">BO</span></span>
        <div class="b-list-item__content">
          <div class="b-list-item__title">#4832 — USSD menu loops</div>
          <div class="b-list-item__subtitle">Open · Baraka</div>
        </div>
        <span class="b-list-item__trailing">35m</span>
      </li>
      <li class="b-list-item b-list-item--interactive">
        <span class="b-list-item__leading"><span class="b-avatar b-avatar--sm">JK</span></span>
        <div class="b-list-item__content">
          <div class="b-list-item__title">#4835 — Recording missing</div>
          <div class="b-list-item__subtitle">Open · Joseph</div>
        </div>
        <span class="b-list-item__trailing">12m</span>
      </li>
    </ul>
  </div>
  <div class="b
```

```tsx
import { Avatar, List, ListItem } from "barua-ui";

<div className="b-master-detail">
  <div className="b-master-detail__list">
    <List plain>
      <ListItem interactive>
        <span className="b-list-item__leading">
          <Avatar className="b-avatar--sm">AH</Avatar>
        </span>
        <div className="b-list-item__content">
          <div className="b-list-item__title">#4821 — Billing escalation</div>
          <div className="b-list-item__subtitle">Resolved · Asha</div>
        </div>
        <span className="b-list-item__trailing">2h</span>
      </ListItem>
      <ListItem interactive selected>
        <span className="b-list-item__leading">
          <Avatar className="b-avatar--sm">BO</Avatar>
        </span>
        <div className="b-list-item__content">
          <div className="b-list-item__title">#4832 — USSD menu loops</div>
          <div className="b-list-item__subtitle">Open · Baraka</div>
        </div>
        <span className="b-list-item__trailing">35m</span>
      </ListItem>
      <ListItem interactive>
        <span className="b-list-item__leading">
          <Avatar className="b-avatar--sm">JK</Avatar>
        </span>
        <div className="b-list-item__content">
          <div className="b-list-item__title">#4835 — Recording missing</div>
          <div className="b-list-item__subtitle">Open · Joseph</div>
        </div>
        <span className="b-list-item__trailing">12m</span>
      </ListItem>
    </List>
  </div>
</div>
```

## Split Pane

Resizable side-by-side panels are covered in Layout — .b-split + .b-panel with a .b-resize-handle between them, the leading panel made draggable via .b-resizable .

- Documentation: https://ui.barua.tz/docs/productivity.html#split-pane
- Classes: `b-panel` `b-resizable` `b-resize-handle` `b-split`

```html
<div class="b-split" style="height: 9rem">
  <div class="b-panel b-resizable" style="flex: 0 0 38%; padding: var(--b-space-4);">Queue</div>
  <div class="b-resize-handle" role="separator" aria-orientation="vertical" aria-label="Resize panels"></div>
  <div class="b-panel" style="flex: 1; padding: var(--b-space-4);">Transcript</div>
</div>
```

```tsx
import { Resizable, ResizeHandle, Split } from "barua-ui";

<Split style={{ height: "9rem" }}>
  <Resizable
    className="b-panel"
    style={{ flex: "0 0 38%", padding: "var(--b-space-4)" }}
  >
    Queue
  </Resizable>
  <ResizeHandle
    role="separator"
    aria-orientation="vertical"
    aria-label="Resize panels"
  ></ResizeHandle>
  <div
    className="b-panel"
    style={{ flex: "1", padding: "var(--b-space-4)" }}
  >
    Transcript
  </div>
</Split>
```

## Dock

A macOS-style app switcher. In production the glass .b-dock__tray sits inside .b-dock , which fixes it to the bottom of the viewport — shown statically here. Items magnify and lift on hover ( scale 1.28 with a bounce ease) and .is-active draws the running-app dot.

- Documentation: https://ui.barua.tz/docs/productivity.html#dock
- Classes: `b-dock__item` `b-dock__tray` `b-icon`

```html
<div class="b-dock__tray">
  <button class="b-dock__item is-active" aria-label="Calls"><svg class="b-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M6.5 3.5 8 6.2 6.4 8a9 9 0 0 0 5.6 5.6l1.8-1.6 2.7 1.5v2.2a1.3 1.3 0 0 1-1.4 1.3A13.5 13.5 0 0 1 3 5.2 1.3 1.3 0 0 1 4.3 3.8h2.2Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg></button>
  <button class="b-dock__item" aria-label="Inbox"><svg class="b-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M3.5 11.5 5 5h10l1.5 6.5v2.5a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1v-2.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M3.5 11.5h4l1 1.5h3l1-1.5h4" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg></button>
  <button class="b-dock__item" aria-label="Contacts"><svg class="b-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="7.5" cy="7" r="2.6" stroke="currentColor" stroke-width="1.5"/><path d="M2.5 16a5 5 0 0 1 10 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M13 4.6a2.6 2.6 0 0 1 0 4.9M14.5 11.6a5 5 0 0 1 3 4.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></button>
  <button class="b-dock__item" aria-label="Reports"><svg class="b-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4 16.5V9M10 16.5V4M16 16.5v-5" stroke="currentColor" stroke-wi
```

```tsx
import { DockTray, Icon } from "barua-ui";

<DockTray>
  <button className="b-dock__item is-active" aria-label="Calls">
    <Icon viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M6.5 3.5 8 6.2 6.4 8a9 9 0 0 0 5.6 5.6l1.8-1.6 2.7 1.5v2.2a1.3 1.3 0 0 1-1.4 1.3A13.5 13.5 0 0 1 3 5.2 1.3 1.3 0 0 1 4.3 3.8h2.2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </Icon>
  </button>
  <button className="b-dock__item" aria-label="Inbox">
    <Icon viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M3.5 11.5 5 5h10l1.5 6.5v2.5a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1v-2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M3.5 11.5h4l1 1.5h3l1-1.5h4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </Icon>
  </button>
  <button className="b-dock__item" aria-label="Contacts">
    <Icon viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="7.5" cy="7" r="2.6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2.5 16a5 5 0 0 1 10 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M13 4.6a2.6 2.6 0 0 1 0 4.9M14.5 11.6a5 5 0 0 1 3 4.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </Icon>
  </button>
  <button className="b-dock__item" aria-label="Reports">
    <Icon viewBox="0 0 20 20" fill="none" aria-hidden="true"></Icon>
  </button>
</DockTray>
```

## Toolbar

The toolbar family lives in Actions ; in a workspace it floats over the board as .b-toolbar--glass with the view's bulk actions at the trailing end.

- Documentation: https://ui.barua.tz/docs/productivity.html#toolbar
- Classes: `b-btn` `b-btn--ghost` `b-btn--sm` `b-btn--tinted` `b-divider` `b-divider--vertical` `b-icon-btn` `b-toolbar` `b-toolbar--glass`

```html
<div class="b-toolbar b-toolbar--glass" role="toolbar" aria-label="Board tools">
  <button class="b-btn b-icon-btn b-btn--ghost" aria-label="Add task">
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 4v12M4 10h12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
  </button>
  <button class="b-btn b-btn--ghost b-btn--sm">Filter</button>
  <button class="b-btn b-btn--ghost b-btn--sm">Group</button>
  <hr class="b-divider b-divider--vertical">
  <button class="b-btn b-btn--tinted b-btn--sm">Share board</button>
</div>
```

```tsx
import { Button, Divider, Toolbar } from "barua-ui";

<Toolbar glass role="toolbar" aria-label="Board tools">
  <Button icon variant="ghost" aria-label="Add task">
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  </Button>
  <Button variant="ghost" size="sm">Filter</Button>
  <Button variant="ghost" size="sm">Group</Button>
  <Divider vertical />
  <Button variant="tinted" size="sm">Share board</Button>
</Toolbar>
```

## App Grid

The iOS home screen: squircle icons with their names beneath, in an auto-filling grid. .is-soon dims an unreleased tile; __hint carries a quiet second line.

- Documentation: https://ui.barua.tz/docs/productivity.html#app-grid
- Classes: `b-app-grid` `b-app-tile` `b-app-tile__hint` `b-app-tile__icon` `b-app-tile__label`

```html
<ul class="b-app-grid" style="max-width: 26rem">
  <li><a class="b-app-tile" href="#app-grid">
    <span class="b-app-tile__icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="2" y="4" width="20" height="16" rx="4" fill="currentColor" opacity="0.25"/><path d="m4 7 8 6 8-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
    <span class="b-app-tile__label">Mail</span>
  </a></li>
  <li><a class="b-app-tile" href="#app-grid">
    <span class="b-app-tile__icon" style="background: linear-gradient(135deg, var(--b-color-teal), var(--b-color-cyan))"><svg width="22" height="22" viewBox="0 0 20 20" fill="none"><path d="M3.5 5.5A1.5 1.5 0 0 1 5 4h3l1.5 2H15a1.5 1.5 0 0 1 1.5 1.5V14a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 14V5.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg></span>
    <span class="b-app-tile__label">Drive</span>
  </a></li>
  <li><a class="b-app-tile" href="#app-grid">
    <span class="b-app-tile__icon" style="background: linear-gradient(135deg, var(--b-color-indigo), var(--b-color-purple))"><svg width="22" height="22" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="6.5" stroke="currentColor" stroke-width="1.5"/><path d="M3.5 10h13M10 3.5c2 2 2 11 0 13-2-2-2-11 0-13Z" stroke="currentColor" stroke-width="1.3"/></svg></span>
    <span class="b-app-tile__la
```

```tsx
import { AppGrid, AppTile } from "barua-ui";

<AppGrid style={{ maxWidth: "26rem" }}>
  <li>
    <AppTile href="#app-grid">
      <span className="b-app-tile__icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="4" width="20" height="16" rx="4" fill="currentColor" opacity="0.25" />
          <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="b-app-tile__label">Mail</span>
    </AppTile>
  </li>
  <li>
    <AppTile href="#app-grid">
      <span
        className="b-app-tile__icon"
        style={{ background: "linear-gradient(135deg, var(--b-color-teal), var(--b-color-cyan))" }}
      >
        <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
          <path d="M3.5 5.5A1.5 1.5 0 0 1 5 4h3l1.5 2H15a1.5 1.5 0 0 1 1.5 1.5V14a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 14V5.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="b-app-tile__label">Drive</span>
    </AppTile>
  </li>
  <li>
    <AppTile href="#app-grid">
      <span
        className="b-app-tile__icon"
        style={{ background: "linear-gradient(135deg, var(--b-color-indigo), var(--b-color-purple))" }}
      >
        <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="6.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M3.5 10h13M10 3.5c2 2 2 11 0 13-2-2-2-11 0-13Z" stroke="currentColor" strokeWidth="1.3" />
        </svg>
      </span>
    </AppTile>
  </li>
</AppGrid>
```

## Ornament

visionOS's ornament, translated: a floating glass control cluster hanging half-off a panel's edge. Wrap the panel in .b-ornament-host ; the ornament names its edge — --bottom , --top , --start , --end .

- Documentation: https://ui.barua.tz/docs/productivity.html#ornament
- Classes: `b-btn` `b-btn--ghost` `b-btn--sm` `b-card` `b-card__body` `b-card__subtitle` `b-card__title` `b-icon-btn` `b-ornament` `b-ornament--bottom` `b-ornament-host`

```html
<div class="b-ornament-host b-card" style="width: min(26rem, 100%)">
  <div class="b-card__body" style="min-height: 9rem">
    <div class="b-card__title">Q3 research.pdf</div>
    <div class="b-card__subtitle">Page 4 of 18</div>
  </div>
  <div class="b-ornament b-ornament--bottom" role="toolbar" aria-label="Document controls">
    <button class="b-btn b-icon-btn b-btn--ghost b-btn--sm" aria-label="Previous page">‹</button>
    <button class="b-btn b-icon-btn b-btn--ghost b-btn--sm" aria-label="Zoom out">−</button>
    <button class="b-btn b-icon-btn b-btn--ghost b-btn--sm" aria-label="Zoom in">+</button>
    <button class="b-btn b-icon-btn b-btn--ghost b-btn--sm" aria-label="Next page">›</button>
  </div>
</div>
```

```tsx
import { Button, Card, CardBody, CardSubtitle, CardTitle } from "barua-ui";

<Card className="b-ornament-host" style={{ width: "min(26rem, 100%)" }}>
  <CardBody style={{ minHeight: "9rem" }}>
    <CardTitle>Q3 research.pdf</CardTitle>
    <CardSubtitle>Page 4 of 18</CardSubtitle>
  </CardBody>
  <div
    className="b-ornament b-ornament--bottom"
    role="toolbar"
    aria-label="Document controls"
  >
    <Button icon variant="ghost" size="sm" aria-label="Previous page">‹</Button>
    <Button icon variant="ghost" size="sm" aria-label="Zoom out">−</Button>
    <Button icon variant="ghost" size="sm" aria-label="Zoom in">+</Button>
    <Button icon variant="ghost" size="sm" aria-label="Next page">›</Button>
  </div>
</Card>
```

## Status Bar

.b-statusbar is the thin strip along the bottom of a shell: tabular-numeral __item entries with a hairline top border. Pair it with a .b-status dot for connection state and a .b-spacer to split leading from trailing items.

- Documentation: https://ui.barua.tz/docs/productivity.html#status-bar
- Classes: `b-spacer` `b-status` `b-status--online` `b-statusbar` `b-statusbar__item`

```html
<div class="b-statusbar">
  <span class="b-statusbar__item">
    <svg viewBox="0 0 16 16" width="12" height="12" fill="none" aria-hidden="true"><circle cx="4.5" cy="3.5" r="1.6" stroke="currentColor" stroke-width="1.3"/><circle cx="4.5" cy="12.5" r="1.6" stroke="currentColor" stroke-width="1.3"/><circle cx="11.5" cy="4.5" r="1.6" stroke="currentColor" stroke-width="1.3"/><path d="M4.5 5.1v5.8M11.5 6.1a5 5 0 0 1-5 5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
    main
  </span>
  <span class="b-statusbar__item"><span class="b-status b-status--online">Synced</span></span>
  <span class="b-spacer"></span>
  <span class="b-statusbar__item">Ln 42, Col 7</span>
  <span class="b-statusbar__item">UTF-8</span>
</div>
```

```tsx
import { Spacer, StatusBar, StatusBarItem, StatusDot } from "barua-ui";

<StatusBar>
  <StatusBarItem>
    <svg
      viewBox="0 0 16 16"
      width="12"
      height="12"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="4.5" cy="3.5" r="1.6" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="4.5" cy="12.5" r="1.6" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="11.5" cy="4.5" r="1.6" stroke="currentColor" strokeWidth="1.3" />
      <path d="M4.5 5.1v5.8M11.5 6.1a5 5 0 0 1-5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
    main
  </StatusBarItem>
  <StatusBarItem>
    <StatusDot className="b-status--online">Synced</StatusDot>
  </StatusBarItem>
  <Spacer></Spacer>
  <StatusBarItem>Ln 42, Col 7</StatusBarItem>
  <StatusBarItem>UTF-8</StatusBarItem>
</StatusBar>
```

## Control Center

The iOS-style glass tile grid — .b-cc — for quick settings, connectivity, and media. Tiles span the 4-column grid ( --2x2 , --2x1 , --4x1 , --round ); toggle pills flip with .b-cc__icon.is-on , and the chunky __range sliders hide a real <input type="range"> for keyboard and screen-reader access. Best floated over wallpaper-grade color.

- Documentation: https://ui.barua.tz/docs/productivity.html#control-center
- Classes: `b-cc` `b-cc__art` `b-cc__icon` `b-cc__label` `b-cc__meta` `b-cc__pill` `b-cc__range` `b-cc__range-icon` `b-cc__range-icon--end` `b-cc__range-icon--start` `b-cc__status` `b-cc__tile` `b-cc__tile--2x1` `b-cc__tile--2x2` `b-cc__tile--4x1` `b-cc__tile--round` `b-cc__transport`

```html
<div class="b-cc">
  <div class="b-cc__tile b-cc__tile--2x2">
    <div class="b-cc__pill">
      <button class="b-cc__icon is-on" aria-pressed="true" aria-label="Wi-Fi on">
        <svg viewBox="0 0 20 20" fill="none"><path d="M2.5 8a11 11 0 0 1 15 0M5 11a7.3 7.3 0 0 1 10 0M7.6 13.8a3.6 3.6 0 0 1 4.8 0" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><circle cx="10" cy="16.2" r="1.1" fill="currentColor"/></svg>
      </button>
      <span class="b-cc__meta"><span class="b-cc__label">Wi-Fi</span><br><span class="b-cc__status">Ghala</span></span>
    </div>
    <div class="b-cc__pill">
      <button class="b-cc__icon is-on" aria-pressed="true" aria-label="Bluetooth on">
        <svg viewBox="0 0 20 20" fill="none"><path d="M6 6.5 14 13l-4 3.5v-13L14 7l-8 6.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <span class="b-cc__meta"><span class="b-cc__label">Bluetooth</span><br><span class="b-cc__status">On</span></span>
    </div>
    <div class="b-cc__pill">
      <button class="b-cc__icon" aria-pressed="false" aria-label="AirDrop">
        <svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="2" stroke="currentColor" stroke-width="1.5"/><path d="M6.5 13.5a5 5 0 0 1 0-7M13.5 6.5a5 5 0 0 1 0 7M4.4 15.6a8 8 0 0 1 0-11.2M15.6 4.4a8 8 0 0 1 0 11.2" stroke="currentColor" stroke-width="1.4"
```

```tsx
import { CommandCenterLabel, CommandCenterStatus, CommandCenterTile } from "barua-ui";

<div className="b-cc">
  <CommandCenterTile className="b-cc__tile--2x2">
    <div className="b-cc__pill">
      <button
        className="b-cc__icon is-on"
        aria-pressed="true"
        aria-label="Wi-Fi on"
      >
        <svg viewBox="0 0 20 20" fill="none">
          <path d="M2.5 8a11 11 0 0 1 15 0M5 11a7.3 7.3 0 0 1 10 0M7.6 13.8a3.6 3.6 0 0 1 4.8 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="10" cy="16.2" r="1.1" fill="currentColor" />
        </svg>
      </button>
      <span className="b-cc__meta">
        <CommandCenterLabel>Wi-Fi</CommandCenterLabel>
        <br />
        <CommandCenterStatus>Ghala</CommandCenterStatus>
      </span>
    </div>
    <div className="b-cc__pill">
      <button
        className="b-cc__icon is-on"
        aria-pressed="true"
        aria-label="Bluetooth on"
      >
        <svg viewBox="0 0 20 20" fill="none">
          <path d="M6 6.5 14 13l-4 3.5v-13L14 7l-8 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <span className="b-cc__meta">
        <CommandCenterLabel>Bluetooth</CommandCenterLabel>
        <br />
        <CommandCenterStatus>On</CommandCenterStatus>
      </span>
    </div>
    <div className="b-cc__pill">
      <button className="b-cc__icon" aria-pressed="false" aria-label="AirDrop">
        <svg viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="2" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>
    </div>
  </CommandCenterTile>
</div>
```

## Liquid Glass Objects

Decorative-grade glass primitives in the Apple Developer "liquid" style — a refractive .b-lens button, a .b-liquid-toggle with a colored core inside a glass capsule, and a .b-liquid-bar gradient slider with a glass cap. Drawn entirely in CSS: layered radial highlights, inset rims, and backdrop blur.

- Documentation: https://ui.barua.tz/docs/productivity.html#liquid-glass
- Classes: `b-lens` `b-liquid-bar` `b-liquid-bar--accent` `b-liquid-capsule` `b-liquid-toggle`

```html
<button class="b-liquid-toggle" aria-pressed="true" aria-label="Liquid toggle"
  onclick="this.setAttribute('aria-pressed', this.getAttribute('aria-pressed')==='true'?'false':'true')"></button>
<button class="b-lens" aria-label="Add">
  <svg viewBox="0 0 20 20" fill="none"><path d="M10 4v12M4 10h12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
</button>
<div class="b-liquid-bar" style="--v: 64%" role="img" aria-label="Gradient level indicator at 64%"><i></i><b></b></div>
<span class="b-liquid-capsule" aria-hidden="true" style="--b-capsule-w: 8rem; --b-capsule-h: 4rem"></span>
<div class="b-liquid-bar b-liquid-bar--accent" style="--v: 46%; --b-liquid-bar-w: 11rem" role="img" aria-label="Level indicator at 46%"><i></i></div>
```

```tsx
import { ImageLens, LiquidToggle } from "barua-ui";

<LiquidToggle
  aria-pressed="true"
  aria-label="Liquid toggle"
  onclick="this.setAttribute('aria-pressed', this.getAttribute('aria-pressed')==='true'?'false':'true')"
></LiquidToggle>
<ImageLens aria-label="Add">
  <svg viewBox="0 0 20 20" fill="none">
    <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
</ImageLens>
<div
  className="b-liquid-bar"
  style={{ "--v": "64%" }}
  role="img"
  aria-label="Gradient level indicator at 64%"
>
  <i></i>
  <b></b>
</div>
<span
  className="b-liquid-capsule"
  aria-hidden="true"
  style={{ "--b-capsule-w": "8rem", "--b-capsule-h": "4rem" }}
></span>
<div
  className="b-liquid-bar b-liquid-bar--accent"
  style={{ "--v": "46%", "--b-liquid-bar-w": "11rem" }}
  role="img"
  aria-label="Level indicator at 46%"
>
  <i></i>
</div>
```

