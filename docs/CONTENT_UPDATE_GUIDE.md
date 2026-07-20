# Content Update Guide

## Add a project

1. Copy an existing file from `src/content/projects`.
2. Rename it with a lowercase hyphenated slug.
3. Update every frontmatter field.
4. Write the case study below the closing `---`.
5. Run `npm run build`.

Do not use a repository, demo or report URL until it is public, correct and privacy-safe. Keep the value empty to hide the button.

## Add a blog

1. Copy an existing file from `src/content/blogs`.
2. Update title, description, status, domain, date and tags.
3. Link the related project with `relatedProject` where appropriate.
4. Add a Google Doc URL only after the Doc is public view-only.
5. Run `npm run build`.

## Update profile information

- Main identity and social links: `src/data/site.ts`
- Education, experience, skills and certificates: `src/data/profile.ts`
- Professional photo: replace files in `src/assets/images` and keep the same filenames
- Resume: replace the PDF in `public/resume`

## Project evidence checklist

Before adding a public link, confirm:

- No passwords, tokens, private IP details or confidential logs
- No student or wedding-guest personal data
- Repository README explains setup, scope and ethical use
- Screenshots are readable and do not expose sensitive information
- The demo works on mobile and desktop
- The report matches the current project version
