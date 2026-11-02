"use client";

/**
 * Prototipo B · Mapa inmersivo: el mapa ocupa todo el escenario y el contenido flota encima.
 * Un único `selectedId` (obra, `STORE_ID` o null) sincroniza mapa, ficha y carrusel.
 */

import React, { useCallback, useMemo, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import LocationMapLazy from "./LocationMapLazy";
import { STORE_ID, useLocationData } from "./useLocationData";
import { StorePanel, ProjectDetail } from "./immersive/FloatingPanel";
import { ProjectCarousel } from "./immersive/ProjectCarousel";

export const ImmersiveLocationMap: React.FC = () => {
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
      h={{ base: "560px", md: "620px", lg: "680px" }}
      borderRadius={{ base: "2xl", lg: "3xl" }}
      borderWidth="1px"
      borderColor="border.default"
      bg="bg.subtle"
      boxShadow="sm"
    >
      <Box position="absolute" inset={0}>
        <LocationMapLazy projects={projects} selectedId={selectedId} onSelect={handleSelect} showStore showRecenter />
      </Box>

      {selectedProject ? (
        <ProjectDetail key={selectedProject.id} project={selectedProject} onClose={handleClose} />
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
        <Box
          position="absolute"
          left={{ base: "3", lg: "5" }}
          right={{ base: "3", lg: "5" }}
          bottom={{ base: "3", lg: "4" }}
          zIndex={2}
          bg="bg.surface/88"
          backdropFilter="blur(24px) saturate(1.4)"
          borderWidth="1px"
          borderColor="border.default"
          borderRadius="2xl"
          p="4"
          css={{
            WebkitBackdropFilter: "blur(24px) saturate(1.4)",
            "@media (prefers-reduced-transparency: reduce), (prefers-contrast: more)": {
              backdropFilter: "none",
              WebkitBackdropFilter: "none",
              background: "var(--chakra-colors-bg-surface)",
            },
          }}
        >
          <Text fontSize="sm" color="text.muted" role="status">
            Aún no hay obras con ubicación para mostrar.
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default ImmersiveLocationMap;
