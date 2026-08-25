import * as THREE from "three";

// ── Material Helpers ─────────────────────────────────────────────────────────

export interface ServiceMaterials {
    frame: THREE.MeshStandardMaterial;
    glass: THREE.MeshPhysicalMaterial;
    accent?: THREE.MeshStandardMaterial;
}

const ALU_COLORS: Record<string, { color: number; metalness: number; roughness: number }> = {
    negro:     { color: 0x1a1a1a, metalness: 0.75, roughness: 0.35 },
    natural:   { color: 0xb0b4b8, metalness: 0.65, roughness: 0.35 },
    blanco:    { color: 0xf0f0f0, metalness: 0.15, roughness: 0.5 },
    champagne: { color: 0xc4a265, metalness: 0.7,  roughness: 0.3 },
    madera:    { color: 0x8a5a36, metalness: 0.1,  roughness: 0.75 },
};

const GLASS_COLORS_3D: Record<string, { color: number; transmission: number }> = {
    incoloro: { color: 0xe8f4f8, transmission: 0.92 },
    bronce:   { color: 0x966847, transmission: 0.7 },
    gris:     { color: 0x475569, transmission: 0.65 },
    satinado: { color: 0xd1d5db, transmission: 0.4 },
};

const WOOD_COLORS: Record<string, { color: number; roughness: number }> = {
    teca:   { color: 0x8a4a21, roughness: 0.75 },
    nogal:  { color: 0x3d2314, roughness: 0.8 },
    roble:  { color: 0xc68b59, roughness: 0.7 },
    negro:  { color: 0x1a1a1a, roughness: 0.5 },
};

const POLY_COLORS: Record<string, { color: number; transmission: number }> = {
    bronce:      { color: 0x8a5229, transmission: 0.65 },
    opalino:     { color: 0xf0f4f8, transmission: 0.3 },
    transparente:{ color: 0xe2f1ff, transmission: 0.9 },
    humo:        { color: 0x2a2e33, transmission: 0.45 },
};

const STEEL = { color: 0xd0d0d4, metalness: 0.92, roughness: 0.15 };
const SEAL  = { color: 0x1f1f1f, metalness: 0,    roughness: 0.9 };

export function createAluMaterial(finish: string): THREE.MeshStandardMaterial {
    const c = ALU_COLORS[finish] || ALU_COLORS.negro;
    return new THREE.MeshStandardMaterial({ color: c.color, metalness: c.metalness, roughness: c.roughness });
}

export function createGlassMaterial(color: string): THREE.MeshPhysicalMaterial {
    const c = GLASS_COLORS_3D[color] || GLASS_COLORS_3D.incoloro;
    return new THREE.MeshPhysicalMaterial({
        color: c.color, transmission: c.transmission, opacity: 1,
        transparent: true, roughness: 0.05, ior: 1.52, side: THREE.DoubleSide,
    });
}

export function createSteelMaterial(): THREE.MeshStandardMaterial {
    return new THREE.MeshStandardMaterial(STEEL);
}

export function createSealMaterial(): THREE.MeshStandardMaterial {
    return new THREE.MeshStandardMaterial(SEAL);
}

// ── Geometry Helpers ─────────────────────────────────────────────────────────

function boxMesh(w: number, h: number, d: number, mat: THREE.Material): THREE.Mesh {
    return new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
}

// ── CELOSÍA ──────────────────────────────────────────────────────────────────
export function buildCelosias(params: {
    widthM: number; heightM: number; aluminum: string;
}): THREE.Group {
    const { widthM, heightM, aluminum } = params;
    const group = new THREE.Group();
    const matFrame = createAluMaterial(aluminum);
    const matSlat = createAluMaterial(aluminum === "negro" ? "natural" : aluminum);
    const fw = 0.055;

    // Marco
    group.add(Object.assign(boxMesh(widthM, fw, 0.04, matFrame), { position: new THREE.Vector3(0, heightM / 2 - fw / 2, 0) }));
    group.add(Object.assign(boxMesh(widthM, fw, 0.04, matFrame), { position: new THREE.Vector3(0, -heightM / 2 + fw / 2, 0) }));
    group.add(Object.assign(boxMesh(fw, heightM, 0.04, matFrame), { position: new THREE.Vector3(-widthM / 2 + fw / 2, 0, 0) }));
    group.add(Object.assign(boxMesh(fw, heightM, 0.04, matFrame), { position: new THREE.Vector3(widthM / 2 - fw / 2, 0, 0) }));

    // Lamas inclinadas
    const numSlats = Math.max(6, Math.round(heightM / 0.14));
    const slatW = widthM - fw * 2 - 0.02;
    const startY = -heightM / 2 + fw + 0.1;
    const endY = heightM / 2 - fw - 0.06;
    const spacing = (endY - startY) / (numSlats - 1);
    for (let i = 0; i < numSlats; i++) {
        const y = startY + i * spacing;
        const slat = boxMesh(slatW, 0.045, 0.025, matSlat);
        slat.position.set(0, y, 0);
        slat.rotation.x = Math.PI / 8;
        group.add(slat);
    }
    return group;
}

