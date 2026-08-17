"use client";

import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Input,
  Badge,
  SimpleGrid,
} from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { Search, CheckCircle2, Clock, FileSearch, CheckCheck } from "lucide-react";
import AuraSurface from "@/shared/components/aura/AuraSurface";
import { TrackingResult } from "@/features/contacto/hooks/useContactForm";
import { useColorModeValue } from "@/components/ui/color-mode-hooks";

interface TrackingSectionProps {
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

  const currentStageIndex = trackingResult ? getStageIndex(trackingResult.status) : 0;

  return (
    <AuraSurface p={{ base: "5", md: "6" }} variant="glass">
      <VStack align="flex-start" gap="4">
        <HStack gap="2" color="text.accent">
          <Search size={18} />
          <Heading size="xs" textTransform="uppercase" letterSpacing="widest" fontWeight="800">
            Consultar Estado de Solicitud
          </Heading>
        </HStack>
        <Text fontSize="xs" color="text.muted">
          ¿Ya enviaste una cotización o reclamo? Ingresa tu código de seguimiento para ver su avance en tiempo real.
        </Text>
        
        <HStack w="full" as="form" onSubmit={handleTrackingSubmit}>
          <Input 
            variant="outline" 
            placeholder="Ej. resend-id-... o código oficial" 
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
          <Box w="full" p="4" bg="whiteAlpha.100" _dark={{ bg: "blackAlpha.400" }} borderRadius="xl" border="1px solid" borderColor="border.glass">
            <VStack align="flex-start" gap="3" w="full">
              <HStack justify="space-between" w="full" wrap="wrap" gap="2">
                <VStack align="start" gap="0">
                  <Text fontSize="2xs" color="text.muted" textTransform="uppercase" fontWeight="700">
                    {trackingResult.type}
                  </Text>
                  <Text fontWeight="800" fontSize="sm" color="text.heading">{trackingResult.name}</Text>
                </VStack>
                <Badge colorPalette={trackingResult.status === "ATENDIDO" ? "green" : "blue"} variant="solid" fontSize="10px" px="2" py="0.5">
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

              <HStack justify="space-between" w="full" pt="1" fontSize="2xs" color="text.muted">
                <Text>ID: {trackingResult.id.substring(0, 20)}...</Text>
                <Text>Fecha: {new Date(trackingResult.createdAt).toLocaleDateString()}</Text>
              </HStack>
            </VStack>
          </Box>
        )}
      </VStack>
    </AuraSurface>
  );
}
