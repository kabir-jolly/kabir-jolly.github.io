import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, Linkedin } from "lucide-react";
import {
  experienceContent,
  projectContent,
  writingContent,
} from "./blog-content";
import { ContentRegistryType } from "../types";
import { usePageMeta } from "../hooks/usePageMeta";
import PillButton from "./PillButton";
import XLogo from "./XLogo";

const BlogPost = () => {
  const { type, slug } = useParams<{
    type: "experience" | "project" | "writing";
    slug: string;
  }>();
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to top when blog post component mounts
    window.scrollTo(0, 0);
  }, []);

  const handleBack = () => {
    // Use browser history to go back to where you came from
    navigate(-1);
  };

  // Get the appropriate content based on type and slug
  const content: ContentRegistryType[string] | undefined =
    type && slug
      ? type === "experience"
        ? experienceContent[slug]
        : type === "writing"
        ? writingContent[slug]
        : projectContent[slug]
      : undefined;

  // Called before the early return below to keep hook order stable.
  usePageMeta({
    title: content?.postTitle,
    description: content?.subtitle,
    image: content?.ogImage,
    type: "article",
  });

  if (!content) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 page-enter">
        <h1 className="text-3xl font-bold">Coming soon!</h1>
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
          onClick={handleBack}
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
