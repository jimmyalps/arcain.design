// Kit de marque, direction : les courbes de niveau du site rendues hors du
// site, pour les planches du kit. Le site n'est ni modifié ni chargé : le
// script relit ses données et refait ses calculs.
//
// Quatre reliefs, mêmes données et mêmes algorithmes que le code :
//   - everest : public/evdata.json décodé comme Everest.js (terrain de 256
//     unités de large, exagération 1,30), une courbe tous les 90 m, marching
//     squares d'Everest.js. Sur le site : trait encre .4. En option, les six
//     drapeaux de data/evmarks.json, mât et fanion bleus tournés vers la
//     caméra comme le code les tourne ;
//   - montblanc : public/mbdata.json décodé comme Benefits.js (9,4 × 5,6
//     unités, hauteur 3,05, puissance 1,05), 72 niveaux de .12 à .98, une
//     maîtresse sur cinq, table de cas de Benefits.js, voie royale posée sur le
//     relief comme le code la pose. Sur le site : papier .28, maîtresses .75,
//     voie royale bleue .95 ;
//   - lac : public/lacdata.json décodé comme Lake3D.js (7,6 × 7,6 unités,
//     hauteur 1,7), 34 niveaux de .012 à .96, une maîtresse sur cinq, même
//     table de cas ; hachures d'eau sur une ligne de grille sur deux, au niveau
//     du lac, comme le code les pose. Sur le site : papier .26, maîtresses .6,
//     eau bleue .55 ;
//   - logo : le logo d'app/icon.svg pris comme un relief, vu de dessus. Le
//     masque d'abord, comme le site l'applique : les cinq branches débordent
//     du cercle de découpe (rect 1140, rx 570) et sont coupées par lui. Le
//     champ est la distance signée au contour de la forme coupée : ses courbes
//     de niveau sont les contours décalés, une maîtresse sur cinq, le contour
//     lui-même compris.
//
// Caméra : celle de Three.js (PerspectiveCamera : champ vertical en degrés,
// lookAt, axe y en haut). Fondu de profondeur : celui de THREE.Fog en r128,
// facteur smoothstep(near, far, profondeur) vers la couleur du fond. Le fond
// est posé à part (dans Figma) : un trait d'opacité a fondu de f vers son fond
// vaut, posé sur ce fond, un trait d'opacité a × (1 − f). Le fondu est donc
// rendu en opacité, et le rendu se pose sur n'importe quel fond.
//
// Sorties : <sortie>.svg, un chemin par niveau d'opacité, trait de `trait` px
// à la taille du cadre ; <sortie>.png, rendu par le navigateur sans fenêtre à
// l'échelle `echelle`, fond transparent sauf `fond=`. Le trait suit l'échelle :
// 1 px à l'échelle 1, 2 px à l'échelle 2, comme une ligne WebGL d'un pixel sur
// un écran de cette densité. Affiche les mesures en JSON.
//
// Usage :
//   node rendu-courbes.mjs <racine du dépôt> <navigateur.exe> <dossier profil>
//        <sortie sans extension> <everest|montblanc|lac|logo> [clé=valeur ...]
// Clés communes : cadre=1920x1080, echelle=2, trait=1,
//   couleur=papier|encre|bleu, opacite, maitresse, fond=papier|encre|bleu,
//   simplifier (px : écart toléré entre une courbe et sa corde, défaut 0 ;
//   0,1 allège le SVG pour Figma sans changer le dessin), decimales (défaut 2)
// Reliefs : camera=x,y,z, cible=x,y,z, fov, brouillard=near,far|non,
//   decalage (translation verticale de la scène, comme scene.position.y),
//   trace (opacité de la voie royale, 0 pour l'ôter ; montblanc seulement),
//   eau (opacité des hachures, 0 pour les ôter ; lac seulement),
//   drapeaux (opacité des six drapeaux, défaut 0 ; everest seulement)
// Logo : centre=x,y (px), diametre (px), pas (px entre deux courbes),
//   dehors (courbes hors du logo, en fondu ; défaut 0), rotation (degrés,
//   par pas de 72), maille (px du champ, défaut 2)
import { spawn } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const [, , ROOT, BROWSER, PROFILE, OUT, RECETTE, ...ARGS] = process.argv;
const PORT = 9348;
const opt = Object.fromEntries(ARGS.map((a) => [a.slice(0, a.indexOf("=")), a.slice(a.indexOf("=") + 1)]));
const PALETTE = { papier: "#F5F5F5", encre: "#111111", bleu: "#1E29FF" };
const num = (k, d) => (opt[k] === undefined ? d : +opt[k]);
const vec = (k, d) => (opt[k] === undefined ? d : opt[k].split(",").map(Number));
const couleur = (k, d) => {
  const c = opt[k] === undefined ? d : opt[k];
  if (c && !PALETTE[c]) throw new Error(`${k}=${c} : la palette est fermée (papier, encre, bleu)`);
  return c && PALETTE[c];
};
const [W, H] = (opt.cadre || "1920x1080").split("x").map(Number);
const ECH = num("echelle", 2), TRAIT = num("trait", 1);
const D36 = "0123456789abcdefghijklmnopqrstuvwxyz";

