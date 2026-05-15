export type Palette = {
  bg: string;
  lightPurple: string;
  lavender: string;
  periwinkle: string;
  navy: string;
  darkBlue: string;
  slate: string;
  lightBlue: string;
  cream: string;
};

export type PaletteName =
  | "periwinkle"
  | "warmSand"
  | "coastalMist"
  | "dustyPlum";

export const palettes: Record<PaletteName, { label: string; palette: Palette }> = {
  periwinkle: {
    label: "Periwinkle",
    palette: {
      bg: "#faf9f6",
      lightPurple: "#F4EEFF",
      lavender: "#DCD6F7",
      periwinkle: "#A6B1E1",
      navy: "#424874",
      darkBlue: "#213448",
      slate: "#547792",
      lightBlue: "#94B4C1",
      cream: "#ECEFCA",
    },
  },
  warmSand: {
    label: "Warm Sand",
    palette: {
      bg: "#FBF7F0",
      lightPurple: "#F7EFE2",
      lavender: "#EAD8BD",
      periwinkle: "#D4A373",
      navy: "#5C3A21",
      darkBlue: "#3E2C1C",
      slate: "#7A5B3E",
      lightBlue: "#C9B89D",
      cream: "#F4E2C9",
    },
  },
  coastalMist: {
    label: "Coastal Mist",
    palette: {
      bg: "#F5F9FA",
      lightPurple: "#E5EFF1",
      lavender: "#C1D6DC",
      periwinkle: "#6FA8B8",
      navy: "#1F3A47",
      darkBlue: "#0F2530",
      slate: "#4F6E78",
      lightBlue: "#94B5BF",
      cream: "#EAEBD5",
    },
  },
  dustyPlum: {
    label: "Dusty Plum",
    palette: {
      bg: "#FAF6F4",
      lightPurple: "#F1E7E8",
      lavender: "#DDC7CC",
      periwinkle: "#B58CA0",
      navy: "#4A2D3C",
      darkBlue: "#2F1A26",
      slate: "#76555E",
      lightBlue: "#C7A7B0",
      cream: "#F4E2DA",
    },
  },
};

const DEFAULT_PALETTE: PaletteName = "periwinkle";

let activeName: PaletteName = DEFAULT_PALETTE;
let activePalette: Palette = palettes[DEFAULT_PALETTE].palette;
const listeners = new Set<() => void>();

const applyToRoot = (p: Palette) => {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  (Object.entries(p) as [keyof Palette, string][]).forEach(([k, v]) => {
    root.style.setProperty(`--color-${k}`, v);
  });
};

export const getActivePaletteName = () => activeName;
export const getActivePalette = () => activePalette;

export const setActivePalette = (name: PaletteName) => {
  activeName = name;
  activePalette = palettes[name].palette;
  applyToRoot(activePalette);
  listeners.forEach((fn) => fn());
};

export const subscribePalette = (fn: () => void) => {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
};

export const initPalette = () => {
  if (typeof window === "undefined") return;
  const names = Object.keys(palettes) as PaletteName[];
  const random = names[Math.floor(Math.random() * names.length)];
  setActivePalette(random);
};
