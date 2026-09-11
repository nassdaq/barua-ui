// Screenshots of the public pages, for before/after comparison.
import { chromium } from "playwright-core";
const out = process.argv[2];
const pages = ["/", "/products", "/login", "/signup", "/developers", "/m/kido/msaada"];
const browser = await chromium.launch({ channel: "chrome", headless: true });
for (const w of [1280, 390]) {
  const page = await browser.newPage({ viewport: { width: w, height: w > 600 ? 900 : 844 } });
  for (const p of pages) {
    await page.goto(`https://barua.tz${p}`, { waitUntil: "networkidle" }).catch(() => {});
    await page.screenshot({ path: `${out}/${w}${p.replace(/\//g, "_") || "_home"}.png`, fullPage: true });
  }
  await page.close();
}
await browser.close();
console.log("saved", pages.length * 2, "screenshots to", out);