/* ---- Everest : Everest.js, décodage et marching squares ----------------- */
function everest() {
  const EV = JSON.parse(readFileSync(ROOT + "/public/evdata.json", "utf8"));
  const SIZE = 256, EXAG = 1.30, INTERVAL = 90;
  const N = EV.n, EMIN = EV.min, RANGE = EV.max - EV.min;
  const HS = (RANGE / EV.wMeters) * SIZE * EXAG;
  const LUT = {}; D36.split("").forEach((c, i) => { LUT[c] = i; });
  const E = new Float32Array(N * N);
  let colStart = 0;
  for (let y = 0; y < N; y++) {
    let acc = 0;
    for (let x = 0; x < N; x++) {
      const k = y * N + x;
      const delta = (LUT[EV.d[2 * k]] * 36 + LUT[EV.d[2 * k + 1]]) - 648;
      if (x === 0) { colStart += delta; acc = colStart; } else acc += delta;
      E[k] = EMIN + (acc / EV.steps) * RANGE;
    }
  }
  const hOf = (m) => ((m - EMIN) / RANGE) * HS;
  const xOf = (g) => (g / (N - 1) - 0.5) * SIZE, zOf = xOf;
  const segs = [];
  for (let L = Math.ceil(EMIN / INTERVAL) * INTERVAL; L < EV.max; L += INTERVAL) {
    const cut = (x0, y0, v0, x1, y1, v1, e) => {
      const f = (L - v0) / (v1 - v0);
      e.push([xOf(x0 + (x1 - x0) * f), hOf(L), zOf(y0 + (y1 - y0) * f)]);
    };
    for (let y = 0; y < N - 1; y++) for (let x = 0; x < N - 1; x++) {
      const a = E[y * N + x], b = E[y * N + x + 1], c = E[(y + 1) * N + x + 1], d = E[(y + 1) * N + x];
      const cs = (a > L ? 8 : 0) | (b > L ? 4 : 0) | (c > L ? 2 : 0) | (d > L ? 1 : 0);
      if (cs === 0 || cs === 15) continue;
      const e = [];
      if ((cs & 8) !== ((cs & 4) << 1)) cut(x, y, a, x + 1, y, b, e);
      if ((cs & 4) !== ((cs & 2) << 1)) cut(x + 1, y, b, x + 1, y + 1, c, e);
      if ((cs & 2) !== ((cs & 1) << 1)) cut(x + 1, y + 1, c, x, y + 1, d, e);
      if (((cs & 1) << 3) !== (cs & 8)) cut(x, y + 1, d, x, y, a, e);
      for (let i = 0; i + 1 < e.length; i += 2) segs.push([e[i], e[i + 1], false]);
    }
  }
  // Les six sommets, posés comme markPos dans Everest.js.
  const marques = JSON.parse(readFileSync(ROOT + "/data/evmarks.json", "utf8"))
    .map((m) => ({ k: m.k, alt: m.alt, p: [xOf(m.x), hOf(m.e), zOf(m.y)] }));
  // Vue d'ensemble du code (avant la descente vers le camp de base).
  return { segs, trace: [], marques, far: 900, defauts: {
    camera: [0, HS * 1.05 + 22, SIZE * 0.6], cible: [0, HS * 0.35, 0], fov: 46,
    brouillard: [110, 340], couleur: "encre", opacite: 0.4, maitresse: 0.4, decalage: 0 } };
}

