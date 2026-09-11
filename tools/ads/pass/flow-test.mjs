// Walks the product-first journey in real Chrome: product page → Start with
// Movies → sign up → name the workspace → land in Movies with only Movies in
// the frame. Prints what it sees at each step. The account is throwaway and
// is removed from the database afterwards by the caller.
import { chromium } from "playwright-core";
const [email, password] = process.argv.slice(2);
const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const step = (name, extra = "") => console.log(`[${name}] ${page.url()} ${extra}`);

await page.goto("https://barua.tz/products", { waitUntil: "domcontentloaded" });
step("products", `| cards: ${await page.locator("section.lp-product").count()}`);
await page.locator('a[href="/start/movies"]').first().click();
await page.waitForURL(/\/signup/, { timeout: 20000 });
step("signup", `| title: ${await page.locator("h1").first().innerText()}`);

await page.fill("#name", "Flow Test");
await page.fill('input[name="email"]', email);
await page.fill('input[name="password"]', password);
await page.check('input[name="terms"]');
await page.locator('form button[type="submit"]').first().click();
try {
  await page.waitForURL(/\/setup/, { timeout: 30000 });
} catch {
  const text = (await page.locator("main").innerText()).replace(/\s+/g, " ").slice(0, 400);
  await page.screenshot({ path: "/tmp/flow-signup.png" });
  console.log("[signup did not advance] url:", page.url(), "| page says:", text);
  await browser.close(); process.exit(2);
}
const subtitle = await page.locator(".b-auth-card__subtitle").first().innerText().catch(() => "?");
const hiddenProduct = await page.locator('form input[name="product"]').first().inputValue().catch(() => "(none)");
step("setup", `| title: ${await page.locator("h1").first().innerText()} | subtitle: ${subtitle} | form product=${hiddenProduct}`);

await page.fill("#businessName", "Flow Test Films");
await page.locator('form button[type="submit"]').first().click();
try {
  await page.waitForURL(/\/movies/, { timeout: 30000 });
} catch {
  const text = (await page.locator("main").innerText().catch(() => "")).replace(/\s+/g, " ").slice(0, 300);
  await page.screenshot({ path: "/tmp/flow-setup.png" });
  console.log("[setup did not advance] url:", page.url(), "| page says:", text);
  await browser.close(); process.exit(3);
}
await page.waitForTimeout(1500);
const navs = (await page.locator("nav").allInnerTexts()).map((t) => t.replace(/\s+/g, " ").trim()).filter(Boolean);
await page.screenshot({ path: "/tmp/flow-landed.png" });
step("landed", `| navs: ${JSON.stringify(navs)}`);
await browser.close();
