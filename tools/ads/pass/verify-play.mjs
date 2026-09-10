// Proves the player streams (HLS through MSE) rather than loading the whole
// file, using a pass inserted straight into the database. Run from the
// tools/ads/pass folder so playwright-core resolves.
import { chromium } from "playwright-core";
const [token, movieId] = process.argv.slice(2);
const browser = await chromium.launch({ channel: "chrome", headless: true });
const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const page = await ctx.newPage();
const seg = [];
page.on("response", (r) => {
  const u = r.url();
  if (/r2\.cloudflarestorage\.com/.test(u)) seg.push({ status: r.status(), cors: r.headers()["access-control-allow-origin"] ?? "-", u: u.split("?")[0].slice(-40) });
});
await page.goto(`https://derosc.com/api/m/pass/enter?t=${encodeURIComponent(token)}&m=${movieId}`, { waitUntil: "domcontentloaded" });
console.log("landed:", page.url().replace(token, "<token>"));
await page.waitForSelector("video", { timeout: 15000 });
await page.waitForTimeout(2500);
await page.click(".b-video__play").catch(() => page.click("video"));
await page.waitForTimeout(9000);
const state = await page.evaluate(() => {
  const v = document.querySelector("video");
  return { currentSrc: (v.currentSrc || "").slice(0, 40), currentTime: v.currentTime.toFixed(1), readyState: v.readyState, paused: v.paused, error: v.error?.code ?? null, note: document.querySelector(".b-text-danger")?.textContent ?? null };
});
console.log("video:", JSON.stringify(state));
console.log("storage responses:", seg.length, "first:", JSON.stringify(seg.slice(0, 3)));
const file = await page.request.get(`https://derosc.com/api/m/file/${token}/${movieId}`, { maxRedirects: 0 });
console.log("whole-file route (should be gone):", file.status(), (await file.text()).slice(0, 60));
await browser.close();
