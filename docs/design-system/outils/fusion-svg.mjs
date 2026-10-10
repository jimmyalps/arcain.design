// Kit de marque, livraison C3 : réunit dans un seul SVG les tracés de
// plusieurs rendus de rendu-courbes.mjs, un chemin par rendu, chacun à son
// opacité. Sert au survol du logo en pose longue : le logo tourne de 72° au
// survol (globals.css, .logo:hover, 0,6 s, cubic-bezier(.65,0,.2,1)) ; chaque
// pose est un rendu du contour du logo à l'angle de la courbe, et le SVG réuni
// les superpose, à l'opacité choisie pour chaque pose. Importé dans Figma, il
// donne un vecteur par pose.
//
// Usage :
//   node fusion-svg.mjs <sortie.svg> <nom du groupe> <rendu.svg>=<nom>:<opacité> ...
// Les cadres, la couleur et l'épaisseur du trait sont ceux du premier rendu.
import { readFileSync, writeFileSync } from "node:fs";

const [, , OUT, GROUPE, ...ENTREES] = process.argv;
const lire = (f) => readFileSync(f, "utf8");
const premier = lire(ENTREES[0].split("=")[0]);
const entete = premier.split("\n")[0];
const trait = premier.match(/<g id="[^"]*"( fill="none" stroke="[^"]+" stroke-width="[^"]+" stroke-linejoin="round")>/)[1];
const lignes = [entete, `<g id="${GROUPE}"${trait}>`];
for (const e of ENTREES) {
  const [f, reste] = e.split("="), i = reste.lastIndexOf(":"), nom = reste.slice(0, i), op = reste.slice(i + 1);
  const d = [...lire(f).matchAll(/ d="([^"]+)"/g)].map((m) => m[1]).join("");
  lignes.push(`<path id="${nom} ${op}" stroke-opacity="${op}" d="${d}"/>`);
}
lignes.push("</g>", "</svg>");
writeFileSync(OUT, lignes.join("\n"));
console.log(JSON.stringify({ sortie: OUT, chemins: ENTREES.length, octets: lignes.join("\n").length }));
