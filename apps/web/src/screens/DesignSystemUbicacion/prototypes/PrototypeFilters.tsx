"use client";

import React, { useCallback, useMemo, useState } from "react";
import { Box, Grid, Heading, Skeleton, Stack, useMediaQuery } from "@chakra-ui/react";
import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import {
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
} from "@/components/ui/drawer";
import { TOUCH_MIN } from "@/shared/constants/layout";
import { companyData } from "@/shared/config/company-data";
import { useIsMobile } from "@/shared/hooks/ui/useIsMobile";
import LocationMapLazy from "../location/LocationMapLazy";
import { STORE_ID, useLocationData } from "../location/useLocationData";
import { FilterBar, type SortMode } from "./filters/FilterBar";
import { ProjectList } from "./filters/ProjectList";
import { ProjectDetail } from "./filters/ProjectDetail";

interface FilterState {
  year: number | null;
  district: string | null;
  sort: SortMode;
  selectedId: string | number | null;
}

const INITIAL: FilterState = { year: null, district: null, sort: "recent", selectedId: null };

/**
 * Prototipo D · Filtros y panel de detalle.
 * lg+: lista | mapa | detalle. md: lista | mapa + Drawer lateral. base: mapa, lista y panel inferior.
 */
export const PrototypeFilters: React.FC = () => {
  const { store, projects, years, districts, isLoading } = useLocationData();
  const isMobile = useIsMobile();
  const [isDesktop] = useMediaQuery(["(min-width: 62em)"]);
  const [state, setState] = useState<FilterState>(INITIAL);
  const { year, district, sort, selectedId } = state;

  const visible = useMemo(() => {
    const list = projects.filter(
      (p) => (year === null || p.yearNumber === year) && (district === null || p.address === district),
    );
    return sort === "near" ? [...list].sort((a, b) => a.distanceKm - b.distanceKm) : list;
  }, [projects, year, district, sort]);

  // Derivado: si la obra seleccionada ya no está en la lista filtrada, se considera sin selección.
  const effectiveId =
    selectedId === STORE_ID || visible.some((p) => p.id === selectedId) ? selectedId : null;
  const selectedProject = useMemo(
    () => (effectiveId === null || effectiveId === STORE_ID ? null : visible.find((p) => p.id === effectiveId) ?? null),
    [visible, effectiveId],
  );
  const hasFilters = year !== null || district !== null;

  const select = useCallback((id: string | number | null) => setState((s) => ({ ...s, selectedId: id })), []);
  const clear = useCallback(() => setState((s) => ({ ...s, year: null, district: null, selectedId: null })), []);
  const setYear = useCallback((y: number | null) => setState((s) => ({ ...s, year: y })), []);
  const setDistrict = useCallback((d: string | null) => setState((s) => ({ ...s, district: d })), []);
  const setSort = useCallback((o: SortMode) => setState((s) => ({ ...s, sort: o })), []);

  if (isLoading && projects.length === 0) {
    return (
      <Stack gap="3" aria-busy="true" aria-label="Cargando obras">
        <Skeleton h="120px" borderRadius="2xl" />
        <Skeleton h={{ base: "320px", lg: "560px" }} borderRadius="2xl" />
      </Stack>
    );
  }

  if (projects.length === 0) {
    return (
      <EmptyState
        icon={<SearchX size={32} aria-hidden="true" />}
        title="Aún no hay obras con ubicación"
        description="Cuando se publiquen obras con coordenadas, podrás explorarlas aquí."
      />
    );
  }

  const drawerOpen = !isDesktop && effectiveId !== null;

  return (
    <Box
      bg="bg.surface"
      border="1px solid"
      borderColor="border.default"
      borderRadius="2xl"
      overflow="hidden"
    >
      <FilterBar
        years={years}
        districts={districts}
        year={year}
        district={district}
        sort={sort}
        shown={visible.length}
        total={projects.length}
        hasFilters={hasFilters}
        onYear={setYear}
        onDistrict={setDistrict}
        onSort={setSort}
        onClear={clear}
      />

      <Grid
        h={{ base: "auto", md: "560px", lg: "640px" }}
        templateColumns={{ base: "1fr", md: "300px 1fr", lg: "340px 1fr 360px" }}
        templateRows={{ base: "320px auto", md: "minmax(0, 1fr)" }}
        templateAreas={{
          base: `"map" "list"`,
          md: `"list map"`,
          lg: `"list map detail"`,
        }}
      >
        <Box gridArea="map" position="relative" minH={0} h="full" bg="bg.subtle">
          <LocationMapLazy projects={visible} selectedId={effectiveId} onSelect={select} showStore showRecenter />
        </Box>

        <Box
          gridArea="list"
          minH={0}
          maxH={{ base: "380px", md: "none" }}
          overflowY="auto"
          overscrollBehavior="contain"
          position="relative"
          borderTop={{ base: "1px solid", md: "none" }}
          borderEnd={{ md: "1px solid" }}
          borderColor="border.default"
          tabIndex={0}
          aria-label="Lista de obras"
          role="region"
        >
          {visible.length === 0 ? (
            <EmptyState
              py="8"
              icon={<SearchX size={32} aria-hidden="true" />}
              title="Sin obras con estos filtros"
              description="Prueba con otro año o distrito."
            >
              <Button variant="outline" minH={TOUCH_MIN} onClick={clear} aria-label="Limpiar filtros">
                Limpiar filtros
              </Button>
            </EmptyState>
          ) : null}
          <ProjectList projects={visible} store={store} selectedId={effectiveId} onSelect={select} />
        </Box>

        {isDesktop && (
          <Box gridArea="detail" minH={0} overflowY="auto" p="5" borderStart="1px solid" borderColor="border.default" aria-label="Detalle" role="region">
            {selectedProject && (
              <Heading as="h3" fontSize="xl" color="text.heading" mb="4" lineHeight="short">
                {selectedProject.name}
              </Heading>
            )}
            <ProjectDetail key={selectedProject?.id ?? STORE_ID} project={selectedProject} store={store} hideTitle={!!selectedProject} />
          </Box>
        )}
      </Grid>

      {!isDesktop && (
        <DrawerRoot
          open={drawerOpen}
          onOpenChange={(e) => !e.open && select(null)}
          placement={isMobile ? "bottom" : "end"}
          lazyMount
          unmountOnExit
        >
          <DrawerContent
            bg="bg.surface"
            borderColor="border.default"
            maxH={isMobile ? "85dvh" : undefined}
            borderTopRadius={isMobile ? "2xl" : undefined}
          >
            <DrawerHeader pe="14">
              <DrawerTitle color="text.heading" fontSize="lg">
                {selectedProject ? selectedProject.name : companyData.razonSocial}
              </DrawerTitle>
            </DrawerHeader>
            <DrawerBody pb="6">
              <ProjectDetail key={selectedProject?.id ?? STORE_ID} project={selectedProject} store={store} hideTitle />
            </DrawerBody>
            <DrawerCloseTrigger />
          </DrawerContent>
        </DrawerRoot>
      )}
    </Box>
  );
};

export default PrototypeFilters;
