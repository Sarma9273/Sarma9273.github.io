# Codebase Guide

## 1. Architecture

The project uses Astro to prerender all portfolio routes as static HTML. This gives GitHub Pages fast files that require no server, database or runtime framework.

### Main flow

1. Markdown content is stored in `src/content/blogs` and `src/content/projects`.
2. `src/content.config.ts` validates every frontmatter field at build time.
3. Dynamic route files query the collections and generate one static page per entry.
4. Shared layouts apply navigation, metadata, structured data, footers and accessibility controls.
5. `npm run build` runs `astro check`, then generates the final `dist` directory.
6. GitHub Actions uploads `dist` and deploys it to GitHub Pages.

## 2. Important directories

### `.github/workflows`

`deploy.yml` defines the complete GitHub Pages pipeline. It checks out the repository, installs Node dependencies, validates the Astro code, builds the site, uploads the artifact and deploys it.

### `public`

Files are copied directly to the final site without processing. Use this for the resume PDF, robots file, manifest, favicon and final social image.

### `src/assets`

Astro-processed local images. The homepage and About page use the `Image` component so responsive widths and optimised formats are generated at build time.

### `src/components`

Reusable visual and behavioural units:

- `Header.astro`: desktop/mobile navigation and theme toggle
- `Footer.astro`: closing navigation and social links
- `Icon.astro`: internal SVG icon library with no third-party request
- `ProjectCard.astro`: consistent project presentation
- `BlogCard.astro`: entire-card blog opening action
- `ContentActions.astro`: displays only verified non-empty links
- `Breadcrumbs.astro`: accessible page hierarchy
- `BackToTop.astro`: progressive enhancement for long pages

### `src/layouts`

- `BaseLayout.astro` owns document metadata, Open Graph, Twitter cards, JSON-LD and global site shell.
- `ContentLayout.astro` owns project/blog hero metadata, article layout and generated table of contents.

### `src/content`

Every blog and project is a separate Markdown file. Frontmatter controls cards and page metadata. The Markdown body controls the detailed article.

### `src/data`

Small structured files for information that is shared across pages: professional identity, navigation, experience, education, skills and certifications.

### `src/pages`

Astro file-based routing. Folder names become URL paths. `[id].astro` pages generate all blog and project detail routes.

### `src/styles/global.css`

The entire visual system: design tokens, themes, typography, layout, buttons, cards, article content, forms, responsive breakpoints and reduced-motion rules.

## 3. Key design decisions

- No Netlify-specific files, functions or forms.
- No public phone number.
- No broken `#` buttons. Empty repository/demo/report links are hidden.
- Local Markdown is the public source for SEO and reliability.
- Google Drive is used as the private master library and evidence store.
- No external fonts or icon CDNs, reducing privacy and loading risk.
- Client JavaScript is limited to navigation, theme, filters, contact-mail preparation and table-of-contents enhancement.

## 4. Content schemas

The blog schema requires title, description, status, domain, publication date and tags. The project schema additionally requires order, period, role, technology list and outcome list. An invalid field stops the build instead of silently publishing a broken page.

## 5. Adding functionality safely

Prefer a static Astro component first. Add client-side JavaScript only when the browser must respond to user input. GitHub Pages cannot run server-side Node code, databases or secret API keys.

## 6. Quality checks

Run:

```bash
npm run check
npm run build
npm run preview
```

Then test keyboard navigation, mobile navigation, both colour themes, filters, resume links, social links, the contact mail flow and at least one project/blog route.
