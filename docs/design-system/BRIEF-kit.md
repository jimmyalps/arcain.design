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
