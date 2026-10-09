// Kit de marque, partie 0 : capture pleine page d'une liste d'URL (pages de référence),
// dans un Chromium sans fenêtre piloté en CDP, comme capture-scene.mjs.
// Pour chaque page : défilement lent jusqu'en bas (images paresseuses, apparitions au défilement),
// retour en haut, calques fixes de la moitié basse de l'écran masqués (fondu flouté qui se poserait
// au milieu de l'image), puis une capture entière et des tranches de 1800 px pour la lecture.
// Un JSON par page : titre, hauteur, texte, polices des textes et images (taille d'origine, place).
// Au-delà de 16 384 px de haut, Chromium tronque la capture entière ; les tranches restent justes.
// Usage : node capture-pages.mjs <navigateur.exe> <dossier profil> <dossier sortie> <url> [<url>...]
// Exemple : node capture-pages.mjs brave.exe /tmp/profil /tmp/ref https://drapz.design/projects/fugitive
import { spawn } from "node:child_process";
import { writeFileSync, mkdirSync } from "node:fs";

const [, , BROWSER, PROFILE, OUTDIR, ...URLS] = process.argv;
mkdirSync(OUTDIR, { recursive: true });
const PORT = 9345, W = 1440, H = 900, TILE = 1800;
const proc = spawn(BROWSER, ["--headless=new", `--remote-debugging-port=${PORT}`, "--remote-allow-origins=*",
  `--user-data-dir=${PROFILE}`, "--no-first-run", "--disable-extensions", "--hide-scrollbars", "about:blank"], { stdio: "ignore" });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
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
const evaluate = async (expr) => (await send("Runtime.evaluate", { expression: expr, returnByValue: true, awaitPromise: true })).result.result.value;
const shoot = async (file, y, h) => {
  const shot = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: true, clip: { x: 0, y, width: W, height: h, scale: 1 } });
  writeFileSync(file, Buffer.from(shot.result.data, "base64"));
};

await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", { width: W, height: H, deviceScaleFactor: 1, mobile: false });
for (const url of URLS) {
  const slug = new URL(url).pathname.split("/").filter(Boolean).pop() || "accueil";
  const loaded = once("Page.loadEventFired");
  await send("Page.navigate", { url }); await loaded;
  await sleep(4000);
  let y = 0, total = await evaluate("document.documentElement.scrollHeight");
  while (y < total) { y += 450; await evaluate(`scrollTo(0, ${y}); true`); await sleep(350);
    total = await evaluate("document.documentElement.scrollHeight"); }
  await sleep(2500);
  await evaluate("scrollTo(0, 0); true"); await sleep(1500);
  const masques = await evaluate(`(() => { const l = []; for (const el of document.querySelectorAll('body *')) {
    if (getComputedStyle(el).position !== 'fixed') continue; const r = el.getBoundingClientRect();
    if (r.top > innerHeight * 0.5) { el.style.setProperty('display', 'none', 'important'); l.push(el.tagName + ' ' + Math.round(r.top) + ' ' + Math.round(r.height)); } }
    return l; })()`);
  await sleep(300);
  const full = await evaluate("document.documentElement.scrollHeight");
  await shoot(`${OUTDIR}/${slug}-entier.png`, 0, full);
  for (let k = 0; k * TILE < full; k++) await shoot(`${OUTDIR}/${slug}-${String(k).padStart(2, "0")}.png`, k * TILE, Math.min(TILE, full - k * TILE));
  const info = await evaluate(`(() => {
    const fonts = new Map();
    for (const el of document.querySelectorAll('body *')) {
      if (![...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) continue;
      const cs = getComputedStyle(el); const k = cs.fontFamily.split(',')[0].trim() + ' ' + cs.fontWeight + ' ' + cs.fontSize + ' / ' + cs.lineHeight + ' / ' + cs.letterSpacing;
      fonts.set(k, (fonts.get(k) || 0) + 1);
    }
    const box = (e) => e.getBoundingClientRect();
    const imgs = [...document.images].map((i) => ({ src: i.currentSrc || i.src, nat: i.naturalWidth + 'x' + i.naturalHeight,
      vue: Math.round(box(i).width) + 'x' + Math.round(box(i).height), y: Math.round(box(i).top + scrollY) }));
    return { titre: document.title, hauteur: document.documentElement.scrollHeight, fonts: [...fonts].sort((a, b) => b[1] - a[1]), imgs, texte: document.body.innerText };
  })()`);
  writeFileSync(`${OUTDIR}/${slug}.json`, JSON.stringify(info, null, 1));
  console.log(slug, W + " × " + full, Math.ceil(full / TILE) + " tranches", info.imgs.length + " images", "masqués : " + JSON.stringify(masques));
}
ws.close(); proc.kill();
