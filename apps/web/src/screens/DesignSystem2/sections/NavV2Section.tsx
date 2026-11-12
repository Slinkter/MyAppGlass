"use client";

import React, { useState } from "react";
import { Box, Flex, HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { Compass, Home, Layers, MapPin, Phone } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { FloatingPillNavbar } from "../components/FloatingPillNavbar";
import { SectionHeaderV2 } from "../components/SectionHeaderV2";
import { ARCH_BORDER, ARCH_SURFACE, ARCH_TEXT, FIREBASE_PROJECTS } from "../components/architecturalTokens";

const DOCK_ITEMS = [
  { id: "inicio", icon: Home, label: "Inicio" },
  { id: "servicios", icon: Layers, label: "Servicios" },
  { id: "proyectos", icon: Compass, label: "Obras" },
  { id: "ubicacion", icon: MapPin, label: "Mapa" },
  { id: "contacto", icon: Phone, label: "Cotizar" },
] as const;

export const NavV2Section: React.FC = () => {
  const [activeDock, setActiveDock] = useState<string>("proyectos");

  return (
    <VStack align="stretch" gap={6}>
      <SectionHeaderV2
        code="03 · Navegación & Retícula Superior"
        title="Pill Flotante Óptico & Dock Táctil"
        description="La cápsula superior concentra la capa óptica (blur 16px) con 4 rutas oficiales de primer nivel; la barra móvil inferior mantiene superficie sólida mate con objetivos ≥ 44 px."
        spec="DESKTOP PILL (OPTICAL) · MOBILE DOCK (MATTE)"
      />

      {/* Desktop Floating Pill Navbar presented over real site backdrop */}
      <Box
        border="1px solid"
        borderColor={ARCH_BORDER.hairline}
        bg={ARCH_SURFACE.graphite}
        overflow="hidden"
      >
        <HStack
          justify="space-between"
          px={{ base: 4, md: 6 }}
          py={2.5}
          bg={ARCH_SURFACE.steel}
          borderBottom="1px solid"
          borderColor={ARCH_BORDER.hairline}
        >
          <Text fontFamily="mono" fontSize="xs" letterSpacing="0.16em" color={ARCH_TEXT.onDarkPrimary}>
            DESKTOP FLOATING PILL NAVBAR (CAPA ÓPTICA 10%)
          </Text>
          <Text fontFamily="mono" fontSize="xs" color={ARCH_TEXT.onDarkMuted} fontVariantNumeric="tabular-nums">
            1280PX · 4 RUTAS PRINCIPALES
          </Text>
        </HStack>

        <Box
          position="relative"
          py={{ base: 6, md: 10 }}
          px={{ base: 2, md: 6 }}
          backgroundImage={`linear-gradient(rgba(11,12,14,0.55), rgba(11,12,14,0.55)), url(${FIREBASE_PROJECTS.palmer.webImage})`}
          backgroundSize="cover"
          backgroundPosition="center"
        >
          <FloatingPillNavbar />
        </Box>
      </Box>

      {/* Split 12-col: Mobile Bottom Dock (Matte) + Sitemap Architecture */}
      <SimpleGrid columns={{ base: 1, lg: 12 }} gap={0} border="1px solid" borderColor={ARCH_BORDER.hairline}>
        <Box
          gridColumn={{ lg: "span 6" }}
          p={{ base: 5, md: 8 }}
          bg={ARCH_SURFACE.steel}
          borderBottom={{ base: "1px solid", lg: "none" }}
          borderRight={{ lg: "1px solid" }}
          borderColor={ARCH_BORDER.hairline}
        >
          <HStack justify="space-between" mb={6}>
            <Text fontFamily="mono" fontSize="xs" letterSpacing="0.16em" color={ARCH_TEXT.onDarkPrimary}>
              MOBILE BOTTOM DOCK (SÓLIDO MATE)
            </Text>
            <Text fontFamily="mono" fontSize="xs" color={ARCH_TEXT.onDarkMuted} fontVariantNumeric="tabular-nums">
              TARGET ≥ 44PX
            </Text>
          </HStack>

          <Flex
            maxW="360px"
            mx="auto"
            justify="space-between"
            align="center"
            p={1.5}
            borderRadius="full"
            bg={ARCH_SURFACE.graphite}
            border="1px solid"
            borderColor={ARCH_BORDER.hairlineStrong}
          >
            {DOCK_ITEMS.map((item) => {
              const IconComp = item.icon;
              const isActive = activeDock === item.id;
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "primary" : "ghost"}
                  size="sm"
                  minW="48px"
                  minH="48px"
                  px={isActive ? 3.5 : 2}
                  borderRadius="full"
                  aria-label={item.label}
                  aria-pressed={isActive}
                  bg={isActive ? ARCH_SURFACE.concrete : "transparent"}
                  color={isActive ? ARCH_TEXT.onConcretePrimary : ARCH_TEXT.onDarkPrimary}
                  _hover={
                    isActive
                      ? { bg: "white" }
                      : { bg: "rgba(255, 255, 255, 0.08)" }
                  }
                  onClick={() => setActiveDock(item.id)}
                >
                  <HStack gap={1.5}>
                    <IconComp size={17} aria-hidden="true" />
                    {isActive && (
                      <Text fontSize="xs" fontWeight="700">
                        {item.label}
                      </Text>
                    )}
                  </HStack>
                </Button>
              );
            })}
          </Flex>
        </Box>

        <Box
          gridColumn={{ lg: "span 6" }}
          p={{ base: 5, md: 8 }}
          bg={ARCH_SURFACE.concrete}
          color={ARCH_TEXT.onConcretePrimary}
        >
          <HStack justify="space-between" mb={5} pb={3} borderBottom="1px solid" borderColor={ARCH_BORDER.concreteHairline}>
            <Text fontFamily="mono" fontSize="xs" fontWeight="700" letterSpacing="0.16em" color={ARCH_TEXT.onConcreteMuted}>
              ARQUITECTURA DE RUTAS OFICIAL
            </Text>
            <Text fontFamily="mono" fontSize="xs" color={ARCH_TEXT.onConcreteMuted} fontVariantNumeric="tabular-nums">
              SITEMAP · 4+4
            </Text>
          </HStack>

          <SimpleGrid columns={2} gap={0} border="1px solid" borderColor={ARCH_BORDER.concreteHairline}>
            <Box p={4} borderRight="1px solid" borderColor={ARCH_BORDER.concreteHairline}>
              <Text fontFamily="mono" fontSize="xs" fontWeight="700" color={ARCH_TEXT.onConcreteMuted} mb={2}>
                BARRA PRINCIPAL
              </Text>
              <VStack align="flex-start" gap={1.5} fontSize="sm" fontWeight="600">
                <Text>01 · Inicio</Text>
                <Text>02 · Servicios</Text>
                <Text>03 · Proyectos</Text>
                <Text>04 · Ubicación</Text>
              </VStack>
            </Box>
            <Box p={4}>
              <Text fontFamily="mono" fontSize="xs" fontWeight="700" color={ARCH_TEXT.onConcreteMuted} mb={2}>
                FOOTER SITELINKS
              </Text>
              <VStack align="flex-start" gap={1.5} fontSize="sm" color={ARCH_TEXT.onConcreteMuted}>
                <Text>Explorar</Text>
                <Text>Servicios</Text>
                <Text>Herramientas (/simulador-ai)</Text>
                <Text>Corporativo & Legal</Text>
              </VStack>
            </Box>
          </SimpleGrid>
        </Box>
      </SimpleGrid>
    </VStack>
  );
};
