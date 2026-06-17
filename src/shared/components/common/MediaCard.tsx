"use client";

import React from "react";
import { Box, Card, LinkBox } from "@chakra-ui/react";
import { Skeleton } from "@/components/ui/skeleton";
import ResponsiveImage from "@shared/components/Image/ResponsiveImage";

export interface MediaCardProps {
  image: string;
  alt: string;
  isLoaded: boolean;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onImageLoad: () => void;
  loading?: "lazy" | "eager";
  isLCP?: boolean;
  gradient?: string;
  title: React.ReactNode;
  ctaSection: React.ReactNode;
  children?: React.ReactNode;
}

const DEFAULT_GRADIENT =
  "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)";

const IMAGE_ZOOM_IDLE = "scale(1)";
const IMAGE_ZOOM_HOVER = "scale(1.08)";
const IMAGE_ZOOM_TRANSITION = "transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)";

export const CARD_HOVER_COLOR = "primary.300";

const MediaCard: React.FC<MediaCardProps> = ({
  image,
  alt,
  isLoaded,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  onImageLoad,
  loading = "lazy",
  isLCP = false,
  gradient = DEFAULT_GRADIENT,
  title,
  ctaSection,
  children,
}) => {
  return (
    <Card.Root
      as={LinkBox}
      role="group"
      cursor="pointer"
      position="relative"
      minH="320px"
      h="320px"
      borderRadius="xl"
      overflow="hidden"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      transform="translateZ(0)"
      transition="box-shadow 0.3s ease-out, transform 0.3s ease-out"
      _hover={{
        boxShadow: { md: "2xl" },
        transform: { base: "translateZ(0)", md: "translateY(-4px) translateZ(0)" },
      }}
      _active={{
        transform: { base: "translateZ(0)", md: "translateY(-4px) translateZ(0)" },
        boxShadow: { md: "2xl" },
      }}
      borderWidth="0"
      bg="transparent"
      css={{
        '@media (prefers-reduced-motion: reduce)': {
          '*': { transition: 'none !important', animation: 'none !important', transform: 'none !important' }
        }
      }}
    >
      <Card.Body p="0" position="relative" w="full" h="full" overflow="hidden" borderRadius="xl">
        <Skeleton loading={!isLoaded} h="full" w="full">
          <Box position="absolute" inset={0} overflow="hidden">
            <ResponsiveImage
              src={image}
              alt={alt}
              objectFit="cover"
              w="100%"
              h="100%"
              loading={loading}
              decoding="async"
              onLoad={onImageLoad}
              isLCP={isLCP}
              transform={isHovered ? IMAGE_ZOOM_HOVER : IMAGE_ZOOM_IDLE}
              transition={IMAGE_ZOOM_TRANSITION}
            />

            <Box position="absolute" inset="0" css={{ background: gradient }} />

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
            >
              {title}

              <Box
                mt="6"
                w="full"
                display="flex"
                justifyContent="center"
                opacity={isHovered ? 1 : 0}
                transform={isHovered ? "translateY(0)" : "translateY(10px)"}
                transition="opacity 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
              >
                {ctaSection}
              </Box>

              {children}
            </Box>
          </Box>
        </Skeleton>
      </Card.Body>
    </Card.Root>
  );
};

MediaCard.displayName = "MediaCard";
export default MediaCard;
