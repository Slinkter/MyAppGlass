"use client";

/**
 * @file MobileNavV2Showcase.tsx
 * @description Prototipo interactivo del navbar móvil v2 para /design-system.
 * El componente ya no tiene barra superior: hay un botón flotante (`MenuFab`, abajo a la derecha) y una hoja
 * inferior (`MenuOverlay`). Aquí se muestra en modo `contained` dentro de un marco de teléfono de 390 px.
 * Regla de scroll del catálogo: el marco NO tiene scroll propio (la página de ejemplo es una vista fija);
 * la única zona con scroll es la de enlaces de la hoja, que es parte del componente real.
 */

import React, { useState } from "react";
import { Badge, type BadgeProps, Box, HStack, Heading, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { Smartphone, Info, Check, RotateCcw, Sliders } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShowcaseCard, ShowcasePanel, ShowcaseStack, SubsectionLabel } from "../../components";
import { MobileNavbarV2, OFFICIAL_SERVICE_SLUGS } from "@/widgets/Navbar/mobile";

/** Marco del teléfono simulado: ancho de un móvil estándar y alto fijo sin scroll. */
const MOBILE_FRAME_WIDTH = "24.375rem";
const MOBILE_FRAME_HEIGHT = "36rem";

const V2_NAV_FEATURES = [
  {
    title: "Sin barra superior",
    desc: "La pantalla queda libre: el menú se abre con un botón flotante negro de 56 px, abajo a la derecha, en la zona del pulgar.",
  },
  {
    title: "Hoja inferior",
    desc: "Sube desde abajo con asa, logo, enlaces numerados, acordeón de servicios y pie fijo con el CTA de WhatsApp, el cambio de tema y el teléfono.",
  },
  {
    title: "Solo transform y opacity",
    desc: "Entrada de 650 ms y salida de 450 ms con la curva de panel. Con movimiento reducido solo hay un fundido de 150 ms.",
  },
  {
    title: "Una sola zona con scroll",
    desc: "Únicamente la lista de enlaces dentro de la hoja; la cabecera y el pie nunca se desplazan.",
  },
  {
    title: "Acordeón de servicios",
    desc: "Abre con gridTemplateRows 0fr a 1fr y muestra los servicios principales más el acceso «Ver todos los servicios».",
  },
  {
    title: "Accesibilidad y Android",
    desc: "Foco atrapado con retorno al botón, cierre con Escape, scroll de página bloqueado y botón Atrás de Android (fuera del marco).",
  },
] as const;

