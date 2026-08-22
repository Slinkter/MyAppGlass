"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Badge,
} from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { Smartphone, QrCode, Sparkles, CheckCircle2, ShieldCheck, Camera } from "lucide-react";

import { ThreeCanvas, AluminumFinish, GlassTint } from "./ThreeCanvas";
import { WebARLiveCameraModal } from "./WebARLiveCameraModal";
import { companyData } from "@/shared/config/company-data";

const ALUMINUM_OPTIONS: AluminumFinish[] = [
  { id: "blanco", name: "Blanco Electropintado", hex: "#f8fafc", metalness: 0.25, roughness: 0.35 },
  { id: "negro", name: "Negro Mate", hex: "#1e293b", metalness: 0.85, roughness: 0.3 },
  { id: "natural", name: "Natural Anodizado", hex: "#cbd5e1", metalness: 0.95, roughness: 0.2 },
  { id: "champagne", name: "Champagne / Bronce", hex: "#b45309", metalness: 0.9, roughness: 0.25 },
];

const GLASS_OPTIONS: GlassTint[] = [
  { id: "incoloro", name: "Incoloro Transparente", color: 0xebf4ff, transmission: 0.95, opacity: 0.3, roughness: 0.02 },
  { id: "bronce", name: "Bronce Cálido", color: 0xd97706, transmission: 0.75, opacity: 0.55, roughness: 0.05 },
  { id: "gris", name: "Gris Humo / Antelio", color: 0x475569, transmission: 0.7, opacity: 0.65, roughness: 0.05 },
  { id: "satinado", name: "Satinado / Arenado", color: 0xe2e8f0, transmission: 0.4, opacity: 0.85, roughness: 0.15 },
];

import { GalleryItem3DConfig } from "@/shared/types/gallery";

interface AuraARViewerProps {
  title?: string;
  category?: string;
  glbModelUrl?: string;
  usdzModelUrl?: string;
  posterUrl?: string;
  initialConfig3D?: GalleryItem3DConfig;
}

