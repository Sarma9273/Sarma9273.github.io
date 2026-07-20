---
order: 6
title: "Personal Portfolio and Technical Blog Platform"
shortTitle: "Portfolio V2"
description: "A content-driven, responsive personal-brand platform for project case studies, technical blogs, experience, education, research evidence and professional links."
status: "Version 2 complete and ready for GitHub Pages"
period: "2026"
domain: "Web Development & Personal Branding"
role: "Product owner, content strategist and developer"
technologies:
  - "Astro"
  - "TypeScript"
  - "Markdown"
  - "CSS"
  - "GitHub Actions"
  - "GitHub Pages"
  - "Google Drive"
featured: true
legacy: false
coverIcon: "browser"
blogSlug: "personal-portfolio-brand-platform"
repositoryUrl: ""
demoUrl: ""
reportUrl: ""
outcomes:
  - "Static, fast and SEO-friendly architecture"
  - "Ten local technical blogs and ten project case studies"
  - "Automated GitHub Pages deployment and documented Drive workflow"
---
## Why this rebuild exists

The original 2023 portfolio reflected early HTML, CSS and JavaScript practice. It no longer represented work in cybersecurity, AI, teaching, automation, research and product development.

## Architecture

Astro generates static pages from typed Markdown content collections. Shared components control navigation, cards, layouts, SEO, filters and accessibility. GitHub Actions validates and deploys the `dist` artifact to GitHub Pages.

## Content model

Projects and blogs are independent but linked. Each project can include status, role, technology, evidence links and a related technical article. New content is added without redesigning the whole site.

## Brand system

The visual language uses a restrained security-and-research palette, system fonts, clear hierarchy, strong focus states, reduced-motion support and professional photography.

## Maintenance

A Google Apps Script creates the supporting Drive workspace. Public content remains local for performance and SEO; Drive is the master evidence and document library.
