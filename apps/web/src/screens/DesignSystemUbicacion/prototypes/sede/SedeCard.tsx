"use client";

import React from "react";
import { Box, Heading, HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { Clock, MapPin, Navigation, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { companyData } from "@/shared/config/company-data";
import { TOUCH_MIN } from "@/shared/constants/layout";
import LocationMapLazy from "@/features/location/LocationMapLazy";
import { STORE_DIRECTIONS_URL, STORE_ID, STORE_SCHEDULE } from "@/features/location/useLocationData";
import { useIsStoreOpen } from "@/features/location/useIsStoreOpen";

const WHATSAPP_URL = `https://wa.me/${companyData.whatsappNumber}?text=${encodeURIComponent(
  companyData.whatsappMessage,
)}`;
const noop = () => undefined;

const OpenBadge: React.FC = () => {
  const isOpen = useIsStoreOpen();
  if (isOpen === null) return <Skeleton h="7" w="28" borderRadius="full" />;
  return (
    <HStack
      gap="2"
      px="3"
      py="1"
      borderRadius="full"
      bg={isOpen ? "status.successSoft" : "status.dangerSoft"}
      color={isOpen ? "status.success" : "status.danger"}
      role="status"
    >
      <Box boxSize="2" borderRadius="full" bg="currentColor" flexShrink={0} />
      <Text fontSize="sm" fontWeight="bold">
        {isOpen ? "Abierto ahora" : "Cerrado"}
      </Text>
    </HStack>
  );
};

/** Hero de la sección: datos de la sede, contacto y mini-mapa. */
export const SedeCard: React.FC = React.memo(() => (
  <SimpleGrid
    columns={{ base: 1, lg: 2 }}
    bg="bg.surface"
    border="1px solid"
    borderColor="border.default"
    borderRadius="3xl"
    overflow="hidden"
    boxShadow="sm"
  >
    <VStack align="stretch" gap={{ base: "5", md: "6" }} p={{ base: "5", md: "8" }} minW={0}>
      <VStack align="flex-start" gap="3">
        <OpenBadge />
        <Text fontSize="xs" fontWeight="bold" letterSpacing="widest" textTransform="uppercase" color="text.accent">
          Nuestra sede
        </Text>
        <Heading as="h3" fontSize={{ base: "xl", md: "3xl" }} color="text.heading" lineHeight="tight">
          {companyData.razonSocial}
        </Heading>
        <HStack align="flex-start" gap="2" color="text.heading" minW={0}>
          <MapPin size={20} style={{ flexShrink: 0, marginTop: 4 }} aria-hidden />
          <Text fontSize={{ base: "md", md: "xl" }} fontWeight="semibold">
            {companyData.direccion}, Lima
          </Text>
        </HStack>
        <HStack align="flex-start" gap="2" color="text.muted" minW={0}>
          <Clock size={18} style={{ flexShrink: 0, marginTop: 3 }} aria-hidden />
          <Text fontSize={{ base: "sm", md: "md" }}>
            {STORE_SCHEDULE.days} · {STORE_SCHEDULE.hours}
          </Text>
        </HStack>
      </VStack>

      <VStack align="stretch" gap="3">
        <Button
          asChild
          variant="primary"
          minH={TOUCH_MIN}
          aria-label="Cómo llegar a la sede en Google Maps (se abre en una pestaña nueva)"
        >
          <a href={STORE_DIRECTIONS_URL} target="_blank" rel="noopener noreferrer">
            <Navigation size={18} style={{ flexShrink: 0 }} aria-hidden />
            Cómo llegar
          </a>
        </Button>
        <SimpleGrid columns={{ base: 1, sm: 2 }} gap="3">
          <Button
            asChild
            variant="whatsapp"
            minH={TOUCH_MIN}
            aria-label="Escribir por WhatsApp (se abre en una pestaña nueva)"
          >
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            minH={TOUCH_MIN}
            aria-label={`Llamar al ${companyData.whatsappDisplay}`}
          >
            <a href={`tel:+${companyData.whatsappNumber}`}>
              <Phone size={18} style={{ flexShrink: 0 }} aria-hidden />
              {companyData.whatsappDisplay}
            </a>
          </Button>
        </SimpleGrid>
      </VStack>
    </VStack>

    <Box h={{ base: "280px", lg: "auto" }} minH={{ lg: "340px" }} position="relative">
      <LocationMapLazy
        projects={[]}
        selectedId={STORE_ID}
        onSelect={noop}
        showStore
        showRecenter={false}
      />
    </Box>
  </SimpleGrid>
));
SedeCard.displayName = "SedeCard";
