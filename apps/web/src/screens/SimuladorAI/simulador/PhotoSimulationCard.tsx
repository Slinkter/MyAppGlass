"use client";

import React from "react";
import { Box, Heading, Text, VStack, HStack, SimpleGrid, Badge } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { Sparkles, UploadCloud, Image as ImageIcon, RefreshCw, Layers } from "lucide-react";
import type { AISimulatorProduct } from "@/features/ai-simulator/data/aiProducts";

interface PhotoSimulationCardProps {
  selectedProduct: AISimulatorProduct;
  userImage: string | null;
  setUserImage: (value: string | null) => void;
  isGenerating: boolean;
  simulatedReady: boolean;
  setSimulatedReady: (value: boolean) => void;
  overlayPos: { x: number; y: number };
  setOverlayPos: (pos: { x: number; y: number }) => void;
  overlayScale: number;
  setOverlayScale: (scale: number) => void;
  overlayOpacity: number;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleGenerateSimulation: () => void;
}

export const PhotoSimulationCard: React.FC<PhotoSimulationCardProps> = ({
  selectedProduct,
  userImage,
  setUserImage,
  isGenerating,
  simulatedReady,
  setSimulatedReady,
  overlayPos,
  setOverlayPos,
  overlayScale,
  setOverlayScale,
  overlayOpacity,
  handleImageUpload,
  handleGenerateSimulation,
}) => {
  return (
    <Box
      bg="surface.card"
      p="6"
      borderRadius="2xl"
      border="1px solid"
      borderColor="border.glass"
      backdropFilter="blur(16px)"
    >
      <Heading size="md" mb="4" display="flex" alignItems="center" gap="2">
        <UploadCloud size={20} color="var(--chakra-colors-status-info)" /> 2. Sube la Foto de tu Espacio Real
      </Heading>

      {!userImage ? (
        <Box
          border="2px dashed"
          borderColor="whiteAlpha.300"
          borderRadius="xl"
          p="8"
          textAlign="center"
          position="relative"
          cursor="pointer"
          _hover={{ borderColor: "blue.400", bg: "whiteAlpha.50" }}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0,
              cursor: "pointer",
              width: "100%",
              height: "100%",
            }}
          />
          <Box display="inline-flex" p="4" bg="blue.500/10" color="blue.400" borderRadius="full" mb="3">
            <ImageIcon size={32} />
          </Box>
          <Text fontWeight="bold" fontSize="md">
            Haz clic aquí o arrastra la foto de tu sala/pared
          </Text>
          <Text fontSize="xs" color="text.muted" mt="1">
            Formatos soportados: JPG, PNG, WEBP (Directo desde tu celular o galería)
          </Text>
        </Box>
      ) : (
        <VStack align="stretch" gap="3">
          {/* CANVAS COMPUESTO: FOTO DEL CLIENTE + PRODUCTO FUSIONADO */}
          <Box
            position="relative"
            borderRadius="xl"
            overflow="hidden"
            border="2px solid"
            borderColor={simulatedReady ? "purple.400" : "whiteAlpha.200"}
            h="360px"
            bg="brand.ink"
          >
            {/* 1. Fondo: Foto real del cliente */}
            <img
              src={userImage}
              alt="Tu espacio real"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />

            {/* 2. Capa IA: Producto renderizado superpuesto sobre la foto */}
            {simulatedReady && (
              <Box
                position="absolute"
                top={`${overlayPos.y}%`}
                left={`${overlayPos.x}%`}
                transform="translate(-50%, -50%)"
                w={`${overlayScale}%`}
                pointerEvents="none"
                transition="all 0.1s ease"
                style={{ opacity: overlayOpacity / 100 }}
              >
                <img
                  src={selectedProduct.previewImage}
                  alt={selectedProduct.name}
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "8px",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
                    border: "1px solid rgba(255,255,255,0.3)",
                    filter: "drop-shadow(0px 10px 15px var(--chakra-colors-overlay-scrim))",
                  }}
                />
                <Badge
                  position="absolute"
                  top="-10px"
                  right="-10px"
                  colorPalette="purple"
                  size="xs"
                >
                  {selectedProduct.name}
                </Badge>
              </Box>
            )}

            {/* Botón flotante para cambiar foto */}
            <HStack position="absolute" top="3" right="3" gap="2">
              <Button
                size="xs"
                variant="subtle"
                colorPalette="gray"
                onClick={() => {
                  setUserImage(null);
                  setSimulatedReady(false);
                }}
              >
                <RefreshCw size={12} style={{ marginRight: 4 }} /> Cambiar Foto
              </Button>
            </HStack>
          </Box>

          {/* CONTROLES DE AJUSTE SI LA SIMULACIÓN ESTÁ LISTA */}
          {simulatedReady && (
            <Box bg="surface.card" p="4" borderRadius="xl" border="1px solid" borderColor="whiteAlpha.100">
              <Text fontSize="xs" fontWeight="bold" color="purple.300" mb="3" display="flex" alignItems="center" gap="1">
                <Layers size={14} /> Controles de Calibración sobre tu Foto:
              </Text>
              <SimpleGrid columns={{ base: 1, sm: 3 }} gap="4" fontSize="xs">
                <Box>
                  <Text color="text.muted" mb="1">Tamaño: {overlayScale}%</Text>
                  <input
                    type="range"
                    min="30"
                    max="100"
                    value={overlayScale}
                    onChange={(e) => setOverlayScale(Number(e.target.value))}
                    style={{ width: "100%" }}
                  />
                </Box>
                <Box>
                  <Text color="text.muted" mb="1">Posición Horizontal: {overlayPos.x}%</Text>
                  <input
                    type="range"
                    min="20"
                    max="80"
                    value={overlayPos.x}
                    onChange={(e) => setOverlayPos({ ...overlayPos, x: Number(e.target.value) })}
                    style={{ width: "100%" }}
                  />
                </Box>
                <Box>
                  <Text color="text.muted" mb="1">Posición Vertical: {overlayPos.y}%</Text>
                  <input
                    type="range"
                    min="20"
                    max="80"
                    value={overlayPos.y}
                    onChange={(e) => setOverlayPos({ ...overlayPos, y: Number(e.target.value) })}
                    style={{ width: "100%" }}
                  />
                </Box>
              </SimpleGrid>
            </Box>
          )}
        </VStack>
      )}

      <Button
        colorPalette="purple"
        size="lg"
        w="full"
        mt="5"
        onClick={handleGenerateSimulation}
        loading={isGenerating}
        display="flex"
        alignItems="center"
        gap="2"
      >
        <Sparkles size={20} /> Generar Simulación de Espacio con IA
      </Button>
    </Box>
  );
};