// ── MAMPARA ──────────────────────────────────────────────────────────────────
export function buildMampara(params: {
    widthM: number; heightM: number; aluminum: string; glassColor: string;
}): THREE.Group {
    const { widthM, heightM, aluminum, glassColor } = params;
    const group = new THREE.Group();
    const matF = createAluMaterial(aluminum);
    const matG = createGlassMaterial(glassColor);
    const matS = createSteelMaterial();
    const matSeal = createSealMaterial();
    const fw = 0.055;
    const depth = 0.065;

    // Marco exterior
    group.add(Object.assign(boxMesh(widthM, fw, depth, matF), { position: new THREE.Vector3(0, heightM / 2 - fw / 2, 0) }));
    group.add(Object.assign(boxMesh(widthM, fw * 0.8, depth, matF), { position: new THREE.Vector3(0, -heightM / 2 + fw * 0.4, 0) }));
    group.add(Object.assign(boxMesh(fw, heightM, depth, matF), { position: new THREE.Vector3(-widthM / 2 + fw / 2, 0, 0) }));
    group.add(Object.assign(boxMesh(fw, heightM, depth, matF), { position: new THREE.Vector3(widthM / 2 - fw / 2, 0, 0) }));

    // Riel inferior
    const railW = widthM - fw * 2;
    group.add(Object.assign(boxMesh(railW, 0.012, depth * 0.7, matS), { position: new THREE.Vector3(0, -heightM / 2 + fw + 0.012, 0) }));

    // Hoja izquierda (móvil)
    const halfW = (widthM - fw * 2) / 2;
    const sW = halfW - 0.01;
    const sH = heightM - fw * 2 - 0.02;
    const leaf1 = new THREE.Group();
    leaf1.add(boxMesh(sW, sH, 0.012, matG));
    leaf1.add(Object.assign(boxMesh(sW, 0.035, depth * 0.5, matF), { position: new THREE.Vector3(0, sH / 2 - 0.01, 0) }));
    leaf1.add(Object.assign(boxMesh(sW, 0.04, depth * 0.5, matF), { position: new THREE.Vector3(0, -sH / 2 + 0.01, 0) }));
    leaf1.add(Object.assign(boxMesh(0.02, 0.14, 0.015, matS), { position: new THREE.Vector3(sW / 2 - 0.03, 0, 0.02) }));
    leaf1.position.set(-widthM / 4 + fw / 2, 0, 0.015);
    group.add(leaf1);

    // Hoja derecha (fija)
    const leaf2 = new THREE.Group();
    leaf2.add(boxMesh(sW, sH, 0.012, matG));
    leaf2.add(Object.assign(boxMesh(sW, 0.035, depth * 0.5, matF), { position: new THREE.Vector3(0, sH / 2 - 0.01, 0) }));
    leaf2.add(Object.assign(boxMesh(sW, 0.04, depth * 0.5, matF), { position: new THREE.Vector3(0, -sH / 2 + 0.01, 0) }));
    leaf2.position.set(widthM / 4 - fw / 2, 0, -0.015);
    group.add(leaf2);

    // Sello EPDM central
    group.add(Object.assign(boxMesh(0.01, sH - 0.04, 0.015, matSeal), { position: new THREE.Vector3(0, 0, 0) }));

    return group;
}

