# Guru Charan Mavuduru — Portfolio V4

An original immersive personal portfolio built with Astro, TypeScript and
GitHub Pages for Guru Charan's AI-security, SOC engineering and applied-AI
journey.

## V4 identity

The homepage is designed as a **Security Intelligence Journey** rather than a
company landing page or a clone of another portfolio.

- Cinematic, skippable system introduction
- Interactive canvas Security Intelligence Core
- Personal career path displayed as a system log
- Interactive AI Security, SOC Engineering and Applied AI focus modes
- Horizontal flagship-project storytelling with evidence and limitations
- Interactive CyberGPT architecture explorer
- Dark-first visual system with a calmer light theme
- Responsive and reduced-motion alternatives
- Live Google Drive blog feed retained from V3
- Google Apps Script contact backend retained from V3

## Quick start

```bash
npm ci
npm run dev
```

Production validation:

```bash
npm run verify
npm run build
```

## Preserve the Apps Script URL

The public source package cannot contain your private deployment configuration.
Before upgrading a working V3 repository, copy the real `/exec` URL from:

```text
src/data/integrations.ts
```

Paste it back after copying the V4 source. The smaller V4 overlay package does
not replace this file.

## GitHub Pages

`.github/workflows/deploy.yml` validates and builds the Astro project, uploads
`dist`, and publishes the site whenever `main` changes.

```text
https://sarma9273.github.io/
```

## Important content locations

```text
src/pages/index.astro                    V4 immersive homepage
src/components/SecurityCore.astro        Interactive canvas visual
src/components/ArchitectureExplorer.astro CyberGPT workflow explorer
src/components/ProjectShowcase.astro     Horizontal project storytelling
src/data/journey.ts                      Personal career journey
src/content/projects/                    Project case studies
src/content/blogs/                       Local blog fallback
src/data/integrations.ts                 Apps Script endpoint
src/styles/global.css                    Complete responsive visual system
```

## Documentation

- `UPGRADE_V3_TO_V4.md`
- `RELEASE_NOTES_V4.md`
- `docs/LIVE_DRIVE_BLOGS_AND_CONTACT.md`
- `docs/GITHUB_PAGES_DEPLOYMENT.md`

## Privacy

- Phone number is not published.
- Contact messages go to the configured Gmail inbox.
- Drive blog reading remains limited to documents inside the configured Blogs
  folder.
- Do not upload student data, credentials, private incident evidence or other
  sensitive information.
