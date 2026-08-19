import type { ReactNode } from "react";

interface PostImage {
  src: string;
  alt: string;
}

interface PostImageGridProps {
  images: PostImage[];
  columns?: 2 | 3;
  caption?: ReactNode;
  stacked?: boolean;
}

const PostImageGrid = ({
  images,
  columns = 2,
  caption,
  stacked = false,
}: PostImageGridProps) => (
  <figure
    className={`post-image-grid ${
      stacked ? "post-image-grid-stacked" : `post-image-grid-${columns}`
    }`}
  >
    <div className="post-image-grid-images">
      {images.map((image) => (
        <img key={image.src} src={image.src} alt={image.alt} />
      ))}
    </div>
    {caption && <figcaption>{caption}</figcaption>}
  </figure>
);

export default PostImageGrid;
