/**
 * GURU CHARAN MAVUDURU — PERSONAL PORTFOLIO DRIVE WORKSPACE GENERATOR
 *
 * Main function: setupPortfolioWorkspace()
 *
 * What it does:
 * 1. Finds or creates My Drive/Projects.
 * 2. Reuses or creates Projects/Personal Portfolio.
 * 3. Creates an idempotent folder structure for source assets, projects, blogs,
 *    reports, resume, data, documentation, and imports.
 * 4. Creates a Portfolio Content Registry spreadsheet.
 * 5. Optionally copies the professional photo, secondary photo, resume PDF,
 *    and project-blog collection into the correct folders using Drive file IDs.
 * 6. Optionally converts a DOCX blog collection into a Google Doc by using the
 *    Advanced Drive service.
 * 7. Splits the master collection into ten individual formatted Google Docs.
 * 8. Creates a JSON manifest that can later be copied into the GitHub portfolio.
 *
 * Safety:
 * - The script does not delete files.
 * - It reuses existing folders instead of creating duplicates.
 * - Public sharing is OFF by default.
 * - Imported files are copied, not moved.
 *
 * Optional requirement:
 * To convert DOCX automatically, enable the Advanced Drive service:
 * Apps Script editor -> Services (+) -> Drive API -> Add.
 */

const CONFIG = Object.freeze({
  // Best option: paste the ID of your existing "Projects" folder here.
  // Leave blank to use/create a direct child named "Projects" in My Drive.
  PROJECTS_FOLDER_ID: '',

  PROJECTS_FOLDER_NAME: 'Projects',
  PORTFOLIO_FOLDER_NAME: 'Personal Portfolio',

  // Paste GOOGLE DRIVE file IDs here after uploading the four source files.
  // These are Drive IDs, not ChatGPT attachment IDs.
  FILE_IDS: Object.freeze({
    PROFESSIONAL_HERO_PHOTO: '', // Recommended: DSC06218.JPG (blazer photo)
    SECONDARY_PROFILE_PHOTO: '', // Recommended: M.GURUCHARAN.jpg
    RESUME_PDF: '',
    BLOG_COLLECTION_DOCX_OR_GOOGLE_DOC: ''
  }),

  IMPORT_MODE: 'COPY', // COPY is safest. MOVE is intentionally unsupported.

  // When false, an existing generated blog Doc is preserved.
  OVERWRITE_GENERATED_BLOG_DOCS: false,

  // Public sharing is deliberately disabled.
  // Turn on only after reviewing every generated item.
  SHARING: Object.freeze({
    BLOG_DOCS_ANYONE_WITH_LINK: false,
    RESUME_ANYONE_WITH_LINK: false,
    PROFILE_IMAGES_ANYONE_WITH_LINK: false
  }),

  // If the input collection is DOCX, conversion requires Advanced Drive.
  TRY_ADVANCED_DRIVE_DOCX_CONVERSION: true,

  TIME_ZONE: 'Asia/Kolkata'
});

