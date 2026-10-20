"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLang } from "@/lib/LangContext";
import { I18N } from "@/lib/i18n";

const LOGO_PATHS = [
  "M5.245 911.543L-56.081 778.861L250.892 714.806C251.157 714.75 357.446 692.449 438.337 751.22C519.279 810.028 530.878 918.106 530.892 918.238L564.829 1229.98L419.693 1212.657L362.086 856.17L5.245 911.543Z",
  "M720.308 1212.657L575.171 1229.98L609.109 918.239C609.124 918.097 620.726 810.026 701.664 751.22C782.656 692.377 889.11 714.807 889.11 714.807L1196.08 778.862L1134.755 911.543L777.915 856.17L720.308 1212.657Z",
  "M1227.651 625.636L1199.275 769.029L913.279 640.417C913.279 640.417 813.972 595.992 783.036 500.781C752.139 405.688 806.193 311.492 806.328 311.257L962.109 39.104L1069.347 138.43L906.413 460.693L1227.651 625.636Z",
  "M826.14 -38.27L953.741 33.025L743.05 265.282C743.05 265.282 670.112 346 570 346C469.889 346 396.951 265.282 396.951 265.282L186.257 33.026L313.858 -38.269L570 216.275L826.14 -38.27Z",
  "M70.653 138.43L177.89 39.105L333.671 311.257C333.798 311.479 387.863 405.681 356.963 500.781C326.027 595.992 226.72 640.417 226.72 640.417L-59.276 769.026L-87.651 625.637L233.586 460.693L70.653 138.43Z",
];

// Reproduit doVeil() du site original : rideau qui monte (cover), on exécute
// la navigation dessous, puis le rideau repart vers le haut (leave). ~580ms.
//
// Le rideau attend en plus que la navigation ait vraiment eu lieu avant de se
// relever. Sans cela, il repartait au bout de 580 ms alors que le code de la
// page visée n'était pas encore chargé : on revoyait l'ancienne page une
// demi-seconde. Le deuxième passage semblait correct parce que le navigateur
// avait gardé le fichier en mémoire. Toutes les routes sont donc préchargées
// dès que le navigateur est disponible, et le relevé du rideau est déclenché
// par le changement d'adresse, avec un délai de secours si rien ne bouge.
export default function Veil() {
  const veilRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();
  const waitRef = useRef(false);
  const fromRef = useRef(null);
  const failsafeRef = useRef(0);
  const { lang } = useLang();
  const t = (k) => (I18N[lang] && I18N[lang][k]) || k;

  const lift = () => {
    const veil = veilRef.current;
    if (!veil) return;
    waitRef.current = false;
    clearTimeout(failsafeRef.current);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        veil.classList.remove("cover");
        veil.classList.add("leave");
        setTimeout(() => veil.classList.remove("leave"), 580);
      });
    });
  };

  useEffect(() => {
    window.__doVeil = (cb) => {
      const veil = veilRef.current;
      if (!veil) { cb(); return; }
      veil.classList.add("cover");
      setTimeout(() => {
        fromRef.current = window.location.pathname;
        waitRef.current = true;
        cb();
        failsafeRef.current = setTimeout(lift, 2500);   // le rideau ne reste jamais coincé
      }, 580);
    };
    return () => {
      delete window.__doVeil;
      clearTimeout(failsafeRef.current);
    };
  }, []);

  /* La page visée est montée : usePathname ne change qu'à ce moment-là. */
  useEffect(() => {
    if (waitRef.current && pathname !== fromRef.current) lift();
  }, [pathname]);

  /* Préchargement des routes, une fois le navigateur au repos. */
  useEffect(() => {
    const go = () => ["/", "/work", "/about", "/legal"].forEach((r) => router.prefetch(r));
    const id = window.requestIdleCallback
      ? window.requestIdleCallback(go, { timeout: 3000 })
      : setTimeout(go, 1600);
    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(id);
      else clearTimeout(id);
    };
  }, [router]);

  return (
    <div className="veil" ref={veilRef} aria-hidden="true">
      <div className="veil-logo">
        <svg viewBox="0 0 1140 1140" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip_veil)">
            {LOGO_PATHS.map((d, i) => <path key={i} d={d} />)}
          </g>
          <defs>
            <clipPath id="clip_veil"><rect width="1140" height="1140" rx="570" /></clipPath>
          </defs>
        </svg>
      </div>
      <span className="veil-mark">{t("veil.mark")}</span>
    </div>
  );
}
