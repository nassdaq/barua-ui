// Signed-in screenshots: makes a throwaway Movies workspace, then captures
// the pages a signed-in person sees. The account is left for the after-run
// and removed at the end of the migration.
import { chromium } from "playwright-core";
const [out, email, password, mode] = process.argv.slice(2);
const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
if (mode === "create") {
  await page.goto("https://barua.tz/start/movies", { waitUntil: "networkidle" });
  // The form is a client component: give hydration a moment or the browser
  // submits it natively as a GET and nothing is created.
  await page.waitForTimeout(2000);
  await page.fill("#name", "UI Baseline"); await page.fill('input[name="email"]', email); await page.fill('input[name="password"]', password);
  await page.check('input[name="terms"]'); await page.locator('form button[type="submit"]').first().click();
  await page.waitForURL(/\/setup/, { timeout: 30000 });
  await page.fill("#businessName", "UI Baseline Films"); await page.locator('form button[type="submit"]').first().click();
  await page.waitForURL(/\/movies/, { timeout: 30000 });
} else {
  await page.goto("https://barua.tz/login", { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);
  await page.fill('input[name="email"]', email); await page.fill('input[name="password"]', password);
  await page.locator('form button[type="submit"]').first().click();
  await page.waitForURL((u) => !u.pathname.startsWith("/login"), { timeout: 30000 });
}
const pages = ["/apps", "/apps/choose", "/movies", "/settings/profile", "/settings/api", "/settings/payments", "/settings/mailboxes", "/settings/appearance", "/domains", "/render", "/photos"];
for (const p of pages) {
  await page.goto(`https://barua.tz${p}`, { waitUntil: "networkidle" }).catch(() => {});
  await page.screenshot({ path: `${out}/in${p.replace(/\//g, "_")}.png`, fullPage: true });
}
await browser.close();
console.log("saved", pages.length, "signed-in screenshots to", out);
