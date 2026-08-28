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

Locally, regenerate it with `python3 tools/build-ai-index.py`.

## Check your work

```bash
python3 tools/barua-lint.py path/to/file.html   # .html, .jsx and .tsx
```

The linter knows the real inventory (it reads the stylesheets) and fails on
unknown classes, hardcoded colour, undocumented inline custom properties,
native `<select>` and date inputs, emoji used as icons, and scroll panes that
cannot scroll. Run it on anything you generate, and fix what it reports before
you call the work done.

`python3 tools/check-docs.py` validates the documentation pages and examples.

## The rules

1. **Compose, don't invent.** If a pattern is not in the docs, use a documented
   alternative — or add the component to the docs first, then use it.
2. **Copy the anatomy.** A block's parts (`__header`, `__body`, `__footer`) only
   exist inside that block. Slots are not decoration.
3. **Tokens, never values.** No raw hex, rgb or px colour in product code. If a
   value feels missing, it is a token that needs adding, not a literal.
4. **Inline styles are for knobs only** — the custom properties a component
   reads from its content (`--v`, `--b-progress`, `--b-thumb-size`,
   `--b-heatmap-cols`) plus artwork backgrounds.
5. **Icons come from the library.** Inline 20×20 SVG, 1.5px stroke,
   `currentColor`, sized with `.b-icon`. Never emoji. Never letters.
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
