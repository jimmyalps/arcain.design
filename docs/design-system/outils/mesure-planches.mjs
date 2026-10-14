// Kit de marque, partie 0 : mesure des planches d'une page de référence capturée par capture-pages.mjs.
// Pour chaque planche : couleur du fond (médiane des quatre coins), boîte du contenu (tout pixel qui
// s'écarte du fond de plus de 28 sur un canal), marges et part du cadre occupée, en %, et écarts
// verticaux entre objets (colonnes vides d'au moins 4 px). Lu pixel par pixel dans un canevas du
// navigateur, sur l'image servie en 2048 px de large. Ne vaut que pour une planche à fond uni.
// Une planche est une image affichée sur toute la largeur du contenu (1000 px et plus) : les vignettes
// des projets suivants sont écartées. L'indice compte les planches de la page à partir de 0.
// Usage : node mesure-planches.mjs <navigateur.exe> <dossier profil> <dossier des JSON> <page:indice> ...
// Exemple : node mesure-planches.mjs brave.exe /tmp/profil /tmp/ref un-projet:1 un-projet:2 un-projet:3
import { spawn } from "node:child_process";
import { readFileSync } from "node:fs";

const [, , BROWSER, PROFILE, JDIR, ...CIBLES] = process.argv;
const PORT = 9346;
const proc = spawn(BROWSER, ["--headless=new", `--remote-debugging-port=${PORT}`, "--remote-allow-origins=*",
  `--user-data-dir=${PROFILE}`, "--no-first-run", "--disable-extensions", "about:blank"], { stdio: "ignore" });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let wsUrl;
for (let i = 0; i < 80 && !wsUrl; i++) {
  try { wsUrl = (await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json()).find((t) => t.type === "page")?.webSocketDebuggerUrl; } catch {}
  if (!wsUrl) await sleep(250);
}
const ws = new WebSocket(wsUrl);
await new Promise((r) => ws.addEventListener("open", r, { once: true }));
let seq = 0; const pend = new Map();
ws.addEventListener("message", (e) => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } });
const send = (method, params = {}) => new Promise((r) => { const id = ++seq; pend.set(id, r); ws.send(JSON.stringify({ id, method, params })); });

// Exécutée dans la page : l'image est lue par fetch (le CDN répond avec access-control-allow-origin: *).
const mesure = async (url) => {
  const b = await (await fetch(url)).blob(); const bmp = await createImageBitmap(b);
  const c = new OffscreenCanvas(bmp.width, bmp.height); const x = c.getContext("2d"); x.drawImage(bmp, 0, 0);
  const { data, width: W, height: H } = x.getImageData(0, 0, bmp.width, bmp.height);
  const pts = [];
  for (const [ci, cj] of [[2, 2], [W - 10, 2], [2, H - 10], [W - 10, H - 10]])
    for (let a = 0; a < 8; a++) for (let d = 0; d < 8; d++) { const k = ((cj + d) * W + ci + a) * 4; pts.push([data[k], data[k + 1], data[k + 2]]); }
  const bg = [0, 1, 2].map((ch) => pts.map((p) => p[ch]).sort((m, n) => m - n)[pts.length >> 1]);
  const col = new Float32Array(W), row = new Float32Array(H);
  for (let j = 0; j < H; j++) for (let i = 0; i < W; i++) { const k = (j * W + i) * 4;
    if (Math.max(Math.abs(data[k] - bg[0]), Math.abs(data[k + 1] - bg[1]), Math.abs(data[k + 2] - bg[2])) > 28) { col[i]++; row[j]++; } }
  for (let i = 0; i < W; i++) col[i] /= H; for (let j = 0; j < H; j++) row[j] /= W;
  const first = (a, t) => a.findIndex((v) => v > t);
  const last = (a, t) => { for (let i = a.length - 1; i >= 0; i--) if (a[i] > t) return i; return -1; };
  const L = first(col, .005), R = last(col, .005), T = first(row, .005), B = last(row, .005);
  const runs = (a, s0, z) => { const o = []; let s = -1; for (let i = s0; i <= z; i++) { const e = a[i] < .002;
    if (e && s < 0) s = i; if (!e && s >= 0) { if (i - s >= 4) o.push(i - s); s = -1; } } return o; };
  const pc = (v) => Math.round(v * 1000) / 10;
  return { taille: W + "x" + H, fond: "#" + bg.map((v) => v.toString(16).padStart(2, "0")).join(""),
    marges: { g: pc(L / W), d: pc((W - 1 - R) / W), h: pc(T / H), b: pc((H - 1 - B) / H) },
    contenu: { l: pc((R - L + 1) / W), h: pc((B - T + 1) / H) }, ecartsX: runs(col, L, R).map((n) => pc(n / W)) };
};

for (const cible of CIBLES) {
  const [slug, n] = cible.split(":");
  const j = JSON.parse(readFileSync(`${JDIR}/${slug}.json`, "utf8"));
  const img = j.imgs.filter((i) => parseInt(i.vue) >= 1000)[+n];
  const u = new URL(img.src); u.searchParams.set("scale-down-to", "2048");
  const r = await send("Runtime.evaluate", { expression: `(${mesure.toString()})(${JSON.stringify(u.href)})`, awaitPromise: true, returnByValue: true });
  console.log(cible.padEnd(12), JSON.stringify(r.result.result.value ?? r.result.exceptionDetails?.exception?.description));
}
ws.close(); proc.kill();
