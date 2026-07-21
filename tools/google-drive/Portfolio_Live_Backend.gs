/**
 * GURU CHARAN PORTFOLIO — LIVE DRIVE BLOGS + CONTACT BACKEND
 *
 * Deploy this file as a Google Apps Script web app.
 *
 * Features:
 * 1. Reads publishable Google Docs from your Drive "blogs" folder.
 * 2. Returns a JSONP feed that GitHub Pages can load without a rebuild.
 * 3. Serves a clean read-only blog page while the Google Doc can stay private.
 * 4. Receives the portfolio contact form and emails it to you.
 *
 * IMPORTANT:
 * - Paste your Blogs folder ID and contact email in CONFIG.
 * - Deploy as "Execute as: Me" and "Who has access: Anyone".
 * - Copy the /exec URL into src/data/integrations.ts in the portfolio repository.
 */

const CONFIG = Object.freeze({
  BLOGS_FOLDER_ID: 'PASTE_BLOGS_FOLDER_ID_HERE',
  CONTACT_TO: 'charanmavuduru9273@gmail.com',
  PORTFOLIO_URL: 'https://sarma9273.github.io/',
  CACHE_SECONDS: 60,
  MAX_BLOGS: 100,
  CONTACT_COOLDOWN_SECONDS: 60,
  CONTACT_SUBJECT_PREFIX: '[Portfolio]',
  SITE_NAME: 'Guru Charan Mavuduru',
});

/**
 * Optional helper. Run once if you want the script to find:
 * My Drive/Projects/Personal Portfolio/blogs
 */
function locatePortfolioBlogsFolder() {
  const projects = findChildFolder_(DriveApp.getRootFolder(), 'Projects');
  if (!projects) throw new Error('Projects folder not found in My Drive.');

  const portfolio = findChildFolder_(projects, 'Personal Portfolio');
  if (!portfolio) throw new Error('Personal Portfolio folder not found inside Projects.');

  const blogs = findChildFolder_(portfolio, 'blogs') || findChildFolder_(portfolio, 'Blogs');
  if (!blogs) throw new Error('blogs folder not found inside Personal Portfolio.');

  Logger.log('Blogs folder ID: ' + blogs.getId());
  Logger.log('Paste this ID into CONFIG.BLOGS_FOLDER_ID.');
  return blogs.getId();
}

function doGet(e) {
  const action = clean_(e && e.parameter && e.parameter.action) || 'health';

  if (action === 'blogs') {
    const payload = {
      ok: true,
      generatedAt: new Date().toISOString(),
      blogs: getBlogs_(Boolean(e && e.parameter && e.parameter.refresh)),
    };
    return jsonOrJsonp_(payload, e && e.parameter && e.parameter.callback);
  }

  if (action === 'read') {
    return renderBlogPage_(clean_(e && e.parameter && e.parameter.id));
  }

  if (action === 'health') {
    return jsonOrJsonp_({
      ok: true,
      service: 'Guru Charan Portfolio Backend',
      generatedAt: new Date().toISOString(),
    }, e && e.parameter && e.parameter.callback);
  }

  return jsonOrJsonp_({ ok: false, error: 'Unknown action.' }, e && e.parameter && e.parameter.callback);
}

function doPost(e) {
  const params = (e && e.parameter) || {};
  const action = clean_(params.action);

  if (action !== 'contact') {
    return contactResponse_('Unsupported request.', false);
  }

  try {
    processContact_(params);
    return contactResponse_('Message sent successfully.', true);
  } catch (error) {
    console.error(error && error.stack ? error.stack : error);
    return contactResponse_(
      'The message could not be sent. Please use the direct email link on the portfolio.',
      false
    );
  }
}

function getBlogs_(forceRefresh) {
  validateConfig_();

  const cache = CacheService.getScriptCache();
  const cacheKey = 'portfolio-live-blogs-v3';
  if (!forceRefresh) {
    const cached = cache.get(cacheKey);
    if (cached) return JSON.parse(cached);
  }

  const root = DriveApp.getFolderById(CONFIG.BLOGS_FOLDER_ID);
  const entries = [];

  // Preferred structure: one folder per blog.
  const subfolders = root.getFolders();
  while (subfolders.hasNext() && entries.length < CONFIG.MAX_BLOGS) {
    const folder = subfolders.next();
    const item = blogFromFolder_(folder);
    if (item) entries.push(item);
  }

  // Also support Google Docs placed directly inside the Blogs folder.
  const rootFiles = root.getFiles();
  while (rootFiles.hasNext() && entries.length < CONFIG.MAX_BLOGS) {
    const file = rootFiles.next();
    if (isGoogleDoc_(file)) {
      entries.push(blogFromDocument_(file, root));
    }
  }

  entries.sort(function(a, b) {
    return new Date(b.updatedAt).valueOf() - new Date(a.updatedAt).valueOf();
  });

  cache.put(cacheKey, JSON.stringify(entries), CONFIG.CACHE_SECONDS);
  return entries;
}

