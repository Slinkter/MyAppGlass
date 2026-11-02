"use client";

import React from "react";
import { Box, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import RouterLink from "next/link";
import { Clock, MapPin, Navigation, X, ArrowUpRight, MessageCircle, Route } from "lucide-react";
import { Button } from "@/components/ui/button";
import { companyData } from "@/shared/config/company-data";
import { TOUCH_MIN } from "@/shared/constants/layout";
import { STORE_DIRECTIONS_URL, STORE_SCHEDULE, type LocationProject } from "../../location/useLocationData";
import { Cover } from "./Cover";

const WHATSAPP_URL = `https://wa.me/${companyData.whatsappNumber}?text=${encodeURIComponent(companyData.whatsappMessage)}`;

/** Vidrio esmerilado con tokens del tema. */
const glass = {
  bg: "bg.surface/90",
  backdropFilter: "blur(14px)",
  border: "1px solid",
  borderColor: "border.default",
  borderRadius: "2xl",
  boxShadow: "lg",
} as const;

/** Posición: esquina superior izquierda; en base/md deja libre la esquina derecha (re-centrar). */
const anchor = {
  position: "absolute",
  top: "3",
  left: "3",
  right: { base: "16", lg: "auto" },
  w: { lg: "340px" },
  zIndex: 2,
} as const;

export interface StorePanelProps {
  address: string;
  projectCount: number;
  selected: boolean;
  onSelectStore: () => void;
}

export const StorePanel: React.FC<StorePanelProps> = ({ address, projectCount, selected, onSelectStore }) => (
  <Box as="section" aria-label="Sede principal de GYA" {...anchor} {...glass} p={{ base: "3", lg: "5" }}>
    <VStack align="stretch" gap={{ base: "2", lg: "4" }}>
      <HStack gap="3" align="center" minW={0}>
        <Box
          as="button"
          onClick={onSelectStore}
          aria-pressed={selected}
          aria-label="Centrar el mapa en la sede"
          display="flex"
          alignItems="center"
          gap="2"
          minW={0}
          flex="1"
          minH={TOUCH_MIN}
          textAlign="left"
          borderRadius="lg"
          cursor="pointer"
          _focusVisible={{ outline: "2px solid", outlineColor: "primary.500", outlineOffset: "2px" }}
        >
          <Box color="text.accent" flexShrink={0} display="flex">
            <MapPin size={18} aria-hidden="true" style={{ flexShrink: 0 }} />
          </Box>
          <Box minW={0}>
            <Heading as="h3" fontSize={{ base: "sm", lg: "md" }} color="text.heading" fontWeight="800" truncate>
              {companyData.razonSocial}
            </Heading>
            <Text fontSize="xs" color="text.muted" truncate>
              {address}
            </Text>
          </Box>
        </Box>
        {/* Acciones compactas (base/md) */}
        <HStack gap="1" display={{ base: "flex", lg: "none" }} flexShrink={0}>
          <Button as="a" href={STORE_DIRECTIONS_URL} target="_blank" rel="noopener noreferrer" variant="aura" aria-label="Cómo llegar a la sede" minW={TOUCH_MIN} h={TOUCH_MIN} p="0">
            <Navigation size={18} aria-hidden="true" style={{ flexShrink: 0 }} />
          </Button>
          <Button as="a" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" variant="whatsapp" aria-label="Escribir por WhatsApp" minW={TOUCH_MIN} h={TOUCH_MIN} p="0">
            <MessageCircle size={18} aria-hidden="true" style={{ flexShrink: 0 }} />
          </Button>
        </HStack>
      </HStack>

      {/* Detalle completo (lg) */}
      <VStack align="stretch" gap="4" display={{ base: "none", lg: "flex" }}>
        <HStack gap="2" color="text.muted" align="flex-start">
          <Box color="text.accent" mt="0.5" display="flex">
            <Clock size={16} aria-hidden="true" style={{ flexShrink: 0 }} />
          </Box>
          <Text fontSize="sm">
            <Text as="span" fontWeight="700" color="text.heading">{STORE_SCHEDULE.days}</Text>
            {" · "}{STORE_SCHEDULE.hours}
          </Text>
        </HStack>
        <HStack gap="2">
          <Button as="a" href={STORE_DIRECTIONS_URL} target="_blank" rel="noopener noreferrer" variant="aura" flex="1" minH={TOUCH_MIN} aria-label="Cómo llegar a la sede">
            <Navigation size={16} aria-hidden="true" style={{ flexShrink: 0 }} /> Cómo llegar
          </Button>
          <Button as="a" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" variant="whatsapp" flex="1" minH={TOUCH_MIN} aria-label="Escribir por WhatsApp">
            <MessageCircle size={16} aria-hidden="true" style={{ flexShrink: 0 }} /> WhatsApp
          </Button>
        </HStack>
        <Text fontSize="xs" color="text.muted" fontWeight="600">
          {projectCount} obras entregadas
        </Text>
      </VStack>
    </VStack>
  </Box>
);

export interface ProjectDetailProps {
  project: LocationProject;
  onClose: () => void;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onClose }) => {
  const href = project.href ?? `/proyectos/ver?id=${project.id}`;
  return (
    <Box as="section" aria-label={`Detalle de la obra ${project.name}`} {...anchor} {...glass} overflow="hidden" p={{ base: "3", lg: "0" }}>
      <Box display="flex" flexDirection={{ base: "row", lg: "column" }} gap="3" alignItems={{ base: "center", lg: "stretch" }}>
        <Box
          position="relative"
          overflow="hidden"
          bg="bg.subtle"
          flexShrink={0}
          w={{ base: "56px", lg: "full" }}
          h={{ base: "56px", lg: "160px" }}
          borderRadius={{ base: "lg", lg: "0" }}
        >
          <Cover key={project.id} src={project.image} alt={`Portada de ${project.name}`} />
        </Box>
        <VStack align="stretch" gap={{ base: "0", lg: "3" }} minW={0} flex="1" p={{ base: "0", lg: "5" }} pt={{ lg: "1" }}>
          <Box minW={0}>
            <Heading as="h3" fontSize={{ base: "sm", lg: "lg" }} color="text.heading" fontWeight="800" lineClamp={{ base: 1, lg: 2 }}>
              {project.name}
            </Heading>
            <Text fontSize="xs" color="text.muted" truncate>
              {project.residencial}
            </Text>
            <Text fontSize="xs" color="text.muted" truncate>
              {[project.address, project.year].filter(Boolean).join(" · ")}
            </Text>
            <HStack gap="1" color="text.accent" mt="1" display={{ base: "none", lg: "flex" }}>
              <Route size={14} aria-hidden="true" style={{ flexShrink: 0 }} />
              <Text fontSize="xs" fontWeight="700">{project.distanceKm.toLocaleString("es-PE")} km de la sede</Text>
            </HStack>
          </Box>
          <Button asChild variant="aura" minH={TOUCH_MIN} display={{ base: "none", lg: "inline-flex" }}>
            <RouterLink href={href} aria-label={`Ver la obra ${project.name}`}>
              Ver obra <ArrowUpRight size={16} aria-hidden="true" style={{ flexShrink: 0 }} />
            </RouterLink>
          </Button>
        </VStack>
        <HStack gap="1" display={{ base: "flex", lg: "none" }} flexShrink={0}>
          <Button asChild variant="aura" minW={TOUCH_MIN} h={TOUCH_MIN} p="0">
            <RouterLink href={href} aria-label={`Ver la obra ${project.name}`}>
              <ArrowUpRight size={18} aria-hidden="true" style={{ flexShrink: 0 }} />
            </RouterLink>
          </Button>
          <Button
            variant="ghost"
            onClick={onClose}
            aria-label="Cerrar detalle de la obra"
            minW={TOUCH_MIN}
            h={TOUCH_MIN}
            p="0"
          >
            <X size={18} aria-hidden="true" style={{ flexShrink: 0 }} />
          </Button>
        </HStack>
      </Box>
      <Box
        position="absolute"
        top="2"
        right="2"
        display={{ base: "none", lg: "block" }}
      >
        <Button
          variant="outline"
          onClick={onClose}
          aria-label="Cerrar detalle de la obra"
          minW={TOUCH_MIN}
          h={TOUCH_MIN}
          p="0"
          borderRadius="full"
          bg="bg.surface/90"
        >
          <X size={18} aria-hidden="true" style={{ flexShrink: 0 }} />
        </Button>
      </Box>
    </Box>
  );
};
