"use client";

import React from "react";
import { Box, Flex, VStack, HStack, Text, Heading, Badge, Card } from "@chakra-ui/react";
import { MapPin } from "lucide-react";
import ResponsiveImage from "@shared/components/Image/ResponsiveImage";
import { type MarkerType, type MapProject } from "./InteractiveMap";

interface ProjectDetailCardProps {
  selectedMarker: MarkerType;
  isStore: boolean;
}

/**
 * @component ProjectDetailCard
 * @description Muestra la información y foto del proyecto o sede seleccionada en el mapa.
 */
export const ProjectDetailCard: React.FC<ProjectDetailCardProps> = React.memo(({
  selectedMarker,
  isStore
}) => {
  const imageSrc = selectedMarker?.image || (selectedMarker as unknown as { photosObra?: { image: string }[] })?.photosObra?.[0]?.image;

  return (
    <VStack
      w="full"
      h="full"
      position="relative"
      overflow="hidden"
      animation="fadeIn 0.4s ease-out"
    >
      <Box position="absolute" inset={0} zIndex={0}>
        {imageSrc && (
          <ResponsiveImage 
            src={imageSrc} 
            alt={selectedMarker?.name || "Proyecto GYA"}
            w="100%" h="100%" objectFit="cover"
            loading="lazy"
          />
        )}
      </Box>

 

      {/* Contenido Flotante */}
      <Flex 
        direction="column" 
        justify="flex-end"   
        h="full" 
        w="full" 
        p="6" 
        zIndex={2}
        position="relative"
      >
        {/* Info Capsule Adaptable */}
        <Card.Root
          w="full"
          mb="2"
          bg="surface.card"
          borderColor="border.default"
          boxShadow="md"
          borderWidth="1px"
          borderRadius="card"
        >  
          <Card.Body p="5">
            <VStack align="center" gap="3" w="full">
              <Badge
                colorPalette={isStore ? "primary" : "blue"}
                variant="subtle"
                borderRadius="full"
                px={3}
                py={0.5}
                textTransform="uppercase"
                fontSize="9px"
                fontWeight="800"
                letterSpacing="wider"
              >
                {isStore ? "SEDE CENTRAL" : (selectedMarker as MapProject)?.year || "OBRA FINALIZADA"}
              </Badge>

              <Heading 
                size="md" 
                color={{ base: "text.heading", _dark: "white" }} 
                letterSpacing="tight" 
                fontWeight="800"
                textAlign="center"
              >
                {(selectedMarker as unknown as { residencial?: string })?.residencial || selectedMarker?.name}
              </Heading>

              <HStack align="center" justify="center" gap={1.5} w="full">
                <Box as={MapPin} boxSize={3.5} color="text.accent" aria-hidden="true" />
                <Text 
                  fontSize="xs" 
                  color="text.body" 
                  fontWeight="600" 
                  lineHeight="tall"
                  textAlign="center"
                >
                  {selectedMarker?.address}
                </Text>
              </HStack>
            </VStack>
          </Card.Body>
        </Card.Root>
      </Flex>
    </VStack>
  );
});

ProjectDetailCard.displayName = "ProjectDetailCard";
