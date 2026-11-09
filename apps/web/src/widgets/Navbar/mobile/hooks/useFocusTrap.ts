"use client";

/**
 * @file useFocusTrap.ts
 * @description Hook de atrapamiento de foco para el menú móvil modal v2 (WAI-ARIA Dialog/Menu).
 * Atrapa Tab y Shift+Tab dentro del panel, responde a Escape llamando a onClose()
 * y devuelve el foco al elemento disparador (MenuToggle) al cerrarse.
 */

import { useEffect, useRef } from "react";

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(", ");

export function useFocusTrap(
  containerRef: React.RefObject<HTMLElement | null>,
  isOpen: boolean,
  onClose?: () => void,
  triggerRef?: React.RefObject<HTMLElement | null>
): void {
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen || typeof document === "undefined") {
      return;
    }

    // Guardar el elemento activo antes de abrir el overlay
    previousActiveElementRef.current = document.activeElement as HTMLElement | null;
    const initialTrigger = triggerRef?.current;

    const container = containerRef.current;
    if (!container) return;

    // Colocar el foco inicial en el primer elemento interactivo disponible
    const focusTimer = window.setTimeout(() => {
      const focusables = container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      const firstFocusable = Array.from(focusables).find(
        (el) => el.offsetParent !== null || el.getClientRects().length > 0
      );
      if (firstFocusable) {
        firstFocusable.focus();
      } else {
        container.focus();
      }
    }, 40);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        onClose?.();
        return;
      }

      if (e.key !== "Tab") {
        return;
      }

      const focusables = Array.from(
        container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      ).filter((el) => el.offsetParent !== null || el.getClientRects().length > 0);

      if (focusables.length === 0) {
        e.preventDefault();
        return;
      }

      const firstElement = focusables[0];
      const lastElement = focusables[focusables.length - 1];

      if (e.shiftKey) {
        // Shift + Tab: si estamos en el primero, ciclar al último
        if (document.activeElement === firstElement || !container.contains(document.activeElement)) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab: si estamos en el último, ciclar al primero
        if (document.activeElement === lastElement || !container.contains(document.activeElement)) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", handleKeyDown);

      // Devolver foco al disparador (MenuToggle) o al foco previo
      const targetToFocus = initialTrigger || previousActiveElementRef.current;
      if (targetToFocus && typeof targetToFocus.focus === "function") {
        window.setTimeout(() => {
          targetToFocus.focus();
        }, 10);
      }
    };
  }, [isOpen, onClose, containerRef, triggerRef]);
}
