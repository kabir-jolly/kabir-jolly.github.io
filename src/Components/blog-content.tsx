import Zeal from "./experience/Zeal";
import Valar from "./experience/Valar";
import Receipts from "./projects/Receipts";
import ModifyingMinBERT from "./projects/ModifyingMinBERT";
import StanfordMedicalCenter from "./projects/StanfordMedicalCenter";
import DepthAwarePixel2Mesh from "./projects/DepthAwarePixel2Mesh";
import ScrAPPS from "./projects/ScrAPPS";
import Wehab from "./projects/Wehab";
import { ContentRegistryType } from "../types";

export const experienceContent: ContentRegistryType = {
  zeal: {
    component: Zeal,
  },
  valar: {
    component: Valar,
  },
};

export const projectContent: ContentRegistryType = {
  receipts: {
    component: Receipts,
  },
  "224n": {
    component: ModifyingMinBERT,
  },
  "stanford-medical-center": {
    component: StanfordMedicalCenter,
  },
  "231n": {
    component: DepthAwarePixel2Mesh,
  },
  wehab: {
    component: Wehab,
  },
  scrapps: {
    component: ScrAPPS,
  },
};
