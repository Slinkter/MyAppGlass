"use client";

import React, { useEffect, useRef } from "react";
import { Box, Text, HStack, Flex, IconButton } from "@chakra-ui/react";
import { Video } from "lucide-react";
import * as THREE from "three";

interface GLBModelCardProps {
  modelUrl: string;
  title?: string;
  height?: string;
}

export const GLBModelCard: React.FC<GLBModelCardProps> = ({
  modelUrl,
  title = "Modelo 3D",
  height = "460px",
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const autoRotateRef = useRef(true);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    let disposed = false;

    const init = async () => {
      const { OrbitControls } = await import("three/examples/jsm/controls/OrbitControls.js");
      const { GLTFLoader } = await import("three/examples/jsm/loaders/GLTFLoader.js");

      if (disposed) return;

      const w = currentMount.clientWidth || 400;
      const h = currentMount.clientHeight || 360;

      const scene = new THREE.Scene();
      scene.background = null;

      const camera = new THREE.PerspectiveCamera(40, w / h, 0.01, 100);
      camera.position.set(0, 1.5, 4.5);

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;
      currentMount.appendChild(renderer.domElement);

      // Luces
      scene.add(new THREE.AmbientLight(0xfff7ed, 1.8));
      const key = new THREE.DirectionalLight(0xffedd5, 2.5);
      key.position.set(5, 6, 4);
      scene.add(key);
      const fill = new THREE.DirectionalLight(0xfde68a, 0.9);
      fill.position.set(-4, -2, 3);
      scene.add(fill);
      const rim = new THREE.DirectionalLight(0xffffff, 1.0);
      rim.position.set(0, 5, -5);
      scene.add(rim);

      // Sombra suave en el suelo
      const shadowGeo = new THREE.PlaneGeometry(6, 6);
      const shadowMat = new THREE.MeshBasicMaterial({
        color: 0x947c64,
        transparent: true,
        opacity: 0.12,
      });
      const shadow = new THREE.Mesh(shadowGeo, shadowMat);
      shadow.rotation.x = -Math.PI / 2;
      shadow.position.y = -0.01;
      scene.add(shadow);

      // Controles
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.08;
      controls.enablePan = false;
      controls.minDistance = 1.5;
      controls.maxDistance = 12;
      controls.maxPolarAngle = Math.PI / 2.05;
      controls.target.set(0, 1.0, 0);

      // Cargar .glb
      let loadedModel: THREE.Group | null = null;
      const loader = new GLTFLoader();
      loader.load(
        modelUrl,
        (gltf) => {
          if (disposed) return;
          loadedModel = gltf.scene;

          // Centrar y escalar modelo
          const box = new THREE.Box3().setFromObject(loadedModel);
          const size = box.getSize(new THREE.Vector3());
          const center = box.getCenter(new THREE.Vector3());
          const maxDim = Math.max(size.x, size.y, size.z);
          const scale = 3.0 / maxDim;

          loadedModel.scale.setScalar(scale);
          loadedModel.position.sub(center.multiplyScalar(scale));
          loadedModel.position.y -= (box.min.y * scale);

          scene.add(loadedModel);
        },
        undefined,
        (err) => console.error("Error loading GLB:", err)
      );

      // Animación
      let raf: number;
      const animate = () => {
        raf = requestAnimationFrame(animate);
        controls.update();
        if (autoRotateRef.current) {
          controls.autoRotate = true;
          controls.autoRotateSpeed = 1.5;
        } else {
          controls.autoRotate = false;
        }
        renderer.render(scene, camera);
      };
      animate();

      // Resize
      const ro = new ResizeObserver(() => {
        if (!currentMount) return;
        const nw = currentMount.clientWidth;
        const nh = currentMount.clientHeight;
        camera.aspect = nw / nh;
        camera.updateProjectionMatrix();
        renderer.setSize(nw, nh);
      });
      ro.observe(currentMount);

      return () => {
        ro.disconnect();
        cancelAnimationFrame(raf);
        controls.dispose();
        loadedModel?.traverse((obj: THREE.Object3D) => {
          if (obj instanceof THREE.Mesh) {
            obj.geometry?.dispose();
            const m = obj.material;
            if (Array.isArray(m)) m.forEach((x) => x.dispose());
            else m?.dispose();
          }
        });
        renderer.dispose();
        if (currentMount.contains(renderer.domElement)) {
          currentMount.removeChild(renderer.domElement);
        }
      };
    };

    let cleanup: (() => void) | undefined;
    init().then((fn) => { cleanup = fn; });

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, [modelUrl]);

  return (
    <Box
      w="full"
      bg="surface.card"
      borderRadius="2xl"
      border="1px solid"
      borderColor="border.glass"
      backdropFilter="blur(16px)"
      boxShadow="0 20px 40px rgba(0,0,0,0.2)"
      overflow="hidden"
    >
      <Flex justify="space-between" align="center" px="5" pt="4" pb="1">
        <Text fontSize="xs" fontWeight="bold" color="text.muted" textTransform="uppercase" letterSpacing="wider">
          {title}
        </Text>
        <HStack gap="2">
          <IconButton
            aria-label={autoRotateRef.current ? "Pausar giro" : "Activar giro"}
            onClick={() => { autoRotateRef.current = !autoRotateRef.current; }}
            size="xs"
            variant="ghost"
            color="text.muted"
          >
            <Video size={14} />
          </IconButton>
        </HStack>
      </Flex>

      <Box
        ref={mountRef}
        w="full"
        h={height}
        cursor="grab"
        _active={{ cursor: "grabbing" }}
      />

      <Flex px="5" pb="3" pt="1" justify="space-between" align="center">
        <Text fontSize="2xs" color="text.muted">
          Arrastra para rotar · Scroll para zoom
        </Text>
        <Text fontSize="2xs" color="text.muted">
          Modelo .glb
        </Text>
      </Flex>
    </Box>
  );
};
