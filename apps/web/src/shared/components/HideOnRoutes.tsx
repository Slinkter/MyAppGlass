"use client";

/**
 * @file HideOnRoutes.tsx
 * @description Oculta a sus hijos cuando la ruta actual empieza por alguno de los prefijos dados.
 * Se usa en el layout para que las páginas de prueba (`/navbarmobil-*`) no muestren el navbar,
 * el footer ni los botones flotantes globales encima de la variante que se está revisando.
 */

import React from "react";
import { usePathname } from "next/navigation";

export interface HideOnRoutesProps {
  /** Prefijos de ruta en los que no se renderizan los hijos. */
  prefixes: readonly string[];
  children: React.ReactNode;
}

export const HideOnRoutes: React.FC<HideOnRoutesProps> = ({ prefixes, children }) => {
  const pathname = usePathname();

  if (prefixes.some((prefix) => pathname.startsWith(prefix))) {
    return null;
  }

  return <>{children}</>;
};
