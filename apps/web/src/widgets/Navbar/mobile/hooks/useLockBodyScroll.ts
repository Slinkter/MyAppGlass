"use client";

/**
 * @file useLockBodyScroll.ts
 * @description Hook para bloquear el scroll de document.body mientras el panel móvil esté activo.
 * En modo contained={true}, debe pasar locked=false para no bloquear el scroll de la página host.
 */

import { useEffect } from "react";

export function useLockBodyScroll(locked: boolean): void {
  useEffect(() => {
    if (!locked || typeof document === "undefined" || typeof window === "undefined") {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    // Compensar el ancho de la barra de desplazamiento para evitar saltos horizontales
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [locked]);
}
