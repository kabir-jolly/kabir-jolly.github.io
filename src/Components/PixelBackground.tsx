import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useSearchParams } from "react-router-dom";
import { subscribePalette } from "../theme";

export type PixelMode =
  | "off"
  | "life"
  | "sand"
  | "rain"
  | "dither"
  | "pond"
  | "stars";

const PIXEL_MODES: { id: PixelMode; label: string }[] = [
  { id: "off", label: "off" },
  { id: "life", label: "game of life" },
  { id: "sand", label: "falling sand" },
  { id: "rain", label: "pixel rain" },
  { id: "dither", label: "dither waves" },
  { id: "pond", label: "ripple pond" },
  { id: "stars", label: "starfield" },
];

const CELL_PX = 7;

type Rgb = [number, number, number];

type PaletteRGB = {
  periwinkle: Rgb;
  slate: Rgb;
  navy: Rgb;
  lightBlue: Rgb;
  lavender: Rgb;
};

const hexToRgb = (hex: string): Rgb => {
  const n = parseInt(hex.replace("#", "").trim(), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

const readPalette = (): PaletteRGB => {
  const s = getComputedStyle(document.documentElement);
  const hex = (name: string) =>
    hexToRgb(s.getPropertyValue(`--color-${name}`) || "#000000");
  return {
    periwinkle: hex("periwinkle"),
    slate: hex("slate"),
    navy: hex("navy"),
    lightBlue: hex("lightBlue"),
    lavender: hex("lavender"),
  };
};

type PointerState = { x: number; y: number; moved: boolean };

interface Sim {
  frame: (dt: number, t: number) => void;
}

type SimFactory = (
  cols: number,
  rows: number,
  pal: PaletteRGB,
  image: ImageData,
  pointer: PointerState,
) => Sim;

const setPx = (
  d: Uint8ClampedArray,
  i: number,
  c: Rgb,
  a: number,
) => {
  d[i] = c[0];
  d[i + 1] = c[1];
  d[i + 2] = c[2];
  d[i + 3] = Math.min(255, Math.round(a * 255));
};

/* ---------------- game of life ---------------- */

const createLife: SimFactory = (cols, rows, pal, out, pointer) => {
  const n = cols * rows;
  let cur = new Uint8Array(n);
  let next = new Uint8Array(n);
  const fade = new Float32Array(n);
  const age = new Uint8Array(n);

  const seed = () => {
    for (let i = 0; i < n; i++) cur[i] = Math.random() < 0.16 ? 1 : 0;
  };
  seed();

  const stamp = (cx: number, cy: number, cells: [number, number][]) => {
    for (const [dx, dy] of cells) {
      const x = (cx + dx + cols) % cols;
      const y = (cy + dy + rows) % rows;
      cur[y * cols + x] = 1;
    }
  };

  const glider: [number, number][] = [
    [1, 0],
    [2, 1],
    [0, 2],
    [1, 2],
    [2, 2],
  ];

  let acc = 0;
  let sinceInject = 0;
  const STEP = 0.45;
  let aliveCount = 0;

  const tick = () => {
    aliveCount = 0;
    for (let y = 0; y < rows; y++) {
      const up = ((y - 1 + rows) % rows) * cols;
      const dn = ((y + 1) % rows) * cols;
      for (let x = 0; x < cols; x++) {
        const l = (x - 1 + cols) % cols;
        const r = (x + 1) % cols;
        const i = y * cols + x;
        const nb =
          cur[up + l] +
          cur[up + x] +
          cur[up + r] +
          cur[i + l] +
          cur[i + r] +
          cur[dn + l] +
          cur[dn + x] +
          cur[dn + r];
        const alive = cur[i];
        const nxt = alive ? (nb === 2 || nb === 3 ? 1 : 0) : nb === 3 ? 1 : 0;
        next[i] = nxt;
        if (nxt) {
          aliveCount++;
          if (!alive) age[i] = 0;
          else if (age[i] < 255) age[i]++;
        }
      }
    }
    [cur, next] = [next, cur];
    if (aliveCount < n * 0.012) seed();
  };

  return {
    frame: (dt) => {
      acc += dt;
      sinceInject += dt;
      while (acc >= STEP) {
        tick();
        acc -= STEP;
      }
      if (sinceInject > 12) {
        sinceInject = 0;
        stamp(
          (Math.random() * cols) | 0,
          (Math.random() * rows) | 0,
          glider,
        );
        for (let k = 0; k < 30; k++) {
          cur[(Math.random() * n) | 0] = 1;
        }
      }
      if (pointer.moved) {
        stamp(pointer.x | 0, pointer.y | 0, glider);
        pointer.moved = false;
      }
      const d = out.data;
      d.fill(0);
      for (let i = 0; i < n; i++) {
        const p = i * 4;
        if (cur[i]) {
          fade[i] = 1;
          const old = Math.min(age[i] / 60, 1);
          const c: Rgb = [
            Math.round(pal.periwinkle[0] + (pal.slate[0] - pal.periwinkle[0]) * old),
            Math.round(pal.periwinkle[1] + (pal.slate[1] - pal.periwinkle[1]) * old),
            Math.round(pal.periwinkle[2] + (pal.slate[2] - pal.periwinkle[2]) * old),
          ];
          setPx(d, p, c, 0.42);
        } else if (fade[i] > 0.05) {
          fade[i] *= 0.96;
          setPx(d, p, pal.lavender, fade[i] * 0.3);
        }
      }
    },
  };
};

/* ---------------- falling sand ---------------- */

const createSand: SimFactory = (cols, rows, pal, out, pointer) => {
  const n = cols * rows;
  const grid = new Uint8Array(n);
  const grains: Rgb[] = [pal.periwinkle, pal.slate, pal.lightBlue];

  const spawn = (x: number, y: number) => {
    if (x < 0 || x >= cols || y < 0 || y >= rows) return;
    const i = y * cols + x;
    if (!grid[i]) grid[i] = 1 + ((Math.random() * grains.length) | 0);
  };

  return {
    frame: () => {
      for (let k = 0; k < 6; k++) {
        spawn((Math.random() * cols) | 0, (Math.random() * 3) | 0);
      }
      if (pointer.moved) {
        for (let k = 0; k < 10; k++) {
          spawn(
            (pointer.x + (Math.random() * 6 - 3)) | 0,
            (pointer.y + (Math.random() * 4 - 2)) | 0,
          );
        }
        pointer.moved = false;
      }
      for (let y = rows - 1; y >= 0; y--) {
        const ltr = Math.random() < 0.5;
        for (let xi = 0; xi < cols; xi++) {
          const x = ltr ? xi : cols - 1 - xi;
          const i = y * cols + x;
          if (!grid[i]) continue;
          const below = i + cols;
          if (y === rows - 1) {
            // sink into the floor so piles never fill the screen
            if (Math.random() < 0.04) grid[i] = 0;
            continue;
          }
          if (!grid[below]) {
            grid[below] = grid[i];
            grid[i] = 0;
            continue;
          }
          const dir = Math.random() < 0.5 ? -1 : 1;
          const d1 = below + dir;
          const d2 = below - dir;
          const x1 = x + dir;
          const x2 = x - dir;
          if (x1 >= 0 && x1 < cols && !grid[d1]) {
            grid[d1] = grid[i];
            grid[i] = 0;
          } else if (x2 >= 0 && x2 < cols && !grid[d2]) {
            grid[d2] = grid[i];
            grid[i] = 0;
          }
        }
      }
      const d = out.data;
      d.fill(0);
      for (let i = 0; i < n; i++) {
        if (grid[i]) setPx(d, i * 4, grains[grid[i] - 1], 0.5);
      }
    },
  };
};

/* ---------------- pixel rain ---------------- */

const createRain: SimFactory = (cols, rows, pal, out) => {
  const n = cols * rows;
  const trail = new Float32Array(n);
  const headY = new Float32Array(cols).fill(-1);
  const speed = new Float32Array(cols);
  const active = new Uint8Array(cols);

  return {
    frame: (dt) => {
      for (let x = 0; x < cols; x++) {
        if (!active[x] && Math.random() < 0.012) {
          active[x] = 1;
          headY[x] = 0;
          speed[x] = 8 + Math.random() * 16;
        }
        if (active[x]) {
          headY[x] += speed[x] * dt;
          const y = headY[x] | 0;
          if (y >= 0 && y < rows) trail[y * cols + x] = 1;
          if (headY[x] - 24 > rows) active[x] = 0;
        }
      }
      const d = out.data;
      d.fill(0);
      for (let i = 0; i < n; i++) {
        if (trail[i] < 0.04) {
          trail[i] = 0;
          continue;
        }
        trail[i] *= 0.9;
        const v = trail[i];
        setPx(d, i * 4, v > 0.75 ? pal.navy : pal.periwinkle, v * 0.45);
      }
    },
  };
};

/* ---------------- dithered waves ---------------- */

const BAYER = [
  0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5,
];

const createDither: SimFactory = (cols, rows, pal, out) => {
  return {
    frame: (_dt, t) => {
      const d = out.data;
      d.fill(0);
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const s =
            Math.sin(x * 0.09 + t * 0.35) +
            Math.sin(y * 0.11 - t * 0.22) +
            Math.sin((x + y) * 0.05 + t * 0.18) +
            Math.sin(Math.sqrt(x * x + y * y) * 0.07 - t * 0.3);
          const v = s / 8 + 0.5;
          const threshold =
            (BAYER[(x & 3) + ((y & 3) << 2)] + 0.5) / 16;
          if (v > threshold) {
            setPx(d, (y * cols + x) * 4, pal.periwinkle, 0.3);
          }
        }
      }
    },
  };
};

