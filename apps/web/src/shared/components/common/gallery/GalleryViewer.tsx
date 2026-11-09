"use client";
import React, { useState, useCallback, useRef } from "react";
import {
  Box,
  Text,
  HStack,
  chakra,
} from "@chakra-ui/react";
import { ChevronLeft, ChevronRight, MoveHorizontal, Maximize2 } from "lucide-react";

import FadingImage from "@shared/components/common/FadingImage";
import { GalleryItem } from "@/shared/types/gallery";
import { keyframes } from "@emotion/react";

const swipeHint = keyframes`
  0% { opacity: 0; transform: translateY(5px); }
  10% { opacity: 1; transform: translateY(0); }
  90% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(5px); }
`;

const SWIPE_THRESHOLD = 50;



interface GalleryViewerProps {
  currentImage: GalleryItem;
  imageCount: number;
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  handlePrevious: () => void;
  handleNext: () => void;
  isPriority?: boolean;
  onOpenModal?: () => void;
}

/**
 * @component GalleryViewer
 * @description Performance-optimized gallery viewer.
 */
const GalleryViewer: React.FC<GalleryViewerProps> = React.memo(({
  currentImage,
  imageCount,
  selectedIndex,
  setSelectedIndex,
  handlePrevious,
  handleNext,
  isPriority = false,
  onOpenModal,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  // Aura Studio: punto activo con contraste nítido sobre el overlay de la imagen
  const dotActiveColor = { base: "accent.navyContrast", _dark: "white" };

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    setIsDragging(true);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const diffX = currentX - touchStartX.current;
    const diffY = currentY - touchStartY.current;
    // Prioritize horizontal swipe for gallery navigation
    if (Math.abs(diffX) > Math.abs(diffY)) {
      if (e.cancelable) e.preventDefault();
      setDragOffset(diffX);
    }
  }, [isDragging]);

  const handleTouchEnd = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset > SWIPE_THRESHOLD) {
      handlePrevious();
    } else if (dragOffset < -SWIPE_THRESHOLD) {
      handleNext();
    }
    setDragOffset(0);
  }, [isDragging, dragOffset, handlePrevious, handleNext]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      handlePrevious();
    } else if (e.key === "ArrowRight") {
      handleNext();
    }
  }, [handlePrevious, handleNext]);

  const slideTransform = isDragging ? `translateX(${dragOffset}px)` : "translateX(0)";

  return (
    <Box
      flex="1"
      h="100%"
      w="100%"
      position="relative"
      overflow="hidden"
      bg="transparent"
      role="group"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      _focusVisible={{ outline: "2px solid", outlineColor: "ring.primary", outlineOffset: "-2px" }}
      userSelect="none"
      touchAction="pan-y"
    >
        <Box
          position="absolute"
          top={0}
          left={0}
          w="100%"
          h="100%"
          overflow="hidden"
          style={{
            transform: slideTransform,
            transition: isDragging ? "none" : "transform 0.3s ease",
          }}
        >
          <Box w="100%" h="100%">
            <FadingImage
              src={currentImage.src}
              alt={currentImage.title || "Vista principal"}
              w="100%"
              h="100%"
              objectFit="cover"
              loading={isPriority ? "eager" : "lazy"}
              fetchPriority={isPriority ? "high" : "auto"}
              borderRadius="none"
              sizes="(max-width: 992px) 100vw, 58vw"
            />
          </Box>
        </Box>

      <Box
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        h="40%"
        bgGradient="to-t"
        gradientFrom="blackAlpha.600"
        gradientTo="transparent"
        pointerEvents="none"
        opacity={0}
        _groupHover={{ opacity: 1 }}
        transition="opacity 0.3s ease"
      />

      {imageCount > 1 && (
        <>
          <chakra.button
            type="button"
            position="absolute"
            left="6"
            top="50%"
            transform="translateY(-50%)"
            onClick={handlePrevious}
            color="white"
            bg="blackAlpha.500"
            p="0"
            minW="11"
            minH="11"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="full"
            _hover={{
              bg: "whiteAlpha.300",
              transform: "translateY(-50%) scale(1.1)",
            }}
            _active={{
              transform: "translateY(-50%) scale(0.95)",
            }}
            _focusVisible={{ outline: "2px solid", outlineColor: "ring.primary", outlineOffset: "2px" }}
            aria-label="Imagen anterior"
            zIndex={10}
            opacity={isDragging ? 0 : 1}
            transition="opacity 0.2s ease, transform 0.2s ease"
          >
            <ChevronLeft size={24} style={{ flexShrink: 0 }} />
          </chakra.button>
          <chakra.button
            type="button"
            position="absolute"
            right="6"
            top="50%"
            transform="translateY(-50%)"
            onClick={handleNext}
            color="white"
            bg="blackAlpha.500"
            p="0"
            minW="11"
            minH="11"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="full"
            _hover={{
              bg: "whiteAlpha.300",
              transform: "translateY(-50%) scale(1.1)",
            }}
            _active={{
              transform: "translateY(-50%) scale(0.95)",
            }}
            _focusVisible={{ outline: "2px solid", outlineColor: "ring.primary", outlineOffset: "2px" }}
            aria-label="Imagen siguiente"
            zIndex={10}
            opacity={isDragging ? 0 : 1}
            transition="opacity 0.2s ease, transform 0.2s ease"
          >
            <ChevronRight size={24} style={{ flexShrink: 0 }} />
          </chakra.button>

          <Box
            position="absolute"
            top="6"
            right="6"
            display="flex"
            alignItems="center"
            gap="2"
            zIndex={15}
          >
            {onOpenModal && (
              <chakra.button
                type="button"
                onClick={onOpenModal}
                color="white"
                bg="blackAlpha.700"
                minW="11"
                minH="11"
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderRadius="full"
                border="1px solid"
                borderColor="whiteAlpha.300"
                _hover={{
                  bg: "blackAlpha.900",
                  transform: "scale(1.08)",
                }}
                _active={{
                  transform: "scale(0.95)",
                }}
                _focusVisible={{ outline: "2px solid", outlineColor: "ring.primary", outlineOffset: "2px" }}
                aria-label="Ampliar imagen en pantalla completa"
                transition="background-color 0.2s ease, transform 0.2s ease"
              >
                <Maximize2 size={15} style={{ flexShrink: 0 }} />
              </chakra.button>
            )}

            <Box
              bg="blackAlpha.700"
              backdropFilter="blur(8px)"
              px="5"
              py="2"
              borderRadius="full"
              border="1px solid"
              borderColor="whiteAlpha.300"
            >
              <Text
                fontSize="xs"
                color="white"
                fontWeight="bold"
                letterSpacing="widest"
                fontVariantNumeric="tabular-nums"
              >
                {selectedIndex + 1}{" "}
                <Text as="span" opacity={0.5}>
                  /
                </Text>{" "}
                {imageCount}
              </Text>
            </Box>
          </Box>

          <HStack
            position="absolute"
            bottom="6"
            left="50%"
            transform="translateX(-50%)"
            gap="1"
            zIndex={5}
            display={{ base: "none", md: "flex" }}
          >
            {Array.from({ length: imageCount }).map((_, index) => (
              <chakra.button
                type="button"
                key={index}
                minW="11"
                minH="11"
                display="flex"
                alignItems="center"
                justifyContent="center"
                cursor="pointer"
                onClick={() => setSelectedIndex(index)}
                aria-label={`Ir a imagen ${index + 1}`}
                aria-current={selectedIndex === index ? "true" : undefined}
                _focusVisible={{ outline: "2px solid", outlineColor: "ring.primary", outlineOffset: "2px" }}
              >
                <Box
                  as="span"
                  display="block"
                  w={selectedIndex === index ? "24px" : "6px"}
                  h="1.5"
                  bg={selectedIndex === index ? dotActiveColor : "whiteAlpha.400"}
                  borderRadius="full"
                  transition="width 0.4s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                  _hover={{ bg: "whiteAlpha.800" }}
                />
              </chakra.button>
            ))}
          </HStack>
        </>
      )}

      {imageCount > 1 && (
        <Box
          position="absolute"
          bottom="14"
          left="50%"
          transform="translateX(-50%)"
          zIndex={10}
          pointerEvents="none"
          display={{ base: "flex", md: "none" }}
        >
          <Box
            animation={`${swipeHint} 5s ease-in-out infinite`}
          >
            <HStack
              bg="blackAlpha.700"
              backdropFilter="blur(8px)"
              px="6"
              py="2"
              borderRadius="full"
              color="white"
              border="1px solid"
              borderColor="whiteAlpha.300"
              gap="2"
            >
              <MoveHorizontal size={14} style={{ flexShrink: 0 }} />
              <Text fontSize="xs" fontWeight="bold" letterSpacing="widest">
                DESLIZA
              </Text>
            </HStack>
          </Box>
        </Box>
      )}
    </Box>
  );
});

GalleryViewer.displayName = "GalleryViewer";

export default GalleryViewer;
