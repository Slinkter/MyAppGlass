"use client";

import React from "react";
import { Box, HStack, Text, chakra } from "@chakra-ui/react";
import RouterLink from "next/link";
import { ArrowUpRight, Route } from "lucide-react";
import { Button } from "@/shared/ui/button";
import ResponsiveImage from "@shared/components/Image/ResponsiveImage";
import { ImageRevealSkeleton, useImageReveal } from "@shared/components/Image/ImageReveal";
import { TOUCH_MIN } from "@/shared/constants/layout";
import type { LocationProject } from "@/features/location/useLocationData";

interface SplitProjectRowProps {
  project: LocationProject;
  selected: boolean;
  onSelect: (id: string | number) => void;
}

/** Fila de obra: portada pequeña, datos y, si está seleccionada, acceso a "Ver obra". */
export const SplitProjectRow: React.FC<SplitProjectRowProps> = React.memo(({ project, selected, onSelect }) => {
  const { loaded, onLoad, reveal } = useImageReveal();
  const href = project.href ?? `/proyectos/ver?id=${project.id}`;
  const meta = [project.address, project.year].filter(Boolean).join(" · ");

  return (
    <Box
      as="li"
      listStyleType="none"
      data-project-id={String(project.id)}
      borderRadius="xl"
      borderWidth="1px"
      borderColor={selected ? "primary.500" : "border.default"}
      bg={selected ? "bg.subtle" : "bg.surface"}
      transition="border-color 0.2s ease, background-color 0.2s ease"
      _motionReduce={{ transition: "none" }}
      _hover={{ borderColor: "primary.500" }}
    >
      <chakra.button
        type="button"
        display="flex"
        alignItems="center"
        w="full"
        minH={TOUCH_MIN}
        p="2"
        gap="3"
        minW={0}
        textAlign="left"
        cursor="pointer"
        borderRadius="xl"
        onClick={() => onSelect(project.id)}
        aria-current={selected ? "true" : undefined}
        aria-label={`Ver ${project.name} en el mapa`}
        _focusVisible={{ outline: "2px solid", outlineColor: "primary.500", outlineOffset: "2px" }}
      >
        <Box
          position="relative"
          overflow="hidden"
          flexShrink={0}
          w={{ base: "64px", lg: "72px" }}
          h={{ base: "64px", lg: "72px" }}
          borderRadius="lg"
          bg="bg.subtle"
          aria-hidden="true"
        >
          <ImageRevealSkeleton loaded={loaded} />
          <Box position="absolute" inset="0" {...reveal}>
            {project.image && (
              <ResponsiveImage
                src={project.image}
                alt=""
                w="full"
                h="full"
                objectFit="cover"
                loading="lazy"
                sizes="72px"
                onLoad={onLoad}
              />
            )}
          </Box>
        </Box>
        <Box flex="1" minW={0}>
          <Text fontSize="sm" fontWeight="700" color="text.heading" lineClamp={1}>
            {project.name}
          </Text>
          {project.residencial && (
            <Text fontSize="xs" color="text.muted" lineClamp={1}>
              {project.residencial}
            </Text>
          )}
          <Text fontSize="xs" color="text.muted" lineClamp={1}>
            {meta}
          </Text>
          <HStack gap="1" color="text.accent" fontSize="xs" fontWeight="600" mt="0.5">
            <Box as={Route} boxSize={3} aria-hidden="true" style={{ flexShrink: 0 }} />
            <Text>{project.distanceKm.toLocaleString("es-PE")} km de la sede</Text>
          </HStack>
        </Box>
      </chakra.button>
      {selected && (
        <Box px="2" pb="2">
          <Button asChild variant="primary" w="full" minH={TOUCH_MIN}>
            <RouterLink href={href} aria-label={`Ver la obra ${project.name}`}>
              <Text>Ver obra</Text>
              <ArrowUpRight size={16} aria-hidden="true" style={{ flexShrink: 0 }} />
            </RouterLink>
          </Button>
        </Box>
      )}
    </Box>
  );
});
SplitProjectRow.displayName = "SplitProjectRow";
