// Kit de marque, livraison C1 : le logo collé, en simple. Deux logos identiques,
// à la même taille et dans la même orientation, poussés l'un vers l'autre
// jusqu'au contact : de combien leurs centres s'écartent-ils ? Calculé sur la
// géométrie réelle du logo d'app/icon.svg, le masque appliqué d'abord (union
// des cinq branches coupée par le cercle de 1140, comme formeLogo() dans
// rendu-courbes.mjs), et non sur le cercle.
//
// Sur une ligne, l'encre du logo occupe des intervalles ; un voisin poussé le
// long de cette ligne la touche quand l'écart des centres vaut l'étendue de
// l'encre sur la ligne (de son premier à son dernier point). Le contact se fait
// sur la ligne où cette étendue est la plus grande : le pas est ce maximum,
// lignes horizontales pour une rangée, verticales pour une colonne. En dessous,
// les logos se chevauchent sur cette ligne ; au-dessus, ils ne se touchent plus.
//
// Contrôle : surface commune de deux logos décalés (rangée, colonne, et les
// voisins en diagonale d'une grille droite), intégrée ligne à ligne tous les
// 0,05 unité sur les intervalles exacts. Nulle au pas, non nulle un millième
// en dessous.
//
// Usage : node logo-colle.mjs [<taille en px>…]
import { readFileSync } from "node:fs";

const SRC = readFileSync(new URL("../../../app/icon.svg", import.meta.url), "utf8");
// Même lecture des tracés que formeLogo() : chaque courbe en 48 segments.
const polys = [...SRC.matchAll(/<path d="([^"]+)"/g)].map(([, d]) => {
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
const R = 570, C = 570, D = 1140;

// Intervalles d'encre sur une ligne, réunis et triés : axe 0 = horizontale
// y = v, axe 1 = verticale x = v. Chaque branche coupée par la corde du cercle.
function encre(v, axe) {
  const h = Math.sqrt(Math.max(0, R * R - (v - C) ** 2));
  if (h === 0) return [];
  const lo = C - h, hi = C + h, iv = [];
  for (const p of polys) {
    const xs = [];
    for (let i = 0, j = p.length - 1; i < p.length; j = i++) {
      const a = p[j], b = p[i], av = a[1 - axe], bv = b[1 - axe];
      if ((av > v) !== (bv > v)) xs.push(a[axe] + ((v - av) / (bv - av)) * (b[axe] - a[axe]));
    }
    xs.sort((m, n) => m - n);
    for (let k = 0; k + 1 < xs.length; k += 2) {
      const s = Math.max(xs[k], lo), e = Math.min(xs[k + 1], hi);
      if (e > s) iv.push([s, e]);
    }
  }
  iv.sort((m, n) => m[0] - n[0]);
  const u = [];
  for (const t of iv) { if (u.length && t[0] <= u[u.length - 1][1]) u[u.length - 1][1] = Math.max(u[u.length - 1][1], t[1]); else u.push([...t]); }
  return u;
}

// Lignes horizontales tous les 0,05 unité : la forme entière.
const P = 0.05, NL = Math.round(D / P), lignes = [];
for (let j = 0; j < NL; j++) lignes.push(encre((j + 0.5) * P, 0));

function pas(axe) {
  let best = { e: 0 };
  for (let v = 0.005; v < D; v += 0.01) {
    const iv = encre(v, axe);
    if (!iv.length) continue;
    const a = iv[0][0], b = iv[iv.length - 1][1];
    if (b - a > best.e) best = { e: b - a, v, a, b };
  }
  return best;
}
// Surface commune (unités²) du logo et de sa copie décalée de (dx, dy) : sur la
// ligne y, la copie a les intervalles de la ligne y − dy, poussés de dx.
function commun(dx, dy) {
  let s = 0;
  for (let j = 0; j < NL; j++) {
    const k = Math.round(j - dy / P);
    if (k < 0 || k >= NL) continue;
    const A = lignes[j], B = lignes[k];
    for (const [a0, a1] of A) for (const [b0, b1] of B) {
      const l = Math.min(a1, b1 + dx) - Math.max(a0, b0 + dx);
      if (l > 0) s += l;
    }
  }
  return s * P;
}

const H = pas(0), V = pas(1);
const xs = lignes.flat(), ys = lignes.map((l, j) => (l.length ? (j + 0.5) * P : null)).filter((y) => y !== null);
const f = (x, n = 2) => x.toFixed(n).replace(".", ",");
const pc = (x) => f((100 * x) / D, 3) + " %";
console.log(`Logo d'app/icon.svg, masque appliqué : diamètre ${D} unités`);
console.log(`Encre : x de ${f(Math.min(...xs.map((t) => t[0])))} à ${f(Math.max(...xs.map((t) => t[1])))}, y de ${f(ys[0])} à ${f(ys[ys.length - 1])}`);
console.log(`\nRangée (voisins à gauche et à droite) : pas ${f(H.e)} unités, ${pc(H.e)} du diamètre`);
console.log(`  contact sur la ligne y = ${f(H.v)} : encre de x = ${f(H.a)} à ${f(H.b)}`);
console.log(`Colonne (voisins au-dessus et au-dessous) : pas ${f(V.e)} unités, ${pc(V.e)} du diamètre`);
console.log(`  contact sur la ligne x = ${f(V.v)} : encre de y = ${f(V.a)} à ${f(V.b)}`);

const cas = [
  ["rangée, au pas", H.e, 0], ["rangée, un millième en dessous", H.e * 0.999, 0],
  ["colonne, au pas", 0, V.e], ["colonne, un millième en dessous", 0, V.e * 0.999],
  ["grille droite, diagonale ↘", H.e, V.e], ["grille droite, diagonale ↗", H.e, -V.e],
  ["cercles tangents, en colonne", 0, D],
];
console.log("\nSurface commune de deux logos :");
for (const [nom, dx, dy] of cas) console.log(`  ${nom.padEnd(32)} ${f(commun(dx, dy), 3)} unités²`);

const tailles = process.argv.slice(2).map(Number).filter((n) => n > 0);
if (tailles.length) {
  console.log("\nEn px, pour un logo de :");
  for (const s of tailles) console.log(`  ${s} px : pas de rangée ${f((H.e * s) / D, 3)} px, pas de colonne ${f((V.e * s) / D, 3)} px`);
}
