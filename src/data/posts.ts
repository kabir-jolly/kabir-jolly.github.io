import {
  experienceContent,
  projectContent,
  writingContent,
} from "../Components/blog-content";
import type { ContentRegistryType } from "../types";

export type PostType = "project" | "experience" | "writing";

export interface PostEntry {
  title: string;
  date: string;
  type: PostType;
  slug: string;
  sortYear: number;
  featured?: boolean;
}

const postRegistries: Record<PostType, ContentRegistryType> = {
  writing: writingContent,
  project: projectContent,
  experience: experienceContent,
};

function extractYear(dateStr: string): number {
  const matches = dateStr.match(/\b(20\d{2})\b/g);
  if (matches && matches.length > 0) {
    return Math.max(...matches.map(Number));
  }
  return 0;
}

export function getPost(
  type: string | undefined,
  slug: string | undefined
): ContentRegistryType[string] | undefined {
  if (!type || !slug || !(type in postRegistries)) {
    return undefined;
  }

  return postRegistries[type as PostType][slug];
}

export const postEntries: PostEntry[] = Object.entries(postRegistries)
  .flatMap(([type, registry]) =>
    Object.entries(registry).map(([slug, content]) => ({
      title: content.postTitle,
      date: content.date,
      type: type as PostType,
      slug,
      sortYear: extractYear(content.date),
      featured: content.featured,
    }))
  )
  .sort((a, b) => b.sortYear - a.sortYear);
