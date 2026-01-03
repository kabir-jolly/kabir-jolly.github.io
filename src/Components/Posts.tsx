import { Link } from "react-router-dom";
import { colors } from "./BentoBoxes/BentoBox";
import { experienceContent, projectContent } from "./blog-content";

interface PostEntry {
  title: string;
  date: string;
  type: "project" | "experience";
  slug: string;
  sortYear: number;
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
    })
  );

  const experiencePosts: PostEntry[] = Object.entries(experienceContent).map(
    ([slug, content]) => ({
      title: content.postTitle,
      date: content.date,
      type: "experience" as const,
      slug,
      sortYear: extractYear(content.date),
    })
  );

  const posts = [...projectPosts, ...experiencePosts].sort(
    (a, b) => b.sortYear - a.sortYear
  );

  return (
    <div className="min-h-screen bg-[#faf9f6] font-sans">
      <main className="pt-12 max-w-2xl mx-auto px-4 pb-16">
        <h1
          className="text-3xl font-bold mb-10"
          style={{ color: colors.navy }}
        >
          Posts
        </h1>

        <div className="flex flex-col">
          {posts.map((post, index) => {
            const href = `/${post.type}/${post.slug}`;

            const content = (
              <div
                className="group flex items-center justify-between py-4 border-b transition-colors hover:bg-white/50 -mx-4 px-4"
                style={{ borderColor: colors.lavender }}
              >
                <div className="flex flex-col gap-1">
                  <span
                    className="text-base font-medium group-hover:underline"
                    style={{ color: colors.navy }}
                  >
                    {post.title}
                  </span>
                  <span className="text-xs" style={{ color: colors.slate }}>
                    {post.date}
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

export default Posts;

