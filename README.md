# Guru Charan Mavuduru — Portfolio V2

A clean, responsive and content-driven personal brand platform for cybersecurity, AI, data science, automation, research, teaching and technical writing.

**Production URL:** `https://sarma9273.github.io`

## What is included

- Astro static site with TypeScript and content collections
- 10 project case studies
- 10 complete technical blog posts
- Professional hero and About photography
- Experience, education, skills, certifications, resume and contact pages
- Search and filtering for blogs and projects
- Dark/light themes, keyboard navigation, reduced-motion support and mobile layouts
- SEO metadata, sitemap, RSS feed, structured data, robots file and custom 404 page
- GitHub Actions deployment to GitHub Pages
- Google Drive workspace generator and content-manifest workflow
- Detailed maintenance and codebase documentation
- Archived copy of the original 2023 portfolio

## Local setup

```bash
npm install
npm run dev
```

Open the local URL printed by Astro.

## Validate production build

```bash
npm run build
npm run preview
```

## Publish on GitHub Pages

1. Use the repository `Sarma9273/Sarma9273.github.io`.
2. Replace its old files with this project, commit and push to `main`.
3. In GitHub: **Settings → Pages → Build and deployment → Source → GitHub Actions**.
4. The included workflow validates, builds and deploys the site automatically.

No Netlify configuration is used or required.

## Content updates

- Blogs: `src/content/blogs/*.md`
- Projects: `src/content/projects/*.md`
- Experience, education, skills: `src/data/profile.ts`
- Brand and links: `src/data/site.ts`
- Resume: `public/resume/Guru_Charan_Mavuduru_ATS_Resume_2026.pdf`
- Photos: `src/assets/images/`

Read the `/docs` folder before changing architecture or deployment.

## Clean GitHub Pages deployment

This repository is prepared for the GitHub user site `https://sarma9273.github.io/`.
It uses the public npm registry through `.npmrc`, verifies its folder structure before installation, builds Astro into `dist`, and deploys that artifact with GitHub Actions.

For a completely fresh repository, follow [`CREATE_FRESH_REPOSITORY.md`](./CREATE_FRESH_REPOSITORY.md).
