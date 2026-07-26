import { useEffect } from "react";

export const SITE_URL = "https://kabir-jolly.github.io";
const DEFAULT_TITLE = "Kabir Jolly";
const DEFAULT_DESCRIPTION =
  "Personal site of Kabir Jolly — projects, experience, and writing.";

interface PageMeta {
  title?: string;
  description?: string;
  /** Site-relative path; resolved against SITE_URL since previews need absolute URLs. */
  image?: string;
  type?: "website" | "article";
}

function upsertMeta(attr: "property" | "name", key: string, content: string) {
  const selector = `meta[${attr}="${key}"]`;
  let el = document.head.querySelector<HTMLMetaElement>(selector);

  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }

  el.setAttribute("content", content);
}

function applyMeta({ title, description, image, type }: Required<PageMeta>) {
  document.title = title;

  upsertMeta("name", "description", description);
  upsertMeta("property", "og:title", title);
  upsertMeta("property", "og:description", description);
  upsertMeta("property", "og:type", type);
  upsertMeta("property", "og:url", window.location.href);
  upsertMeta("name", "twitter:card", "summary_large_image");
  upsertMeta("name", "twitter:title", title);
  upsertMeta("name", "twitter:description", description);

  if (image) {
    const absolute = image.startsWith("http") ? image : `${SITE_URL}${image}`;
    upsertMeta("property", "og:image", absolute);
    upsertMeta("name", "twitter:image", absolute);
  }
}

/**
 * Sets the document title and Open Graph tags for the current route.
 *
 * Only affects scrapers that execute JavaScript — iMessage does, which is what
 * this is for. LinkedIn, Slack, and X read the static HTML and will still see
 * the defaults from index.html; fixing those needs prerendered per-route HTML.
 */
export function usePageMeta({
  title,
  description,
  image,
  type = "website",
}: PageMeta) {
  const resolvedTitle = title ?? DEFAULT_TITLE;
  const resolvedDescription = description ?? DEFAULT_DESCRIPTION;
  const resolvedImage = image ?? "";

  useEffect(() => {
    applyMeta({
      title: resolvedTitle,
      description: resolvedDescription,
      image: resolvedImage,
      type,
    });

    // Restore site defaults so a stale post title doesn't follow the user out.
    return () => {
      applyMeta({
        title: DEFAULT_TITLE,
        description: DEFAULT_DESCRIPTION,
        image: "",
        type: "website",
      });
    };
  }, [resolvedTitle, resolvedDescription, resolvedImage, type]);
}
