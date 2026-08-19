import { build } from "esbuild";
import { copyFile, mkdir, writeFile } from "node:fs/promises";

const SITE_URL = "https://kabir-jolly.github.io";
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
const postUrls = postsModule.postEntries.map(
  ({ type, slug }) => `${SITE_URL}/${type}/${slug}`
);
const urls = [SITE_URL, `${SITE_URL}/posts`, ...postUrls];
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

await mkdir("dist", { recursive: true });
await copyFile("dist/index.html", "dist/404.html");
await writeFile("dist/robots.txt", `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`);
await writeFile("dist/sitemap.xml", sitemap);