/* ---- Mont Blanc : Benefits.js, décodage, niveaux, voie royale ----------- */
function montblanc() {
  const MB = JSON.parse(readFileSync(ROOT + "/public/mbdata.json", "utf8"));
  const N = MB.n, dec = (c) => D36.indexOf(c);
  const hm = new Float32Array(N * N);
  { const s = MB.grid36; let hmax = 0, hmin = 1;
    for (let k = 0; k < N * N; k++) { const v = (dec(s[k * 2]) * 36 + dec(s[k * 2 + 1])) / 1000; hm[k] = v; if (v > hmax) hmax = v; if (v < hmin) hmin = v; }
    for (let k = 0; k < N * N; k++) { const v = (hm[k] - hmin) / (hmax - hmin + 1e-6); hm[k] = Math.pow(v, 1.05); } }
  const NLEV = 72, Wt = 9.4, Dt = 5.6, Ht = 3.05, ZOFF = -1.39, XOFF = 0.0;
  const X = (i) => (i / (N - 1) - 0.5) * Wt + XOFF, Z = (j) => (j / (N - 1) - 0.5) * Dt + ZOFF;
  const segs = courbesGrille(hm, N, X, Z, Array.from({ length: NLEV }, (_, li) =>
    ({ lv: 0.12 + (li / (NLEV - 1)) * 0.86, h: Ht, mait: li % 5 === 0 })));
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const sampleH = (u, v) => {
    const fx = clamp(u, 0, 1) * (N - 1), fy = clamp(v, 0, 1) * (N - 1);
    const i = Math.min(N - 2, Math.floor(fx)), j = Math.min(N - 2, Math.floor(fy)), tx = fx - i, ty = fy - j;
    const a = hm[j * N + i], b = hm[j * N + i + 1], c = hm[(j + 1) * N + i + 1], d2 = hm[(j + 1) * N + i];
    return (a * (1 - tx) + b * tx) * (1 - ty) + (d2 * (1 - tx) + c * tx) * ty;
  };
  const trace = [];
  const cham = { u: 0.526, v: 0.048 }, g0 = { u: MB.gpx[0][0], v: MB.gpx[0][1] };
  for (let s2 = 0; s2 < 60; s2++) {
    const t2 = s2 / 60, u = cham.u + (g0.u - cham.u) * t2, v = cham.v + (g0.v - cham.v) * t2;
    const sh = sampleH(u, v);
    if (sh < 0.118) continue;
    trace.push([(u - 0.5) * Wt + XOFF, sh * Ht + 0.05, (v - 0.5) * Dt + ZOFF]);
  }
  MB.gpx.forEach(([u, v]) => trace.push([(u - 0.5) * Wt + XOFF, sampleH(u, v) * Ht + 0.05, (v - 0.5) * Dt + ZOFF]));
  // Fin de l'ascension (défilement à 100 %) : e = 1 dans draw().
  const ang = 3.75 - 0.6, rad = 6.8 - 0.5;
  return { segs, trace, far: 100, defauts: {
    camera: [Math.sin(ang) * rad, 2.6 + 3.6, Math.cos(ang) * rad], cible: [0.1, 0.55 + 0.35, 0], fov: 40,
    brouillard: null, couleur: "papier", opacite: 0.28, maitresse: 0.75, decalage: -0.52 - 0.43 } };
}

/* ---- Marching squares de Benefits.js et de Lake3D.js (même table) -------- */
function courbesGrille(hm, N, X, Z, niveaux) {
  const segs = [];
  for (const { lv, h, mait } of niveaux) {
    const y = lv * h;
    for (let j = 0; j < N - 1; j++) for (let i = 0; i < N - 1; i++) {
      const a = hm[j * N + i], b = hm[j * N + i + 1], c = hm[(j + 1) * N + i + 1], d = hm[(j + 1) * N + i];
      const m = (a > lv ? 8 : 0) | (b > lv ? 4 : 0) | (c > lv ? 2 : 0) | (d > lv ? 1 : 0);
      if (m === 0 || m === 15) continue;
      const tt = (p1, q1) => (lv - p1) / (q1 - p1);
      const top = [X(i + tt(a, b)), y, Z(j)], right = [X(i + 1), y, Z(j + tt(b, c))],
        bot = [X(i + tt(d, c)), y, Z(j + 1)], left = [X(i), y, Z(j + tt(a, d))];
      const push = (e1, e2) => segs.push([e1, e2, mait]);
      if (m === 1 || m === 14) push(left, bot);
      else if (m === 2 || m === 13) push(bot, right);
      else if (m === 3 || m === 12) push(left, right);
      else if (m === 4 || m === 11) push(top, right);
      else if (m === 6 || m === 9) push(top, bot);
      else if (m === 7 || m === 8) push(top, left);
      else if (m === 5) { push(top, left); push(bot, right); }
      else if (m === 10) { push(top, right); push(bot, left); }
    }
  }
  return segs;
}

