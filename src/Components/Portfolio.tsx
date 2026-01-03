import {
  ProfileBox,
  TimeBox,
  ProjectsBox,
  ExperiencesBox,
  RecommendationsBox,
  colors,
} from "./BentoBoxes";
import { experiences, projects } from "../data/content";

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-[#faf9f6] font-sans">
      {/* Main Content */}
      <main className="pt-8 max-w-6xl mx-auto px-4 pb-12">
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Row 1 */}
          <div className="md:col-span-2 h-full">
            <ProfileBox borderColorName="periwinkle" />
          </div>
          <div className="md:col-span-1 h-full">
            <TimeBox borderColorName="lightBlue" />
          </div>

          {/* Row 2 - ExperiencesBox appears first on mobile, but right side on desktop */}
          <div className="md:col-span-2 md:order-2">
            <ExperiencesBox
              experiences={experiences}
              borderColorName="lavender"
            />
          </div>
          <div className="md:col-span-1 flex flex-col gap-4 md:order-1">
            <ProjectsBox projects={projects} borderColorName="lightBlue" />
            <RecommendationsBox borderColorName="lightBlue" />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="bg-[#faf9f6] py-6 border-t"
        style={{ borderColor: colors.lightPurple }}
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-xs" style={{ color: colors.slate }}>
            © {new Date().getFullYear()} Kabir Jolly
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
