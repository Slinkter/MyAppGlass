"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { Box, Flex, VStack } from "@chakra-ui/react";
import ItemGridLayout from "@/shared/components/Layout/ItemGridLayout";
import { useIsMobile } from "@/shared/hooks/ui/useIsMobile";
import AuraSkeleton, { ServiceCardSkeleton } from "@/shared/components/aura/AuraSkeleton";
import { type MarkerType } from "./InteractiveMap";
import { DefaultInfoCard } from "./DefaultInfoCard";
import { ProjectDetailCard } from "./ProjectDetailCard";

// Carga perezosa del mapa para evitar errores de inicialización en producción y reducir bundle
const InteractiveMap = dynamic(() => import("./InteractiveMap"), {
  ssr: false,
  loading: () => (
    <Flex 
      align="center" 
      justify="center" 
      h={{ base: "400px", lg: "700px" }} 
      w="full" 
      bg="bg.section"
      borderRadius="inherit"
    >
       <VStack gap="8" w={{ base: "full", lg: "340px" }} p="8">
        <ServiceCardSkeleton />
        <ServiceCardSkeleton />
        <AuraSkeleton h="50px" w="full" borderRadius="full" />
      </VStack>
    </Flex>
  ),
});

/**
 * Componente StoreSection
 * Muestra la sección de la ubicación de la tienda con un mapa interactivo.
 * @component
 */
const StoreSection: React.FC = React.memo(() => {
  const [selectedMarker, setSelectedMarker] = useState<MarkerType | null>(null);
  const infoCardRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const handleMarkerToggle = useCallback((marker: MarkerType) => {
    if (isMobile) return; // Bloquear selección en móvil
    setSelectedMarker((prev) => (prev?.id === marker?.id ? null : marker));
  }, [isMobile]);

  // Autofocus/Scroll on mobile when marker is selected
  useEffect(() => {
    if (selectedMarker && infoCardRef.current && window.innerWidth < 992) {
      infoCardRef.current.scrollIntoView({ 
        behavior: "smooth", 
        block: "nearest", 
        inline: "nearest" 
      });
    }
  }, [selectedMarker]);

  const isStore = selectedMarker?.type === "store";
  const displaySelected = isMobile ? false : !!selectedMarker;

  return (
    <ItemGridLayout
      title="UBICACIÓN"
      subtitle="SEDE PRINCIPAL | PROYECTOS ENTREGADOS"
      seoTitle="Ubicaciones - GYA Company"
      seoDescription="Encuentra nuestra tienda principal en Lima y explora la ubicación de nuestros proyectos de vidriería y aluminio."
      seoCanonicalUrl="https://www.gyacompany.com/ubicaciones"
      columns={{ base: 1 }}
      gap="6"
      containerProps={{
        mt: 0,
        py: "14",
      }}
    >
      <ItemGridLayout.Item>
        <Box 
          w="full" 
          position="relative" 
          h={{ base: "auto", lg: "700px" }}
        >
          {/* MAPA */}
          <Box 
            w="full" 
            h={{ base: "400px", lg: "full" }}
            borderRadius={{ base: "2xl", md: "3xl" }}
            overflow="hidden"
            border="1px solid"
            borderColor="border.default"
            boxShadow="2xl"
          >
            <InteractiveMap 
              selectedMarker={selectedMarker} 
              onMarkerToggle={handleMarkerToggle} 
            />
          </Box>

          {/* FICHA INFORMATIVA - DINÁMICA EN DESKTOP */}
          <VStack 
            ref={infoCardRef}
            position={{ base: "relative", lg: "absolute" }}
            top={{ lg: "14" }}
            left={{ lg: "14" }}
            zIndex={10}
            gap={0} 
            align={{ base: "center", lg: "flex-start" }} 
            p={0}
            bg={{ base: "rgba(255, 255, 255, 0.88)", _dark: "rgba(18, 18, 21, 0.88)" }}
            backdropFilter="blur(24px)"
            borderRadius={{ base: "2xl", md: "3xl" }}
            border="1px solid"
            borderColor="border.glass"
            boxShadow="glass"
            css={{
              '@media (prefers-reduced-motion: reduce)': {
                '*': { transition: 'none !important', animation: 'none !important', transform: 'none !important' }
              }
            }}
            w={{ base: "full", lg: "340px" }}
            h={{ lg: "480px" }}
            mt={{ base: "14", lg: 0 }}
            overflow="hidden"
            display="flex"
            justifyContent="stretch"
          >
            {!displaySelected ? (
              <DefaultInfoCard />
            ) : (
              <ProjectDetailCard 
                selectedMarker={selectedMarker!} 
                isStore={isStore} 
              />
            )}
          </VStack>
        </Box>
      </ItemGridLayout.Item>
    </ItemGridLayout>
  );
});

StoreSection.displayName = "StoreSection";

export default StoreSection;
