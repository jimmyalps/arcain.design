"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "@/lib/LangContext";
import { I18N } from "@/lib/i18n";
import Roll from "@/components/Roll";
import useMagnetic from "@/lib/useMagnetic";
import Lake3D from "@/components/Lake3D";
import { openCal } from "@/components/CalEmbed";

const LOGO_PATHS = [
  "M5.245 911.543L-56.081 778.861L250.892 714.806C251.157 714.75 357.446 692.449 438.337 751.22C519.279 810.028 530.878 918.106 530.892 918.238L564.829 1229.98L419.693 1212.657L362.086 856.17L5.245 911.543Z",
  "M720.308 1212.657L575.171 1229.98L609.109 918.239C609.124 918.097 620.726 810.026 701.664 751.22C782.656 692.377 889.11 714.807 889.11 714.807L1196.08 778.862L1134.755 911.543L777.915 856.17L720.308 1212.657Z",
  "M1227.651 625.636L1199.275 769.029L913.279 640.417C913.279 640.417 813.972 595.992 783.036 500.781C752.139 405.688 806.193 311.492 806.328 311.257L962.109 39.104L1069.347 138.43L906.413 460.693L1227.651 625.636Z",
  "M826.14 -38.27L953.741 33.025L743.05 265.282C743.05 265.282 670.112 346 570 346C469.889 346 396.951 265.282 396.951 265.282L186.257 33.026L313.858 -38.269L570 216.275L826.14 -38.27Z",
  "M70.653 138.43L177.89 39.105L333.671 311.257C333.798 311.479 387.863 405.681 356.963 500.781C326.027 595.992 226.72 640.417 226.72 640.417L-59.276 769.026L-87.651 625.637L233.586 460.693L70.653 138.43Z",
];

function LogoSvg({ cid }) {
  return (
    <svg viewBox="0 0 1140 1140" xmlns="http://www.w3.org/2000/svg">
      <g clipPath={`url(#${cid})`}>
        {LOGO_PATHS.map((d, i) => <path key={i} d={d} />)}
      </g>
      <defs><clipPath id={cid}><rect width="1140" height="1140" rx="570" /></clipPath></defs>
    </svg>
  );
}

