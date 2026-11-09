"use client";

/**
 * @file SectionHeader.tsx
 * @description Encabezado de sección de la landing en el lenguaje del mapa inmersivo:
 * etiqueta pequeña en mayúsculas + título serif alineado a la izquierda + enlace opcional «Ver todos».
 * Un solo ritmo para todas las secciones (jerarquía por tamaño y espacio, no por color).
 */

import React from "react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { ArrowRight } from "lucide-react";
import RouterLink from "next/link";

export interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  /** Enlace secundario a la derecha (en celular pasa debajo). */
  action?: { href: string; label: string };
  headingAs?: "h1" | "h2";
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ eyebrow, title, description, action, headingAs = "h2" }) => (
  <Flex
    direction={{ base: "column", md: "row" }}
    justify="space-between"
    align={{ base: "flex-start", md: "flex-end" }}
    gap={{ base: "3", md: "6" }}
    mb={{ base: "6", md: "8" }}
  >
    <Box minW="0" maxW="2xl">
      <Text fontSize="xs" fontWeight="700" letterSpacing="0.12em" textTransform="uppercase" color="text.muted" mb="2">
        {eyebrow}
      </Text>
      <Heading
        as={headingAs}
        fontFamily="heading"
        fontWeight="700"
        letterSpacing="-0.02em"
        color="text.heading"
        fontSize={{ base: "3xl", md: "4xl" }}
        lineHeight="1.1"
      >
        {title}
      </Heading>
      {description && (
        <Text fontSize={{ base: "sm", md: "md" }} color="text.muted" mt="3" lineHeight="relaxed">
          {description}
        </Text>
      )}
    </Box>
    {action && (
      <RouterLink
        href={action.href}
        style={{ display: "inline-flex", alignItems: "center", gap: "8px", minHeight: "44px", fontWeight: 600, fontSize: "14px" }}
      >
        {action.label}
        <ArrowRight size={16} aria-hidden="true" style={{ flexShrink: 0 }} />
      </RouterLink>
    )}
  </Flex>
);

export default SectionHeader;
