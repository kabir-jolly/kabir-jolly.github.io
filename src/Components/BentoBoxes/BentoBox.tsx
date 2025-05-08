import React from "react";

// Define the colors once and export them for reuse
export const colors = {
  lightPurple: "#F4EEFF",
  lavender: "#DCD6F7",
  periwinkle: "#A6B1E1",
  navy: "#424874",
  darkBlue: "#213448",
  slate: "#547792",
  lightBlue: "#94B4C1",
  cream: "#ECEFCA",
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
}) => (
  <div
    id={id}
    onClick={onClick}
    className={`bg-white rounded-xl p-5 shadow-md border-2 border-opacity-20 transition-all duration-300 hover:shadow-lg hover:border-4 ${className} ${
      onClick ? "cursor-pointer" : ""
    }`}
    style={{
      borderColor: colors[borderColorName] || colors.lavender, // Use specified or default
      ...style,
    }}
  >
    {children}
  </div>
);

export default BentoBox;
