import { useEffect, useRef } from "react";
import { subscribePalette } from "../theme";

const CELL_PX = 7;

type Rgb = [number, number, number];

type PaletteRGB = {
  periwinkle: Rgb;
  slate: Rgb;
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
    lavender: hex("lavender"),
  };
};

const setPx = (d: Uint8ClampedArray, i: number, c: Rgb, a: number) => {
  d[i] = c[0];
  d[i + 1] = c[1];
  d[i + 2] = c[2];
  d[i + 3] = Math.min(255, Math.round(a * 255));
};

const GLIDER: [number, number][] = [
  [1, 0],
  [2, 1],
  [0, 2],
  [1, 2],
  [2, 2],
];

const createLife = (
  cols: number,
  rows: number,
  pal: PaletteRGB,
  out: ImageData,
  pointer: { x: number; y: number; moved: boolean },
) => {
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
    frame: (dt: number) => {
      acc += dt;
      sinceInject += dt;
      while (acc >= STEP) {
        tick();
        acc -= STEP;
      }
      if (sinceInject > 12) {
        sinceInject = 0;
        stamp((Math.random() * cols) | 0, (Math.random() * rows) | 0, GLIDER);
        for (let k = 0; k < 30; k++) {
          cur[(Math.random() * n) | 0] = 1;
        }
      }
      if (pointer.moved) {
        stamp(pointer.x | 0, pointer.y | 0, GLIDER);
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
            Math.round(
              pal.periwinkle[0] + (pal.slate[0] - pal.periwinkle[0]) * old,
            ),
            Math.round(
              pal.periwinkle[1] + (pal.slate[1] - pal.periwinkle[1]) * old,
            ),
            Math.round(
              pal.periwinkle[2] + (pal.slate[2] - pal.periwinkle[2]) * old,
            ),
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

const PixelBackdrop = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const pointer = { x: -1, y: -1, moved: false };
    let raf = 0;
    let disposed = false;
    let sim!: { frame: (dt: number) => void };
    let image!: ImageData;
    let palette = readPalette();

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      const cols = Math.max(8, Math.ceil(rect.width / CELL_PX));
      const rows = Math.max(8, Math.ceil(rect.height / CELL_PX));
      canvas.width = cols;
      canvas.height = rows;
      image = ctx.createImageData(cols, rows);
      sim = createLife(cols, rows, palette, image, pointer);
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
    if (reduced) {
      for (let i = 0; i < 40; i++) sim.frame(1 / 30);
      ctx.putImageData(image, 0, 0);
    } else {
      const loop = (now: number) => {
        if (disposed) return;
        const dt = Math.min((now - last) / 1000, 0.05);
        last = now;
        sim.frame(dt);
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
  }, []);

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

export default PixelBackdrop;
