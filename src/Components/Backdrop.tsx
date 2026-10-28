import { useEffect, useRef, useState } from "react";
import { palettes, getActivePaletteName, setActivePalette, subscribePalette } from "../theme";
import type { PaletteName } from "../theme";

// Home-page background. Options are picked with ?bg=ink|topo|none while
// Kabir chooses; the winner stays and the rest get deleted.

type Variant = "ink" | "topo" | "none";

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const cssVar = (name: string) =>
  getComputedStyle(document.documentElement)
    .getPropertyValue(`--color-${name}`)
    .trim() || "#DDC7CC";

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
          if (i === 0) el.style.opacity = String(0.95 - 0.2 * scroll);
          if (i === 1) el.style.opacity = String(0.65 + 0.25 * scroll);
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
  return <canvas ref={ref} style={{ ...layerStyle, width: "100vw", height: "100vh", opacity: 0.9, maskImage: "linear-gradient(to bottom, transparent 56px, black 140px)", WebkitMaskImage: "linear-gradient(to bottom, transparent 56px, black 140px)" }} aria-hidden />;
};

const pickVariant = (): Variant => {
  const q = new URLSearchParams(window.location.search).get("bg");
  return q === "topo" || q === "none" || q === "ink" ? q : "ink";
};

// Preview-only picker (dev server only), so options can be compared live.
const PREVIEW_THEMES: PaletteName[] = ["dustyPlum", "inkPaper", "plumRefined", "sageStone", "nightStudy"];

const setParam = (k: string, v: string) => {
  const u = new URL(window.location.href);
  u.searchParams.set(k, v);
  window.history.replaceState(null, "", u);
};

const Row = <T extends string>({ label, opts, value, onChange }: { label: string; opts: [T, string][]; value: T; onChange: (v: T) => void }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
    <span style={{ width: 84, paddingLeft: 8, color: "#666", fontSize: 12 }}>{label}</span>
    {opts.map(([v, l]) => (
      <button key={v} onClick={() => onChange(v)} style={{ padding: "5px 11px", borderRadius: 999, background: v === value ? "#222" : "transparent", color: v === value ? "#fff" : "#222", whiteSpace: "nowrap" }}>
        {l}
      </button>
    ))}
  </div>
);

const Picker = ({ value, onChange }: { value: Variant; onChange: (v: Variant) => void }) => {
  const [theme, setTheme] = useState<PaletteName>(getActivePaletteName());
  useEffect(() => subscribePalette(() => setTheme(getActivePaletteName())), []);
  return (
    <div style={{ position: "fixed", bottom: 16, right: 16, zIndex: 60, display: "flex", flexDirection: "column", gap: 4, padding: 6, borderRadius: 16, background: "rgba(255,255,255,0.94)", boxShadow: "0 2px 12px rgba(0,0,0,0.18)", fontSize: 13, fontFamily: "Inter, sans-serif" }}>
      <Row label="Background" opts={[["ink", "Soft glow"], ["topo", "Contours"], ["none", "None"]]} value={value} onChange={onChange} />
      <Row
        label="Colours"
        opts={PREVIEW_THEMES.map((n) => [n, n === "dustyPlum" ? "Today" : palettes[n].label] as [PaletteName, string])}
        value={theme}
        onChange={(n) => {
          setActivePalette(n);
          setParam("theme", n);
        }}
      />
    </div>
  );
};

const Backdrop = () => {
  const [variant, setVariant] = useState<Variant>(pickVariant);
  const choose = (v: Variant) => {
    setVariant(v);
    setParam("bg", v);
  };
  const layer =
    variant === "none" ? null : variant === "topo" ? <Contours key="topo" /> : <InkWash key="ink" />;
  return (
    <>
      {layer}
      {import.meta.env.DEV && <Picker value={variant} onChange={choose} />}
    </>
  );
};

export default Backdrop;