const BLOGS = Object.freeze([
  {
    order: 1,
    slug: 'cybergpt-incident-response-copilot',
    folderName: '01_CyberGPT_Incident_Response_Copilot',
    docName: 'CyberGPT – AI-Powered Security Incident Response Copilot',
    title: 'CyberGPT — Building an Intelligent Incident Response Copilot for Security Operations',
    status: 'Functional research prototype with ongoing improvements',
    category: 'Artificial Intelligence, Cybersecurity, SOC Automation',
    description: 'An AI-powered SOC copilot that analyses incident narratives, maps likely attacks to MITRE ATT&CK, detects potentially novel threats, and generates structured response guidance.',
    tags: ['Artificial Intelligence', 'Cybersecurity', 'SOC', 'FAISS', 'NLP', 'MITRE ATT&CK', 'Incident Response', 'Threat Detection']
  },
  {
    order: 2,
    slug: 'practical-soc-home-lab',
    folderName: '02_Practical_SOC_Home_Lab',
    docName: 'Practical SOC Home Lab – Threat Detection and Incident Response',
    title: 'Designing a Practical SOC Home Lab for Threat Detection and Incident Response',
    status: 'Implemented in multiple phases with continued expansion',
    category: 'Cybersecurity, SOC Operations, Security Monitoring',
    description: 'A virtual SOC lab using Kali Linux, Windows 10, Ubuntu Server, Splunk, Sysmon, and Windows auditing to simulate, detect, and investigate security activity.',
    tags: ['SOC', 'Cybersecurity Lab', 'Splunk', 'Sysmon', 'Kali Linux', 'Incident Response', 'SIEM', 'Threat Detection']
  },
  {
    order: 3,
    slug: 'python-network-traffic-analyser',
    folderName: '03_Network_Traffic_Analyser',
    docName: 'Python Network Traffic Analyser and SOC Dashboard',
    title: 'Building a Python-Based Network Traffic Analyser and SOC Dashboard',
    status: 'Core analysis and dashboard phases completed; further automation planned',
    category: 'Network Security, Python, SOC Monitoring',
    description: 'A Python-based network-security project that transforms traffic-related information into clear indicators and a simplified SOC-style dashboard.',
    tags: ['Python', 'Network Security', 'SOC Dashboard', 'Traffic Analysis', 'Cybersecurity', 'Data Analysis']
  },
  {
    order: 4,
    slug: 'sahaaya360-digital-operations-platform',
    folderName: '04_Sahaaya360',
    docName: 'Sahaaya360 – Digital Operations and Support Platform',
    title: 'Sahaaya360 — Developing a Digital Operations and Support Platform',
    status: 'MVP-oriented prototype and startup concept',
    category: 'SaaS, Institutional Operations, Automation',
    description: 'A low-cost platform for tickets, assets, vendors, safety checks, cyber incidents, compliance readiness, and operational reporting using Google Workspace automation.',
    tags: ['SaaS', 'Google Apps Script', 'Automation', 'Startup', 'Institutional Management', 'Product Development']
  },
  {
    order: 5,
    slug: 'osprey-mppt-solar-pv',
    folderName: '05_Osprey_MPPT_Solar_PV',
    docName: 'Osprey-Based MPPT for Solar PV Systems',
    title: 'Osprey-Based MPPT for Solar PV Systems Under Partial Shading',
    status: 'Academic research and simulation project',
    category: 'Electrical Engineering, Renewable Energy, Optimisation',
    description: 'A MATLAB and Simulink research project comparing PSO, Osprey Optimisation, and a modified Osprey approach for MPPT under partial shading.',
    tags: ['Solar PV', 'MPPT', 'MATLAB', 'Simulink', 'Optimisation', 'Renewable Energy', 'Partial Shading']
  },
  {
    order: 6,
    slug: 'personal-portfolio-brand-platform',
    folderName: '06_Personal_Portfolio_Platform',
    docName: 'Personal Portfolio and Technical Blog Platform',
    title: 'Rebuilding My Personal Portfolio as a Technical Brand Platform',
    status: 'Major upgrade in progress',
    category: 'Web Development, Personal Branding, Technical Documentation',
    description: 'A redesigned portfolio platform for presenting education, experience, research, technical projects, blogs, documentation, repositories, and long-term professional growth.',
    tags: ['Portfolio', 'Personal Branding', 'React', 'Web Development', 'Technical Blogging', 'GitHub']
  },
  {
    order: 7,
    slug: 'dynamic-wedding-invitation',
    folderName: '07_Dynamic_Wedding_Invitation',
    docName: 'Mavudurus Dynamic Wedding Invitation Platform',
    title: 'Creating a Dynamic Digital Wedding Invitation Platform',
    status: 'Functional platform with ongoing content and design refinements',
    category: 'Web Development, Event Technology, Digital Experience Design',
    description: 'A responsive digital wedding invitation platform for events, family sections, invitation details, galleries, locations, and a polished mobile guest experience.',
    tags: ['Wedding Website', 'React', 'Event Platform', 'Responsive Design', 'Digital Invitation', 'Frontend Development']
  },
  {
    order: 8,
    slug: 'school-lab-shared-learning-network',
    folderName: '08_School_Lab_Shared_Network',
    docName: 'School Computer Lab Shared Learning Network',
    title: 'Creating a Shared Digital Learning Environment for a School Computer Lab',
    status: 'Implemented as part of teaching responsibilities',
    category: 'Education Technology, Networking, Computer-Lab Management',
    description: 'A shared computer-lab environment for distributing programming exercises, learning materials, and student resources through an organised network drive.',
    tags: ['Education Technology', 'Computer Lab', 'Networking', 'Teaching', 'Shared Drive', 'Digital Learning']
  },
  {
    order: 9,
    slug: 'early-web-development-projects',
    folderName: '09_Early_Web_Development_Projects',
    docName: 'Early Web Development Projects and Learning Journey',
    title: 'My Early Web-Development Projects — From Landing Pages to Interactive Tools',
    status: 'Completed learning projects',
    category: 'Frontend Web Development',
    description: 'A collection of foundational projects including landing pages, a portfolio, a temperature converter, and interface-recreation exercises built with HTML, CSS, and JavaScript.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Web Development', 'Portfolio', 'Frontend', 'Learning Projects']
  },
  {
    order: 10,
    slug: 'thirty-days-kali-tools',
    folderName: '10_Thirty_Days_Kali_Tools',
    docName: '30 Days 30 Kali Linux Tools Learning Series',
    title: '30 Days, 30 Kali Linux Tools — Learning Cybersecurity Through Consistent Practice',
    status: 'Learning and technical-content initiative',
    category: 'Cybersecurity Education, Kali Linux, Personal Learning',
    description: 'A structured series studying one Kali Linux tool per day, including its purpose, workflow, defensive relevance, laboratory use, and ethical boundaries.',
    tags: ['Kali Linux', 'Cybersecurity Learning', 'Ethical Hacking', 'Virtual Lab', 'Technical Content', 'Skill Development']
  }
]);

const PROJECT_FOLDERS = Object.freeze([
  '01_CyberGPT',
  '02_SOC_Home_Lab',
  '03_Network_Traffic_Analyser',
  '04_Sahaaya360',
  '05_Osprey_MPPT_Research',
  '06_Portfolio_V2',
  '07_Wedding_Invitation_Platform',
  '08_School_Lab_Shared_Network',
  '09_Early_Web_Projects',
  '10_Thirty_Days_Kali_Tools'
]);

const AUTHOR_BIO =
  'I am Guru Charan Mavuduru, a B.Tech graduate in Electrical and Electronics ' +
  'Engineering and an M.Tech student in Artificial Intelligence and Data Science ' +
  'Engineering at IIT Patna. My interests include artificial intelligence, ' +
  'cybersecurity, security operations, data science, automation, renewable-energy ' +
  'optimisation, and practical technology education.\n\n' +
  'LinkedIn: https://www.linkedin.com/in/gurucharanmavuduru\n' +
  'GitHub: https://github.com/Sarma9273\n' +
  'Email: charanmavuduru9273@gmail.com';

const CYBERSECURITY_DISCLAIMER =
  'All cybersecurity exercises described in this article were conducted or planned ' +
  'within controlled laboratory environments and intentionally vulnerable systems ' +
  'for educational and defensive-security purposes. Security testing must only be ' +
  'performed on systems that you own or for which you have explicit authorisation.';

/**
 * MAIN FUNCTION.
 * Run this function first.
 */
