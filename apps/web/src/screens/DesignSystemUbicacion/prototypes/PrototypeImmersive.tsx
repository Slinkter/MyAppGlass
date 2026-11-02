"use client";

/**
 * Prototipo B · Mapa inmersivo: el mapa ocupa todo el escenario y el contenido flota encima.
 * Un único `selectedId` (obra, `STORE_ID` o null) sincroniza mapa, ficha y carrusel.
 */

import React, { useCallback, useMemo, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import LocationMapLazy from "../location/LocationMapLazy";
import { STORE_ID, useLocationData } from "../location/useLocationData";
import { StorePanel, ProjectDetail } from "./immersive/FloatingPanel";
import { ProjectCarousel } from "./immersive/ProjectCarousel";

export const PrototypeImmersive: React.FC = () => {
  const { store, projects } = useLocationData();
  const [selectedId, setSelectedId] = useState<string | number | null>(null);

  const handleSelect = useCallback((id: string | number | null) => setSelectedId(id), []);
  const handleSelectStore = useCallback(() => setSelectedId(STORE_ID), []);
  const handleClose = useCallback(() => setSelectedId(null), []);

  const selectedProject = useMemo(
    () => (selectedId === null ? null : projects.find((p) => p.id === selectedId) ?? null),
    [projects, selectedId],
  );

  return (
    <Box
      position="relative"
      overflow="hidden"
      h={{ base: "600px", lg: "680px" }}
      borderRadius={{ base: "2xl", lg: "3xl" }}
      border="1px solid"
      borderColor="border.default"
      bg="bg.subtle"
    >
      <Box position="absolute" inset={0}>
        <LocationMapLazy projects={projects} selectedId={selectedId} onSelect={handleSelect} showStore showRecenter />
      </Box>

      {selectedProject ? (
        <ProjectDetail project={selectedProject} onClose={handleClose} />
      ) : (
        <StorePanel
          address={store.address}
          projectCount={projects.length}
          selected={selectedId === STORE_ID}
          onSelectStore={handleSelectStore}
        />
      )}

      {projects.length > 0 ? (
        <ProjectCarousel projects={projects} selectedId={selectedId} onSelect={handleSelect} />
      ) : (
        <Box position="absolute" left="3" right="3" bottom="3" zIndex={2} bg="bg.surface/90" backdropFilter="blur(14px)" border="1px solid" borderColor="border.default" borderRadius="xl" p="4">
          <Text fontSize="sm" color="text.muted" role="status">
            Aún no hay obras con ubicación para mostrar.
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default PrototypeImmersive;
