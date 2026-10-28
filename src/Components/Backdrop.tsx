import { useEffect, useRef, useState } from "react";

// Home-page background. Options are picked with ?bg=ink|dots|topo|none while
// Kabir chooses; the winner stays and the rest get deleted.

type Variant = "ink" | "dots" | "topo" | "none";

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const cssVar = (name: string) =>
  getComputedStyle(document.documentElement)
    .getPropertyValue(`--color-${name}`)
    .trim() || "#DDC7CC";

const hexToRgb = (hex: string): [number, number, number] => {
  const n = parseInt(hex.replace("#", ""), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

// Shared pointer tracking: page-fixed coords, coalesced per frame.
const usePointer = () => {
  const p = useRef({ x: -9999, y: -9999, active: false });
  useEffect(() => {
    const move = (e: PointerEvent) => {
      p.current.x = e.clientX;
      p.current.y = e.clientY;
      p.current.active = true;
    };
    const leave = () => (p.current.active = false);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, []);
  return p;
};

// Runs fn(dtSeconds, tSeconds) at most `fps` times a second while the tab is visible.
const useLoop = (fn: (dt: number, t: number) => void, fps: number, enabled: boolean) => {
  const f = useRef(fn);
  f.current = fn;
  useEffect(() => {
    if (!enabled) return;
    let raf = 0;
    let last = performance.now();
    const step = 1000 / fps;
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (document.hidden || now - last < step - 1) return;
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      f.current(dt, now / 1000);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [fps, enabled]);
};

const layerStyle: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  zIndex: 0,
  pointerEvents: "none",
};

/* 1. Ink-wash light: soft blooms that lean toward the cursor. */
const InkWash = () => {
  const pointer = usePointer();
  const refs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];
  const reduced = prefersReducedMotion();
  const state = useRef(
    [
      { x: 0.18, y: 0.3, vx: 0, vy: 0, follow: 1 },
      { x: 0.82, y: 0.7, vx: 0, vy: 0, follow: 0.35 },
      { x: 0.6, y: 0.15, vx: 0, vy: 0, follow: 0 },
    ],
  );
  useLoop(
    (dt, t) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const p = pointer.current;
      const scroll = Math.min(1, window.scrollY / Math.max(1, document.body.scrollHeight - h));
      state.current.forEach((b, i) => {
        // Resting spot drifts slowly; the cursor pulls with heavy lag.
        const hx = [0.18, 0.82, 0.6][i] + 0.06 * Math.sin(t * 0.07 + i * 2);
        const hy = [0.3, 0.7, 0.15][i] + 0.05 * Math.cos(t * 0.05 + i);
        const tx = p.active ? hx + (p.x / w - hx) * b.follow : hx;
        const ty = p.active ? hy + (p.y / h - hy) * b.follow : hy;
        // Critically damped spring, ~1.5 s to settle.
        const k = 4, c = 4;
        b.vx += ((tx - b.x) * k - b.vx * c) * dt;
        b.vy += ((ty - b.y) * k - b.vy * c) * dt;
        b.x += b.vx * dt;
        b.y += b.vy * dt;
        const el = refs[i].current;
        if (el) {
          el.style.transform = `translate3d(${b.x * w}px, ${b.y * h}px, 0) translate(-50%, -50%)`;
          if (i === 0) el.style.opacity = String(0.7 - 0.2 * scroll);
          if (i === 1) el.style.opacity = String(0.45 + 0.25 * scroll);
        }
      });
    },
    60,
    !reduced,
  );
  const bloom = (color: string, size: string): React.CSSProperties => ({
    position: "absolute",
    left: 0,
    top: 0,
    width: size,
    height: size,
    borderRadius: "50%",
    background: `radial-gradient(circle, ${color} 0%, transparent 65%)`,
    filter: "blur(40px)",
    willChange: "transform",
  });
  return (
    <div style={layerStyle} aria-hidden>
      <div ref={refs[0]} style={{ ...bloom("var(--color-lavender)", "48vmax"), opacity: 0.55, transform: "translate(18vw, 30vh) translate(-50%,-50%)" }} />
      <div ref={refs[1]} style={{ ...bloom("var(--color-lightBlue)", "55vmax"), opacity: 0.35, transform: "translate(82vw, 70vh) translate(-50%,-50%)" }} />
      <div ref={refs[2]} style={{ ...bloom("var(--color-cream)", "50vmax"), opacity: 0.9, transform: "translate(60vw, 15vh) translate(-50%,-50%)" }} />
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, opacity: 0.05, mixBlendMode: "multiply" }}>
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>
    </div>
  );
};

