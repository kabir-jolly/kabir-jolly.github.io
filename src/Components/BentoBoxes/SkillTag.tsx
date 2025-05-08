import React from "react";
import { colors } from "./BentoBox";

export interface SkillTagProps {
  skill: string;
}

const SkillTag: React.FC<SkillTagProps> = ({ skill }) => (
  <span
    className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-opacity-80 text-slate-700 mr-1.5 mb-1.5"
    style={{ backgroundColor: colors.lightPurple, color: colors.navy }}
  >
    {skill}
  </span>
);

export default SkillTag;
