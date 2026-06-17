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
  LinkOverlay,
} from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { MapPin, ArrowRight } from "lucide-react";
import logger from "@shared/utils/logger";
import MediaCard from "@shared/components/common/MediaCard";

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
    const [isLoaded, setIsLoaded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const title = (
      <Heading
        as="h3"
        color={isHovered ? "primary.300" : "white"}
        fontSize={{ base: "md", md: "xl" }}
        fontWeight="600"
        textTransform="uppercase"
        letterSpacing="wider"
        textAlign="center"
        position="relative"
        transition="color 0.3s ease"
        lineClamp={1}
        _after={{
          content: '""',
          position: "absolute",
          bottom: "-2",
          left: "50%",
          transform: "translateX(-50%)",
          width: isLoaded ? "8" : "0",
          height: "2px",
          bg: isHovered ? "primary.300" : "white",
          transition: "width 0.4s ease, background 0.3s ease",
        }}
      >
        <LinkOverlay asChild>
          <button
            onClick={(e) => {
              e.preventDefault();
              onExplore();
            }}
            aria-label={`Explorar detalles del proyecto ${residencial}`}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              font: 'inherit',
              color: 'inherit',
              cursor: 'pointer',
            }}
          >
            {residencial}
          </button>
        </LinkOverlay>
      </Heading>
    );

    const cta = (
      <Button
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();
          onExplore();
        }}
        aria-label={`Explorar proyecto ${residencial} en detalle`}
        variant="aura"
        size="sm"
        bg="whiteAlpha.200"
        css={{ backdropFilter: "blur(10px)" }}
        color="white"
        borderColor="whiteAlpha.400"
        borderWidth="1px"
        _hover={{ 
          bg: "whiteAlpha.400", 
          color: "white",
          borderColor: "white",
          transform: "scale(1.05) translateY(-2px)",
          boxShadow: "0 0 20px rgba(255,255,255,0.2)"
        }}
        textTransform="uppercase"
        fontSize="xs"
        fontWeight="bold"
        letterSpacing="0.2em"
        px="8"
        borderRadius="full"
        transition="background-color 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), color 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), border-color 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
      >
        EXPLORAR PROYECTO
        <Box as={ArrowRight} w={4} h={4} />
      </Button>
    );

    const metadata = (
      <HStack justify="center" gap="4" w="full" mt="6">
        <HStack gap="2">
          <Box as={MapPin} w={3.5} h={3.5} color="text.accent" />
          <Text
            fontSize="xs"
            color="whiteAlpha.900"
            fontWeight="500"
            lineClamp={1}
          >
            {address}
          </Text>
        </HStack>
        <Box w="1px" h="3" bg="whiteAlpha.400" />
        <Text fontSize="xs" color="whiteAlpha.900" fontWeight="500">
          {year}
        </Text>
      </HStack>
    );

    return (
      <MediaCard
        image={image}
        alt={`Vista del proyecto: ${residencial}`}
        isLoaded={isLoaded}
        isHovered={isHovered}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onImageLoad={() => {
          logger.debug({ src: image, residencial }, "Image loaded");
          setIsLoaded(true);
        }}
        loading={loading || (isLCP ? "eager" : "lazy")}
        isLCP={isLCP}
        gradient={PROJECT_GRADIENT}
        title={title}
        ctaSection={cta}
      >
        {metadata}
      </MediaCard>
    );
  },
);

ProjectCardContent.displayName = "ProjectCardContent";

export default ProjectCardContent;
