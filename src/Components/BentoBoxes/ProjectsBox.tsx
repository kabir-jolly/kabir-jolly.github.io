import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BentoBox, { colors, ColorName } from "./BentoBox";
import SkillTag from "./SkillTag";
import { ProjectType } from "../../types";

interface ProjectsBoxProps {
  projects: ProjectType[];
  borderColorName?: ColorName;
}

interface TooltipState {
  visible: boolean;
  x: number;
  y: number;
  text: string;
}

const ProjectsBox: React.FC<ProjectsBoxProps> = ({
  projects,
  borderColorName,
}) => {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false,
    x: 0,
    y: 0,
    text: "Click for More!",
  });

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

  const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    if (projects[currentProjectIndex]?.slug) {
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
      className="md:col-span-1 relative h-[300px]"
      id="projects"
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
      <h2 className="text-xl font-bold mb-2" style={{ color: colors.navy }}>
        Projects
      </h2>

      {/* Current Project Display */}
      <div
        className="cursor-pointer h-[180px] flex flex-col"
        onClick={() => {
          if (projects[currentProjectIndex].slug) {
            window.location.href = `/#/project/${projects[currentProjectIndex].slug}`;
          }
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Top Row: Logo and Title/Date Column */}
        <div className="flex flex-row gap-3 items-start mb-2">
          {" "}
          {/* Use items-start, add margin bottom */}
          {/* Logo */}
          <div className="bg-white p-2 rounded-lg shadow-sm w-16 h-16 flex items-center justify-center flex-shrink-0">
            {" "}
            {/* Adjusted size again */}
            <img
              src={projects[currentProjectIndex].image}
              alt={projects[currentProjectIndex].title}
              className="max-w-full max-h-full object-contain"
            />
          </div>
          {/* Title and Date Column */}
          <div className="flex-1 min-w-0 pt-1">
            <h3
              className="text-base font-semibold break-words"
              style={{ color: colors.navy }}
            >
              {projects[currentProjectIndex].title}
            </h3>
            <p className="text-xs" style={{ color: colors.slate }}>
              {projects[currentProjectIndex].date}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-gray-600 mb-2 flex-grow">
          {projects[currentProjectIndex].description}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-1">
          {projects[currentProjectIndex].skills.map((skill, index_skill) => (
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
