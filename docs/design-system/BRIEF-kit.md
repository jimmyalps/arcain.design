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
