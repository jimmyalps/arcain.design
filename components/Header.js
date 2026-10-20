"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useLang } from "@/lib/LangContext";
import { I18N } from "@/lib/i18n";
import Roll from "@/components/Roll";
import useMagnetic from "@/lib/useMagnetic";

const NAV = {
  fr: {
    home: "Accueil", work: "Projets", about: "À propos", cta: "Get in touch",
    menu: "Menu", close: "Fermer",
    lblMenu: "Menu", lblSocial: "Réseaux", lblContact: "Contact",
    hook: "Une idée en tête ?",
  },
  en: {
    home: "Home", work: "Work", about: "About", cta: "Get in touch",
    menu: "Menu", close: "Close",
    lblMenu: "Menu", lblSocial: "Social media", lblContact: "Contact",
    hook: "Got an idea in mind?",
  },
};

const LOGO_PATHS = [
  "M5.245 911.543L-56.081 778.861L250.892 714.806C251.157 714.75 357.446 692.449 438.337 751.22C519.279 810.028 530.878 918.106 530.892 918.238L564.829 1229.98L419.693 1212.657L362.086 856.17L5.245 911.543Z",
  "M720.308 1212.657L575.171 1229.98L609.109 918.239C609.124 918.097 620.726 810.026 701.664 751.22C782.656 692.377 889.11 714.807 889.11 714.807L1196.08 778.862L1134.755 911.543L777.915 856.17L720.308 1212.657Z",
  "M1227.651 625.636L1199.275 769.029L913.279 640.417C913.279 640.417 813.972 595.992 783.036 500.781C752.139 405.688 806.193 311.492 806.328 311.257L962.109 39.104L1069.347 138.43L906.413 460.693L1227.651 625.636Z",
  "M826.14 -38.27L953.741 33.025L743.05 265.282C743.05 265.282 670.112 346 570 346C469.889 346 396.951 265.282 396.951 265.282L186.257 33.026L313.858 -38.269L570 216.275L826.14 -38.27Z",
  "M70.653 138.43L177.89 39.105L333.671 311.257C333.798 311.479 387.863 405.681 356.963 500.781C326.027 595.992 226.72 640.417 226.72 640.417L-59.276 769.026L-87.651 625.637L233.586 460.693L70.653 138.43Z",
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { lang, setLang } = useLang();
  const [compact, setCompact] = useState(false);
  const [onDark, setOnDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useMagnetic([lang]);

  // Scroll : header compact (>70px) + détection du footer noir sous le header (on-dark)
  useEffect(() => {
    // Portage exact de la détection d'index.html : le header passe en sombre
    // quand le wrap noir (#darkwrap, la crête) occupe ~la moitié du header
    // (seuil -140px pondéré par la largeur d'écran), repasse en clair quand le
    // wrap blanc (#lightwrap) le recouvre, et redevient sombre sur le footer.
    const upd = () => {
      const hdrEl = document.querySelector("header");
      const k = Math.max(0.55, Math.min(1, window.innerWidth / 1200));
      const hh = (hdrEl && hdrEl.offsetHeight) || 64;
      let dark = false;
      const dw = document.getElementById("darkwrap");
      if (dw) {
        const r = dw.getBoundingClientRect();
        if (r.height > 0 && r.top <= -140 * k && r.bottom > hh) dark = true;
      }
      const lw = document.getElementById("lightwrap");
      if (lw) {
        const r = lw.getBoundingClientRect();
        if (r.height > 0 && r.top <= -140 * k && r.bottom > hh) dark = false;
      }
      document.querySelectorAll(".site-footer").forEach((f) => {
        const r = f.getBoundingClientRect();
        if (r.height > 0 && r.top <= hh * 0.5 && r.bottom > 0) dark = true;
      });
      setOnDark(dark);
      setCompact((window.scrollY || window.pageYOffset || 0) > 70);
    };
    upd();
    // index.html relance la détection 80 ms après un changement de page
    // (hashchange) : on fait pareil après chaque changement de route, le temps
    // que la mise en page se stabilise.
    const t80 = setTimeout(upd, 80);
    const onScroll = () => requestAnimationFrame(upd);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", upd);
    return () => {
      clearTimeout(t80);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", upd);
    };
  }, [pathname]);

  // Menu ouvert : la page reste scrollable (comme les références).
  // Fermeture : Échap ou clic en dehors du header (le menu est DANS le header).
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => { if (e.key === "Escape") setMenuOpen(false); };
    const onClick = (e) => {
      if (!e.target.closest("header")) setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [menuOpen]);

  // Sécurité : on ferme le menu quand on repasse en desktop (redimensionnement).
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 900) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const t = NAV[lang];
  const isActive = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  const go = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    // Logo/Accueil : si déjà sur home, on remonte simplement en haut
    if (href === "/" && pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (pathname === href) return;
    if (typeof window !== "undefined" && window.__doVeil) window.__doVeil(() => router.push(href));
    else router.push(href);
  };

  const cls = [compact ? "compact" : "", onDark ? "on-dark" : "", menuOpen ? "menu-open" : ""].filter(Boolean).join(" ");

  return (
    <header className={cls}>
      <nav>
        <div className="nav-logo">
          <a href="/" className="logo" aria-label={I18N[lang]["logo.home"]} onClick={(e) => go(e, "/")}>
            <svg viewBox="0 0 1140 1140" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip_logo)">
                {LOGO_PATHS.map((d, i) => <path key={i} d={d} />)}
              </g>
              <defs>
                <clipPath id="clip_logo"><rect width="1140" height="1140" rx="570" /></clipPath>
              </defs>
            </svg>
          </a>
        </div>

        <div className={"nav-mid" + (menuOpen ? " open" : "")} id="menu">
          <a href="/" className="roll" data-active={isActive("/")} onClick={(e) => go(e, "/")}><Roll text={t.home} /></a>
          <a href="/work" className="roll" data-active={isActive("/work")} onClick={(e) => go(e, "/work")}><Roll text={t.work} /></a>
          <a href="/about" className="roll" data-active={isActive("/about")} onClick={(e) => go(e, "/about")}><Roll text={t.about} /></a>
        </div>

        <div className="lang" id="lang">
          <button className="lang-trigger" aria-haspopup="true">
            {lang.toUpperCase()}{" "}
            <span className="arr" aria-hidden="true"><svg viewBox="0 0 10 6"><path d="M1 1l4 4 4-4" /></svg></span>
          </button>
          <div className="lang-menu">
            <button className={lang === "fr" ? "on" : ""} onClick={() => setLang("fr")}>FR</button>
            <button className={lang === "en" ? "on" : ""} onClick={() => setLang("en")}>EN</button>
          </div>
        </div>

        <a href="https://www.linkedin.com/in/jimmyferon/" target="_blank" rel="noopener noreferrer" className="cta nav-cta">
          <Roll text={t.cta} />{" "}
          <span className="cta-arr" aria-hidden="true">↗</span>
        </a>

        <button
          className={"menu-btn" + (menuOpen ? " open" : "")}
          aria-expanded={menuOpen}
          aria-controls="hx"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="flake" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
              {/* 3 axes : toujours visibles */}
              <g strokeWidth="2.6">
                <path d="M12 2.4v19.2" />
                <path d="M3.7 7.2l16.6 9.6" />
                <path d="M20.3 7.2L3.7 16.8" />
              </g>
              {/* branches : apparaissent à l'ouverture = vrai flocon */}
              <g className="fdetail" strokeWidth="2.2">
                <path d="M9.7 3.6L12 5.5l2.3-1.9" />
                <path d="M9.7 20.4L12 18.5l2.3 1.9" />
                <path d="M6.6 6.3L6.6 8.9 4.35 10.2" />
                <path d="M17.4 17.7L17.4 15.1 19.65 13.8" />
                <path d="M17.4 6.3L17.4 8.9 19.65 10.2" />
                <path d="M6.6 17.7L6.6 15.1 4.35 13.8" />
              </g>
            </svg>
          </span>
          {menuOpen ? t.close : t.menu}
        </button>
      </nav>

      {/* ===== Extension du header : le bloc s'agrandit (pas de panneau séparé) ===== */}
      <div className="hx" id="hx" aria-hidden={!menuOpen}>
        <div className="hx-in">
          <div className="hx-body">
            <div className="hx-grid">
              <div className="hx-colL">
                <p className="hx-label">{t.lblMenu}</p>
                {/* Volontairement une div, pas une balise nav : évite d'hériter
                    de la règle globale du header (hauteur 64px, centrage,
                    padding 56px) qui écrasait la mise en page du menu. */}
                <div className="hx-nav" role="navigation" aria-label={t.lblMenu}>
                  <a href="/" onClick={(e) => go(e, "/")}>{t.home}</a>
                  <a href="/work" onClick={(e) => go(e, "/work")}>{t.work}</a>
                  <a href="/about" onClick={(e) => go(e, "/about")}>{t.about}</a>
                </div>
              </div>

              <div className="hx-colR">
                <p className="hx-label">{t.lblSocial}</p>
                <div className="hx-links">
                  <a href="https://www.linkedin.com/in/jimmyferon/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                  <a href="https://www.instagram.com/jimmyalps/" target="_blank" rel="noopener noreferrer">Instagram</a>
                  <a href="https://github.com/jimmyalps" target="_blank" rel="noopener noreferrer">GitHub</a>
                  <a href="https://www.malt.fr/profile/jimmyferon1" target="_blank" rel="noopener noreferrer">Malt</a>
                  <a href="https://x.com/jimmyalps" target="_blank" rel="noopener noreferrer">X</a>
                </div>
              </div>
            </div>

            <div className="hx-bot">
              <div className="hx-lang">
                <button className={lang === "fr" ? "on" : ""} onClick={() => setLang("fr")}>FR</button>
                <span aria-hidden="true">/</span>
                <button className={lang === "en" ? "on" : ""} onClick={() => setLang("en")}>EN</button>
              </div>
              <div className="hx-contact">
                <p className="hx-label">{t.lblContact}</p>
                <p className="hx-hook">{t.hook}</p>
                <a className="hx-mail" href="mailto:jimmy@arcain.design">jimmy@arcain.design</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