export const AuraARViewer: React.FC<AuraARViewerProps> = ({
  title = "Mampara Corrediza Serie 25 (Vidrio Templado)",
  category = "Mamparas & Terrazas",
  glbModelUrl = "/models/mampara-serie25.glb",
  usdzModelUrl = "/models/mampara-serie25.glb",
  posterUrl: _posterUrl,
  initialConfig3D,
}) => {
  const [showLiveWebAR, setShowLiveWebAR] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const [deviceType, setDeviceType] = useState<"ios" | "android" | "desktop">("desktop");

  // Estados interactivos para el Configurador 3D en vivo
  const [selectedVariant, setSelectedVariant] = useState<
    "corrediza" | "fija" | "proyectante" | "pivotante" | "piso-techo-pivot" | "celosias"
  >(initialConfig3D?.systemVariant || "corrediza");
  const [selectedEnvironment, setSelectedEnvironment] = useState<
    "sala" | "cuarto" | "oficina" | "terraza" | "estudio"
  >("sala");
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [numSashes, setNumSashes] = useState<2 | 4>(initialConfig3D?.numSashes || 2);
  const [customWidth, setCustomWidth] = useState<number>(2.0);
  const [customHeight, setCustomHeight] = useState<number>(1.4);
  const [selectedAluminum, setSelectedAluminum] = useState<AluminumFinish>(
    ALUMINUM_OPTIONS.find((a) => a.id === initialConfig3D?.aluminumId) || ALUMINUM_OPTIONS[0]
  );
  const [selectedGlass, setSelectedGlass] = useState<GlassTint>(
    GLASS_OPTIONS.find((g) => g.id === initialConfig3D?.glassId) || GLASS_OPTIONS[0]
  );

  // Sincronizar automáticamente cuando el usuario selecciona otra foto del catálogo
  useEffect(() => {
    if (initialConfig3D) {
      if (initialConfig3D.systemVariant) {
        setSelectedVariant(initialConfig3D.systemVariant);
      }
      if (initialConfig3D.numSashes) {
        setNumSashes(initialConfig3D.numSashes);
      }
      if (initialConfig3D.aluminumId) {
        const foundAl = ALUMINUM_OPTIONS.find((a) => a.id === initialConfig3D.aluminumId);
        if (foundAl) setSelectedAluminum(foundAl);
      }
      if (initialConfig3D.glassId) {
        const foundGl = GLASS_OPTIONS.find((g) => g.id === initialConfig3D.glassId);
        if (foundGl) setSelectedGlass(foundGl);
      }
    }
  }, [initialConfig3D]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
      const ua = navigator.userAgent;
      if (/iPhone|iPad|iPod/i.test(ua)) {
        setDeviceType("ios");
      } else if (/Android/i.test(ua)) {
        setDeviceType("android");
      } else {
        setDeviceType("desktop");
      }
    }
  }, []);

  const getSystemType = (): string => {
    const t = `${title} ${category}`.toLowerCase();
    if (t.includes("ventana")) return "ventana";
    if (t.includes("ducha")) return "ducha";
    if (t.includes("techo") || t.includes("cobertura") || t.includes("policarbonato")) return "techo";
    if (t.includes("parapeto")) return "parapeto";
    if (t.includes("baranda") || t.includes("escalera")) return "baranda";
    if (t.includes("balcon")) return "balcones";
    if (t.includes("puerta de vidrio") || t.includes("pvidrio") || t.includes("pivotante")) return "pvidrio";
    if (t.includes("puerta de aluminio") || t.includes("pserie") || t.includes("puerta serie")) return "pserie";
    if (t.includes("celosia") || t.includes("ventilacion")) return "celosias";
    return "mampara";
  };

  const currentSystem = getSystemType();
  const isSashCustomizable = currentSystem === "ventana" || currentSystem === "mampara";

  const handleLaunchAR = () => {
    if (typeof window === "undefined") return;

    if (deviceType === "ios") {
      // 🍏 Apple Quick Look Nativo para iPhone / iPad
      const absoluteUsdz = usdzModelUrl.startsWith("http")
        ? usdzModelUrl
        : `${window.location.origin}${usdzModelUrl}`;

      const anchor = document.createElement("a");
      anchor.setAttribute("rel", "ar");
      const img = document.createElement("img");
      anchor.appendChild(img);
      anchor.setAttribute("href", absoluteUsdz);
      anchor.click();
    } else if (deviceType === "android") {
      // 🤖 Android WebXR / Google Scene Viewer (ARCore 1:1 en Android)
      const absoluteGlb = glbModelUrl.startsWith("http")
        ? glbModelUrl
        : `${window.location.origin}${glbModelUrl}`;

      const sceneViewerUrl = `intent://arvr.google.com/scene-viewer/1.0?file=${encodeURIComponent(
        absoluteGlb
      )}&mode=ar_preferred&title=${encodeURIComponent(
        title
      )}&resizable=true#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;end;`;

      window.location.href = sceneViewerUrl;
    } else {
      // 💻 En Desktop: abrir modal QR para escanear con la cámara del teléfono
      setShowQR(!showQR);
    }
  };

  const qrImageUrl = currentUrl
    ? `https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=10&data=${encodeURIComponent(currentUrl)}`
    : "";

  // Fotografías de Ambientes Reales y temas de fondo
  const envBackgrounds = {
    sala: {
      bg: "linear-gradient(rgba(24, 18, 12, 0.45), rgba(24, 18, 12, 0.6)), url('/images/common-mainland.webp')",
      fallbackBg: "#2d241e",
      border: "rgba(217, 180, 130, 0.5)",
      shadow: "inset 0 0 40px rgba(0, 0, 0, 0.6)",
      badgeColor: "#ffffff",
      badgeBg: "rgba(45, 36, 30, 0.85)",
      label: "🛋️ Sala Residencial",
    },
    cuarto: {
      bg: "linear-gradient(rgba(28, 22, 18, 0.5), rgba(28, 22, 18, 0.65)), url('/images/clients-sectorhogar.webp')",
      fallbackBg: "#3a2e26",
      border: "rgba(180, 140, 110, 0.5)",
      shadow: "inset 0 0 40px rgba(0, 0, 0, 0.6)",
      badgeColor: "#ffffff",
      badgeBg: "rgba(58, 46, 38, 0.85)",
      label: "🛏️ Dormitorio",
    },
    oficina: {
      bg: "linear-gradient(rgba(15, 23, 42, 0.5), rgba(15, 23, 42, 0.65)), url('/images/clients-sectoroffices.webp')",
      fallbackBg: "#1e293b",
      border: "rgba(148, 163, 184, 0.5)",
      shadow: "inset 0 0 40px rgba(0, 0, 0, 0.6)",
      badgeColor: "#ffffff",
      badgeBg: "rgba(30, 41, 59, 0.85)",
      label: "🏢 Oficina / Estudio",
    },
    terraza: {
      bg: "linear-gradient(rgba(12, 45, 70, 0.35), rgba(12, 45, 70, 0.55)), url('/images/clients-building.webp')",
      fallbackBg: "#0c4a6e",
      border: "rgba(56, 189, 248, 0.4)",
      shadow: "inset 0 0 40px rgba(0, 0, 0, 0.5)",
      badgeColor: "#ffffff",
      badgeBg: "rgba(12, 74, 110, 0.85)",
      label: "🌿 Terraza / Exterior",
    },
    estudio: {
      bg: "radial-gradient(circle at 50% 35%, #2a2521 0%, #1c1815 60%, #120f0d 100%)",
      fallbackBg: "#1c1815",
      border: "rgba(217, 197, 172, 0.3)",
      shadow: "inset 0 0 30px rgba(0, 0, 0, 0.8)",
      badgeColor: "#ffffff",
      badgeBg: "rgba(35, 30, 26, 0.85)",
      label: "🎨 Estudio Arquitectónico",
    },
  };

  const currentEnv = envBackgrounds[selectedEnvironment];

  return (
    <Box
      bg="surface.card"
      borderRadius="2xl"
      p={{ base: "5", md: "8" }}
      border="1px solid"
      borderColor="border.glass"
      backdropFilter="blur(16px)"
      boxShadow="0 20px 40px rgba(0,0,0,0.2)"
    >
      <VStack align="start" gap="2" mb="6">
        <HStack gap="2" wrap="wrap">
          <Badge colorPalette="blue" variant="subtle" px="3" py="1" borderRadius="full">
            <Sparkles size={14} style={{ marginRight: 4 }} /> Realidad Aumentada & 3D Web
          </Badge>
          <Badge colorPalette="green" variant="subtle" px="3" py="1" borderRadius="full">
            Escala Real 1:1
          </Badge>
          <Badge colorPalette="amber" variant="subtle" px="3" py="1" borderRadius="full">
            Ambientes de Hogar & Oficina
          </Badge>
        </HStack>
        <Heading size="xl" color="brand.primary">
          {title}
        </Heading>
        <Text fontSize="sm" color="text.muted">
          Categoría: {category} — Personaliza el acabado y proyecta esta estructura en tu hogar.
        </Text>
      </VStack>

      <SimpleGrid columns={{ base: 1, lg: 12 }} gap="6" alignItems="stretch">
        {/* COLUMNA VISOR 3D CON FONDOS DE AMBIENTES REALES */}
        <Box
          gridColumn={{ base: "span 1", lg: "span 7" }}
          display="flex"
          flexDirection="column"
          gap="3"
        >
          <Box
            position="relative"
            h={{ base: "340px", sm: "380px", md: "400px" }}
            backgroundImage={currentEnv.bg}
            backgroundColor={currentEnv.fallbackBg}
            backgroundSize="cover"
            backgroundPosition="center"
            borderRadius="2xl"
            border="1px solid"
            borderColor={currentEnv.border}
            boxShadow={`${currentEnv.shadow}, 0 12px 28px rgba(0,0,0,0.25)`}
            overflow="hidden"
            display="flex"
            alignItems="center"
            justifyContent="center"
            transition="all 0.5s ease"
          >
            <ThreeCanvas
              systemType={currentSystem}
              systemVariant={selectedVariant}
              environment={selectedEnvironment}
              autoRotate={isAutoRotating}
              rotationSpeed={0.002}
              customWidth={customWidth}
              customHeight={customHeight}
              height="100%"
              numSashes={numSashes}
              aluminumFinish={selectedAluminum}
              glassTint={selectedGlass}
            />
            
            {/* CAPA 2.5D KAGE: Vano Arquitectónico y Vignette de Lente */}
            <Box
              position="absolute"
              inset="0"
              pointerEvents="none"
              borderRadius="2xl"
              boxShadow="inset 0 0 70px rgba(0, 0, 0, 0.5), inset 0 2px 4px rgba(255, 255, 255, 0.1)"
              border="1px solid rgba(255, 255, 255, 0.12)"
              background="radial-gradient(ellipse at center, transparent 65%, rgba(0, 0, 0, 0.4) 100%)"
            />

            {/* TELEMETRÍA DE INGENIERÍA EDITORIAL (ESTILO KAGE) */}
            <HStack
              position="absolute"
              top="3"
              left="3"
              gap="2"
              pointerEvents="none"
              display={{ base: "none", sm: "flex" }}
            >
              <Box
                bg="rgba(0, 0, 0, 0.65)"
                backdropFilter="blur(8px)"
                px="2.5"
                py="1"
                borderRadius="md"
                fontSize="2xs"
                fontFamily="mono"
                color="whiteAlpha.800"
                border="1px solid rgba(255, 255, 255, 0.15)"
              >
                📐 VANO: {customWidth.toFixed(2)}m × {customHeight.toFixed(2)}m
              </Box>
              <Box
                bg="rgba(0, 0, 0, 0.65)"
                backdropFilter="blur(8px)"
                px="2.5"
                py="1"
                borderRadius="md"
                fontSize="2xs"
                fontFamily="mono"
                color="whiteAlpha.800"
                border="1px solid rgba(255, 255, 255, 0.15)"
              >
                📏 {(customWidth * customHeight).toFixed(2)} m²
              </Box>
            </HStack>

            {/* BADGE DEL AMBIENTE ACTIVO */}
            <Box
              position="absolute"
              bottom="3"
              left="3"
              bg={currentEnv.badgeBg}
              backdropFilter="blur(10px)"
              px="3"
              py="1"
              borderRadius="full"
              fontSize="xs"
              fontWeight="medium"
              color={currentEnv.badgeColor}
              border="1px solid rgba(255, 255, 255, 0.25)"
              boxShadow="0 4px 10px rgba(0,0,0,0.3)"
              pointerEvents="none"
            >
              ✨ {currentEnv.label}
            </Box>

            {/* BOTÓN INTERACTIVO ACTIVAR / PAUSAR GIRO 360° */}
            <Button
              position="absolute"
              top="3"
              right="3"
              size="xs"
              variant="subtle"
              colorPalette={isAutoRotating ? "blue" : "gray"}
              bg="rgba(0, 0, 0, 0.65)"
              color="white"
              backdropFilter="blur(8px)"
              border="1px solid rgba(255, 255, 255, 0.2)"
              borderRadius="full"
              px="3"
              py="1.5"
              fontSize="2xs"
              fontWeight="semibold"
              onClick={() => setIsAutoRotating(!isAutoRotating)}
              _hover={{
                bg: "rgba(0, 0, 0, 0.85)",
                transform: "scale(1.05)",
              }}
              transition="all 0.2s ease"
            >
              {isAutoRotating ? "⏸️ Pausar Giro 360°" : "▶️ Activar Giro 360°"}
            </Button>
          </Box>

          {/* CONTROLES RÁPIDOS DE CONFIGURACIÓN 3D */}
          <Box
            p="3.5"
            bg="rgba(255, 255, 255, 0.03)"
            borderRadius="xl"
            border="1px solid"
            borderColor="border.default"
          >
            <VStack align="stretch" gap="3">
              {/* SELECTOR DE AMBIENTES (SALA, CUARTO, OFICINA, TERRAZA) */}
              <HStack justify="space-between" wrap="wrap" gap="2">
                <Text fontSize="xs" fontWeight="bold" color="text.muted">
                  Ambiente del Hogar / Espacio:
                </Text>
                <HStack gap="1.5" wrap="wrap">
                  {[
                    { id: "sala", label: "🛋️ Sala" },
                    { id: "cuarto", label: "🛏️ Dormitorio" },
                    { id: "oficina", label: "🏢 Oficina" },
                    { id: "terraza", label: "🌿 Terraza" },
                    { id: "estudio", label: "🎨 Estudio" },
                  ].map((env) => {
                    const isSelected = selectedEnvironment === env.id;
                    return (
                      <Button
                        key={env.id}
                        size="xs"
                        variant={isSelected ? "solid" : "outline"}
                        colorPalette={isSelected ? "orange" : "gray"}
                        onClick={() => setSelectedEnvironment(env.id as any)}
                        borderRadius="md"
                        fontSize="2xs"
                      >
                        {env.label}
                      </Button>
                    );
                  })}
                </HStack>
              </HStack>

              {/* SELECTOR DE TIPOLOGÍA DE VENTANA (ORDEN: CORREDIZO -> FIJO -> PROYECTANTE -> PIVOTANTE) */}
              {currentSystem === "ventana" && (
                <VStack align="stretch" gap="1.5">
                  <Text fontSize="xs" fontWeight="bold" color="text.muted">
                    Tipo de Ventana / Sistema de Apertura:
                  </Text>
                  <HStack gap="1.5" wrap="wrap">
                    {[
                      { id: "corrediza", label: "🪟 Corredizo" },
                      { id: "fija", label: "🛡️ Fijo" },
                      { id: "proyectante", label: "📐 Proyectante Vertical" },
                      { id: "pivotante", label: "🔄 Pivotante" },
                      { id: "piso-techo-pivot", label: "🏢 Piso a Techo (Mixta)" },
                      { id: "celosias", label: "🪜 Celosía (Louver)" },
                    ].map((t) => {
                      const isSelected = selectedVariant === t.id;
                      return (
                        <Button
                          key={t.id}
                          size="xs"
                          variant={isSelected ? "solid" : "outline"}
                          colorPalette={isSelected ? "blue" : "gray"}
                          onClick={() => {
                            setSelectedVariant(t.id as any);
                            if (t.id === "piso-techo-pivot") {
                              setCustomWidth(1.15);
                              setCustomHeight(2.45);
                            } else if (t.id === "fija") {
                              setCustomWidth(1.80);
                              setCustomHeight(1.40);
                            } else if (t.id === "proyectante") {
                              setCustomWidth(1.40);
                              setCustomHeight(1.20);
                            } else if (t.id === "pivotante") {
                              setCustomWidth(1.50);
                              setCustomHeight(1.50);
                            } else if (t.id === "corrediza") {
                              setCustomWidth(2.00);
                              setCustomHeight(1.40);
                            }
                          }}
                          borderRadius="md"
                          fontSize="2xs"
                        >
                          {t.label}
                        </Button>
                      );
                    })}
                  </HStack>
                </VStack>
              )}

              {/* CONTROL DE DIMENSIONES PERSONALIZADAS (ANCHO Y ALTO EN METROS) */}
              <VStack align="stretch" gap="2" p="2.5" bg="rgba(255, 255, 255, 0.02)" borderRadius="lg" border="1px dashed" borderColor="border.default">
                <HStack justify="space-between" wrap="wrap">
                  <Text fontSize="xs" fontWeight="bold" color="text.muted">
                    Dimensiones del Vano: <Text as="span" color="primary.500" _dark={{ color: "primary.300" }}>{customWidth.toFixed(2)}m Ancho × {customHeight.toFixed(2)}m Alto</Text>
                  </Text>
                  <HStack gap="1">
                    {[
                      { w: 1.20, h: 1.00, label: "1.2×1.0m" },
                      { w: 1.50, h: 1.20, label: "1.5×1.2m" },
                      { w: 2.00, h: 1.40, label: "2.0×1.4m" },
                      { w: 2.40, h: 2.20, label: "2.4×2.2m" },
                    ].map((pre, i) => (
                      <Button
                        key={i}
                        size="2xs"
                        variant="subtle"
                        onClick={() => {
                          setCustomWidth(pre.w);
                          setCustomHeight(pre.h);
                        }}
                        borderRadius="sm"
                        fontSize="2xs"
                      >
                        {pre.label}
                      </Button>
                    ))}
                  </HStack>
                </HStack>

                <SimpleGrid columns={{ base: 1, sm: 2 }} gap="3">
                  <Box>
                    <HStack justify="space-between" mb="1">
                      <Text fontSize="2xs" color="text.muted">Ancho (W):</Text>
                      <Text fontSize="2xs" fontWeight="bold" color="text.heading">{customWidth.toFixed(2)} m</Text>
                    </HStack>
                    <input
                      type="range"
                      min="0.80"
                      max="3.50"
                      step="0.05"
                      value={customWidth}
                      onChange={(e) => setCustomWidth(parseFloat(e.target.value))}
                      style={{ width: "100%", accentColor: "#3b82f6", cursor: "pointer" }}
                    />
                  </Box>

                  <Box>
                    <HStack justify="space-between" mb="1">
                      <Text fontSize="2xs" color="text.muted">Alto (H):</Text>
                      <Text fontSize="2xs" fontWeight="bold" color="text.heading">{customHeight.toFixed(2)} m</Text>
                    </HStack>
                    <input
                      type="range"
                      min="0.60"
                      max="2.60"
                      step="0.05"
                      value={customHeight}
                      onChange={(e) => setCustomHeight(parseFloat(e.target.value))}
                      style={{ width: "100%", accentColor: "#3b82f6", cursor: "pointer" }}
                    />
                  </Box>
                </SimpleGrid>
              </VStack>

              {/* SELECTOR DE HOJAS (SOLO PARA CORREDIZA) */}
              {currentSystem === "ventana" && selectedVariant === "corrediza" && (
                <HStack justify="space-between" wrap="wrap" gap="2">
                  <Text fontSize="xs" fontWeight="bold" color="text.muted">
                    Hojas Corredizas:
                  </Text>
                  <HStack gap="1.5">
                    <Button
                      size="xs"
                      variant={numSashes === 2 ? "solid" : "outline"}
                      colorPalette={numSashes === 2 ? "blue" : "gray"}
                      onClick={() => setNumSashes(2)}
                      borderRadius="md"
                    >
                      2 Hojas (OX)
                    </Button>
                    <Button
                      size="xs"
                      variant={numSashes === 4 ? "solid" : "outline"}
                      colorPalette={numSashes === 4 ? "blue" : "gray"}
                      onClick={() => setNumSashes(4)}
                      borderRadius="md"
                    >
                      4 Hojas (OXXO)
                    </Button>
                  </HStack>
                </HStack>
              )}

              {/* SELECTOR DE ALUMINIO */}
              <HStack justify="space-between" wrap="wrap" gap="2">
                <Text fontSize="xs" fontWeight="bold" color="text.muted">
                  Perfil de Aluminio:
                </Text>
                <HStack gap="1.5" wrap="wrap">
                  {ALUMINUM_OPTIONS.map((al) => {
                    const isSelected = selectedAluminum.id === al.id;
                    return (
                      <Button
                        key={al.id}
                        size="xs"
                        variant={isSelected ? "solid" : "outline"}
                        colorPalette={isSelected ? "blue" : "gray"}
                        onClick={() => setSelectedAluminum(al)}
                        borderRadius="md"
                        fontSize="2xs"
                      >
                        <Box
                          as="span"
                          w="2.5"
                          h="2.5"
                          borderRadius="full"
                          bg={al.hex}
                          border="1px solid rgba(0,0,0,0.2)"
                          mr="1"
                        />
                        {al.name.split(" ")[0]}
                      </Button>
                    );
                  })}
                </HStack>
              </HStack>

              {/* SELECTOR DE VIDRIO */}
              <HStack justify="space-between" wrap="wrap" gap="2">
                <Text fontSize="xs" fontWeight="bold" color="text.muted">
                  Cristal Templado:
                </Text>
                <HStack gap="1.5" wrap="wrap">
                  {GLASS_OPTIONS.map((gl) => {
                    const isSelected = selectedGlass.id === gl.id;
                    return (
                      <Button
                        key={gl.id}
                        size="xs"
                        variant={isSelected ? "solid" : "outline"}
                        colorPalette={isSelected ? "blue" : "gray"}
                        onClick={() => setSelectedGlass(gl)}
                        borderRadius="md"
                        fontSize="2xs"
                      >
                        {gl.name.split(" ")[0]}
                      </Button>
                    );
                  })}
                </HStack>
              </HStack>
            </VStack>
          </Box>
        </Box>

        {/* COLUMNA DERECHA: FICHA TÉCNICA DINÁMICA & COTIZADOR INTELIGENTE */}
        <Box
          gridColumn={{ base: "span 1", lg: "span 5" }}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          p="5"
          bg="rgba(255, 255, 255, 0.03)"
          backdropFilter="blur(16px)"
          borderRadius="2xl"
          border="1px solid"
          borderColor="border.glass"
          boxShadow="0 10px 30px rgba(0,0,0,0.15)"
          gap="4"
        >
          {/* ENCABEZADO DE LA FICHA TÉCNICA */}
          <Box>
            <HStack justify="space-between" mb="3">
              <Badge colorPalette="blue" variant="solid" px="2.5" py="1" borderRadius="md" fontSize="2xs" fontWeight="bold">
                📋 FICHA TÉCNICA EN VIVO
              </Badge>
              <Badge colorPalette="green" variant="subtle" px="2" py="0.5" borderRadius="full" fontSize="2xs">
                ● Listo para Cotizar
              </Badge>
            </HStack>

            {/* ESPECIFICACIONES DINÁMICAS EN TIEMPO REAL */}
            <VStack align="stretch" gap="2" fontSize="xs">
              <HStack justify="space-between" py="1.5" borderBottom="1px solid" borderColor="border.default">
                <Text color="text.muted" fontWeight="medium">Tipología:</Text>
                <Text color="text.heading" fontWeight="bold">
                  {selectedVariant === "piso-techo-pivot"
                    ? "Piso a Techo (Fijo + Pivotante)"
                    : selectedVariant === "corrediza"
                    ? `Corrediza (${numSashes} Hojas)`
                    : selectedVariant === "proyectante"
                    ? "Proyectante / Batiente"
                    : selectedVariant === "pivotante"
                    ? "Pivotante Eje Vertical"
                    : selectedVariant === "fija"
                    ? "Paño Fijo Hermético"
                    : "Celosía (Louver 7 Lamas)"}
                </Text>
              </HStack>

              <HStack justify="space-between" py="1.5" borderBottom="1px solid" borderColor="border.default">
                <Text color="text.muted" fontWeight="medium">Dimensiones:</Text>
                <Text color="text.heading" fontWeight="bold">
                  {customWidth.toFixed(2)}m × {customHeight.toFixed(2)}m ({(customWidth * customHeight).toFixed(2)} m²)
                </Text>
              </HStack>

              <HStack justify="space-between" py="1.5" borderBottom="1px solid" borderColor="border.default">
                <Text color="text.muted" fontWeight="medium">Perfilería Aluminio:</Text>
                <HStack gap="1.5">
                  <Box w="2.5" h="2.5" borderRadius="full" bg={selectedAluminum.hex} border="1px solid rgba(0,0,0,0.3)" />
                  <Text color="text.heading" fontWeight="bold">{selectedAluminum.name}</Text>
                </HStack>
              </HStack>

              <HStack justify="space-between" py="1.5" borderBottom="1px solid" borderColor="border.default">
                <Text color="text.muted" fontWeight="medium">Acristalamiento:</Text>
                <Text color="text.heading" fontWeight="bold">{selectedGlass.name}</Text>
              </HStack>

              <HStack justify="space-between" py="1.5" borderBottom="1px solid" borderColor="border.default">
                <Text color="text.muted" fontWeight="medium">Entorno de Prueba:</Text>
                <Text color="text.heading" fontWeight="bold">{currentEnv.label}</Text>
              </HStack>

              <HStack justify="space-between" py="1.5">
                <Text color="text.muted" fontWeight="medium">Escala / Detección:</Text>
                <Text color="primary.500" _dark={{ color: "primary.300" }} fontWeight="bold">
                  1:1 Real (WebAR Sin Apps)
                </Text>
              </HStack>
            </VStack>
          </Box>

          {/* BOTONES DE ACCIÓN */}
          <VStack gap="2.5" w="full">
            {/* BOTÓN PRINCIPAL: CÁMARA WEBAR EN VIVO */}
            <Button
              colorPalette="blue"
              size="md"
              w="full"
              onClick={() => setShowLiveWebAR(true)}
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap="2"
              fontWeight="bold"
              boxShadow="0 6px 20px rgba(37, 99, 235, 0.3)"
              _hover={{ transform: "translateY(-1px)", boxShadow: "0 10px 25px rgba(37, 99, 235, 0.45)" }}
            >
              <Camera size={18} /> Proyectar en tu Pared (WebAR)
            </Button>

            {/* BOTÓN DE COTIZACIÓN DIRECTA POR WHATSAPP CON ESPECIFICACIONES PRELLENADAS */}
            <a
              href={`https://wa.me/${companyData.whatsappNumber}?text=${encodeURIComponent(
                `Hola GYA Company, configuré esta ventana en su simulador 3D:\n• Tipología: ${selectedVariant}\n• Medidas: ${customWidth.toFixed(2)}m Ancho × ${customHeight.toFixed(2)}m Alto (${(customWidth * customHeight).toFixed(2)} m²)\n• Aluminio: ${selectedAluminum.name}\n• Cristal: ${selectedGlass.name}\n• Ambiente: ${currentEnv.label}\n¿Podrían brindarme una cotización a medida?`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ width: "100%", textDecoration: "none" }}
            >
              <Button
                variant="solid"
                bg="linear-gradient(135deg, #10b981 0%, #059669 100%)"
                color="white"
                size="md"
                w="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap="2"
                fontWeight="bold"
                boxShadow="0 6px 20px rgba(16, 185, 129, 0.3)"
                _hover={{ transform: "translateY(-1px)", boxShadow: "0 10px 25px rgba(16, 185, 129, 0.45)" }}
              >
                💬 Cotizar esta Configuración por WhatsApp
              </Button>
            </a>

            {/* BOTÓN SECUNDARIO: VISOR NATIVO / CÓDIGO QR */}
            <Button
              variant="ghost"
              size="xs"
              w="full"
              onClick={handleLaunchAR}
              color="text.muted"
              _hover={{ color: "text.heading" }}
            >
              {deviceType === "desktop" ? (
                <>
                  <QrCode size={14} style={{ marginRight: 6 }} /> Abrir Código QR para Escaneo Móvil
                </>
              ) : (
                <>
                  <Smartphone size={14} style={{ marginRight: 6 }} />
                  {deviceType === "android"
                    ? "Abrir Google Scene Viewer (ARCore)"
                    : "Abrir Apple Quick Look (USDZ)"}
                </>
              )}
            </Button>
          </VStack>

          {showQR && (
            <Box
              p="4"
              bg="surface.card"
              borderRadius="xl"
              border="1px solid"
              borderColor="border.glass"
              w="full"
              textAlign="center"
              animation="fadeIn 0.3s ease-out"
            >
              <Text fontSize="xs" fontWeight="bold" color="text.heading" mb="2">
                📱 Escanea con la cámara de tu iPhone o Android:
              </Text>
              
              {qrImageUrl && (
                <Box
                  display="inline-block"
                  p="3"
                  bg="white"
                  borderRadius="xl"
                  boxShadow="md"
                >
                  <img
                    src={qrImageUrl}
                    alt={`Código QR AR para ${title}`}
                    width={180}
                    height={180}
                    style={{ borderRadius: "8px", display: "block" }}
                  />
                </Box>
              )}

              <Text fontSize="2xs" color="text.muted" mt="2">
                Abre la cámara de tu teléfono para apuntar al código y activar la vista AR en tu sala.
              </Text>
            </Box>
          )}
        </Box>
      </SimpleGrid>

      {/* MODAL DE CÁMARA WEBAR EN VIVO CON THREE.JS Y FOTO WHATSAPP */}
      <WebARLiveCameraModal
        isOpen={showLiveWebAR}
        onClose={() => setShowLiveWebAR(false)}
        title={title}
        category={category}
        glbModelUrl={glbModelUrl}
        usdzModelUrl={usdzModelUrl}
        initialSystemType={getSystemType()}
      />
    </Box>
  );
};

