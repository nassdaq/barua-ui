import { chromium } from "playwright-core";
const [email, password] = process.argv.slice(2);
const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 1000 } });
await page.goto("https://barua.tz/login", { waitUntil: "networkidle" });
await page.waitForTimeout(1500);
await page.fill('input[name="email"]', email);
await page.fill('input[name="password"]', password);
await page.locator('form button[type="submit"]').first().click();
await page.waitForURL((u) => !u.pathname.startsWith("/login"), { timeout: 30000 });
await page.goto("https://barua.tz/admin/senders", { waitUntil: "networkidle" });
const info = await page.evaluate(() => {
  const card = document.querySelector(".b-card--thick");
  const cs = card && getComputedStyle(card);
  return {
    matchesThickRule: card?.matches(".b-has-wallpaper .b-card--thick"),
    hasWallpaperAncestor: !!card?.closest(".b-has-wallpaper"),
    backgroundColor: cs?.backgroundColor,
    backgroundImage: (cs?.backgroundImage ?? "").slice(0, 80),
    thickOnCard: cs?.getPropertyValue("--b-material-thick-bg").trim().slice(0, 80),
    neutralOnCard: cs?.getPropertyValue("--b-material-neutral-bg").trim(),
    sheets: [...document.styleSheets].map((sh) => (sh.href ?? "inline").split("/").pop()),
  };
});
console.log(JSON.stringify(info, null, 2));
await browser.close();