function setupPortfolioWorkspace() {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);

  try {
    const projectsFolder = getProjectsFolder_();
    const portfolioRoot = getOrCreateFolder_(projectsFolder, CONFIG.PORTFOLIO_FOLDER_NAME);

    const folders = buildFolderStructure_(portfolioRoot);
    const imported = importConfiguredFiles_(folders);
    const registry = createOrUpdateRegistry_(portfolioRoot, folders, imported);

    let masterBlogDocId = imported.masterBlogGoogleDocId || '';
    if (masterBlogDocId) {
      generateIndividualBlogDocs_(masterBlogDocId, folders, registry);
    } else {
      writeSetupLog_(
        registry,
        'INFO',
        'Blog splitting skipped',
        'Add BLOG_COLLECTION_DOCX_OR_GOOGLE_DOC in CONFIG.FILE_IDS, then run setupPortfolioWorkspace() again.'
      );
    }

    createOrUpdateReadme_(portfolioRoot, folders, registry, imported);
    createOrUpdateManifest_(folders, registry);
    applyConfiguredSharing_(folders, imported, registry);

    SpreadsheetApp.flush();

    const summary = [
      'Portfolio workspace is ready.',
      'Root: ' + portfolioRoot.getUrl(),
      'Registry: ' + registry.getUrl(),
      'Public sharing remains ' + (
        CONFIG.SHARING.BLOG_DOCS_ANYONE_WITH_LINK ||
        CONFIG.SHARING.RESUME_ANYONE_WITH_LINK ||
        CONFIG.SHARING.PROFILE_IMAGES_ANYONE_WITH_LINK
          ? 'partly enabled according to CONFIG.'
          : 'OFF.'
      )
    ].join('\n');

    console.log(summary);
    return summary;
  } catch (error) {
    console.error(error && error.stack ? error.stack : error);
    throw error;
  } finally {
    lock.releaseLock();
  }
}

/**
 * Run after adding blog covers, changing descriptions, or editing blog documents.
 */
function refreshPortfolioManifest() {
  const projectsFolder = getProjectsFolder_();
  const portfolioRoot = getOrCreateFolder_(projectsFolder, CONFIG.PORTFOLIO_FOLDER_NAME);
  const folders = buildFolderStructure_(portfolioRoot);
  const registry = getRegistrySpreadsheet_(portfolioRoot);

  if (!registry) {
    throw new Error('Portfolio Content Registry was not found. Run setupPortfolioWorkspace() first.');
  }

  createOrUpdateManifest_(folders, registry);
  console.log('Manifest refreshed: ' + folders.data.getUrl());
}

/**
 * Optional helper: only regenerates individual blog Docs from the configured master.
 */
function regenerateBlogDocs() {
  const inputId = cleanId_(CONFIG.FILE_IDS.BLOG_COLLECTION_DOCX_OR_GOOGLE_DOC);
  if (!inputId) {
    throw new Error('Add BLOG_COLLECTION_DOCX_OR_GOOGLE_DOC in CONFIG.FILE_IDS first.');
  }

  const projectsFolder = getProjectsFolder_();
  const portfolioRoot = getOrCreateFolder_(projectsFolder, CONFIG.PORTFOLIO_FOLDER_NAME);
  const folders = buildFolderStructure_(portfolioRoot);
  const registry = getRegistrySpreadsheet_(portfolioRoot) ||
    createOrUpdateRegistry_(portfolioRoot, folders, {});

  const masterDocId = ensureGoogleDocCopy_(inputId, folders.imports, registry);
  generateIndividualBlogDocs_(masterDocId, folders, registry);
  createOrUpdateManifest_(folders, registry);
}

/**
 * Creates or reuses the Projects folder.
 */
function getProjectsFolder_() {
  const configuredId = cleanId_(CONFIG.PROJECTS_FOLDER_ID);
  if (configuredId) {
    const folder = DriveApp.getFolderById(configuredId);
    if (folder.isTrashed()) {
      throw new Error('The configured Projects folder is in Trash.');
    }
    return folder;
  }

  const root = DriveApp.getRootFolder();
  const matches = root.getFoldersByName(CONFIG.PROJECTS_FOLDER_NAME);

  if (matches.hasNext()) {
    const first = matches.next();
    if (matches.hasNext()) {
      console.warn(
        'Multiple root-level folders named "' + CONFIG.PROJECTS_FOLDER_NAME +
        '" exist. The first match was used. Set PROJECTS_FOLDER_ID to remove ambiguity.'
      );
    }
    return first;
  }

  return root.createFolder(CONFIG.PROJECTS_FOLDER_NAME);
}

/**
 * Builds the complete structure without duplicating existing folders.
 */
function buildFolderStructure_(portfolioRoot) {
  const folders = {
    root: portfolioRoot,
    source: getOrCreateFolder_(portfolioRoot, 'source'),
    blogs: getOrCreateFolder_(portfolioRoot, 'blogs'),
    docs: getOrCreateFolder_(portfolioRoot, 'docs'),
    resume: getOrCreateFolder_(portfolioRoot, 'resume'),
    reports: getOrCreateFolder_(portfolioRoot, 'reports'),
    data: getOrCreateFolder_(portfolioRoot, 'data'),
    imports: getOrCreateFolder_(portfolioRoot, 'imports'),
    archive: getOrCreateFolder_(portfolioRoot, 'archive')
  };

  folders.sourceBrand = getOrCreateFolder_(folders.source, 'brand');
  folders.sourceProfile = getOrCreateFolder_(folders.source, 'profile');
  folders.sourceProjects = getOrCreateFolder_(folders.source, 'projects');
  folders.sourceBlogCovers = getOrCreateFolder_(folders.source, 'blog-covers');
  folders.sourceCertificates = getOrCreateFolder_(folders.source, 'certificates');
  folders.sourceExperience = getOrCreateFolder_(folders.source, 'experience');
  folders.sourceSocial = getOrCreateFolder_(folders.source, 'social-media');

  folders.projectFolders = {};
  PROJECT_FOLDERS.forEach(function(name) {
    folders.projectFolders[name] = getOrCreateFolder_(folders.sourceProjects, name);
  });

  folders.blogFolders = {};
  BLOGS.forEach(function(blog) {
    const blogFolder = getOrCreateFolder_(folders.blogs, blog.folderName);
    folders.blogFolders[blog.order] = blogFolder;
    createBlogAssetChecklist_(blogFolder, blog);
  });

  getOrCreateFolder_(folders.docs, 'code-guides');
  getOrCreateFolder_(folders.docs, 'brand-guides');
  getOrCreateFolder_(folders.docs, 'deployment');
  getOrCreateFolder_(folders.docs, 'project-reports');
  getOrCreateFolder_(folders.reports, 'portfolio-audits');
  getOrCreateFolder_(folders.reports, 'analytics');

  return folders;
}

function getOrCreateFolder_(parent, name) {
  const folders = parent.getFoldersByName(name);
  if (folders.hasNext()) {
    return folders.next();
  }
  return parent.createFolder(name);
}

