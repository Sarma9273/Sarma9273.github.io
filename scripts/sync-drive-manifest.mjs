import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const source = process.argv[2];
if (!source) {
  console.error('Usage: npm run sync:drive -- /path/to/portfolio-content.json');
  process.exit(1);
}

const inputPath = resolve(source);
const outputPath = resolve('src/data/drive-manifest.json');
const raw = await readFile(inputPath, 'utf8');
const data = JSON.parse(raw);

if (!Array.isArray(data.blogs)) {
  throw new Error('The manifest must contain a blogs array.');
}

await writeFile(outputPath, JSON.stringify(data, null, 2) + '\n', 'utf8');
console.log(`Drive manifest copied to ${outputPath}`);
console.log(`Blog records: ${data.blogs.length}`);
console.log('Run npm run build to validate the portfolio.');
