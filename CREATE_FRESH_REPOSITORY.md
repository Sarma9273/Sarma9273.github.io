# Create the fresh `Sarma9273.github.io` repository

## Before deleting the old repository

1. Download a ZIP backup of the old repository from **Code → Download ZIP**.
2. Confirm that any custom-domain settings, secrets, or environment variables have been recorded.
3. Delete the old repository only after the backup is safely stored.

## Create the new repository

1. On GitHub, choose **New repository**.
2. Repository name: `Sarma9273.github.io`
3. Visibility: **Public**.
4. Do not initialise it with a README, `.gitignore`, or licence.
5. Create the repository.

## Publish this clean source with GitHub Desktop

1. Extract the supplied ZIP.
2. Open GitHub Desktop.
3. Choose **File → Add local repository** and select the extracted `Sarma9273.github.io` folder.
4. If GitHub Desktop says it is not a Git repository, choose **create a repository here**.
5. Confirm the repository name is `Sarma9273.github.io` and commit all files with:
   `Initial clean Portfolio V2 release`
6. Choose **Publish repository**.
7. Ensure the remote repository is the newly created `Sarma9273.github.io` repository and keep it public.

## Enable Pages

Open **Repository Settings → Pages → Build and deployment** and choose **GitHub Actions**.
The included `.github/workflows/deploy.yml` builds Astro and deploys the generated `dist` artifact.

## Verify

The repository root must directly contain:

- `.github`
- `public`
- `src`
- `.npmrc`
- `astro.config.mjs`
- `package.json`
- `package-lock.json`

After the Actions workflow is green, visit:

`https://sarma9273.github.io/`
