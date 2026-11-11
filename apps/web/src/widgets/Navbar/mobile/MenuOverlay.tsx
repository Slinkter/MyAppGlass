"use client";

/**
 * @file MenuOverlay.tsx
 * @description Hoja inferior de menú móvil para Glass & Aluminum Company S.A.C. (variante 1 elegida en /navbarmobil-1).
 * - Sube desde abajo, en la zona del pulgar, con esquinas superiores redondeadas y asa.
 * - Fondo atenuado (`overlay.scrim`) que empieza bajo la barra: el botón de la barra sigue siendo el cierre.
 * - Zona central scrolleable (MenuNavList): 5 enlaces primarios + acordeón de servicios.
 * - Pie sticky (MenuFooter): CTA "Cotizar por WhatsApp" + cambio de tema, teléfono y mi cuenta.
 * - zIndex `overlay`; `contained` respeta el marco del showcase.
 * - Entrada 650ms (DUR_CSS.panelIn) y salida 450ms (DUR_CSS.panelOut) con solo transform + opacity.
 * - prefers-reduced-motion: solo fade corto. useFocusTrap, useLockBodyScroll, Escape, popstate y cierre por ruta.
 * - Gutters de 24 px, tipografía mínima `xs`, iconos 16/20 y separadores por CSS.
 */

import React, { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Box } from "@chakra-ui/react";
import { DUR_CSS, DUR_MS, EASE_PANEL } from "@/shared/constants/motion";
import { useFocusTrap } from "./hooks/useFocusTrap";
import { useLockBodyScroll } from "./hooks/useLockBodyScroll";
import { MenuHeader } from "./MenuHeader";
import { MenuNavList } from "./MenuNavList";
import { MenuFooter } from "./MenuFooter";

export interface MenuOverlayProps {
  /** Indica si el panel está desplegado. */
  isOpen: boolean;
  /** Callback para solicitar el cierre del menú. */
  onClose: () => void;
  /** Si es true, se renderiza dentro del simulador/marco de 390px sin fijar el viewport global. */
  contained?: boolean;
  /** ID del overlay para accesibilidad ARIA. */
  id?: string;
  /** Referencia opcional al botón disparador para restaurar foco. */
  triggerRef?: React.RefObject<HTMLElement | null>;
}

