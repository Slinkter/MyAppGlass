"use client";

import React from "react";
import { Box, HStack, Text, chakra } from "@chakra-ui/react";
import { Route } from "lucide-react";
import { TOUCH_MIN } from "@/shared/constants/layout";
import type { LocationProject } from "@/features/location/useLocationData";
import { Cover } from "@/features/location/immersive/Cover";

interface TimelineProjectItemProps {
  project: LocationProject;
  selected: boolean;
  onSelect: (id: string | number) => void;
}

/** Obra dentro de la línea de tiempo: punto en el riel, miniatura de 56px, nombre, distrito y distancia. */
export const TimelineProjectItem: React.FC<TimelineProjectItemProps> = React.memo(({ project, selected, onSelect }) => (
  <Box as="li" listStyleType="none" position="relative" pl="7" data-project-id={String(project.id)}>
    <Box
      aria-hidden="true"
      position="absolute"
      left="2.5"
      top="7"
      boxSize={selected ? "4" : "3"}
      ml={selected ? "-0.5" : "0"}
      mt={selected ? "-0.5" : "0"}
      borderRadius="full"
      borderWidth="2px"
      borderColor={selected ? "primary.500" : "border.default"}
      bg={selected ? "primary.500" : "bg.surface"}
      transition="background-color 0.2s ease, border-color 0.2s ease"
      _motionReduce={{ transition: "none" }}
    />
    <chakra.button
      type="button"
      display="flex"
      alignItems="center"
      gap="3"
      w="full"
      minW={0}
      minH={TOUCH_MIN}
      p="2"
      textAlign="left"
      cursor="pointer"
      borderRadius="xl"
      borderWidth="1px"
      borderColor={selected ? "primary.500" : "transparent"}
      bg={selected ? "bg.subtle" : "bg.surface"}
      transition="border-color 0.2s ease, background-color 0.2s ease"
      _motionReduce={{ transition: "none" }}
      _hover={{ bg: "bg.subtle" }}
      onClick={() => onSelect(project.id)}
      aria-current={selected ? "true" : undefined}
      aria-label={`Ver ${project.name} en el mapa`}
      _focusVisible={{ outline: "2px solid", outlineColor: "primary.500", outlineOffset: "2px" }}
    >
      <Box position="relative" overflow="hidden" flexShrink={0} w="56px" h="56px" borderRadius="lg" bg="bg.subtle" aria-hidden="true">
        <Cover src={project.image} alt="" />
      </Box>
      <Box flex="1" minW={0}>
        <Text fontSize="sm" fontWeight="800" color="text.heading" lineClamp={1}>
          {project.name}
        </Text>
        <Text fontSize="xs" color="text.muted" lineClamp={1}>
          {project.address}
        </Text>
        <HStack gap="1" color="text.accent" fontSize="xs" fontWeight="600" mt="0.5">
          <Box as={Route} boxSize={3} aria-hidden="true" style={{ flexShrink: 0 }} />
          <Text>{project.distanceKm.toLocaleString("es-PE")} km</Text>
        </HStack>
      </Box>
    </chakra.button>
  </Box>
));
TimelineProjectItem.displayName = "TimelineProjectItem";