/* Canvas helper: full-screen, DPR capped at 1.5. */
const useCanvas = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  const size = useRef({ w: 0, h: 0, dpr: 1 });
  useEffect(() => {
    const resize = () => {
      const c = ref.current;
      if (!c) return;
      const dpr = Math.min(1.5, window.devicePixelRatio || 1);
      size.current = { w: window.innerWidth, h: window.innerHeight, dpr };
      c.width = Math.round(size.current.w * dpr);
      c.height = Math.round(size.current.h * dpr);
      c.getContext("2d")?.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);
  return { ref, size };
};

/* 2. Paper-grain dot field: dots part around the cursor and spring back. */
const DotField = () => {
  const { ref, size } = useCanvas();
  const pointer = usePointer();
  const reduced = prefersReducedMotion();
  const offs = useRef<Float32Array | null>(null);
  const draw = (dt: number, t: number) => {
    const c = ref.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    const { w, h } = size.current;
    const gap = 22;
    const cols = Math.ceil(w / gap) + 1;
    const rows = Math.ceil(h / gap) + 1;
    if (!offs.current || offs.current.length !== cols * rows * 2) offs.current = new Float32Array(cols * rows * 2);
    const o = offs.current;
    const p = pointer.current;
    const base = hexToRgb(cssVar("lavender"));
    const hot = hexToRgb(cssVar("periwinkle"));
    const R = 130;
    const touch = !window.matchMedia("(hover: hover)").matches;
    ctx.clearRect(0, 0, w, h);
    const shift = (window.scrollY * 0.3) % gap;
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        const k = (j * cols + i) * 2;
        const x0 = i * gap + gap / 2;
        const y0 = j * gap + gap / 2 - shift;
        let tx = 0, ty = 0, heat = 0;
        if (p.active && !reduced) {
          const dx = x0 - p.x, dy = y0 - p.y;
          const d = Math.hypot(dx, dy);
          if (d < R && d > 0.01) {
            const f = (1 - d / R) ** 2;
            tx = (dx / d) * f * 9;
            ty = (dy / d) * f * 9;
            heat = f;
          }
        }
        if (touch && !reduced) {
          // No hover on phones: a slow wave breathes across the grid instead.
          const s = Math.sin(t * 0.8 - (x0 + y0) * 0.012);
          heat = Math.max(heat, Math.max(0, s) ** 6 * 0.6);
        }
        o[k] += (tx - o[k]) * Math.min(1, dt * 8);
        o[k + 1] += (ty - o[k + 1]) * Math.min(1, dt * 8);
        const r = base[0] + (hot[0] - base[0]) * heat;
        const g = base[1] + (hot[1] - base[1]) * heat;
        const b = base[2] + (hot[2] - base[2]) * heat;
        ctx.fillStyle = `rgb(${r | 0},${g | 0},${b | 0})`;
        const rad = 1.1 + heat * 0.9;
        ctx.beginPath();
        ctx.arc(x0 + o[k], y0 + o[k + 1], rad, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  };
  useLoop(draw, 30, !reduced);
  useEffect(() => {
    if (reduced) draw(0, 0);
  });
  return <canvas ref={ref} style={{ ...layerStyle, width: "100vw", height: "100vh" }} aria-hidden />;
};

/* 3. Topographic contours: slow noise field, the cursor raises a hill. */
const hash = (x: number, y: number) => {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return s - Math.floor(s);
};
const smooth = (t: number) => t * t * (3 - 2 * t);
const noise = (x: number, y: number) => {
  const xi = Math.floor(x), yi = Math.floor(y);
  const xf = smooth(x - xi), yf = smooth(y - yi);
  const a = hash(xi, yi), b = hash(xi + 1, yi), c = hash(xi, yi + 1), d = hash(xi + 1, yi + 1);
  return a + (b - a) * xf + (c - a) * yf + (a - b - c + d) * xf * yf;
};
const field = (x: number, y: number, t: number) =>
  noise(x * 0.004 + t * 0.01, y * 0.004) * 0.65 + noise(x * 0.009 - t * 0.006, y * 0.009 + 40) * 0.35;

const Contours = () => {
  const { ref, size } = useCanvas();
  const pointer = usePointer();
  const reduced = prefersReducedMotion();
  const hill = useRef({ x: -9999, y: -9999, amp: 0 });
  const draw = (dt: number, t: number) => {
    const c = ref.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    const { w, h } = size.current;
    const p = pointer.current;
    const hl = hill.current;
    const ease = Math.min(1, dt * 3);
    if (p.active && !reduced) {
      hl.x += (p.x - hl.x) * (hl.amp < 0.01 ? 1 : ease);
      hl.y += (p.y - hl.y) * (hl.amp < 0.01 ? 1 : ease);
    }
    hl.amp += ((p.active && !reduced ? 0.22 : 0) - hl.amp) * ease;
    const step = 14;
    const cols = Math.ceil(w / step) + 1;
    const rows = Math.ceil(h / step) + 1;
    const sy = window.scrollY * 0.15;
    const v = new Float32Array(cols * rows);
    for (let j = 0; j < rows; j++)
      for (let i = 0; i < cols; i++) {
        const x = i * step, y = j * step;
        const dx = x - hl.x, dy = y - hl.y;
        v[j * cols + i] = field(x, y + sy, t) + hl.amp * Math.exp(-(dx * dx + dy * dy) / (2 * 110 * 110));
      }
    // Tint follows San Francisco time of day: warmer by day, deeper at night.
    const hr = Number(new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles", hour: "numeric", hour12: false })) % 24;
    const night = hr < 6 || hr >= 20;
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = cssVar(night ? "lightBlue" : "lavender");
    ctx.lineWidth = 1;
    ctx.beginPath();
    const levels = 11;
    for (let l = 1; l < levels; l++) {
      const iso = l / levels;
      for (let j = 0; j < rows - 1; j++)
        for (let i = 0; i < cols - 1; i++) {
          const a = v[j * cols + i], b = v[j * cols + i + 1], cc = v[(j + 1) * cols + i + 1], d = v[(j + 1) * cols + i];
          const idx = (a > iso ? 8 : 0) | (b > iso ? 4 : 0) | (cc > iso ? 2 : 0) | (d > iso ? 1 : 0);
          if (idx === 0 || idx === 15) continue;
          const x = i * step, y = j * step;
          const lerp = (p1: number, p2: number) => (iso - p1) / (p2 - p1);
          const top: [number, number] = [x + lerp(a, b) * step, y];
          const right: [number, number] = [x + step, y + lerp(b, cc) * step];
          const bottom: [number, number] = [x + lerp(d, cc) * step, y + step];
          const left: [number, number] = [x, y + lerp(a, d) * step];
          const seg = (p1: [number, number], p2: [number, number]) => {
            ctx.moveTo(p1[0], p1[1]);
            ctx.lineTo(p2[0], p2[1]);
          };
          switch (idx) {
            case 1: case 14: seg(left, bottom); break;
            case 2: case 13: seg(bottom, right); break;
            case 3: case 12: seg(left, right); break;
            case 4: case 11: seg(top, right); break;
            case 6: case 9: seg(top, bottom); break;
            case 7: case 8: seg(left, top); break;
            case 5: seg(left, top); seg(bottom, right); break;
            case 10: seg(top, right); seg(left, bottom); break;
          }
        }
    }
    ctx.stroke();
  };
  useLoop(draw, 24, !reduced);
  useEffect(() => {
    if (reduced) draw(0, 0);
  });
  return <canvas ref={ref} style={{ ...layerStyle, width: "100vw", height: "100vh", opacity: 0.9 }} aria-hidden />;
};

const pickVariant = (): Variant => {
  const q = new URLSearchParams(window.location.search).get("bg");
  return q === "dots" || q === "topo" || q === "none" || q === "ink" ? q : "ink";
};

const Backdrop = () => {
  const [variant] = useState<Variant>(pickVariant);
  if (variant === "none") return null;
  if (variant === "dots") return <DotField />;
  if (variant === "topo") return <Contours />;
  return <InkWash />;
};

export default Backdrop;