function blogFromFolder_(folder) {
  const files = folder.getFiles();
  let doc = null;
  let metadataFile = null;

  while (files.hasNext()) {
    const file = files.next();
    if (!doc && isGoogleDoc_(file)) doc = file;
    if (/^(portfolio\.meta|metadata)\.json$/i.test(file.getName())) metadataFile = file;
  }

  if (!doc) return null;

  const metadata = Object.assign(
    {},
    parseDescriptionMetadata_(folder.getDescription()),
    parseDescriptionMetadata_(doc.getDescription()),
    metadataFile ? readMetadataFile_(metadataFile) : {}
  );

  return buildBlogRecord_(doc, folder, metadata);
}

function blogFromDocument_(doc, parentFolder) {
  const metadata = parseDescriptionMetadata_(doc.getDescription());
  return buildBlogRecord_(doc, parentFolder, metadata);
}

function buildBlogRecord_(doc, folder, metadata) {
  const excerpt = getDocumentExcerpt_(doc.getId());
  const title = clean_(metadata.title) || cleanTitle_(doc.getName());
  const tags = normaliseTags_(metadata.tags);
  const domain = clean_(metadata.domain || metadata.category) || inferDomain_(title + ' ' + tags.join(' '));
  const description =
    clean_(metadata.description) ||
    clean_(excerpt) ||
    'A new learning note from Guru Charan’s projects, research and technical journey.';

  const serviceUrl = ScriptApp.getService().getUrl();
  const readUrl = serviceUrl
    ? serviceUrl + '?action=read&id=' + encodeURIComponent(doc.getId())
    : doc.getUrl();

  return {
    id: doc.getId(),
    slug: slugify_(metadata.slug || title),
    title: title,
    description: truncate_(description, 280),
    domain: domain,
    tags: tags,
    status: clean_(metadata.status) || 'Learning note',
    featured: String(metadata.featured).toLowerCase() === 'true',
    updatedAt: doc.getLastUpdated().toISOString(),
    folderName: folder.getName(),
    url: readUrl,
  };
}

function getDocumentExcerpt_(documentId) {
  try {
    const doc = DocumentApp.openById(documentId);
    const paragraphs = doc.getBody().getParagraphs();
    const meaningful = [];

    for (let i = 0; i < paragraphs.length; i++) {
      const text = clean_(paragraphs[i].getText());
      if (!text) continue;
      if (/^(project status|domain|tags|suggested google doc name)\s*:/i.test(text)) continue;
      if (text.length < 30 && meaningful.length === 0) continue;
      meaningful.push(text);
      if (meaningful.join(' ').length > 320) break;
    }

    return truncate_(meaningful.join(' '), 280);
  } catch (error) {
    return '';
  }
}

