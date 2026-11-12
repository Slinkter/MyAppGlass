"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
  Box,
  Heading,
  SimpleGrid,
  Text,
  HStack,
  VStack,
  Image,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Button } from "@/shared/ui/button";
import { X, ChevronLeft, ChevronRight, Images } from "lucide-react";
import type { ProjectPhoto } from "@shared/types/project";
import type { GalleryItem } from "@/shared/types/gallery";

interface ProjectAlbumGridProps {
  photos?: (GalleryItem | string | ProjectPhoto)[];
  projectTitle: string;
}

const toResponsiveUrl = (url: string, isMobile: boolean): string => {
  if (!isMobile || !url) return url;
  return url.replace("%2Fweb%2F", "%2Fmobile%2F").replace("/web/", "/mobile/");
};

export const ProjectAlbumGrid: React.FC<ProjectAlbumGridProps> = ({
  photos,
  projectTitle,
}) => {
  const isMobile = useBreakpointValue({ base: true, md: false }) ?? false;
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(12);

  const items = useMemo(() => {
    if (!photos?.length) return [];
    return photos
      .map((photo, index) => {
        const rawSrc =
          typeof photo === "string"
            ? photo
            : (photo as { src?: string; image?: string }).src ??
              (photo as { image?: string }).image ??
              "";
        if (!rawSrc) return null;
        return {
          id: index,
          thumbSrc: toResponsiveUrl(rawSrc, true),
          fullSrc: toResponsiveUrl(rawSrc, isMobile),
          alt: `${projectTitle} — Foto ${index + 1}`,
        };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null);
  }, [photos, projectTitle, isMobile]);

  const visibleItems = items.slice(0, visibleCount);
  const hasMore = visibleCount < items.length;
  const activeItem = selectedIndex !== null ? items[selectedIndex] : null;

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) => (prev === null ? null : (prev - 1 + items.length) % items.length));
  }, [items.length]);

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => (prev === null ? null : (prev + 1) % items.length));
  }, [items.length]);

  useEffect(() => {
    if (selectedIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedIndex(null);
      else if (e.key === "ArrowLeft") handlePrev();
      else if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedIndex, handlePrev, handleNext]);

  if (items.length === 0) return null;

  return (
    <VStack align="stretch" gap={4} w="full" mt={4}>
      <HStack justify="space-between" align="center" flexWrap="wrap" gap={2}>
        <Heading
          size="xs"
          fontWeight="700"
          color="text.accent"
          textTransform="uppercase"
          letterSpacing="0.25em"
          display="flex"
          alignItems="center"
          gap={2.5}
        >
          <Box w="16px" h="2px" bg="brand.coral" />
          <Images size={16} />
          Álbum de Obra ({items.length})
        </Heading>
      </HStack>

      <SimpleGrid columns={{ base: 2, sm: 3, lg: 4 }} gap={{ base: 3, md: 4 }} w="full">
        {visibleItems.map((item, idx) => {
          const isHero = idx === 0;
          return (
            <Box
              key={item.id}
              as="button"
              onClick={() => setSelectedIndex(idx)}
              gridColumn={isHero ? { base: "span 2", lg: "span 2" } : undefined}
              gridRow={isHero ? { lg: "span 2" } : undefined}
              position="relative"
              overflow="hidden"
              borderRadius="2xl"
              bg="bg.subtle"
              border="1px solid"
              borderColor="border.default"
              aspectRatio={isHero ? { base: "16 / 10", lg: "auto" } : "4 / 3"}
              minH="44px"
              cursor="pointer"
              transition="transform 0.2s ease"
              _hover={{ transform: "scale(1.015)" }}
              _motionReduce={{ transition: "none", transform: "none" }}
              _focusVisible={{ outline: "2px solid", outlineColor: "brand.coral" }}
            >
              <Image
                src={item.thumbSrc}
                alt={item.alt}
                w="full"
                h="full"
                objectFit="cover"
                loading={isHero ? "eager" : "lazy"}
                decoding="async"
              />
            </Box>
          );
        })}
      </SimpleGrid>

      {hasMore && (
        <HStack justify="center" pt={2}>
          <Button
            variant="outline"
            size="md"
            minH="44px"
            onClick={() => setVisibleCount((c) => c + 12)}
          >
            Ver más fotos ({items.length - visibleCount} restantes)
          </Button>
        </HStack>
      )}

      {activeItem && (
        <Box
          position="fixed"
          inset="0"
          zIndex="modal"
          bg="blackAlpha.900"
          display="flex"
          alignItems="center"
          justifyContent="center"
          p={{ base: 3, md: 8 }}
          onClick={() => setSelectedIndex(null)}
        >
          <Box
            position="relative"
            maxW="1100px"
            w="full"
            maxH="90dvh"
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={3}
            onClick={(e) => e.stopPropagation()}
          >
            <HStack w="full" justify="space-between" color="white">
              <Text fontSize="sm" fontWeight="medium">
                {selectedIndex! + 1} / {items.length}
              </Text>
              <Button
                variant="ghost"
                size="sm"
                minW="44px"
                minH="44px"
                color="white"
                onClick={() => setSelectedIndex(null)}
                aria-label="Cerrar visor"
              >
                <X size={20} />
              </Button>
            </HStack>

            <Image
              src={activeItem.fullSrc}
              alt={activeItem.alt}
              maxH="72dvh"
              w="auto"
              maxW="full"
              objectFit="contain"
              borderRadius="xl"
            />

            <HStack gap={4}>
              <Button
                variant="outline"
                size="md"
                minW="44px"
                minH="44px"
                color="white"
                borderColor="whiteAlpha.400"
                onClick={handlePrev}
                aria-label="Foto anterior"
              >
                <ChevronLeft size={20} />
              </Button>
              <Button
                variant="outline"
                size="md"
                minW="44px"
                minH="44px"
                color="white"
                borderColor="whiteAlpha.400"
                onClick={handleNext}
                aria-label="Siguiente foto"
              >
                <ChevronRight size={20} />
              </Button>
            </HStack>
          </Box>
        </Box>
      )}
    </VStack>
  );
};
