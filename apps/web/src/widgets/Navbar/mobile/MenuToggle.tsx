"use client";

/**
 * @file MenuToggle.tsx
 * @description Botón de alternancia de menú móvil con morfismo de 3 líneas a X en 300ms.
 * Cumple R1–R12:
 * - Target táctil >= 48px (`minH="12" minW="12"`).
 * - Animación restringida a transform y opacity en 300ms (DUR_CSS.toggle).
 * - ARIA dinámico (aria-expanded, aria-controls, aria-label en español).
 * - Foco visible de 2px con ring.primary (R7).
 * - Respeto a prefers-reduced-motion (R11).
 */

import React, { forwardRef } from "react";
import { Box } from "@chakra-ui/react";
import { DUR_CSS, EASE_SOFT } from "@/shared/constants/motion";

export interface MenuToggleProps {
  /** Estado de apertura del menú. */
  isOpen: boolean;
  /** Callback al pulsar el botón. */
  onToggle: () => void;
  /** ID del overlay que controla para aria-controls. */
  overlayId?: string;
  /** ID propio del botón para retorno de foco. */
  id?: string;
  /** Label accesible opcional (por defecto dinámico en español). */
  ariaLabel?: string;
  /** Estilos adicionales para composición. */
  className?: string;
}

export const MenuToggle = forwardRef<HTMLButtonElement, MenuToggleProps>(
  function MenuToggle(
    {
      isOpen,
      onToggle,
      overlayId = "mobile-menu-overlay",
      id = "mobile-menu-toggle",
      ariaLabel,
      className,
    },
    ref
  ) {
    const accessibleLabel =
      ariaLabel ?? (isOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación");

    return (
      <Box
        asChild
        minH="12"
        minW="12"
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        borderRadius="full"
        bg="transparent"
        color="text.heading"
        cursor="pointer"
        className={className}
        style={{ flexShrink: 0 }}
        _hover={{ bg: "bg.subtle" }}
        _active={{ transform: "scale(0.94)" }}
        _focusVisible={{
          outline: "2px solid",
          outlineColor: "ring.primary",
          outlineOffset: "2px",
        }}
        transition={`background-color ${DUR_CSS.fast} ${EASE_SOFT}, transform ${DUR_CSS.fast} ${EASE_SOFT}`}
        _motionReduce={{ transition: "none", transform: "none" }}
      >
        <button
          ref={ref}
          type="button"
          id={id}
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={overlayId}
          aria-label={accessibleLabel}
        >
          {/* Contenedor relativo para el trío de líneas de 2px */}
          <Box
            position="relative"
            w="22px"
            h="16px"
            display="block"
            aria-hidden="true"
          >
            {/* Línea superior */}
            <Box
              as="span"
              position="absolute"
              left="0"
              top="0"
              w="22px"
              h="2px"
              borderRadius="full"
              bg="currentColor"
              display="block"
              transformOrigin="center"
              transform={isOpen ? "translateY(7px) rotate(45deg)" : "translateY(0) rotate(0deg)"}
              transition={`transform ${DUR_CSS.toggle} ${EASE_SOFT}, opacity ${DUR_CSS.toggle} ${EASE_SOFT}`}
              _motionReduce={{ transition: "none" }}
            />

            {/* Línea intermedia */}
            <Box
              as="span"
              position="absolute"
              left="0"
              top="7px"
              w="22px"
              h="2px"
              borderRadius="full"
              bg="currentColor"
              display="block"
              opacity={isOpen ? 0 : 1}
              transform={isOpen ? "scaleX(0)" : "scaleX(1)"}
              transition={`transform ${DUR_CSS.toggle} ${EASE_SOFT}, opacity ${DUR_CSS.toggle} ${EASE_SOFT}`}
              _motionReduce={{ transition: "none" }}
            />

            {/* Línea inferior */}
            <Box
              as="span"
              position="absolute"
              left="0"
              top="14px"
              w="22px"
              h="2px"
              borderRadius="full"
              bg="currentColor"
              display="block"
              transformOrigin="center"
              transform={isOpen ? "translateY(-7px) rotate(-45deg)" : "translateY(0) rotate(0deg)"}
              transition={`transform ${DUR_CSS.toggle} ${EASE_SOFT}, opacity ${DUR_CSS.toggle} ${EASE_SOFT}`}
              _motionReduce={{ transition: "none" }}
            />
          </Box>
        </button>
      </Box>
    );
  }
);

MenuToggle.displayName = "MenuToggle";