/* ---- Lac d'Allos : Lake3D.js, décodage, niveaux, hachures d'eau ---------- */
function lac() {
  const LAC = JSON.parse(readFileSync(ROOT + "/public/lacdata.json", "utf8"));
  const N = LAC.n, dec = (c) => D36.indexOf(c), s = LAC.grid36, hm = new Float32Array(N * N);
  let hmax = 0, hmin = 1;
  for (let k = 0; k < N * N; k++) { const v = (dec(s[k * 2]) * 36 + dec(s[k * 2 + 1])) / 1000; hm[k] = v; if (v > hmax) hmax = v; if (v < hmin) hmin = v; }
  for (let k = 0; k < N * N; k++) hm[k] = (hm[k] - hmin) / (hmax - hmin + 1e-6);
  const NLEV = 34, Wt = 7.6, Dt = 7.6, Ht = 1.7, wlev = (LAC.wlev - hmin) / (hmax - hmin + 1e-6);
  const X = (i) => (i / (N - 1) - 0.5) * Wt, Z = (j) => (j / (N - 1) - 0.5) * Dt;
  const segs = courbesGrille(hm, N, X, Z, Array.from({ length: NLEV }, (_, li) =>
    ({ lv: 0.012 + (li / (NLEV - 1)) * 0.948, h: Ht, mait: li % 5 === 0 })));
  // Hachures d'eau : sur une ligne de grille sur deux, chaque passage mouillé
  // du masque, posé au niveau du lac (wseg dans Lake3D.js).
  const eau = [], wy = wlev * Ht + 0.012;
  for (let j = 0; j < N - 1; j++) {
    let run = -1;
    for (let i = 0; i < N; i++) {
      const wet = LAC.mask[j * N + i] === "1";
      if (wet && run < 0) run = i;
      if ((!wet || i === N - 1) && run >= 0) {
        const fin = wet ? i : i - 1;
        if (fin - run >= 1 && j % 2 === 0) eau.push([[X(run), wy, Z(j)], [X(fin), wy, Z(j)], true]);
        run = -1;
      }
    }
  }
  // Caméra de draw() au repos, sans la houle lente de sin(t) ni le glisser.
  const ang = -0.7, rad = 8.2;
  return { segs, trace: [], eau, far: 100, defauts: {
    camera: [Math.sin(ang) * rad, 3.15, Math.cos(ang) * rad], cible: [0, 0.32, 0], fov: 42,
    brouillard: null, couleur: "papier", opacite: 0.26, maitresse: 0.6, decalage: -0.52 } };
}

/* ---- Projection : PerspectiveCamera et lookAt de Three.js --------------- */
const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const norm = (a) => { const l = Math.hypot(...a); return [a[0] / l, a[1] / l, a[2] / l]; };
const smoothstep = (e0, e1, x) => { const t = Math.max(0, Math.min(1, (x - e0) / (e1 - e0))); return t * t * (3 - 2 * t); };

function camera(scene) {
  const cam = vec("camera", scene.defauts.camera), cible = vec("cible", scene.defauts.cible);
  const fov = num("fov", scene.defauts.fov), dy = num("decalage", scene.defauts.decalage);
  const fog = opt.brouillard === "non" ? null : vec("brouillard", scene.defauts.brouillard);
  const zc = norm(sub(cam, cible)), xc = norm(cross([0, 1, 0], zc)), yc = cross(zc, xc);
  const f = 1 / Math.tan((fov * Math.PI) / 360), aspect = W / H;
  const vue = (p) => { const d = sub([p[0], p[1] + dy, p[2]], cam); return [dot(d, xc), dot(d, yc), dot(d, zc)]; };
  const ecran = (v) => [((f / aspect) * (v[0] / -v[2]) + 1) / 2 * W, (1 - f * (v[1] / -v[2])) / 2 * H];
  return { cam, fog, vue, ecran };
}

// `brume` à false : pas de fondu (la voie royale, que Benefits trace par-dessus
// tout, test de profondeur coupé, à .95 partout).
function projeter(scene, segs3, base, baseM, brume = true) {
  const { vue, ecran, fog: brouillard } = camera(scene), fog = brume ? brouillard : null;
  const NEAR = 0.1, FAR = scene.far, out = [], M = 4;
  for (const [p1, p2, mait] of segs3) {
    let v1 = vue(p1), v2 = vue(p2);
    const d1 = -v1[2], d2 = -v2[2];
    if ((d1 < NEAR && d2 < NEAR) || (d1 > FAR && d2 > FAR)) continue;
    if (d1 < NEAR) { const t = (NEAR - d1) / (d2 - d1); v1 = v1.map((c, i) => c + (v2[i] - c) * t); }
    if (d2 < NEAR) { const t = (NEAR - d2) / (d1 - d2); v2 = v2.map((c, i) => c + (v1[i] - c) * t); }
    const s1 = ecran(v1), s2 = ecran(v2);
    if ((s1[0] < -M && s2[0] < -M) || (s1[0] > W + M && s2[0] > W + M) ||
        (s1[1] < -M && s2[1] < -M) || (s1[1] > H + M && s2[1] > H + M)) continue;
    const brume = fog ? smoothstep(fog[0], fog[1], (-v1[2] - v2[2]) / 2) : 0;
    out.push([s1, s2, (mait ? baseM : base) * (1 - brume)]);
  }
  return out;
}

