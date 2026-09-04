#!/usr/bin/env node
// Screenshot a page at a true phone width.
//
// `chrome --headless --window-size=390,844 --screenshot` does not do this: a
// desktop window will not shrink below about 500px, so the page is laid out at
// 500 and the capture is cropped to 390 — which looks exactly like a layout
// bug that is not there. This drives Chrome over the DevTools protocol and
// sets the device metrics, which is the only way to get a real 390.
//
//   node tools/shot.mjs <url> <out.png> [width=390] [height=844] [selector]
//
// Prints the viewport, the document's scrollWidth and every element wider than
// the viewport — the honest answer to "does it overflow on a phone".
import { spawn } from "node:child_process";
import { writeFileSync } from "node:fs";
const [url, out, widthArg = "390", heightArg = "844", hash = ""] = process.argv.slice(2);
const width = Number(widthArg), height = Number(heightArg);
const port = 9333 + Math.floor(Math.random() * 500);
const chrome = spawn("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", [
  "--headless=new", "--disable-gpu", `--remote-debugging-port=${port}`,
  `--user-data-dir=/tmp/movieshot/profile-${port}`, "--no-first-run", "about:blank",
], { stdio: "ignore" });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function up() {
  for (let i = 0; i < 60; i++) { try { const r = await fetch(`http://127.0.0.1:${port}/json/version`); if (r.ok) return; } catch {} await sleep(250); }
  throw new Error("chrome did not come up");
}
try {
  await up();
  const target = await (await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, { method: "PUT" })).json();
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((r) => (ws.onopen = r));
  let id = 0; const pending = new Map();
  ws.onmessage = (e) => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); } };
  const send = (method, params = {}) => new Promise((res) => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
  const mobile = width < 700;
  await send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: mobile ? 2 : 1, mobile });
  await send("Page.enable");
  await send("Page.navigate", { url });
  await sleep(4500);
  if (hash) { await send("Runtime.evaluate", { expression: `document.querySelector(${JSON.stringify(hash)})?.scrollIntoView({block:'start'})` }); await sleep(800); }
  const { result } = await send("Runtime.evaluate", { returnByValue: true, expression: `(() => {
    const vw = document.documentElement.clientWidth; const out = [];
    for (const el of document.querySelectorAll('body *')) { const r = el.getBoundingClientRect(); if (r.width > vw + 1 || r.right > vw + 1 && getComputedStyle(el).position !== 'fixed') out.push(el.tagName.toLowerCase() + '.' + [...el.classList].slice(0,3).join('.') + ' w=' + Math.round(r.width) + ' right=' + Math.round(r.right)); }
    return JSON.stringify({ vw, scrollWidth: document.documentElement.scrollWidth, wider: out.slice(0, 12) });
  })()` });
  console.log(result.result.value);
  const shot = await send("Page.captureScreenshot", { format: "png" });
  writeFileSync(out, Buffer.from(shot.result.data, "base64"));
  console.log("wrote", out);
  ws.close();
} finally { chrome.kill(); }
