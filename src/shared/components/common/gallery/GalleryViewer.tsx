"use client";

import React, { useState, useCallback, useRef } from "react";
import {
  Box,
  IconButton,
  Text,
  HStack,
} from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { m, AnimatePresence } from "framer-motion";
import FadingImage from "../FadingImage";
import { GalleryImage } from "../Gallery";

const SWIPE_THRESHOLD = 50;
const MotionBox = m(Box);

export interface GalleryViewerProps {
  currentImage?: GalleryImage;
  imageCount: number;
  selectedIndex: number;
  setSelectedIndex: (_index: number) => void;
  handlePrevious: (_e?: React.MouseEvent | React.KeyboardEvent) => void;
  handleNext: (_e?: React.MouseEvent | React.KeyboardEvent) => void;
  isPriority?: boolean;
}

const GalleryViewer = React.memo(({
  currentImage,
  imageCount,
  selectedIndex,
  setSelectedIndex,
  handlePrevious,
  handleNext,
  isPriority = false,
}: GalleryViewerProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const dotActiveColor = useColorModeValue("primary.500", "primary.300");
  const bgOverlay = useColorModeValue("blackAlpha.50", "blackAlpha.200");

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
    if (Math.abs(diffX) > Math.abs(diffY)) {
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

  if (!currentImage) return null;

  const slideTransform = isDragging ? `translateX(${dragOffset}px)` : "translateX(0)";

  return (
    <MotionBox
      flex="1"
      h="100%"
      w="100%"
      position="relative"
      overflow="hidden"
      bg={bgOverlay}
      role="group"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      _focus={{ outline: "none" }}
      userSelect="none"
      touchAction="pan-y"
    >
      <AnimatePresence mode="wait">
        <m.div
          key={currentImage.id}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            transform: slideTransform,
            transition: isDragging ? "none" : "transform 0.3s ease",
          }}
        >
          <FadingImage
            src={currentImage.image}
            alt={currentImage.name || "Vista principal"}
            w="100%"
            h="100%"
            objectFit="cover"
            showOverlay={false}
            loading={isPriority ? "eager" : "lazy"}
            // @ts-ignore
            fetchPriority={isPriority ? "high" : "auto"}
            rounded="none"
          />
        </m.div>
      </AnimatePresence>

      <Box
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        h="40%"
        bgGradient="linear(to-t, blackAlpha.600, transparent)"
        pointerEvents="none"
        opacity={0}
        _groupHover={{ opacity: 1 }}
        transition="opacity 0.3s ease"
      />

      {imageCount > 1 && (
        <>
          <IconButton
            position="absolute"
            left={4}
            top="50%"
            transform={`translateY(-50%) ${isDragging ? "none" : ""}`}
            onClick={() => handlePrevious()}
            variant="ghost"
            color="white"
            bg="blackAlpha.500"
            _hover={{
              bg: "whiteAlpha.300",
              transform: "translateY(-50%) scale(1.1)",
            }}
            _active={{
              transform: "translateY(-50%) scale(0.95)",
            }}
            display="flex"
            aria-label="Anterior"
            zIndex={10}
            opacity={isDragging ? 0 : 1}
            transition="opacity 0.2s ease, transform 0.2s ease"
          >
            <ChevronLeft size={32} />
          </IconButton>
          <IconButton
            position="absolute"
            right={4}
            top="50%"
            transform={`translateY(-50%) ${isDragging ? "none" : ""}`}
            onClick={() => handleNext()}
            variant="ghost"
            color="white"
            bg="blackAlpha.500"
            _hover={{
              bg: "whiteAlpha.300",
              transform: "translateY(-50%) scale(1.1)",
            }}
            _active={{
              transform: "translateY(-50%) scale(0.95)",
            }}
            display="flex"
            aria-label="Siguiente"
            zIndex={10}
            opacity={isDragging ? 0 : 1}
            transition="opacity 0.2s ease, transform 0.2s ease"
          >
            <ChevronRight size={32} />
          </IconButton>

          <Box
            position="absolute"
            top={4}
            right={4}
            bg="blackAlpha.700"
            px={4}
            py={1.5}
            borderRadius="full"
            border="1px solid"
            borderColor="whiteAlpha.300"
          >
            <Text
              fontSize="xs"
              color="white"
              fontWeight="bold"
              letterSpacing="widest"
            >
              {selectedIndex + 1}{" "}
              <Text as="span" opacity={0.5}>
                /
              </Text>{" "}
              {imageCount}
            </Text>
          </Box>

          <HStack
            position="absolute"
            bottom={6}
            left="50%"
            transform="translateX(-50%)"
            gap={2.5}
            zIndex={5}
          >
            {Array.from({ length: imageCount }).map((_, index) => (
              <Box
                key={index}
                w={selectedIndex === index ? "32px" : "8px"}
                h="6px"
                bg={selectedIndex === index ? dotActiveColor : "whiteAlpha.400"}
                borderRadius="full"
                cursor="pointer"
                onClick={() => setSelectedIndex(index)}
                transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                _hover={{ bg: "whiteAlpha.800" }}
              />
            ))}
          </HStack>
        </>
      )}

      {imageCount > 1 && (
        <Text
          position="absolute"
          bottom={-8}
          left="50%"
          transform="translateX(-50%)"
          fontSize="xs"
          color="gray.500"
          opacity={0}
          transition="opacity 0.2s ease"
          _groupHover={{ opacity: 1 }}
          pointerEvents="none"
          display={{ base: "block", md: "none" }}
        >
          Desliza para navegar
        </Text>
      )}
    </MotionBox>
  );
});

GalleryViewer.displayName = "GalleryViewer";

export default GalleryViewer;
