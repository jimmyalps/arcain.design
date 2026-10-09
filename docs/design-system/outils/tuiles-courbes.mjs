// Kit de marque, partie 1 : tuiles raccordables de courbes de niveau.
//
// Les courbes sont recalculées à partir des données du site et du même
// algorithme que le code, vues de dessus :
//   - everest : public/evdata.json décodé comme Everest.js, une courbe tous
//     les 90 m, marching squares d'Everest.js (points dans l'ordre haut,
//     droite, bas, gauche) ;
//   - montblanc : public/mbdata.json décodé comme Benefits.js (normalisé,
//     puissance 1,05), 72 niveaux de .12 à .98, une maîtresse sur cinq
//     (li % 5 === 0), table de cas de Benefits.js ; cases de 9,4 × 5,6 unités
//     de scène pour 199, comme le maillage du code.
//
// Raccord : le recadrage est prolongé de b cases à droite et en bas ; la
// pente moyenne est retirée (plan des moindres carrés, moyenne gardée), puis
// les b premières colonnes et lignes passent en fondu (smoothstep) de la suite
// du relief au relief en place. La valeur au raccord est celle de la case
// voisine du vrai relief : les courbes sont tracées sur le tore, une courbe
// qui sort à droite rentre à gauche, au même point. Hors de la bande de
// fondu, c'est le relief réel, pente moyenne retirée.
//
// Usage :
//   node tuiles-courbes.mjs <racine du dépôt> <sortie.svg> <everest|montblanc>
//        <i0> <j0> <n> <m> <largeur px> <hauteur px> [<fondu, en cases>]
// Écrit le SVG (un chemin par groupe : courbes, maîtresses, tracé noir de
// 1 px, sans fond : couleur et opacité se posent dans Figma) et affiche les
// mesures en JSON.

import { readFileSync, writeFileSync } from 'node:fs';

const [, , root, out, recette, ...nums] = process.argv;
const [i0, j0, n, m, W, H, b = 12] = nums.map(Number);
const D36 = '0123456789abcdefghijklmnopqrstuvwxyz';

function everest() {
  const EV = JSON.parse(readFileSync(root + '/public/evdata.json', 'utf8'));
  const N = EV.n, EMIN = EV.min, RANGE = EV.max - EV.min;
  const LUT = {}; D36.split('').forEach((c, i) => { LUT[c] = i; });
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
  const levels = [];
  for (let L = Math.ceil(EMIN / 90) * 90; L < EV.max; L += 90) levels.push(L);
  return { N, E, levels, maitresse: () => false, style: 'everest' };
}

function montblanc() {
  const MB = JSON.parse(readFileSync(root + '/public/mbdata.json', 'utf8'));
  const N = MB.n, dec = (c) => D36.indexOf(c);
  const hm = new Float32Array(N * N);
  const s = MB.grid36; let hmax = 0, hmin = 1;
  for (let k = 0; k < N * N; k++) { const v = (dec(s[k * 2]) * 36 + dec(s[k * 2 + 1])) / 1000; hm[k] = v; if (v > hmax) hmax = v; if (v < hmin) hmin = v; }
  for (let k = 0; k < N * N; k++) { const v = (hm[k] - hmin) / (hmax - hmin + 1e-6); hm[k] = Math.pow(v, 1.05); }
  const NLEV = 72, levels = [];
  for (let li = 0; li < NLEV; li++) levels.push(0.12 + (li / (NLEV - 1)) * 0.86);
  return { N, E: hm, levels, maitresse: (li) => li % 5 === 0, style: 'montblanc' };
}

const R = recette === 'everest' ? everest() : montblanc();

// Recadrage prolongé, pente moyenne retirée, fondu des bords.
const NB = n + b, MB2 = m + b, u = new Float64Array(NB * MB2);
for (let j = 0; j < MB2; j++) for (let x = 0; x < NB; x++) u[j * NB + x] = R.E[(j0 + j) * R.N + (i0 + x)];
{
  let sx = 0, sy = 0, sxx = 0, syy = 0, sz = 0, sxz = 0, syz = 0; const cnt = NB * MB2;
  for (let j = 0; j < MB2; j++) for (let x = 0; x < NB; x++) { const z = u[j * NB + x]; sx += x; sy += j; sxx += x * x; syy += j * j; sz += z; sxz += x * z; syz += j * z; }
  const mx = sx / cnt, my = sy / cnt, mz = sz / cnt;
  const bx = (sxz / cnt - mx * mz) / (sxx / cnt - mx * mx), by = (syz / cnt - my * mz) / (syy / cnt - my * my);
  for (let j = 0; j < MB2; j++) for (let x = 0; x < NB; x++) u[j * NB + x] -= bx * (x - mx) + by * (j - my);
}
const w = (t) => t * t * (3 - 2 * t);
const t1 = new Float64Array(n * MB2), p = new Float64Array(n * m);
for (let j = 0; j < MB2; j++) for (let x = 0; x < n; x++) { const a = u[j * NB + x], c = u[j * NB + x + n]; t1[j * n + x] = x < b ? c + (a - c) * w(x / b) : a; }
for (let j = 0; j < m; j++) for (let x = 0; x < n; x++) { const a = t1[j * n + x], c = t1[(j + m) * n + x]; p[j * n + x] = j < b ? c + (a - c) * w(j / b) : a; }

