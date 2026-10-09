// Kit de marque, partie 1 : aperçu local de tuiles SVG, chacune répétée en
// 2 × 2 (les raccords se croisent au centre), couleurs et opacités cuites dans
// une copie du SVG. Rendu en PNG par le navigateur sans fenêtre (CDP).
// C'est l'outil qui a servi à comparer les échelles et les deux méthodes de
// raccord des courbes avant l'import dans Figma.
// Usage : node apercu-tuiles.mjs <navigateur.exe> <dossier profil> <sortie.png> <tuile.svg:fond:trait:opacité[:opacité des maîtresses]> ...
// Exemple : node apercu-tuiles.mjs brave.exe /tmp/profil apercu.png courbes-everest.svg:#F5F5F5:#111111:.4 courbes-montblanc.svg:#111111:#F5F5F5:.28:.75
import { spawn } from "node:child_process";
import { readFileSync, writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

const [, , BROWSER, PROFILE, OUT, ...ITEMS] = process.argv;
const PORT = 9347;

let html = '<html><body style="margin:0;background:#888;font:12px monospace">', W = 0, H = 0;
for (const it of ITEMS) {
  // Le chemin peut contenir « : » (C:/…) : on lit les couleurs et opacités par la fin.
  const [, f, fond, trait, op, opm] = it.match(/^(.+):(#[0-9A-Fa-f]{6}):(#[0-9A-Fa-f]{6}):([\d.]+)(?::([\d.]+))?$/);
  let s = readFileSync(f, "utf8").replace(/stroke="#000"/g, `stroke="${trait}"`);
  s = s.replace(/id="(courbes|trace)"/, `id="$1" stroke-opacity="${op}"`).replace('id="maitresses"', `id="maitresses" stroke-opacity="${opm || op}"`);
  const w = +s.match(/width="([\d.]+)"/)[1], h = +s.match(/height="([\d.]+)"/)[1];
  const uri = "data:image/svg+xml;base64," + Buffer.from(s).toString("base64");
  html += `<div style="display:inline-block;margin:8px;vertical-align:top"><div>${f.split(/[\\/]/).pop()}</div>` +
    `<div style="width:${w * 2}px;height:${h * 2}px;background:${fond} url(${uri}) repeat;background-size:${w}px ${h}px"></div></div>`;
  W += w * 2 + 16; H = Math.max(H, h * 2 + 40);
}
const page = join(mkdtempSync(join(tmpdir(), "apercu-")), "apercu.html");
writeFileSync(page, html + "</body></html>");

const proc = spawn(BROWSER, ["--headless=new", `--remote-debugging-port=${PORT}`, "--remote-allow-origins=*",
  `--user-data-dir=${PROFILE}`, "--no-first-run", "--disable-extensions", "--hide-scrollbars", "about:blank"], { stdio: "ignore" });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
try {
  let wsUrl;
  for (let i = 0; i < 80 && !wsUrl; i++) {
    try { wsUrl = (await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json()).find((t) => t.type === "page")?.webSocketDebuggerUrl; } catch {}
    if (!wsUrl) await sleep(250);
  }
  const ws = new WebSocket(wsUrl);
  await new Promise((r) => ws.addEventListener("open", r, { once: true }));
  let seq = 0; const pend = new Map(), waiters = [];
  ws.addEventListener("message", (e) => { const m = JSON.parse(e.data);
    if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); }
    else if (m.method) waiters.filter((w) => w.m === m.method).forEach((w) => { w.r(m); waiters.splice(waiters.indexOf(w), 1); }); });
  const send = (method, params = {}) => new Promise((r) => { const id = ++seq; pend.set(id, r); ws.send(JSON.stringify({ id, method, params })); });
  const once = (m) => new Promise((r) => waiters.push({ m, r }));
  await send("Page.enable");
  await send("Emulation.setDeviceMetricsOverride", { width: Math.ceil(W + 16), height: Math.ceil(H + 16), deviceScaleFactor: 1, mobile: false });
  const loaded = once("Page.loadEventFired");
  await send("Page.navigate", { url: pathToFileURL(page).href }); await loaded;
  await sleep(600);
  const shot = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: true });
  writeFileSync(OUT, Buffer.from(shot.result.data, "base64"));
  console.log(OUT);
  ws.close();
} finally { proc.kill(); }
