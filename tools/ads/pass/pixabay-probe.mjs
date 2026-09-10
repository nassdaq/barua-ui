import { chromium } from "playwright-core";
import { writeFileSync } from "node:fs";
const browser = await chromium.launch({ channel: "chrome", headless: false });
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, locale: "en-US" });
const page = await ctx.newPage();
const jsonHits = [];
page.on("response", async (r) => {
  const u = r.url();
  const ct = r.headers()["content-type"] ?? "";
  if (/mp3|audio\//.test(u)) jsonHits.push({ kind: "media", u: u.slice(0, 140) });
  else if (ct.includes("json")) { try { const t = await r.text(); if (t.includes(".mp3") || t.includes("audio")) jsonHits.push({ kind: "json", u: u.slice(0, 140), n: t.length }); } catch {} }
});
await page.goto("https://pixabay.com/music/search/cinematic%20trailer/", { waitUntil: "domcontentloaded" });
for (let i = 0; i < 30; i++) { if (!/just a moment/i.test(await page.title())) break; await page.waitForTimeout(1000); }
await page.waitForTimeout(5000);
await page.mouse.wheel(0, 1200); await page.waitForTimeout(2500);
await page.screenshot({ path: "/tmp/pixabay-page.png" });
const info = await page.evaluate(() => {
  const btns = [...document.querySelectorAll("button, [role=button], a")].slice(0, 400)
    .map((b) => ({ tag: b.tagName, aria: b.getAttribute("aria-label"), title: b.getAttribute("title"), cls: (b.className || "").toString().slice(0, 60), text: (b.textContent || "").trim().slice(0, 30), href: b.getAttribute("href")?.slice(0, 60) }))
    .filter((b) => /play|pause|download|audio|track/i.test(`${b.aria} ${b.title} ${b.cls} ${b.text} ${b.href}`));
  const audios = document.querySelectorAll("audio").length;
  const scripts = [...document.scripts].map((s) => s.textContent || "").filter((t) => t.includes(".mp3") || t.includes("audio_"));
  const rows = [...document.querySelectorAll("[class*=track], [class*=audio], [class*=music]")].slice(0, 10).map((e) => ({ cls: e.className.toString().slice(0, 80), text: (e.textContent || "").trim().slice(0, 60) }));
  return { buttons: btns.slice(0, 40), audios, scriptsWithMp3: scripts.length, scriptSample: scripts[0]?.slice(0, 400), rows };
});
console.log(JSON.stringify(info, null, 1).slice(0, 5000));
console.log("network hits:", JSON.stringify(jsonHits.slice(0, 12), null, 1));
await browser.close();
