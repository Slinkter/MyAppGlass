/**
 * Generador del modelo techo/default.glb — Pérgola rectangular moderna
 * Estructura: Columnas + Vigas principales + Travesaños + Celosía + Policarbonato bronce
 * Ejecutar: node scripts/generate-techo-pergola.mjs
 */
import { Document, NodeIO } from "@gltf-transform/core";
import { writeFileSync, mkdirSync, statSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "..", "public", "models", "techo");
mkdirSync(OUT_DIR, { recursive: true });

// ── Geometry helpers ──────────────────────────────────────────────────────────

function box(cx, cy, cz, sx, sy, sz) {
  const hx = sx / 2, hy = sy / 2, hz = sz / 2;
  const positions = new Float32Array([
    // +Z face
    cx-hx,cy-hy,cz+hz, cx+hx,cy-hy,cz+hz, cx+hx,cy+hy,cz+hz,
    cx-hx,cy-hy,cz+hz, cx+hx,cy+hy,cz+hz, cx-hx,cy+hy,cz+hz,
    // -Z face
    cx+hx,cy-hy,cz-hz, cx-hx,cy-hy,cz-hz, cx-hx,cy+hy,cz-hz,
    cx+hx,cy-hy,cz-hz, cx-hx,cy+hy,cz-hz, cx+hx,cy+hy,cz-hz,
    // +X face
    cx+hx,cy-hy,cz+hz, cx+hx,cy-hy,cz-hz, cx+hx,cy+hy,cz-hz,
    cx+hx,cy-hy,cz+hz, cx+hx,cy+hy,cz-hz, cx+hx,cy+hy,cz+hz,
    // -X face
    cx-hx,cy-hy,cz-hz, cx-hx,cy-hy,cz+hz, cx-hx,cy+hy,cz+hz,
    cx-hx,cy-hy,cz-hz, cx-hx,cy+hy,cz+hz, cx-hx,cy+hy,cz-hz,
    // +Y face (top)
    cx-hx,cy+hy,cz+hz, cx+hx,cy+hy,cz+hz, cx+hx,cy+hy,cz-hz,
    cx-hx,cy+hy,cz+hz, cx+hx,cy+hy,cz-hz, cx-hx,cy+hy,cz-hz,
    // -Y face (bottom)
    cx-hx,cy-hy,cz-hz, cx+hx,cy-hy,cz-hz, cx+hx,cy-hy,cz+hz,
    cx-hx,cy-hy,cz-hz, cx+hx,cy-hy,cz+hz, cx-hx,cy-hy,cz+hz,
  ]);
  const normals = new Float32Array([
    0,0,1,0,0,1,0,0,1, 0,0,1,0,0,1,0,0,1,
    0,0,-1,0,0,-1,0,0,-1, 0,0,-1,0,0,-1,0,0,-1,
    1,0,0,1,0,0,1,0,0, 1,0,0,1,0,0,1,0,0,
    -1,0,0,-1,0,0,-1,0,0, -1,0,0,-1,0,0,-1,0,0,
    0,1,0,0,1,0,0,1,0, 0,1,0,0,1,0,0,1,0,
    0,-1,0,0,-1,0,0,-1,0, 0,-1,0,0,-1,0,0,-1,0,
  ]);
  return { positions, normals };
}

function merge(geos) {
  const tp = geos.reduce((s, g) => s + g.positions.length, 0);
  const tn = geos.reduce((s, g) => s + g.normals.length, 0);
  const pos = new Float32Array(tp);
  const nrm = new Float32Array(tn);
  let op = 0, on = 0;
  for (const g of geos) {
    pos.set(g.positions, op); op += g.positions.length;
    nrm.set(g.normals, on); on += g.normals.length;
  }
  return { positions: pos, normals: nrm };
}

// ── Materials ─────────────────────────────────────────────────────────────────

function createMaterials(doc) {
  return {
    // Aluminio con acabado texturizado tipo madera nogal/teca
    woodAluminum: doc.createMaterial("AluminioMaderaNogal")
      .setBaseColorFactor([0.42, 0.28, 0.16, 1])  // nogal/teca oscuro
      .setMetallicFactor(0.45)
      .setRoughnessFactor(0.65),                    // rugosidad de madera

    // Aluminio negro mate (base de columnas, opcional acento)
    blackAluminum: doc.createMaterial("AluminioNegroMate")
      .setBaseColorFactor([0.08, 0.08, 0.08, 1])
      .setMetallicFactor(0.85)
      .setRoughnessFactor(0.35),

    // Policarbonato alveolar bronce translúcido
    bronzePoly: doc.createMaterial("PolicarbonatoBronce")
      .setBaseColorFactor([0.55, 0.38, 0.22, 0.5])  // bronce cálido
      .setMetallicFactor(0)
      .setRoughnessFactor(0.12)
      .setAlphaMode("BLEND"),

    // Acero inoxidable (detalles, tornillos, refuerzos)
    steel: doc.createMaterial("AceroInox")
      .setBaseColorFactor([0.78, 0.78, 0.80, 1])
      .setMetallicFactor(0.92)
      .setRoughnessFactor(0.18),
  };
}

// ── Mesh helper ───────────────────────────────────────────────────────────────

function addMesh(doc, buffer, name, geo, material) {
  const pos = doc.createAccessor(`${name}_pos`).setType("VEC3")
    .setArray(new Float32Array(geo.positions)).setBuffer(buffer);
  const nrm = doc.createAccessor(`${name}_nrm`).setType("VEC3")
    .setArray(new Float32Array(geo.normals)).setBuffer(buffer);
  const prim = doc.createPrimitive().setAttribute("POSITION", pos)
    .setAttribute("NORMAL", nrm).setMaterial(material);
  return doc.createMesh(name).addPrimitive(prim);
}

