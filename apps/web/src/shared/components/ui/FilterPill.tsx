"use client";

import React from "react";
import { Button } from "@/components/ui/button";

interface FilterPillProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

/**
 * Píldora de filtro (categorías de servicios, años de proyectos).
 * 44px de alto en móvil (objetivo táctil) y estado expuesto con aria-pressed.
 */
export const FilterPill: React.FC<FilterPillProps> = ({ label, isActive, onClick }) => (
  <Button
    size="sm"
    minH={{ base: "11", md: "8" }}
    px="5"
    mt="2"
    borderRadius="full"
    fontWeight="bold"
    fontSize="xs"
    letterSpacing="wider"
    textTransform="uppercase"
    aria-pressed={isActive}
    bg={isActive ? "brand.primary" : { base: "blackAlpha.100", _dark: "whiteAlpha.100" }}
    color={isActive ? { base: "white", _dark: "black" } : "text.heading"}
    border="1px solid"
    borderColor={isActive ? "brand.primary" : { base: "blackAlpha.200", _dark: "whiteAlpha.200" }}
    _hover={{
      bg: isActive ? "brand.primary" : { base: "blackAlpha.200", _dark: "whiteAlpha.200" },
      transform: "translateY(-1px)",
    }}
    transition="background-color 0.2s ease, transform 0.2s ease"
    onClick={onClick}
  >
    {label}
  </Button>
);
