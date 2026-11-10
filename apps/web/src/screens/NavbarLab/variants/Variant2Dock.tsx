"use client";

/**
 * @file Variant2Dock.tsx
 * @description Variante 2 · Barra inferior flotante.
 * Sin menú que abrir: cuatro destinos siempre a mano, en la zona del pulgar.
 * - Barra superior mínima: logo + WhatsApp directo.
 * - Dock flotante en forma de píldora; una pastilla de color invertido desliza entre destinos
 *   con `translateX` en múltiplos de su propio ancho (25 %), así no depende de medidas en píxeles.
 * - Cada destino mide al menos 56 px de alto; la etiqueta es corta (una palabra) y el nombre accesible es el mismo.
 * - Con `prefers-reduced-motion` la pastilla cambia de lugar sin deslizar.
 */

import React, { useState } from "react";
import { Box, HStack, Text } from "@chakra-ui/react";
import { Home, Images, LayoutGrid, Phone, type LucideIcon } from "lucide-react";
import { WhatsAppIcon } from "@/shared/components/icons/WhatsAppIcon";
import { glassSurface } from "@/shared/constants/glass";
import { DUR_CSS, EASE_PANEL, EASE_SOFT } from "@/shared/constants/motion";
import { LabBrand } from "../components/LabBrand";
import { LAB_BAR_HEIGHT, LAB_ITEMS, LAB_WHATSAPP_URL } from "../lab-data";

const ICONS: Record<string, LucideIcon> = {
  Inicio: Home,
  Servicios: LayoutGrid,
  Proyectos: Images,
  Contacto: Phone,
};

/** El dock admite como máximo 5 destinos; aquí se usan los 4 que tienen icono propio. */
const DOCK_ITEMS = LAB_ITEMS.filter((item) => item.label in ICONS);

export const Variant2Dock: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <Box
        as="header"
        position="fixed"
        top="0"
        left="0"
        right="0"
        zIndex="banner"
        h={LAB_BAR_HEIGHT}
        pt="env(safe-area-inset-top, 0px)"
        px="6"
        {...glassSurface}
        borderWidth="0"
        borderBottomWidth="1px"
        borderBottomColor="border.warm"
      >
        <HStack h="15" justify="space-between" align="center">
          <LabBrand />
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
            transition={`background-color ${DUR_CSS.fast} ${EASE_SOFT}, transform ${DUR_CSS.fast} ${EASE_SOFT}`}
            _motionReduce={{ transition: "none", transform: "none" }}
          >
            <a
              href={LAB_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contactar por WhatsApp"
            >
              <WhatsAppIcon size={20} aria-hidden="true" style={{ flexShrink: 0 }} />
            </a>
          </Box>
        </HStack>
      </Box>

      <Box
        as="nav"
        aria-label="Navegación principal"
        position="fixed"
        left="4"
        right="4"
        zIndex="banner"
        h="16"
        p="1"
        borderRadius="full"
        bg="bg.surface"
        borderWidth="1px"
        borderColor="border.default"
        boxShadow="elevatedLg"
        style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 1rem)" }}
      >
        <Box position="relative" h="full" display="grid" gridTemplateColumns="repeat(4, 1fr)">
          {/* Pastilla que desliza entre destinos */}
          <Box
            aria-hidden="true"
            position="absolute"
            top="0"
            bottom="0"
            left="0"
            w="25%"
            borderRadius="full"
            bg="text.heading"
            style={{
              transform: `translateX(${activeIndex * 100}%)`,
              transition: `transform ${DUR_CSS.panelOut} ${EASE_PANEL}`,
            }}
            _motionReduce={{ transition: "none" }}
          />

          {DOCK_ITEMS.map((item, index) => {
            const Icon = ICONS[item.label] as LucideIcon;
            const isActive = index === activeIndex;

            return (
              <Box
                key={item.href}
                asChild
                position="relative"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                gap="0.5"
                minH="14"
                borderRadius="full"
                color={isActive ? "bg.surface" : "text.muted"}
                transition={`color ${DUR_CSS.toggle} ${EASE_SOFT}`}
                _active={{ transform: "scale(0.94)" }}
                _focusVisible={{
                  outline: "2px solid",
                  outlineColor: "ring.primary",
                  outlineOffset: "2px",
                }}
                _motionReduce={{ transition: "none", transform: "none" }}
              >
                <a
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  onClick={(event) => {
                    event.preventDefault();
                    setActiveIndex(index);
                  }}
                  style={{ textDecoration: "none" }}
                >
                  <Icon size={20} aria-hidden="true" style={{ flexShrink: 0 }} />
                  <Text as="span" fontSize="xs" fontWeight="600" lineHeight="1">
                    {item.label}
                  </Text>
                </a>
              </Box>
            );
          })}
        </Box>
      </Box>
    </>
  );
};
