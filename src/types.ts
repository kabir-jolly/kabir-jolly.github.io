export interface SkillTagProps {
  skill: string;
}

export interface CardProps {
  type: "experience" | "project";
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  skills: string[];
  slug?: string;
}

export interface ExperienceType {
  title: string;
  subtitle: string;
  date: string;
  description: string;
  image: string;
  skills: string[];
  slug?: string;
}

export interface ProjectType {
  title: string;
  date: string;
  description: string;
  image: string;
  skills: string[];
  slug: string;
}

export type ContentRegistryType = {
  [key: string]: {
    component: React.ComponentType;
  };
};
