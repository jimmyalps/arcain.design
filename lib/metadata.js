// Métadonnées partagées entre la racine et les pages.
//
// Un segment qui définit openGraph remplace celui de la racine en entier,
// sans fusion. Pour que chaque page ait sa propre og:url, chaque layout
// repart donc de cette base commune et n'y change que l'URL.
export const TITLE = "Jimmy · Arcain — Brand Designer";

// Titre d'une sous-page, « Work — Jimmy · Arcain » : le même modèle sert à
// l'onglet (title.template de la racine) et à l'og:title de chaque page.
export const TEMPLATE = "%s — Jimmy · Arcain";
export const pageTitle = (name) => TEMPLATE.replace("%s", name);
export const DESC =
  "Brand designer et UI/UX basé entre Genève et la Haute-Savoie. Identité de marque, " +
  "interfaces et direction artistique, de l'esport au sport outdoor.";

export const openGraph = {
  type: "website",
  siteName: "Jimmy · Arcain",
  title: TITLE,
  description: DESC,
  locale: "fr_FR",
  images: [{ url: "/og.jpg", width: 1200, height: 630, alt: TITLE }],
};