const cw = W / n, ch = H / m;
const P = (x, j) => p[(j % m) * n + (x % n)];

// Marching squares sur le tore : la case de la dernière colonne lit la
// première colonne, son bord droit tombe en x = W.
function courbes(L) {
  const segs = [];
  for (let j = 0; j < m; j++) for (let x = 0; x < n; x++) {
    const a = P(x, j), bb = P(x + 1, j), c = P(x + 1, j + 1), d = P(x, j + 1);
    const cs = (a > L ? 8 : 0) | (bb > L ? 4 : 0) | (c > L ? 2 : 0) | (d > L ? 1 : 0);
    if (cs === 0 || cs === 15) continue;
    const t = (p1, q1) => (L - p1) / (q1 - p1);
    const top = [(x + t(a, bb)) * cw, j * ch], right = [(x + 1) * cw, (j + t(bb, c)) * ch];
    const bot = [(x + t(d, c)) * cw, (j + 1) * ch], left = [x * cw, (j + t(a, d)) * ch];
    if (R.style === 'everest') {
      const e = [];
      if ((cs & 8) !== ((cs & 4) << 1)) e.push(top);
      if ((cs & 4) !== ((cs & 2) << 1)) e.push(right);
      if ((cs & 2) !== ((cs & 1) << 1)) e.push(bot);
      if (((cs & 1) << 3) !== (cs & 8)) e.push(left);
      for (let k = 0; k + 1 < e.length; k += 2) segs.push([e[k], e[k + 1]]);
    } else {
      const s2 = (e1, e2) => segs.push([e1, e2]);
      if (cs === 1 || cs === 14) s2(left, bot);
      else if (cs === 2 || cs === 13) s2(bot, right);
      else if (cs === 3 || cs === 12) s2(left, right);
      else if (cs === 4 || cs === 11) s2(top, right);
      else if (cs === 6 || cs === 9) s2(top, bot);
      else if (cs === 7 || cs === 8) s2(top, left);
      else if (cs === 5) { s2(top, left); s2(bot, right); }
      else if (cs === 10) { s2(top, right); s2(bot, left); }
    }
  }
  return segs;
}

// Segments chaînés en polylignes, pour un chemin compact.
function chemins(segs) {
  const key = (q) => Math.round(q[0] * 1000) + ',' + Math.round(q[1] * 1000);
  const ends = new Map(), used = new Uint8Array(segs.length);
  segs.forEach((s, i) => s.forEach((q, e) => { const k = key(q); if (!ends.has(k)) ends.set(k, []); ends.get(k).push([i, e]); }));
  const next = (q, from) => (ends.get(key(q)) || []).find(([i]) => i !== from && !used[i]);
  const f = (v) => Math.round(v * 100) / 100;
  let d = '', len = 0;
  for (let s0 = 0; s0 < segs.length; s0++) {
    if (used[s0]) continue;
    used[s0] = 1;
    const line = [segs[s0][0], segs[s0][1]];
    for (const dir of [1, 0]) {               // prolonge par la fin, puis par le début
      let cur = dir ? line[line.length - 1] : line[0], from = s0, nx;
      while ((nx = next(cur, from))) {
        const [i, e] = nx; used[i] = 1; from = i;
        cur = segs[i][1 - e];
        if (dir) line.push(cur); else line.unshift(cur);
      }
    }
    let [px, py] = [f(line[0][0]), f(line[0][1])];
    d += `M${px} ${py}`;
    for (let k = 1; k < line.length; k++) {
      const [x, y] = [f(line[k][0]), f(line[k][1])];
      d += `l${f(x - px)} ${f(y - py)}`; len += Math.hypot(x - px, y - py); [px, py] = [x, y];
    }
  }
  return { d, len };
}

const groupes = { courbes: [], maitresses: [] };
R.levels.forEach((L, li) => groupes[R.maitresse(li) ? 'maitresses' : 'courbes'].push(...courbes(L)));
const svg = [`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">`];
const mes = { recette, crop: { i0, j0, n, m, fondu: b }, tuile: [W, H], case: [Math.round(cw * 1000) / 1000, Math.round(ch * 1000) / 1000] };
for (const [nom, segs] of Object.entries(groupes)) {
  if (!segs.length) continue;
  const { d, len } = chemins(segs);
  svg.push(`<path id="${nom}" d="${d}" fill="none" stroke="#000" stroke-width="1"/>`);
  mes[nom] = { segments: segs.length, longueur: Math.round(len), octets: d.length };
}
svg.push('</svg>');
writeFileSync(out, svg.join('\n'));
const total = (mes.courbes ? mes.courbes.longueur : 0) + (mes.maitresses ? mes.maitresses.longueur : 0);
mes.ecartMoyen = Math.round((W * H / total) * 10) / 10;   // aire / longueur : écart moyen entre deux courbes
console.log(JSON.stringify(mes));
