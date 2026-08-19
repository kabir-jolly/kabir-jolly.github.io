import type { ReactNode } from "react";

export type PostImageSize = "full" | "medium" | "half";

interface PostFigureProps {
  src: string;
  alt: string;
  caption?: ReactNode;
  size?: PostImageSize;
}

const PostFigure = ({
  src,
  alt,
  caption,
  size = "full",
}: PostFigureProps) => (
  <figure className={`post-figure post-figure-${size}`}>
    <img src={src} alt={alt} />
    {caption && <figcaption>{caption}</figcaption>}
  </figure>
);

export default PostFigure;
