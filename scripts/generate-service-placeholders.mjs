import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const WIDTH = 1200;
const HEIGHT = 800;
const WEBP_QUALITY = 82;
const DEFAULT_OUT_DIR = path.resolve("apps/web/public/images/services");

const SERVICES = [
  { slug: "ventana", title: "Ventanas" },
  { slug: "mampara", title: "Mamparas" },
  { slug: "ducha", title: "Boxes de ducha" },
  { slug: "pvidrio", title: "Puertas de vidrio" },
  { slug: "pserie", title: "Puertas de aluminio" },
  { slug: "parapeto", title: "Parapetos y muros cortina" },
  { slug: "baranda", title: "Barandas de acero y aluminio" },
  { slug: "balcones", title: "Balcones" },
  { slug: "techo", title: "Techos sol y sombra" },
  { slug: "celosias", title: "Celosías de aluminio" },
  { slug: "espejos", title: "Espejos" },
  { slug: "frenos-hidraulicos", title: "Frenos hidráulicos para puertas" },
  { slug: "mantenimiento", title: "Mantenimiento en general" },
];

function escapeXml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function parseArgs(argv) {
  let outDir = DEFAULT_OUT_DIR;
  let onlySlugs = null;

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg.startsWith("--out=")) {
      outDir = path.resolve(arg.slice("--out=".length));
    } else if (arg === "--out" && argv[i + 1]) {
      outDir = path.resolve(argv[i + 1]);
      i += 1;
    } else if (arg.startsWith("--only=")) {
      onlySlugs = arg
        .slice("--only=".length)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    } else if (arg === "--only" && argv[i + 1]) {
      onlySlugs = argv[i + 1]
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      i += 1;
    }
  }

  return { outDir, onlySlugs };
}

function buildPlaceholderSvg(title) {
  const safeTitle = escapeXml(title);
  const titleFontSize = title.length > 26 ? 44 : 52;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#2A2D31" stroke-width="1" />
    </pattern>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="#111214" />
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#grid)" />
  <rect x="0" y="0" width="${WIDTH}" height="8" fill="#FF5A5F" />
  <text
    x="${WIDTH / 2}"
    y="${HEIGHT / 2 - 12}"
    text-anchor="middle"
    dominant-baseline="middle"
    font-family="sans-serif"
    font-size="${titleFontSize}"
    font-weight="600"
    fill="#F5F5F5"
  >${safeTitle}</text>
  <text
    x="${WIDTH / 2}"
    y="${HEIGHT / 2 + 46}"
    text-anchor="middle"
    dominant-baseline="middle"
    font-family="sans-serif"
    font-size="22"
    font-weight="400"
    fill="#9CA3AF"
  >Imagen referencial · GYA Company</text>
</svg>`;
}

async function main() {
  const { outDir, onlySlugs } = parseArgs(process.argv.slice(2));

  let targets = SERVICES;
  if (onlySlugs) {
    const validSlugs = new Set(SERVICES.map((s) => s.slug));
    const unknown = onlySlugs.filter((s) => !validSlugs.has(s));
    if (unknown.length > 0) {
      console.error(`Slugs desconocidos: ${unknown.join(", ")}`);
      process.exit(1);
    }
    const filterSet = new Set(onlySlugs);
    targets = SERVICES.filter((s) => filterSet.has(s.slug));
  }

  await fs.mkdir(outDir, { recursive: true });

  for (const service of targets) {
    const svg = buildPlaceholderSvg(service.title);
    const outPath = path.join(outDir, `${service.slug}-placeholder.webp`);

    await sharp(Buffer.from(svg))
      .resize(WIDTH, HEIGHT)
      .webp({ quality: WEBP_QUALITY })
      .toFile(outPath);

    const stat = await fs.stat(outPath);
    const sizeKb = (stat.size / 1024).toFixed(2);
    const relPath = path.relative(process.cwd(), outPath).replace(/\\/g, "/");
    console.log(`${relPath} (${stat.size} bytes / ${sizeKb} KB)`);
  }
}

main().catch((err) => {
  console.error("Error generando placeholders:", err);
  process.exit(1);
});