// ── DUCHA ────────────────────────────────────────────────────────────────────
export function buildDucha(params: {
    widthM: number; heightM: number; aluminum: string; glassColor: string;
}): THREE.Group {
    const { widthM, heightM, glassColor } = params;
    const group = new THREE.Group();
    const matG = createGlassMaterial(glassColor);
    const matS = createSteelMaterial();
    const matSeal = createSealMaterial();

    // Panel de vidrio templado
    group.add(boxMesh(widthM, heightM, 0.012, matG));

    // Barra superior
    group.add(Object.assign(boxMesh(widthM + 0.1, 0.025, 0.025, matS), { position: new THREE.Vector3(0, heightM / 2 + 0.03, 0) }));

    // Soportes de barra
    group.add(Object.assign(boxMesh(0.04, 0.025, 0.04, matS), { position: new THREE.Vector3(-widthM / 2 - 0.04, heightM / 2 + 0.03, 0) }));
    group.add(Object.assign(boxMesh(0.04, 0.025, 0.04, matS), { position: new THREE.Vector3(widthM / 2 + 0.04, heightM / 2 + 0.03, 0) }));

    // Tirador / manija
    group.add(Object.assign(boxMesh(0.02, 0.35, 0.02, matS), { position: new THREE.Vector3(widthM / 2 - 0.08, 0, 0.02) }));

    // Bisagras
    group.add(Object.assign(boxMesh(0.04, 0.06, 0.025, matS), { position: new THREE.Vector3(-widthM / 2 + 0.02, heightM / 2 - 0.08, 0) }));
    group.add(Object.assign(boxMesh(0.04, 0.06, 0.025, matS), { position: new THREE.Vector3(-widthM / 2 + 0.02, -heightM / 2 + 0.08, 0) }));

    // Junquillo perimetral
    group.add(Object.assign(boxMesh(widthM + 0.01, 0.012, 0.02, matSeal), { position: new THREE.Vector3(0, heightM / 2 - 0.005, 0) }));
    group.add(Object.assign(boxMesh(widthM + 0.01, 0.012, 0.02, matSeal), { position: new THREE.Vector3(0, -heightM / 2 + 0.005, 0) }));

    return group;
}

// ── BARANDA ──────────────────────────────────────────────────────────────────
export function buildBaranda(params: {
    widthM: number; heightM: number; aluminum: string; glassColor: string;
}): THREE.Group {
    const { widthM, heightM, glassColor, aluminum } = params;
    const group = new THREE.Group();
    const matS = createSteelMaterial();
    const matG = createGlassMaterial(glassColor);
    const matF = createAluMaterial(aluminum);

    // Pasamanos superior
    group.add(Object.assign(boxMesh(widthM + 0.15, 0.04, 0.04, matS), { position: new THREE.Vector3(0, heightM / 2, 0) }));

    // Parantes
    const numPosts = Math.max(2, Math.round(widthM / 1.0) + 1);
    const postSpacing = widthM / (numPosts - 1);
    for (let i = 0; i < numPosts; i++) {
        const x = -widthM / 2 + i * postSpacing;
        group.add(Object.assign(boxMesh(0.035, heightM, 0.035, matS), { position: new THREE.Vector3(x, 0, 0) }));
    }

    // Paneles de vidrio
    const panelW = postSpacing - 0.06;
    for (let i = 0; i < numPosts - 1; i++) {
        const x = -widthM / 2 + (i + 0.5) * postSpacing;
        group.add(Object.assign(boxMesh(panelW, heightM * 0.65, 0.012, matG), { position: new THREE.Vector3(x, heightM / 2 - 0.02 - heightM * 0.325, 0) }));
    }

    // Botones de anclaje
    for (let i = 0; i < numPosts; i++) {
        const x = -widthM / 2 + i * postSpacing;
        group.add(Object.assign(boxMesh(0.05, 0.05, 0.05, matS), { position: new THREE.Vector3(x, heightM / 2 - 0.06, 0) }));
    }

    // Base
    group.add(Object.assign(boxMesh(widthM + 0.05, 0.04, 0.06, matF), { position: new THREE.Vector3(0, -0.02, 0) }));

    return group;
}

