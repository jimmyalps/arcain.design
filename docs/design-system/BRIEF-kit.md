Charge les skills figma-use et figma-generate-library. Repasse sur main à jour, en gardant ma modification de CLAUDE.md hors des commits. Ouvre une branche brand-kit, enregistre ce brief dans docs/design-system/BRIEF-kit.md, puis lance la partie 0.

Mission : agis comme un brand designer expert et crée le kit de marque complet de Jimmy Ocks dans le fichier Figma Portfolio, à partir du design system qui s'y trouve (pages Fondations, Composants, Marque, Motion).

Règles
1. Composition libre, valeurs fermées : tu n'utilises que les variables, styles, composants et motifs du design system. Aucune nouvelle couleur, police ou valeur.
2. Le style de trait de mes montagnes est la signature du kit. Reproduis exactement celui de l'Everest du hero et du Mont Blanc de la section ascension, tel que le code les dessine : épaisseur, opacité, courbes maîtresses, perspective, fondu de profondeur.
3. Le logo respecte la page Marque : zone de protection, taille minimum, versions.
4. Les textes viennent du site. S'il en manque, mets un texte d'attente clairement marqué, n'invente rien.
5. Aucune skill de goût (design-taste, brandkit, impeccable).
6. MCP Figma : 80 lignes max par exécution. Après chaque bloc, fais une capture et vérifie.
7. Chaque frame a ses réglages d'export : PNG 2x pour les écrans, PDF pour l'impression, SVG pour les motifs.
8. Avance par parties et arrête-toi à chaque STOP pour que je valide.

Partie 0 : Référence
Étudie la façon de travailler d'un brand designer dont j'admire le niveau. Ouvre six de ses projets avec ton navigateur sans fenêtre et capture-les en entier.
Analyse comment il construit et présente un système visuel : motifs, fonds, compositions, grilles, typographie, usage de la couleur, rythme des pages de guidelines, mises en situation. Dégage ce qu'on reprend de sa méthode, appliqué à ma marque. Prends sa méthode, jamais ses visuels. STOP.

Partie 1 : Motifs (page « Kit Motifs »)
Tuiles raccordables tirées de l'univers graphique : courbes de niveau dans le style de la règle 2, trace en lacets, neige pixel, crête, logo en répétition, grain. Chacune est déclinée dans les combinaisons de ma palette (papier, encre, bleu) qui gardent un bon contraste. STOP.

Partie 2 : Fonds (page « Kit Fonds »)
Des fonds composés, pas des aplats, sur ces formats :
- impression : A4 et A3 portrait ;
- réseaux : 1080×1350, 1080×1080, 1080×1920, 1920×1080 ;
- bannières : LinkedIn 1584×396, X 1500×500 ;
- fonds d'écran : 2560×1440 et 1179×2556.
Pour chaque format, au moins trois fonds : un sur bleu, un sur encre, un sur papier. STOP.

> Parties 1 et 2 remplacées le 9 octobre 2026 par la nouvelle méthode : voir « Partie 1 rejetée, nouvelle méthode », plus bas.

Partie 3 : Templates (page « Kit Templates »)
Avec mes vrais contenus (Jimmy Ocks, « Pour que ta marque tienne en altitude », jimmyferon.com, @jimmy.ocks) :
- affiches A4 et A3 ;
- posts : annonce, citation, projet, et un carrousel de 5 slides ;
- story et couverture de Reel ;
- bannières LinkedIn et X ;
- carte de visite recto verso (85 × 55 mm).
Chaque texte est modifiable et lié aux styles. STOP.

Partie 4 : Brand guidelines (page « Brand guidelines »)
Un document en pages de 1920×1080, exportable en PDF : couverture, sommaire, la marque, logo (construction, zone de protection, tailles, versions, usages interdits), couleurs, typographie, univers graphique, motifs, iconographie, composants clés, motion, applications (les templates en situation). STOP.

---

## Arbitrages de la partie 0 (9 octobre 2026)

Référence validée. Elle posait six questions ; leurs réponses, ci-dessous, font foi.

- A1 — Filigrane : le logo peut être agrandi et coupé par le bord du cadre, en papier .12 sur encre, comme le logo du menu du footer. C'est un usage graphique, pas une signature : il ne remplace jamais le logo, qui garde ailleurs sa zone de protection (13/34 D) et sa taille minimum (34 px). Il se documente comme tel, dans la page Kit Motifs et dans les guidelines.
- A2 — Nom : « Jimmy Ocks » s'écrit en mention Space Mono, en capitales, à côté du logo, comme le rideau écrit « JIMMY FERON — PORTFOLIO 2026 ». Pas de logotype.
- A3 — Cadres écran : construits à la moitié de la taille demandée et exportés en PNG 2x, pour obtenir exactement les pixels voulus avec les styles du site à leur taille. 1080 × 1350 → 540 × 675 ; 1080 × 1080 → 540 × 540 ; 1080 × 1920 → 540 × 960 ; 1920 × 1080 → 960 × 540 ; LinkedIn 1584 × 396 → 792 × 198 ; X 1500 × 500 → 750 × 250 ; fond d'écran 2560 × 1440 → 1280 × 720 ; pages des guidelines 1920 × 1080 → 960 × 540. Fond d'écran mobile : 393 × 852, exporté en 3x (1179 × 2556). L'impression reste en points, export PDF, comme proposé au §5 : A4 595 × 842, A3 842 × 1191, carte de visite 85 × 55 mm.
- A4 — Mises en situation : à plat, avec les seuls éléments du système. Pas de photo.
- A5 — Les branches du logo ne reçoivent aucun sens nouveau : la composition qui posait les cinq étapes de Benefits sur les cinq branches est écartée.
- A6 — Tuiles de motifs vues de dessus, avec le trait, l'opacité et les courbes maîtresses du code. La perspective et le fondu de profondeur vont aux fonds de la partie 2.

La partie 1 se fera dans une nouvelle session.

## Partie 1 rejetée, nouvelle méthode (9 octobre 2026)

La partie 1 est rejetée : les tuiles sont plates, génériques et sans
composition. La page Kit Motifs (`328:2`) n'était déjà plus dans le fichier
Figma à l'ouverture de la session suivante : il n'y avait rien à supprimer.
`kit-motifs.md` et les trois outils de tuiles (`tuiles-courbes.mjs`,
`tuile-lacets.mjs`, `apercu-tuiles.mjs`) sont retirés du dépôt ; l'historique
les garde (`7480e62`, `4475302`).

La méthode suivante remplace les parties 1 et 2. Les parties 3 et 4 restent à
venir.

Nouvelle méthode
1. Plus de tuiles. Des compositions, comme les pros : une idée par visuel, beaucoup d'air, des échelles extrêmes (signe petit et centré, ou énorme et coupé par le bord), un titre franc et de petites mentions alignées aux bords.
2. Les montagnes sont rendues par le code du site lui-même. Écris un script à part, sans toucher au site, qui réutilise le rendu de l'Everest du hero et du Mont Blanc de Benefits : mêmes données, même style de trait, perspective et fondu de profondeur. Caméra, cadrage, couleurs de ma palette et taille de sortie sont au choix. Exporte en PNG haute définition, et en SVG quand c'est possible. L'épaisseur du trait suit la taille d'export pour garder le rendu du site.
3. Mon logo tracé en courbes de niveau : ses contours décalés en lignes fines, comme une carte topographique, construits à partir du SVG du logo.
4. La lumière : ma lueur bleue et mon grain sur l'encre, comme sur le site.
5. Palette, typos et logo restent fermés. La composition et les rendus générés sont libres.

Première livraison, et seulement celle-ci : 6 planches maîtresses en 1920×1080, sur une nouvelle page « Kit Direction » :
- l'Everest en perspective sur encre, avec la lueur bleue et le logo petit et centré ;
- le logo en courbes de niveau, énorme et coupé par le bord, sur bleu ;
- une affiche bleue avec un grand titre et une bande de crête en trait fin ;
- le Mont Blanc en perspective sur papier, en trait encre, avec de petites mentions aux bords ;
- une planche typo sur encre, avec la lueur ;
- une paire de cartes de visite, recto bleu et verso encre.

Fais une capture de chaque planche et juge-la toi-même : une seule idée, de l'air, un contraste d'échelle, une hiérarchie typo nette. Si une planche ressemble à un fond d'écran générique ou à un exercice scolaire, refais-la avant de me la montrer. Commite le script, puis STOP.

Ce que la méthode change dans les arbitrages de la partie 0 :

- **A6 tombe.** Il n'y a plus de tuiles ; la perspective et le fondu de
  profondeur vont à toutes les montagnes, y compris au Mont Blanc, que
  Benefits dessine sans brouillard.
- **A1 reste** (filigrane papier .12 sur encre), mais la page Kit Motifs qui
  devait le documenter n'existe plus : il ira aux guidelines (partie 4).
- **Le logo en courbes de niveau** (point 3) lève, pour ce rendu, l'interdit
  « pas de contour ni de trame » posé à la partie 0. Le dessin du
  logo ne change pas : ses courbes sont calculées à partir de son SVG.

## Livraison 1 : planches maîtresses (9 octobre 2026)

Construite dans Figma et contrôlée, en attente de validation : page
Kit Direction (`346:2`), placée après Motion, six planches de 1920 × 1080,
chacune avec un export PNG 2x (3840 × 2160).

| Planche | Nœud | Fond | L'idée |
|---|---|---|---|
| `planche/1-everest` | `346:3` | encre | le signe se lève sur le sommet : logo de 56 px au centre, dans la lueur ; la pyramide de l'Everest monte du bord bas |
| `planche/2-logo` | `346:6` | bleu | le logo est une carte : moulinet entier, coupé en haut, à droite et en bas, gravé en courbes tous les 6 px, halo de courbes qui s'effacent |
| `planche/3-affiche` | `346:8` | bleu | « Pour que ta marque tienne en altitude » en 168 px, la crête du Mont Blanc en traits fins ferme le bas |
| `planche/4-mont-blanc` | `346:10` | papier | le Mont Blanc en gravure, voie royale en seul trait bleu, posé sur un filet au-dessus d'une barre d'information |
| `planche/5-typo` | `346:12` | encre | « altitude » en 590 px, coupé par le bas, la lueur derrière ; au-dessus, Titres, Texte, Mentions |
| `planche/6-cartes` | `346:14` | papier | la paire en miroir : recto bleu gravé du logo, verso encre (identité, contacts, lueur en angle) |

### Les rendus

