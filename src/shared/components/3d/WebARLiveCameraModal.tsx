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
} from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import {
  Camera,
  X,
  RotateCw,
  Sparkles,
  Maximize2,
  Minimize2,
  Layers,
  Palette,
  CameraOff,
} from "lucide-react";
import * as THREE from "three";
import { companyData } from "@/shared/config/company-data";
import { WhatsAppIcon } from "@/shared/components/icons/WhatsAppIcon";

export interface WebARLiveCameraModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  category?: string;
  systemType?: string;
  initialSystemType?: string;
  glbModelUrl?: string;
  usdzModelUrl?: string;
}

const ALUMINUM_FINISHES = [
  { id: "negro", name: "Negro Mate", hex: "#1e293b", metalness: 0.85, roughness: 0.3 },
  { id: "natural", name: "Natural Anodizado", hex: "#cbd5e1", metalness: 0.95, roughness: 0.2 },
  { id: "blanco", name: "Blanco Electropintado", hex: "#f8fafc", metalness: 0.3, roughness: 0.4 },
  { id: "champagne", name: "Champagne / Bronce", hex: "#b45309", metalness: 0.9, roughness: 0.25 },
];

const GLASS_TINTS = [
  { id: "incoloro", name: "Incoloro Transparente", color: 0x93c5fd, transmission: 0.9, opacity: 0.45 },
  { id: "bronce", name: "Bronce Cálido", color: 0xd97706, transmission: 0.75, opacity: 0.6 },
  { id: "gris", name: "Gris Humo / Antelio", color: 0x475569, transmission: 0.7, opacity: 0.65 },
  { id: "satinado", name: "Satinado / Arenado", color: 0xe2e8f0, transmission: 0.4, opacity: 0.85 },
];