// ── BALCONES ─────────────────────────────────────────────────────────────────
export function buildBalcones(params: {
    widthM: number; heightM: number; glassColor: string; aluminum: string;
}): THREE.Group {
    const { widthM, heightM, glassColor, aluminum } = params;
    const group = new THREE.Group();
    const matG = createGlassMaterial(glassColor);
    const matF = createAluMaterial(aluminum);
    const matS = createSteelMaterial();
    const matSeal = createSealMaterial();

    // Panel vidrio
    group.add(boxMesh(widthM - 0.04, heightM - 0.04, 0.012, matG));

    // Zócalo inferior
    group.add(Object.assign(boxMesh(widthM, 0.08, 0.1, matF), { position: new THREE.Vector3(0, -heightM / 2 + 0.04, 0) }));

    // Barandal superior
    group.add(Object.assign(boxMesh(widthM + 0.1, 0.03, 0.04, matS), { position: new THREE.Vector3(0, heightM / 2 + 0.01, 0) }));

    // Pernos de anclaje (5)
    const numAnchors = Math.max(4, Math.round(widthM / 0.6));
    const anchorSpacing = (widthM - 0.3) / (numAnchors - 1);
    for (let i = 0; i < numAnchors; i++) {
        const x = -widthM / 2 + 0.15 + i * anchorSpacing;
        group.add(Object.assign(boxMesh(0.06, 0.06, 0.06, matS), { position: new THREE.Vector3(x, -heightM / 2 + 0.01, 0) }));
    }

    // Junquillo perimetral
    group.add(Object.assign(boxMesh(widthM - 0.02, 0.015, 0.02, matSeal), { position: new THREE.Vector3(0, -heightM / 2 + 0.08, 0) }));

    return group;
}

// ── PARAPETO ─────────────────────────────────────────────────────────────────
export function buildParapeto(params: {
    widthM: number; heightM: number; glassColor: string; aluminum: string;
}): THREE.Group {
    const { widthM, heightM, glassColor, aluminum } = params;
    const group = new THREE.Group();
    const matG = createGlassMaterial(glassColor);
    const matF = createAluMaterial(aluminum);
    const matS = createSteelMaterial();
    const matSeal = createSealMaterial();

    // Panel vidrio
    group.add(boxMesh(widthM - 0.04, heightM - 0.08, 0.012, matG));

    // Zócalo base ancho
    group.add(Object.assign(boxMesh(widthM + 0.08, 0.08, 0.12, matF), { position: new THREE.Vector3(0, -heightM / 2 + 0.04, 0) }));

    // Barandal superior
    group.add(Object.assign(boxMesh(widthM + 0.1, 0.035, 0.04, matS), { position: new THREE.Vector3(0, heightM / 2, 0) }));

    // Pernos de fijación (5)
    const numAnchors = Math.max(4, Math.round(widthM / 0.6));
    const anchorSpacing = (widthM - 0.4) / (numAnchors - 1);
    for (let i = 0; i < numAnchors; i++) {
        const x = -widthM / 2 + 0.2 + i * anchorSpacing;
        group.add(Object.assign(boxMesh(0.05, 0.05, 0.05, matS), { position: new THREE.Vector3(x, -heightM / 2 + 0.08, 0) }));
    }

    // Junquillo inferior
    group.add(Object.assign(boxMesh(widthM - 0.02, 0.015, 0.025, matSeal), { position: new THREE.Vector3(0, -heightM / 2 + 0.08, 0) }));

    return group;
}

