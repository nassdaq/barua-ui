#!/usr/bin/env python3
"""
Generate the machine-readable face of Barua UI from the documentation itself.

The docs are the source of truth: every component's anatomy is already a live
demo there, so an index derived from them cannot describe a component the
system does not have, and cannot drift when one changes. Emits:

  barua-ui.json  every component: category, summary, classes, canonical markup
  llms.txt       the short map an agent reads first
  llms-full.txt  the whole system distilled to markdown
"""
import html
import json
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent.parent
DOCS = ROOT / "docs"
SITE = "https://ui.barua.tz"

CATEGORY_TITLES = {
    "principles": "Principles — the eight ideas the system is built on, and what enforces each",
    "foundations": "Foundations — tokens, colour, type, materials, motion",
    "icons": "Icons — the 20×20 glyph set",
    "layout": "Layout — stacks, grids, containers, stage, scroll areas",
    "actions": "Actions — buttons, icon buttons, toolbars, links",
    "navigation": "Navigation — bars, sidebars, tabs, menus, command palette",
    "forms": "Forms — fields, selects, switches, sliders, validation",
    "content": "Content — cards, lists, tables, badges, avatars",
    "feedback": "Feedback — alerts, toasts, progress, skeletons, empty states",
    "overlays": "Overlays — modals, sheets, popovers, tooltips, lightbox",
    "data-viz": "Data visualization — CSS charts",
    "media": "Media — galleries, players, thumbnails",
    "specialized": "Specialized — calendars, pickers, file browser",
    "authentication": "Authentication — sign in, OTP, account switching",
    "system": "System pages — errors, empty, onboarding",
    "productivity": "Productivity — dashboards, workspace, dock, control centre",
    "interaction": "Interaction — states, drag and drop, shortcuts",
    "mobile": "Mobile — headers, tab bars, sheets, safe areas",
    "marketing": "Marketing — landing pages: hero, chapters, figures, bento, site footer",
    "infrastructure": "Infrastructure — naming, theming, accessibility, contribution",
}

TAG = re.compile(r"<[^>]+>")
WS = re.compile(r"\s+")


def text_of(fragment: str) -> str:
    return WS.sub(" ", html.unescape(TAG.sub(" ", fragment))).strip()


def classes_in(fragment: str) -> list[str]:
    found = set()
    for group in re.findall(r'class="([^"]+)"', fragment):
        for name in group.split():
            if name.startswith("b-"):
                found.add(name)
    return sorted(found)


def first_demo(section: str) -> str:
    """The canonical markup for a component: its first live demo."""
    match = re.search(r'<div class="docs-demo[^"]*"[^>]*>(.*?)\n        </div>', section, re.S)
    if not match:
        return ""
    snippet = match.group(1)
    # Drop the auto-generated code block that follows a demo in the page.
    snippet = re.split(r'<div class="docs-code', snippet)[0]
    snippet = "\n".join(line.rstrip() for line in snippet.strip().splitlines())
    return snippet[:1400]


def parse_page(path: pathlib.Path) -> list[dict]:
    raw = path.read_text()
    page = path.stem
    out = []
    for section in re.findall(r'<section class="docs-section" id="([^"]+)">(.*?)</section>', raw, re.S):
        anchor, body = section
        title_match = re.search(r"<h2[^>]*>(.*?)</h2>", body, re.S)
        if not title_match:
            continue
        para = re.search(r"<p>(.*?)</p>", body, re.S)
        component = {
            "id": anchor,
            "title": text_of(title_match.group(1)),
            "category": page,
            "url": f"{SITE}/docs/{page}.html#{anchor}",
            "summary": text_of(para.group(1)) if para else "",
            "classes": classes_in(body),
            "markup": first_demo(body),
        }
        variants = [
            {"id": vid, "title": text_of(vtitle)}
            for vid, vtitle in re.findall(r'<h3 id="([^"]+)">(.*?)</h3>', body, re.S)
        ]
        if variants:
            component["variants"] = variants
        out.append(component)
    return out


CSS_RULE = re.compile(r"([^{}]+)\{([^{}]*)\}", re.S)


def css_rules() -> list[tuple[str, str]]:
    rules = []
    for path in sorted((ROOT / "css").rglob("*.css")):
        rules += [(sel.strip(), body) for sel, body in CSS_RULE.findall(path.read_text())]
    return rules


