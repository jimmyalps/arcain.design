"use client";

import { useEffect, useRef } from "react";

export const PATHS = [
  "M5.245 911.543L-56.081 778.861L250.892 714.806C251.157 714.75 357.446 692.449 438.337 751.22C519.279 810.028 530.878 918.106 530.892 918.238L564.829 1229.98L419.693 1212.657L362.086 856.17L5.245 911.543Z",
  "M720.308 1212.657L575.171 1229.98L609.109 918.239C609.124 918.097 620.726 810.026 701.664 751.22C782.656 692.377 889.11 714.807 889.11 714.807L1196.08 778.862L1134.755 911.543L777.915 856.17L720.308 1212.657Z",
  "M1227.651 625.636L1199.275 769.029L913.279 640.417C913.279 640.417 813.972 595.992 783.036 500.781C752.139 405.688 806.193 311.492 806.328 311.257L962.109 39.104L1069.347 138.43L906.413 460.693L1227.651 625.636Z",
  "M826.14 -38.27L953.741 33.025L743.05 265.282C743.05 265.282 670.112 346 570 346C469.889 346 396.951 265.282 396.951 265.282L186.257 33.026L313.858 -38.269L570 216.275L826.14 -38.27Z",
  "M70.653 138.43L177.89 39.105L333.671 311.257C333.798 311.479 387.863 405.681 356.963 500.781C326.027 595.992 226.72 640.417 226.72 640.417L-59.276 769.026L-87.651 625.637L233.586 460.693L70.653 138.43Z",
];

