# Runbook for agents working on kabir-jolly.github.io

Kabir's personal site, public at https://kabir-jolly.github.io/. Agents do all GitHub work for site
changes (branches, PRs, merges, deploys); Kabir only says yes or no to each change.

## Hard rules
- The site and repo are public. Never commit secrets or private contact details. Anything written
  about Kabir states only facts already on the site or given by Kabir for that change.
- Never push to `master` or `gh-pages` directly. Every change goes through a branch and a PR.
- Release (merge + deploy) only after Kabir's explicit yes for that specific change. A yes to a
  design or a draft is not a yes to release.
- Never write in Kabir's own working copy on his machine; use your own clone/checkout.

## Stack
React 18 + TypeScript + Vite 6 + Tailwind 3, react-router 7 (client routing). Node 22, pinned by
`.nvmrc` and `engines` (on this machine Node comes from nvm: `. ~/.nvm/nvm.sh && nvm use`).
`browserslist` in `package.json` keeps Safari/iOS 15+ prefixes (e.g. `-webkit-backdrop-filter`).
GitHub Pages is published by GitHub Actions (Pages source "GitHub Actions", no custom domain):
`.github/workflows/deploy.yml` builds and deploys on every push to `master`, so merging IS releasing.
`.github/workflows/pr-check.yml` runs `npm ci`, lint and build on every PR.

## File map
- `src/App.tsx`: routes: `/` (Portfolio), `/posts` (Posts list), `/:type/:slug` (BlogPost), where
  type is `writing`, `project` or `experience`.
- `src/data/content.ts`: homepage cards: `experiences` and `projects` arrays (types in `src/types.ts`).
  A card with `slug` opens `/experience/<slug>` or `/project/<slug>`; `externalUrl` opens a new tab.
- `src/Components/blog-content.tsx`: the post registry (`writingContent`, `projectContent`,
  `experienceContent`): slug -> component, `postTitle`, `subtitle?`, `date`, `featured?`, `links?`
  (x/linkedin), `ogImage?` (link-preview image).
- `src/Components/{writing,projects,experience}/*.tsx`: post bodies (plain JSX in an `<article>`;
  images via `PostFigure` (`size` full|medium|half) and `PostImageGrid`).
- `src/data/posts.ts`: flattens the registry into `postEntries` (sorted by the latest year in `date`);
  used by the Posts page and the prerender script.
- `src/Components/BentoBoxes/*`: homepage tiles (profile, experiences, projects, recommendations,
  time, globe). `src/Components/NavBar.tsx`, `Posts.tsx`, `BlogPost.tsx`.
- `src/theme.ts`: palettes as CSS variables; light = `plumRefined`, dark = `plumNight`; follows the
  visitor's system setting, sun/moon toggle remembered in localStorage. Use `colors.*` (CSS vars),
  never fixed hex in components, or dark mode breaks. `src/index.css`: global and post styles.
- `src/hooks/usePageMeta.ts`: per-page title/description/og tags at runtime.
- `scripts/generate-site-files.mjs` (runs at the end of `npm run build`): writes `dist/404.html`
  (SPA fallback), `dist/posts.html` + `posts/index.html`, and for every post both
  `dist/<type>/<slug>.html` and `dist/<type>/<slug>/index.html` with its own meta tags, plus
  `robots.txt` and `sitemap.xml`. New posts get these automatically from the registry.
- `public/assets/img/<topic>/...`: images, served at `/assets/img/...`. `index.html`: base meta tags
  and the Cloudflare Web Analytics beacon.

## Add or edit content
- Edit a homepage card: change its entry in `src/data/content.ts` (image under `public/assets/img/`).
- Add a post: (1) create `src/Components/<writing|projects|experience>/<Name>.tsx` exporting a component
  that returns `<article>...</article>`; (2) import it in `src/Components/blog-content.tsx` and add an
  entry under the right registry with a URL-safe slug, `postTitle`, `date` (include the year: it drives
  sort order), optional `subtitle`, `featured`, `links`, `ogImage`; (3) optionally link it from a card
  via `slug` in `content.ts`. The URL is `/<writing|project|experience>/<slug>` (note: `project`, singular).

