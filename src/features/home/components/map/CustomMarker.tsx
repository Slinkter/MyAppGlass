"use client";

import React, { useCallback } from "react";
// @ts-ignore
import { OverlayView } from "@react-google-maps/api";
import {
  Box,
  Heading,
  Text,
  Flex,
  Icon,
  VStack,
  Badge,
  PopoverRoot,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  PopoverCloseTrigger,
  Image,
} from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
// @ts-ignore
import { pulseRing, float } from "./mapConfig";

const CustomMarker = ({
  marker,
  isSelected,
  onToggleSelect,
  iconContent,
  isSvg,
  iconSize,
  map,
  google,
}: any) => {
  const getPixelPositionOffset = useCallback(
    (width: number, height: number) => ({ x: -(width / 2), y: -height }),
    [],
  );

  const isStore = marker.type === "store";

  // Neutral ring colors
  const ringColor = isStore
    ? "rgba(113, 113, 122, 0.4)" // Zinc.500
    : "rgba(161, 161, 170, 0.4)"; // Zinc.400

  // Hooks for Popover styles
  const popoverBg = useColorModeValue("white", "primary.900");
  const headingColor = useColorModeValue("gray.800", "white");
  const textColor = useColorModeValue("gray.600", "gray.300");

  if (!map || !google) return null;

  return (
    <OverlayView
      position={marker.position}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      getPixelPositionOffset={getPixelPositionOffset}
    >
      <PopoverRoot
        open={isSelected}
        onOpenChange={(e) => onToggleSelect(e.open ? marker : null)}
        positioning={{ placement: "top" }}
        lazyMount
      >
        <PopoverTrigger asChild>
          <Box
            position="relative"
            onClick={() => onToggleSelect(marker)}
            cursor="pointer"
            w={`${iconSize.width}px`}
            h={`${iconSize.height}px`}
            transition="all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
            _hover={{ transform: "scale(1.15) translateY(-2px)" }}
            animation={
              isSelected ? `${float} 2s ease-in-out infinite` : undefined
            }
            zIndex={isSelected ? 10 : 1}
          >
            {/* Pulse Effect for Store or Selected Items */}
            {(isStore || isSelected) && (
              <Box
                position="absolute"
                inset="0"
                borderRadius="full"
                border="3px solid"
                borderColor={ringColor}
                animation={`${pulseRing} 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite`}
                zIndex={-1}
              />
            )}

            {isSvg ? (
              // Project Marker
              <Flex
                bg={isSelected ? "red.600" : "text.accent"}
                borderRadius="full"
                border="2px solid white"
                align="center"
                justify="center"
                w="100%"
                h="100%"
                boxShadow="lg"
                color="white"
              >
                <Icon as={iconContent} w="50%" h="50%" />
              </Flex>
            ) : (
              // Store Marker (Image)
              <Box
                w="100%"
                h="100%"
                borderRadius="full"
                border="2px solid white"
                boxShadow="xl"
                overflow="hidden"
                bg="white"
              >
                <Image
                  src={iconContent}
                  alt={marker.name}
                  w="100%"
                  h="100%"
                  objectFit="cover"
                />
              </Box>
            )}
          </Box>
        </PopoverTrigger>

        <PopoverContent
          border="none"
          boxShadow="dark-lg"
          borderRadius="xl"
          overflow="hidden"
          maxW="280px"
          _focus={{ outline: "none" }}
          bg={popoverBg}
        >
          <PopoverArrow bg={popoverBg} />
          <PopoverCloseTrigger top={2} right={2} zIndex={2} />

          {/* Header Image or Gradient */}
          <Box h="6px" w="100%" />

          <PopoverBody p={4}>
            <VStack align="center" gap={2}>
              <Flex align="center" justify="center" w="100%">
                <Badge
                  colorPalette={isStore ? "primary" : "red"}
                  fontSize="sm"
                  px={2}
                  py={0.5}
                  borderRadius="full"
                >
                  {isStore ? "SEDE PRINCIPAL" : "PROYECTO"}
                </Badge>
              </Flex>

              <Box>
                <Heading
                  size="sm"
                  mb={1}
                  color={headingColor}
                  lineHeight="short"
                  textTransform={"uppercase"}
                >
                  {marker.residencial || marker.name}
                </Heading>
              </Box>

              <Flex align="flex-start" gap={2}>
                <Text fontSize="xs" color={textColor}>
                  {marker.g_maps || marker.address}
                </Text>
              </Flex>
            </VStack>
          </PopoverBody>
        </PopoverContent>
      </PopoverRoot>
    </OverlayView>
  );
};

export default CustomMarker;
