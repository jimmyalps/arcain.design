import { pageMetadata } from "@/lib/metadata";

// Métadonnées de /legal. Le titre est celui du français, langue du rendu
// serveur ; la page remplace celui de l'onglet par la version anglaise quand
// c'est la langue choisie (voir page.js).
export const metadata = pageMetadata("Mentions légales", "/legal");

export default function LegalLayout({ children }) {
  return children;
}
