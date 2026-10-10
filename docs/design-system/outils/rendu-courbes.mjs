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
//   couleur=papier|encre|bleu|bleu-clair, opacite, maitresse, fond=papier|encre|bleu,
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
//
// Livraison A2, variantes des fonds (mêmes garanties : sans ces clés, rien ne
// change) :
//   bleu-clair : le bleu clair d'interface du site (color/accent/on-dark,
//     #7D86FF), admis dans la palette pour les variantes de comparaison ;
//   aplat=couleur:bas:haut[,...] : le relief compris entre deux altitudes
//     (fractions de sa hauteur) rempli en aplat, sous les courbes. Le bord de
//     l'aplat est exactement la courbe de niveau, posée sur le relief (vue du
//     ciel) ; aplatVu=1, en perspective : l'aplat suit le relief vu, tampon de
//     profondeur compris, en cases de aplatMaille px (défaut 1,5) ;
//     aplatApres=couleur (avec teinte) le pose juste après les traits de
//     cette couleur ; aplatOpacite ;
//   lac : rivage=a (le rivage lissé tracé au trait), isobathes=n et
//     profondeur=a0,a1 (n courbes de profondeur : le rivage décalé vers
//     l'intérieur à pas égal jusqu'au point le plus éloigné des berges, comme
//     le logo en courbes ; le relief du fond n'est pas dans les données),
//     echos=n,a0,a1 (le rivage décalé vers l'extérieur, au même pas),
//     lissage=s (flou du champ de distance, en cases du masque, défaut 1 :
//     plus haut, les angles de l'axe médian s'arrondissent),
//     abysse=d0,d1,densite,gamma (<sortie>-abysse.png : des points d'encre
//     dans le lac, de plus en plus serrés vers le centre, rendus point par
//     point par le rayon de la caméra jusqu'au plan d'eau), la neige pixel
//     qui s'arrête au bord de l'eau, et pleinCouleur (couleur du lac plein,
//     défaut bleu ; papier sur papier efface le terrain sous l'eau) ;
//   pixels : foyer=x,y et portee=rx,ry règlent aussi la densité de la neige
//     (inverse=1 : éteinte au foyer, allumée vers les bords) ;
//   noms=1 : chaque chemin du SVG porte un id, qui devient le nom du calque
//     à l'import dans Figma.
//
// Livraison B, le logo dans les deux DA (mêmes garanties : sans ces clés,
// rien ne change ; la distance au contour est désormais cherchée par cases,
// même résultat au bit près) :
//   logos=x,y,d;x,y,d… : plusieurs logos dans le même champ, le minimum de
//     leurs distances signées ; leurs courbes du dehors se rejoignent, les
//     logos se collent par leur relief ;
//   soleil=x,y (direction de la lumière dans le cadre), relief, contraste :
//     le logo pris comme un relief, sa distance au bord pour altitude ;
//     courbes éclairées (méthode de Tanaka), et neige pixel dont la densité
//     suit l'éclairage, comme celle des montagnes ;
//   pixels=c, densite, opacites, fondu=y0,y1 : le logo en neige pixel ;
//     halo=d,γ[,écart[,a]] une neige qui s'éclaircit autour du logo,
//     couronne=d0,d1,γ l'inverse, une clairière autour du logo ;
//   revelation=t, particules, echantillon, toile, net=1 : l'animation de
//     révélation de components/LogoReveal.js figée à l'instant t ;
//   grille=p, origine=x,y, grilleCouleur, grilleOpacite, points=1, cases=1,
//     cote : le logo sur une grille fine, filets ou points, ses cases
//     allumées en neige ;
//   evider=1 (avec logos=…, sur un relief) : ni courbe ni neige dans la
//     forme des logos, qui apparaissent en creux, au pochoir.
//
// Livraison C2, les templates (mêmes garanties : sans cette forme, rien ne
// change) :
//   neige=t0,t1,t2,t3 : une tranche d'altitude, allumée de t0 à t1 et éteinte
//     de t2 à t3, comme la strate des courbes (teinte=altitude et une rampe
//     papier entre deux encres) ; les camps du carrousel.
//
// Livraison C3, templates refaits (mêmes garanties : sans ces clés, rien ne
// change ; onze recettes des livraisons précédentes refaites à l'octet près) :
//   fenetre=x,y,l,h : seule une partie du cadre est rendue (coordonnées du
//     cadre entier, caméra du cadre entier) ; les cinq slides d'un carrousel
//     sont cinq fenêtres d'un même panorama de 5400 × 1350, qui se raccordent.
//     Foyers, centres, origines et fondus restent donnés dans le cadre entier ;
//   voie=gpx (montblanc) : la voie royale sans le raccord en ligne droite de
//     Chamonix, du Nid d'Aigle au sommet ;
//   traceTrait=px, traceCouleur : la trace épaissie (bouts arrondis), papier
//     sur bleu ; reperes=a1,a2… (m) : dans les mesures, le premier point de la
//     trace à chaque altitude et son dernier point, en px de la fenêtre ;
//   teinte=trace, portee=r : la couleur des courbes suit leur distance à la
//     trace projetée, la lumière suit le chemin ;
//   forme=rect, rect=x,y,l,h[,rayon] (logo) : le champ est la distance signée
//     à un rectangle, ses courbes les contours décalés du rectangle (le visuel
//     d'un projet pris comme un sommet) ; dedans=0 n'en trace aucune à
//     l'intérieur ; avec pixels, le rectangle tient lieu de logo (couronne).
import { spawn } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { deflateSync } from "node:zlib";

