"use client";

import React from "react";
import { Box, ClientOnly, Skeleton } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { ColorModeIcon } from "@/components/ui/color-mode";
import { useColorMode } from "@/components/ui/color-mode-hooks";

export const ThemeToggleButton: React.FC = () => {
  const { toggleColorMode } = useColorMode();

  return (
    <ClientOnly
      fallback={
        <Skeleton
          w={{ base: "14", md: "16" }}
          h={{ base: "14", md: "16" }}
          borderRadius="full"
        />
      }
    >
      <Button
        onClick={toggleColorMode}
        variant="ghost"
        bg="surface.card"
        color="text.heading"
        borderRadius="full"
        borderWidth="1px"
        borderColor="border.default"
        w={{ base: "14", md: "16" }}
        h={{ base: "14", md: "16" }}
        minW="0"
        p="0"
        boxShadow="md"
        _hover={{ bg: "bg.subtle" }}
        aria-label="Cambiar tema de color"
        transition="background-color 0.2s ease, box-shadow 0.2s ease"
        _motionReduce={{ transition: "none" }}
      >
        <ColorModeIcon size={32} />
      </Button>
    </ClientOnly>
  );
};

/**
 * @component ThemeToggle
 * @description Botón flotante de cambio de tema (Claro / Oscuro) homologado en dimensiones
 * (`w`/`h` 14 en base, 16 en md y `size={32}` en el icono) con `FloatingWhatsApp`.
 */
export const ThemeToggle: React.FC = () => {
  return (
    <Box
      position="fixed"
      right="4"
      zIndex="sticky"
      display={{ base: "none", md: "flex" }}
      css={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + var(--chakra-spacing-4))", "body[data-scroll-locked] &": { display: "none" } }}
    >
      <ThemeToggleButton />
    </Box>
  );
};
