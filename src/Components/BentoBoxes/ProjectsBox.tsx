import React, { useState, useEffect, useRef } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import BentoBox from "./BentoBox";
import SkillTag from "./SkillTag";
import { ProjectType } from "../../types";
import { colors } from "../../theme";
import type { ColorName } from "../../theme";

interface ProjectsBoxProps {
  projects: ProjectType[];
  borderColorName?: ColorName;
}

const AUTO_CYCLE_DELAY = 5000;
const TRANSITION_MS = 220;

const ProjectsBox: React.FC<ProjectsBoxProps> = ({
  projects,
  borderColorName,
}) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [phase, setPhase] = useState<"idle" | "exit">("idle");
  const [isHovered, setIsHovered] = useState(false);
  const [autoplayNonce, setAutoplayNonce] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const indexRef = useRef(0);
  const phaseRef = useRef<"idle" | "exit">("idle");

  const goTo = (
    next: number,
    dir: "left" | "right",
    resetAutoplay = false
  ) => {
    if (next === indexRef.current || phaseRef.current !== "idle") return;
    if (resetAutoplay) setAutoplayNonce((nonce) => nonce + 1);
    setDirection(dir);
    phaseRef.current = "exit";
    setPhase("exit");
    window.setTimeout(() => {
      indexRef.current = next;
      setIndex(next);
      phaseRef.current = "idle";
      setPhase("idle");
    }, TRANSITION_MS);
  };

  const goNext = () => goTo((indexRef.current + 1) % projects.length, "right");
  const goPrev = () =>
    goTo(
      (indexRef.current - 1 + projects.length) % projects.length,
      "left",
      true
    );
  const goNextManually = () =>
    goTo((indexRef.current + 1) % projects.length, "right", true);
  const selectProject = (i: number) =>
    goTo(i, i > indexRef.current ? "right" : "left", true);

  useEffect(() => {
    if (isHovered) return;
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(goNext, AUTO_CYCLE_DELAY);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHovered, projects.length, autoplayNonce]);

  const project = projects[index];
  const isExternal = !!project?.externalUrl;
  const isClickable = !!(project?.slug || project?.externalUrl);

  const handleClick = () => {
    if (!project) return;
    if (project.externalUrl) {
      window.open(project.externalUrl, "_blank", "noopener,noreferrer");
    } else if (project.slug) {
      window.location.href = `/#/project/${project.slug}`;
    }
  };

  // exit: old card slides toward the opposite side of travel; the new card
  // then enters from the side of travel via a CSS animation (keyed remount)
  const slideTransform =
    phase === "exit"
      ? direction === "right"
        ? "translateX(-8px)"
        : "translateX(8px)"
      : "translateX(0)";

  return (
    <BentoBox
      className="relative h-full flex flex-col"
      id="projects"
      borderColorName={borderColorName}
    >
      <div className="flex justify-between items-baseline mb-3">
        <h2 className="text-xl font-bold" style={{ color: colors.navy }}>
          Projects
        </h2>
        <span className="text-xs tabular-nums" style={{ color: colors.slate }}>
          {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
        </span>
      </div>

      <div
        key={index}
        className={`flex-1 flex flex-col justify-center group min-h-0 ${
          isClickable ? "cursor-pointer" : ""
        }`}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          opacity: phase === "idle" ? 1 : 0,
          transform: slideTransform,
          transition: `opacity ${TRANSITION_MS}ms ease, transform ${TRANSITION_MS}ms ease`,
          animation:
            phase === "idle"
              ? `carousel-enter-from-${direction} ${TRANSITION_MS}ms ease`
              : undefined,
        }}
      >
        <div className="flex flex-col items-center text-center gap-2 mb-3">
          <div
            className="bg-white p-2.5 rounded-xl shadow-sm w-20 h-20 flex items-center justify-center flex-shrink-0 border"
            style={{ borderColor: colors.lavender }}
          >
            <img
              src={project.image}
              alt={project.title}
              className="max-w-full max-h-full object-contain"
            />
          </div>
          <div className="flex flex-col items-center gap-0.5">
            <div className="flex items-center gap-1.5">
              <h3
                className="text-base font-semibold leading-tight"
                style={{ color: colors.navy }}
              >
                {project.title}
              </h3>
              {isClickable && (
                <span
                  className="inline-flex items-center transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  style={{ color: colors.periwinkle }}
                  aria-hidden
                >
                  {isExternal ? (
                    <ArrowUpRight size={14} />
                  ) : (
                    <ArrowRight size={14} />
                  )}
                </span>
              )}
            </div>
            <p className="text-xs" style={{ color: colors.slate }}>
              {project.date}
            </p>
          </div>
        </div>

        <p
          className="text-xs sm:text-sm text-center mb-3 line-clamp-3"
          style={{ color: colors.slate }}
        >
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1 justify-center">
          {project.skills.map((skill, i) => (
            <SkillTag key={i} skill={skill} />
          ))}
        </div>
      </div>

      {/* Navigation: arrows + dot indicators */}
      <div className="flex items-center justify-center gap-3 mt-3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            goPrev();
          }}
          className="carousel-nav-btn"
          aria-label="Previous project"
          style={{
            padding: 4,
            margin: 0,
            border: "none",
            background: "transparent",
            color: colors.navy,
            opacity: 0.55,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "opacity 150ms ease",
          }}
        >
          <ChevronLeft size={16} />
        </button>

        <div className="flex items-center gap-1.5">
          {projects.map((_, i) => {
            const isActive = i === index;
            return (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  selectProject(i);
                }}
                aria-label={`Go to project ${i + 1}`}
                aria-current={isActive ? "true" : undefined}
                style={{
                  width: isActive ? 18 : 6,
                  height: 6,
                  padding: 0,
                  margin: 0,
                  border: "none",
                  borderRadius: 9999,
                  backgroundColor: isActive ? colors.navy : colors.lavender,
                  cursor: "pointer",
                  transition: "width 200ms ease, background-color 200ms ease",
                  display: "inline-block",
                  flexShrink: 0,
                }}
              />
            );
          })}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            goNextManually();
          }}
          className="carousel-nav-btn"
          aria-label="Next project"
          style={{
            padding: 4,
            margin: 0,
            border: "none",
            background: "transparent",
            color: colors.navy,
            opacity: 0.55,
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "opacity 150ms ease",
          }}
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </BentoBox>
  );
};

export default ProjectsBox;
