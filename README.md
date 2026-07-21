# Guru Charan Mavuduru — Personal Portfolio V3

A personal portfolio and learning-in-public platform built with Astro,
TypeScript and GitHub Pages.

## What changed in V3

- Rewritten to feel like an individual journey rather than a company website
- Dark, warm and less glaring visual system
- Softer light theme with reduced white brightness
- Scroll reveals, subtle tilt interactions and rotating current-focus text
- Working contact-form backend through Google Apps Script
- Live Google Drive blog feed with local Markdown fallback
- Private Google Docs can be read through the Apps Script reader
- Project demos can be added gradually through content metadata

## Quick start

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
```

## One-time live integration

Read:

```text
docs/LIVE_DRIVE_BLOGS_AND_CONTACT.md
```

Then deploy:

```text
tools/google-drive/Portfolio_Live_Backend.gs
```

Paste the resulting Apps Script `/exec` URL into:

```text
src/data/integrations.ts
```

## GitHub Pages

The workflow at `.github/workflows/deploy.yml` builds the Astro project and
deploys `dist` to GitHub Pages whenever `main` changes.

Published address:

```text
https://sarma9273.github.io/
```

## Main content locations

```text
src/content/projects/       Project case studies
src/content/blogs/          Reliable local blog fallback
src/data/profile.ts         Education, experience and skills
src/data/site.ts            Brand, links and navigation
src/data/integrations.ts    Apps Script endpoint
src/styles/global.css       Visual system and responsive design
```

## Privacy

- Phone number is not shown publicly.
- Contact messages go directly to the configured inbox.
- The live blog reader only opens documents located in the configured Blogs
  folder.
- Do not upload student data, private wedding information, credentials or
  sensitive incident evidence.
