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
  height = "340px",
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = null;

    const widthPx = currentMount.clientWidth || 400;
    const heightPx = currentMount.clientHeight || 340;

    const camera = new THREE.PerspectiveCamera(45, widthPx / heightPx, 0.1, 100);
    camera.position.set(0, 0.5, 3.8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(widthPx, heightPx);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    // 2. Iluminación realista PBR
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x38bdf8, 1.4);
    dirLight1.position.set(3, 4, 3);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight2.position.set(-3, -2, -2);
    scene.add(dirLight2);

    // 3. Crear geometría 3D arquitectónica procedural
    const group = new THREE.Group();

    // Materiales PBR
    const frameMaterial = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.9,
      roughness: 0.25,
    });

    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      transmission: 0.92,
      opacity: 0.85,
      transparent: true,
      roughness: 0.05,
      ior: 1.5,
    });

    if (systemType === "ventana") {
      // Marco exterior
      const frameGeo = new THREE.BoxGeometry(2.0, 1.4, 0.1);
      const frameMesh = new THREE.Mesh(frameGeo, frameMaterial);
      group.add(frameMesh);

      // Cristal izquierdo
      const glassGeo1 = new THREE.BoxGeometry(0.9, 1.25, 0.02);
      const glassMesh1 = new THREE.Mesh(glassGeo1, glassMaterial);
      glassMesh1.position.set(-0.45, 0, 0.02);
      group.add(glassMesh1);

      // Cristal derecho
      const glassGeo2 = new THREE.BoxGeometry(0.9, 1.25, 0.02);
      const glassMesh2 = new THREE.Mesh(glassGeo2, glassMaterial);
      glassMesh2.position.set(0.45, 0, -0.02);
      group.add(glassMesh2);
    } else if (systemType === "mampara") {
      // Mampara gran formato
      const frameGeo = new THREE.BoxGeometry(2.2, 2.2, 0.1);
      const frameMesh = new THREE.Mesh(frameGeo, frameMaterial);
      group.add(frameMesh);

      const glassGeo1 = new THREE.BoxGeometry(1.0, 2.05, 0.02);
      const glassMesh1 = new THREE.Mesh(glassGeo1, glassMaterial);
      glassMesh1.position.set(-0.5, 0, 0.02);
      group.add(glassMesh1);

      const glassGeo2 = new THREE.BoxGeometry(1.0, 2.05, 0.02);
      const glassMesh2 = new THREE.Mesh(glassGeo2, glassMaterial);
      glassMesh2.position.set(0.5, 0, -0.02);
      group.add(glassMesh2);
    } else if (systemType === "ducha") {
      // Box de Ducha Cristal + Inox
      const glassGeo = new THREE.BoxGeometry(1.0, 2.0, 0.02);
      const glassMesh = new THREE.Mesh(glassGeo, glassMaterial);
      group.add(glassMesh);

      const handleGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.4);
      const inoxMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.95, roughness: 0.1 });
      const handleMesh = new THREE.Mesh(handleGeo, inoxMat);
      handleMesh.position.set(0.35, 0, 0.04);
      group.add(handleMesh);
    } else {
      // Techo
      const roofGeo = new THREE.BoxGeometry(2.4, 0.04, 2.4);
      const roofMesh = new THREE.Mesh(roofGeo, glassMaterial);
      roofMesh.rotation.x = 0.3;
      group.add(roofMesh);
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

    // ResizeObserver para ajuste responsivo según Three.js Best Practices
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

    // 5. Loop de animación con rotación suave continua
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
      
      // Memory Management & Dispose (Category 1 de Three.js Best Practices)
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
      frameMaterial.dispose();
      glassMaterial.dispose();

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
