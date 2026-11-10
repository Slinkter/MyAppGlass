"use client";

/**
 * @file Variant1Sheet.tsx
 * @description Variante 1 · Hoja inferior.
 * Barra superior simple (logo + menú). El menú sube desde abajo, en la zona del pulgar:
 * - Fondo (`overlay.scrim`) que aparece con fundido, sin cubrir la barra: el botón sigue siendo el cierre.
 * - Hoja con esquinas superiores redondeadas y asa; entra con translateY (650 ms) y sale en 450 ms.
 * - Enlaces numerados en cascada (máscara hacia arriba) y CTA de WhatsApp con teléfono al pie.
 * - Escape, foco atrapado, bloqueo de scroll y retorno de foco al botón.
 */

import React, { useCallback, useRef, useState } from "react";
import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/shared/components/icons/WhatsAppIcon";
import { glassSurface } from "@/shared/constants/glass";
import { DUR_CSS, EASE_PANEL } from "@/shared/constants/motion";
import { MenuToggle } from "@/widgets/Navbar/mobile/MenuToggle";
import { useFocusTrap } from "@/widgets/Navbar/mobile/hooks/useFocusTrap";
import { useLockBodyScroll } from "@/widgets/Navbar/mobile/hooks/useLockBodyScroll";
import { LabBrand } from "../components/LabBrand";
import { LabNavLink } from "../components/LabNavLink";
import {
  LAB_BAR_HEIGHT,
  LAB_ITEMS,
  LAB_PHONE_HREF,
  LAB_PHONE_LABEL,
  LAB_WHATSAPP_URL,
} from "../lab-data";

export const Variant1Sheet: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(LAB_ITEMS[0]?.href ?? "/");
  const toggleRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useFocusTrap(sheetRef, open, close, toggleRef);
  useLockBodyScroll(open);

  // `visibility` se retrasa hasta el final de la salida para que el panel cerrado no reciba foco
  const transition = open
    ? `transform ${DUR_CSS.panelIn} ${EASE_PANEL}, visibility 0s linear 0s`
    : `transform ${DUR_CSS.panelOut} ${EASE_PANEL}, visibility 0s linear ${DUR_CSS.panelOut}`;

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
          <MenuToggle
            ref={toggleRef}
            isOpen={open}
            onToggle={() => setOpen((value) => !value)}
            overlayId="lab-sheet"
            id="lab-sheet-toggle"
          />
        </HStack>
      </Box>

      {/* Fondo: empieza bajo la barra para que el botón siga siendo accesible */}
      <Box
        position="fixed"
        left="0"
        right="0"
        bottom="0"
        zIndex="overlay"
        bg="overlay.scrim"
        aria-hidden="true"
        onClick={close}
        style={{
          top: LAB_BAR_HEIGHT,
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: `opacity ${open ? DUR_CSS.panelIn : DUR_CSS.panelOut} ${EASE_PANEL}`,
        }}
        _motionReduce={{ transition: `opacity ${DUR_CSS.reducedFade} ease !important` }}
      />

      <Box
        ref={sheetRef}
        id="lab-sheet"
        role="dialog"
        aria-modal="true"
        aria-label="Menú principal de navegación"
        aria-hidden={!open}
        position="fixed"
        left="0"
        right="0"
        bottom="0"
        zIndex="overlay"
        display="flex"
        flexDirection="column"
        maxH={`calc(100% - ${LAB_BAR_HEIGHT} - 1rem)`}
        bg="bg.surface"
        borderTopRadius="modal"
        borderTopWidth="1px"
        borderColor="border.warm"
        pb="calc(env(safe-area-inset-bottom, 0px) + 1rem)"
        style={{
          transform: open ? "translateY(0)" : "translateY(100%)",
          transition,
          visibility: open ? "visible" : "hidden",
        }}
        _motionReduce={{
          transform: "none !important",
          transition: `opacity ${DUR_CSS.reducedFade} ease !important`,
          opacity: open ? 1 : 0,
        }}
      >
        {/* Asa visual */}
        <Box
          alignSelf="center"
          mt="3"
          mb="2"
          w="10"
          h="1"
          borderRadius="full"
          bg="border.warmStrong"
          aria-hidden="true"
        />

        <Box flex="1" minH="0" overflowY="auto" overscrollBehavior="contain" px="3" pt="1">
          <VStack as="nav" aria-label="Enlaces de navegación" align="stretch" gap="0.5">
            {LAB_ITEMS.map((item, index) => (
              <LabNavLink
                key={item.href}
                number={String(index + 1).padStart(2, "0")}
                label={item.label}
                href={item.href}
                index={index}
                open={open}
                active={active === item.href}
                onSelect={(href) => {
                  setActive(href);
                  close();
                }}
              />
            ))}
          </VStack>
        </Box>

        <VStack align="stretch" gap="2" px="6" pt="4">
          <Button
            asChild
            variant="whatsapp"
            size="lg"
            w="full"
            minH="12"
            borderRadius="full"
            gap="2.5"
          >
            <a href={LAB_WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon size={20} aria-hidden="true" style={{ flexShrink: 0 }} />
              <Text as="span" fontWeight="600" fontSize="sm">
                Cotizar por WhatsApp
              </Text>
            </a>
          </Button>
          <Box asChild alignSelf="center" borderRadius="md">
            <a href={LAB_PHONE_HREF} style={{ textDecoration: "none" }}>
              <HStack gap="2" minH="11" px="3">
                <Phone size={16} aria-hidden="true" style={{ flexShrink: 0 }} />
                <Text fontSize="md" fontWeight="600" color="text.heading" whiteSpace="nowrap">
                  {LAB_PHONE_LABEL}
                </Text>
              </HStack>
            </a>
          </Box>
        </VStack>
      </Box>
    </>
  );
};
