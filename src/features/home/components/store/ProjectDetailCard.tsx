"use client";

import React, { useState } from "react";
import { Box, Flex, VStack, HStack, Text, Heading, Badge, IconButton } from "@chakra-ui/react";
import { MapPin, X, Calendar, Building2, ChevronLeft, ChevronRight } from "lucide-react";
import ResponsiveImage from "@shared/components/Image/ResponsiveImage";
import { type MarkerType, type MapProject } from "./InteractiveMap";

interface ProjectDetailCardProps {
  selectedMarker: MarkerType;
  isStore: boolean;
  onClose?: () => void;
}

/**
 * @component ProjectDetailCard
 * @description Muestra la información y foto del proyecto o sede seleccionada en el mapa con un diseño limpio y minimalista.
 */
export const ProjectDetailCard: React.FC<ProjectDetailCardProps> = React.memo(({
  selectedMarker,
  isStore,
  onClose
}) => {
  const rawPhotos = (selectedMarker as unknown as { photosObra?: { image: string }[] })?.photosObra || [];
  const galleryImages = [
    selectedMarker?.image,
    ...rawPhotos.map((p) => p.image)
  ].filter(Boolean) as string[];

  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const activeImage = galleryImages[currentImgIndex] || selectedMarker?.image;

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <VStack
      w="full"
      h="full"
      position="relative"
      overflow="hidden"
      animation="fadeIn 0.3s ease-out"
      justify="flex-end"
      bg="surface.card"
    >
      {/* Imagen del Proyecto */}
      <Box position="absolute" inset={0} zIndex={0} overflow="hidden">
        {activeImage && (
          <ResponsiveImage 
            src={activeImage} 
            alt={selectedMarker?.name || "Proyecto GYA"}
            w="100%" h="100%" objectFit="cover"
            loading="lazy"
          />
        )}
      </Box>

      {/* Degradado Suave Inferior */}
      <Box 
        position="absolute" 
        inset={0} 
        zIndex={1}
        background="linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.2) 60%, transparent 100%)" 
        pointerEvents="none"
      />

      {/* Botón de Cierre (X) */}
      {onClose && (
        <IconButton
          aria-label="Cerrar detalles"
          size="xs"
          onClick={onClose}
          position="absolute"
          top="3"
          right="3"
          zIndex={10}
          borderRadius="full"
          bg="blackAlpha.600"
          color="white"
          _hover={{ bg: "blackAlpha.800" }}
        >
          <Box as={X} boxSize={4} />
        </IconButton>
      )}



      {/* Navegación de fotos */}
      {galleryImages.length > 1 && (
        <Flex 
          position="absolute" 
          top="45%" 
          left={0} 
          right={0} 
          px={2} 
          justify="space-between" 
          zIndex={5} 
          pointerEvents="none"
        >
          <IconButton
            aria-label="Foto anterior"
            size="xs"
            onClick={handlePrevImage}
            pointerEvents="auto"
            borderRadius="full"
            bg="blackAlpha.600"
            color="white"
          >
            <Box as={ChevronLeft} boxSize={4} />
          </IconButton>
          <IconButton
            aria-label="Siguiente foto"
            size="xs"
            onClick={handleNextImage}
            pointerEvents="auto"
            borderRadius="full"
            bg="blackAlpha.600"
            color="white"
          >
            <Box as={ChevronRight} boxSize={4} />
          </IconButton>
        </Flex>
      )}

      {/* Información Inferior Limpia */}
      <VStack p="5" zIndex={2} w="full" align="flex-start" gap="1.5">
        <Heading 
          size="md" 
          color="white" 
          fontWeight="700"
          lineHeight="snug"
        >
          {(selectedMarker as unknown as { residencial?: string })?.residencial || selectedMarker?.name}
        </Heading>

        <HStack gap={1.5} color="whiteAlpha.900" fontSize="xs">
          <Box as={MapPin} boxSize={3.5} />
          <Text fontWeight="500">{selectedMarker?.address}</Text>
        </HStack>
      </VStack>
    </VStack>
  );
});

ProjectDetailCard.displayName = "ProjectDetailCard";



