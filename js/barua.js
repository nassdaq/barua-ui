/* ==========================================================================
   Barua UI — progressive enhancement helpers (no dependencies)
   Everything works from data-attributes; components stay usable without JS
   where the platform allows (details, dialog, popover).

   API (window.Barua):
     Barua.toast({title, description, variant, action, duration})
     Barua.theme.set('light'|'dark'|'auto') / .get() / .toggle()
   Data attributes:
     [data-b-dialog="#id"]       open <dialog> as modal
     [data-b-dialog-close]       close nearest <dialog>
     [data-b-tabs]               tab container (buttons[role=tab] + panels)
     [data-b-dismiss]            remove nearest .b-alert/.b-banner/.b-toast
     [data-b-copy="#id"|text]    copy to clipboard
     [data-b-theme-toggle]       cycle light/dark
     [data-b-otp]                OTP input group auto-advance
     [data-b-carousel]           carousel prev/next/dots wiring
     [data-b-slider-fill]        keep .b-slider fill in sync
     [data-b-cmdk="#id"]         open command palette dialog on click / ⌘K
     [data-b-filter="#listId"]   filter list items by input value
   ========================================================================== */

(function () {
  "use strict";

  const Barua = (window.Barua = window.Barua || {});

  /* ---- Theme -------------------------------------------------------------- */
  const THEME_KEY = "barua-theme";
  Barua.theme = {
    get() {
      return document.documentElement.dataset.theme || "auto";
    },
    set(mode) {
      if (mode === "auto") {
        delete document.documentElement.dataset.theme;
        localStorage.removeItem(THEME_KEY);
      } else {
        document.documentElement.dataset.theme = mode;
        localStorage.setItem(THEME_KEY, mode);
      }
    },
    toggle() {
      const dark =
        this.get() === "dark" ||
        (this.get() === "auto" &&
          matchMedia("(prefers-color-scheme: dark)").matches);
      this.set(dark ? "light" : "dark");
    },
  };
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) document.documentElement.dataset.theme = saved;
  } catch (_) {}

  /* ---- Liquid Glass mode --------------------------------------------------- */
  const GLASS_KEY = "barua-glass";
  Barua.glass = {
    on() {
      document.documentElement.dataset.glass = "liquid";
      try { localStorage.setItem(GLASS_KEY, "liquid"); } catch (_) {}
    },
    off() {
      delete document.documentElement.dataset.glass;
      try { localStorage.removeItem(GLASS_KEY); } catch (_) {}
    },
    toggle() {
      document.documentElement.dataset.glass === "liquid" ? this.off() : this.on();
    },
  };
  try {
    if (localStorage.getItem(GLASS_KEY)) document.documentElement.dataset.glass = "liquid";
  } catch (_) {}

  /* ---- Adaptive accent ------------------------------------------------------
     Learns a tint from an image (a wallpaper) and re-tints the system:
     Barua.adapt(imgOrUrl) samples the picture, finds its most vibrant hue,
     and sets the accent tokens on <html>. Barua.adapt.reset() returns to the
     stock accent. Grayscale images fall back to the stock accent. */
  function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    const l = (max + min) / 2;
    if (max === min) return [0, 0, l];
    const d = max - min;
    const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    let h;
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
    return [h, s, l];
  }
  function hslToHex(h, s, l) {
    const f = (n) => {
      const k = (n + h * 12) % 12;
      const a = s * Math.min(l, 1 - l);
      const c = l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
      return Math.round(c * 255).toString(16).padStart(2, "0");
    };
    return "#" + f(0) + f(8) + f(4);
  }
  function loadImage(src) {
    const url =
      src instanceof HTMLImageElement
        ? src.currentSrc || src.src
        : typeof src === "string"
          ? src
          : null;
    if (!url) return Promise.reject(new Error("Barua.adapt needs an image element or a URL"));
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = url;
    return img.decode().then(() => img);
  }
  Barua.adapt = async function (src, opts) {
    const img = await loadImage(src);
    const size = 48;
    const canvas = document.createElement("canvas");
    canvas.width = size; canvas.height = size;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    ctx.drawImage(img, 0, 0, size, size);
    const data = ctx.getImageData(0, 0, size, size).data;

    // Perceived brightness of the whole picture decides the scheme it wants:
    // a dark wallpaper needs light ink and dark glass, and the reverse.
    let lumSum = 0, lumCount = 0;
    for (let i = 0; i < data.length; i += 4) {
      lumSum += (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255;
      lumCount++;
    }
    const luminance = lumCount ? lumSum / lumCount : 1;
    const scheme = luminance < 0.45 ? "dark" : "light";
    if (!opts || opts.scheme !== false) document.documentElement.dataset.wallScheme = scheme;

    const BUCKETS = 24;
    const weight = new Array(BUCKETS).fill(0);
    const sums = Array.from({ length: BUCKETS }, () => [0, 0, 0, 0]);
    for (let i = 0; i < data.length; i += 4) {
      const [h, s, l] = rgbToHsl(data[i], data[i + 1], data[i + 2]);
      if (s < 0.18 || l < 0.12 || l > 0.92) continue;
      const w = s * (1 - Math.abs(l - 0.5) * 1.3);
      if (w <= 0) continue;
      const b = Math.floor(h * BUCKETS) % BUCKETS;
      weight[b] += w;
      sums[b][0] += h * w; sums[b][1] += s * w; sums[b][2] += l * w; sums[b][3] += w;
    }
    const best = weight.indexOf(Math.max.apply(null, weight));
    // A grey picture keeps the stock accent but still sets the scheme it needs.
    if (weight[best] <= 0) return { accent: null, luminance: luminance, scheme: scheme };
    const [hs, ss, ls, wsum] = sums[best];
    const h = hs / wsum;
    const s = Math.min(0.9, Math.max(0.45, ss / wsum * 1.15));
    const base = Math.min(0.58, Math.max(0.44, ls / wsum));

    const accent = hslToHex(h, s, base);
    const hover = hslToHex(h, s, Math.max(0.3, base - 0.09));
    const text = hslToHex(h, Math.min(0.95, s * 1.05), Math.min(0.46, base));
    const el = document.documentElement.style;
    el.setProperty("--b-color-accent", accent);
    el.setProperty("--b-color-accent-hover", hover);
    el.setProperty("--b-color-accent-soft", "color-mix(in srgb, " + accent + " 14%, transparent)");
    el.setProperty("--b-color-accent-text", "light-dark(" + text + ", " + hslToHex(h, s, Math.max(0.6, base + 0.12)) + ")");
    document.documentElement.dataset.adapted = "true";
    return { accent: accent, luminance: luminance, scheme: scheme };
  };
  Barua.adapt.reset = function () {
    const el = document.documentElement.style;
    ["--b-color-accent", "--b-color-accent-hover", "--b-color-accent-soft", "--b-color-accent-text"].forEach(
      (v) => el.removeProperty(v),
    );
    delete document.documentElement.dataset.adapted;
    delete document.documentElement.dataset.wallScheme;
  };

  /* ---- Shared elements -----------------------------------------------------
     A thumbnail in a list and the hero it opens into are the same thing to the
     person looking at them, so they should be the same thing to the browser.
     Give both `data-vt-name="cover-42"` and it morphs one into the other —
     across a navigation, or around a Barua.transition() call in one page.
     The name must be unique on a page: two elements sharing one name is the
     one way this breaks, so it is checked in development. */
  function applyTransitionNames(root) {
    if (!CSS.supports("view-transition-name", "x")) return;
    const seen = new Set();
    (root || document).querySelectorAll("[data-vt-name]").forEach((el) => {
      const name = el.dataset.vtName;
      if (!name) return;
      // An element that isn't rendered cannot be morphed, and must not hold
      // the name hostage: this is exactly the list-to-detail case, where the
      // thumbnail is hidden as the hero it becomes appears.
      if (!el.getClientRects().length) {
        el.style.viewTransitionName = "";
        return;
      }
      if (seen.has(name)) {
        console.warn("[barua] duplicate data-vt-name on this page:", name, el);
        return;
      }
      seen.add(name);
      el.style.viewTransitionName = name;
    });
  }
  Barua.transitionNames = applyTransitionNames;

  /**
   * Run a change to the page inside a view transition. Matched elements morph,
   * everything else cross-fades, and where the API is missing — or the person
   * asked for less motion — the change simply happens.
   */
  Barua.transition = function (update) {
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (still || !document.startViewTransition) {
      const result = update();
      applyTransitionNames();
      return Promise.resolve(result);
    }
    const transition = document.startViewTransition(() => {
      update();
      applyTransitionNames();
    });
    return transition.finished.catch(() => {});
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => applyTransitionNames());
  } else {
    applyTransitionNames();
  }
  // Cross-document transitions snapshot before the new page has run its
  // scripts, so the incoming page names its elements at reveal time.
  addEventListener("pagereveal", () => applyTransitionNames());
  addEventListener("pageswap", () => applyTransitionNames());

  /* ---- Wallpaper -----------------------------------------------------------
     Setting a wallpaper is a first-class act in this system, not a theme
     preference: it is what makes the glass legible. Barua.wallpaper.set()
     hangs a picture on every .b-wall, remembers it, and asks Barua.adapt()
     to learn the accent and the light/dark scheme from it. */
  const WALL_KEY = "barua-wallpaper";
  Barua.wallpaper = {
    /**
     * Reduce the picture to a thumbnail. Drawn back at cover size, a 64px-wide
     * image *is* a blur — that is what the scaler does to it — and it weighs
     * about a kilobyte. Baked once here so no frame has to blur anything.
     */
    async bake(src, { edge = 64 } = {}) {
      try {
        const image = await new Promise((done, fail) => {
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.onload = () => done(img);
          img.onerror = fail;
          // A source that neither loads nor errors would leave this pending for
          // the life of the page. Baking is an optimisation; it may give up.
          setTimeout(() => fail(new Error("wallpaper bake timed out")), 8000);
          img.src = src;
        });
        const ratio = image.height / image.width || 1;
        const canvas = document.createElement("canvas");
        canvas.width = edge;
        canvas.height = Math.max(1, Math.round(edge * ratio));
        const context = canvas.getContext("2d");
        context.imageSmoothingQuality = "high";
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        return canvas.toDataURL("image/webp", 0.7);
      } catch (_) {
        return null;  // A wallpaper we cannot read is not worth failing over.
      }
    },

    /** Hang a picture. `src` is any CSS image source: a URL or a data URI. */
    async set(src, { adapt = true, remember = true, bake = true } = {}) {
      document.documentElement.style.setProperty("--b-wall-image", 'url("' + src + '")');
      document.documentElement.classList.add("b-has-wallpaper");
      if (remember) {
        try { localStorage.setItem(WALL_KEY, src); } catch (_) {}
      }
      if (bake) {
        this.bake(src).then((small) => {
          if (!small) return;
          document.documentElement.style.setProperty("--b-wall-blur", 'url("' + small + '")');
          try { localStorage.setItem(WALL_KEY + "-blur", small); } catch (_) {}
        });
      }
      if (adapt && Barua.adapt) {
        try { return await Barua.adapt(src); } catch (_) { return null; }
      }
      return null;
    },
    /**
     * Hang a picture the person chose from their device. The image is resized
     * and re-encoded here, in the browser: a wallpaper is decoration, and
     * shipping a 12-megapixel original around to decorate with is rude.
     */
    async setFile(file, { maxEdge = 2560, quality = 0.82 } = {}) {
      const bitmap = await createImageBitmap(file);
      const scale = Math.min(1, maxEdge / Math.max(bitmap.width, bitmap.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(bitmap.width * scale);
      canvas.height = Math.round(bitmap.height * scale);
      canvas.getContext("2d").drawImage(bitmap, 0, 0, canvas.width, canvas.height);
      const src = canvas.toDataURL("image/webp", quality);
      return this.set(src);
    },
    /** Back to the bare wall, and back to the stock accent. */
    clear() {
      document.documentElement.style.removeProperty("--b-wall-image");
      document.documentElement.style.removeProperty("--b-wall-blur");
      document.documentElement.classList.remove("b-has-wallpaper");
      try { localStorage.removeItem(WALL_KEY); localStorage.removeItem(WALL_KEY + "-blur"); } catch (_) {}
      if (Barua.adapt) Barua.adapt.reset();
    },
    get() {
      try { return localStorage.getItem(WALL_KEY); } catch (_) { return null; }
    },
    /** Re-hang the remembered picture. Called once on load. */
    restore() {
      const src = this.get();
      if (!src) return Promise.resolve(null);
      // The bake is already done and stored; put it straight back rather than
      // re-deriving it on every load. Baking once is the entire point.
      let baked = null;
      try { baked = localStorage.getItem(WALL_KEY + "-blur"); } catch (_) {}
      if (baked) {
        document.documentElement.style.setProperty("--b-wall-blur", 'url("' + baked + '")');
      }
      return this.set(src, { remember: false, bake: !baked });
    },
  };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => Barua.wallpaper.restore());
  } else {
    Barua.wallpaper.restore();
  }

  /* ---- Glass mode ----------------------------------------------------------
     Live glass asks the GPU to blur the backdrop every frame it changes. Baked
     glass uses the thumbnail cut when the wallpaper was hung: the same picture,
     already blurred by being small, pinned to the viewport so it lines up with
     the wall behind. Only meaningful over a wallpaper, which is why the CSS is
     scoped to .b-has-wallpaper. */
  Barua.glass = {
    /** "live" (GPU blur) or "baked" (pre-computed). Returns the mode set. */
    mode(next) {
      const root = document.documentElement;
      if (next === "baked") root.setAttribute("data-b-glass", "baked");
      else root.removeAttribute("data-b-glass");
      try { localStorage.setItem("barua-glass-mode", next === "baked" ? "baked" : "live"); } catch (_) {}
      return next === "baked" ? "baked" : "live";
    },
    get() {
      return document.documentElement.getAttribute("data-b-glass") === "baked" ? "baked" : "live";
    },
    restore() {
      let saved = null;
      try { saved = localStorage.getItem("barua-glass-mode"); } catch (_) {}
      if (saved === "baked") this.mode("baked");
    },
  };
  Barua.glass.restore();

  /* ---- Real refraction (Tier 2 glass) --------------------------------------
     Injects an SVG displacement-map filter and enables `backdrop-filter:
     url(#b-refract)` on liquid objects via the `b-refract` root class.
     Only Blink renders SVG filters in backdrop-filter today; other engines
     keep the blur + specular look untouched. */
  function enableRefraction() {
    if (!("chrome" in window) || !CSS.supports("backdrop-filter", "url(#x)")) return;
    // A displacement map over a live backdrop is the most expensive thing this
    // system can draw. If transparency has been turned down, do not draw it.
    if (matchMedia("(prefers-reduced-transparency: reduce)").matches) return;
    // Displacement map: R encodes X, G encodes Y, neutral center, active rim.
    var map =
      "data:image/svg+xml," +
      encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256">' +
        '<defs>' +
        '<linearGradient id="x" x1="0" x2="1" y1="0" y2="0">' +
        '<stop offset="0" stop-color="#ff0000" stop-opacity="0"/>' +
        '<stop offset="1" stop-color="#ff0000"/></linearGradient>' +
        '<linearGradient id="y" x1="0" x2="0" y1="0" y2="1">' +
        '<stop offset="0" stop-color="#00ff00" stop-opacity="0"/>' +
        '<stop offset="1" stop-color="#00ff00"/></linearGradient>' +
        '<radialGradient id="c">' +
        '<stop offset="0" stop-color="#808000"/>' +
        '<stop offset="0.68" stop-color="#808000"/>' +
        '<stop offset="1" stop-color="#808000" stop-opacity="0"/></radialGradient>' +
        '</defs>' +
        '<rect width="256" height="256" fill="#000"/>' +
        '<rect width="256" height="256" fill="url(#x)" style="mix-blend-mode:screen"/>' +
        '<rect width="256" height="256" fill="url(#y)" style="mix-blend-mode:screen"/>' +
        '<rect width="256" height="256" fill="url(#c)"/>' +
        "</svg>"
      );
    var host = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    host.setAttribute("width", "0");
    host.setAttribute("height", "0");
    host.setAttribute("aria-hidden", "true");
    host.style.position = "absolute";
    host.innerHTML =
      '<filter id="b-refract" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">' +
      '<feImage href="' + map + '" preserveAspectRatio="none" result="m"/>' +
      '<feDisplacementMap in="SourceGraphic" in2="m" scale="-32" ' +
      'xChannelSelector="R" yChannelSelector="G"/>' +
      "</filter>";
    document.body.appendChild(host);
    document.documentElement.classList.add("b-refract");
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", enableRefraction);
  } else {
    enableRefraction();
  }

  /* ---- Toast -------------------------------------------------------------- */
  function toastRegion() {
    let region = document.querySelector(".b-toast-region");
    if (!region) {
      region = document.createElement("div");
      region.className = "b-toast-region";
      region.setAttribute("aria-live", "polite");
      document.body.appendChild(region);
    }
    return region;
  }

  const TOAST_ICONS = {
    success:
      '<svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8.25" stroke="currentColor" stroke-width="1.5"/><path d="m6.5 10.3 2.3 2.3 4.7-5.2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    danger:
      '<svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8.25" stroke="currentColor" stroke-width="1.5"/><path d="M10 6v5m0 3v.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
    warning:
      '<svg viewBox="0 0 20 20" fill="none"><path d="M10 3.5 18 17H2L10 3.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M10 8.5v3.5m0 2.2v.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
    info:
      '<svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8.25" stroke="currentColor" stroke-width="1.5"/><path d="M10 9v5m0-8v.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
  };

  Barua.toast = function ({
    title = "",
    description = "",
    variant = "info",
    action = null, // {label, onClick}
    duration = 4000,
  } = {}) {
    const el = document.createElement("div");
    el.className = "b-toast b-toast--" + variant;
    el.setAttribute("role", "status");
    el.innerHTML =
      '<span class="b-toast__icon">' + (TOAST_ICONS[variant] || TOAST_ICONS.info) + "</span>" +
      '<div class="b-toast__content">' +
      (title ? '<div class="b-toast__title"></div>' : "") +
      (description ? '<div class="b-toast__desc"></div>' : "") +
      "</div>";
    if (title) el.querySelector(".b-toast__title").textContent = title;
    if (description) el.querySelector(".b-toast__desc").textContent = description;
    if (action) {
      const btn = document.createElement("button");
      btn.className = "b-toast__action";
      btn.textContent = action.label;
      btn.addEventListener("click", () => {
        action.onClick && action.onClick();
        dismiss();
      });
      el.appendChild(btn);
    }
    toastRegion().appendChild(el);
    let timer = duration ? setTimeout(dismiss, duration) : null;
    el.addEventListener("pointerenter", () => timer && clearTimeout(timer));
    el.addEventListener("pointerleave", () => {
      if (duration) timer = setTimeout(dismiss, 1500);
    });
    function dismiss() {
      el.classList.add("is-leaving");
      el.addEventListener("animationend", () => el.remove(), { once: true });
    }
    return { dismiss };
  };

  /* ---- Delegated interactions --------------------------------------------- */
  document.addEventListener("click", (e) => {
    const t = e.target.closest(
      "[data-b-dialog],[data-b-dialog-close],[data-b-dismiss],[data-b-copy],[data-b-theme-toggle],[data-b-glass-toggle],[data-b-share],[data-b-cmdk]"
    );
    if (!t) return;

    if (t.hasAttribute("data-b-dialog")) {
      const dlg = document.querySelector(t.getAttribute("data-b-dialog"));
      if (dlg && dlg.showModal) dlg.showModal();
    } else if (t.hasAttribute("data-b-dialog-close")) {
      const dlg = t.closest("dialog");
      if (dlg) dlg.close();
    } else if (t.hasAttribute("data-b-dismiss")) {
      const host = t.closest(".b-alert, .b-banner, .b-toast, .b-notification, .b-chip");
      if (host) host.remove();
    } else if (t.hasAttribute("data-b-copy")) {
      const ref = t.getAttribute("data-b-copy");
      let text = ref;
      if (ref.startsWith("#")) {
        const src = document.querySelector(ref);
        text = src ? src.textContent : "";
      }
      navigator.clipboard.writeText(text.trim()).then(() => {
        const prev = t.textContent;
        t.textContent = "Copied";
        setTimeout(() => (t.textContent = prev), 1200);
      });
    } else if (t.hasAttribute("data-b-theme-toggle")) {
      Barua.theme.toggle();
    } else if (t.hasAttribute("data-b-glass-toggle")) {
      Barua.glass.toggle();
    } else if (t.hasAttribute("data-b-share")) {
      /* ShareLink: share the given URL (or this page); clipboard fallback. */
      var url = t.getAttribute("data-b-share") || location.href;
      var payload = { url: url, title: t.getAttribute("data-b-share-title") || document.title };
      if (navigator.share) {
        navigator.share(payload).catch(function () {});
      } else {
        navigator.clipboard.writeText(url).then(function () {
          if (Barua.toast) Barua.toast({ title: "Link copied", variant: "success" });
        });
      }
    } else if (t.hasAttribute("data-b-cmdk")) {
      const dlg = document.querySelector(t.getAttribute("data-b-cmdk"));
      if (dlg && dlg.showModal) dlg.showModal();
    }
  });

  /* Close dialogs on backdrop click */
  document.addEventListener("click", (e) => {
    if (e.target instanceof HTMLDialogElement && e.target.open) {
      const r = e.target.getBoundingClientRect();
      const inside =
        e.clientX >= r.left && e.clientX <= r.right &&
        e.clientY >= r.top && e.clientY <= r.bottom;
      if (!inside) e.target.close();
    }
  });

  /* ⌘K / Ctrl+K opens the first [data-b-cmdk-root] dialog */
  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      const dlg = document.querySelector("dialog[data-b-cmdk-root]");
      if (dlg) {
        e.preventDefault();
        dlg.open ? dlg.close() : dlg.showModal();
        const input = dlg.querySelector("input");
        if (input) setTimeout(() => input.focus(), 30);
      }
    }
  });

  /* ---- Dropdown menus ------------------------------------------------------
     Menus must never escape the viewport: on open, flip the alignment when a
     menu would clip at either edge. Open dropdowns close on outside pointer
     interaction and on Escape, like every macOS menu. */
  document.addEventListener(
    "toggle",
    (e) => {
      const d = e.target;
      if (!(d instanceof HTMLElement) || !d.classList.contains("b-dropdown") || !d.open) return;
      const menu = d.querySelector(":scope > .b-menu");
      if (!menu) return;
      menu.style.insetInlineStart = "";
      menu.style.insetInlineEnd = "";
      const pad = 8;
      let r = menu.getBoundingClientRect();
      if (r.right > window.innerWidth - pad) {
        menu.style.insetInlineStart = "auto";
        menu.style.insetInlineEnd = "0";
      }
      r = menu.getBoundingClientRect();
      if (r.left < pad) {
        menu.style.insetInlineStart = "0";
        menu.style.insetInlineEnd = "auto";
      }
    },
    true
  );
  document.addEventListener("pointerdown", (e) => {
    document.querySelectorAll("details.b-dropdown[open]").forEach((d) => {
      if (!d.contains(e.target)) d.open = false;
    });
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape")
      document.querySelectorAll("details.b-dropdown[open]").forEach((d) => (d.open = false));
  });

  /* ---- Date picker sugar ---------------------------------------------------
     A .b-calendar inside a .b-dropdown behaves as a picker: choosing a day
     moves the selection, writes "D MonthLabel" into the trigger's
     [data-b-date-display], and closes the dropdown. */
  document.addEventListener("click", (e) => {
    const day = e.target.closest(".b-dropdown .b-calendar__day");
    if (!day || day.classList.contains("is-muted")) return;
    const dropdown = day.closest(".b-dropdown");
    const cal = day.closest(".b-calendar");
    cal.querySelectorAll(".b-calendar__day.is-selected").forEach((d) => d.classList.remove("is-selected"));
    day.classList.add("is-selected");
    const display = dropdown.querySelector("[data-b-date-display]");
    const month = cal.querySelector(".b-calendar__month");
    if (display && month) display.textContent = day.textContent.trim() + " " + month.textContent.trim();
    if (dropdown instanceof HTMLDetailsElement) dropdown.open = false;
  });

  /* ---- Per-element wiring -------------------------------------------------- */
  function init(root) {
    /* Tabs */
    root.querySelectorAll("[data-b-tabs]").forEach((container) => {
      const tabs = Array.from(container.querySelectorAll("[role=tab]"));
      const panels = Array.from(container.querySelectorAll("[role=tabpanel]"));
      function select(i) {
        tabs.forEach((tab, j) => {
          tab.setAttribute("aria-selected", i === j ? "true" : "false");
          tab.tabIndex = i === j ? 0 : -1;
        });
        panels.forEach((p, j) => (p.hidden = i !== j));
      }
      tabs.forEach((tab, i) => {
        tab.addEventListener("click", () => select(i));
        tab.addEventListener("keydown", (e) => {
          const dir = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
          if (!dir) return;
          e.preventDefault();
          const next = (i + dir + tabs.length) % tabs.length;
          tabs[next].focus();
          select(next);
        });
      });
      const initial = Math.max(0, tabs.findIndex((t) => t.getAttribute("aria-selected") === "true"));
      select(initial);
    });

    /* Slider fill sync */
    root.querySelectorAll("input.b-slider, [data-b-slider-fill]").forEach((el) => {
      if (el.type !== "range") return;
      const update = () => {
        const min = +el.min || 0, max = +el.max || 100;
        el.style.setProperty("--b-slider-fill", (((+el.value - min) / (max - min)) * 100) + "%");
      };
      el.addEventListener("input", update);
      update();
    });

    /* OTP auto-advance */
    root.querySelectorAll("[data-b-otp]").forEach((group) => {
      const inputs = Array.from(group.querySelectorAll("input"));
      inputs.forEach((input, i) => {
        input.setAttribute("inputmode", "numeric");
        input.maxLength = 1;
        input.addEventListener("input", () => {
          input.classList.toggle("is-filled", !!input.value);
          if (input.value && inputs[i + 1]) inputs[i + 1].focus();
        });
        input.addEventListener("keydown", (e) => {
          if (e.key === "Backspace" && !input.value && inputs[i - 1]) inputs[i - 1].focus();
        });
        input.addEventListener("paste", (e) => {
          const digits = (e.clipboardData.getData("text") || "").replace(/\D/g, "");
          if (!digits) return;
          e.preventDefault();
          inputs.forEach((inp, j) => {
            inp.value = digits[j] || "";
            inp.classList.toggle("is-filled", !!inp.value);
          });
          (inputs[digits.length] || inputs[inputs.length - 1]).focus();
        });
      });
    });

    /* Carousel */
    root.querySelectorAll("[data-b-carousel]").forEach((car) => {
      const track = car.querySelector(".b-carousel__track");
      const slides = Array.from(car.querySelectorAll(".b-carousel__slide"));
      const dots = Array.from(car.querySelectorAll(".b-carousel__dots button"));
      const step = () => (slides[0] ? slides[0].offsetWidth + 12 : 240);
      car.querySelector(".b-carousel__nav--prev")?.addEventListener("click", () =>
        track.scrollBy({ left: -step(), behavior: "smooth" }));
      car.querySelector(".b-carousel__nav--next")?.addEventListener("click", () =>
        track.scrollBy({ left: step(), behavior: "smooth" }));
      dots.forEach((dot, i) =>
        dot.addEventListener("click", () =>
          slides[i]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" })));
      if (dots.length) {
        track.addEventListener("scroll", () => {
          const i = Math.round(track.scrollLeft / step());
          dots.forEach((d, j) => d.classList.toggle("is-active", j === Math.min(i, dots.length - 1)));
        }, { passive: true });
      }
    });

    /* List filter (command palette, searchable lists) */
    root.querySelectorAll("[data-b-filter]").forEach((input) => {
      const list = document.querySelector(input.getAttribute("data-b-filter"));
      if (!list) return;
      input.addEventListener("input", () => {
        const q = input.value.trim().toLowerCase();
        list.querySelectorAll("[data-b-filter-item]").forEach((item) => {
          item.hidden = q !== "" && !item.textContent.toLowerCase().includes(q);
        });
        list.querySelectorAll("[data-b-filter-group]").forEach((group) => {
          const any = Array.from(group.querySelectorAll("[data-b-filter-item]")).some((i) => !i.hidden);
          group.hidden = !any;
        });
      });
    });

    /* Async images — fade in when loaded (SwiftUI AsyncImage) */
    root.querySelectorAll("img[data-b-async]").forEach(function (img) {
      var host = img.closest(".b-async-img") || img.parentElement;
      var done = function () { host && host.classList.add("is-loaded"); };
      if (img.complete && img.naturalWidth > 0) done();
      else {
        img.addEventListener("load", done, { once: true });
        img.addEventListener("error", done, { once: true });
      }
    });

    /* Collapsing large title — nearest scroll parent drives .is-collapsed */
    root.querySelectorAll(".b-mobile-header[data-b-collapse]").forEach(function (header) {
      var scroller = header.parentElement;
      while (scroller && scroller !== document.body) {
        var oy = getComputedStyle(scroller).overflowY;
        if (oy === "auto" || oy === "scroll") break;
        scroller = scroller.parentElement;
      }
      var target = scroller && scroller !== document.body ? scroller : window;
      var read = function () {
        return target === window ? window.scrollY : scroller.scrollTop;
      };
      var onScroll = function () {
        header.classList.toggle("is-collapsed", read() > 24);
      };
      target.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    });

    /* Control Center chunky sliders — sync hidden range input to --v fill */
    root.querySelectorAll(".b-cc__range input[type=range]").forEach((el) => {
      const update = () => {
        const min = +el.min || 0, max = +el.max || 100;
        el.parentElement.style.setProperty(
          "--v", (((+el.value - min) / (max - min)) * 100) + "%");
      };
      el.addEventListener("input", update);
      update();
    });

    /* Stepper input +/- */
    root.querySelectorAll(".b-stepper-input").forEach((box) => {
      const input = box.querySelector("input");
      const [dec, inc] = box.querySelectorAll("button");
      if (!input || !dec || !inc) return;
      const stepBy = (d) => {
        const step = +input.step || 1, min = input.min === "" ? -Infinity : +input.min,
              max = input.max === "" ? Infinity : +input.max;
        input.value = Math.min(max, Math.max(min, (+input.value || 0) + d * step));
        input.dispatchEvent(new Event("change", { bubbles: true }));
      };
      dec.addEventListener("click", () => stepBy(-1));
      inc.addEventListener("click", () => stepBy(1));
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => init(document));
  } else {
    init(document);
  }
  Barua.init = init;
})();
