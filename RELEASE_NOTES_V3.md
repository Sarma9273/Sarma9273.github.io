# Portfolio V3 Release Notes

## Personal direction

The homepage, About, Experience, Projects, Blogs and Contact pages were rewritten
in a first-person voice. The site now presents an evolving learning journey
rather than a company-style services website.

## Visual design

- Dark theme is the default.
- Light mode uses warm paper-like surfaces rather than bright white.
- Added scroll reveals, subtle pointer tilt, moving ambient shapes and a
  rotating current-focus line.
- Added personal story, current chapter and “what I’m doing now” sections.

## Live Google Drive blogs

A Google Apps Script backend can scan the Drive Blogs folder and expose a
JSONP feed. New Google Docs appear on the portfolio without a new GitHub build.
The local Markdown collection remains as a fallback.

## Contact form

The same backend accepts contact submissions and delivers them to the configured
Gmail address with reply-to support, validation, a honeypot and rate limiting.

## Project demos

No fake demo links were added. Demo and repository buttons will appear when
real URLs are added to project frontmatter.