// Drapeaux d'Everest.js : mât de 4,4, fanion de (0,06 ; 4,4) à (2,7 ; 3,85) et
// (0,06 ; 3,3), le groupe tourné vers la caméra (rotation.y), sans test de
// profondeur ; le brouillard les efface comme il efface les courbes.
// L'étiquette HTML du code se cale 5,8 au-dessus du pied : son point d'ancrage
// est rendu dans les mesures, pour poser l'étiquette dans Figma.
function drapeaux(scene, op) {
  const { cam, fog, vue, ecran } = camera(scene), out = [];
  for (const { k, alt, p } of scene.marques) {
    const th = Math.atan2(cam[0] - p[0], cam[2] - p[2]), co = Math.cos(th), si = Math.sin(th);
    const v = [[0, 0], [0, 4.4], [0.06, 4.4], [2.7, 3.85], [0.06, 3.3], [0, 5.8]]
      .map(([x, y]) => vue([p[0] + x * co, p[1] + y, p[2] - x * si]));
    if (v.some((q) => -q[2] < 0.1)) continue;                 // derrière la caméra
    const s = v.map(ecran), a = op * (fog ? 1 - smoothstep(fog[0], fog[1], -v[0][2]) : 1);
    out.push({ k, alt, mat: [s[0], s[1]], fanion: [s[2], s[3], s[4]], etiquette: s[5], a });
  }
  return out;
}

