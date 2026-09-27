export type ArchitectureLayer = {
  id: string; label: string; title: string; description: string; capabilities: string[];
};
export const guruverseArchitecture: ArchitectureLayer[] = [
  { id:'identity', label:'01 · IDENTITY', title:'Person before platform', description:'The portfolio starts with Guru Charan, his direction, evidence and current work—not with an interface gimmick.', capabilities:['Profile','Career','Research','Contact','Resume'] },
  { id:'content', label:'02 · CONTENT', title:'One source of truth', description:'Projects, writing and profile data stay in structured Astro content/data rather than being duplicated across UI components.', capabilities:['Project collection','Blog collection','Profile data','Typed content'] },
  { id:'knowledge', label:'03 · KNOWLEDGE', title:'Grounded GURU-BOT', description:'GURU-BOT explains only the project knowledge encoded for GURUVERSE and clearly distinguishes implemented work from planned work.', capabilities:['Project intelligence','Architecture','Workflow','Evidence','Limitations'] },
  { id:'experience', label:'04 · EXPERIENCE', title:'Progressive interaction', description:'The normal portfolio is always usable. Mission Control, project worlds and universe effects appear only when they help exploration.', capabilities:['Explore','Mission Control','Project worlds','Reduced motion'] },
  { id:'delivery', label:'05 · DELIVERY', title:'Static, fast, defensible', description:'Astro generates a static site for GitHub Pages. There is no client-side secret, database or unnecessary runtime dependency.', capabilities:['Astro build','GitHub Actions','GitHub Pages','Security checks'] }
];
