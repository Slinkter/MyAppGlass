/**
 * Generador de modelos .glb de ALTA CALIDAD para todos los servicios GYA
 * Ejecutar: node scripts/generate-all-glb-v2.mjs
 *
 * Cada modelo tiene geometría detallada, materiales PBR realistas,
 * y dimensiones arquitectónicas correctas.
 */
import { Document, NodeIO } from "@gltf-transform/core";
import { writeFileSync, mkdirSync, statSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_MODELS = join(__dirname, "..", "public", "models");

// ── Geometry helpers ──────────────────────────────────────────────────────────

function box(cx, cy, cz, sx, sy, sz) {
  const hx = sx / 2, hy = sy / 2, hz = sz / 2;
  const positions = new Float32Array([
    cx-hx,cy-hy,cz+hz, cx+hx,cy-hy,cz+hz, cx+hx,cy+hy,cz+hz,
    cx-hx,cy-hy,cz+hz, cx+hx,cy+hy,cz+hz, cx-hx,cy+hy,cz+hz,
    cx+hx,cy-hy,cz-hz, cx-hx,cy-hy,cz-hz, cx-hx,cy+hy,cz-hz,
    cx+hx,cy-hy,cz-hz, cx-hx,cy+hy,cz-hz, cx+hx,cy+hy,cz-hz,
    cx+hx,cy-hy,cz+hz, cx+hx,cy-hy,cz-hz, cx+hx,cy+hy,cz-hz,
    cx+hx,cy-hy,cz+hz, cx+hx,cy+hy,cz-hz, cx+hx,cy+hy,cz+hz,
    cx-hx,cy-hy,cz-hz, cx-hx,cy-hy,cz+hz, cx-hx,cy+hy,cz+hz,
    cx-hx,cy-hy,cz-hz, cx-hx,cy+hy,cz+hz, cx-hx,cy+hy,cz-hz,
    cx-hx,cy+hy,cz+hz, cx+hx,cy+hy,cz+hz, cx+hx,cy+hy,cz-hz,
    cx-hx,cy+hy,cz+hz, cx+hx,cy+hy,cz-hz, cx-hx,cy+hy,cz-hz,
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

function addMesh(doc, buffer, name, geo, material) {
  const pos = doc.createAccessor(`${name}_pos`).setType("VEC3")
    .setArray(new Float32Array(geo.positions)).setBuffer(buffer);
  const nrm = doc.createAccessor(`${name}_nrm`).setType("VEC3")
    .setArray(new Float32Array(geo.normals)).setBuffer(buffer);
  const prim = doc.createPrimitive().setAttribute("POSITION", pos)
    .setAttribute("NORMAL", nrm).setMaterial(material);
  return doc.createMesh(name).addPrimitive(prim);
}

// ── Materials ─────────────────────────────────────────────────────────────────

function createMaterials(doc) {
  return {
    aluNegro: doc.createMaterial("AluminioNegro")
      .setBaseColorFactor([0.08, 0.08, 0.08, 1]).setMetallicFactor(0.85).setRoughnessFactor(0.35),
    aluNatural: doc.createMaterial("AluminioNatural")
      .setBaseColorFactor([0.7, 0.7, 0.65, 1]).setMetallicFactor(0.7).setRoughnessFactor(0.4),
    aluBlanco: doc.createMaterial("AluminioBlanco")
      .setBaseColorFactor([0.95, 0.95, 0.95, 1]).setMetallicFactor(0.6).setRoughnessFactor(0.4),
    aluChampagne: doc.createMaterial("AluminioChampagne")
      .setBaseColorFactor([0.76, 0.69, 0.55, 1]).setMetallicFactor(0.75).setRoughnessFactor(0.35),
    aluMadera: doc.createMaterial("AluminioMadera")
      .setBaseColorFactor([0.45, 0.3, 0.18, 1]).setMetallicFactor(0.5).setRoughnessFactor(0.6),
    vidrioIncoloro: doc.createMaterial("VidrioIncoloro")
      .setBaseColorFactor([0.85, 0.95, 1.0, 0.3]).setMetallicFactor(0).setRoughnessFactor(0.05).setAlphaMode("BLEND"),
    vidrioGris: doc.createMaterial("VidrioGris")
      .setBaseColorFactor([0.4, 0.4, 0.45, 0.5]).setMetallicFactor(0).setRoughnessFactor(0.1).setAlphaMode("BLEND"),
    vidrioBronce: doc.createMaterial("VidrioBronce")
      .setBaseColorFactor([0.6, 0.45, 0.3, 0.45]).setMetallicFactor(0).setRoughnessFactor(0.1).setAlphaMode("BLEND"),
    aceroInox: doc.createMaterial("AceroInox")
      .setBaseColorFactor([0.8, 0.8, 0.82, 1]).setMetallicFactor(0.92).setRoughnessFactor(0.18),
    selloEPDM: doc.createMaterial("SelloEPDM")
      .setBaseColorFactor([0.15, 0.15, 0.15, 1]).setMetallicFactor(0).setRoughnessFactor(0.9),
    policarbonato: doc.createMaterial("PolicarbonatoBronce")
      .setBaseColorFactor([0.55, 0.38, 0.22, 0.5]).setMetallicFactor(0).setRoughnessFactor(0.12).setAlphaMode("BLEND"),
  };
}

// ── CELOSÍA DE ALUMINIO (detallada) ──────────────────────────────────────────
function genCelosias(doc, buffer, mats) {
  const W = 1.2, H = 1.8, D = 0.04;
  const FW = 0.055; // ancho marco
  const geos = [];
  const matList = [];

  // Marco exterior
  geos.push(box(0, H/2-FW/2, 0, W, FW, D));        matList.push(mats.aluNegro); // top
  geos.push(box(0, -H/2+FW/2, 0, W, FW, D));       matList.push(mats.aluNegro); // bottom
  geos.push(box(-W/2+FW/2, 0, 0, FW, H, D));       matList.push(mats.aluNegro); // left
  geos.push(box(W/2-FW/2, 0, 0, FW, H, D));        matList.push(mats.aluNegro); // right

  // Canal superior (para mecanismo de apertura)
  geos.push(box(0, H/2-FW-0.015, 0, W-FW*2, 0.03, D+0.01)); matList.push(mats.aluNatural);

  // Lamas inclinadas (sol y sombra)
  const numSlats = 12;
  const slatW = W - FW * 2 - 0.02;
  const slatH = 0.06;
  const slatD = D * 0.7;
  const startY = -H/2 + FW + 0.12;
  const endY = H/2 - FW - 0.06;
  const spacing = (endY - startY) / (numSlats - 1);

  for (let i = 0; i < numSlats; i++) {
    const y = startY + i * spacing;
    geos.push(box(0, y, 0, slatW, slatH, slatD));
    matList.push(mats.aluNatural);
  }

  // Guías laterales para las lamas
  geos.push(box(-W/2+FW+0.01, 0, 0, 0.015, H-FW*2-0.1, D*0.5)); matList.push(mats.selloEPDM);
  geos.push(box(W/2-FW-0.01, 0, 0, 0.015, H-FW*2-0.1, D*0.5)); matList.push(mats.selloEPDM);

  const group = doc.createNode("Celosia");
  geos.forEach((geo, i) => {
    const mesh = addMesh(doc, buffer, `cel_${i}`, geo, matList[i]);
    group.addChild(doc.createNode(`p_${i}`).setMesh(mesh));
  });
  return group;
}

// ── MAMPARA CORREDIZA (detallada) ────────────────────────────────────────────
function genMampara(doc, buffer, mats) {
  const W = 2.0, H = 2.2, D = 0.07;
  const FW = 0.06; // marco
  const SW = 0.045; // parante hoja
  const geos = [];
  const matList = [];

  // Marco exterior
  geos.push(box(0, H/2-FW/2, 0, W, FW, D));         matList.push(mats.aluNatural);
  geos.push(box(0, -H/2+FW/2, 0, W, FW*0.8, D));   matList.push(mats.aluNatural);
  geos.push(box(-W/2+FW/2, 0, 0, FW, H, D));        matList.push(mats.aluNatural);
  geos.push(box(W/2-FW/2, 0, 0, FW, H, D));         matList.push(mats.aluNatural);

  // Riel inferior doble (para hojas corredizas)
  geos.push(box(-W/4, -H/2+FW*0.8+0.012, 0, W/2-0.02, 0.012, D*0.8)); matList.push(mats.aceroInox);
  geos.push(box(W/4, -H/2+FW*0.8+0.012, 0, W/2-0.02, 0.012, D*0.8));  matList.push(mats.aceroInox);

  // Hoja 1 (izquierda, móvil)
  const sW1 = W/2 - 0.01;
  geos.push(box(-W/4+0.02, 0, 0.02, sW1, H-FW*2-0.02, SW)); matList.push(mats.aluNatural); // parante L
  geos.push(box(-W/4+0.02+sW1/2-SW/2, H/2-FW-SW/2, 0.02, SW, SW, D*0.6)); matList.push(mats.aluNatural); // cabezal
  geos.push(box(-W/4+0.02-sW1/2+SW/2, -H/2+FW+SW/2+0.01, 0.02, SW, SW*1.2, D*0.6)); matList.push(mats.aluNatural); // zocalo
  // Vidrio hoja 1
  geos.push(box(-W/4+0.02, 0, 0.02, sW1-SW*2-0.01, H-FW*2-SW*2-0.02, 0.01)); matList.push(mats.vidrioIncoloro);
  // Manija hoja 1
  geos.push(box(-W/4+sW1/2-0.01, 0, 0.04, 0.02, 0.14, 0.015)); matList.push(mats.aceroInox);

  // Hoja 2 (derecha, fija)
  const sW2 = W/2 - 0.01;
  geos.push(box(W/4-0.02, 0, -0.02, sW2, H-FW*2-0.02, SW)); matList.push(mats.aluNatural);
  geos.push(box(W/4-0.02+sW2/2-SW/2, H/2-FW-SW/2, -0.02, SW, SW, D*0.6)); matList.push(mats.aluNatural);
  geos.push(box(W/4-0.02-sW2/2+SW/2, -H/2+FW+SW/2+0.01, -0.02, SW, SW*1.2, D*0.6)); matList.push(mats.aluNatural);
  // Vidrio hoja 2
  geos.push(box(W/4-0.02, 0, -0.02, sW2-SW*2-0.01, H-FW*2-SW*2-0.02, 0.01)); matList.push(mats.vidrioIncoloro);
  // Manija hoja 2
  geos.push(box(W/4-0.02-sW2/2+0.01, 0, -0.005, 0.02, 0.14, 0.015)); matList.push(mats.aceroInox);

  // Sellos EPDM entre hojas
  geos.push(box(0, 0, 0, 0.01, H-FW*2-0.04, 0.015)); matList.push(mats.selloEPDM);

  const group = doc.createNode("Mampara");
  geos.forEach((geo, i) => {
    const mesh = addMesh(doc, buffer, `mamp_${i}`, geo, matList[i]);
    group.addChild(doc.createNode(`p_${i}`).setMesh(mesh));
  });
  return group;
}

// ── BOX DE DUCHA (detallado) ─────────────────────────────────────────────────
function genDucha(doc, buffer, mats) {
  const W = 0.9, H = 2.0, D = 0.015;
  const geos = [];
  const matList = [];

  // Panel de vidrio templado principal
  geos.push(box(0, 0, 0, W, H, D)); matList.push(mats.vidrioIncoloro);

  // Barra superior de acero inoxidable (tubo)
  geos.push(box(0, H/2+0.03, 0, W+0.1, 0.025, 0.025)); matList.push(mats.aceroInox);

  // Soportes de barra a pared
  geos.push(box(-W/2-0.04, H/2+0.03, 0, 0.04, 0.025, 0.04)); matList.push(mats.aceroInox);
  geos.push(box(W/2+0.04, H/2+0.03, 0, 0.04, 0.025, 0.04)); matList.push(mats.aceroInox);

  // Tirador / manija tipo toallero
  geos.push(box(W/2-0.08, 0, D/2+0.02, 0.02, 0.35, 0.02)); matList.push(mats.aceroInox);

  // Bisagra superior
  geos.push(box(-W/2+0.02, H/2-0.08, 0, 0.04, 0.06, 0.025)); matList.push(mats.aceroInox);
  // Bisagra inferior
  geos.push(box(-W/2+0.02, -H/2+0.08, 0, 0.04, 0.06, 0.025)); matList.push(mats.aceroInox);

  // Junquillo perimetral del vidrio
  geos.push(box(0, H/2-0.005, 0, W+0.01, 0.012, D+0.005)); matList.push(mats.selloEPDM);
  geos.push(box(0, -H/2+0.005, 0, W+0.01, 0.012, D+0.005)); matList.push(mats.selloEPDM);

  const group = doc.createNode("Ducha");
  geos.forEach((geo, i) => {
    const mesh = addMesh(doc, buffer, `duc_${i}`, geo, matList[i]);
    group.addChild(doc.createNode(`p_${i}`).setMesh(mesh));
  });
  return group;
}

// ── BARANDA (detallada) ──────────────────────────────────────────────────────
function genBaranda(doc, buffer, mats) {
  const W = 2.0, H = 1.05, D = 0.015;
  const geos = [];
  const matList = [];

  // Pasamanos superior (cilíndrico = approximation con box estrecha)
  geos.push(box(0, H/2, 0, W+0.15, 0.04, 0.04)); matList.push(mats.aceroInox);

  // Parantes verticales (3)
  for (let x = -W/2+0.01; x <= W/2; x += W/2) {
    geos.push(box(x, H/4, 0, 0.035, H, 0.035)); matList.push(mats.aceroInox);
  }

  // Panel de vidrio 1
  geos.push(box(-W/4, H/4-0.02, 0, W/2-0.06, H*0.7, D)); matList.push(mats.vidrioIncoloro);
  // Panel de vidrio 2
  geos.push(box(W/4, H/4-0.02, 0, W/2-0.06, H*0.7, D)); matList.push(mats.vidrioIncoloro);

  // Botones de anclaje vidrio-pared (4)
  geos.push(box(-W/2, H/2-0.06, 0, 0.05, 0.05, 0.05)); matList.push(mats.aceroInox);
  geos.push(box(-W/2, H*0.25, 0, 0.05, 0.05, 0.05));   matList.push(mats.aceroInox);
  geos.push(box(W/2, H/2-0.06, 0, 0.05, 0.05, 0.05));  matList.push(mats.aceroInox);
  geos.push(box(W/2, H*0.25, 0, 0.05, 0.05, 0.05));    matList.push(mats.aceroInox);

  // Base / zócalo inferior
  geos.push(box(0, -0.02, 0, W+0.05, 0.04, 0.06)); matList.push(mats.aluNatural);

  const group = doc.createNode("Baranda");
  geos.forEach((geo, i) => {
    const mesh = addMesh(doc, buffer, `bar_${i}`, geo, matList[i]);
    group.addChild(doc.createNode(`p_${i}`).setMesh(mesh));
  });
  return group;
}

// ── BALCÓN PANORÁMICO ────────────────────────────────────────────────────────
function genBalcones(doc, buffer, mats) {
  const W = 2.2, H = 1.2, D = 0.015;
  const geos = [];
  const matList = [];

  // Panel de vidrio templado grande
  geos.push(box(0, 0, 0, W-0.04, H-0.04, D)); matList.push(mats.vidrioIncoloro);

  // Zócalo inferior (base de aluminio)
  geos.push(box(0, -H/2+0.04, 0, W, 0.08, 0.1)); matList.push(mats.aluNatural);

  // Barandal superior ranurado
  geos.push(box(0, H/2+0.01, 0, W+0.1, 0.03, 0.04)); matList.push(mats.aceroInox);

  // Pernos de anclaje al piso (4)
  geos.push(box(-W/2+0.15, -H/2+0.01, 0, 0.06, 0.06, 0.06)); matList.push(mats.aceroInox);
  geos.push(box(-W/4, -H/2+0.01, 0, 0.06, 0.06, 0.06));       matList.push(mats.aceroInox);
  geos.push(box(W/4, -H/2+0.01, 0, 0.06, 0.06, 0.06));        matList.push(mats.aceroInox);
  geos.push(box(W/2-0.15, -H/2+0.01, 0, 0.06, 0.06, 0.06));  matList.push(mats.aceroInox);

  // Junquillo perimetral del vidrio
  geos.push(box(0, 0, D/2+0.005, W-0.02, H-0.02, 0.01)); matList.push(mats.selloEPDM);

  const group = doc.createNode("Balcones");
  geos.forEach((geo, i) => {
    const mesh = addMesh(doc, buffer, `balc_${i}`, geo, matList[i]);
    group.addChild(doc.createNode(`p_${i}`).setMesh(mesh));
  });
  return group;
}

// ── PARAPETO PANORÁMICO ──────────────────────────────────────────────────────
function genParapeto(doc, buffer, mats) {
  const W = 2.5, H = 1.1, D = 0.012;
  const geos = [];
  const matList = [];

  // Panel de vidrio templado
  geos.push(box(0, 0.05, 0, W-0.04, H-0.08, D)); matList.push(mats.vidrioIncoloro);

  // Zócalo base ancho (muro de apoyo)
  geos.push(box(0, -H/2+0.04, 0, W+0.08, 0.08, 0.12)); matList.push(mats.aluNatural);

  // Barandal superior
  geos.push(box(0, H/2, 0, W+0.1, 0.035, 0.04)); matList.push(mats.aceroInox);

  // Pernos de fijación al zócalo (5)
  for (let x = -W/2+0.2; x <= W/2; x += W/4) {
    geos.push(box(x, -H/2+0.08, 0, 0.05, 0.05, 0.05)); matList.push(mats.aceroInox);
  }

  // Junquillo inferior
  geos.push(box(0, -H/2+0.08, 0, W-0.02, 0.015, D+0.01)); matList.push(mats.selloEPDM);

  const group = doc.createNode("Parapeto");
  geos.forEach((geo, i) => {
    const mesh = addMesh(doc, buffer, `parap_${i}`, geo, matList[i]);
    group.addChild(doc.createNode(`p_${i}`).setMesh(mesh));
  });
  return group;
}

// ── PUERTA DE VIDRIO (detallada) ─────────────────────────────────────────────
function genPvidrio(doc, buffer, mats) {
  const W = 1.0, H = 2.2, D = 0.012;
  const geos = [];
  const matList = [];

  // Panel de vidrio templado
  geos.push(box(0, 0, 0, W, H, D)); matList.push(mats.vidrioIncoloro);

  // Jalador largo tubular de acero inox
  geos.push(box(W/2-0.1, 0, D/2+0.02, 0.02, 0.5, 0.02)); matList.push(mats.aceroInox);

  // Caja de cerradura
  geos.push(box(W/2-0.06, -0.15, D/2+0.01, 0.08, 0.12, 0.035)); matList.push(mats.aceroInox);

  // Freno hidráulico de piso
  geos.push(box(-W/2+0.1, -H/2-0.02, 0, 0.14, 0.04, 0.28)); matList.push(mats.aluNatural);

  // Bisagra superior
  geos.push(box(-W/2+0.03, H/2-0.06, 0, 0.04, 0.06, 0.03)); matList.push(mats.aceroInox);
  // Bisagra inferior
  geos.push(box(-W/2+0.03, -H/2+0.06, 0, 0.04, 0.06, 0.03)); matList.push(mats.aceroInox);

  // Junquillo perimetral
  geos.push(box(0, H/2-0.005, 0, W+0.005, 0.01, D+0.005)); matList.push(mats.selloEPDM);
  geos.push(box(0, -H/2+0.005, 0, W+0.005, 0.01, D+0.005)); matList.push(mats.selloEPDM);

  const group = doc.createNode("PuertaVidrio");
  geos.forEach((geo, i) => {
    const mesh = addMesh(doc, buffer, `pv_${i}`, geo, matList[i]);
    group.addChild(doc.createNode(`p_${i}`).setMesh(mesh));
  });
  return group;
}

// ── PUERTA SERIE ALUMINIO (detallada) ────────────────────────────────────────
function genPserie(doc, buffer, mats) {
  const W = 1.0, H = 2.2, D = 0.06;
  const FW = 0.06;
  const geos = [];
  const matList = [];

  // Marco exterior
  geos.push(box(0, H/2-FW/2, 0, W, FW, D));        matList.push(mats.aluNegro);
  geos.push(box(0, -H/2+FW/2, 0, W, FW, D));       matList.push(mats.aluNegro);
  geos.push(box(-W/2+FW/2, 0, 0, FW, H, D));       matList.push(mats.aluNegro);
  geos.push(box(W/2-FW/2, 0, 0, FW, H, D));        matList.push(mats.aluNegro);

  // Panel central arenado
  geos.push(box(0, 0, -D/2+0.008, W-FW*2-0.01, H-FW*2-0.01, 0.008)); matList.push(mats.aluNatural);

  // Manija de apertura
  geos.push(box(W/2-FW-0.04, 0, D/2+0.01, 0.035, 0.16, 0.03)); matList.push(mats.aceroInox);

  // Cerradura (placa)
  geos.push(box(W/2-FW-0.02, -0.2, D/2+0.008, 0.06, 0.1, 0.025)); matList.push(mats.aceroInox);

  // Bisagra superior
  geos.push(box(-W/2+FW/2, H/2-FW-0.1, 0, 0.04, 0.08, 0.03)); matList.push(mats.aceroInox);
  // Bisagra inferior
  geos.push(box(-W/2+FW/2, -H/2+FW+0.1, 0, 0.04, 0.08, 0.03)); matList.push(mats.aceroInox);

  const group = doc.createNode("PuertaSerie");
  geos.forEach((geo, i) => {
    const mesh = addMesh(doc, buffer, `ps_${i}`, geo, matList[i]);
    group.addChild(doc.createNode(`p_${i}`).setMesh(mesh));
  });
  return group;
}

// ── Generate and write all ────────────────────────────────────────────────────

const MODELS = [
  { name: "celosias", fn: genCelosias, dir: "celosias" },
  { name: "mampara", fn: genMampara, dir: "mampara" },
  { name: "ducha", fn: genDucha, dir: "ducha" },
  { name: "baranda", fn: genBaranda, dir: "baranda" },
  { name: "balcones", fn: genBalcones, dir: "balcones" },
  { name: "parapeto", fn: genParapeto, dir: "parapeto" },
  { name: "pvidrio", fn: genPvidrio, dir: "pvidrio" },
  { name: "pserie", fn: genPserie, dir: "pserie" },
];

const io = new NodeIO();
console.log("🏗️  Generando modelos .glb de alta calidad para GYA...\n");

for (const { name, fn, dir } of MODELS) {
  const doc = new Document();
  const buffer = doc.createBuffer();
  const mats = createMaterials(doc);
  const node = fn(doc, buffer, mats);
  doc.createScene(name).addChild(node);

  const outDir = join(PUBLIC_MODELS, dir);
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "default.glb");
  await io.write(outPath, doc);
  const size = statSync(outPath).size;
  console.log(`  ✅ ${dir}/default.glb  (${(size / 1024).toFixed(1)} KB)`);
}

console.log(`\n🎉 ${MODELS.length} modelos generados en ${PUBLIC_MODELS}`);
