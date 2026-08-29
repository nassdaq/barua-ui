/* Barua UI docs — auto code blocks, right-rail TOC, active nav, ⌘K palette. */
(function () {
  "use strict";

  /* ---- Auto code block under every .docs-demo ------------------------------ */
  function dedent(html) {
    const lines = html.replace(/^\n+|\s+$/g, "").split("\n");
    const indents = lines
      .filter((l) => l.trim())
      .map((l) => l.match(/^\s*/)[0].length);
    const min = indents.length ? Math.min(...indents) : 0;
    return lines.map((l) => l.slice(min)).join("\n");
  }

  document.querySelectorAll(".docs-demo:not([data-no-code])").forEach((demo) => {
    const code = dedent(demo.innerHTML);
    const details = document.createElement("details");
    details.className = "docs-code";
    const summary = document.createElement("summary");
    summary.append("HTML");
    const copy = document.createElement("button");
    copy.className = "b-code__copy";
    copy.textContent = "Copy";
    copy.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      navigator.clipboard.writeText(code).then(() => {
        copy.textContent = "Copied";
        setTimeout(() => (copy.textContent = "Copy"), 1200);
      });
    });
    summary.appendChild(copy);
    const pre = document.createElement("pre");
    const codeEl = document.createElement("code");
    codeEl.textContent = code;
    pre.appendChild(codeEl);
    details.append(summary, pre);
    demo.after(details);
  });

  /* ---- Right-rail TOC from h2[id] ------------------------------------------- */
  const toc = document.querySelector(".docs-toc");
  const headings = Array.from(document.querySelectorAll(".docs-section > h2[id]"));
  if (toc && headings.length) {
    const title = document.createElement("div");
    title.className = "docs-toc__title";
    title.textContent = "On this page";
    toc.appendChild(title);
    const links = headings.map((h) => {
      const a = document.createElement("a");
      a.href = "#" + h.id;
      a.textContent = h.textContent;
      toc.appendChild(a);
      return a;
    });
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const i = headings.indexOf(entry.target);
          links.forEach((l, j) => l.classList.toggle("is-active", i === j));
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    headings.forEach((h) => observer.observe(h));
  }

  /* ---- Sidebar: mark current page ------------------------------------------- */
  const here = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".docs-sidebar .b-sidebar__item").forEach((a) => {
    const target = (a.getAttribute("href") || "").split("/").pop();
    if (target === here) a.classList.add("is-active");
  });

  /* ---- ⌘K palette entries from sidebar -------------------------------------- */
  const palette = document.querySelector("#docs-cmdk .b-cmdk__list");
  if (palette) {
    document.querySelectorAll(".docs-sidebar a.b-sidebar__item").forEach((a) => {
      const li = document.createElement("li");
      const btn = document.createElement("button");
      btn.className = "b-cmdk__item";
      btn.setAttribute("data-b-filter-item", "");
      btn.innerHTML = "<span>" + a.textContent.trim() + "</span>";
      btn.addEventListener("click", () => (location.href = a.href));
      li.appendChild(btn);
      palette.appendChild(li);
    });
    document.querySelectorAll(".docs-section > h2[id]").forEach((h) => {
      const li = document.createElement("li");
      const btn = document.createElement("button");
      btn.className = "b-cmdk__item";
      btn.setAttribute("data-b-filter-item", "");
      btn.innerHTML = "<span>" + h.textContent.trim() + "</span><kbd>#</kbd>";
      btn.addEventListener("click", () => {
        document.getElementById("docs-cmdk").close();
        location.hash = h.id;
      });
      li.appendChild(btn);
      palette.appendChild(li);
    });
  }

  /* ---- Replay for the motion demos -----------------------------------------
     A one-shot animation runs before anyone scrolls to it, so without this the
     demos are just static screenshots of the finished state. */
  document.addEventListener("click", function (event) {
    var button = event.target.closest("[data-docs-replay]");
    if (!button) return;
    var target = document.querySelector(button.getAttribute("data-docs-replay"));
    if (!target) return;

    /* A scrollport replays by going back to the top. */
    if (target.classList.contains("docs-scrollbox")) {
      target.scrollTo({ top: 0, behavior: "instant" });
      requestAnimationFrame(function () {
        target.scrollTo({ top: target.scrollHeight, behavior: "smooth" });
      });
      return;
    }

    /* Anything else: strip the effect classes, force a reflow, put them back. */
    var animated = target.querySelectorAll("[class*='b-icon--']");
    animated.forEach(function (el) {
      var classes = Array.prototype.filter.call(el.classList, function (c) {
        return c.indexOf("b-icon--") === 0;
      });
      classes.forEach(function (c) { el.classList.remove(c); });
      void el.offsetWidth;
      classes.forEach(function (c) { el.classList.add(c); });
    });

    /* Counters restart from zero. */
    target.querySelectorAll("[data-b-count]").forEach(function (el) {
      var to = parseFloat(el.getAttribute("data-b-count"));
      var reset = el.getAttribute("data-docs-from");
      if (reset !== null) el.textContent = reset;
      if (window.Barua && Barua.count) Barua.count(el, to);
    });
  });

})();
