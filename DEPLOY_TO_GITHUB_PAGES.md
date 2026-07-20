# Deploy This Portfolio to GitHub Pages

This project is configured for the GitHub user site:

- Repository: `Sarma9273/Sarma9273.github.io`
- Public URL: `https://sarma9273.github.io`
- Publishing method: GitHub Actions
- Output directory: `dist`

## First deployment

1. Back up or archive the current contents of `Sarma9273/Sarma9273.github.io`.
2. Copy all files from this source project into the repository root. Include hidden folders such as `.github`.
3. Do not upload `node_modules`, `.astro`, or `dist`; GitHub Actions creates them.
4. Commit and push to the `main` branch.
5. Open the repository on GitHub.
6. Go to **Settings → Pages → Build and deployment**.
7. Set **Source** to **GitHub Actions**.
8. Open the **Actions** tab and wait for “Deploy Astro portfolio to GitHub Pages” to finish.
9. Visit `https://sarma9273.github.io` and test the navigation, resume, projects, blogs, theme control and contact links.

## Command-line deployment

```bash
git clone https://github.com/Sarma9273/Sarma9273.github.io.git
cd Sarma9273.github.io

# Copy this project's source files here, preserving .github/workflows/deploy.yml.

npm install
npm run build

git add .
git commit -m "Launch Portfolio V2"
git push origin main
```

## Later updates

Edit the relevant Markdown, TypeScript or asset files, run `npm run build`, then commit and push. The included workflow automatically publishes the new static build.

## Important

- This repository contains no Netlify configuration.
- Keep the repository name exactly `Sarma9273.github.io` for the configured root URL.
- The workflow requires GitHub Pages to use **GitHub Actions** as its source.
- Never commit secrets, access tokens, private student data, confidential logs or private wedding guest content.
