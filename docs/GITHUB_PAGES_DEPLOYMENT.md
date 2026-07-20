# GitHub Pages Deployment

## Repository

Use the user-site repository:

```text
Sarma9273/Sarma9273.github.io
```

Because this is a username site, Astro is configured with:

```js
site: 'https://sarma9273.github.io'
```

No `base` path is needed.

## First deployment

1. Back up the current repository or create a `legacy-v1` tag.
2. Remove the old root website files.
3. Copy this project's contents into the repository root.
4. Commit and push to `main`.
5. Open **Settings → Pages**.
6. Set **Source** to **GitHub Actions**.
7. Open **Actions** and monitor `Deploy Astro portfolio to GitHub Pages`.

## Workflow stages

- Checkout source
- Use Node.js 22
- `npm ci`
- `npm run build`
- Configure Pages
- Upload `dist`
- Deploy the artifact

## Common failures

### A 404 after a successful workflow

Confirm the deployed artifact contains `index.html` at its top level and that Pages Source is GitHub Actions.

### CSS or image paths are broken

Keep the repository name as `Sarma9273.github.io`. If you deploy as a project repository, add the repository name as Astro's `base` value.

### `npm ci` fails

Commit `package-lock.json`. Do not delete it.

### Content validation fails

Read the build log. Astro reports the exact Markdown file and invalid frontmatter field.

## Rollback

The original portfolio ZIP is stored in `archive/Sarma9273.github.io-v1.zip`. Git tags or GitHub releases are still the preferred rollback mechanism after the new repository is active.
