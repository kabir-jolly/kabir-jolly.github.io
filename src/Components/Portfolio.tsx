import { ExperienceType, ProjectType } from "../types";

import {
  ProfileBox,
  TimeBox,
  ProjectsBox,
  ExperiencesBox,
  RecommendationsBox,
  colors,
} from "./BentoBoxes";

const Portfolio = () => {
  const experiences: ExperienceType[] = [
    {
      title: "Software Engineering Fellow",
      subtitle: "Pear VC",
      date: "11/24 - Present",
      description:
        "Building internal tools to help our investment team and portfolio companies.",
      image: "/assets/img/pear/pear_logo.png",
      skills: ["React", "TypeScript", "Airtable", "Retool"],
      company: "Pear VC",
    },
    {
      title: "Software Engineering Intern",
      subtitle: "Fieldguide (backed by YC, Bessemer, 8VC)",
      date: "2024",
      description:
        "Built full-stack tooling for Fieldguide's newest platform offering - financial audits.",
      image: "/assets/img/fieldguide/fieldguide.png",
      skills: ["GraphQL", "TypeScript", "React", "PostgreSQL"],
      company: "Fieldguide",
    },
    {
      title: "Head of Product and Engineering",
      subtitle: "Dorm Room Fund",
      date: "2023-2024",
      description:
        "Led all development and product efforts for DRF's investment team and portfolio.",
      image: "/assets/img/dormroomfund/drf.png",
      skills: ["TypeScript", "React", "Airtable", "Product Management"],
      company: "Dorm Room Fund",
    },
    {
      title: "Full-Stack Engineering Intern",
      subtitle: "Zeal AI (Stealth)",
      date: "2023",
      description:
        "Built invitations and chatbot for a activity-based relationship building social app",
      image: "/assets/img/zeal/zeal.jpg",
      skills: [
        "TypeScript",
        "HTML/CSS/JS",
        "ReactNative",
        "Chatbot Development",
      ],
      slug: "zeal",
      company: "Zeal AI",
    },
    {
      title: "Machine Learning Engineering Intern",
      subtitle: "Valar Labs (backed by a16z, Pear)",
      date: "2022",
      description:
        "Built tumor segmentation, classification, and data ingestion pipelines for oncologists",
      image: "/assets/img/valar/valarlabs.jpeg",
      skills: ["PyTorch", "Tensorflow", "Labelbox"],
      slug: "valar",
      company: "Valar Labs",
    },
  ];

  const projects: ProjectType[] = [
    {
      title: "Creative Writing Verification",
      date: "Autonomous Agents Lab • 2025",
      description:
        "Building a dataset and benchmark for evaluating creative writing models. Training reward models and LLM judges to generative and evaluate better creative writing tasks.",
      image: "/assets/img/creative-writing/pencil.png",
      skills: ["RL", "Dataset Creation", "LLM-as-Judge"],
      slug: "creative-writing-verification",
    },
    {
      title: "Receipts",
      date: "2024",
      description:
        "Mac app that generates statistical and AI-driven insights on your iMessage data. 100+ users.",
      image: "/assets/img/receipts/receipts.png",
      skills: ["Electron React", "TypeScript", "AWS", "LLM APIs", "MySQL"],
      slug: "receipts",
    },
    {
      title: "Private Equity Compensation Dashboard",
      date: "2024",
      description:
        "Built analyticstooling for a consulting firm to manage portfolio compensation information management for over 100 top PE firms.",
      image: "/assets/img/peecs/insightory.jpeg",
      skills: ["React", "FastAPI", "GCP"],
      slug: "peecs",
    },
    {
      title: "Modifying MinBERT",
      date: "Stanford CS 224N • 2023",
      description:
        "Researching ways to improve multi-task performance of MinBERT. Found success with gradient surgery and cosine similarity.",
      image: "/assets/img/224n/224n.jpeg",
      skills: ["PyTorch", "NLP", "Tranformers"],
      slug: "224n",
    },
    {
      title: "Predicting Chronic Disease Exacerbation During Wildfires",
      date: "Stanford Medical Center • 2020-2023",
      description:
        "Built interpretable AI models to aid clinicians in targeting preventative interventions for patients during wildfire season.",
      image: "/assets/img/aqi/stanford_med.png",
      skills: ["PyTorch", "Attention Networks", "AWS"],
      slug: "stanford-medical-center",
    },
    {
      title: "Depth Aware Pixel2Mesh",
      date: "Stanford CS 231N • 2022",
      description:
        "Improving object mesh reconstruction using depth-aware inputs.",
      image: "/assets/img/231n/231n.jpeg",
      skills: ["PyTorch", "Computer Vision", "Segmentation Models"],
      slug: "231n",
    },
    {
      title: "Nasal Cycle Detection",
      date: "Stanford Wehab Lab • 2020-2023",
      description:
        "Built and programmed a digital health embedded system for palatal artery blood flow analysis.",
      image: "/assets/img/wehab/wehab.png",
      skills: ["Arduino", "Signal Analysis", "Embedded Systems"],
      slug: "wehab",
    },
    {
      title: "ScrAPPS",
      date: "2017-2019",
      description:
        "Built an app to connect grocery stores and restaurants with composting facilities. Hauled a bunch of pineapple peels and spoiled lettuce with my friend Michael.",
      image: "/assets/img/scrapps/scrapps.png",
      skills: ["Waste Management!", "Swift", "Firebase"],
      slug: "scrapps",
    },
  ];

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

          {/* Row 2 */}
          <div className="md:col-span-1 flex flex-col gap-4">
            <ProjectsBox projects={projects} borderColorName="lightBlue" />
            <RecommendationsBox borderColorName="lightBlue" />
          </div>
          <div className="md:col-span-2">
            <ExperiencesBox
              experiences={experiences}
              borderColorName="lavender"
            />
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
