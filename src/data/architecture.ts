export type ArchitectureLayer = {
  id: string;
  label: string;
  title: string;
  description: string;
  capabilities: string[];
};

export const guruverseArchitecture: ArchitectureLayer[] = [
  {
    id: 'identity',
    label: '01 · IDENTITY',
    title: 'Person before platform',
    description: 'The portfolio starts with Guru Charan, his direction, evidence and current work—not with an interface gimmick.',
    capabilities: ['Profile', 'Career', 'Research', 'Contact', 'Resume'],
  },
  {
    id: 'content',
    label: '02 · CONTENT',
    title: 'One source of truth',
    description: 'Projects, writing and profile data stay in structured Astro content/data rather than being duplicated across UI components.',
    capabilities: ['Project collection', 'Blog collection', 'Profile data', 'Typed content'],
  },
  {
    id: 'knowledge',
    label: '03 · KNOWLEDGE',
    title: 'Grounded engineering knowledge',
    description: 'Project architecture, workflow, evidence and limitations are structured so future assistants or exploration tools can consume the same source of truth.',
    capabilities: ['Architecture', 'Workflow', 'Evidence', 'Limitations', 'Future assistant layer'],
  },
  {
    id: 'experience',
    label: '04 · EXPERIENCE',
    title: 'Progressive interaction',
    description: 'The core portfolio remains usable on its own. Motion and richer exploration are enhancements, not dependencies.',
    capabilities: ['Responsive UI', 'Keyboard access', 'Reduced motion', 'Progressive enhancement'],
  },
  {
    id: 'delivery',
    label: '05 · DELIVERY',
    title: 'Static, fast, defensible',
    description: 'Astro generates a static site for GitHub Pages. There is no client-side secret, database or unnecessary runtime dependency.',
    capabilities: ['Astro build', 'GitHub Actions', 'GitHub Pages', 'Security checks'],
  },
];
