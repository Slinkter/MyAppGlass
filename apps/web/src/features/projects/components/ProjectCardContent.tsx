"use client";
/**
 * @file ProjectCardContent.tsx
 * @description Tarjeta de proyecto: botón accesible (teclado y foco) sobre `MediaCard`.
 */

import React from "react";
import { Box, HStack, Text } from "@chakra-ui/react";
import { MapPin, ArrowRight } from "lucide-react";
import { MediaCard } from "@shared/components/Card/MediaCard";

interface ProjectCardContentProps {
  image?: string;
  residencial: string;
  address: string;
  year: string | number;
  onExplore: () => void;
  isLCP?: boolean;
  loading?: "lazy" | "eager";
  fetchPriority?: "auto" | "high" | "low";
}

/**
 * @component ProjectCardContent
 * @description Presentational component for the project card visual structure.
 * La raíz es un `role="button"`, así que el hover de la foto usa la clase `group`.
 */
const ProjectCardContent: React.FC<ProjectCardContentProps> = React.memo(
  ({ image = "", residencial, address, year, onExplore, isLCP, loading }) => {
    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onExplore();
        }
      },
      [onExplore],
    );

    return (
      <MediaCard
        image={image}
        imageAlt={`Proyecto ${residencial} - GYA Glass & Aluminum`}
        badge={
          <HStack gap="1.5" minW={0}>
            <Box as={MapPin} boxSize={3} color="gray.700" style={{ flexShrink: 0 }} />
            <Text
              fontSize="xs"
              fontWeight="semibold"
              color="gray.900"
              letterSpacing="0.12em"
              textTransform="uppercase"
              truncate
              minW={0}
            >
              {address} · {year}
            </Text>
          </HStack>
        }
        title={residencial}
        description="Obra Residencial / Comercial"
        actionIcon={ArrowRight}
        loading={loading || (isLCP ? "eager" : "lazy")}
        isLCP={isLCP}
        rootProps={{
          as: "div",
          role: "button",
          tabIndex: 0,
          "aria-label": `Ver detalles del proyecto ${residencial}`,
          cursor: "pointer",
          onClick: onExplore,
          onKeyDown: handleKeyDown,
          _focusVisible: { outline: "none", boxShadow: "0 0 0 3px var(--chakra-colors-primary-500)" },
        }}
      />
    );
  },
);

ProjectCardContent.displayName = "ProjectCardContent";

export default ProjectCardContent;
