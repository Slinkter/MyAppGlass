"use client";

import React from "react";
import { Box, VStack, HStack, Text } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Navigation } from "lucide-react";

/**
 * @component DefaultInfoCard
 * @description Muestra la información de contacto por defecto de la sede central (horarios y dirección) con un diseño limpio.
 */
export const DefaultInfoCard: React.FC = React.memo(() => {
  return (
    <VStack
      p={{ base: "6", sm: "8" }}
      w="full"
      h="full"
      flex={1}
      justifyContent="space-between"
      align="flex-start"
      position="relative"
      bg="surface.card"
      animation="fadeIn 0.3s ease-out"
    >
      <VStack gap="6" align="flex-start" w="full">
        {/* Sección Horarios */}
        <VStack gap="1.5" align="flex-start" w="full">
          <HStack gap={2} color="text.accent">
            <Box as={Clock} boxSize={4} aria-hidden="true" />
            <Text fontWeight="700" fontSize="xs" textTransform="uppercase" letterSpacing="0.15em">
              Horarios de Atención
            </Text>
          </HStack>
          <Box>
            <Text fontSize="md" color="text.heading" fontWeight="700">Lunes a Sábado</Text>
            <Text fontSize="sm" color="text.muted" fontWeight="500">9:00 am – 5:00 pm</Text>
          </Box>
        </VStack>

        <Box w="full" h="1px" bg="border.default" />

        {/* Sección Dirección */}
        <VStack gap="1.5" align="flex-start" w="full">
          <HStack gap={2} color="text.accent">
            <Box as={MapPin} boxSize={4} aria-hidden="true" />
            <Text fontWeight="700" fontSize="xs" textTransform="uppercase" letterSpacing="0.15em">
              Dirección Principal
            </Text>
          </HStack>
          <Box>
            <Text fontSize="md" color="text.heading" fontWeight="700">Av. Los Fresnos 1250</Text>
            <Text fontSize="sm" color="text.muted" fontWeight="500">La Molina, Lima - Perú</Text>
          </Box>
        </VStack>
      </VStack>

      {/* Botón CÓMO LLEGAR */}
      <Button
        as="a"
        href="https://maps.app.goo.gl/Nvr7jiQmJdUvQVd36"
        target="_blank"
        rel="noopener noreferrer"
        variant="aura"
        width="full"
        size="lg"
        aria-label="Cómo llegar a nuestra ubicación principal"
        mt="4"
      >
        <HStack gap={2} align="center" justify="center">
          <Box as={Navigation} boxSize={4} />
          <Text>CÓMO LLEGAR</Text>
        </HStack>
      </Button>
    </VStack>
  );
});

DefaultInfoCard.displayName = "DefaultInfoCard";


