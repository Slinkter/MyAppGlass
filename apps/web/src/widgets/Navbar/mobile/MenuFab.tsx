"use client";

/**
 * @file MenuFab.tsx
 * @description Botón flotante que abre el menú móvil, abajo a la derecha.
 * - Mismo tamaño que los otros botones flotantes (56 px: `boxSize="14"`), en negro de marca para distinguirse
 *   del WhatsApp (verde, a la izquierda) y del tema (neutro, encima de este botón).
 * - Se oculta mientras el menú está abierto (`body[data-scroll-locked]`): el cierre vive dentro de la hoja.
 * - Foco visible de 2 px, `aria-expanded`/`aria-controls`, solo transform y opacity, respeta reduced-motion.
 */

import { forwardRef } from "react";
import { Box } from "@chakra-ui/react";
import { Menu as MenuIcon } from "lucide-react";
import { DUR_CSS, EASE_SOFT } from "@/shared/constants/motion";

export interface MenuFabProps {
  /** Estado de apertura del menú. */
  isOpen: boolean;
  onToggle: () => void;
  /** ID del panel que controla, para `aria-controls`. */
  overlayId?: string;
  id?: string;
  /** Si es true, se ancla al marco del showcase en lugar de a la ventana. */
  contained?: boolean;
}

export const MenuFab = forwardRef<HTMLButtonElement, MenuFabProps>(function MenuFab(
  { isOpen, onToggle, overlayId = "mobile-menu-overlay", id = "mobile-menu-toggle-button", contained = false },
  ref
) {
  return (
    <Box
      position={contained ? "absolute" : "fixed"}
      right="4"
      zIndex="sticky"
      display={{ base: "flex", md: "none" }}
      css={{
        bottom: "calc(env(safe-area-inset-bottom, 0px) + var(--chakra-spacing-4))",
        "body[data-scroll-locked] &": { display: "none" },
      }}
    >
      <Box
        asChild
        boxSize="14"
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        borderRadius="full"
        bg="text.heading"
        color="bg.surface"
        boxShadow="md"
        cursor="pointer"
        border="none"
        p="0"
        _active={{ transform: "scale(0.94)" }}
        _focusVisible={{
          outline: "2px solid",
          outlineColor: "ring.primary",
          outlineOffset: "2px",
        }}
        transition={`transform ${DUR_CSS.fast} ${EASE_SOFT}, opacity ${DUR_CSS.fast} ${EASE_SOFT}`}
        _motionReduce={{ transition: "none", transform: "none" }}
      >
        <button
          ref={ref}
          type="button"
          id={id}
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={overlayId}
          aria-label={isOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
        >
          <MenuIcon size={24} aria-hidden="true" style={{ flexShrink: 0 }} />
        </button>
      </Box>
    </Box>
  );
});

MenuFab.displayName = "MenuFab";