export const MobileNavV2Showcase: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isReducedMotionSimulated, setIsReducedMotionSimulated] = useState(false);

  const handleReset = () => {
    setIsMenuOpen(false);
    setIsReducedMotionSimulated(false);
  };

  return (
    <ShowcaseStack>
      <ShowcaseCard
        title="Navbar móvil v2: botón flotante y hoja inferior"
        description="Sin barra superior. Un botón flotante abre una hoja inferior con los enlaces, el CTA de WhatsApp y el teléfono. Se prueba dentro del marco; en el sitio real solo existe bajo 768 px."
        badge={
          <HStack gap="1.5">
            <Smartphone size={16} aria-hidden="true" style={{ flexShrink: 0 }} />
            <Text as="span">390 px</Text>
          </HStack>
        }
      >
        <VStack align="stretch" gap="6">
          <ShowcasePanel bg="bg.section" borderColor="border.warm" p="4">
            <VStack align="stretch" gap="3">
              <HStack justify="space-between" wrap="wrap" gap="2">
                <HStack gap="2">
                  <Sliders size={16} aria-hidden="true" style={{ flexShrink: 0 }} />
                  <Heading as="h3" fontSize="sm" fontWeight="700" color="text.heading">
                    Controles del simulador
                  </Heading>
                </HStack>
                <Button variant="outline" size="sm" minH="11" gap="2" onClick={handleReset}>
                  <RotateCcw size={16} aria-hidden="true" style={{ flexShrink: 0 }} />
                  Reiniciar vista
                </Button>
              </HStack>
              <HStack wrap="wrap" gap="3">
                <Button
                  variant={isMenuOpen ? "primary" : "outline"}
                  size="sm"
                  minH="11"
                  onClick={() => setIsMenuOpen((prev) => !prev)}
                >
                  {isMenuOpen ? "Cerrar hoja de menú" : "Abrir hoja de menú"}
                </Button>
                <Button
                  variant={isReducedMotionSimulated ? "primary" : "outline"}
                  size="sm"
                  minH="11"
                  onClick={() => setIsReducedMotionSimulated((prev) => !prev)}
                >
                  {isReducedMotionSimulated ? "Movimiento reducido activo (fundido 150 ms)" : "Simular movimiento reducido"}
                </Button>
              </HStack>
            </VStack>
          </ShowcasePanel>

          <VStack align="center" w="full" py="2">
            <SubsectionLabel textAlign="center" mb="2">
              Vista previa · marco de 390 px sin scroll propio
            </SubsectionLabel>

            <Box
              position="relative"
              w="full"
              maxW={MOBILE_FRAME_WIDTH}
              h={MOBILE_FRAME_HEIGHT}
              borderRadius="modal"
              borderWidth="3px"
              borderColor="border.strong"
              bg="bg.page"
              overflow="hidden"
              css={
                isReducedMotionSimulated
                  ? {
                      "& *, & *::before, & *::after": {
                        animationDuration: "0.01ms !important",
                        animationIterationCount: "1 !important",
                        transitionDuration: "150ms !important",
                      },
                    }
                  : undefined
              }
            >
              {/* Página de ejemplo detrás del menú: vista fija, sin scroll */}
              <Box h="full" w="full" bg="bg.page" aria-hidden="true">
                <Box pt="10" pb="8" px="5" bg="bg.section" borderBottomWidth="1px" borderColor="border.warm">
                  <VStack align="stretch" gap="3">
                    <Badge variant={"ink" as unknown as BadgeProps["variant"]} alignSelf="flex-start" px="2.5" py="1" borderRadius="full">
                      Ventanas y mamparas
                    </Badge>
                    <Heading as="h3" fontFamily="heading" fontSize="2xl" fontWeight="700" color="text.heading" lineHeight="shorter">
                      Ventanas antirruido y mamparas a medida
                    </Heading>
                    <Text fontSize="sm" color="text.muted" lineHeight="relaxed">
                      Aluminio y vidrio ensamblados en taller e instalados en La Molina y Lima.
                    </Text>
                  </VStack>
                </Box>
                <VStack align="stretch" gap="3" p="5">
                  {["Ventanas antirruido", "Mamparas para terrazas"].map((t) => (
                    <Box key={t} p="4" borderRadius="card" borderWidth="1px" borderColor="border.default" bg="bg.surface">
                      <Text fontSize="md" fontWeight="600" color="text.heading">
                        {t}
                      </Text>
                      <Text fontSize="sm" color="text.muted" mt="1">
                        Texto de ejemplo de la tarjeta.
                      </Text>
                    </Box>
                  ))}
                </VStack>
              </Box>

              <MobileNavbarV2 contained isOpen={isMenuOpen} onOpenChange={setIsMenuOpen} />
            </Box>
          </VStack>

          <Box pt="4" borderTopWidth="1px" borderColor="border.warm">
            <Heading as="h3" fontSize="md" fontWeight="700" color="text.heading" mb="3">
              Reglas que cumple
            </Heading>
            <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap="4">
              {V2_NAV_FEATURES.map((item) => (
                <ShowcasePanel key={item.title} bg="bg.section" p="3.5">
                  <HStack gap="2" align="center" mb="1">
                    <Check size={16} aria-hidden="true" style={{ flexShrink: 0 }} />
                    <Text fontSize="sm" fontWeight="700" color="text.heading">
                      {item.title}
                    </Text>
                  </HStack>
                  <Text fontSize="xs" color="text.muted" lineHeight="normal">
                    {item.desc}
                  </Text>
                </ShowcasePanel>
              ))}
            </SimpleGrid>

            <Box mt="5" p="4" borderRadius="card" borderWidth="1px" borderColor="status.infoBorder" bg="status.infoSoft">
              <HStack align="flex-start" gap="3">
                <Info size={20} aria-hidden="true" style={{ flexShrink: 0 }} />
                <Box>
                  <Text fontSize="sm" fontWeight="700" color="status.infoText">
                    Servicios del acordeón
                  </Text>
                  <Text fontSize="xs" color="text.body" mt="1" lineHeight="relaxed">
                    Páginas estáticas en <code>/servicios/[serviceSlug]</code>:{" "}
                    <strong>{OFFICIAL_SERVICE_SLUGS.map((s) => s.slug).join(", ")}</strong>. Los servicios nuevos
                    aprobados por gerencia siguen pendientes de alta en la base de datos.
                  </Text>
                </Box>
              </HStack>
            </Box>
          </Box>
        </VStack>
      </ShowcaseCard>
    </ShowcaseStack>
  );
};
