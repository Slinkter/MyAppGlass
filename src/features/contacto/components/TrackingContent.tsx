"use client";

import {
  Box,
  VStack,
  Text,
  Badge,
  HStack,
  Input,
  SimpleGrid,
} from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { Search, CheckCircle2, Clock, FileSearch, CheckCheck } from "lucide-react";
import { TrackingResult } from "@/features/contacto/hooks/useContactForm";

interface TrackingContentProps {
  trackingId: string;
  isTracking: boolean;
  trackingResult: TrackingResult | null;
  handleTrackingChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTrackingSubmit: (e: React.FormEvent) => void;
}

const STAGES = [
  { id: "RECIBIDO", label: "Registrado", icon: CheckCircle2 },
  { id: "EN_REVISION", label: "En Revisión", icon: FileSearch },
  { id: "EN_PROCESO", label: "En Proceso", icon: Clock },
  { id: "ATENDIDO", label: "Atendido", icon: CheckCheck },
];

function getStageIndex(status: string) {
  const index = STAGES.findIndex((s) => s.id === status);
  return index === -1 ? 0 : index;
}

export function TrackingContent({
  trackingId,
  isTracking,
  trackingResult,
  handleTrackingChange,
  handleTrackingSubmit,
}: TrackingContentProps) {
  const currentStageIndex = trackingResult ? getStageIndex(trackingResult.status) : 0;

  return (
    <VStack align="flex-start" gap="4" w="full">
      <Text fontSize="sm" color="text.muted">
        Ingresa el código de seguimiento asignado a tu cotización o reclamo previo para conocer su estado actual.
      </Text>
      
      <HStack w="full" as="form" onSubmit={handleTrackingSubmit}>
        <Input 
          variant="subtle" 
          placeholder="Ej. resend-id-... o código oficial" 
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
        <Box w="full" p="4" bg="whiteAlpha.100" _dark={{ bg: "blackAlpha.400" }} borderRadius="xl" border="1px solid" borderColor="border.glass">
          <VStack align="flex-start" gap={3} w="full">
            <HStack justify="space-between" w="full" wrap="wrap" gap="2">
              <VStack align="start" gap="0">
                <Text fontSize="2xs" color="text.muted" textTransform="uppercase" fontWeight="700" letterSpacing="widest">
                  {trackingResult.type}
                </Text>
                <Text fontWeight="800" fontSize="base" color="text.heading">{trackingResult.name}</Text>
              </VStack>
              <Badge colorPalette={trackingResult.status === "ATENDIDO" ? "green" : "blue"} variant="solid" px="2.5" py="0.5">
                {trackingResult.status}
              </Badge>
            </HStack>

            {/* Timeline Stepper */}
            <SimpleGrid columns={{ base: 2, sm: 4 }} gap="2" w="full" pt="2">
              {STAGES.map((stage, idx) => {
                const isCompleted = idx <= currentStageIndex;
                const IconComponent = stage.icon;
                return (
                  <Box
                    key={stage.id}
                    p="2"
                    borderRadius="lg"
                    bg={isCompleted ? "primary.500/15" : "whiteAlpha.50"}
                    borderWidth="1px"
                    borderColor={isCompleted ? "primary.500" : "border.default"}
                    textAlign="center"
                  >
                    <HStack justify="center" mb="1">
                      <Box color={isCompleted ? "primary.500" : "gray.500"}>
                        <IconComponent size={16} />
                      </Box>
                    </HStack>
                    <Text fontSize="2xs" fontWeight={isCompleted ? "bold" : "normal"} color={isCompleted ? "text.heading" : "text.muted"}>
                      {stage.label}
                    </Text>
                  </Box>
                );
              })}
            </SimpleGrid>

            <HStack justify="space-between" w="full" pt="1" fontSize="xs" color="text.muted">
              <Text>Código: <strong>{trackingResult.id}</strong></Text>
              <Text>Fecha: {new Date(trackingResult.createdAt).toLocaleDateString()}</Text>
            </HStack>
          </VStack>
        </Box>
      )}
    </VStack>
  );
}