function renderBlogPage_(fileId) {
  validateConfig_();

  if (!fileId || !isAllowedBlogFile_(fileId)) {
    return HtmlService.createHtmlOutput(blogErrorHtml_('This blog could not be found.'))
      .setTitle('Blog not found');
  }

  const file = DriveApp.getFileById(fileId);
  if (!isGoogleDoc_(file)) {
    return HtmlService.createHtmlOutput(blogErrorHtml_('This item is not a Google Doc.'))
      .setTitle('Unsupported blog format');
  }

  const metadata = parseDescriptionMetadata_(file.getDescription());
  const doc = DocumentApp.openById(fileId);
  const title = clean_(metadata.title) || cleanTitle_(file.getName());
  const content = documentToHtml_(doc);

  const html = [
    '<!doctype html>',
    '<html lang="en"><head><meta charset="utf-8">',
    '<meta name="viewport" content="width=device-width,initial-scale=1">',
    '<meta name="robots" content="index,follow">',
    '<title>' + escapeHtml_(title) + ' | ' + escapeHtml_(CONFIG.SITE_NAME) + '</title>',
    '<style>',
    blogReaderCss_(),
    '</style></head><body>',
    '<header class="reader-header"><div class="reader-shell">',
    '<a class="back-link" href="' + escapeAttribute_(CONFIG.PORTFOLIO_URL + 'blogs/') + '">← Back to my learning notes</a>',
    '<a class="brand-link" href="' + escapeAttribute_(CONFIG.PORTFOLIO_URL) + '">' + escapeHtml_(CONFIG.SITE_NAME) + '</a>',
    '</div></header>',
    '<main class="reader-shell reader-main">',
    '<p class="eyebrow">' + escapeHtml_(clean_(metadata.domain || metadata.category) || 'Learning note') + '</p>',
    '<h1>' + escapeHtml_(title) + '</h1>',
    '<p class="updated">Updated ' + Utilities.formatDate(file.getLastUpdated(), Session.getScriptTimeZone() || 'Asia/Kolkata', 'dd MMM yyyy') + ' · Live from Google Drive</p>',
    '<article class="prose">' + content + '</article>',
    '<aside class="author-note"><strong>About this notebook</strong><p>I use these articles to document projects, research, problems, fixes and lessons while I learn in public.</p><a href="' + escapeAttribute_(CONFIG.PORTFOLIO_URL + 'contact/') + '">Start a conversation →</a></aside>',
    '</main></body></html>',
  ].join('');

  return HtmlService.createHtmlOutput(html)
    .setTitle(title)
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function documentToHtml_(doc) {
  const body = doc.getBody();
  const output = [];
  let listOpen = false;

  function closeList() {
    if (listOpen) {
      output.push('</ul>');
      listOpen = false;
    }
  }

  for (let i = 0; i < body.getNumChildren(); i++) {
    const child = body.getChild(i);
    const type = child.getType();

    if (type === DocumentApp.ElementType.PARAGRAPH) {
      closeList();
      const paragraph = child.asParagraph();
      const text = clean_(paragraph.getText());
      if (!text) continue;
      const heading = paragraph.getHeading();

      if (heading === DocumentApp.ParagraphHeading.TITLE) continue;
      if (heading === DocumentApp.ParagraphHeading.HEADING1) {
        output.push('<h2>' + escapeHtml_(text) + '</h2>');
      } else if (heading === DocumentApp.ParagraphHeading.HEADING2) {
        output.push('<h2>' + escapeHtml_(text) + '</h2>');
      } else if (heading === DocumentApp.ParagraphHeading.HEADING3) {
        output.push('<h3>' + escapeHtml_(text) + '</h3>');
      } else {
        output.push('<p>' + linkify_(escapeHtml_(text)) + '</p>');
      }
    } else if (type === DocumentApp.ElementType.LIST_ITEM) {
      const text = clean_(child.asListItem().getText());
      if (!text) continue;
      if (!listOpen) {
        output.push('<ul>');
        listOpen = true;
      }
      output.push('<li>' + linkify_(escapeHtml_(text)) + '</li>');
    } else if (type === DocumentApp.ElementType.TABLE) {
      closeList();
      const table = child.asTable();
      output.push('<div class="table-wrap"><table>');
      for (let r = 0; r < table.getNumRows(); r++) {
        output.push('<tr>');
        const row = table.getRow(r);
        for (let c = 0; c < row.getNumCells(); c++) {
          output.push('<td>' + escapeHtml_(row.getCell(c).getText()) + '</td>');
        }
        output.push('</tr>');
      }
      output.push('</table></div>');
    } else if (type === DocumentApp.ElementType.HORIZONTAL_RULE) {
      closeList();
      output.push('<hr>');
    }
  }

  closeList();
  return output.join('');
}

function processContact_(params) {
  validateConfig_();

  if (clean_(params.company_website)) {
    throw new Error('Spam submission blocked.');
  }

  const name = clean_(params.name);
  const email = clean_(params.email).toLowerCase();
  const topic = clean_(params.topic);
  const subject = clean_(params.subject);
  const message = clean_(params.message);
  const source = clean_(params.source);

  if (!name || name.length > 80) throw new Error('Invalid name.');
  if (!isEmail_(email) || email.length > 140) throw new Error('Invalid email.');
  if (!subject || subject.length > 150) throw new Error('Invalid subject.');
  if (message.length < 20 || message.length > 4000) throw new Error('Invalid message.');
  if (source !== 'sarma9273.github.io') throw new Error('Invalid source.');

  const cache = CacheService.getScriptCache();
  const rateKey = 'contact-' + Utilities.base64EncodeWebSafe(
    Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, email)
  ).slice(0, 28);

  if (cache.get(rateKey)) throw new Error('Please wait before sending another message.');
  cache.put(rateKey, '1', CONFIG.CONTACT_COOLDOWN_SECONDS);

  const safeSubject = CONFIG.CONTACT_SUBJECT_PREFIX + ' ' + (topic ? topic + ' — ' : '') + subject;
  const plainBody = [
    'New portfolio enquiry',
    '',
    'Name: ' + name,
    'Email: ' + email,
    'Topic: ' + (topic || 'Not specified'),
    'Source: ' + source,
    '',
    'Message:',
    message,
  ].join('\n');

  const htmlBody = [
    '<h2>New portfolio enquiry</h2>',
    '<p><strong>Name:</strong> ' + escapeHtml_(name) + '</p>',
    '<p><strong>Email:</strong> ' + escapeHtml_(email) + '</p>',
    '<p><strong>Topic:</strong> ' + escapeHtml_(topic || 'Not specified') + '</p>',
    '<p><strong>Subject:</strong> ' + escapeHtml_(subject) + '</p>',
    '<hr>',
    '<p style="white-space:pre-wrap">' + escapeHtml_(message) + '</p>',
    '<hr>',
    '<p><a href="mailto:' + escapeAttribute_(email) + '">Reply to ' + escapeHtml_(name) + '</a></p>',
  ].join('');

  MailApp.sendEmail({
    to: CONFIG.CONTACT_TO,
    subject: safeSubject,
    body: plainBody,
    htmlBody: htmlBody,
    replyTo: email,
    name: 'Guru Charan Portfolio',
  });
}

