"use client";
/**
 * @file ProjectCardContent.tsx
 * @description Refactored project card content to match the unified design of ClientCard and ServiceCard.
 * Updated to Chakra v3 with semantic tokens and optimized Skeleton.
 */

import React, { useState } from "react";
import {
  Box,
  Card,
  Heading,
  Text,
  HStack,
  LinkBox,
  LinkOverlay,
  VStack,
} from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import ResponsiveImage from "@shared/components/Image/ResponsiveImage";
import { MapPin } from "lucide-react";
import logger from "@shared/utils/logger";

interface ProjectCardContentProps {
  image?: string;
  residencial: string;
  address: string;
  year: string | number;
  onExplore: () => void;
  isLCP?: boolean;
  loading?: "lazy" | "eager" | string;
  fetchPriority?: "auto" | "high" | "low" | string;
}

const bgOverlay =
  "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)";

/**
 * @component ProjectCardContent
 * @description Presentational component for the project card visual structure.
 */
const ProjectCardContent: React.FC<ProjectCardContentProps> = React.memo(
  ({ image = "", residencial, address, year, onExplore, isLCP, loading, fetchPriority }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    return (
      <Card.Root
        as={LinkBox}
        role="group"
        cursor="pointer"
        position="relative"
        h={{ base: "44", md: "52" }}
        w="full"
        borderRadius="xl"
        overflow="hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        transform="translateZ(0)"
        _hover={{
          boxShadow: { md: "lg" },
          transform: { base: "translateZ(0)", md: "translateY(-4px) translateZ(0)" },
        }}
        transition="box-shadow 0.4s ease, transform 0.4s ease"
        borderWidth="0"
        bg="transparent"
      >
        <Card.Body p="0" position="relative" w="full" h="full" overflow="hidden" borderRadius="xl">
          <Skeleton loading={!isLoaded} h="full" w="full">
            <Box position="relative" h="full" w="full" overflow="hidden">
              <ResponsiveImage
                src={image}
                alt={`Vista del proyecto: ${residencial}`}
                objectFit="cover"
                w="100%"
                h="100%"
                loading={(loading as "lazy" | "eager") || (isLCP ? "eager" : "lazy")}
                decoding={isLCP ? "sync" : "async"}
                fetchPriority={fetchPriority as "auto" | "high" | "low"}
                onLoad={() => {
                  logger.debug({ src: image, residencial }, "Image loaded");
                  setIsLoaded(true);
                }}
                transform={isHovered ? "scale(1.06)" : "scale(1.02)"}
                transition="transform 0.6s ease"
              />

              <Box position="absolute" inset="0" bgGradient={bgOverlay} />

              <Box
                position="absolute"
                bottom={0}
                left={0}
                right={0}
                p="6"
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
                  lineClamp={1}
                  _after={{
                    content: '""',
                    position: "absolute",
                    bottom: "-2",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: isLoaded ? "8" : "0",
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
                  gap="6"
                  w="full"
                  mt="6"
                  opacity={{ base: 1, md: isHovered ? 1 : 0 }}
                  transform={{ 
                    base: "translateY(0)", 
                    md: isHovered ? "translateY(0)" : "translateY(10px)" 
                  }}
                  transition="opacity 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
                >
                  <HStack justify="center" gap="4" w="full">
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

                  <Button
                    onClick={(e: React.MouseEvent) => {
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
                    fontSize="xs"
                    fontWeight="bold"
                    letterSpacing="0.2em"
                    px="8"
                    borderRadius="full"
                    transition="background-color 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), color 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), border-color 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
                  >
                    EXPLORAR PROYECTO
                  </Button>
                </VStack>
              </Box>
            </Box>
          </Skeleton>
        </Card.Body>
      </Card.Root>
    );
  },
);

ProjectCardContent.displayName = "ProjectCardContent";

export default ProjectCardContent;
