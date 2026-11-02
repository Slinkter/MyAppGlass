"use client";

import React, { useState } from "react";
import { Box, Flex, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import RouterLink from "next/link";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  MessageCircle,
  Navigation,
  Route,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { companyData } from "@/shared/config/company-data";
import { TOUCH_MIN } from "@/shared/constants/layout";
import {
  STORE_DIRECTIONS_URL,
  STORE_SCHEDULE,
  type LocationProject,
} from "../../location/useLocationData";
import { useIsStoreOpen } from "../sede/useIsStoreOpen";
import { Cover } from "./Cover";

const WHATSAPP_URL = `https://wa.me/${companyData.whatsappNumber}?text=${encodeURIComponent(companyData.whatsappMessage)}`;

/** Superficie minimalista tipo lente de vidrio esmerilado con borde de perfil fino. */
const glassSurface = {
  bg: "bg.surface/92",
  backdropFilter: "blur(20px)",
  borderWidth: "1px",
  borderColor: "border.default",
  borderRadius: "2xl",
  boxShadow: "xl",
} as const;

/** Posicionamiento flotante: esquina superior izquierda, respetando el botón de recentrar en móvil/tablet. */
const floatingAnchor = {
  position: "absolute",
  top: { base: "3", lg: "5" },
  left: { base: "3", lg: "5" },
  right: { base: "16", md: "auto" },
  w: { md: "340px", lg: "360px" },
  zIndex: 2,
} as const;

export interface StorePanelProps {
  address: string;
  projectCount: number;
  selected: boolean;
  onSelectStore: () => void;
}

/**
 * Panel flotante minimalista de la Sede Principal.
 * En móvil se comporta como una cápsula ultracompacta para dejar libre el 85% del mapa;
 * en tablet/escritorio despliega la tarjeta arquitectónica con estado en vivo y acciones limpias.
 */
export const StorePanel: React.FC<StorePanelProps> = React.memo(
  ({ address, projectCount, selected, onSelectStore }) => {
    const isOpen = useIsStoreOpen();

    return (
      <Box
        as="section"
        aria-label="Sede principal de GYA"
        {...floatingAnchor}
        {...glassSurface}
        p={{ base: "2.5", md: "5" }}
      >
        {/* Vista compacta en móvil (base): cápsula de 1 línea + acciones rápidas */}
        <HStack gap="2" align="center" display={{ base: "flex", md: "none" }} minW={0}>
          <Box
            as="button"
            onClick={onSelectStore}
            aria-pressed={selected}
            aria-label="Centrar el mapa en la sede principal"
            display="flex"
            alignItems="center"
            gap="2.5"
            minW={0}
            flex="1"
            minH={TOUCH_MIN}
            px="1"
            textAlign="left"
            borderRadius="xl"
            cursor="pointer"
            _focusVisible={{ outline: "2px solid", outlineColor: "primary.500", outlineOffset: "2px" }}
          >
            <Box
              w="2"
              h="2"
              borderRadius="full"
              bg={isOpen ? "status.success" : "text.accent"}
              flexShrink={0}
            />
            <Box minW={0} flex="1">
              <Text fontSize="xs" fontWeight="700" color="text.heading" truncate>
                Sede La Molina · {projectCount} obras
              </Text>
              <Text fontSize="xs" color="text.muted" truncate>
                {address}
              </Text>
            </Box>
          </Box>

          <HStack gap="1" flexShrink={0}>
            <Button
              asChild
              variant="aura"
              minW={TOUCH_MIN}
              h={TOUCH_MIN}
              p="0"
              borderRadius="xl"
            >
              <a
                href={STORE_DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Cómo llegar a la sede"
              >
                <Navigation size={16} aria-hidden="true" style={{ flexShrink: 0 }} />
              </a>
            </Button>
            <Button
              asChild
              variant="whatsapp"
              minW={TOUCH_MIN}
              h={TOUCH_MIN}
              p="0"
              borderRadius="xl"
            >
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Escribir por WhatsApp"
              >
                <MessageCircle size={16} aria-hidden="true" style={{ flexShrink: 0 }} />
              </a>
            </Button>
          </HStack>
        </HStack>

        {/* Vista editorial minimalista en tablet y escritorio (md+) */}
        <VStack align="stretch" gap="4" display={{ base: "none", md: "flex" }}>
          <HStack justify="space-between" align="center">
            <HStack gap="2">
              <Box
                w="2"
                h="2"
                borderRadius="full"
                bg={isOpen === null ? "text.muted" : isOpen ? "status.success" : "status.danger"}
                flexShrink={0}
              />
              <Text
                fontSize="xs"
                fontWeight="700"
                letterSpacing="0.14em"
                textTransform="uppercase"
                color="text.muted"
              >
                {isOpen === null ? "Sede Principal" : isOpen ? "Abierto ahora" : "Cerrado ahora"}
              </Text>
            </HStack>
            <Text fontSize="xs" fontWeight="600" color="text.accent">
              {projectCount} obras
            </Text>
          </HStack>

          <Box
            as="button"
            onClick={onSelectStore}
            aria-pressed={selected}
            aria-label="Centrar el mapa en la sede principal"
            textAlign="left"
            cursor="pointer"
            borderRadius="lg"
            _focusVisible={{ outline: "2px solid", outlineColor: "primary.500", outlineOffset: "2px" }}
          >
            <Heading
              as="h3"
              fontSize="md"
              fontWeight="800"
              letterSpacing="tight"
              color="text.heading"
              lineClamp={1}
            >
              {companyData.razonSocial}
            </Heading>
            <HStack gap="1.5" mt="1.5" color="text.muted" fontSize="xs">
              <MapPin size={14} aria-hidden="true" style={{ flexShrink: 0 }} />
              <Text truncate>{address}</Text>
            </HStack>
            <HStack gap="1.5" mt="1" color="text.muted" fontSize="xs">
              <Clock size={14} aria-hidden="true" style={{ flexShrink: 0 }} />
              <Text>
                {STORE_SCHEDULE.days} · {STORE_SCHEDULE.hours}
              </Text>
            </HStack>
          </Box>

          <Box h="1px" bg="border.default" />

          <HStack gap="2">
            <Button
              asChild
              variant="aura"
              size="sm"
              flex="1"
              minH={TOUCH_MIN}
              borderRadius="xl"
            >
              <a
                href={STORE_DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Cómo llegar a la sede en Google Maps"
              >
                <Navigation size={15} aria-hidden="true" style={{ flexShrink: 0 }} />
                Cómo llegar
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="sm"
              minH={TOUCH_MIN}
              px="3.5"
              borderRadius="xl"
            >
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Escribir por WhatsApp"
              >
                <MessageCircle size={15} aria-hidden="true" style={{ flexShrink: 0 }} />
                WhatsApp
              </a>
            </Button>
          </HStack>
        </VStack>
      </Box>
    );
  },
);
StorePanel.displayName = "StorePanel";

export interface ProjectDetailProps {
  project: LocationProject;
  onClose: () => void;
}

/**
 * Ficha flotante minimalista de obra seleccionada.
 * Incluye galería limpia si la obra tiene varias fotos, distancia a la sede y acceso directo.
 */
export const ProjectDetail: React.FC<ProjectDetailProps> = React.memo(({ project, onClose }) => {
  const href = project.href ?? `/proyectos/ver?id=${project.id}`;
  const gallery = [
    project.image,
    ...(project.photosObra ?? []).map((p) => p.image),
  ].filter((src, idx, arr): src is string => Boolean(src) && arr.indexOf(src) === idx);

  const [photoIdx, setPhotoIdx] = useState(0);
  const activePhoto = gallery[Math.min(photoIdx, Math.max(0, gallery.length - 1))] ?? project.image;

  return (
    <Box
      as="section"
      aria-label={`Detalle de la obra ${project.name}`}
      {...floatingAnchor}
      {...glassSurface}
      overflow="hidden"
      p={{ base: "2.5", md: "0" }}
    >
      {/* Vista compacta en móvil (base): miniatura + datos clave + acciones 44px */}
      <HStack gap="2.5" align="center" display={{ base: "flex", md: "none" }} minW={0}>
        <Box
          position="relative"
          overflow="hidden"
          bg="bg.subtle"
          flexShrink={0}
          w="48px"
          h="48px"
          borderRadius="xl"
        >
          <Cover key={activePhoto} src={activePhoto} alt={`Portada de ${project.name}`} />
        </Box>
        <Box minW={0} flex="1">
          <Heading as="h3" fontSize="xs" color="text.heading" fontWeight="800" lineClamp={1}>
            {project.residencial || project.name}
          </Heading>
          <Text fontSize="xs" color="text.muted" truncate>
            {[project.address, `${project.distanceKm.toLocaleString("es-PE")} km`].filter(Boolean).join(" · ")}
          </Text>
        </Box>
        <HStack gap="1" flexShrink={0}>
          <Button asChild variant="aura" minW={TOUCH_MIN} h={TOUCH_MIN} p="0" borderRadius="xl">
            <RouterLink href={href} aria-label={`Ver la obra ${project.name}`}>
              <ArrowUpRight size={17} aria-hidden="true" style={{ flexShrink: 0 }} />
            </RouterLink>
          </Button>
          <Button
            variant="ghost"
            onClick={onClose}
            aria-label="Cerrar detalle de la obra"
            minW={TOUCH_MIN}
            h={TOUCH_MIN}
            p="0"
            borderRadius="xl"
          >
            <X size={17} aria-hidden="true" style={{ flexShrink: 0 }} />
          </Button>
        </HStack>
      </HStack>

      {/* Vista editorial minimalista en tablet y escritorio (md+) */}
      <Box display={{ base: "none", md: "block" }}>
        <Box position="relative" h="190px" bg="bg.subtle" overflow="hidden">
          <Cover key={activePhoto} src={activePhoto} alt={`Foto de ${project.name}`} />

          {/* Controles de galería minimalistas si hay más de 1 foto */}
          {gallery.length > 1 && (
            <Flex
              position="absolute"
              insetX="2"
              bottom="2"
              justify="space-between"
              align="center"
              zIndex={2}
            >
              <Button
                variant="outline"
                size="xs"
                minW={TOUCH_MIN}
                h={TOUCH_MIN}
                p="0"
                borderRadius="full"
                bg="bg.surface/85"
                onClick={() => setPhotoIdx((i) => (i === 0 ? gallery.length - 1 : i - 1))}
                aria-label="Foto anterior"
              >
                <ChevronLeft size={16} aria-hidden="true" style={{ flexShrink: 0 }} />
              </Button>
              <Box
                px="2.5"
                py="0.5"
                borderRadius="full"
                bg="bg.surface/85"
                backdropFilter="blur(8px)"
              >
                <Text fontSize="xs" fontWeight="700" color="text.heading">
                  {photoIdx + 1} / {gallery.length}
                </Text>
              </Box>
              <Button
                variant="outline"
                size="xs"
                minW={TOUCH_MIN}
                h={TOUCH_MIN}
                p="0"
                borderRadius="full"
                bg="bg.surface/85"
                onClick={() => setPhotoIdx((i) => (i === gallery.length - 1 ? 0 : i + 1))}
                aria-label="Siguiente foto"
              >
                <ChevronRight size={16} aria-hidden="true" style={{ flexShrink: 0 }} />
              </Button>
            </Flex>
          )}

          <Box position="absolute" top="2.5" right="2.5" zIndex={2}>
            <Button
              variant="outline"
              onClick={onClose}
              aria-label="Cerrar detalle de la obra"
              minW={TOUCH_MIN}
              h={TOUCH_MIN}
              p="0"
              borderRadius="full"
              bg="bg.surface/85"
            >
              <X size={16} aria-hidden="true" style={{ flexShrink: 0 }} />
            </Button>
          </Box>
        </Box>

        <VStack align="stretch" gap="3.5" p="5">
          <Box minW={0}>
            <HStack justify="space-between" align="center" gap="2">
              <Text
                fontSize="xs"
                fontWeight="700"
                letterSpacing="0.12em"
                textTransform="uppercase"
                color="text.muted"
                truncate
              >
                {[project.address, project.year].filter(Boolean).join(" · ")}
              </Text>
              <HStack gap="1" color="text.accent" flexShrink={0}>
                <Route size={13} aria-hidden="true" style={{ flexShrink: 0 }} />
                <Text fontSize="xs" fontWeight="700">
                  {project.distanceKm.toLocaleString("es-PE")} km
                </Text>
              </HStack>
            </HStack>

            <Heading
              as="h3"
              fontSize="lg"
              color="text.heading"
              fontWeight="800"
              letterSpacing="tight"
              mt="1"
              lineClamp={1}
            >
              {project.residencial || project.name}
            </Heading>
            {project.residencial && project.name !== project.residencial && (
              <Text fontSize="xs" color="text.muted" truncate mt="0.5">
                {project.name}
              </Text>
            )}
          </Box>

          <Button asChild variant="aura" size="sm" minH={TOUCH_MIN} borderRadius="xl" w="full">
            <RouterLink href={href} aria-label={`Ver detalles de la obra ${project.name}`}>
              Ver obra completa
              <ArrowUpRight size={15} aria-hidden="true" style={{ flexShrink: 0 }} />
            </RouterLink>
          </Button>
        </VStack>
      </Box>
    </Box>
  );
});
ProjectDetail.displayName = "ProjectDetail";
