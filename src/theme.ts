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
  // Slots added for the refined schemes; the older palettes get the values
  // that reproduce today's look (see withLegacySlots).
  card: string;
  link: string;
  muted: string;
  cardBorder: string;
  cardBorderWidth: string;
  cardShadow: string;
  tagBg: string;
  tagText: string;
  globe: string;
};

export type PaletteName =
  | "periwinkle"
  | "warmSand"
  | "coastalMist"
  | "dustyPlum"
  | "inkPaper"
  | "plumRefined"
  | "sageStone"
  | "nightStudy";

type BasePalette = Omit<Palette, "card" | "link" | "muted" | "cardBorder" | "cardBorderWidth" | "cardShadow" | "tagBg" | "tagText" | "globe">;

const LEGACY_SHADOW = "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)";

// Today's look: white cards, 2px tinted border with a shadow, navy links,
// accent-coloured secondary text.
const withLegacySlots = (p: BasePalette): Palette => ({
  ...p,
  card: "#FFFFFF",
  link: p.navy,
  muted: p.periwinkle,
  cardBorder: "",
  cardBorderWidth: "2px",
  cardShadow: LEGACY_SHADOW,
  tagBg: p.lightPurple,
  tagText: p.navy,
  globe: p.periwinkle,
});

// Refined look (monet): 1px neutral border, no resting shadow, accent links,
// slate secondary text.
const refined = (p: BasePalette, card = "#FFFFFF"): Palette => ({
  ...p,
  card,
  link: p.periwinkle,
  muted: p.slate,
  cardBorder: p.lavender,
  cardBorderWidth: "1px",
  cardShadow: "none",
  tagBg: p.cream,
  tagText: p.periwinkle,
  // Accent is now deep; a soft globe keeps it from being the loudest thing.
  globe: p.lightBlue,
});

export const colors = {
  lightPurple: "var(--color-lightPurple)",
  lavender: "var(--color-lavender)",
  periwinkle: "var(--color-periwinkle)",
  navy: "var(--color-navy)",
  darkBlue: "var(--color-darkBlue)",
  slate: "var(--color-slate)",
  lightBlue: "var(--color-lightBlue)",
  cream: "var(--color-cream)",
  card: "var(--color-card)",
  link: "var(--color-link)",
  muted: "var(--color-muted)",
  tagBg: "var(--color-tagBg)",
  tagText: "var(--color-tagText)",
};

export type ColorName = keyof typeof colors;

export const palettes: Record<PaletteName, { label: string; palette: Palette }> = {
  periwinkle: {
    label: "Periwinkle",
    palette: withLegacySlots({
      bg: "#faf9f6",
      lightPurple: "#F4EEFF",
      lavender: "#DCD6F7",
      periwinkle: "#A6B1E1",
      navy: "#424874",
      darkBlue: "#213448",
      slate: "#547792",
      lightBlue: "#94B4C1",
      cream: "#ECEFCA",
    }),
  },
  warmSand: {
    label: "Warm Sand",
    palette: withLegacySlots({
      bg: "#FBF7F0",
      lightPurple: "#F7EFE2",
      lavender: "#EAD8BD",
      periwinkle: "#D4A373",
      navy: "#5C3A21",
      darkBlue: "#3E2C1C",
      slate: "#7A5B3E",
      lightBlue: "#C9B89D",
      cream: "#F4E2C9",
    }),
  },
  coastalMist: {
    label: "Coastal Mist",
    palette: withLegacySlots({
      bg: "#F5F9FA",
      lightPurple: "#E5EFF1",
      lavender: "#C1D6DC",
      periwinkle: "#6FA8B8",
      navy: "#1F3A47",
      darkBlue: "#0F2530",
      slate: "#4F6E78",
      lightBlue: "#94B5BF",
      cream: "#EAEBD5",
    }),
  },
  dustyPlum: {
    label: "Dusty Plum",
    palette: withLegacySlots({
      bg: "#FAF6F4",
      lightPurple: "#F1E7E8",
      lavender: "#DDC7CC",
      periwinkle: "#B58CA0",
      navy: "#4A2D3C",
      darkBlue: "#2F1A26",
      slate: "#76555E",
      lightBlue: "#C7A7B0",
      cream: "#F4E2DA",
    }),
  },
  inkPaper: {
    label: "Ink & Paper",
    palette: refined({ bg: "#F7F5F0", lightPurple: "#FFFFFF", lavender: "#E4DFD5", periwinkle: "#8C2F2B", navy: "#1C1A17", darkBlue: "#3A3631", slate: "#7A736A", lightBlue: "#CFC6B6", cream: "#F1EEE7" }),
  },
  plumRefined: {
    label: "Plum, refined",
    palette: refined({ bg: "#FAF9F8", lightPurple: "#FFFFFF", lavender: "#E8E3E5", periwinkle: "#7B3B5E", navy: "#24181E", darkBlue: "#3B3036", slate: "#756A70", lightBlue: "#B98AA3", cream: "#F5EEF2" }),
  },
  sageStone: {
    label: "Sage & Stone",
    palette: refined({ bg: "#F3F4EF", lightPurple: "#FFFFFF", lavender: "#DEE2D8", periwinkle: "#2F5D4E", navy: "#1D2620", darkBlue: "#343D37", slate: "#6B746D", lightBlue: "#9FB5A5", cream: "#ECF0EA" }),
  },
  nightStudy: {
    label: "Night Study",
    palette: refined({ bg: "#121316", lightPurple: "#1B1D21", lavender: "#2C2F35", periwinkle: "#E3A857", navy: "#F1ECE3", darkBlue: "#CFC9BF", slate: "#8E887F", lightBlue: "#5A5D64", cream: "#25282D" }, "#1B1D21"),
  },
};

const DEFAULT_PALETTE: PaletteName = "dustyPlum";

let activeName: PaletteName = DEFAULT_PALETTE;
let activePalette: Palette = palettes[DEFAULT_PALETTE].palette;
const listeners = new Set<() => void>();

const applyToRoot = (p: Palette) => {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  (Object.entries(p) as [keyof Palette, string][]).forEach(([k, v]) => {
    if (k === "cardBorderWidth" || k === "cardShadow") root.style.setProperty(`--${k === "cardShadow" ? "card-shadow" : "card-border-width"}`, v);
    else if (v) root.style.setProperty(`--color-${k}`, v);
    else root.style.removeProperty(`--color-${k}`);
  });
  const dark = p.bg.toLowerCase() < "#808080";
  root.style.colorScheme = dark ? "dark" : "light";
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
  // ?theme=<name> previews a scheme (used while choosing).
  const q = new URLSearchParams(window.location.search).get("theme");
  setActivePalette(q && q in palettes ? (q as PaletteName) : DEFAULT_PALETTE);
};
