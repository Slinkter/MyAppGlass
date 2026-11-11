"use client";

import React, { useState } from "react";
import { Box, Flex, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import RouterLink from "next/link";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Route,
  X,
} from "lucide-react";
import { Button } from "@/shared/ui/button";
import { TOUCH_MIN } from "@/shared/constants/layout";
import { type LocationProject } from "../useLocationData";
import { Cover } from "./Cover";
import { liquidGlassRegular, placeCardAnchor } from "./floatingPanelStyles";

export interface ProjectDetailProps {
  project: LocationProject;
  onClose: () => void;
}

/**
 * Place Card de obra seleccionada (`maps.md › Place cards`, `liquid-glass.md › Review checklist`).
 * - Evita apilar vidrio sobre vidrio: los controles sobre la foto usan capa de atenuación `overlay.dim` sin `backdrop-filter` anidado.
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
          <Heading as="h3" fontSize="xs" color="text.heading" fontWeight="700" lineClamp={1}>
            {project.residencial || project.name}
          </Heading>
          <Text fontSize="xs" color="text.muted" truncate mt="0.5">
            {[project.address, `${project.distanceKm.toLocaleString("es-PE")} km`].filter(Boolean).join(" · ")}
          </Text>
        </Box>
        <HStack gap="2" flexShrink={0}>
          <Button
            asChild
            variant="primary"
            minW={TOUCH_MIN}
            minH={TOUCH_MIN}
            h={TOUCH_MIN}
            w={TOUCH_MIN}
            p="0"
            borderRadius="xl"
          >
            <RouterLink
              href={href}
              aria-label={`Ver la obra ${project.name}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
                minWidth: "44px",
                minHeight: "44px",
              }}
            >
              <ArrowUpRight size={17} aria-hidden="true" style={{ flexShrink: 0 }} />
            </RouterLink>
          </Button>
          <Button
            variant="outline"
            onClick={onClose}
            aria-label="Cerrar detalle de la obra"
            minW={TOUCH_MIN}
            minH={TOUCH_MIN}
            h={TOUCH_MIN}
            w={TOUCH_MIN}
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
            background="overlay.dim"
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
                minH={TOUCH_MIN}
                h={TOUCH_MIN}
                w={TOUCH_MIN}
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
                minH={TOUCH_MIN}
                h={TOUCH_MIN}
                w={TOUCH_MIN}
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
              minH={TOUCH_MIN}
              h={TOUCH_MIN}
              w={TOUCH_MIN}
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
              fontWeight="700"
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

          <Button asChild variant="primary" size="sm" minH={TOUCH_MIN} minW={TOUCH_MIN} h={TOUCH_MIN} borderRadius="xl" w="full">
            <RouterLink
              href={href}
              aria-label={`Ver detalles de la obra ${project.name}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "100%",
                minHeight: "44px",
              }}
            >
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