/* ---- Logo : distance signée au contour, vu de dessus -------------------- */
function logo(base, baseM) {
  const src = readFileSync(ROOT + "/app/icon.svg", "utf8");
  const polys = [...src.matchAll(/<path d="([^"]+)"/g)].map(([, d]) => {
    const tok = d.match(/[MLCZ]|-?\d*\.?\d+(?:e-?\d+)?/g), pts = [];
    let i = 0, cmd = "M", cur = [0, 0];
    while (i < tok.length) {
      if (/[MLCZ]/.test(tok[i])) { cmd = tok[i++]; if (cmd === "Z") continue; }
      if (cmd === "M" || cmd === "L") { cur = [+tok[i], +tok[i + 1]]; i += 2; pts.push(cur); }
      else if (cmd === "C") {
        const q = tok.slice(i, i + 6).map(Number); i += 6;
        for (let s = 1; s <= 48; s++) {
          const t = s / 48, u = 1 - t, A = u * u * u, B = 3 * u * u * t, C = 3 * u * t * t, D = t * t * t;
          pts.push([A * cur[0] + B * q[0] + C * q[2] + D * q[4], A * cur[1] + B * q[1] + C * q[3] + D * q[5]]);
        }
        cur = [q[4], q[5]];
      } else i++;
    }
    return pts;
  });
  const R = 570, CX = 570, CY = 570;                         // découpe ronde : rect 1140, rx 570
  const dedans = (pts, x, y) => { let c = false;
    for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
      const [xi, yi] = pts[i], [xj, yj] = pts[j];
      if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c;
    } return c; };
  const union = (x, y) => polys.some((p) => dedans(p, x, y));
  // Contour réel du logo, le masque appliqué d'abord : les bords des branches
  // coupés au cercle, puis les arcs du cercle dans les branches. Un bord droit
  // qui traverse le cercle ne garde que sa partie intérieure (intersection
  // exacte) : gardé en entier, sa partie extérieure dessinait au logo des
  // pattes qu'il n'a pas. Ce qui tombe dans une autre branche est ôté, par
  // pas de 0,25 unité.
  const dansCercle = (a, b) => {                              // [t0, t1] du segment dans le disque
    const dx = b[0] - a[0], dy = b[1] - a[1], fx = a[0] - CX, fy = a[1] - CY;
    const A = dx * dx + dy * dy, B2 = fx * dx + fy * dy, disc = B2 * B2 - A * (fx * fx + fy * fy - R * R);
    if (A === 0 || disc <= 0) return null;
    const t0 = Math.max(0, (-B2 - Math.sqrt(disc)) / A), t1 = Math.min(1, (-B2 + Math.sqrt(disc)) / A);
    return t0 < t1 ? [t0, t1] : null;
  };
  const bords = [];
  polys.forEach((p, k) => p.forEach((a, i) => {
    const b = p[(i + 1) % p.length], tt = dansCercle(a, b);
    if (!tt) return;
    const at = (t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
    const n = Math.max(1, Math.ceil((Math.hypot(b[0] - a[0], b[1] - a[1]) * (tt[1] - tt[0])) / 0.25));
    let debut = null;
    for (let s = 0; s <= n; s++) {
      const t = tt[0] + ((tt[1] - tt[0]) * s) / n, m = at(t + (tt[1] - tt[0]) / n / 2);
      const libre = s < n && !polys.some((o, q) => q !== k && dedans(o, m[0], m[1]));
      if (libre && debut === null) debut = t;
      else if (!libre && debut !== null) { bords.push([at(debut), at(t)]); debut = null; }
    }
  }));
  const NA = 4096;
  for (let i = 0; i < NA; i++) {
    const t0 = (i / NA) * 2 * Math.PI, t1 = ((i + 1) / NA) * 2 * Math.PI, tm = (t0 + t1) / 2;
    if (union(CX + R * Math.cos(tm), CY + R * Math.sin(tm)))
      bords.push([[CX + R * Math.cos(t0), CY + R * Math.sin(t0)], [CX + R * Math.cos(t1), CY + R * Math.sin(t1)]]);
  }
  const B = Float64Array.from(bords.flat(2));
  const dist = (x, y) => { let m = Infinity;
    for (let k = 0; k < B.length; k += 4) {
      const ax = B[k], ay = B[k + 1], ex = B[k + 2] - ax, ey = B[k + 3] - ay;
      const t = Math.max(0, Math.min(1, ((x - ax) * ex + (y - ay) * ey) / (ex * ex + ey * ey)));
      const dx = x - ax - t * ex, dy = y - ay - t * ey, d = dx * dx + dy * dy;
      if (d < m) m = d;
    } return Math.sqrt(m); };
  // Placement : centre et diamètre en px du cadre, rotation par pas de 72°.
  const [cx, cy] = vec("centre", [W / 2, H / 2]), Dm = num("diametre", 1140), s = Dm / 1140;
  const rot = (num("rotation", 0) * Math.PI) / 180, co = Math.cos(rot), si = Math.sin(rot);
  const g = num("maille", 2), pas = num("pas", 12);
  const nx = Math.ceil(W / g) + 1, ny = Math.ceil(H / g) + 1, F = new Float64Array(nx * ny);
  for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) {
    const px = (i * g - cx) / s, py = (j * g - cy) / s;
    const x = co * px + si * py + CX, y = -si * px + co * py + CY;
    const inside = Math.hypot(x - CX, y - CY) <= R && union(x, y);
    F[j * nx + i] = (inside ? -1 : 1) * dist(x, y) * s;     // en px du cadre
  }
  let lo = Infinity, hi = -Infinity;
  for (const v of F) { if (v < lo) lo = v; if (v > hi) hi = v; }
  // Dedans, toutes les courbes ; dehors, `dehors` courbes qui s'effacent
  // (la k-ième à 1 − k / (dehors + 1)), comme un fondu de profondeur.
  const dehors = num("dehors", 0), out = [];
  for (let k = Math.ceil(lo / pas); k * pas < hi && k <= dehors; k++) {
    const L = k * pas + 1e-6, mait = k % 5 === 0;                           // + 1e-6 : jamais pile sur un nœud
    const a = (mait ? baseM : base) * (k > 0 ? 1 - k / (dehors + 1) : 1);
    for (let j = 0; j < ny - 1; j++) for (let i = 0; i < nx - 1; i++) {
      const A = F[j * nx + i], Bv = F[j * nx + i + 1], C = F[(j + 1) * nx + i + 1], D = F[(j + 1) * nx + i];
      const m = (A > L ? 8 : 0) | (Bv > L ? 4 : 0) | (C > L ? 2 : 0) | (D > L ? 1 : 0);
      if (m === 0 || m === 15) continue;
      const tt = (p1, q1) => (L - p1) / (q1 - p1);
      const top = [(i + tt(A, Bv)) * g, j * g], right = [(i + 1) * g, (j + tt(Bv, C)) * g],
        bot = [(i + tt(D, C)) * g, (j + 1) * g], left = [i * g, (j + tt(A, D)) * g];
      const push = (e1, e2) => out.push([e1, e2, a]);
      if (m === 1 || m === 14) push(left, bot);
      else if (m === 2 || m === 13) push(bot, right);
      else if (m === 3 || m === 12) push(left, right);
      else if (m === 4 || m === 11) push(top, right);
      else if (m === 6 || m === 9) push(top, bot);
      else if (m === 7 || m === 8) push(top, left);
      else if (m === 5) { push(top, left); push(bot, right); }
      else if (m === 10) { push(top, right); push(bot, left); }
    }
  }
  return { out, bords: bords.length, niveaux: [Math.ceil(lo / pas), Math.floor(hi / pas)] };
}

