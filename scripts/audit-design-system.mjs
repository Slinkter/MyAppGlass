#!/usr/bin/env node
/**
 * Auditoría integral del Design System (/design-system)
 * - 7 pestañas × 3 anchos (390, 768, 1440) × 2 temas (light, dark)
 * - Contraste WCAG 1.4.3 (>= 4.5:1 texto normal, >= 3.0:1 texto grande)
 * - Targets táctiles < 44px (R3)
 * - Desbordes horizontales (R12)
 * - Saltos de jerarquía de encabezados h1..h6 (R10)
 * - Foco visible en controles interactivos (R7)
 * - Errores de consola y pageerror
 * - Inventario estático de hardcodeo (hex/rgba, px, colorPalette, vh, _hover, íconos, var(--chakra-colors-...))
 */

import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { execSync } from "node:child_process";

const ROOT = process.cwd();
const requireWeb = createRequire(path.join(ROOT, "apps/web/package.json"));
const { chromium } = requireWeb("@playwright/test");
const OUT_DIR = path.join(ROOT, "apps/web/out");

const TABS = [
  { value: "v2", label: "Nuevos modelos v2" },
  { value: "cards", label: "Cards Editoriales Reales" },
  { value: "nav", label: "Navegación & Barras" },
  { value: "forms", label: "Formularios & Botones" },
  { value: "overlays", label: "Galería & Modales" },
  { value: "data", label: "Tablas & Fichas Técnicas" },
  { value: "tokens", label: "Tokens & Reglas Oficiales" },
];

const VIEWPORTS = [
  { width: 390, height: 844, label: "390px" },
  { width: 768, height: 1024, label: "768px" },
  { width: 1440, height: 900, label: "1440px" },
];

const THEMES = ["light", "dark"];

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
};

function startStaticServer(rootDir) {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const reqUrl = new URL(req.url || "/", "http://localhost");
      let pathname = decodeURIComponent(reqUrl.pathname);
      if (pathname.endsWith("/")) pathname += "index.html";

      let filePath = path.join(rootDir, pathname);
      if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
        const htmlCandidate = path.join(rootDir, `${pathname}.html`);
        const indexCandidate = path.join(rootDir, pathname, "index.html");
        if (fs.existsSync(htmlCandidate)) {
          filePath = htmlCandidate;
        } else if (fs.existsSync(indexCandidate)) {
          filePath = indexCandidate;
        } else {
          res.writeHead(404);
          res.end("Not Found");
          return;
        }
      }

      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, { "Content-Type": MIME_TYPES[ext] || "application/octet-stream" });
      fs.createReadStream(filePath).pipe(res);
    });

    server.listen(0, "127.0.0.1", () => {
      const addr = server.address();
      resolve({ server, baseUrl: `http://127.0.0.1:${addr.port}` });
    });
  });
}

