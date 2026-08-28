---
name: barua-ui
description: Build interfaces with Barua UI — an Apple-flavoured HTML/CSS design system. Use whenever you are writing or reviewing UI in a project that uses Barua UI (classes starting with b-), or when asked to build a screen, page, component or layout with it. Covers looking up components, copying their documented anatomy, the system's rules, and linting your own output.
---

# Barua UI

Compose interfaces from documented components. Never invent markup or CSS.

## 1. Find the component

Fetch the index once per session and keep it in context:

- `https://ui.barua.tz/llms.txt` — the short map (start here)
- `https://ui.barua.tz/barua-ui.json` — every component: classes, summary and
  the canonical markup from its live demo
- `https://ui.barua.tz/llms-full.txt` — the whole system as markdown

If the project has the repository, prefer the local copies and regenerate with
`python3 tools/build-ai-index.py`.

## 2. Copy the anatomy

Use the component's demo markup as the shape: same wrapper elements, same
slots, same class combinations. Change the content, not the structure. If the
thing you need does not exist, use a documented alternative — or add the
component to the docs first, then use it.

## 3. Follow the rules

Read `AGENTS.md` in the repository; the short version:

- Tokens (`--b-*`), never raw colour values.
- Inline styles only for documented knobs (`--v`, `--b-progress`, …).
- Icons from the icon library; never emoji, never letters as icons.
- No native `<select>`, date or time inputs on product surfaces.
- On desktop a screen does not page-scroll: `.b-stage` plus `.b-scroll-area`.
- Hover, selection and focus must look different.
- Never stack materials; over unknown backgrounds use `.b-card--neutral`.

## 4. Lint what you produced

```bash
python3 tools/barua-lint.py <files or directory>
```

Fix everything it reports before finishing. It reads the stylesheets, so it
knows the real inventory — if it says a class does not exist, it does not.

## 5. Vary the composition

Pick the archetype that fits the content — stage wall, workspace, grouped
settings, list-and-detail, or a single focused column — then vary span rhythm,
density and material within the system. Never default to three cards in a row.
