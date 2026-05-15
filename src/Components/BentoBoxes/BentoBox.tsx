import React from "react";

// Colors resolve at runtime via CSS variables. The active palette is set in src/theme.ts
// and applied to document.documentElement; switching the palette restyles the whole UI
// because consumers pass these strings through `style={{ color: ... }}` etc.
export const colors = {
  lightPurple: "var(--color-lightPurple)",
  lavender: "var(--color-lavender)",
  periwinkle: "var(--color-periwinkle)",
  navy: "var(--color-navy)",
  darkBlue: "var(--color-darkBlue)",
  slate: "var(--color-slate)",
  lightBlue: "var(--color-lightBlue)",
  cream: "var(--color-cream)",
};

// Define a type for the color keys
export type ColorName = keyof typeof colors;

export interface BentoBoxProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  id?: string;
  borderColorName?: ColorName; // Optional prop for border color name
}

const BentoBox: React.FC<BentoBoxProps> = ({
  children,
  className = "",
  style = {},
  onClick,
  id,
  borderColorName = "lavender", // Default to lavender if not provided
}) => {
  const borderColor = colors[borderColorName] || colors.lavender;

  return (
    <div
      id={id}
      onClick={onClick}
      className={`bg-white rounded-xl p-5 border-2 
        transition-all duration-200 ease-out
        hover:scale-[1.008] hover:-translate-y-0.5
        ${className} ${onClick ? "cursor-pointer" : ""}`}
      style={{
        borderColor,
        boxShadow: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)`,
        ...style,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 0 0 2px ${borderColor}, 0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)`;
      }}
    >
      {children}
    </div>
  );
};

export default BentoBox;
