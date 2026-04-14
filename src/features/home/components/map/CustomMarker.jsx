import { useColorModeValue } from "@/components/ui/color-mode";
import React, { useCallback } from "react";
import { OverlayViewF } from "@react-google-maps/api";
import { Box, Heading, Text, Flex, Popover, Portal, VStack, Badge, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { pulseRing } from "./mapConfig";

/**
 * @component CustomMarker
 * @description Marcador de alta fidelidad con animación de rebote y cartel informativo.
 * Optimizado para Lucide Icons y Chakra v3.
 */
const CustomMarker = ({
  marker, isSelected, onToggleSelect, iconContent, isSvg, iconSize, map, google,
}) => {
  const getPixelPositionOffset = useCallback(
    (width, height) => ({ x: -(width / 2), y: -height }),
    [],
  );

  const isStore = marker.type === "store";
  
  const popoverBg = useColorModeValue("white", "gray.900");
  const headingColor = useColorModeValue("gray.800", "white");
  const textColor = useColorModeValue("gray.600", "gray.400");

  if (!map || !google) return null;

  const position = marker.position || { lat: marker.lat, lng: marker.lng };
  if (!position.lat || !position.lng) return null;

  return (
    <OverlayViewF
      position={position}
      mapPaneName="overlayMouseTarget"
      getPixelPositionOffset={getPixelPositionOffset}
    >
      <Popover.Root
        open={isSelected}
        onOpenChange={(e) => { if (!e.open) onToggleSelect(null); }}
        positioning={{ placement: "top" }}
        lazyMount
        unmountOnExit
      >
        <Popover.Trigger asChild>
          <Box
            as={motion.div}
            initial={false}
            animate={isSelected ? { 
              y: [0, -15, 0],
              scale: 1.1,
              transition: { type: "spring", stiffness: 300, damping: 15 }
            } : { y: 0, scale: 1 }}
            whileHover={{ scale: 1.1, y: -5 }}
            onClick={() => onToggleSelect(marker)}
            cursor="pointer"
            position="relative"
            w={`${iconSize.width}px`}
            h={`${iconSize.height + 10}px`}
            zIndex={isSelected ? 100 : 1}
          >
            {/* Efecto de Pulso en el suelo */}
            {(isStore || isSelected) && (
              <Box
                position="absolute" bottom="0" left="50%" transform="translateX(-50%)"
                w="20px" h="4px" bg="blackAlpha.300" borderRadius="full"
                animation={`${pulseRing} 2s infinite`}
              />
            )}

            {/* PIN PERSONALIZADO */}
            <Flex direction="column" align="center" gap={0}>
              <Flex
                w={`${iconSize.width}px`}
                h={`${iconSize.width}px`}
                bg={isSelected ? "primary.600" : (isStore ? "white" : "primary.900")}
                borderRadius="full"
                border="3px solid"
                borderColor={isStore ? "primary.500" : "white"}
                align="center"
                justify="center"
                boxShadow="xl"
                overflow="hidden"
              >
                {isSvg ? (
                  <Box as={iconContent} color={isSelected ? "white" : "primary.300"} size="20px" />
                ) : (
                  <Image src={iconContent} alt={marker.name} w="100%" h="100%" objectFit="cover" />
                )}
              </Flex>
              {/* Punta del Pin */}
              <Box 
                w="0" h="0" 
                borderLeft="8px solid transparent"
                borderRight="8px solid transparent"
                borderTop="10px solid"
                borderTopColor={isSelected ? "primary.600" : (isStore ? "primary.500" : "primary.900")}
                mt="-2px"
              />
            </Flex>
          </Box>
        </Popover.Trigger>

        <Portal>
          <Popover.Positioner>
            <Popover.Content
              border="1px solid" borderColor="border.glass"
              boxShadow="dark-lg" borderRadius="2xl"
              overflow="hidden" 
              maxW={{ base: "240px", md: "300px" }} 
              bg={popoverBg}
              backdropFilter="blur(16px)"
            >
              <Popover.Arrow />
              
              {/* CARTEL INFORMATIVO CON IMAGEN */}
              <Box position="relative" h={{ base: "80px", md: "120px" }} w="full" bg="gray.200">
                <Image 
                  src={marker.image || marker.photosObra?.[0]?.image} 
                  alt={marker.name}
                  w="100%" h="100%" objectFit="cover"
                />
                <Box position="absolute" inset="0" bgGradient="linear(to-t, blackAlpha.800, transparent)" />
                <Badge
                  position="absolute" top={2} right={2}
                  colorPalette={isStore ? "primary" : "blue"}
                  variant="solid" borderRadius="full"
                  size="xs"
                >
                  {isStore ? "SEDE" : marker.year || "OBRA"}
                </Badge>
              </Box>

              <Popover.Body p={{ base: 3, md: 5 }}>
                <VStack align="start" gap={1}>
                  <Heading
                    size={{ base: "xs", md: "md" }} color={headingColor}
                    fontFamily="heading" letterSpacing="tight"
                    noOfLines={1}
                  >
                    {marker.residencial || marker.name}
                  </Heading>
                  <Text fontSize={{ base: "10px", md: "xs" }} color={textColor} noOfLines={2} lineHeight="shorter">
                    {marker.address}
                  </Text>
                  {!isStore && (
                    <Text fontSize="9px" fontWeight="900" color="primary.500" textTransform="uppercase" letterSpacing="widest" mt={1}>
                      INGENIERÍA GYA
                    </Text>
                  )}
                </VStack>
              </Popover.Body>
            </Popover.Content>
          </Popover.Positioner>
        </Portal>
      </Popover.Root>
    </OverlayViewF>
  );
};

export default CustomMarker;