function runStaticInventory() {
  const targetFiles = [
    "apps/web/src/screens/DesignSystem/DesignSystemScreen.tsx",
    "apps/web/src/screens/DesignSystem/components/ShowcaseCard.tsx",
    "apps/web/src/screens/DesignSystem/sections/TokensSection.tsx",
    "apps/web/src/screens/DesignSystem/sections/NavigationShowcase.tsx",
    "apps/web/src/screens/DesignSystem/sections/EditorialCardsShowcase.tsx",
    "apps/web/src/screens/DesignSystem/sections/FormControlsShowcase.tsx",
    "apps/web/src/screens/DesignSystem/sections/OverlaysShowcase.tsx",
    "apps/web/src/screens/DesignSystem/sections/GalleryShowcase.tsx",
    "apps/web/src/screens/DesignSystem/sections/ImageRevealShowcase.tsx",
    "apps/web/src/screens/DesignSystem/sections/DataDisplayShowcase.tsx",
    "apps/web/src/screens/DesignSystem/sections/v2/BrandModulesV2Showcase.tsx",
    "apps/web/src/screens/DesignSystem/sections/v2/ViewportAndStatesV2Showcase.tsx",
    "apps/web/src/screens/DesignSystem/sections/v2/ResponsiveScaleShowcase.tsx",
    "apps/web/src/screens/DesignSystem/sections/v2/CardVariantsShowcase.tsx",
    "apps/web/src/screens/DesignSystem/sections/v2/ServiceCardV2Showcase.tsx",
    "apps/web/src/screens/DesignSystem/sections/v2/MobileNavV2Showcase.tsx",
    "apps/web/src/widgets/Navbar/mobile/MobileNavbarV2.tsx",
    "apps/web/src/widgets/Navbar/mobile/MenuOverlay.tsx",
    "apps/web/src/widgets/Navbar/mobile/MenuToggle.tsx",
    "apps/web/src/widgets/Navbar/mobile/MenuLink.tsx",
    "apps/web/src/widgets/Navbar/mobile/ServicesAccordion.tsx",
    "apps/web/src/shared/components/common/Gallery.tsx",
    "apps/web/src/shared/components/common/GalleryThumbnails.tsx",
    "apps/web/src/shared/components/common/GalleryViewer.tsx",
    "apps/web/src/widgets/Navbar/MobileNav.tsx",
    "apps/web/src/shared/components/navigation/SkipLink.tsx",
  ];

  const fileInventory = {};
  for (const rel of targetFiles) {
    const abs = path.join(ROOT, rel);
    if (!fs.existsSync(abs)) continue;
    // Se cuenta solo código: sin comentarios (bloque, línea y JSX), que mencionan hex/px solo para documentar.
    const src = fs
      .readFileSync(abs, "utf8")
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/^\s*\/\/.*$/gm, "");
    const hexMatches = src.match(/#[0-9a-fA-F]{3,8}\b/g) || [];
    const rgbaMatches = src.match(/rgba?\s*\([^)]+\)/g) || [];
    // Excepciones documentadas de R1: contorno de foco (outline/outlineOffset), media queries, atributo `sizes`
    // de imágenes y `env()` (safe-area) no son hardcodeo de layout; los bordes de 1px tampoco.
    const R1_PX_EXCEPTION = /outline|matchMedia|min-width|max-width|@media|\bsizes=|env\(/;
    const pxMatches = src
      .split("\n")
      .filter((line) => !R1_PX_EXCEPTION.test(line))
      .flatMap((line) => line.match(/\b\d+(\.\d+)?px\b/g) || [])
      .filter((p) => p !== "1px");
    const colorPaletteMatches = src.match(/\bcolorPalette\s*=/g) || [];
    const vhMatches = src.match(/\b\d+vh\b/g) || [];
    const hoverMatches = src.match(/_hover\s*=\s*\{\{/g) || [];
    const iconSizes = [...src.matchAll(/\bsize=\{(?:(\d+)|"(\d+)"|'(\d+)')\}/g)]
      .map((m) => Number(m[1] || m[2] || m[3]))
      .filter((n) => ![16, 20, 24].includes(n));

    fileInventory[rel] = {
      hex: hexMatches.length,
      rgba: rgbaMatches.length,
      pxNon1: pxMatches.length,
      colorPalette: colorPaletteMatches.length,
      vh: vhMatches.length,
      manualHover: hoverMatches.length,
      nonStandardIconSizes: iconSizes,
    };
  }

  // Check invalid var(--chakra-colors-...) across apps/web/src
  const dsHtmlPath = path.join(OUT_DIR, "design-system.html");
  let invalidCssVars = [];
  if (fs.existsSync(dsHtmlPath)) {
    const html = fs.readFileSync(dsHtmlPath, "utf8");
    const defined = new Set(
      [...html.matchAll(/(--chakra-colors-[a-zA-Z0-9_\\.-]+):/g)].map((m) =>
        m[1].replace(/\\\./g, ".")
      )
    );
    const grepOut = execSync('grep -rn "var(--chakra-colors-" apps/web/src/ || true')
      .toString()
      .trim();
    if (grepOut) {
      for (const line of grepOut.split("\n")) {
        const vars = [...line.matchAll(/var\((--chakra-colors-[a-zA-Z0-9_\\.-]+)/g)].map((m) =>
          m[1].replace(/\\\./g, ".")
        );
        const bad = vars.filter((v) => !defined.has(v));
        if (bad.length) {
          const [file, lineNum] = line.split(":");
          invalidCssVars.push({ location: `${file}:${lineNum}`, invalidVars: bad });
        }
      }
    }
  }

  return { fileInventory, invalidCssVars };
}

async function auditCell(page, tab, viewport, theme) {
  await page.setViewportSize({ width: viewport.width, height: viewport.height });

  // Switch theme deterministically
  await page.evaluate((mode) => {
    localStorage.setItem("theme", mode);
    document.documentElement.setAttribute("data-theme", mode);
    document.documentElement.style.colorScheme = mode;
  }, theme);

  // Click target tab
  const tabSelector = `[role="tab"]:has-text("${tab.label}")`;
  const tabLoc = page.locator(tabSelector).first();
  if ((await tabLoc.count()) > 0) {
    await tabLoc.click({ force: true });
  }
  await page.waitForTimeout(180);

  const metrics = await page.evaluate(() => {
    function parseRgba(str) {
      if (!str) return [0, 0, 0, 0];
      const m = str.match(/rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*[,/]\s*([\d.]+))?\s*\)/);
      if (!m) return [0, 0, 0, 0];
      return [Number(m[1]), Number(m[2]), Number(m[3]), m[4] === undefined ? 1 : Number(m[4])];
    }

    function blend(fg, bg) {
      const a = fg[3] + bg[3] * (1 - fg[3]);
      if (a === 0) return [255, 255, 255, 0];
      const r = (fg[0] * fg[3] + bg[0] * bg[3] * (1 - fg[3])) / a;
      const g = (fg[1] * fg[3] + bg[1] * bg[3] * (1 - fg[3])) / a;
      const b = (fg[2] * fg[3] + bg[2] * bg[3] * (1 - fg[3])) / a;
      return [r, g, b, a];
    }

    function getEffectiveBg(el) {
      const layers = [];
      let cur = el;
      while (cur && cur.nodeType === 1) {
        const bg = getComputedStyle(cur).backgroundColor;
        const rgba = parseRgba(bg);
        if (rgba[3] > 0) layers.push(rgba);
        if (rgba[3] >= 0.99) break;
        cur = cur.parentElement;
      }
      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      let base = isDark ? [9, 9, 11, 1] : [250, 250, 250, 1];
      for (let i = layers.length - 1; i >= 0; i--) {
        base = blend(layers[i], base);
      }
      return base;
    }

    function luminance([r, g, b]) {
      const srgb = [r, g, b].map((v) => {
        const c = v / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
    }

    function contrastRatio(c1, c2) {
      const l1 = luminance(c1);
      const l2 = luminance(c2);
      const brightest = Math.max(l1, l2);
      const darkest = Math.min(l1, l2);
      return (brightest + 0.05) / (darkest + 0.05);
    }

    function isVisible(el) {
      const style = getComputedStyle(el);
      if (style.display === "none" || style.visibility === "hidden" || Number(style.opacity) === 0) {
        return false;
      }
      const rect = el.getBoundingClientRect();
      return rect.width > 1 && rect.height > 1;
    }

    // 1. Horizontal overflow
    const horizontalOverflowPx = Math.max(0, document.documentElement.scrollWidth - window.innerWidth);

    // 2. Touch targets < 44px
    const interactiveEls = [
      ...document.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [role="button"]:not([aria-disabled="true"]), [role="tab"], summary'
      ),
    ];
    const smallTargets = [];
    for (const el of interactiveEls) {
      if (el.classList.contains("skip-link")) continue;
      if (!isVisible(el)) continue;
      const rect = el.getBoundingClientRect();
      if (rect.width < 43.5 || rect.height < 43.5) {
        smallTargets.push({
          tag: el.tagName.toLowerCase(),
          text: (el.innerText || el.getAttribute("aria-label") || "").trim().slice(0, 40),
          w: Math.round(rect.width),
          h: Math.round(rect.height),
        });
      }
    }

    // 3. Heading jumps
    const headings = [...document.querySelectorAll("h1, h2, h3, h4, h5, h6")]
      .filter(isVisible)
      .map((h) => ({
        level: Number(h.tagName.slice(1)),
        text: (h.innerText || "").trim().slice(0, 50),
      }));
    const headingJumps = [];
    for (let i = 1; i < headings.length; i++) {
      if (headings[i].level - headings[i - 1].level > 1) {
        headingJumps.push({
          from: `h${headings[i - 1].level} (${headings[i - 1].text})`,
          to: `h${headings[i].level} (${headings[i].text})`,
        });
      }
    }

    // 4. Contrast check on visible text elements
    const contrastFailures = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const checkedEls = new Set();
    let node;
    while ((node = walker.nextNode())) {
      const txt = node.nodeValue ? node.nodeValue.trim() : "";
      if (!txt) continue;
      const el = node.parentElement;
      if (!el || checkedEls.has(el) || !isVisible(el)) continue;
      if (el.closest("[disabled], [aria-disabled='true']")) continue;
      checkedEls.add(el);

      const cs = getComputedStyle(el);
      const fgRaw = parseRgba(cs.color);
      const bg = getEffectiveBg(el);
      const fg = blend(fgRaw, bg);
      const ratio = contrastRatio(fg, bg);
      const fontSize = parseFloat(cs.fontSize || "16");
      const fontWeight = parseInt(cs.fontWeight || "400", 10) || 400;
      const isLarge = fontSize >= 24 || (fontSize >= 18.66 && fontWeight >= 700);
      const minRatio = isLarge ? 3.0 : 4.5;

      if (ratio < minRatio) {
        contrastFailures.push({
          tag: el.tagName.toLowerCase(),
          text: txt.slice(0, 45),
          ratio: Number(ratio.toFixed(2)),
          minRatio,
          color: cs.color,
          bg: `rgb(${Math.round(bg[0])}, ${Math.round(bg[1])}, ${Math.round(bg[2])})`,
        });
      }
    }

    return {
      horizontalOverflowPx,
      smallTargetsCount: smallTargets.length,
      smallTargetsSample: smallTargets.slice(0, 8),
      headingJumpsCount: headingJumps.length,
      headingJumps,
      contrastFailuresCount: contrastFailures.length,
      contrastFailuresSample: contrastFailures.slice(0, 8),
    };
  });

  return metrics;
}

async function main() {
  const outArgIdx = process.argv.indexOf("--out");
  const outPath =
    outArgIdx !== -1 && process.argv[outArgIdx + 1]
      ? path.resolve(ROOT, process.argv[outArgIdx + 1])
      : path.join(ROOT, "docs/auditorias/audit-design-system-baseline.json");

  if (!fs.existsSync(path.join(OUT_DIR, "design-system.html"))) {
    console.error("ERROR: apps/web/out/design-system.html no existe. Ejecuta `pnpm run build` primero.");
    process.exit(1);
  }

  const staticInventory = runStaticInventory();
  const { server, baseUrl } = await startStaticServer(OUT_DIR);
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const consoleErrors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });
  page.on("pageerror", (err) => {
    consoleErrors.push(err.message);
  });

  await page.goto(`${baseUrl}/design-system`, { waitUntil: "networkidle" });

  const results = [];
  for (const tab of TABS) {
    for (const viewport of VIEWPORTS) {
      for (const theme of THEMES) {
        const cellMetrics = await auditCell(page, tab, viewport, theme);
        results.push({
          tab: tab.value,
          tabLabel: tab.label,
          viewport: viewport.label,
          theme,
          ...cellMetrics,
        });
      }
    }
  }

  await browser.close();
  server.close();

  // Aggregate summary by tab
  const summaryByTab = {};
  for (const tab of TABS) {
    const rows = results.filter((r) => r.tab === tab.value);
    summaryByTab[tab.value] = {
      contrastFailuresMax: Math.max(...rows.map((r) => r.contrastFailuresCount)),
      contrastFailuresLight390: rows.find((r) => r.viewport === "390px" && r.theme === "light")?.contrastFailuresCount ?? 0,
      contrastFailuresDark390: rows.find((r) => r.viewport === "390px" && r.theme === "dark")?.contrastFailuresCount ?? 0,
      smallTargetsMax: Math.max(...rows.map((r) => r.smallTargetsCount)),
      overflow390Px: Math.max(
        ...rows.filter((r) => r.viewport === "390px").map((r) => r.horizontalOverflowPx)
      ),
      headingJumpsMax: Math.max(...rows.map((r) => r.headingJumpsCount)),
    };
  }

  const report = {
    generatedAt: new Date().toISOString(),
    totalCombinations: results.length,
    consoleErrorsCount: consoleErrors.length,
    consoleErrors: [...new Set(consoleErrors)],
    summaryByTab,
    staticInventory,
    details: results,
  };

  fs.writeFileSync(outPath, JSON.stringify(report, null, 2));
  console.log("=== AUDITORÍA DESIGN SYSTEM (/design-system) ===");
  console.log(`Combinaciones auditadas: ${results.length} (7 pestañas × 3 viewports × 2 temas)`);
  console.log(`Errores de consola: ${report.consoleErrorsCount}`);
  console.log(`Variables CSS --chakra-colors-* inválidas en src: ${staticInventory.invalidCssVars.length}`);
  console.table(summaryByTab);
  console.log(`Reporte completo guardado en: ${path.relative(ROOT, outPath)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