/**
 * Imports files by copying them, so originals remain untouched.
 */
function importConfiguredFiles_(folders) {
  const result = {
    heroPhotoFile: null,
    secondaryPhotoFile: null,
    resumeFile: null,
    masterBlogSourceFile: null,
    masterBlogGoogleDocId: ''
  };

  const heroId = cleanId_(CONFIG.FILE_IDS.PROFESSIONAL_HERO_PHOTO);
  const secondaryId = cleanId_(CONFIG.FILE_IDS.SECONDARY_PROFILE_PHOTO);
  const resumeId = cleanId_(CONFIG.FILE_IDS.RESUME_PDF);
  const blogId = cleanId_(CONFIG.FILE_IDS.BLOG_COLLECTION_DOCX_OR_GOOGLE_DOC);

  if (heroId) {
    result.heroPhotoFile = copyFileOnce_(
      heroId,
      folders.sourceProfile,
      'guru-charan-mavuduru-professional-hero.jpg'
    );
  }

  if (secondaryId) {
    result.secondaryPhotoFile = copyFileOnce_(
      secondaryId,
      folders.sourceProfile,
      'guru-charan-mavuduru-secondary-profile.jpg'
    );
  }

  if (resumeId) {
    result.resumeFile = copyFileOnce_(
      resumeId,
      folders.resume,
      'Guru_Charan_Mavuduru_ATS_Resume_2026.pdf'
    );
  }

  if (blogId) {
    result.masterBlogSourceFile = copyFileOnce_(
      blogId,
      folders.imports,
      'GuruCharan Mavuduru — Project Blog Collection (Master Source)'
    );
    result.masterBlogGoogleDocId = ensureGoogleDocCopy_(
      result.masterBlogSourceFile.getId(),
      folders.imports,
      null
    );
  }

  return result;
}

function copyFileOnce_(sourceId, destinationFolder, targetName) {
  const existing = destinationFolder.getFilesByName(targetName);
  if (existing.hasNext()) {
    return existing.next();
  }

  const source = DriveApp.getFileById(sourceId);
  if (source.isTrashed()) {
    throw new Error('Source file is in Trash: ' + source.getName());
  }

  return source.makeCopy(targetName, destinationFolder);
}

/**
 * Returns a Google Doc ID.
 * If the input is DOCX, it attempts conversion through Advanced Drive API v3.
 */
function ensureGoogleDocCopy_(inputFileId, destinationFolder, registry) {
  const inputFile = DriveApp.getFileById(inputFileId);
  const mimeType = inputFile.getMimeType();
  const googleDocMime = 'application/vnd.google-apps.document';

  if (mimeType === googleDocMime) {
    const targetName = 'GuruCharan Project Blog Collection — Working Google Doc';
    const existing = destinationFolder.getFilesByName(targetName);
    if (existing.hasNext()) {
      return existing.next().getId();
    }
    return inputFile.makeCopy(targetName, destinationFolder).getId();
  }

  const isDocx =
    mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    /\.docx$/i.test(inputFile.getName());

  if (!isDocx) {
    throw new Error(
      'The blog collection must be a Google Doc or DOCX. Detected: ' + mimeType
    );
  }

  if (!CONFIG.TRY_ADVANCED_DRIVE_DOCX_CONVERSION) {
    throw new Error(
      'DOCX conversion is disabled. Open the DOCX in Google Docs, save it as a Google Doc, and paste that Google Doc ID into CONFIG.'
    );
  }

  const convertedName = 'GuruCharan Project Blog Collection — Converted Google Doc';
  const existing = destinationFolder.getFilesByName(convertedName);
  if (existing.hasNext()) {
    return existing.next().getId();
  }

  try {
    const metadata = {
      name: convertedName,
      mimeType: googleDocMime,
      parents: [destinationFolder.getId()]
    };
    const converted = Drive.Files.create(
      metadata,
      inputFile.getBlob(),
      {fields: 'id,name,mimeType'}
    );
    return converted.id;
  } catch (error) {
    const message =
      'Automatic DOCX conversion failed. Enable Apps Script Services > Drive API, ' +
      'or manually open the DOCX with Google Docs and paste the converted Google Doc ID. ' +
      'Original error: ' + error.message;

    if (registry) {
      writeSetupLog_(registry, 'ERROR', 'DOCX conversion failed', message);
    }
    throw new Error(message);
  }
}

/**
 * Creates/updates the control spreadsheet.
 */
function createOrUpdateRegistry_(portfolioRoot, folders, imported) {
  let registry = getRegistrySpreadsheet_(portfolioRoot);

  if (!registry) {
    registry = SpreadsheetApp.create('Portfolio Content Registry');
    DriveApp.getFileById(registry.getId()).moveTo(portfolioRoot);
  }

  registry.setSpreadsheetTimeZone(CONFIG.TIME_ZONE);

  const settings = ensureSheet_(registry, 'Settings');
  const blogsSheet = ensureSheet_(registry, 'Blogs');
  const projectsSheet = ensureSheet_(registry, 'Projects');
  const assetsSheet = ensureSheet_(registry, 'Assets');
  ensureSheet_(registry, 'Setup Log');

  writeSettingsSheet_(settings, portfolioRoot, folders);
  writeBlogsSheet_(blogsSheet, folders);
  writeProjectsSheet_(projectsSheet, folders);
  writeAssetsSheet_(assetsSheet, folders, imported || {});

  return registry;
}

function getRegistrySpreadsheet_(portfolioRoot) {
  const files = portfolioRoot.getFilesByName('Portfolio Content Registry');
  while (files.hasNext()) {
    const file = files.next();
    if (file.getMimeType() === 'application/vnd.google-apps.spreadsheet') {
      return SpreadsheetApp.openById(file.getId());
    }
  }
  return null;
}

function ensureSheet_(spreadsheet, name) {
  return spreadsheet.getSheetByName(name) || spreadsheet.insertSheet(name);
}

function resetSheet_(sheet) {
  sheet.clear();
  sheet.clearFormats();
}

function styleHeader_(range) {
  range
    .setFontWeight('bold')
    .setWrap(true)
    .setHorizontalAlignment('center');
}

