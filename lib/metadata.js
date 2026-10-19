// Métadonnées partagées entre la racine et les pages.
//
// Un segment qui définit openGraph ou twitter remplace celui de la racine en
// entier, sans fusion. Chaque sous-page repart donc de ces bases communes et
// n'y change que son URL et son titre (voir pageMetadata).
export const TITLE = "Jimmy · Arcain — Brand Designer";
export const DESC =
  "Brand designer, je construis des marques qui tiennent en altitude. Logo, identité " +
  "et interfaces pour tous les terrains : esport, outdoor, entreprise.";

// Titre d'une sous-page, « Work — Jimmy · Arcain » : le même modèle sert à
// l'onglet (title.template de la racine), à og:title et à twitter:title.
export const TEMPLATE = "%s — Jimmy · Arcain";
export const pageTitle = (name) => TEMPLATE.replace("%s", name);

export const openGraph = {
  type: "website",
  siteName: "Jimmy · Arcain",
  title: TITLE,
  description: DESC,
  locale: "fr_FR",
  images: [{ url: "/og.jpg", width: 1200, height: 630, alt: TITLE }],
};

export const twitter = {
  card: "summary_large_image",
  title: TITLE,
  description: DESC,
  creator: "@jimmyalps",
  images: ["/og.jpg"],
};

// Métadonnées d'une sous-page : son titre d'onglet et son URL canonique,
// repris à l'identique dans Open Graph et Twitter.
export const pageMetadata = (name, path) => ({
  title: name,
  alternates: { canonical: path },
  openGraph: { ...openGraph, url: path, title: pageTitle(name) },
  twitter: { ...twitter, title: pageTitle(name) },
});
