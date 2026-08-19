import { useParams } from "react-router-dom";
import { ChevronLeft, Linkedin } from "lucide-react";
import { getPost } from "../data/posts";
import { usePageMeta } from "../hooks/usePageMeta";
import PillButton from "./PillButton";
import XLogo from "./XLogo";

const BlogPost = () => {
  const { type, slug } = useParams<{
    type: "experience" | "project" | "writing";
    slug: string;
  }>();
  const content = getPost(type, slug);

  // Called before the early return below to keep hook order stable.
  usePageMeta({
    title: content?.postTitle,
    description: content?.subtitle,
    image: content?.ogImage,
    type: "article",
  });

  if (!content) {
    return (
      <div
        className="min-h-screen page-enter"
        style={{ backgroundColor: "var(--color-bg)" }}
      >
        <div className="post-shell">
          <PillButton
            to="/posts"
            className="post-back"
            leadingIcon={<ChevronLeft size={14} />}
          >
            Posts
          </PillButton>
          <header className="post-header">
            <h1>Coming soon!</h1>
            <div className="post-header-rule" />
          </header>
        </div>
      </div>
    );
  }

  const ContentComponent = content.component;
  const postType = type ?? "project";

  return (
    <div
      className="min-h-screen page-enter"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <div className="post-shell">
        <PillButton
          to="/posts"
          className="post-back"
          leadingIcon={<ChevronLeft size={14} />}
        >
          Posts
        </PillButton>

        <header className="post-header">
          <h1>{content.postTitle}</h1>
          {content.subtitle && <p className="post-subtitle">{content.subtitle}</p>}
          <div className="post-meta">
            <p className="post-date">{content.date}</p>
            <span className="post-type-tag">{postType}</span>
          </div>
          <div className="post-header-rule" />
        </header>

        <main className="post-content">
          <ContentComponent />
        </main>

        {content.links && content.links.length > 0 && (
          <footer className="post-external-footer">
            <span className="post-external-label">
              You can also view this post on other platforms:
            </span>
            <div className="post-external-links">
              {content.links.map((link) => (
                <a
                  key={link.type}
                  href={link.url}
                  className="post-external-link"
                  aria-label={
                    link.type === "x" ? "View post on X" : "View post on LinkedIn"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.type === "x" ? <XLogo size={14} /> : <Linkedin size={15} />}
                </a>
              ))}
            </div>
          </footer>
        )}
      </div>
    </div>
  );
};

export default BlogPost;
