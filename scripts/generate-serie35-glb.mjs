/**
 * Generador de modelo .glb para Serie 35 usando @gltf-transform/core
 * Ejecutar: node scripts/generate-serie35-glb.mjs
 */
import { Document, NodeIO } from "@gltf-transform/core";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_MODELS = join(__dirname, "..", "public", "models");

// --- Configuración Serie 35 ---
const W = 1.5;   // ancho
const H = 1.6;   // alto
const D = 0.06;  // profundidad marco
const FW = 0.06; // ancho del marco
const GT = 0.008; // grosor vidrio

// --- Helper: crear cubo como triangles ---
function boxGeometry(cx, cy, cz, sx, sy, sz) {
  const hx = sx / 2, hy = sy / 2, hz = sz / 2;
  const positions = new Float32Array([
    // Cara frontal (z+)
    cx - hx, cy - hy, cz + hz,  cx + hx, cy - hy, cz + hz,  cx + hx, cy + hy, cz + hz,
    cx - hx, cy - hy, cz + hz,  cx + hx, cy + hy, cz + hz,  cx - hx, cy + hy, cz + hz,
    // Cara trasera (z-)
    cx + hx, cy - hy, cz - hz,  cx - hx, cy - hy, cz - hz,  cx - hx, cy + hy, cz - hz,
    cx + hx, cy - hy, cz - hz,  cx - hx, cy + hy, cz - hz,  cx + hx, cy + hy, cz - hz,
    // Cara derecha (x+)
    cx + hx, cy - hy, cz + hz,  cx + hx, cy - hy, cz - hz,  cx + hx, cy + hy, cz - hz,
    cx + hx, cy - hy, cz + hz,  cx + hx, cy + hy, cz - hz,  cx + hx, cy + hy, cz + hz,
    // Cara izquierda (x-)
    cx - hx, cy - hy, cz - hz,  cx - hx, cy - hy, cz + hz,  cx - hx, cy + hy, cz + hz,
    cx - hx, cy - hy, cz - hz,  cx - hx, cy + hy, cz + hz,  cx - hx, cy + hy, cz - hz,
    // Cara superior (y+)
    cx - hx, cy + hy, cz + hz,  cx + hx, cy + hy, cz + hz,  cx + hx, cy + hy, cz - hz,
    cx - hx, cy + hy, cz + hz,  cx + hx, cy + hy, cz - hz,  cx - hx, cy + hy, cz - hz,
    // Cara inferior (y-)
    cx - hx, cy - hy, cz - hz,  cx + hx, cy - hy, cz - hz,  cx + hx, cy - hy, cz + hz,
    cx - hx, cy - hy, cz - hz,  cx + hx, cy - hy, cz + hz,  cx - hx, cy - hy, cz + hz,
  ]);
  // Normales simples (cada vertice apunta en la direccion de su cara)
  const normals = new Float32Array([
    // Frontal
    0,0,1, 0,0,1, 0,0,1, 0,0,1, 0,0,1, 0,0,1,
    // Trasera
    0,0,-1, 0,0,-1, 0,0,-1, 0,0,-1, 0,0,-1, 0,0,-1,
    // Derecha
    1,0,0, 1,0,0, 1,0,0, 1,0,0, 1,0,0, 1,0,0,
    // Izquierda
    -1,0,0, -1,0,0, -1,0,0, -1,0,0, -1,0,0, -1,0,0,
    // Superior
    0,1,0, 0,1,0, 0,1,0, 0,1,0, 0,1,0, 0,1,0,
    // Inferior
    0,-1,0, 0,-1,0, 0,-1,0, 0,-1,0, 0,-1,0, 0,-1,0,
  ]);
  return { positions, normals };
}

function mergeGeometries(geos) {
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

// --- Geometrias del marco ---
const frameParts = [
  // Travesaño superior
  boxGeometry(0, H / 2 - FW / 2, 0, W, FW, D),
  // Travesaño inferior
  boxGeometry(0, -H / 2 + FW / 2, 0, W, FW, D),
  // Jamba izquierda
  boxGeometry(-W / 2 + FW / 2, 0, 0, FW, H, D),
  // Jamba derecha
  boxGeometry(W / 2 - FW / 2, 0, 0, FW, H, D),
];

// Vidrio
const glassW = W - FW * 2 - 0.01;
const glassH = H - FW * 2 - 0.01;
const glassGeo = boxGeometry(0, 0, 0, glassW, glassH, GT);

// --- Documento glTF ---
const doc = new Document();
const buffer = doc.createBuffer();

// --- Materiales ---
const frameMat = doc.createMaterial("AluminioNegroMate")
  .setBaseColorFactor([0.1, 0.1, 0.1, 1.0])
  .setMetallicFactor(0.85)
  .setRoughnessFactor(0.35);

const glassMat = doc.createMaterial("VidrioIncoloro")
  .setBaseColorFactor([0.53, 0.8, 1.0, 0.4])
  .setMetallicFactor(0.0)
  .setRoughnessFactor(0.05)
  .setAlphaMode("BLEND");

// --- Meshes ---
const frameGeo = mergeGeometries(frameParts);
const framePositions = doc.createAccessor("frame_positions")
  .setType("VEC3")
  .setArray(new Float32Array(frameGeo.positions))
  .setBuffer(buffer);
const frameNormals = doc.createAccessor("frame_normals")
  .setType("VEC3")
  .setArray(new Float32Array(frameGeo.normals))
  .setBuffer(buffer);

const framePrim = doc.createPrimitive()
  .setAttribute("POSITION", framePositions)
  .setAttribute("NORMAL", frameNormals)
  .setMaterial(frameMat);
const frameMesh = doc.createMesh("Marco_Serie35").addPrimitive(framePrim);

const glassPositions = doc.createAccessor("glass_positions")
  .setType("VEC3")
  .setArray(new Float32Array(glassGeo.positions))
  .setBuffer(buffer);
const glassNormals = doc.createAccessor("glass_normals")
  .setType("VEC3")
  .setArray(new Float32Array(glassGeo.normals))
  .setBuffer(buffer);

const glassPrim = doc.createPrimitive()
  .setAttribute("POSITION", glassPositions)
  .setAttribute("NORMAL", glassNormals)
  .setMaterial(glassMat);
const glassMesh = doc.createMesh("Vidrio_Incoloro").addPrimitive(glassPrim);

// --- Nodo raiz ---
const rootNode = doc.createNode("Ventana_Serie35")
  .addChild(doc.createNode("Marco").setMesh(frameMesh))
  .addChild(doc.createNode("Vidrio").setMesh(glassMesh));

doc.createScene("Escena_Serie35").addChild(rootNode);

// --- Exportar ---
const io = new NodeIO();
const outputPath = join(PUBLIC_MODELS, "ventana-serie35.glb");
await io.write(outputPath, doc);

const { statSync } = await import("fs");
const size = statSync(outputPath).size;
console.log(`✅ Modelo generado: ${outputPath}`);
console.log(`   Tamaño: ${(size / 1024).toFixed(1)} KB`);
console.log(`   Geometría: Marco ${W}m x ${H}m, vidrio ${GT * 1000}mm`);
