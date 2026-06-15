"use client";

import React from "react";
import { Box, VStack, HStack, Text, Card } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { MapPin, Clock } from "lucide-react";

/**
 * @component DefaultInfoCard
 * @description Muestra la información de contacto por defecto de la sede central (horarios y dirección).
 */
export const DefaultInfoCard: React.FC = React.memo(() => {
  return (
    <VStack
      p="8"
      gap="14"
      w="full"
      flex={1}
      justifyContent="space-between"
      align="center"
      animation="fadeIn 0.4s ease-out"
    >
      <VStack gap="6" align="center" w="full">
        {/* Sección Horarios */}
        <Card.Root 
          w="full"
          bg="bg.subtle"
          borderWidth="1px"
          borderColor="border.default"
          borderRadius="2xl"
        >
          <Card.Body p="6">
            <VStack gap="2" align="center" w="full">
              <HStack gap={3} color="text.accent">
                <Box as={Clock} boxSize={5} aria-hidden="true" />
                <Text fontWeight="800" fontSize="xs" textTransform="uppercase" letterSpacing="0.2em">
                  Horarios
                </Text>
              </HStack>
              <Box textAlign="center">
                <Text fontSize="md" color="text.heading" fontWeight="700">Lunes a Sábado</Text>
                <Text fontSize="sm" color="text.muted">9:00 am – 5:00 pm</Text>
              </Box>
            </VStack>
          </Card.Body>
        </Card.Root>

        {/* Sección Dirección */}
        <Card.Root 
          w="full"
          bg="bg.subtle"
          borderWidth="1px"
          borderColor="border.default"
          borderRadius="2xl"
        >
          <Card.Body p="6">
            <VStack gap="2" align="center" w="full">
              <HStack gap={3} color="text.accent">
                <Box as={MapPin} boxSize={5} aria-hidden="true" />
                <Text fontWeight="800" fontSize="xs" textTransform="uppercase" letterSpacing="0.2em">
                  Dirección
                </Text>
              </HStack>
              <Box textAlign="center">
                <Text fontSize="md" color="text.heading" fontWeight="700">Av. Los Fresnos 1250</Text>
                <Text fontSize="sm" color="text.muted">La Molina, Lima - Perú</Text>
              </Box>
            </VStack>
          </Card.Body>
        </Card.Root>
      </VStack>

      <Button
        as="a"
        href="https://maps.app.goo.gl/Nvr7jiQmJdUvQVd36"
        target="_blank"
        rel="noopener noreferrer"
        variant="aura"
        width="full"
        size="xl"
        aria-label="Cómo llegar a nuestra ubicación principal"
      >
        CÓMO LLEGAR
      </Button>
    </VStack>
  );
});

DefaultInfoCard.displayName = "DefaultInfoCard";
