"use client";

/**
 * @file Variant3Drawer.tsx
 * @description Variante 3 · Cajón lateral.
 * Barra superior simple (logo + menú). El cajón entra por la derecha sobre el contenido:
 * - Fondo (`overlay.scrim`) con fundido; el cajón tiene su propia cabecera con el botón de cierre.
 * - Ancho: 86 % con tope de 22 rem; entra con translateX (650 ms) y sale en 450 ms.
 * - Enlaces numerados que entran desde la derecha en cascada; pie con WhatsApp, teléfono y tema.
 * - Escape, foco atrapado, bloqueo de scroll y retorno de foco al botón.
 */

import React, { useCallback, useRef, useState } from "react";
import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ColorModeButton } from "@/components/ui/color-mode";
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

export const Variant3Drawer: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(LAB_ITEMS[0]?.href ?? "/");
  const toggleRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useFocusTrap(drawerRef, open, close, toggleRef);
  useLockBodyScroll(open);

  const duration = open ? DUR_CSS.panelIn : DUR_CSS.panelOut;

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
            overlayId="lab-drawer"
            id="lab-drawer-toggle"
          />
        </HStack>
      </Box>

      <Box
        position="fixed"
        inset="0"
        zIndex="overlay"
        bg="overlay.scrim"
        aria-hidden="true"
        onClick={close}
        style={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: `opacity ${duration} ${EASE_PANEL}`,
        }}
        _motionReduce={{ transition: `opacity ${DUR_CSS.reducedFade} ease !important` }}
      />

      <Box
        ref={drawerRef}
        id="lab-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Menú principal de navegación"
        aria-hidden={!open}
        position="fixed"
        top="0"
        right="0"
        bottom="0"
        zIndex="overlay"
        display="flex"
        flexDirection="column"
        w="86%"
        maxW="22rem"
        bg="bg.surface"
        borderLeftWidth="1px"
        borderColor="border.warm"
        style={{
          transform: open ? "translateX(0)" : "translateX(100%)",
          visibility: open ? "visible" : "hidden",
          transition: `transform ${duration} ${EASE_PANEL}, visibility 0s linear ${
            open ? "0s" : DUR_CSS.panelOut
          }`,
        }}
        _motionReduce={{
          transform: "none !important",
          transition: `opacity ${DUR_CSS.reducedFade} ease !important`,
          opacity: open ? 1 : 0,
        }}
      >
        <HStack
          flexShrink={0}
          justify="space-between"
          h={LAB_BAR_HEIGHT}
          pt="env(safe-area-inset-top, 0px)"
          pl="6"
          pr="4"
          borderBottomWidth="1px"
          borderBottomColor="border.warm"
        >
          <LabBrand />
          <Button
            variant="ghost"
            minH="11"
            minW="11"
            p="0"
            borderRadius="full"
            aria-label="Cerrar menú"
            onClick={close}
          >
            <X size={20} aria-hidden="true" style={{ flexShrink: 0 }} />
          </Button>
        </HStack>

        <Box flex="1" minH="0" overflowY="auto" overscrollBehavior="contain" px="3" pt="4">
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
                reveal="left"
                onSelect={(href) => {
                  setActive(href);
                  close();
                }}
              />
            ))}
          </VStack>
        </Box>

        <VStack
          flexShrink={0}
          align="stretch"
          gap="3"
          px="6"
          pt="4"
          pb="calc(env(safe-area-inset-bottom, 0px) + 1rem)"
          borderTopWidth="1px"
          borderTopColor="border.warm"
        >
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
          <HStack justify="space-between" align="center">
            <Box asChild borderRadius="md">
              <a href={LAB_PHONE_HREF} style={{ textDecoration: "none" }}>
                <HStack gap="2" minH="11" pr="3">
                  <Phone size={16} aria-hidden="true" style={{ flexShrink: 0 }} />
                  <Text fontSize="md" fontWeight="600" color="text.heading" whiteSpace="nowrap">
                    {LAB_PHONE_LABEL}
                  </Text>
                </HStack>
              </a>
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
    </>
  );
};
