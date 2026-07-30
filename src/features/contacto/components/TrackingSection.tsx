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

interface TrackingSectionProps {
  trackingId: string;
  isTracking: boolean;
  trackingResult: TrackingResult | null;
  handleTrackingChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTrackingSubmit: (e: React.FormEvent) => void;
}

export function TrackingSection({
  trackingId,
  isTracking,
  trackingResult,
  handleTrackingChange,
  handleTrackingSubmit,
}: TrackingSectionProps) {
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
            variant="subtle" 
            placeholder="Ej. resend-id-..." 
            size="sm" 
            value={trackingId}
            onChange={handleTrackingChange}
            borderRadius="lg"
          />
          <Button 
            size="sm" 
            variant="aura" 
            type="submit" 
            loading={isTracking}
            px="6"
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
