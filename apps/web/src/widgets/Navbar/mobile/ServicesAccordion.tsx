"use client";

/**
 * @file ServicesAccordion.tsx
 * @description Acordeón desplegable de servicios para el menú móvil v2.
 * - Renderiza los 6 servicios principales + "Ver todos los servicios" (el array de 10 se mantiene intacto).
 * - Transición con gridTemplateRows: 0fr -> 1fr y respeto a reduced-motion.
 * - Guía vertical en x=56 (`ml="8"`), texto alineado en x=72 (`pl="4"`), ambos sobre el gutter de 24.
 * - Ítems `minH="11"` (44 px), `fontSize="sm"`, hover/pressed de fila con `mx="-2" px="2"`.
 * - Foco accesible con ring.primary; íconos de 16 px con `aria-hidden="true"`.
 */

import React from "react";
import RouterLink from "next/link";
import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { ArrowUpRight } from "lucide-react";
import { DUR_CSS, EASE_TEXT, EASE_SOFT } from "@/shared/constants/motion";

export interface ServiceItemDef {
  slug: string;
  name: string;
  category: string;
}

/**
 * Lista canónica de los 10 servicios oficiales vigentes en /servicios/[serviceSlug].
 * Fuente de verdad: serviceMappers.ts (SERVICE_SEO_FALLBACKS).
 * Nota: Los 3 servicios proyectados (espejos, frenos hidráulicos, mantenimiento)
 * están pendientes de alta en Firestore y no deben crearse como slugs fijos aquí.
 */
// eslint-disable-next-line react-refresh/only-export-components
export const OFFICIAL_SERVICE_SLUGS: readonly ServiceItemDef[] = [
  { slug: "ventana", name: "Ventanas antirruido", category: "Sistema Nova · Series 25/35/62" },
  { slug: "mampara", name: "Mamparas de vidrio templado", category: "Divisiones y terrazas" },
  { slug: "ducha", name: "Boxes y puertas de ducha", category: "Vidrio templado a medida" },
  { slug: "parapeto", name: "Parapetos y muros cortina", category: "Fachadas arquitectónicas" },
  { slug: "baranda", name: "Barandas de vidrio y acero", category: "Escaleras y balcones" },
  { slug: "balcones", name: "Cerramientos de balcones", category: "Protección y confort" },
  { slug: "techo", name: "Techos de policarbonato", category: "Coberturas sol y sombra" },
  { slug: "pvidrio", name: "Puertas de vidrio templado", category: "Interiores y mamparas" },
  { slug: "pserie", name: "Puertas de aluminio serie", category: "Series 25, 35 y 62" },
  { slug: "celosias", name: "Celosías de ventilación", category: "Ventilación natural y lamas" },
] as const;

/** Servicios destacados en el menú móvil (el resto vive en /servicios/ver). */
const FEATURED_SERVICE_SLUGS = [
  "ventana",
  "mampara",
  "ducha",
  "parapeto",
  "baranda",
  "techo",
] as const;

const FEATURED_SERVICES = OFFICIAL_SERVICE_SLUGS.filter((svc) =>
  FEATURED_SERVICE_SLUGS.some((slug) => slug === svc.slug)
);

export interface ServicesAccordionProps {
  /** Estado de apertura del acordeón. */
  isOpen: boolean;
  /** Callback al pulsar un enlace de servicio. */
  onItemClick?: () => void;
  /** ID para asociar con aria-controls del disparador. */
  id?: string;
  /** Slug del servicio activo si corresponde. */
  activeSlug?: string;
  /** Si es true, previene la navegación global (para simulador). */
  contained?: boolean;
}

export const ServicesAccordion: React.FC<ServicesAccordionProps> = ({
  isOpen,
  onItemClick,
  id = "mobile-services-accordion",
  activeSlug,
  contained = false,
}) => {
  return (
    <Box
      id={id}
      role="region"
      aria-label="Submenú de servicios oficiales"
      display="grid"
      gridTemplateRows={isOpen ? "1fr" : "0fr"}
      transition={`grid-template-rows 300ms ${EASE_TEXT}`}
      _motionReduce={{ transition: "none" }}
      w="full"
    >
      <Box
        overflow="hidden"
        minH="0"
        visibility={isOpen ? "visible" : "hidden"}
        style={{
          opacity: isOpen ? 1 : 0,
          transition: `opacity 250ms ${EASE_SOFT}, visibility 250ms ${EASE_SOFT}`,
        }}
      >
        <VStack
          align="stretch"
          gap="0.5"
          pt="2"
          pb="3"
          ml="8"
          pl="4"
          pr="2"
          borderLeftWidth="1px"
          borderLeftColor="border.subtle"
          my="1"
        >
          {FEATURED_SERVICES.map((svc) => {
            const isCurrent = activeSlug === svc.slug;
            return (
              <Box
                asChild
                key={svc.slug}
                display="block"
                w="full"
                borderRadius="md"
                _focusVisible={{
                  outline: "2px solid",
                  outlineColor: "ring.primary",
                  outlineOffset: "2px",
                }}
              >
                <RouterLink
                  href={`/servicios/${svc.slug}`}
                  onClick={(e) => {
                    if (contained) {
                      e.preventDefault();
                    }
                    onItemClick?.();
                  }}
                  style={{ textDecoration: "none" }}
                  aria-current={isCurrent ? "page" : undefined}
                >
                  <HStack
                    minH="11"
                    mx="-2"
                    px="2"
                    py="1.5"
                    borderRadius="md"
                    align="center"
                    color={isCurrent ? "accent.navy" : "text.body"}
                    bg={isCurrent ? "bg.subtle" : "transparent"}
                    transition={`background-color ${DUR_CSS.fast} ${EASE_SOFT}, color ${DUR_CSS.fast} ${EASE_SOFT}`}
                    _hover={{ bg: "bg.subtle", color: "accent.navy" }}
                    _active={{ bg: "bg.subtle" }}
                  >
                    <Text
                      flex="1"
                      minW="0"
                      fontSize="sm"
                      fontWeight={isCurrent ? "600" : "500"}
                      color="inherit"
                      lineHeight="1.35"
                    >
                      {svc.name}
                    </Text>
                  </HStack>
                </RouterLink>
              </Box>
            );
          })}

          {/* Enlace al catálogo general de servicios */}
          <Box
            asChild
            display="block"
            w="full"
            borderRadius="md"
            _focusVisible={{
              outline: "2px solid",
              outlineColor: "ring.primary",
              outlineOffset: "2px",
            }}
          >
            <RouterLink
              href="/servicios/ver"
              onClick={(e) => {
                if (contained) {
                  e.preventDefault();
                }
                onItemClick?.();
              }}
              style={{ textDecoration: "none" }}
            >
              <HStack
                minH="11"
                mx="-2"
                px="2"
                py="1.5"
                borderRadius="md"
                color="text.heading"
                justify="space-between"
                transition={`background-color ${DUR_CSS.fast} ${EASE_SOFT}`}
                _hover={{ bg: "bg.subtle" }}
                _active={{ bg: "bg.subtle" }}
              >
                <Text fontSize="sm" fontWeight="600">
                  Ver todos los servicios
                </Text>
                <ArrowUpRight size={16} aria-hidden="true" style={{ flexShrink: 0 }} />
              </HStack>
            </RouterLink>
          </Box>
        </VStack>
      </Box>
    </Box>
  );
};
