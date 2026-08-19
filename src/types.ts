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
  skills?: string[];
  slug?: string;
  company: string;
}

export interface ProjectType {
  title: string;
  date: string;
  description: string;
  image: string;
  skills: string[];
  slug?: string;
  externalUrl?: string;
}

export interface ContentExternalLink {
  type: "x" | "linkedin";
  url: string;
}

export type ContentRegistryType = {
  [key: string]: {
    component: React.ComponentType;
    postTitle: string;
    subtitle?: string;
    date: string;
    featured?: boolean;
    links?: ContentExternalLink[];
    /** Site-relative path to the image used for link previews. */
    ogImage?: string;
  };
};
