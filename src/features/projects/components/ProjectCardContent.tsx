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
  LinkBox,
  LinkOverlay,
  Button,
  VStack,
} from "@chakra-ui/react";
import { Skeleton } from "@/components/ui/skeleton";
import ResponsiveImage from "@shared/components/Image/ResponsiveImage";
import { MapPin } from "lucide-react";

interface ProjectCardContentProps {
  image?: string;
  residencial: string;
  address: string;
  year: string | number;
  onExplore: () => void;
  isLCP?: boolean;
}

/**
 * @component ProjectCardContent
 * @description Presentational component for the project card visual structure.
 */
const ProjectCardContent: React.FC<ProjectCardContentProps> = React.memo(
  ({ image = "", residencial, address, year, onExplore, isLCP }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // Presentational gradient — intentionally hardcoded dark overlay (not mode-dependent)
    const bgOverlay =
      "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)";

    return (
      <LinkBox
        as="article"
        role="group"
        cursor="pointer"
        position="relative"
        h={{ base: "320px", md: "500px" }}
        w="full"
        borderRadius="xl"
        overflow="hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        _hover={{
          boxShadow: { md: "glass" },
          transform: { base: "none", md: "translateY(-4px)" },
        }}
        transition="all 0.4s ease"
      >
        <Skeleton loading={!isLoaded} h="full" w="full">
          <Box position="relative" h="full" w="full" overflow="hidden">
            <ResponsiveImage
              src={image}
              alt={`Vista del proyecto: ${residencial}`}
              objectFit="cover"
              w="100%"
              h="100%"
              loading={isLCP ? "eager" : "lazy"}
              decoding={isLCP ? "sync" : "async"}
              onLoad={() => setIsLoaded(true)}
              transform={isHovered ? "scale(1.06)" : "scale(1.02)"}
              transition="transform 0.6s ease"
            />

            <Box position="absolute" inset="0" bgGradient={bgOverlay} />

            <Box
              position="absolute"
              bottom={0}
              left={0}
              right={0}
              p={6}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="flex-end"
              zIndex={2}
            >
              <Heading
                as="h3"
                color={isHovered ? "text.accent" : "white"}
                fontSize={{ base: "md", md: "xl" }}
                fontWeight="600"
                textTransform="uppercase"
                letterSpacing="wider"
                textAlign="center"
                position="relative"
                transition="color 0.3s ease"
                noOfLines={1}
                _after={{
                  content: '""',
                  position: "absolute",
                  bottom: "-8px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: isLoaded ? "40px" : "0",
                  height: "2px",
                  bg: isHovered ? "text.accent" : "white",
                  transition: "width 0.4s ease, background 0.3s ease",
                }}
              >
                <LinkOverlay
                  as="button"
                  onClick={(e) => {
                    e.preventDefault();
                    onExplore();
                  }}
                  aria-label={`Explorar detalles del proyecto ${residencial}`}
                  _focusVisible={{
                    outline: "none",
                    ring: "2px",
                    ringColor: "ring.primary",
                    ringOffset: "2px",
                  }}
                >
                  {residencial}
                </LinkOverlay>
              </Heading>

              <VStack
                gap={4}
                w="full"
                mt={6}
                opacity={{ base: 1, md: isHovered ? 1 : 0 }}
                transform={{ 
                  base: "translateY(0)", 
                  md: isHovered ? "translateY(0)" : "translateY(10px)" 
                }}
                transition="all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
              >
                <HStack justify="center" gap={3} w="full">
                  <HStack gap={1}>
                    <Box as={MapPin} w={3.5} h={3.5} color="text.accent" />
                    <Text
                      fontSize="xs"
                      color="whiteAlpha.900"
                      fontWeight="500"
                      noOfLines={1}
                    >
                      {address}
                    </Text>
                  </HStack>
                  <Box w="1px" h="3" bg="whiteAlpha.400" />
                  <Text fontSize="xs" color="whiteAlpha.900" fontWeight="500">
                    {year}
                  </Text>
                </HStack>

                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    onExplore();
                  }}
                  aria-label={`Explorar proyecto ${residencial} en detalle`}
                  variant="aura"
                  size="sm"
                  bg="whiteAlpha.200"
                  backdropFilter="blur(10px)"
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
                  fontSize="10px"
                  fontWeight="bold"
                  letterSpacing="0.2em"
                  px={10}
                  borderRadius="full"
                  transition="all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
                >
                  EXPLORAR PROYECTO
                </Button>
              </VStack>
            </Box>
          </Box>
        </Skeleton>
      </LinkBox>
    );
  },
);

ProjectCardContent.displayName = "ProjectCardContent";

export default ProjectCardContent;
