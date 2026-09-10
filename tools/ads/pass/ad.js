// One clock, every motion. window.__seek(ms) sets the whole frame.
(function () {
  const POSTERS = 27;
  const cols = [...document.querySelectorAll(".wall__col")];
  // Each column gets nine covers, twice over, so it can drift without a gap.
  cols.forEach((col, c) => {
    for (let r = 0; r < 2; r++) for (let i = 0; i < 9; i++) {
      const img = document.createElement("img");
      img.src = `posters/p${String((c * 9 + i) % POSTERS).padStart(2, "0")}.jpg`;
      col.appendChild(img);
    }
  });

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);
  const easeIn = (t) => t * t * t;
  const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const lerp = (a, b, t) => a + (b - a) * t;

  // in: fade up from below with a blur settling; out: fade up and away.
  function enter(el, t, at, dur, { y = 60, scale = 0.96, blur = 14 } = {}) {
    const k = easeOut(clamp((t - at) / dur, 0, 1));
    el.style.opacity = k;
    el.style.filter = `blur(${lerp(blur, 0, k)}px)`;
    return { y: lerp(y, 0, k), s: lerp(scale, 1, k) };
  }
  function leave(el, t, at, dur, { y = -50, blur = 10 } = {}) {
    if (t < at) return null;
    const k = easeIn(clamp((t - at) / dur, 0, 1));
    el.style.opacity = 1 - k;
    el.style.filter = `blur(${lerp(0, blur, k)}px)`;
    return { y: lerp(0, y, k), s: lerp(1, 1.02, k) };
  }
  function place(el, base, m) {
    el.style.transform = `${base} translateY(${m.y}px) scale(${m.s})`;
  }
  function show(el, t, at, dur, until, base = "", opts = {}) {
    if (t < at) { el.style.opacity = 0; return; }
    const m = (until !== null && t >= until) ? leave(el, t, until, 500, opts) : enter(el, t, at, dur, opts);
    place(el, base, m);
  }

  const wall = $("#wall"), scrim = $("#scrim");
  const brandBig = $("#brand-big"), brandTop = $("#brand-top");
  const lines = $$(".line");
  const week = $("#card-week"), month = $("#card-month");
  const ctas = $$(".cta > *");
  const vw = window.innerWidth / 100;

  window.__seek = function (t) {
    // The set: a slow push in, columns drifting at their own speeds.
    const p = t / 18000;
    wall.style.transform = `rotate(-5deg) scale(${lerp(1.12, 1.2, p)})`;
    cols.forEach((col, c) => { col.style.transform = `translateY(${-p * [26, 42, 30][c] * vw}px)`; });
    wall.style.opacity = clamp(t / 900, 0, 1);
    scrim.style.opacity = t < 6000 ? 0.82 : lerp(0.82, 1.3, clamp((t - 6000) / 800, 0, 1));

    // Cold open: the mark, large, then handed to the top.
    show(brandBig, t, 300, 900, 2300, "translateY(-50%)", { y: 30, scale: 0.9, blur: 12 });
    show(brandTop, t, 2500, 600, null, "", { y: -20, scale: 1, blur: 6 });

    // Three lines, one after another, gone together.
    lines.forEach((el, i) => show(el, t, 2600 + i * 650, 750, 6000, "", { y: 70, scale: 1, blur: 16 }));

    // The two passes.
    show(week, t, 6300, 850, 9900, "translateY(-50%)", { y: 90, scale: 0.92, blur: 18 });
    show(month, t, 10200, 850, 13700, "translateY(-50%)", { y: 90, scale: 0.92, blur: 18 });

    // The close, piece by piece, held to the end.
    ctas.forEach((el, i) => show(el, t, 14000 + i * 220, 700, null, "", { y: 50, scale: 1, blur: 12 }));
  };
  window.__seek(0);
})();
