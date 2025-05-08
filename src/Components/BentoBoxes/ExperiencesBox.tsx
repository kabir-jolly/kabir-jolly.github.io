import React, { useState } from "react";
import BentoBox, { colors, ColorName } from "./BentoBox";
import SkillTag from "./SkillTag";
import { ExperienceType } from "../../types";

interface ExperiencesBoxProps {
  experiences: ExperienceType[];
  borderColorName?: ColorName;
}

// Re-using TooltipState, or could be defined in a shared types file
interface TooltipState {
  visible: boolean;
  x: number;
  y: number;
  text: string;
}

const ExperiencesBox: React.FC<ExperiencesBoxProps> = ({
  experiences,
  borderColorName,
}) => {
  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false,
    x: 0,
    y: 0,
    text: "Click for More!",
  });

  const handleMouseEnter = (
    event: React.MouseEvent<HTMLDivElement>,
    hasSlug?: string
  ) => {
    if (hasSlug) {
      setTooltip({
        visible: true,
        x: event.clientX + 10, // Offset slightly from cursor
        y: event.clientY + 10,
        text: "Click for More!",
      });
    }
  };

  const handleMouseLeave = () => {
    setTooltip((prev) => ({ ...prev, visible: false }));
  };

  return (
    <BentoBox
      className="md:col-span-2 relative h-full"
      id="experience"
      borderColorName={borderColorName}
    >
      {tooltip.visible && (
        <div
          style={{
            position: "fixed",
            top: tooltip.y,
            left: tooltip.x,
            backgroundColor: colors.navy,
            color: "white",
            padding: "4px 8px",
            borderRadius: "4px",
            fontSize: "12px",
            zIndex: 1000,
            pointerEvents: "none",
          }}
        >
          {tooltip.text}
        </div>
      )}
      <h2 className="text-xl font-bold mb-4" style={{ color: colors.navy }}>
        Experience
      </h2>
      <div className="space-y-4">
        {experiences.map((experience, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row gap-4 p-3 rounded-lg transition-all hover:bg-gray-50 ${
              experience.slug ? "cursor-pointer" : ""
            }`}
            onClick={() => {
              if (experience.slug) {
                window.location.href = `/#/experience/${experience.slug}`;
              }
            }}
            onMouseEnter={(e) => handleMouseEnter(e, experience.slug)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="bg-white p-3 rounded-lg shadow-sm w-16 h-16 flex items-center justify-center flex-shrink-0">
              <img
                src={experience.image}
                alt={experience.title}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 mb-1">
                <div className="flex flex-row justify-between items-center w-full">
                  <h3
                    className="text-base font-semibold"
                    style={{ color: colors.navy }}
                  >
                    {experience.title}
                  </h3>
                  <span
                    className="text-base font-medium"
                    style={{ color: colors.slate }}
                  >
                    {experience.company}
                  </span>
                </div>
              </div>
              <p className="text-sm mb-2" style={{ color: colors.slate }}>
                {experience.description}
              </p>
              <div className="flex flex-wrap">
                {experience.skills.map((skill, skillIndex) => (
                  <SkillTag key={skillIndex} skill={skill} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </BentoBox>
  );
};

export default ExperiencesBox;
