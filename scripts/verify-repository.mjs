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
  'src/content.config.ts',
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

console.log('Repository structure and npm registry configuration are valid.');
