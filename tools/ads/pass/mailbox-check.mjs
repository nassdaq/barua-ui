// Opens the mailboxes screen with a throwaway admin account and photographs
// the card, then the shared dialog, so the change can be judged by eye.
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

await page.goto("https://barua.tz/settings/mailboxes", { waitUntil: "networkidle" });
await page.waitForTimeout(1500);
await page.screenshot({ path: "/tmp/mailboxes-cards.png", fullPage: true });
console.log("cards:", (await page.locator(".b-card").count()), "| Manage buttons:", await page.getByRole("button", { name: /manage/i }).count());

const manage = page.getByRole("button", { name: /manage/i }).first();
if (await manage.count()) {
  await manage.click();
  await page.waitForTimeout(1200);
  await page.screenshot({ path: "/tmp/mailboxes-dialog.png", fullPage: true });
  const dialog = page.locator('[data-slot="dialog-content"]');
  console.log("dialog open:", await dialog.count() > 0);
  console.log("dialog holds:", (await dialog.innerText()).replace(/\s+/g, " ").slice(0, 220));
} else {
  console.log("no Manage button found");
}
await browser.close();
