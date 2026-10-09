# Kit Motifs — kit de marque, partie 1

Partie 1 du brief (`docs/design-system/BRIEF-kit.md`) : des tuiles
raccordables tirées de l'univers graphique du site, chacune déclinée dans les
paires de la palette qui gardent un bon contraste, sur une nouvelle page
« Kit Motifs ». Méthode et paires : `reference-drapz.md` (§3) et les
arbitrages A1 à A6.

- **Date** : 9 octobre 2026
- **Branche** : `brand-kit`
- **Fichier Figma** : `kMLD5Ti9yCpnKU4jdVfWDJ`, page Kit Motifs (`328:2`),
  placée après Motion
- **Statut** : construite et contrôlée, en attente de validation (§6)

Relecture du fichier avant de commencer : six pages, aucune page de kit, les
pages Fondations, Composants, Marque et Motion conformes à leur documentation
(composants `logo`, `grain`, `ridge`, `flag/pin`, `_doc/usage` ; style
`effect/grain` ; images `pixels.png` et grain déjà importées). Aucun écart
avec la documentation relevé.

## 1. Ce qui existe dans Figma

La page suit le gabarit des pages du système : planches de 1440 de large,
retrait `space/112`, écart `space/40`, fond `color/bg/primary`, titre en
`overline` et `heading-2`, textes en `body`, légendes en `title` et `data`.

| Planche | Nœud | Contenu |
|---|---|---|
| `planche/en-tete` | `328:3` | titre et résumé |
| `planche/courbes` | `330:10` | quatre aperçus en répétition, jeu `motif/courbes` |
| `planche/trace` | `330:84` | quatre aperçus, jeu `motif/trace` |
| `planche/neige` | `331:95` | deux aperçus, jeu `motif/neige` |
| `planche/crete` | `333:298` | quatre frises pleine largeur, jeu `motif/crete` |
| `planche/logo` | `333:394` | quatre trames, jeu `motif/logo` |
| `planche/grain` | `334:2373` | trois aperçus, jeu `motif/grain` |
| `planche/filigrane` | `336:5347` | deux exemples, consignes en `_doc/usage` (A1) |

Chaque aperçu pose des instances de la tuile bord à bord dans un cadre qui
coupe, les raccords croisés au centre. Les aperçus sur papier portent un filet
`color/border/default`, comme les visuels clairs de la page Marque.

| Jeu | Nœud | Tuile | Variantes (nœud) |
|---|---|---|---|
| `motif/courbes` | `329:12` | 480 × 480 | `couleurs` : encre sur papier `329:2`, papier sur encre `329:4`, papier sur bleu `329:7`, bleu sur papier `329:10` |
| `motif/trace` | `330:83` | 240 × 240 | `couleurs` : `330:75`, `330:77`, `330:79`, `330:81` (même ordre) |
| `motif/neige` | `331:94` | 64 × 64 | `fond` : encre `331:90`, bleu `331:92` |
| `motif/crete` | `332:310` | 780 × 200 | `couleurs` : `332:290`, `332:295`, `332:300`, `332:305` (même ordre) |
| `motif/logo` | `333:393` | 47 × 47 | `couleurs` : `333:365`, `333:372`, `333:379`, `333:386` (même ordre) |
| `motif/grain` | `334:2372` | 240 × 240 | `fond` : papier `334:2366`, encre `334:2368`, bleu `334:2370` |

Chaque tuile est une variante de composant, avec son réglage d'export SVG
(règle 7), son mode posé sur la collection `semantic` (clair ou sombre) et une
description sur le jeu. Les jeux sont habillés comme ceux de la page
Composants : auto-layout, écart `space/40`, rayon `radius/5`, fond
`color/bg/card` et marge `space/24`, pour que les tuiles papier se détachent.

## 2. Règles appliquées

- **Paires de la palette** (`reference-drapz.md`, §3.7) : encre sur papier,
  papier sur encre (17,32:1), papier sur bleu, bleu sur papier (6,84:1). Le
  bleu sur l'encre (2,53:1) reste à l'accent : aucune tuile. Pas d'encre sur
  bleu.
- **Valeurs fermées** : fonds en `color/bg/primary` (papier en mode clair,
  encre en mode sombre) ou `color/accent/default` ; traits et logos en
  `color/text/primary` ou `color/accent/default`. Les opacités du code
  (.4, .28, .75, .95, .65, .21, .12) se posent sur le calque ou sur l'image,
  comme l'opacité d'un matériau `LineBasicMaterial` ou d'une classe CSS :
  aucune couleur nouvelle.
