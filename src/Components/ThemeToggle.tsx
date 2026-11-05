import { useSyncExternalStore } from "react";
import { getMode, subscribeMode, toggleMode } from "../theme";

const ThemeToggle = () => {
  const mode = useSyncExternalStore(subscribeMode, getMode, getMode);
  const next = mode === "dark" ? "Light" : "Dark";

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleMode}
      aria-label={`Switch to ${next.toLowerCase()} mode`}
    >
      {next}
    </button>
  );
};

export default ThemeToggle;
