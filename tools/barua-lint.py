#!/usr/bin/env python3
"""
Check markup against the Barua UI system.

Written for agents as much as for people: an agent that generates a screen can
run this on its own output and get back the exact rule it broke, so the system
enforces itself instead of relying on a reviewer noticing.

    python3 tools/barua-lint.py path/to/file.html [more files...]

Exit code 1 if anything is wrong. Works on .html, .jsx and .tsx.
"""
import json
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
INDEX = ROOT / "barua-ui.json"

# The only custom properties a product surface may set inline: they are the
# documented knobs of components that need a value from their content.
def css_files() -> list[pathlib.Path]:
    return sorted((ROOT / "css").rglob("*.css"))


def system_classes() -> set[str]:
    """Every class the stylesheets actually define — the real inventory."""
    names: set[str] = set()
    for path in css_files():
        for name in re.findall(r"\.(b-[a-zA-Z0-9_-]+)", path.read_text()):
            names.add(name)
    return names


def system_knobs() -> set[str]:
    """
    A knob is a custom property the CSS reads but never declares: the value has
    to come from the markup (a progress percentage, a heatmap column count).
    Anything the system declares for itself is a token, and tokens are not for
    setting inline.
    """
    read: set[str] = set()
    tokens: set[str] = set()
    for path in css_files():
        text = path.read_text()
        read.update(re.findall(r"var\(\s*(--[a-zA-Z0-9_-]+)", text))
        # Tokens are the values the system declares for itself: the palette in
        # tokens.css and anything set on the document root. A property a
        # component declares as its own local default is a knob — the markup
        # is expected to override it.
        if path.name == "tokens.css":
            tokens.update(re.findall(r"^\s*(--[a-zA-Z0-9_-]+)\s*:", text, re.M))
        for block in re.findall(r"(?::root|^\s*html)[^{]*\{([^}]*)\}", text, re.M):
            tokens.update(re.findall(r"(--[a-zA-Z0-9_-]+)\s*:", block))
    return (read - tokens) | {"--v"}

HEX = re.compile(r"(?<![\w-])#[0-9a-fA-F]{3,8}(?![\w-])")
RGB = re.compile(r"\brgba?\(")
CLASS_ATTR = re.compile(r'class(?:Name)?\s*=\s*(?:"([^"]*)"|\{`([^`]*)`\}|\{"([^"]*)"\})')
STYLE_ATTR = re.compile(r'style\s*=\s*(?:"([^"]*)"|\{\{([^}]*)\}\})', re.S)
NATIVE_SELECT = re.compile(r"<select\b", re.I)
NATIVE_DATE = re.compile(r'<input[^>]*type\s*=\s*["\']?(date|time|datetime-local|month|week)', re.I)
# Pictographs only: ✓ ✕ › ▲ are typographic marks the system's own
# anatomy uses (a checkmark in an account row, a close control).
EMOJI = re.compile("[\U0001F300-\U0001FAFF\U00002600-\U000026FF]")


def known_classes() -> set[str]:
    names = system_classes()
    if INDEX.exists():
        names |= set(json.loads(INDEX.read_text())["classes"])
    return names


def suppressions(text: str) -> dict[int, set[str]]:
    """
    Deliberate exceptions, stated in the file where they apply:

        <!-- barua-lint disable emoji-icon: the picker's content IS emoji -->
        ...
        <!-- barua-lint enable -->

    A rule is only silenced between the two, so an exception cannot leak into
    the rest of a file, and it has to be written down next to what it excuses.
    """
    active: set[str] = set()
    by_line: dict[int, set[str]] = {}
    for number, line in enumerate(text.splitlines(), start=1):
        disable = re.search(r"barua-lint disable ([a-z-,\s]+)", line)
        if disable:
            active |= {r.strip() for r in disable.group(1).split(",") if r.strip()}
        if "barua-lint enable" in line:
            active = set()
        by_line[number] = set(active)
    return by_line


def check(path: pathlib.Path, known: set[str], knobs: set[str]) -> list[str]:
    text = path.read_text()
    problems: list[str] = []
    is_markup = path.suffix in {".html", ".htm"}
    allowed = suppressions(text)

    def report(line: int, rule: str, message: str) -> None:
        if rule in allowed.get(line, set()):
            return
        problems.append(f"{path}:{line}: {message}")

    # 1. Only classes the system actually has.
    for match in CLASS_ATTR.finditer(text):
        value = next(g for g in match.groups() if g is not None)
        line = text[: match.start()].count("\n") + 1
        for name in re.split(r"[\s`${}()?:'\"]+", value):
            if name.startswith("b-") and name not in known:
                report(line, "unknown-class", f"unknown class '{name}' — it is not in the system")

    # 2. Colour belongs to tokens.
    for match in STYLE_ATTR.finditer(text):
        value = next(g for g in match.groups() if g is not None)
        line = text[: match.start()].count("\n") + 1
        if HEX.search(value) or RGB.search(value):
            if "gradient" not in value and "background" not in value:
                report(line, "hardcoded-colour", "hardcoded colour in a style attribute — use a --b-* token")
        for prop in re.findall(r"(--[a-zA-Z0-9-]+)\s*:", value):
            if prop not in knobs:
                report(line, "inline-knob", f"inline custom property '{prop}' is not a documented knob")

    # 3. Surfaces the browser owns and we cannot style.
    for pattern, rule, message in (
        (NATIVE_SELECT, "native-select", "native <select> — its popup cannot be styled; use the menu select"),
        (NATIVE_DATE, "native-date", "native date/time input — its picker cannot be styled; use the Barua date picker"),
    ):
        for match in pattern.finditer(text):
            line = text[: match.start()].count("\n") + 1
            report(line, rule, message)

    # 4. Icons are drawn, not typed.
    if is_markup:
        for match in EMOJI.finditer(text):
            line = text[: match.start()].count("\n") + 1
            report(line, "emoji-icon", "emoji used as an icon — use a glyph from the icon library")

    # 5. A scroll pane whose child is pinned to its height cannot scroll.
    for match in re.finditer(r'class(?:Name)?="[^"]*b-scroll-area[^"]*"', text):
        tail = text[match.end() : match.end() + 400]
        if re.search(r'class(?:Name)?="[^"]*\bh-full\b', tail):
            line = text[: match.start()].count("\n") + 1
            report(line, "scroll-pane", "a child pinned to h-full inside .b-scroll-area — scrolling will die")

    return problems


def main() -> None:
    targets = [pathlib.Path(a) for a in sys.argv[1:]]
    if not targets:
        sys.exit(__doc__)
    known = known_classes()
    knobs = system_knobs()
    problems: list[str] = []
    for path in targets:
        if path.is_dir():
            for child in sorted(path.rglob("*")):
                if child.suffix in {".html", ".jsx", ".tsx"}:
                    problems += check(child, known, knobs)
        elif path.exists():
            problems += check(path, known, knobs)

    for line in problems:
        print(line)
    print(f"\n{len(targets)} target(s), {len(problems)} problem(s)")
    sys.exit(1 if problems else 0)


if __name__ == "__main__":
    main()
