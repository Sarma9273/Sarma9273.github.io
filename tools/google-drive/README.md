# Guru Charan Portfolio — Google Apps Script Setup

## What this package creates

The script checks for an existing `Projects` folder and an existing `Personal Portfolio` folder. It reuses them when found, so running it again does not create a second folder tree.

It generates:

```text
Projects/
└── Personal Portfolio/
    ├── source/
    │   ├── brand/
    │   ├── profile/
    │   ├── projects/
    │   ├── blog-covers/
    │   ├── certificates/
    │   ├── experience/
    │   └── social-media/
    ├── blogs/
    │   ├── 01_CyberGPT_Incident_Response_Copilot/
    │   ├── 02_Practical_SOC_Home_Lab/
    │   ├── 03_Network_Traffic_Analyser/
    │   ├── 04_Sahaaya360/
    │   ├── 05_Osprey_MPPT_Solar_PV/
    │   ├── 06_Personal_Portfolio_Platform/
    │   ├── 07_Dynamic_Wedding_Invitation/
    │   ├── 08_School_Lab_Shared_Network/
    │   ├── 09_Early_Web_Development_Projects/
    │   └── 10_Thirty_Days_Kali_Tools/
    ├── docs/
    ├── resume/
    ├── reports/
    ├── data/
    ├── imports/
    ├── archive/
    ├── README - Start Here
    └── Portfolio Content Registry
```

It can also:

- Copy your two profile photographs into `source/profile`
- Copy the ATS resume into `resume`
- Copy and convert the project-blog DOCX
- Split the collection into ten individual formatted Google Docs
- Create a blog/project/asset registry
- Create `portfolio-content.json` for later website integration

## Recommended image use

- `DSC06218.JPG` — homepage hero, Open Graph preview, resume/contact section
- `M.GURUCHARAN.jpg` — About page, personal journey, early-career timeline

## Step 1 — Upload the four files to Google Drive

Upload:

1. `DSC06218.JPG`
2. `M.GURUCHARAN.jpg`
3. `Guru_Charan_Mavuduru_ATS_Resume_2026(1).pdf`
4. `GuruCharan Mavuduru — Project Blog Collection.docx`

They may be uploaded anywhere temporarily because the script copies them into the final workspace.

## Step 2 — Copy each Drive file ID

Example Drive URL:

```text
https://drive.google.com/file/d/1AbCdEfGhIjKlMnOp/view
```

The file ID is:

```text
1AbCdEfGhIjKlMnOp
```

Also open the existing `Projects` folder and copy its folder ID. This is strongly recommended because several folders named `Projects` may exist.

## Step 3 — Create the Apps Script project

1. Open `https://script.google.com`
2. Select **New project**
3. Delete the sample `myFunction`
4. Paste the entire contents of `GuruCharan_Portfolio_Drive_Setup.gs`
5. Rename the project to `GuruCharan Portfolio Drive Generator`

## Step 4 — Update CONFIG

At the top of the script, fill:

```javascript
PROJECTS_FOLDER_ID: 'YOUR_PROJECTS_FOLDER_ID',

FILE_IDS: {
  PROFESSIONAL_HERO_PHOTO: 'DRIVE_ID_OF_DSC06218',
  SECONDARY_PROFILE_PHOTO: 'DRIVE_ID_OF_M_GURUCHARAN',
  RESUME_PDF: 'DRIVE_ID_OF_RESUME',
  BLOG_COLLECTION_DOCX_OR_GOOGLE_DOC: 'DRIVE_ID_OF_BLOG_COLLECTION'
}
```

Do not paste ChatGPT attachment IDs. Only Google Drive IDs work.

## Step 5 — Enable automatic DOCX conversion

This is only needed when the blog collection remains a DOCX.

In the Apps Script editor:

1. Open **Services**
2. Click **+**
3. Select **Drive API**
4. Click **Add**

Alternative: manually open the DOCX with Google Docs, save it as a Google Doc, and place that Google Doc ID in the configuration.

## Step 6 — Run the setup

1. Select `setupPortfolioWorkspace`
2. Click **Run**
3. Approve the Google authorization screen
4. Open **Execution log**
5. Open the generated portfolio root and registry links

The first authorization requests access to Drive, Docs, and Sheets because the script must create folders, copy files, generate Docs, and update the registry.

## Permission policy

All public-sharing switches are `false` by default:

```javascript
SHARING: {
  BLOG_DOCS_ANYONE_WITH_LINK: false,
  RESUME_ANYONE_WITH_LINK: false,
  PROFILE_IMAGES_ANYONE_WITH_LINK: false
}
```

Keep them false while reviewing content.

For a public GitHub Pages portfolio, later change only the required items to `true`, or share those files manually as **Viewer — Anyone with the link**.

Never make the complete `Personal Portfolio` folder publicly editable.

## Safe reruns

The script is idempotent for folders:

- Existing folders are reused
- Imported files with the target filename are reused
- Existing generated blog Docs are preserved by default
- Nothing is deleted

To deliberately rebuild generated blogs after changing the source collection:

```javascript
OVERWRITE_GENERATED_BLOG_DOCS: true
```

Then run:

```javascript
regenerateBlogDocs()
```

Return the setting to `false` afterward.

## Website workflow

The script generates:

```text
Personal Portfolio/data/portfolio-content.json
```

After checking the registry:

1. Download the JSON file
2. Add it to the website repository, for example:
   `src/data/portfolio-content.json`
3. Add optimised images to the GitHub repository instead of hotlinking large Drive originals
4. Use the Google Doc URLs as the initial **Open Blog** links
5. In the later version, convert blog Docs to Markdown/MDX for faster native pages

## Privacy checks before publication

Remove or hide:

- Private phone numbers unless intentionally published
- Student names or school-sensitive information
- Internal Drive folder IDs not required by visitors
- Wedding guest information and private photographs
- Credentials, tokens, API keys, logs, or real incident data
- Editing permissions

Use public **view-only** access for published content.