// ── PUERTA DE VIDRIO ─────────────────────────────────────────────────────────
export function buildPvidrio(params: {
    widthM: number; heightM: number; glassColor: string;
}): THREE.Group {
    const { widthM, heightM, glassColor } = params;
    const group = new THREE.Group();
    const matG = createGlassMaterial(glassColor);
    const matS = createSteelMaterial();
    const matF = createAluMaterial("natural");
    const matSeal = createSealMaterial();

    // Panel vidrio templado
    group.add(boxMesh(widthM, heightM, 0.012, matG));

    // Jalador tubular
    group.add(Object.assign(boxMesh(0.02, 0.5, 0.02, matS), { position: new THREE.Vector3(widthM / 2 - 0.1, 0, 0.02) }));

    // Caja cerradura
    group.add(Object.assign(boxMesh(0.08, 0.12, 0.035, matS), { position: new THREE.Vector3(widthM / 2 - 0.06, -0.15, 0.01) }));

    // Freno de piso
    group.add(Object.assign(boxMesh(0.14, 0.04, 0.28, matF), { position: new THREE.Vector3(-widthM / 2 + 0.1, -heightM / 2 - 0.02, 0) }));

    // Bisagras
    group.add(Object.assign(boxMesh(0.04, 0.06, 0.03, matS), { position: new THREE.Vector3(-widthM / 2 + 0.03, heightM / 2 - 0.06, 0) }));
    group.add(Object.assign(boxMesh(0.04, 0.06, 0.03, matS), { position: new THREE.Vector3(-widthM / 2 + 0.03, -heightM / 2 + 0.06, 0) }));

    // Junquillo perimetral
    group.add(Object.assign(boxMesh(widthM + 0.005, 0.01, 0.02, matSeal), { position: new THREE.Vector3(0, heightM / 2 - 0.005, 0) }));
    group.add(Object.assign(boxMesh(widthM + 0.005, 0.01, 0.02, matSeal), { position: new THREE.Vector3(0, -heightM / 2 + 0.005, 0) }));

    return group;
}

// ── PUERTA SERIE ALUMINIO ────────────────────────────────────────────────────
export function buildPserie(params: {
    widthM: number; heightM: number; aluminum: string;
}): THREE.Group {
    const { widthM, heightM, aluminum } = params;
    const group = new THREE.Group();
    const matF = createAluMaterial(aluminum);
    const matInner = createAluMaterial(aluminum === "negro" ? "natural" : aluminum);
    const matS = createSteelMaterial();
    const fw = 0.06;
    const depth = 0.06;

    // Marco exterior
    group.add(Object.assign(boxMesh(widthM, fw, depth, matF), { position: new THREE.Vector3(0, heightM / 2 - fw / 2, 0) }));
    group.add(Object.assign(boxMesh(widthM, fw, depth, matF), { position: new THREE.Vector3(0, -heightM / 2 + fw / 2, 0) }));
    group.add(Object.assign(boxMesh(fw, heightM, depth, matF), { position: new THREE.Vector3(-widthM / 2 + fw / 2, 0, 0) }));
    group.add(Object.assign(boxMesh(fw, heightM, depth, matF), { position: new THREE.Vector3(widthM / 2 - fw / 2, 0, 0) }));

    // Panel central
    const panelW = widthM - fw * 2 - 0.01;
    const panelH = heightM - fw * 2 - 0.01;
    group.add(Object.assign(boxMesh(panelW, panelH, 0.008, matInner), { position: new THREE.Vector3(0, 0, -depth / 2 + 0.008) }));

    // Manija
    group.add(Object.assign(boxMesh(0.035, 0.16, 0.03, matS), { position: new THREE.Vector3(widthM / 2 - fw - 0.04, 0, depth / 2 + 0.01) }));

    // Cerradura
    group.add(Object.assign(boxMesh(0.06, 0.1, 0.025, matS), { position: new THREE.Vector3(widthM / 2 - fw - 0.02, -0.2, depth / 2 + 0.008) }));

    // Bisagras
    group.add(Object.assign(boxMesh(0.04, 0.08, 0.03, matS), { position: new THREE.Vector3(-widthM / 2 + fw / 2, heightM / 2 - fw - 0.1, 0) }));
    group.add(Object.assign(boxMesh(0.04, 0.08, 0.03, matS), { position: new THREE.Vector3(-widthM / 2 + fw / 2, -heightM / 2 + fw + 0.1, 0) }));

    return group;
}