export const WebARLiveCameraModal: React.FC<WebARLiveCameraModalProps> = ({
  isOpen,
  onClose,
  title = "Mampara Corrediza Serie 25",
  category: _category,
  systemType,
  initialSystemType,
  glbModelUrl,
  usdzModelUrl,
}) => {
  const actualSystemType = systemType || initialSystemType || "mampara";
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [activeAluminum, setActiveAluminum] = useState(ALUMINUM_FINISHES[0]);
  const [activeGlass, setActiveGlass] = useState(GLASS_TINTS[0]);
  const [scale, setScale] = useState(1.0);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [snapshotUrl, setSnapshotUrl] = useState<string | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [activeTab, setActiveTab] = useState<"controles" | "acabados">("controles");

  // Three.js scene refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);
  const frameMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const glassMaterialRef = useRef<THREE.MeshPhysicalMaterial | null>(null);

  // 1. Inicializar cámara WebRTC trasera (facingMode: environment)
  const startCamera = useCallback(async () => {
    try {
      setCameraError(null);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
        audio: false,
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setHasCameraPermission(true);
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Permiso de cámara denegado";
      console.warn("Camera permission warning:", errorMsg);
      setHasCameraPermission(false);
      setCameraError("Para proyectar en AR sobre tu pared/suelo, permite el acceso a la cámara.");
    }
  }, []);

  // 2. Detener cámara y limpiar stream
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, []);

  // 3. Montar / Desmontar Three.js Canvas con soporte AR.js Overlay
  useEffect(() => {
    if (!isOpen) {
      stopCamera();
      setSnapshotUrl(null);
      return;
    }

    startCamera();

    const mount = canvasContainerRef.current;
    if (!mount) return;

    const width = mount.clientWidth || window.innerWidth;
    const height = mount.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0, 3.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    rendererRef.current = renderer;

    mount.innerHTML = "";
    mount.appendChild(renderer.domElement);

    // Iluminación ambiental y direccional realista
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 2.0);
    sunLight.position.set(3, 6, 4);
    scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.2);
    rimLight.position.set(-3, -2, 2);
    scene.add(rimLight);

    const group = new THREE.Group();
    groupRef.current = group;

    // Materiales arquitectónicos dinámicos
    const frameMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(activeAluminum.hex),
      metalness: activeAluminum.metalness,
      roughness: activeAluminum.roughness,
    });
    frameMaterialRef.current = frameMat;

    const innerMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(activeAluminum.hex),
      metalness: activeAluminum.metalness * 0.9,
      roughness: activeAluminum.roughness * 1.1,
    });

    const lockMat = new THREE.MeshStandardMaterial({
      color: 0xd4d4d8,
      metalness: 0.95,
      roughness: 0.15,
    });

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(activeGlass.color),
      transmission: activeGlass.transmission,
      opacity: activeGlass.opacity,
      transparent: true,
      roughness: 0.05,
      ior: 1.52,
    });
    glassMaterialRef.current = glassMat;

    const createFrame = (w: number, h: number, border: number, depth: number, mat: THREE.Material) => {
      const fGroup = new THREE.Group();
      const topGeo = new THREE.BoxGeometry(w, border, depth);
      const topMesh = new THREE.Mesh(topGeo, mat);
      topMesh.position.set(0, h / 2 - border / 2, 0);
      fGroup.add(topMesh);

      const botGeo = new THREE.BoxGeometry(w, border, depth);
      const botMesh = new THREE.Mesh(botGeo, mat);
      botMesh.position.set(0, -h / 2 + border / 2, 0);
      fGroup.add(botMesh);

      const leftGeo = new THREE.BoxGeometry(border, h - 2 * border, depth);
      const leftMesh = new THREE.Mesh(leftGeo, mat);
      leftMesh.position.set(-w / 2 + border / 2, 0, 0);
      fGroup.add(leftMesh);

      const rightGeo = new THREE.BoxGeometry(border, h - 2 * border, depth);
      const rightMesh = new THREE.Mesh(rightGeo, mat);
      rightMesh.position.set(w / 2 - border / 2, 0, 0);
      fGroup.add(rightMesh);

      return fGroup;
    };

    // Geometría del producto según sistema
    if (actualSystemType === "ventana") {
      const windowWidth = 2.8;
      const windowHeight = 1.4;
      const outerFrame = createFrame(windowWidth, windowHeight, 0.08, 0.12, frameMat);
      group.add(outerFrame);

      const sashW = 0.74;
      const sashH = 1.24;
      const gBox = new THREE.BoxGeometry(sashW - 0.08, sashH - 0.08, 0.012);

      // Hoja 1: Fija Izquierda
      const sash1 = createFrame(sashW, sashH, 0.05, 0.04, innerMat);
      sash1.position.set(-1.02, 0, -0.025);
      sash1.add(new THREE.Mesh(gBox, glassMat));
      group.add(sash1);

      // Hoja 2: Móvil Centro-Izquierda
      const sash2 = createFrame(sashW, sashH, 0.05, 0.04, innerMat);
      sash2.position.set(-0.35, 0, 0.025);
      sash2.add(new THREE.Mesh(gBox.clone(), glassMat));
      const lock2 = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.12, 0.03), lockMat);
      lock2.position.set(sashW / 2 - 0.03, 0, 0.025);
      sash2.add(lock2);
      group.add(sash2);

      // Hoja 3: Móvil Centro-Derecha
      const sash3 = createFrame(sashW, sashH, 0.05, 0.04, innerMat);
      sash3.position.set(0.35, 0, 0.025);
      sash3.add(new THREE.Mesh(gBox.clone(), glassMat));
      const lock3 = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.12, 0.03), lockMat);
      lock3.position.set(-sashW / 2 + 0.03, 0, 0.025);
      sash3.add(lock3);
      group.add(sash3);

      // Hoja 4: Fija Derecha
      const sash4 = createFrame(sashW, sashH, 0.05, 0.04, innerMat);
      sash4.position.set(1.02, 0, -0.025);
      sash4.add(new THREE.Mesh(gBox.clone(), glassMat));
      group.add(sash4);
    } else if (actualSystemType === "mampara") {
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
    } else if (actualSystemType === "ducha") {
      const glassMesh = new THREE.Mesh(new THREE.BoxGeometry(1.1, 2.0, 0.02), glassMat);
      group.add(glassMesh);
      const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 1.4), lockMat);
      bar.rotation.z = Math.PI / 2;
      bar.position.set(0, 1.05, 0);
      group.add(bar);
      const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.5), lockMat);
      handle.position.set(0.4, 0, 0.04);
      group.add(handle);
    } else if (actualSystemType === "baranda" || actualSystemType === "parapeto" || actualSystemType === "balcones") {
      const handrail = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 2.2), lockMat);
      handrail.rotation.z = Math.PI / 2;
      handrail.position.set(0, 0.5, 0);
      group.add(handrail);
      for (let x = -0.9; x <= 0.9; x += 0.9) {
        const post = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 1.0), lockMat);
        post.position.set(x, 0, 0);
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
      group.add(baseRoof);
      for (let x = -0.9; x <= 0.9; x += 0.45) {
        const beam = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.08, 2.2), frameMat);
        beam.position.set(x, 0, 0);
        beam.rotation.x = 0.3;
        group.add(beam);
      }
    }

    scene.add(group);

    // Controles táctiles y arrastre sobre el fondo de la cámara
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging || !groupRef.current) return;
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;

      groupRef.current.position.x += dx * 0.003;
      groupRef.current.position.y -= dy * 0.003;

      prevX = e.clientX;
      prevY = e.clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    // Resize Handler
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
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      domElement.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);

      // Memory cleanup
      group.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry?.dispose();
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
          else obj.material?.dispose();
        }
      });
      frameMat.dispose();
      innerMat.dispose();
      lockMat.dispose();
      glassMat.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      stopCamera();
    };
  }, [isOpen, actualSystemType, activeAluminum, activeGlass, startCamera, stopCamera]);

  // Actualizar rotación y escala
  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.scale.set(scale, scale, scale);
      groupRef.current.rotation.y = THREE.MathUtils.degToRad(rotationAngle);
    }
  }, [scale, rotationAngle]);

  // 4. Capturar instantánea (Snapshot compuesto: Cámara + 3D)
  const handleTakeSnapshot = () => {
    if (!videoRef.current || !rendererRef.current) return;

    const v = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = v.videoWidth || 1280;
    canvas.height = v.videoHeight || 720;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Dibujar feed de cámara
    ctx.drawImage(v, 0, 0, canvas.width, canvas.height);

    // Superponer renderizado 3D
    ctx.drawImage(rendererRef.current.domElement, 0, 0, canvas.width, canvas.height);

    // Agregar marca de agua profesional de GYA Company
    ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
    ctx.fillRect(20, canvas.height - 70, 360, 50);
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 16px sans-serif";
    ctx.fillText("GYA Company — Proyección AR 1:1", 35, canvas.height - 40);
    ctx.font = "12px sans-serif";
    ctx.fillStyle = "#38bdf8";
    ctx.fillText(title, 35, canvas.height - 24);

    const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
    setSnapshotUrl(dataUrl);
  };

  // 5. Enviar cotización por WhatsApp con la foto
  const handleSendWhatsAppQuote = () => {
    const text = `Hola GYA Company, estuve probando la Realidad Aumentada (AR) para *${title}* con acabado *${activeAluminum.name}* y cristal *${activeGlass.name}*. Quisiera una cotización formal para mi domicilio.`;
    const waUrl = `https://wa.me/${companyData.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(waUrl, "_blank");
  };

  // 6. Lanzar WebXR / Quick Look nativo si el usuario lo prefiere
  const handleLaunchNativeAR = () => {
    const ua = navigator.userAgent;
    if (/iPhone|iPad|iPod/i.test(ua) && usdzModelUrl) {
      const absoluteUsdz = usdzModelUrl.startsWith("http")
        ? usdzModelUrl
        : `${window.location.origin}${usdzModelUrl}`;
      const a = document.createElement("a");
      a.setAttribute("rel", "ar");
      a.appendChild(document.createElement("img"));
      a.setAttribute("href", absoluteUsdz);
      a.click();
    } else if (/Android/i.test(ua) && glbModelUrl) {
      const absoluteGlb = glbModelUrl.startsWith("http")
        ? glbModelUrl
        : `${window.location.origin}${glbModelUrl}`;
      const sceneViewerUrl = `intent://arvr.google.com/scene-viewer/1.0?file=${encodeURIComponent(
        absoluteGlb
      )}&mode=ar_preferred&title=${encodeURIComponent(
        title
      )}&resizable=true#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;end;`;
      window.location.href = sceneViewerUrl;
    }
  };

  if (!isOpen) return null;

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      w="100vw"
      h="100dvh"
      zIndex={9999}
      bg="black"
      display="flex"
      flexDirection="column"
      overflow="hidden"
      fontFamily="sans-serif"
    >
      {/* VIDEO CÁMARA TRASERA EN VIVO */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 1,
        }}
      />

      {/* CANVAS THREE.JS SUPERPUESTO (AR.js Pattern) */}
      <Box
        ref={canvasContainerRef}
        position="absolute"
        top="0"
        left="0"
        w="100%"
        h="100%"
        zIndex={2}
        cursor="grab"
        touchAction="none"
      />

      {/* RETÍCULA CENTRAL DE GUÍA AR */}
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        w="180px"
        h="180px"
        border="1px dashed rgba(56, 189, 248, 0.4)"
        borderRadius="2xl"
        pointerEvents="none"
        zIndex={3}
        opacity={0.6}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box w="8px" h="8px" bg="blue.400" borderRadius="full" />
      </Box>

      {/* BARRA SUPERIOR HUD (Glassmorphism) */}
      <Box
        position="absolute"
        top="4"
        left="4"
        right="4"
        zIndex={10}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="rgba(15, 23, 42, 0.75)"
        backdropFilter="blur(16px)"
        border="1px solid rgba(255, 255, 255, 0.15)"
        borderRadius="2xl"
        px="4"
        py="3"
        boxShadow="0 10px 30px rgba(0,0,0,0.5)"
      >
        <HStack gap="3">
          <Badge colorPalette="blue" variant="solid" px="3" py="1" borderRadius="full" fontSize="xs">
            <Sparkles size={13} style={{ marginRight: 4 }} /> WebAR Cámara en Vivo
          </Badge>
          <Heading size="xs" color="white" maxW={{ base: "140px", sm: "300px" }} truncate>
            {title}
          </Heading>
        </HStack>

        <HStack gap="2">
          <IconButton
            aria-label="Alternar Pantalla Completa"
            variant="ghost"
            color="white"
            size="sm"
            onClick={() => setIsFullScreen(!isFullScreen)}
          >
            {isFullScreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </IconButton>

          <IconButton
            aria-label="Cerrar Cámara AR"
            variant="ghost"
            color="white"
            size="sm"
            onClick={onClose}
          >
            <X size={20} />
          </IconButton>
        </HStack>
      </Box>

      {/* AVISO DE PERMISO DE CÁMARA SI FUE RECHAZADO */}
      {hasCameraPermission === false && (
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          zIndex={20}
          bg="rgba(15, 23, 42, 0.95)"
          backdropFilter="blur(20px)"
          p="6"
          borderRadius="2xl"
          border="1px solid rgba(239, 68, 68, 0.5)"
          maxW="md"
          textAlign="center"
        >
          <Box display="flex" justifyContent="center" mb="3">
            <CameraOff size={40} color="#f87171" />
          </Box>
          <Heading size="sm" color="white" mb="2">
            Acceso a Cámara Necesario
          </Heading>
          <Text fontSize="xs" color="gray.300" mb="4">
            {cameraError || "Por favor otorga permisos de cámara a tu navegador para proyectar este producto sobre tu pared o piso."}
          </Text>
          <Button colorPalette="blue" size="sm" onClick={startCamera}>
            Reintentar Acceso
          </Button>
        </Box>
      )}

      {/* MODAL DE FOTO CAPTURADA (Snapshot WhatsApp) */}
      {snapshotUrl && (
        <Box
          position="absolute"
          top="0"
          left="0"
          w="100%"
          h="100%"
          zIndex={30}
          bg="blackAlpha.900"
          backdropFilter="blur(24px)"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          p="4"
        >
          <Box maxW="sm" w="full" bg="gray.900" p="4" borderRadius="2xl" border="1px solid rgba(255,255,255,0.2)">
            <Heading size="sm" color="white" mb="2" textAlign="center">
              📸 Foto del Producto en tu Espacio
            </Heading>
            <Box borderRadius="xl" overflow="hidden" mb="4" border="1px solid rgba(255,255,255,0.1)">
              <img src={snapshotUrl} alt="Captura AR GYA" style={{ width: "100%", display: "block" }} />
            </Box>

            <VStack gap="2.5" w="full">
              <Button
                colorPalette="green"
                w="full"
                size="md"
                onClick={handleSendWhatsAppQuote}
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap="2"
              >
                <WhatsAppIcon size={18} fill="#ffffff" /> Cotizar Foto por WhatsApp
              </Button>

              <Button
                variant="outline"
                color="white"
                w="full"
                size="sm"
                onClick={() => setSnapshotUrl(null)}
              >
                Volver a la Cámara AR
              </Button>
            </VStack>
          </Box>
        </Box>
      )}

      {/* PANEL INFERIOR DE CONTROL Y ACABADOS (HUD Glassmorphism) */}
      <Box
        position="absolute"
        bottom="4"
        left="4"
        right="4"
        zIndex={10}
        bg="rgba(15, 23, 42, 0.85)"
        backdropFilter="blur(20px)"
        border="1px solid rgba(255, 255, 255, 0.15)"
        borderRadius="3xl"
        p="4"
        boxShadow="0 15px 40px rgba(0,0,0,0.6)"
      >
        {/* Pestañas de Navegación del HUD */}
        <HStack justify="center" gap="3" mb="3">
          <Button
            size="xs"
            borderRadius="full"
            variant={activeTab === "controles" ? "solid" : "ghost"}
            colorPalette={activeTab === "controles" ? "blue" : "gray"}
            onClick={() => setActiveTab("controles")}
          >
            <Layers size={13} style={{ marginRight: 4 }} /> Ajustes AR & Escala
          </Button>

          <Button
            size="xs"
            borderRadius="full"
            variant={activeTab === "acabados" ? "solid" : "ghost"}
            colorPalette={activeTab === "acabados" ? "blue" : "gray"}
            onClick={() => setActiveTab("acabados")}
          >
            <Palette size={13} style={{ marginRight: 4 }} /> Materiales & Cristales
          </Button>
        </HStack>

        {activeTab === "controles" && (
          <VStack gap="3" align="stretch">
            {/* Controles de Escala y Rotación */}
            <HStack justify="space-between" align="center">
              <HStack gap="2">
                <Text fontSize="xs" color="gray.300" fontWeight="600">
                  Escala ({Math.round(scale * 100)}%):
                </Text>
                <Button size="2xs" variant="outline" color="white" onClick={() => setScale(Math.max(0.4, scale - 0.15))}>
                  -
                </Button>
                <Button size="2xs" variant="outline" color="white" onClick={() => setScale(1.0)}>
                  1:1
                </Button>
                <Button size="2xs" variant="outline" color="white" onClick={() => setScale(Math.min(2.5, scale + 0.15))}>
                  +
                </Button>
              </HStack>

              <HStack gap="2">
                <Button
                  size="xs"
                  variant="outline"
                  color="white"
                  onClick={() => setRotationAngle((prev) => (prev + 45) % 360)}
                >
                  <RotateCw size={13} style={{ marginRight: 4 }} /> Girar 45°
                </Button>
              </HStack>
            </HStack>

            <Text fontSize="2xs" color="gray.400" textAlign="center">
              👆 Toca y arrastra en la pantalla para mover el producto sobre tu pared o piso real.
            </Text>
          </VStack>
        )}

        {activeTab === "acabados" && (
          <VStack gap="3" align="stretch">
            {/* Selector de Aluminio */}
            <Box>
              <Text fontSize="2xs" color="gray.400" mb="1.5" fontWeight="bold">
                COLOR DE ALUMINIO: {activeAluminum.name}
              </Text>
              <HStack gap="2" wrap="wrap">
                {ALUMINUM_FINISHES.map((finish) => (
                  <Button
                    key={finish.id}
                    size="2xs"
                    borderRadius="full"
                    variant={activeAluminum.id === finish.id ? "solid" : "outline"}
                    colorPalette={activeAluminum.id === finish.id ? "blue" : "gray"}
                    onClick={() => setActiveAluminum(finish)}
                  >
                    <Box w="10px" h="10px" borderRadius="full" bg={finish.hex} mr="1.5" border="1px solid white" />
                    {finish.name}
                  </Button>
                ))}
              </HStack>
            </Box>

            {/* Selector de Vidrio */}
            <Box>
              <Text fontSize="2xs" color="gray.400" mb="1.5" fontWeight="bold">
                TONALIDAD DE CRISTAL: {activeGlass.name}
              </Text>
              <HStack gap="2" wrap="wrap">
                {GLASS_TINTS.map((tint) => (
                  <Button
                    key={tint.id}
                    size="2xs"
                    borderRadius="full"
                    variant={activeGlass.id === tint.id ? "solid" : "outline"}
                    colorPalette={activeGlass.id === tint.id ? "blue" : "gray"}
                    onClick={() => setActiveGlass(tint)}
                  >
                    <Box
                      w="10px"
                      h="10px"
                      borderRadius="full"
                      bg={`#${tint.color.toString(16)}`}
                      mr="1.5"
                      border="1px solid white"
                    />
                    {tint.name}
                  </Button>
                ))}
              </HStack>
            </Box>
          </VStack>
        )}

        {/* BOTONES PRINCIPALES DE ACCIÓN */}
        <HStack gap="3" mt="3" pt="2" borderTop="1px solid rgba(255,255,255,0.1)">
          <Button
            colorPalette="blue"
            size="md"
            flex="1"
            onClick={handleTakeSnapshot}
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap="2"
            fontWeight="bold"
            boxShadow="0 4px 20px rgba(56, 189, 248, 0.4)"
          >
            <Camera size={18} /> Tomar Foto en mi Espacio
          </Button>

          <Button
            variant="outline"
            color="white"
            size="md"
            onClick={handleLaunchNativeAR}
            display="flex"
            alignItems="center"
            gap="1.5"
          >
            <Sparkles size={16} color="#38bdf8" /> Modo Nativo
          </Button>
        </HStack>
      </Box>
    </Box>
  );
};
