import {
  ProfileBox,
  TimeBox,
  ProjectsBox,
  ExperiencesBox,
  RecommendationsBox,
} from "./BentoBoxes";
import { experiences, projects } from "../data/content";

const Portfolio = () => {
  return (
    <div
      className="home-page min-h-screen font-sans page-enter"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <main className="pt-8 max-w-6xl mx-auto px-4 pb-12">
        <div className="flex flex-col gap-4">
          <ProfileBox borderColorName="periwinkle" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
            <TimeBox borderColorName="lightBlue" />
            <ProjectsBox projects={projects} borderColorName="lightBlue" />
            <RecommendationsBox borderColorName="lightBlue" />
          </div>
          <ExperiencesBox
            experiences={experiences}
            borderColorName="lavender"
          />
        </div>
      </main>
    </div>
  );
};

export default Portfolio;
