import React, { useState } from "react";
import BentoBox, { colors, ColorName } from "./BentoBox";
import SkillTag from "./SkillTag";
import { ExperienceType } from "../../types";

interface ExperiencesBoxProps {
  experiences: ExperienceType[];
  borderColorName?: ColorName;
}

const ExperiencesBox: React.FC<ExperiencesBoxProps> = ({
  experiences,
  borderColorName,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <BentoBox
      className="md:col-span-2 relative h-full overflow-hidden"
      id="experience"
      borderColorName={borderColorName}
    >
      <h2 className="text-xl font-bold mb-6" style={{ color: colors.navy }}>
        Experience
      </h2>

      {/* Timeline Container */}
      <div className="relative">
        {experiences.map((experience, index) => {
          const isLast = index === experiences.length - 1;
          const isHovered = hoveredIndex === index;
          const isClickable = !!experience.slug;

          return (
            <div key={index} className="relative flex">
              {/* Left side: Date */}
              <div className="w-14 sm:w-20 md:w-28 flex-shrink-0 pr-2 sm:pr-3 md:pr-4 text-right">
                <div
                  className="text-[10px] sm:text-xs md:text-sm font-medium leading-tight pt-1"
                  style={{ color: colors.slate }}
                >
                  {experience.date}
                </div>
              </div>

              {/* Timeline: dot + line */}
              <div className="flex flex-col items-center flex-shrink-0">
                {/* Glowing dot */}
                <div
                  className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full flex-shrink-0 z-10 mt-1.5"
                  style={{
                    backgroundColor: colors.navy,
                    boxShadow: `0 0 8px 2px ${colors.navy}40, 0 0 16px 4px ${colors.navy}20`,
                  }}
                />

                {/* Timeline connecting line */}
                {!isLast && (
                  <div
                    className="w-0.5 flex-grow"
                    style={{ backgroundColor: "#d1d5db" }}
                  />
                )}
              </div>

              {/* Right side: Experience Card */}
              <div
                className={`flex-1 min-w-0 pb-4 sm:pb-6 pl-2 sm:pl-3 md:pl-4 ${
                  isClickable ? "cursor-pointer" : ""
                }`}
                onClick={() => {
                  if (experience.slug) {
                    window.location.href = `/#/experience/${experience.slug}`;
                  }
                }}
                onMouseEnter={() => isClickable && setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div
                  className={`relative p-2 sm:p-3 rounded-lg transition-all ${
                    isClickable ? "hover:bg-gray-50 hover:shadow-sm" : ""
                  }`}
                  style={{ marginTop: "-8px" }}
                >
                  {/* "View" badge - appears on hover for clickable items */}
                  {isClickable && isHovered && (
                    <div
                      className="absolute top-2 right-2 text-xs font-medium px-2 py-1 rounded-md text-white transition-opacity"
                      style={{ backgroundColor: colors.navy }}
                    >
                      View More →
                    </div>
                  )}

                  {/* Icon + Company/Title */}
                  <div className="flex gap-2 sm:gap-3">
                    {/* Square icon */}
                    <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg bg-white shadow-sm flex items-center justify-center flex-shrink-0 p-1 sm:p-1.5">
                      <img
                        src={experience.image}
                        alt={experience.company}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>

                    {/* Company + Title stacked */}
                    <div className="flex flex-col justify-center min-w-0 overflow-hidden">
                      <span
                        className="text-xs sm:text-sm font-semibold truncate"
                        style={{ color: "#94b4c1" }}
                      >
                        {experience.company}
                      </span>
                      <h3
                        className="text-sm sm:text-base font-semibold truncate"
                        style={{ color: colors.navy }}
                      >
                        {experience.title}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p
                    className="text-xs sm:text-sm mt-1.5 sm:mt-2 mb-1.5 sm:mb-2"
                    style={{ color: colors.slate }}
                  >
                    {experience.description}
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1 mt-2 sm:mt-0">
                    {experience.skills.map((skill, skillIndex) => (
                      <SkillTag key={skillIndex} skill={skill} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </BentoBox>
  );
};

export default ExperiencesBox;
