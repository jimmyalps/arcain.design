// Métadonnées de /about. La page est un composant client et ne peut pas les
// exporter elle-même : sans ce fichier, elle héritait de la racine son titre
// et son URL canonique, celle de l'accueil.
export const metadata = {
  title: "About",
  alternates: { canonical: "/about" },
};

export default function AboutLayout({ children }) {
  return children;
}
