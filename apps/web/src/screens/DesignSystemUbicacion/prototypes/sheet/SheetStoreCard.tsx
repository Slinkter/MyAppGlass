"use client";

import React from "react";
import { Box, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { Clock, MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { companyData } from "@/shared/config/company-data";
import { TOUCH_MIN } from "@/shared/constants/layout";
import type { StoreLocation } from "@/shared/types/map";
import { STORE_DIRECTIONS_URL, STORE_SCHEDULE } from "@/features/location/useLocationData";
import { useIsStoreOpen } from "@/features/location/useIsStoreOpen";

interface SheetStoreCardProps {
  store: StoreLocation;
  selected: boolean;
  onSelect: () => void;
}

/** Tarjeta de la sede: estado (texto + punto), dirección, horario y "Cómo llegar". */
export const SheetStoreCard: React.FC<SheetStoreCardProps> = React.memo(({ store, selected, onSelect }) => {
  const isOpen = useIsStoreOpen();
  const status = isOpen === null ? "Sede principal" : isOpen ? "Abierto ahora" : "Cerrado ahora";

  return (
    <Box
      as="section"
      aria-label="Sede principal de GYA"
      borderRadius="xl"
      borderWidth="1px"
      borderColor={selected ? "primary.500" : "border.default"}
      bg={selected ? "bg.subtle" : "bg.surface"}
      p={{ base: "3", md: "4" }}
    >
      <VStack align="stretch" gap="3">
        <Box
          as="button"
          onClick={onSelect}
          aria-pressed={selected}
          aria-label="Centrar el mapa en la sede principal"
          textAlign="left"
          cursor="pointer"
          minH={TOUCH_MIN}
          borderRadius="lg"
          _focusVisible={{ outline: "2px solid", outlineColor: "primary.500", outlineOffset: "2px" }}
        >
          <HStack gap="2" role="status">
            <Box
              w="2"
              h="2"
              borderRadius="full"
              flexShrink={0}
              bg={isOpen === null ? "text.muted" : isOpen ? "status.success" : "status.danger"}
            />
            <Text fontSize="xs" fontWeight="700" letterSpacing="0.12em" textTransform="uppercase" color="text.muted">
              {status}
            </Text>
          </HStack>
          <Heading as="h3" fontSize="md" fontWeight="800" color="text.heading" mt="1" lineClamp={2}>
            {companyData.razonSocial}
          </Heading>
          <HStack gap="1.5" mt="1.5" color="text.muted" fontSize="xs" align="start">
            <MapPin size={14} aria-hidden="true" style={{ flexShrink: 0, marginTop: 2 }} />
            <Text minW={0} flex="1">
              {store.address}
            </Text>
          </HStack>
          <HStack gap="1.5" mt="1" color="text.muted" fontSize="xs">
            <Clock size={14} aria-hidden="true" style={{ flexShrink: 0 }} />
            <Text minW={0} flex="1">
              {STORE_SCHEDULE.days} · {STORE_SCHEDULE.hours}
            </Text>
          </HStack>
        </Box>
        <Button asChild variant="aura" minH={TOUCH_MIN} w="full">
          <a
            href={STORE_DIRECTIONS_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Cómo llegar a la sede en Google Maps"
          >
            <Navigation size={16} aria-hidden="true" style={{ flexShrink: 0 }} />
            Cómo llegar
          </a>
        </Button>
      </VStack>
    </Box>
  );
});
SheetStoreCard.displayName = "SheetStoreCard";
