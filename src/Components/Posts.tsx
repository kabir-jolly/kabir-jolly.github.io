import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { colors } from "../theme";
import { postEntries } from "../data/posts";

const Posts = () => {
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
          {postEntries.map((post, index) => {
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
              <Link key={`${post.type}-${post.slug}`} to={href} className="no-underline">
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
