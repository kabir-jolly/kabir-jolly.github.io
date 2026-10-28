import React from "react";
import { colors } from "../../theme";
import type { ColorName } from "../../theme";

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
      className={`rounded-xl p-5
        transition-all duration-200 ease-out
        hover:scale-[1.008] hover:-translate-y-0.5
        ${className} ${onClick ? "cursor-pointer" : ""}`}
      style={{
        backgroundColor: "var(--color-card)",
        borderStyle: "solid",
        borderWidth: "var(--card-border-width, 2px)",
        // Refined schemes set --color-cardBorder; the legacy ones keep the per-card tint.
        borderColor: `var(--color-cardBorder, ${borderColor})`,
        boxShadow: "var(--card-shadow)",
        ...style,
      }}
      onMouseEnter={(e) => {
        // On dark a shadow reads as a smudge; lift with the border only.
        e.currentTarget.style.boxShadow =
          document.documentElement.style.colorScheme === "dark"
            ? `0 0 0 1px var(--color-cardBorder, ${borderColor})`
            : `0 0 0 1px var(--color-cardBorder, ${borderColor}), 0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "var(--card-shadow)";
      }}
    >
      {children}
    </div>
  );
};

export default BentoBox;
