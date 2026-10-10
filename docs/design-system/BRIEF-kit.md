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
Étudie la façon de travailler de Drapz, un brand designer dont j'admire le niveau. Ouvre ses six projets avec ton navigateur sans fenêtre et capture-les en entier :
https://drapz.design/projects/fugitive
https://drapz.design/projects/radiantui
https://drapz.design/projects/lumora
https://drapz.design/projects/kinect
https://drapz.design/projects/stomic
https://drapz.design/projects/skillio
Analyse comment il construit et présente un système visuel : motifs, fonds, compositions, grilles, typographie, usage de la couleur, rythme des pages de guidelines, mises en situation. Écris docs/design-system/reference-drapz.md : ce qu'on reprend de sa méthode, appliqué à ma marque. Prends sa méthode, jamais ses visuels. STOP.

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

Référence validée : `docs/design-system/reference-drapz.md`. Les six questions sont au §5 du document ; leurs réponses font foi ici.

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
  « pas de contour ni de trame » de `reference-drapz.md` (§3.2). Le dessin du
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
- **Les dégradés** : `reference-drapz.md` (§4) les écartait. Les retours
  ci-dessous en demandent, dans la palette : ils sont admis, comme mélanges des
  seules couleurs de la palette (papier, encre, bleu), grainés.

## Retours sur la livraison 2 (10 octobre 2026)

1. **Logo en courbes** : gardé. Ajouter des essais dans l'esprit de Lumora
   (drapz.design/projects/lumora) : dégradés grainés dans la palette, logo en
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
