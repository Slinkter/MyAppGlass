import * as THREE from "three";

// ── Material Helpers ─────────────────────────────────────────────────────────

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
    bronce:       { color: 0x8a5229, transmission: 0.65 },
    opalino:      { color: 0xf0f4f8, transmission: 0.3 },
    transparente: { color: 0xe2f1ff, transmission: 0.9 },
    humo:         { color: 0x2a2e33, transmission: 0.45 },
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

function posBox(
    w: number, h: number, d: number,
    mat: THREE.Material,
    x: number, y: number, z: number,
    rx = 0, ry = 0,
): THREE.Mesh {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
    mesh.position.set(x, y, z);
    if (rx) mesh.rotation.x = rx;
    if (ry) mesh.rotation.y = ry;
    return mesh;
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
    group.add(posBox(widthM, fw, 0.04, matFrame, 0, heightM / 2 - fw / 2, 0));
    group.add(posBox(widthM, fw, 0.04, matFrame, 0, -heightM / 2 + fw / 2, 0));
    group.add(posBox(fw, heightM, 0.04, matFrame, -widthM / 2 + fw / 2, 0, 0));
    group.add(posBox(fw, heightM, 0.04, matFrame, widthM / 2 - fw / 2, 0, 0));

    // Lamas inclinadas
    const numSlats = Math.max(6, Math.round(heightM / 0.14));
    const slatW = widthM - fw * 2 - 0.02;
    const startY = -heightM / 2 + fw + 0.1;
    const endY = heightM / 2 - fw - 0.06;
    const spacing = (endY - startY) / (numSlats - 1);
    for (let i = 0; i < numSlats; i++) {
        const y = startY + i * spacing;
        group.add(posBox(slatW, 0.045, 0.025, matSlat, 0, y, 0, Math.PI / 8));
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
    group.add(posBox(widthM, fw, depth, matF, 0, heightM / 2 - fw / 2, 0));
    group.add(posBox(widthM, fw * 0.8, depth, matF, 0, -heightM / 2 + fw * 0.4, 0));
    group.add(posBox(fw, heightM, depth, matF, -widthM / 2 + fw / 2, 0, 0));
    group.add(posBox(fw, heightM, depth, matF, widthM / 2 - fw / 2, 0, 0));

    // Riel inferior
    const railW = widthM - fw * 2;
    group.add(posBox(railW, 0.012, depth * 0.7, matS, 0, -heightM / 2 + fw + 0.012, 0));

    // Hoja izquierda (móvil)
    const halfW = (widthM - fw * 2) / 2;
    const sW = halfW - 0.01;
    const sH = heightM - fw * 2 - 0.02;
    const leaf1 = new THREE.Group();
    leaf1.add(posBox(sW, sH, 0.012, matG, 0, 0, 0));
    leaf1.add(posBox(sW, 0.035, depth * 0.5, matF, 0, sH / 2 - 0.01, 0));
    leaf1.add(posBox(sW, 0.04, depth * 0.5, matF, 0, -sH / 2 + 0.01, 0));
    leaf1.add(posBox(0.02, 0.14, 0.015, matS, sW / 2 - 0.03, 0, 0.02));
    leaf1.position.set(-widthM / 4 + fw / 2, 0, 0.015);
    group.add(leaf1);

    // Hoja derecha (fija)
    const leaf2 = new THREE.Group();
    leaf2.add(posBox(sW, sH, 0.012, matG, 0, 0, 0));
    leaf2.add(posBox(sW, 0.035, depth * 0.5, matF, 0, sH / 2 - 0.01, 0));
    leaf2.add(posBox(sW, 0.04, depth * 0.5, matF, 0, -sH / 2 + 0.01, 0));
    leaf2.position.set(widthM / 4 - fw / 2, 0, -0.015);
    group.add(leaf2);

    // Sello EPDM central
    group.add(posBox(0.01, sH - 0.04, 0.015, matSeal, 0, 0, 0));

    return group;
}

// ── DUCHA (Alta Fidelidad Arquitectónica - Poliestireno Acrílica & Kit Inox) ──
export function buildDucha(params: {
    widthM: number; heightM: number; aluminum?: string; glassColor: string;
}): THREE.Group {
    const { widthM, heightM, aluminum = "natural", glassColor } = params;
    const group = new THREE.Group();
    const matS = createAluMaterial(aluminum); // Perfilería de aluminio
    const matSeal = createSealMaterial();

    // ──────────────────────────────────────────────────────────────────────────
    // OPCIÓN: POLIESTIRENO / ACRÍLICO ECONÓMICO (Marco perimetral + hojas corredizas)
    // ──────────────────────────────────────────────────────────────────────────
    // Material de poliestireno / acrílico translúcido con textura de gota/escarcha
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext("2d");
    if (ctx) {
        ctx.fillStyle = "#e0f2fe";
        ctx.fillRect(0, 0, 128, 128);
        ctx.fillStyle = "#ffffff";
        for (let i = 0; i < 80; i++) {
            const rx = Math.random() * 128;
            const ry = Math.random() * 128;
            const rad = 1 + Math.random() * 2.5;
            ctx.beginPath();
            ctx.arc(rx, ry, rad, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    const acrylicTexture = new THREE.CanvasTexture(canvas);
    acrylicTexture.wrapS = THREE.RepeatWrapping;
    acrylicTexture.wrapT = THREE.RepeatWrapping;
    acrylicTexture.repeat.set(4, 6);

    const matAcrylic = new THREE.MeshPhysicalMaterial({
        color: 0xe0f2fe,
        map: acrylicTexture,
        roughness: 0.45,
        transmission: 0.75,
        transparent: true,
        opacity: 0.9,
        ior: 1.49,
    });

    const frameW = 0.04;
    const frameD = 0.045;

    // 1. Marco exterior de aluminio perimetral (Cabezal, Riel inferior y Jambas laterales)
    group.add(posBox(widthM, frameW, frameD, matS, 0, heightM / 2 - frameW / 2, 0)); // Cabezal superior
    group.add(posBox(widthM, frameW, frameD, matS, 0, -heightM / 2 + frameW / 2, 0)); // Riel inferior
    group.add(posBox(frameW, heightM, frameD, matS, -widthM / 2 + frameW / 2, 0, 0)); // Jamba izquierda
    group.add(posBox(frameW, heightM, frameD, matS, widthM / 2 - frameW / 2, 0, 0)); // Jamba derecha

    const inW = widthM - frameW * 2;
    const inH = heightM - frameW * 2;
    const sashW = inW / 2 + 0.015; // Traslape de 1.5 cm
    const sashH = inH - 0.01;
    const pProfile = 0.032; // Perfil de hoja
    const pD = 0.025;

    // Función para crear hoja de poliestireno enmarcada en aluminio
    function createAcrylicSash(): THREE.Group {
        const sGroup = new THREE.Group();
        // Marco de la hoja
        sGroup.add(posBox(sashW, pProfile, pD, matS, 0, sashH / 2 - pProfile / 2, 0));
        sGroup.add(posBox(sashW, pProfile, pD, matS, 0, -sashH / 2 + pProfile / 2, 0));
        sGroup.add(posBox(pProfile, sashH, pD, matS, -sashW / 2 + pProfile / 2, 0, 0));
        sGroup.add(posBox(pProfile, sashH, pD, matS, sashW / 2 - pProfile / 2, 0, 0));

        // Plancha de poliestireno acrílico
        const panelW = sashW - pProfile * 2;
        const panelH = sashH - pProfile * 2;
        sGroup.add(posBox(panelW, panelH, 0.003, matAcrylic, 0, 0, 0));

        // Tirador / Jalador embutido
        sGroup.add(posBox(0.015, 0.12, 0.015, matS, sashW / 2 - pProfile - 0.01, 0, 0.008));
        return sGroup;
    }

    // 2. Hoja Fija (Izquierda)
    const fixedSash = createAcrylicSash();
    fixedSash.position.set(-inW / 4, 0, -pD / 2);
    group.add(fixedSash);

    // 3. Hoja Corrediza Móvil (Derecha)
    const movingSash = createAcrylicSash();
    movingSash.position.set(inW / 4, 0, pD / 2);
    movingSash.name = "slidingDoor"; // Permite que el botón Abrir/Cerrar la anime automáticamente
    group.add(movingSash);

    // 4. Guía central y sello vierteaguas
    group.add(posBox(0.03, 0.02, 0.04, matSeal, 0, -heightM / 2 + frameW + 0.01, 0));

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
    group.add(posBox(widthM + 0.15, 0.04, 0.04, matS, 0, heightM / 2, 0));

    // Parantes
    const numPosts = Math.max(2, Math.round(widthM / 1.0) + 1);
    const postSpacing = widthM / (numPosts - 1);
    for (let i = 0; i < numPosts; i++) {
        const x = -widthM / 2 + i * postSpacing;
        group.add(posBox(0.035, heightM, 0.035, matS, x, 0, 0));
    }

    // Paneles de vidrio
    const panelW = postSpacing - 0.06;
    for (let i = 0; i < numPosts - 1; i++) {
        const x = -widthM / 2 + (i + 0.5) * postSpacing;
        group.add(posBox(panelW, heightM * 0.65, 0.012, matG, x, heightM / 2 - 0.02 - heightM * 0.325, 0));
    }

    // Botones de anclaje
    for (let i = 0; i < numPosts; i++) {
        const x = -widthM / 2 + i * postSpacing;
        group.add(posBox(0.05, 0.05, 0.05, matS, x, heightM / 2 - 0.06, 0));
    }

    // Base
    group.add(posBox(widthM + 0.05, 0.04, 0.06, matF, 0, -0.02, 0));

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
    group.add(posBox(widthM - 0.04, heightM - 0.04, 0.012, matG, 0, 0, 0));

    // Zócalo inferior
    group.add(posBox(widthM, 0.08, 0.1, matF, 0, -heightM / 2 + 0.04, 0));

    // Barandal superior
    group.add(posBox(widthM + 0.1, 0.03, 0.04, matS, 0, heightM / 2 + 0.01, 0));

    // Pernos de anclaje
    const numAnchors = Math.max(4, Math.round(widthM / 0.6));
    const anchorSpacing = (widthM - 0.3) / (numAnchors - 1);
    for (let i = 0; i < numAnchors; i++) {
        const x = -widthM / 2 + 0.15 + i * anchorSpacing;
        group.add(posBox(0.06, 0.06, 0.06, matS, x, -heightM / 2 + 0.01, 0));
    }

    // Junquillo perimetral
    group.add(posBox(widthM - 0.02, 0.015, 0.02, matSeal, 0, -heightM / 2 + 0.08, 0));

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
    group.add(posBox(widthM - 0.04, heightM - 0.08, 0.012, matG, 0, 0, 0));

    // Zócalo base ancho
    group.add(posBox(widthM + 0.08, 0.08, 0.12, matF, 0, -heightM / 2 + 0.04, 0));

    // Barandal superior
    group.add(posBox(widthM + 0.1, 0.035, 0.04, matS, 0, heightM / 2, 0));

    // Pernos de fijación
    const numAnchors = Math.max(4, Math.round(widthM / 0.6));
    const anchorSpacing = (widthM - 0.4) / (numAnchors - 1);
    for (let i = 0; i < numAnchors; i++) {
        const x = -widthM / 2 + 0.2 + i * anchorSpacing;
        group.add(posBox(0.05, 0.05, 0.05, matS, x, -heightM / 2 + 0.08, 0));
    }

    // Junquillo inferior
    group.add(posBox(widthM - 0.02, 0.015, 0.025, matSeal, 0, -heightM / 2 + 0.08, 0));

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
    group.add(posBox(widthM, heightM, 0.012, matG, 0, 0, 0));

    // Jalador tubular
    group.add(posBox(0.02, 0.5, 0.02, matS, widthM / 2 - 0.1, 0, 0.02));

    // Caja cerradura
    group.add(posBox(0.08, 0.12, 0.035, matS, widthM / 2 - 0.06, -0.15, 0.01));

    // Freno de piso
    group.add(posBox(0.14, 0.04, 0.28, matF, -widthM / 2 + 0.1, -heightM / 2 - 0.02, 0));

    // Bisagras
    group.add(posBox(0.04, 0.06, 0.03, matS, -widthM / 2 + 0.03, heightM / 2 - 0.06, 0));
    group.add(posBox(0.04, 0.06, 0.03, matS, -widthM / 2 + 0.03, -heightM / 2 + 0.06, 0));

    // Junquillo perimetral
    group.add(posBox(widthM + 0.005, 0.01, 0.02, matSeal, 0, heightM / 2 - 0.005, 0));
    group.add(posBox(widthM + 0.005, 0.01, 0.02, matSeal, 0, -heightM / 2 + 0.005, 0));

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
    group.add(posBox(widthM, fw, depth, matF, 0, heightM / 2 - fw / 2, 0));
    group.add(posBox(widthM, fw, depth, matF, 0, -heightM / 2 + fw / 2, 0));
    group.add(posBox(fw, heightM, depth, matF, -widthM / 2 + fw / 2, 0, 0));
    group.add(posBox(fw, heightM, depth, matF, widthM / 2 - fw / 2, 0, 0));

    // Panel central
    const panelW = widthM - fw * 2 - 0.01;
    const panelH = heightM - fw * 2 - 0.01;
    group.add(posBox(panelW, panelH, 0.008, matInner, 0, 0, -depth / 2 + 0.008));

    // Manija
    group.add(posBox(0.035, 0.16, 0.03, matS, widthM / 2 - fw - 0.04, 0, depth / 2 + 0.01));

    // Cerradura
    group.add(posBox(0.06, 0.1, 0.025, matS, widthM / 2 - fw - 0.02, -0.2, depth / 2 + 0.008));

    // Bisagras
    group.add(posBox(0.04, 0.08, 0.03, matS, -widthM / 2 + fw / 2, heightM / 2 - fw - 0.1, 0));
    group.add(posBox(0.04, 0.08, 0.03, matS, -widthM / 2 + fw / 2, -heightM / 2 + fw + 0.1, 0));

    return group;
}

// ── TEXTURAS PROCEDURALES CANVAS ─────────────────────────────────────────────

const WOOD_PALETTES: Record<string, { base: string; grain: string }> = {
    teca:  { base: '#8A4A21', grain: '#4A230B' },
    nogal: { base: '#3D2314', grain: '#1D0D06' },
    roble: { base: '#C68B59', grain: '#7A4D27' },
    negro: { base: '#1A1A1A', grain: '#2A2A2A' },
};

export function createProceduralWoodTexture(paletteKey = 'teca'): THREE.CanvasTexture | null {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const pal = WOOD_PALETTES[paletteKey] || WOOD_PALETTES.teca;

    // Fondo
    ctx.fillStyle = pal.base;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Vetas de madera
    ctx.strokeStyle = pal.grain;
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.25;

    for (let i = 0; i < 120; i++) {
        ctx.beginPath();
        const y = Math.random() * canvas.height;
        ctx.moveTo(0, y);
        ctx.bezierCurveTo(
            170, y + (Math.random() - 0.5) * 40,
            340, y + (Math.random() - 0.5) * 40,
            512, y + (Math.random() - 0.5) * 20
        );
        ctx.stroke();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 4);
    return texture;
}

// ── TECHO PERGOLA SOL Y SOMBRA (ARQUITECTURA DE ALTA FIDELIDAD) ───────────────
export function buildTecho(params: {
    widthM: number; heightM: number; wood: string; poly: string;
}): THREE.Group {
    const { widthM, heightM, wood, poly } = params;
    const group = new THREE.Group();
    const p = POLY_COLORS[poly] || POLY_COLORS.bronce;

    // Material de madera con textura procedural si está en navegador
    const woodTexture = createProceduralWoodTexture(wood);
    const wCol = WOOD_COLORS[wood] || WOOD_COLORS.teca;
    const matWood = new THREE.MeshStandardMaterial({
        color: woodTexture ? 0xffffff : wCol.color,
        map: woodTexture || undefined,
        roughness: 0.6,
        metalness: 0.1,
    });

    const matPoly = new THREE.MeshPhysicalMaterial({
        color: p.color,
        transmission: p.transmission,
        opacity: 0.55,
        transparent: true,
        roughness: 0.15,
        ior: 1.5,
        thickness: 0.02,
        side: THREE.DoubleSide,
    });

    const postSize = 0.12; // 12x12 cm columnas
    const beamHeight = 0.18; // Vigas perimetrales
    const beamWidth = 0.08;
    const slatWidth = 0.04;  // Listones del sol y sombra
    const slatHeight = 0.09;
    const legH = 2.6; // Altura estándar columnas

    // 1. COLUMNAS VERTICALES (4 Esquinas)
    const posX = widthM / 2 - postSize / 2;
    const posZ = heightM / 2 - postSize / 2;
    const postPositions: [number, number, number][] = [
        [-posX, legH / 2, -posZ],
        [ posX, legH / 2, -posZ],
        [-posX, legH / 2,  posZ],
        [ posX, legH / 2,  posZ],
    ];
    postPositions.forEach(([x, y, z]) => {
        group.add(posBox(postSize, legH, postSize, matWood, x, y, z));
    });

    // 2. VIGAS PERIMETRALES (Marco principal de aluminio/madera)
    const beamTopY = legH + beamHeight / 2;

    // Vigas Longitudinales (Largo/Proyección)
    group.add(posBox(beamWidth, beamHeight, heightM, matWood, -widthM / 2 + beamWidth / 2, beamTopY - beamHeight / 2, 0));
    group.add(posBox(beamWidth, beamHeight, heightM, matWood, widthM / 2 - beamWidth / 2, beamTopY - beamHeight / 2, 0));

    // Vigas Transversales (Ancho/Frente)
    group.add(posBox(widthM, beamHeight, beamWidth, matWood, 0, beamTopY - beamHeight / 2, heightM / 2 - beamWidth / 2));
    group.add(posBox(widthM, beamHeight, beamWidth, matWood, 0, beamTopY - beamHeight / 2, -heightM / 2 + beamWidth / 2));

    // 3. LISTONES INTERNOS (SOL Y SOMBRA PARAMÉTRICOS)
    const innerLength = heightM - beamWidth * 2;
    const slatSpacing = 0.15; // 15 cm de separación arquitectónica estándar
    const numSlats = Math.max(3, Math.floor(innerLength / slatSpacing));
    const actualSpacing = innerLength / (numSlats + 1);
    const slatY = legH + slatHeight / 2;

    for (let i = 1; i <= numSlats; i++) {
        const zPos = -heightM / 2 + beamWidth + i * actualSpacing;
        group.add(posBox(widthM - beamWidth * 2, slatHeight, slatWidth, matWood, 0, slatY, zPos));
    }

    // 4. PLANCHA DE POLICARBONATO TRANSLÚCIDO SUPERIOR
    const polyThickness = 0.012; // 12mm policarbonato alveolar
    group.add(posBox(widthM + 0.1, polyThickness, heightM + 0.1, matPoly, 0, legH + slatHeight + polyThickness / 2 + 0.005, 0));

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
