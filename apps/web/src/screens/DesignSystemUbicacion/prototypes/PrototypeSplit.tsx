"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Box, Grid, chakra, HStack, Skeleton, Text, VStack } from "@chakra-ui/react";
import { MapPinOff } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import LocationMapLazy from "@/features/location/LocationMapLazy";
import { STORE_ID, useLocationData } from "@/features/location/useLocationData";
import { SplitProjectRow } from "./split/SplitProjectRow";
import { SplitStorePanel } from "./split/SplitStorePanel";

type SelectedId = string | number | null;

const LOADING_ROWS = [0, 1, 2, 3];

/**
 * Prototipo A · Mapa + lista sincronizada.
 * Un único `selectedId` gobierna mapa y lista. Escritorio: panel (sede + lista) a la izquierda;
 * tablet: panel angosto; móvil: mapa arriba y lista apilada debajo.
 */
export const PrototypeSplit: React.FC = () => {
  const { store, projects, isLoading } = useLocationData();
  const [selectedId, setSelectedId] = useState<SelectedId>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const handleSelectProject = useCallback((id: string | number) => setSelectedId(id), []);
  const handleSelectStore = useCallback(() => setSelectedId(STORE_ID), []);

  // Al seleccionar (p. ej. desde un marcador) lleva la fila a la vista dentro de la lista,
  // sin mover la página: se ajusta el scroll del contenedor, no `scrollIntoView` global.
  useEffect(() => {
    const list = listRef.current;
    if (!list || selectedId === null) return;
    const row = list.querySelector<HTMLElement>(`[data-project-id="${CSS.escape(String(selectedId))}"]`);
    if (!row) return;
    const scroller = list.parentElement;
    if (!scroller) return;
    const rowTop = row.offsetTop; // el scroller es position:relative, por lo que es su offsetParent
    const rowBottom = rowTop + row.offsetHeight;
    let target = scroller.scrollTop;
    if (rowTop < scroller.scrollTop) target = rowTop;
    else if (rowBottom > scroller.scrollTop + scroller.clientHeight) target = rowBottom - scroller.clientHeight;
    if (target === scroller.scrollTop) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    scroller.scrollTo({ top: target, behavior: reduce ? "auto" : "smooth" });
  }, [selectedId]);

  const count = projects.length;

  return (
    <Grid
      templateColumns={{ base: "1fr", md: "320px minmax(0, 1fr)", lg: "400px minmax(0, 1fr)" }}
      templateRows={{ base: "auto", md: "620px", lg: "680px" }}
      templateAreas={{
        base: `"map" "panel"`,
        md: `"panel map"`,
      }}
      gap={{ base: "3", lg: "4" }}
    >
      <Box
        gridArea="map"
        h={{ base: "320px", md: "full" }}
        borderRadius="2xl"
        overflow="hidden"
        borderWidth="1px"
        borderColor="border.default"
        bg="bg.subtle"
      >
        <LocationMapLazy projects={projects} selectedId={selectedId} onSelect={setSelectedId} />
      </Box>

      <VStack gridArea="panel" align="stretch" gap="3" minH={0} minW={0}>
        <SplitStorePanel store={store} selected={selectedId === STORE_ID} onSelect={handleSelectStore} />

        <HStack justify="space-between" px="1">
          <Text as="h3" fontSize="sm" fontWeight="700" color="text.heading">
            Obras entregadas
          </Text>
          {!isLoading && (
            <Text fontSize="xs" color="text.muted" aria-live="polite">
              {count} {count === 1 ? "obra entregada" : "obras entregadas"}
            </Text>
          )}
        </HStack>

        <Box
          flex="1"
          minH={0}
          maxH={{ base: "440px", md: "none" }}
          overflowY="auto"
          overscrollBehavior="contain"
          position="relative"
          pr="1"
        >
          {isLoading ? (
            <VStack align="stretch" gap="2" aria-busy="true" aria-label="Cargando obras">
              {LOADING_ROWS.map((n) => (
                <Skeleton key={n} h="84px" borderRadius="xl" />
              ))}
            </VStack>
          ) : count === 0 ? (
            <EmptyState
              icon={<MapPinOff size={28} />}
              title="Aún no hay obras con ubicación"
              description="Pronto verás aquí los proyectos entregados."
            />
          ) : (
            <chakra.ul
              ref={listRef}
              display="flex"
              flexDirection="column"
              gap="2"
              m="0"
              p="0"
              aria-label="Obras entregadas"
            >
              {projects.map((project) => (
                <SplitProjectRow
                  key={project.id}
                  project={project}
                  selected={selectedId === project.id}
                  onSelect={handleSelectProject}
                />
              ))}
            </chakra.ul>
          )}
        </Box>
      </VStack>
    </Grid>
  );
};

export default PrototypeSplit;
