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
//
// Livraison 3, fonds abstraits (sans ces clés, les rendus des livraisons 1 et
// 2 restent identiques à l'octet près) :
//   affiner=k, zone=u0,v0,u1,v1 : la grille du relief ré-échantillonnée par
//     Catmull-Rom, k points par case, réduite à une zone (fractions de la
//     grille). Pour les cadrages macro, où une case couvre des dizaines de px ;
//   courbes=0 : sans les courbes de niveau (neige pixel ou silhouette seule) ;
//   teinte=altitude|lumiere, rampe=couleur:position,... : la couleur de chaque
//     trait suit l'altitude du niveau (bande=bas,haut, en fraction de la
//     hauteur du relief) ou la distance au foyer=x,y (px), en ellipse de
//     portee=rx,ry (px). Deux couleurs voisines de la rampe se mêlent par deux
//     tracés superposés, A puis B, d'opacités choisies pour que le mélange sur
//     le fond soit exact : aucune couleur hors palette. Une couleur de la rampe
//     égale au fond donne un trait éteint ;
//   plein=a (lac seulement) : le lac rempli de bleu à l'opacité a, le masque
//     d'eau lissé puis tracé à mi-hauteur, au niveau du lac ;
//   pixels=c : la neige pixel de pixels.png (pixels d'opacité tirée au hasard,
//     de .4 à 1), en cases de c px, dans la couleur du trait, dont la densité
//     suit le relief : maillage du relief rastérisé avec un tampon de
//     profondeur, densite × éclairage (soleil=x,y,z, part du relief `relief`,
//     exposant `contraste`) × neige=t0,t1 (smoothstep sur l'altitude ; t0 > t1
//     l'inverse), effacée par le brouillard ; tirage à graine fixe (graine) ;
//   silhouette=couleur : l'enveloppe haute du relief projeté, fermée par le bas
//     du cadre, en aplat.
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
  // Sans `affiner` ni `zone`, la grille d'origine et les mêmes calculs.
  const A = affiner(E, N), G = A ? A.G : E, Nx = A ? A.Nx : N, Ny = A ? A.Ny : N;
  const xG = A ? (g) => xOf(A.gx(g)) : xOf, zG = A ? (g) => zOf(A.gy(g)) : zOf;
  const segs = [];
  for (let L = Math.ceil(EMIN / INTERVAL) * INTERVAL; L < EV.max; L += INTERVAL) {
    const cut = (x0, y0, v0, x1, y1, v1, e) => {
      const f = (L - v0) / (v1 - v0);
      e.push([xG(x0 + (x1 - x0) * f), hOf(L), zG(y0 + (y1 - y0) * f)]);
    };
    for (let y = 0; y < Ny - 1; y++) for (let x = 0; x < Nx - 1; x++) {
      const a = G[y * Nx + x], b = G[y * Nx + x + 1], c = G[(y + 1) * Nx + x + 1], d = G[(y + 1) * Nx + x];
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
  return { segs, trace: [], marques, far: 900, hauteur: HS,
    grille: { Nx, Ny, pos: (i, j) => [xG(i), hOf(G[j * Nx + i]), zG(j)] }, defauts: {
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
  const A = affiner(hm, N), G = A ? A.G : hm, Nx = A ? A.Nx : N, Ny = A ? A.Ny : N;
  const XG = A ? (i) => X(A.gx(i)) : X, ZG = A ? (j) => Z(A.gy(j)) : Z;
  const segs = courbesGrille(G, Nx, XG, ZG, Array.from({ length: NLEV }, (_, li) =>
    ({ lv: 0.12 + (li / (NLEV - 1)) * 0.86, h: Ht, mait: li % 5 === 0 })), Ny);
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
  return { segs, trace, far: 100, hauteur: Ht,
    grille: { Nx, Ny, pos: (i, j) => [XG(i), G[j * Nx + i] * Ht, ZG(j)] }, defauts: {
    camera: [Math.sin(ang) * rad, 2.6 + 3.6, Math.cos(ang) * rad], cible: [0.1, 0.55 + 0.35, 0], fov: 40,
    brouillard: null, couleur: "papier", opacite: 0.28, maitresse: 0.75, decalage: -0.52 - 0.43 } };
}

/* ---- Marching squares de Benefits.js et de Lake3D.js (même table) -------- */
function courbesGrille(hm, N, X, Z, niveaux, Ny = N) {
  const segs = [];
  for (const { lv, h, mait } of niveaux) {
    const y = lv * h;
    for (let j = 0; j < Ny - 1; j++) for (let i = 0; i < N - 1; i++) {
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

/* ---- Grilles : ré-échantillonnage et flou (livraison 3) ----------------- */
// Catmull-Rom sur une grille N × N, k points par case, sur la zone
// [u0, v0, u1, v1] (fractions de la grille). gx et gy rendent l'indice de la
// grille d'origine, pour garder les fonctions de position du relief.
function reechantillonner(G, N, k, [u0, v0, u1, v1] = [0, 0, 1, 1]) {
  const i0 = Math.floor(u0 * (N - 1)), i1 = Math.ceil(u1 * (N - 1));
  const j0 = Math.floor(v0 * (N - 1)), j1 = Math.ceil(v1 * (N - 1));
  const Nx = (i1 - i0) * k + 1, Ny = (j1 - j0) * k + 1, out = new Float32Array(Nx * Ny);
  const at = (i, j) => G[Math.max(0, Math.min(N - 1, j)) * N + Math.max(0, Math.min(N - 1, i))];
  const cr = (p0, p1, p2, p3, t) =>
    0.5 * (2 * p1 + (p2 - p0) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t * t + (3 * p1 - p0 - 3 * p2 + p3) * t * t * t);
  for (let jj = 0; jj < Ny; jj++) for (let ii = 0; ii < Nx; ii++) {
    const gx = i0 + ii / k, gy = j0 + jj / k, ix = Math.floor(gx), iy = Math.floor(gy), tx = gx - ix, ty = gy - iy;
    const ligne = (y) => cr(at(ix - 1, y), at(ix, y), at(ix + 1, y), at(ix + 2, y), tx);
    out[jj * Nx + ii] = cr(ligne(iy - 1), ligne(iy), ligne(iy + 1), ligne(iy + 2), ty);
  }
  return { G: out, Nx, Ny, gx: (ii) => i0 + ii / k, gy: (jj) => j0 + jj / k };
}
// Les clés `affiner` et `zone` ; null sans elles, pour garder la grille et les
// calculs d'origine.
function affiner(G, N) {
  const k = Math.max(1, Math.round(num("affiner", 1))), z = vec("zone", [0, 0, 1, 1]);
  if (k === 1 && opt.zone === undefined) return null;
  return reechantillonner(G, N, k, z);
}
// Flou gaussien séparable, σ en cases.
function flou(G, N, s) {
  const r = Math.ceil(3 * s), w = Array.from({ length: 2 * r + 1 }, (_, k) => Math.exp(-((k - r) ** 2) / (2 * s * s)));
  const sw = w.reduce((a, b) => a + b, 0), tmp = new Float32Array(N * N), out = new Float32Array(N * N);
  for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) {
    let v = 0; for (let k = -r; k <= r; k++) v += w[k + r] * G[j * N + Math.max(0, Math.min(N - 1, i + k))];
    tmp[j * N + i] = v / sw;
  }
  for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) {
    let v = 0; for (let k = -r; k <= r; k++) v += w[k + r] * tmp[Math.max(0, Math.min(N - 1, j + k)) * N + i];
    out[j * N + i] = v / sw;
  }
  return out;
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
  const A = affiner(hm, N), G = A ? A.G : hm, Nx = A ? A.Nx : N, Ny = A ? A.Ny : N;
  const XG = A ? (i) => X(A.gx(i)) : X, ZG = A ? (j) => Z(A.gy(j)) : Z;
  const segs = courbesGrille(G, Nx, XG, ZG, Array.from({ length: NLEV }, (_, li) =>
    ({ lv: 0.012 + (li / (NLEV - 1)) * 0.948, h: Ht, mait: li % 5 === 0 })), Ny);
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
  // Le lac plein (plein=a) : le masque d'eau, ses trous bouchés (les cases
  // sèches qu'on ne rejoint pas depuis le bord de la grille, des bulles dans
  // l'aplat), flouté d'une case (gaussienne de σ 0,8) puis affiné par 4 en
  // Catmull-Rom, tracé à mi-hauteur : le bord en escalier du masque devient un
  // rivage, posé au niveau des hachures.
  const plein = [];
  if (num("plein", 0) > 0) {
    const sec = new Uint8Array(N * N), pile = [];
    for (let k = 0; k < N * N; k++) {
      const i = k % N, j = Math.floor(k / N);
      if (LAC.mask[k] !== "1" && (i === 0 || j === 0 || i === N - 1 || j === N - 1)) { sec[k] = 1; pile.push(k); }
    }
    while (pile.length) {
      const k = pile.pop(), i = k % N, j = Math.floor(k / N);
      for (const [di, dj] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const ii = i + di, jj = j + dj, q = jj * N + ii;
        if (ii >= 0 && jj >= 0 && ii < N && jj < N && !sec[q] && LAC.mask[q] !== "1") { sec[q] = 1; pile.push(q); }
      }
    }
    const M = reechantillonner(flou(Float32Array.from(sec, (s) => 1 - s), N, 0.8), N, 4);
    plein.push(...courbesGrille(M.G, M.Nx, (i) => X(M.gx(i)), (j) => Z(M.gy(j)), [{ lv: 0.5, h: 2 * wy, mait: false }], M.Ny));
  }
  // Caméra de draw() au repos, sans la houle lente de sin(t) ni le glisser.
  const ang = -0.7, rad = 8.2;
  return { segs, trace: [], eau, plein, far: 100, hauteur: Ht,
    grille: { Nx, Ny, pos: (i, j) => [XG(i), G[j * Nx + i] * Ht, ZG(j)] }, defauts: {
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
    out.push([s1, s2, (mait ? baseM : base) * (1 - brume), p1[1]]);  // altitude du niveau, pour `teinte`
  }
  return out;
}

/* ---- Teinte : couleur par altitude ou par foyer (livraison 3) ------------ */
// La rampe : des couleurs de la palette posées sur [0, 1]. Entre deux couleurs
// voisines A et B, à la fraction f, un trait d'opacité a vaut sur le fond
// fond·(1 − a) + (A·(1 − f) + B·f)·a. On le dessine en deux tracés, A à
// a·(1 − f)/(1 − a·f) puis B à a·f par-dessus : le mélange est exact. Une
// couleur égale au fond n'a pas besoin d'être tracée : B égal au fond, A seul
// à a·(1 − f) ; A égal au fond, B seul à a·f.
function teinter(segs, scene, fond) {
  const rampe = (opt.rampe || "encre:0,bleu:0.6,papier:1").split(",").map((s) => {
    const [c, p] = s.split(":");
    if (!PALETTE[c]) throw new Error(`rampe : ${c} hors palette (papier, encre, bleu)`);
    return { c, p: +p };
  });
  const [b0, b1] = vec("bande", [0, 1]), [fx, fy] = vec("foyer", [W / 2, H / 2]), [rx, ry] = vec("portee", [W / 2, H / 2]);
  const out = [];
  for (const [s1, s2, a, y] of segs) {
    const t = opt.teinte === "altitude"
      ? Math.max(0, Math.min(1, (y / scene.hauteur - b0) / (b1 - b0)))
      : Math.min(1, Math.hypot(((s1[0] + s2[0]) / 2 - fx) / rx, ((s1[1] + s2[1]) / 2 - fy) / ry));
    let k = 0;
    while (k < rampe.length - 2 && t > rampe[k + 1].p) k++;
    const A = rampe[k], B = rampe[k + 1], f = Math.max(0, Math.min(1, (t - A.p) / (B.p - A.p)));
    const finA = PALETTE[A.c] === fond, finB = PALETTE[B.c] === fond;
    const aB = finB ? 0 : a * f;
    const aA = finA ? 0 : finB ? a * (1 - f) : 1 - a * f > 1e-6 ? (a * (1 - f)) / (1 - a * f) : 0;
    if (aA > 0) out.push([s1, s2, aA, A.c]);
    if (aB > 0) out.push([s1, s2, aB, B.c]);
  }
  return { out, ordre: [...new Set(rampe.map((r) => r.c))] };
}

/* ---- Maillage projeté : neige pixel et silhouette (livraison 3) ---------- */
// Chaque sommet de la grille : position à l'écran, profondeur, altitude
// (fraction de la hauteur du relief) et éclairage de Lambert, la normale prise
// par différences centrées.
function maillage(scene) {
  const { fog, vue, ecran } = camera(scene), { Nx, Ny, pos } = scene.grille;
  const P = new Float64Array(Nx * Ny * 3), T = new Float32Array(Nx * Ny), S = new Float32Array(Nx * Ny);
  const L = norm(vec("soleil", [-0.55, 0.75, 0.35]));
  for (let j = 0; j < Ny; j++) for (let i = 0; i < Nx; i++) {
    const k = j * Nx + i, p = pos(i, j), v = vue(p), s = ecran(v);
    P[3 * k] = s[0]; P[3 * k + 1] = s[1]; P[3 * k + 2] = -v[2];
    T[k] = p[1] / scene.hauteur;
    const tx = sub(pos(Math.min(Nx - 1, i + 1), j), pos(Math.max(0, i - 1), j));
    const tz = sub(pos(i, Math.min(Ny - 1, j + 1)), pos(i, Math.max(0, j - 1)));
    let n = norm(cross(tz, tx));
    if (n[1] < 0) n = n.map((c) => -c);
    S[k] = Math.max(0, dot(n, L));
  }
  return { P, T, S, Nx, Ny, fog };
}

// Neige pixel : la face vue de chaque case (tampon de profondeur), puis un
// tirage pseudo-aléatoire à graine fixe, comme la mosaïque de pixels.png :
// pixels blancs, opacité tirée entre .4 et 1.
function neigePixels(scene, base) {
  const c = num("pixels", 3), cw = Math.ceil(W / c), ch = Math.ceil(H / c);
  const { P, T, S, Nx, Ny, fog } = maillage(scene);
  const Zb = new Float64Array(cw * ch).fill(Infinity), AT = new Float32Array(cw * ch), AS = new Float32Array(cw * ch);
  const tri = (a, b, d) => {
    const ax = P[3 * a] / c, ay = P[3 * a + 1] / c, az = P[3 * a + 2], bx = P[3 * b] / c, by = P[3 * b + 1] / c, bz = P[3 * b + 2];
    const dx = P[3 * d] / c, dy = P[3 * d + 1] / c, dz = P[3 * d + 2];
    if (az < 0.1 || bz < 0.1 || dz < 0.1) return;
    const x0 = Math.max(0, Math.floor(Math.min(ax, bx, dx))), x1 = Math.min(cw - 1, Math.ceil(Math.max(ax, bx, dx)));
    const y0 = Math.max(0, Math.floor(Math.min(ay, by, dy))), y1 = Math.min(ch - 1, Math.ceil(Math.max(ay, by, dy)));
    const den = (by - dy) * (ax - dx) + (dx - bx) * (ay - dy);
    if (x0 > x1 || y0 > y1 || Math.abs(den) < 1e-12) return;
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
      const px = x + 0.5, py = y + 0.5;
      const w1 = ((by - dy) * (px - dx) + (dx - bx) * (py - dy)) / den, w2 = ((dy - ay) * (px - dx) + (ax - dx) * (py - dy)) / den, w3 = 1 - w1 - w2;
      if (w1 < 0 || w2 < 0 || w3 < 0) continue;
      const z = w1 * az + w2 * bz + w3 * dz, k = y * cw + x;
      if (z >= Zb[k]) continue;
      Zb[k] = z; AT[k] = w1 * T[a] + w2 * T[b] + w3 * T[d]; AS[k] = w1 * S[a] + w2 * S[b] + w3 * S[d];
    }
  };
  for (let j = 0; j < Ny - 1; j++) for (let i = 0; i < Nx - 1; i++) {
    const k = j * Nx + i; tri(k, k + 1, k + Nx + 1); tri(k, k + Nx + 1, k + Nx);
  }
  let g = (num("graine", 7) >>> 0) || 7;
  const rnd = () => { g ^= g << 13; g >>>= 0; g ^= g >>> 17; g ^= g << 5; g >>>= 0; return g / 4294967296; };
  const [n0, n1] = vec("neige", [0.25, 0.9]), dens = num("densite", 0.6), wS = num("relief", 0.75), gam = num("contraste", 1);
  const cases = [];
  for (let k = 0; k < cw * ch; k++) {
    const r1 = rnd(), r2 = rnd();                              // deux tirages par case, couverte ou non
    if (Zb[k] === Infinity) continue;
    const f = fog ? 1 - smoothstep(fog[0], fog[1], Zb[k]) : 1;
    const rho = dens * f * (1 - wS + wS * Math.pow(AS[k], gam)) * smoothstep(n0, n1, AT[k]);
    if (r1 < rho) cases.push([k % cw, Math.floor(k / cw), base * (0.4 + 0.6 * r2)]);
  }
  return { cases, c };
}

// Silhouette : l'enveloppe haute des arêtes du maillage projeté, colonne par
// colonne au demi-pixel ; sous elle, le relief, au-dessus, le ciel.
function silhouette(scene) {
  const { vue, ecran } = camera(scene), { Nx, Ny, pos } = scene.grille;
  const r = 0.5, nc = Math.ceil(W / r) + 1, env = new Float64Array(nc).fill(Infinity);
  const Sx = new Float64Array(Nx * Ny), Sy = new Float64Array(Nx * Ny), ok = new Uint8Array(Nx * Ny);
  for (let j = 0; j < Ny; j++) for (let i = 0; i < Nx; i++) {
    const k = j * Nx + i, v = vue(pos(i, j));
    if (-v[2] > 0.1) { const s = ecran(v); ok[k] = 1; Sx[k] = s[0]; Sy[k] = s[1]; }
  }
  const arete = (a, b) => {
    if (!ok[a] || !ok[b]) return;
    let [x0, y0, x1, y1] = [Sx[a], Sy[a], Sx[b], Sy[b]];
    if (x0 > x1) [x0, y0, x1, y1] = [x1, y1, x0, y0];
    const k0 = Math.max(0, Math.ceil(x0 / r)), k1 = Math.min(nc - 1, Math.floor(x1 / r));
    for (let k = k0; k <= k1; k++) {
      const y = x1 > x0 ? y0 + ((y1 - y0) * (k * r - x0)) / (x1 - x0) : Math.min(y0, y1);
      if (y < env[k]) env[k] = y;
    }
  };
  for (let j = 0; j < Ny; j++) for (let i = 0; i < Nx; i++) {
    const k = j * Nx + i;
    if (i < Nx - 1) arete(k, k + 1);
    if (j < Ny - 1) arete(k, k + Nx);
    if (i < Nx - 1 && j < Ny - 1) arete(k, k + Nx + 1);
  }
  const pts = Array.from(env, (y, k) => [Math.min(W, k * r), Math.min(H, y)]);
  return simplifier(pts, num("simplifier", 0) || 0.1);
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
let segs2, trace2 = [], eau2 = [], drap2 = [], scene = null;
if (RECETTE === "logo") {
  const r = logo(num("opacite", 0.28), num("maitresse", 0.75));
  segs2 = r.out; mesures.bords = r.bords; mesures.niveaux = r.niveaux;
  mesures.couleur = couleur("couleur", "papier");
} else {
  scene = { everest, montblanc, lac }[RECETTE]?.();
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
// Livraison 3 : sans les courbes (courbes=0), teinte, lac plein, neige pixel,
// silhouette. Rien de tout cela sans sa clé.
if (num("courbes", 1) <= 0) segs2 = [];
const sur = couleur("sur", null) || couleur("fond", null) || PALETTE.encre;  // fond d'accueil, pour la teinte
const teintes = scene && opt.teinte ? teinter(segs2, scene, sur) : null;
const pix = scene && opt.pixels ? neigePixels(scene, num("opacite", 1)) : null;
const sil = scene && opt.silhouette ? silhouette(scene) : null;
let plein2 = [];
if (scene && scene.plein && scene.plein.length) {      // sans élagage : le rivage reste fermé
  const { vue, ecran } = camera(scene);
  plein2 = scene.plein.map(([p1, p2]) => [ecran(vue(p1)), ecran(vue(p2))]);
}
const groupes = parOpacite(teintes ? [] : segs2);
const fond = couleur("fond", null);
const svg = [`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">`];
if (fond) svg.push(`<rect width="${W}" height="${H}" fill="${fond}"/>`);
if (sil) {                                 // sous les courbes : la crête en aplat
  const r = (v) => Math.round(v * 10) / 10;
  svg.push(`<path fill="${couleur("silhouette", "encre")}" d="M0 ${H}L${sil.map((p) => r(p[0]) + " " + r(p[1])).join("L")}L${W} ${H}Z"/>`);
  mesures.silhouette = sil.length;
}
let longueur = 0, segments = 0;
const pasLogo = RECETTE === "logo" ? num("pas", 12) : 0;
if (teintes) {                             // un groupe par couleur, dans l'ordre de la rampe
  for (const c of teintes.ordre) {
    const g = parOpacite(teintes.out.filter((s) => s[3] === c));
    if (!g.size) continue;
    svg.push(`<g fill="none" stroke="${PALETTE[c]}" stroke-width="${TRAIT}" stroke-linejoin="round">`);
    for (const q of [...g.keys()].sort((a, b) => a - b)) {
      const { d, len } = chemins(g.get(q));
      svg.push(`<path stroke-opacity="${q}" d="${d}"/>`);
      longueur += len; segments += g.get(q).length;
    }
    svg.push("</g>");
  }
  mesures.teinte = { mode: opt.teinte, rampe: opt.rampe || "encre:0,bleu:0.6,papier:1", sur, traces: teintes.out.length };
} else {
  svg.push(`<g fill="none" stroke="${mesures.couleur}" stroke-width="${TRAIT}" stroke-linejoin="round">`);
  for (const q of [...groupes.keys()].sort((a, b) => a - b)) {
    const { d, len } = chemins(groupes.get(q), 1.5 * pasLogo, 12 * pasLogo);
    svg.push(`<path stroke-opacity="${q}" d="${d}"/>`);
    longueur += len; segments += groupes.get(q).length;
  }
  svg.push("</g>");
}
if (plein2.length) {                       // le lac plein, par-dessus les courbes qu'il recouvre
  svg.push(`<path fill="${PALETTE.bleu}" fill-opacity="${num("plein", 1)}" fill-rule="evenodd" stroke="none" d="${chemins(plein2).d}"/>`);
  mesures.rivage = plein2.length;
}
if (pix) {                                 // une case allumée = un carré ; rangées fusionnées
  const parA = new Map();
  for (const [x, y, a] of pix.cases) {
    const q = Math.round(a * 10) / 10;
    if (!parA.has(q)) parA.set(q, new Map());
    const rangs = parA.get(q);
    if (!rangs.has(y)) rangs.set(y, []);
    rangs.get(y).push(x);
  }
  const c = pix.c;
  svg.push(`<g fill="${mesures.couleur}" stroke="none">`);
  for (const q of [...parA.keys()].sort((a, b) => a - b)) {
    let d = "";
    for (const [y, xs] of parA.get(q)) {
      xs.sort((a, b) => a - b);
      for (let i = 0, s = xs[0]; i < xs.length; i++) {
        if (i + 1 < xs.length && xs[i + 1] === xs[i] + 1) continue;
        const n = (xs[i] - s + 1) * c;
        d += `M${s * c} ${y * c}h${n}v${c}h-${n}z`;
        s = xs[i + 1];
      }
    }
    svg.push(`<path fill-opacity="${q}" d="${d}"/>`);
  }
  svg.push("</g>");
  mesures.pixels = { taille: c, allumes: pix.cases.length, niveaux: parA.size };
}
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
