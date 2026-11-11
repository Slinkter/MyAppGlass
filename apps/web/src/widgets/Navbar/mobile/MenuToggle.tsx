"use client";

/**
 * @file MenuToggle.tsx
 * @description Botón de alternancia de menú móvil con crossfade/rotación de iconos (Menu ⇄ X) en 300ms.
 * Cumple R1–R12:
 * - Target táctil >= 44px (`minH="11" minW="11"`).
 * - Animación restringida a transform y opacity en 300ms (DUR_CSS.toggle).
 * - ARIA dinámico (aria-expanded, aria-controls, aria-label en español).
 * - Foco visible de 2px con ring.primary (R7).
 * - Respeto a prefers-reduced-motion (R11).
 */

import { forwardRef } from "react";
import { Box } from "@chakra-ui/react";
import { Menu as MenuIcon, X } from "lucide-react";
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

    const iconTransition = `transform ${DUR_CSS.toggle} ${EASE_SOFT}, opacity ${DUR_CSS.toggle} ${EASE_SOFT}`;

    return (
      <Box
        asChild
        minH="11"
        minW="11"
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        borderRadius="full"
        bg="transparent"
        border="none"
        p="0"
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
          {/* Icono superpuesto Menu ⇄ X (20px) */}
          <Box
            position="relative"
            boxSize="5"
            display="block"
            aria-hidden="true"
          >
            <Box
              position="absolute"
              inset="0"
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              opacity={isOpen ? 0 : 1}
              transform={isOpen ? "rotate(90deg)" : "rotate(0deg)"}
              transition={iconTransition}
              _motionReduce={{ transition: "none" }}
            >
              <MenuIcon size={20} style={{ flexShrink: 0 }} />
            </Box>
            <Box
              position="absolute"
              inset="0"
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              opacity={isOpen ? 1 : 0}
              transform={isOpen ? "rotate(0deg)" : "rotate(-90deg)"}
              transition={iconTransition}
              _motionReduce={{ transition: "none" }}
            >
              <X size={20} style={{ flexShrink: 0 }} />
            </Box>
          </Box>
        </button>
      </Box>
    );
  }
);

MenuToggle.displayName = "MenuToggle";
