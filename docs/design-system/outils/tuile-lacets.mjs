// Kit de marque, partie 1 : tuile raccordable de la trace en lacets.
//
// Le code n'a pas de lacets : la voie royale du Mont Blanc (mbdata.json, 120
// points) ne fait que deux virages. La forme est donc construite : des
// traverses droites qui montent en alternance vers la droite et vers la
// gauche, et des virages en épingle arrondis (arcs de cercle). Seules les
// valeurs viennent du code : trait de 1 px, opacité et couleur posées dans
// Figma.
//
// Raccord : la trace entre en bas et sort en haut au même x, au milieu d'une
// traverse, avec la même direction ; empilées, les tuiles font une seule
// trace continue.
//
// Usage : node tuile-lacets.mjs <sortie.svg> <largeur> <hauteur> <traverses> <x gauche> <x droite> <rayon>
import { writeFileSync } from 'node:fs';

const [, , out, ...nums] = process.argv;
const [W, H, K, xL, xR, r] = nums.map(Number);
if (K % 2) throw new Error('nombre de traverses pair attendu');
const dy = H / K, c = (xL + xR) / 2;
const V = [];
for (let k = 0; k <= K + 1; k++) V.push([k % 2 === 0 ? xR : xL, H + dy / 2 - k * dy]);
const f = (v) => Math.round(v * 1000) / 1000;
const unit = (a, b) => { const dx = b[0] - a[0], dy2 = b[1] - a[1], l = Math.hypot(dx, dy2); return [dx / l, dy2 / l]; };
let d = `M${f(c)} ${f(H)}`;
for (let k = 1; k <= K; k++) {
  const d1 = unit(V[k - 1], V[k]), d2 = unit(V[k], V[k + 1]);
  const alpha = Math.acos(-(d1[0] * d2[0] + d1[1] * d2[1]));      // angle intérieur du virage
  const t = r / Math.tan(alpha / 2);                               // recul du point de tangence
  const A = [V[k][0] - d1[0] * t, V[k][1] - d1[1] * t], B = [V[k][0] + d2[0] * t, V[k][1] + d2[1] * t];
  const sweep = d1[0] * d2[1] - d1[1] * d2[0] > 0 ? 1 : 0;
  d += `L${f(A[0])} ${f(A[1])}A${r} ${r} 0 0 ${sweep} ${f(B[0])} ${f(B[1])}`;
}
d += `L${f(c)} 0`;
writeFileSync(out, `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">\n<path id="trace" d="${d}" fill="none" stroke="#000" stroke-width="1"/>\n</svg>\n`);
const pente = Math.atan2(dy, xR - xL) * 180 / Math.PI;
console.log(JSON.stringify({ tuile: [W, H], traverses: K, denivele: dy, largeur: xR - xL, pente: Math.round(pente * 10) / 10, rayon: r }));
