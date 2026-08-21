"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Badge,
} from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { Sparkles, CheckCircle2, QrCode, Smartphone } from "lucide-react";

export interface WindowSystemARProps {
  name: string;
  category?: string;
  glbSrc: string;
  usdzSrc: string;
  poster?: string;
  description?: string;
}

export const WindowARViewer: React.FC<WindowSystemARProps> = ({
  name,
  category = "Ventanas & Estructuras",
  glbSrc,
  usdzSrc,
  poster,
  description = "Proyección 3D interactiva y cámara AR 1:1 a escala real.",
}) => {
  const [mounted, setMounted] = useState(false);
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    // Importación dinámica exclusiva en cliente para soporte de SSR
    import("@google/model-viewer").then(() => {
      setMounted(true);
    });
  }, []);

  const handleLaunchAR = () => {
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      window.location.href = usdzSrc;
    } else {
      const viewer = document.querySelector(`model-viewer[alt*="${name}"]`) as any;
      if (viewer && typeof viewer.activateAR === "function") {
        viewer.activateAR();
      } else {
        setShowQR(!showQR);
      }
    }
  };

  return (
    <Box
      bg="surface.card"
      borderRadius="2xl"
      p={{ base: "5", md: "6" }}
      border="1px solid"
      borderColor="border.glass"
      backdropFilter="blur(16px)"
      boxShadow="0 15px 35px rgba(0,0,0,0.2)"
      display="flex"
      flexDirection="column"
      gap="4"
    >
      <HStack justify="space-between" align="center">
        <VStack align="start" gap="0.5">
          <Badge colorPalette="blue" variant="subtle" px="2.5" py="0.5" borderRadius="full" fontSize="2xs">
            <Sparkles size={12} style={{ marginRight: 4 }} /> Realidad Aumentada Web (AR)
          </Badge>
          <Heading size="md" color="brand.primary" mt="1">
            {name}
          </Heading>
        </VStack>
        <Badge colorPalette="green" variant="subtle" px="2.5" py="0.5" borderRadius="full" fontSize="xs">
          Escala 1:1 Nativa
        </Badge>
      </HStack>

      <Text fontSize="xs" color="text.muted">
        {description}
      </Text>

      {/* CANVAS DEL MODEL-VIEWER */}
      <Box
        position="relative"
        h="340px"
        bg="radial-gradient(circle at 50% 50%, #1e293b 0%, #090d16 100%)"
        borderRadius="xl"
        border="1px solid"
        borderColor="whiteAlpha.200"
        overflow="hidden"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {mounted ? (
          <model-viewer
            src={glbSrc}
            ios-src={usdzSrc}
            poster={poster}
            alt={`Modelo 3D y AR de ${name}`}
            ar
            ar-modes="webxr scene-viewer quick-look"
            camera-controls
            auto-rotate
            shadow-intensity="1"
            style={{ width: "100%", height: "100%" }}
          >
            <button
              slot="ar-button"
              style={{
                position: "absolute",
                bottom: "16px",
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: "#2563eb",
                color: "#ffffff",
                padding: "8px 20px",
                borderRadius: "9999px",
                fontWeight: "600",
                fontSize: "13px",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 10px 25px rgba(37, 99, 235, 0.5)",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              👁️ Ver en tu espacio (AR 1:1)
            </button>
          </model-viewer>
        ) : (
          <Box color="blue.300" fontSize="sm">
            Inicializando Motor 3D & WebXR...
          </Box>
        )}
      </Box>

      {/* BOTONES DE ACCIÓN */}
      <HStack gap="3" w="full">
        <Button
          colorPalette="blue"
          size="md"
          flex="1"
          onClick={handleLaunchAR}
          display="flex"
          alignItems="center"
          gap="2"
        >
          <Smartphone size={16} /> Ver en tu Espacio (AR)
        </Button>
        <Button
          variant="outline"
          size="md"
          onClick={() => setShowQR(!showQR)}
          display="flex"
          alignItems="center"
          gap="2"
        >
          <QrCode size={16} /> QR Móvil
        </Button>
      </HStack>

      {showQR && (
        <Box
          p="3"
          bg="surface.card"
          borderRadius="xl"
          border="1px solid"
          borderColor="border.glass"
          textAlign="center"
        >
          <Text fontSize="2xs" color="text.muted" mb="1.5">
            Apunta con la cámara de tu iPhone / Android para abrir el modelo 3D en escala real:
          </Text>
          <Box
            display="inline-block"
            p="2"
            bg="white"
            borderRadius="md"
            color="black"
            fontSize="xs"
            fontWeight="bold"
          >
            [ CÓDIGO QR - {name.toUpperCase()} ]
          </Box>
        </Box>
      )}
    </Box>
  );
};
