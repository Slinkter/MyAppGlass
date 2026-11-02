"use client";

import React, { useCallback, useId, useRef, useState } from "react";
import { Box, Flex, HStack, Skeleton, Text, VStack, chakra } from "@chakra-ui/react";
import { MapPinOff } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import LocationMapLazy from "../location/LocationMapLazy";
import { STORE_ID, useLocationData } from "../location/useLocationData";
import { SplitProjectRow } from "./split/SplitProjectRow";
import { SheetHandle } from "./sheet/SheetHandle";
import { SheetStoreCard } from "./sheet/SheetStoreCard";
import { SHEET_RATIO, nearestPosition, type SheetPosition } from "./sheet/sheetPositions";

type SelectedId = string | number | null;

const LOADING_ROWS = [0, 1, 2];

/**
 * Prototipo E · Hoja inferior.
 * Mapa a todo el contenedor. Móvil: hoja con 3 posiciones (25 / 50 / 85 %). md+: panel lateral izquierdo.
 */
export const PrototypeSheet: React.FC = () => {
  const { store, projects, isLoading } = useLocationData();
  const [selectedId, setSelectedId] = useState<SelectedId>(null);
  const [position, setPosition] = useState<SheetPosition>("mid");
  const [dragRatio, setDragRatio] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentId = useId();

  const count = projects.length;
  const ratio = dragRatio ?? SHEET_RATIO[position];

  // Seleccionar una obra (lista o marcador) centra el mapa y sube la hoja a media si está más baja.
  const handleSelectProject = useCallback((id: string | number) => {
    setSelectedId(id);
    setPosition((p) => (p === "min" ? "mid" : p));
  }, []);
  const handleMapSelect = useCallback(
    (id: string | number | null) => {
      if (id === null) setSelectedId(null);
      else handleSelectProject(id);
    },
    [handleSelectProject],
  );
  const handleSelectStore = useCallback(() => setSelectedId(STORE_ID), []);

  const dragBase = useRef(0);
  const handleDrag = (dy: number) => {
    const h = containerRef.current?.clientHeight ?? 0;
    if (!h) return;
    if (dragRatio === null) dragBase.current = SHEET_RATIO[position];
    const next = Math.min(SHEET_RATIO.full, Math.max(SHEET_RATIO.min, dragBase.current - dy / h));
    setDragRatio(next);
  };
  const handleDragEnd = () => {
    setPosition(nearestPosition(dragRatio ?? SHEET_RATIO[position]));
    setDragRatio(null);
  };

  const minimized = position === "min" && dragRatio === null;
  const summary = isLoading
    ? "Cargando obras…"
    : `Sede y ${count} ${count === 1 ? "obra entregada" : "obras entregadas"}`;

  return (
    <Box
      ref={containerRef}
      position="relative"
      overflow="hidden"
      h={{ base: "580px", md: "620px", lg: "680px" }}
      borderRadius="2xl"
      borderWidth="1px"
      borderColor="border.default"
      bg="bg.subtle"
    >
      <Box position="absolute" inset="0">
        <LocationMapLazy projects={projects} selectedId={selectedId} onSelect={handleMapSelect} />
      </Box>

      <Flex
        as="section"
        aria-label="Sede y obras entregadas"
        direction="column"
        position="absolute"
        zIndex={2}
        bg="bg.surface"
        borderColor="border.default"
        overflow="hidden"
        left="0"
        right={{ base: "0", md: "auto" }}
        bottom={{ base: "0", md: "3" }}
        top={{ base: "auto", md: "3" }}
        ml={{ base: "0", md: "3" }}
        w={{ base: "auto", md: "320px", lg: "380px" }}
        h={{ base: "var(--sheet-h)", md: "auto" }}
        borderTopWidth={{ base: "1px", md: "1px" }}
        borderWidth={{ md: "1px" }}
        borderTopRadius="2xl"
        borderBottomRadius={{ base: "0", md: "2xl" }}
        boxShadow="xl"
        transition="height 0.25s ease"
        _motionReduce={{ transition: "none" }}
        style={
          {
            "--sheet-h": `${(ratio * 100).toFixed(2)}%`,
            ...(dragRatio !== null ? { transition: "none" } : null),
          } as React.CSSProperties
        }
      >
        <SheetHandle
          position={position}
          controlsId={contentId}
          summary={summary}
          onChange={setPosition}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
        />

        <Box
          id={contentId}
          flex="1"
          minH={0}
          overflowY={minimized ? "hidden" : "auto"}
          overscrollBehavior="contain"
          px={{ base: "3", md: "4" }}
          pb={{ base: "4", md: "4" }}
          pt={{ base: "1", md: "4" }}
        >
          <VStack align="stretch" gap="3">
            <SheetStoreCard store={store} selected={selectedId === STORE_ID} onSelect={handleSelectStore} />

            <HStack justify="space-between" px="1">
              <Text as="h3" fontSize="sm" fontWeight="800" color="text.heading">
                Obras entregadas
              </Text>
              {!isLoading && (
                <Text fontSize="xs" color="text.muted" aria-live="polite">
                  {count} {count === 1 ? "obra" : "obras"}
                </Text>
              )}
            </HStack>

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
              <chakra.ul display="flex" flexDirection="column" gap="2" m="0" p="0" aria-label="Obras entregadas">
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
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
};

export default PrototypeSheet;