function writeSettingsSheet_(sheet, root, folders) {
  resetSheet_(sheet);
  const rows = [
    ['Setting', 'Value'],
    ['Portfolio Owner', 'Guru Charan Mavuduru'],
    ['Professional Positioning', 'SOC Analyst | AI-Driven Cybersecurity | Applied AI & Data Science'],
    ['Education', 'M.Tech AI&DSE, IIT Patna — Pursuing'],
    ['Portfolio Root', root.getUrl()],
    ['Blogs Folder', folders.blogs.getUrl()],
    ['Source Folder', folders.source.getUrl()],
    ['Resume Folder', folders.resume.getUrl()],
    ['Data Folder', folders.data.getUrl()],
    ['LinkedIn', 'https://www.linkedin.com/in/gurucharanmavuduru'],
    ['GitHub', 'https://github.com/Sarma9273'],
    ['Email', 'charanmavuduru9273@gmail.com'],
    ['Public Sharing Default', 'OFF'],
    ['Last Setup Run', new Date()]
  ];
  sheet.getRange(1, 1, rows.length, 2).setValues(rows);
  styleHeader_(sheet.getRange(1, 1, 1, 2));
  sheet.autoResizeColumns(1, 2);
  sheet.setFrozenRows(1);
}

function writeBlogsSheet_(sheet, folders) {
  resetSheet_(sheet);
  const header = [
    'Order', 'Slug', 'Title', 'Status', 'Category', 'Short Description',
    'Tags', 'Folder URL', 'Google Doc URL', 'Cover Image URL',
    'Published', 'Featured', 'Last Updated'
  ];

  const rows = BLOGS.map(function(blog) {
    const folder = folders.blogFolders[blog.order];
    const doc = findGoogleDocByName_(folder, blog.docName);
    const cover = findFirstImage_(folder) || findImageBySlug_(folders.sourceBlogCovers, blog.slug);
    return [
      blog.order,
      blog.slug,
      blog.title,
      blog.status,
      blog.category,
      blog.description,
      blog.tags.join(', '),
      folder.getUrl(),
      doc ? doc.getUrl() : '',
      cover ? cover.getUrl() : '',
      false,
      blog.order <= 6,
      new Date()
    ];
  });

  sheet.getRange(1, 1, 1, header.length).setValues([header]);
  if (rows.length) {
    sheet.getRange(2, 1, rows.length, header.length).setValues(rows);
    sheet.getRange(2, 11, rows.length, 2).insertCheckboxes();
  }
  styleHeader_(sheet.getRange(1, 1, 1, header.length));
  sheet.setFrozenRows(1);
  sheet.getDataRange().setWrap(true);
  sheet.autoResizeColumns(1, header.length);
  sheet.setColumnWidth(3, 340);
  sheet.setColumnWidth(6, 460);
}

function writeProjectsSheet_(sheet, folders) {
  resetSheet_(sheet);
  const header = [
    'Order', 'Project', 'Portfolio Priority', 'Status', 'Domain',
    'Source Folder URL', 'Repository URL', 'Live Demo URL',
    'Report URL', 'Thumbnail URL', 'Notes'
  ];

  const rows = [
    [1, 'CyberGPT', 'Flagship', 'Functional prototype', 'AI + Cybersecurity', folders.projectFolders['01_CyberGPT'].getUrl(), '', '', '', '', 'Primary AI-for-cybersecurity case study'],
    [2, 'SOC Home Lab', 'Flagship', 'Implemented and expanding', 'SOC + Security Monitoring', folders.projectFolders['02_SOC_Home_Lab'].getUrl(), '', '', '', '', 'Include architecture, detections, logs, and dashboard'],
    [3, 'Network Traffic Analyser', 'Featured', 'Core phases completed', 'Python + Network Security', folders.projectFolders['03_Network_Traffic_Analyser'].getUrl(), '', '', '', '', 'Connect analysis outputs to SOC workflow'],
    [4, 'Sahaaya360', 'Flagship', 'MVP-oriented prototype', 'SaaS + Automation', folders.projectFolders['04_Sahaaya360'].getUrl(), '', '', '', '', 'Show modules, workflow, MVP evidence, and roadmap'],
    [5, 'Osprey MPPT Research', 'Flagship', 'Academic research completed', 'Renewable Energy + Optimisation', folders.projectFolders['05_Osprey_MPPT_Research'].getUrl(), '', '', '', '', 'Add graphs, Simulink model, and comparative results'],
    [6, 'Portfolio V2', 'Flagship', 'Upgrade in progress', 'Web + Personal Branding', folders.projectFolders['06_Portfolio_V2'].getUrl(), '', '', '', '', 'Treat as a real product and documentation project'],
    [7, 'Wedding Invitation Platform', 'Featured', 'Functional; refinement ongoing', 'Responsive Web Development', folders.projectFolders['07_Wedding_Invitation_Platform'].getUrl(), '', '', '', '', 'Use privacy-safe screenshots'],
    [8, 'School Lab Shared Network', 'Supporting', 'Implemented', 'Education Technology', folders.projectFolders['08_School_Lab_Shared_Network'].getUrl(), '', '', '', '', 'Avoid exposing student or school-sensitive data'],
    [9, 'Early Web Projects', 'Legacy Learning', 'Completed', 'Frontend Foundations', folders.projectFolders['09_Early_Web_Projects'].getUrl(), '', '', '', '', 'Group instead of featuring individually'],
    [10, '30 Days 30 Kali Tools', 'Content Initiative', 'In progress', 'Cybersecurity Education', folders.projectFolders['10_Thirty_Days_Kali_Tools'].getUrl(), '', '', '', '', 'Publish only ethical lab-focused content']
  ];

  sheet.getRange(1, 1, 1, header.length).setValues([header]);
  sheet.getRange(2, 1, rows.length, header.length).setValues(rows);
  styleHeader_(sheet.getRange(1, 1, 1, header.length));
  sheet.setFrozenRows(1);
  sheet.getDataRange().setWrap(true);
  sheet.autoResizeColumns(1, header.length);
  sheet.setColumnWidth(2, 260);
  sheet.setColumnWidth(11, 360);
}

