"use client";

import React from "react";
import { Box, HStack, Text, VStack, chakra } from "@chakra-ui/react";
import { Clock, MapPin, MessageCircle, Navigation } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { companyData } from "@/shared/config/company-data";
import { TOUCH_MIN } from "@/shared/constants/layout";
import type { StoreLocation } from "@/shared/types/map";
import { STORE_DIRECTIONS_URL, STORE_SCHEDULE } from "@/features/location/useLocationData";

const WHATSAPP_URL = `https://wa.me/${companyData.whatsappNumber}?text=${encodeURIComponent(companyData.whatsappMessage)}`;

interface SplitStorePanelProps {
  store: StoreLocation;
  selected: boolean;
  onSelect: () => void;
}

/** Sede fija del panel: seleccionable (centra el mapa) con acciones siempre visibles. */
export const SplitStorePanel: React.FC<SplitStorePanelProps> = React.memo(({ store, selected, onSelect }) => (
  <Box
    p={{ base: "3", lg: "4" }}
    borderRadius="2xl"
    borderWidth="1px"
    borderColor={selected ? "primary.500" : "border.default"}
    bg={selected ? "bg.subtle" : "bg.surface"}
    transition="border-color 0.2s ease, background-color 0.2s ease"
    _motionReduce={{ transition: "none" }}
  >
    <chakra.button
      type="button"
      onClick={onSelect}
      aria-current={selected ? "true" : undefined}
      aria-label={`Ver la sede ${store.name} en el mapa`}
      w="full"
      minH={TOUCH_MIN}
      textAlign="left"
      borderRadius="lg"
      cursor="pointer"
      _focusVisible={{ outline: "2px solid", outlineColor: "primary.500", outlineOffset: "2px" }}
    >
      <Text fontSize="xs" fontWeight="700" textTransform="uppercase" letterSpacing="0.15em" color="text.accent">
        Nuestra sede
      </Text>
      <Text fontSize="md" fontWeight="700" color="text.heading" lineClamp={1}>
        {companyData.razonSocial}
      </Text>
      <VStack align="flex-start" gap="1" mt="1" color="text.muted" fontSize="sm">
        <HStack gap="2" minW={0} align="flex-start">
          <Box as={MapPin} boxSize={4} mt="0.5" aria-hidden="true" style={{ flexShrink: 0 }} />
          <Text minW={0}>{store.address}</Text>
        </HStack>
        <HStack gap="2" minW={0} align="flex-start">
          <Box as={Clock} boxSize={4} mt="0.5" aria-hidden="true" style={{ flexShrink: 0 }} />
          <Text minW={0}>
            {STORE_SCHEDULE.days} · {STORE_SCHEDULE.hours}
          </Text>
        </HStack>
      </VStack>
    </chakra.button>
    <HStack gap="2" mt="3" flexWrap={{ base: "wrap", sm: "nowrap" }}>
      <Button
        as="a"
        href={STORE_DIRECTIONS_URL}
        target="_blank"
        rel="noopener noreferrer"
        variant="primary"
        flex="1"
        minW="140px"
        minH={TOUCH_MIN}
        h={TOUCH_MIN}
        aria-label="Cómo llegar a la sede en Google Maps"
      >
        <Box as={Navigation} boxSize={4} style={{ flexShrink: 0 }} />
        Cómo llegar
      </Button>
      <Button
        as="a"
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        variant="whatsapp"
        flex="1"
        minW="140px"
        minH={TOUCH_MIN}
        h={TOUCH_MIN}
        aria-label="Escribir por WhatsApp a Glass & Aluminum Company"
      >
        <Box as={MessageCircle} boxSize={4} style={{ flexShrink: 0 }} />
        WhatsApp
      </Button>
    </HStack>
  </Box>
));
SplitStorePanel.displayName = "SplitStorePanel";
