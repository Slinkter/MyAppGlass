#!/usr/bin/env node
/**
 * Auditoría de composición de la landing (`/`): mide la calidad del diseño como página, no solo por componente.
 * Métricas por ancho (360, 768, 1280):
 *  - altura de página en «pantallas» (altura total / alto del viewport)
 *  - secciones con su altura y número de pantallas
 *  - rejillas (grid) con filas huérfanas (última fila incompleta)
 *  - llamadas a la acción primarias (enlaces a wa.me o «Cotizar») y la mayor distancia entre ellas, en pantallas
 *  - tamaños tipográficos distintos usados en la página
 *  - espaciado vertical entre secciones (valores distintos)
 *  - jerarquía de encabezados (saltos) y número de h1
 *  - desborde horizontal
 * Uso: `pnpm run build && node scripts/audit-landing.mjs [salida.json]` (sirve `apps/web/out`).
 */

import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const ROOT = process.cwd();
const requireWeb = createRequire(path.join(ROOT, "apps/web/package.json"));
const { chromium } = requireWeb("@playwright/test");
const OUT_DIR = path.join(ROOT, "apps/web/out");
const REPORT = process.argv[2] || path.join(ROOT, "docs/auditorias/audit-landing.json");

const VIEWPORTS = [
  { width: 360, height: 740 },
  { width: 768, height: 1024 },
  { width: 1280, height: 800 },
];

const MIME = {
  ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml",
  ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".json": "application/json", ".woff2": "font/woff2",
};

const server = http.createServer((req, res) => {
  const p = decodeURIComponent(req.url.split("?")[0]);
  let f = path.join(OUT_DIR, p);
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, "index.html");
  if (!fs.existsSync(f) && fs.existsSync(f + ".html")) f += ".html";
  if (!fs.existsSync(f)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { "content-type": MIME[path.extname(f)] || "application/octet-stream" });
  fs.createReadStream(f).pipe(res);
}).listen(4583);

/** Se ejecuta en el navegador. */
function measure() {
  const vh = window.innerHeight;
  const H = document.documentElement.scrollHeight;
  const abs = (el) => { const r = el.getBoundingClientRect(); return { top: r.top + scrollY, h: r.height, w: r.width }; };

  const sections = [...document.querySelectorAll("main section, main > div > section, section[id]")].filter((s) => !s.parentElement.closest("section"))
    .filter((s, i, a) => a.indexOf(s) === i)
    .map((s) => ({ id: s.id || s.getAttribute("aria-label") || s.tagName.toLowerCase(), ...abs(s) }))
    .map((s) => ({ id: s.id, top: Math.round(s.top), height: Math.round(s.h), screens: +(s.h / vh).toFixed(2) }));

  const gaps = [];
  for (let i = 1; i < sections.length; i++) gaps.push(sections[i].top - (sections[i - 1].top + sections[i - 1].height));

  const orphans = [];
  for (const g of document.querySelectorAll("*")) {
    const cs = getComputedStyle(g);
    if (cs.display !== "grid") continue;
    const cols = cs.gridTemplateColumns.split(" ").filter(Boolean).length;
    const items = [...g.children].filter((c) => getComputedStyle(c).display !== "none");
    if (cols < 2 || items.length < 4) continue;
    const rem = items.length % cols;
    if (rem !== 0) orphans.push({ cols, items: items.length, lastRow: rem, section: g.closest("section")?.id || "" });
  }

  const cta = [...document.querySelectorAll("a, button")]
    .filter((e) => /wa\.me/.test(e.getAttribute("href") || "") || /cotizar/i.test(e.textContent || ""))
    .filter((e) => getComputedStyle(e).position !== "fixed" && e.offsetParent !== null)
    .map((e) => Math.round(abs(e).top));
  const ctaSorted = [...new Set(cta)].sort((a, b) => a - b);
  const pts = [0, ...ctaSorted, H];
  let maxGap = 0;
  for (let i = 1; i < pts.length; i++) maxGap = Math.max(maxGap, pts[i] - pts[i - 1]);

  const sizes = new Set();
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const n = walker.currentNode;
    if (!n.textContent.trim() || !n.parentElement || n.parentElement.closest("script,style,noscript")) continue;
    const cs = getComputedStyle(n.parentElement);
    if (cs.display === "none" || cs.visibility === "hidden") continue;
    sizes.add(Math.round(parseFloat(cs.fontSize)));
  }

  const hs = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].map((h) => +h.tagName[1]);
  let jumps = 0;
  for (let i = 1; i < hs.length; i++) if (hs[i] - hs[i - 1] > 1) jumps++;

  return {
    pageHeight: H,
    pageScreens: +(H / vh).toFixed(2),
    sections,
    sectionGapsPx: gaps,
    distinctGaps: [...new Set(gaps.map((g) => Math.round(g / 8) * 8))].length,
    gridOrphans: orphans,
    primaryCtaCount: ctaSorted.length,
    maxScreensWithoutCta: +(maxGap / vh).toFixed(2),
    distinctFontSizes: [...sizes].sort((a, b) => a - b),
    headingJumps: jumps,
    h1Count: hs.filter((n) => n === 1).length,
    overflowX: document.documentElement.scrollWidth - innerWidth,
  };
}

const browser = await chromium.launch();
const results = {};
for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({ viewport: vp });
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("http://localhost:4583/index.html");
  await page.waitForTimeout(1500);
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 400) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); }
    scrollTo(0, 0);
  });
  await page.waitForTimeout(1000);
  results[`${vp.width}px`] = { ...(await page.evaluate(measure)), jsErrors: errors.length };
  await ctx.close();
}
await browser.close();
server.close();

fs.writeFileSync(REPORT, JSON.stringify({ generatedAt: new Date().toISOString(), results }, null, 2));
const row = (k, v) => `${k.padEnd(34)} ${v}`;
for (const [w, r] of Object.entries(results)) {
  console.log(`\n=== ${w} ===`);
  console.log(row("pantallas de alto", r.pageScreens));
  console.log(row("secciones (pantallas)", r.sections.map((s) => `${s.id}:${s.screens}`).join(" ")));
  console.log(row("espaciados distintos entre secciones", `${r.distinctGaps} (${r.sectionGapsPx.join(", ")})`));
  console.log(row("rejillas con huérfanos", r.gridOrphans.length ? JSON.stringify(r.gridOrphans) : "0"));
  console.log(row("CTAs primarias / máx. pantallas sin CTA", `${r.primaryCtaCount} / ${r.maxScreensWithoutCta}`));
  console.log(row("tamaños tipográficos distintos", `${r.distinctFontSizes.length} (${r.distinctFontSizes.join(", ")})`));
  console.log(row("saltos de encabezado / h1", `${r.headingJumps} / ${r.h1Count}`));
  console.log(row("desborde X / errores JS", `${r.overflowX} / ${r.jsErrors}`));
}
console.log(`\nReporte: ${REPORT}`);
