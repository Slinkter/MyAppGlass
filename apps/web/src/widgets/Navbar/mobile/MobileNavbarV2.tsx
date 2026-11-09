"use client";

/**
 * @file MobileNavbarV2.tsx
 * @description Encabezado de navegación móvil v2 Minimalista Studio para Glass & Aluminum Company S.A.C.
 * Barra siempre visible (`sticky`), sin lógica de scroll:
 * - Sangra a los bordes de la página (`mx="-6"`) y reserva su propio espacio.
 * - Alto de 60 px + env(safe-area-inset-top, 0px).
 * - Logo oficial (/brand/logo.png) nítido a 32×32 + lockup corporativo.
 * - Fondo translúcido fijo (`bg.section/85` + GLASS_BLUR) y borde inferior siempre visible.
 * - WhatsApp y MenuToggle como targets táctiles de 44 px con estados homogéneos.
 * - Modo `contained={true}` para visualización embebida en el marco de 390px en /design-system.
 */

import { GLASS_BLUR } from "@/shared/constants/glass";
import React, { useCallback, useRef, useState } from "react";
import RouterLink from "next/link";
import Image from "next/image";
import { Box, HStack, Text } from "@chakra-ui/react";
import { companyData } from "@/shared/config/company-data";
import { DUR_CSS, EASE_SOFT } from "@/shared/constants/motion";
import { WhatsAppIcon } from "@/shared/components/icons/WhatsAppIcon";
import { MenuToggle } from "./MenuToggle";
import { MenuOverlay } from "./MenuOverlay";

export interface MobileNavbarV2Props {
  /**
   * Si es true, la barra se confina a un marco embebido (ej. showcase de 390px)
   * usando position="absolute" en vez de position="sticky" global y sin sangrado.
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

  const whatsappDirectUrl = `https://wa.me/${companyData.whatsappNumber}?text=${encodeURIComponent(
    companyData.whatsappMessage
  )}`;

  return (
    <>
      <Box
        as="header"
        role="banner"
        position={contained ? "absolute" : "sticky"}
        top="0"
        zIndex={1700}
        display={{
          base: contained ? "block" : undefined,
          md: contained ? undefined : "none",
        }}
        mx={contained ? undefined : { base: "-6" }}
        px="6"
        pt="env(safe-area-inset-top, 0px)"
        h="calc(60px + env(safe-area-inset-top, 0px))"
        bg="bg.section/85"
        css={{
          backdropFilter: GLASS_BLUR,
          WebkitBackdropFilter: GLASS_BLUR,
          "@media (prefers-reduced-transparency: reduce), (prefers-contrast: more)": {
            backdropFilter: "none",
            background: "{colors.bg.section}",
          },
        }}
        borderBottomWidth="1px"
        borderBottomColor="border.warm"
      >
        <HStack h="15" justify="space-between" align="center">
          {/* Logo Corporativo oficial con aspect ratio protegido */}
          <Box
            asChild
            display="inline-flex"
            alignItems="center"
            borderRadius="md"
            _focusVisible={{
              outline: "2px solid",
              outlineColor: "ring.primary",
              outlineOffset: "2px",
            }}
          >
            <RouterLink
              href="/"
              aria-label={`Ir a inicio · ${companyData.companyName}`}
              onClick={(e) => {
                if (contained) e.preventDefault();
                handleClose();
              }}
              style={{ textDecoration: "none" }}
            >
              <HStack gap="2.5" align="center" minH="11">
                <Box
                  position="relative"
                  boxSize="8"
                  minW="8"
                  borderRadius="md"
                  overflow="hidden"
                >
                  <Image
                    src="/brand/logo.png"
                    alt={companyData.companyName}
                    fill
                    sizes="32px"
                    unoptimized
                    style={{ objectFit: "contain" }}
                    priority
                  />
                </Box>
                <Box lineHeight="tight">
                  <Text
                    fontFamily="heading"
                    fontWeight="700"
                    fontSize="md"
                    color="text.heading"
                    letterSpacing="tight"
                  >
                    GYA
                  </Text>
                  <Text
                    fontSize="xs"
                    fontFamily="body"
                    fontWeight="600"
                    color="text.muted"
                    letterSpacing="0.08em"
                    textTransform="uppercase"
                  >
                    Glass & Aluminum
                  </Text>
                </Box>
              </HStack>
            </RouterLink>
          </Box>

          {/* Acciones de la derecha: WhatsApp directo + Disparador de Menú */}
          <HStack gap="2" align="center">
            {/* Botón de WhatsApp táctil (minH="11" minW="11" >= 44px) */}
            <Box
              asChild
              minH="11"
              minW="11"
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="full"
              color="brand.whatsappAccessible"
              _hover={{ bg: "bg.subtle", color: "brand.whatsappAccessibleHover" }}
              _active={{ transform: "scale(0.94)" }}
              _focusVisible={{
                outline: "2px solid",
                outlineColor: "ring.primary",
                outlineOffset: "2px",
              }}
              transition={`background-color ${DUR_CSS.fast} ${EASE_SOFT}, color ${DUR_CSS.fast} ${EASE_SOFT}`}
              _motionReduce={{ transition: "none", transform: "none" }}
              style={{ flexShrink: 0 }}
            >
              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contactar por WhatsApp"
              >
                <WhatsAppIcon size={20} aria-hidden="true" style={{ flexShrink: 0 }} />
              </a>
            </Box>

            {/* Disparador de menú (target 44×44, icono Menu/X a 20px) */}
            <MenuToggle
              ref={toggleButtonRef}
              isOpen={isMenuOpen}
              onToggle={handleToggle}
              overlayId="mobile-menu-overlay"
              id="mobile-menu-toggle-button"
            />
          </HStack>
        </HStack>
      </Box>

      {/* Overlay de Menú a Pantalla Completa */}
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
