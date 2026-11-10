"use client";

/**
 * @file LabNavLink.tsx
 * @description Enlace numerado de las variantes de prueba, con entrada animada y escalonada.
 * - `reveal="up"`: sube con máscara (translateY 105% → 0), como el menú actual.
 * - `reveal="left"`: entra desde la derecha (translateX 28px → 0).
 * - Solo `transform` y `opacity`; con `prefers-reduced-motion` queda un fundido corto.
 * - Activo: barra fina a la izquierda + color; el área táctil mide al menos 44 px.
 * - En la prueba no navega: marca el enlace como activo y avisa al padre.
 */

import React from "react";
import { Box, HStack, Text } from "@chakra-ui/react";
import { DUR_CSS, DUR_MS, EASE_SOFT, EASE_TEXT } from "@/shared/constants/motion";

export interface LabNavLinkProps {
  number: string;
  label: string;
  href: string;
  /** Posición en la lista, para la cascada. */
  index: number;
  /** Si el panel que contiene el enlace está abierto. */
  open: boolean;
  active: boolean;
  onSelect: (href: string) => void;
  reveal?: "up" | "left";
  /** `invert` para fondos de marca oscuros (usa los tokens de superficie como texto). */
  tone?: "default" | "invert";
  size?: "md" | "lg";
}

export const LabNavLink: React.FC<LabNavLinkProps> = ({
  number,
  label,
  href,
  index,
  open,
  active,
  onSelect,
  reveal = "up",
  tone = "default",
  size = "md",
}) => {
  const delayMs = DUR_MS.textDelayAfterPanel + index * DUR_MS.staggerMenu;
  const invert = tone === "invert";

  const hidden = reveal === "up" ? "translateY(105%)" : "translateX(28px)";

  return (
    <Box w="full" overflow={reveal === "up" ? "hidden" : "visible"}>
      <Box
        style={{
          transform: open ? "translate(0, 0)" : hidden,
          opacity: open ? 1 : 0,
          transition: open
            ? `transform ${DUR_CSS.textIn} ${EASE_TEXT} ${delayMs}ms, opacity ${DUR_CSS.textIn} ${EASE_TEXT} ${delayMs}ms`
            : `transform ${DUR_CSS.fast} ${EASE_SOFT}, opacity ${DUR_CSS.fast} ${EASE_SOFT}`,
        }}
        _motionReduce={{
          transform: "none !important",
          transition: `opacity ${DUR_CSS.reducedFade} ease !important`,
        }}
      >
        <Box
          asChild
          display="block"
          w="full"
          borderRadius="md"
          _focusVisible={{
            outline: "2px solid",
            outlineColor: "ring.primary",
            outlineOffset: "-2px",
          }}
        >
          <a
            href={href}
            aria-current={active ? "page" : undefined}
            onClick={(event) => {
              event.preventDefault();
              onSelect(href);
            }}
            style={{ textDecoration: "none" }}
          >
            <HStack
              position="relative"
              minH={size === "lg" ? "16" : "12"}
              w="full"
              gap="3"
              px="3"
              borderRadius="md"
              _hover={{ bg: invert ? "bg.surface/10" : "bg.subtle" }}
              _active={{ bg: invert ? "bg.surface/10" : "bg.subtle" }}
              _before={{
                content: '""',
                display: active ? "block" : "none",
                position: "absolute",
                left: "0",
                top: "50%",
                transform: "translateY(-50%)",
                w: "0.5",
                h: "6",
                borderRadius: "full",
                bg: invert ? "bg.surface" : "accent.ink",
              }}
            >
              <Text
                as="span"
                fontSize="xs"
                fontFamily="mono"
                fontWeight="600"
                minW="6"
                color={invert ? "bg.surface/60" : active ? "accent.ink" : "text.muted"}
                aria-hidden="true"
              >
                {number}
              </Text>
              <Text
                as="span"
                fontFamily="heading"
                fontSize={size === "lg" ? { base: "3xl", sm: "4xl" } : { base: "xl", sm: "2xl" }}
                fontWeight={size === "lg" ? "600" : "500"}
                letterSpacing="-0.01em"
                lineHeight="1.2"
                color={invert ? "bg.surface" : active ? "accent.ink" : "text.heading"}
              >
                {label}
              </Text>
            </HStack>
          </a>
        </Box>
      </Box>
    </Box>
  );
};
