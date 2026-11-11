"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Box, Grid, HStack, Skeleton, Text, VStack } from "@chakra-ui/react";
import { ChevronDown, MapPinOff } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { EmptyState } from "@/shared/ui/empty-state";
import { TOUCH_MIN } from "@/shared/constants/layout";
import LocationMapLazy from "@/features/location/LocationMapLazy";
import { useLocationData } from "@/features/location/useLocationData";
import { TimelineYearChips } from "./timeline/TimelineYearChips";
import { TimelineYearGroup, type YearGroup } from "./timeline/TimelineYearGroup";

type SelectedId = string | number | null;

const LOADING_ROWS = [0, 1, 2, 3];
const NO_YEAR = "sin-anio";

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Prototipo F · Línea de tiempo por año.
 * Obras agrupadas por año (reciente a antiguo) con encabezados pegajosos; un único `selectedId`
 * gobierna lista y mapa. Móvil: mapa plegable arriba; tablet/escritorio: columna + mapa.
 */
export const PrototypeTimeline: React.FC = () => {
  const { projects, years, isLoading } = useLocationData();
  const [selectedId, setSelectedId] = useState<SelectedId>(null);
  const [mapOpen, setMapOpen] = useState(true);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const groups = useMemo<YearGroup[]>(() => {
    const result: YearGroup[] = years
      .map((y) => ({ key: String(y), label: String(y), projects: projects.filter((p) => p.yearNumber === y) }))
      .filter((g) => g.projects.length > 0);
    const undated = projects.filter((p) => p.yearNumber === null);
    if (undated.length > 0) result.push({ key: NO_YEAR, label: "Sin año", projects: undated });
    return result;
  }, [projects, years]);

  const scrollerTo = useCallback((top: number) => {
    scrollerRef.current?.scrollTo({ top, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  }, []);

  const handleJump = useCallback(
    (key: string) => {
      const scroller = scrollerRef.current;
      const group = scroller?.querySelector<HTMLElement>(`[data-year-group="${CSS.escape(key)}"]`);
      if (group) scrollerTo(group.offsetTop); // el scroller es position:relative
    },
    [scrollerTo],
  );

  // Al seleccionar (p. ej. desde un marcador) trae la obra a la vista dentro del contenedor.
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller || selectedId === null) return;
    const item = scroller.querySelector<HTMLElement>(`[data-project-id="${CSS.escape(String(selectedId))}"]`);
    const group = item?.closest<HTMLElement>("[data-year-group]");
    if (!item || !group) return;
    const header = group.firstElementChild as HTMLElement | null;
    const headerH = header?.offsetHeight ?? 0;
    const top = group.offsetTop + item.offsetTop;
    const bottom = top + item.offsetHeight;
    let target = scroller.scrollTop;
    if (top - headerH < scroller.scrollTop) target = top - headerH;
    else if (bottom > scroller.scrollTop + scroller.clientHeight) target = bottom - scroller.clientHeight;
    if (target !== scroller.scrollTop) scrollerTo(target);
  }, [selectedId, scrollerTo]);

  const count = projects.length;

  return (
    <Grid
      templateColumns={{ base: "1fr", md: "320px minmax(0, 1fr)", lg: "380px minmax(0, 1fr)" }}
      templateRows={{ base: "auto", md: "620px", lg: "680px" }}
      templateAreas={{ base: `"toggle" "map" "panel"`, md: `"panel map"` }}
      gap={{ base: "3", lg: "4" }}
    >
      <Button
        gridArea="toggle"
        display={{ base: "inline-flex", md: "none" }}
        variant="outline"
        minH={TOUCH_MIN}
        w="full"
        onClick={() => setMapOpen((open) => !open)}
        aria-expanded={mapOpen}
        aria-controls="timeline-map"
      >
        <Text>{mapOpen ? "Ocultar mapa" : "Mostrar mapa"}</Text>
        <ChevronDown
          size={16}
          aria-hidden="true"
          style={{ flexShrink: 0, transform: mapOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s ease" }}
        />
      </Button>

      <Box
        id="timeline-map"
        gridArea="map"
        display={{ base: mapOpen ? "block" : "none", md: "block" }}
        h={{ base: "260px", md: "full" }}
        borderRadius="2xl"
        overflow="hidden"
        borderWidth="1px"
        borderColor="border.default"
        bg="bg.subtle"
      >
        {/* `key`: al reabrir el mapa en móvil se vuelve a montar con el tamaño correcto (estaba en display: none). */}
        <LocationMapLazy
          key={mapOpen ? "open" : "closed"}
          projects={projects}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
      </Box>

      <VStack gridArea="panel" align="stretch" gap="3" minH={0} minW={0}>
        <HStack justify="space-between" px="1">
          <Text as="h3" fontSize="sm" fontWeight="700" color="text.heading">
            Obras por año
          </Text>
          {!isLoading && (
            <Text fontSize="xs" color="text.muted" aria-live="polite">
              {count} {count === 1 ? "obra entregada" : "obras entregadas"}
            </Text>
          )}
        </HStack>

        {!isLoading && groups.length > 1 && <TimelineYearChips groups={groups} onJump={handleJump} />}

        <Box
          ref={scrollerRef}
          flex="1"
          minH={0}
          maxH={{ base: "480px", md: "none" }}
          overflowY="auto"
          overscrollBehavior="contain"
          position="relative"
          bg="bg.surface"
          borderRadius="xl"
          borderWidth="1px"
          borderColor="border.default"
        >
          {isLoading ? (
            <VStack align="stretch" gap="2" p="3" aria-busy="true" aria-label="Cargando obras">
              {LOADING_ROWS.map((n) => (
                <Skeleton key={n} h="72px" borderRadius="xl" />
              ))}
            </VStack>
          ) : count === 0 ? (
            <EmptyState
              icon={<MapPinOff size={28} />}
              title="Aún no hay obras con ubicación"
              description="Pronto verás aquí los proyectos entregados."
            />
          ) : (
            groups.map((group) => (
              <TimelineYearGroup key={group.key} group={group} selectedId={selectedId} onSelect={setSelectedId} />
            ))
          )}
        </Box>
      </VStack>
    </Grid>
  );
};

export default PrototypeTimeline;
