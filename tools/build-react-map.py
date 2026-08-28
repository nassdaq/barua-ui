#!/usr/bin/env python3
"""Generate docs/react-map.json — the class-to-component table the docs use to
show a React version of every example.

Read from the package source, so a component that does not exist cannot be
suggested, and a new one shows up in the docs the moment it is exported.
"""
import json, pathlib, re

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / "packages/react/src"

blocks: dict[str, str] = {}

# The hand-written components predate block(), and several emit more than one
# base class. Guessing from source picked the wrong one (Fab renders b-btn
# first, so b-btn resolved to Fab), so these are stated outright.
EXPLICIT = {
    "b-btn": "Button", "b-fab": "Fab", "b-toolbar": "Toolbar",
    "b-field": "Field", "b-input": "Input", "b-textarea": "Textarea",
    "b-select": "Select", "b-checkbox": "Checkbox", "b-radio": "Radio",
    "b-switch": "Switch", "b-slider": "Slider", "b-otp": "OtpInput",
    "b-card": "Card", "b-card__header": "CardHeader", "b-card__body": "CardBody",
    "b-card__footer": "CardFooter", "b-card__title": "CardTitle",
    "b-card__subtitle": "CardSubtitle", "b-card__eyebrow": "CardEyebrow",
    "b-badge": "Badge", "b-tag": "Tag", "b-chip": "Chip", "b-avatar": "Avatar",
    "b-avatar-group": "AvatarGroup", "b-icon-tile": "IconTile",
    "b-list": "List", "b-list-item": "ListItem", "b-stat": "Stat",
    "b-empty": "EmptyState", "b-groupbox": "GroupBox", "b-labeled": "Labeled",
    "b-alert": "Alert", "b-progress": "Progress", "b-spinner": "Spinner",
    "b-skeleton": "Skeleton", "b-status": "StatusDot", "b-tip": "Tip",
    "b-gauge-linear": "LinearGauge",
    "b-modal": "Modal", "b-sheet": "Sheet", "b-bottom-sheet": "BottomSheet",
    "b-popover": "Popover", "b-tooltip-host": "Tooltip", "b-action-sheet": "ActionSheet",
    "b-segmented": "Segmented", "b-tabs": "Tabs", "b-breadcrumbs": "Breadcrumbs",
    "b-icon": "Icon",
    "b-dl": "DescriptionList", "b-list__header": "ListHeader", "b-list__footer": "ListFooter",
    "b-pagination": "Pagination", "b-pagination__item": "PaginationItem",
    "b-menubar": "MenuBar", "b-menubar__item": "MenuBarItem",
    "b-circular": "CircularProgress", "b-thumb": "Thumb", "b-async-img": "AsyncImage",
    "b-media-placeholder": "MediaPlaceholder", "b-liquid-toggle": "LiquidToggle",
    "b-axis": "Axis", "b-radar-svg": "RadarChart", "b-line-svg": "LineChart",
    "b-area-svg": "AreaChart", "b-scatter-svg": "ScatterChart", "b-gridlines": "GridLines",
    "b-quote": "Quote", "b-kbd": "Kbd", "b-link": "Link", "b-code": "CodeBlock",
    "b-timeline": "Timeline", "b-steps": "Steps", "b-table": "Table", "b-table-wrap": "TableWrap",
    "b-gauge": "Gauge", "b-donut": "Donut", "b-sparkline": "Sparkline", "b-legend": "Legend",
    "b-columns": "Columns", "b-bars": "Bars", "b-chart": "Chart",
    "b-cmdk": "CommandPalette", "b-drawer": "Drawer", "b-topnav": "TopNav",
    "b-workspace": "Workspace", "b-dashboard": "Dashboard", "b-sidebar": "Sidebar",
    "b-auth-card": "AuthCard", "b-result": "Result", "b-banner": "Banner",
    "b-chapter": "Chapter", "b-hero": "Hero", "b-figure": "Figure",
}

# Same class, different element, different component.
BY_TAG = {"b-btn": {"a": "ButtonLink"}}

# A base that loses to any more specific class beside it: <dialog class="b-modal
# b-cmdk"> is a CommandPalette, not a Modal wearing a class.
WEAK = ["b-modal", "b-btn", "b-card", "b-input", "b-stack", "b-hstack"]

# Separate classes that a component exposes as a prop rather than a class.
CLASS_PROPS = {"Button": {"b-icon-btn": ["icon", True]}}


# block("div", "b-card-grid", "CardGrid") — the one-liners.
for f in SRC.glob("*.tsx"):
    for tag, cls, name in re.findall(r'block\(\s*"([^"]+)"\s*,\s*"([^"]+)"\s*,\s*"(\w+)"\s*\)', f.read_text()):
        blocks[cls] = name

