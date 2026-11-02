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
import { GLASS_FALLBACK_CSS, TOUCH_MIN } from "@/shared/constants/layout";
import {
  STORE_DIRECTIONS_URL,
  STORE_SCHEDULE,
  type LocationProject,
} from "../useLocationData";
import { useIsStoreOpen } from "@/features/location/useIsStoreOpen";
import { Cover } from "./Cover";

const WHATSAPP_URL = `https://wa.me/${companyData.whatsappNumber}?text=${encodeURIComponent(companyData.whatsappMessage)}`;

/**
 * Superficie Liquid Glass Regular (`liquid-glass.md › Cross-platform translation`):
 * - `blur(24px) saturate(1.4)` con relleno translúcido y borde de 1px.
 * - Respeta `prefers-reduced-transparency` y `prefers-contrast: more` cayendo a superficie opaca.
 */
const liquidGlassRegular = {
  bg: "bg.surface/88",
  backdropFilter: "blur(24px) saturate(1.4)",
  borderWidth: "1px",
  borderColor: "border.default",
  borderRadius: "2xl",
  boxShadow: "xl",
  css: {
    WebkitBackdropFilter: "blur(24px) saturate(1.4)",
    ...GLASS_FALLBACK_CSS,
  },
} as const;

/** Posicionamiento Place Card (`maps.md › Place cards` y `layout.md › Visual hierarchy`). */
const placeCardAnchor = {
  position: "absolute",
  top: { base: "3", lg: "5" },
  left: { base: "3", lg: "5" },
  right: { base: "16", md: "auto" },
  w: { md: "336px", lg: "356px" },
  zIndex: 2,
} as const;

export interface StorePanelProps {
  address: string;
  projectCount: number;
  selected: boolean;
  onSelectStore: () => void;
}

/**
 * Place Card de la Sede Principal (`maps.md › Place cards`, `liquid-glass.md › Color on glass`).
 * - Una sola acción prominente con relleno (`Cómo llegar`, `variant="aura"`) y secundaria monocromática (`variant="outline"`).
 * - Estado de apertura comunicado con texto + indicador visual (`accessibility.md › Vision`: nunca solo por color).
 */
export const StorePanel: React.FC<StorePanelProps> = React.memo(
  ({ address, projectCount, selected, onSelectStore }) => {
    const isOpen = useIsStoreOpen();
    const statusLabel = isOpen === null ? "Lun–Sáb" : isOpen ? "Abierto" : "Cerrado";

    return (
      <Box
        as="section"
        aria-label="Sede principal de GYA"
        {...placeCardAnchor}
        {...liquidGlassRegular}
        p={{ base: "2.5", md: "5" }}
      >
        {/* Vista compacta en móvil (base): Place Card conciso con separación de 8px entre controles */}
        <HStack gap="2.5" align="center" display={{ base: "flex", md: "none" }} minW={0}>
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
            <Box minW={0} flex="1">
              <HStack gap="1.5" align="center">
                <Box
                  w="2"
                  h="2"
                  borderRadius="full"
                  bg={isOpen === null ? "text.muted" : isOpen ? "status.success" : "status.danger"}
                  flexShrink={0}
                />
                <Text fontSize="xs" fontWeight="700" color="text.heading" truncate>
                  Sede La Molina · {statusLabel}
                </Text>
              </HStack>
              <Text fontSize="xs" color="text.muted" truncate mt="0.5">
                {address}
              </Text>
            </Box>
          </Box>

          <HStack gap="2" flexShrink={0}>
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
              variant="outline"
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

        {/* Vista Place Card completa en tablet y escritorio (md+) */}
        <VStack align="stretch" gap="4" display={{ base: "none", md: "flex" }}>
          <HStack justify="space-between" align="center">
            <HStack gap="2" role="status">
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
                letterSpacing="0.12em"
                textTransform="uppercase"
                color="text.muted"
              >
                {isOpen === null ? "Sede Principal" : isOpen ? "Abierto ahora" : "Cerrado ahora"}
              </Text>
            </HStack>
            <Text fontSize="xs" fontWeight="600" color="text.muted">
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

          <HStack gap="2.5">
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
              flex="1"
              minH={TOUCH_MIN}
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
 * Place Card de obra seleccionada (`maps.md › Place cards`, `liquid-glass.md › Review checklist`).
 * - Evita apilar vidrio sobre vidrio: los controles sobre la foto usan capa de atenuación del 35% (`rgba(0,0,0,0.45)`) sin `backdrop-filter` anidado.
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
      {...placeCardAnchor}
      {...liquidGlassRegular}
      overflow="hidden"
      p={{ base: "2.5", md: "0" }}
    >
      {/* Vista compacta en móvil (base): Place Card conciso con 8px de separación entre botones */}
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
          <Text fontSize="xs" color="text.muted" truncate mt="0.5">
            {[project.address, `${project.distanceKm.toLocaleString("es-PE")} km`].filter(Boolean).join(" · ")}
          </Text>
        </Box>
        <HStack gap="2" flexShrink={0}>
          <Button asChild variant="aura" minW={TOUCH_MIN} h={TOUCH_MIN} p="0" borderRadius="xl">
            <RouterLink href={href} aria-label={`Ver la obra ${project.name}`}>
              <ArrowUpRight size={17} aria-hidden="true" style={{ flexShrink: 0 }} />
            </RouterLink>
          </Button>
          <Button
            variant="outline"
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

      {/* Vista Place Card completa en tablet y escritorio (md+) */}
      <Box display={{ base: "none", md: "block" }}>
        <Box position="relative" h="188px" bg="bg.subtle" overflow="hidden">
          <Cover key={activePhoto} src={activePhoto} alt={`Foto de ${project.name}`} />

          {/* Atenuación inferior del 35% sobre media brillante (`liquid-glass.md › Which variant`) */}
          <Box
            position="absolute"
            inset={0}
            background="linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 50%, rgba(0,0,0,0.25) 100%)"
            pointerEvents="none"
            zIndex={1}
          />

          {/* Controles de galería sin apilar blur sobre blur (`liquid-glass.md › Restraint`) */}
          {gallery.length > 1 && (
            <Flex
              position="absolute"
              insetX="2.5"
              bottom="2.5"
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
                bg="bg.surface"
                onClick={() => setPhotoIdx((i) => (i === 0 ? gallery.length - 1 : i - 1))}
                aria-label="Foto anterior"
              >
                <ChevronLeft size={16} aria-hidden="true" style={{ flexShrink: 0 }} />
              </Button>
              <Box px="2.5" py="0.5" borderRadius="full" bg="bg.surface">
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
                bg="bg.surface"
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
              bg="bg.surface"
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
