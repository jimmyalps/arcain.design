import { openGraph } from "@/lib/metadata";

// Métadonnées de /legal. Le titre est celui du français, langue du rendu
// serveur ; la page le remplace par la version anglaise quand c'est la
// langue choisie (voir page.js).
export const metadata = {
  title: "Mentions légales",
  alternates: { canonical: "/legal" },
  openGraph: { ...openGraph, url: "/legal" },
};

export default function LegalLayout({ children }) {
  return children;
}
