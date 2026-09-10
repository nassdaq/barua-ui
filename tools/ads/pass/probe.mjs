import { chromium } from "playwright-core";
const tries = [
  { name: "chrome channel", opts: { channel: "chrome", headless: true } },
  { name: "cached chromium", opts: { executablePath: process.env.HOME + "/Library/Caches/ms-playwright/chromium-1208/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing", headless: true } },
];
for (const t of tries) {
  try {
    const b = await chromium.launch(t.opts);
    const p = await b.newPage({ viewport: { width: 200, height: 100 } });
    await p.setContent("<b>ok</b>");
    await p.screenshot({ path: "/tmp/probe.png" });
    console.log("launched via", t.name, await b.version());
    await b.close();
    break;
  } catch (e) { console.log("failed:", t.name, String(e.message).split("\n")[0]); }
}
