"use client";

/**
 * @file useScrollDirection.ts
 * @description Hook para detectar la dirección del desplazamiento (scroll) y estado scrolled.
 * Utilizado por MobileNavbarV2 para:
 * - Alternar entre transparente (scroll 0) y sólida con borde cálido (> 24px).
 * - Ocultar la barra al desplazarse hacia abajo y revelarla al desplazarse hacia arriba.
 * Compatible con window global o contenedores simulados en /design-system (`containerRef`).
 */

import { useEffect, useRef, useState } from "react";

export type ScrollDirection = "up" | "down" | "none";

export interface UseScrollDirectionOptions {
  /** Umbral en píxeles antes de cambiar de dirección para evitar parpadeos (defecto: 8). */
  threshold?: number;
  /** Desplazamiento mínimo para considerar la barra en estado sólido `scrolled` (defecto: 24). */
  scrolledOffset?: number;
  /** Referencia opcional a un contenedor scrolleable (para simuladores / showcase en modo contained). */
  containerRef?: React.RefObject<HTMLElement | null>;
  /** Si está deshabilitado, la barra siempre se mantiene visible. */
  disabled?: boolean;
  /** Fuerza el estado scrolled para pruebas o previsualizaciones. */
  forceScrolled?: boolean;
}

export interface UseScrollDirectionResult {
  scrollDirection: ScrollDirection;
  isScrolled: boolean;
  isVisible: boolean;
  scrollY: number;
}

export function useScrollDirection({
  threshold = 8,
  scrolledOffset = 24,
  containerRef,
  disabled = false,
  forceScrolled = false,
}: UseScrollDirectionOptions = {}): UseScrollDirectionResult {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>("none");
  const [isScrolled, setIsScrolled] = useState<boolean>(forceScrolled);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [scrollY, setScrollY] = useState<number>(0);

  const prevScrollYRef = useRef<number>(0);
  const tickingRef = useRef<boolean>(false);

  useEffect(() => {
    if (forceScrolled) {
      setIsScrolled(true);
    }
  }, [forceScrolled]);

  useEffect(() => {
    if (disabled) {
      setIsVisible(true);
      return;
    }

    const getScrollTop = (): number => {
      if (containerRef && containerRef.current) {
        return Math.max(0, containerRef.current.scrollTop);
      }
      if (typeof window !== "undefined") {
        return Math.max(0, window.scrollY || document.documentElement.scrollTop);
      }
      return 0;
    };

    const updateScroll = () => {
      const currentScrollY = getScrollTop();
      const prevScrollY = prevScrollYRef.current;
      const diff = currentScrollY - prevScrollY;

      setScrollY(currentScrollY);

      // Determinar si la barra debe estar sólida (> 24px)
      const scrolledState = forceScrolled || currentScrollY > scrolledOffset;
      setIsScrolled(scrolledState);

      // Si está en la zona superior (<= 24px), siempre está visible
      if (currentScrollY <= scrolledOffset) {
        setIsVisible(true);
        setScrollDirection("none");
        prevScrollYRef.current = currentScrollY;
        tickingRef.current = false;
        return;
      }

      // Si el desplazamiento no supera el umbral, mantener dirección previa
      if (Math.abs(diff) < threshold) {
        tickingRef.current = false;
        return;
      }

      if (diff > 0) {
        // Desplazamiento hacia abajo: ocultar
        setScrollDirection("down");
        setIsVisible(false);
      } else {
        // Desplazamiento hacia arriba: revelar
        setScrollDirection("up");
        setIsVisible(true);
      }

      prevScrollYRef.current = currentScrollY;
      tickingRef.current = false;
    };

    const onScroll = () => {
      if (!tickingRef.current) {
        window.requestAnimationFrame(updateScroll);
        tickingRef.current = true;
      }
    };

    const target: EventTarget | null = containerRef?.current ?? (typeof window !== "undefined" ? window : null);
    if (!target) return;

    // Lectura inicial
    updateScroll();

    target.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      target.removeEventListener("scroll", onScroll);
    };
  }, [containerRef, disabled, forceScrolled, scrolledOffset, threshold]);

  return {
    scrollDirection,
    isScrolled: forceScrolled || isScrolled,
    isVisible: disabled ? true : isVisible,
    scrollY,
  };
}