/* ---- Segments → chemins SVG, un par niveau d'opacité -------------------- */
// `min` : longueur en px sous laquelle une courbe ouverte est écartée,
// `minBoucle` celle d'une courbe fermée (logo : les éclats en boucle le long de
// l'axe des branches, là où le champ est presque plat).
// Douglas-Peucker : garde les points qui s'écartent de plus de `tol` px de la
// corde. Les courbes du marching squares portent un point par case de grille ;
// à 0,1 px, l'écart est invisible même en 4x, et le SVG s'allège.
function simplifier(line, tol) {
  if (!(tol > 0) || line.length < 3) return line;
  const keep = new Uint8Array(line.length), pile = [[0, line.length - 1]];
  keep[0] = keep[line.length - 1] = 1;
  while (pile.length) {
    const [i0, i1] = pile.pop(), [ax, ay] = line[i0], [bx, by] = line[i1];
    const dx = bx - ax, dy = by - ay, L = Math.hypot(dx, dy);
    let dm = 0, im = -1;
    for (let k = i0 + 1; k < i1; k++) {
      const [px, py] = line[k];
      const d = L > 1e-6 ? Math.abs((px - ax) * dy - (py - ay) * dx) / L : Math.hypot(px - ax, py - ay);
      if (d > dm) { dm = d; im = k; }
    }
    if (dm > tol) { keep[im] = 1; pile.push([i0, im], [im, i1]); }
  }
  return line.filter((_, k) => keep[k]);
}

function chemins(segs, min = 0, minBoucle = 0) {
  const key = (q) => Math.round(q[0] * 100) + "," + Math.round(q[1] * 100);
  const ends = new Map(), used = new Uint8Array(segs.length);
  segs.forEach((s, i) => s.forEach((q, e) => { const k = key(q); if (!ends.has(k)) ends.set(k, []); ends.get(k).push([i, e]); }));
  const next = (q, from) => (ends.get(key(q)) || []).find(([i]) => i !== from && !used[i]);
  // Sans `simplifier` ni `decimales`, le SVG reste celui de la livraison 1, à
  // l'octet près.
  const P = 10 ** num("decimales", 2), tol = num("simplifier", 0), alleger = tol > 0 || P !== 100;
  const r = (v) => Math.round(v * P) / P;
  let d = "", len = 0;
  for (let s0 = 0; s0 < segs.length; s0++) {
    if (used[s0]) continue;
    used[s0] = 1;
    const line = [segs[s0][0], segs[s0][1]];
    for (const dir of [1, 0]) {
      let cur = dir ? line[line.length - 1] : line[0], from = s0, nx;
      while ((nx = next(cur, from))) {
        const [i, e] = nx; used[i] = 1; from = i; cur = segs[i][1 - e];
        if (dir) line.push(cur); else line.unshift(cur);
      }
    }
    let l = 0;
    for (let k = 1; k < line.length; k++) l += Math.hypot(line[k][0] - line[k - 1][0], line[k][1] - line[k - 1][1]);
    const a0 = line[0], a1 = line[line.length - 1];
    const fermee = line.length > 2 && Math.hypot(a0[0] - a1[0], a0[1] - a1[1]) < 0.5;
    if (l < (fermee ? minBoucle : min)) { ecartees++; continue; }
    const pts = simplifier(line, tol);
    let [px, py] = [r(pts[0][0]), r(pts[0][1])];
    d += `M${px} ${py}`;
    for (let k = 1; k < pts.length; k++) {
      const [x, y] = [r(pts[k][0]), r(pts[k][1])];
      if (alleger && x === px && y === py) continue;           // pas nul après arrondi
      d += `l${r(x - px)} ${r(y - py)}`; len += Math.hypot(x - px, y - py); [px, py] = [x, y];
    }
  }
  return { d, len };
}
let ecartees = 0;

