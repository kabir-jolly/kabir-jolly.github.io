import Zeal from "./experience/Zeal";
import Valar from "./experience/Valar";
import ModifyingMinBERT from "./projects/ModifyingMinBERT";
import StanfordMedicalCenter from "./projects/StanfordMedicalCenter";
import DepthAwarePixel2Mesh from "./projects/DepthAwarePixel2Mesh";
import ScrAPPS from "./projects/ScrAPPS";
import Wehab from "./projects/Wehab";
import { ContentRegistryType } from "../types";

export const experienceContent: ContentRegistryType = {
  zeal: {
    component: Zeal,
    postTitle: "Brief recap of a summer spent connecting people at Zeal AI",
    date: "Summer 2023",
  },
  valar: {
    component: Valar,
    postTitle: "Engineering tools to help decision-making for oncologists at Valar Labs",
    date: "Summer 2022",
  },
};

export const projectContent: ContentRegistryType = {
  "224n": {
    component: ModifyingMinBERT,
    postTitle: "Improving MinBERT with Gradient Surgery, Cosine Similarity, and Multi-task Finetuning",
    date: "2023",
  },
  "stanford-medical-center": {
    component: StanfordMedicalCenter,
    postTitle: "Predicting Chronic Disease Exacerbation During Wildfires",
    date: "2020–2023",
  },
  "231n": {
    component: DepthAwarePixel2Mesh,
    postTitle: "Improving Pixel2Mesh by Adding Depth Dimensionality",
    date: "2022",
  },
  wehab: {
    component: Wehab,
    postTitle: "Nasal Cycle Detection",
    date: "Summer 2021",
  },
  scrapps: {
    component: ScrAPPS,
    postTitle: "Give me your food waste! The story behind my high school venture, ScrAPPS",
    date: "2017–2019",
  },
};
