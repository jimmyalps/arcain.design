import { openGraph } from "@/lib/metadata";

// Métadonnées de /work. La page est un composant client et ne peut pas les
// exporter elle-même : sans ce fichier, elle héritait de la racine son titre,
// son URL canonique et son og:url, ceux de l'accueil.
export const metadata = {
  title: "Work",
  alternates: { canonical: "/work" },
  openGraph: { ...openGraph, url: "/work" },
};

export default function WorkLayout({ children }) {
  return children;
}