/* ---- Rendu ---------------------------------------------------------------- */
const mesures = { recette: RECETTE, cadre: [W, H], echelle: ECH, trait: TRAIT };
let segs2, trace2 = [], eau2 = [], drap2 = [];
if (RECETTE === "logo") {
  const r = logo(num("opacite", 0.28), num("maitresse", 0.75));
  segs2 = r.out; mesures.bords = r.bords; mesures.niveaux = r.niveaux;
  mesures.couleur = couleur("couleur", "papier");
} else {
  const scene = { everest, montblanc, lac }[RECETTE]?.();
  if (!scene) throw new Error("recette inconnue : " + RECETTE);
  mesures.couleur = couleur("couleur", scene.defauts.couleur);
  segs2 = projeter(scene, scene.segs, num("opacite", scene.defauts.opacite), num("maitresse", scene.defauts.maitresse));
  const opT = num("trace", RECETTE === "montblanc" ? 0.95 : 0);
  if (opT > 0 && scene.trace.length > 1) {
    const pts = scene.trace.slice(1).map((p, i) => [scene.trace[i], p, true]);
    trace2 = projeter(scene, pts, opT, opT, false);
  }
  const opE = num("eau", RECETTE === "lac" ? 0.55 : 0);
  if (opE > 0 && scene.eau) eau2 = projeter(scene, scene.eau, opE, opE);
  const opD = num("drapeaux", 0);
  if (opD > 0 && scene.marques) drap2 = drapeaux(scene, opD);
  mesures.segmentsScene = scene.segs.length;
  if (drap2.length) mesures.drapeaux = drap2.map(({ k, alt, etiquette, a }) =>
    ({ k, alt, etiquette: etiquette.map((v) => Math.round(v)), opacite: Math.round(a * 100) / 100 }));
}
// Un chemin par niveau d'opacité, au centième : le fondu de profondeur devient
// une suite de chemins de plus en plus transparents.
const parOpacite = (liste) => {
  const g = new Map();
  for (const [a, b, op] of liste) {
    const q = Math.round(op * 100) / 100;
    if (q <= 0) continue;
    if (!g.has(q)) g.set(q, []);
    g.get(q).push([a, b]);
  }
  return g;
};
const groupes = parOpacite(segs2);
const fond = couleur("fond", null);
const svg = [`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">`];
if (fond) svg.push(`<rect width="${W}" height="${H}" fill="${fond}"/>`);
svg.push(`<g fill="none" stroke="${mesures.couleur}" stroke-width="${TRAIT}" stroke-linejoin="round">`);
let longueur = 0, segments = 0;
const pasLogo = RECETTE === "logo" ? num("pas", 12) : 0;
for (const q of [...groupes.keys()].sort((a, b) => a - b)) {
  const { d, len } = chemins(groupes.get(q), 1.5 * pasLogo, 12 * pasLogo);
  svg.push(`<path stroke-opacity="${q}" d="${d}"/>`);
  longueur += len; segments += groupes.get(q).length;
}
svg.push("</g>");
if (trace2.length) {                       // par-dessus les courbes, comme dans Benefits
  const { d } = chemins(trace2.map(([a, b]) => [a, b]));
  svg.push(`<path fill="none" stroke="${PALETTE.bleu}" stroke-opacity="${trace2[0][2]}" stroke-width="${TRAIT}" stroke-linejoin="round" d="${d}"/>`);
}
if (eau2.length) {                         // par-dessus aussi : depthTest coupé dans Lake3D.js
  svg.push(`<g fill="none" stroke="${PALETTE.bleu}" stroke-width="${TRAIT}">`);
  const ge = parOpacite(eau2);
  for (const q of [...ge.keys()].sort((a, b) => a - b)) svg.push(`<path stroke-opacity="${q}" d="${chemins(ge.get(q)).d}"/>`);
  svg.push("</g>");
}
for (const { mat, fanion, a } of drap2) {  // mât en trait, fanion plein, comme le code
  const r = (v) => Math.round(v * 100) / 100, q = Math.round(a * 100) / 100;
  svg.push(`<path fill="none" stroke="${PALETTE.bleu}" stroke-opacity="${q}" stroke-width="${TRAIT}" d="M${mat.map((p) => p.map(r).join(" ")).join("L")}"/>`);
  svg.push(`<path fill="${PALETTE.bleu}" fill-opacity="${q}" d="M${fanion.map((p) => p.map(r).join(" ")).join("L")}Z"/>`);
}
svg.push("</svg>");
const fichierSvg = resolve(OUT + ".svg");
writeFileSync(fichierSvg, svg.join("\n"));
Object.assign(mesures, { segments, niveauxOpacite: groupes.size, courbesEcartees: ecartees, longueur: Math.round(longueur),
  octetsSvg: svg.join("\n").length, ecartMoyen: Math.round(((W * H) / Math.max(1, longueur)) * 10) / 10 });

/* ---- PNG : le SVG rendu par le navigateur sans fenêtre (CDP) ------------- */
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
  await send("Emulation.setDeviceMetricsOverride", { width: W, height: H, deviceScaleFactor: ECH, mobile: false });
  await send("Emulation.setDefaultBackgroundColorOverride", { color: { r: 0, g: 0, b: 0, a: 0 } });
  const loaded = once("Page.loadEventFired");
  await send("Page.navigate", { url: pathToFileURL(fichierSvg).href }); await loaded;
  await sleep(800);
  const shot = await send("Page.captureScreenshot", { format: "png", clip: { x: 0, y: 0, width: W, height: H, scale: 1 } });
  writeFileSync(resolve(OUT + ".png"), Buffer.from(shot.result.data, "base64"));
  mesures.png = [W * ECH, H * ECH];
  ws.close();
} finally { proc.kill(); }
console.log(JSON.stringify(mesures));
