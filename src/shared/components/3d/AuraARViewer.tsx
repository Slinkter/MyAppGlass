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

import { ThreeCanvas } from "./ThreeCanvas";
import { WebARLiveCameraModal } from "./WebARLiveCameraModal";

interface AuraARViewerProps {
  title?: string;
  category?: string;
  glbModelUrl?: string;
  usdzModelUrl?: string;
  posterUrl?: string;
}

export const AuraARViewer: React.FC<AuraARViewerProps> = ({
  title = "Mampara Corrediza Serie 25 (Vidrio Templado)",
  category = "Mamparas & Terrazas",
  glbModelUrl = "/models/mampara-serie25.glb",
  usdzModelUrl = "/models/mampara-serie25.glb",
  posterUrl: _posterUrl,
}) => {
  const [showLiveWebAR, setShowLiveWebAR] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const [deviceType, setDeviceType] = useState<"ios" | "android" | "desktop">("desktop");

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
            <Sparkles size={14} style={{ marginRight: 4 }} /> Realidad Aumentada Web 3D (WebXR)
          </Badge>
          <Badge colorPalette="green" variant="subtle" px="3" py="1" borderRadius="full">
            Escala Real 1:1
          </Badge>
          <Badge colorPalette="purple" variant="subtle" px="3" py="1" borderRadius="full">
            Android (ARCore) & iOS (Quick Look)
          </Badge>
        </HStack>
        <Heading size="xl" color="brand.primary">
          {title}
        </Heading>
        <Text fontSize="sm" color="text.muted">
          Categoría: {category} — Proyecta esta estructura directamente en tu pared o sala con la cámara de tu celular.
        </Text>
      </VStack>

      <SimpleGrid columns={{ base: 1, md: 2 }} gap="8" alignContent="center">
        {/* VISOR 3D INTERACTIVO CON THREE.JS (ROTACIÓN 360°) */}
        <Box
          position="relative"
          h="360px"
          bg="radial-gradient(circle at 50% 50%, #1e293b 0%, #090d16 100%)"
          borderRadius="xl"
          border="1px solid"
          borderColor="whiteAlpha.200"
          overflow="hidden"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <ThreeCanvas systemType={getSystemType()} height="360px" />
          
          <Box
            position="absolute"
            bottom="3"
            left="3"
            bg="blackAlpha.700"
            px="3"
            py="1"
            borderRadius="md"
            fontSize="xs"
            color="whiteAlpha.800"
            pointerEvents="none"
          >
            🖱️ Arrastra para girar en 360°
          </Box>
        </Box>

        {/* ACCIONES Y BOTÓN AR INTELIGENTE */}
        <VStack align="start" justify="center" gap="5">
          <VStack align="start" gap="2.5" fontSize="sm" color="text.muted">
            <HStack align="flex-start">
              <CheckCircle2 size={16} color="#38bdf8" style={{ marginTop: 2, flexShrink: 0 }} />
              <Text>Detección de piso y pared a escala real 1:1 en tu hogar o terraza.</Text>
            </HStack>
            <HStack align="flex-start">
              <CheckCircle2 size={16} color="#38bdf8" style={{ marginTop: 2, flexShrink: 0 }} />
              <Text>Vidrio templado reflectante y perfiles de aluminio negro y natural.</Text>
            </HStack>
            <HStack align="flex-start">
              <ShieldCheck size={16} color="#38bdf8" style={{ marginTop: 2, flexShrink: 0 }} />
              <Text>Sin instalar aplicaciones: funciona directamente en Chrome y Safari.</Text>
            </HStack>
          </VStack>

          <VStack gap="2.5" w="full">
            {/* BOTÓN PRINCIPAL: CÁMARA WEBAR EN VIVO EN TIEMPO REAL */}
            <Button
              colorPalette="blue"
              size="lg"
              w="full"
              onClick={() => setShowLiveWebAR(true)}
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap="2.5"
              fontWeight="bold"
              boxShadow="0 8px 24px rgba(37, 99, 235, 0.4)"
              _hover={{ transform: "translateY(-1px)", boxShadow: "0 12px 28px rgba(37, 99, 235, 0.5)" }}
            >
              <Camera size={20} /> Proyectar con Cámara WebAR en Vivo
            </Button>

            {/* BOTÓN SECUNDARIO: VISOR NATIVO (GOOGLE SCENE VIEWER / APPLE QUICK LOOK / QR) */}
            <Button
              variant="outline"
              size="md"
              w="full"
              onClick={handleLaunchAR}
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap="2"
              color="text.body"
              borderColor="border.default"
            >
              {deviceType === "desktop" ? (
                <>
                  <QrCode size={18} /> Ver Código QR para Celular
                </>
              ) : (
                <>
                  <Smartphone size={18} />
                  {deviceType === "android"
                    ? "Abrir Google Scene Viewer (ARCore)"
                    : "Abrir Apple Quick Look (USDZ)"}
                </>
              )}
            </Button>

            <Text fontSize="xs" color="text.muted" textAlign="center" w="full">
              ✨ Elige acabados de aluminio y cristales en vivo, toma una foto y cotiza por WhatsApp al instante.
            </Text>
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
        </VStack>
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

