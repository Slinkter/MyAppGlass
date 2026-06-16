"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { Box, VStack } from "@chakra-ui/react";
import { AnimatePresence, m } from "framer-motion";
import ItemGridLayout from "@/shared/components/Layout/ItemGridLayout";
import { useIsMobile } from "@/shared/hooks/ui/useIsMobile";
import MapLoader from "./map/MapLoader";
import { type MarkerType } from "./InteractiveMap";
import { DefaultInfoCard } from "./DefaultInfoCard";
import { ProjectDetailCard } from "./ProjectDetailCard";

// Carga perezosa del mapa para evitar errores de inicialización en producción y reducir bundle
const InteractiveMap = dynamic(() => import("./InteractiveMap"), {
  ssr: false,
  loading: () => <MapLoader />,
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
            bg="surface.card"
            borderRadius="card"
            borderWidth="1px"
            borderColor="border.default"
            boxShadow="lg"
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
            <AnimatePresence mode="wait">
              {!displaySelected ? (
                <m.div
                  key="default-card"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column"
                  }}
                >
                  <DefaultInfoCard />
                </m.div>
              ) : (
                <m.div
                  key={`project-card-${selectedMarker?.id}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column"
                  }}
                >
                  <ProjectDetailCard 
                    selectedMarker={selectedMarker!} 
                    isStore={isStore} 
                  />
                </m.div>
              )}
            </AnimatePresence>
          </VStack>
        </Box>
      </ItemGridLayout.Item>
    </ItemGridLayout>
  );
});

StoreSection.displayName = "StoreSection";

export default StoreSection;
