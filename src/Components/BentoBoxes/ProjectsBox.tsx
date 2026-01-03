import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BentoBox, { colors, ColorName } from "./BentoBox";
import SkillTag from "./SkillTag";
import { ProjectType } from "../../types";

interface ProjectsBoxProps {
  projects: ProjectType[];
  borderColorName?: ColorName;
}

const ProjectsBox: React.FC<ProjectsBoxProps> = ({
  projects,
  borderColorName,
}) => {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const AUTO_CYCLE_DELAY = 5000;

  const goToNextProject = () => {
    setCurrentProjectIndex((prev) => (prev + 1) % projects.length);
  };

  const goToPrevProject = () => {
    setCurrentProjectIndex(
      (prev) => (prev - 1 + projects.length) % projects.length
    );
  };

  const selectProject = (index: number) => {
    setCurrentProjectIndex(index);
  };

  const resetAutoCycle = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = window.setInterval(goToNextProject, AUTO_CYCLE_DELAY);
  };

  useEffect(() => {
    resetAutoCycle();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [projects]);

  useEffect(() => {
    resetAutoCycle();
  }, [currentProjectIndex]);

  const currentProject = projects[currentProjectIndex];
  const isClickable = !!(currentProject?.slug || currentProject?.externalUrl);

  return (
    <BentoBox
      className="md:col-span-1 relative h-[360px]"
      id="projects"
      borderColorName={borderColorName}
    >
      {/* Header row with "View More" badge */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold" style={{ color: colors.navy }}>
          Projects
        </h2>
        {/* "View More" badge - appears on hover for clickable items */}
        {isClickable && isHovered && (
          <div
            className="text-xs font-medium px-2 py-1 rounded-md text-white"
            style={{ backgroundColor: colors.navy }}
          >
            View More →
          </div>
        )}
      </div>

      {/* Current Project Display */}
      <div
        className={`h-[240px] flex flex-col ${
          isClickable ? "cursor-pointer" : ""
        }`}
        onClick={() => {
          if (currentProject.externalUrl) {
            window.open(
              currentProject.externalUrl,
              "_blank",
              "noopener,noreferrer"
            );
          } else if (currentProject.slug) {
            window.location.href = `/#/project/${currentProject.slug}`;
          }
        }}
        onMouseEnter={() => isClickable && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Top Row: Logo and Title/Date Column */}
        <div className="flex flex-row gap-3 items-start mb-2">
          {/* Logo */}
          <div className="bg-white p-2 rounded-lg shadow-sm w-16 h-16 flex items-center justify-center flex-shrink-0">
            <img
              src={currentProject.image}
              alt={currentProject.title}
              className="max-w-full max-h-full object-contain"
            />
          </div>
          {/* Title and Date Column */}
          <div className="flex-1 min-w-0 pt-1">
            <h3
              className="text-base font-semibold break-words"
              style={{ color: colors.navy }}
            >
              {currentProject.title}
            </h3>
            <p className="text-xs" style={{ color: colors.slate }}>
              {currentProject.date}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-gray-600 mb-2 flex-grow">
          {currentProject.description}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-1">
          {currentProject.skills.map((skill, index_skill) => (
            <SkillTag key={index_skill} skill={skill} />
          ))}
        </div>
      </div>

      {/* Navigation: Arrows and Dots */}
      <div className="flex justify-center items-center mt-3 gap-3 pb-4">
        <button
          onClick={() => {
            goToPrevProject();
          }}
          className="text-sm flex items-center justify-center transition-all p-0.5"
        >
          <ChevronLeft size={18} style={{ color: colors.navy }} />
        </button>

        <div className="flex items-center gap-1">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                selectProject(index);
              }}
              className={`rounded-full border-2 transition-all p-0 ${
                index === currentProjectIndex ? "w-2 h-2" : "w-2 h-2"
              }`}
              style={{
                backgroundColor:
                  index === currentProjectIndex ? colors.navy : "transparent",
                borderColor:
                  index === currentProjectIndex
                    ? colors.navy
                    : colors.periwinkle,
              }}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => {
            goToNextProject();
          }}
          className="text-sm flex items-center justify-center transition-all p-0.5"
        >
          <ChevronRight size={18} style={{ color: colors.navy }} />
        </button>
      </div>
    </BentoBox>
  );
};

export default ProjectsBox;
