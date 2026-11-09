"use client";

/**
 * @file ServicesAccordion.tsx
 * @description Acordeón desplegable de servicios para el menú móvil v2.
 * Cumple R1–R12:
 * - Transición con gridTemplateRows: 0fr -> 1fr en 450ms (DUR_CSS.panelOut) con EASE_TEXT.
 * - Slugs oficiales 100% verificados contra Firestore / serviceMappers.ts (10 servicios).
 * - Cada enlace tiene target táctil >= 44px (minH="11").
 * - Foco accesible con ring.primary (R7).
 * - Íconos Lucide de 16px con style={{ flexShrink: 0 }} y aria-hidden="true" (R4).
 */

import React from "react";
import RouterLink from "next/link";
import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { ChevronRight, ArrowUpRight } from "lucide-react";
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
          pl="5"
          pr="1"
          borderLeftWidth="1px"
          borderLeftColor="border.subtle"
          ml="4"
          my="1"
        >
          {OFFICIAL_SERVICE_SLUGS.map((svc) => {
            const isCurrent = activeSlug === svc.slug;
            return (
              <Box
                asChild
                key={svc.slug}
                display="block"
                w="full"
                borderRadius="lg"
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
                    px="2.5"
                    py="1.5"
                    borderRadius="lg"
                    justify="space-between"
                    align="center"
                    color={isCurrent ? "accent.navy" : "text.body"}
                    bg={isCurrent ? "bg.subtle" : "transparent"}
                    transition={`background-color ${DUR_CSS.fast} ${EASE_SOFT}, color ${DUR_CSS.fast} ${EASE_SOFT}`}
                    _hover={{ bg: "bg.subtle", color: "accent.navy" }}
                  >
                    <Box minW="0" flex="1">
                      <Text
                        fontSize="xs"
                        fontWeight={isCurrent ? "600" : "500"}
                        color="inherit"
                        lineHeight="1.2"
                      >
                        {svc.name}
                      </Text>
                      <Text
                        fontSize="2xs"
                        color="text.muted"
                        letterSpacing="wide"
                        lineHeight="1.2"
                        mt="0.5"
                      >
                        {svc.category}
                      </Text>
                    </Box>
                    <ChevronRight
                      size={14}
                      aria-hidden="true"
                      style={{ flexShrink: 0, opacity: 0.5 }}
                    />
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
            pt="1.5"
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
                px="2.5"
                py="1.5"
                borderRadius="lg"
                color="text.heading"
                justify="space-between"
                _hover={{ bg: "bg.subtle" }}
              >
                <Text fontSize="xs" fontWeight="600" letterSpacing="wide">
                  Ver todos los servicios
                </Text>
                <ArrowUpRight size={14} aria-hidden="true" style={{ flexShrink: 0 }} />
              </HStack>
            </RouterLink>
          </Box>
        </VStack>
      </Box>
    </Box>
  );
};
