import { build } from "esbuild";
import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";

const SITE_URL = "https://kabir-jolly.github.io";
const DEFAULT_DESCRIPTION =
  "Personal site of Kabir Jolly — projects, experience, and writing.";
const output = await build({
  bundle: true,
  entryPoints: ["src/data/posts.ts"],
  format: "esm",
  jsx: "automatic",
  loader: { ".tsx": "tsx" },
  platform: "node",
  write: false,
});

const bundledPosts = output.outputFiles[0].text;
const postsModule = await import(
  `data:text/javascript;base64,${Buffer.from(bundledPosts).toString("base64")}`
);
const postEntries = postsModule.postEntries;
const postUrls = postEntries.map(
  ({ type, slug }) => `${SITE_URL}/${type}/${slug}`
);
const urls = [SITE_URL, `${SITE_URL}/posts`, ...postUrls];

function escapeHtml(value) {
  return String(value).replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[character]
  );
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function replaceHeadElement(head, tagName, attribute, value, replacement) {
  const escapedValue = escapeRegex(value);
  const pattern =
    tagName === "title"
      ? /<title\b[^>]*>[\s\S]*?<\/title>/gi
      : new RegExp(
          `<${tagName}\\b(?=[^>]*\\b${attribute}\\s*=\\s*["']${escapedValue}["'])[^>]*\\/?>`,
          "gi"
        );

  return `${head.replace(pattern, "")}\n    ${replacement}`;
}

function removeHeadElement(head, tagName, attribute, value) {
  const escapedValue = escapeRegex(value);
  const pattern =
    tagName === "title"
      ? /<title\b[^>]*>[\s\S]*?<\/title>/gi
      : new RegExp(
          `<${tagName}\\b(?=[^>]*\\b${attribute}\\s*=\\s*["']${escapedValue}["'])[^>]*\\/?>`,
          "gi"
        );

  return head.replace(pattern, "");
}

function withRouteMetadata(html, { title, description, image, path, type }) {
  const headMatch = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i);
  if (!headMatch) {
    throw new Error("Built index.html is missing a head element");
  }

  const canonicalUrl = `${SITE_URL}${path}`;
  let head = headMatch[1];
  head = replaceHeadElement(
    head,
    "title",
    "",
    "",
    `<title>${escapeHtml(title)}</title>`
  );

  const metadata = [
    [
      "meta",
      "name",
      "description",
      `<meta name="description" content="${escapeHtml(description)}" />`,
    ],
    [
      "meta",
      "property",
      "og:title",
      `<meta property="og:title" content="${escapeHtml(title)}" />`,
    ],
    [
      "meta",
      "property",
      "og:description",
      `<meta property="og:description" content="${escapeHtml(description)}" />`,
    ],
    [
      "meta",
      "property",
      "og:type",
      `<meta property="og:type" content="${escapeHtml(type)}" />`,
    ],
    [
      "meta",
      "property",
      "og:url",
      `<meta property="og:url" content="${escapeHtml(canonicalUrl)}" />`,
    ],
    [
      "meta",
      "name",
      "twitter:title",
      `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
    ],
    [
      "meta",
      "name",
      "twitter:description",
      `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
    ],
  ];

  for (const [tagName, attribute, value, replacement] of metadata) {
    head = replaceHeadElement(head, tagName, attribute, value, replacement);
  }

  head = replaceHeadElement(
    head,
    "link",
    "rel",
    "canonical",
    `<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />`
  );

  for (const [tagName, attribute, value] of [
    ["meta", "property", "og:image"],
    ["meta", "name", "twitter:image"],
  ]) {
    head = removeHeadElement(head, tagName, attribute, value);
  }

  if (image) {
    const absoluteImage = image.startsWith("http")
      ? image
      : `${SITE_URL}${image}`;
    head = replaceHeadElement(
      head,
      "meta",
      "property",
      "og:image",
      `<meta property="og:image" content="${escapeHtml(absoluteImage)}" />`
    );
    head = replaceHeadElement(
      head,
      "meta",
      "name",
      "twitter:image",
      `<meta name="twitter:image" content="${escapeHtml(absoluteImage)}" />`
    );
  }

  return html.replace(headMatch[1], head);
}

function buildPostHtml(baseHtml, post) {
  return withRouteMetadata(baseHtml, {
    title: post.title,
    description: post.subtitle ?? DEFAULT_DESCRIPTION,
    image: post.ogImage,
    path: `/${post.type}/${post.slug}`,
    type: "article",
  });
}

function buildPostsHtml(baseHtml) {
  return withRouteMetadata(baseHtml, {
    title: "Posts",
    description: DEFAULT_DESCRIPTION,
    path: "/posts",
    type: "website",
  });
}

const baseHtml = await readFile("dist/index.html", "utf8");
await mkdir("dist", { recursive: true });
await copyFile("dist/index.html", "dist/404.html");

const postsHtml = buildPostsHtml(baseHtml);
await mkdir("dist/posts", { recursive: true });
await writeFile("dist/posts/index.html", postsHtml);
await writeFile("dist/posts.html", postsHtml);

for (const post of postEntries) {
  const routeDirectory = `dist/${post.type}/${post.slug}`;
  await mkdir(routeDirectory, { recursive: true });
  const postHtml = buildPostHtml(baseHtml, post);
  await writeFile(
    `${routeDirectory}/index.html`,
    postHtml
  );
  // Keep both forms so GitHub Pages can serve extensionless routes without a trailing-slash redirect.
  await writeFile(`dist/${post.type}/${post.slug}.html`, postHtml);
}

const escapeXml = (value) =>
  value.replace(
    /[<>&'"]/g,
    (character) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        "'": "&apos;",
        '"': "&quot;",
      })[character]
  );
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url><loc>${escapeXml(url)}</loc></url>`).join("\n")}
</urlset>
`;

await writeFile(
  "dist/robots.txt",
  `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`
);
await writeFile("dist/sitemap.xml", sitemap);
