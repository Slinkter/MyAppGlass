"use client";

/**
 * @file MobileNavV2Showcase.tsx
 * @description Prototipo interactivo del Navbar Móvil v2 (Alternativa A) para /design-system.
 * Cumple R1–R12:
 * - Marco de simulación táctil de 390px (MOBILE_FRAME_WIDTH = "390px").
 * - Contenido simulado scrolleable para probar:
 *   1. Barra transparente sobre hero (scroll = 0).
 *   2. Barra sólida con borde cálido al descender > 24px.
 *   3. Ocultamiento al scrollear hacia abajo y revelación al scrollear hacia arriba.
 *   4. Apertura y cierre del panel editorial a pantalla completa con máscara de texto y cascada.
 *   5. Acordeón suave de los 10 servicios oficiales vigentes en Firestore.
 *   6. Respeto de prefers-reduced-motion: reduce.
 * - Sin hex, rgba() ni px sueltos (salvo 1px en bordes y constantes del simulador).
 * - Jerarquía de encabezados h2 -> h3 sin saltos (R10).
 * - Touch targets >= 44px (R3).
 */

import React, { useRef, useState } from "react";
import {
  Badge,
  type BadgeProps,
  Box,
  HStack,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  Smartphone,
  Info,
  Check,
  RotateCcw,
  Sliders,
} from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { ShowcaseCard, ShowcaseStack, SubsectionLabel } from "../../components";
import { MobileNavbarV2, OFFICIAL_SERVICE_SLUGS } from "@/widgets/Navbar/mobile";
import { companyData } from "@/shared/config/company-data";

/** Constantes explícitas del marco simulador móvil (Regla R1). */
const MOBILE_FRAME_WIDTH = "390px";
const MOBILE_FRAME_HEIGHT = "680px";

const V2_NAV_FEATURES = [
  {
    title: "Barra Superior 64px",
    desc: "Logo corporativo sin deformar, botón directo de WhatsApp táctil (minH='11') y disparador táctil de 48px.",
  },
  {
    title: "Morfismo 3 líneas → X",
    desc: "Animación de 300ms (DUR_CSS.toggle) restringida estrictamente a transform y opacity (R5).",
  },
  {
    title: "Panel Editorial Papel Cálido",
    desc: "Fondo cálido bg='bg.paper', entrada 650ms y salida 450ms con EASE_PANEL sin backdrop-filter pesado.",
  },
  {
    title: "Máscara de Texto 01–05",
    desc: "translateY(105% → 0) en 500ms con retardo escalonado de 60ms por ítem tras +200ms del panel.",
  },
  {
    title: "Acordeón de Servicios",
    desc: "gridTemplateRows 0fr → 1fr con los 10 servicios oficiales de Firestore. Sin slugs inventados.",
  },
  {
    title: "Accesibilidad ARIA & Android",
    desc: "useFocusTrap con retorno al toggle, cierre con Escape, scroll locked y captura de botón Atrás (popstate).",
  },
] as const;

