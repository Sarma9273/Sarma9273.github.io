export const focusAreas = [
  {
    icon: 'shield',
    title: 'Security Operations',
    description: 'SOC workflows, alert triage, log analysis, incident investigation, threat detection and defensive laboratory practice.',
  },
  {
    icon: 'brain',
    title: 'AI for Cybersecurity',
    description: 'Retrieval-augmented incident response, embeddings, semantic search, novelty detection and analyst decision support.',
  },
  {
    icon: 'workflow',
    title: 'Automation & Product Building',
    description: 'Google Workspace automation, Python tools, data workflows, dashboards and low-cost MVP development.',
  },
  {
    icon: 'research',
    title: 'Applied Research & Education',
    description: 'AI&DSE studies, renewable-energy optimisation, technical writing, classroom teaching and structured learning resources.',
  },
] as const;

export const skills = [
  {
    group: 'Security Operations',
    items: ['SOC operations', 'Alert triage', 'Incident response', 'Log analysis', 'Threat detection', 'Phishing analysis', 'MITRE ATT&CK'],
  },
  {
    group: 'Security Platforms & Tools',
    items: ['Splunk', 'Microsoft Sentinel', 'IBM QRadar', 'Elastic Stack', 'Security Onion', 'Sysmon', 'Zeek', 'Wireshark', 'Nmap', 'Burp Suite', 'Kali Linux'],
  },
  {
    group: 'AI & Data Science',
    items: ['Python', 'RAG', 'NLP', 'SentenceTransformers', 'FAISS', 'Embeddings', 'Pandas', 'NumPy', 'Data visualisation', 'Prompt engineering'],
  },
  {
    group: 'Systems & Development',
    items: ['Linux', 'Windows', 'Ubuntu Server', 'VirtualBox', 'Git', 'GitHub', 'SQL', 'HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Astro', 'Google Apps Script'],
  },
] as const;

export const certifications = [
  'AICTE–EduSkills Palo Alto Networks Cybersecurity Virtual Internship',
  'AWS Academy Cloud Foundations and APSSDC AWS Cloud Computing Training',
  'Tata Group Cybersecurity Analyst Job Simulation',
  'Introduction to Cybersecurity',
  'Security Operations Center (SOC)',
  'Introduction to Generative AI',
] as const;

export const education = [
  {
    period: 'Apr 2026 — Present',
    institution: 'Indian Institute of Technology Patna',
    qualification: 'Master of Technology — Artificial Intelligence and Data Science Engineering',
    detail: 'Pursuing. Focus: artificial intelligence, machine learning, data science, generative AI, data engineering and applied research.',
  },
  {
    period: '2021 — 2025',
    institution: 'Aditya Institute of Technology and Management',
    qualification: 'Bachelor of Technology — Electrical and Electronics Engineering',
    detail: 'CGPA: 7.8/10. Relevant work: programming, MATLAB/Simulink, power electronics, renewable energy systems and engineering mathematics.',
  },
] as const;

export const experience = [
  {
    period: 'Jun 2025 — Present',
    role: 'Computer Teacher',
    organisation: 'Shree Swaminarayan Gurukul International School',
    location: 'Tirupati, Andhra Pradesh',
    highlights: [
      'Teach computer fundamentals, Python, HTML, CSS, digital literacy and safe internet practices through classroom and laboratory sessions.',
      'Create lesson plans, assessments, demonstrations and practical exercises for different grade levels.',
      'Support lab operations, shared digital resources, technical documentation and technology-enabled academic activities.',
    ],
  },
  {
    period: 'Dec 2024 — May 2025',
    role: 'Cybersecurity Trainer — Part Time',
    organisation: 'SynthoQuest IT Solutions',
    location: 'Remote',
    highlights: [
      'Delivered practical training on SOC fundamentals, incident investigation, phishing, malware, network security and vulnerability assessment.',
      'Guided learners through Kali Linux, Nmap, Wireshark, Burp Suite, Splunk, Microsoft Sentinel and IBM QRadar.',
      'Prepared structured labs, demonstrations, technical notes and career guidance.',
    ],
  },
  {
    period: 'Apr 2025 — Jun 2025',
    role: 'Junior Design Engineer',
    organisation: 'CADSYS (INDIA) LIMITED',
    location: 'India',
    highlights: [
      'Worked within structured engineering workflows involving quality checks, documentation and delivery timelines.',
      'Strengthened analytical problem solving, accuracy, communication and cross-functional coordination.',
    ],
  },
  {
    period: 'May 2024 — Jun 2024',
    role: 'Electrical Engineering Intern',
    organisation: 'APTRANSCO — 220/132 kV Substation',
    location: 'Simhachalam, Andhra Pradesh',
    highlights: [
      'Observed transmission operations, transformers, switchgear, protection relays, control panels and electrical safety procedures.',
      'Documented technical observations and learned preventive maintenance and monitoring practices in critical infrastructure.',
    ],
  },
] as const;
