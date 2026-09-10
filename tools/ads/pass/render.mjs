// Films the ad page frame by frame and hands the frames to ffmpeg.
//
// The page drives every animation from one clock (window.__seek), so a
// frame is a pure function of its time: no dropped frames, no timing
// jitter, the same video every run. Usage:
//   node render.mjs --w 1080 --h 1920 --fps 30 --dur 18 --out Derosc-pasi-9x16.mp4
import { chromium } from "playwright-core";
import { mkdirSync, rmSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { resolve } from "node:path";

const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > 0 ? process.argv[i + 1] : d; };
const W = Number(arg("w", 1080)), H = Number(arg("h", 1920)), FPS = Number(arg("fps", 30)), DUR = Number(arg("dur", 18));
const OUT = arg("out", `ad-${W}x${H}.mp4`);
const scale = Number(arg("scale", 1));
const frames = resolve("frames"); rmSync(frames, { recursive: true, force: true }); mkdirSync(frames);

const launch = process.env.PW_CHANNEL
  ? { channel: process.env.PW_CHANNEL, headless: true }
  : { executablePath: process.env.PW_EXE, headless: true };
const browser = await chromium.launch(launch);
const page = await browser.newPage({ viewport: { width: Math.round(W / scale), height: Math.round(H / scale) }, deviceScaleFactor: scale });
await page.goto(`file://${resolve("index.html")}?w=${W}&h=${H}`);
await page.evaluate(async () => {
  await document.fonts.ready;
  await Promise.all([...document.images].map((i) => i.complete ? null : new Promise((r) => { i.onload = i.onerror = r; })));
  window.__seek(0);
});

const preview = arg("preview", "");
if (preview) {
  for (const sec of preview.split(",").map(Number)) {
    await page.evaluate((t) => window.__seek(t), sec * 1000);
    await page.screenshot({ path: `preview-${W}x${H}-${sec}s.png`, type: "png" });
  }
  await browser.close();
  console.log("previews written");
  process.exit(0);
}
const total = Math.round(DUR * FPS);
const t0 = Date.now();
for (let f = 0; f < total; f++) {
  await page.evaluate((t) => window.__seek(t), (f / FPS) * 1000);
  await page.screenshot({ path: `${frames}/f${String(f).padStart(4, "0")}.png`, type: "png" });
  if (f % (FPS * 3) === 0) console.log(`frame ${f}/${total} (${((Date.now() - t0) / 1000).toFixed(0)}s)`);
}
await browser.close();

execFileSync("ffmpeg", ["-y", "-v", "error", "-framerate", String(FPS), "-i", `${frames}/f%04d.png`,
  "-c:v", "libx264", "-profile:v", "high", "-preset", "slow", "-crf", "18", "-pix_fmt", "yuv420p",
  "-movflags", "+faststart", "-r", String(FPS), OUT]);
console.log("wrote", OUT);