Tous viennent de `outils/rendu-courbes.mjs` ; les cinq commandes sont dans
`outils/README.md` et reproduisent à l'octet près les images posées dans Figma
(leur SHA-1 est l'`imageHash` de Figma). PNG en 2x, fond transparent, trait de
2 px, soit 1 px à la taille de la planche. Les fichiers ne sont pas versionnés :
le script les refait.

| Rendu | Recette | Caméra et cadrage | Trait |
|---|---|---|---|
| Everest (planche 1) | `everest` | position du hero, regard levé vers le sommet ; avant-plan hors cadre | papier .4, brouillard 110 à 340, comme le code |
| Logo (planche 2) | `logo` | centre 1350, 560 ; diamètre 1500 ; courbes tous les 6 px ; 18 courbes dehors | papier .28, maîtresses .75 (le contour du logo en est une) |
| Crête (planche 3) | `montblanc` | vu du nord-ouest, au téléobjectif (13,5°), bande de 1920 × 480 | papier .28 et .75, brouillard 7,5 à 12,5 |
| Mont Blanc (planche 4) | `montblanc` | face au sommet, champ de 36,5° | encre .28 et .75, voie royale bleue .95, brouillard 5,4 à 10,4 |
| Recto (planche 6) | `logo` | carte de 748 × 484, diamètre 700, courbes tous les 5 px | papier .28 et .75 |

**Fidélité au site, mesurée.** La même scène, rendue par Three.js r128 avec le
code d'`Everest.js` et de `Benefits.js` recopié, se superpose au rendu du
script : corrélation 0,992 (Everest) et 0,998 (Mont Blanc) après un flou de
7 px, aucune frange de décalage. Le script pose 12 % (Everest) et 16 %
(Mont Blanc) d'encre en moins : WebGL dessine chaque segment à part et
redouble chaque jonction, le script trace des courbes continues. Les opacités
du code sont gardées telles quelles.

### Valeurs

- **Couleurs** : 49 peintures sur 49 liées à une variable. Fonds en
  `color/bg/primary` (mode clair ou sombre posé sur chaque planche) ou
  `color/accent/default` ; textes en `color/text/primary`, `/label`, `/muted` ;
  filet en `color/border/default`.
- **Logo** : instances du composant `logo` (papier en mode sombre).
- **Lueur** : la tache de `.foot-glow`, 660 × 420 avec les rayons de bordure du
  CSS, inclinée comme dans `footMorph`, en `color/glow`, opacité .5, style
  `blur/glow-footer`.
- **Grain** : un rectangle par planche, au-dessus de tout, style
  `effect/grain`.
- **Typo** : 28 textes sur 30 portent un style du système (`label`,
  `altimeter-ev`, `meta`, `body`, `body-sm`, `heading-2`, `heading-4`). Les
  deux autres sont les titres à échelle extrême, 168 et 590 px, qu'aucun style
  ne couvre : Bricolage Grotesque SemiBold, en phrase, serrés à −3 %, comme
  les titres du site.
- **Textes** : ceux du site (`lib/i18n.js`, `data/evmarks.json`,
  `Benefits.js`, `Footer.js`) et le nom « Jimmy Ocks » (A2). Libellés propres
  au kit : Titres, Texte, Mentions, les noms des trois familles, et
  « 85 × 55 mm ».
- **Mentions** à 56 px des bords, comme le menu du header.

### Ce qui a été refait avant de montrer

- **Everest** : les vues d'ensemble donnaient un paysage filaire uniforme,
  sans sujet. Caméra passée sur l'axe du hero, sous le sommet ; avant-plan
  sorti du cadre ; la lueur en ellipse parfaite faisait projecteur, remplacée
  par la tache du site.
- **Logo** : les premiers cadrages, trop serrés, ne se lisaient plus comme le
  logo (motif de fond d'écran). Moulinet entier, courbes resserrées de 12 à
  6 px, éclats le long de l'axe des branches écartés.
- **Affiche** : l'Everest au téléobjectif empilait ses traits à .4 en nuages
  blancs ; crête refaite avec la recette du Mont Blanc. L'altimètre tombait
  sur les traits : passé sur le bord droit.
- **Mont Blanc** : le bord des données coupait le relief en un mur vertical,
  cadrage resserré ; les mentions des coins du bas tombaient sur les traits,
  remplacées par la barre d'information.
- **Typo** : le mot, d'abord à 70 % de la largeur et posé sur le bord, est
  agrandi et franchement coupé ; la ligne des spécimens, qui flottait, rejoint
  le mot.

### Choix à valider

1. **Taille des planches** : construites à 1920 × 1080 et exportées en 2x, pas
   à la moitié comme le voulait A3 : les titres sont à échelle libre, et les
   rendus fixent leur trait à la taille de la planche.
2. **Trait** : 1 px à la taille de la planche, avec les opacités du code ; le
   rendu est 12 à 16 % plus léger que le WebGL du site. Garder, ou compenser ?
3. **Fondu sur le Mont Blanc** : Benefits n'en a pas ; il est ajouté pour
   suivre la méthode et efface le bord des données.
4. **Logo en courbes** : courbes tous les 6 px (5 sur la carte), 18 courbes
   dehors en fondu, opacités de Benefits. Plus serré, plus ouvert ?
5. **Mentions** aux tailles du site (10 et 12 px) : petites sur 1920.
6. **Planche 4** : barre d'information plutôt que mentions aux coins du bas.
7. **Cartes** : recto gravé du logo en courbes plutôt que logo plein ; lueur
   sur le verso.
8. **Affiche** : titre sans point final, comme le hero l'écrit.

## Retours sur la livraison 1 (10 octobre 2026)

1. **Everest sur encre** : l'idée est à retravailler. Explorer d'autres
   cadrages et d'autres scènes parmi les trois du code, le lac compris.
2. **Logo en courbes** : adoré, mais abîmé : il a des pattes qu'il n'a pas.
   Le SVG brut déborde du cercle et le site coupe ces débordements par son
   masque : appliquer le masque d'abord, calculer les courbes ensuite.
3. **Mont Blanc sur papier** : rendu aimé, mais la montagne prend trop de
   place en 16:9 ; une montagne aussi haute est faite pour le 4:5 et le 9:16.
4. **Cartes de visite** : présentation aimée ; le verso encre est trop
   basique, il lui faut un détail fort tiré de la marque.
5. **Affiche bleue** : la préférée, mais la montagne est une image, floue.
   Les montagnes passent en vectoriel (le SVG du script) partout, à défaut en
   PNG 4x.
6. **Planche typo** : à refaire.

En général : la typo est trop petite partout. Une échelle typo dédiée au kit
(polices, graisses et approches du système, seules les tailles sont nouvelles),
appliquée à toutes les planches, mentions comprises, chaque texte lié à un
style. Chaque planche aimée se décline en 4:5 (1080 × 1350), carré
(1080 × 1080) et 9:16 (1080 × 1920), recomposée et non recadrée. Des essais de
logo collé, comme Radiant : en bande bord à bord, et accolé au titre ; usage
graphique, exception à la zone de protection, à documenter comme le filigrane.

## Livraison 2 (10 octobre 2026)

Page Kit Direction (`346:2`) réorganisée en sept sections, une par planche :
24 cadres, chacun exporté en PNG 1x (les pixels exacts du format) et 2x. Les
trois planches écartées (Everest sur encre, Mont Blanc en 16:9, typo) sont
retirées de la page ; l'historique des versions de Figma les garde.

| Section | Planche | Nœud | Format | Fond | L'idée |
|---|---|---|---|---|---|
| 1 · Visuel clé, essais | `planche/1a-lac` | `379:22` | 1920 × 1080 | encre | le signe se lève sur le lac d'Allos : logo de 56 px dans la lueur, au-dessus du plateau et de ses hachures d'eau bleues |
| | `planche/1b-carte` | `379:34` | 1920 × 1080 | encre | le lac vu du ciel, plein cadre comme une carte ; la lueur posée sur l'eau, le lac devient la source de lumière |
| | `planche/1c-voie-royale` | `380:27` | 1920 × 1080 | encre | le Mont Blanc au téléobjectif, la voie royale bleue monte l'arête ; la lueur se lève derrière le sommet, l'altimètre y est posé comme une étiquette |
| | `planche/1d-sommet` | `380:33` | 1920 × 1080 | encre | la pyramide de l'Everest et ses drapeaux bleus, étiquetés comme dans le hero (altitude puis nom) |
| 2 · Logo en courbes | `planche/2-logo-16x9` | `346:6` | 1920 × 1080 | bleu | celle de la livraison 1, logo corrigé |
| | `planche/2-logo-4x5`, `-1x1`, `-9x16` | `374:7`, `374:11`, `374:14` | | bleu | même idée recomposée : zone calme en haut pour les mentions, logo coupé à gauche, à droite et en bas (carré : coupé à droite et en bas) |
| 3 · Affiche bleue | `planche/3-affiche-16x9` | `346:8` | 1920 × 1080 | bleu | celle de la livraison 1, crête vectorielle, titre en 180 |
| | `planche/3-affiche-4x5`, `-1x1`, `-9x16` | `376:7`, `376:13`, `376:19` | | bleu | titre sur trois lignes en 120 (4:5, carré) ou quatre lignes en 180 (9:16), crête recadrée par la caméra pour chaque largeur |
| 4 · Mont Blanc sur papier | `planche/4-mont-blanc-4x5`, `-1x1`, `-9x16` | `377:7`, `377:15`, `377:23` | | papier | la gravure de la livraison 1, du ciel au-dessus du sommet, barre d'information en bas |
| 5 · Typo | `planche/5-typo` | `384:28` | 1920 × 1080 | papier | la voix de la marque : le manifeste du site en 120, avec son retrait de première ligne et sa fin grise, le sous-texte en Roboto, une barre qui nomme les trois voix |
| 6 · Cartes de visite | `planche/6-cartes-16x9` | `346:14` | 1920 × 1080 | papier | la paire de la livraison 1 ; verso refait |
| | `planche/6-cartes-4x5`, `-1x1`, `-9x16` | `378:3196`, `378:3229`, `378:3262` | | papier | la paire empilée en miroir (4:5, 9:16), en chevauchement (carré), cartes à la même taille partout |
| 7 · Logo collé, essais | `planche/7a-bande-4x5` | `385:27` | 1080 × 1350 | bleu | titre en haut, trame de logos papier tangents sur le tiers bas, coupée à gauche, à droite et en bas |
| | `planche/7b-bande-16x9` | `385:189` | 1920 × 1080 | papier | frise de huit logos bleus de 240 px, d'un bord à l'autre |
| | `planche/7c-titre-16x9` | `386:174` | 1920 × 1080 | encre | le logo accolé devant « L'ascension de ta marque. » |
| | `planche/7d-titre-4x5` | `386:186` | 1080 × 1350 | papier | le logo accolé après « altitude », dernier signe du titre en 180 |

### Corrigé, et mesuré

- **Logo** : 19 bords des branches sur 45 traversent le cercle de découpe ;
  le script les gardait entiers dès que leur milieu tombait dans le cercle, et
  leur partie extérieure (jusqu'à 150 unités de 1140 hors du cercle) dessinait
  les pattes. Le masque est maintenant appliqué d'abord : chaque bord est coupé
  au cercle par intersection exacte, puis privé de ce qui tombe dans une autre
  branche. Le contour du logo suit le cercle, comme sur le site.
- **Vectoriel partout** : les 17 rendus sont posés en SVG, importés comme
  vecteurs Figma (un vecteur par niveau d'opacité). Simplification de
  Douglas-Peucker à 0,1 px et coordonnées au dixième : sur la crête, 0,012 %
  de pixels différents (l'anticrénelage seul), SVG 40 % plus léger. Le trait
  reste à 1 px à la taille de la planche.
- **Non-régression** : avec le script modifié, les rendus Everest, crête et
  Mont Blanc de la livraison 1 se refont à l'octet près (SHA-1 égal à
  l'`imageHash` de Figma).
- **Liaisons** : traits liés à `color/text/primary` (papier en mode sombre,
  encre en mode clair) ou `color/accent/default`. Figma impose à une peinture
  liée l'alpha de sa variable : l'opacité de chaque niveau (le fondu de
  profondeur compris) est donc portée par le calque, ce qui donne le même rendu
  pour un tracé seul.
- **Lueur** : le vecteur hérité de la livraison 1 portait un contour noir de
  1 px, flouté avec la tache ; `.foot-glow` n'en a pas, il est retiré.
- **Contrôle final** : 24 planches ; 99 textes, tous liés à un style
  `kit/…` ; 926 peintures pleines, toutes liées à une variable et conformes à
  sa valeur résolue (4 recalées en cours de route : verso de la carte en 16:9,
  blanc stocké au lieu du papier) ; 768 vecteurs de rendu ; un grain par
  planche, par le style de peinture `effect/grain`.

### L'échelle typo du kit

Quinze styles `kit/…`, au pas de ×1,5 arrondi : 16, 24, 36, 54, 80, 120, 180,
270, 400, 600. Chacun reprend d'un style du site la police, la graisse,
l'approche, l'interlignage (en %, donc au même rapport) et la casse ; seule la
taille change. Bricolage suit la règle du navigateur : taille optique égale à
la taille, plafonnée à 96, le maximum de la police. Les titres de la livraison
1 étaient rendus en `opsz 14`, le dessin du texte courant.

| Style | Source | Police | Approche | Interlignage | Tailles |
|---|---|---|---|---|---|
| `kit/display-…` | `text/desktop/display` | Bricolage Grotesque SemiBold | −2,5 % | 102 % | 600, 400, 270, 180, 120, 80, 54 |
| `kit/manifeste-120` | `text/desktop/display` | Bricolage Grotesque SemiBold | −2,5 % | 102 % | 120, retrait de première ligne de 309 px (144 px pour 56 sur le site, même rapport) |
| `kit/lead-36` | `text/desktop/lead` | Roboto Medium | 0 | 138 % | 36 |
| `kit/body-24` | `text/desktop/body` | Roboto Regular | 0 | 160 % | 24 |
| `kit/label-…` | `text/desktop/label` | Space Mono Regular, capitales | +18 % | 160 % | 24, 16 |
| `kit/altimeter-24` | `text/desktop/altimeter-ev` | Space Mono Regular, capitales | +18 % | 200 % | 24 |
| `kit/meta-…` | `text/desktop/meta` | Space Mono Regular | 0 | 160 % | 24, 16 |

Emplois : mentions en `label-24` partout (1,25 % de la largeur en 16:9, 2,2 %
en 1080), à 56 px des bords mesurés sur l'encre des lettres ; altimètres en
`altimeter-24` ; titres en `display-180` (16:9, 9:16) ou `display-120` (4:5,
carré) ; sur la carte, nom en `display-54`, métier en `body-24`, coordonnées
en `meta-24` (7,7 pt à l'échelle réelle de la carte).

### Le verso de la carte

Le détail fort est le lac d'Allos de Let's talk, plateau en courbes et
hachures d'eau bleues, dans le quart bas droit, coupé par le bord, sous la
lueur du footer. C'est la scène de la prise de contact sur le site, qui écrit
« On en discute, idéalement au bord d'un lac » : le verso porte les
coordonnées. Identité en haut à gauche, coordonnées en haut à droite, nom et
métier en bas à gauche.

### A7 — Le logo collé (proposé, à valider)

Usage graphique, pas une signature, comme le filigrane (A1) : il ne remplace
jamais le logo, qui garde ailleurs sa zone de protection (13/34 D) et sa
taille minimum (34 px). Deux formes :

- **La bande** : le logo répété bord à bord, tangent à ses voisins (écart
  nul), en grille droite ou en frise d'une seule rangée, coupé par le cadre ou
  calé d'un bord à l'autre. Une seule version (encre, papier ou bleu) et une
  seule orientation par bande ; chaque logo garde au moins 34 px. La
  quinconce a été essayée et écartée : les branches s'imbriquent et le logo ne
  se lit plus.
- **Le logo accolé au titre** : il prend la hauteur des capitales du titre
  (0,65 em en Bricolage SemiBold), se pose sur sa ligne de base, à 0,1 em du
  premier ou du dernier mot, dans la couleur du titre.

Il se documente avec le filigrane dans les guidelines (partie 4).

### Ce qui a été refait avant de montrer

- **Visuel clé** : les vues d'ensemble de l'Everest restent un paysage
  filaire uniforme, le téléobjectif lointain empile ses traits en ondes ;
  gardé le sommet et ses drapeaux. Ajouté le lac, deux fois, et le Mont Blanc
  au téléobjectif. Sur la voie royale, l'altimètre tombait sur les courbes :
  posé au sommet, comme une étiquette.
- **Mont Blanc vertical** : les premiers cadrages montraient une moitié basse
  de plaine et un sommet petit ; repris depuis la caméra de la livraison 1,
  cadre resserré, sommet vers le tiers haut.
- **Verso** : le lac tombait sur les coordonnées ; redescendu dans le quart
  bas droit, plus petit.
- **Typo** : un premier essai posait l'échelle en chaîne de « A » sur un
  filet, la taille dessous comme une altitude. Écarté : il se lisait comme un
  tableau d'échelle, et le A de Bricolage a le sommet plat. Remplacé par le
  manifeste.
- **Logo collé** : la trame en quinconce, illisible, refaite en grille droite ;
  le titre de 7d, en haut sur un cadre vide aux deux tiers, recomposé en 180
  et ancré en bas.

### Choix à valider

1. **Visuel clé** : lequel des quatre essais garder (ou lesquels) ; il sera
   décliné ensuite dans les trois formats.
2. **Échelle typo** : pas de ×1,5, mentions à 24 px partout ; interlignages et
   approches de la source ; taille optique plafonnée à 96.
3. **Mont Blanc en 16:9** : retiré, remplacé par le 4:5, le carré et le 9:16.
4. **Verso** : le lac de Let's talk et la lueur.
5. **Typo** : le manifeste sur papier. Son accent gris vient de la primitive
   `color/grain-accent` (`#63636a`), qu'aucune variable sémantique ne porte :
   en créer une ?
6. **Texte sur bleu** : `color/text/on-accent` (blanc) plutôt que le label du
   mode sombre à .55, peu lisible sur le bleu.
7. **A7, le logo collé** : la règle ci-dessus.
8. **Construction** : les cadres sont à leur taille finale (1080 de large pour
   les réseaux), exportés en 1x et 2x ; la construction à la moitié (A3) reste
   abandonnée.

## Nouvelles règles (10 octobre 2026)

Elles s'ajoutent aux règles du brief et font foi à partir de la livraison 3.

- Ne supprime rien de ce qui existe : tu ajoutes des variantes à côté.
- Plus aucun nom : je n'ai pas encore choisi le nom de la marque de mon
  portfolio. Retire « Jimmy Ocks » partout sur la page. Là où une signature est
  indispensable, mets le logo seul.
- Les fonds n'ont aucun texte : ni mentions, ni lieux, ni altitudes, ni
  drapeaux. Le texte viendra plus tard, dans les compositions.
- Le grain, la neige pixel et la lueur font partie de ma marque. Utilise-les
  quand ils servent l'image, et va vers l'abstrait.
- Pas de cartes de visite : je les ferai moi-même.

Ce qu'elles changent :

- **A2 tombe** : plus de mention « JIMMY OCKS » à côté du logo ; le pseudo
  @jimmy.ocks, qui porte le nom, sort avec lui. Les textes réels de la partie 3
  (« Jimmy Ocks », @jimmy.ocks) attendent le nom de la marque.
- **Les cartes de visite** sortent du kit (partie 3 et section 6) ; la section
  existante reste sur la page.
- **Les dégradés** : la partie 0 les écartait. Les retours
  ci-dessous en demandent, dans la palette : ils sont admis, comme mélanges des
  seules couleurs de la palette (papier, encre, bleu), grainés.

## Retours sur la livraison 2 (10 octobre 2026)

1. **Logo en courbes** : gardé. Ajouter des essais dans l'esprit de Lumora :
   dégradés grainés dans la palette, logo en
   points ou en pixels comme l'animation de révélation du site, logo géant et
   translucide coupé par le bord, logo posé sur une grille fine.
2. **Affiche bleue** : gardée comme poster simple. Ajouter des variantes avec du
   grain, ou plus abstraites.
3. **Montagne sur papier** : remplacer le Mont Blanc par l'Everest et retirer le
   tracé bleu, garder la composition. Ajouter à côté des variantes avec du
   grain, ou plus abstraites.
4. **Typo** : gardée. Deux variantes pour rappeler le bleu : dans l'une, « du
   concept au sommet » passe en bleu au lieu du gris ; dans l'autre, le gris
   reste et le filet de séparation passe en bleu.
5. **Logo collé** : il y a de l'idée, mais les logos sont mal collés et ça
   bugue. Garder ces essais et en créer d'autres, plus abstraits et originaux :
   avec du grain, de la neige, des montagnes en bleu en fond.
6. **Visuels clés sur encre** : tout est à revoir, sauf le lac en fond complet.
   Mais le lac doit être rempli de bleu, et la lueur ronde floue ne marche pas :
   la retirer. Tester plutôt ces pistes, en fonds abstraits sans texte :
   - le lac plein de bleu, avec ses courbes en trait papier autour ;
   - une lumière portée par les traits eux-mêmes : les courbes s'éclairent vers
     le bleu au centre et s'éteignent vers les bords, sans tache floue ;
   - les courbes colorées par l'altitude, de l'encre au bleu, puis au papier au
     sommet comme de la neige ;
   - la montagne dessinée en pixels de neige, dont la densité suit le relief ;
   - un cadrage macro : quelques courbes à très grande échelle qui traversent le
     cadre ;
   - un dégradé bleu grainé qui monte du bas, avec une crête en pure encre
     devant.

Découpage : **A**, visuels clés sur encre et montagne sur papier, STOP ;
**B**, logo, affiche, typo et logo collé, STOP. Chaque capture est jugée avant
d'être montrée, un commit à chaque STOP.

## Livraison A (10 octobre 2026)

Page Kit Direction (`346:2`). Rien n'est retiré : une section neuve s'insère
sous la section 1, les sections 2 à 7 descendent de 3000 px. Douze planches
neuves ou refaites, sans aucun texte, chacune exportée en PNG 1x et 2x.

### Section 1 bis · Visuel clé — fonds abstraits (`395:183`)

Sept fonds sur encre, 1920 × 1080, un par piste (deux pour le lac).

| Planche | Nœud | Piste | L'idée |
|---|---|---|---|
| `planche/1e-lac-bleu` | `395:184` | lac plein | le cadrage de la 1b, vu du ciel et plein cadre ; le lac en aplat bleu, grainé comme les cartes Services au survol ; ses courbes en papier .26 et .6 autour ; ni lueur ni texte |
| `planche/1f-lac-couche` | `395:185` | lac plein, variante | le lac entier, couché dans la longueur : son rivage se lit comme un sommet, le lac et la montagne dans une seule forme |
| `planche/1g-lumiere` | `395:186` | lumière dans le trait | le Mont Blanc plongé, face nord, ses courbes remplissent le cadre ; la couleur de chaque trait suit sa distance au sommet : cœur papier, halo bleu, extinction vers les bords |
| `planche/1h-altitude` | `395:187` | altitude | l'Everest et ses voisins : courbes en encre sous 56 % de la hauteur du relief, bleues à 78 %, papier dès 93 % ; la base s'éteint dans l'encre, les sommets sont enneigés |
| `planche/1i-neige-pixel` | `395:188` | neige pixel | le même cadrage, en neige pixel de 3 px : densité selon l'éclairage (exposant 2) et l'altitude (de 60 à 93 %), opacité tirée entre .4 et 1 comme `pixels.png` |
| `planche/1j-macro` | `395:189` | macro | un flanc du Mont Blanc vu du ciel, une fenêtre d'un dix-huitième de la largeur des données : treize courbes, deux maîtresses |
| `planche/1k-aube` | `395:190` | dégradé et crête | la crête de l'affiche en encre pure, au quart bas ; derrière, un bleu qui monte du bas et se défait en grain vers le haut |

### Section 4 · Montagne sur papier (`372:17`)

Renommée (« Mont Blanc sur papier »). Le Mont Blanc est remplacé dans ses trois
planches, comme demandé ; l'historique des versions de Figma garde l'ancien
rendu.

| Planche | Nœud | L'idée |
|---|---|---|
| `planche/4-everest-4x5` | `377:7` | la pyramide de l'Everest au trait du hero (encre .4, une courbe tous les 90 m, brouillard papier), sommet à 37 % de la hauteur comme le Mont Blanc ; sans tracé bleu |
| `planche/4-everest-1x1` | `377:15` | même échelle, sommet à 33 % |
| `planche/4-everest-9x16` | `377:23` | même échelle, sommet à 32 % ; la vallée du Khumbu en bas |
| `planche/4d-brume-4x5` | `399:182` | variante avec du grain : une brume bleue grainée monte des vallées sous le trait |
| `planche/4e-neige-bleue-4x5` | `399:232` | variante abstraite : l'Everest en neige pixel bleue, celle de `neige-pixels.png` |

La composition est gardée telle quelle : rendu coupé à 120 px du bas sur le
filet, bande du bas sous le filet. Les quatre textes de chaque planche (nom,
adresse, lieu, altitude) sont retirés : ce sont des fonds.

### Les rendus et les outils

- `rendu-courbes.mjs` reçoit des clés pour ces fonds (`affiner`, `zone`,
  `teinte`, `rampe`, `plein`, `pixels`, `silhouette`, `courbes=0`) ; sans elles,
  les rendus des livraisons 1 et 2 se refont à l'octet près (vérifié en SVG et
  en PNG sur l'Everest de la livraison 1, `d-45`, `a2-carte` et `b-45`).
- `grain-degrade.mjs`, nouveau : le grain des dégradés de 1k et 4d, en points
  d'un pixel dans le bleu de la palette, comme la neige pixel du site.
- Commandes : `outils/README.md`, livraison 3 A.

### Valeurs

- **Peintures** : 444 peintures pleines sur les douze planches, toutes liées à
  une variable (`color/bg/primary`, `color/text/primary`,
  `color/accent/default`), opacités portées par les calques. Les deux seuls
  dégradés sont des masques (aube, brume) : leur peinture ne se voit jamais, le
  bleu visible est un aplat lié.
- **Teinte** : chaque trait coloré est un mélange exact de deux couleurs de la
  palette, obtenu par deux tracés superposés (bleu dessous, papier dessus) :
  aucune couleur hors palette.
- **Grain** : le grain du site sur chaque planche (`effect/grain`). Nouveau
  style `effect/grain-carte` : le grain des cartes Services au survol
  (`.sv2-card:hover::after`), même motif en tuile de 300 px, opacité .6, fondu
  normal ; il donne sa matière au bleu (lac, aube).
- **Images** : en plus du grain, deux textures en PNG, le grain de l'aube
  (3840 × 2160) et celui de la brume (2160 × 2700), bleu de la palette fixé
  dans l'image (une image ne se lie pas à une variable).
- **Nom** : « Jimmy Ocks » retiré des quatre planches de la section 1. Les
  sections de la livraison B (2, 3, 5, 7) et les cartes (6) le portent
  encore : il en sort en B.

### Ce qui a été refait avant de montrer

- **Lac** : le masque d'eau avait deux trous, lus comme des bulles dans
  l'aplat, bouchés ; le cadrage large montrait le bord des données, écarté ;
  l'aplat plat faisait découpage, grainé.
- **Lumière** : sur la pyramide de l'Everest et sur le Mont Blanc au
  téléobjectif, la montagne n'occupait que le bas du cadre et la lumière
  restait grise ; sur le lac, le foyer tombait sur l'eau, sans courbes ;
  l'Everest vu du ciel donnait une carte dense, de fond d'écran. Gardé : le
  Mont Blanc plongé, dont les courbes remplissent le cadre, traits pleins au
  foyer.
- **Altitude** : sur le cadrage de la lumière, les deux pistes se
  ressemblaient ; depuis la caméra du hero, la ligne d'horizon était droite et
  l'avant-plan confus. Gardé : l'Everest dont seuls les hauts sommets émergent ;
  un peu plus de neige après la première capture.
- **Neige pixel** : densité d'abord uniforme, une neige de télévision ;
  exposant sur l'éclairage et limite de neige relevée.
- **Macro** : trente courbes, générique ; six, trop vide et sans forme ;
  gardé treize.
- **Aube** : un dégradé lisse sous une silhouette faisait fond d'écran de
  stock ; le bleu se défait maintenant en grain, la crête descend au quart bas.
- **Everest sur papier** : les premiers cadrages mettaient en avant-plan la
  vallée et ses méandres plats ; resserré sur la pyramide.
- **Variantes papier** : la montagne en grain d'encre seul était illisible (le
  sommet enneigé se fondait dans le ciel) ; le grain posé sur le trait salissait
  l'image ; la silhouette pure, vue de ce côté, aplatissait la pyramide en ligne
  de crêtes ; la brume, d'abord un bloc bleu coupé net par le filet, allégée.

### Choix à valider

1. **Montagne sur papier** : la bande sous le filet est gardée, vide. La garder,
   ou laisser la montagne descendre jusqu'au bord ?
2. **Planches 1a à 1d** : gardées en archive, sans le nom mais avec leurs
   mentions, lieux, altitudes et drapeaux. Les en vider aussi ?
3. **1f, le lac couché** : variante à garder ou à écarter.
4. **`effect/grain-carte`** : nouveau style Figma, tiré de la valeur du site.
5. **Textures en PNG** : les deux seules images du kit avec le grain.
6. **Pour la livraison B** : l'adresse jimmyferon.com porte un nom, sans être
   celui de la marque. La garder là où une mention sert, ou n'y laisser que le
   logo ?

## Réponses et retours sur la livraison A (10 octobre 2026)

Les six choix :

1. **Everest** : remplacé sur place, validé.
2. **Planches 1a à 1d** : ni vidées ni retirées ; gardées avec un libellé
   « Archive ».
3. **Montagne sur papier** : la montagne descend jusqu'au bord ; plus de bande
   vide sous le filet.
4. **1f, le lac couché** : gardé.
5. **Textures en PNG** : les deux sont validées.
6. **jimmyferon.com** : seulement là où une mention de contact sert, comme sur
   l'affiche ; ailleurs, le logo seul (livraison B).

Les fonds :

- **Règle pour la suite** : aucune planche aimée n'est modifiée ni supprimée.
  Les variantes s'ajoutent à côté.
- **Le bleu sur l'encre** : en trait fin, il se voit mal. Sur encre, les
  traits et les points sont en papier, avec des fondus d'opacité qui se
  perdent dans le fond ; le bleu n'y vient qu'en aplat ou en grande masse. Sur
  papier, le bleu en trait et en points marche bien. Pour comparer : deux
  variantes sur encre avec le bleu clair d'interface du site.
- **Aimées** : la lumière (1g), l'altitude (1h), la neige pixel (1i), la macro
  (1j) et, sur papier, la neige bleue (4e). Beaucoup de variantes de chacune :
  décentrées, coupées par le bord, d'autres formes, d'autres styles, des
  dégradés inversés. Toujours abstrait, toujours sans texte.
- **Les lacs** (1e, 1f) : stylés, mais l'aplat bleu est sans âme. Gardés tels
  quels, avec des variantes : des courbes de profondeur dans l'eau, comme une
  carte du fond du lac ; un bleu qui s'assombrit vers le centre, avec du
  grain ; un rivage seulement tracé ; de la neige pixel sur les berges.
- **L'aube** (1k) : piste abandonnée.
- **La brume sur papier** (4d) : piste remplacée par d'autres idées sur papier,
  créatives et abstraites.

Ce que ces retours changent :

- **Le bleu sur encre** : la partie 0 le gardait « à la trace,
  une ligne d'accent ». Sur les fonds, c'est l'inverse : jamais en trait fin
  sur l'encre, seulement en aplat ou en grande masse.
- **Le bleu clair d'interface** : `color/accent/on-dark` (`#7D86FF`, primitive
  `color/blue-light`), celui de l'étiquette du camp dans la modale projet
  (`.ev-modal-camp`). Il n'entre que dans les deux variantes de comparaison.

## Livraison A2 : variantes des fonds (10 octobre 2026)

Page Kit Direction (`346:2`). Aucune planche aimée n'est modifiée : deux
sections neuves s'insèrent, les suivantes descendent (2, 3 et 4 de 7 520 px ;
5, 6 et 7 de 11 380 px). 43 planches neuves, sans aucun texte, chacune exportée
en PNG 1x et 2x.

### Les réponses appliquées

- **Archive** : la section 1 devient « 1 · Visuel clé — essais (archive) ». Un
  libellé « Archive » au-dessus de 1a à 1d, « Archive — piste abandonnée »
  au-dessus de 1k (aube) et de 4d (brume). Rien n'est vidé ni retiré.
- **Section 4** : la montagne descend jusqu'au bord. Sur `4-everest-4x5`,
  `-1x1`, `-9x16` et `4e-neige-bleue-4x5`, le cadre de rendu s'étend à toute la
  hauteur et le filet est retiré. Les rendus, calculés pour le cadre entier, ne
  sont pas refaits.
- **Everest, lac couché, textures PNG** : gardés tels quels.

### Section 1 ter · Fonds sur encre — variantes (`409:182`)

35 planches de 1920 × 1080 sur encre, cinq rangées, une par piste aimée. Sur
encre, traits et points en papier avec leurs fondus d'opacité ; le bleu n'y
entre qu'en aplat ou en grande masse, sauf dans les deux variantes au bleu
clair, faites pour comparer.

| Piste | Planche | Nœud | L'idée |
|---|---|---|---|
| Lumière (1g) | `planche/1g1-papier` | `410:182` | 1g sans bleu : le cœur papier s'éteint dans l'encre |
| | `planche/1g2-decentree` | `410:184` | le sommet au tiers gauche, la lumière s'éteint vers la droite |
| | `planche/1g3-coupee` | `410:186` | le sommet hors champ, coupé par le haut ; la lumière tombe de l'angle |
| | `planche/1g4-couronne` | `410:188` | dégradé inversé : le sommet devient un trou noir, la lumière passe sur les flancs |
| | `planche/1g5-masse-bleue` | `410:190` | la montagne en aplat bleu, les courbes papier s'éteignent dans le bleu |
| | `planche/1g6-neige` | `410:192` | la lumière en neige pixel : un foyer de points papier sur le sommet |
| | `planche/1g7-bleu-clair` | `410:194` | 1g, le bleu clair d'interface à la place du bleu (comparaison) |
| Altitude (1h) | `planche/1h1-papier` | `410:196` | 1h sans bleu : de l'encre au papier |
| | `planche/1h2-ceinture` | `410:198` | dégradé inversé : une ceinture de lumière à mi-pente, base et sommets éteints |
| | `planche/1h3-coupee` | `410:200` | au téléobjectif, la pyramide coupée par le haut |
| | `planche/1h4-vallees-bleues` | `410:202` | vue du ciel : les vallées en aplat bleu, les sommets s'allument en papier |
| | `planche/1h5-mont-blanc` | `410:204` | la même règle sur le Mont Blanc, vu du nord-ouest comme la crête de l'affiche |
| | `planche/1h6-strate` | `410:206` | une seule tranche d'altitude allumée, le reste dans l'encre |
| | `planche/1h7-bleu-clair` | `410:208` | 1h, le bleu clair d'interface à la place du bleu (comparaison) |
| Neige pixel (1i) | `planche/1i1-coupee` | `410:210` | au téléobjectif, la pyramide coupée par le haut |
| | `planche/1i2-contre-jour` | `410:212` | le soleil passé de l'autre côté : seules les arêtes s'allument |
| | `planche/1i3-vue-du-ciel` | `410:214` | la neige vue du ciel, serrée sur l'Everest |
| | `planche/1i4-gros-pixels` | `410:216` | cases de 5 px au lieu de 3 |
| | `planche/1i5-poudre` | `410:218` | cases de 2 px, une poudre |
| | `planche/1i6-masse-bleue` | `410:220` | la montagne en aplat bleu, la neige papier dessus |
| | `planche/1i7-mont-blanc` | `410:222` | le Mont Blanc en neige, vu du nord-ouest |
| Macro (1j) | `planche/1j1-sommet` | `410:224` | un sommet secondaire du Mont Blanc : des courbes fermées |
| | `planche/1j2-col` | `410:226` | un col : deux versants qui se font face |
| | `planche/1j3-fondu` | `410:228` | les courbes de 1j s'éteignent de gauche à droite |
| | `planche/1j4-bande-bleue` | `410:230` | une seule bande entre deux courbes, en aplat bleu |
| | `planche/1j5-masse-bleue` | `410:232` | tout ce qui dépasse une courbe maîtresse, en aplat bleu |
| Lacs (1e, 1f) | `planche/1e1-profondeur` | `410:234` | des courbes de profondeur dans l'eau, comme une carte du fond |
| | `planche/1e2-abysse` | `410:236` | le bleu s'assombrit vers le centre, en grain |
| | `planche/1e3-rivage` | `410:238` | le rivage seulement tracé, les courbes du terrain baissées |
| | `planche/1e4-berges` | `410:240` | la neige pixel sur les berges, arrêtée au bord de l'eau |
| | `planche/1f1-profondeur` | `410:242` | 1e1 sur le lac couché |
| | `planche/1f2-abysse` | `410:244` | 1e2 sur le lac couché |
| | `planche/1f3-echos` | `410:246` | le rivage et ses échos vers l'extérieur, sans terrain |

Les courbes de profondeur sont dessinées, pas mesurées : `lacdata.json` ne
porte qu'un masque d'eau, pas le relief du fond. Ce sont les décalages du
rivage vers l'intérieur, à pas égal, jusqu'au point le plus éloigné des
berges, comme le logo en courbes ; l'abysse suit la même distance.

### Section 4 bis · Fonds sur papier — variantes (`409:183`)

10 planches de 1080 × 1350, la montagne jusqu'au bord. Sur papier, le bleu
marche en trait et en points.

| Piste | Planche | Nœud | L'idée |
|---|---|---|---|
| Neige bleue (4e) | `planche/4e1-coupee` | `410:3447` | la pyramide coupée par le haut, décentrée à gauche |
| | `planche/4e2-poudre` | `410:3449` | cases de 2 px |
| | `planche/4e3-vue-du-ciel` | `410:3451` | la neige vue du ciel |
| | `planche/4e4-mont-blanc` | `410:3453` | le Mont Blanc en neige bleue |
| | `planche/4e5-inversee` | `410:3455` | inversée : fond bleu, neige papier |
| Nouvelles pistes (à la place de la brume) | `planche/4f-lumiere-bleue` | `410:3457` | la lumière sur papier : le sommet bleu, l'encre autour, effacée vers les bords |
| | `planche/4g-altitude-bleue` | `410:3459` | l'altitude sur papier : base effacée, flancs en encre, sommets bleus |
| | `planche/4h-calotte` | `410:3461` | tout ce qui dépasse 7 060 m en aplat bleu, courbes papier dessus, encre devant |
| | `planche/4i-lac-bleu` | `410:3463` | le lac en courbes de profondeur bleues, sans aplat bleu, le terrain en gris autour |
| | `planche/4j-macro-bande` | `410:3465` | la macro sur papier : courbes encre et une bande bleue |

### Les rendus et les outils

- `rendu-courbes.mjs` reçoit de nouvelles clés : `bleu-clair`, `aplat`,
  `aplatVu`, `aplatApres`, `rivage`, `isobathes`, `echos`, `lissage`,
  `abysse`, `pleinCouleur`, `eauCouleur`, `foyer` pour la neige pixel, `noms`.
  Sans elles, les rendus des livraisons 1 à 3 A se refont à l'octet près (huit
  recettes vérifiées en SVG, deux en PNG).
- Les 43 commandes sont dans `outils/README.md` (livraison 3 A2) : relancées
  depuis le README, elles refont les 43 SVG importés à l'octet près. Les deux
  textures d'abysse ont pour SHA-1 leur `imageHash` dans Figma.
- **Aplat vu** : la calotte remplissait d'abord le contour d'altitude projeté,
  c'est-à-dire la coupe horizontale de la montagne : juste vue du ciel (1h4,
  1j4, 1j5), fausse en perspective. `aplatVu` calcule l'aplat sur le relief vu,
  avec tampon de profondeur, en cases de 0,75 px : son bord suit la crête et ce
  qui passe devant.

### Valeurs

- **Peintures** : 1 751 peintures pleines sur les 43 planches, toutes liées à
  une variable (`color/bg/primary`, `color/text/primary`,
  `color/text/on-inverse`, `color/accent/default`, `color/accent/on-dark`),
  opacités portées par les calques.
- **Bleu clair** : `color/accent/on-dark` est lié aux traits de 1g7 et 1h7. Sa
  portée ne déclare que le texte (`TEXT_FILL`) : l'API accepte la liaison sur un
  trait, mais l'interface de Figma ne la proposera pas.
- **Grain** : `effect/grain` sur chaque planche. Sur l'eau des lacs pleins, le
  grain des cartes (`effect/grain-carte`), par le groupe « lac grainé » de 1e
  et de 1f cloné : les rivages tombent au pixel près (écart nul).
- **Images** : en plus des grains, deux textures d'abysse en PNG
  (3840 × 2160), encre de la palette fixée dans l'image.
- **Libellés** : 13 textes posés sur les sections, hors des planches, en
  `kit/label-24` et `color/text/label` ; aucun texte dans les planches.

### Ce qui a été refait avant de montrer

- **Lumière** : la couronne laissait au sommet un cœur sombre trop petit et se
  confondait avec 1g1 ; cœur élargi. Une carte vue du ciel en dégradé inversé,
  trop dense, écartée.
- **Altitude** : la rampe inversée (base claire, sommets éteints) donnait un
  tapis de traits sans sujet, trois strates se lisaient mal, les vallées en
  lumière vues du ciel restaient vides : écartées. Gardées la ceinture et une
  strate seule.
- **Neige pixel** : la neige inversée (vallées enneigées, sommets nus) était
  illisible, deux fois ; remplacée par le contre-jour. Vue du ciel, la première
  passe faisait une neige de télévision ; resserrée sur l'Everest.
- **Macro** : un dôme répétait le col, et la neige pixel en macro n'avait plus
  de relief lisible : écartés.
- **Lacs** : les courbes de profondeur cassaient en angles sur l'axe du lac,
  adoucies (champ de distance lissé) ; la neige des berges tombait loin du
  lac, ramenée sur la bande d'altitude du rivage ; le rivage seul gardait des
  courbes de terrain trop présentes, baissées.
- **Papier** : le lac bleu laissait voir le terrain sous l'eau, effacé par un
  aplat papier ; la calotte, d'abord calculée en coupe, refaite en aplat vu.

### Choix à valider

1. **Bleu clair sur encre** : 1g7 et 1h7, face à 1g1 et 1h1 (papier seul) et
   aux originaux en bleu. Si le bleu clair est retenu, élargir la portée de
   `color/accent/on-dark` aux traits et aux formes.
2. **Variantes à garder** : par piste, celles qui passent en déclinaisons
   (4:5, carré, 9:16).
3. **Archives** : 1k et 4d sont libellées « Archive — piste abandonnée »
   plutôt que retirées, comme 1a à 1d.
4. **Profondeur du lac** : dessinée à partir du rivage, faute de relief du fond
   dans les données.
5. **Textures d'abysse** : deux PNG de plus, comme les grains de la
   livraison A.
6. **Section 4** : le cadre « rendu » qui coupait la montagne reste, étendu à
   toute la planche ; il ne coupe plus rien.

## Réponses et retours sur la livraison A2 (10 octobre 2026)

Jimmy a relu la page Kit Direction et retiré lui-même ce qu'il n'aimait pas :
ce qui reste sur la page est validé.

### Décision : deux DA, à égalité

- **La DA trait** : les courbes de niveau en trait, comme sur le site.
- **La DA pixels** : la montagne dessinée en pixels de neige.

Toute la suite se décline dans les deux.

### Les six choix

1. **Bleu clair sur encre** (1g7, 1h7) : pas retenu pour l'instant.
2. **Variantes à garder** : celles qui restent sur la page. Les déclinaisons en
   4:5, carré et 9:16 se feront plus tard, dans les deux DA, sur les planches
   restantes.
3. **Archives** : validées.
4. **Profondeur du lac** : validée.
5. **Textures d'abysse** : validées.
6. **Section 4** : le cadre étendu à toute la planche, validé.

### Ce qui a été retiré de la page

Relevé à l'ouverture de la session suivante :

- **sections 1 et 1 bis** : retirées en entier (1a à 1d en archive ; 1e, 1f,
  1g, 1h, 1i et 1k). `planche/1j-macro` (`395:189`) est déplacée dans la rangée
  macro de 1 ter, à la place de 1j5 ;
- **1 ter** : 1g5-masse-bleue, 1h2-ceinture, 1h4-vallees-bleues,
  1i6-masse-bleue, 1j5-masse-bleue, 1e2-abysse, 1e4-berges et 1f2-abysse ;
- **4 bis** : 4e3-vue-du-ciel, 4g-altitude-bleue et 4h-calotte ;
- **sections 2 à 7** : inchangées.

### Pour la livraison B

1. **Logo** : les planches restent. Des essais dans l'esprit de Lumora : logo
   en pixels de neige comme l'animation de révélation du site, logo en courbes
   de niveau, logo géant et translucide coupé par le bord, logo sur une grille
   fine, dégradés grainés dans la palette.
2. **Affiche bleue** : elle reste, avec des variantes plus abstraites, en trait
   et en pixels, avec du grain.
3. **Typo** : elle reste, avec deux variantes. Dans l'une, « du concept au
   sommet » passe en bleu au lieu du gris ; dans l'autre, le gris reste et le
   filet de séparation passe en bleu.
4. **Logo collé** : les essais restent. D'autres, plus abstraits et originaux,
   avec le trait, les pixels de neige, le grain et des montagnes bleues en fond.
5. **« Jimmy Ocks »** sort des sections 2, 3, 5, 6 et 7 ; jimmyferon.com reste
   seulement là où une mention de contact sert.

Chaque essai se propose dans les deux DA quand ça a du sens.

### Pour plus tard, à ne pas faire maintenant

- **Le traileur** : des variantes des deux DA avec un traileur qui grimpe une
  montagne, en abstrait. Le hero Everest du site en a déjà la silhouette, à
  réutiliser : `poseFigure` dans `components/Everest.js`, quinze segments bleus
  (buste, tête en losange, jambes, bras et deux bâtons), animés par la distance
  parcourue.

### Ce que ces retours changent

- **Le logo en pixels de neige** lève à son tour l'interdit « pas de trame »
  de la partie 0, comme le logo en courbes avait levé celui du
  contour : le dessin du logo ne change pas, ses pixels sont tirés de son SVG,
  comme le fait l'animation de révélation du site (`components/LogoReveal.js`).
- **Le bleu clair** : `color/accent/on-dark` garde sa portée (le texte seul).

## Livraison B (10 octobre 2026)

Page Kit Direction (`346:2`). Quatre sections neuves s'insèrent après celles
qu'elles prolongent ; les suivantes descendent (3 de 3 320 px ; 4, 4 bis et 5
de 6 640 ; 6 et 7 de 8 560). 22 planches neuves de 1920 × 1080, chacune
exportée en PNG 1x et 2x. Aucune planche retirée ; seuls les textes du nom
sortent des planches existantes.

