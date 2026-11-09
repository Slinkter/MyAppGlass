"use client";

/**
 * @file MenuOverlay.tsx
 * @description Hoja de menú móvil en tres zonas para Glass & Aluminum Company S.A.C.
 * - Cabecera propia (60px + safe-area-top) con "Menú" y botón X de cierre DENTRO del diálogo y del focus trap.
 * - Zona central scrolleable (única con overflow): 5 enlaces primarios + acordeón de servicios.
 * - Pie sticky (nunca scrollea): CTA "Cotizar por WhatsApp" + teléfono, mi cuenta y tema.
 * - zIndex 1800: cubre la barra superior móvil (1700). `contained` respeta el marco del showcase.
 * - Entrada 650ms (DUR_CSS.panelIn) y salida 450ms (DUR_CSS.panelOut) con solo transform + opacity.
 * - prefers-reduced-motion: solo fade corto. useFocusTrap, useLockBodyScroll, Escape, popstate y cierre por ruta.
 * - Gutters de 24 px, tipografía mínima `xs`, iconos 16/20 y separadores por CSS (sin `<Text>·</Text>`).
 */

import React, { useEffect, useRef, useState } from "react";
import RouterLink from "next/link";
import { usePathname } from "next/navigation";
import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { Phone, User, X } from "lucide-react";
import { WhatsAppIcon } from "@/shared/components/icons/WhatsAppIcon";
import { Button } from "@/components/ui/button";
import { ColorModeButton } from "@/components/ui/color-mode";
import { companyData } from "@/shared/config/company-data";
import { MOBILE_NAV_ITEMS } from "@/shared/config/nav-items";
import { DUR_CSS, DUR_MS, EASE_PANEL } from "@/shared/constants/motion";
import { useFocusTrap } from "./hooks/useFocusTrap";
import { useLockBodyScroll } from "./hooks/useLockBodyScroll";
import { MenuLink } from "./MenuLink";
import { ServicesAccordion } from "./ServicesAccordion";

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
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isVisibleInDom, setIsVisibleInDom] = useState(isOpen);

  // Mantener en el DOM durante la transición de salida (450ms)
  useEffect(() => {
    if (isOpen) {
      setIsVisibleInDom(true);
    } else {
      const timer = window.setTimeout(() => {
        setIsVisibleInDom(false);
        setIsServicesOpen(false);
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
      if (!poppedByBackButton.current && window.history.state?.mobileMenuOpen) {
        window.history.back();
      }
    };
  }, [isOpen, contained, onClose]);

  const whatsappQuoteUrl = `https://wa.me/${companyData.whatsappNumber}?text=${encodeURIComponent(
    companyData.whatsappMessage
  )}`;

  const phoneHref = `tel:+51${companyData.whatsappNumber.replace(/^51/, "")}`;

  return (
    <Box
      ref={overlayRef}
      id={id}
      role="dialog"
      aria-modal="true"
      aria-label="Menú principal de navegación"
      aria-hidden={!isOpen}
      position={contained ? "absolute" : "fixed"}
      inset="0"
      display="flex"
      flexDirection="column"
      w="full"
      h={contained ? "full" : "100dvh"}
      overflow="hidden"
      zIndex={1800}
      bg="bg.section"
      pointerEvents={isOpen ? "auto" : "none"}
      visibility={isVisibleInDom ? "visible" : "hidden"}
      style={{
        transform: isOpen ? "translateY(0)" : "translateY(-100%)",
        opacity: isOpen ? 1 : 0,
        transition: isOpen
          ? `transform ${DUR_CSS.panelIn} ${EASE_PANEL}, opacity ${DUR_CSS.panelIn} ${EASE_PANEL}`
          : `transform ${DUR_CSS.panelOut} ${EASE_PANEL}, opacity ${DUR_CSS.panelOut} ${EASE_PANEL}`,
      }}
      _motionReduce={{
        transform: "none !important",
        transition: `opacity ${DUR_CSS.reducedFade} ease !important`,
      }}
    >
      {/* Zona 1 · Cabecera interna: "Menú" + cierre (dentro del diálogo y del focus trap) */}
      <HStack
        flexShrink={0}
        justify="space-between"
        align="center"
        w="full"
        h="calc(60px + env(safe-area-inset-top, 0px))"
        pt="env(safe-area-inset-top, 0px)"
        px="6"
        borderBottomWidth="1px"
        borderBottomColor="border.warm"
      >
        <Text fontSize="sm" fontWeight="600" color="text.heading">
          Menú
        </Text>

        <Button
          variant="ghost"
          minH="11"
          minW="11"
          p="0"
          borderRadius="full"
          aria-label="Cerrar menú"
          onClick={onClose}
        >
          <X size={20} aria-hidden="true" style={{ flexShrink: 0 }} />
        </Button>
      </HStack>

      {/* Zona 2 · Única zona con scroll */}
      <Box
        flex="1"
        minH="0"
        overflowY="auto"
        overscrollBehavior="contain"
        px="6"
        pt="4"
        pb="6"
      >
        <VStack as="nav" aria-label="Enlaces de navegación" align="stretch" gap="0.5" w="full">
          {MOBILE_NAV_ITEMS.map((item, index) => {
            const number = String(index + 1).padStart(2, "0");

            if (item.isAccordion) {
              return (
                <MenuLink
                  key={item.href}
                  number={number}
                  label={item.label}
                  isOpen={isOpen}
                  index={index}
                  contained={contained}
                  isAccordionTrigger
                  isAccordionOpen={isServicesOpen}
                  accordionId="mobile-services-accordion"
                  onClick={() => setIsServicesOpen((prev) => !prev)}
                >
                  <ServicesAccordion
                    isOpen={isServicesOpen}
                    onItemClick={onClose}
                    id="mobile-services-accordion"
                    contained={contained}
                  />
                </MenuLink>
              );
            }

            const isCurrent =
              item.href === "/"
                ? pathname === "/"
                : item.href.startsWith("/#")
                ? false
                : pathname === item.href;

            return (
              <MenuLink
                key={item.href}
                number={number}
                label={item.label}
                href={item.href}
                isOpen={isOpen}
                index={index}
                contained={contained}
                isActive={isCurrent}
                onClick={onClose}
              />
            );
          })}
        </VStack>
      </Box>

      {/* Zona 3 · Pie sticky: nunca scrollea */}
      <Box
        flexShrink={0}
        px="6"
        pt="3"
        pb="calc(env(safe-area-inset-bottom, 0px) + 0.75rem)"
        borderTopWidth="1px"
        borderTopColor="border.warm"
        bg="bg.section"
      >
        <VStack align="stretch" gap="3" w="full">
          {/* CTA principal */}
          <Button
            asChild
            variant="whatsapp"
            size="lg"
            w="full"
            minH="12"
            borderRadius="full"
            gap="2.5"
            _active={{ transform: "scale(0.98)" }}
          >
            <a
              href={whatsappQuoteUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                if (contained) e.preventDefault();
                onClose();
              }}
            >
              <WhatsAppIcon size={20} aria-hidden="true" style={{ flexShrink: 0 }} />
              <Text as="span" fontWeight="600" fontSize="sm">
                Cotizar por WhatsApp
              </Text>
            </a>
          </Button>

          {/* Acciones secundarias: 3 targets de 44 px */}
          <HStack justify="space-between" align="center" gap="2" w="full">
            <Box
              asChild
              borderRadius="md"
              _focusVisible={{
                outline: "2px solid",
                outlineColor: "ring.primary",
                outlineOffset: "2px",
              }}
            >
              <a
                href={phoneHref}
                onClick={(e) => {
                  if (contained) e.preventDefault();
                }}
                style={{ textDecoration: "none" }}
              >
                <HStack
                  gap="1.5"
                  align="center"
                  minH="11"
                  minW="11"
                  px="2"
                  borderRadius="md"
                  _hover={{ bg: "bg.subtle" }}
                  _active={{ bg: "bg.subtle" }}
                >
                  <Phone size={16} aria-hidden="true" style={{ flexShrink: 0 }} />
                  <Text fontSize="xs" fontWeight="600" color="text.heading">
                    {companyData.whatsappDisplay}
                  </Text>
                </HStack>
              </a>
            </Box>

            <Box
              asChild
              borderRadius="md"
              _focusVisible={{
                outline: "2px solid",
                outlineColor: "ring.primary",
                outlineOffset: "2px",
              }}
            >
              <RouterLink
                href="/mi-cuenta"
                onClick={(e) => {
                  if (contained) e.preventDefault();
                  onClose();
                }}
                style={{ textDecoration: "none" }}
              >
                <HStack
                  gap="1.5"
                  align="center"
                  minH="11"
                  minW="11"
                  px="2"
                  borderRadius="md"
                  _hover={{ bg: "bg.subtle" }}
                  _active={{ bg: "bg.subtle" }}
                >
                  <User size={16} aria-hidden="true" style={{ flexShrink: 0 }} />
                  <Text fontSize="xs" fontWeight="600" color="text.heading">
                    Mi cuenta
                  </Text>
                </HStack>
              </RouterLink>
            </Box>

            <ColorModeButton
              aria-label="Cambiar modo claro u oscuro"
              iconSize={20}
              minH="11"
              minW="11"
            />
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
};
