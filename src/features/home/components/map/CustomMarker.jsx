import { useColorModeValue } from "@/components/ui/color-mode";
import React, { useCallback } from "react";
import { OverlayViewF } from "@react-google-maps/api";
import { Box, Heading, Text, Flex, VStack, Badge, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { pulseRing } from "./mapConfig";
import {
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from "@/components/ui/popover";

/**
 * @component CustomMarker
 * @description UX/UI Architect Edition: Premium Pin with Liquid Glass refraction.
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
      <PopoverRoot
        open={isSelected}
        onOpenChange={(e) => { if (!e.open) onToggleSelect(null); }}
        positioning={{ placement: "top" }}
        lazyMount
        unmountOnExit
      >
        <PopoverTrigger asChild>
          <Box
            as={motion.div}
            initial={false}
            animate={isSelected ? { 
              y: [0, -12, 0],
              transition: { type: "spring", stiffness: 300, damping: 15, repeat: Infinity, repeatDelay: 3 }
            } : { y: 0 }}
            whileHover={{ scale: 1.15, transition: { duration: 0.2 } }}
            onClick={() => onToggleSelect(marker)}
            cursor="pointer"
            position="relative"
            w={`${iconSize.width}px`}
            h={`${iconSize.height + 15}px`}
            zIndex={isSelected ? 100 : 1}
          >
            {/* 1. HALO DE ENERGÍA (Glow sutil en lugar de pulso brusco) */}
            {(isStore || isSelected) && (
              <Box
                position="absolute" 
                top="50%" left="50%" 
                transform="translate(-50%, -50%)"
                w={`${iconSize.width * 1.8}px`}
                h={`${iconSize.width * 1.8}px`}
                borderRadius="full"
                bg={isSelected ? "primary.400" : "text.accent"}
                opacity={0.15}
                filter="blur(20px)"
                animation={`${pulseRing} 3s infinite`}
              />
            )}

            {/* 2. PIN PERSONALIZADO CON EFECTO LENTE */}
            <Flex direction="column" align="center" gap={0}>
              <Flex
                w={`${iconSize.width}px`}
                h={`${iconSize.width}px`}
                bg={isSelected ? "text.accent" : (isStore ? "bg.glass" : "primary.900")}
                backdropFilter="blur(16px)"
                borderRadius="full"
                border="2px solid"
                borderColor={isStore ? "text.accent" : "whiteAlpha.600"}
                align="center"
                justify="center"
                position="relative"
                boxShadow={isSelected ? "0 0 25px var(--chakra-colors-text-accent)" : "0 12px 32px rgba(0,0,0,0.25)"}
                transition="all 0.3s ease"
                _after={{
                  content: '""',
                  position: "absolute",
                  inset: 0,
                  borderRadius: "full",
                  background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, transparent 60%)",
                  pointerEvents: "none"
                }}
              >
                {isSvg ? (
                  <Box as={iconContent} color={isSelected ? "white" : "primary.300"} size="20px" />
                ) : (
                  <Image 
                    src={iconContent} 
                    alt={marker.name} 
                    w={isStore ? "75%" : "100%"} 
                    h={isStore ? "75%" : "100%"} 
                    objectFit="contain"
                    filter={isSelected ? "brightness(0) invert(1)" : "none"}
                    transition="all 0.3s ease"
                  />
                )}
              </Flex>

              {/* Punta del Pin Estilizada */}
              <Box 
                w="4px" h="15px"
                bgGradient={`linear(to-b, ${isStore ? "var(--chakra-colors-text-accent)" : "whiteAlpha.800"}, transparent)`}
                opacity={0.8}
                mt="-2px"
                borderRadius="full"
              />
              
              {/* Sombra proyectada en el suelo del mapa */}
              <Box 
                w="12px" h="3px"
                bg="blackAlpha.400"
                filter="blur(2px)"
                borderRadius="full"
                mt="1px"
              />
            </Flex>
          </Box>
        </PopoverTrigger>

        <PopoverContent
          border="1px solid" borderColor="border.glass"
          boxShadow="0 25px 50px -12px rgba(0,0,0,0.5)" 
          borderRadius="2xl"
          overflow="hidden" 
          maxW={{ base: "240px", md: "300px" }} 
          bg={popoverBg}
          backdropFilter="blur(20px)"
          portalled={true}
        >
          <PopoverArrow />
          
          <Box position="relative" h={{ base: "100px", md: "140px" }} w="full" bg="gray.200">
            <Image 
              src={marker.image || marker.photosObra?.[0]?.image} 
              alt={marker.name}
              w="100%" h="100%" objectFit="cover"
            />
            <Box position="absolute" inset="0" bgGradient="linear(to-t, blackAlpha.900, transparent)" />
            <Badge
              position="absolute" top={3} right={3}
              colorPalette={isStore ? "primary" : "blue"}
              variant="solid" borderRadius="full"
              fontSize="10px" px={3} py={1}
            >
              {isStore ? "SEDE PRINCIPAL" : marker.year || "PROYECTO"}
            </Badge>
          </Box>

          <PopoverBody p={{ base: 4, md: 6 }}>
            <VStack align="start" gap={2}>
              <Heading
                size={{ base: "xs", md: "sm" }} color={headingColor}
                fontFamily="heading" letterSpacing="tight" fontWeight="900"
                textTransform="uppercase"
              >
                {marker.residencial || marker.name}
              </Heading>
              <Text fontSize={{ base: "11px", md: "xs" }} color={textColor} noOfLines={2} lineHeight="tall">
                {marker.address}
              </Text>
              {!isStore && (
                <Text fontSize="9px" fontWeight="900" color="text.accent" textTransform="uppercase" letterSpacing="widest" mt={2}>
                  ESTRUCTURAS GYA
                </Text>
              )}
            </VStack>
          </PopoverBody>
        </PopoverContent>
      </PopoverRoot>
    </OverlayViewF>
  );
};

export default CustomMarker;