// createLogoReveal() porté à l'identique de index.html : le logo Arcain est
// dessiné par ~1700 particules qui convergent, pendant que les 5 tracés
// s'écrivent puis se remplissent. Options identiques à l'original :
// ink / particle / glow / settle / dur / loop / copyright / onFrame.
// Retourne { play() }.
export function createLogoReveal(mount, opt) {
  opt = Object.assign(
    { ink: "#111111", particle: "#141414", glow: "rgba(30,41,255,0.10)", settle: 1, dur: 3.0 },
    opt || {}
  );
  const uid = "lr" + Math.random().toString(36).slice(2, 7);
  mount.style.opacity = "1";
  mount.innerHTML =
    `<div class="lr-glow" style="background:radial-gradient(circle at center, ${opt.glow} 0%, rgba(255,255,255,0) 62%)"></div>` +
    `<div class="lr-wrap"><canvas></canvas><svg viewBox="0 0 1140 1140"><defs>` +
      `<clipPath id="${uid}c"><rect width="1140" height="1140" rx="570"/></clipPath>` +
      `<clipPath id="${uid}cm"><rect width="1140" height="1140" rx="570"/></clipPath>` +
      `<linearGradient id="${uid}sw" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="0.42" stop-color="#fff" stop-opacity="0"/><stop offset="0.5" stop-color="#fff" stop-opacity="0.95"/><stop offset="0.58" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>` +
      `<mask id="${uid}m"><g clip-path="url(#${uid}cm)">${PATHS.map(d => `<path d="${d}" fill="#fff"/>`).join("")}</g></mask>` +
    `</defs>` +
    `<g clip-path="url(#${uid}c)">${PATHS.map(d => `<path data-logo d="${d}" fill="${opt.ink}" stroke="${opt.ink}" stroke-width="2.4" fill-opacity="0" stroke-opacity="0" stroke-linejoin="round"/>`).join("")}</g>` +
    `<g class="lr-sweep" mask="url(#${uid}m)" style="opacity:0"><rect x="-260" y="-500" width="420" height="2140" fill="url(#${uid}sw)" transform="rotate(22 570 570)"/></g>` +
    `</svg></div>` +
    (opt.copyright ? `<span class="lr-cr" style="color:${opt.ink}">©</span>` : "");

  const glow = mount.querySelector(".lr-glow"),
    canvas = mount.querySelector("canvas"),
    svg = mount.querySelector("svg"),
    cr = mount.querySelector(".lr-cr"),
    sweep = mount.querySelector(".lr-sweep"),
    paths = [...svg.querySelectorAll("[data-logo]")];
  const lens = paths.map(p => { const L = p.getTotalLength(); p.style.strokeDasharray = L; p.style.strokeDashoffset = L; return L; });
  const clamp = (v, a, b) => v < a ? a : v > b ? b : v, lerp = (a, b, t) => a + (b - a) * t;
  const smooth = (e0, e1, x) => { const t = clamp((x - e0) / (e1 - e0), 0, 1); return t * t * (3 - 2 * t); };
  const eOutCubic = x => 1 - Math.pow(1 - x, 3), eInOutQuint = x => x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
  let particles = [], ctx, S = 600, cx = 300, cy = 300;

  function sample() {
    const scale = S / 1140, off = document.createElement("canvas"); off.width = S; off.height = S;
    const c = off.getContext("2d"); c.save(); c.scale(scale, scale);
    c.beginPath(); c.arc(570, 570, 570, 0, Math.PI * 2); c.clip(); c.fillStyle = "#000";
    paths.forEach(p => c.fill(new Path2D(p.getAttribute("d")))); c.restore();
    const data = c.getImageData(0, 0, S, S).data, pts = [], step = 3;
    for (let y = 0; y < S; y += step) for (let x = 0; x < S; x += step) { if (data[(y * S + x) * 4 + 3] > 120) pts.push([x, y]); }
    for (let i = pts.length - 1; i > 0; i--) { const j = (Math.random() * (i + 1)) | 0, t = pts[i]; pts[i] = pts[j]; pts[j] = t; }
    // Sur téléphone, deux logos tournent en même temps dans le rail (le jeu de
    // cartes est dupliqué) : on allège nettement le nuage de particules, ce qui
    // reste invisible à l'œil mais libère beaucoup de temps machine.
    const MAXP = (typeof innerWidth !== "undefined" && innerWidth <= 760) ? 620 : 1700;
    const N = Math.min(pts.length, MAXP); particles = [];
    for (let i = 0; i < N; i++) {
      const tx = pts[i][0], ty = pts[i][1]; let ang = Math.atan2(ty - cy, tx - cx); if (ang < 0) ang += Math.PI * 2;
      const frac = ang / (Math.PI * 2), oA = Math.random() * Math.PI * 2, oR = 8 + Math.random() * 46;
      particles.push({ tx, ty, px: cx + Math.cos(oA) * oR, py: cy + Math.sin(oA) * oR, spawn: frac * 0.22 + Math.random() * 0.05, emergeDur: 0.4, convStart: 0.55 + frac * 0.30 + Math.random() * 0.05, convDur: 0.5 + Math.random() * 0.18, wPh: Math.random() * Math.PI * 2, wSp: 0.7 + Math.random() * 1.1, wAmp: 1.5 + Math.random() * 3, a: 0.6 + Math.random() * 0.4, sz: 1.1 + Math.random() * 0.9 });
    }
    const dpr = Math.min(devicePixelRatio || 1, 2); canvas.width = S * dpr; canvas.height = S * dpr; ctx = canvas.getContext("2d"); ctx.scale(dpr, dpr);
  }

  function frame(t) {
    ctx.clearRect(0, 0, S, S); ctx.fillStyle = opt.particle;
    const fade = smooth(2.75, 2.98, t);
    for (const p of particles) {
      if (t < p.spawn) continue;
      let bx, by, op, wob; const emergeEnd = p.spawn + p.emergeDur;
      if (t < emergeEnd) { const e = eOutCubic((t - p.spawn) / p.emergeDur); bx = lerp(cx, p.px, e); by = lerp(cy, p.py, e); op = 0.85 * e; wob = e; }
      else { let c = p.convDur > 0 ? (t - p.convStart) / p.convDur : 1; c = clamp(c, 0, 1); const ce = eInOutQuint(c); bx = lerp(p.px, p.tx, ce); by = lerp(p.py, p.ty, ce); op = 0.85 + 0.15 * ce; wob = 1 - c; }
      if (wob > 0.001) { bx += Math.sin(t * p.wSp * 6.28 + p.wPh) * p.wAmp * wob; by += Math.cos(t * p.wSp * 5.10 + p.wPh) * p.wAmp * wob; }
      op *= p.a * (1 - fade); if (op <= 0.004) continue;
      ctx.globalAlpha = op; const s = p.sz; ctx.fillRect(bx - s * 0.5, by - s * 0.5, s, s);
    }
    ctx.globalAlpha = 1;
    if (glow) { glow.style.opacity = "0"; }
    const fillOp = smooth(1.7, 2.55, t);
    for (let i = 0; i < paths.length; i++) { const start = 0.85 + i * 0.07, prog = smooth(start, start + 1.05, t); paths[i].style.strokeDashoffset = (lens[i] * (1 - prog)).toFixed(1); paths[i].style.strokeOpacity = (prog * (1 - smooth(2.25, 2.75, t))).toFixed(3); paths[i].style.fillOpacity = fillOp.toFixed(3); }
    if (sweep) { sweep.style.opacity = "0"; }
    if (cr) { const cv = smooth(3.0, 3.42, t); cr.style.opacity = cv.toFixed(3); cr.style.transform = `scale(${(0.55 + 0.45 * cv).toFixed(3)})`; }
    if (opt.onFrame) opt.onFrame(t, opt.dur);
  }

  let raf, t0, played = false;
  // Dans le rail du téléphone, plusieurs logos coexistent alors qu'un seul est
  // à l'écran : dessiner les autres consommait du temps machine pour rien et
  // faisait saccader le défilement. On ne peint que ce qui est visible.
  let visible = true;
  if (typeof IntersectionObserver !== "undefined") {
    const vio = new IntersectionObserver(
      (es) => { visible = es[0].isIntersecting; },
      { threshold: 0.01 }
    );
    vio.observe(mount);
  }
  function loop(now) {
    const t = clamp((now - t0) / 1000, 0, opt.dur);
    if (visible) frame(t);
    if (t < opt.dur) { raf = requestAnimationFrame(loop); }
    else if (opt.loop) { t0 = now; raf = requestAnimationFrame(loop); }
    else if (opt.settle !== 1) { mount.style.transition = "opacity .9s ease"; mount.style.opacity = opt.settle; }
  }
  return {
    play() { if (played) return; played = true; sample(); t0 = performance.now(); raf = requestAnimationFrame(loop); },
    stop() { if (raf) cancelAnimationFrame(raf); },
  };
}

// Composant utilisé sur la page À propos : démarre à l'entrée dans le viewport.
export default function LogoReveal() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const inst = createLogoReveal(mount, {
      ink: "#111111", particle: "#141414", glow: "rgba(30,41,255,0.10)", settle: 1, dur: 3.0,
    });
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) { inst.play(); io.disconnect(); }
    }, { threshold: 0.25 });
    io.observe(mount);
    return () => { io.disconnect(); inst.stop(); };
  }, []);

  return <div className="logorev about-logorev" ref={mountRef} aria-hidden="true" />;
}
