"use client";

import React from "react";
import { Button } from "@/shared/ui/button";

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
    variant={isActive ? "primary" : "outline"}
    minH={{ base: "11", md: "8" }}
    px="5"
    borderRadius="full"
    fontWeight="bold"
    fontSize="xs"
    letterSpacing="wider"
    textTransform="uppercase"
    aria-pressed={isActive}
    onClick={onClick}
  >
    {label}
  </Button>
);