function contactResponse_(message, success) {
  const colour = success ? '#55d6be' : '#ff8c5a';
  const html = [
    '<!doctype html><html><head><meta charset="utf-8">',
    '<meta name="viewport" content="width=device-width,initial-scale=1">',
    '<style>body{margin:0;padding:18px;background:#0b111c;color:#eef4fb;font:16px/1.5 system-ui}div{border:1px solid #26344a;border-radius:14px;padding:18px}strong{color:' + colour + '}</style>',
    '</head><body><div><strong>' + (success ? 'Sent' : 'Not sent') + '</strong><p>' + escapeHtml_(message) + '</p></div></body></html>',
  ].join('');
  return HtmlService.createHtmlOutput(html);
}

function jsonOrJsonp_(payload, callback) {
  const json = JSON.stringify(payload);
  const safeCallback = clean_(callback);

  if (safeCallback && /^[A-Za-z_$][0-9A-Za-z_$.]*$/.test(safeCallback)) {
    return ContentService
      .createTextOutput(safeCallback + '(' + json + ');')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }

  return ContentService
    .createTextOutput(json)
    .setMimeType(ContentService.MimeType.JSON);
}

function isAllowedBlogFile_(fileId) {
  try {
    const rootId = CONFIG.BLOGS_FOLDER_ID;
    const file = DriveApp.getFileById(fileId);
    const parents = file.getParents();

    while (parents.hasNext()) {
      const parent = parents.next();
      if (parent.getId() === rootId) return true;

      const grandparents = parent.getParents();
      while (grandparents.hasNext()) {
        if (grandparents.next().getId() === rootId) return true;
      }
    }
  } catch (error) {
    return false;
  }
  return false;
}

function readMetadataFile_(file) {
  try {
    return JSON.parse(file.getBlob().getDataAsString('UTF-8'));
  } catch (error) {
    return {};
  }
}

function parseDescriptionMetadata_(description) {
  const result = {};
  const text = clean_(description);
  if (!text) return result;

  text.split(/\r?\n/).forEach(function(line) {
    const match = line.match(/^([A-Za-z][A-Za-z ]{1,30})\s*:\s*(.+)$/);
    if (!match) return;
    const key = match[1].trim().toLowerCase().replace(/\s+/g, '');
    result[key] = match[2].trim();
  });

  return result;
}

function normaliseTags_(value) {
  if (Array.isArray(value)) return value.map(clean_).filter(Boolean);
  return clean_(value)
    .split(/[,|]/)
    .map(clean_)
    .filter(Boolean);
}

function inferDomain_(text) {
  const value = String(text || '').toLowerCase();
  if (/soc|cyber|security|kali|incident|threat/.test(value)) return 'Cybersecurity';
  if (/ai|machine learning|data science|faiss|nlp/.test(value)) return 'AI & Data Science';
  if (/solar|mppt|renewable|simulink|matlab/.test(value)) return 'Engineering Research';
  if (/teaching|school|education|learning/.test(value)) return 'Education Technology';
  if (/web|portfolio|react|astro|frontend/.test(value)) return 'Web Development';
  if (/saas|startup|automation|sahaaya/.test(value)) return 'Product & Automation';
  return 'Technical Learning';
}

function findChildFolder_(parent, name) {
  const folders = parent.getFoldersByName(name);
  return folders.hasNext() ? folders.next() : null;
}

