// Light and dark mode. Colours live in src/index.css as CSS variables; this
// file only decides which set applies. With no stored choice the page follows
// the visitor's system setting (CSS handles that before any script runs); the
// toggle's choice is remembered in localStorage.
export type Mode = "light" | "dark";

const MODE_KEY = "theme-mode";
const listeners = new Set<() => void>();
let mode: Mode = "light";

const systemMode = (): Mode =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

const storedMode = (): Mode | null => {
  try {
    const v = window.localStorage.getItem(MODE_KEY);
    return v === "light" || v === "dark" ? v : null;
  } catch {
    return null;
  }
};

const applyMode = (m: Mode) => {
  mode = m;
  const root = document.documentElement;
  root.dataset.theme = m;
  root.style.colorScheme = m;
  listeners.forEach((fn) => fn());
};

export const getMode = (): Mode => mode;

export const subscribeMode = (fn: () => void) => {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
};

export const toggleMode = () => {
  const next: Mode = mode === "dark" ? "light" : "dark";
  try {
    if (next === systemMode()) window.localStorage.removeItem(MODE_KEY);
    else window.localStorage.setItem(MODE_KEY, next);
  } catch {
    /* storage blocked: still switch for this visit */
  }
  applyMode(next);
};

export const initTheme = () => {
  if (typeof window === "undefined") return;
  applyMode(storedMode() ?? systemMode());
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
      if (!storedMode()) applyMode(systemMode());
    });
};