function writeAssetsSheet_(sheet, folders, imported) {
  resetSheet_(sheet);
  const header = ['Asset Key', 'Recommended Filename', 'Purpose', 'Folder URL', 'File URL', 'Status'];
  const rows = [
    [
      'professionalHero',
      'guru-charan-mavuduru-professional-hero.jpg',
      'Primary homepage hero and social preview portrait',
      folders.sourceProfile.getUrl(),
      imported.heroPhotoFile ? imported.heroPhotoFile.getUrl() : '',
      imported.heroPhotoFile ? 'Ready' : 'Upload and add Drive ID'
    ],
    [
      'secondaryProfile',
      'guru-charan-mavuduru-secondary-profile.jpg',
      'About page, journey section, or alternate biography image',
      folders.sourceProfile.getUrl(),
      imported.secondaryPhotoFile ? imported.secondaryPhotoFile.getUrl() : '',
      imported.secondaryPhotoFile ? 'Ready' : 'Upload and add Drive ID'
    ],
    [
      'resume',
      'Guru_Charan_Mavuduru_ATS_Resume_2026.pdf',
      'Downloadable ATS resume',
      folders.resume.getUrl(),
      imported.resumeFile ? imported.resumeFile.getUrl() : '',
      imported.resumeFile ? 'Ready' : 'Upload and add Drive ID'
    ],
    [
      'blogCollection',
      'GuruCharan Mavuduru — Project Blog Collection',
      'Master source used to create individual blog Docs',
      folders.imports.getUrl(),
      imported.masterBlogSourceFile ? imported.masterBlogSourceFile.getUrl() : '',
      imported.masterBlogSourceFile ? 'Ready' : 'Upload and add Drive ID'
    ]
  ];

  sheet.getRange(1, 1, 1, header.length).setValues([header]);
  sheet.getRange(2, 1, rows.length, header.length).setValues(rows);
  styleHeader_(sheet.getRange(1, 1, 1, header.length));
  sheet.setFrozenRows(1);
  sheet.getDataRange().setWrap(true);
  sheet.autoResizeColumns(1, header.length);
  sheet.setColumnWidth(3, 420);
}

function writeSetupLog_(registry, level, action, detail) {
  const sheet = ensureSheet_(registry, 'Setup Log');
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Timestamp', 'Level', 'Action', 'Detail']);
    styleHeader_(sheet.getRange(1, 1, 1, 4));
    sheet.setFrozenRows(1);
  }
  sheet.appendRow([new Date(), level, action, detail]);
}

/**
 * Splits the uploaded master blog collection by headings such as "BLOG 1:".
 */
function generateIndividualBlogDocs_(masterDocId, folders, registry) {
  const masterDoc = DocumentApp.openById(masterDocId);
  const text = masterDoc.getBody().getText().replace(/\r/g, '');
  const sections = parseBlogSections_(text);

  if (!sections.length) {
    throw new Error(
      'No "BLOG n:" headings were found in the master collection. ' +
      'Confirm that the converted document preserved those headings.'
    );
  }

  let created = 0;
  let skipped = 0;

  sections.forEach(function(section) {
    const blog = BLOGS.find(function(item) {
      return item.order === section.order;
    });

    if (!blog) {
      writeSetupLog_(registry, 'WARNING', 'Unknown blog number', String(section.order));
      return;
    }

    const folder = folders.blogFolders[blog.order];
    const result = createOrUpdateBlogDoc_(folder, blog, section.content);

    if (result.action === 'created' || result.action === 'updated') {
      created++;
    } else {
      skipped++;
    }
  });

  writeBlogsSheet_(registry.getSheetByName('Blogs'), folders);
  writeSetupLog_(
    registry,
    'SUCCESS',
    'Blog generation completed',
    'Created/updated: ' + created + '; preserved existing: ' + skipped
  );
}

function parseBlogSections_(text) {
  const marker = /^BLOG\s+(\d+):\s*(.+)$/gmi;
  const matches = [];
  let match;

  while ((match = marker.exec(text)) !== null) {
    matches.push({
      order: Number(match[1]),
      heading: match[2].trim(),
      start: marker.lastIndex,
      markerStart: match.index
    });
  }

  return matches.map(function(item, index) {
    const end = index + 1 < matches.length ? matches[index + 1].markerStart : text.length;
    let content = text.substring(item.start, end).trim();

    // Remove the common appendices from the final blog section.
    content = content
      .replace(/^COMMON AUTHOR BIO[\s\S]*$/mi, '')
      .replace(/^STANDARD DISCLAIMER[\s\S]*$/mi, '')
      .replace(/^RECOMMENDED GOOGLE DRIVE BLOG FOLDER STRUCTURE[\s\S]*$/mi, '')
      .trim();

    return {
      order: item.order,
      heading: item.heading,
      content: content
    };
  });
}

function createOrUpdateBlogDoc_(folder, blog, rawContent) {
  let file = findGoogleDocByName_(folder, blog.docName);
  let doc;
  let action;

  if (file && !CONFIG.OVERWRITE_GENERATED_BLOG_DOCS) {
    return {action: 'preserved', file: file};
  }

  if (file) {
    doc = DocumentApp.openById(file.getId());
    doc.getBody().clear();
    action = 'updated';
  } else {
    doc = DocumentApp.create(blog.docName);
    DriveApp.getFileById(doc.getId()).moveTo(folder);
    action = 'created';
  }

  const body = doc.getBody();
  body.appendParagraph(blog.title)
    .setHeading(DocumentApp.ParagraphHeading.TITLE);

  body.appendParagraph(blog.category)
    .setHeading(DocumentApp.ParagraphHeading.SUBTITLE);

  const metadataTable = body.appendTable([
    ['Project status', blog.status],
    ['Domain', blog.category],
    ['Tags', blog.tags.join(', ')]
  ]);
  metadataTable.getRow(0).getCell(0).editAsText().setBold(true);
  metadataTable.getRow(1).getCell(0).editAsText().setBold(true);
  metadataTable.getRow(2).getCell(0).editAsText().setBold(true);

  body.appendParagraph('');
  formatBlogBody_(body, rawContent);

  body.appendHorizontalRule();
  body.appendParagraph('About the Author')
    .setHeading(DocumentApp.ParagraphHeading.HEADING2);
  AUTHOR_BIO.split('\n').forEach(function(line) {
    body.appendParagraph(line);
  });

  if (isCybersecurityBlog_(blog)) {
    body.appendParagraph('Ethical-Use Disclaimer')
      .setHeading(DocumentApp.ParagraphHeading.HEADING2);
    body.appendParagraph(CYBERSECURITY_DISCLAIMER);
  }

  body.appendHorizontalRule();
  body.appendParagraph('Portfolio summary')
    .setHeading(DocumentApp.ParagraphHeading.HEADING2);
  body.appendParagraph(blog.description);

  doc.saveAndClose();

  const generatedFile = DriveApp.getFileById(doc.getId());
  if (CONFIG.SHARING.BLOG_DOCS_ANYONE_WITH_LINK) {
    safeSetAnyoneWithLink_(generatedFile);
  }

  return {action: action, file: generatedFile};
}