const [, , ROOT, BROWSER, PROFILE, OUT, RECETTE, ...ARGS] = process.argv;
const PORT = 9348;
const opt = Object.fromEntries(ARGS.map((a) => [a.slice(0, a.indexOf("=")), a.slice(a.indexOf("=") + 1)]));
const PALETTE = { papier: "#F5F5F5", encre: "#111111", bleu: "#1E29FF", "bleu-clair": "#7D86FF" };
const num = (k, d) => (opt[k] === undefined ? d : +opt[k]);
const vec = (k, d) => (opt[k] === undefined ? d : opt[k].split(",").map(Number));
const couleur = (k, d) => {
  const c = opt[k] === undefined ? d : opt[k];
  if (c && !PALETTE[c]) throw new Error(`${k}=${c} : la palette est fermée (papier, encre, bleu, bleu-clair)`);
  return c && PALETTE[c];
};
const nomme = (n) => (opt.noms ? ` id="${n}"` : "");          // nom du calque dans Figma
const [WF, HF] = (opt.cadre || "1920x1080").split("x").map(Number);
// Livraison C3, fenetre=x,y,l,h : seule une partie du cadre est rendue, en
// coordonnées du cadre entier ; la caméra reste celle du cadre entier. Les cinq
// slides d'un carrousel sont les cinq fenêtres d'un même panorama. Sans la clé,
// la fenêtre est le cadre.
const [X0, Y0, W, H] = opt.fenetre ? opt.fenetre.split(",").map(Number) : [0, 0, WF, HF];
const ECH = num("echelle", 2), TRAIT = num("trait", 1);
const enFenetre = ([x, y]) => [x - X0, y - Y0];               // cadre entier → fenêtre
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
    grille: { Nx, Ny, pos: (i, j) => [xG(i), hOf(G[j * Nx + i]), zG(j)],
      frac: (i, j) => (G[j * Nx + i] - EMIN) / RANGE,
      monde: (fi, fj) => [xG(fi), hOf(bilin(G, Nx, Ny, fi, fj)), zG(fj)] }, defauts: {
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
  // Livraison C3, voie=gpx : la trace part du Nid d'Aigle, premier point du
  // GPX, sans le raccord en ligne droite depuis Chamonix.
  for (let s2 = 0; s2 < (opt.voie === "gpx" ? 0 : 60); s2++) {
    const t2 = s2 / 60, u = cham.u + (g0.u - cham.u) * t2, v = cham.v + (g0.v - cham.v) * t2;
    const sh = sampleH(u, v);
    if (sh < 0.118) continue;
    trace.push([(u - 0.5) * Wt + XOFF, sh * Ht + 0.05, (v - 0.5) * Dt + ZOFF]);
  }
  MB.gpx.forEach(([u, v]) => trace.push([(u - 0.5) * Wt + XOFF, sampleH(u, v) * Ht + 0.05, (v - 0.5) * Dt + ZOFF]));
  const traceAlt = trace.map((p) => MB.emin + Math.pow(Math.max(0, (p[1] - 0.05) / Ht), 1 / 1.05) * (MB.emax - MB.emin));
  // Fin de l'ascension (défilement à 100 %) : e = 1 dans draw().
  const ang = 3.75 - 0.6, rad = 6.8 - 0.5;
  return { segs, trace, traceAlt, far: 100, hauteur: Ht,
    grille: { Nx, Ny, pos: (i, j) => [XG(i), G[j * Nx + i] * Ht, ZG(j)], frac: (i, j) => G[j * Nx + i],
      monde: (fi, fj) => [XG(fi), bilin(G, Nx, Ny, fi, fj) * Ht, ZG(fj)] }, defauts: {
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
// Valeur d'une grille Nx × Ny en un point d'indices fractionnaires (bilinéaire).
function bilin(G, Nx, Ny, fi, fj) {
  const i = Math.max(0, Math.min(Nx - 2, Math.floor(fi))), j = Math.max(0, Math.min(Ny - 2, Math.floor(fj)));
  const tx = Math.max(0, Math.min(1, fi - i)), ty = Math.max(0, Math.min(1, fj - j));
  const a = G[j * Nx + i], b = G[j * Nx + i + 1], c = G[(j + 1) * Nx + i + 1], d = G[(j + 1) * Nx + i];
  return (a * (1 - tx) + b * tx) * (1 - ty) + (d * (1 - tx) + c * tx) * ty;
}
// Distance euclidienne exacte, en cases, de chaque case `dedans` à la plus
// proche case qui ne l'est pas (Felzenszwalb et Huttenlocher, deux passes 1D).
function distance(dedans, Nx, Ny) {
  const INF = 1e20, L = Math.max(Nx, Ny), f = new Float64Array(L), d = new Float64Array(L);
  const v = new Int32Array(L), z = new Float64Array(L + 1), D = new Float64Array(Nx * Ny);
  for (let k = 0; k < Nx * Ny; k++) D[k] = dedans[k] ? INF : 0;
  const passe = (n) => {
    let k = 0; v[0] = 0; z[0] = -INF; z[1] = INF;
    for (let q = 1; q < n; q++) {
      let s;
      while ((s = (f[q] + q * q - f[v[k]] - v[k] * v[k]) / (2 * q - 2 * v[k])) <= z[k]) k--;
      k++; v[k] = q; z[k] = s; z[k + 1] = INF;
    }
    for (let q = 0, k2 = 0; q < n; q++) { while (z[k2 + 1] < q) k2++; d[q] = (q - v[k2]) ** 2 + f[v[k2]]; }
  };
  for (let i = 0; i < Nx; i++) { for (let j = 0; j < Ny; j++) f[j] = D[j * Nx + i]; passe(Ny); for (let j = 0; j < Ny; j++) D[j * Nx + i] = d[j]; }
  for (let j = 0; j < Ny; j++) { for (let i = 0; i < Nx; i++) f[i] = D[j * Nx + i]; passe(Nx); for (let i = 0; i < Nx; i++) D[j * Nx + i] = Math.sqrt(d[i]); }
  return D;
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
  // rivage, posé au niveau des hachures. Le même masque sert au rivage tracé,
  // aux courbes de profondeur et à leurs échos, à l'abysse et à la neige des
  // berges (livraison A2).
  const plein = [], lignesEau = { rivage: [], isobathes: [], echos: [] };
  let eauEn = null, abysse = null;
  if (num("plein", 0) > 0 || num("rivage", 0) > 0 || opt.isobathes || opt.echos || opt.abysse || opt.pixels) {
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
    const XM = (i) => X(M.gx(i)), ZM = (j) => Z(M.gy(j));
    const bord = courbesGrille(M.G, M.Nx, XM, ZM, [{ lv: 0.5, h: 2 * wy, mait: false }], M.Ny);
    if (num("plein", 0) > 0) plein.push(...bord);
    if (num("rivage", 0) > 0) lignesEau.rivage = bord;
    eauEn = (gi, gj) => bilin(M.G, M.Nx, M.Ny, gi * 4, gj * 4);   // 1 dans l'eau, 0 à sec
    if (opt.isobathes || opt.echos || opt.abysse) {
      // Distance au rivage en cases du masque affiné, dedans et dehors, lissée
      // d'une case (`lissage` : plus, et les angles de l'axe médian
      // s'arrondissent). Le rivage passe à une demi-case des centres : − 0,5.
      const dedans = Uint8Array.from(M.G, (v) => (v > 0.5 ? 1 : 0)), sig = num("lissage", 1);
      const Din = flou(distance(dedans, M.Nx, M.Ny), M.Nx, sig);
      const Dout = flou(distance(dedans.map((v) => 1 - v), M.Nx, M.Ny), M.Nx, sig);
      let Dmax = 0;
      for (let k = 0; k < Din.length; k++) if (dedans[k] && Din[k] > Dmax) Dmax = Din[k];
      Dmax -= 0.5;
      const n = num("isobathes", 0), pas = Dmax / ((n || 6) + 1), ligne = (D, d) =>
        courbesGrille(D, M.Nx, XM, ZM, [{ lv: d + 0.5, h: wy / (d + 0.5), mait: false }], M.Ny);
      const [p0, p1] = vec("profondeur", [0.6, 0.2]);
      for (let k = 1; k <= n; k++) lignesEau.isobathes.push({ segs: ligne(Din, k * pas), a: n > 1 ? p0 + ((p1 - p0) * (k - 1)) / (n - 1) : p0 });
      const [ne, e0, e1] = vec("echos", [0, 0.5, 0.1]);
      for (let k = 1; k <= ne; k++) lignesEau.echos.push({ segs: ligne(Dout, k * pas), a: ne > 1 ? e0 + ((e1 - e0) * (k - 1)) / (ne - 1) : e0 });
      abysse = { D: Din, Nx: M.Nx, Ny: M.Ny, Dmax, cases: Dmax * (Wt / (N - 1) / 4) };
    }
  }
  // Caméra de draw() au repos, sans la houle lente de sin(t) ni le glisser.
  const ang = -0.7, rad = 8.2;
  const vG = (fi, fj) => [A ? A.gx(fi) : fi, A ? A.gy(fj) : fj];       // indices de la grille d'origine
  return { segs, trace: [], eau, plein, lignesEau, abysse, far: 100, hauteur: Ht,
    eauPlan: { wy, versGrille: (wx, wz) => [(wx / Wt + 0.5) * (N - 1), (wz / Dt + 0.5) * (N - 1)], eauEn },
    grille: { Nx, Ny, pos: (i, j) => [XG(i), G[j * Nx + i] * Ht, ZG(j)], frac: (i, j) => G[j * Nx + i],
      monde: (fi, fj) => [XG(fi), bilin(G, Nx, Ny, fi, fj) * Ht, ZG(fj)],
      eau: eauEn && ((i, j) => eauEn(...vG(i, j))) }, defauts: {
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
  const f = 1 / Math.tan((fov * Math.PI) / 360), aspect = WF / HF;
  const vue = (p) => { const d = sub([p[0], p[1] + dy, p[2]], cam); return [dot(d, xc), dot(d, yc), dot(d, zc)]; };
  // Coordonnées de la fenêtre (le cadre entier sans `fenetre`).
  const ecran = (v) => [((f / aspect) * (v[0] / -v[2]) + 1) / 2 * WF - X0, (1 - f * (v[1] / -v[2])) / 2 * HF - Y0];
  // L'inverse : le point de la scène vu en (sx, sy) sur le plan horizontal y.
  const surPlan = (sx, sy, y) => {
    const a = ((2 * (sx + X0)) / WF - 1) * (aspect / f), b = (1 - (2 * (sy + Y0)) / HF) / f;
    const dir = [0, 1, 2].map((k) => xc[k] * a + yc[k] * b - zc[k]), t = (y + dy - cam[1]) / dir[1];
    return t > 0 ? [cam[0] + t * dir[0], y, cam[2] + t * dir[2]] : null;
  };
  return { cam, fog, vue, ecran, surPlan };
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
  const [b0, b1] = vec("bande", [0, 1]), [fx, fy] = enFenetre(vec("foyer", [WF / 2, HF / 2])), [rx, ry] = vec("portee", [WF / 2, HF / 2]);
  const out = [];
  // Livraison C3, teinte=trace : la distance à la trace projetée (voie royale),
  // rapportée à portee=r (px) ; la lumière suit le chemin.
  let pres = null;
  if (opt.teinte === "trace") {
    const { vue, ecran } = camera(scene), T = scene.trace.map((p) => ecran(vue(p))), r = num("portee", 300);
    pres = (x, y) => {
      let m = Infinity;
      for (let k = 1; k < T.length; k++) {
        const [ax, ay] = T[k - 1], ex = T[k][0] - ax, ey = T[k][1] - ay, l = ex * ex + ey * ey;
        const u = l > 0 ? Math.max(0, Math.min(1, ((x - ax) * ex + (y - ay) * ey) / l)) : 0;
        m = Math.min(m, Math.hypot(x - ax - u * ex, y - ay - u * ey));
      }
      return Math.min(1, m / r);
    };
  }
  for (const [s1, s2, a, y] of segs) {
    const t = opt.teinte === "altitude"
      ? Math.max(0, Math.min(1, (y / scene.hauteur - b0) / (b1 - b0)))
      : pres ? pres((s1[0] + s2[0]) / 2, (s1[1] + s2[1]) / 2)
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
  const { fog, vue, ecran } = camera(scene), { Nx, Ny, pos, eau } = scene.grille;
  const P = new Float64Array(Nx * Ny * 3), T = new Float32Array(Nx * Ny), S = new Float32Array(Nx * Ny);
  const Wm = eau ? new Float32Array(Nx * Ny) : null;              // lac : 1 dans l'eau
  const L = norm(vec("soleil", [-0.55, 0.75, 0.35]));
  for (let j = 0; j < Ny; j++) for (let i = 0; i < Nx; i++) {
    const k = j * Nx + i, p = pos(i, j), v = vue(p), s = ecran(v);
    P[3 * k] = s[0]; P[3 * k + 1] = s[1]; P[3 * k + 2] = -v[2];
    T[k] = p[1] / scene.hauteur;
    if (Wm) Wm[k] = eau(i, j);
    const tx = sub(pos(Math.min(Nx - 1, i + 1), j), pos(Math.max(0, i - 1), j));
    const tz = sub(pos(i, Math.min(Ny - 1, j + 1)), pos(i, Math.max(0, j - 1)));
    let n = norm(cross(tz, tx));
    if (n[1] < 0) n = n.map((c) => -c);
    S[k] = Math.max(0, dot(n, L));
  }
  return { P, T, S, Wm, Nx, Ny, fog };
}

// Le relief vu, case par case de c px : pour chaque case, la face la plus
// proche (tampon de profondeur), son altitude, son éclairage et, sur le lac,
// la part d'eau. Sert à la neige pixel et aux aplats vus (livraison A2).
function tramer(scene, c) {
  const cw = Math.ceil(W / c), ch = Math.ceil(H / c);
  const { P, T, S, Wm, Nx, Ny, fog } = maillage(scene);
  const Zb = new Float64Array(cw * ch).fill(Infinity), AT = new Float32Array(cw * ch), AS = new Float32Array(cw * ch);
  const AW = Wm ? new Float32Array(cw * ch) : null;
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
      if (AW) AW[k] = w1 * Wm[a] + w2 * Wm[b] + w3 * Wm[d];
    }
  };
  for (let j = 0; j < Ny - 1; j++) for (let i = 0; i < Nx - 1; i++) {
    const k = j * Nx + i; tri(k, k + 1, k + Nx + 1); tri(k, k + Nx + 1, k + Nx);
  }
  return { Zb, AT, AS, AW, cw, ch, fog };
}

// Neige pixel : la face vue de chaque case (tampon de profondeur), puis un
// tirage pseudo-aléatoire à graine fixe, comme la mosaïque de pixels.png :
// pixels blancs, opacité tirée entre .4 et 1.
function neigePixels(scene, base) {
  const c = num("pixels", 3), { Zb, AT, AS, AW, cw, ch, fog } = tramer(scene, c);
  let g = (num("graine", 7) >>> 0) || 7;
  const rnd = () => { g ^= g << 13; g >>>= 0; g ^= g >>> 17; g ^= g << 5; g >>>= 0; return g / 4294967296; };
  const nv = vec("neige", [0.25, 0.9]), dens = num("densite", 0.6), wS = num("relief", 0.75), gam = num("contraste", 1);
  // Livraison C2 : neige=t0,t1,t2,t3, une tranche d'altitude (allumée de t0 à
  // t1, éteinte de t2 à t3). Avec deux valeurs, rien ne change.
  const [n0, n1] = nv, tranche = nv.length >= 4 ? [nv[2], nv[3]] : null;
  // Livraison A2 : la neige s'éteint (ou s'allume, inverse=1) loin du foyer.
  const [fx, fy] = enFenetre(vec("foyer", [WF / 2, HF / 2])), [rx, ry] = vec("portee", [WF / 2, HF / 2]), inv = num("inverse", 0) > 0;
  const halo = (k) => {
    const t = smoothstep(0, 1, Math.hypot((((k % cw) + 0.5) * c - fx) / rx, ((Math.floor(k / cw) + 0.5) * c - fy) / ry));
    return inv ? t : 1 - t;
  };
  const cases = [];
  for (let k = 0; k < cw * ch; k++) {
    const r1 = rnd(), r2 = rnd();                              // deux tirages par case, couverte ou non
    if (Zb[k] === Infinity || (AW && AW[k] > 0.5)) continue;   // pas de neige sur l'eau
    const f = fog ? 1 - smoothstep(fog[0], fog[1], Zb[k]) : 1;
    let rho = dens * f * (1 - wS + wS * Math.pow(AS[k], gam)) * smoothstep(n0, n1, AT[k]) * (opt.foyer ? halo(k) : 1);
    if (tranche) rho *= 1 - smoothstep(tranche[0], tranche[1], AT[k]);
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

// Aplats (livraison A2) : le relief compris entre deux altitudes, en fractions
// de sa hauteur. Le champ min(h − bas, haut − h), bordé de −1 pour que chaque
// région se ferme le long du bord des données, rend par le marching squares
// les courbes de niveau elles-mêmes ; chaque point est reposé sur le relief,
// puis projeté. Sans élagage : les contours restent fermés (règle pair-impair).
// C'est la coupe du relief entre deux altitudes : juste vue du ciel, fausse en
// perspective, où l'on voit la surface et non la coupe. aplatVu=1 : le même
// champ calculé sur le relief vu (tramer, cases de `aplatMaille` px), le ciel
// et les bords du cadre à −1 ; le bord de l'aplat suit alors aussi la crête et
// ce qui passe devant.
function aplats(scene) {
  const { Nx, Ny, frac, monde } = scene.grille, { vue, ecran } = camera(scene);
  const vu = num("aplatVu", 0) > 0 && tramer(scene, num("aplatMaille", 1.5)), m = num("aplatMaille", 1.5);
  return opt.aplat.split(",").map((spec) => {
    const [c, b0, b1] = spec.split(":");
    if (!PALETTE[c]) throw new Error(`aplat : ${c} hors palette (papier, encre, bleu, bleu-clair)`);
    if (vu) {
      const PX = vu.cw + 2, PY = vu.ch + 2, F = new Float32Array(PX * PY).fill(-1);
      for (let k = 0; k < vu.cw * vu.ch; k++) if (vu.Zb[k] !== Infinity)
        F[(Math.floor(k / vu.cw) + 1) * PX + (k % vu.cw) + 1] = Math.min(vu.AT[k] - b0, b1 - vu.AT[k]);
      const segs = courbesGrille(F, PX, (i) => (i - 0.5) * m, (j) => (j - 0.5) * m, [{ lv: 0, h: 0, mait: false }], PY);
      return { c, segs: segs.map(([a, b]) => [[a[0], a[2]], [b[0], b[2]]]) };
    }
    const PX = Nx + 2, PY = Ny + 2, F = new Float32Array(PX * PY).fill(-1);
    for (let j = 0; j < Ny; j++) for (let i = 0; i < Nx; i++) { const h = frac(i, j); F[(j + 1) * PX + i + 1] = Math.min(h - b0, b1 - h); }
    const pose = (q) => ecran(vue(monde(Math.max(0, Math.min(Nx - 1, q[0])), Math.max(0, Math.min(Ny - 1, q[2])))));
    const segs = courbesGrille(F, PX, (i) => i - 1, (j) => j - 1, [{ lv: 0, h: 0, mait: false }], PY);
    return { c, segs: segs.map(([a, b]) => [pose(a), pose(b)]) };
  });
}

// Abysse (livraison A2) : des points d'un pixel du cadre dans le lac, de plus
// en plus serrés vers le centre. Chaque point du cadre est ramené sur le plan
// d'eau par le rayon de la caméra ; sa distance au rivage, rapportée à la plus
// grande, règle la probabilité densite × smoothstep(d0, d1, t)^gamma. Opacité
// tirée entre .4 et 1, comme pixels.png. PNG transparent à l'échelle 2 (un
// point = un carré de 2 px, net à l'export 1x comme 2x), encodé avec zlib.
function pngAbysse(scene, fichier) {
  const { surPlan } = camera(scene), { wy, versGrille, eauEn } = scene.eauPlan, A = scene.abysse;
  const [d0, d1, dens, gam] = vec("abysse", [0, 1, 0.85, 1.4]), E = 2;
  const hex = couleur("abysseCouleur", "encre"), rgb = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  let g = (num("graine", 7) >>> 0) || 7, points = 0;
  const rnd = () => { g ^= g << 13; g >>>= 0; g ^= g >>> 17; g ^= g << 5; g >>>= 0; return g / 4294967296; };
  const PW = W * E, PH = H * E, ligne = PW * 4 + 1, raw = Buffer.alloc(ligne * PH);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const r1 = rnd(), r2 = rnd(), p = surPlan(x + 0.5, y + 0.5, wy);
    if (!p) continue;
    const [gi, gj] = versGrille(p[0], p[2]);
    if (eauEn(gi, gj) <= 0.5) continue;
    const t = (bilin(A.D, A.Nx, A.Ny, gi * 4, gj * 4) - 0.5) / A.Dmax;
    if (r1 >= dens * Math.pow(smoothstep(d0, d1, t), gam)) continue;
    points++;
    const a = Math.round((0.4 + 0.6 * r2) * 255);
    for (let dy = 0; dy < E; dy++) for (let dx = 0; dx < E; dx++) {
      const o = (y * E + dy) * ligne + 1 + (x * E + dx) * 4;
      raw[o] = rgb[0]; raw[o + 1] = rgb[1]; raw[o + 2] = rgb[2]; raw[o + 3] = a;
    }
  }
  const crc = (buf) => { let c = ~0; for (const b of buf) { c ^= b; for (let k = 0; k < 8; k++) c = (c >>> 1) ^ (0xedb88320 & -(c & 1)); } return ~c >>> 0; };
  const bloc = (type, data) => {
    const len = Buffer.alloc(4), td = Buffer.concat([Buffer.from(type, "ascii"), data]), c = Buffer.alloc(4);
    len.writeUInt32BE(data.length); c.writeUInt32BE(crc(td));
    return Buffer.concat([len, td, c]);
  };
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(PW, 0); ihdr.writeUInt32BE(PH, 4); ihdr[8] = 8; ihdr[9] = 6;
  writeFileSync(fichier, Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), bloc("IHDR", ihdr),
    bloc("IDAT", deflateSync(raw, { level: 9 })), bloc("IEND", Buffer.alloc(0))]));
  return { points, profondeurMax: Math.round(A.cases * 1000) / 1000, png: [PW, PH] };
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

/* ---- Logo : la forme, le masque appliqué --------------------------------- */
// Commune au logo en courbes et, depuis la livraison B, au logo en neige
// pixel, sur grille et en révélation.
function formeLogo() {
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
  return { union, R, CX, CY, bords };
}

// Distance au plus proche des segments de B (x0, y0, x1, y1 à la suite), en
// unités du logo. Les segments sont rangés par cases de 24 unités, visitées en
// anneaux autour du point ; on s'arrête dès que l'anneau suivant ne peut plus
// rien rapprocher. Même formule et même minimum que la boucle sur tous les
// segments : le résultat est identique, au bit près (livraison B : les grands
// logos et les logos multiples coûtaient trop cher en boucle simple).
function plusProche(B) {
  const T = 24, n = B.length / 4;
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (let k = 0; k < B.length; k += 2) {
    x0 = Math.min(x0, B[k]); x1 = Math.max(x1, B[k]); y0 = Math.min(y0, B[k + 1]); y1 = Math.max(y1, B[k + 1]);
  }
  const cw = Math.floor((x1 - x0) / T) + 1, ch = Math.floor((y1 - y0) / T) + 1;
  const cases = Array.from({ length: cw * ch }, () => []);
  for (let s = 0; s < n; s++) {
    const ax = B[4 * s], ay = B[4 * s + 1], bx = B[4 * s + 2], by = B[4 * s + 3];
    const i0 = Math.floor((Math.min(ax, bx) - x0) / T), i1 = Math.floor((Math.max(ax, bx) - x0) / T);
    const j0 = Math.floor((Math.min(ay, by) - y0) / T), j1 = Math.floor((Math.max(ay, by) - y0) / T);
    for (let j = j0; j <= j1; j++) for (let i = i0; i <= i1; i++) cases[j * cw + i].push(4 * s);
  }
  return (x, y) => {
    const ci = Math.floor((x - x0) / T), cj = Math.floor((y - y0) / T);
    const r0 = Math.max(0, -ci, ci - (cw - 1), -cj, cj - (ch - 1));
    const rMax = Math.max(ci, cw - 1 - ci, cj, ch - 1 - cj);
    let m = Infinity;
    const visite = (i, j) => {
      for (const k of cases[j * cw + i]) {
        const ax = B[k], ay = B[k + 1], ex = B[k + 2] - ax, ey = B[k + 3] - ay;
        const t = Math.max(0, Math.min(1, ((x - ax) * ex + (y - ay) * ey) / (ex * ex + ey * ey)));
        const dx = x - ax - t * ex, dy = y - ay - t * ey, d = dx * dx + dy * dy;
        if (d < m) m = d;
      }
    };
    for (let r = r0; r <= rMax; r++) {
      for (let j = Math.max(0, cj - r); j <= Math.min(ch - 1, cj + r); j++) {
        if (Math.abs(j - cj) === r) { for (let i = Math.max(0, ci - r); i <= Math.min(cw - 1, ci + r); i++) visite(i, j); }
        else { if (ci - r >= 0) visite(ci - r, j); if (ci + r < cw) visite(ci + r, j); }
      }
      if (m <= (r * T) ** 2) break;                     // plus rien de plus proche au-delà
    }
    return Math.sqrt(m);
  };
}

// Où poser le logo : un seul (centre=x,y et diametre, en px du cadre) ou,
// depuis la livraison B, plusieurs (logos=x,y,d;x,y,d…), tous dans la même
// orientation (rotation, par pas de 72°).
function placements() {
  if (opt.logos) return opt.logos.split(";").map((t) => { const [x, y, d] = t.split(",").map(Number); return { cx: x - X0, cy: y - Y0, s: d / 1140 }; });
  const [cx, cy] = enFenetre(vec("centre", [WF / 2, HF / 2])), Dm = num("diametre", 1140);
  return [{ cx, cy, s: Dm / 1140 }];
}

/* ---- Logo : distance signée au contour, vu de dessus -------------------- */
function logo(base, baseM) {
  // Livraison C3, forme=rect et rect=x,y,l,h[,rayon] (px du cadre entier) : le
  // champ est la distance signée à ce rectangle, et ses courbes les contours
  // décalés du rectangle, comme ceux du logo ; dedans=0 n'en trace aucune à
  // l'intérieur (le visuel les couvre).
  const rect = opt.forme === "rect" ? vec("rect") : null;
  const { union, R, CX, CY, bords } = rect ? { bords: [] } : formeLogo();
  const B = Float64Array.from(bords.flat(2)), dist = rect ? null : plusProche(B);
  // Placement : centre et diamètre en px du cadre, rotation par pas de 72°.
  const places = placements();
  const rot = (num("rotation", 0) * Math.PI) / 180, co = Math.cos(rot), si = Math.sin(rot);
  const g = num("maille", 2), pas = num("pas", 12), dehors = num("dehors", 0);
  // Plusieurs logos : le champ est le minimum des distances signées, et leurs
  // courbes du dehors se rejoignent. Loin d'un logo (au-delà de la dernière
  // courbe, plus deux mailles), sa distance au cercle suffit : le champ y
  // reste au-dessus de toutes les courbes, qui ne bougent pas.
  const loin = places.length > 1 ? (dehors + 1) * pas + 2 * g : Infinity;
  const nx = Math.ceil(W / g) + 1, ny = Math.ceil(H / g) + 1, F = new Float64Array(nx * ny);
  const [rx0, ry0, rl, rh, rr = 0] = rect || [], rcx = rect && rx0 - X0 + rl / 2, rcy = rect && ry0 - Y0 + rh / 2;
  for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) {
    let v = Infinity;
    if (rect) {
      const qx = Math.abs(i * g - rcx) - (rl / 2 - rr), qy = Math.abs(j * g - rcy) - (rh / 2 - rr);
      F[j * nx + i] = Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) + Math.min(Math.max(qx, qy), 0) - rr;
      continue;
    }
    for (const P of places) {
      const px = (i * g - P.cx) / P.s, py = (j * g - P.cy) / P.s;
      const x = co * px + si * py + CX, y = -si * px + co * py + CY;
      const r = Math.hypot(x - CX, y - CY);
      if ((r - R) * P.s > loin) { v = Math.min(v, (r - R) * P.s); continue; }
      const inside = r <= R && union(x, y);
      const f = (inside ? -1 : 1) * dist(x, y) * P.s;          // en px du cadre
      if (f < v) v = f;
    }
    F[j * nx + i] = v;
  }
  let lo = Infinity, hi = -Infinity;
  for (const v of F) { if (v < lo) lo = v; if (v > hi) hi = v; }
  // Dedans, toutes les courbes ; dehors, `dehors` courbes qui s'effacent
  // (la k-ième à 1 − k / (dehors + 1)), comme un fondu de profondeur.
  // Livraison B, soleil=x,y : courbes éclairées, comme les courbes de Tanaka
  // des cartes en relief ; l'opacité de chaque segment suit l'éclairage du
  // versant où il passe (lumiereLogo), au dixième.
  const lum = opt.soleil ? lumiereLogo({ F, nx, ny, g }) : null;
  const out = [];
  for (let k = opt.dedans === "0" ? Math.max(0, Math.ceil(lo / pas)) : Math.ceil(lo / pas); k * pas < hi && k <= dehors; k++) {
    const L = k * pas + 1e-6, mait = k % 5 === 0;                           // + 1e-6 : jamais pile sur un nœud
    const a = (mait ? baseM : base) * (k > 0 ? 1 - k / (dehors + 1) : 1);
    for (let j = 0; j < ny - 1; j++) for (let i = 0; i < nx - 1; i++) {
      const A = F[j * nx + i], Bv = F[j * nx + i + 1], C = F[(j + 1) * nx + i + 1], D = F[(j + 1) * nx + i];
      const m = (A > L ? 8 : 0) | (Bv > L ? 4 : 0) | (C > L ? 2 : 0) | (D > L ? 1 : 0);
      if (m === 0 || m === 15) continue;
      const tt = (p1, q1) => (L - p1) / (q1 - p1);
      const top = [(i + tt(A, Bv)) * g, j * g], right = [(i + 1) * g, (j + tt(Bv, C)) * g],
        bot = [(i + tt(D, C)) * g, (j + 1) * g], left = [i * g, (j + tt(A, D)) * g];
      const push = lum
        ? (e1, e2) => out.push([e1, e2, a * Math.round(lum((e1[0] + e2[0]) / 2, (e1[1] + e2[1]) / 2) * 10) / 10])
        : (e1, e2) => out.push([e1, e2, a]);
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
  return { out, bords: bords.length, niveaux: [Math.ceil(lo / pas), Math.floor(hi / pas)], champ: { F, nx, ny, g } };
}

/* ---- Logo en pixels (livraison B, DA pixels) ----------------------------- */
// Le point (X, Y) du cadre tombe-t-il dans l'un des logos posés ? Le masque
// d'abord, comme pour les courbes.
function dansLogos() {
  const { union, R, CX, CY } = formeLogo(), places = placements();
  const rot = (num("rotation", 0) * Math.PI) / 180, co = Math.cos(rot), si = Math.sin(rot);
  return (X, Y) => places.some((P) => {
    const px = (X - P.cx) / P.s, py = (Y - P.cy) / P.s;
    const x = co * px + si * py + CX, y = -si * px + co * py + CY;
    return Math.hypot(x - CX, y - CY) <= R && union(x, y);
  });
}
const tirage = () => {                       // xorshift à graine fixe, comme la neige pixel
  let g = (num("graine", 7) >>> 0) || 7;
  return () => { g ^= g << 13; g >>>= 0; g ^= g >>> 17; g ^= g << 5; g >>>= 0; return g / 4294967296; };
};

// Probabilité d'allumer le point (X, Y) du cadre, pour la neige du logo.
// Dans le logo : densite × éclairage × fondu. Éclairage, comme la neige des
// montagnes : le logo pris comme un relief, sa distance au bord pour altitude
// (le relief du logo en courbes) ; chaque branche devient une arête, son
// versant tourné vers soleil=x,y (direction de la lumière dans le cadre, y
// vers le bas) s'allume, l'autre s'éteint ; la part `relief` de la densité
// suit l'éclairage, à l'exposant `contraste`. Sans soleil, densité égale.
// fondu=y0,y1 : la densité monte de 0 en y0 à 1 en y1 (smoothstep, px du
// cadre ; y0 > y1, elle descend), pour un logo qui se défait en neige.
// Dehors, avec halo=d,γ[,écart[,a]] : a × densite × (1 − distance au logo /
// d)^γ × fondu, une neige qui s'éclaircit en s'éloignant du logo, rien avant
// l'écart ; avec couronne=d0,d1,γ, l'inverse : densite × smoothstep(d0, d1,
// distance)^γ, une clairière autour du logo. Sans l'une ni l'autre, rien dehors.
function densiteLogo(dans, champ) {
  const dens = num("densite", 1), [f0, f1] = vec("fondu", [0, 0]).map((v) => v - Y0), [hd, hg, he = 0, ha = 1] = vec("halo", [0, 1]);
  const [c0, c1, cg] = vec("couronne", [0, 0, 1]);
  const lum = opt.soleil ? lumiereLogo(champ) : null, { F, nx, ny, g } = champ;
  return (X, Y) => {
    const fo = f0 === f1 ? 1 : smoothstep(f0, f1, Y);
    if (dans(X, Y)) return dens * fo * (lum ? lum(X, Y) : 1);
    const d = bilin(F, nx, ny, X / g, Y / g);
    if (c1 > c0) return dens * fo * Math.pow(smoothstep(c0, c1, d), cg);
    return hd > 0 && d > he && d < hd ? ha * dens * fo * Math.pow(1 - (d - he) / (hd - he), hg) : 0;
  };
}

// L'éclairage du logo pris comme un relief (sa distance au bord pour
// altitude) : 1 sur le versant tourné vers soleil=x,y, 0 sur l'autre ; rendu
// en 1 − relief + relief × éclairage^contraste, pour la neige comme pour les
// courbes éclairées.
function lumiereLogo({ F, nx, ny, g }) {
  const [sx, sy] = vec("soleil"), l0 = Math.hypot(sx, sy), wS = num("relief", 0.75), gam = num("contraste", 1);
  return (X, Y) => {
    const fi = X / g, fj = Y / g, e = 0.75;
    const gx = bilin(F, nx, ny, fi + e, fj) - bilin(F, nx, ny, fi - e, fj), gy = bilin(F, nx, ny, fi, fj + e) - bilin(F, nx, ny, fi, fj - e);
    const l = Math.hypot(gx, gy), ec = l > 1e-9 ? (1 + (gx * sx + gy * sy) / (l * l0)) / 2 : 0.5;
    return 1 - wS + wS * Math.pow(ec, gam);
  };
}

// La neige pixel du logo : chaque case de `pixels` px s'allume avec la
// probabilité de densiteLogo en son centre, opacité tirée entre .4 et 1
// (opacites=min,max), comme pixels.png.
function neigeLogo(dans, champ) {
  const c = num("pixels", 3), cw = Math.ceil(W / c), ch = Math.ceil(H / c), rnd = tirage();
  const proba = densiteLogo(dans, champ), [a0, a1] = vec("opacites", [0.4, 1]), cases = [];
  for (let y = 0; y < ch; y++) for (let x = 0; x < cw; x++) {
    const r1 = rnd(), r2 = rnd();                              // deux tirages par case, allumée ou non
    if (r1 < proba((x + 0.5) * c, (y + 0.5) * c)) cases.push([x, y, a0 + (a1 - a0) * r2]);
  }
  return { cases, c };
}

// Le logo sur une grille fine, tous les `grille` px depuis origine=x,y. La
// grille : un filet d'un pixel, posé sur le demi-pixel pour rester net ; ou,
// avec points=1, un point d'un pixel à chaque nœud, tracé en filets
// horizontaux pointillés (un trait d'un pixel, puis p − 1 de vide : un chemin
// par rangée plutôt qu'un carré par point). Avec cases=1, chaque case (avec
// points, chaque nœud) s'allume avec la probabilité de densiteLogo en son
// centre, en carré de `cote` px (p − 1 par défaut : le filet passe dans le
// joint ; avec points, centré sur le nœud, `cote` impair pour rester sur le
// pixel), opacité tirée entre .4 et 1.
function grilleLogo(dans, champ) {
  const p = num("grille", 15), [ox, oy] = enFenetre(vec("origine", [0, 0])), rnd = tirage(), pts = num("points", 0) > 0;
  const i0 = Math.ceil(-ox / p), i1 = Math.floor((W - ox) / p), j0 = Math.ceil(-oy / p), j1 = Math.floor((H - oy) / p);
  let d = "", n = 0;
  if (pts) for (let j = j0; j <= j1; j++) { d += `M${ox + i0 * p} ${oy + j * p + 0.5}h${(i1 - i0) * p + 1}`; n++; }
  else {
    for (let i = i0; i <= i1; i++) d += `M${ox + i * p + 0.5} 0v${H}`;
    for (let j = j0; j <= j1; j++) d += `M0 ${oy + j * p + 0.5}h${W}`;
    n = i1 - i0 + j1 - j0 + 2;
  }
  const cases = [], cote = num("cote", p - 1), [a0, a1] = vec("opacites", [0.4, 1]);
  if (num("cases", 0) > 0) {
    const proba = densiteLogo(dans, champ);
    for (let j = j0 - 1; j <= j1; j++) for (let i = i0 - 1; i <= i1; i++) {
      const r1 = rnd(), r2 = rnd();
      const cx = pts ? ox + i * p + 0.5 : ox + i * p + 1 + (p - 1) / 2, cy = pts ? oy + j * p + 0.5 : oy + j * p + 1 + (p - 1) / 2;
      if (r1 < proba(cx, cy)) cases.push([cx - cote / 2, cy - cote / 2, cote, a0 + (a1 - a0) * r2]);
    }
  }
  return { d, cases, p, lignes: n, points: pts };
}

// La révélation du logo, comme components/LogoReveal.js : le logo
// échantillonné sur une toile de `toile` px (600 sur le site), tous les
// `echantillon` px (3), dans le cercle de découpe ; les points mélangés et
// `particules` gardés (1700). Chaque particule naît au centre, s'en écarte en
// orbite (8 à 54 px), puis converge vers son point dans l'ordre de son angle
// autour du centre ; taille de 1,1 à 2 px, opacité de .6 à 1, mêmes tirages
// et mêmes courbes d'accélération que le code, à graine fixe. Rendue à
// l'instant t = revelation (s) : vers 1, le logo se forme à droite et en bas,
// le reste tourne encore au centre ; à 1,6, tout est posé, et le remplissage
// du site (dès 1,7) n'est pas rendu. La toile est ramenée au diamètre voulu,
// autour de centre=x,y.
function revelation(t) {
  const { union, R, CX, CY } = formeLogo(), rnd = tirage();
  const S = num("toile", 600), step = num("echantillon", 3), MAXP = num("particules", 1700), sc = S / 1140;
  const pts = [];
  for (let y = 0; y < S; y += step) for (let x = 0; x < S; x += step) {
    const u = (x + 0.5) / sc, v = (y + 0.5) / sc;                // centre du pixel de la toile
    if (Math.hypot(u - CX, v - CY) <= R && union(u, v)) pts.push([x, y]);
  }
  for (let i = pts.length - 1; i > 0; i--) { const j = (rnd() * (i + 1)) | 0, q = pts[i]; pts[i] = pts[j]; pts[j] = q; }
  const lerp = (a, b, k) => a + (b - a) * k, cl = (v, a, b) => (v < a ? a : v > b ? b : v);
  const eOut = (x) => 1 - Math.pow(1 - x, 3), eQuint = (x) => (x < 0.5 ? 16 * x ** 5 : 1 - Math.pow(-2 * x + 2, 5) / 2);
  const c0 = S / 2, [ox, oy] = enFenetre(vec("centre", [WF / 2, HF / 2])), k = num("diametre", S) / S;
  const fade = smoothstep(2.75, 2.98, t), net = num("net", 0) > 0, out = [];
  for (let i = 0; i < Math.min(pts.length, MAXP); i++) {
    const [tx, ty] = pts[i];
    let ang = Math.atan2(ty - c0, tx - c0); if (ang < 0) ang += Math.PI * 2;
    const frac = ang / (Math.PI * 2), oA = rnd() * Math.PI * 2, oR = 8 + rnd() * 46;
    const p = { px: c0 + Math.cos(oA) * oR, py: c0 + Math.sin(oA) * oR, spawn: frac * 0.22 + rnd() * 0.05,
      convStart: 0.55 + frac * 0.3 + rnd() * 0.05, convDur: 0.5 + rnd() * 0.18, wPh: rnd() * Math.PI * 2,
      wSp: 0.7 + rnd() * 1.1, wAmp: 1.5 + rnd() * 3, a: 0.6 + rnd() * 0.4, sz: 1.1 + rnd() * 0.9 };
    if (t < p.spawn) continue;
    let bx, by, op, wob;
    if (t < p.spawn + 0.4) { const e = eOut((t - p.spawn) / 0.4); bx = lerp(c0, p.px, e); by = lerp(c0, p.py, e); op = 0.85 * e; wob = e; }
    else { const c = cl((t - p.convStart) / p.convDur, 0, 1), ce = eQuint(c); bx = lerp(p.px, tx, ce); by = lerp(p.py, ty, ce); op = 0.85 + 0.15 * ce; wob = 1 - c; }
    if (wob > 0.001) { bx += Math.sin(t * p.wSp * 6.28 + p.wPh) * p.wAmp * wob; by += Math.cos(t * p.wSp * 5.1 + p.wPh) * p.wAmp * wob; }
    op *= p.a * (1 - fade);
    if (op <= 0.004) continue;
    let s = p.sz * k, x = ox + (bx - c0) * k - s / 2, y = oy + (by - c0) * k - s / 2;
    if (net) { s = Math.max(1, Math.round(s)); x = Math.round(x); y = Math.round(y); }   // calé sur le pixel
    out.push([x, y, s, op]);
  }
  return { cases: out, echantillon: pts.length };
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
const mesures = { recette: RECETTE, cadre: [WF, HF], echelle: ECH, trait: TRAIT };
if (opt.fenetre) mesures.fenetre = [X0, Y0, W, H];
let segs2, trace2 = [], eau2 = [], drap2 = [], scene = null, champLogo = null;
if (RECETTE === "logo") {
  const r = logo(num("opacite", 0.28), num("maitresse", 0.75));
  segs2 = r.out; mesures.bords = r.bords; mesures.niveaux = r.niveaux; champLogo = r.champ;
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
  // Livraison C3, reperes=a1,a2… (m) : le premier point de la trace à chaque
  // altitude, en px de la fenêtre, pour poser les camps du carrousel ; et son
  // dernier point, le sommet.
  if (opt.reperes && scene.traceAlt) {
    const { vue, ecran } = camera(scene), px = (p) => ecran(vue(p)).map((v) => Math.round(v * 10) / 10);
    mesures.reperes = opt.reperes.split(",").map(Number).map((a) => {
      const k = scene.traceAlt.findIndex((m) => m >= a);
      return k < 0 ? { alt: a, absent: true } : { alt: a, reel: Math.round(scene.traceAlt[k]), px: px(scene.trace[k]) };
    });
    mesures.sommetTrace = { reel: Math.round(scene.traceAlt[scene.traceAlt.length - 1]), px: px(scene.trace[scene.trace.length - 1]) };
  }
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
// Livraison B : le logo en pixels (neige, grille, révélation). Rien sans sa clé.
let logoPix = null, grilleL = null, part = null;
if (RECETTE === "logo") {
  // Avec forme=rect, « dedans » est le rectangle (livraison C3).
  const rc = opt.forme === "rect" ? vec("rect") : null;
  const dans = rc ? (X, Y) => X + X0 >= rc[0] && X + X0 <= rc[0] + rc[2] && Y + Y0 >= rc[1] && Y + Y0 <= rc[1] + rc[3]
    : opt.pixels || num("cases", 0) > 0 ? dansLogos() : null;
  if (opt.pixels) logoPix = neigeLogo(dans, champLogo);
  if (opt.grille) grilleL = grilleLogo(dans, champLogo);
  if (opt.revelation) part = revelation(num("revelation", 1.6));
}
// Livraison B, evider=1 : la scène évidée par les logos posés (logos=…) : ni
// courbe ni neige dans leur forme, les logos apparaissent en creux, au
// pochoir. Un segment qui passe le bord est coupé dessus (bissection).
const evide = scene && num("evider", 0) > 0 ? dansLogos() : null;
if (evide) segs2 = segs2.flatMap((s) => {
  const [a, b] = s, ia = evide(a[0], a[1]), ib = evide(b[0], b[1]);
  if (ia && ib) return [];
  if (!ia && !ib) return [s];
  let p = ia ? b : a, q = ia ? a : b;                          // p dehors, q dedans
  for (let k = 0; k < 12; k++) { const m = [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2]; if (evide(m[0], m[1])) q = m; else p = m; }
  return [ia ? [p, b, ...s.slice(2)] : [a, p, ...s.slice(2)]];
});
const sur = couleur("sur", null) || couleur("fond", null) || PALETTE.encre;  // fond d'accueil, pour la teinte
const teintes = scene && opt.teinte ? teinter(segs2, scene, sur) : null;
const pix0 = scene && opt.pixels ? neigePixels(scene, num("opacite", 1)) : logoPix;
const pix = evide && pix0 ? { ...pix0, cases: pix0.cases.filter(([x, y]) => !evide((x + 0.5) * pix0.c, (y + 0.5) * pix0.c)) } : pix0;
const sil = scene && opt.silhouette ? silhouette(scene) : null;
let plein2 = [];
if (scene && scene.plein && scene.plein.length) {      // sans élagage : le rivage reste fermé
  const { vue, ecran } = camera(scene);
  plein2 = scene.plein.map(([p1, p2]) => [ecran(vue(p1)), ecran(vue(p2))]);
}
// Livraison A2 : aplats entre deux altitudes ; sur le lac, rivage tracé,
// courbes de profondeur et échos. Rien de tout cela sans sa clé.
const apl = scene && opt.aplat ? aplats(scene) : null;
const au100 = (a) => Math.round(a * 100) / 100;
let riv2 = [], isob2 = [];
if (scene && scene.lignesEau) {
  const { vue, ecran } = camera(scene), L = scene.lignesEau;
  riv2 = L.rivage.map(([p1, p2]) => [ecran(vue(p1)), ecran(vue(p2))]);
  isob2 = [...L.isobathes.map((n) => ({ ...n, nom: "profondeur" })), ...L.echos.map((n) => ({ ...n, nom: "echo" }))]
    .map(({ segs, a, nom }) => ({ nom, a: au100(a), segs: projeter(scene, segs, a, a).map(([p, q]) => [p, q]) }));
}
const groupes = parOpacite(teintes ? [] : segs2);
const fond = couleur("fond", null);
const svg = [`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">`];
if (fond) svg.push(`<rect width="${W}" height="${H}" fill="${fond}"/>`);
if (grilleL) {                             // livraison B : la grille fine, sous tout le reste
  const a = au100(num("grilleOpacite", 0.1)), c = couleur("grilleCouleur", null) || mesures.couleur;
  svg.push(`<path${nomme(`grille ${a}`)} fill="none" stroke="${c}" stroke-opacity="${a}" stroke-width="1"${grilleL.points ? ` stroke-dasharray="1 ${grilleL.p - 1}"` : ""} d="${grilleL.d}"/>`);
  mesures.grille = { pas: grilleL.p, [grilleL.points ? "points" : "filets"]: grilleL.lignes, cases: grilleL.cases.length };
}
if (sil) {                                 // sous les courbes : la crête en aplat
  const r = (v) => Math.round(v * 10) / 10;
  svg.push(`<path${nomme("silhouette")} fill="${couleur("silhouette", "encre")}" d="M0 ${H}L${sil.map((p) => r(p[0]) + " " + r(p[1])).join("L")}L${W} ${H}Z"/>`);
  mesures.silhouette = sil.length;
}
// Sous les courbes aussi : leur bord est une courbe. Avec teinte et
// aplatApres=couleur, l'aplat passe juste après les traits de cette couleur
// (une calotte bleue qui cache l'encre et porte le papier).
const aplatSvg = () => {
  const a = num("aplatOpacite", 1);
  for (const { c, segs } of apl) svg.push(`<path${nomme(`aplat ${c} ${a}`)} fill="${PALETTE[c]}" fill-opacity="${a}" fill-rule="evenodd" stroke="none" d="${chemins(segs).d}"/>`);
  mesures.aplats = apl.map(({ c, segs }) => ({ c, segments: segs.length }));
};
if (apl && !(teintes && opt.aplatApres)) aplatSvg();
let longueur = 0, segments = 0;
const pasLogo = RECETTE === "logo" ? num("pas", 12) : 0;
if (teintes) {                             // un groupe par couleur, dans l'ordre de la rampe
  for (const c of teintes.ordre) {
    const g = parOpacite(teintes.out.filter((s) => s[3] === c));
    if (!g.size) continue;
    svg.push(`<g${nomme("tracés")} fill="none" stroke="${PALETTE[c]}" stroke-width="${TRAIT}" stroke-linejoin="round">`);
    for (const q of [...g.keys()].sort((a, b) => a - b)) {
      const { d, len } = chemins(g.get(q));
      svg.push(`<path${nomme(`${c === "papier" || c === "encre" ? "courbes" : c} ${q}`)} stroke-opacity="${q}" d="${d}"/>`);
      longueur += len; segments += g.get(q).length;
    }
    svg.push("</g>");
    if (apl && opt.aplatApres === c) aplatSvg();
  }
  mesures.teinte = { mode: opt.teinte, rampe: opt.rampe || "encre:0,bleu:0.6,papier:1", sur, traces: teintes.out.length };
} else {
  svg.push(`<g${nomme("tracés")} fill="none" stroke="${mesures.couleur}" stroke-width="${TRAIT}" stroke-linejoin="round">`);
  for (const q of [...groupes.keys()].sort((a, b) => a - b)) {
    const { d, len } = chemins(groupes.get(q), 1.5 * pasLogo, 12 * pasLogo);
    svg.push(`<path${nomme(`courbes ${q}`)} stroke-opacity="${q}" d="${d}"/>`);
    longueur += len; segments += groupes.get(q).length;
  }
  svg.push("</g>");
}
if (plein2.length) {                       // le lac plein, par-dessus les courbes qu'il recouvre
  const cp = couleur("pleinCouleur", "bleu");                   // papier : le terrain sous l'eau effacé
  svg.push(`<path${nomme(`lac ${num("plein", 1)}`)} fill="${cp}" fill-opacity="${num("plein", 1)}" fill-rule="evenodd" stroke="none" d="${chemins(plein2).d}"/>`);
  mesures.rivage = plein2.length;
}
// Livraison A2 : sur le lac, les courbes de profondeur et les échos, puis le
// rivage, dans la couleur du trait ou celle de `eauCouleur`.
const eauTrait = couleur("eauCouleur", null) || mesures.couleur;
for (const nom of ["profondeur", "echo"]) {
  const liste = isob2.filter((n) => n.nom === nom && n.segs.length);
  if (!liste.length) continue;
  svg.push(`<g${nomme(nom)} fill="none" stroke="${eauTrait}" stroke-width="${TRAIT}" stroke-linejoin="round">`);
  for (const { segs, a } of liste) svg.push(`<path${nomme(`${nom} ${a}`)} stroke-opacity="${a}" d="${chemins(segs).d}"/>`);
  svg.push("</g>");
  mesures[nom] = liste.map(({ a, segs }) => [a, segs.length]);
}
if (riv2.length) {
  const a = au100(num("rivage", 1));
  svg.push(`<path${nomme(`rivage ${a}`)} fill="none" stroke="${eauTrait}" stroke-opacity="${a}" stroke-width="${TRAIT}" stroke-linejoin="round" d="${chemins(riv2).d}"/>`);
  mesures.rivageTrace = riv2.length;
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
  svg.push(`<g${nomme("neige")} fill="${mesures.couleur}" stroke="none">`);
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
    svg.push(`<path${nomme(`neige ${q}`)} fill-opacity="${q}" d="${d}"/>`);
  }
  svg.push("</g>");
  mesures.pixels = { taille: c, allumes: pix.cases.length, niveaux: parA.size };
}
// Livraison B : carrés de taille libre ([x, y, côté, opacité]), un chemin par
// niveau d'opacité au dixième ; les cases de la grille, puis les particules
// de la révélation.
const carres = (liste, nom, fill) => {
  const parA = new Map(), r = (v) => Math.round(v * 100) / 100;
  for (const [x, y, s, a] of liste) {
    const q = Math.round(a * 10) / 10;
    if (q <= 0) continue;
    parA.set(q, (parA.get(q) || "") + `M${r(x)} ${r(y)}h${r(s)}v${r(s)}h${r(-s)}z`);
  }
  svg.push(`<g${nomme(nom)} fill="${fill}" stroke="none">`);
  for (const q of [...parA.keys()].sort((a, b) => a - b)) svg.push(`<path${nomme(`${nom} ${q}`)} fill-opacity="${q}" d="${parA.get(q)}"/>`);
  svg.push("</g>");
  return parA.size;
};
if (grilleL && grilleL.cases.length) carres(grilleL.cases, "cases", couleur("casesCouleur", null) || mesures.couleur);
if (part) mesures.revelation = { instant: num("revelation", 1.6), echantillon: part.echantillon,
  particules: part.cases.length, niveaux: carres(part.cases, "revelation", mesures.couleur) };
if (trace2.length) {                       // par-dessus les courbes, comme dans Benefits
  const { d } = chemins(trace2.map(([a, b]) => [a, b]));
  // Livraison C3 : traceTrait=px (la trace épaissie, bouts arrondis) et
  // traceCouleur (papier sur bleu). Sans elles, le trait et le bleu du code.
  const tt = opt.traceTrait === undefined ? TRAIT : num("traceTrait", TRAIT), bout = opt.traceTrait === undefined ? "" : ' stroke-linecap="round"';
  svg.push(`<path${nomme("trace")} fill="none" stroke="${couleur("traceCouleur", "bleu")}" stroke-opacity="${trace2[0][2]}" stroke-width="${tt}"${bout} stroke-linejoin="round" d="${d}"/>`);
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
// Livraison A2 : l'abysse, une texture à part, à poser sur l'aplat du lac.
if (scene && opt.abysse) {
  if (!scene.abysse) throw new Error("abysse : recette lac seulement");
  mesures.abysse = pngAbysse(scene, resolve(OUT + "-abysse.png"));
}

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
