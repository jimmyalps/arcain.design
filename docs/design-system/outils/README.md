# Outils de l'audit

Les scripts qui ont produit les mesures de [`../audit.md`](../audit.md), puis
celles des étapes suivantes : [`../fondations.md`](../fondations.md),
[`../composants.md`](../composants.md),
[`../marque-motion.md`](../marque-motion.md) et
[`../documentation.md`](../documentation.md), avec le contrôle de
[`../DESIGN.md`](../DESIGN.md). Pour le kit de marque :
[`../reference-drapz.md`](../reference-drapz.md).

Ils ne font que lire : ni le code du site ni le fichier Figma ne sont modifiés.
Aucune dépendance à installer. Il faut Node 24 (voir `.nvmrc`), et un
navigateur Chromium installé (Chrome, Edge ou Brave) pour les scripts qui
pilotent un navigateur : mesure des styles, polices rendues, grain, CTA mobile.

## Les scripts

Toutes les commandes se lancent depuis la racine du dépôt.

| Script | Ce qu'il fait |
|---|---|
| `extraire-css.mjs` | Inventaire de `globals.css` par catégorie : chaque valeur avec son contexte `@media` et son nombre d'usages. |
| `classes-mortes.mjs` | Classes déclarées dans `globals.css` qui n'apparaissent dans aucune chaîne du JS (`app/`, `components/`, `lib/`). |
| `mesurer-styles.mjs` | Styles calculés de chaque élément porteur de texte et de chaque boîte à classe. Pages `/`, `/work` et `/about`, en 1440 × 900 (souris) et en 390 × 844 (tactile émulé). Écrit `mesures.json`. |
| `tableau-typo.mjs` | Tableau typographique desktop / mobile, construit à partir de `mesures.json`. |
| `polices-rendues.mjs` | Police qui dessine réellement chaque texte témoin. C'est lui qui révèle les glyphes tombés sur une police système. |
| `nom-police.mjs` | Table `name` d'un fichier WOFF2 : famille, style, version, licence. |
| `grain-rendu.mjs` | Étape 2, test D11 : rend seul le motif de grain de `body::after` (PNG transparent 240 × 240) et capture `/work` en 1440 × 900. |
| `grain-mesure.mjs` | Étape 2, test D11 : luminance, écart-type, écart entre voisins et chroma de PNG (captures d'échantillons de grain). |
| `cta-mobile.mjs` | Étape 2 : le double CTA du hero tient-il en 11 px / .06em à 390 px ? Place attribuée et largeur naturelle de chaque bouton, en FR et en EN, et plus petite largeur d'écran qui tient. |
| `ecarts-espacement.mjs` | Historique, étape 2 : rattache chaque padding, margin et gap en px fixe au pas le plus proche de l'échelle base 4, abandonnée le 8 octobre 2026, et liste les écarts. Sans réseau ni navigateur. |
| `usages-espacement.mjs` | Depuis le 8 octobre 2026 : pour chaque valeur fixe de padding, margin ou gap du code, les règles vivantes qui l'utilisent (tableau Markdown, ou JSON avec `--json`). Sert aux descriptions des primitives `space/…`. |
| `regles-css.mjs` | Toutes les règles de `globals.css` dont un sélecteur correspond à un motif, avec ligne et contexte `@media` : le code exact d'un composant, états et points de rupture compris. |
| `mesure-petits-composants.mjs` | Étape 3 : boîtes des boutons, du CTA du header, des liens de nav et des filtres Services en 1440 × 900, et encre réelle des flèches → et ↗ (métriques du canevas, puis pixels d'une capture à l'échelle 8). Sert à dimensionner les icônes de flèche dans les boutons. |
| `capture-scene.mjs` | Étape 3, partie 2 (et étape 4) : capture un élément du site sur fond transparent, tout le reste de la page masqué (fonds et grain compris). Sert aux scènes WebGL (lac de Let's talk, Everest, Mont Blanc), à poser dans Figma sur leurs propres fonds. Le cadre de découpe peut être un parent, quand la scène déborde de la page (le lac sort à −100,8 px). Le défilement accepte une fraction de la course d'un bloc (`.bn3@0.95`), pour les scènes pilotées par le défilement. |
| `mesure-grands-composants.mjs` | Étape 3, partie 2 : boîtes et styles calculés des grands composants (header, menu mobile, boutons icônes, carte projet, modale, FAQ, footer, étiquettes de sommet, altimètres, mode d'emploi, cartes et lignes Services, crête), en 1440 × 900 à la souris puis en 390 × 844 au doigt. En option, captures de référence (header, modale, FAQ, Let's talk, footer, menu mobile). |
| `geometrie-logo.mjs` | Étape 4 : géométrie du logo, lue dans le SVG du code. Les cinq branches sont-elles la même forme, de combien tourne-t-on de l'une à la suivante et autour de quel point, de combien le logo tourné de 72° s'écarte de lui-même ; phase des axes à 72° de la page Marque. Sans réseau ni navigateur. |
| `mesure-logo.mjs` | Étape 4 : vide autour du logo du header, en haut de page et en compact, en 1440 × 900 puis en 390 × 844 au doigt. C'est la mesure qui fixe la zone de protection. |
| `webp-jpeg.mjs` | Étape 4 : convertit une image WebP du site en JPEG avec le navigateur, car Figma n'affiche pas les WebP importés. |
| `verifier-design-md.mjs` | Étape 4, partie 2 : contrôle de structure du `DESIGN.md`, sans dépendance ni réseau. Clés en double, couleurs et dimensions au format CSS, propriétés connues du format, références `{groupe.jeton}` résolues, ordre des huit sections canoniques. Les jetons qu'aucun composant ne cite sont comptés à part : le lint du format ne les signale qu'en avertissement. Sort en erreur s'il trouve un problème. |
| `capture-pages.mjs` | Kit de marque, partie 0 : capture pleine page d'une liste d'URL de référence, en 1440 × 900. Défile lentement jusqu'en bas (images paresseuses, apparitions), masque les calques fixes du bas de l'écran, puis écrit une image entière, des tranches de 1800 px et un JSON par page (titre, texte, polices, images et leur taille d'origine). Les captures restent hors du dépôt. |
| `mesure-planches.mjs` | Kit de marque, partie 0 : pour les planches d'une page capturée (images affichées sur toute la largeur), couleur du fond, marges, part du cadre occupée et écarts entre objets, en %, lus pixel par pixel en 2048 px. Ne vaut que pour une planche à fond uni. |
| `rendu-courbes.mjs` | Kit de marque, nouvelle méthode : les courbes de niveau du site rendues hors du site, sans le toucher. Everest, Mont Blanc et lac d'Allos avec les données, le décodage, le marching squares et les opacités d'`Everest.js`, de `Benefits.js` et de `Lake3D.js` ; caméra de Three.js (champ vertical, `lookAt`) et fondu de `THREE.Fog` r128 (smoothstep), rendu en opacité pour se poser sur n'importe quel fond ; voie royale du Mont Blanc et hachures d'eau du lac par-dessus ; en option, les six drapeaux de l'Everest, avec le point d'ancrage de leur étiquette dans les mesures. Logo : le masque circulaire d'`app/icon.svg` appliqué d'abord (bords coupés au cercle, intersection exacte), puis la distance signée au contour de la forme coupée, dont les courbes de niveau sont les contours décalés. Écrit un SVG (un chemin par niveau d'opacité) et un PNG transparent rendu par le navigateur sans fenêtre ; le trait suit l'échelle d'export (1 px à 1, 2 px à 2). `simplifier=0.1 decimales=1` allège le SVG pour l'import dans Figma (0,012 % de pixels différents sur la crête). Palette fermée : papier, encre, bleu. Depuis la livraison 3, des clés pour les fonds abstraits, sans effet sur les rendus précédents (refaits à l'octet près) : `affiner` et `zone` (grille ré-échantillonnée par Catmull-Rom, pour les cadrages serrés), `teinte` et `rampe` (couleur du trait par altitude ou par distance à un foyer, mélange exact de deux couleurs de la palette par deux tracés superposés), `plein` (le lac rempli de bleu, masque d'eau lissé et sans trous), `pixels` (la montagne en neige pixel, densité réglée par l'éclairage et l'altitude, tampon de profondeur), `silhouette` (l'enveloppe haute du relief, en aplat), `courbes=0`. Livraison 3 A2, mêmes garanties (les rendus précédents se refont à l'octet près) : `bleu-clair` (le bleu clair d'interface, `color/accent/on-dark`, pour les variantes de comparaison), `aplat` (le relief entre deux altitudes rempli en aplat : la coupe, juste vue du ciel ; `aplatVu=1` en perspective, calculé sur le relief vu avec tampon de profondeur ; `aplatApres` le glisse entre deux couleurs de trait), sur le lac `rivage`, `isobathes` et `echos` (le rivage décalé à pas égal vers l'intérieur ou l'extérieur : distance euclidienne exacte au rivage, lissée par `lissage`), `abysse` (une texture PNG à part, des points d'encre de plus en plus serrés vers le centre, chaque point ramené sur le plan d'eau par le rayon de la caméra), `pleinCouleur` et `eauCouleur`, la neige pixel arrêtée au bord de l'eau et réglée par un `foyer` (`inverse=1`), et `noms=1` (chaque chemin porte un `id`, qui devient le nom du calque à l'import dans Figma). Livraison B, le logo dans les deux DA, mêmes garanties : `logos` (plusieurs logos dans un même champ, collés par leurs courbes), `soleil`, `relief` et `contraste` sur le logo (pris comme un relief, sa distance au bord pour altitude : courbes éclairées à la manière de Tanaka, neige dont la densité suit l'éclairage), `pixels`, `fondu`, `halo` et `couronne` (le logo en neige pixel, une neige qui s'éclaircit autour ou une clairière), `revelation` (l'animation de `LogoReveal.js` figée à un instant, mêmes tirages et mêmes courbes d'accélération, à graine fixe), `grille`, `points`, `cases` et `cote` (le logo sur une grille fine, filets ou points), `evider` (sur un relief, la forme des logos laissée vide, au pochoir) ; la distance au contour du logo est cherchée par cases, au bit près le même résultat que la boucle sur tous les segments. |
| `grain-degrade.mjs` | Kit de marque, livraison 3 : le grain d'un dégradé, à la manière de `pixels.png` (points d'un pixel, opacité tirée entre .4 et 1). Chaque point s'allume dans une couleur de la palette avec une probabilité qui suit la hauteur, de `de` à `a` : le dégradé se défait en grain au lieu de fondre. PNG transparent à l'échelle 2 (un point = un carré de 2 px, net à l'export 1x comme 2x), encodé avec zlib, sans navigateur ni dépendance. |
| `logo-colle.mjs` | Kit de marque, livraison C1 : le logo collé. Le pas de deux logos identiques poussés l'un vers l'autre jusqu'au contact, en rangée et en colonne, sur la géométrie réelle d'`app/icon.svg` (branches réunies et coupées par le cercle, lues comme `formeLogo()`) : la plus grande étendue de l'encre sur une ligne parallèle à la poussée. Donne aussi l'encre du logo dans son carré, et contrôle le résultat par la surface commune de deux logos, intégrée ligne à ligne (nulle au pas, non nulle un millième en dessous, nulle en diagonale de la grille droite). En option, les pas en px pour des tailles données. Sans réseau ni navigateur. |

Commandes :

```sh
# Inventaire de globals.css. Sections : colors, type, motion, radius,
# shadow, effects, media, spacing, z, all
node docs/design-system/outils/extraire-css.mjs app/globals.css colors

# Classes mortes
node docs/design-system/outils/classes-mortes.mjs .

# Mesure des styles calculés (environ une minute), puis tableau typo
node docs/design-system/outils/mesurer-styles.mjs <chemin du navigateur> <dossier de sortie>
node docs/design-system/outils/tableau-typo.mjs <dossier de sortie>/mesures.json

# Police réellement utilisée pour chaque texte témoin
node docs/design-system/outils/polices-rendues.mjs <chemin du navigateur> <dossier de profil>

# Nom interne d'une police
node docs/design-system/outils/nom-police.mjs public/fonts/chopin.woff2

# Grain (étape 2) : motif rendu et capture du site, puis mesures
node docs/design-system/outils/grain-rendu.mjs <chemin du navigateur> <dossier de sortie>
node docs/design-system/outils/grain-mesure.mjs <chemin du navigateur> <dossier de profil> <png> [<png>…]

# CTA du hero mobile en 11 px (étape 2)
node docs/design-system/outils/cta-mobile.mjs <chemin du navigateur> <dossier de profil>

# Écarts entre les espacements du code et l'échelle base 4 (étape 2, historique)
node docs/design-system/outils/ecarts-espacement.mjs app/globals.css .

# Usages de chaque valeur d'espacement du code (règle du 8 octobre)
node docs/design-system/outils/usages-espacement.mjs app/globals.css . [--json]

# Règles d'un composant, @media compris (ici les boutons)
node docs/design-system/outils/regles-css.mjs app/globals.css '\.(btnf|cta|menu-btn)\b'

# Boîtes des petits composants et encre des flèches (étape 3)
node docs/design-system/outils/mesure-petits-composants.mjs <chemin du navigateur> <dossier de profil>

# Grands composants, desktop et mobile, captures en option (étape 3, partie 2)
node docs/design-system/outils/mesure-grands-composants.mjs <chemin du navigateur> <dossier de profil> [<dossier de captures>]

# Scène sur fond transparent : ici le lac, découpé sur le bloc Let's talk
# (sous Git Bash, préfixer par MSYS_NO_PATHCONV=1, sinon « / » devient un chemin)
node docs/design-system/outils/capture-scene.mjs <chemin du navigateur> <dossier de profil> lac.png / .lt-3d .foot-dark 6000 .lt 1

# Les trois scènes de la planche « Univers graphique » (étape 4), à l'échelle 2 :
# Everest au chargement, Mont Blanc en fin d'ascension (95 % de la course de .bn3), lac
node docs/design-system/outils/capture-scene.mjs <chemin du navigateur> <dossier de profil> everest.png / .ev-gl "" 4500 .ev-gl 2
node docs/design-system/outils/capture-scene.mjs <chemin du navigateur> <dossier de profil> montblanc.png / .bn3-gl .bn3@0.95 6000 .bn3-stick 2
node docs/design-system/outils/capture-scene.mjs <chemin du navigateur> <dossier de profil> lac.png / .lt-3d .foot-dark 7000 .lt 2

# Géométrie du logo (étape 4)
node docs/design-system/outils/geometrie-logo.mjs app/icon.svg

# Vide autour du logo du header, desktop et mobile (étape 4)
node docs/design-system/outils/mesure-logo.mjs <chemin du navigateur> <dossier de profil>

# WebP du site en JPEG, pour l'importer dans Figma
node docs/design-system/outils/webp-jpeg.mjs <chemin du navigateur> <dossier de profil> public/images/redesign-bg-1600.webp redesign-bg-1600.jpg

# Structure du DESIGN.md (étape 4, partie 2)
node docs/design-system/outils/verifier-design-md.mjs docs/design-system/DESIGN.md

# Kit de marque, partie 0 : les six projets de Drapz en entier, puis les marges
# des planches à fond uni (page:indice, indice compté à partir de 0)
node docs/design-system/outils/capture-pages.mjs <chemin du navigateur> <dossier de profil> <dossier de sortie> https://drapz.design/projects/fugitive https://drapz.design/projects/radiantui https://drapz.design/projects/lumora https://drapz.design/projects/kinect https://drapz.design/projects/stomic https://drapz.design/projects/skillio
node docs/design-system/outils/mesure-planches.mjs <chemin du navigateur> <dossier de profil> <dossier de sortie> fugitive:1 fugitive:2 fugitive:3 radiantui:1 radiantui:3 lumora:2 lumora:3 lumora:4 stomic:3 skillio:1 skillio:3

# Kit de marque, livraison 1 : les cinq rendus de la page Kit Direction (PNG en
# 2x, 3840 px de large, fond transparent). <sortie> sans extension : le script
# écrit <sortie>.svg et <sortie>.png. Everest, crête et Mont Blanc se
# reproduisent à l'octet près ; les deux recettes logo non, depuis la
# livraison 2 : le masque est appliqué avant le calcul, le logo n'a plus de pattes.
node docs/design-system/outils/rendu-courbes.mjs . <chemin du navigateur> <dossier de profil> everest everest couleur=papier camera=-12.0,31.4,-33.4 cible=29.6,46.6,-24.6
node docs/design-system/outils/rendu-courbes.mjs . <chemin du navigateur> <dossier de profil> logo logo couleur=papier centre=1350,560 diametre=1500 pas=6 dehors=18
node docs/design-system/outils/rendu-courbes.mjs . <chemin du navigateur> <dossier de profil> crete montblanc cadre=1920x480 couleur=papier camera=-6.0,3.75,-5.1 cible=0.25,2.3,0.1 fov=13.5 brouillard=7.5,12.5 decalage=0 trace=0
node docs/design-system/outils/rendu-courbes.mjs . <chemin du navigateur> <dossier de profil> montblanc montblanc couleur=encre camera=-0.2,4.25,-6.6 cible=0.2,1.12,-0.5 fov=36.5 brouillard=5.4,10.4
node docs/design-system/outils/rendu-courbes.mjs . <chemin du navigateur> <dossier de profil> carte-recto logo cadre=748x484 couleur=papier centre=500,290 diametre=700 pas=5 dehors=10 maille=1
# Aperçu sur fond, à l'échelle 1 : ajouter fond=encre (ou papier, bleu) echelle=1

# Kit de marque, livraison 2 : les dix-sept rendus posés en vectoriel dans
# Kit Direction. Chaque ligne s'ajoute à « rendu-courbes.mjs . <navigateur>
# <profil> <sortie> » et se termine par « simplifier=0.1 decimales=1 echelle=1 ».
#   a1-lac      lac cadre=1920x1080 cible=0,0.85,0
#   a2-carte    lac cadre=1920x1080 camera=0.35,5.2,0.01 cible=0.35,0,0 fov=40
#   a3-voie     montblanc cadre=1920x1080 couleur=papier camera=-2.0,4.6,-9.5 cible=0.25,2.2,-0.2 fov=17 brouillard=8,13
#   a4-sommet   everest cadre=1920x1080 couleur=papier drapeaux=1 camera=-40,60,110 cible=29.6,34,-24.6 fov=16 brouillard=140,220 opacite=0.4 maitresse=0.4
#   b-169       logo cadre=1920x1080 couleur=papier centre=1350,560 diametre=1500 pas=6 dehors=18 maille=1
#   b-45        logo cadre=1080x1350 couleur=papier centre=540,980 diametre=1500 pas=6 dehors=18 maille=1
#   b-11        logo cadre=1080x1080 couleur=papier centre=720,720 diametre=1300 pas=6 dehors=18 maille=1
#   b-916       logo cadre=1080x1920 couleur=papier centre=540,1300 diametre=1600 pas=6 dehors=18 maille=1
#   c-169       montblanc cadre=1920x480 couleur=papier camera=-6.0,3.75,-5.1 cible=0.25,2.3,0.1 fov=13.5 brouillard=7.5,12.5 decalage=0 trace=0
#   c-45        montblanc cadre=1080x560 couleur=papier camera=-6.0,3.75,-5.1 cible=0.25,2.15,0.1 fov=21 brouillard=7.5,12.5 decalage=0 trace=0
#   c-11        montblanc cadre=1080x460 couleur=papier camera=-6.0,3.75,-5.1 cible=0.25,2.2,0.1 fov=18 brouillard=7.5,12.5 decalage=0 trace=0
#   c-916       montblanc cadre=1080x760 couleur=papier camera=-6.0,3.75,-5.1 cible=0.25,2.05,0.1 fov=24 brouillard=7.5,12.5 decalage=0 trace=0
#   d-45        montblanc cadre=1080x1350 couleur=encre camera=-0.2,4.25,-6.6 cible=0.1,1.6,-0.5 fov=40 brouillard=5.4,10.4
#   d-11        montblanc cadre=1080x1080 couleur=encre camera=-0.2,4.25,-6.6 cible=0.1,1.45,-0.5 fov=37 brouillard=5.4,10.4
#   d-916       montblanc cadre=1080x1920 couleur=encre camera=-0.2,4.25,-6.6 cible=0.0,1.35,-0.5 fov=40 brouillard=5.4,10.4
#   f-recto     logo cadre=748x484 couleur=papier centre=500,290 diametre=700 pas=5 dehors=10 maille=1
#   f-verso     lac cadre=748x484 cible=-2.6,0.95,-2.15 fov=54

# Kit de marque, livraison 3 A : les rendus des fonds abstraits (section
# « 1 bis ») et de la montagne sur papier (section 4), même préfixe et même
# fin de ligne que la livraison 2.
#   a3-lac-bleu        lac cadre=1920x1080 camera=0.35,5.2,0.01 cible=0.35,0,0 fov=40 plein=1 eau=0
#   a3-lac-couche      lac cadre=1920x1080 camera=-0.02,5.4,0.03 cible=-0.03,0,0.03 fov=40 plein=1 eau=0
#   a3-lumiere         montblanc cadre=1920x1080 couleur=papier camera=-0.2,5.6,-5.4 cible=0.1,1.3,0.1 fov=38 brouillard=non trace=0 opacite=0.5 maitresse=1 teinte=lumiere foyer=950,500 portee=1050,640 rampe=papier:0,bleu:0.3,encre:1
#   a3-altitude-b      everest cadre=1920x1080 couleur=papier camera=-30,52,80 cible=29.6,30,-24.6 fov=20 brouillard=150,260 affiner=2 opacite=1 maitresse=1 teinte=altitude rampe=encre:0.56,bleu:0.78,papier:0.93
#   a3-neige           everest cadre=1920x1080 couleur=papier camera=-30,52,80 cible=29.6,30,-24.6 fov=20 brouillard=150,260 affiner=2 courbes=0 pixels=3 densite=1 relief=1 contraste=2 neige=0.6,0.93 soleil=-1,1.2,-0.2 opacite=1
#   a3-macro           montblanc cadre=1920x1080 couleur=papier camera=-1.92,9.6,-0.8798 cible=-1.92,0,-0.88 fov=2 brouillard=non trace=0 decalage=0 affiner=16 zone=0.25,0.55,0.35,0.64
#   a3-crete-basse     montblanc cadre=1920x1080 camera=-6.0,3.75,-5.1 cible=0.25,4.0,0.1 fov=29.8 decalage=0 affiner=2 courbes=0 trace=0 silhouette=encre
#   a3-everest-45      everest cadre=1080x1350 couleur=encre camera=-30,52,80 cible=29.6,32.6,-24.6 fov=21 brouillard=120,220 affiner=2
#   a3-everest-11      everest cadre=1080x1080 couleur=encre camera=-30,52,80 cible=29.6,32.3,-24.6 fov=16.9 brouillard=120,220 affiner=2
#   a3-everest-916     everest cadre=1080x1920 couleur=encre camera=-30,52,80 cible=29.6,26.8,-24.6 fov=29.5 brouillard=120,220 affiner=2
#   a3-neige-bleue-45  everest cadre=1080x1350 couleur=bleu camera=-30,52,80 cible=29.6,32.6,-24.6 fov=21 brouillard=120,220 affiner=2 courbes=0 pixels=3 densite=1 relief=1 contraste=2 neige=0.45,0.93 soleil=-1,1.2,-0.2 opacite=1
# Le grain des dégradés : l'aube (1k) et la brume (4d)
node docs/design-system/outils/grain-degrade.mjs a3-aube-grain.png cadre=1920x1080 echelle=2 couleur=bleu de=140 a=1040 densite=0.9 gamma=1.7
node docs/design-system/outils/grain-degrade.mjs a3-brume-grain-45.png cadre=1080x1350 echelle=2 couleur=bleu de=600 a=1300 densite=0.32 gamma=2.2

# Kit de marque, livraison 3 A2 : les 43 variantes des sections « 1 ter » et
# « 4 bis ». Chaque ligne s'ajoute à « rendu-courbes.mjs . <navigateur> <profil>
# <sortie> » et se termine par « noms=1 simplifier=0.1 decimales=1 echelle=1 ».
# Les deux lignes « abysse » écrivent aussi <sortie>-abysse.png.
#   g1-papier          montblanc cadre=1920x1080 couleur=papier brouillard=non trace=0 opacite=0.5 maitresse=1 teinte=lumiere sur=encre camera=-0.2,5.6,-5.4 cible=0.1,1.3,0.1 fov=38 foyer=950,500 portee=1050,640 rampe=papier:0,encre:1
#   g2-decentree       montblanc cadre=1920x1080 couleur=papier brouillard=non trace=0 opacite=0.5 maitresse=1 teinte=lumiere sur=encre camera=-0.2,5.6,-5.4 cible=-1.3,1.3,0.1 fov=34 foyer=600,440 portee=1080,760 rampe=papier:0,encre:1
#   g3-coupee          montblanc cadre=1920x1080 couleur=papier brouillard=non trace=0 opacite=0.5 maitresse=1 teinte=lumiere sur=encre camera=-0.6,5.2,-3.0 cible=0.8,0.4,-1.0 fov=36 foyer=1476,94 portee=1500,900 rampe=papier:0,encre:1
#   g4-couronne        montblanc cadre=1920x1080 couleur=papier brouillard=non trace=0 opacite=0.5 maitresse=1 teinte=lumiere sur=encre camera=-0.2,5.6,-5.4 cible=0.05,1.3,0.1 fov=30 foyer=982,400 portee=1000,620 rampe=encre:0,encre:0.28,papier:0.62,encre:1
#   g5-masse-bleue     montblanc cadre=1920x1080 couleur=papier brouillard=non trace=0 opacite=0.5 maitresse=1 teinte=lumiere sur=bleu camera=-0.2,5.6,-5.4 cible=0.05,1.3,0.1 fov=30 foyer=982,380 portee=1100,700 rampe=papier:0,bleu:1 silhouette=bleu
#   g7-neige           montblanc cadre=1920x1080 couleur=papier brouillard=non trace=0 sur=encre camera=-0.2,5.6,-5.4 cible=0.05,1.3,0.1 fov=30 courbes=0 pixels=3 densite=1 relief=0.6 contraste=1.5 neige=0,0.35 soleil=-1,1.2,-0.2 opacite=1 foyer=982,361 portee=950,600
#   g6-bleu-clair      montblanc cadre=1920x1080 couleur=papier brouillard=non trace=0 opacite=0.5 maitresse=1 teinte=lumiere sur=encre camera=-0.2,5.6,-5.4 cible=0.1,1.3,0.1 fov=38 foyer=950,500 portee=1050,640 rampe=papier:0,bleu-clair:0.3,encre:1
#   h1-papier          everest cadre=1920x1080 couleur=papier camera=-30,52,80 cible=29.6,30,-24.6 fov=20 brouillard=150,260 affiner=2 opacite=1 maitresse=1 teinte=altitude sur=encre rampe=encre:0.58,papier:0.95
#   h2-ceinture        everest cadre=1920x1080 couleur=papier camera=-30,52,80 cible=29.6,30,-24.6 fov=20 brouillard=150,260 affiner=2 opacite=1 maitresse=1 teinte=altitude sur=encre rampe=encre:0.42,papier:0.62,encre:0.9
#   h3-coupee          everest cadre=1920x1080 couleur=papier camera=-14,46,48 cible=29,27.6,-25 fov=14 brouillard=110,200 affiner=2 opacite=1 maitresse=1 teinte=altitude sur=encre rampe=encre:0.55,papier:0.97
#   h4-vallees-bleues  everest cadre=1920x1080 couleur=papier camera=25,185,-14.99 cible=25,0,-15 fov=30 brouillard=non affiner=2 opacite=1 maitresse=1 teinte=altitude sur=encre rampe=encre:0.56,papier:0.97 aplat=bleu:0:0.42
#   h5-mont-blanc      montblanc cadre=1920x1080 couleur=papier camera=-6.0,3.75,-5.1 cible=0.25,2.0,0.1 fov=22 decalage=0 brouillard=7.5,12.5 trace=0 affiner=2 opacite=0.6 maitresse=1 teinte=altitude sur=encre rampe=encre:0.45,papier:0.95
#   h7-strate          everest cadre=1920x1080 couleur=papier camera=-30,52,80 cible=29.6,30,-24.6 fov=20 brouillard=150,260 affiner=2 opacite=1 maitresse=1 teinte=altitude sur=encre rampe=encre:0.64,papier:0.7,papier:0.74,encre:0.8
#   h6-bleu-clair      everest cadre=1920x1080 couleur=papier camera=-30,52,80 cible=29.6,30,-24.6 fov=20 brouillard=150,260 affiner=2 opacite=1 maitresse=1 teinte=altitude sur=encre rampe=encre:0.56,bleu-clair:0.78,papier:0.93
#   n1-coupee          everest cadre=1920x1080 couleur=papier sur=encre camera=-14,46,48 cible=29,27.6,-25 fov=14 brouillard=110,200 courbes=0 densite=1 relief=1 contraste=2 soleil=-1,1.2,-0.2 opacite=1 affiner=2 pixels=3 neige=0.55,0.93
#   n2-contre-jour     everest cadre=1920x1080 couleur=papier sur=encre camera=-30,52,80 cible=29.6,30,-24.6 fov=20 brouillard=150,260 courbes=0 densite=1 relief=1 contraste=1.3 soleil=1,0.9,0.2 opacite=1 affiner=2 pixels=3 neige=0.55,0.9
#   n3-vue-du-ciel     everest cadre=1920x1080 couleur=papier sur=encre camera=28,140,-19.99 cible=28,0,-20 fov=16 brouillard=non courbes=0 relief=1 soleil=-1,1.2,-0.2 opacite=1 affiner=2 pixels=3 densite=1 contraste=3 neige=0.5,0.9
#   n4-gros-pixels     everest cadre=1920x1080 couleur=papier sur=encre camera=-30,52,80 cible=29.6,30,-24.6 fov=20 brouillard=150,260 courbes=0 relief=1 soleil=-1,1.2,-0.2 opacite=1 affiner=2 pixels=5 densite=1 contraste=2 neige=0.55,0.93
#   n7-poudre          everest cadre=1920x1080 couleur=papier sur=encre camera=-30,52,80 cible=29.6,30,-24.6 fov=20 brouillard=150,260 courbes=0 relief=1 soleil=-1,1.2,-0.2 opacite=1 affiner=2 pixels=2 densite=1 contraste=2 neige=0.6,0.93
#   n5-masse-bleue     everest cadre=1920x1080 couleur=papier sur=encre camera=-30,52,80 cible=29.6,30,-24.6 fov=20 brouillard=150,260 courbes=0 relief=1 soleil=-1,1.2,-0.2 opacite=1 affiner=2 pixels=3 densite=1 contraste=2 neige=0.6,0.93 silhouette=bleu
#   n6-mont-blanc      montblanc cadre=1920x1080 couleur=papier sur=encre camera=-6.0,3.75,-5.1 cible=0.25,2.0,0.1 fov=22 decalage=0 brouillard=7.5,12.5 trace=0 courbes=0 relief=1 soleil=-1,1.2,-0.2 opacite=1 affiner=2 pixels=3 densite=1 contraste=2 neige=0.48,0.9
#   j1-sommet          montblanc cadre=1920x1080 couleur=papier sur=encre brouillard=non trace=0 decalage=0 affiner=16 camera=0.84,9.6,0.4302 cible=0.84,0,0.43 fov=3 zone=0.55,0.78,0.63,0.87
#   j2-col             montblanc cadre=1920x1080 couleur=papier sur=encre brouillard=non trace=0 decalage=0 affiner=16 camera=0.92,9.6,-0.8998 cible=0.92,0,-0.9 fov=3 zone=0.55,0.54,0.64,0.63
#   j3-fondu           montblanc cadre=1920x1080 couleur=papier sur=encre camera=-1.92,9.6,-0.8798 cible=-1.92,0,-0.88 fov=2 brouillard=non trace=0 decalage=0 affiner=16 zone=0.25,0.55,0.35,0.64 teinte=lumiere foyer=-150,540 portee=2250,1700 rampe=papier:0,papier:0.2,encre:1 opacite=0.9 maitresse=1
#   j4-bande-bleue     montblanc cadre=1920x1080 couleur=papier sur=encre camera=-1.92,9.6,-0.8798 cible=-1.92,0,-0.88 fov=2 brouillard=non trace=0 decalage=0 affiner=16 zone=0.25,0.55,0.35,0.64 aplat=bleu:0.6651:0.6772
#   j5-masse-bleue     montblanc cadre=1920x1080 couleur=papier sur=encre camera=-1.92,9.6,-0.8798 cible=-1.92,0,-0.88 fov=2 brouillard=non trace=0 decalage=0 affiner=16 zone=0.25,0.55,0.35,0.64 aplat=bleu:0.7256:1
#   k1-profondeur      lac cadre=1920x1080 sur=encre camera=0.35,5.2,0.01 cible=0.35,0,0 fov=40 eau=0 plein=1 isobathes=9 profondeur=0.6,0.12 lissage=4
#   k2-abysse          lac cadre=1920x1080 sur=encre camera=0.35,5.2,0.01 cible=0.35,0,0 fov=40 eau=0 plein=1 abysse=0.04,1,0.92,1.25 lissage=5
#   k3-rivage          lac cadre=1920x1080 sur=encre camera=0.35,5.2,0.01 cible=0.35,0,0 fov=40 eau=0 rivage=1 opacite=0.16 maitresse=0.36
#   k4-berges          lac cadre=1920x1080 sur=encre camera=0.35,5.2,0.01 cible=0.35,0,0 fov=40 eau=0 plein=1 courbes=0 pixels=3 densite=1 relief=0.5 contraste=1.5 neige=0.42,0.2 soleil=-1,1.1,-0.4 opacite=1
#   k5-couche-profondeur lac cadre=1920x1080 sur=encre camera=-0.02,5.4,0.03 cible=-0.03,0,0.03 fov=40 eau=0 plein=1 isobathes=9 profondeur=0.6,0.12 lissage=4
#   k6-couche-abysse   lac cadre=1920x1080 sur=encre camera=-0.02,5.4,0.03 cible=-0.03,0,0.03 fov=40 eau=0 plein=1 abysse=0.04,1,0.92,1.25 lissage=5
#   k7-couche-echos    lac cadre=1920x1080 sur=encre camera=-0.02,5.4,0.03 cible=-0.03,0,0.03 fov=40 eau=0 courbes=0 rivage=1 isobathes=0 echos=10,0.55,0.06 lissage=3
#   e2-coupee          everest cadre=1080x1350 couleur=bleu sur=papier camera=-14,46,48 cible=33,23.6,-25 fov=20 brouillard=110,200 courbes=0 densite=1 relief=1 contraste=2 soleil=-1,1.2,-0.2 opacite=1 affiner=2 pixels=3 neige=0.45,0.93
#   e8-poudre          everest cadre=1080x1350 couleur=bleu sur=papier camera=-30,52,80 cible=29.6,32.6,-24.6 fov=21 brouillard=120,220 courbes=0 densite=1 relief=1 contraste=2 soleil=-1,1.2,-0.2 opacite=1 affiner=2 pixels=2 neige=0.45,0.93
#   e5-vue-du-ciel     everest cadre=1080x1350 couleur=bleu sur=papier camera=28,140,-19.99 cible=28,0,-20 fov=22 brouillard=non courbes=0 densite=1 relief=1 soleil=-1,1.2,-0.2 opacite=1 affiner=2 pixels=3 contraste=3 neige=0.5,0.9
#   e7-mont-blanc      montblanc cadre=1080x1350 couleur=bleu sur=papier camera=-6.0,3.75,-5.1 cible=0.25,1.75,0.1 fov=30 decalage=0 brouillard=7.5,12.5 trace=0 courbes=0 densite=1 relief=1 soleil=-1,1.2,-0.2 opacite=1 affiner=2 pixels=3 contraste=2 neige=0.45,0.9
#   e3-inversee        everest cadre=1080x1350 couleur=papier sur=bleu camera=-30,52,80 cible=29.6,32.6,-24.6 fov=21 brouillard=120,220 courbes=0 densite=1 relief=1 contraste=2 soleil=-1,1.2,-0.2 opacite=1 affiner=2 pixels=3 neige=0.45,0.93
#   p2-lumiere-bleue   montblanc cadre=1080x1350 couleur=encre sur=papier camera=-0.2,5.6,-5.4 cible=0.05,1.0,0.1 fov=40 brouillard=non trace=0 opacite=0.55 maitresse=1 teinte=lumiere foyer=560,470 portee=800,900 rampe=bleu:0,encre:0.4,papier:1
#   p1-altitude-bleue  everest cadre=1080x1350 couleur=encre sur=papier camera=-30,52,80 cible=29.6,32.6,-24.6 fov=21 brouillard=120,220 affiner=2 opacite=0.6 maitresse=0.6 teinte=altitude rampe=papier:0.4,encre:0.66,bleu:0.93
#   p5-calotte         everest cadre=1080x1350 couleur=encre sur=bleu camera=-30,52,80 cible=29.6,32.6,-24.6 fov=21 brouillard=120,220 affiner=2 opacite=0.4 maitresse=0.4 aplat=bleu:0.74:1 aplatVu=1 aplatMaille=0.75 aplatApres=encre teinte=altitude rampe=encre:0.735,papier:0.745
#   p3-lac-bleu        lac cadre=1080x1350 couleur=encre sur=papier camera=0.25,6.4,0.01 cible=0.25,0,0 fov=46 eau=0 opacite=0.2 maitresse=0.45 plein=1 pleinCouleur=papier rivage=1 isobathes=9 profondeur=0.85,0.2 lissage=4 eauCouleur=bleu
#   p4-macro-bande     montblanc cadre=1080x1350 couleur=encre sur=papier camera=-1.92,9.6,-0.8798 cible=-1.92,0,-0.88 fov=2.6 brouillard=non trace=0 decalage=0 affiner=16 zone=0.23,0.52,0.37,0.67 opacite=0.4 maitresse=0.9 aplat=bleu:0.6651:0.6772

# Kit de marque, livraison B : les 20 rendus des sections « 2 bis » (logo),
# « 3 bis » (affiche bleue) et « 7 bis » (logo collé). Même préfixe et même fin
# de ligne que la livraison 3 A2 ; dans un terminal, mettre entre guillemets
# les valeurs de logos=…, à cause des points-virgules. Relancées, elles
# refont à l'octet près les 20 SVG importés dans Figma. Les crêtes de
# l'affiche (1920 × 480) se posent à y = 600, comme celle de 3-affiche-16x9 ;
# la macro couvre toute la planche.
#   2e-centre        logo cadre=1920x1080 couleur=bleu centre=960,540 diametre=600 pas=6 dehors=5 maille=1 opacite=0.5 maitresse=1
#   2f-revelation    logo cadre=1920x1080 couleur=bleu courbes=0 centre=960,540 diametre=600 revelation=1.25 particules=4000 net=1
#   2g-tanaka        logo cadre=1920x1080 couleur=papier centre=960,540 diametre=600 pas=6 dehors=0 maille=1 opacite=1 maitresse=1 soleil=-1,-1.2 relief=0.9 contraste=1.5
#   2h-neige         logo cadre=1920x1080 couleur=papier courbes=0 centre=960,540 diametre=600 pixels=3 densite=1 soleil=-1,-1.2 relief=0.7 contraste=2
#   2i-geant         logo cadre=1920x1080 couleur=papier centre=1640,1180 diametre=2600 pas=8 dehors=0 maille=2 opacite=0.2 maitresse=0.6
#   2j-geant         logo cadre=1920x1080 couleur=papier courbes=0 centre=1640,1180 diametre=2600 pixels=4 densite=0.75 soleil=-1,-1.2 relief=0.8 contraste=2
#   2k-grille        logo cadre=1920x1080 couleur=bleu centre=960,540 diametre=600 pas=6 dehors=0 maille=1 opacite=0.5 maitresse=1 grille=30 origine=0,0 grilleCouleur=encre grilleOpacite=0.08
#   2l-grille        logo cadre=1920x1080 couleur=bleu courbes=0 centre=960,540 diametre=600 grille=6 origine=0,0 points=1 cases=1 cote=5 grilleCouleur=encre grilleOpacite=0.22 soleil=-1,-1.2 relief=0.6 contraste=2
#   2m-degrade       logo cadre=1920x1080 couleur=papier centre=960,540 diametre=520 pas=8 dehors=70 maille=2 opacite=0.4 maitresse=0.9
#   2n-clairiere     logo cadre=1920x1080 couleur=papier courbes=0 centre=960,540 diametre=520 pixels=3 densite=1 soleil=-1,-1.2 relief=0.7 contraste=2 couronne=40,760,1.6
#   3e-lumiere       montblanc cadre=1920x480 couleur=papier camera=-6.0,3.75,-5.1 cible=0.25,2.3,0.1 fov=13.5 brouillard=7.5,12.5 decalage=0 trace=0 teinte=lumiere sur=bleu foyer=1130,150 portee=950,380 rampe=papier:0,bleu:1 opacite=0.7 maitresse=1
#   3f-sommet        montblanc cadre=1920x480 couleur=papier camera=-6.0,3.75,-5.1 cible=0.25,2.3,0.1 fov=13.5 brouillard=7.5,12.5 decalage=0 trace=0 teinte=altitude sur=bleu rampe=bleu:0.66,papier:0.8 opacite=0.9 maitresse=1
#   3g-macro         montblanc cadre=1920x1080 couleur=papier sur=bleu camera=-1.92,9.6,-0.8798 cible=-1.92,0,-0.88 fov=2.6 brouillard=non trace=0 decalage=0 affiner=16 zone=0.22,0.52,0.38,0.68 opacite=0.9 maitresse=1 teinte=lumiere foyer=960,1180 portee=1500,700 rampe=papier:0,bleu:1
#   3h-neige         montblanc cadre=1920x480 couleur=papier sur=bleu camera=-6.0,3.75,-5.1 cible=0.25,2.3,0.1 fov=13.5 brouillard=7.5,12.5 decalage=0 trace=0 courbes=0 pixels=3 densite=1 relief=1 contraste=2 soleil=-1,1.2,-0.2 neige=0.25,0.85 affiner=2 opacite=1
#   3i-contre-jour   montblanc cadre=1920x480 couleur=papier sur=bleu camera=-6.0,3.75,-5.1 cible=0.25,2.3,0.1 fov=13.5 brouillard=7.5,12.5 decalage=0 trace=0 courbes=0 pixels=3 densite=1 relief=1 contraste=1.3 soleil=1,0.9,0.2 neige=0.3,0.85 affiner=2 opacite=1
#   3j-congere       montblanc cadre=1920x480 couleur=papier sur=bleu camera=-6.0,3.75,-5.1 cible=0.25,2.3,0.1 fov=13.5 brouillard=7.5,12.5 decalage=0 trace=0 courbes=0 pixels=3 densite=1 relief=0.3 contraste=1 soleil=-1,1.2,-0.2 neige=0.85,0.15 affiner=2 opacite=1
#   7e-chaine        logo cadre=1920x1080 couleur=papier logos=-40,880,400;360,880,400;760,880,400;1160,880,400;1560,880,400;1960,880,400 pas=7 dehors=40 maille=1 opacite=0.5 maitresse=1
#   7f-congere       logo cadre=1920x1080 couleur=papier courbes=0 logos=-40,880,400;360,880,400;760,880,400;1160,880,400;1560,880,400;1960,880,400 pixels=3 densite=1 soleil=-1,-1.2 relief=0.7 contraste=2 fondu=640,980
#   7g-pochoir       everest cadre=1920x1080 couleur=bleu camera=-30,52,80 cible=29.6,30,-24.6 fov=20 brouillard=120,220 affiner=2 opacite=0.55 maitresse=0.55 logos=-60,820,340;280,820,340;620,820,340;960,820,340;1300,820,340;1640,820,340;1980,820,340 evider=1
#   7h-pochoir       everest cadre=1920x1080 couleur=bleu sur=papier camera=-30,52,80 cible=29.6,30,-24.6 fov=20 brouillard=120,220 courbes=0 densite=1 relief=0.7 contraste=2 soleil=-1,1.2,-0.2 opacite=1 affiner=2 pixels=3 neige=0,0.6 logos=-60,820,340;280,820,340;620,820,340;960,820,340;1300,820,340;1640,820,340;1980,820,340 evider=1

# Kit de marque, livraison C1 : le pas de contact du logo collé, puis en px pour
# les tailles de la section « 7 ter » (bandes de 180, 240, 256, 270 et 54 px)
node docs/design-system/outils/logo-colle.mjs 180 240 256 270 54
```

`grain-rendu.mjs` utilise le port 9336, `grain-mesure.mjs` le 9337,
`cta-mobile.mjs` le 9338, `mesure-petits-composants.mjs` le 9339,
`mesure-grands-composants.mjs` le 9340, `capture-scene.mjs` le 9342,
`mesure-logo.mjs` le 9343, `webp-jpeg.mjs` le 9344,
`capture-pages.mjs` le 9345, `mesure-planches.mjs` le 9346,
`rendu-courbes.mjs` le 9348. `grain-degrade.mjs` et `logo-colle.mjs` n'en
utilisent aucun : ils travaillent sans navigateur.

## Mesurer une preview plutôt que la prod

`mesurer-styles.mjs` et `polices-rendues.mjs` prennent l'URL en dernier
argument (par défaut `https://jimmyferon.com`). Pour comparer une preview
Vercel à la prod, lancer la mesure deux fois, avec deux dossiers de sortie,
puis comparer les deux `mesures.json`.

## Bon à savoir

- **Dossier de sortie hors du dépôt.** Les scripts de mesure lancent le
  navigateur sans fenêtre, avec un profil temporaire créé dans le dossier
  indiqué. Ce profil pèse plusieurs dizaines de Mo : prendre par exemple le
  dossier temporaire du système.
- Chaque page est mesurée 4,5 s après son chargement, le temps du
  préchargement (3 s) et de la levée du rideau.
- Ports utilisés : 9333 (mesure) et 9334 (polices). Si une mesure s'arrête en
  cours, fermer le navigateur resté ouvert sur ces ports.
- Les polices de secours dépendent du système. Sous Windows, les flèches
  tombent sur Consolas et Segoe UI Symbol ; sous macOS, sur d'autres polices.
