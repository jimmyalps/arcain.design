// Données structurées (JSON-LD).
//
// Bloc invisible qui dit explicitement à Google ce que décrit la page :
// une personne, son métier, sa zone d'intervention, ses profils. Sans ça,
// un moteur doit deviner à partir du texte. Avec, il peut afficher une
// fiche enrichie plutôt qu'un simple lien bleu.
//
// Vocabulaire schema.org, format recommandé par Google.

import { DESC } from "@/lib/metadata";

const SITE = "https://arcain.design";

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE}/#jimmy-feron`,
  name: "Jimmy Feron",
  // Le nom de la marque : relie arcain.design et Arcain à la même personne.
  alternateName: "Arcain",
  url: SITE,
  image: `${SITE}/images/jimmy-feron-trail-portrait-1200.webp`,
  jobTitle: "Brand Designer & UI/UX Designer",
  // La même que celle du site (meta description, Open Graph, Twitter).
  description: DESC,
  email: "mailto:jimmy@arcain.design",
  knowsLanguage: ["fr", "en"],
  knowsAbout: [
    "Brand design",
    "Identité visuelle",
    "UI/UX design",
    "Direction artistique",
    "Design system",
    "Esport",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Genève",
    addressCountry: "CH",
  },
  // Les profils qui permettent à Google de relier les différentes traces
  // du même individu sur le web.
  sameAs: [
    "https://www.linkedin.com/in/jimmyferon",
    "https://www.instagram.com/jimmy.ocks",
    "https://x.com/jimmyalps",
  ],
};

export const siteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE}/#site`,
  url: SITE,
  name: "Jimmy · Arcain",
  inLanguage: "fr-FR",
  publisher: { "@id": `${SITE}/#jimmy-feron` },
};

/** Les deux blocs réunis, prêts à être injectés dans une seule balise. */
export const jsonLd = { "@context": "https://schema.org", "@graph": [personSchema, siteSchema] };
