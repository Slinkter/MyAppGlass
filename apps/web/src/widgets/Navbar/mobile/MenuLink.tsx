"use client";

/**
 * @file MenuLink.tsx
 * @description Enlace principal numerado del menú móvil v2 con tipografía editorial y revelación por máscara.
 * Cumple R1–R12:
 * - Tipografía editorial Studio: numeración discreta 01–05 en Inter/Mono xs y título principal en Lora (font de títulos).
 * - Máscara con overflow="hidden": translateY(105%) -> translateY(0) en 500ms con EASE_TEXT.
 * - Cascada de 60ms por ítem, comenzando +200ms tras la apertura del panel (DUR_MS.textDelayAfterPanel).
 * - Al cerrar sale primero en 200ms (DUR_CSS.fast).
 * - Área táctil >= 44px (minH="11").
 * - Foco visible de 2px con ring.primary (R7).
 * - Compatible con RouterLink o como botón disparador del acordeón de servicios.
 */

import React from "react";
import RouterLink from "next/link";
import { Box, HStack, Text } from "@chakra-ui/react";
import { ChevronDown } from "lucide-react";
import { DUR_CSS, DUR_MS, EASE_SOFT, EASE_TEXT } from "@/shared/constants/motion";

export interface MenuLinkProps {
  /** Número en formato de dos dígitos ("01", "02", etc.). */
  number: string;
  /** Título principal de la sección. */
  label: string;
  /** Ruta de navegación Next.js (si es un enlace estándar). */
  href?: string;
  /** Callback al hacer clic. */
  onClick?: () => void;
  /** Indica si la sección está activa en la página actual. */
  isActive?: boolean;
  /** Indica si el panel del menú está abierto (para orquestar la entrada/salida). */
  isOpen: boolean;
  /** Índice del ítem para calcular la cascada (stagger) de retardo. */
  index: number;
  /** Si es true, se renderiza como botón disparador del acordeón de servicios. */
  isAccordionTrigger?: boolean;
  /** Estado de apertura del acordeón hijo (si es trigger). */
  isAccordionOpen?: boolean;
  /** ID del elemento de acordeón controlado para aria-controls. */
  accordionId?: string;
  /** Contenido adicional subordinado (ej. acordeón de servicios). */
  children?: React.ReactNode;
  /** Si es true, previene la navegación global para el simulador de showcase. */
  contained?: boolean;
}

export const MenuLink: React.FC<MenuLinkProps> = ({
  number,
  label,
  href = "#",
  onClick,
  isActive = false,
  isOpen,
  index,
  isAccordionTrigger = false,
  isAccordionOpen = false,
  accordionId,
  children,
  contained = false,
}) => {
  // Retardo en milisegundos para la entrada escalonada
  const delayMs = DUR_MS.textDelayAfterPanel + index * DUR_MS.staggerMenu;

  const contentInner = (
    <HStack
      minH="11"
      w="full"
      align="center"
      justify="space-between"
      py="1"
      gap="3"
    >
      <HStack align="center" gap="3" minW="0" flex="1">
        {/* Numeración discreta 01–05 con estética editorial */}
        <Text
          as="span"
          fontSize="2xs"
          fontFamily="mono"
          fontWeight="600"
          letterSpacing="widest"
          color={isActive ? "accent.navy" : "text.muted"}
          display="inline-block"
          minW="5"
          userSelect="none"
        >
          {number}
        </Text>

        {/* Título editorial minimalista en Lora */}
        <Text
          as="span"
          fontFamily="heading"
          fontSize={{ base: "xl", sm: "2xl" }}
          fontWeight="500"
          letterSpacing="-0.01em"
          lineHeight="1.2"
          color={isActive ? "accent.navy" : "text.heading"}
          transition={`color ${DUR_CSS.fast} ${EASE_SOFT}`}
          _hover={{ color: "accent.navy" }}
        >
          {label}
        </Text>
      </HStack>

      {/* Ícono de flecha rotatoria para acordeón */}
      {isAccordionTrigger && (
        <Box
          display="inline-flex"
          alignItems="center"
          justifyContent="center"
          color="text.muted"
          transform={isAccordionOpen ? "rotate(180deg)" : "rotate(0deg)"}
          transition={`transform ${DUR_CSS.fast} ${EASE_SOFT}, color ${DUR_CSS.fast} ${EASE_SOFT}`}
          _hover={{ color: "text.heading" }}
          _motionReduce={{ transition: "none" }}
          style={{ flexShrink: 0 }}
        >
          <ChevronDown size={18} aria-hidden="true" style={{ flexShrink: 0 }} />
        </Box>
      )}
    </HStack>
  );

  return (
    <Box w="full">
      {/* Máscara de recorte de texto (overflow: hidden) */}
      <Box w="full" overflow="hidden">
        <Box
          style={{
            transform: isOpen ? "translateY(0)" : "translateY(105%)",
            opacity: isOpen ? 1 : 0,
            transition: isOpen
              ? `transform ${DUR_CSS.textIn} ${EASE_TEXT} ${delayMs}ms, opacity ${DUR_CSS.textIn} ${EASE_TEXT} ${delayMs}ms`
              : `transform ${DUR_CSS.fast} ${EASE_SOFT}, opacity ${DUR_CSS.fast} ${EASE_SOFT}`,
          }}
          _motionReduce={{
            transform: "none !important",
            transition: `opacity ${DUR_CSS.reducedFade} ease !important`,
          }}
        >
          {isAccordionTrigger ? (
            <Box
              asChild
              display="block"
              w="full"
              textAlign="left"
              cursor="pointer"
              bg="transparent"
              p="0"
              border="none"
              borderRadius="md"
              _focusVisible={{
                outline: "2px solid",
                outlineColor: "ring.primary",
                outlineOffset: "4px",
              }}
            >
              <button
                type="button"
                onClick={onClick}
                aria-expanded={isAccordionOpen}
                aria-controls={accordionId}
              >
                {contentInner}
              </button>
            </Box>
          ) : (
            <Box
              asChild
              display="block"
              w="full"
              borderRadius="md"
              _focusVisible={{
                outline: "2px solid",
                outlineColor: "ring.primary",
                outlineOffset: "4px",
              }}
            >
              <RouterLink
                href={href}
                onClick={(e) => {
                  if (contained) {
                    e.preventDefault();
                  }
                  onClick?.();
                }}
                aria-current={isActive ? "page" : undefined}
                style={{ textDecoration: "none", display: "block" }}
              >
                {contentInner}
              </RouterLink>
            </Box>
          )}
        </Box>
      </Box>

      {/* Contenido subordinado (acordeón expandible) */}
      {children}
    </Box>
  );
};
