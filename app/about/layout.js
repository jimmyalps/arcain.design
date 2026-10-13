import { openGraph } from "@/lib/metadata";

// Métadonnées de /about. La page est un composant client et ne peut pas les
// exporter elle-même : sans ce fichier, elle héritait de la racine son titre,
// son URL canonique et son og:url, ceux de l'accueil.
export const metadata = {
  title: "About",
  alternates: { canonical: "/about" },
  openGraph: { ...openGraph, url: "/about" },
};

export default function AboutLayout({ children }) {
  return children;
}
