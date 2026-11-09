"use client";

/**
 * @file MobileNavbarV2.tsx
 * @description Encabezado de navegación móvil v2 Minimalista Studio para Glass & Aluminum Company S.A.C.
 * Cumple R1–R12:
 * - Altura 16 (64px) + env(safe-area-inset-top, 0px).
 * - Logo oficial (/brand/logo.png) nítido sin distorsión + nombre corporativo.
 * - Botón de WhatsApp táctil accesible (target >= 44px, minH="11" minW="11", aria-label en español).
 * - MenuToggle táctil >= 48px (minH="12" minW="12") con morfismo de 3 líneas a X en 300ms.
 * - Vidrio esmerilado suave (GLASS_BLUR) con transición a papel sólido (bg="bg.paper" con border.warm) al scrollear > 24px.
 * - Revelación inteligente según dirección de scroll (useScrollDirection).
 * - Modo `contained={true}` para visualización embebida en el marco de 390px en /design-system.
 */

import { GLASS_BLUR } from "@/shared/constants/glass";
import React, { useCallback, useRef, useState } from "react";
import RouterLink from "next/link";
import Image from "next/image";
import { Box, HStack, Text } from "@chakra-ui/react";
import { MessageCircle } from "lucide-react";
import { companyData } from "@/shared/config/company-data";
import { DUR_CSS, EASE_SOFT } from "@/shared/constants/motion";
import { useScrollDirection } from "./hooks/useScrollDirection";
import { MenuToggle } from "./MenuToggle";
import { MenuOverlay } from "./MenuOverlay";

export interface MobileNavbarV2Props {
  /**
   * Si es true, la barra se confina a un marco embebido (ej. showcase de 390px)
   * usando position="absolute" en vez de position="fixed" global.
   */
  contained?: boolean;
  /** Fuerza visualmente el estado con fondo sólido (para demostraciones). */
  forceScrolled?: boolean;
  /** Referencia opcional al contenedor scrolleable (para showcase en modo contained). */
  scrollContainerRef?: React.RefObject<HTMLElement | null>;
  /** Estado de apertura controlado (opcional). */
  isOpen?: boolean;
  /** Callback al cambiar el estado de apertura. */
  onOpenChange?: (open: boolean) => void;
  /** Variante forzada opcional: "transparent" | "solid". */
  variant?: "transparent" | "solid";
}

export const MobileNavbarV2: React.FC<MobileNavbarV2Props> = ({
  contained = false,
  forceScrolled = false,
  scrollContainerRef,
  isOpen: controlledIsOpen,
  onOpenChange,
  variant,
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

  // Detección de scroll: umbral de 8px, activación de solidez a los 24px
  const { isScrolled, isVisible } = useScrollDirection({
    threshold: 8,
    scrolledOffset: 24,
    containerRef: scrollContainerRef,
    disabled: isMenuOpen, // No ocultar la barra si el menú está abierto
    forceScrolled: variant === "solid" || forceScrolled,
  });

  const shouldBeSolid =
    variant === "solid" || forceScrolled || isScrolled || isMenuOpen;
  const isBarVisible = isMenuOpen || isVisible;

  const whatsappDirectUrl = `https://wa.me/${companyData.whatsappNumber}?text=${encodeURIComponent(
    companyData.whatsappMessage
  )}`;

  return (
    <>
      <Box
        as="header"
        role="banner"
        position={contained ? "absolute" : "fixed"}
        top="0"
        left="0"
        right="0"
        w="full"
        zIndex={1700}
        pt="env(safe-area-inset-top, 0px)"
        minH="16"
        h="calc(var(--chakra-spacing-16) + env(safe-area-inset-top, 0px))"
        bg={shouldBeSolid ? "bg.paper" : "bg.paper/75"}
        css={{
          backdropFilter: GLASS_BLUR,
          WebkitBackdropFilter: GLASS_BLUR,
          "@media (prefers-reduced-transparency: reduce), (prefers-contrast: more)": {
            backdropFilter: "none",
            background: "{colors.bg.paper}",
          },
        }}
        borderBottomWidth="1px"
        borderBottomColor={shouldBeSolid ? "border.warm" : "transparent"}
        style={{
          transform: isBarVisible ? "translateY(0)" : "translateY(-100%)",
          transition: `transform ${DUR_CSS.fast} ${EASE_SOFT}, background-color ${DUR_CSS.fast} ${EASE_SOFT}, border-color ${DUR_CSS.fast} ${EASE_SOFT}`,
        }}
        _motionReduce={{
          transform: "none !important",
          transition: `background-color ${DUR_CSS.reducedFade} ease !important`,
        }}
      >
        <HStack
          h="16"
          w="full"
          maxW="md"
          mx="auto"
          px={{ base: "4", sm: "5" }}
          justify="space-between"
          align="center"
        >
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
                  h="9"
                  w="9"
                  minW="9"
                  borderRadius="md"
                  overflow="hidden"
                >
                  <Image
                    src="/brand/logo.png"
                    alt={companyData.companyName}
                    fill
                    sizes="36px"
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
                    letterSpacing="widest"
                    textTransform="uppercase"
                  >
                    Glass & Aluminum
                  </Text>
                </Box>
              </HStack>
            </RouterLink>
          </Box>

          {/* Acciones de la derecha: WhatsApp directo + Disparador de Menú */}
          <HStack gap="1" align="center">
            {/* Botón de WhatsApp táctil (minH="11" minW="11" >= 44px) */}
            <Box
              asChild
              minH="11"
              minW="11"
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="full"
              color={shouldBeSolid ? "brand.whatsappAccessible" : "text.heading"}
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
                <MessageCircle size={20} aria-hidden="true" style={{ flexShrink: 0 }} />
              </a>
            </Box>

            {/* Disparador con 3 líneas transformables a X (minH="12" minW="12" = 48px) */}
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
