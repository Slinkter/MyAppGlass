"use client";

import React from "react";
import { Box, Heading, HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import RouterLink from "next/link";
import { ArrowUpRight, MapPinned, Route } from "lucide-react";
import { Button } from "@/components/ui/button";
import ResponsiveImage from "@shared/components/Image/ResponsiveImage";
import { ImageRevealSkeleton, useImageReveal } from "@shared/components/Image/ImageReveal";
import { TOUCH_MIN } from "@/shared/constants/layout";
import type { LocationProject } from "../../location/useLocationData";

interface Props {
  project: LocationProject;
  onShowOnMap: (id: string | number) => void;
}

/** Tarjeta de obra entregada: portada 4:3 con revelado, datos y acción al mapa. */
export const SedeProjectCard: React.FC<Props> = React.memo(({ project, onShowOnMap }) => {
  const { loaded, onLoad, reveal } = useImageReveal();
  const meta = [project.address, project.year].filter(Boolean).join(" · ");
  const href = project.href ?? `/proyectos/ver?id=${project.id}`;

  return (
    <Box
      bg="bg.surface"
      border="1px solid"
      borderColor="border.default"
      borderRadius="2xl"
      overflow="hidden"
      boxShadow="sm"
      display="flex"
      flexDirection="column"
    >
      <Box position="relative" aspectRatio={4 / 3} overflow="hidden" bg="bg.subtle">
        <ImageRevealSkeleton loaded={loaded} />
        <Box position="absolute" inset={0} {...reveal}>
          <ResponsiveImage
            src={project.image}
            alt={`Obra ${project.name} en ${project.address}`}
            w="full"
            h="full"
            objectFit="cover"
            loading="lazy"
            onLoad={onLoad}
          />
        </Box>
      </Box>
      <VStack align="stretch" gap="3" p="4" flex="1" minW={0} {...reveal}>
        <VStack align="flex-start" gap="1" minW={0}>
          <Heading as="h4" fontSize="lg" color="text.heading" lineClamp={2}>
            {project.name}
          </Heading>
          <Text fontSize="sm" color="text.muted" lineClamp={1}>
            {meta}
          </Text>
          <HStack gap="1" color="text.accent" fontSize="xs" fontWeight="semibold">
            <Route size={14} style={{ flexShrink: 0 }} aria-hidden />
            <Text>A {project.distanceKm.toLocaleString("es-PE")} km de la sede</Text>
          </HStack>
        </VStack>
        <SimpleGrid columns={{ base: 1, sm: 2 }} gap="2" mt="auto">
          <Button
            variant="outline"
            minH={TOUCH_MIN}
            onClick={() => onShowOnMap(project.id)}
            aria-label={`Ver ${project.name} en el mapa`}
          >
            <MapPinned size={16} style={{ flexShrink: 0 }} aria-hidden />
            Ver en el mapa
          </Button>
          <Button asChild variant="aura" minH={TOUCH_MIN}>
            <RouterLink href={href} aria-label={`Ver la obra ${project.name}`}>
              Ver obra
              <ArrowUpRight size={16} style={{ flexShrink: 0 }} aria-hidden />
            </RouterLink>
          </Button>
        </SimpleGrid>
      </VStack>
    </Box>
  );
});
SedeProjectCard.displayName = "SedeProjectCard";
