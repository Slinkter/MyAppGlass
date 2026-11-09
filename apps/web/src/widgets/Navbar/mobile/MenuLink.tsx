"use client";

/**
 * @file MenuLink.tsx
 * @description Enlace principal numerado del menú móvil v2 con revelación por máscara de texto.
 * Cumple R1–R12:
 * - Máscara con overflow="hidden": translateY(105%) -> translateY(0) en 500ms con EASE_TEXT.
 * - Cascada de 60ms por ítem, comenzando +200ms tras la apertura del panel (DUR_MS.textDelayAfterPanel).
 * - Al cerrar sale primero en 200ms (DUR_CSS.fast).
 * - Tipografía: numeración en Inter xs uppercase; título en Lora 3xl–4xl.
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
}) => {
  // Retardo en milisegundos para la entrada escalonada
  const delayMs = DUR_MS.textDelayAfterPanel + index * DUR_MS.staggerMenu;

  const contentInner = (
    <HStack
      minH="11"
      w="full"
      align="baseline"
      justify="space-between"
      py="2"
      gap="4"
    >
      <HStack align="baseline" gap="3.5" minW="0" flex="1">
        {/* Numeración en Inter xs uppercase */}
        <Text
          as="span"
          fontSize="xs"
          fontFamily="body"
          fontWeight="700"
          letterSpacing="widest"
          textTransform="uppercase"
          color={isActive ? "accent.navy" : "text.muted"}
          display="inline-block"
          minW="6"
          userSelect="none"
        >
          {number}
        </Text>

        {/* Título editorial en Lora */}
        <Text
          as="span"
          fontFamily="heading"
          fontSize={{ base: "3xl", sm: "4xl" }}
          fontWeight="600"
          lineHeight="1.1"
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
          transition={`transform ${DUR_CSS.fast} ${EASE_SOFT}`}
          _motionReduce={{ transition: "none" }}
          style={{ flexShrink: 0 }}
        >
          <ChevronDown size={24} aria-hidden="true" style={{ flexShrink: 0 }} />
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
              borderRadius="md"
              _focusVisible={{
                outline: "2px solid",
                outlineColor: "ring.primary",
                outlineOffset: "2px",
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
                outlineOffset: "2px",
              }}
            >
              <RouterLink
                href={href}
                onClick={onClick}
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
