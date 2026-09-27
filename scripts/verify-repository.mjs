import { existsSync, readFileSync } from 'node:fs';

const requiredPaths = [
  '.github/workflows/deploy.yml',
  '.npmrc',
  'astro.config.mjs',
  'package.json',
  'package-lock.json',
  'public',
  'src',
  'src/pages/index.astro',
  'src/pages/contact.astro',
  'src/components/LiveBlogGrid.astro',
  'src/data/integrations.ts',
  'src/data/architecture.ts',
  'src/data/guruKnowledge.ts',
  'src/features/navigation/Header.astro',
  'src/features/projects/ProjectCard.astro',
  'src/features/projects/ProjectWorld.astro',
  'src/features/architecture/ArchitectureMap.astro',
  'docs/ARCHITECTURE.md',
  'src/content.config.ts',
  'src/scripts/motion.ts',
  'src/scripts/signature-engine.ts',
  'docs/PREMIUM_EXPERIENCE.md',
  'tools/google-drive/Portfolio_Live_Backend.gs',
  'docs/LIVE_DRIVE_BLOGS_AND_CONTACT.md',
];

const missing = requiredPaths.filter((path) => !existsSync(path));
if (missing.length) {
  console.error('Repository verification failed. Missing:');
  missing.forEach((path) => console.error(`- ${path}`));
  process.exit(1);
}

const forbiddenPatterns = [
  'packages.applied-caas-gateway',
  'internal.api.openai.org',
];

for (const file of ['package-lock.json', '.npmrc']) {
  const content = readFileSync(file, 'utf8');
  for (const pattern of forbiddenPatterns) {
    if (content.includes(pattern)) {
      console.error(`Repository verification failed: ${file} contains forbidden registry reference: ${pattern}`);
      process.exit(1);
    }
  }
}

const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
if (!packageJson.scripts?.build) {
  console.error('Repository verification failed: package.json has no build script.');
  process.exit(1);
}

const integrationConfig = readFileSync('src/data/integrations.ts', 'utf8');
if (!integrationConfig.includes('portfolioApiUrl')) {
  console.error('Repository verification failed: integration configuration is incomplete.');
  process.exit(1);
}

const architectureMap = readFileSync('src/features/architecture/ArchitectureMap.astro', 'utf8');
if (!architectureMap.includes("../../data/architecture")) {
  console.error('Repository verification failed: ArchitectureMap is not connected to canonical architecture data.');
  process.exit(1);
}
const baseLayout = readFileSync('src/layouts/BaseLayout.astro', 'utf8');
for (const script of ['../scripts/motion.ts', '../scripts/signature-engine.ts']) {
  if (!baseLayout.includes(script)) {
    console.error(`Repository verification failed: BaseLayout is missing required progressive-enhancement script: ${script}`);
    process.exit(1);
  }
}
const signatureEngine = readFileSync('src/scripts/signature-engine.ts', 'utf8');
if (!signatureEngine.includes("prefers-reduced-motion") || !signatureEngine.includes('AudioContext')) {
  console.error('Repository verification failed: signature engine is missing accessibility/audio safeguards.');
  process.exit(1);
}

const projectWorld = readFileSync('src/features/projects/ProjectWorld.astro', 'utf8');
if (projectWorld.includes('GURU-BOT')) {
  console.error('Repository verification failed: deferred GURU-BOT is incorrectly presented as a project-world dependency.');
  process.exit(1);
}
console.log('GURUVERSE architecture, feature boundaries, live-integration files and npm registry configuration are valid.');
