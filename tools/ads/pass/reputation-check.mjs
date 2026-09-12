// Photographs the two new reputation screens: the customer's deliverability
// page, and the operator's sender queue. Needs an account that administers a
// tenant; the operator page additionally needs a platform admin.
import { chromium } from "playwright-core";
const [email, password] = process.argv.slice(2);
const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 1000 } });

await page.goto("https://barua.tz/login", { waitUntil: "networkidle" });
await page.waitForTimeout(2000);
await page.fill('input[name="email"]', email);
await page.fill('input[name="password"]', password);
await page.locator('form button[type="submit"]').first().click();
await page.waitForURL((u) => !u.pathname.startsWith("/login"), { timeout: 30000 });

// The install-app prompt covers whatever we came to photograph.
async function dismissInstallPrompt() {
  const notNow = page.getByRole("button", { name: /not now|don.t ask again/i }).first();
  if (await notNow.isVisible().catch(() => false)) {
    await notNow.click().catch(() => {});
    await page.waitForTimeout(400);
  }
}
await dismissInstallPrompt();

for (const [name, path] of [
  ["deliverability", "/settings/deliverability"],
  ["sender queue", "/admin/senders"],
]) {
  const response = await page.goto(`https://barua.tz${path}`, { waitUntil: "networkidle" }).catch(() => null);
  await dismissInstallPrompt();
  await page.waitForTimeout(1200);
  const status = response?.status() ?? 0;
  const heading = await page.locator("h1, .b-card__title").first().innerText().catch(() => "(none)");
  const body = (await page.locator("main, body").first().innerText().catch(() => "")).replace(/\s+/g, " ");
  console.log(`[${name}] ${status} ${new URL(page.url()).pathname} | heading: ${heading}`);
  console.log(`   reads: ${body.slice(0, 200)}`);
  await page.screenshot({ path: `/tmp/rep-${name.replace(/\s+/g, "-")}.png`, fullPage: true });
}
await browser.close();
