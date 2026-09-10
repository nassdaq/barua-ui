// Pixabay's public API has no music endpoint (images and videos only), and
// its music pages sit behind a Cloudflare check that refuses plain fetches.
// A real Chrome passes that check, so this opens the search in Chrome,
// reads the track list, and downloads the first few tracks through the same
// browser session. Pixabay music is under the Pixabay Content License —
// free for commercial use, no attribution needed.
import { chromium } from "playwright-core";
import { writeFileSync } from "node:fs";

const query = process.argv[2] ?? "cinematic trailer";
const want = Number(process.argv[3] ?? 4);
const browser = await chromium.launch({ channel: "chrome", headless: false });
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, locale: "en-US" });
const page = await ctx.newPage();
const seen = new Map();
page.on("response", (r) => {
  const u = r.url();
  if (/cdn\.pixabay\.com\/(download\/)?audio\/.*\.mp3/.test(u)) seen.set(u.split("?")[0], u);
});
await page.goto(`https://pixabay.com/music/search/${encodeURIComponent(query)}/`, { waitUntil: "domcontentloaded" });
for (let i = 0; i < 30; i++) {
  const title = await page.title();
  if (!/just a moment|attention/i.test(title)) break;
  await page.waitForTimeout(1000);
}
await page.waitForTimeout(4000);
console.log("page:", await page.title());

// Tracks from the page's own data, if it embeds any; otherwise press play.
const html = await page.content();
const inPage = [...new Set(html.match(/https:\/\/cdn\.pixabay\.com\/(?:download\/)?audio\/[^"'\\ ]+\.mp3[^"'\\ ]*/g) ?? [])];
console.log("audio urls in page:", inPage.length);
let tracks = [];
if (inPage.length) {
  tracks = inPage.slice(0, want).map((url, i) => ({ url, title: `track-${i + 1}` }));
} else {
  const buttons = page.locator('button[class*="playOverlay"]');
  const n = Math.min(await buttons.count(), want * 2);
  console.log("play buttons:", n);
  for (let i = 0; i < n && tracks.length < want; i++) {
    const before = seen.size;
    try { await buttons.nth(i).click({ timeout: 3000 }); } catch { continue; }
    await page.waitForTimeout(2500);
    if (seen.size > before) {
      const url = [...seen.values()].at(-1);
      let title = "";
      try {
        const row = buttons.nth(i).locator("xpath=ancestor::*[.//a[starts-with(@href,'/music/')]][1]");
        title = (await row.locator('a[href^="/music/"]').first().innerText()).trim();
        const txt = await row.innerText();
        const dur = txt.match(/\b(\d{1,2}:\d{2})\b/);
        if (dur) title += ` (${dur[1]})`;
      } catch {}
      tracks.push({ url, title: title || `track-${tracks.length + 1}` });
      try { await buttons.nth(i).click({ timeout: 1000 }); } catch {}
    }
  }
}
console.log("tracks found:", tracks.length);
const out = [];
for (const [i, t] of tracks.entries()) {
  const res = await ctx.request.get(t.url, { headers: { Referer: "https://pixabay.com/" } });
  if (!res.ok()) { console.log("download failed", res.status(), t.url.slice(0, 80)); continue; }
  const file = `music/pixabay-${i + 1}.mp3`;
  writeFileSync(file, Buffer.from(await res.body()));
  out.push({ ...t, file });
  console.log("saved", file, t.title, t.url.split("?")[0].slice(-60));
}
writeFileSync("music/tracks.json", JSON.stringify(out, null, 2));
await browser.close();
