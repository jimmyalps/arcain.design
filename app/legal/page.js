"use client";

import { useEffect } from "react";
import { useLang } from "@/lib/LangContext";
import { I18N } from "@/lib/i18n";
import Footer from "@/components/Footer";

// Mentions légales : même ossature que /work et /about (surtitre, grand
// titre), puis un bloc par rubrique, avec les styles .exp-* de globals.css.
const BLOCKS = [
  { h: "lg.pubT", p: "lg.pub" },
  { h: "lg.dirT", p: "lg.dir" },
  { h: "lg.hostT", p: "lg.host" },
];

export default function LegalPage() {
  const { lang } = useLang();
  const t = (k) => (I18N[lang] && I18N[lang][k]) || k;

  // Le titre des métadonnées est figé en français au rendu serveur : l'onglet
  // suit ici la langue choisie.
  useEffect(() => {
    document.title = t("lg.tab");
  }, [lang]);

  return (
    <section className="page active" data-page="legal">
      <div className="wrap sec uc">
        <p className="uc-eyebrow" data-rv>
          <span className="sv2-flake" aria-hidden="true"></span>
          <span>{t("lg.eyebrow")}</span>
        </p>
        <h2 className="uc-title" data-rv style={{ "--rvd": "90ms" }}>{t("lg.title")}</h2>
        <div className="exp-list" data-rv style={{ "--rvd": "180ms" }}>
          {BLOCKS.map((b) => (
            <div className="exp-item" key={b.h}>
              <div className="exp-head"><h3>{t(b.h)}</h3></div>
              {/* Retours à la ligne et lien mailto : le texte est injecté en HTML. */}
              <p dangerouslySetInnerHTML={{ __html: t(b.p) }} />
            </div>
          ))}
        </div>
      </div>
      <footer className="site-footer"><Footer uid="foot-legal" /></footer>
    </section>
  );
}
