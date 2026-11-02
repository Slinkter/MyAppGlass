"use client";

import React from "react";
import { Box, Text, chakra } from "@chakra-ui/react";
import type { LocationProject } from "@/features/location/useLocationData";
import { TimelineProjectItem } from "./TimelineProjectItem";

export interface YearGroup {
  key: string;
  label: string;
  projects: LocationProject[];
}

interface TimelineYearGroupProps {
  group: YearGroup;
  selectedId: string | number | null;
  onSelect: (id: string | number) => void;
}

/** Grupo por año: encabezado pegajoso opaco y riel vertical con un punto por obra. */
export const TimelineYearGroup: React.FC<TimelineYearGroupProps> = ({ group, selectedId, onSelect }) => (
  <Box as="section" data-year-group={group.key} aria-labelledby={`timeline-year-${group.key}`}>
    <Box
      position="sticky"
      top="0"
      zIndex="1"
      bg="bg.surface"
      borderBottomWidth="1px"
      borderColor="border.default"
      px="2"
      py="2"
    >
      <Text as="h4" id={`timeline-year-${group.key}`} fontSize="sm" fontWeight="800" color="text.heading">
        {group.label}{" "}
        <chakra.span fontWeight="500" color="text.muted">
          · {group.projects.length} {group.projects.length === 1 ? "obra" : "obras"}
        </chakra.span>
      </Text>
    </Box>
    <chakra.ul position="relative" m="0" p="0" pt="2" pb="3" display="flex" flexDirection="column" gap="1">
      <Box aria-hidden="true" position="absolute" left="3" top="0" bottom="0" w="2px" bg="border.default" />
      {group.projects.map((project) => (
        <TimelineProjectItem
          key={project.id}
          project={project}
          selected={selectedId === project.id}
          onSelect={onSelect}
        />
      ))}
    </chakra.ul>
  </Box>
);
