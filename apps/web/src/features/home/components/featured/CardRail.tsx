"use client";

/**
 * @file CardRail.tsx
 * @description Contenedor de tarjetas: tira horizontal con encaje (scroll-snap) y asomo de la
 * siguiente tarjeta en celular (la página no crece con cada tarjeta) y rejilla de 2/3 columnas en
 * tablet y escritorio. Con 6 elementos nunca deja filas huérfanas (6 = 3×2 = 2×3).
 */

import React from "react";
import { Box } from "@chakra-ui/react";

export interface CardRailProps {
  label: string;
  /** Columnas en tablet (md). Usa 3 si hay 3 elementos para no dejar huérfanos. Por defecto 2. */
  tabletColumns?: 2 | 3;
  children: React.ReactNode;
}

export const CardRail: React.FC<CardRailProps> = ({ label, tabletColumns = 2, children }) => {
  const items = React.Children.toArray(children);
  return (
    <Box
      role="region"
      aria-label={label}
      tabIndex={0}
      display={{ base: "flex", md: "grid" }}
      gridTemplateColumns={{ md: `repeat(${tabletColumns}, minmax(0, 1fr))`, lg: "repeat(3, minmax(0, 1fr))" }}
      gap={{ base: "3", md: "5", lg: "6" }}
      overflowX={{ base: "auto", md: "visible" }}
      scrollSnapType={{ base: "x mandatory", md: "none" }}
      mx={{ base: "-4", sm: "-6", md: "0" }}
      px={{ base: "4", sm: "6", md: "0" }}
      pb={{ base: "2", md: "0" }}
      css={{
        scrollPaddingInline: "var(--chakra-spacing-4)",
        "&::-webkit-scrollbar": { display: "none" },
        scrollbarWidth: "none",
      }}
    >
      {items.map((child, i) => (
        <Box key={i} flex={{ base: "0 0 82%", sm: "0 0 62%", md: "initial" }} scrollSnapAlign="start" minW="0">
          {child}
        </Box>
      ))}
    </Box>
  );
};

export default CardRail;
