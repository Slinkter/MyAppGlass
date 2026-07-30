"use client";

import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Input,
  Badge,
} from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import AuraSurface from "@/shared/components/aura/AuraSurface";
import { TrackingResult } from "@/features/contacto/hooks/useContactForm";
import { useColorModeValue } from "@/components/ui/color-mode-hooks";

/**
 * @file TrackingSection.tsx
 * @description Sección de consulta y seguimiento en tiempo real de cotizaciones y reclamos.
 * @module features/contacto/components
 */

interface TrackingSectionProps {
  trackingId: string;
  isTracking: boolean;
  trackingResult: TrackingResult | null;
  handleTrackingChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTrackingSubmit: (e: React.FormEvent) => void;
}

/**
 * @component TrackingSection
 * @description Renderiza el buscador de estado de cotización por ID único.
 */
export function TrackingSection({
  trackingId,
  isTracking,
  trackingResult,
  handleTrackingChange,
  handleTrackingSubmit,
}: TrackingSectionProps) {
  const inputBg = useColorModeValue("rgba(240, 242, 245, 0.85)", "rgba(24, 24, 27, 0.75)");
  const inputBorderColor = useColorModeValue("rgba(0, 0, 0, 0.15)", "rgba(255, 255, 255, 0.18)");
  const inputHoverBorderColor = useColorModeValue("rgba(0, 0, 0, 0.3)", "rgba(255, 255, 255, 0.35)");

  return (
    <AuraSurface p="6" variant="glass">
      <VStack align="flex-start" gap="4">
        <HStack gap="2" color="text.accent">
          <Search size={18} />
          <Heading size="xs" textTransform="uppercase" letterSpacing="widest" fontWeight="800">
            Consultar Estado de Solicitud
          </Heading>
        </HStack>
        <Text fontSize="xs" color="text.muted">
          ¿Ya enviaste una cotización o reclamo? Ingresa tu código de seguimiento aquí.
        </Text>
        
        <HStack w="full" as="form" onSubmit={handleTrackingSubmit}>
          <Input 
            variant="outline" 
            placeholder="Ej. resend-id-..." 
            size="md" 
            value={trackingId}
            onChange={handleTrackingChange}
            borderRadius="xl"
            bg={inputBg}
            borderWidth="1px"
            borderColor={inputBorderColor}
            _hover={{ borderColor: inputHoverBorderColor }}
            _focus={{ 
              bg: useColorModeValue("white", "blackAlpha.800"),
              borderColor: "primary.500",
              boxShadow: "0 0 0 2px var(--chakra-colors-primary-500)"
            }}
          />
          <Button 
            size="md" 
            variant="aura" 
            type="submit" 
            loading={isTracking}
            px="6"
            borderRadius="xl"
          >
            BUSCAR
          </Button>
        </HStack>

        {trackingResult && (
          <Box w="full" p="3" bg="whiteAlpha.100" borderRadius="lg" borderLeft="4px solid" borderColor="text.accent">
            <VStack align="flex-start" gap={1}>
              <Text fontSize="2xs" color="text.muted" textTransform="uppercase" fontWeight="700">
                {trackingResult.type}
              </Text>
              <HStack justify="space-between" w="full">
                <Text fontWeight="bold" fontSize="sm">{trackingResult.name}</Text>
                <Badge colorPalette={trackingResult.status === "RECIBIDO" ? "blue" : "green"} variant="solid" fontSize="10px">
                  {trackingResult.status}
                </Badge>
              </HStack>
              <Text fontSize="2xs" color="text.muted">
                ID: {trackingResult.id.substring(0, 18)}...
              </Text>
              <Text fontSize="2xs" color="text.muted">
                Fecha: {new Date(trackingResult.createdAt).toLocaleDateString()}
              </Text>
            </VStack>
          </Box>
        )}
      </VStack>
    </AuraSurface>
  );
}
