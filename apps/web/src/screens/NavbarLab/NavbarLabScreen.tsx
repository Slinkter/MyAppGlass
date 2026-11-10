"use client";

/**
 * @file NavbarLabScreen.tsx
 * @description Pantalla de prueba de una variante de navbar móvil (`/navbarmobil-1` a `-4`).
 * - En móvil ocupa la pantalla y la variante se fija a la ventana, como en el sitio.
 * - En escritorio la variante vive en un marco de 390 px: `transform` crea un contexto donde
 *   `position: fixed` se ancla al marco, así se ve igual que en un teléfono sin cambiar el código.
 * - El contenido de relleno es solo para probar el scroll y la barra sobre contenido; no es contenido del sitio.
 */

import React from "react";
import RouterLink from "next/link";
import { Box, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { LAB_BAR_HEIGHT, LAB_VARIANTS, type LabVariantId } from "./lab-data";
import { Variant1Sheet } from "./variants/Variant1Sheet";
import { Variant2Dock } from "./variants/Variant2Dock";
import { Variant3Drawer } from "./variants/Variant3Drawer";
import { Variant4Curtain } from "./variants/Variant4Curtain";

const VARIANT_COMPONENTS: Record<LabVariantId, React.FC> = {
  1: Variant1Sheet,
  2: Variant2Dock,
  3: Variant3Drawer,
  4: Variant4Curtain,
};

const FILLER_SECTIONS = ["Primera sección de prueba", "Segunda sección de prueba", "Tercera sección de prueba"];

export interface NavbarLabScreenProps {
  variant: LabVariantId;
}

export const NavbarLabScreen: React.FC<NavbarLabScreenProps> = ({ variant }) => {
  const meta = LAB_VARIANTS.find((item) => item.id === variant) ?? LAB_VARIANTS[0]!;
  const Variant = VARIANT_COMPONENTS[meta.id];
  const hasDock = meta.id === 2;

  return (
    <Box py={{ base: "0", md: "10" }}>
      <Box
        position="relative"
        mx="auto"
        w={{ base: "full", md: "390px" }}
        h={{ base: "auto", md: "min(780px, calc(100dvh - 5rem))" }}
        overflow={{ base: "visible", md: "hidden" }}
        transform={{ base: "none", md: "translateZ(0)" }}
        borderRadius={{ base: "0", md: "modal" }}
        borderWidth={{ base: "0", md: "1px" }}
        borderColor="border.default"
        bg="bg.surface"
      >
        <Variant />

        <Box
          h={{ base: "auto", md: "full" }}
          overflowY={{ base: "visible", md: "auto" }}
          style={{ paddingTop: LAB_BAR_HEIGHT }}
          pb={hasDock ? "28" : "10"}
          px={{ base: "0", md: "6" }}
        >
          <VStack align="stretch" gap="6" pt="6">
            <VStack align="flex-start" gap="2">
              <Text fontSize="xs" fontWeight="700" letterSpacing="0.14em" textTransform="uppercase" color="text.muted">
                Prueba de navbar móvil · {meta.id} de {LAB_VARIANTS.length}
              </Text>
              <Heading
                as="h1"
                fontFamily="heading"
                fontWeight="700"
                fontSize={{ base: "3xl", md: "3xl" }}
                lineHeight="1.1"
                color="text.heading"
              >
                {meta.name}
              </Heading>
              <Text color="text.muted" fontSize="md">
                {meta.summary}
              </Text>
            </VStack>

            <HStack as="nav" aria-label="Variantes de navbar" wrap="wrap" gap="2">
              {LAB_VARIANTS.map((item) => {
                const isCurrent = item.id === meta.id;
                return (
                  <Box
                    key={item.id}
                    asChild
                    display="inline-flex"
                    alignItems="center"
                    minH="11"
                    px="4"
                    borderRadius="full"
                    borderWidth="1px"
                    borderColor={isCurrent ? "text.heading" : "border.default"}
                    bg={isCurrent ? "text.heading" : "transparent"}
                    color={isCurrent ? "bg.surface" : "text.heading"}
                    fontSize="sm"
                    fontWeight="600"
                    _hover={{ bg: isCurrent ? "text.heading" : "bg.subtle" }}
                    _focusVisible={{
                      outline: "2px solid",
                      outlineColor: "ring.primary",
                      outlineOffset: "2px",
                    }}
                  >
                    <RouterLink
                      href={item.route}
                      aria-current={isCurrent ? "page" : undefined}
                      style={{ textDecoration: "none" }}
                    >
                      {item.id}
                    </RouterLink>
                  </Box>
                );
              })}
            </HStack>

            {FILLER_SECTIONS.map((title) => (
              <VStack key={title} align="stretch" gap="3">
                <Heading as="h2" fontFamily="heading" fontWeight="600" fontSize="xl" color="text.heading">
                  {title}
                </Heading>
                <Box h="40" borderRadius="card" bg="bg.subtle" borderWidth="1px" borderColor="border.warm" />
                <Box h="3" w="full" borderRadius="full" bg="bg.subtle" />
                <Box h="3" w="75%" borderRadius="full" bg="bg.subtle" />
              </VStack>
            ))}
          </VStack>
        </Box>
      </Box>
    </Box>
  );
};