function isGoogleDoc_(file) {
  return file.getMimeType() === MimeType.GOOGLE_DOCS;
}

function validateConfig_() {
  if (!CONFIG.BLOGS_FOLDER_ID || CONFIG.BLOGS_FOLDER_ID.indexOf('PASTE_') === 0) {
    throw new Error('Set CONFIG.BLOGS_FOLDER_ID before deploying.');
  }
  if (!isEmail_(CONFIG.CONTACT_TO)) {
    throw new Error('Set a valid CONFIG.CONTACT_TO email.');
  }
}

function cleanTitle_(value) {
  return clean_(value)
    .replace(/^\d+[_\-\s]*/, '')
    .replace(/[_]+/g, ' ')
    .replace(/\s+/g, ' ');
}

function slugify_(value) {
  return clean_(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 100);
}

function truncate_(value, maxLength) {
  const text = clean_(value);
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 1).replace(/\s+\S*$/, '') + '…';
}

function clean_(value) {
  return String(value == null ? '' : value).trim();
}

function isEmail_(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean_(value));
}

function escapeHtml_(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function escapeAttribute_(value) {
  return escapeHtml_(value);
}

function linkify_(text) {
  return text.replace(
    /(https?:\/\/[^\s<]+)/g,
    '<a href="$1" target="_blank" rel="noreferrer">$1</a>'
  );
}

function blogErrorHtml_(message) {
  return [
    '<!doctype html><html><head><meta charset="utf-8">',
    '<meta name="viewport" content="width=device-width,initial-scale=1">',
    '<style>' + blogReaderCss_() + '</style></head><body>',
    '<main class="reader-shell reader-main"><p class="eyebrow">Learning note</p>',
    '<h1>Unable to open this article</h1><p>' + escapeHtml_(message) + '</p>',
    '<p><a href="' + escapeAttribute_(CONFIG.PORTFOLIO_URL + 'blogs/') + '">Return to the blog collection →</a></p>',
    '</main></body></html>',
  ].join('');
}

function blogReaderCss_() {
  return [
    ':root{color-scheme:dark;--bg:#090d16;--surface:#111827;--text:#edf3fa;--muted:#afbed0;--accent:#ff9566;--line:#28364b}',
    '*{box-sizing:border-box}body{margin:0;background:radial-gradient(circle at 85% 0,#342139 0,transparent 32%),var(--bg);color:var(--text);font:17px/1.8 Inter,system-ui,-apple-system,Segoe UI,sans-serif}',
    'a{color:inherit}.reader-shell{width:min(calc(100% - 32px),860px);margin:auto}.reader-header{position:sticky;top:0;background:rgba(9,13,22,.86);backdrop-filter:blur(16px);border-bottom:1px solid var(--line)}',
    '.reader-header .reader-shell{min-height:68px;display:flex;align-items:center;justify-content:space-between;gap:20px}.back-link,.brand-link{text-decoration:none;font-weight:700}.back-link{color:var(--muted);font-size:.9rem}',
    '.reader-main{padding:74px 0 100px}.eyebrow{color:var(--accent);font-size:.78rem;font-weight:850;letter-spacing:.15em;text-transform:uppercase}.reader-main h1{font-size:clamp(2.5rem,8vw,5rem);line-height:1;letter-spacing:-.055em;margin:.2em 0}.updated{color:var(--muted);font-size:.88rem;margin-bottom:54px}',
    '.prose h2{font-size:clamp(1.6rem,4vw,2.35rem);line-height:1.2;margin:2.1em 0 .6em}.prose h3{font-size:1.35rem;margin:1.8em 0 .5em}.prose p,.prose li{color:var(--muted)}',
    '.prose a{color:var(--accent);text-underline-offset:3px}.prose ul{padding-left:1.3em}.prose li+li{margin-top:.45em}.prose hr{border:0;border-top:1px solid var(--line);margin:2.5rem 0}',
    '.table-wrap{overflow:auto}.prose table{width:100%;border-collapse:collapse}.prose td{border:1px solid var(--line);padding:10px;vertical-align:top;color:var(--muted)}',
    '.author-note{margin-top:60px;padding:24px;border:1px solid var(--line);border-radius:18px;background:var(--surface)}.author-note p{color:var(--muted)}.author-note a{color:var(--accent);font-weight:750;text-decoration:none}',
    '@media(max-width:600px){body{font-size:16px}.reader-header .reader-shell{align-items:flex-start;flex-direction:column;padding:12px 0;gap:2px}.reader-main{padding-top:50px}}',
  ].join('');
}