### Le nom retiré

32 textes retirés des sections 2, 3, 5, 6 et 7 : les 25 qui portaient
« Jimmy Ocks », les 5 qui portaient le pseudo @jimmy.ocks, et jimmyferon.com
là où il ne servait pas de contact (7b, 7c ; avec le nom en 2-logo-1x1, avec le
pseudo en 2-logo-16x9). Sur les quatre versos des cartes, la ligne du pseudo
sort des coordonnées.

- **Gardé** : jimmyferon.com en haut à droite des quatre affiches ; sur les
  cartes, jimmyferon.com et l'e-mail, et « Jimmy Feron, Brand Designer &
  UI/UX », qui nomment la personne et non la marque.
- **Signature** : sur le verso des cartes, le logo reste seul en haut à gauche.
  Les affiches n'en reçoivent pas : le coin du nom reste vide.

### Section 2 bis · Logo — essais Lumora (`422:177`)

Une rangée par DA, une colonne par idée ; chaque paire partage son fond. Aucun
texte.

| Idée | DA trait | DA pixels | Fond |
|---|---|---|---|
| Au centre, comme le visuel clé de Lumora | `2e-centre` (`423:177`) : le logo de 600 px gravé en courbes bleues tous les 6 px, cinq échos qui s'éteignent dehors | `2f-revelation` (`423:179`) : l'animation de révélation figée à 1,25 s, 4 000 particules bleues ; les dernières arrivent encore en haut à gauche | papier |
| Relief éclairé | `2g-tanaka` (`423:181`) : courbes éclairées, comme une carte en relief (méthode de Tanaka) : vives sur le versant tourné vers la lumière, éteintes sur l'autre | `2h-neige` (`423:183`) : le logo pris comme un relief, chaque branche une arête ; versant éclairé dense, 30 % de neige à l'ombre | encre |
| Géant, translucide, coupé par le bord | `2i-geant` (`423:185`) : deux branches de 2 600 px traversent le cadre ; le logo en filigrane papier .12 (A1), gravé de ses courbes | `2j-geant` (`423:193`) : les mêmes branches en neige éclairée, densité .75 : l'encre se voit au travers | encre |
| Grille fine | `2k-grille` (`424:182`) : grille de 30 px en encre .08, calée sur le cercle du logo (20 cases de diamètre), le logo en courbes bleues | `2l-grille` (`424:184`) : une grille de points tous les 6 px, encre .22 ; les nœuds du logo s'allument en carrés bleus de 5 px, selon l'éclairage | papier |
| Dégradé grainé | `2m-degrade` (`424:186`) : 70 courbes du dehors remplissent le cadre et s'éteignent dans le bleu, un dégradé en trait | `2n-clairiere` (`424:188`) : le logo en neige éclairée au centre d'une clairière bleue ; la neige s'épaissit en grain vers les bords | bleu |

