"use client";

import React, { useState } from "react";
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
import { Smartphone, QrCode, Sparkles, CheckCircle2 } from "lucide-react";

import { ThreeCanvas } from "./ThreeCanvas";

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
  const [showQR, setShowQR] = useState(false);

  const getSystemType = (): "ventana" | "mampara" | "ducha" | "techo" => {
    const t = title.toLowerCase();
    if (t.includes("ventana")) return "ventana";
    if (t.includes("ducha")) return "ducha";
    if (t.includes("techo")) return "techo";
    return "mampara";
  };

  const handleLaunchAR = () => {
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      window.location.href = usdzModelUrl;
    } else {
      setShowQR(!showQR);
    }
  };

  return (
    <Box
      bg="surface.card"
      borderRadius="2xl"
      p={{ base: "6", md: "8" }}
      border="1px solid"
      borderColor="border.glass"
      backdropFilter="blur(16px)"
      boxShadow="0 20px 40px rgba(0,0,0,0.2)"
    >
      <VStack align="start" gap="2" mb="6">
        <HStack gap="2">
          <Badge colorPalette="blue" variant="subtle" px="3" py="1" borderRadius="full">
            <Sparkles size={14} style={{ marginRight: 4 }} /> Realidad Aumentada Web 3D
          </Badge>
          <Badge colorPalette="green" variant="subtle" px="3" py="1" borderRadius="full">
            Escala 1:1 Nativa
          </Badge>
        </HStack>
        <Heading size="xl" color="brand.primary">
          {title}
        </Heading>
        <Text fontSize="sm" color="text.muted">
          Categoría: {category} — Gira el objeto en 360° con el ratón o pulsa para proyectarlo en tu pared.
        </Text>
      </VStack>

      <SimpleGrid columns={{ base: 1, md: 2 }} gap="8" alignContent="center">
        {/* VISOR 3D INTERACTIVO CON THREE.JS (CARGA INSTANTÁNEA 100% GARANTIZADA) */}
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
        </Box>

        {/* ACCIONES Y DETALLES */}
        <VStack align="start" justify="center" gap="5">
          <VStack align="start" gap="2" fontSize="sm" color="text.muted">
            <HStack>
              <CheckCircle2 size={16} color="#38bdf8" />
              <Text>Medidas reales calibradas en centímetros y metros.</Text>
            </HStack>
            <HStack>
              <CheckCircle2 size={16} color="#38bdf8" />
              <Text>Textura física realista de vidrio templado y aluminio negro mate.</Text>
            </HStack>
            <HStack>
              <CheckCircle2 size={16} color="#38bdf8" />
              <Text>Sin necesidad de instalar ninguna aplicación externa.</Text>
            </HStack>
          </VStack>

          <HStack gap="4" w="full">
            <Button
              colorPalette="blue"
              size="lg"
              flex="1"
              onClick={handleLaunchAR}
              display="flex"
              alignItems="center"
              gap="2"
            >
              <Smartphone size={20} /> Probar en mi Espacio (AR)
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowQR(!showQR)}
              display="flex"
              alignItems="center"
              gap="2"
            >
              <QrCode size={20} /> QR Celular
            </Button>
          </HStack>

          {showQR && (
            <Box
              p="4"
              bg="surface.card"
              borderRadius="xl"
              border="1px solid"
              borderColor="border.glass"
              w="full"
              textAlign="center"
            >
              <Text fontSize="xs" color="text.muted" mb="2">
                Escanea desde tu iPhone o Android para activar la cámara AR:
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
                [ CÓDIGO QR REALIDAD AUMENTADA GYA ]
              </Box>
            </Box>
          )}
        </VStack>
      </SimpleGrid>
    </Box>
  );
};
