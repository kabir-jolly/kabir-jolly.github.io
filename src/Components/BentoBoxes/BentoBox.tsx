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
      className={`bg-white rounded-xl p-5 border-2
        ${className} ${onClick ? "cursor-pointer" : ""}`}
      style={{
        borderColor,
        boxShadow: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default BentoBox;
