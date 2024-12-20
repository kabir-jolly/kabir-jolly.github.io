import SeniorDeveloper from "./experience/SeniorDeveloper";
import SoftwareEngineer from "./experience/SoftwareEngineer";
import EcommercePlatform from "./projects/EcommercePlatform";
import AIImageGenerator from "./projects/AIImageGenerator";
import { ContentRegistryType } from "../types";

export const experienceContent: ContentRegistryType = {
  "senior-developer-company": {
    component: SeniorDeveloper,
  },
  "software-engineer-techcorp": {
    component: SoftwareEngineer,
  },
};

export const projectContent: ContentRegistryType = {
  "ecommerce-platform": {
    component: EcommercePlatform,
  },
  "ai-image-generator": {
    component: AIImageGenerator,
  },
};