/* ---------------- ripple pond ---------------- */

const createPond: SimFactory = (cols, rows, pal, out, pointer) => {
  const n = cols * rows;
  let buf = new Float32Array(n);
  let prev = new Float32Array(n);
  let dropTimer = 0;

  const drop = (x: number, y: number, s: number) => {
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        const xx = x + dx;
        const yy = y + dy;
        if (xx > 0 && xx < cols - 1 && yy > 0 && yy < rows - 1) {
          buf[yy * cols + xx] += s * (dx === 0 && dy === 0 ? 1 : 0.5);
        }
      }
    }
  };

  return {
    frame: (dt) => {
      dropTimer -= dt;
      if (dropTimer <= 0) {
        dropTimer = 1 + Math.random() * 1.6;
        drop(
          (Math.random() * cols) | 0,
          (Math.random() * rows) | 0,
          2.5 + Math.random() * 2,
        );
      }
      if (pointer.moved) {
        drop(pointer.x | 0, pointer.y | 0, 1.4);
        pointer.moved = false;
      }
      for (let y = 1; y < rows - 1; y++) {
        for (let x = 1; x < cols - 1; x++) {
          const i = y * cols + x;
          const v =
            (buf[i - 1] + buf[i + 1] + buf[i - cols] + buf[i + cols]) / 2 -
            prev[i];
          prev[i] = v * 0.985;
        }
      }
      [buf, prev] = [prev, buf];
      const d = out.data;
      d.fill(0);
      for (let i = 0; i < n; i++) {
        const h = buf[i];
        const a = Math.min(Math.abs(h) * 0.35, 0.5);
        if (a < 0.03) continue;
        setPx(d, i * 4, h > 0 ? pal.lightBlue : pal.lavender, a);
      }
    },
  };
};

