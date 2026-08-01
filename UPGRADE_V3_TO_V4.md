# Upgrade Portfolio V3 to V4 safely

## Preserve the live Apps Script endpoint

Before replacing files, open the currently deployed repository file:

```text
src/data/integrations.ts
```

Copy the real `portfolioApiUrl` value ending in `/exec`. The V4 package cannot know that private deployment URL.

## Recommended branch workflow

1. Open the repository in GitHub Desktop.
2. Fetch `main`.
3. Create a branch named `portfolio-v4-security-journey`.
4. Copy the contents of this V4 source into the local repository root.
5. Restore the saved Apps Script `/exec` URL in `src/data/integrations.ts`.
6. Run `npm ci`.
7. Run `npm run build`.
8. Preview with `npm run dev`.
9. Commit and push the branch.
10. Create a pull request and merge after the GitHub Actions build succeeds.

## Faster overlay method

The accompanying `Portfolio_V4_Upgrade_Overlay.zip` contains only the files changed for V4. It intentionally excludes `src/data/integrations.ts`, blogs, project content, the backend and deployment configuration. Copying the overlay is the safest upgrade when V3 is already working.

## Demo projects

Project cards already support `repositoryUrl`, `demoUrl` and `reportUrl` in project Markdown files. Add URLs later without redesigning the V4 homepage.
