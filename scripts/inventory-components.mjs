#!/usr/bin/env node
/**
 * Inventario de componentes: lista cada componente de la web, si `/design-system` lo muestra y cuánto
 * estilo suelto tiene (hex, rgba, colorPalette, _hover a mano, px literales). Solo lectura.
 * Uso: `node scripts/inventory-components.mjs` → docs/auditorias/INVENTARIO-COMPONENTES.md
 */
import fs from "node:fs";
import path from "node:path";

const SRC = path.join(process.cwd(), "apps/web/src");
const OUT = path.join(process.cwd(), "docs/auditorias/INVENTARIO-COMPONENTES.md");

function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (/\.tsx$/.test(e.name)) acc.push(p);
  }
  return acc;
}

const rel = (p) => path.relative(SRC, p).replace(/\\/g, "/");
const dsDir = path.join(SRC, "screens/DesignSystem");
const dsText = walk(dsDir).concat(walk(path.join(SRC, "screens/DesignSystemUbicacion")))
  .map((f) => fs.readFileSync(f, "utf8")).join("\n");

const GROUPS = [
  ["Primitivas (components/ui)", "components/ui"],
  ["Compartidos (shared/components)", "shared/components"],
  ["Globales (widgets)", "widgets"],
];
const featureDirs = fs.readdirSync(path.join(SRC, "features"), { withFileTypes: true })
  .filter((d) => d.isDirectory()).map((d) => d.name);
for (const f of featureDirs) {
  if (fs.existsSync(path.join(SRC, "features", f, "components"))) GROUPS.push([`Feature · ${f}`, `features/${f}/components`]);
}

const count = (s, re) => (s.match(re) || []).length;
const rows = [];
for (const [group, dir] of GROUPS) {
  const abs = path.join(SRC, dir);
  if (!fs.existsSync(abs)) continue;
  for (const file of walk(abs)) {
    const text = fs.readFileSync(file, "utf8");
    const base = path.basename(file, ".tsx");
    const inDs = base !== "index" && new RegExp(`\\b${base}\\b`).test(dsText);
    rows.push({
      group,
      file: rel(file),
      name: base,
      lines: text.split("\n").length,
      inDs,
      hex: count(text, /#[0-9a-fA-F]{3,8}\b/g),
      rgba: count(text, /rgba?\(/g),
      palette: count(text, /colorPalette/g),
      hover: count(text, /_hover=\{\{/g),
      vh: count(text, /\b100vh\b/g),
    });
  }
}

const loose = (r) => r.hex + r.rgba + r.palette + r.hover + r.vh;
const status = (r) => (loose(r) === 0 ? (r.inDs ? "estándar" : "estándar · sin showcase") : r.inDs ? "a corregir" : "a corregir · sin showcase");

let md = `# Inventario de componentes\n\n> Generado por \`scripts/inventory-components.mjs\` (solo lectura). Estilo suelto = hex + rgba + colorPalette + \`_hover\` a mano + \`100vh\`. «Showcase» = el nombre aparece en \`/design-system\` o \`/design-system-ubicacion\`.\n\n`;
const total = rows.length;
const std = rows.filter((r) => loose(r) === 0).length;
const noDs = rows.filter((r) => !r.inDs).length;
md += `**Resumen:** ${total} componentes · ${std} sin estilo suelto · ${total - std} a corregir · ${noDs} sin showcase en \`/design-system\`.\n\n`;

const by = {};
rows.forEach((r) => (by[r.group] ||= []).push(r));
md += `| Grupo | Componentes | Sin estilo suelto | A corregir | Sin showcase |\n|---|---|---|---|---|\n`;
for (const [g, rs] of Object.entries(by)) {
  md += `| ${g} | ${rs.length} | ${rs.filter((r) => loose(r) === 0).length} | ${rs.filter((r) => loose(r) > 0).length} | ${rs.filter((r) => !r.inDs).length} |\n`;
}
md += `\n`;
for (const [g, rs] of Object.entries(by)) {
  md += `## ${g}\n\n| Componente | Archivo | Líneas | hex | rgba | colorPalette | _hover | vh | Showcase | Estado |\n|---|---|---|---|---|---|---|---|---|---|\n`;
  for (const r of rs.sort((a, b) => loose(b) - loose(a) || a.name.localeCompare(b.name))) {
    md += `| ${r.name} | \`${r.file}\` | ${r.lines} | ${r.hex} | ${r.rgba} | ${r.palette} | ${r.hover} | ${r.vh} | ${r.inDs ? "sí" : "no"} | ${status(r)} |\n`;
  }
  md += `\n`;
}
fs.writeFileSync(OUT, md);

console.log(`Componentes: ${total} · sin estilo suelto: ${std} · a corregir: ${total - std} · sin showcase: ${noDs}`);
for (const [g, rs] of Object.entries(by)) console.log(`${g.padEnd(38)} ${String(rs.length).padStart(3)} comp · a corregir ${rs.filter((r) => loose(r) > 0).length} · sin showcase ${rs.filter((r) => !r.inDs).length}`);
console.log("\nTop 12 con más estilo suelto:");
rows.sort((a, b) => loose(b) - loose(a)).slice(0, 12).forEach((r) => console.log(`${String(loose(r)).padStart(4)}  ${r.file}`));