### Section 3 bis · Affiche bleue — variantes (`422:180`)

Chaque variante est une copie de `3-affiche-16x9` après le retrait du nom :
titre, jimmyferon.com, altimètre, grain et exports identiques ; seule la crête
change.

| DA | Planche | Nœud | L'idée |
|---|---|---|---|
| trait | `3e-lumiere` | `425:3793` | la lumière portée par les traits : papier au sommet, éteints vers les bords (la piste 1g) |
| | `3f-sommet` | `425:3875` | seuls les traits au-dessus de 66 % de l'altitude : le sommet flotte |
| | `3g-macro` | `425:3957` | un flanc du Mont Blanc à très grande échelle ; les courbes montent du bas et s'éteignent sous le titre |
| pixels | `3h-neige` | `425:4039` | la crête en neige pixel, éclairée par l'ouest |
| | `3i-contre-jour` | `425:4121` | le soleil de l'autre côté : seules les arêtes s'allument |
| | `3j-congere` | `425:4203` | la neige s'épaissit vers le bas et se défait vers le haut ; il ne reste de la crête qu'un grain |

### Section 5 bis · Typo — variantes (`422:183`)

- `5a-concept-bleu` (`426:182`) : « du concept au sommet » en
  `color/accent/default` ; le point final reste en encre.