// Porte footerHTML() : Let's talk + colonnes + CTAs + crête + bas de page.
// (Le lac 3D sera ajouté en Livraison B ; ici on garde la crête foot-ridge.)
export default function Footer({ uid = "foot" }) {
  const router = useRouter();

  // Le lac n'existe que sur desktop réel : sous 1400px on ne le monte pas du
  // tout, pour ne charger ni Three.js ni sa boucle d'animation (le CSS le
  // masque aussi, mais autant ne rien exécuter sur tablette et téléphone).
  const [showLake, setShowLake] = useState(false);
  useEffect(() => {
    const check = () => setShowLake(window.innerWidth >= 1400);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  const { lang } = useLang();
  const t = (k) => (I18N[lang] && I18N[lang][k]) || k;
  useMagnetic([lang]);

  const go = (e, href) => {
    e.preventDefault();
    if (typeof window !== "undefined" && window.__doVeil) window.__doVeil(() => router.push(href));
    else router.push(href);
  };

  // Lets talk : révélation caractère par caractère, exactement comme les deux
  // manifestes. index.html traite les trois blocs dans la même boucle
  // (buildManif : manif, manif2, letstalk) — c'est la même mécanique, pas une
  // animation à part.
  const ltRef = useRef(null);
  const bigRef = useRef(null);
  useEffect(() => {
    const sec = ltRef.current, big = bigRef.current;
    if (!sec || !big) return;

    const wrap = (node) => {
      [...node.childNodes].forEach((ch) => {
        if (ch.nodeType === 3) {
          const frag = document.createDocumentFragment();
          for (const c of ch.textContent) {
            const sp = document.createElement("span");
            sp.className = "mch";
            sp.textContent = c;
            frag.appendChild(sp);
          }
          node.replaceChild(frag, ch);
        } else if (ch.nodeType === 1 && !ch.classList.contains("mch")) {
          wrap(ch);
        }
      });
    };
    wrap(big);
    const chars = [...sec.querySelectorAll(".mch")];
    if (!chars.length) return;

    const FADE = 14;
    let raf = 0;
    const upd = () => {
      const vh = window.innerHeight || 800, start = vh - 120;
      const r = sec.getBoundingClientRect();
      if (r.bottom < -80 || r.top > vh + 80) return;
      const p = Math.max(0, Math.min(1, (start - r.top) / (vh * 0.5 + r.height * 0.5 - 120)));
      const front = p * (chars.length + FADE);
      for (let i = 0; i < chars.length; i++) {
        const k = Math.max(0, Math.min(1, (front - i) / FADE));
        chars[i].style.opacity = (0.1 + 0.9 * k).toFixed(3);
      }
    };
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(upd); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", upd);
    upd();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", upd);
    };
  }, [lang]);

  return (
    <div className="foot-dark">
      {/* ===== Let's talk + lac d'Allos 3D ===== */}
      <div className="lt" id="letstalk" ref={ltRef}>
        <p className="lt-eyebrow" data-rv><span className="sv2-flake" aria-hidden="true"></span><span>{t("lt.eyebrow")}</span></p>
        {/* Pas de data-rv sur .lt-inner : le titre a sa propre révélation
            lettre par lettre, un fondu de bloc par-dessus l'écraserait. */}
        <div className="lt-inner">
          <p className="lt-big" ref={bigRef}>{t("lt.big")}</p>
          <a className="btnf btnf-ghost lt-cta" data-rv style={{ "--rvd": "120ms" }} href="https://cal.com/arcain/intro-call" target="_blank" rel="noopener noreferrer" onClick={openCal}>
            <Roll text={t("lt.cta")} /> <span className="arr" aria-hidden="true">→</span>
          </a>
        </div>
        {showLake && <Lake3D />}
        <p className="lt-alt" data-rv style={{ "--rvd": "180ms" }} dangerouslySetInnerHTML={{ __html: t("lt.alt") }} />
      </div>

      {/* ===== Footer body ===== */}
      <div className="foot-body">
        <div className="foot-glow"></div>
        <div className="foot-pad">
          <div className="foot-top" data-rv>
            <a href="/" className="foot-logo" aria-label={t("logo.home")} onClick={(e) => go(e, "/")}>
              <LogoSvg cid={`clip_${uid}`} />
            </a>
            <div className="foot-cols">
              <div className="foot-col">
                <h4>{t("foot.menu")}</h4>
                <a href="/" onClick={(e) => go(e, "/")}>{t("nav.home")} <span aria-hidden="true">↗</span></a>
                <a href="/work" onClick={(e) => go(e, "/work")}>{t("nav.work")} <span aria-hidden="true">↗</span></a>
                <a href="/about" onClick={(e) => go(e, "/about")}>{t("foot.about")} <span aria-hidden="true">↗</span></a>
                <div className="menu-logo" aria-hidden="true"><LogoSvg cid={`clip_menu_${uid}`} /></div>
              </div>
              <div className="foot-col">
                <h4>{t("foot.connect")}</h4>
                <a href="https://www.linkedin.com/in/jimmyferon/" target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
                <a href="https://www.instagram.com/jimmyalps/" target="_blank" rel="noopener noreferrer">Instagram <span aria-hidden="true">↗</span></a>
                <a href="https://github.com/jimmyalps" target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a>
                <a href="https://www.malt.fr/profile/jimmyferon1" target="_blank" rel="noopener noreferrer">Malt <span aria-hidden="true">↗</span></a>
                <a href="https://x.com/jimmyalps" target="_blank" rel="noopener noreferrer">X <span aria-hidden="true">↗</span></a>
              </div>
            </div>
          </div>
          <div className="foot-mid" data-rv style={{ "--rvd": "90ms" }}>
            <p className="f-hook">{t("foot.hook")}</p>
            <a className="f-mail" href="mailto:jimmy@arcain.design">jimmy@arcain.design</a>
            <div className="foot-cta-row">
              <div className="foot-cta-pair">
                <a className="btnf btnf-blue" href="https://www.linkedin.com/in/jimmyferon/" target="_blank" rel="noopener noreferrer"><Roll text={t("cta.together")} /> <span className="arr" aria-hidden="true">↗</span></a>
                <a className="btnf btnf-ghost" href="/about" onClick={(e) => go(e, "/about")}><Roll text={t("foot.about")} /> <span className="arr" aria-hidden="true">→</span></a>
              </div>
              <div className="foot-figma"><span className="fmark"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M336,176a80,80,0,0,0,0-160H176a80,80,0,0,0,0,160,80,80,0,0,0,0,160,80,80,0,1,0,80,80V176Z" /><circle cx="336" cy="256" r="80" /></svg></span><span>Figma® <b>Expert</b></span></div>
            </div>
          </div>
          <div className="foot-ridge" aria-hidden="true" data-rv style={{ "--rvd": "140ms" }}>
            <svg className="ridge" viewBox="0 0 1200 170" preserveAspectRatio="none">
              <polyline points="0,150 90,128 168,142 268,76 352,122 436,98 540,50 624,116 718,72 806,108 912,26 1006,120 1098,94 1200,134" />
              <text x="514" y="40" className="peak">+3 700</text>
              <text x="884" y="16" className="peak">+4 810</text>
              <text x="244" y="66" className="peak">+2 460</text>
            </svg>
          </div>
          <div className="foot-bot" data-rv style={{ "--rvd": "190ms" }}>
            <span className="foot-copy">{t("foot.copy")}</span>
            <a className="foot-legal" href="/legal" onClick={(e) => go(e, "/legal")}>{t("foot.legal")}</a>
            <span className="foot-loc">{t("foot.loc")}</span>
            <button className="foot-topbtn" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>{t("foot.top")}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
