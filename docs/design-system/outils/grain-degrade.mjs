// Kit de marque, livraison 3 : le grain d'un dégradé, à la manière de la
// neige pixel du site (public/images/pixels.png : pixels d'un point, opacité
// tirée au hasard). Chaque point du cadre s'allume dans la couleur de la
// palette avec une probabilité qui suit la hauteur : nulle en `de`, maximale en
// `a`, en smoothstep élevé à la puissance `gamma`. Le dégradé n'est plus un
// fondu lisse : il se défait en grain.
//
// Écrit un PNG transparent à l'échelle `echelle` (un point du cadre = un carré
// de `echelle` px, net à l'export 1x comme à l'export 2x). Ni navigateur ni
// dépendance : PNG encodé avec zlib.
//
// Usage :
//   node grain-degrade.mjs <sortie.png> [clé=valeur ...]
// Clés : cadre=1920x1080, echelle=2, couleur=bleu|papier|encre, de=y0, a=y1
//   (px du cadre, de < a pour un grain qui monte du bas), densite (défaut .85),
//   gamma (défaut 1.6), opacite=min,max (défaut .4,1, comme pixels.png), graine
import { writeFileSync } from "node:fs";
import { deflateSync } from "node:zlib";

const [, , OUT, ...ARGS] = process.argv;
const opt = Object.fromEntries(ARGS.map((a) => [a.slice(0, a.indexOf("=")), a.slice(a.indexOf("=") + 1)]));
const num = (k, d) => (opt[k] === undefined ? d : +opt[k]);
const PALETTE = { papier: [245, 245, 245], encre: [17, 17, 17], bleu: [30, 41, 255] };
const coul = PALETTE[opt.couleur || "bleu"];
if (!coul) throw new Error(`couleur=${opt.couleur} : la palette est fermée (papier, encre, bleu)`);
const [W, H] = (opt.cadre || "1920x1080").split("x").map(Number);
const E = num("echelle", 2), y0 = num("de", 0), y1 = num("a", H), dens = num("densite", 0.85), gam = num("gamma", 1.6);
const [amin, amax] = (opt.opacite || "0.4,1").split(",").map(Number);
const smoothstep = (e0, e1, x) => { const t = Math.max(0, Math.min(1, (x - e0) / (e1 - e0))); return t * t * (3 - 2 * t); };
let g = (num("graine", 11) >>> 0) || 11;
const rnd = () => { g ^= g << 13; g >>>= 0; g ^= g >>> 17; g ^= g << 5; g >>>= 0; return g / 4294967296; };

// Un octet de filtre par ligne, puis RGBA.
const PW = W * E, PH = H * E, ligne = PW * 4 + 1, raw = Buffer.alloc(ligne * PH);
let allumes = 0;
for (let y = 0; y < H; y++) {
  const p = dens * Math.pow(smoothstep(y0, y1, y + 0.5), gam);
  for (let x = 0; x < W; x++) {
    const r1 = rnd(), r2 = rnd();                     // deux tirages par point, allumé ou non
    if (r1 >= p) continue;
    allumes++;
    const a = Math.round((amin + (amax - amin) * r2) * 255);
    for (let dy = 0; dy < E; dy++) for (let dx = 0; dx < E; dx++) {
      const o = (y * E + dy) * ligne + 1 + (x * E + dx) * 4;
      raw[o] = coul[0]; raw[o + 1] = coul[1]; raw[o + 2] = coul[2]; raw[o + 3] = a;
    }
  }
}
const crc = (buf) => { let c = ~0; for (const b of buf) { c ^= b; for (let k = 0; k < 8; k++) c = (c >>> 1) ^ (0xedb88320 & -(c & 1)); } return ~c >>> 0; };
const bloc = (type, data) => {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
  const td = Buffer.concat([Buffer.from(type, "ascii"), data]), c = Buffer.alloc(4); c.writeUInt32BE(crc(td));
  return Buffer.concat([len, td, c]);
};
const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(PW, 0); ihdr.writeUInt32BE(PH, 4); ihdr[8] = 8; ihdr[9] = 6; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
const png = Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), bloc("IHDR", ihdr), bloc("IDAT", deflateSync(raw, { level: 9 })), bloc("IEND", Buffer.alloc(0))]);
writeFileSync(OUT, png);
console.log(JSON.stringify({ cadre: [W, H], png: [PW, PH], couleur: opt.couleur || "bleu", de: y0, a: y1, densite: dens, gamma: gam, allumes, octets: png.length }));
