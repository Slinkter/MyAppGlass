"use client";

/**
 * @file MenuOverlay.tsx
 * @description Panel de menú móvil a pantalla completa (Alternativa A) para el Design System v2.
 * Cumple R1–R12:
 * - Pantalla completa (minH="100dvh" o 100% en contained), fondo papel cálido (bg="bg.paper").
 * - Sin backdrop-filter en el panel ni animación de box-shadow.
 * - Entrada 650ms (DUR_CSS.panelIn) y salida 450ms (DUR_CSS.panelOut) con EASE_PANEL.
 * - Con prefers-reduced-motion: reduce, animación solo fade de 150ms.
 * - Enlaces numerados 01–05 con máscara de texto (MenuLink).
 * - Acordeón suave de servicios (ServicesAccordion) con los 10 slugs reales de Firestore.
 * - Pie del menú con botón píldora navy "Cotizar por WhatsApp", enlaces secundarios (Mi Cuenta,
 *   Libro de reclamaciones, Políticas) y alternador de modo oscuro, todos con área >= 44px.
 * - Ciclo de vida: useLockBodyScroll, useFocusTrap, botón Atrás de Android (popstate) y auto-cierre
 *   por cambio de ruta o viewport >= 1024px.
 */

import React, { useEffect, useRef, useState } from "react";
import RouterLink from "next/link";
import { usePathname } from "next/navigation";
import {
  Box,
  HStack,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  MessageCircle,
  User,
  FileText,
  ShieldCheck,
  Phone,
} from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { ColorModeButton } from "@/components/ui/color-mode";
import { companyData } from "@/shared/config/company-data";
import {
  DUR_CSS,
  DUR_MS,
  EASE_PANEL,
  EASE_SOFT,
} from "@/shared/constants/motion";
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

  // R7 & Accesibilidad: Atrapamiento de foco accesible
  useFocusTrap(overlayRef, isOpen, onClose, triggerRef);

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

  const navItems = [
    { number: "01", label: "Inicio", href: "/" },
    { number: "02", label: "Servicios", isAccordion: true },
    { number: "03", label: "Proyectos", href: "/#proyectos" },
    { number: "04", label: "Ubicación", href: "/#ubicacion" },
    { number: "05", label: "Contacto", href: "/contacto" },
  ];

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
      w="full"
      h={contained ? "full" : undefined}
      minH={contained ? "100%" : "100dvh"}
      zIndex={1200}
      bg="bg.paper"
      overflowY="auto"
      overscrollBehavior="contain"
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
      {/* Contenedor interno centrado con padding superior para despejar la barra */}
      <Box
        w="full"
        maxW="md"
        mx="auto"
        minH={contained ? "100%" : "100dvh"}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        px={{ base: "5", sm: "6" }}
        pt="24"
        pb="8"
      >
        {/* Navegación Principal numerada 01–05 */}
        <VStack as="nav" aria-label="Enlaces de navegación" align="stretch" gap="1" w="full">
          {navItems.map((item, index) => {
            if (item.isAccordion) {
              return (
                <MenuLink
                  key={item.number}
                  number={item.number}
                  label={item.label}
                  isOpen={isOpen}
                  index={index}
                  isAccordionTrigger
                  isAccordionOpen={isServicesOpen}
                  accordionId="mobile-services-accordion"
                  onClick={() => setIsServicesOpen((prev) => !prev)}
                >
                  <ServicesAccordion
                    isOpen={isServicesOpen}
                    onItemClick={onClose}
                    id="mobile-services-accordion"
                  />
                </MenuLink>
              );
            }

            const isCurrent =
              item.href === "/"
                ? pathname === "/"
                : item.href?.startsWith("/#")
                ? false
                : pathname === item.href;

            return (
              <MenuLink
                key={item.number}
                number={item.number}
                label={item.label}
                href={item.href}
                isOpen={isOpen}
                index={index}
                isActive={isCurrent}
                onClick={onClose}
              />
            );
          })}
        </VStack>

        {/* Pie del Menú Móvil */}
        <VStack align="stretch" gap="5" pt="8" w="full">
          {/* CTA Principal de WhatsApp: píldora navy a ancho completo */}
          <Button
            asChild
            variant={"navy" as unknown as ButtonProps["variant"]}
            size="lg"
            w="full"
            minH="12"
            gap="3"
            _active={{ transform: "scale(0.98)" }}
          >
            <a
              href={whatsappQuoteUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
            >
              <MessageCircle size={20} aria-hidden="true" style={{ flexShrink: 0 }} />
              Cotizar por WhatsApp
            </a>
          </Button>

          {/* Enlaces secundarios (todos con target >= 44px / minH="11") */}
          <SimpleGrid columns={2} gap="2" w="full">
            <Box
              asChild
              display="block"
              borderRadius="md"
              _focusVisible={{
                outline: "2px solid",
                outlineColor: "ring.primary",
                outlineOffset: "2px",
              }}
            >
              <RouterLink
                href="/mi-cuenta"
                onClick={onClose}
                style={{ textDecoration: "none" }}
              >
                <HStack
                  minH="11"
                  px="3"
                  py="2"
                  borderRadius="md"
                  color="text.body"
                  transition={`background-color ${DUR_CSS.fast} ${EASE_SOFT}, color ${DUR_CSS.fast} ${EASE_SOFT}`}
                  _hover={{ bg: "bg.subtle", color: "accent.navy" }}
                >
                  <User size={16} aria-hidden="true" style={{ flexShrink: 0 }} />
                  <Text fontSize="sm" fontWeight="500">
                    Mi Cuenta
                  </Text>
                </HStack>
              </RouterLink>
            </Box>

            <Box
              asChild
              display="block"
              borderRadius="md"
              _focusVisible={{
                outline: "2px solid",
                outlineColor: "ring.primary",
                outlineOffset: "2px",
              }}
            >
              <RouterLink
                href="/libro-de-reclamacion"
                onClick={onClose}
                style={{ textDecoration: "none" }}
              >
                <HStack
                  minH="11"
                  px="3"
                  py="2"
                  borderRadius="md"
                  color="text.body"
                  transition={`background-color ${DUR_CSS.fast} ${EASE_SOFT}, color ${DUR_CSS.fast} ${EASE_SOFT}`}
                  _hover={{ bg: "bg.subtle", color: "accent.navy" }}
                >
                  <FileText size={16} aria-hidden="true" style={{ flexShrink: 0 }} />
                  <Text fontSize="sm" fontWeight="500">
                    Reclamaciones
                  </Text>
                </HStack>
              </RouterLink>
            </Box>

            <Box
              asChild
              display="block"
              borderRadius="md"
              _focusVisible={{
                outline: "2px solid",
                outlineColor: "ring.primary",
                outlineOffset: "2px",
              }}
            >
              <RouterLink
                href="/politicas-empresa"
                onClick={onClose}
                style={{ textDecoration: "none" }}
              >
                <HStack
                  minH="11"
                  px="3"
                  py="2"
                  borderRadius="md"
                  color="text.body"
                  transition={`background-color ${DUR_CSS.fast} ${EASE_SOFT}, color ${DUR_CSS.fast} ${EASE_SOFT}`}
                  _hover={{ bg: "bg.subtle", color: "accent.navy" }}
                >
                  <ShieldCheck size={16} aria-hidden="true" style={{ flexShrink: 0 }} />
                  <Text fontSize="sm" fontWeight="500">
                    Políticas
                  </Text>
                </HStack>
              </RouterLink>
            </Box>

            <Box
              asChild
              minH="11"
              px="3"
              py="2"
              borderRadius="md"
              color="text.body"
              display="inline-flex"
              alignItems="center"
              transition={`background-color ${DUR_CSS.fast} ${EASE_SOFT}, color ${DUR_CSS.fast} ${EASE_SOFT}`}
              _hover={{ bg: "bg.subtle", color: "accent.navy" }}
              _focusVisible={{
                outline: "2px solid",
                outlineColor: "ring.primary",
                outlineOffset: "2px",
              }}
            >
              <a href={`tel:+51${companyData.whatsappNumber.replace(/^51/, "")}`}>
                <HStack gap="2">
                  <Phone size={16} aria-hidden="true" style={{ flexShrink: 0 }} />
                  <Text fontSize="sm" fontWeight="500">
                    {companyData.whatsappDisplay}
                  </Text>
                </HStack>
              </a>
            </Box>
          </SimpleGrid>

          {/* Fila final: Copyright y Alternador de Tema (ambos >= 44px) */}
          <HStack
            w="full"
            justify="space-between"
            pt="4"
            borderTopWidth="1px"
            borderColor="border.warm"
          >
            <Text
              fontSize="xs"
              color="text.muted"
              fontFamily="body"
              letterSpacing="wide"
              textTransform="uppercase"
            >
              © {new Date().getFullYear()} GYA S.A.C.
            </Text>

            <HStack gap="2" align="center">
              <Text fontSize="xs" color="text.muted" textTransform="uppercase" letterSpacing="wider">
                Tema
              </Text>
              <ColorModeButton aria-label="Cambiar modo claro u oscuro" />
            </HStack>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
};