- **Composants du système** : la crête est faite d'instances de `ridge`, le
  logo d'instances de `logo`, le grain d'une instance de `grain`, les
  consignes du filigrane d'une instance de `_doc/usage`.
- **Export** : SVG sur chaque tuile. Vérifié sur une tuile par jeu : tailles,
  couleurs résolues (`#111111`, `#F5F5F5`, `#1E29FF`), opacités, fusion
  `difference` du grain. La neige et le grain embarquent leur PNG.

## 3. Les motifs

### 3.1 Courbes de niveau

Recalculées en vecteurs à partir des données du site et du marching squares
du code (`outils/tuiles-courbes.mjs`), vues de dessus (A6), trait de 1 px. Le
fond décide de la recette :

| Fond | Recette | Données | Niveaux | Opacité |
|---|---|---|---|---|
| papier | hero (`Everest.js`) | `evdata.json`, décodé comme le code | tous les 90 m | encre .4 (bleu .4 pour bleu sur papier) |
| encre, bleu | Benefits (`Benefits.js`) | `mbdata.json`, normalisé, puissance 1,05 | 72, de .12 à .98 | papier .28, maîtresses (une sur cinq) .75 |

| Tuile | Recadrage (colonne, ligne) | Cases | Taille d'une case | Segments | Longueur | Écart moyen |
|---|---|---|---|---|---|---|
| Everest | 137, 83 | 40 × 40, sommet compris | 12 × 12 px | 4 104 | 38 341 px | 6,0 px |
| Mont Blanc | 79, 110 | 40 × 67, sommet compris | 12 × 7,16 px | 3 672 + 860 maîtresses | 27 105 + 6 332 px | 6,9 px |

- **Proportions** : les cases du Mont Blanc gardent le rapport du maillage du
  code, 9,4 sur 5,6 unités de scène pour 199 cases (à 0,2 % près).
- **Raccord** : le recadrage est prolongé de 14 cases à droite et en bas, sa
  pente moyenne retirée (plan des moindres carrés, moyenne gardée), puis les
  14 premières colonnes et lignes passent en fondu (smoothstep) de la suite du
  relief au relief en place. Les courbes sont tracées sur le tore : une courbe
  qui sort d'un bord rentre par l'autre, au même point. Hors de la bande de
  fondu, c'est le relief réel.
- **Essai écarté** : la décomposition « périodique + lisse » (Moisan, 2011)
  garde tout le détail, mais n'impose pas la même altitude de part et d'autre
  du raccord ; à l'aperçu, les courbes s'y collaient en une ligne le long du
  bord.
- **Échelle** : cases de 12 px. Essayées à 8, 10 et 12 px
  (`outils/apercu-tuiles.mjs`) : à 10 px, l'écart moyen tombe à 5,6 px
  (Everest) et 5,7 px (Mont Blanc), et les fines à .28 se fondent en gris dans
  les pentes.
- La perspective et le fondu de profondeur iront aux fonds (partie 2, A6).

### 3.2 Trace en lacets

Le code n'a pas de lacets : la voie royale du Mont Blanc (`mbdata.json`,
120 points) ne fait que deux virages. La forme est une construction
(`outils/tuile-lacets.mjs`) : six traverses par tuile de 240, 40 px de
dénivelé et 208 px de large chacune (pente de 10,9°), épingles en arc de 6 px
de rayon. Seules ses valeurs viennent du code : trait de 1 px, opacité .95 de
la voie royale. La trace entre en bas et ressort en haut au même point, dans la
même direction : empilées, les tuiles font une seule trace. Essayées avant :
des traverses plus courtes et des virages plus ronds, qui se lisaient comme une
vague décorative.

### 3.3 Neige pixel

