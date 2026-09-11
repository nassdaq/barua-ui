import { chromium } from "playwright-core";
const id = process.argv[2];
const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await page.goto(`https://www.mail-tester.com/test-${id}`, { waitUntil: "domcontentloaded" });
await page.waitForTimeout(8000);
const text = await page.evaluate(() => document.body.innerText);
const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
const score = lines.find((l) => /^-?\d+(\.\d+)?\s*\/\s*10$/.test(l) || /\/10\b/.test(l));
console.log("score:", score ?? "not found");
if (/not (yet )?received|haven't received|didn't receive/i.test(text)) console.log("STATUS: message not received yet");
for (const key of ["SPF", "DKIM", "DMARC", "reverse", "PTR", "blacklist", "Message-ID", "authenticated"]) {
  const hit = lines.find((l) => l.toLowerCase().includes(key.toLowerCase()) && l.length > 12 && l.length < 180 && !/Checker|Generator|Generate/.test(l));
  if (hit) console.log(`[${key}] ${hit}`);
}
await page.screenshot({ path: "/tmp/mt.png", fullPage: false });
await browser.close();
