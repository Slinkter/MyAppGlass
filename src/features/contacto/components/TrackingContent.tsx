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
import { TrackingResult } from "@/features/contacto/hooks/useContactForm";

interface TrackingContentProps {
  trackingId: string;
  isTracking: boolean;
  trackingResult: TrackingResult | null;
  handleTrackingChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTrackingSubmit: (e: React.FormEvent) => void;
}

export function TrackingContent({
  trackingId,
  isTracking,
  trackingResult,
  handleTrackingChange,
  handleTrackingSubmit,
}: TrackingContentProps) {
  return (
    <VStack align="flex-start" gap="4" w="full">
      <Text fontSize="sm" color="text.muted">
        Ingresa el código de seguimiento asignado a tu cotización o reclamo previo para conocer su estado actual.
      </Text>
      
      <HStack w="full" as="form" onSubmit={handleTrackingSubmit}>
        <Input 
          variant="subtle" 
          placeholder="Ej. resend-id-..." 
          size="md" 
          value={trackingId}
          onChange={handleTrackingChange}
          borderRadius="xl"
        />
        <Button 
          size="md" 
          variant="aura" 
          type="submit" 
          loading={isTracking}
          px="6"
          borderRadius="xl"
        >
          <Search size={16} style={{ marginRight: '6px' }} /> BUSCAR
        </Button>
      </HStack>

      {trackingResult && (
        <Box w="full" p="4" bg="whiteAlpha.100" borderRadius="xl" borderLeft="4px solid" borderColor="text.accent">
          <VStack align="flex-start" gap={2}>
            <Text fontSize="xs" color="text.muted" textTransform="uppercase" fontWeight="700" letterSpacing="widest">
              TIPO: {trackingResult.type}
            </Text>
            <HStack justify="space-between" w="full">
              <Text fontWeight="bold" fontSize="base">{trackingResult.name}</Text>
              <Badge colorPalette={trackingResult.status === "RECIBIDO" ? "blue" : "green"} variant="solid" px="2.5" py="0.5">
                {trackingResult.status}
              </Badge>
            </HStack>
            <Text fontSize="xs" color="text.muted">
              Código: <strong>{trackingResult.id}</strong>
            </Text>
            <Text fontSize="xs" color="text.muted">
              Fecha de Registro: {new Date(trackingResult.createdAt).toLocaleDateString()}
            </Text>
          </VStack>
        </Box>
      )}
    </VStack>
  );
}