def system_knobs(rules: list[tuple[str, str]]) -> set[str]:
    """
    The custom properties a component reads but the system never declares for
    itself — the values that must come from the markup. Tokens (declared in
    tokens.css or on the root) are deliberately excluded: those are the
    system's own vocabulary, not knobs to set inline.
    """
    read, tokens = set(), set()
    for path in sorted((ROOT / "css").rglob("*.css")):
        text = path.read_text()
        read.update(re.findall(r"var\(\s*(--[a-zA-Z0-9_-]+)", text))
        if path.name == "tokens.css":
            tokens.update(re.findall(r"^\s*(--[a-zA-Z0-9_-]+)\s*:", text, re.M))
        for block in re.findall(r"(?::root|^\s*html)[^{]*\{([^}]*)\}", text, re.M):
            tokens.update(re.findall(r"(--[a-zA-Z0-9_-]+)\s*:", block))
    return (read - tokens) | {"--v"}


def contracts(classes: list[str], rules: list[tuple[str, str]], knobs: set[str]):
    """
    What a component needs from whoever uses it: the knobs it reads from the
    markup, and the states it responds to. Derived from the stylesheets, so an
    agent never has to open the CSS to find out.
    """
    used_knobs, states = set(), set()
    for name in classes:
        for selector, body in rules:
            if name not in selector:
                continue
            used_knobs |= {k for k in re.findall(r"var\(\s*(--[a-zA-Z0-9_-]+)", body) if k in knobs}
            states |= set(re.findall(rf"\.{re.escape(name)}[^{{,]*?(\.is-[a-z-]+)", selector))
            states |= set(re.findall(rf"(\.is-[a-z-]+)[^{{,]*?\.{re.escape(name)}", selector))
    return sorted(used_knobs), sorted(s.lstrip(".") for s in states)


def main() -> None:
    categories = []
    for page in CATEGORY_TITLES:
        path = DOCS / f"{page}.html"
        if not path.exists():
            continue
        components = parse_page(path)
        if components:
            categories.append(
                {
                    "id": page,
                    "title": CATEGORY_TITLES[page],
                    "url": f"{SITE}/docs/{page}.html",
                    "components": components,
                }
            )

    every_class = sorted({c for cat in categories for comp in cat["components"] for c in comp["classes"]})

    rules = css_rules()
    knobs = system_knobs(rules)
    defined = sorted({m for _, (sel, _) in enumerate(rules) for m in re.findall(r"\.(b-[a-zA-Z0-9_-]+)", sel)})
    for cat in categories:
        for comp in cat["components"]:
            comp_knobs, comp_states = contracts(comp["classes"], rules, knobs)
            if comp_knobs:
                comp["knobs"] = comp_knobs
            if comp_states:
                comp["states"] = comp_states

    index = {
        "name": "Barua UI",
        "description": "An interface design system with Apple's design language, rebuilt natively for the web. Plain HTML and CSS, no build step.",
        "docs": SITE,
        "repository": "https://github.com/nassdaq/barua-ui",
        "mcp": {"url": "https://mcp.barua.tz/mcp", "transport": "streamable-http", "docs": f"{SITE}/docs/infrastructure.html#mcp"},
        "stylesheet": f"{SITE}/css/barua.css",
        "script": f"{SITE}/js/barua.js",
        "conventions": {
            "classes": ".b-block__element--modifier",
            "states": ".is-* alongside the matching ARIA attribute",
            "tokens": "--b-* custom properties; never raw hex or rgb in product code",
            "hooks": "data-b-* attributes, progressive enhancement only",
            "icons": "inline 20x20 SVG, 1.5px stroke, currentColor, from the icon library",
        },
        "rules": RULES,
        "classCount": len(defined),
        "classes": defined,
        "documentedClasses": every_class,
        "knobs": sorted(knobs),
        "spans": sorted(
            {m for sel, _ in rules for m in re.findall(r"\.(b-span-\d+)", sel)},
            key=lambda s: int(s.rsplit("-", 1)[1]),
        ),
        "lint": {
            "command": "python3 tools/barua-lint.py <files or directory>",
            "rules": ["unknown-class", "hardcoded-colour", "inline-knob", "native-select", "native-date", "emoji-icon", "scroll-pane"],
            "suppress": "<!-- barua-lint disable <rule>: reason --> ... <!-- barua-lint enable -->",
        },
        "categories": categories,
    }

    (ROOT / "barua-ui.json").write_text(json.dumps(index, indent=2) + "\n")

    # llms.txt — the short map, per the emerging convention.
    lines = [
        "# Barua UI",
        "",
        "> An interface design system with Apple's design language, rebuilt natively",
        "> for the web: plain HTML and CSS, one stylesheet, no build step. Build",
        "> interfaces by composing documented components — never by inventing CSS.",
        "",
        "Ask the system directly (MCP, streamable HTTP):",
        "- https://mcp.barua.tz/mcp — search_components, get_component, get_rules, lint_markup",
        "",
        "Machine-readable index of every component, with canonical markup:",
        f"- [barua-ui.json]({SITE}/barua-ui.json): complete component index",
        f"- [llms-full.txt]({SITE}/llms-full.txt): the whole system as markdown",
        "",
        "## Rules",
        "",
    ]
    lines += [f"{i + 1}. {rule}" for i, rule in enumerate(RULES)]
    lines += ["", "## Documentation", ""]
    for cat in categories:
        lines.append(f"- [{cat['title']}]({cat['url']}): {len(cat['components'])} components")
    lines += ["", "## Examples", ""]
    for name in ["dashboard", "ambient", "music", "settings", "checkout", "auth", "analytics", "inbox"]:
        lines.append(f"- [{name}]({SITE}/examples/{name}.html): a complete screen, documented components only")
    (ROOT / "llms.txt").write_text("\n".join(lines) + "\n")

    # llms-full.txt — everything an agent needs without fetching 27 HTML pages.
    full = ["# Barua UI — complete reference", "", "## Rules", ""]
    full += [f"{i + 1}. {rule}" for i, rule in enumerate(RULES)]
    for cat in categories:
        full += ["", f"## {cat['title']}", ""]
        for comp in cat["components"]:
            full.append(f"### {comp['title']}  ({comp['url']})")
            if comp["summary"]:
                full.append(comp["summary"])
            if comp.get("variants"):
                full.append("Variants: " + ", ".join(v["title"] for v in comp["variants"]))
            if comp["classes"]:
                full.append("Classes: " + " ".join(comp["classes"]))
            if comp["markup"]:
                full += ["", "```html", comp["markup"], "```"]
            full.append("")
    (ROOT / "llms-full.txt").write_text("\n".join(full) + "\n")

    print(f"categories: {len(categories)}")
    print(f"components: {sum(len(c['components']) for c in categories)}")
    print(f"classes:    {len(every_class)}")
    for f in ["barua-ui.json", "llms.txt", "llms-full.txt"]:
        print(f"{f}: {(ROOT / f).stat().st_size // 1024} KB")