// ── Pérgola generator ─────────────────────────────────────────────────────────
//
//  Estructura vista desde arriba (planta):
//
//     Col_A ───── vigaL ───── Col_B        ← vigaL = viga larga izquierda
//       │   celosía (slats)    │
//     Col_C ───── vigaR ───── Col_D        ← vigaR = viga larga derecha
//
//  Vista lateral:
//
//     [policarbonato]  ─────────────────
//     ─── slats (celosía horizontal) ──
//     ═══ vigaL / vigaR (travesaños) ═══
//     │                           │
//     │  Columna  │    │  Columna │  (h = 2.5m)
//     │                           │
//     ─────────────────────────────── suelo
//

function genTechoPergola(doc, buffer, mats) {
  // Dimensions (meters)
  const L = 4.0;        // largo (eje Z) — front-to-back
  const W = 3.0;        // ancho  (eje X) — side-to-side
  const H_COL = 2.5;    // altura columnas
  const COL_W = 0.10;   // sección columna (cuadrada)
  const BEAM_W = 0.12;  // sección viga principal
  const BEAM_H = 0.08;  // altura viga
  const SLAT_W = 0.04;  // ancho lama celosía
  const SLAT_H = 0.03;  // alto lama
  const SLAT_GAP = 0.18;// separación entre lamas
  const POLY_T = 0.015; // espesor policarbonato

  const parts = [];

  // ── 1. Columnas (4 esquinas) ──────────────────────────────────────────────
  const colPositions = [
    [-W/2 + COL_W/2, 0, -L/2 + COL_W/2],  // A (front-left)
    [ W/2 - COL_W/2, 0, -L/2 + COL_W/2],  // B (front-right)
    [-W/2 + COL_W/2, 0,  L/2 - COL_W/2],  // C (back-left)
    [ W/2 - COL_W/2, 0,  L/2 - COL_W/2],  // D (back-right)
  ];

  for (const [cx, _cy, cz] of colPositions) {
    // Columna: base en y=0, tope en y=H_COL
    const cy = H_COL / 2;
    parts.push(box(cx, cy, cz, COL_W, H_COL, COL_W));
  }

  // ── 2. Vigas principales (2 vigas largas en eje Z, sobre columnas) ────────
  const beamY = H_COL + BEAM_H / 2;
  // Viga izquierda (X = -W/2 + COL_W)
  parts.push(box(-W/2 + COL_W/2, beamY, 0, BEAM_W, BEAM_H, L));
  // Viga derecha (X = W/2 - COL_W)
  parts.push(box( W/2 - COL_W/2, beamY, 0, BEAM_W, BEAM_H, L));

  // ── 3. Travesaños (vigas transversales en eje X, sobre vigas principales) ─
  const crossY = H_COL + BEAM_H + BEAM_H / 2;
  const numCross = 4;
  const crossSpacing = L / (numCross + 1);
  for (let i = 1; i <= numCross; i++) {
    const z = -L/2 + crossSpacing * i;
    parts.push(box(0, crossY, z, W, BEAM_H * 0.7, BEAM_W * 0.7));
  }

  // ── 4. Celosía — lamas horizontales (eje X) entre vigas principales ─────
  const slatY = H_COL + BEAM_H * 2 + SLAT_H / 2 + 0.01;
  const numSlats = Math.floor((L - 0.2) / SLAT_GAP);
  const slatOffsetZ = -(numSlats - 1) * SLAT_GAP / 2;
  for (let i = 0; i < numSlats; i++) {
    const z = slatOffsetZ + i * SLAT_GAP;
    parts.push(box(0, slatY, z, W - COL_W * 2 - 0.02, SLAT_H, SLAT_W));
  }

  // ── 5. Policarbonato bronce (placa sobre celosía) ─────────────────────────
  const polyY = H_COL + BEAM_H * 2 + SLAT_H + POLY_T / 2 + 0.02;
  parts.push(box(0, polyY, 0, W - 0.02, POLY_T, L - 0.02));

  // ── 6. Refuerzos de esquina (pequeñas placas triangulares,示意) ──────────
  const braceSize = 0.15;
  const braceY = H_COL - braceSize / 2;
  for (const [cx, _cy, cz] of colPositions) {
    // Placa cuadrada de refuerzo en la unión viga-columna
    parts.push(box(cx, H_COL, cz, COL_W * 1.5, 0.015, COL_W * 1.5));
  }

  // ── Build node tree ──────────────────────────────────────────────────────
  const group = doc.createNode("TechoPergolaModern");

  // Secciones de materiales:
  //  0-3:  Columnas (wood aluminum)
  //  4-5:  Vigas principales (wood aluminum)
  //  6-9:  Travesaños (wood aluminum)
  //  10+:  Celosías (wood aluminum)
  //  last: Policarbonato bronce
  const woodParts = parts.length - 1; // todas menos la última
  const polyIndex = parts.length - 1;

  parts.forEach((geo, i) => {
    const mat = i === polyIndex ? mats.bronzePoly : mats.woodAluminum;
    const mesh = addMesh(doc, buffer, `techo_${i}`, geo, mat);
    group.addChild(doc.createNode(`part_${i}`).setMesh(mesh));
  });

  return group;
}

// ── Write GLB ─────────────────────────────────────────────────────────────────

const doc = new Document();
const buffer = doc.createBuffer();
const mats = createMaterials(doc);
const node = genTechoPergola(doc, buffer, mats);
doc.createScene("TechoPergola").addChild(node);

const outPath = join(OUT_DIR, "default.glb");
const io = new NodeIO();
await io.write(outPath, doc);
const size = statSync(outPath).size;
console.log(`✅ techo/default.glb  (${(size / 1024).toFixed(1)} KB)`);
