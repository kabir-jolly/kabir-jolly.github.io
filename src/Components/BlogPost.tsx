import { Fragment } from "react";
import { Link, useParams } from "react-router-dom";
import { getPost } from "../data/posts";
import { usePageMeta } from "../hooks/usePageMeta";

const typeLabel: Record<string, string> = {
  writing: "Writing",
  project: "Project",
  experience: "Work",
};
const linkLabel = { x: "X", linkedin: "LinkedIn" } as const;

const BlogPost = () => {
  const { type, slug } = useParams<{ type: string; slug: string }>();
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
      <div className="page">
        <h1 className="page-title">Coming soon!</h1>
        <p>
          <Link to="/posts">← All posts</Link>
        </p>
      </div>
    );
  }

  const ContentComponent = content.component;
  const links = content.links ?? [];

  return (
    <div className="page">
      <header className="post-header">
        <Link to="/posts" className="post-back">
          ← All posts
        </Link>
        <h1>{content.postTitle}</h1>
        {content.subtitle && <p className="post-subtitle">{content.subtitle}</p>}
        <p className="post-meta">
          {content.date} · {typeLabel[type ?? ""] ?? "Post"}
          {links.length > 0 && (
            <>
              {" · also on "}
              {links.map((link, i) => (
                <Fragment key={link.type}>
                  {i > 0 && (i === links.length - 1 ? " and " : ", ")}
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {linkLabel[link.type]}
                  </a>
                </Fragment>
              ))}
            </>
          )}
        </p>
      </header>

      <main className="post-content">
        <ContentComponent />
      </main>

      <footer className="site-footer">
        <Link to="/posts">← All posts</Link>
      </footer>
    </div>
  );
};

export default BlogPost;