export const MenuOverlay: React.FC<MenuOverlayProps> = ({
  isOpen,
  onClose,
  contained = false,
  id = "mobile-menu-overlay",
  triggerRef,
}) => {
  const pathname = usePathname();
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isVisibleInDom, setIsVisibleInDom] = useState(isOpen);
  const closedByNavigationRef = useRef(false);

  // Resetear la bandera cuando el menú se abre
  useEffect(() => {
    if (isOpen) {
      closedByNavigationRef.current = false;
    }
  }, [isOpen]);

  // Manejador para enlaces de navegación: no activar history.back()
  const handleNavClick = useCallback(() => {
    closedByNavigationRef.current = true;
    onClose();
  }, [onClose]);

  // Mantener en el DOM durante la transición de salida (450ms)
  useEffect(() => {
    if (isOpen) {
      setIsVisibleInDom(true);
    } else {
      const timer = window.setTimeout(() => {
        setIsVisibleInDom(false);
      }, DUR_MS.panelOut);
      return () => window.clearTimeout(timer);
    }
  }, [isOpen]);

  // Atrapamiento de foco accesible con Escape y retorno de foco (solo fuera del simulador)
  useFocusTrap(overlayRef, isOpen && !contained, onClose, triggerRef);

  // Bloqueo de scroll en document.body (solo cuando no es contained)
  useLockBodyScroll(isOpen && !contained);

  // Cierre automático al cambiar de ruta
  useEffect(() => {
    if (isOpen) {
      closedByNavigationRef.current = true;
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Cierre automático si el viewport pasa a escritorio (>= 1024px)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const handleMediaChange = (e: MediaQueryListEvent) => {
      if (e.matches && isOpen) {
        onClose();
      }
    };

    mediaQuery.addEventListener("change", handleMediaChange);
    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, [isOpen, onClose]);

  // Soporte para botón "Atrás" de Android / navegador móvil (solo fuera de modo contained)
  useEffect(() => {
    if (!isOpen || contained || typeof window === "undefined") {
      return;
    }

    const poppedByBackButton = { current: false };

    window.history.pushState({ mobileMenuOpen: true }, "");

    const handlePopState = () => {
      poppedByBackButton.current = true;
      onClose();
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      if (
        !poppedByBackButton.current &&
        !closedByNavigationRef.current &&
        window.history.state?.mobileMenuOpen
      ) {
        window.history.back();
      }
    };
  }, [isOpen, contained, onClose]);

  // Al abrir el menú se añadió una entrada al historial (arriba). Si el menú se cerró navegando a otra
  // página, esa entrada queda atrás con `mobileMenuOpen`. Al volver a ella con "Atrás" la saltamos para
  // no obligar a pulsar "Atrás" una segunda vez. Con el menú abierto no hace nada: lo gestiona el efecto de arriba.
  const isOpenRef = useRef(isOpen);
  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  useEffect(() => {
    if (contained || typeof window === "undefined") return;

    const skipStaleMenuEntry = () => {
      if (!isOpenRef.current && window.history.state?.mobileMenuOpen) {
        window.history.back();
      }
    };

    window.addEventListener("popstate", skipStaleMenuEntry);
    return () => window.removeEventListener("popstate", skipStaleMenuEntry);
  }, [contained]);

  return (
    <>
      {/* Fondo atenuado: al tocarlo se cierra el menú */}
      <Box
        position={contained ? "absolute" : "fixed"}
        top="0"
        left="0"
        right="0"
        bottom="0"
        zIndex="overlay"
        bg="overlay.scrim"
        aria-hidden="true"
        onClick={onClose}
        pointerEvents={isOpen ? "auto" : "none"}
        visibility={isVisibleInDom ? "visible" : "hidden"}
        style={{
          opacity: isOpen ? 1 : 0,
          transition: `opacity ${isOpen ? DUR_CSS.panelIn : DUR_CSS.panelOut} ${EASE_PANEL}`,
        }}
        _motionReduce={{ transition: `opacity ${DUR_CSS.reducedFade} ease !important` }}
      />

      <Box
        ref={overlayRef}
        id={id}
        role="dialog"
        aria-modal="true"
        aria-label="Menú principal de navegación"
        aria-hidden={!isOpen}
        position={contained ? "absolute" : "fixed"}
        left="0"
        right="0"
        bottom="0"
        display="flex"
        flexDirection="column"
        w="full"
        maxH={contained ? "calc(100% - 1rem)" : "calc(100% - env(safe-area-inset-top, 0px) - 1rem)"}
        overflow="hidden"
        zIndex="overlay"
        bg="bg.surface"
        borderTopRadius="modal"
        borderTopWidth="1px"
        borderColor="border.warm"
        pointerEvents={isOpen ? "auto" : "none"}
        visibility={isVisibleInDom ? "visible" : "hidden"}
        style={{
          transform: isOpen ? "translateY(0)" : "translateY(100%)",
          transition: `transform ${isOpen ? DUR_CSS.panelIn : DUR_CSS.panelOut} ${EASE_PANEL}`,
        }}
        _motionReduce={{
          transform: "none !important",
          transition: `opacity ${DUR_CSS.reducedFade} ease !important`,
          opacity: isOpen ? 1 : 0,
        }}
      >
        {/* Asa visual de la hoja */}
        <Box
          flexShrink={0}
          alignSelf="center"
          mt="3"
          w="10"
          h="1"
          borderRadius="full"
          bg="border.warmStrong"
          aria-hidden="true"
        />

        {/* Cabecera de la hoja: logo + cierre (dentro del diálogo y del focus trap) */}
        <MenuHeader onClose={onClose} />

        {/* Zona 1 · Única zona con scroll */}
        <MenuNavList
          isOpen={isOpen}
          contained={contained}
          onNavClick={handleNavClick}
        />

        {/* Zona 3 · Pie sticky: nunca scrollea */}
        <MenuFooter
          contained={contained}
          onClose={onClose}
          onNavClick={handleNavClick}
        />
      </Box>
    </>
  );
};
