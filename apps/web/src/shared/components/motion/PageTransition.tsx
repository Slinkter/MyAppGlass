/**
 * @file PageTransition.tsx
 * @description Envuelve el contenido de una página para que participe en la transición entre rutas
 * (React `ViewTransition` + View Transitions API). Va dentro de cada `page.tsx`, no en el layout:
 * el layout persiste entre rutas y ahí la entrada y la salida nunca se disparan.
 *
 * - `nav-forward` / `nav-back`: deslizamiento leve en la dirección marcada con `transitionTypes` en el enlace.
 * - Cualquier otra navegación (incluido el botón "atrás" del navegador): fundido sin movimiento (`page-fade`).
 * Las clases se definen en `styles/global.css` y respetan `prefers-reduced-motion`.
 */

import { ViewTransition, type ReactNode } from "react";

const PAGE_TRANSITION = {
  "nav-forward": "nav-forward",
  "nav-back": "nav-back",
  default: "page-fade",
} as const;

export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter={PAGE_TRANSITION} exit={PAGE_TRANSITION} default="none">
      {children}
    </ViewTransition>
  );
}

export default PageTransition;
