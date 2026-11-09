"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Box, Flex, Heading, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { ChevronDown, ChevronUp, MapPinOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { TOUCH_MIN } from "@/shared/constants/layout";
import { FilterPill } from "@/shared/components/ui/FilterPill";
import { useImagePrefetch } from "@shared/hooks/ui/useImagePrefetch";
import LocationMapLazy from "@/features/location/LocationMapLazy";
import { useLocationData } from "@/features/location/useLocationData";
import { SedeCard } from "./sede/SedeCard";
import { SedeProjectCard } from "./sede/SedeProjectCard";

const PAGE_SIZE = 6;

const Stat: React.FC<{ value: string; label: string }> = ({ value, label }) => (
  <VStack gap="0" p={{ base: "3", md: "5" }} bg="bg.subtle" borderRadius="2xl" minW={0} textAlign="center">
    <Text fontSize={{ base: "2xl", md: "4xl" }} fontWeight="700" color="text.accent" lineHeight="1.1">
      {value}
    </Text>
    <Text fontSize={{ base: "xs", md: "sm" }} color="text.muted">
      {label}
    </Text>
  </VStack>
);

/** Prototipo C · Sede primero: la empresa como protagonista y las obras como prueba social. */
export const PrototypeSedeFirst: React.FC = () => {
  const { projects, years, districts, isLoading } = useLocationData();
  const [year, setYear] = useState<number | null>(null);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [mapOpen, setMapOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | number | null>(null);
  const [scrollTick, setScrollTick] = useState(0);
  const mapRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(
    () => (year === null ? projects : projects.filter((p) => p.yearNumber === year)),
    [projects, year],
  );
  const shown = useMemo(() => filtered.slice(0, visible), [filtered, visible]);
  useImagePrefetch(useMemo(() => filtered.slice(visible, visible + PAGE_SIZE).map((p) => p.image), [filtered, visible]));

  const handleYear = useCallback((next: number | null) => {
    setYear(next);
    setVisible(PAGE_SIZE);
  }, []);

  const handleShowOnMap = useCallback((id: string | number) => {
    setSelectedId(id);
    setMapOpen(true);
    setScrollTick((t) => t + 1);
  }, []);

  // Tras abrir el mapa, desplaza hasta él (instantáneo si el usuario reduce el movimiento).
  useEffect(() => {
    if (scrollTick === 0) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const raf = window.requestAnimationFrame(() =>
      mapRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" }),
    );
    return () => window.cancelAnimationFrame(raf);
  }, [scrollTick]);

  const oldestYear = years.length > 0 ? years[years.length - 1] : null;

  return (
    <VStack align="stretch" gap={{ base: "8", md: "12" }} minW={0}>
      <SedeCard />

      {projects.length > 0 && (
        <SimpleGrid columns={3} gap={{ base: "2", md: "4" }} aria-label="Cifras de la empresa" role="group">
          <Stat value={String(projects.length)} label="Obras entregadas" />
          <Stat value={String(districts.length)} label="Distritos" />
          <Stat value={oldestYear ? `Desde ${oldestYear}` : "—"} label="En el mercado" />
        </SimpleGrid>
      )}

      <VStack align="stretch" gap="5">
        <VStack align="flex-start" gap="1">
          <Heading as="h3" fontSize={{ base: "xl", md: "3xl" }} color="text.heading">
            Obras que ya entregamos
          </Heading>
          <Text fontSize={{ base: "sm", md: "md" }} color="text.muted">
            Proyectos reales de vidrio y aluminio en Lima. Mira dónde están.
          </Text>
        </VStack>

        {years.length > 1 && (
          <Flex
            gap="2"
            role="group"
            aria-label="Filtrar obras por año"
            overflowX={{ base: "auto", md: "visible" }}
            flexWrap={{ base: "nowrap", md: "wrap" }}
            pb="1"
            css={{ scrollbarWidth: "none", "&::-webkit-scrollbar": { display: "none" } }}
          >
            <Box flexShrink={0}>
              <FilterPill label="Todas" isActive={year === null} onClick={() => handleYear(null)} />
            </Box>
            {years.map((y) => (
              <Box key={y} flexShrink={0}>
                <FilterPill label={String(y)} isActive={year === y} onClick={() => handleYear(y)} />
              </Box>
            ))}
          </Flex>
        )}

        {isLoading ? (
          <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap="5" aria-busy="true">
            {Array.from({ length: 3 }, (_, i) => (
              <Skeleton key={i} h="320px" borderRadius="2xl" />
            ))}
          </SimpleGrid>
        ) : projects.length === 0 ? (
          <EmptyState
            icon={<MapPinOff size={32} aria-hidden />}
            title="Aún no hay obras publicadas"
            description="Muy pronto mostraremos aquí nuestros proyectos entregados."
          />
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={<MapPinOff size={32} aria-hidden />}
            title="Sin obras en este año"
            description="Prueba con otro año o muestra todas las obras."
          >
            <Button variant="outline" minH={TOUCH_MIN} onClick={() => handleYear(null)}>
              Ver todas
            </Button>
          </EmptyState>
        ) : (
          <>
            <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap={{ base: "4", md: "5" }}>
              {shown.map((project) => (
                <SedeProjectCard key={project.id} project={project} onShowOnMap={handleShowOnMap} />
              ))}
            </SimpleGrid>
            {filtered.length > visible && (
              <Flex justify="center">
                <Button
                  variant="outline"
                  minH={TOUCH_MIN}
                  onClick={() => setVisible((v) => v + PAGE_SIZE)}
                  aria-label={`Ver más obras (${filtered.length - visible} restantes)`}
                >
                  Ver más
                </Button>
              </Flex>
            )}
          </>
        )}
      </VStack>

      {projects.length > 0 && (
        <VStack align="stretch" gap="4" ref={mapRef} scrollMarginTop="24">
          <Button
            variant="primary"
            minH={TOUCH_MIN}
            alignSelf={{ base: "stretch", md: "center" }}
            onClick={() => setMapOpen((o) => !o)}
            aria-expanded={mapOpen}
            aria-controls="sede-mapa-obras"
            aria-label={mapOpen ? "Ocultar el mapa de obras" : "Ver todas las obras en el mapa"}
          >
            {mapOpen ? <ChevronUp size={18} style={{ flexShrink: 0 }} aria-hidden /> : <ChevronDown size={18} style={{ flexShrink: 0 }} aria-hidden />}
            {mapOpen ? "Ocultar mapa" : "Ver todas las obras en el mapa"}
          </Button>
          <Box id="sede-mapa-obras" hidden={!mapOpen}>
            {mapOpen && (
              <Box
                h={{ base: "360px", lg: "520px" }}
                borderRadius="3xl"
                overflow="hidden"
                border="1px solid"
                borderColor="border.default"
                position="relative"
              >
                <LocationMapLazy projects={filtered} selectedId={selectedId} onSelect={setSelectedId} showStore />
              </Box>
            )}
          </Box>
        </VStack>
      )}
    </VStack>
  );
};

export default PrototypeSedeFirst;
