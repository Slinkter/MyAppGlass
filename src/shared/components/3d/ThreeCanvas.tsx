"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export interface AluminumFinish {
  id: string;
  name: string;
  hex: string;
  metalness: number;
  roughness: number;
}

export interface GlassTint {
  id: string;
  name: string;
  color: number;
  transmission: number;
  opacity: number;
  roughness?: number;
}

export type RoomEnvironment = "sala" | "cuarto" | "oficina" | "terraza" | "estudio";

export interface ThreeCanvasProps {
  systemType:
    | "ventana"
    | "mampara"
    | "ducha"
    | "techo"
    | "parapeto"
    | "baranda"
    | "balcones"
    | "pvidrio"
    | "pserie"
    | "celosias"
    | string;
  width?: string;
  height?: string;
  numSashes?: 2 | 4;
  systemVariant?:
    | "corrediza"
    | "piso-techo-pivot"
    | "proyectante"
    | "pivotante"
    | "fija"
    | "celosias";
  environment?: RoomEnvironment;
  autoRotate?: boolean;
  rotationSpeed?: number;
  customWidth?: number;
  customHeight?: number;
  aluminumFinish?: AluminumFinish;
  glassTint?: GlassTint;
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({
  systemType,
  width = "100%",
  height = "360px",
  numSashes = 2,
  systemVariant = "corrediza",
  environment = "sala",
  autoRotate = true,
  rotationSpeed = 0.002,
  customWidth,
  customHeight,
  aluminumFinish,
  glassTint,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  const activeAluminumHex = aluminumFinish?.hex || "#f8fafc";
  const activeAluminumMetalness = aluminumFinish?.metalness ?? 0.25;
  const activeAluminumRoughness = aluminumFinish?.roughness ?? 0.35;

  const activeGlassColor = glassTint?.color ?? 0xebf4ff;
  const activeGlassTransmission = glassTint?.transmission ?? 0.95;
  const activeGlassOpacity = glassTint?.opacity ?? 0.3;
  const activeGlassRoughness = glassTint?.roughness ?? 0.02;

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = null;

    const widthPx = currentMount.clientWidth || 400;
    const heightPx = currentMount.clientHeight || 360;

    const camera = new THREE.PerspectiveCamera(45, widthPx / heightPx, 0.1, 100);
    camera.position.set(0, 0, 3.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(widthPx, heightPx);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = environment === "terraza" ? 1.25 : 1.1;
    currentMount.appendChild(renderer.domElement);

    // 2. Luces adaptadas según el Ambiente Seleccionado
    let ambientHex = 0xfff7ed;
    let keyHex = 0xffedd5;
    let fillHex = 0xfef08a;

    if (environment === "sala") {
      ambientHex = 0xfef3c7; // Sala cálida y acogedora
      keyHex = 0xffedd5;
      fillHex = 0xfde68a;
    } else if (environment === "cuarto") {
      ambientHex = 0xf5ebe0; // Cuarto neutro relajante
      keyHex = 0xeed7c5;
      fillHex = 0xd5bdaf;
    } else if (environment === "oficina") {
      ambientHex = 0xf1f5f9; // Oficina moderna luz neutra
      keyHex = 0xffffff;
      fillHex = 0xcbd5e1;
    } else if (environment === "terraza") {
      ambientHex = 0xe0f2fe; // Terraza cielo abierto luminoso
      keyHex = 0xfef9c3;
      fillHex = 0xbae6fd;
    } else {
      ambientHex = 0xfffdfa; // Estudio limpio
      keyHex = 0xffedd5;
      fillHex = 0xfef08a;
    }

    const ambientLight = new THREE.AmbientLight(ambientHex, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(keyHex, 2.2);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(fillHex, 0.8);
    fillLight.position.set(-4, -2, 2);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 1.2);
    rimLight.position.set(0, 4, -4);
    scene.add(rimLight);

    const group = new THREE.Group();

    // Materiales arquitectónicos reactivos con calidad PBR Cinematográfica (estilo Kage)
    const frameMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(activeAluminumHex),
      metalness: activeAluminumMetalness,
      roughness: activeAluminumRoughness,
    });

    const innerSashMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(activeAluminumHex),
      metalness: activeAluminumMetalness * 0.95,
      roughness: activeAluminumRoughness * 1.05,
    });

    const lockMat = new THREE.MeshStandardMaterial({
      color: 0xe4e4e7,
      metalness: 0.95,
      roughness: 0.15,
    });

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(activeGlassColor),
      transmission: activeGlassTransmission,
      opacity: activeGlassOpacity,
      transparent: true,
      roughness: activeGlassRoughness,
      ior: 1.52,
      reflectivity: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      thickness: 0.05,
      specularIntensity: 1.0,
    });

    // Sombra de piso suave y elegante
    const shadowGeo = new THREE.PlaneGeometry(3.2, 0.8);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x947c64,
      transparent: true,
      opacity: 0.18,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.set(0, -0.9, 0);
    scene.add(shadowMesh);

    // ==========================================
    // INGENIERÍA ARQUITECTÓNICA DE ALUMINIO (CATÁLOGOS OFICIALES)
    // ==========================================

    // Material para felpa corta-viento y empaques EPDM
    const gasketMat = new THREE.MeshBasicMaterial({ color: 0x18181b });

    // Función auxiliar básica de marco
    const createFrame = (w: number, h: number, border: number, depth: number, mat: THREE.Material) => {
      const frameGroup = new THREE.Group();
      const topGeo = new THREE.BoxGeometry(w, border, depth);
      const topMesh = new THREE.Mesh(topGeo, mat);
      topMesh.position.set(0, h / 2 - border / 2, 0);
      frameGroup.add(topMesh);

      const botMesh = new THREE.Mesh(topGeo.clone(), mat);
      botMesh.position.set(0, -h / 2 + border / 2, 0);
      frameGroup.add(botMesh);

      const leftGeo = new THREE.BoxGeometry(border, h - 2 * border, depth);
      const leftMesh = new THREE.Mesh(leftGeo, mat);
      leftMesh.position.set(-w / 2 + border / 2, 0, 0);
      frameGroup.add(leftMesh);

      const rightMesh = new THREE.Mesh(leftGeo.clone(), mat);
      rightMesh.position.set(w / 2 - border / 2, 0, 0);
      frameGroup.add(rightMesh);

      return frameGroup;
    };

    // 1. Marco Corredizo Extruido con Rieles Dobles y Cámara de Agua (Serie VL42 / Silenzo VL46 / Serie 20-25)
    const createSlidingOuterFrame = (w: number, h: number, depth: number) => {
      const frameGroup = new THREE.Group();
      const wallFlange = 0.025; // Solapa perimétrica de fijación al muro
      const baseBorder = 0.055;

      // Cabezal Superior (Riel Guía con Ranuras)
      const topGeo = new THREE.BoxGeometry(w, baseBorder, depth);
      const topMesh = new THREE.Mesh(topGeo, frameMat);
      topMesh.position.set(0, h / 2 - baseBorder / 2, 0);
      frameGroup.add(topMesh);

      // Pestaña perimetral exterior de tope (Solapa)
      const flangeTop = new THREE.Mesh(new THREE.BoxGeometry(w + 0.02, wallFlange, 0.012), frameMat);
      flangeTop.position.set(0, h / 2 - wallFlange / 2, -depth / 2 - 0.005);
      frameGroup.add(flangeTop);

      // Riel Inferior con Pistas Guía de Rodamiento y Cámara de Agua
      const botGeo = new THREE.BoxGeometry(w, baseBorder * 0.8, depth);
      const botMesh = new THREE.Mesh(botGeo, frameMat);
      botMesh.position.set(0, -h / 2 + (baseBorder * 0.8) / 2, 0);
      frameGroup.add(botMesh);

      // Pista de rodamiento 1 (Riel Posterior)
      const railTrack1 = new THREE.Mesh(new THREE.BoxGeometry(w - 0.02, 0.008, 0.006), lockMat);
      railTrack1.position.set(0, -h / 2 + baseBorder * 0.8 + 0.004, -depth * 0.22);
      frameGroup.add(railTrack1);

      // Pista de rodamiento 2 (Riel Frontal)
      const railTrack2 = new THREE.Mesh(new THREE.BoxGeometry(w - 0.02, 0.008, 0.006), lockMat);
      railTrack2.position.set(0, -h / 2 + baseBorder * 0.8 + 0.004, depth * 0.22);
      frameGroup.add(railTrack2);

      // Jambas Laterales con Felpa Amortiguadora
      const leftGeo = new THREE.BoxGeometry(baseBorder, h - baseBorder * 1.8, depth);
      const leftMesh = new THREE.Mesh(leftGeo, frameMat);
      leftMesh.position.set(-w / 2 + baseBorder / 2, 0, 0);
      frameGroup.add(leftMesh);

      const rightGeo = new THREE.BoxGeometry(baseBorder, h - baseBorder * 1.8, depth);
      const rightMesh = new THREE.Mesh(rightGeo, frameMat);
      rightMesh.position.set(w / 2 - baseBorder / 2, 0, 0);
      frameGroup.add(rightMesh);

      return frameGroup;
    };

    // 2. Hoja Corrediza con Parantes de Chapa, Parantes de Traslape (Interlock) y Zócalos
    const createSlidingSash = (
      w: number,
      h: number,
      isLeftInterlock: boolean,
      isRightInterlock: boolean,
      hasFermaxLock: boolean,
      lockSide: "left" | "right" = "left"
    ) => {
      const sashGroup = new THREE.Group();
      const stWidth = 0.048; // Ancho del parante
      const zocaloH = 0.065; // Altura de zócalo inferior portagarrucha
      const cabezalH = 0.045; // Altura de cabezal superior
      const depth = 0.038;

      // Zócalo Inferior
      const zocalo = new THREE.Mesh(new THREE.BoxGeometry(w, zocaloH, depth), innerSashMat);
      zocalo.position.set(0, -h / 2 + zocaloH / 2, 0);
      sashGroup.add(zocalo);

      // Cabezal Superior
      const cabezal = new THREE.Mesh(new THREE.BoxGeometry(w, cabezalH, depth), innerSashMat);
      cabezal.position.set(0, h / 2 - cabezalH / 2, 0);
      sashGroup.add(cabezal);

      // Parante Izquierdo
      const leftStile = new THREE.Mesh(
        new THREE.BoxGeometry(stWidth, h - zocaloH - cabezalH, depth),
        innerSashMat
      );
      leftStile.position.set(-w / 2 + stWidth / 2, (zocaloH - cabezalH) / 2, 0);
      sashGroup.add(leftStile);

      // Si tiene traslape / enganche interlock a la izquierda (Aleta corta-viento)
      if (isLeftInterlock) {
        const finGeo = new THREE.BoxGeometry(0.012, h - 0.02, 0.02);
        const finMesh = new THREE.Mesh(finGeo, innerSashMat);
        finMesh.position.set(-w / 2 - 0.006, 0, 0.015);
        sashGroup.add(finMesh);

        // Tira de felpa
        const felt = new THREE.Mesh(new THREE.BoxGeometry(0.005, h - 0.04, 0.008), gasketMat);
        felt.position.set(-w / 2 - 0.01, 0, 0.015);
        sashGroup.add(felt);
      }

      // Parante Derecho
      const rightStile = new THREE.Mesh(
        new THREE.BoxGeometry(stWidth, h - zocaloH - cabezalH, depth),
        innerSashMat
      );
      rightStile.position.set(w / 2 - stWidth / 2, (zocaloH - cabezalH) / 2, 0);
      sashGroup.add(rightStile);

      // Si tiene traslape / enganche interlock a la derecha
      if (isRightInterlock) {
        const finGeo = new THREE.BoxGeometry(0.012, h - 0.02, 0.02);
        const finMesh = new THREE.Mesh(finGeo, innerSashMat);
        finMesh.position.set(w / 2 + 0.006, 0, -0.015);
        sashGroup.add(finMesh);

        const felt = new THREE.Mesh(new THREE.BoxGeometry(0.005, h - 0.04, 0.008), gasketMat);
        felt.position.set(w / 2 + 0.01, 0, -0.015);
        sashGroup.add(felt);
      }

      // Junquillos de Presión y Cristal Templado
      const glassW = w - stWidth * 2 + 0.018;
      const glassH = h - zocaloH - cabezalH + 0.018;
      const glass = new THREE.Mesh(new THREE.BoxGeometry(glassW, glassH, 0.012), glassMat);
      glass.position.set(0, (zocaloH - cabezalH) / 2, 0);
      sashGroup.add(glass);

      // Junquillo perimétrico biselado interior
      const beadGeo = new THREE.BoxGeometry(glassW, 0.012, 0.01);
      const beadTop = new THREE.Mesh(beadGeo, innerSashMat);
      beadTop.position.set(0, (zocaloH - cabezalH) / 2 + glassH / 2 - 0.006, depth / 2 - 0.005);
      sashGroup.add(beadTop);
      const beadBot = new THREE.Mesh(beadGeo, innerSashMat);
      beadBot.position.set(0, (zocaloH - cabezalH) / 2 - glassH / 2 + 0.006, depth / 2 - 0.005);
      sashGroup.add(beadBot);

      // Cierre Embutido Fermax (Catálogo Corrales 03VP00137)
      if (hasFermaxLock) {
        const lockGroup = new THREE.Group();
        const plate = new THREE.Mesh(new THREE.BoxGeometry(0.022, 0.16, 0.006), lockMat);
        const trigger = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.04, 0.015), gasketMat);
        trigger.position.set(0, 0, 0.008);
        lockGroup.add(plate);
        lockGroup.add(trigger);

        const lockX = lockSide === "left" ? -w / 2 + stWidth / 2 : w / 2 - stWidth / 2;
        lockGroup.position.set(lockX, 0, depth / 2 + 0.002);
        sashGroup.add(lockGroup);
      }

      return sashGroup;
    };

    // 3. Marco de Sistema Fijo / Practitec VLP46 con Junquillo a Presión
    const createPractitecFrame = (w: number, h: number, depth: number = 0.055) => {
      const frameGroup = new THREE.Group();
      const profileW = 0.055;

      const topGeo = new THREE.BoxGeometry(w, profileW, depth);
      const topMesh = new THREE.Mesh(topGeo, frameMat);
      topMesh.position.set(0, h / 2 - profileW / 2, 0);
      frameGroup.add(topMesh);

      const botMesh = new THREE.Mesh(topGeo.clone(), frameMat);
      botMesh.position.set(0, -h / 2 + profileW / 2, 0);
      frameGroup.add(botMesh);

      const sideGeo = new THREE.BoxGeometry(profileW, h - profileW * 2, depth);
      const leftMesh = new THREE.Mesh(sideGeo, frameMat);
      leftMesh.position.set(-w / 2 + profileW / 2, 0, 0);
      frameGroup.add(leftMesh);

      const rightMesh = new THREE.Mesh(sideGeo.clone(), frameMat);
      rightMesh.position.set(w / 2 - profileW / 2, 0, 0);
      frameGroup.add(rightMesh);

      return frameGroup;
    };

    if (systemType === "ventana") {
      const W = customWidth || (systemVariant === "piso-techo-pivot" ? 1.15 : systemVariant === "corrediza" && numSashes === 4 ? 2.8 : 2.0);
      const H = customHeight || (systemVariant === "piso-techo-pivot" ? 2.45 : 1.4);

      if (systemVariant === "corrediza" && numSashes === 2) {
        // ==========================================
        // 🪟 VENTANA CORREDIZA 2 HOJAS (OX) - SERIE VL42 / SILENZO
        // ==========================================
        const outerFrame = createSlidingOuterFrame(W, H, 0.095);
        group.add(outerFrame);

        const sashW = W / 2 + 0.025; // Traslape central de 5cm
        const sashH = H - 0.09;

        // Hoja 1 (Fija / Riel Posterior Izquierdo)
        const sash1 = createSlidingSash(sashW, sashH, false, true, false, "left");
        sash1.position.set(-W / 4 + 0.015, 0, -0.022);
        group.add(sash1);

        // Hoja 2 (Móvil / Riel Frontal Derecho con Cierre Fermax)
        const sash2 = createSlidingSash(sashW, sashH, true, false, true, "right");
        sash2.position.set(W / 4 - 0.015, 0, 0.022);
        group.add(sash2);

      } else if (systemVariant === "corrediza" && numSashes === 4) {
        // ==========================================
        // 🪟 VENTANA CORREDIZA 4 HOJAS (OXXO) - SERIE VL42 / SILENZO
        // ==========================================
        const outerFrame = createSlidingOuterFrame(W, H, 0.095);
        group.add(outerFrame);

        const sashW = W / 4 + 0.03;
        const sashH = H - 0.09;

        // Hoja 1: Fija Extrema Izquierda (Riel Posterior)
        const sash1 = createSlidingSash(sashW, sashH, false, true, false, "left");
        sash1.position.set(-W * 0.36, 0, -0.022);
        group.add(sash1);

        // Hoja 2: Móvil Centro-Izquierda (Riel Frontal con Cierre)
        const sash2 = createSlidingSash(sashW, sashH, true, true, true, "left");
        sash2.position.set(-W * 0.12, 0, 0.022);
        group.add(sash2);

        // Hoja 3: Móvil Centro-Derecha (Riel Frontal con Cierre)
        const sash3 = createSlidingSash(sashW, sashH, true, true, true, "right");
        sash3.position.set(W * 0.12, 0, 0.022);
        group.add(sash3);

        // Hoja 4: Fija Extrema Derecha (Riel Posterior)
        const sash4 = createSlidingSash(sashW, sashH, true, false, false, "right");
        sash4.position.set(W * 0.36, 0, -0.022);
        group.add(sash4);

      } else if (systemVariant === "fija") {
        // ==========================================
        // 🛡️ SISTEMA FIJO CON JUNQUILLOS PLB4708 (MÁXIMA HERMETICIDAD)
        // ==========================================
        const outerFrame = createPractitecFrame(W, H, 0.06);
        group.add(outerFrame);

        // Junquillo perimétrico interior portavidrio
        const beadBorder = 0.016;
        const innerW = W - 0.11;
        const innerH = H - 0.11;

        const glassMesh = new THREE.Mesh(new THREE.BoxGeometry(innerW, innerH, 0.015), glassMat);
        group.add(glassMesh);

        // Molduras de junquillo a 45°
        const beadTop = new THREE.Mesh(new THREE.BoxGeometry(innerW, beadBorder, 0.012), innerSashMat);
        beadTop.position.set(0, innerH / 2 - beadBorder / 2, 0.015);
        group.add(beadTop);

        const beadBot = new THREE.Mesh(new THREE.BoxGeometry(innerW, beadBorder, 0.012), innerSashMat);
        beadBot.position.set(0, -innerH / 2 + beadBorder / 2, 0.015);
        group.add(beadBot);

        const beadLeft = new THREE.Mesh(new THREE.BoxGeometry(beadBorder, innerH - beadBorder * 2, 0.012), innerSashMat);
        beadLeft.position.set(-innerW / 2 + beadBorder / 2, 0, 0.015);
        group.add(beadLeft);

        const beadRight = new THREE.Mesh(new THREE.BoxGeometry(beadBorder, innerH - beadBorder * 2, 0.012), innerSashMat);
        beadRight.position.set(innerW / 2 - beadBorder / 2, 0, 0.015);
        group.add(beadRight);

      } else if (systemVariant === "proyectante") {
        // ==========================================
        // 📐 SISTEMA PROYECTANTE PRACTITEC VLP46 (APERTURA EXTERIOR)
        // ==========================================
        const outerFrame = createPractitecFrame(W, H, 0.06);
        group.add(outerFrame);

        const sashW = W - 0.09;
        const sashH = H - 0.09;
        const projSash = new THREE.Group();
        projSash.position.set(0, 0, 0.02);
        projSash.rotation.x = -0.22; // Inclinación proyectante real

        // Marco de la hoja batiente
        const sashFrame = createPractitecFrame(sashW, sashH, 0.045);
        projSash.add(sashFrame);

        // Cristal templado
        const glassMesh = new THREE.Mesh(new THREE.BoxGeometry(sashW - 0.09, sashH - 0.09, 0.012), glassMat);
        projSash.add(glassMesh);

        // Manija Proyectante Ergonómica Fermax (Catálogo Corrales)
        const handleBase = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.12, 0.01), lockMat);
        handleBase.position.set(0, -sashH / 2 + 0.06, 0.025);
        projSash.add(handleBase);
        const handleLever = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.02, 0.025), lockMat);
        handleLever.position.set(0.04, -sashH / 2 + 0.06, 0.04);
        projSash.add(handleLever);

        // Brazos telescópicos de fricción de acero inoxidable
        const arm1 = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.35), lockMat);
        arm1.position.set(-sashW / 2 + 0.04, -H * 0.15, 0.06);
        arm1.rotation.x = Math.PI / 3;
        group.add(arm1);

        const arm2 = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.35), lockMat);
        arm2.position.set(sashW / 2 - 0.04, -H * 0.15, 0.06);
        arm2.rotation.x = Math.PI / 3;
        group.add(arm2);

        group.add(projSash);

      } else if (systemVariant === "pivotante") {
        // ==========================================
        // 🔄 SISTEMA PIVOTANTE PRACTITEC VLP46 (EJE VERTICAL)
        // ==========================================
        const outerFrame = createPractitecFrame(W, H, 0.06);
        group.add(outerFrame);

        const sashW = W - 0.09;
        const sashH = H - 0.09;
        const pivotSash = new THREE.Group();
        pivotSash.rotation.y = 0.55; // Ángulo de apertura pivotante

        const sashFrame = createPractitecFrame(sashW, sashH, 0.045);
        pivotSash.add(sashFrame);

        const glassMesh = new THREE.Mesh(new THREE.BoxGeometry(sashW - 0.09, sashH - 0.09, 0.012), glassMat);
        pivotSash.add(glassMesh);

        // Tirador Tubular de Acero Inoxidable (Catálogo Corrales)
        const pullBar = new THREE.Mesh(
          new THREE.CylinderGeometry(0.012, 0.012, Math.min(0.4, sashH * 0.45)),
          lockMat
        );
        pullBar.position.set(sashW / 2 - 0.05, 0, 0.035);
        pivotSash.add(pullBar);

        // Pivotes Superior e Inferior
        const topPivot = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.08), lockMat);
        topPivot.position.set(0, H / 2 - 0.04, 0);
        group.add(topPivot);

        const botPivot = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.08), lockMat);
        botPivot.position.set(0, -H / 2 + 0.04, 0);
        group.add(botPivot);

        group.add(pivotSash);

      } else if (systemVariant === "piso-techo-pivot") {
        // ==========================================
        // 🏢 SISTEMA PISO A TECHO MIXTA (TRAVESAÑO VLP4609 + FIJO + PROYECTANTE)
        // ==========================================
        const outerFrame = createPractitecFrame(W, H, 0.065);
        group.add(outerFrame);

        // Travesaño Intermedio Extruido VLP4609
        const transom = new THREE.Mesh(new THREE.BoxGeometry(W - 0.09, 0.055, 0.065), frameMat);
        transom.position.set(0, 0.05, 0);
        group.add(transom);

        // Paño Fijo Inferior con Junquillo
        const botH = H / 2 - 0.12;
        const botGlass = new THREE.Mesh(new THREE.BoxGeometry(W - 0.11, botH, 0.012), glassMat);
        botGlass.position.set(0, -H / 4, 0);
        group.add(botGlass);

        // Hoja Superior Batiente/Proyectante
        const topH = H / 2 - 0.12;
        const topSash = new THREE.Group();
        topSash.position.set(0, H / 4 + 0.05, 0.02);
        topSash.rotation.x = -0.16;

        const topSashFrame = createPractitecFrame(W - 0.11, topH, 0.045);
        topSash.add(topSashFrame);

        const topGlass = new THREE.Mesh(new THREE.BoxGeometry(W - 0.19, topH - 0.08, 0.012), glassMat);
        topSash.add(topGlass);

        // Manija proyectante
        const handle = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.022, 0.025), lockMat);
        handle.position.set(0, -topH / 2 + 0.05, 0.03);
        topSash.add(handle);

        group.add(topSash);

      } else {
        // ==========================================
        // 🪜 VENTANA LOUVER / CELOSÍA CON LAMAS BASCULANTES
        // ==========================================
        const outerFrame = createPractitecFrame(W, H, 0.06);
        group.add(outerFrame);

        const bladeCount = 7;
        const bladeW = W - 0.11;
        const bladeH = 0.16;
        const spacing = (H - 0.18) / bladeCount;

        for (let i = 0; i < bladeCount; i++) {
          const yPos = -H / 2 + 0.16 + i * spacing;
          const bladeGroup = new THREE.Group();
          bladeGroup.position.set(0, yPos, 0);

          const bladeMesh = new THREE.Mesh(new THREE.BoxGeometry(bladeW, bladeH, 0.008), glassMat);
          bladeMesh.rotation.x = Math.PI / 4;
          bladeGroup.add(bladeMesh);

          const clip1 = new THREE.Mesh(new THREE.BoxGeometry(0.02, bladeH, 0.025), frameMat);
          clip1.position.set(-bladeW / 2 + 0.01, 0, 0);
          clip1.rotation.x = Math.PI / 4;
          bladeGroup.add(clip1);

          const clip2 = new THREE.Mesh(new THREE.BoxGeometry(0.02, bladeH, 0.025), frameMat);
          clip2.position.set(bladeW / 2 - 0.01, 0, 0);
          clip2.rotation.x = Math.PI / 4;
          bladeGroup.add(clip2);

          group.add(bladeGroup);
        }
      }

    } else if (systemType === "mampara") {
      // 🚪 MAMPARA SERIE 25 (Piso a techo)
      const outerFrame = createFrame(2.2, 2.3, 0.09, 0.14, frameMat);
      group.add(outerFrame);

      const sashW = 1.08;
      const sashH = 2.12;

      // Hoja 1
      const sash1 = createFrame(sashW, sashH, 0.06, 0.05, innerSashMat);
      sash1.position.set(-0.52, 0, 0.03);
      const g1Mesh = new THREE.Mesh(new THREE.BoxGeometry(sashW - 0.1, sashH - 0.1, 0.015), glassMat);
      sash1.add(g1Mesh);
      const handle1 = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.4), lockMat);
      handle1.position.set(sashW / 2 - 0.04, 0, 0.035);
      sash1.add(handle1);
      group.add(sash1);

      // Hoja 2
      const sash2 = createFrame(sashW, sashH, 0.06, 0.05, innerSashMat);
      sash2.position.set(0.52, 0, -0.03);
      const g2Mesh = new THREE.Mesh(new THREE.BoxGeometry(sashW - 0.1, sashH - 0.1, 0.015), glassMat);
      sash2.add(g2Mesh);
      const handle2 = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.4), lockMat);
      handle2.position.set(-sashW / 2 + 0.04, 0, 0.035);
      sash2.add(handle2);
      group.add(sash2);

    } else if (systemType === "ducha") {
      // 🚿 BOX DE DUCHA VIDRIO TEMPLADO & ACERO INOXIDABLE
      const glassW = 1.1;
      const glassH = 2.0;
      const glassMesh = new THREE.Mesh(new THREE.BoxGeometry(glassW, glassH, 0.02), glassMat);
      group.add(glassMesh);

      // Tubo superior de acero inox
      const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 1.4), lockMat);
      bar.rotation.z = Math.PI / 2;
      bar.position.set(0, glassH / 2 + 0.05, 0);
      group.add(bar);

      // Tirador tipo toallero de acero inox
      const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.5), lockMat);
      handle.position.set(glassW / 2 - 0.15, 0, 0.04);
      group.add(handle);

    } else if (systemType === "parapeto" || systemType === "balcones") {
      // 🏙️ PARAPETO / BALCÓN PANORÁMICO
      const pWidth = 2.2;
      const pHeight = 1.1;
      const glassMesh = new THREE.Mesh(new THREE.BoxGeometry(pWidth, pHeight, 0.018), glassMat);
      glassMesh.position.set(0, 0, 0);
      group.add(glassMesh);

      // Zócalo inferior o pernos
      const baseRail = new THREE.Mesh(new THREE.BoxGeometry(pWidth + 0.1, 0.08, 0.1), frameMat);
      baseRail.position.set(0, -pHeight / 2 - 0.04, 0);
      group.add(baseRail);

      // Pasamanos superior ranurado
      const topRail = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, pWidth + 0.1), lockMat);
      topRail.rotation.z = Math.PI / 2;
      topRail.position.set(0, pHeight / 2 + 0.02, 0);
      group.add(topRail);

    } else if (systemType === "baranda") {
      // 🪜 BARANDA DE ACERO & VIDRIO
      const bWidth = 2.0;
      const bHeight = 1.0;
      
      // Pasamanos superior
      const handrail = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, bWidth + 0.2), lockMat);
      handrail.rotation.z = Math.PI / 2;
      handrail.position.set(0, bHeight / 2, 0);
      group.add(handrail);

      // Parantes verticales de acero
      for (let x = -0.9; x <= 0.9; x += 0.9) {
        const post = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, bHeight), lockMat);
        post.position.set(x, 0, 0);
        group.add(post);
      }

      // Paneles de vidrio
      const glass1 = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.8, 0.015), glassMat);
      glass1.position.set(-0.45, 0, 0);
      group.add(glass1);

      const glass2 = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.8, 0.015), glassMat);
      glass2.position.set(0.45, 0, 0);
      group.add(glass2);

    } else if (systemType === "pvidrio") {
      // 🚪 PUERTA DE VIDRIO TEMPLADO CON FRENO DE PISO
      const doorW = 1.0;
      const doorH = 2.2;
      const glassMesh = new THREE.Mesh(new THREE.BoxGeometry(doorW, doorH, 0.015), glassMat);
      group.add(glassMesh);

      // Jalador largo tubular de acero inox
      const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.6), lockMat);
      handle.position.set(doorW / 2 - 0.12, 0, 0.035);
      group.add(handle);

      // Chapa central
      const lockBox = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.14, 0.04), lockMat);
      lockBox.position.set(doorW / 2 - 0.05, -0.2, 0);
      group.add(lockBox);

      // Freno hidráulico en la base
      const floorSpring = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.04, 0.25), innerSashMat);
      floorSpring.position.set(-doorW / 2 + 0.08, -doorH / 2 - 0.02, 0);
      group.add(floorSpring);

    } else if (systemType === "pserie") {
      // 🚪 PUERTA DE ALUMINIO SERIE
      const doorFrame = createFrame(1.1, 2.2, 0.08, 0.1, frameMat);
      group.add(doorFrame);

      // Panel central arenado
      const panelMesh = new THREE.Mesh(new THREE.BoxGeometry(0.94, 2.04, 0.02), innerSashMat);
      group.add(panelMesh);

      // Manija de apertura
      const doorHandle = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.04, 0.06), lockMat);
      doorHandle.position.set(0.4, 0, 0.04);
      group.add(doorHandle);

    } else if (systemType === "celosias") {
      // 💨 CELOSÍA DE ALUMINIO
      const cWidth = 1.4;
      const cHeight = 1.6;
      const cFrame = createFrame(cWidth, cHeight, 0.06, 0.08, frameMat);
      group.add(cFrame);

      // Lamas horizontales inclinadas
      const louverGeo = new THREE.BoxGeometry(cWidth - 0.08, 0.08, 0.01);
      for (let y = -0.65; y <= 0.65; y += 0.15) {
        const louver = new THREE.Mesh(louverGeo, innerSashMat);
        louver.position.set(0, y, 0);
        louver.rotation.x = 0.5; // Inclinación 45°
        group.add(louver);
      }

    } else {
      // ☀️ TECHO DE POLICARBONATO / COBERTURA
      const roofMesh = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.05, 2.4), glassMat);
      roofMesh.rotation.x = 0.35;
      group.add(roofMesh);

      // Vigas de soporte
      const beamGeo = new THREE.BoxGeometry(0.06, 0.1, 2.6);
      for (let x = -1.0; x <= 1.0; x += 0.5) {
        const beam = new THREE.Mesh(beamGeo, frameMat);
        beam.position.set(x, 0, 0);
        beam.rotation.x = 0.35;
        group.add(beam);
      }
    }

    scene.add(group);

    // 4. Interacción táctil y ratón (Rotación 360°)
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      group.rotation.y += deltaX * 0.01;
      group.rotation.x += deltaY * 0.01;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    // Soporte táctil en celulares
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePosition.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.y;

      group.rotation.y += deltaX * 0.01;
      group.rotation.x += deltaY * 0.01;

      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    dom.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    // ResizeObserver para ajuste responsivo (three-best-practices)
    const resizeObserver = new ResizeObserver(() => {
      if (!currentMount) return;
      const newWidth = currentMount.clientWidth;
      const newHeight = currentMount.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });
    resizeObserver.observe(currentMount);

    // Loop de animación con rotación suave controlada
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (autoRotate && !isDragging) {
        group.rotation.y += rotationSpeed;
      }
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      dom.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      dom.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);

      // Memory Management (Category 1 three-best-practices)
      group.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry?.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material?.dispose();
          }
        }
      });
      frameMat.dispose();
      innerSashMat.dispose();
      lockMat.dispose();
      glassMat.dispose();

      if (currentMount.contains(renderer.domElement)) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [
    systemType,
    systemVariant,
    environment,
    autoRotate,
    rotationSpeed,
    customWidth,
    customHeight,
    numSashes,
    activeAluminumHex,
    activeAluminumMetalness,
    activeAluminumRoughness,
    activeGlassColor,
    activeGlassTransmission,
    activeGlassOpacity,
    activeGlassRoughness,
  ]);

  return (
    <div
      ref={mountRef}
      style={{
        width,
        height,
        cursor: "grab",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    />
  );
};
