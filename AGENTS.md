# Working in Barua UI

This file is for coding agents (Claude Code, Cursor, Copilot, Codex and friends).
Read it before writing any markup.

Barua UI is a design system, not a component grab-bag. Interfaces are **composed
from documented components**, never invented. An interface that invents its own
CSS is not a Barua interface, however good the screenshot looks.

## Look it up before you write it

Never guess a class name. The system is published in machine-readable form:

| What | Where |
| --- | --- |
| Short map, read this first | https://ui.barua.tz/llms.txt |
| Every component as markdown | https://ui.barua.tz/llms-full.txt |
| Complete index as JSON | https://ui.barua.tz/barua-ui.json |
| Human docs with live demos | https://ui.barua.tz |

`barua-ui.json` gives every component its category, summary, the classes it
uses, and **the canonical markup taken from its live demo**. Copy that anatomy —
same wrapper elements, same slots — and change the content, not the structure.

It also carries the contract, so you never have to open the stylesheets:

- `knobs` on a component — the custom properties it reads from your markup
  (there are 44 in the system; the four named in rule 4 are only examples)
- `states` on a component — the `.is-*` classes it responds to
- `spans` at the top level — every grid span that exists, so you never write
  one that silently does nothing
- `classes` — the real inventory, taken from the stylesheets, not just what
  the demos happen to show
- `lint` — the command, the rule ids, and how to annotate a deliberate
  exception

Locally, regenerate it with `python3 tools/build-ai-index.py`.

## Designing a dashboard

Rules derived from six admin templates — 457 pages — read for what they do
consistently and, as often, for what none of them do.

**Name the question first.** A dashboard answers one question for one person on
one visit: *is anything wrong*, *how are we doing*, *what needs me today*. Every
element either serves that question or is decoration. A page that answers three
questions answers none of them well; that is what a second dashboard is for.

**Pick an archetype. Variety comes from picking a different one, not from
decorating the same one.**

- **Overview** — a few figures, one trend, recent activity. The default, and the
  one built by reflex; only choose it deliberately.
- **Monitoring** — state first. Big, plain status. Few numbers, no history.
  Answers "is it healthy" in one glance from across a room.
- **Analytics** — one dominant chart, breakdowns beneath, filters that change
  all of it together.
- **Work queue** — the list *is* the page. Everything else exists to triage it.
  No KPI row: a count belongs in the filter that produces it.
- **Record** — one entity, its facts, its history. A detail page, not a grid.
- **Console** — dense tables, bulk actions, filters. Built for someone who is
  here all day and wants rows, not cards.

**The five layers**

A dashboard is read top to bottom, and each band answers the same question at a
different depth — *what*, then *why*, then *what now*.

1. **Context** — title, period, the filters that govern everything below.
2. **Verdict** — three or four figures with deltas. Quarters or thirds.
3. **Evidence** — the chart the verdict came from, plus a companion. One
   dominant element: spans of 8 and 4.
4. **Detail** — lists and tables. A sample, not the archive.
5. **Tail** — links out, last-updated.

Four or five layers is a page; six is two pages pretending to be one. A figure
led 40 of 51 surveyed pages, and figure-then-list was the commonest adjacency of
all at 36 — that order is not a convention, it is how people read.

**Rhythm.** Consecutive layers must not share a column split: quarters, then
eight-and-four, then halves. A page where every band is the same shape reads as
a spreadsheet with rounded corners.

**Spacing does the grouping.** `.b-gap-6` between layers, `.b-gap-3` or
`.b-gap-4` within one. That difference alone separates the bands, which is why a
well-spaced dashboard needs almost no rules and no boxes.

**The first screen** owes context and verdict plus the top of the evidence. If
the figures need scrolling, something above them is taking space it has not
earned.

**Composition**

- Widths are full, half, third or quarter. Spans in a row total twelve. Those
  four are the whole vocabulary the surveyed templates use, and arbitrary widths
  read as mistakes.
- Three or four figures on the top row. Never five: past four, nobody scans
  them, they read them, and reading is not what a figure on a dashboard is for.
- One dominant element per screen. If everything is a card of the same size the
  page reads as a spreadsheet with rounded corners, whatever is in it.
- A number that matters more than its trend is a `.b-stat`, not a chart.

**Charts**

- Time is a line or an area. Comparison across categories is a bar. Those three
  are **84%** of every chart in the survey (97 of 115).
- Pie and donut were **3%** — 4 charts in 457 pages. The shape people reach for
  first is the one professionals use least. Use it only for two to four parts of
  a genuine whole.
- Every chart carries `role="img"` and an `aria-label` **stating the takeaway**,
  not the chart type: "peaking Thursday at 4,120", not "bar chart of sends".
  Only 2% of surveyed pages labelled a chart at all — this is the single most
  common failure in the genre.
- A chart needs a ceiling: `--b-chart-h`. Without one a tall series drags the
  card and the row with it.

**Every widget has four states, not one**

Loading, empty, error, loaded. Design all four or the page only works on a good
day. In 457 pages, **three** had a "no data" message. Use `.b-skeleton` while
fetching, `.b-empty` with an action when there is nothing, and say what failed
rather than showing a blank card.

**Density**

- A table on a dashboard shows five to ten rows and links to the full list. It
  is a sample, not the archive.
- Money and any column of figures take `.b-tabular-nums`, or the digits jitter
  as they change.