/* ---------------- starfield ---------------- */

const createStars: SimFactory = (cols, rows, pal, out) => {
  const count = Math.max(40, (cols * rows) / 130) | 0;
  const stars = Array.from({ length: count }, () => ({
    x: Math.random() * cols,
    y: Math.random() * rows,
    vx: -0.6 - Math.random() * 0.8,
    vy: 0.15 + Math.random() * 0.35,
    phase: Math.random() * Math.PI * 2,
    tw: 0.8 + Math.random() * 2.2,
    c: Math.random() < 0.6 ? pal.slate : pal.navy,
  }));
  let shoot: { x: number; y: number; life: number } | null = null;
  let shootTimer = 4;

  return {
    frame: (dt, t) => {
      const d = out.data;
      d.fill(0);
      for (const s of stars) {
        s.x += s.vx * dt;
        s.y += s.vy * dt;
        if (s.x < 0) s.x += cols;
        if (s.y >= rows) s.y -= rows;
        const a = 0.1 + 0.3 * (0.5 + 0.5 * Math.sin(t * s.tw + s.phase));
        setPx(d, ((s.y | 0) * cols + (s.x | 0)) * 4, s.c, a);
      }
      shootTimer -= dt;
      if (!shoot && shootTimer <= 0) {
        shootTimer = 5 + Math.random() * 5;
        shoot = {
          x: cols * (0.3 + Math.random() * 0.7),
          y: rows * Math.random() * 0.3,
          life: 1,
        };
      }
      if (shoot) {
        shoot.life -= dt * 1.2;
        shoot.x -= 28 * dt;
        shoot.y += 10 * dt;
        for (let k = 0; k < 6; k++) {
          const x = (shoot.x + k * 1.4) | 0;
          const y = (shoot.y - k * 0.5) | 0;
          if (x >= 0 && x < cols && y >= 0 && y < rows) {
            setPx(
              d,
              (y * cols + x) * 4,
              pal.navy,
              Math.max(0, shoot.life) * (1 - k / 7) * 0.7,
            );
          }
        }
        if (shoot.life <= 0) shoot = null;
      }
    },
  };
};

