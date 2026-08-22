"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Badge,
  IconButton,
  Input,
} from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import {
  Play,
  Pause,
  RotateCcw,
  Maximize2,
  Minimize2,
  Sparkles,
  Camera,
  Smartphone,
  FolderOpen,
  CheckCircle2,
} from "lucide-react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { WebARLiveCameraModal } from "./WebARLiveCameraModal";

export interface StudioModelItem {
  id: string;
  title: string;
  category: string;
  systemType: string;
  glbModelUrl: string;
  usdzModelUrl: string;
  description: string;
  dimensions: string;
}

export const DEFAULT_STUDIO_MODELS: StudioModelItem[] = [
  {
    id: "mampara-25",
    title: "Mampara Corrediza Serie 25",
    category: "Mamparas & Terrazas",
    systemType: "mampara",
    glbModelUrl: "/models/mampara-serie25.glb",
    usdzModelUrl: "/models/mampara-serie25.glb",
    description: "Mampara de cristal templado de 8mm/10mm para terrazas y salas de estar con perfiles anodizados.",
    dimensions: "2.40m x 2.20m",
  },
  {
    id: "ventana-nova",
    title: "Ventana Antirruido Sistema Nova",
    category: "Ventanas Acústicas",
    systemType: "ventana",
    glbModelUrl: "/models/ventana-nova.glb",
    usdzModelUrl: "/models/ventana-nova.glb",
    description: "Ventana corrediza hermética con perfilería Nova y cristal acústico templado.",
    dimensions: "1.50m x 1.20m",
  },
  {
    id: "puerta-ducha",
    title: "Box de Ducha en Cristal & Acero Inox",
    category: "Puertas de Ducha",
    systemType: "ducha",
    glbModelUrl: "/models/puerta-ducha.glb",
    usdzModelUrl: "/models/puerta-ducha.glb",
    description: "Puerta corrediza para ducha con tubo y rodamientos de acero inoxidable 304.",
    dimensions: "1.20m x 1.90m",
  },
  {
    id: "techo-poly",
    title: "Techo de Policarbonato Alveolar",
    category: "Techos & Coberturas",
    systemType: "techo",
    glbModelUrl: "/models/techo-policarbonato.glb",
    usdzModelUrl: "/models/techo-policarbonato.glb",
    description: "Cobertura de aluminio con protección solar UV y estructura resistente a la intemperie.",
    dimensions: "3.00m x 2.50m",
  },
  {
    id: "baranda-acero",
    title: "Baranda de Vidrio Templado & Acero",
    category: "Barandas & Escaleras",
    systemType: "baranda",
    glbModelUrl: "/models/mampara-serie25.glb",
    usdzModelUrl: "/models/mampara-serie25.glb",
    description: "Baranda minimalista con pasamanos de acero y botones de anclaje de alta resistencia.",
    dimensions: "2.00m x 1.05m",
  },
  {
    id: "parapeto-vidrio",
    title: "Parapeto de Vidrio Templado Panorámico",
    category: "Parapetos & Azoteas",
    systemType: "parapeto",
    glbModelUrl: "/models/mampara-serie25.glb",
    usdzModelUrl: "/models/mampara-serie25.glb",
    description: "Parapeto de seguridad para azoteas y terrazas con cristal templado de 10mm.",
    dimensions: "2.50m x 1.10m",
  },
  {
    id: "balcon-panoramico",
    title: "Balcón Panorámico en Cristal",
    category: "Balcones & Fachadas",
    systemType: "balcones",
    glbModelUrl: "/models/mampara-serie25.glb",
    usdzModelUrl: "/models/mampara-serie25.glb",
    description: "Cerramiento panorámico para balcones residenciales con cristal de 8mm/10mm.",
    dimensions: "2.80m x 1.15m",
  },
  {
    id: "puerta-vidrio",
    title: "Puerta de Cristal con Freno Hidráulico",
    category: "Puertas de Vidrio",
    systemType: "pvidrio",
    glbModelUrl: "/models/mampara-serie25.glb",
    usdzModelUrl: "/models/mampara-serie25.glb",
    description: "Puerta de cristal templado batiente con freno de piso y tirador tubular de acero.",
    dimensions: "0.95m x 2.15m",
  },
  {
    id: "puerta-serie",
    title: "Puerta de Aluminio Serie Residencial",
    category: "Puertas de Aluminio",
    systemType: "pserie",
    glbModelUrl: "/models/ventana-nova.glb",
    usdzModelUrl: "/models/ventana-nova.glb",
    description: "Puerta de perfiles extruidos de aluminio con plancha arenada y cerradura de seguridad.",
    dimensions: "0.90m x 2.10m",
  },
  {
    id: "celosia-aluminio",
    title: "Celosía de Ventilación en Aluminio",
    category: "Celosías & Ventilación",
    systemType: "celosias",
    glbModelUrl: "/models/ventana-nova.glb",
    usdzModelUrl: "/models/ventana-nova.glb",
    description: "Sistema de lamas de aluminio para ventilación continua y protección solar.",
    dimensions: "1.20m x 1.40m",
  },
];

