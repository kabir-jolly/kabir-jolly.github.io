import { ExperienceType, ProjectType } from "../types";

export const experiences: ExperienceType[] = [
  {
    title: "Forward Deployed Engineer",
    subtitle: "Palantir",
    date: "8/2025 – Now",
    description: "Building at Palantir for hospitals.",
    image: "/assets/img/palantir/palantir.jpg",
    skills: ["Typescript", "Pyspark", "Foundry"],
    company: "Palantir",
  },
  {
    title: "Software Engineering Fellow",
    subtitle: "Pear VC",
    date: "11/2024 – 6/2025",
    description:
      "Building internal tools to help our investment team and portfolio companies.",
    image: "/assets/img/pear/pear_logo.png",
    skills: ["React", "TypeScript", "Airtable", "Retool"],
    company: "Pear VC",
  },
  {
    title: "Software Engineering Intern",
    subtitle: "Fieldguide (backed by YC, Bessemer, 8VC)",
    date: "6/2024 – 9/2024",
    description:
      "Built full-stack tooling for Fieldguide's newest platform offering - financial audits.",
    image: "/assets/img/fieldguide/fieldguide.png",
    skills: ["GraphQL", "TypeScript", "React", "PostgreSQL"],
    company: "Fieldguide",
  },
  {
    title: "Head of Product and Engineering",
    subtitle: "Dorm Room Fund",
    date: "8/2023 – 8/2024",
    description:
      "Led all development and product efforts for DRF's investment team and portfolio.",
    image: "/assets/img/dormroomfund/drf.png",
    skills: ["TypeScript", "React", "Airtable", "Product Management"],
    company: "Dorm Room Fund",
  },
  {
    title: "Full-Stack Engineering Intern",
    subtitle: "Zeal AI (Stealth)",
    date: "6/2023 – 8/2023",
    description:
      "Built invitations and chatbot for a activity-based relationship building social app",
    image: "/assets/img/zeal/zeal.jpg",
    skills: ["TypeScript", "HTML/CSS/JS", "ReactNative", "Chatbot Development"],
    slug: "zeal",
    company: "Zeal AI",
  },
  {
    title: "Machine Learning Engineering Intern",
    subtitle: "Valar Labs (backed by a16z, Pear)",
    date: "6/2022 – 8/2022",
    description:
      "Built tumor segmentation, classification, and data ingestion pipelines for oncologists",
    image: "/assets/img/valar/valarlabs.jpeg",
    skills: ["PyTorch", "Tensorflow", "Labelbox"],
    slug: "valar",
    company: "Valar Labs",
  },
];

export const projects: ProjectType[] = [
  {
    title: "Creative Writing Verification",
    date: "Autonomous Agents Lab • 2025",
    description:
      "Building a dataset and benchmark for evaluating creative writing models. Training reward models and LLM judges to generative and evaluate better creative writing tasks.",
    image: "/assets/img/creative-writing/pencil.png",
    skills: ["RL", "Dataset Creation", "LLM-as-Judge"],
    externalUrl: "https://litbench.vercel.app/",
  },
  {
    title: "Receipts",
    date: "2024",
    description:
      "Mac app that generates statistical and AI-driven insights on your iMessage data. 100+ users.",
    image: "/assets/img/receipts/receipts.png",
    skills: ["Electron React", "TypeScript", "AWS", "LLM APIs", "MySQL"],
    externalUrl: "https://www.getreceipts.app/",
  },
  {
    title: "Private Equity Compensation Dashboard",
    date: "2024",
    description:
      "Built analytics tooling for a consulting firm to manage portfolio compensation information management for over 100 top PE firms.",
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
    date: "Stanford Wehab Lab • Summer 2021",
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