- `5b-filet-bleu` (`426:191`) : le gris reste ; le filet passe de
  `color/border/default` à `color/accent/default`, un pixel plein.

### Section 7 bis · Logo collé — nouveaux essais (`422:185`)

| DA | Planche | Nœud | Fond | L'idée |
|---|---|---|---|---|
| trait | `7e-chaine` | `426:200` | encre | six logos de 400 px, tangents, en bas, coupés par les bords ; leurs courbes du dehors se rejoignent et montent en vagues : les logos se collent par leur relief |
| | `7g-pochoir` | `426:204` | papier | l'Everest en courbes bleues ; une rangée de sept logos de 340 px laissée vide, au pochoir |
| pixels | `7f-congere` | `426:202` | bleu | la rangée de 7e en neige éclairée, qui se défait vers le haut |
| | `7h-pochoir` | `426:206` | papier | l'Everest en neige bleue (celle de 4e, jusqu'au pied), la rangée de logos en creux |

### Le « ça bugue » des essais 7a à 7d : trouvé, pas corrigé

Le composant `logo` (`171:144`, page Composants) découpe ses branches en cercle
par un rayon d'angle de 17 px, la moitié de ses 34 px. Une instance agrandie
garde ce rayon : à 180 px (7a), 240 px (7b), 78 px (7c) et 119 px (7d), la
découpe devient un carré aux coins arrondis, et les branches sont tranchées à
plat au lieu de suivre le cercle. Le filigrane de 2i a reçu un rayon de
1 300 px, la moitié de ses 2 600 : il épouse alors exactement les courbes. Les
essais 7a à 7d restent tels quels, gardés en l'état ; le composant est à
corriger à part.

### Les rendus et les outils

- `rendu-courbes.mjs` reçoit des clés pour le logo : `logos`, `soleil`,
  `relief` et `contraste` sur le logo, `pixels`, `fondu`, `halo`, `couronne`,
  `revelation`, `grille`, `points`, `cases`, `cote`, et `evider` sur un relief.
  La distance au contour du logo est cherchée par cases au lieu de la boucle
  sur ses 2 252 segments : même résultat au bit près, et les grands logos se
  calculent en quelques secondes.
- **Non-régression** : six recettes des livraisons précédentes refaites à
  l'octet près (SVG) : la carte de la livraison 1, `f-recto`, `n1-coupee`,
  `g1-papier`, `k1-profondeur` et la crête de l'affiche.
- Les 20 commandes sont dans `outils/README.md` (livraison B) : relancées, elles
  refont à l'octet près les 20 SVG importés.

### Valeurs