RULES = [
    "Compose from documented components. If a pattern is not in the docs, use a documented alternative or promote a new component into the docs first — never invent markup or CSS in product code.",
    "Copy the anatomy from the docs demo: same wrapper elements, same slots, same class combinations. A component's parts (__header, __body, __footer) only exist inside their block.",
    "Never hardcode colour, spacing, radius or shadow. Use --b-* tokens. A raw hex in product code is a bug.",
    "Inline styles are only for documented knobs (--v, --b-progress, --b-thumb-size, --b-heatmap-cols, --b-circular-size) and artwork backgrounds.",
    "Icons come from the icon library (docs/icons.html): inline 20x20 SVG, 1.5px stroke, currentColor, sized with .b-icon/--sm/--lg. Never emoji, never letters as icons.",
    "Never use a native <select> or native date/time inputs in product surfaces: their popups cannot be styled. Use the menu select and the calendar-in-dropdown patterns.",
    "On desktop a surface does not page-scroll. Use .b-stage for screens that must fit, and .b-scroll-area for the panes that may grow.",
    "A scroll pane's children must never be forced to the pane's height (no h-full inside a scroll area) or scrolling silently dies.",
    "Hover, selection and active are different states and must look different: hover is a quiet fill, selection is accent-soft, focus is the focus ring.",
    "Surfaces never stack materials. A panel inside glass is a fill, not a second material.",
    "Over an unknown background use .b-card--neutral, whose material is derived from the backdrop rather than from the theme.",
    "Light and dark come from light-dark() and data-theme. Never write a second dark stylesheet; never branch on theme in product code.",
    "Every interactive element states its accessible name, keyboard behaviour and state through ARIA; .is-* classes are for looks, ARIA is for meaning.",
    "Vary composition deliberately: the same three cards in a row is not a design. Choose a layout archetype that fits the content, then vary density, span rhythm and material within the system.",
]

if __name__ == "__main__":
    main()
