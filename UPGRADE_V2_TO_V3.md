# Upgrade the Existing GitHub Repository from V2 to V3

## Files that must remain private on your computer

Do not copy `node_modules`, `dist` or `.astro` into GitHub.

## Recommended GitHub Desktop process

1. Open `Sarma9273.github.io` in GitHub Desktop.
2. Select `main` and click **Fetch origin**.
3. Create a branch named:

```text
portfolio-v3-personal
```

4. Extract the V3 source ZIP.
5. Open the extracted `Sarma9273.github.io-personal-v3` folder.
6. Copy everything inside that folder into your local cloned repository.
7. Choose **Replace files in the destination** when Windows asks.
8. Return to GitHub Desktop.
9. Commit:

```text
Upgrade portfolio to personal V3 with live Drive blogs
```

10. Publish/push the branch.
11. Create a pull request into `main`.
12. Confirm the GitHub Actions build is green before merging.

## One-time Google Apps Script connection

The site works immediately with local blogs and email-app links. To enable live
Drive blogs and direct inbox delivery:

1. Read `docs/LIVE_DRIVE_BLOGS_AND_CONTACT.md`.
2. Deploy `tools/google-drive/Portfolio_Live_Backend.gs`.
3. Paste the `/exec` URL into `src/data/integrations.ts`.
4. Commit and push that one configuration change.

## Verify locally

```bash
npm install
npm run verify
npm run build
npm run dev
```

## Expected result

- Homepage feels personal and story-led.
- Dark mode is the default.
- Light mode is warm rather than bright white.
- Contact form sends to Gmail after Apps Script connection.
- New Drive Google Docs appear in Blogs without future GitHub rebuilds.
- Local Markdown blogs remain available as a fallback.