- **Peintures** : 570 peintures pleines sur les 22 planches, toutes liées à une
  variable ; opacités portées par les calques.
- **Textes** : 37, tous liés à un style `kit/…` (libellés, affiches, typo).
- **Rendus** : 511 vecteurs, aucune image ajoutée. La grille de points de 2l
  est un filet pointillé (un pixel tracé, cinq vides), importé comme tel.
- **Logo** : une instance, le filigrane de 2i, papier à .12.
- **Grain** : `effect/grain` sur chaque planche.

### Ce qui a été refait avant de montrer

- **Révélation** : à l'échelle de sa toile (1 700 particules), trop pâle ; à
  280 px, illisible. Gardé 600 px, 4 000 particules calées sur le pixel.
- **Neige du logo** : en densité égale, une neige de télévision, déjà refusée
  sur les montagnes ; remplacée par l'éclairage du relief du logo. Sans neige à
  l'ombre, la silhouette se perdait : 30 % gardés.
- **Logo au centre** : 24 puis 40 échos noyaient la silhouette dans une fleur ;
  cinq gardés.
- **Grille en pixels** : des cases à opacité tirée faisaient un patchwork ;
  remplacées par la grille de points dont les nœuds du logo s'allument.
- **Dégradé en pixels** : un halo de neige collé au logo le faisait lire en
  creux ; écarté du logo, il dessinait un contour bleu qui l'épaississait.
  Remplacé par la clairière.
- **Affiche** : une strate d'altitude seule amputait le sommet, écartée ; la
  macro, coupée net en haut de sa bande, est rendue sur toute la planche et
  s'éteint vers le haut.
- **Logo collé** : un halo de neige qui liait les logos brouillait la rangée,
  remplacé par la congère ; dans le pochoir en neige, la vallée nue ne
  dessinait pas les logos, la neige descend jusqu'au pied.
- **Filigrane de 2i** : il débordait des courbes, à cause du rayon du
  composant ; corrigé sur l'instance.

### Choix à valider

1. **Logo** : lesquels des dix essais garder, dans quelle DA.
2. **Révélation** : figée à 1,25 s, le logo presque posé. Plus tôt, il se forme
   encore et un nuage tourne au centre.
3. **Affiches** : le coin du nom reste vide. Y mettre le logo seul ?
4. **Cartes** : « Jimmy Feron » et le métier gardés ; jimmyferon.com et
   l'e-mail aussi, comme contact.
5. **7b et 7c** : jimmyferon.com retiré, faute de contact à servir.
6. **Rayon du logo** : corriger les instances de 7a à 7d (rayon égal à la
   moitié de la taille), et le composant, dans un chantier à part ?
7. **5b** : le filet bleu fait un pixel ; plus présent ?

## Réponses sur la livraison B (10 octobre 2026)

Jimmy a relu la page Kit Direction et l'a corrigée lui-même ; ses corrections
priment. Relevé à l'ouverture de la session suivante : `2e-centre`,
`2g-tanaka`, `2n-clairiere`, `3j-congere` et le libellé « DA trait » de la
section 2 bis ne sont plus dans le fichier. Le reste est inchangé.

1. **Logo** : tous les essais restants sont gardés pour l'instant ; on y
   reviendra.
2. **Affiches** : le logo seul en haut à gauche.
3. **Cartes** : Jimmy les fait lui-même ; laissées en l'état.
4. **7b et 7c** : jimmyferon.com retiré, validé.
5. **Rayon du logo** : à corriger sur les instances de 7a à 7d ; le composant,
   dans un chantier à part (ci-dessous).
6. **5b** : le filet bleu reste à 1 px pour l'instant.

### Chantier à part : le rayon du composant `logo`

Le composant `logo` (`171:144`, page Composants) coupe ses cinq branches par
son propre cadre, 34 × 34 arrondi à 17 px. Une instance agrandie garde ce
rayon de 17 px : la découpe devient un carré aux coins arrondis, et les
branches, qui débordent du cercle dans le tracé d'`app/icon.svg`, sont
tranchées à plat au lieu de suivre le cercle. En attendant, sur la page Kit
Direction, chaque instance porte un rayon égal à la moitié de sa taille.

À faire dans une branche à part : une découpe qui reste un cercle à toutes les
tailles, puis le contrôle des instances existantes du fichier (pages Marque,
Composants, Kit Direction), dont le rayon posé à la main deviendrait inutile.

### Livraisons C1 et C2, le brief

Livraison C1 : le logo collé, en simple. Les essais 7 bis sont ratés, trop
compliqués. Les garder et ajouter une nouvelle série :

- le logo plein, sans courbes, sans neige, sans découpe ;
- répété bord à bord en bande, comme sur les affiches de Radiant : chaque logo
  touche ses voisins sans les chevaucher, à la même taille, avec un écart
  calculé sur la géométrie réelle du logo ;
- la bande n'occupe qu'une partie du cadre, le reste est un aplat bleu, encre
  ou papier ;
- et le logo accolé à un titre, simplement.

STOP.

Livraison C2 : la partie 3, les templates, sur une page « Kit Templates ». Elle
remplace la partie 3 du brief, plus haut. Pas de cartes de visite. Chaque
template existe dans les deux DA, avec comme fond une planche validée de Kit
Direction :

- affiches A4 et A3 portrait ;
- posts en 1080 × 1350 : annonce, citation, projet (avec un visuel de projet du
  site en exemple) et un carrousel de 5 slides ;
- story et couverture de Reel en 1080 × 1920 ;
- bannières LinkedIn (1584 × 396) et X (1500 × 500).

Les textes viennent du site, sont modifiables et liés aux styles du kit. Pas de
nom de marque : le logo seul sert de signature, et jimmyferon.com n'apparaît
qu'en mention de contact. STOP.

Chaque capture est jugée avant d'être montrée, un commit à chaque STOP.

## Livraison C1 : le logo collé, en simple (10 octobre 2026)

Page Kit Direction (`346:2`). Rien n'est retiré ni déplacé : une section
neuve, « 7 ter · Logo collé — en simple » (`435:227`), s'ajoute sous la
section 7 bis. Huit planches, chacune exportée en PNG 1x et 2x.

### Les réponses appliquées

- **Affiches** : le logo seul, papier, de 44 px, en haut à gauche des quatre
  affiches (section 3) et des cinq variantes de la section 3 bis, qui en sont
  des copies. L'encre du logo est à 56 px du haut et du bord gauche, comme
  celle de jimmyferon.com en face : le haut du logo s'aligne sur le haut des
  capitales de la mention. 44 px est la taille du logo du footer ; sa zone de
  protection (17 px) s'arrête vers 116 px, à 44 px des capitales du titre.
- **Rayon** : les 31 instances de 7a à 7d portent un rayon égal à la moitié de
  leur taille ; la découpe suit le cercle. 7a garde son pas d'origine, le
  diamètre : ses rangées ne se touchent pas, avec 5,8 px de jour entre elles ;
  l'essai reste tel quel.

### L'écart au contact, mesuré

`outils/logo-colle.mjs` (nouveau) lit le logo d'`app/icon.svg` comme
`formeLogo()` : les cinq branches réunies et coupées par le cercle de
1 140 unités. Deux logos identiques poussés l'un vers l'autre se touchent quand
l'écart de leurs centres vaut la plus grande étendue de l'encre sur une ligne
parallèle à la poussée.

| Sens | Pas | Contact |
|---|---|---|
| Rangée (voisins à gauche et à droite) | 1 139,61 unités, 99,966 % du diamètre | ligne y = 584,9 : les extrémités gauche et droite du cercle, juste sous l'axe |
| Colonne (voisins au-dessus et au-dessous) | 1 103,50 unités, 96,798 % du diamètre | ligne x = 713,1 : la pointe de la branche du haut contre le pied droit du logo du dessus |

Contrôle, surface commune de deux logos intégrée ligne à ligne : nulle au pas,
en rangée comme en colonne, et entre voisins en diagonale d'une grille droite ;
9,6 et 1,9 unités² à un millième sous le pas. En rangée, le pas est donc celui
du cercle à 0,03 % près : la frise de 7b était juste, c'est le rayon du
composant qui la faisait « buguer ». En colonne, les logos se rapprochent de
3,2 % de plus que leurs cercles.

### Section 7 ter · Logo collé — en simple (`435:227`)

Le logo plein, instance du composant. Dans une bande, tous à la même taille,
en grille droite, au pas de contact. Les tailles sont choisies pour que les
coupes tombent sur des moitiés exactes (7i, 7l) ou que l'encre aille
exactement d'un bord à l'autre (7j, 7m). Aucun texte sur les bandes : le reste
du cadre est un aplat.

| Planche | Nœud | Format | L'idée |
|---|---|---|---|
| `planche/7i-trame-bleu-4x5` | `435:228` | 1080 × 1350 | la trame de Radiant : logos papier de 180 px (pas de 180 sur 174,3) sur le tiers bas, coupés en deux à gauche, à droite et en bas ; le reste en aplat bleu |
| `planche/7j-frise-papier-16x9` | `435:230` | 1920 × 1080 | huit logos bleus de 240 px, l'encre d'un bord à l'autre, debout sur le bord bas ; le reste en aplat papier |
| `planche/7k-colonne-encre-16x9` | `435:232` | 1920 × 1080 | la bande en colonne sur le tiers droit : logos papier de 256 px, deux colonnes et demie, coupées en haut et en bas d'un tiers de logo |
| `planche/7l-trame-papier-9x16` | `435:234` | 1080 × 1920 | logos encre de 270 px sur le tiers haut, coupés en deux à gauche, à droite et en haut ; deux tiers de papier dessous |
| `planche/7m-ruban-bleu-1x1` | `435:236` | 1080 × 1080 | le signe petit et centré : un ruban de vingt logos papier de 54 px, d'un bord à l'autre, au milieu du bleu |
| `planche/7n-titre-papier-16x9` | `435:238` | 1920 × 1080 | « Ta marque / au sommet » en `kit/display-180`, le logo encre après « sommet » |
| `planche/7o-titre-bleu-4x5` | `435:240` | 1080 × 1350 | le logo papier en tête de « L'ascension de / ta marque. » en `kit/display-120` |
| `planche/7p-titre-encre-9x16` | `435:242` | 1080 × 1920 | « Pour que ta / marque / tienne en / altitude » en `kit/display-180`, le logo papier après « altitude » |

Textes du site : `bn3.c5t`, `bn3.title` et `hero.mtA` à `hero.mtD`
(`lib/i18n.js`).

### Le logo accolé, mesuré

La capitale de Bricolage Grotesque SemiBold, mesurée sur l'encre d'un « H »
vectorisé dans Figma, fait 0,66 em (118,8 px en 180, 79,2 en 120), et non
0,65 comme l'écrivait A7. L'encre du logo couvre 98,38 % de sa taille (de
18,25 à 1 139,78 unités) : un logo de 0,671 em (120,76 px en 180, 80,50 en
120) a exactement la hauteur des capitales. Il se pose par le bas de son encre
sur la ligne de base, à 0,1 em de l'encre du mot. En tête, il se suspend dans
la marge : la ligne suivante s'aligne sur le texte. Les titres sont ancrés en
bas à gauche, l'encre la plus basse à 56 px du bord, comme les mentions.

### Valeurs

- **Peintures** : 680 peintures pleines sur les 21 planches touchées (les huit
  neuves, les neuf affiches, 7a à 7d), toutes liées à une variable.
- **Textes** : 35, tous liés à un style `kit/…` ; deux libellés de rangée sur
  la section, en `kit/label-24` et `color/text/label`.
- **Logo** : 122 instances du composant `logo` sur ces planches, toutes au
  rayon de leur demi-taille ; papier ou encre par le mode de la planche, bleu
  par `color/accent/default` posé sur les branches (7j).
- **Grain** : `effect/grain` sur chaque planche.

### Ce qui a été refait avant de montrer

- **7o** : le titre posé en haut, sur 72 % de bleu vide, se lisait comme une
  diapositive inachevée ; ancré en bas.
- **7p** : d'abord en `display-120`, alors que le kit met les titres du 9:16
  en 180 ; en 180, le logo en tête de « L'ascension » débordait la marge
  droite de 1,3 px. Le logo en tête passe sur le 4:5, en 120 ; le 9:16 prend
  le titre de l'affiche 9:16, logo à la fin.

### Choix à valider

1. **Logo des affiches** : 44 px, haut aligné sur les capitales de la mention ;
   posé aussi sur les cinq variantes de 3 bis.
2. **Pas en colonne** : 96,8 % du diamètre, les rangées s'emboîtent de 3,2 % ;
   en rangée, le pas reste celui du cercle.
3. **7m** : le ruban au milieu (signe petit et centré), ou plus bas.
4. **A7 précisé** : capitale à 0,66 em, logo de 0,671 em ; en tête, le logo
   se suspend dans la marge.
