import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { colors } from "../theme";
import {
  experienceContent,
  projectContent,
  writingContent,
} from "./blog-content";

interface PostEntry {
  title: string;
  date: string;
  type: "project" | "experience" | "writing";
  slug: string;
  sortYear: number;
  featured?: boolean;
}

// Helper to extract year from date string for sorting
function extractYear(dateStr: string): number {
  const matches = dateStr.match(/\b(20\d{2})\b/g);
  if (matches && matches.length > 0) {
    return Math.max(...matches.map(Number));
  }
  return 0;
}

const Posts = () => {
  // Build posts from blog-content registry (shared titles)
  const projectPosts: PostEntry[] = Object.entries(projectContent).map(
    ([slug, content]) => ({
      title: content.postTitle,
      date: content.date,
      type: "project" as const,
      slug,
      sortYear: extractYear(content.date),
      featured: content.featured,
    })
  );

  const experiencePosts: PostEntry[] = Object.entries(experienceContent).map(
    ([slug, content]) => ({
      title: content.postTitle,
      date: content.date,
      type: "experience" as const,
      slug,
      sortYear: extractYear(content.date),
      featured: content.featured,
    })
  );

  const writingPosts: PostEntry[] = Object.entries(writingContent).map(
    ([slug, content]) => ({
      title: content.postTitle,
      date: content.date,
      type: "writing" as const,
      slug,
      sortYear: extractYear(content.date),
      featured: content.featured,
    })
  );

  const posts = [...writingPosts, ...projectPosts, ...experiencePosts].sort(
    (a, b) => b.sortYear - a.sortYear
  );

  return (
    <div
      className="min-h-screen font-sans page-enter"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <main className="pt-12 max-w-2xl mx-auto px-4 pb-16">
        <h1
          className="text-3xl font-bold mb-10"
          style={{ color: colors.navy }}
        >
          Posts
        </h1>

        <div className="flex flex-col list-stagger">
          {posts.map((post, index) => {
            const href = `/${post.type}/${post.slug}`;

            const content = (
              <div
                className="group flex items-center justify-between py-4 border-b transition-colors hover:bg-white/50 -mx-4 px-4"
                style={{ borderColor: colors.lavender }}
              >
                <div className="flex flex-col gap-1">
                  <span className="flex items-center gap-1.5">
                    <span
                      className="text-base font-medium group-hover:underline"
                      style={{ color: colors.navy }}
                    >
                      {post.title}
                    </span>
                    {post.featured && (
                      <Star
                        size={14}
                        strokeWidth={1.8}
                        fill={colors.periwinkle}
                        style={{ color: colors.periwinkle }}
                        aria-label="Featured post"
                      />
                    )}
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="text-xs" style={{ color: colors.slate }}>
                      {post.date}
                    </span>
                    <span className="post-type-tag">{post.type}</span>
                  </span>
                </div>
              </div>
            );

            return (
              <Link key={index} to={href} className="no-underline">
                {content}
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Posts;
