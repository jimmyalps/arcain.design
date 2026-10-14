import { pageMetadata } from "@/lib/metadata";

// Métadonnées de /about. La page est un composant client et ne peut pas les
// exporter elle-même : sans ce fichier, elle héritait de la racine son titre,
// son URL canonique et ses balises de partage, ceux de l'accueil.
export const metadata = pageMetadata("About", "/about");

export default function AboutLayout({ children }) {
  return children;
}