5. **Logo sur bleu** : version papier (#F5F5F5) à côté d'un titre en
   `color/text/on-accent` (#FFFFFF). L'écart ne se voit pas, et le logo garde
   une de ses trois versions.

## Réponses sur la livraison C1 (10 octobre 2026)

C1 validée, et ses cinq choix avec elle : le logo de 44 px sur toutes les
affiches (variantes de 3 bis comprises), le pas en colonne de 96,8 % du
diamètre, le ruban de 7m au milieu, la règle A7 précisée (capitale à 0,66 em,
logo de 0,671 em, suspendu dans la marge quand il ouvre le titre), le logo
papier à côté d'un titre blanc sur bleu.

## Livraison C2 : les templates (10 octobre 2026)

Nouvelle page « Kit Templates » (`444:2`), placée après Kit Direction. Elle
remplace la partie 3 du brief, sans cartes de visite. Cinq sections, une
rangée par DA, 28 cadres. La page « Templates » du fichier, qui porte les
maquettes du site, n'est pas touchée.

### Ce que chaque template porte

- **Signature** : le logo seul, 44 px, encre à 56 px des bords (34 px à 40 px
  sur l'A4). Aucun nom de marque.
- **jimmyferon.com**, seulement en mention de contact : affiches, annonce,
  projet, dernière slide du carrousel, story, bannières. Ni sur la citation,
  ni sur les slides 1 à 4, ni sur le Reel.
- **Textes** du site, modifiables, chacun lié à un style `kit/…` ; couleurs
  liées (`color/text/primary`, `/label`, `/muted`, `/on-accent`,
  `color/accent/default`). Espaces insécables devant « : » et « ? » et dans les
  altitudes.
- **Fond** : une planche validée de Kit Direction, copiée quand son format et
  sa place pour le texte s'y prêtent (5 cadres), recomposée sinon (même
  recette, autre cadre ou autre caméra, 23 cadres). La même scène dans les
  deux DA : en trait pour la DA trait, en neige pour la DA pixels.
- **Grain** `effect/grain` sur chaque cadre. **Exports** : PDF pour les quatre
  affiches, PNG 1x et 2x pour les 24 cadres d'écran.

### Sections

| Section | Nœud | Templates (trait, pixels) | Fonds | Couleur |
|---|---|---|---|---|
| 1 · Affiches A4 et A3 | `444:3` | A4 `444:3835`, `444:3855` ; A3 `444:3837`, `444:3857` | crête de 3-affiche ; crête en neige de 3h-neige (cases de 2 pt), recomposées au format | bleu |
| 2 · Posts 1080 × 1350 | `444:6` | annonce `444:3839`, `444:3859` ; citation `444:3841`, `444:3861` ; projet `444:3843`, `444:3863` | annonce : 4-everest-4x5 (papier sur bleu par le mode) et 4e5-inversee, copiés ; citation : 4-everest-4x5 et 4e-neige-bleue-4x5, copiés ; projet : 1h1-papier et la neige de 1i, recomposés, sommets en pied | bleu, papier, encre |
| 3 · Carrousel 5 × 1080 × 1350 | `444:9` | slides 1 à 5 : `444:3845` à `444:3853` ; `444:3865` à `444:3873` | 1h5-mont-blanc en strates (1h6-strate) ; 1i7-mont-blanc, recomposés | encre |
| 4 · Story et Reel 1080 × 1920 | `444:12` | story `444:3875`, `444:3883` ; Reel `444:3877`, `444:3885` | story : 4-everest-9x16 et 4e-neige-bleue, recomposés, sommet à 55 % ; Reel : crête de 3-affiche-9x16, copiée, et sa version en neige | papier, bleu |
| 5 · Bannières | `444:15` | LinkedIn `444:3879`, `444:3887` ; X `444:3881`, `444:3889` | 1h3-coupee et 1i1-coupee, pyramide au tiers gauche, lumière et neige éteintes vers la droite comme 1g2-decentree | encre |

### Les textes

| Template | Textes | Source |
|---|---|---|
| Affiches | « Pour que ta marque tienne en altitude », « Chamonix → Mont Blanc / ALT. 4 810 M » | `hero.mtA` à `hero.mtD`, `Benefits.js` |
| Annonce | « Disponible — freelance & opportunités », « Une idée en tête ? » | `home.status`, `foot.hook` |
| Citation | « Un designer qui avance comme il grimpe… », la fin en bleu (l'accent du site, le bleu de 5a) | `tr2.big` |
| Projet | « Anya », « Branding & UI/UX — projet phare », « Brand & Product Design — 2026 », le visuel `anya-1600` | `lib/projects.js`, `public/images` |
| Carrousel | « L'ascension de ta marque. » en titre courant ; par slide, l'altitude du camp, le titre et la description de l'étape | `bn3.title`, `Benefits.js`, `bn3.c1t` à `bn3.c5d` |
| Story | « Ta marque au sommet », « Une identité visible, mémorable, prête à tenir en altitude. » | `bn3.c5t`, `bn3.c5d` |
| Reel | « L'ascension de ta marque. » | `bn3.title` |
| Bannières | « Je construis des marques qui tiennent en altitude. », « Brand Designer & UI/UX » | `home.blurb`, `home.role` |

Le visuel d'Anya, en noir et blanc, est le seul projet du site qui ne heurte
pas la palette (Preshot est violet, BCC rouge) ; converti en JPEG par
`webp-jpeg.mjs`, Figma n'affichant pas le WebP. Un filet
`color/border/default` le borde : ses noirs se fondaient dans l'encre.

### La typo par format

- **1080 de large** : marges 56, logo 44, mentions `label-24`, titres
  `display-120` (posts) ou `display-180` (story, Reel, altitude du carrousel),
  `display-54` (citation, titres d'étape, bannières), textes `lead-36`, rôle et
  année `meta-24`.
- **A3** (842 × 1191 pt) : la typo exacte de l'affiche 4:5 (marge 56, logo 44,
  `display-120`, `label-24`, `altimeter-24`).
- **A4** (595 × 842 pt) : un cran plus bas dans l'échelle du kit, dont le pas
  de ×1,5 tombe presque sur le rapport √2 de l'A3 à l'A4 : marge 40
  (`space/40`), logo 34 (la taille minimum), `display-80`, `label-16`, y
  compris pour l'altimètre (le kit n'a pas d'`altimeter-16`).
- **Story et Reel** : le bandeau du haut descend à 250 px, sous l'interface
  d'Instagram (barre de progression, profil) et dans la découpe 3:4 de la
  grille du profil.
- **Bannières** : le texte en colonne à droite, la montagne au tiers gauche, à
  droite de la photo de profil.

### Le carrousel

Le site place les cinq camps de Benefits à +1 250, +2 400, +3 400, +4 200 et
+4 810 m. Ramenés au relief de `mbdata.json` (de 920 à 4 787 m, puissance
1,05 comme `Benefits.js`), ils tombent aux fractions 0,075, 0,365, 0,627 et
0,841. Chaque slide allume la tranche entre son camp et le suivant, en trait
comme en neige ; au sommet, tout le massif s'allume. Le même cadrage sur les
cinq slides, la caméra reculée et relevée par rapport à 1h5 pour faire entrer
la vallée de Chamonix dans le bas du cadre.

### Les rendus et les outils

- **23 rendus** neufs ; les commandes sont dans `outils/README.md`
  (livraison C2). Relancées, elles refont les 23 SVG importés à l'octet près
  (SHA-1 égal à l'`imageHash` de Figma, 23 sur 23).
- **`rendu-courbes.mjs`** reçoit une forme de clé : `neige=t0,t1,t2,t3`, une
  tranche d'altitude. Sans elle, rien ne change : trois rendus en neige refaits
  avec le script modifié gardent leur SHA-1.
- **Cinq fonds copiés** de Kit Direction : 4-everest-4x5 (deux fois),
  4e5-inversee, 4e-neige-bleue-4x5, la crête de 3-affiche-9x16.

### Valeurs

- **Peintures** : 1 294 peintures pleines sur les 28 cadres, toutes liées à une
  variable, plages colorées des textes comprises ; opacités des rendus portées
  par les calques.
- **Textes** : 88, tous liés à un style `kit/…` (`label-24` × 30,
  `display-54` × 16, `display-180` × 14, `lead-36` × 12, `display-120` × 6,
  `label-16` × 4, `display-80`, `altimeter-24` et `meta-24` × 2).
- **Logo** : 28 instances du composant, toutes au rayon de leur demi-taille.
- **Rendus** : 1 178 vecteurs ; une seule image, le visuel d'Anya (deux fois).

### Ce qui a été refait avant de montrer

- **Carrousel, panorama** : un seul panorama sur les cinq slides, sommet sur la
  dernière, laissait deux slides vides, des deux côtés du massif : les données
  s'arrêtent au-delà. Remplacé par le même cadrage sur chaque slide.
- **Carrousel, lumière** : d'abord, seul ce qui dépasse le camp restait
  allumé ; les slides 1 et 2 étaient identiques (depuis la caméra de 1h5, tout
  le relief visible dépasse 2 400 m) et la slide 5 ne gardait qu'un point.
  Caméra reculée, puis tranches entre deux camps et massif entier au sommet.
- **Carrousel, descriptions** : en `body-24`, moins de 9 px sur un téléphone ;
  passées en `lead-36`.
- **Bannières** : la chaîne passait sous le texte, « BRAND DESIGNER » barré
  par les traits. Lumière et neige éteintes vers la droite ; deux points de
  neige tombaient encore sur le « B » : pyramide décalée au tiers gauche,
  portée réduite.
- **Citation** : la deuxième ligne commençait par « : » ; espaces insécables.
- **Projet** : filet autour du visuel, dont les noirs se perdaient dans
  l'encre.

### Choix à valider

1. **Affiches** : l'A3 à la typo de l'affiche 4:5, l'A4 un cran plus bas ;
   l'altimètre de l'A4 en `label-16`.
2. **Fonds recomposés** : 23 cadres sur 28 recomposent une planche validée
   (même recette, autre cadre ou caméra) ; 5 la copient.
3. **Carrousel** : une tranche allumée par camp, tout le massif au sommet, le
   même cadrage sur les cinq slides plutôt qu'un panorama.
4. **Annonce** : l'Everest 4:5 en trait papier sur bleu (4-everest-4x5 passé
   en mode sombre), en face de 4e5-inversee.
5. **Story et Reel** : bandeau à 250 px, pour la zone sûre d'Instagram, au
   lieu de 56.
6. **Bannières** : la règle de 1g2-decentree appliquée à 1h3 et 1i1.
7. **Projet** : Anya en exemple, avec son filet ; jimmyferon.com en contact.

## Réponses et retours sur la livraison C2 (10 octobre 2026)

Trois des sept choix sont validés : **1** (l'A3 à la typo de l'affiche 4:5,
l'A4 un cran plus bas), **2** (les fonds recomposés) et **5** (le bandeau de la
story et du Reel à 250 px). Les autres sont couverts par les retours qui
suivent.

### Règles pour les templates

Elles s'ajoutent aux précédentes et font foi à partir de la livraison C3.

- **Ne rien supprimer** : on crée à côté.
- **Plus de pic au milieu du cadre.** C2 refaisait toujours la même image, un
  sommet centré. C'est interdit désormais. Aller vers l'abstrait : fragments,
  cadrages macro, coupes par le bord, champs de pixels, courbes qui débordent,
  compositions décentrées.
- **En anglais, et beaucoup moins de texte.** Les textes en français font
  kitsch : on prend les textes anglais du site (`lib/i18n.js`, clés `en`).
- **Des fonds avec le logo**, qui manquaient : centré, géant et coupé, tourné
  par pas de 72°, en pixels, en courbes de niveau.
- **Trois couleurs** : chaque proposition existe sur encre, sur papier et sur
  bleu.
- **Méthode** : avant de composer, une planche de 12 vignettes de compositions
  toutes différentes. On choisit les plus fortes, et seulement ensuite on les
  construit.

### Les trois templates à refaire

1. **Post projet** : la formule de C2 (visuel du projet dans un cadre, bande de
   montagne en dessous, texte empilé) est écartée. Ne pas la reproduire :
   d'autres mises en page, plus libres.
2. **Carrousel** : l'idée est bonne mais mal faite. On le garde et on le refait
   mieux, en plusieurs propositions. La montagne est un seul panorama continu
   sur les cinq slides, avec la trace bleue comme fil conducteur, qui grimpe
   d'une slide à l'autre. Ce qui a été monté reste visible : on ne coupe pas le
   bas à chaque palier. Sur encre, la trace est épaissie pour qu'elle se voie.
   Le relief s'arrête après le massif : cadrer la caméra le long de la crête,
   pour que le massif traverse les cinq slides, ou commencer la bande dans la
   vallée, avec ses courbes basses. Aucune slide vide.
3. **Bannières LinkedIn et X** : écartées en entier. De l'art abstrait, bien
   composé, en plusieurs propositions.

Tout se pose sur la page Kit Templates ; chaque capture est jugée avant d'être
montrée, un commit, puis STOP.

## Livraison C3 : les templates refaits (10 octobre 2026)

Page Kit Templates (`444:2`). Rien n'est retiré : quatre sections neuves
s'ajoutent sous la section 5, de 6 à 9. Chacune s'ouvre sur sa planche de
douze vignettes, puis montre les propositions construites, chacune sur encre,
sur papier et sur bleu. 96 cadres, chacun exporté en PNG 1x et 2x.

### La méthode : douze vignettes, puis la construction

Chaque planche pose douze compositions toutes différentes, faites avec les
vrais rendus, les vrais visuels, le logo et la typo du kit, en réduction
(images, sans export : ce sont des esquisses). La légende de chaque vignette
nomme son idée ; celles qui sont construites portent la lettre de leur
proposition.

| Planche | Construites | Écartées, et pourquoi |
|---|---|---|
| Post projet | 05 → A, 06 → B, 11 → C, 12 → D | 10 refait un sommet au centre ; 09 donne une neige de télévision ; 04 : le grain ne défait pas le visuel, il pose un dégradé dessous ; 03 : les rectangles décalés font cadre d'écran plus que relief ; 07 : le logo géant ne se lit plus sous le visuel ; 01, 02, 08 tiennent, mais restent plus sages que les quatre retenues |
| Carrousel | 03 → A, 02 → B, 05 avec les grandes altitudes de 09 → C | 07 : sous la masse bleue, la trace passe au-dessus de la crête ; 08, la carte vue du ciel, ne grimpe pas ; les autres sont des variantes de mise en texte des trois retenues |
| Bannières | 01 → A, 08 → B, 06 → C, 02 → D | 03, 05, 07 posent un sommet au centre ; 10 : la trace seule dessine encore un pic ; le survol (04) et les cinq rotations (11) vont aux fonds avec le logo ; 09 et 12, plus faibles |
| Fonds avec le logo | 03 → A, 04 → B, 07 → C, 10 → D, 12 → E | les cinq retenues couvrent les cinq demandes (centré, géant et coupé, tourné par pas de 72°, en pixels, en courbes de niveau) ; 01, 02, 05, 06, 08, 09, 11 en sont des variantes |

### Section 6 · Post projet (`464:142`)

| Proposition | Encre | Papier | Bleu | L'idée |
|---|---|---|---|---|
| A · Titre géant | `466:143` | `466:155` | `466:167` | « Anya » en `kit/display-600`, coupé par le bas et par la droite ; le visuel de l'enseigne en haut à droite, la mention en haut à gauche |
| B · Quinconce | `466:180` | `466:192` | `466:204` | les deux visuels du projet en quinconce, l'un coupé à gauche, l'autre à droite ; le titre en pied |
| C · Macro et vignette | `466:217` | `466:320` | `466:423` | le titre en `kit/display-180` en haut, une macro du Mont Blanc en courbes, le visuel en petit dans le coin bas droit |
| D · Le visuel déborde | `466:527` | `466:538` | `466:549` | le visuel agrandi jusqu'à son logo, coupé en haut et sur les côtés ; une bande de la couleur du fond porte le titre à droite et le logo à gauche |

Le titre géant de A est aligné sur l'encre visible : le pied du « A », hors
cadre, portait l'alignement à 56 px, et le jambage coupé tombait à 84 px ;
décalé de 28 px.

### Section 7 · Carrousel (`464:156`)

**La trace.** La voie royale de Benefits part du Nid d'Aigle, à l'ouest du
sommet, et monte vers l'est. Vue du nord, comme sur le site, elle grimpe de
droite à gauche ; avec son raccord en ligne droite depuis Chamonix, elle
dessine un V en plan. Un balayage de 1 080 caméras le confirme : aucune ne la
fait avancer de gauche à droite sur 5 400 px. Et sa pente, même vue de profil,
ne descend pas sous 27° à l'écran, quand la diagonale d'un panorama 4:1 en
fait 14°.

**Le cadrage retenu.** Le massif vu du sud, en plongée de 32° (azimut 8°).
La voie royale, dessinée par-dessus le relief comme dans Benefits (sans test
de profondeur), suit alors la ligne de crête et monte en pente douce, du Nid
d'Aigle, en bas de la slide 1, au sommet, en haut de la slide 5. Le relief
remplit les cinq slides ; le haut des slides 1 et 2 reste du ciel, où se pose
le texte. Le raccord de Chamonix est retiré (`voie=gpx`) : vu du sud, il
revient en arrière.

**Un seul panorama.** Chaque slide est une fenêtre de 1080 × 1350 du même
rendu de 5400 × 1350 (`fenetre=…`) : les cinq se raccordent au pixel, et tout
le relief reste visible, du bas au sommet. Trace de 6 px sur encre et sur bleu
(papier sur bleu), de 4 px sur papier.

**Les camps.** Les altitudes de Benefits (+1 250 à +4 810 m) sont les
étiquettes du récit, une par slide, comme sur le site où les camps ne sont pas
posés sur le relief. La trace réelle va de 2 376 m, le Nid d’Aigle, à 4 761 m
(mesuré par `reperes`) : 2 400 m tombe sous le bord bas de la slide 1, 3 400 m
sur la slide 2, 4 200 m au bord droit de la slide 3 ; 1 250 m n’est pas sur
elle.

| Proposition | Slides 1 à 5, encre | Papier | Bleu | L'idée |
|---|---|---|---|---|
| A · Neige | `471:204`, `471:224`, `471:238`, `471:252`, `471:266` | `471:282` à `471:344` | `471:360` à `471:422` | le panorama en neige pixel (bleue sur papier) ; la mention et le titre du camp en haut à gauche, à 56 px |
| B · Trait et repères | `473:219`, `473:249`, `473:270`, `473:289`, `473:306` | `473:325` à `473:412` | `473:431` à `473:518` | le panorama en courbes ; un repère carré de 16 px sur la trace, au milieu de chaque slide, et le camp écrit à côté, dans le vide que laisse la trace : au-dessus à gauche sur les slides 1 et 2, au-dessous à droite sur les 3 à 5 |
| C · Couloir de lumière | `473:4355`, `473:4466`, `473:4572`, `473:4677`, `473:4783` | `473:4869` à `473:5297` | `473:5383` à `473:5811` | les courbes ne s'allument que le long de la trace (`teinte=trace`, sur 420 px) ; l'altitude en `kit/display-180` et le titre en haut tant que la trace est basse (1 à 3), en bas une fois qu'elle a grimpé (4 et 5) |

Le logo ouvre la slide 1, en haut à droite ; jimmyferon.com ferme la slide 5,
au même endroit.

### Section 8 · Bannières (`464:170`)

De l'art abstrait : ni texte ni logo. Le coin bas gauche, où LinkedIn et X
posent la photo de profil, ne porte pas le sujet.

| Proposition | LinkedIn encre, papier, bleu | X encre, papier, bleu | L'idée |
|---|---|---|---|
| A · Macro, une bande | `469:203`, `469:217`, `469:231` | `469:210`, `469:224`, `469:238` | quelques courbes du Mont Blanc à très grande échelle, une seule bande en aplat entre deux courbes (bleue, papier sur bleu) |
| B · Logo géant en neige | `469:246`, `469:268`, `469:290` | `469:257`, `469:279`, `469:301` | deux branches du logo de 1 500 px en neige éclairée, coupées par le cadre |
| C · Échos du rivage | `469:313`, `469:349`, `469:385` | `469:331`, `469:367`, `469:403` | le rivage du lac d'Allos et ses échos, de part et d'autre d'un vide |
| D · Logo géant en courbes | `469:422`, `469:458`, `469:494` | `469:440`, `469:476`, `469:512` | le logo de 1 300 px gravé de ses courbes, coupé en haut et en bas |

### Section 9 · Fonds avec le logo (`464:184`)

Des fonds sans texte, en 1080 × 1350.

| Proposition | Encre | Papier | Bleu | La demande |
|---|---|---|---|---|
| A · Centré, en neige | `465:143` | `465:154` | `465:165` | centré, en pixels |
| B · Géant et coupé, en courbes | `465:177` | `465:189` | `465:201` | géant et coupé, en courbes de niveau |
| C · Le survol en pose longue | `465:214` | `465:230` | `465:246` | tourné par pas de 72° |
| D · Courbes qui débordent | `465:263` | `465:318` | `465:373` | en courbes de niveau |
| E · Géant, se défait en neige | `465:429` | `465:440` | `465:451` | géant et coupé, en pixels |

**Le pas de 72°.** Tourné de 72°, le logo retombe presque sur lui-même
(5 % d'écart au plus) : cinq rotations superposées donnent un logo qui vibre,
pas un mouvement (vignette 08). C montre le pas lui-même : le survol du site
(`.logo:hover`, 72° en 0,6 s, `cubic-bezier(.65,0,.2,1)`), douze poses du
contour tous les 50 ms, superposées à .3, la pose finale pleine. Le cercle
apparaît là où les branches touchent leur découpe.

### Les textes

En anglais, ceux du site, et beaucoup moins : deux textes par slide, deux ou
trois par post, aucun sur les bannières et les fonds.

| Texte | Source |
|---|---|
| Anya · Branding & UI/UX · 2026 | `cw.p1n`, `cw.p1t`, `cw.p1y` (`lib/i18n.js`) |
| Solid Foundations, One Consistent Image, Interfaces That Convert, A Roped-Team Pace, Your Brand at the Summit | `bn3.c1t` à `bn3.c5t` |
| +1 250 m … +4 810 m | `Benefits.js`, espaces insécables |
| jimmyferon.com | contact |

### Valeurs

- **Peintures** : 2 727 peintures pleines sur les 96 cadres, toutes liées à une
  variable (`color/bg/primary`, `color/text/primary`, `/label`, `/on-accent`,
  `/on-accent-muted`, `color/accent/default`) ; opacités des rendus portées
  par les calques.
- **Textes** : 126 dans les cadres et 77 libellés de section, tous liés à un
  style `kit/…`.
- **Logo** : 21 instances, toutes au rayon de leur demi-taille.
- **Images** : les deux visuels d'Anya du site (`anya-1600`, déjà dans le
  fichier depuis C2, et `anya-enseigne-identite-1200`, converti en JPEG par
  `webp-jpeg.mjs`), 15 fois ; 48 vignettes.
- **Rendus** : 2 490 vecteurs, tirés de 29 SVG.
- **Grain** : `effect/grain` sur chaque cadre.

### Les rendus et les outils

- `rendu-courbes.mjs` reçoit `fenetre`, `voie=gpx`, `traceTrait`,
  `traceCouleur`, `reperes`, `teinte=trace` et, sur le logo, `forme=rect`,
  `rect` et `dedans`. Sans elles, rien ne change : onze recettes des
  livraisons précédentes refaites à l'octet près (SVG), et deux PNG.
- `fusion-svg.mjs`, nouveau : réunit les douze poses du survol en un SVG.
- Les 29 SVG importés se refont à l'octet près depuis les commandes de
  `outils/README.md` (livraison C3) : SHA-1 égal à l'imageHash de Figma.
- Les vignettes sont des esquisses : 71 rendus en réduction (70 de
  `rendu-courbes.mjs`, un grain de `grain-degrade.mjs`), composés en HTML et
  capturés ; ni ces rendus ni la mise en page ne sont versionnés.

### Ce qui a été refait avant de montrer

- **Carrousel, cadrage** : vu du nord, la trace grimpait à rebours ; vu de
  l'ouest, le massif ne couvrait qu'un tiers du panorama ; vu du sud au ras du
  sol, le relief devenait illisible. Gardée la plongée de 32°.
- **Carrousel, matière** : des points épars de neige salissaient le ciel des
  slides 1 et 2, brume resserrée ; le trait manquait de présence, brume
  desserrée.
- **Carrousel, texte** : sur la slide 5 de A, le titre croisait la trace ;
  mention et titre remontés à 56 et 100 px sur toutes les slides, logo de la
  slide 1 passé à droite. Sur B, posées à droite des repères, les étiquettes
  des slides 1 à 3 croisaient la trace qui remonte : déplacées dans le vide.
- **Bannière A, LinkedIn** : un éclat de la bande bleue mordait le coin haut
  droit ; caméra décalée.
- **Survol** : le script écartait les boucles des branches, plus courtes que
  douze fois le pas ; refait avec un pas de 2.

### Choix à valider

1. **Carrousel, la vue du sud** et la voie royale sans le raccord de Chamonix :
   la slide 1 commence au Nid d'Aigle, pas dans la vallée.
2. **Les camps** : des étiquettes du récit, une par slide. Dans B, le repère
   marque le milieu de la slide sur la trace, pas l'altitude réelle du point.
3. **Le texte suit le vide de la trace** : C passe du haut au bas à la
   slide 4, B change de côté à la slide 3.
4. **Bannières** sans texte ni logo.
5. **Le pas de 72°** : le mouvement du survol (C) plutôt que les cinq
   rotations superposées.
6. **Post D** : le visuel du projet recadré jusqu'à son logo.
7. **Les autres templates de C2** (affiches, annonce, citation, story, Reel)
   gardent leurs textes français et leurs sommets centrés : les refaire selon
   les nouvelles règles, dans une prochaine livraison ?
