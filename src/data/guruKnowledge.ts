export type GuruKnowledge = {
  id: string;
  title: string;
  aliases: string[];
  domain: string;
  status: string;
  summary: string;
  problem: string;
  solution: string;
  architecture: string[];
  workflow: string[];
  technologies: string[];
  evidence: string[];
  limitations: string[];
  related: string[];
};

export const guruKnowledge: GuruKnowledge[] = [
  {
    id: 'ra-xsoc',
    title: 'RA-XSOC',
    aliases: ['ra-xsoc', 'rax soc', 'rax-soc', 'extended security operations center'],
    domain: 'AI-driven cybersecurity',
    status: 'Active research prototype / active development',
    summary: 'Retrieval-Augmented Extended Security Operations Center designed as an evidence-driven security investigation and response system.',
    problem: 'Security analysts need contextual investigation, evidence correlation, threat mapping and response guidance without losing traceability or treating generated text as ground truth.',
    solution: 'RA-XSOC combines security context, a cybersecurity knowledge base, retrieval, investigation reasoning, MITRE ATT&CK mapping, novelty handling and structured incident reporting while retaining human review for uncertain cases.',
    architecture: [
      'Security context, alerts and investigation input',
      'Evidence and telemetry normalization',
      'Cybersecurity knowledge base and retrieval layer',
      'Semantic retrieval with SentenceTransformers and FAISS',
      'Hybrid relevance logic and contextual reasoning',
      'MITRE ATT&CK and threat mapping',
      'Novelty / low-confidence review path',
      'Investigation reasoning and response recommendation',
      'Structured incident report and analyst decision'
    ],
    workflow: [
      'Receive an alert, incident narrative or analyst query',
      'Normalize the available security context and evidence',
      'Retrieve relevant knowledge and investigation guidance',
      'Combine semantic retrieval with security-specific relevance signals',
      'Map observed behaviors to MITRE ATT&CK where supported',
      'Surface findings, uncertainty and recommended response actions',
      'Keep uncertain or potentially novel cases for analyst review',
      'Produce structured incident information for reporting and later feedback'
    ],
    technologies: ['Python', 'FAISS', 'SentenceTransformers', 'RAG', 'NLP', 'MITRE ATT&CK'],
    evidence: [
      'RA-XSOC V2 backend baseline has been implemented and tested in the project work',
      'Knowledge base contains dozens of cybersecurity attack categories / playbooks',
      'Hybrid retrieval, MITRE mapping, novelty review and structured reporting are part of the implemented direction'
    ],
    limitations: [
      'It is a research / engineering project, not a production SOC replacement',
      'Live SIEM/SOAR integrations and production-grade identity controls are separate implementation stages'
    ],
    related: ['CyberGPT', 'SynthoQuest Cyber Investigation Hackathon']
  },
  {
    id: 'cybergpt',
    title: 'CyberGPT',
    aliases: ['cybergpt', 'cyber gpt', 'incident response copilot'],
    domain: 'AI-driven cybersecurity',
    status: 'Functional research prototype / evolving into RA-XSOC',
    summary: 'Retrieval-Augmented Security Incident Response Copilot for turning incident narratives into contextual analyst guidance.',
    problem: 'Entry-level analysts and small SOC teams need consistent investigation and response guidance from unstructured alert descriptions.',
    solution: 'CyberGPT uses a curated security knowledge base, semantic retrieval, keyword boosting, confidence logic, MITRE ATT&CK mapping and structured SOC reporting, with human review for uncertain cases.',
    architecture: [
      'Incident narrative input',
      'Incident classification and security context',
      'Cybersecurity knowledge base',
      'SentenceTransformer embeddings',
      'FAISS vector retrieval',
      'Hybrid semantic retrieval plus keyword boosting',
      'MITRE ATT&CK mapping',
      'Novelty / low-confidence review',
      'Structured incident-response reporting'
    ],
    workflow: [
      'Accept an incident narrative',
      'Normalize and embed the text',
      'Retrieve similar security knowledge',
      'Apply security-specific keyword and confidence logic',
      'Map applicable MITRE ATT&CK techniques',
      'Generate analyst-oriented investigation and response guidance',
      'Preserve structured incident information for review'
    ],
    technologies: ['Python', 'SentenceTransformers', 'FAISS', 'Pandas', 'NLP', 'MITRE ATT&CK'],
    evidence: [
      'Knowledge base covers approximately 30 attack categories / playbooks in the current project direction',
      'Backend V2 baseline and automated tests were previously validated',
      'Novel-threat review and structured incident reporting are implemented project capabilities'
    ],
    limitations: [
      'The prototype uses a curated knowledge base and evaluation examples',
      'It is not presented as a production SIEM or autonomous SOC'
    ],
    related: ['RA-XSOC']
  },
  {
    id: 'synthoquest-platform',
    title: 'SynthoQuest Platform',
    aliases: ['synthoquest', 'synthoquest platform', 'sq platform', 'synthoquest v0.2'],
    domain: 'EdTech / cybersecurity learning platform',
    status: 'MVP / active development',
    summary: 'A platform for cybersecurity education, workshops, projects, learner/trainer workflows and institutional learning operations.',
    problem: 'Cybersecurity training needs structured learner, trainer and administrator workflows rather than disconnected documents, workshops and manual tracking.',
    solution: 'The platform uses a FastAPI backend and React/Vite frontend with authentication, role-based workflows, workshop/event management, certificates, notifications, leaderboard and audit foundations.',
    architecture: [
      'React / Vite frontend',
      'FastAPI backend',
      'Authentication and security layer',
      'SQLAlchemy data model',
      'Admin, trainer and learner workflows',
      'Workshop / event management',
      'Learning and project content',
      'Certificates and notifications',
      'Audit foundation'
    ],
    workflow: [
      'Authenticate the user and resolve role',
      'Route the user into the appropriate learner, trainer or admin workflow',
      'Manage workshops, events and learning activities',
      'Track participation and progress',
      'Generate certificates and notifications',
      'Maintain operational records and audit information'
    ],
    technologies: ['Python', 'FastAPI', 'SQLAlchemy', 'React', 'Vite'],
    evidence: [
      'The V0.2 project includes backend routers, models, schemas, security and seed data',
      'Demo entities include admin, trainer and learner roles',
      'Cybersecurity Foundations and Project AEGIS learning content are part of the seeded platform direction'
    ],
    limitations: [
      'The platform is still an evolving product rather than a finished enterprise LMS'
    ],
    related: ['SynthoQuest Cyber Investigation Hackathon', 'Sahaaya360']
  },
  {
    id: 'synthoquest-hackathon',
    title: 'SynthoQuest 24-Hour Cyber Investigation Hackathon',
    aliases: ['hackathon', 'cyber investigation hackathon', 'synthoquest hackathon', 'aegis hackathon'],
    domain: 'Cybersecurity training / investigation',
    status: 'Designed as a complete investigation training system',
    summary: 'A 24-hour college-level cybersecurity investigation experience built from parallel investigation branches, missions, evidence and a final correlation path.',
    problem: 'Students need hands-on investigation practice that teaches correlation across multiple security domains instead of isolated tool exercises.',
    solution: 'The design uses parallel investigation branches, unlocks, flags, hints, achievements, scoring, evidence packages and a final correlation investigation.',
    architecture: [
      'Email / phishing investigation',
      'OSINT',
      'Network / Wireshark',
      'Steganography',
      'Windows forensics',
      'Web / Burp',
      'Password security',
      'Traffic analysis',
      'Cross-branch correlation',
      'Final investigation'
    ],
    workflow: [
      'Students unlock independent investigation branches',
      'Complete short missions with evidence-based flags',
      'Use hints and recovery paths when blocked',
      'Connect discoveries across branches',
      'Correlate evidence into the final investigation',
      'Submit final findings'
    ],
    technologies: ['Wireshark', 'Burp Suite', 'Kali Linux', 'Docker', 'PCAP analysis', 'Digital forensics'],
    evidence: [
      'The designed system contains 110 core missions plus side quests',
      'Instructor material includes mission solutions, hints, evidence and recovery guidance',
      'The AEGIS fictional investigation narrative connects the branches'
    ],
    limitations: [
      'This is a training and investigation environment, not a production SOC'
    ],
    related: ['SynthoQuest Platform', 'RA-XSOC']
  },
  {
    id: 'sahaaya360',
    title: 'Sahaaya360 / SahaayaOS Lite',
    aliases: ['sahaaya360', 'sahaaya', 'sahaayaos', 'sahaayaos lite'],
    domain: 'AI-enabled institutional operations',
    status: 'MVP / product development',
    summary: 'An institutional operations ecosystem concept for schools, hostels, coaching centres, clinics, apartments, colleges and MSMEs.',
    problem: 'Small and medium institutions often run recurring operational work across disconnected documents, forms, approvals and manual communication.',
    solution: 'SahaayaOS Lite is designed around workflow automation, document/data operations, role context, notifications and institutional process coordination.',
    architecture: [
      'Institutional request / task intake',
      'Role and identity context',
      'Workflow orchestration',
      'Document and data automation',
      'Approval and notification flows',
      'Operational records and evidence'
    ],
    workflow: [
      'Capture an institutional request',
      'Identify the responsible workflow and role',
      'Automate repetitive processing',
      'Route approvals or notifications',
      'Record the operational result'
    ],
    technologies: ['AI automation', 'Google Drive automation', 'Web application workflows'],
    evidence: [
      'The product direction targets multiple institutional domains rather than a single school-only workflow'
    ],
    limitations: [
      'The product is an evolving MVP and should not be described as a completed enterprise platform'
    ],
    related: ['SynthoQuest Platform']
  },
  {
    id: 'osprey-mppt',
    title: 'Osprey-Based MPPT Tracking for Solar PV',
    aliases: ['osprey', 'mppt', 'solar mppt', 'osprey mppt'],
    domain: 'Optimization / solar PV research',
    status: 'Academic research project',
    summary: 'A B.Tech project applying a modified Osprey Optimization Algorithm to maximum power point tracking of solar PV modules under partial shading conditions.',
    problem: 'Partial shading creates multiple power peaks in a PV array, making conventional local tracking methods vulnerable to settling at a non-global operating point.',
    solution: 'The project uses a modified Osprey optimization approach to search for the PV operating point that maximizes power, implemented and evaluated in MATLAB/Simulink.',
    architecture: [
      'PV voltage and current input',
      'Instantaneous power calculation',
      'Modified Osprey optimization',
      'Candidate operating-point search',
      'Maximum-power selection',
      'Duty-cycle control',
      'MATLAB / Simulink validation'
    ],
    workflow: [
      'Measure PV voltage and current',
      'Calculate instantaneous PV power',
      'Search candidate control points',
      'Evaluate the resulting power',
      'Track the best operating point',
      'Apply the duty-cycle control signal',
      'Validate tracking behaviour under partial shading'
    ],
    technologies: ['MATLAB', 'Simulink', 'PV modelling', 'Optimization algorithms'],
    evidence: [
      'The project was the user’s B.Tech engineering project',
      'The implementation and debugging work used MATLAB/Simulink'
    ],
    limitations: [
      'This is an academic optimization project, separate from the cybersecurity product portfolio'
    ],
    related: ['GURUVERSE']
  },
  {
    id: 'guruverse',
    title: 'GURUVERSE',
    aliases: ['guruverse', 'portfolio', 'portfolio universe'],
    domain: 'Interactive engineering portfolio',
    status: 'Active engineering project',
    summary: 'An interactive engineering portfolio designed as a digital universe connecting projects, research, cybersecurity work, learning and GURU-BOT-guided exploration.',
    problem: 'A conventional portfolio separates projects into static cards and pages, making it difficult to communicate how the systems relate to one another and how they were actually built.',
    solution: 'GURUVERSE uses a feature-oriented Astro architecture, an ambient universe layer, project worlds, GURU-BOT context and Mission Control to turn the portfolio into an explorable engineering environment.',
    architecture: [
      'Astro static application layer',
      'Feature-oriented content and component architecture',
      'Shared interaction and visual systems',
      'Project knowledge / content layer',
      'Ambient universe and spatial navigation layer',
      'GURU-BOT context and state layer',
      'Mission Control navigation system',
      'Project-world architecture and workflow views',
      'GitHub Pages deployment'
    ],
    workflow: [
      'Visitor enters the command deck',
      'GURU-BOT establishes page or project context',
      'Visitor explores worlds and project domains',
      'Project worlds expose architecture, workflow, technologies and evidence',
      'Mission Control provides direct navigation and exploration modes',
      'The static application is built and delivered through GitHub Pages'
    ],
    technologies: ['Astro', 'TypeScript', 'CSS', 'GitHub Pages', 'GitHub Actions'],
    evidence: [
      'The current repository is an Astro static site with GitHub Actions deployment',
      'The project includes AmbientSpace, UniverseCore, GalaxyEngine, ProjectWorld and Mission Control components',
      'The architecture is being evolved from a conventional portfolio into the interactive GURUVERSE model'
    ],
    limitations: [
      'Some advanced universe behaviours remain implementation work rather than finished capabilities',
      'GURU-BOT is intentionally local and knowledge-grounded; it should not claim live external AI reasoning unless a future service is explicitly connected'
    ],
    related: ['RA-XSOC', 'CyberGPT', 'SynthoQuest Platform', 'Sahaaya360', 'Osprey MPPT']
  }
];

export const guruKnowledgeById = Object.fromEntries(
  guruKnowledge.map((item) => [item.id, item])
);