## Check a change locally
```
npm ci
npm run build    # tsc -b && vite build && prerender; must exit 0
npm run lint     # must exit 0 (one known warning in Globe.tsx, see below)
npx vite preview --port 4173 --strictPort    # serves dist/ like Pages does
```
Open http://localhost:4173/ and each changed route (e.g. `/writing/<slug>`, `/posts`) in the browser
tool, wait ~2 s for the client render (the first frame is blank), screenshot light and dark mode
(toggle in the nav) and a narrow mobile width. Stop the preview server afterwards. Put before/after
screenshots in the PR.

## Branch and PR flow
1. Branch off the latest `origin/master` (`git fetch origin && git switch -c <topic> origin/master`).
2. Commit with explicit authorship (`git -c user.name=... -c user.email=... commit`).
3. `git push -u origin <topic>` (https push works with the signed-in `gh` credentials here).
4. `gh pr create --base master` with a description starting `Opened-by: <frame id>`, what changes for a
   visitor, the build/lint results and screenshots. Do not merge until Kabir says yes.

## Release (only after Kabir's explicit yes for that change)
Merging a PR into `master` publishes it within a few minutes. Merge only after Kabir's yes for that
specific change, and only once the PR check is green.
1. `gh pr checks <n> --watch` passes, then `gh pr merge <n> --squash --match-head-commit <head sha>`.
2. Watch the deploy: `gh run list --workflow deploy.yml --branch master -L 1` then
   `gh run watch <run id> --exit-status` (must exit 0).
3. Verify live: `curl -s https://kabir-jolly.github.io/ | grep -o 'assets/index-[^"]*'` matches the
   hashes of a clean local build of the same master (`dist/index.html`; builds are reproducible:
   same Node, `npm ci`, pinned browserslist); load each changed route on the live site, wait ~2 s,
   screenshot light and dark.
- Redeploy without a change: `gh workflow run deploy.yml --ref master`.
- Rollback: open a revert PR (`git revert <merge sha>`) and merge it after Kabir's yes (urgent: say
  so to him); or re-run an older green deploy run (`gh run rerun <run id>`), which republishes that
  run's commit until the next merge.
- If a deploy fails, the previous version stays live; fix forward in a PR. Emergency fallback to the
  old manual flow: Pages source back to branch `gh-pages`
  (`gh api -X PUT repos/kabir-jolly/kabir-jolly.github.io/pages -f build_type=legacy -f 'source[branch]=gh-pages' -f 'source[path]=/'`),
  which serves the last `npm run deploy` output. `npm run deploy` is not used otherwise.

## Known repo hygiene issues (not fixed)
- `npm run lint`: 1 warning, `src/Components/BentoBoxes/Globe.tsx:92` missing useEffect dependency `r`.
- `npm ci`: 16 audit vulnerabilities reported (1 low, 10 moderate, 5 high) in dependencies.
- The `gh-pages` branch and the `deploy`/`predeploy` scripts remain from the old manual flow; the
  branch is no longer served unless the Pages source is switched back.
- `public/assets/files/kabirjolly_resume_1-2-25.pdf` is not linked from the source but is still published.
- `src/theme.ts` keeps 12 palettes; only `plumRefined` and `plumNight` are used.
- About 13 stale remote branches (e.g. `devin/*`, `dark-mode`, `mobile-fixes`) remain on GitHub.
- README says `npm install` (prefer `npm ci`); package name is the template's `my-portfolio`;
  `.claude/launch.json` is an editor-specific file in the repo.
- Card clicks use `window.location.href` (full page load) rather than router links; works because every
  post route is prerendered.
