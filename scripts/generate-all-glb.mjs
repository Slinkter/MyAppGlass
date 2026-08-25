/**
 * Generador de modelos .glb para todos los servicios GYA
 * Ejecutar: node scripts/generate-all-glb.mjs
 */
import { Document, NodeIO } from "@gltf-transform/core";
import { writeFileSync, mkdirSync, statSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_MODELS = join(__dirname, "..", "public", "models");
mkdirSync(PUBLIC_MODELS, { recursive: true });

// --- Utilidades ---
function boxGeometry(cx, cy, cz, sx, sy, sz) {
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

function mergeGeos(geos) {
  const totalPos = geos.reduce((s, g) => s + g.positions.length, 0);
  const totalNrm = geos.reduce((s, g) => s + g.normals.length, 0);
  const pos = new Float32Array(totalPos);
  const nrm = new Float32Array(totalNrm);
  let offP = 0, offN = 0;
  for (const g of geos) {
    pos.set(g.positions, offP); offP += g.positions.length;
    nrm.set(g.normals, offN); offN += g.normals.length;
  }
  return { positions: pos, normals: nrm };
}

// --- Materiales reutilizables ---
function createMaterials(doc) {
  return {
   铝黑: doc.createMaterial("AluminioNegro")
      .setBaseColorFactor([0.08, 0.08, 0.08, 1]).setMetallicFactor(0.85).setRoughnessFactor(0.35),
    铝自然: doc.createMaterial("AluminioNatural")
      .setBaseColorFactor([0.7, 0.7, 0.65, 1]).setMetallicFactor(0.7).setRoughnessFactor(0.4),
    铝白: doc.createMaterial("AluminioBlanco")
      .setBaseColorFactor([0.95, 0.95, 0.95, 1]).setMetallicFactor(0.6).setRoughnessFactor(0.4),
    铝香槟: doc.createMaterial("AluminioChampagne")
      .setBaseColorFactor([0.76, 0.69, 0.55, 1]).setMetallicFactor(0.75).setRoughnessFactor(0.35),
    玻璃透明: doc.createMaterial("VidrioIncoloro")
      .setBaseColorFactor([0.85, 0.95, 1.0, 0.35]).setMetallicFactor(0).setRoughnessFactor(0.05).setAlphaMode("BLEND"),
    玻璃灰: doc.createMaterial("VidrioGris")
      .setBaseColorFactor([0.4, 0.4, 0.45, 0.5]).setMetallicFactor(0).setRoughnessFactor(0.1).setAlphaMode("BLEND"),
    玻璃铜: doc.createMaterial("VidrioBronce")
      .setBaseColorFactor([0.6, 0.45, 0.3, 0.45]).setMetallicFactor(0).setRoughnessFactor(0.1).setAlphaMode("BLEND"),
    不锈钢: doc.createMaterial("AceroInox")
      .setBaseColorFactor([0.8, 0.8, 0.82, 1]).setMetallicFactor(0.9).setRoughnessFactor(0.2),
    密封条: doc.createMaterial("SelloEPDM")
      .setBaseColorFactor([0.15, 0.15, 0.15, 1]).setMetallicFactor(0).setRoughnessFactor(0.9),
    聚碳酸酯: doc.createMaterial("Policarbonato")
      .setBaseColorFactor([0.9, 0.92, 0.95, 0.6]).setMetallicFactor(0).setRoughnessFactor(0.15).setAlphaMode("BLEND"),
    木纹: doc.createMaterial("AluminioMadera")
      .setBaseColorFactor([0.45, 0.3, 0.18, 1]).setMetallicFactor(0.5).setRoughnessFactor(0.6),
  };
}

function addMesh(doc, buffer, name, geo, material) {
  const pos = doc.createAccessor(`${name}_pos`).setType("VEC3").setArray(new Float32Array(geo.positions)).setBuffer(buffer);
  const nrm = doc.createAccessor(`${name}_nrm`).setType("VEC3").setArray(new Float32Array(geo.normals)).setBuffer(buffer);
  const prim = doc.createPrimitive().setAttribute("POSITION", pos).setAttribute("NORMAL", nrm).setMaterial(material);
  return doc.createMesh(name).addPrimitive(prim);
}

// --- Modelos por servicio ---

function genVentanaNova(doc, buffer, mats) {
  const W = 1.5, H = 1.6, D = 0.05, FW = 0.05;
  const geos = [
    boxGeometry(0, H/2-FW/2, 0, W, FW, D),
    boxGeometry(0, -H/2+FW/2, 0, W, FW, D),
    boxGeometry(-W/2+FW/2, 0, 0, FW, H, D),
    boxGeometry(W/2-FW/2, 0, 0, FW, H, D),
    boxGeometry(0, 0, 0, W-FW*2-0.01, H-FW*2-0.01, 0.006),
  ];
  const mats2 = [mats.铝白, mats.铝白, mats.铝白, mats.铝白, mats.玻璃透明];
  const group = doc.createNode("VentanaNova");
  geos.forEach((g, i) => {
    const m = addMesh(doc, buffer, `nova_${i}`, g, mats2[i]);
    group.addChild(doc.createNode(`part_${i}`).setMesh(m));
  });
  return group;
}

function genVentanaSerie25(doc, buffer, mats) {
  const W = 1.5, H = 1.6, D = 0.055, FW = 0.055;
  const geos = [
    boxGeometry(0, H/2-FW/2, 0, W, FW, D),
    boxGeometry(0, -H/2+FW/2, 0, W, FW, D),
    boxGeometry(-W/2+FW/2, 0, 0, FW, H, D),
    boxGeometry(W/2-FW/2, 0, 0, FW, H, D),
    boxGeometry(0, 0, 0, W-FW*2-0.01, H-FW*2-0.01, 0.008),
  ];
  const mats2 = [mats.铝黑, mats.铝黑, mats.铝黑, mats.铝黑, mats.玻璃透明];
  const group = doc.createNode("VentanaSerie25");
  geos.forEach((g, i) => {
    const m = addMesh(doc, buffer, `s25_${i}`, g, mats2[i]);
    group.addChild(doc.createNode(`part_${i}`).setMesh(m));
  });
  return group;
}

function genVentanaSerie62(doc, buffer, mats) {
  const W = 1.5, H = 1.6, D = 0.07, FW = 0.07;
  const geos = [
    boxGeometry(0, H/2-FW/2, 0, W, FW, D),
    boxGeometry(0, -H/2+FW/2, 0, W, FW, D),
    boxGeometry(-W/2+FW/2, 0, 0, FW, H, D),
    boxGeometry(W/2-FW/2, 0, 0, FW, H, D),
    boxGeometry(0, 0, 0, W-FW*2-0.01, H-FW*2-0.01, 0.012),
  ];
  const mats2 = [mats.铝黑, mats.铝黑, mats.铝黑, mats.铝黑, mats.玻璃灰];
  const group = doc.createNode("VentanaSerie62");
  geos.forEach((g, i) => {
    const m = addMesh(doc, buffer, `s62_${i}`, g, mats2[i]);
    group.addChild(doc.createNode(`part_${i}`).setMesh(m));
  });
  return group;
}

function genMampara(doc, buffer, mats) {
  const W = 1.2, H = 2.0, D = 0.04, FW = 0.04;
  const geos = [
    boxGeometry(0, H/2-FW/2, 0, W, FW, D),
    boxGeometry(0, -H/2+FW/2, 0, W, FW, D),
    boxGeometry(-W/2+FW/2, 0, 0, FW, H, D),
    boxGeometry(0, 0, 0, W-FW-0.01, H-FW*2-0.01, 0.008),
  ];
  const mats2 = [mats.铝自然, mats.铝自然, mats.铝自然, mats.玻璃透明];
  const group = doc.createNode("Mampara");
  geos.forEach((g, i) => {
    const m = addMesh(doc, buffer, `mamp_${i}`, g, mats2[i]);
    group.addChild(doc.createNode(`part_${i}`).setMesh(m));
  });
  return group;
}

function genDucha(doc, buffer, mats) {
  const W = 0.8, H = 2.0, D = 0.025, FW = 0.025;
  const geos = [
    boxGeometry(0, H/2-FW/2, 0, W, FW, D),
    boxGeometry(0, -H/2+FW/2, 0, W, FW, D),
    boxGeometry(-W/2+FW/2, 0, 0, FW, H, D),
    boxGeometry(0, 0, 0, W-FW-0.01, H-FW*2-0.01, 0.008),
    boxGeometry(W/2-0.01, 0, 0, 0.02, H*0.6, 0.02),
  ];
  const mats2 = [mats.不锈钢, mats.不锈钢, mats.不锈钢, mats.玻璃透明, mats.不锈钢];
  const group = doc.createNode("Ducha");
  geos.forEach((g, i) => {
    const m = addMesh(doc, buffer, `ducha_${i}`, g, mats2[i]);
    group.addChild(doc.createNode(`part_${i}`).setMesh(m));
  });
  return group;
}

function genParapeto(doc, buffer, mats) {
  const W = 2.0, H = 1.1, D = 0.015, FW = 0.05;
  const geos = [
    boxGeometry(0, -H/2+FW/2, 0, W, FW, 0.08),
    boxGeometry(0, 0, 0, W-0.02, H-FW-0.02, D),
  ];
  const mats2 = [mats.铝黑, mats.玻璃透明];
  const group = doc.createNode("Parapeto");
  geos.forEach((g, i) => {
    const m = addMesh(doc, buffer, `parap_${i}`, g, mats2[i]);
    group.addChild(doc.createNode(`part_${i}`).setMesh(m));
  });
  return group;
}

function genBaranda(doc, buffer, mats) {
  const W = 1.5, H = 1.0, D = 0.012;
  const geos = [
    boxGeometry(0, H/2, 0, W, 0.04, 0.04),
    boxGeometry(-W/2, H/4, 0, 0.04, H, 0.04),
    boxGeometry(W/2, H/4, 0, 0.04, H, 0.04),
    boxGeometry(0, H/4, 0, W-0.05, H*0.7, D),
  ];
  const mats2 = [mats.不锈钢, mats.不锈钢, mats.不锈钢, mats.玻璃透明];
  const group = doc.createNode("Baranda");
  geos.forEach((g, i) => {
    const m = addMesh(doc, buffer, `bar_${i}`, g, mats2[i]);
    group.addChild(doc.createNode(`part_${i}`).setMesh(m));
  });
  return group;
}

function genBalcon(doc, buffer, mats) {
  const W = 1.8, H = 1.2, D = 0.012;
  const geos = [
    boxGeometry(0, -H/2+0.04, 0, W, 0.08, 0.08),
    boxGeometry(-W/2, 0, 0, 0.04, H, 0.04),
    boxGeometry(W/2, 0, 0, 0.04, H, 0.04),
    boxGeometry(0, 0, 0, W-0.05, H-0.05, D),
  ];
  const mats2 = [mats.铝自然, mats.铝自然, mats.铝自然, mats.玻璃透明];
  const group = doc.createNode("Balcon");
  geos.forEach((g, i) => {
    const m = addMesh(doc, buffer, `balc_${i}`, g, mats2[i]);
    group.addChild(doc.createNode(`part_${i}`).setMesh(m));
  });
  return group;
}

function genTecho(doc, buffer, mats) {
  const W = 3.0, D = 2.0, TH = 0.04;
  const geos = [
    boxGeometry(0, 0, 0, W, TH, D),
    boxGeometry(-W/2+0.03, -TH/2-0.03, 0, 0.06, 0.06, D),
    boxGeometry(W/2-0.03, -TH/2-0.03, 0, 0.06, 0.06, D),
    boxGeometry(0, -TH/2-0.03, -D/2+0.03, W, 0.06, 0.06),
    boxGeometry(0, -TH/2-0.03, D/2-0.03, W, 0.06, 0.06),
  ];
  const mats2 = [mats.聚碳酸酯, mats.铝自然, mats.铝自然, mats.铝自然, mats.铝自然];
  const group = doc.createNode("Techo");
  geos.forEach((g, i) => {
    const m = addMesh(doc, buffer, `techo_${i}`, g, mats2[i]);
    group.addChild(doc.createNode(`part_${i}`).setMesh(m));
  });
  return group;
}

function genPuertaVidrio(doc, buffer, mats) {
  const W = 0.9, H = 2.1, D = 0.012;
  const geos = [
    boxGeometry(0, 0, 0, W, H, D),
    boxGeometry(W/2-0.06, 0, D/2+0.01, 0.03, 0.4, 0.03),
    boxGeometry(0, -H/2+0.02, 0, W*0.3, 0.04, 0.04),
  ];
  const mats2 = [mats.玻璃透明, mats.不锈钢, mats.不锈钢];
  const group = doc.createNode("PuertaVidrio");
  geos.forEach((g, i) => {
    const m = addMesh(doc, buffer, `pv_${i}`, g, mats2[i]);
    group.addChild(doc.createNode(`part_${i}`).setMesh(m));
  });
  return group;
}

function genPuertaSerie(doc, buffer, mats) {
  const W = 0.9, H = 2.1, D = 0.05, FW = 0.05;
  const geos = [
    boxGeometry(0, H/2-FW/2, 0, W, FW, D),
    boxGeometry(0, -H/2+FW/2, 0, W, FW, D),
    boxGeometry(-W/2+FW/2, 0, 0, FW, H, D),
    boxGeometry(W/2-FW/2, 0, 0, FW, H, D),
    boxGeometry(0, 0, -D/2+0.005, W-FW*2, H-FW*2, 0.008),
    boxGeometry(W/2-0.08, 0, D/2+0.01, 0.04, 0.15, 0.03),
  ];
  const mats2 = [mats.铝黑, mats.铝黑, mats.铝黑, mats.铝黑, mats.铝黑, mats.不锈钢];
  const group = doc.createNode("PuertaSerie");
  geos.forEach((g, i) => {
    const m = addMesh(doc, buffer, `ps_${i}`, g, mats2[i]);
    group.addChild(doc.createNode(`part_${i}`).setMesh(m));
  });
  return group;
}

function genCelosia(doc, buffer, mats) {
  const W = 1.0, H = 1.2, D = 0.03;
  const geos = [
    boxGeometry(0, H/2-0.025, 0, W, 0.05, D),
    boxGeometry(0, -H/2+0.025, 0, W, 0.05, D),
    boxGeometry(-W/2+0.025, 0, 0, 0.05, H, D),
    boxGeometry(W/2-0.025, 0, 0, 0.05, H, D),
  ];
  // Lamas inclinadas
  for (let i = 0; i < 8; i++) {
    const y = -H/2 + 0.1 + i * (H-0.2)/7;
    geos.push(boxGeometry(0, y, 0, W-0.12, 0.025, D*0.8));
  }
  const matsArr = [mats.铝黑, mats.铝黑, mats.铝黑, mats.铝黑, ...Array(8).fill(mats.铝自然)];
  const group = doc.createNode("Celosia");
  geos.forEach((g, i) => {
    const m = addMesh(doc, buffer, `cel_${i}`, g, matsArr[i]);
    group.addChild(doc.createNode(`part_${i}`).setMesh(m));
  });
  return group;
}

// --- Modelos y configuraciones ---
const MODELS = [
  { name: "ventana-nova", fn: genVentanaNova },
  { name: "ventana-serie25", fn: genVentanaSerie25 },
  { name: "ventana-serie62", fn: genVentanaSerie62 },
  { name: "mampara", fn: genMampara },
  { name: "ducha", fn: genDucha },
  { name: "parapeto", fn: genParapeto },
  { name: "baranda", fn: genBaranda },
  { name: "balcon", fn: genBalcon },
  { name: "techo", fn: genTecho },
  { name: "puerta-vidrio", fn: genPuertaVidrio },
  { name: "puerta-serie", fn: genPuertaSerie },
  { name: "celosia", fn: genCelosia },
];

// --- Generar todos ---
const io = new NodeIO();
console.log("🏗️  Generando modelos .glb para GYA...\n");

for (const { name, fn } of MODELS) {
  const doc = new Document();
  const buffer = doc.createBuffer();
  const mats = createMaterials(doc);
  const node = fn(doc, buffer, mats);
  doc.createScene(name).addChild(node);
  
  const outPath = join(PUBLIC_MODELS, `${name}.glb`);
  await io.write(outPath, doc);
  const size = statSync(outPath).size;
  console.log(`  ✅ ${name}.glb  (${(size/1024).toFixed(1)} KB)`);
}

console.log(`\n🎉 ${MODELS.length} modelos generados en ${PUBLIC_MODELS}`);
