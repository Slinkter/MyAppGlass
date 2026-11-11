"use client";

import React, { useState } from "react";
import { Box, chakra, Flex, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import RouterLink from "next/link";
import { Clock, MapPin, Navigation, Route } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { TOUCH_MIN } from "@/shared/constants/layout";
import { companyData } from "@/shared/config/company-data";
import ResponsiveImage from "@shared/components/Image/ResponsiveImage";
import { ImageRevealSkeleton, useImageReveal } from "@shared/components/Image/ImageReveal";
import type { StoreLocation } from "@/shared/types/map";
import {
  STORE_DIRECTIONS_URL,
  STORE_SCHEDULE,
  type LocationProject,
} from "@/features/location/useLocationData";

const WHATSAPP_URL = `https://wa.me/${companyData.whatsappNumber}?text=${encodeURIComponent(
  companyData.whatsappMessage,
)}`;

const mapsUrl = ({ lat, lng }: { lat: number; lng: number }): string =>
  `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

/** Foto principal con skeleton y revelado; se remonta por `key` al cambiar de foto. */
const HeroPhoto: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  const { loaded, onLoad, reveal } = useImageReveal();
  return (
    <Box position="relative" overflow="hidden" borderRadius="xl" bg="bg.subtle" h={{ base: "180px", md: "200px" }}>
      <ImageRevealSkeleton loaded={loaded} />
      <Box position="absolute" inset={0} {...reveal}>
        <ResponsiveImage src={src} alt={alt} w="full" h="full" objectFit="cover" onLoad={onLoad} />
      </Box>
    </Box>
  );
};

const Gallery: React.FC<{ project: LocationProject }> = ({ project }) => {
  const [active, setActive] = useState(0);
  const photos = [
    ...(project.image ? [project.image] : []),
    ...(project.photosObra ?? []).map((p) => p.image),
  ]
    .filter((src, i, all) => all.indexOf(src) === i)
    .slice(0, 5);
  if (photos.length === 0) return null;
  const current = photos[Math.min(active, photos.length - 1)];

  return (
    <VStack align="stretch" gap="2">
      <HeroPhoto key={current} src={current} alt={`Foto de la obra ${project.name}`} />
      {photos.length > 1 && (
        <HStack gap="2" overflowX="auto" py="1" role="group" aria-label="Fotos de la obra">
          {photos.map((src, i) => (
            <chakra.button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Ver foto ${i + 1} de ${photos.length}`}
              aria-pressed={i === active}
              flexShrink={0}
              w="56px"
              h="44px"
              borderRadius="md"
              overflow="hidden"
              border="2px solid"
              borderColor={i === active ? "primary.500" : "transparent"}
              transition="border-color 0.2s ease"
              _focusVisible={{ outline: "2px solid", outlineColor: "primary.500", outlineOffset: "2px" }}
            >
              <ResponsiveImage src={src} alt="" aria-hidden="true" w="full" h="full" objectFit="cover" />
            </chakra.button>
          ))}
        </HStack>
      )}
    </VStack>
  );
};

interface ProjectDetailProps {
  /** Obra seleccionada; `null` muestra la sede. */
  project: LocationProject | null;
  store: StoreLocation;
  /** Oculta el título (cuando el Drawer ya lo muestra en su cabecera). */
  hideTitle?: boolean;
}

/** Contenido del detalle: obra seleccionada o, sin selección, la sede con horario y WhatsApp. */
export const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, store, hideTitle }) => {
  if (!project) {
    return (
      <VStack align="stretch" gap="4">
        <Box>
          <Text fontSize="xs" fontWeight="bold" letterSpacing="wider" textTransform="uppercase" color="text.accent">
            Nuestra sede
          </Text>
          {!hideTitle && (
            <Heading as="h3" fontSize="xl" color="text.heading" mt="1">
              {companyData.razonSocial}
            </Heading>
          )}
        </Box>
        <VStack align="stretch" gap="2" fontSize="sm" color="text.muted">
          <Flex gap="2" align="flex-start" minW={0}>
            <MapPin size={16} style={{ flexShrink: 0, marginTop: 3 }} aria-hidden="true" />
            <Text minW={0}>{store.address}</Text>
          </Flex>
          <Flex gap="2" align="flex-start" minW={0}>
            <Clock size={16} style={{ flexShrink: 0, marginTop: 3 }} aria-hidden="true" />
            <Text minW={0}>
              {STORE_SCHEDULE.days} · {STORE_SCHEDULE.hours}
            </Text>
          </Flex>
        </VStack>
        <VStack align="stretch" gap="2">
          <Button asChild variant="whatsapp" minH={TOUCH_MIN} minW={TOUCH_MIN} h={TOUCH_MIN}>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Escribir por WhatsApp a GYA"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
                minHeight: "44px",
              }}
            >
              Escribir por WhatsApp
            </a>
          </Button>
          <Button asChild variant="outline" minH={TOUCH_MIN} minW={TOUCH_MIN} h={TOUCH_MIN}>
            <a
              href={STORE_DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Cómo llegar a la sede de GYA"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
                minHeight: "44px",
              }}
            >
              <Navigation size={16} style={{ flexShrink: 0 }} aria-hidden="true" />
              Cómo llegar a la sede
            </a>
          </Button>
        </VStack>
        <Text fontSize="xs" color="text.muted">
          Selecciona una obra en la lista o en el mapa para ver su detalle.
        </Text>
      </VStack>
    );
  }

  return (
    <VStack align="stretch" gap="4">
      <Gallery project={project} />
      <Box minW={0}>
        {!hideTitle && (
          <Heading as="h3" fontSize="xl" color="text.heading" lineHeight="short">
            {project.name}
          </Heading>
        )}
        {project.residencial && (
          <Text fontSize="sm" color="text.heading" mt="1">
            {project.residencial}
          </Text>
        )}
        <Text fontSize="sm" color="text.muted" mt="1">
          {project.address} · {project.year}
        </Text>
        <Flex gap="2" align="center" mt="2" color="text.accent" fontSize="sm" fontWeight="semibold">
          <Route size={16} style={{ flexShrink: 0 }} aria-hidden="true" />
          <Text>A {project.distanceKm.toLocaleString("es-PE")} km de la sede</Text>
        </Flex>
      </Box>
      <VStack align="stretch" gap="2">
        {project.href && (
          <Button asChild variant="primary" minH={TOUCH_MIN} minW={TOUCH_MIN} h={TOUCH_MIN}>
            <RouterLink
              href={project.href}
              aria-label={`Ver la obra ${project.name}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
                minHeight: "44px",
              }}
            >
              Ver obra
            </RouterLink>
          </Button>
        )}
        <Button asChild variant="outline" minH={TOUCH_MIN} minW={TOUCH_MIN} h={TOUCH_MIN}>
          <a
            href={mapsUrl(project.position)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Cómo llegar a la obra ${project.name} en Google Maps`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
              minHeight: "44px",
            }}
          >
            <Navigation size={16} style={{ flexShrink: 0 }} aria-hidden="true" />
            Cómo llegar a esta obra
          </a>
        </Button>
      </VStack>
    </VStack>
  );
};