export const AFrameStudioModelViewer: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedModel, setSelectedModel] = useState<StudioModelItem>(DEFAULT_STUDIO_MODELS[0]);
  const [customUrlInput, setCustomUrlInput] = useState("");
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLiveCameraOpen, setIsLiveCameraOpen] = useState(false);
  const [isLoadingModel, setIsLoadingModel] = useState(false);
  const [deviceType, setDeviceType] = useState<"ios" | "android" | "desktop">("desktop");

  const controlsRef = useRef<OrbitControls | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const ua = navigator.userAgent;
      if (/iPhone|iPad|iPod/i.test(ua)) setDeviceType("ios");
      else if (/Android/i.test(ua)) setDeviceType("android");
      else setDeviceType("desktop");
    }
  }, []);

  // Función para construir geometrías arquitectónicas procedimentales
  const buildProceduralSystem = useCallback((systemType: string): THREE.Group => {
    const group = new THREE.Group();

    const frameMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.85,
      roughness: 0.25,
    });
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      metalness: 0.8,
      roughness: 0.3,
    });
    const lockMat = new THREE.MeshStandardMaterial({
      color: 0xd4d4d8,
      metalness: 0.95,
      roughness: 0.15,
    });
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x93c5fd,
      transmission: 0.9,
      opacity: 0.45,
      transparent: true,
      roughness: 0.05,
      ior: 1.52,
    });

    const createFrame = (w: number, h: number, border: number, depth: number, mat: THREE.Material) => {
      const fGroup = new THREE.Group();
      const topMesh = new THREE.Mesh(new THREE.BoxGeometry(w, border, depth), mat);
      topMesh.position.set(0, h / 2 - border / 2, 0);
      topMesh.castShadow = true;
      fGroup.add(topMesh);

      const botMesh = new THREE.Mesh(new THREE.BoxGeometry(w, border, depth), mat);
      botMesh.position.set(0, -h / 2 + border / 2, 0);
      botMesh.castShadow = true;
      fGroup.add(botMesh);

      const leftMesh = new THREE.Mesh(new THREE.BoxGeometry(border, h - 2 * border, depth), mat);
      leftMesh.position.set(-w / 2 + border / 2, 0, 0);
      leftMesh.castShadow = true;
      fGroup.add(leftMesh);

      const rightMesh = new THREE.Mesh(new THREE.BoxGeometry(border, h - 2 * border, depth), mat);
      rightMesh.position.set(w / 2 - border / 2, 0, 0);
      rightMesh.castShadow = true;
      fGroup.add(rightMesh);

      return fGroup;
    };

    if (systemType === "ventana") {
      const outerFrame = createFrame(2.0, 1.4, 0.08, 0.12, frameMat);
      group.add(outerFrame);
      const sash1 = createFrame(0.98, 1.24, 0.05, 0.04, innerMat);
      sash1.position.set(-0.48, 0, 0.025);
      const g1 = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.16, 0.012), glassMat);
      sash1.add(g1);
      const lock1 = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.12, 0.03), lockMat);
      lock1.position.set(0.46, 0, 0.025);
      sash1.add(lock1);
      group.add(sash1);

      const sash2 = createFrame(0.98, 1.24, 0.05, 0.04, innerMat);
      sash2.position.set(0.48, 0, -0.025);
      const g2 = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.16, 0.012), glassMat);
      sash2.add(g2);
      group.add(sash2);
    } else if (systemType === "mampara") {
      const outerFrame = createFrame(2.2, 2.3, 0.09, 0.14, frameMat);
      group.add(outerFrame);
      const sash1 = createFrame(1.08, 2.12, 0.06, 0.05, innerMat);
      sash1.position.set(-0.52, 0, 0.03);
      sash1.add(new THREE.Mesh(new THREE.BoxGeometry(0.98, 2.02, 0.015), glassMat));
      const handle1 = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.4), lockMat);
      handle1.position.set(0.5, 0, 0.035);
      sash1.add(handle1);
      group.add(sash1);

      const sash2 = createFrame(1.08, 2.12, 0.06, 0.05, innerMat);
      sash2.position.set(0.52, 0, -0.03);
      sash2.add(new THREE.Mesh(new THREE.BoxGeometry(0.98, 2.02, 0.015), glassMat));
      group.add(sash2);
    } else if (systemType === "ducha") {
      const glassMesh = new THREE.Mesh(new THREE.BoxGeometry(1.1, 2.0, 0.02), glassMat);
      glassMesh.castShadow = true;
      group.add(glassMesh);
      const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 1.4), lockMat);
      bar.rotation.z = Math.PI / 2;
      bar.position.set(0, 1.05, 0);
      bar.castShadow = true;
      group.add(bar);
      const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.5), lockMat);
      handle.position.set(0.4, 0, 0.04);
      group.add(handle);
    } else if (systemType === "baranda" || systemType === "parapeto" || systemType === "balcones") {
      const handrail = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 2.2), lockMat);
      handrail.rotation.z = Math.PI / 2;
      handrail.position.set(0, 0.5, 0);
      handrail.castShadow = true;
      group.add(handrail);
      for (let x = -0.9; x <= 0.9; x += 0.9) {
        const post = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 1.0), lockMat);
        post.position.set(x, 0, 0);
        post.castShadow = true;
        group.add(post);
      }
      const g1 = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.8, 0.015), glassMat);
      g1.position.set(-0.45, 0, 0);
      group.add(g1);
      const g2 = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.8, 0.015), glassMat);
      g2.position.set(0.45, 0, 0);
      group.add(g2);
    } else {
      const baseRoof = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.04, 2.0), glassMat);
      baseRoof.rotation.x = 0.3;
      baseRoof.castShadow = true;
      group.add(baseRoof);
      for (let x = -0.9; x <= 0.9; x += 0.45) {
        const beam = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.08, 2.2), frameMat);
        beam.position.set(x, 0, 0);
        beam.rotation.x = 0.3;
        beam.castShadow = true;
        group.add(beam);
      }
    }

    return group;
  }, []);

  // Carga de modelo activo (GLTF o Procedural fallback)
  const loadModel = useCallback((modelItem: StudioModelItem) => {
    if (!sceneRef.current) return;
    const scene = sceneRef.current;

    // Limpiar modelo anterior
    if (modelGroupRef.current) {
      scene.remove(modelGroupRef.current);
      modelGroupRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry?.dispose();
          if (Array.isArray(child.material)) child.material.forEach((m) => m.dispose());
          else child.material?.dispose();
        }
      });
    }

    setIsLoadingModel(true);

    const loader = new GLTFLoader();
    loader.load(
      modelItem.glbModelUrl,
      (gltf) => {
        const loadedGroup = new THREE.Group();
        const root = gltf.scene;

        // Normalizar escala y centrar modelo
        const box = new THREE.Box3().setFromObject(root);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2.2 / (maxDim || 1);

        root.position.sub(center);
        root.scale.set(scale, scale, scale);
        root.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        loadedGroup.add(root);
        loadedGroup.position.set(0, 0, 0);
        scene.add(loadedGroup);
        modelGroupRef.current = loadedGroup;
        setIsLoadingModel(false);
      },
      undefined,
      () => {
        // Fallback procedural ultra-rápido si el archivo GLB no está disponible localmente
        const proceduralGroup = buildProceduralSystem(modelItem.systemType);
        scene.add(proceduralGroup);
        modelGroupRef.current = proceduralGroup;
        setIsLoadingModel(false);
      }
    );
  }, [buildProceduralSystem]);

  // Inicialización de la Escena Studio Three.js
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Fondo Studio Gradient
    scene.background = new THREE.Color(0x0f172a);
    scene.fog = new THREE.FogExp2(0x0f172a, 0.035);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 4.2);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    mount.innerHTML = "";
    mount.appendChild(renderer.domElement);

    // OrbitControls con Damping suave
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 + 0.1; // Evitar pasar por debajo del suelo
    controls.minDistance = 1.5;
    controls.maxDistance = 8.0;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.2;
    controlsRef.current = controls;

    // Iluminación Studio Rig
    const ambientLight = new THREE.HemisphereLight(0xffffff, 0x1e293b, 1.5);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(4, 7, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.bias = -0.0001;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x38bdf8, 1.2);
    fillLight.position.set(-5, 2, -3);
    scene.add(fillLight);

    // Suelo Studio con Disco de Sombra de Contacto (A-Frame Pattern)
    const floorGeo = new THREE.PlaneGeometry(30, 30);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x090d16,
      roughness: 0.8,
      metalness: 0.1,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.25;
    floor.receiveShadow = true;
    scene.add(floor);

    // Shadow Disc debajo del modelo
    const shadowGeo = new THREE.CircleGeometry(1.6, 64);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.45,
    });
    const shadowDisc = new THREE.Mesh(shadowGeo, shadowMat);
    shadowDisc.rotation.x = -Math.PI / 2;
    shadowDisc.position.y = -1.24;
    scene.add(shadowDisc);

    // Cargar modelo inicial
    loadModel(selectedModel);

    // Resize listener
    const handleResize = () => {
      if (!mount) return;
      const nw = mount.clientWidth;
      const nh = mount.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      controls.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [loadModel, selectedModel]);

  // Actualizar Auto-rotación
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = isAutoRotating;
    }
  }, [isAutoRotating]);

  // Manejar cambio de modelo desde el carrusel
  const handleSelectModel = (model: StudioModelItem) => {
    setSelectedModel(model);
    loadModel(model);
  };

  // Abrir modelo desde URL personalizada (A-Frame feature)
  const handleOpenCustomUrl = () => {
    if (!customUrlInput.trim()) return;
    const customItem: StudioModelItem = {
      id: "custom-url",
      title: "Modelo Personalizado GLTF/GLB",
      category: "Personalizado",
      systemType: "mampara",
      glbModelUrl: customUrlInput.trim(),
      usdzModelUrl: customUrlInput.trim(),
      description: "Modelo 3D cargado directamente desde enlace externo.",
      dimensions: "Personalizado",
    };
    setSelectedModel(customItem);
    loadModel(customItem);
  };

  // Resetear vista de cámara
  const handleResetCamera = () => {
    if (controlsRef.current && cameraRef.current) {
      cameraRef.current.position.set(0, 1.2, 4.2);
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }
  };

  // Disparar AR Nativo
  const handleLaunchNativeAR = () => {
    if (deviceType === "ios") {
      const absoluteUsdz = selectedModel.usdzModelUrl.startsWith("http")
        ? selectedModel.usdzModelUrl
        : `${window.location.origin}${selectedModel.usdzModelUrl}`;
      const anchor = document.createElement("a");
      anchor.setAttribute("rel", "ar");
      anchor.appendChild(document.createElement("img"));
      anchor.setAttribute("href", absoluteUsdz);
      anchor.click();
    } else if (deviceType === "android") {
      const absoluteGlb = selectedModel.glbModelUrl.startsWith("http")
        ? selectedModel.glbModelUrl
        : `${window.location.origin}${selectedModel.glbModelUrl}`;
      const sceneViewerUrl = `intent://arvr.google.com/scene-viewer/1.0?file=${encodeURIComponent(
        absoluteGlb
      )}&mode=ar_preferred&title=${encodeURIComponent(
        selectedModel.title
      )}&resizable=true#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;end;`;
      window.location.href = sceneViewerUrl;
    } else {
      setIsLiveCameraOpen(true);
    }
  };

  return (
    <Box
      position="relative"
      w="100%"
      h={isFullScreen ? "100vh" : { base: "560px", md: "680px" }}
      borderRadius={isFullScreen ? "0" : "3xl"}
      overflow="hidden"
      border="1px solid"
      borderColor="border.glass"
      boxShadow="0 25px 60px rgba(0,0,0,0.5)"
      bg="#0f172a"
      display="flex"
      flexDirection="column"
    >
      {/* 3D CANVAS VIEWPORT */}
      <Box ref={mountRef} w="100%" h="100%" position="relative" cursor="grab" />

      {/* OVERLAY SUPERIOR: TÍTULO Y BADGES HUD */}
      <Box
        position="absolute"
        top="4"
        left="4"
        right="4"
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        pointerEvents="none"
        zIndex={10}
      >
        <VStack align="start" gap="1" bg="blackAlpha.700" backdropFilter="blur(16px)" p="3" borderRadius="2xl" border="1px solid rgba(255,255,255,0.15)">
          <HStack gap="2">
            <Badge colorPalette="blue" variant="solid" px="2.5" py="0.5" borderRadius="full" fontSize="xs">
              <Sparkles size={12} style={{ marginRight: 4 }} /> A-Frame Studio Model Viewer
            </Badge>
            <Badge colorPalette="green" variant="subtle" px="2" py="0.5" borderRadius="full" fontSize="2xs">
              Dimensiones: {selectedModel.dimensions}
            </Badge>
          </HStack>
          <Heading size="md" color="white">
            {selectedModel.title}
          </Heading>
          <Text fontSize="xs" color="gray.300" maxW="md">
            {selectedModel.description}
          </Text>
        </VStack>

        {/* CONTROLES DE VISTA RÁPIDA (Orbit, Fullscreen, Reset) */}
        <HStack gap="2" pointerEvents="auto">
          <IconButton
            aria-label="Play/Pausa Auto-rotación"
            variant="solid"
            colorPalette="gray"
            size="sm"
            borderRadius="full"
            onClick={() => setIsAutoRotating(!isAutoRotating)}
          >
            {isAutoRotating ? <Pause size={16} /> : <Play size={16} />}
          </IconButton>

          <IconButton
            aria-label="Reiniciar Cámara"
            variant="solid"
            colorPalette="gray"
            size="sm"
            borderRadius="full"
            onClick={handleResetCamera}
          >
            <RotateCcw size={16} />
          </IconButton>

          <IconButton
            aria-label="Pantalla Completa"
            variant="solid"
            colorPalette="gray"
            size="sm"
            borderRadius="full"
            onClick={() => setIsFullScreen(!isFullScreen)}
          >
            {isFullScreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </IconButton>
        </HStack>
      </Box>

      {/* INDICADOR DE CARGA */}
      {isLoadingModel && (
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          bg="blackAlpha.800"
          px="4"
          py="2"
          borderRadius="full"
          border="1px solid rgba(56, 189, 248, 0.5)"
          color="white"
          fontSize="xs"
          zIndex={15}
        >
          Cargando Modelo 3D...
        </Box>
      )}

      {/* OVERLAY INFERIOR: CARRUSEL DE MODELOS + BARRA URL A-FRAME */}
      <Box
        position="absolute"
        bottom="4"
        left="4"
        right="4"
        zIndex={10}
        display="flex"
        flexDirection="column"
        gap="3"
      >
        {/* BARRA DE ENLACE PERSONALIZADO (A-Frame modelviewer bar) */}
        <HStack
          bg="blackAlpha.700"
          backdropFilter="blur(16px)"
          p="2"
          borderRadius="2xl"
          border="1px solid rgba(255,255,255,0.15)"
          gap="2"
        >
          <Input
            size="sm"
            placeholder="Pegar URL de modelo .glTF o .glb (A-Frame Showcase)"
            value={customUrlInput}
            onChange={(e) => setCustomUrlInput(e.target.value)}
            bg="whiteAlpha.100"
            border="none"
            color="white"
            fontSize="xs"
            borderRadius="xl"
          />
          <Button
            size="sm"
            colorPalette="blue"
            onClick={handleOpenCustomUrl}
            display="flex"
            alignItems="center"
            gap="1.5"
            borderRadius="xl"
          >
            <FolderOpen size={15} /> ABRIR MODELO
          </Button>

          {/* BOTÓN AR / CÁMARA */}
          <Button
            size="sm"
            colorPalette="cyan"
            onClick={handleLaunchNativeAR}
            display="flex"
            alignItems="center"
            gap="1.5"
            borderRadius="xl"
            fontWeight="bold"
          >
            {deviceType === "desktop" ? (
              <>
                <Camera size={15} /> CÁMARA AR
              </>
            ) : (
              <>
                <Smartphone size={15} /> PROBAR EN AR
              </>
            )}
          </Button>
        </HStack>

        {/* BANDEJA TIPO CAROUSEL DE PRODUCTOS GYA */}
        <Box
          bg="blackAlpha.800"
          backdropFilter="blur(20px)"
          p="3"
          borderRadius="2xl"
          border="1px solid rgba(255,255,255,0.15)"
          overflowX="auto"
          display="flex"
          gap="2.5"
          css={{
            "&::-webkit-scrollbar": { height: "4px" },
            "&::-webkit-scrollbar-thumb": { background: "rgba(255,255,255,0.2)", borderRadius: "4px" },
          }}
        >
          {DEFAULT_STUDIO_MODELS.map((item) => {
            const isSelected = selectedModel.id === item.id;
            return (
              <Button
                key={item.id}
                size="sm"
                variant={isSelected ? "solid" : "outline"}
                colorPalette={isSelected ? "blue" : "gray"}
                borderRadius="xl"
                onClick={() => handleSelectModel(item)}
                flexShrink={0}
                display="flex"
                alignItems="center"
                gap="2"
                px="3"
                py="2"
              >
                {isSelected && <CheckCircle2 size={14} color="#38bdf8" />}
                <Text fontSize="xs" fontWeight={isSelected ? "bold" : "normal"}>
                  {item.title}
                </Text>
              </Button>
            );
          })}
        </Box>
      </Box>

      {/* MODAL DE CÁMARA WEBAR EN VIVO */}
      <WebARLiveCameraModal
        isOpen={isLiveCameraOpen}
        onClose={() => setIsLiveCameraOpen(false)}
        title={selectedModel.title}
        category={selectedModel.category}
        systemType={selectedModel.systemType}
        glbModelUrl={selectedModel.glbModelUrl}
        usdzModelUrl={selectedModel.usdzModelUrl}
      />
    </Box>
  );
};