export const MobileNavV2Showcase: React.FC = () => {
  const phoneScrollRef = useRef<HTMLDivElement>(null);

  // Estados de control para la previsualización interactiva
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [forceScrolled, setForceScrolled] = useState(false);
  const [isReducedMotionSimulated, setIsReducedMotionSimulated] = useState(false);

  const handleReset = () => {
    setIsMenuOpen(false);
    setForceScrolled(false);
    setIsReducedMotionSimulated(false);
    if (phoneScrollRef.current) {
      phoneScrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleScrollToContent = () => {
    if (phoneScrollRef.current) {
      phoneScrollRef.current.scrollTo({ top: 180, behavior: "smooth" });
    }
  };

  return (
    <ShowcaseStack>
      <ShowcaseCard
        title="Navbar Móvil v2 (Alternativa A)"
        description="Encabezado móvil de alta gama con revelación por dirección de scroll, panel cálido a pantalla completa, máscara tipográfica escalonada y acordeón técnico oficial."
        badge={
          <HStack gap="1.5">
            <Smartphone size={16} aria-hidden="true" style={{ flexShrink: 0 }} />
            <Text as="span">390 px Mobile First</Text>
          </HStack>
        }
      >
        <VStack align="stretch" gap="6">
          {/* Fila de controles interactivos de demostración */}
          <Box
            p="4"
            borderRadius="card"
            borderWidth="1px"
            borderColor="border.warm"
            bg="bg.warm"
          >
            <VStack align="stretch" gap="3">
              <HStack justify="space-between" wrap="wrap" gap="2">
                <HStack gap="2">
                  <Sliders size={16} aria-hidden="true" style={{ flexShrink: 0 }} />
                  <Heading as="h3" fontSize="sm" fontWeight="700" color="text.heading">
                    Controles del simulador
                  </Heading>
                </HStack>
                <Button
                  variant="outline"
                  size="sm"
                  minH="11"
                  gap="2"
                  onClick={handleReset}
                >
                  <RotateCcw size={16} aria-hidden="true" style={{ flexShrink: 0 }} />
                  Reiniciar vista
                </Button>
              </HStack>

              <HStack wrap="wrap" gap="3">
                <Button
                  variant={(isMenuOpen ? "navy" : "outlineNavy") as unknown as ButtonProps["variant"]}
                  size="sm"
                  minH="11"
                  onClick={() => setIsMenuOpen((prev) => !prev)}
                >
                  {isMenuOpen ? "Cerrar menú móvil" : "Abrir menú móvil"}
                </Button>

                <Button
                  variant={(forceScrolled ? "navy" : "outline") as unknown as ButtonProps["variant"]}
                  size="sm"
                  minH="11"
                  onClick={() => setForceScrolled((prev) => !prev)}
                >
                  {forceScrolled ? "Modo scrolled activo (>24px)" : "Forzar modo sólido (>24px)"}
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  minH="11"
                  onClick={handleScrollToContent}
                >
                  Scrollear simulador (+180px)
                </Button>

                <Button
                  variant={(isReducedMotionSimulated ? "navy" : "outline") as unknown as ButtonProps["variant"]}
                  size="sm"
                  minH="11"
                  onClick={() => setIsReducedMotionSimulated((prev) => !prev)}
                >
                  {isReducedMotionSimulated
                    ? "Movimiento reducido activo (150ms fade)"
                    : "Simular reduced-motion"}
                </Button>
              </HStack>
            </VStack>
          </Box>

          {/* Área del simulador interactivo de 390px */}
          <VStack align="center" w="full" py="2">
            <SubsectionLabel textAlign="center" mb="2">
              Vista previa embebida · Dispositivo 390 × 680 px (iPhone 14 / estándar mobile)
            </SubsectionLabel>

            {/* Marco de teléfono físico */}
            <Box
              position="relative"
              w="full"
              maxW={MOBILE_FRAME_WIDTH}
              h={MOBILE_FRAME_HEIGHT}
              borderRadius="3xl"
              borderWidth="1px"
              borderColor="border.warmStrong"
              bg="bg.page"
              overflow="hidden"
              boxShadow="elevatedLg"
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
              {/* Barra superior de estado simulada del smartphone (notch / reloj / batería) */}
              <HStack
                position="absolute"
                top="0"
                left="0"
                right="0"
                h="6"
                px="6"
                justify="space-between"
                align="center"
                zIndex={1400}
                pointerEvents="none"
                userSelect="none"
              >
                <Text fontSize="xs" fontWeight="700" color="text.muted">
                  9:41
                </Text>
                <HStack gap="1.5">
                  <Box w="3" h="2" borderRadius="xs" bg="text.muted" />
                  <Box w="2" h="2" borderRadius="full" bg="text.muted" />
                </HStack>
              </HStack>

              {/* Componente Navbar Móvil v2 contenido en el marco */}
              <MobileNavbarV2
                contained={true}
                forceScrolled={forceScrolled}
                scrollContainerRef={phoneScrollRef}
                isOpen={isMenuOpen}
                onOpenChange={setIsMenuOpen}
              />

              {/* Contenedor scrolleable simulado de la página web */}
              <Box
                ref={phoneScrollRef}
                h="full"
                w="full"
                overflowY="auto"
                overscrollBehavior="contain"
                bg="bg.page"
                tabIndex={0}
                aria-label="Contenido simulado del teléfono"
                _focusVisible={{
                  outline: "2px solid",
                  outlineColor: "ring.primary",
                  outlineOffset: "-2px",
                }}
              >
                {/* Hero Section simulada */}
                <Box
                  pt="24"
                  pb="12"
                  px="5"
                  bg="bg.warm"
                  borderBottomWidth="1px"
                  borderColor="border.warm"
                >
                  <VStack align="stretch" gap="3">
                    <Badge
                      variant={"navy" as unknown as BadgeProps["variant"]}
                      alignSelf="flex-start"
                      px="2.5"
                      py="1"
                      borderRadius="full"
                    >
                      Arquitectura & Aislamiento
                    </Badge>
                    <Heading
                      as="h3"
                      fontFamily="heading"
                      fontSize="2xl"
                      fontWeight="700"
                      color="text.heading"
                      lineHeight="shorter"
                    >
                      Ventanas Antirruido y Mamparas a Medida
                    </Heading>
                    <Text fontSize="sm" color="text.muted" lineHeight="relaxed">
                      Sistemas herméticos de aluminio y vidrio templado en La Molina y Lima.
                      Reduce hasta un 80% del ruido exterior.
                    </Text>
                    <HStack pt="2" gap="3">
                      <Button
                        variant={"navy" as unknown as ButtonProps["variant"]}
                        size="sm"
                        minH="11"
                      >
                        Cotizar ahora
                      </Button>
                      <Button variant="outline" size="sm" minH="11">
                        Ver catálogo
                      </Button>
                    </HStack>
                  </VStack>
                </Box>

                {/* Contenido scrolleable para activar el cambio de estado */}
                <VStack align="stretch" gap="4" p="5">
                  <Box>
                    <SubsectionLabel mb="1">Instrucciones de prueba</SubsectionLabel>
                    <Text fontSize="sm" color="text.body">
                      Haz scroll dentro de esta pantalla hacia abajo para ver cómo la barra
                      superior pasa de transparente a sólida al superar los 24px, se oculta
                      al seguir bajando y reaparece al subir.
                    </Text>
                  </Box>

                  {/* Tarjetas representativas del catálogo */}
                  <Box
                    p="4"
                    borderRadius="card"
                    borderWidth="1px"
                    borderColor="border.default"
                    bg="bg.surface"
                  >
                    <Text fontSize="xs" fontWeight="700" color="accent.navy" textTransform="uppercase">
                      Sistema Nova · Serie 25 / 35 / 62
                    </Text>
                    <Text fontSize="md" fontWeight="600" color="text.heading" mt="1">
                      Ventanas Antirruido
                    </Text>
                    <Text fontSize="sm" color="text.muted" mt="1">
                      Aislamiento acústico de alto desempeño con vidrio laminado y templado.
                    </Text>
                  </Box>

                  <Box
                    p="4"
                    borderRadius="card"
                    borderWidth="1px"
                    borderColor="border.default"
                    bg="bg.surface"
                  >
                    <Text fontSize="xs" fontWeight="700" color="accent.navy" textTransform="uppercase">
                      Vidrio Templado 8 y 10 mm
                    </Text>
                    <Text fontSize="md" fontWeight="600" color="text.heading" mt="1">
                      Mamparas para Terrazas
                    </Text>
                    <Text fontSize="sm" color="text.muted" mt="1">
                      Diseño contemporáneo y máxima seguridad para exteriores y divisiones.
                    </Text>
                  </Box>

                  <Box
                    p="4"
                    borderRadius="card"
                    borderWidth="1px"
                    borderColor="border.default"
                    bg="bg.surface"
                  >
                    <Text fontSize="xs" fontWeight="700" color="accent.navy" textTransform="uppercase">
                      Acero Inoxidable & Cristal
                    </Text>
                    <Text fontSize="md" fontWeight="600" color="text.heading" mt="1">
                      Barandas y Pasamanos
                    </Text>
                    <Text fontSize="sm" color="text.muted" mt="1">
                      Elegancia arquitectónica con fijación empotrada o botones distanciadores.
                    </Text>
                  </Box>

                  {/* Pie simulado */}
                  <Box pt="6" pb="12" textAlign="center">
                    <Text fontSize="xs" color="text.muted">
                      {companyData.companyName}
                    </Text>
                    <Text fontSize="xs" color="text.muted" mt="1">
                      {companyData.direccion}
                    </Text>
                  </Box>
                </VStack>
              </Box>
            </Box>
          </VStack>

          {/* Especificaciones y reglas de negocio */}
          <Box pt="4" borderTopWidth="1px" borderColor="border.warm">
            <Heading as="h3" fontSize="md" fontWeight="700" color="text.heading" mb="3">
              Criterios de Aceptación y Reglas de Diseño Implementadas
            </Heading>

            <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap="4">
              {V2_NAV_FEATURES.map((item) => (
                <Box
                  key={item.title}
                  p="3.5"
                  borderRadius="card"
                  borderWidth="1px"
                  borderColor="border.subtle"
                  bg="bg.warm"
                >
                  <HStack gap="2" align="center" mb="1">
                    <Check size={16} aria-hidden="true" style={{ flexShrink: 0 }} />
                    <Text fontSize="sm" fontWeight="700" color="text.heading">
                      {item.title}
                    </Text>
                  </HStack>
                  <Text fontSize="xs" color="text.muted" lineHeight="normal">
                    {item.desc}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>

            {/* Nota oficial sobre los 10 servicios vs los 3 pendientes en Firestore */}
            <Box
              mt="5"
              p="4"
              borderRadius="card"
              borderWidth="1px"
              borderColor="status.infoBorder"
              bg="status.infoSoft"
            >
              <HStack align="flex-start" gap="3">
                <Info size={20} aria-hidden="true" style={{ flexShrink: 0 }} />
                <Box>
                  <Text fontSize="sm" fontWeight="700" color="status.infoText">
                    Gobernanza de Catálogo (10 servicios oficiales activos)
                  </Text>
                  <Text fontSize="xs" color="text.body" mt="1" lineHeight="relaxed">
                    El acordeón de navegación incluye exclusivamente los 10 servicios con
                    página estática generada en <code>/servicios/[serviceSlug]</code>:{" "}
                    <strong>{OFFICIAL_SERVICE_SLUGS.map((s) => s.slug).join(", ")}</strong>.
                    Los 3 servicios nuevos aprobados por gerencia (Espejos decorativos, Frenos
                    hidráulicos y Mantenimiento correctivo) se encuentran actualmente pendientes
                    de alta en la base de datos Firestore y se conectarán de forma dinámica una vez
                    disponibles sin alterar la estructura estática.
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