- Deltas state direction *and* period: "↑ 8.2% this week", never a bare arrow.

## Reading the documentation

Every page is published twice. `https://ui.barua.tz/docs/forms.html` is also
`https://ui.barua.tz/docs/forms.md` — the same components, summaries, canonical
markup and React, as plain markdown. Prefer the `.md`: there is no HTML to
parse, and one page is a few kilobytes where the full index is most of a
megabyte.

- `llms.txt` — the short map, read it first
- `docs/<page>.md` — one page in full, with HTML and React for each component
- `barua-ui.json` — everything, when you want to query rather than read
- `https://mcp.barua.tz/mcp` — the same answers as tools, if your agent speaks MCP

## Or ask the system directly

If the `barua-ui` MCP server is connected, prefer it over reading files:
`search_components` to find something, `get_component` for its anatomy and
contract, `get_rules` for the rules and knobs, and `lint_markup` to have your
own output judged before you finish. It reads the same generated index, so the
answers cannot disagree with the documentation.

## Check your work

```bash
python3 tools/barua-lint.py path/to/file.html   # .html, .jsx and .tsx
```

The linter knows the real inventory (it reads the stylesheets) and fails on
unknown classes, hardcoded colour, undocumented inline custom properties,
native `<select>` and date inputs, emoji used as icons, and scroll panes that
cannot scroll. Run it on anything you generate, and fix what it reports before
you call the work done.

If a rule is genuinely wrong for one case — an emoji picker whose content
really is emoji, a demo of a platform control — say so in place instead of
ignoring the linter:

```html
<!-- barua-lint disable emoji-icon: in a picker the emoji are the content -->
…
<!-- barua-lint enable -->
```

The exception has to name the rule and give the reason, and it stops at the
`enable`. The documentation itself passes the linter under this rule, so a
suppression without a reason is a smell, not a habit.

`python3 tools/check-docs.py` validates the documentation pages and examples.

## The rules

1. **Compose, don't invent.** If a pattern is not in the docs, use a documented
   alternative — or add the component to the docs first, then use it.
2. **Copy the anatomy.** A block's parts (`__header`, `__body`, `__footer`) only
   exist inside that block. Slots are not decoration.
3. **Tokens, never values.** No raw hex, rgb or px colour in product code. If a
   value feels missing, it is a token that needs adding, not a literal.
4. **Inline custom properties must be knobs** — the properties a component
   reads from its content rather than declaring for itself (`--v`,
   `--b-progress`, `--b-thumb-size`, `--b-heatmap-cols`, `--b-chart-h`,
   `--b-column-w`, `--b-bars-label-w`, and about thirty more). The complete
   list is whatever `system_knobs()` in `tools/barua-lint.py` returns — it is
   derived from the stylesheets, so it is always current. Plain CSS properties
   inline (`max-width`, `position`) are allowed for structure; colour is not,
   ever.
5. **Icons come from the library.** Inline 20×20 SVG, 1.5px stroke,
   `currentColor`, sized with `.b-icon`. Never emoji. Never letters. A
   directional mark inside a sentence is text, not an icon — the `↑` in a
   `.b-stat__delta` sits on the baseline, scales with the number and needs no
   box, so it stays. The rule governs icon slots: anywhere a glyph stands on
   its own, it is drawn.
6. **No native `<select>`, no native date or time inputs** on product surfaces:
   their popups cannot be styled and will break the illusion instantly. Use the
   menu select and the calendar-in-a-dropdown.
7. **A screen ends at the screen.** On desktop, surfaces do not page-scroll:
   `.b-stage` for the screen, `.b-scroll-area` for the panes that may grow. A
   scroll pane's children must never be pinned to its height.
8. **States are distinct.** Hover is a quiet fill, selection is accent-soft,
   focus is the focus ring. If hover and selection look alike, the UI lies.
9. **Never stack materials.** A panel inside glass is a fill, not a second
   material. Over an unknown background use `.b-card--neutral`.
10. **One theme mechanism.** `light-dark()` and `data-theme`. Never a second
    dark stylesheet, never a theme branch in product code.
11. **ARIA carries meaning**, `.is-*` carries looks. Every interactive element
    needs its accessible name, keyboard behaviour and state.

## Don't produce the same screen every time

Slop is not only invented CSS — it is also the same three cards in a row for
every problem. Before composing, choose the archetype that fits the content:

- **Stage wall** — widgets on a fixed screen that never scrolls (`examples/ambient.html`)
- **Workspace** — chrome plus a scrolling main pane (`examples/dashboard.html`)
- **Grouped settings** — flush cards of list rows (`examples/settings.html`)
- **Reading/triage** — list beside detail (`examples/inbox.html`)
- **Focused task** — one narrow column, everything else removed (`examples/checkout.html`, `examples/auth.html`)

Then vary deliberately *within* the system: span rhythm (`b-span-3/4/6/8`),
density (`b-card--compact`), material (glass, neutral, flush), and whether a
section leads with a stat, a chart, a list or a piece of art. Variation comes
from composition and hierarchy, not from new CSS.

## Checking a page on a phone

Headless Chrome's `--window-size` will not go below about 500px, so a
"390px" screenshot from it is a 500px layout cropped — a fake overflow.
`node tools/shot.mjs <url> out.png 390 844` drives Chrome over the DevTools
protocol with real device metrics and prints the viewport, the scroll width
and every element wider than the viewport. Believe that; do not believe a
cropped capture.
