"use client";
/**
 * @file ProjectCardContent.tsx
 * @description Refactored project card content to match the unified design of ClientCard and ServiceCard.
 * Updated to Chakra v3 with semantic tokens and optimized Skeleton.
 */

import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { MapPin, ArrowRight } from "lucide-react";
import ResponsiveImage from "@shared/components/Image/ResponsiveImage";

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

const PROJECT_GRADIENT =
  "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)";

/**
 * @component ProjectCardContent
 * @description Presentational component for the project card visual structure.
 */
const ProjectCardContent: React.FC<ProjectCardContentProps> = React.memo(
  ({ image = "", residencial, address, year, onExplore, isLCP, loading }) => {
    return (
      <Box
        role="group"
        w="full"
        h={{ base: "260px", sm: "280px", md: "310px" }}
        borderRadius="3xl"
        overflow="hidden"
        position="relative"
        bg="black"
        boxShadow="sm"
        cursor="pointer"
        onClick={onExplore}
        transition="all 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
        _hover={{ 
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
          transform: "translateY(-6px)"
        }}
      >
        {/* Fotografía del Proyecto */}
        <Box position="absolute" inset={0} zIndex={0} overflow="hidden">
          <ResponsiveImage
            src={image}
            alt={`Proyecto ${residencial} - GYA Glass & Aluminum`}
            w="full"
            h="full"
            objectFit="cover"
            loading={loading || (isLCP ? "eager" : "lazy")}
            isLCP={isLCP}
            transition="transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)"
            _groupHover={{ transform: "scale(1.06)" }}
          />
        </Box>

        {/* Degradado Fino de Lectura */}
        <Box 
          position="absolute" 
          inset={0} 
          zIndex={1}
          background="linear-gradient(to top, rgba(0, 0, 0, 0.88) 0%, rgba(0, 0, 0, 0.35) 50%, rgba(0, 0, 0, 0.05) 100%)" 
          transition="opacity 0.3s ease"
          _groupHover={{ opacity: 0.95 }}
        />

        {/* Badge de Año / Ubicación Glass Floating */}
        <Box
          position="absolute"
          top="4"
          left="4"
          zIndex={2}
          bg="rgba(0, 0, 0, 0.55)"
          backdropFilter="blur(10px)"
          px="3"
          py="1"
          borderRadius="full"
          border="1px solid rgba(255, 255, 255, 0.15)"
        >
          <HStack gap="1.5">
            <Box as={MapPin} boxSize={3} color="primary.400" />
            <Text 
              fontSize="10px" 
              fontWeight="800" 
              color="white"
              letterSpacing="0.15em"
              textTransform="uppercase"
            >
              {address} · {year}
            </Text>
          </HStack>
        </Box>

        {/* Bloque Inferior con Título y Botón de Exploración */}
        <HStack
          position="absolute"
          bottom="0"
          left="0"
          right="0"
          zIndex={2}
          p={{ base: "5", md: "6" }}
          justify="space-between"
          align="flex-end"
        >
          <VStack align="flex-start" gap="1" maxW="calc(100% - 44px)">
            <Heading 
              as="h3" 
              fontSize={{ base: "xl", md: "2xl" }} 
              color="white"
              fontWeight="800"
              letterSpacing="tight"
              lineHeight="tight"
              lineClamp={1}
            >
              {residencial}
            </Heading>
            <Text fontSize="xs" color="whiteAlpha.800" fontWeight="400">
              Obra Residencial / Comercial
            </Text>
          </VStack>

          {/* Botón Circular Flotante */}
          <Box 
            w="40px"
            h="40px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="full"
            bg="whiteAlpha.200"
            backdropFilter="blur(8px)"
            border="1px solid rgba(255, 255, 255, 0.25)"
            color="white"
            flexShrink={0}
            transition="all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
            _groupHover={{ 
              bg: "primary.500", 
              borderColor: "primary.500",
              transform: "scale(1.1) rotate(45deg)" 
            }}
          >
            <Box as={ArrowRight} boxSize={5} />
          </Box>
        </HStack>
      </Box>
    );
  },
);

ProjectCardContent.displayName = "ProjectCardContent";

export default ProjectCardContent;
