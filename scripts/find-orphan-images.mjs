import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const srcDir = path.join(root, 'src');
const pubDir = path.join(root, 'public', 'images');

async function walk(dir, exts) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...(await walk(p, exts)));
    else if (exts.some((x) => e.name.endsWith(x))) files.push(p);
  }
  return files;
}

const refs = new Set();
for (const f of await walk(srcDir, ['.ts', '.tsx', '.js', '.jsx', '.json'])) {
  const content = await fs.readFile(f, 'utf8');
  for (const m of content.matchAll(/['"](\/images\/[^'"]+)['"]/g)) refs.add(m[1]);
}

const webps = (await fs.readdir(pubDir)).filter((f) => f.endsWith('.webp'));
const orphans = webps.filter((f) => !refs.has(`/images/${f}`));

console.log(`Referenced: ${refs.size}`);
console.log(`Webps total: ${webps.length}`);
console.log(`Orphans: ${orphans.length}`);

const groups = {};
for (const o of orphans) {
  const key = o.startsWith('projects-OBRAVITTORIE')
    ? 'OBRAVITTORIE'
    : o.startsWith('services-products-10')
      ? 'services-10'
      : o.startsWith('common-')
        ? 'common'
        : o.startsWith('firma-')
          ? 'firma'
          : o.startsWith('home-img_')
            ? 'home-img'
            : o.startsWith('branding-')
              ? 'branding'
              : 'other';
  groups[key] = (groups[key] || 0) + 1;
}
console.log('Groups:', JSON.stringify(groups, null, 2));

await fs.writeFile(path.join(root, 'scripts', 'orphan-images.txt'), orphans.join('\n'));