# forwardRef components written since block() exists: their first cn() class is
# the block, and each is checked against EXPLICIT below before being trusted.
for f in SRC.glob("*.tsx"):
    text = f.read_text()
    for m in re.finditer(r'export const (\w+) = forwardRef<[^>]*>\(\s*function \w+\((.*?)\n\}\);', text, re.S):
        name, body = m.group(1), m.group(2)
        found = re.search(r'cn\(\s*\n?\s*"(b-[a-z0-9-]+)"', body) or re.search(r'className=\{cn\("(b-[a-z0-9-]+)"', body) or re.search(r'className="(b-[a-z0-9-]+)"', body)
        if found:
            blocks.setdefault(found.group(1), name)

blocks.update(EXPLICIT)

# Modifiers that are real props rather than extra classes. Anything not listed
# stays a className, which is honest: the docs never invent a prop.
MODS = {
    "Button":    {"prop": "variant", "values": ["primary","tinted","outline","ghost","glass","danger","danger-tinted","success","provider","liquid"],
                  "extra": {"sm": ("size","sm"), "lg": ("size","lg"), "xs": ("size","xs"), "xl": ("size","xl"),
                            "pill": ("pill", True), "block": ("block", True)}},
    "Fab":       {"extra": {"extended": ("extended", True)}},
    "Switch":    {"extra": {"sm": ("small", True)}},
    "List":      {"extra": {"plain": ("plain", True), "inset-divider": ("insetDividers", True)}},
    "ListItem":  {"extra": {"interactive": ("interactive", True)}},
    "Modal":     {"extra": {"glass": ("glass", True), "sm": ("size","sm"), "lg": ("size","lg")}},
    "Segmented": {"extra": {"block": ("block", True)}},
    "Spinner":   {"extra": {"sm": ("size","sm"), "lg": ("size","lg")}},
    "Toolbar":   {"extra": {"glass": ("glass", True)}},
    "Card":      {"extra": {"compact": ("compact", True), "accent": ("accent", True), "glass": ("glass", True), "flush": ("flush", True)}},
    "Badge":     {"prop": "variant", "values": ["accent","success","warning","danger","neutral"], "extra": {"dot": ("dot", True)}},
    "Alert":     {"prop": "variant", "values": ["success","warning","danger","info"]},
    "Container": {"prop": "size", "values": ["sm","md","xl","fluid"]},
    "Grid":      {"prop": "cols", "values": ["2","3","4","6","auto"]},
    "Table":     {"extra": {"striped": ("striped", True), "hover": ("hover", True), "compact": ("compact", True)}},
    "Divider":   {"extra": {"vertical": ("vertical", True), "inset": ("inset", True), "label": ("label", True)}},
    "Result":    {"prop": "tone", "values": ["success","warning","error","confirm"]},
    "Chapter":   {"extra": {"tight": ("tight", True), "start": ("start", True), "dark": ("dark", True)}},
    "Stack":     {"prop": "align", "values": ["start","center","end","between","stretch"], "extra": {"wrap": ("wrap", True)}},
    "Banner":    {"extra": {"neutral": ("neutral", True)}},
    "Sidebar":   {"prop": "material", "values": ["glass","surface"]},
    "Drawer":    {"extra": {"end": ("end", True)}},
    "Dropdown":  {"extra": {"end": ("end", True)}},
    "Figure":    {"extra": {"bleed": ("bleed", True)}},
    "FeatureRow":{"extra": {"flip": ("flip", True)}},
    "DescriptionList": {"extra": {"stacked": ("stacked", True)}},
    "Disclosure":{"extra": {"plain": ("plain", True)}},
    "ButtonGroup": {"extra": {"attached": ("attached", True)}},
    "Event":     {"prop": "tone", "values": ["green","orange","purple"]},
    "Rail":      {"prop": "material", "values": ["glass"]},
}

# State classes are props too — the pair that must never come apart.
STATES = {"is-active": ("active", True), "is-selected": ("selected", True),
          "is-loading": ("loading", True), "is-invalid": ("invalid", True),
          "is-muted": ("muted", True), "is-today": ("today", True)}

exports = set()
index = (SRC / "index.ts").read_text()
for m in re.finditer(r'export \{([^}]+)\} from', index):
    for name in m.group(1).split(","):
        name = name.strip()
        if name and not name.startswith("type "):
            exports.add(name)

blocks = {c: n for c, n in blocks.items() if n in exports}
MODS["ButtonLink"] = MODS["Button"]

out = {"blocks": blocks, "mods": MODS, "states": STATES, "weak": WEAK,
       "byTag": BY_TAG, "classProps": CLASS_PROPS}
(ROOT / "docs/react-map.json").write_text(json.dumps(out, indent=1, sort_keys=True))
missing = sorted(n for n in EXPLICIT.values() if n not in exports)
if missing:
    print("WARNING — named but not exported:", missing)
print(f"react-map.json: {len(blocks)} classes mapped, {len(MODS)} with typed modifiers")
