import ListRow from "./ListRow";
import { postEntries } from "../data/posts";
import { yearLabel } from "../data/format";
import { usePageMeta } from "../hooks/usePageMeta";

const typeLabel = { writing: "Writing", project: "Project", experience: "Work" } as const;

const Posts = () => {
  usePageMeta({ title: "Posts" });

  return (
    <div className="page">
      <h1 className="page-title">Posts</h1>
      <ul className="list-section">
        {postEntries.map((post) => (
          <ListRow
            key={`${post.type}-${post.slug}`}
            date={yearLabel(post.date)}
            title={post.title}
            href={`/${post.type}/${post.slug}`}
            label={typeLabel[post.type]}
          />
        ))}
      </ul>
    </div>
  );
};

export default Posts;