function formatBlogBody_(body, rawContent) {
  const knownHeadings = [
    'Short Portfolio Description',
    'Introduction',
    'The Problem I Wanted to Solve',
    'Building the Cybersecurity Knowledge Base',
    'Semantic Search and Hybrid Classification',
    'Novel-Threat Detection',
    'Incident Reporting and Response Guidance',
    'Challenges and Lessons',
    'Future Scope',
    'Technology Stack',
    'Suggested Images',
    'Key Takeaway',
    'Lab Architecture',
    'Endpoint Logging',
    'Attack Simulation',
    'Detection and Investigation',
    'Challenges Faced',
    'Skills Developed',
    'Project Objective',
    'Development Approach',
    'Dashboard Components',
    'Learning Outcomes',
    'Vision of the Project',
    'Core Modules',
    'Ticket Management Workflow',
    'Tools and Implementation',
    'What I Learned',
    'System Design',
    'Partial-Shading Conditions',
    'Comparative Analysis',
    'Why the Upgrade Was Required',
    'Project Case-Study Structure',
    'Blog Integration',
    'Personal Branding',
    'Technical Improvements',
    'Challenges and Learning',
    'Website Structure',
    'Event Presentation',
    'Navigation Experience',
    'Light and Dark Presentation',
    'Content Organisation',
    'Privacy Considerations',
    'The Main Objective',
    'Folder Organisation',
    'Educational Use',
    'Basic Security and Control',
    'Landing-Page Project',
    'Temperature Converter',
    'Early Personal Portfolio',
    'Interface Recreation Exercises',
    'Purpose of the Series',
    'Learning Categories',
    'Practical Environment',
    'Documentation Style',
    'Why Consistency Matters',
    'Challenges'
  ];

  const lines = rawContent.split('\n');
  lines.forEach(function(originalLine) {
    const line = originalLine.trim();

    if (!line) {
      body.appendParagraph('');
      return;
    }

    if (/^Suggested Google Doc Name:/i.test(line)) {
      return;
    }

    if (/^(Project Status|Domain|Tags):/i.test(line)) {
      const paragraph = body.appendParagraph(line);
      const colon = line.indexOf(':');
      if (colon > 0) {
        paragraph.editAsText().setBold(0, colon, true);
      }
      return;
    }

    if (knownHeadings.indexOf(line) !== -1) {
      body.appendParagraph(line)
        .setHeading(DocumentApp.ParagraphHeading.HEADING2);
      return;
    }

    if (/^[·•]\s*/.test(line)) {
      body.appendListItem(line.replace(/^[·•]\s*/, ''));
      return;
    }

    body.appendParagraph(line);
  });
}

function isCybersecurityBlog_(blog) {
  const combined = (blog.category + ' ' + blog.tags.join(' ')).toLowerCase();
  return /cyber|soc|security|kali|incident|threat|network/.test(combined);
}

function findGoogleDocByName_(folder, name) {
  const files = folder.getFilesByName(name);
  while (files.hasNext()) {
    const file = files.next();
    if (file.getMimeType() === 'application/vnd.google-apps.document') {
      return file;
    }
  }
  return null;
}

function findFirstImage_(folder) {
  const files = folder.getFiles();
  while (files.hasNext()) {
    const file = files.next();
    if (/^image\//i.test(file.getMimeType())) {
      return file;
    }
  }
  return null;
}

function findImageBySlug_(folder, slug) {
  const files = folder.getFiles();
  while (files.hasNext()) {
    const file = files.next();
    if (/^image\//i.test(file.getMimeType()) &&
        file.getName().toLowerCase().indexOf(slug.toLowerCase()) !== -1) {
      return file;
    }
  }
  return null;
}

function createBlogAssetChecklist_(folder, blog) {
  const name = 'README - Required Assets.txt';
  const existing = folder.getFilesByName(name);
  if (existing.hasNext()) {
    return;
  }

  const content = [
    blog.title,
    '',
    'Keep the following items in this folder:',
    '1. ' + blog.docName + ' (Google Doc)',
    '2. cover-' + blog.slug + '.webp',
    '3. thumbnail-' + blog.slug + '.webp',
    '4. screenshots/',
    '5. architecture-diagram/',
    '6. project-report/',
    '7. repository-and-demo-links.txt',
    '',
    'Recommended portfolio description:',
    blog.description,
    '',
    'Status:',
    blog.status,
    '',
    'Tags:',
    blog.tags.join(', ')
  ].join('\n');

  folder.createFile(name, content, MimeType.PLAIN_TEXT);
}

/**
 * Creates README - Start Here as a Google Doc.
 */