`public/images/pixels.png` tel que le site le pose (`.rd-shimmer`, `.ab-snow`,
canevas d'About) : 64 × 64, pixels blancs à alpha variable (1 701 sur 4 096),
en mosaïque de 64 à .65. L'image se raccorde déjà. Deux fonds seulement : sur
le papier, le blanc disparaît (1,09:1). Seule sur un aplat, la neige se lit
comme un bruit ; sur le site, elle tombe toujours sur un visuel. Une image
n'accepte pas de variable : la neige reste blanche.

### 3.4 Crête

Deux instances du composant `ridge`, variante mobile (390 px, ordonnées × .55,
la plus petite valeur de k), la seconde en reflet. Les bords de la crête n'ont
pas la même hauteur (144,1 et 129,8) : avec son reflet, la tuile de 780 × 200
se raccorde en largeur. C'est une frise : en hauteur, les rangs s'empilent bord
à bord. La variante bureau (1200, k = 1) aurait donné une tuile de
2400 × 470, plus large que les planches et que tous les formats du kit. Sur un
format entier, la crête se tracera plutôt à la largeur du cadre,
k = largeur / 1200 borné à .55–1, comme le site.

### 3.5 Logo en répétition

Une instance du composant `logo` à 34 px, la taille minimum, au centre d'une
tuile de 47 × 47 : l'écart entre deux logos vaut la zone de protection, 13 px
(13/34 du diamètre). Grille carrée ; versions de la page Marque seulement, et
le papier sur bleu du favicon. Rotation permise par pas de 72° (le logo y
retombe à 1,8 px près). Pour une trame plus grande, la tuile se met à
l'échelle : l'écart suit le diamètre.

### 3.6 Grain

Une instance du composant `grain` (usage=site) : le SVG du code (feTurbulence
fractalNoise .72, deux octaves, `stitchTiles`) rendu en PNG 240 × 240, style
`effect/grain`, .21 en `difference`. Il se raccorde par construction. Sur
papier, sur encre et sur bleu : `body::after` couvre tout le site, boutons
bleus compris.

### 3.7 Filigrane (A1)

Pas une tuile : un usage graphique, documenté comme tel. Logo agrandi, coupé
par le bord du cadre, papier à .12 sur encre, comme `.menu-logo`. Deux
exemples : un logo de 600 px coupé par deux bords ; un filigrane de 640 px
avec, ailleurs, le logo entier à 34 px, à 56 px des bords, sa zone libre.
Consignes dans `_doc/usage` :

- à faire : papier à .12 sur encre ; agrandir et couper par un ou deux bords ;
  garder ailleurs un logo entier, avec sa zone et sa taille minimum ;
- à éviter : le poser sur papier ou sur bleu ; le monter au-dessus de .12, le
  passer en contour ou en trame ; s'en servir comme signature.

## 4. Contrôle final

- 8 planches jointives à x = 0, aucun nœud hors planche.
- 755 peintures pleines sur 755 et 21 traits sur 21 liés à une variable (hors
  intérieurs d'instances) ; 5 remplissages image, tous des images du code
  (neige, grain).
- 82 textes, 82 avec un style.
- 6 jeux, 21 variantes, toutes avec un export SVG ; 6 descriptions.
- Les trois SVG importés sont reproduits à l'octet près par les outils du
  dépôt.

## 5. Notes techniques

- **Remplissage « motif »** : Figma sait remplir un cadre avec un nœud source
  (`PATTERN`), mais l'API ne l'écrit pas (type refusé). Les aperçus sont donc
  des instances bord à bord ; dans l'éditeur, une tuile peut servir de motif à
  la main.
- **Import SVG** : `upload_assets` crée un cadre et un vecteur par chemin ; le
  nom du chemin (`id`) devient celui du calque.
- **Peintures liées à un jeton à alpha** (`color/border/default`) : poser
  l'alpha en opacité de la peinture après la liaison.
- **Instance en reflet** : `relativeTransform` à `[[-1, 0, 780], [0, 1, 0]]`.
- **Logo agrandi** : `rescale()` met aussi le rayon de découpe à l'échelle.

## 6. Choix à valider

1. **Courbes, échelle** : cases de 12 px, tuiles de 480. Plus dense (10 px)
   ou plus ouvert ?
2. **Courbes, raccord** : fondu sur 14 cases après retrait de la pente
   moyenne ; le relief est réel hors de cette bande.
3. **Courbes, recettes** : le fond décide (papier : hero ; encre et bleu :
   Benefits). Bleu sur papier : le tracé du hero en bleu .4, des courbes
   bleues que le site n'a pas.
4. **Trace en lacets** : forme construite (rien dans le code), .95 pour toutes
   les couleurs, déclinée aussi en encre et en papier.
5. **Neige** : deux fonds, et pas de neige bleue. `public/images/neige-pixels.png`
   (420 × 420, pixels bleus épars) existe dans le dépôt mais le site ne
   l'emploie pas : hors du kit, sauf avis contraire.
6. **Crête** : variante mobile avec son reflet, 780 × 200, frise raccordable en
   largeur.
7. **Logo en répétition** : grille carrée, 34 px, écart de 13.
8. **Filigrane** : la consigne « pas sur papier ni sur bleu » lit A1 au pied
   de la lettre.

Signalé, hors de cette partie : la description du composant `logo` (page
Composants) parle encore d'un « favicon proposé », passé sur le site le
9 octobre (PR #20).
