"use client";

import React, { useEffect, useRef } from "react";
import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { Store } from "lucide-react";
import { companyData } from "@/shared/config/company-data";
import ResponsiveImage from "@shared/components/Image/ResponsiveImage";
import { ImageRevealSkeleton, useImageReveal } from "@shared/components/Image/ImageReveal";
import type { StoreLocation } from "@/shared/types/map";
import { STORE_ID, type LocationProject } from "@/features/location/useLocationData";

const rowProps = {
  as: "button",
  type: "button",
  display: "flex",
  alignItems: "center",
  gap: "3",
  w: "full",
  minH: "11",
  p: "2",
  textAlign: "left",
  borderRadius: "lg",
  border: "1px solid",
  transition: "background-color 0.2s ease, border-color 0.2s ease",
  _hover: { bg: "bg.subtle" },
  _focusVisible: { outline: "2px solid", outlineColor: "primary.500", outlineOffset: "-2px" },
} as const;

interface ProjectListProps {
  projects: LocationProject[];
  store: StoreLocation;
  selectedId: string | number | null;
  onSelect: (id: string | number) => void;
}

const Row: React.FC<{ project: LocationProject; selected: boolean; onSelect: (id: string | number) => void }> =
  React.memo(({ project, selected, onSelect }) => {
    const ref = useRef<HTMLButtonElement>(null);
    const { loaded, onLoad, reveal } = useImageReveal();

    // Si la selección viene del marcador, lleva la fila a la vista dentro del scroll de la lista sin mover la página.
    useEffect(() => {
      const btn = ref.current;
      if (!selected || !btn) return;
      const scroller = btn.closest<HTMLElement>('[role="region"]');
      if (!scroller) return;
      const rowTop = btn.offsetTop;
      const rowBottom = rowTop + btn.offsetHeight;
      let target = scroller.scrollTop;
      if (rowTop < scroller.scrollTop) target = rowTop;
      else if (rowBottom > scroller.scrollTop + scroller.clientHeight) target = rowBottom - scroller.clientHeight;
      if (target === scroller.scrollTop) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      scroller.scrollTo({ top: target, behavior: reduce ? "auto" : "smooth" });
    }, [selected]);

    return (
      <Box
        {...rowProps}
        ref={ref}
        aria-pressed={selected}
        aria-label={`${project.name}, ${project.address}, ${project.year}, a ${project.distanceKm} km de la sede`}
        bg={selected ? "bg.subtle" : "transparent"}
        borderColor={selected ? "primary.500" : "transparent"}
        onClick={() => onSelect(project.id)}
      >
        <Box position="relative" w="56px" h="56px" flexShrink={0} borderRadius="md" overflow="hidden" bg="bg.subtle" aria-hidden="true">
          <ImageRevealSkeleton loaded={loaded} />
          <Box position="absolute" inset="0" {...reveal}>
            {project.image && (
              <ResponsiveImage src={project.image} alt="" w="full" h="full" objectFit="cover" loading="lazy" onLoad={onLoad} />
            )}
          </Box>
        </Box>
        <Box minW={0} flex="1">
          <Text fontSize="sm" fontWeight="semibold" color="text.heading" lineClamp={1}>{project.name}</Text>
          <Text fontSize="xs" color="text.muted" lineClamp={1}>{project.address} · {project.year}</Text>
          <Text fontSize="xs" color="text.accent" fontWeight="semibold">{project.distanceKm.toLocaleString("es-PE")} km de la sede</Text>
        </Box>
      </Box>
    );
  });
Row.displayName = "ProjectListRow";

/** Lista filtrada: la sede fija arriba y las obras debajo (cada fila es un botón de 44 px mínimo). */
export const ProjectList: React.FC<ProjectListProps> = ({ projects, store, selectedId, onSelect }) => (
  <VStack as="ul" listStyleType="none" align="stretch" gap="1" p="2" m="0">
    <li>
      <Box
        {...rowProps}
        aria-pressed={selectedId === STORE_ID}
        aria-label={`Sede ${companyData.razonSocial}`}
        bg={selectedId === STORE_ID ? "bg.subtle" : "transparent"}
        borderColor={selectedId === STORE_ID ? "primary.500" : "transparent"}
        onClick={() => onSelect(STORE_ID)}
      >
        <Flex w="56px" h="56px" flexShrink={0} borderRadius="md" bg="primary.500" color="white" align="center" justify="center">
          <Store size={24} style={{ flexShrink: 0 }} aria-hidden="true" />
        </Flex>
        <Box minW={0} flex="1">
          <Text fontSize="sm" fontWeight="semibold" color="text.heading" lineClamp={1}>{companyData.razonSocial}</Text>
          <Text fontSize="xs" color="text.muted" lineClamp={1}>{store.address}</Text>
        </Box>
      </Box>
    </li>
    {projects.map((p) => (
      <li key={p.id}>
        <Row project={p} selected={selectedId === p.id} onSelect={onSelect} />
      </li>
    ))}
  </VStack>
);
