/* Barua UI docs — the React version of every example.
 *
 * The JSX is derived from the demo that is on the page, not written by hand
 * beside it. There is one source for both tabs, so the React cannot quietly
 * stop matching the HTML it claims to reproduce.
 */
(function () {
  "use strict";

  var ATTR = {
    class: "className", for: "htmlFor", tabindex: "tabIndex", colspan: "colSpan",
    rowspan: "rowSpan", maxlength: "maxLength", minlength: "minLength",
    readonly: "readOnly", autocomplete: "autoComplete", autofocus: "autoFocus",
    contenteditable: "contentEditable", spellcheck: "spellCheck", srcset: "srcSet",
    novalidate: "noValidate", enterkeyhint: "enterKeyHint", inputmode: "inputMode",
    "stroke-width": "strokeWidth", "stroke-linecap": "strokeLinecap",
    "stroke-linejoin": "strokeLinejoin", "stroke-dasharray": "strokeDasharray",
    "stroke-dashoffset": "strokeDashoffset", "fill-rule": "fillRule",
    "clip-rule": "clipRule", "fill-opacity": "fillOpacity", "stop-color": "stopColor",
    "stroke-opacity": "strokeOpacity", "stroke-miterlimit": "strokeMiterlimit",
    "text-anchor": "textAnchor", "dominant-baseline": "dominantBaseline",
    "preserveaspectratio": "preserveAspectRatio", "viewbox": "viewBox",
    "clip-path": "clipPath", "gradientunits": "gradientUnits",
    "patternunits": "patternUnits", "stdDeviation": "stdDeviation",
    playsinline: "playsInline", crossorigin: "crossOrigin", datetime: "dateTime",
  };

  var BOOL = ["open", "disabled", "checked", "hidden", "required", "readonly",
    "multiple", "selected", "autofocus", "novalidate", "default", "reversed",
    "loop", "muted", "controls", "autoplay", "playsinline", "inert"];

  var VOID = ["img", "input", "br", "hr", "path", "circle", "rect", "line",
    "polyline", "polygon", "ellipse", "use", "source", "track", "col", "area",
    "base", "meta", "link", "stop", "feGaussianBlur", "feColorMatrix", "feBlend"];

  function camel(prop) {
    if (prop.indexOf("--") === 0) return prop;
    return prop.replace(/-([a-z])/g, function (_, c) { return c.toUpperCase(); });
  }

  /* style="a: b; --c: d" -> {{ a: "b", "--c": "d" }} */
  function styleObject(value) {
    var parts = value.split(";").map(function (s) { return s.trim(); }).filter(Boolean);
    var out = parts.map(function (part) {
      var i = part.indexOf(":");
      if (i < 0) return null;
      var key = part.slice(0, i).trim();
      var val = part.slice(i + 1).trim();
      var name = camel(key);
      if (name.indexOf("--") === 0) name = '"' + name + '"';
      return name + ': "' + val.replace(/"/g, '\\"') + '"';
    }).filter(Boolean);
    return out.length ? "{{ " + out.join(", ") + " }}" : null;
  }

  function esc(text) {
    return text.replace(/[{}]/g, function (c) { return "{'" + c + "'}"; });
  }

  function Emitter(map) {
    this.map = map;
    this.used = {};
  }

  /* Which component, and which of its classes became props. */
  Emitter.prototype.match = function (el) {
    var classes = Array.prototype.slice.call(el.classList);
    var map = this.map;
    var matches = classes.filter(function (c) { return map.blocks[c]; });
    if (!matches.length) return null;

    /* A generic base loses to anything more specific sitting beside it. */
    var weak = map.weak || [];
    var strong = matches.filter(function (c) { return weak.indexOf(c) < 0; });
    var base = (strong.length ? strong : matches)[0];
    var name = map.blocks[base];

    var byTag = (map.byTag || {})[base];
    if (byTag && byTag[el.tagName.toLowerCase()]) name = byTag[el.tagName.toLowerCase()];

    var rules = map.mods[name] || {};
    var classProps = (map.classProps || {})[name] || {};
    var props = [];
    var left = [];
    for (var j = 0; j < classes.length; j++) {
      var cls = classes[j];
      if (cls === base) continue;
      if (classProps[cls]) {
        var cp = classProps[cls];
        props.push(cp[1] === true ? cp[0] : cp[0] + '="' + cp[1] + '"');
        continue;
      }
      if (map.states[cls]) { props.push(map.states[cls][0]); continue; }
      var mod = cls.indexOf(base + "--") === 0 ? cls.slice(base.length + 2) : null;
      if (mod && rules.extra && rules.extra[mod]) {
        var pair = rules.extra[mod];
        props.push(pair[1] === true ? pair[0] : pair[0] + '="' + pair[1] + '"');
        continue;
      }
      if (mod && rules.prop && rules.values && rules.values.indexOf(mod) >= 0) {
        props.push(rules.prop + (/^\d+$/.test(mod) ? "={" + mod + "}" : '="' + mod + '"'));
        continue;
      }
      left.push(cls);
    }
    this.used[name] = true;
    return { name: name, props: props, className: left.join(" ") };
  };

  Emitter.prototype.attrs = function (el, hit) {
    var out = [];
    if (hit) out = out.concat(hit.props);
    for (var i = 0; i < el.attributes.length; i++) {
      var a = el.attributes[i];
      var name = a.name;
      var value = a.value;
      if (name === "class") {
        var cls = hit ? hit.className : value;
        if (cls) out.push('className="' + cls + '"');
        continue;
      }
      if (name === "style") {
        var obj = styleObject(value);
        if (obj) out.push("style=" + obj);
        continue;
      }
      if (name.indexOf("data-") === 0 || name.indexOf("aria-") === 0) {
        out.push(name + '="' + value + '"');
        continue;
      }
      if (BOOL.indexOf(name) >= 0 && (value === "" || value === name)) {
        out.push(ATTR[name] || name);
        continue;
      }
      out.push((ATTR[name] || camel(name)) + '="' + value.replace(/"/g, "&quot;") + '"');
    }
    return out;
  };

  Emitter.prototype.node = function (node, depth) {
    var pad = new Array(depth + 1).join("  ");
    if (node.nodeType === 3) {
      var text = node.textContent.replace(/\s+/g, " ").trim();
      return text ? pad + esc(text) : "";
    }
    if (node.nodeType !== 1) return "";

    var el = node;
    var tag = el.tagName.toLowerCase();
    /* Anything the docs added for their own layout is not part of the example. */
    if (el.classList.contains("docs-only")) return "";

    var hit = this.match(el);
    var name = hit ? hit.name : tag;
    var attrs = this.attrs(el, hit);
    var open = attrs.length
      ? attrs.join(" ").length > 68
        ? "<" + name + "\n" + attrs.map(function (a) { return pad + "  " + a; }).join("\n") + "\n" + pad + ">"
        : "<" + name + " " + attrs.join(" ") + ">"
      : "<" + name + ">";

    var kids = [];
    for (var i = 0; i < el.childNodes.length; i++) {
      var out = this.node(el.childNodes[i], depth + 1);
      if (out) kids.push(out);
    }

    if (!kids.length) {
      if (VOID.indexOf(tag) >= 0 || !hit) {
        var selfClose = attrs.length ? "<" + name + " " + attrs.join(" ") + " />" : "<" + name + " />";
        if (VOID.indexOf(tag) >= 0) return pad + selfClose;
      }
      return pad + open + "</" + name + ">";
    }

    var oneLine = kids.length === 1 && kids[0].trim().indexOf("<") !== 0 && open.indexOf("\n") < 0;
    if (oneLine) return pad + open + kids[0].trim() + "</" + name + ">";
    return pad + open + "\n" + kids.join("\n") + "\n" + pad + "</" + name + ">";
  };

  function build(demo, map) {
    var emitter = new Emitter(map);
    var body = [];
    for (var i = 0; i < demo.children.length; i++) {
      var out = emitter.node(demo.children[i], 0);
      if (out) body.push(out);
    }
    var names = Object.keys(emitter.used).sort();
    var header = names.length ? 'import { ' + names.join(", ") + ' } from "barua-ui";\n\n' : "";
    return { code: header + body.join("\n"), components: names };
  }

  /* ---- Wire a React tab into every generated code block --------------------- */
  fetch(new URL("react-map.json", document.currentScript ? document.currentScript.src : location.href))
    .then(function (r) { return r.json(); })
    .then(function (map) {
      document.querySelectorAll(".docs-demo:not([data-no-code])").forEach(function (demo) {
        var details = demo.nextElementSibling;
        if (!details || !details.classList.contains("docs-code")) return;

        var result;
        try { result = build(demo, map); } catch (e) { return; }
        if (!result.components.length) return;

        var pre = details.querySelector("pre");
        var summary = details.querySelector("summary");
        var htmlCode = pre.textContent;

        var tabs = document.createElement("span");
        tabs.className = "docs-code__tabs";
        var htmlTab = document.createElement("button");
        htmlTab.type = "button";
        htmlTab.className = "docs-code__tab is-active";
        htmlTab.textContent = "HTML";
        var reactTab = document.createElement("button");
        reactTab.type = "button";
        reactTab.className = "docs-code__tab";
        reactTab.textContent = "React";
        tabs.append(htmlTab, reactTab);

        /* The summary said "HTML"; the tabs say it better. */
        summary.childNodes.forEach(function (n) {
          if (n.nodeType === 3 && n.textContent.trim() === "HTML") n.textContent = "";
        });
        summary.prepend(tabs);

        function show(which) {
          var react = which === "react";
          pre.querySelector("code").textContent = react ? result.code : htmlCode;
          reactTab.classList.toggle("is-active", react);
          htmlTab.classList.toggle("is-active", !react);
          details.dataset.lang = which;
        }
        function pick(which) {
          return function (event) {
            event.preventDefault();
            event.stopPropagation();
            if (!details.open) details.open = true;
            show(which);
          };
        }
        htmlTab.addEventListener("click", pick("html"));
        reactTab.addEventListener("click", pick("react"));

        /* Copy follows whichever tab is showing. */
        var copy = summary.querySelector(".b-code__copy");
        if (copy) {
          var clone = copy.cloneNode(true);
          copy.replaceWith(clone);
          clone.addEventListener("click", function (event) {
            event.preventDefault();
            event.stopPropagation();
            var text = details.dataset.lang === "react" ? result.code : htmlCode;
            navigator.clipboard.writeText(text).then(function () {
              clone.textContent = "Copied";
              setTimeout(function () { clone.textContent = "Copy"; }, 1200);
            });
          });
        }
      });
    })
    .catch(function () { /* No map, no React tab — the HTML still stands alone. */ });
})();
