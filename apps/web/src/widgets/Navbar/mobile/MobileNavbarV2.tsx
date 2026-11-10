"use client";

/**
 * @file MobileNavbarV2.tsx
 * @description Navegación móvil v2 para Glass & Aluminum Company S.A.C.
 * Ya no hay barra superior: el menú se abre con un botón flotante abajo a la derecha (`MenuFab`)
 * y se muestra como hoja inferior (`MenuOverlay`) con el logo, los enlaces, el WhatsApp y el teléfono.
 * - En móvil el WhatsApp y el tema van dentro de la hoja; los botones flotantes de WhatsApp y tema son solo de escritorio.
 * - Modo `contained={true}` para visualización embebida en el marco de 390px en /design-system.
 */

import React, { useCallback, useRef, useState } from "react";
import { MenuFab } from "./MenuFab";
import { MenuOverlay } from "./MenuOverlay";

export interface MobileNavbarV2Props {
  /**
   * Si es true, el menú se confina a un marco embebido (ej. showcase de 390px)
   * usando position="absolute" en vez de position="fixed" global.
   */
  contained?: boolean;
  /** Estado de apertura controlado (opcional). */
  isOpen?: boolean;
  /** Callback al cambiar el estado de apertura. */
  onOpenChange?: (open: boolean) => void;
}

export const MobileNavbarV2: React.FC<MobileNavbarV2Props> = ({
  contained = false,
  isOpen: controlledIsOpen,
  onOpenChange,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  const isControlled = controlledIsOpen !== undefined;
  const isMenuOpen = isControlled ? controlledIsOpen : internalIsOpen;

  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) {
        setInternalIsOpen(nextOpen);
      }
      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange]
  );

  const handleToggle = useCallback(() => {
    handleOpenChange(!isMenuOpen);
  }, [handleOpenChange, isMenuOpen]);

  const handleClose = useCallback(() => {
    handleOpenChange(false);
  }, [handleOpenChange]);

  return (
    <>
      <MenuFab
        ref={toggleButtonRef}
        isOpen={isMenuOpen}
        onToggle={handleToggle}
        overlayId="mobile-menu-overlay"
        id="mobile-menu-toggle-button"
        contained={contained}
      />

      <MenuOverlay
        isOpen={isMenuOpen}
        onClose={handleClose}
        contained={contained}
        id="mobile-menu-overlay"
        triggerRef={toggleButtonRef}
      />
    </>
  );
};
