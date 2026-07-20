# Google Drive Content Workflow

## Purpose

Drive is the private master library for original images, reports, blog Docs, screenshots, diagrams and evidence. The website repository stores optimised public assets and Markdown content.

## Create the workspace

Open `tools/google-drive/GuruCharan_Portfolio_Drive_Setup.gs` in Google Apps Script and follow `tools/google-drive/README.md`.

The script reuses an existing `Projects/Personal Portfolio` folder, creates missing subfolders, imports selected files, creates individual blog Docs and generates `portfolio-content.json`.

## Sync the manifest locally

After downloading the generated JSON:

```bash
npm run sync:drive -- C:/path/to/portfolio-content.json
npm run build
```

The command copies the manifest into `src/data/drive-manifest.json` for future integrations.

## Why the website does not hotlink private Drive images

- Drive permissions can break images unexpectedly.
- Large originals reduce performance.
- Viewer URLs are not always stable image URLs.
- Private folder structures should not be exposed.

Optimise approved images and commit them to the repository. Link Google Docs only as optional secondary reading sources.

## Publishing permissions

Keep the complete workspace private. Share only individual approved files as **Anyone with the link — Viewer**. Never grant public edit access.
