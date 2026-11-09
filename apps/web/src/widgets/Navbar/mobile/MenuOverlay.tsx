"use client";

/**
 * @file MenuOverlay.tsx
 * @description Panel de menú móvil a pantalla completa minimalista Studio para Glass & Aluminum Company S.A.C.
 * Cumple R1–R12:
 * - Pantalla completa (minH="100dvh" o 100% en contained), fondo papel cálido (bg="bg.paper" #F7F6F3).
 * - Tipografía editorial minimalista en Lora (font de títulos) con numeración discreta 01–05 (MenuLink).
 * - Acordeón de servicios fluido (ServicesAccordion) con grid-template-rows: 0fr -> 1fr y los 10 servicios oficiales de Firestore.
 * - Entrada 650ms (DUR_CSS.panelIn) y salida 450ms (DUR_CSS.panelOut) con EASE_PANEL sin efecto pesado de blur.
 * - Con prefers-reduced-motion: reduce, animación solo fade de 150ms.
 * - Pie del menú: Botón de WhatsApp a ancho completo en color accesible (variant="whatsapp" con brand.whatsappAccessible),
 *   botones secundarios (Mi Cuenta, Reclamaciones, Políticas, Teléfono) y ColorModeButton, todos con minH="11" (>=44px).
 * - Accesibilidad total: useFocusTrap, useLockBodyScroll, Escape para cerrar y captura de botón Atrás de Android (popstate).
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
import { Button } from "@/components/ui/button";
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

  // R7 & Accesibilidad: Atrapamiento de foco accesible con Escape y retorno de foco (solo fuera de simulador)
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
      zIndex={1600}
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
        pt={{ base: "18", sm: "20" }}
        pb="6"
      >
        {/* Navegación Principal numerada 01–05 */}
        <VStack as="nav" aria-label="Enlaces de navegación" align="stretch" gap="0.5" w="full">
          {navItems.map((item, index) => {
            if (item.isAccordion) {
              return (
                <MenuLink
                  key={item.number}
                  number={item.number}
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
                contained={contained}
                isActive={isCurrent}
                onClick={onClose}
              />
            );
          })}
        </VStack>

        {/* Pie del Menú Móvil Minimalista */}
        <VStack align="stretch" gap="3.5" pt="5" w="full">
          {/* CTA Principal de WhatsApp: píldora verde accesible */}
          <Button
            asChild
            variant="whatsapp"
            size="lg"
            w="full"
            minH="11"
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
              <MessageCircle size={18} aria-hidden="true" style={{ flexShrink: 0 }} />
              <Text as="span" fontWeight="600" fontSize="sm">
                Cotizar por WhatsApp
              </Text>
            </a>
          </Button>

          {/* Fila de contacto directo */}
          <HStack justify="space-between" align="center" px="1">
            <Text fontSize="xs" color="text.muted" fontWeight="medium">
              Atención inmediata:
            </Text>
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
                href={`tel:+51${companyData.whatsappNumber.replace(/^51/, "")}`}
                onClick={(e) => {
                  if (contained) e.preventDefault();
                }}
                style={{ textDecoration: "none" }}
              >
                <HStack gap="1.5" align="center" minH="11" px="1">
                  <Phone size={14} aria-hidden="true" style={{ flexShrink: 0 }} />
                  <Text fontSize="xs" fontWeight="600" color="text.heading">
                    {companyData.whatsappDisplay}
                  </Text>
                </HStack>
              </a>
            </Box>
          </HStack>

          {/* Enlaces secundarios sutiles y elegantes (sin cajas pesadas) */}
          <HStack
            wrap="wrap"
            justify="center"
            gap="1"
            pt="1"
            borderTopWidth="1px"
            borderTopColor="border.subtle"
          >
            <Box asChild>
              <RouterLink
                href="/mi-cuenta"
                onClick={(e) => {
                  if (contained) e.preventDefault();
                  onClose();
                }}
                style={{ textDecoration: "none" }}
              >
                <HStack minH="11" px="2.5" py="1" borderRadius="md" _hover={{ color: "text.heading" }}>
                  <User size={13} aria-hidden="true" style={{ flexShrink: 0, opacity: 0.7 }} />
                  <Text fontSize="xs" color="text.muted">Mi Cuenta</Text>
                </HStack>
              </RouterLink>
            </Box>

            <Text fontSize="xs" color="border.default" userSelect="none">·</Text>

            <Box asChild>
              <RouterLink
                href="/libro-de-reclamacion"
                onClick={(e) => {
                  if (contained) e.preventDefault();
                  onClose();
                }}
                style={{ textDecoration: "none" }}
              >
                <HStack minH="11" px="2.5" py="1" borderRadius="md" _hover={{ color: "text.heading" }}>
                  <FileText size={13} aria-hidden="true" style={{ flexShrink: 0, opacity: 0.7 }} />
                  <Text fontSize="xs" color="text.muted">Reclamaciones</Text>
                </HStack>
              </RouterLink>
            </Box>

            <Text fontSize="xs" color="border.default" userSelect="none">·</Text>

            <Box asChild>
              <RouterLink
                href="/politicas-empresa"
                onClick={(e) => {
                  if (contained) e.preventDefault();
                  onClose();
                }}
                style={{ textDecoration: "none" }}
              >
                <HStack minH="11" px="2.5" py="1" borderRadius="md" _hover={{ color: "text.heading" }}>
                  <ShieldCheck size={13} aria-hidden="true" style={{ flexShrink: 0, opacity: 0.7 }} />
                  <Text fontSize="xs" color="text.muted">Políticas</Text>
                </HStack>
              </RouterLink>
            </Box>
          </HStack>

          {/* Fila final: Copyright y Alternador de Tema */}
          <HStack
            w="full"
            justify="space-between"
            align="center"
            pt="2"
            borderTopWidth="1px"
            borderTopColor="border.warm"
          >
            <Text
              fontSize="2xs"
              color="text.muted"
              fontFamily="mono"
              letterSpacing="wide"
            >
              © {new Date().getFullYear()} GYA S.A.C.
            </Text>

            <HStack gap="2" align="center">
              <Text fontSize="2xs" color="text.muted" textTransform="uppercase" letterSpacing="wider">
                Tema
              </Text>
              <ColorModeButton aria-label="Cambiar modo claro u oscuro" minH="11" minW="11" />
            </HStack>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
};
