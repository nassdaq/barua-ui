// The journey a real customer now takes: /start/mail → sign up → setup →
// land in the mailbox, with the free month already switched on.
import { chromium } from "playwright-core";
const [email, password, domainName] = process.argv.slice(2);
const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 1000 } });

async function dismissInstallPrompt() {
  const b = page.getByRole("button", { name: /not now|don.t ask again/i }).first();
  if (await b.isVisible().catch(() => false)) { await b.click().catch(() => {}); await page.waitForTimeout(300); }
}

await page.goto("https://barua.tz/start/mail", { waitUntil: "networkidle" });
await page.waitForTimeout(2000);
console.log("after /start/mail:", new URL(page.url()).pathname);
await page.fill("#name", "Trial Check");
await page.fill('input[name="email"]', email);
await page.fill('input[name="password"]', password);
await page.check('input[name="terms"]');
await page.locator('form button[type="submit"]').first().click();
await page.waitForURL(/\/setup/, { timeout: 30000 });
console.log("reached setup");

await page.waitForTimeout(1200);
await dismissInstallPrompt();
await page.fill("#businessName", "Trial Check Ltd");
if (await page.locator("#domainName").isVisible().catch(() => false)) await page.fill("#domainName", domainName);
if (await page.locator("#localPart").isVisible().catch(() => false)) await page.fill("#localPart", "info");
await page.locator('form button[type="submit"]').first().click();
await page.waitForURL((u) => !u.pathname.startsWith("/setup"), { timeout: 40000 });
await page.waitForTimeout(1500);
await dismissInstallPrompt();
console.log("landed on:", new URL(page.url()).pathname);

const body = (await page.locator("body").innerText().catch(() => "")).replace(/\s+/g, " ");
console.log("rail shows:", body.slice(0, 180));
await page.screenshot({ path: "/tmp/trial-landing.png", fullPage: true });
await browser.close();