// ── TECHO PERGOLA ────────────────────────────────────────────────────────────
export function buildTecho(params: {
    widthM: number; heightM: number; wood: string; poly: string;
}): THREE.Group {
    const { widthM, heightM, wood, poly } = params;
    const group = new THREE.Group();
    const w = WOOD_COLORS[wood] || WOOD_COLORS.teca;
    const p = POLY_COLORS[poly] || POLY_COLORS.bronce;
    const matWood = new THREE.MeshStandardMaterial({ color: w.color, roughness: w.roughness, metalness: 0.1 });
    const matPoly = new THREE.MeshPhysicalMaterial({
        color: p.color, transmission: p.transmission, opacity: 0.6,
        transparent: true, roughness: 0.15, ior: 1.52, side: THREE.DoubleSide,
    });
    const matSteel = createSteelMaterial();
    const legH = 2.6;

    // 4 Patas
    const legPositions = [
        [-widthM / 2 + 0.1, legH / 2, -heightM / 2 + 0.1],
        [widthM / 2 - 0.1, legH / 2, -heightM / 2 + 0.1],
        [-widthM / 2 + 0.1, legH / 2, heightM / 2 - 0.1],
        [widthM / 2 - 0.1, legH / 2, heightM / 2 - 0.1],
    ];
    for (const [x, y, z] of legPositions) {
        group.add(Object.assign(boxMesh(0.08, legH, 0.08, matWood), { position: new THREE.Vector3(x, y, z) }));
    }

    // Vigas principales (2)
    group.add(Object.assign(boxMesh(0.1, 0.12, heightM, matWood), { position: new THREE.Vector3(-widthM / 2 + 0.1, legH - 0.06, 0) }));
    group.add(Object.assign(boxMesh(0.1, 0.12, heightM, matWood), { position: new THREE.Vector3(widthM / 2 - 0.1, legH - 0.06, 0) }));

    // Viguetas transversales
    const numRafters = Math.max(3, Math.round(widthM / 0.6));
    const rafterSpacing = (widthM - 0.3) / (numRafters - 1);
    for (let i = 0; i < numRafters; i++) {
        const x = -widthM / 2 + 0.15 + i * rafterSpacing;
        group.add(Object.assign(boxMesh(0.06, 0.08, heightM - 0.2, matWood), { position: new THREE.Vector3(x, legH - 0.16, 0) }));
    }

    // Policarbonato superior
    group.add(Object.assign(
        new THREE.Mesh(new THREE.BoxGeometry(widthM + 0.08, 0.02, heightM + 0.08), matPoly),
        { position: new THREE.Vector3(0, legH - 0.02, 0) }
    ));

    // Refuerzos en esquina (diagonales)
    for (const [x, z] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) {
        const brace = boxMesh(0.04, 0.04, 0.35, matSteel);
        brace.position.set(x * (widthM / 2 - 0.28), legH - 0.2, z * (heightM / 2 - 0.28));
        brace.rotation.y = x * z * Math.PI / 4;
        group.add(brace);
    }

    return group;
}

// ── Builder Dispatcher ───────────────────────────────────────────────────────
export interface ServiceBuildParams {
    serviceSlug: string;
    widthM: number;
    heightM: number;
    aluminum: string;
    glassColor: string;
    wood: string;
    poly: string;
}

export function buildServiceModel(params: ServiceBuildParams): THREE.Group {
    switch (params.serviceSlug) {
        case "techo":
            return buildTecho({ widthM: params.widthM, heightM: params.heightM, wood: params.wood, poly: params.poly });
        case "mampara":
            return buildMampara({ widthM: params.widthM, heightM: params.heightM, aluminum: params.aluminum, glassColor: params.glassColor });
        case "ducha":
            return buildDucha({ widthM: params.widthM, heightM: params.heightM, aluminum: params.aluminum, glassColor: params.glassColor });
        case "baranda":
            return buildBaranda({ widthM: params.widthM, heightM: params.heightM, aluminum: params.aluminum, glassColor: params.glassColor });
        case "balcones":
            return buildBalcones({ widthM: params.widthM, heightM: params.heightM, glassColor: params.glassColor, aluminum: params.aluminum });
        case "parapeto":
            return buildParapeto({ widthM: params.widthM, heightM: params.heightM, glassColor: params.glassColor, aluminum: params.aluminum });
        case "pvidrio":
            return buildPvidrio({ widthM: params.widthM, heightM: params.heightM, glassColor: params.glassColor });
        case "pserie":
            return buildPserie({ widthM: params.widthM, heightM: params.heightM, aluminum: params.aluminum });
        case "celosias":
            return buildCelosias({ widthM: params.widthM, heightM: params.heightM, aluminum: params.aluminum });
        default:
            return buildMampara({ widthM: params.widthM, heightM: params.heightM, aluminum: params.aluminum, glassColor: params.glassColor });
    }
}
