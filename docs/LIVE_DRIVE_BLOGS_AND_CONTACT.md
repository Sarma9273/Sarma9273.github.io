# Live Google Drive Blogs and Working Contact Form

Portfolio V3 can load new blog documents directly from Google Drive and send
contact-form messages to your Gmail inbox. GitHub Pages remains the public
frontend; Google Apps Script acts as the small live backend.

## Architecture

```text
Google Drive / blogs
        │
        ▼
Google Apps Script web app
        │
        ├── JSONP blog feed
        ├── private-document blog reader
        └── contact-form email delivery
        │
        ▼
https://sarma9273.github.io
```

The website contains local Markdown articles as a fallback. If Google Drive is
temporarily unavailable, visitors still see the built-in blog collection.

## A. Prepare the Blogs folder

Use the folder created by the Drive setup script:

```text
Projects/
└── Personal Portfolio/
    └── blogs/
        ├── 01_CyberGPT_Incident_Response_Copilot/
        ├── 02_Practical_SOC_Home_Lab/
        └── ...
```

Inside each blog folder, keep at least one **Google Doc**. The script uses the
first Google Doc as the published article.

Uploading DOCX alone is not enough for live reading. Open the DOCX with Google
Docs or use the existing Drive setup generator to create Google Docs.

## B. Optional metadata

Right-click the Google Doc in Drive, open **File information → Details**, and add
a description in this format:

```text
Title: CyberGPT — Building an Intelligent Incident Response Copilot
Description: How I designed a retrieval-based SOC assistant using embeddings, FAISS and incident-response knowledge.
Domain: AI & Cybersecurity
Tags: CyberGPT, SOC, FAISS, MITRE ATT&CK
Status: Functional research prototype
Featured: true
```

The metadata is optional. When it is absent, the backend uses the document name
and derives a short description from the document text.

A `portfolio.meta.json` file inside a blog folder is also supported:

```json
{
  "title": "CyberGPT — Building an Intelligent Incident Response Copilot",
  "description": "How I designed a retrieval-based SOC assistant.",
  "domain": "AI & Cybersecurity",
  "tags": ["CyberGPT", "SOC", "FAISS", "MITRE ATT&CK"],
  "status": "Functional research prototype",
  "featured": true
}
```

## C. Create the Apps Script backend

1. Open `https://script.google.com`.
2. Create a new project named `Guru Charan Portfolio Live Backend`.
3. Delete the sample function.
4. Paste the complete file:

```text
tools/google-drive/Portfolio_Live_Backend.gs
```

5. Update:

```javascript
BLOGS_FOLDER_ID: 'PASTE_BLOGS_FOLDER_ID_HERE'
```

The folder ID is the text after `/folders/` in the Drive URL.

Alternative: run `locatePortfolioBlogsFolder()` once. Open **Executions** or the
log and copy the detected ID into `CONFIG.BLOGS_FOLDER_ID`.

6. Confirm:

```javascript
CONTACT_TO: 'charanmavuduru9273@gmail.com'
```

7. Save the script.

## D. Authorize and deploy

1. Select `locatePortfolioBlogsFolder` or `getBlogs_` and run once.
2. Approve the requested Drive, Docs and email permissions.
3. Choose **Deploy → New deployment**.
4. Select **Web app**.
5. Configure:

```text
Execute as: Me
Who has access: Anyone
```

6. Deploy.
7. Copy the URL ending in `/exec`.

Apps Script must execute as you because it reads your private blog documents and
sends messages to your inbox. The backend verifies that a requested document is
inside the configured Blogs folder before rendering it.

## E. Connect the website

Open:

```text
src/data/integrations.ts
```

Replace:

```typescript
portfolioApiUrl: 'PASTE_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE'
```

with your `/exec` URL.

Commit and push this one file to GitHub. GitHub Pages will redeploy once. After
that:

- New Google Docs appear without future GitHub rebuilds.
- Updated Docs show their new text in the live reader.
- Contact-form submissions are emailed to you.

The blog feed is cached for 60 seconds. A new upload should normally appear
within about one minute after reloading the Blogs page.

## F. Test the backend before connecting

Open these URLs in Chrome:

```text
YOUR_EXEC_URL?action=health
YOUR_EXEC_URL?action=blogs
```

The first should show `"ok": true`. The second should return a `blogs` array.

Then submit the portfolio contact form and check Gmail, including Spam, for a
subject beginning with:

```text
[Portfolio]
```

## G. Contact-form safeguards

The backend includes:

- Required-field and length validation
- Email-format validation
- A hidden honeypot field
- A short per-email cooldown
- Reply-To set to the visitor's address
- No phone number collection
- No public spreadsheet containing messages

Do not place passwords, API keys or private credentials in the Apps Script or
repository.

## H. Future project demos

Project demos can be added later without redesigning the site. In the relevant
Markdown file under `src/content/projects`, add:

```yaml
repositoryUrl: https://github.com/Sarma9273/example
demoUrl: https://example-demo-url
reportUrl: https://example-report-url
```

Buttons appear only for links that exist.
