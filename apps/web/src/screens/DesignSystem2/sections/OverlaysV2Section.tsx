"use client";

import React, { useEffect, useRef, useState } from "react";
import { Box, Heading, HStack, Image, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { Expand, MapPin, X } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { companyData } from "@/shared/config/company-data";
import { SectionHeaderV2 } from "../components/SectionHeaderV2";
import {
  ARCH_BORDER,
  ARCH_SURFACE,
  ARCH_TEXT,
  FIREBASE_PROJECTS,
  OPTICAL_GLASS,
} from "../components/architecturalTokens";

const LIGHTBOX_PLATES = [
  FIREBASE_PROJECTS.palmer,
  FIREBASE_PROJECTS.elenor,
  FIREBASE_PROJECTS.vittorie,
] as const;

export const OverlaysV2Section: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    lastFocusedRef.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      lastFocusedRef.current?.focus();
    };
  }, [open]);

  const currentPlate = LIGHTBOX_PLATES[activeIndex] ?? LIGHTBOX_PLATES[0];

  return (
    <VStack align="stretch" gap={6}>
      <SectionHeaderV2
        code="05 · Modales & Visor Lightbox HUD"
        title="Capas de Inspección y Diálogos"
        description="El HUD del visor de obra y diálogo constituye la tercera y última superficie óptica (blur 16px), con cierre por teclado Escape, coordenadas en tabular-nums y controles ≥ 44 px."
        spec="CAPA ÓPTICA 10% · LIGHTBOX HUD"
      />

      <SimpleGrid columns={{ base: 1, lg: 12 }} gap={0} border="1px solid" borderColor={ARCH_BORDER.hairline}>
        {/* Left: Matte Control Trigger */}
        <Box
          gridColumn={{ lg: "span 7" }}
          p={{ base: 5, md: 7 }}
          bg={ARCH_SURFACE.steel}
          borderBottom={{ base: "1px solid", lg: "none" }}
          borderRight={{ lg: "1px solid" }}
          borderColor={ARCH_BORDER.hairline}
        >
          <Text fontFamily="mono" fontSize="xs" letterSpacing="0.16em" color={ARCH_TEXT.onDarkPrimary} mb={2}>
            VISOR ARQUITECTÓNICO DE OBRA
          </Text>
          <Heading fontFamily="heading" size="xl" color={ARCH_TEXT.onDarkPrimary} mb={3}>
            Lightbox con HUD Óptico y Telemetría
          </Heading>
          <Text fontSize="sm" color={ARCH_TEXT.onDarkMuted} lineHeight="1.6" mb={6}>
            Permite a constructoras y arquitectos inspeccionar acabados reales de perfilería y vidrio, con selector de láminas y coordinación directa de visita técnica.
          </Text>

          <HStack gap={3} flexWrap="wrap">
            <Button
              variant="primary"
              minH="44px"
              onClick={() => {
                setActiveIndex(0);
                setOpen(true);
              }}
            >
              <Expand size={16} aria-hidden="true" /> Abrir visor de obra
            </Button>
            <Button
              variant="outline"
              minH="44px"
              onClick={() => {
                setActiveIndex(1);
                setOpen(true);
              }}
            >
              Inspeccionar Elenor (Surco)
            </Button>
          </HStack>
        </Box>

        {/* Right: Concrete Spec Preview */}
        <Box
          gridColumn={{ lg: "span 5" }}
          p={{ base: 5, md: 7 }}
          bg={ARCH_SURFACE.concrete}
          color={ARCH_TEXT.onConcretePrimary}
        >
          <Text fontFamily="mono" fontSize="xs" fontWeight="700" color={ARCH_TEXT.onConcreteMuted} mb={3}>
            PROTOCOLO DE ACCESIBILIDAD MODAL
          </Text>
          <VStack align="stretch" gap={2.5} fontSize="sm">
            <HStack justify="space-between" pb={2} borderBottom="1px solid" borderColor={ARCH_BORDER.concreteHairline}>
              <Text>Cierre por teclado</Text>
              <Text fontFamily="mono" fontWeight="700">ESC</Text>
            </HStack>
            <HStack justify="space-between" pb={2} borderBottom="1px solid" borderColor={ARCH_BORDER.concreteHairline}>
              <Text>Botón cerrar mínimo</Text>
              <Text fontFamily="mono" fontWeight="700" fontVariantNumeric="tabular-nums">44 × 44 px</Text>
            </HStack>
            <HStack justify="space-between">
              <Text>Backdrop óptico</Text>
              <Text fontFamily="mono" fontWeight="700" fontVariantNumeric="tabular-nums">blur(16px)</Text>
            </HStack>
          </VStack>
        </Box>
      </SimpleGrid>

      {open && (
        <Box
          position="fixed"
          inset="0"
          zIndex="modal"
          bg="rgba(11, 12, 14, 0.86)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          p={{ base: 3, md: 6 }}
          role="dialog"
          aria-modal="true"
          aria-label={`Visor de obra ${currentPlate.name}`}
          onClick={() => setOpen(false)}
        >
          <Box
            maxW="880px"
            w="full"
            borderRadius="xl"
            overflow="hidden"
            bg={OPTICAL_GLASS.bgHud}
            backdropFilter={OPTICAL_GLASS.backdropFilter}
            border={OPTICAL_GLASS.border}
            borderColor={OPTICAL_GLASS.borderColor}
            boxShadow="0 24px 64px rgba(0, 0, 0, 0.65)"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Optical HUD Bar */}
            <HStack
              justify="space-between"
              px={{ base: 4, md: 6 }}
              py={3}
              borderBottom="1px solid"
              borderColor={ARCH_BORDER.hairline}
            >
              <HStack gap={3}>
                <Box w="8px" h="8px" bg="brand.coral" />
                <Text fontFamily="mono" fontSize="xs" fontWeight="700" letterSpacing="0.16em" color={ARCH_TEXT.onDarkPrimary} fontVariantNumeric="tabular-nums">
                  HUD DE INSPECCIÓN · {currentPlate.code} / 0{LIGHTBOX_PLATES.length}
                </Text>
              </HStack>
              <Button
                ref={closeBtnRef}
                variant="ghost"
                minW="44px"
                minH="44px"
                color={ARCH_TEXT.onDarkPrimary}
                onClick={() => setOpen(false)}
                aria-label="Cerrar visor"
              >
                <X size={18} aria-hidden="true" />
              </Button>
            </HStack>

            {/* Architectural Plate Viewport */}
            <Box position="relative" h={{ base: "240px", md: "380px" }} bg={ARCH_SURFACE.graphite}>
              <Image
                src={currentPlate.webImage}
                alt={`${currentPlate.name} — ${currentPlate.district}`}
                w="full"
                h="full"
                objectFit="cover"
                objectPosition="top"
              />
              <HStack
                position="absolute"
                bottom={3}
                left={3}
                px={3}
                py={1.5}
                bg={ARCH_SURFACE.graphite}
                border="1px solid"
                borderColor={ARCH_BORDER.hairlineStrong}
                borderRadius="sm"
                gap={2}
              >
                <MapPin size={14} color={ARCH_TEXT.onDarkPrimary} aria-hidden="true" />
                <Text fontFamily="mono" fontSize="xs" color={ARCH_TEXT.onDarkPrimary} fontVariantNumeric="tabular-nums">
                  {currentPlate.district} · {currentPlate.coordinates}
                </Text>
              </HStack>
            </Box>

            {/* Bottom HUD Controls & Metadata */}
            <Box p={{ base: 4, md: 6 }}>
              <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} alignItems="center">
                <Box>
                  <Heading fontFamily="heading" size="lg" color={ARCH_TEXT.onDarkPrimary}>
                    Obra {currentPlate.name}
                  </Heading>
                  <Text fontFamily="mono" fontSize="xs" color={ARCH_TEXT.onDarkMuted} mt={1} fontVariantNumeric="tabular-nums">
                    {currentPlate.system} · {currentPlate.year} · {companyData.razonSocial}
                  </Text>
                </Box>

                <HStack justify={{ base: "flex-start", md: "flex-end" }} gap={2} flexWrap="wrap">
                  {LIGHTBOX_PLATES.map((plate, idx) => (
                    <Button
                      key={plate.code}
                      size="sm"
                      minH="44px"
                      variant={idx === activeIndex ? "primary" : "outline"}
                      aria-pressed={idx === activeIndex}
                      onClick={() => setActiveIndex(idx)}
                    >
                      {plate.code} · {plate.name}
                    </Button>
                  ))}
                </HStack>
              </SimpleGrid>
            </Box>
          </Box>
        </Box>
      )}
    </VStack>
  );
};
