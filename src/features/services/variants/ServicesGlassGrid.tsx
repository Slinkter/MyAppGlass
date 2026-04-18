"use client";
/**
 * @file ServicesGlassGrid.tsx
 * @description Option 2: Aura "Glass Grid" - Borderless cards and focus attenuation.
 */
import React, { useState } from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import ServiceCard from "../components/ServiceCard";
import { getServices } from "../services/serviceService";

/**
 * @description Glass grid layout for services
 */
export const ServicesGlassGrid: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const services = getServices();

  return (
    <Box py={10}>
      <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap={0} border="1px solid" borderColor="border.glass" borderRadius="3xl" overflow="hidden">
        {services.slice(0, 6).map((service) => (
          <Box 
            key={service.id}
            onMouseEnter={() => setHoveredId(service.id)}
            onMouseLeave={() => setHoveredId(null)}
            opacity={hoveredId && hoveredId !== service.id ? 0.4 : 1}
            transition="all 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
            border="1px solid"
            borderColor="border.glass"
          >
            <ServiceCard {...service} borderRadius="none" h="500px" />
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};
