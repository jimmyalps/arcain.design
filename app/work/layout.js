// Métadonnées de /work. La page est un composant client et ne peut pas les
// exporter elle-même : sans ce fichier, elle héritait de la racine son titre
// et son URL canonique, celle de l'accueil.
export const metadata = {
  title: "Work",
  alternates: { canonical: "/work" },
};

export default function WorkLayout({ children }) {
  return children;
}
