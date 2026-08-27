#!/usr/bin/env python3
"""Barua UI docs validator.

Checks every docs/*.html + index.html for:
  - b-* classes used but never defined in css/
  - duplicate section ids within a page
  - obviously unbalanced <section>/<div>/<dialog> tags
Exit 0 = clean, 1 = findings.
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def defined_classes():
    classes = set()
    for css in list(ROOT.glob("css/**/*.css")) + list(ROOT.glob("docs/*.css")):
        text = css.read_text(encoding="utf-8")
        text = re.sub(r"/\*.*?\*/", "", text, flags=re.S)
        for m in re.finditer(r"\.((?:b|docs)-[A-Za-z0-9_-]+)", text):
            classes.add(m.group(1))
    return classes


def check(path, known):
    problems = []
    html = path.read_text(encoding="utf-8")

    # unknown classes
    used = set()
    for m in re.finditer(r'class="([^"]+)"', html):
        for cls in m.group(1).split():
            if cls.startswith(("b-", "docs-")):
                used.add(cls)
    unknown = sorted(used - known)
    for cls in unknown:
        problems.append("unknown class: ." + cls)

    # duplicate ids
    ids = re.findall(r'(?<![-\w])id="([^"]+)"', html)
    seen, dupes = set(), set()
    for i in ids:
        (dupes if i in seen else seen).add(i)
        seen.add(i)
    for d in sorted(dupes):
        problems.append("duplicate id: #" + d)

    # rough tag balance
    for tag in ("section", "div", "dialog", "main", "aside", "details", "ul", "table"):
        opens = len(re.findall(r"<%s[\s>]" % tag, html))
        closes = len(re.findall(r"</%s>" % tag, html))
        if opens != closes:
            problems.append("tag balance <%s>: %d open / %d close" % (tag, opens, closes))
    return problems


def main():
    known = defined_classes()
    pages = sorted(ROOT.glob("docs/*.html")) + sorted(ROOT.glob("examples/*.html")) + [ROOT / "index.html"]
    total = 0
    for page in pages:
        if not page.exists():
            continue
        problems = check(page, known)
        if problems:
            total += len(problems)
            print(page.relative_to(ROOT))
            for p in problems:
                print("  -", p)
    print("%d page(s) checked, %d problem(s)" % (len(pages), total))
    return 1 if total else 0


if __name__ == "__main__":
    sys.exit(main())
