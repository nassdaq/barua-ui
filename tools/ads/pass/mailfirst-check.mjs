// Signs in with a throwaway account that has a mailbox, and photographs
// (a) where sign-in lands, (b) the rail, (c) the composer's Drive picker.
import { chromium } from "playwright-core";
const [email, password] = process.argv.slice(2);
const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

await page.goto("https://barua.tz/login", { waitUntil: "networkidle" });
await page.waitForTimeout(2000);
await page.fill('input[name="email"]', email);
await page.fill('input[name="password"]', password);
await page.locator('form button[type="submit"]').first().click();
await page.waitForURL((u) => !u.pathname.startsWith("/login"), { timeout: 30000 });
await page.waitForTimeout(2500);
console.log("sign-in landed on:", new URL(page.url()).pathname);

const nav = await page.locator("nav.app-shell__nav").innerText().catch(() => "(no rail)");
console.log("rail reads:", nav.replace(/\s+/g, " ").trim());
await page.screenshot({ path: "/tmp/mailfirst-landing.png", fullPage: false });

// Open the composer and look for the Drive button.
const compose = page.locator('button:has-text("Compose"), a:has-text("Compose"), [aria-label*="ompose"]').first();
if (await compose.count()) {
  await compose.click();
  await page.waitForTimeout(1500);
  const drive = page.getByRole("button", { name: /from drive/i });
  console.log("From Drive button present:", (await drive.count()) > 0);
  await page.screenshot({ path: "/tmp/mailfirst-composer.png", fullPage: false });
  if (await drive.count()) {
    await drive.first().click();
    await page.waitForTimeout(1800);
    const dialog = page.locator('[data-slot="dialog-content"]');
    console.log("drive dialog:", (await dialog.innerText().catch(() => "(none)")).replace(/\s+/g, " ").slice(0, 160));
    await page.screenshot({ path: "/tmp/mailfirst-drive.png", fullPage: false });
  }
} else {
  console.log("no compose button found");
}
await browser.close();
