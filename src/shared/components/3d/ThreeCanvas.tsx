"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface ThreeCanvasProps {
  systemType: "ventana" | "mampara" | "ducha" | "techo";
  width?: string;
  height?: string;
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({
  systemType,
  width = "100%",
  height = "360px",
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = null;

    const widthPx = currentMount.clientWidth || 400;
    const heightPx = currentMount.clientHeight || 360;

    const camera = new THREE.PerspectiveCamera(45, widthPx / heightPx, 0.1, 100);
    camera.position.set(0, 0, 3.4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(widthPx, heightPx);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    // 2. Luces realistas
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x38bdf8, 2.0);
    dirLight1.position.set(4, 5, 4);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 1.0);
    dirLight2.position.set(-4, -3, -3);
    scene.add(dirLight2);

    const group = new THREE.Group();

    // Materiales arquitectónicos
    const frameMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b, // Aluminio negro mate
      metalness: 0.85,
      roughness: 0.3,
    });

    const innerSashMat = new THREE.MeshStandardMaterial({
      color: 0x334155, // Perfil de hoja corrediza
      metalness: 0.8,
      roughness: 0.35,
    });

    const lockMat = new THREE.MeshStandardMaterial({
      color: 0xd4d4d8, // Tirador / Cierre de aluminio satinado
      metalness: 0.95,
      roughness: 0.15,
    });

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x60a5fa,
      transmission: 0.85,
      opacity: 0.6,
      transparent: true,
      roughness: 0.05,
      ior: 1.52,
    });

    // Función auxiliar para crear perfiles huecos de marco
    const createFrame = (w: number, h: number, border: number, depth: number, mat: THREE.Material) => {
      const frameGroup = new THREE.Group();
      // Superior
      const topGeo = new THREE.BoxGeometry(w, border, depth);
      const topMesh = new THREE.Mesh(topGeo, mat);
      topMesh.position.set(0, h / 2 - border / 2, 0);
      frameGroup.add(topMesh);

      // Inferior (Riel)
      const botGeo = new THREE.BoxGeometry(w, border, depth);
      const botMesh = new THREE.Mesh(botGeo, mat);
      botMesh.position.set(0, -h / 2 + border / 2, 0);
      frameGroup.add(botMesh);

      // Izquierda
      const leftGeo = new THREE.BoxGeometry(border, h - 2 * border, depth);
      const leftMesh = new THREE.Mesh(leftGeo, mat);
      leftMesh.position.set(-w / 2 + border / 2, 0, 0);
      frameGroup.add(leftMesh);

      // Derecha
      const rightGeo = new THREE.BoxGeometry(border, h - 2 * border, depth);
      const rightMesh = new THREE.Mesh(rightGeo, mat);
      rightMesh.position.set(w / 2 - border / 2, 0, 0);
      frameGroup.add(rightMesh);

      return frameGroup;
    };

    if (systemType === "ventana") {
      // 🪟 VENTANA NOVA REALISTA (Marco perimétrico + 2 hojas corredizas + cristales + cerrojos)
      const outerFrame = createFrame(2.0, 1.4, 0.08, 0.12, frameMat);
      group.add(outerFrame);

      // Hoja Izquierda (Corrediza)
      const sashW = 0.98;
      const sashH = 1.24;
      const sash1 = createFrame(sashW, sashH, 0.05, 0.04, innerSashMat);
      sash1.position.set(-0.48, 0, 0.025);
      // Cristal izquierdo
      const g1Geo = new THREE.BoxGeometry(sashW - 0.08, sashH - 0.08, 0.012);
      const g1Mesh = new THREE.Mesh(g1Geo, glassMat);
      sash1.add(g1Mesh);
      // Cierre / Tirador caracol
      const lock1 = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.12, 0.03), lockMat);
      lock1.position.set(sashW / 2 - 0.03, 0, 0.025);
      sash1.add(lock1);
      group.add(sash1);

      // Hoja Derecha (Fija / Corrediza interior)
      const sash2 = createFrame(sashW, sashH, 0.05, 0.04, innerSashMat);
      sash2.position.set(0.48, 0, -0.025);
      // Cristal derecho
      const g2Geo = new THREE.BoxGeometry(sashW - 0.08, sashH - 0.08, 0.012);
      const g2Mesh = new THREE.Mesh(g2Geo, glassMat);
      sash2.add(g2Mesh);
      // Cierre
      const lock2 = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.12, 0.03), lockMat);
      lock2.position.set(-sashW / 2 + 0.03, 0, 0.025);
      sash2.add(lock2);
      group.add(sash2);

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

    // Loop de animación con rotación suave
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isDragging) {
        group.rotation.y += 0.008;
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
  }, [systemType]);

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