function createOrUpdateReadme_(portfolioRoot, folders, registry, imported) {
  const docName = 'README - Start Here';
  let file = findGoogleDocByName_(portfolioRoot, docName);
  let doc;

  if (file) {
    doc = DocumentApp.openById(file.getId());
    doc.getBody().clear();
  } else {
    doc = DocumentApp.create(docName);
    DriveApp.getFileById(doc.getId()).moveTo(portfolioRoot);
  }

  const body = doc.getBody();
  body.appendParagraph('Guru Charan Mavuduru — Personal Portfolio Workspace')
    .setHeading(DocumentApp.ParagraphHeading.TITLE);

  body.appendParagraph(
    'This Drive workspace is the content source for a clean, responsive personal-brand portfolio covering cybersecurity, AI, data science, engineering, teaching, research, and entrepreneurship.'
  );

  body.appendParagraph('Professional identity')
    .setHeading(DocumentApp.ParagraphHeading.HEADING2);
  body.appendParagraph('Guru Charan Mavuduru');
  body.appendParagraph('SOC Analyst | AI-Driven Cybersecurity | Applied AI & Data Science');
  body.appendParagraph('M.Tech AI&DSE at IIT Patna — Pursuing');

  body.appendParagraph('Important locations')
    .setHeading(DocumentApp.ParagraphHeading.HEADING2);
  [
    ['Blogs', folders.blogs.getUrl()],
    ['Source assets', folders.source.getUrl()],
    ['Profile images', folders.sourceProfile.getUrl()],
    ['Project assets', folders.sourceProjects.getUrl()],
    ['Resume', folders.resume.getUrl()],
    ['Documentation', folders.docs.getUrl()],
    ['Portfolio data', folders.data.getUrl()],
    ['Content registry', registry.getUrl()]
  ].forEach(function(item) {
    body.appendParagraph(item[0] + ': ' + item[1]);
  });

  body.appendParagraph('Image recommendation')
    .setHeading(DocumentApp.ParagraphHeading.HEADING2);
  body.appendParagraph(
    'Use the blazer photograph as the primary hero portrait. Use the checked-shirt photograph as a secondary About or journey image.'
  );

  body.appendParagraph('Publishing rule')
    .setHeading(DocumentApp.ParagraphHeading.HEADING2);
  body.appendParagraph(
    'Keep the entire workspace private during preparation. After review, share only the specific resume, blog Docs, and final web assets that must be visible to portfolio visitors.'
  );

  body.appendParagraph('Current import status')
    .setHeading(DocumentApp.ParagraphHeading.HEADING2);
  body.appendListItem('Professional hero photo: ' + (imported.heroPhotoFile ? 'Ready' : 'Not imported'));
  body.appendListItem('Secondary profile photo: ' + (imported.secondaryPhotoFile ? 'Ready' : 'Not imported'));
  body.appendListItem('Resume PDF: ' + (imported.resumeFile ? 'Ready' : 'Not imported'));
  body.appendListItem('Master blog collection: ' + (imported.masterBlogSourceFile ? 'Ready' : 'Not imported'));

  doc.saveAndClose();
}

/**
 * Writes portfolio-content.json for later use in the GitHub repository.
 */
function createOrUpdateManifest_(folders, registry) {
  const blogsSheet = registry.getSheetByName('Blogs');
  if (!blogsSheet || blogsSheet.getLastRow() < 2) {
    throw new Error('Blogs registry is empty.');
  }

  const values = blogsSheet.getDataRange().getValues();
  const header = values.shift();
  const index = {};
  header.forEach(function(name, i) {
    index[name] = i;
  });

  const manifest = {
    generatedAt: new Date().toISOString(),
    owner: {
      name: 'Guru Charan Mavuduru',
      headline: 'SOC Analyst | AI-Driven Cybersecurity | Applied AI & Data Science',
      education: 'M.Tech AI&DSE, IIT Patna — Pursuing',
      linkedin: 'https://www.linkedin.com/in/gurucharanmavuduru',
      github: 'https://github.com/Sarma9273',
      email: 'charanmavuduru9273@gmail.com'
    },
    blogs: values.map(function(row) {
      return {
        order: row[index['Order']],
        slug: row[index['Slug']],
        title: row[index['Title']],
        status: row[index['Status']],
        category: row[index['Category']],
        description: row[index['Short Description']],
        tags: String(row[index['Tags']] || '')
          .split(',')
          .map(function(tag) { return tag.trim(); })
          .filter(String),
        folderUrl: row[index['Folder URL']] || '',
        documentUrl: row[index['Google Doc URL']] || '',
        coverImageUrl: row[index['Cover Image URL']] || '',
        published: Boolean(row[index['Published']]),
        featured: Boolean(row[index['Featured']])
      };
    })
  };

  const jsonText = JSON.stringify(manifest, null, 2);
  const fileName = 'portfolio-content.json';
  const files = folders.data.getFilesByName(fileName);

  if (files.hasNext()) {
    files.next().setContent(jsonText);
  } else {
    folders.data.createFile(fileName, jsonText, MimeType.PLAIN_TEXT);
  }

  writeSetupLog_(
    registry,
    'SUCCESS',
    'Manifest generated',
    folders.data.getUrl()
  );
}

/**
 * Sharing remains private unless a CONFIG toggle is explicitly enabled.
 */
function applyConfiguredSharing_(folders, imported, registry) {
  if (CONFIG.SHARING.RESUME_ANYONE_WITH_LINK && imported.resumeFile) {
    safeSetAnyoneWithLink_(imported.resumeFile);
  }

  if (CONFIG.SHARING.PROFILE_IMAGES_ANYONE_WITH_LINK) {
    if (imported.heroPhotoFile) safeSetAnyoneWithLink_(imported.heroPhotoFile);
    if (imported.secondaryPhotoFile) safeSetAnyoneWithLink_(imported.secondaryPhotoFile);
  }

  if (CONFIG.SHARING.BLOG_DOCS_ANYONE_WITH_LINK) {
    BLOGS.forEach(function(blog) {
      const file = findGoogleDocByName_(folders.blogFolders[blog.order], blog.docName);
      if (file) safeSetAnyoneWithLink_(file);
    });
  }

  writeSetupLog_(
    registry,
    'INFO',
    'Sharing configuration checked',
    JSON.stringify(CONFIG.SHARING)
  );
}

function safeSetAnyoneWithLink_(driveItem) {
  try {
    driveItem.setSharing(
      DriveApp.Access.ANYONE_WITH_LINK,
      DriveApp.Permission.VIEW
    );
  } catch (error) {
    console.warn(
      'Could not enable anyone-with-link sharing for "' +
      driveItem.getName() + '": ' + error.message
    );
  }
}

function cleanId_(value) {
  return String(value || '').trim();
}
