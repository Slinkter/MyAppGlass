"use client";

/**
 * Prototipo B · Mapa inmersivo: el mapa ocupa todo el escenario y el contenido flota encima.
 * Un único `selectedId` (obra, `STORE_ID` o null) sincroniza mapa, ficha y carrusel.
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { Button } from "@/shared/ui/button";
import type { Project as FirestoreProject } from "@/shared/api/firebase/types";
import LocationMapLazy from "./LocationMapLazy";
import { createLookupMap } from "@/shared/utils/algorithm-utils";
import { STORE_ID, useLocationData } from "./useLocationData";
import { StorePanel, ProjectDetail } from "./immersive/FloatingPanel";
import { ProjectCarousel } from "./immersive/ProjectCarousel";

export interface ImmersiveLocationMapProps {
  initialProjects?: FirestoreProject[];
}

export const ImmersiveLocationMap: React.FC<ImmersiveLocationMapProps> = ({ initialProjects }) => {
  const { store, projects } = useLocationData(initialProjects);
  const [selectedId, setSelectedId] = useState<string | number | null>(null);
  const [shouldLoadMap, setShouldLoadMap] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (shouldLoadMap) return;
    const el = containerRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setShouldLoadMap(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldLoadMap(true);
          observer.disconnect();
        }
      },
      { rootMargin: "250px" },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [shouldLoadMap]);

  const handleSelect = useCallback((id: string | number | null) => {
    setShouldLoadMap(true);
    setSelectedId(id);
  }, []);

  const handleSelectStore = useCallback(() => {
    setShouldLoadMap(true);
    setSelectedId(STORE_ID);
  }, []);

  const handleClose = useCallback(() => setSelectedId(null), []);

  const projectMap = useMemo(() => createLookupMap(projects, (p) => p.id), [projects]);

  const selectedProject = useMemo(
    () => (selectedId === null ? null : (projectMap.get(selectedId) ?? null)),
    [projectMap, selectedId],
  );

  return (
    <Box
      ref={containerRef}
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
        {shouldLoadMap ? (
          <LocationMapLazy projects={projects} selectedId={selectedId} onSelect={handleSelect} showStore showRecenter />
        ) : (
          <Box w="full" h="full" bg="bg.subtle" display="flex" alignItems="center" justifyContent="center">
            <Button variant="outline" size="sm" minH="11" minW="11" px="4" onClick={() => setShouldLoadMap(true)}>
              Ver mapa interactivo
            </Button>
          </Box>
        )}
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
              background: "var(--chakra-colors-bg\\.surface)",
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