const SIMS: Record<Exclude<PixelMode, "off">, SimFactory> = {
  life: createLife,
  sand: createSand,
  rain: createRain,
  dither: createDither,
  pond: createPond,
  stars: createStars,
};

const PixelBackground = ({ mode }: { mode: PixelMode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (mode === "off") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const pointer: PointerState = { x: -1, y: -1, moved: false };
    let raf = 0;
    let disposed = false;
    let sim!: Sim;
    let image!: ImageData;
    let palette = readPalette();

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      const cols = Math.max(8, Math.ceil(rect.width / CELL_PX));
      const rows = Math.max(8, Math.ceil(rect.height / CELL_PX));
      canvas.width = cols;
      canvas.height = rows;
      image = ctx.createImageData(cols, rows);
      sim = SIMS[mode](cols, rows, palette, image, pointer);
    };
    build();

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      pointer.x = ((e.clientX - rect.left) / rect.width) * canvas.width;
      pointer.y = ((e.clientY - rect.top) / rect.height) * canvas.height;
      pointer.moved = true;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(build, 200);
    };
    window.addEventListener("resize", onResize);

    const unsub = subscribePalette(() => {
      palette = readPalette();
      build();
    });

    let last = performance.now();
    let t = 0;
    if (reduced) {
      for (let i = 0; i < 90; i++) sim.frame(1 / 30, i / 30);
      ctx.putImageData(image, 0, 0);
    } else {
      const loop = (now: number) => {
        if (disposed) return;
        const dt = Math.min((now - last) / 1000, 0.05);
        last = now;
        t += dt;
        sim.frame(dt, t);
        ctx.putImageData(image, 0, 0);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      window.clearTimeout(resizeTimer);
      unsub();
    };
  }, [mode]);

  if (mode === "off") return null;

  // Absolutely positioned inside .home-page: paints above the page
  // background but below the (positioned) bento content.
  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        imageRendering: "pixelated",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
};

const PixelBackdrop = () => {
  const [params, setParams] = useSearchParams();
  const raw = params.get("bg");
  const mode: PixelMode = PIXEL_MODES.some((m) => m.id === raw)
    ? (raw as PixelMode)
    : "life";

  return (
    <>
      <PixelBackground mode={mode} />
      {createPortal(
        <div
          className="fixed bottom-4 right-4 z-40 flex flex-wrap items-center gap-1"
          style={{
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          }}
        >
          {PIXEL_MODES.map((m) => {
            const isActive = m.id === mode;
            return (
              <button
                key={m.id}
                onClick={() =>
                  setParams(
                    m.id === "off" ? {} : { bg: m.id },
                    { replace: true },
                  )
                }
                className="pill-button"
                style={{
                  fontFamily: "inherit",
                  fontSize: "0.62rem",
                  letterSpacing: "0.04em",
                  padding: "0.28rem 0.55rem",
                  background: isActive
                    ? "var(--color-navy)"
                    : "var(--color-lightPurple)",
                  color: isActive ? "var(--color-bg)" : "var(--color-navy)",
                }}
              >
                {m.label}
              </button>
            );
          })}
        </div>,
        document.body,
      )}
    </>
  );
};

export default PixelBackdrop;
