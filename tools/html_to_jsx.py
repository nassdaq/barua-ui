#!/usr/bin/env python3
"""Turn a documented example into the JSX that produces it.

The same job docs/react-code.js does in the browser, done here so the generated
index and the MCP server can answer "how do I write this in React?" with real
code instead of a link. Both read docs/react-map.json, so the two answers agree.

Standard library only — the index build has no dependencies and neither does
the MCP server that consumes it.
"""
from html.parser import HTMLParser
import json, pathlib, re

ROOT = pathlib.Path(__file__).resolve().parent.parent

ATTR = {
    "class": "className", "for": "htmlFor", "tabindex": "tabIndex",
    "colspan": "colSpan", "rowspan": "rowSpan", "maxlength": "maxLength",
    "minlength": "minLength", "readonly": "readOnly", "autocomplete": "autoComplete",
    "autofocus": "autoFocus", "contenteditable": "contentEditable",
    "spellcheck": "spellCheck", "srcset": "srcSet", "novalidate": "noValidate",
    "inputmode": "inputMode", "enterkeyhint": "enterKeyHint",
    "stroke-width": "strokeWidth", "stroke-linecap": "strokeLinecap",
    "stroke-linejoin": "strokeLinejoin", "stroke-dasharray": "strokeDasharray",
    "stroke-dashoffset": "strokeDashoffset", "fill-rule": "fillRule",
    "clip-rule": "clipRule", "fill-opacity": "fillOpacity", "stop-color": "stopColor",
    "stroke-opacity": "strokeOpacity", "text-anchor": "textAnchor",
    "preserveaspectratio": "preserveAspectRatio", "viewbox": "viewBox",
    "clip-path": "clipPath", "playsinline": "playsInline", "datetime": "dateTime",
    "crossorigin": "crossOrigin",
}
BOOL = {"open", "disabled", "checked", "hidden", "required", "readonly", "multiple",
        "selected", "autofocus", "novalidate", "reversed", "loop", "muted",
        "controls", "autoplay", "playsinline", "inert"}
VOID = {"img", "input", "br", "hr", "path", "circle", "rect", "line", "polyline",
        "polygon", "ellipse", "use", "source", "track", "col", "area", "base",
        "meta", "link", "stop"}


def _camel(prop: str) -> str:
    if prop.startswith("--"):
        return prop
    head, *rest = prop.split("-")
    return head + "".join(p.title() for p in rest)


def _style(value: str):
    parts = []
    for chunk in value.split(";"):
        if ":" not in chunk:
            continue
        key, val = chunk.split(":", 1)
        name = _camel(key.strip())
        if name.startswith("--"):
            name = f'"{name}"'
        parts.append(f'{name}: "{val.strip()}"')
    return "{{ " + ", ".join(parts) + " }}" if parts else None


class _Node:
    def __init__(self, tag=None, attrs=None, text=None):
        self.tag, self.attrs, self.text = tag, attrs or [], text
        self.kids = []


class _Tree(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.root = _Node("#root")
        self.stack = [self.root]

    def handle_starttag(self, tag, attrs):
        node = _Node(tag, attrs)
        self.stack[-1].kids.append(node)
        if tag not in VOID:
            self.stack.append(node)

    def handle_startendtag(self, tag, attrs):
        self.stack[-1].kids.append(_Node(tag, attrs))

    def handle_endtag(self, tag):
        for i in range(len(self.stack) - 1, 0, -1):
            if self.stack[i].tag == tag:
                del self.stack[i:]
                return

    def handle_data(self, data):
        if data.strip():
            self.stack[-1].kids.append(_Node(text=data))


class Converter:
    def __init__(self, mapping):
        self.map = mapping
        self.used = set()

    def _match(self, tag, classes):
        blocks = self.map["blocks"]
        hits = [c for c in classes if c in blocks]
        if not hits:
            return None
        weak = self.map.get("weak", [])
        strong = [c for c in hits if c not in weak]
        base = (strong or hits)[0]
        name = self.map["byTag"].get(base, {}).get(tag) or blocks[base]

        rules = self.map["mods"].get(name, {})
        class_props = self.map.get("classProps", {}).get(name, {})
        props, left = [], []
        for cls in classes:
            if cls == base:
                continue
            if cls in class_props:
                key, val = class_props[cls]
                props.append(key if val is True else f'{key}="{val}"')
                continue
            if cls in self.map["states"]:
                props.append(self.map["states"][cls][0])
                continue
            mod = cls[len(base) + 2:] if cls.startswith(base + "--") else None
            if mod and mod in (rules.get("extra") or {}):
                key, val = rules["extra"][mod]
                props.append(key if val is True else f'{key}="{val}"')
                continue
            if mod and rules.get("prop") and mod in (rules.get("values") or []):
                props.append(f'{rules["prop"]}={{{mod}}}' if mod.isdigit() else f'{rules["prop"]}="{mod}"')
                continue
            left.append(cls)
        self.used.add(name)
        return name, props, " ".join(left)

    def _attrs(self, node, hit):
        out = list(hit[1]) if hit else []
        for name, value in node.attrs:
            value = value if value is not None else ""
            if name == "class":
                left = hit[2] if hit else value
                if left:
                    out.append(f'className="{left}"')
                continue
            if name == "style":
                styled = _style(value)
                if styled:
                    out.append(f"style={styled}")
                continue
            if name.startswith(("data-", "aria-")):
                out.append(f'{name}="{value}"')
                continue
            if name in BOOL and value in ("", name):
                out.append(ATTR.get(name, name))
                continue
            out.append(f'{ATTR.get(name, _camel(name))}="{value}"')
        return out

    def node(self, node, depth=0):
        pad = "  " * depth
        if node.text is not None:
            text = re.sub(r"\s+", " ", node.text).strip()
            return pad + text.replace("{", "{'{'}").replace("}", "{'}'}") if text else ""

        classes = []
        for name, value in node.attrs:
            if name == "class" and value:
                classes = value.split()
        hit = self._match(node.tag, classes)
        name = hit[0] if hit else node.tag
        attrs = self._attrs(node, hit)

        joined = " ".join(attrs)
        if attrs and len(joined) > 68:
            head = f"<{name}\n" + "\n".join(pad + "  " + a for a in attrs) + f"\n{pad}>"
        elif attrs:
            head = f"<{name} {joined}>"
        else:
            head = f"<{name}>"

        kids = [k for k in (self.node(c, depth + 1) for c in node.kids) if k]
        if not kids:
            if node.tag in VOID:
                return pad + (f"<{name} {joined} />" if attrs else f"<{name} />")
            return pad + head + f"</{name}>"
        if len(kids) == 1 and not kids[0].lstrip().startswith("<") and "\n" not in head:
            return pad + head + kids[0].strip() + f"</{name}>"
        return pad + head + "\n" + "\n".join(kids) + f"\n{pad}</{name}>"


def convert(markup: str, mapping=None):
    """Return (jsx, components) for a block of documented HTML."""
    if mapping is None:
        mapping = json.loads((ROOT / "docs/react-map.json").read_text())
    tree = _Tree()
    tree.feed(markup)
    conv = Converter(mapping)
    body = [out for out in (conv.node(k) for k in tree.root.kids) if out]
    return "\n".join(body), sorted(conv.used)


if __name__ == "__main__":
    import sys
    jsx, used = convert(sys.stdin.read())
    if used:
        print(f'import {{ {", ".join(used)} }} from "barua-ui";\n')
    print(jsx)
