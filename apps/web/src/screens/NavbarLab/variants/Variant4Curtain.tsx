"use client";

/**
 * @file Variant4Curtain.tsx
 * @description Variante 4 · Telón de marca.
 * Pantalla completa en negro de marca (`brand.ink`) con texto en el color de superficie (se invierte en modo oscuro).
 * - El telón cae desde arriba con translateY (650 ms) y se recoge en 450 ms.
 * - Una línea fina se dibuja de izquierda a derecha (scaleX) cuando el telón termina de caer.
 * - Enlaces grandes en Lora que se revelan con máscara, en cascada.
 * - El panel trae su propia cabecera (logo + cierre) en la misma posición que la barra, sin salto visual.
 * - Escape, foco atrapado, bloqueo de scroll y retorno de foco al botón.
 */

import React, { useCallback, useRef, useState } from "react";
import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { Phone, X } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { WhatsAppIcon } from "@/shared/components/icons/WhatsAppIcon";
import { glassSurface } from "@/shared/constants/glass";
import { DUR_CSS, DUR_MS, EASE_PANEL, EASE_TEXT } from "@/shared/constants/motion";
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

export const Variant4Curtain: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(LAB_ITEMS[0]?.href ?? "/");
  const toggleRef = useRef<HTMLButtonElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useFocusTrap(curtainRef, open, close, toggleRef);
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
            overlayId="lab-curtain"
            id="lab-curtain-toggle"
          />
        </HStack>
      </Box>

      <Box
        ref={curtainRef}
        id="lab-curtain"
        role="dialog"
        aria-modal="true"
        aria-label="Menú principal de navegación"
        aria-hidden={!open}
        position="fixed"
        inset="0"
        zIndex="overlay"
        display="flex"
        flexDirection="column"
        bg="brand.ink"
        color="bg.surface"
        style={{
          transform: open ? "translateY(0)" : "translateY(-100%)",
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
          align="center"
          h={LAB_BAR_HEIGHT}
          pt="env(safe-area-inset-top, 0px)"
          px="6"
        >
          <LabBrand color="bg.surface" />
          <Button
            variant="ghost"
            minH="11"
            minW="11"
            p="0"
            borderRadius="full"
            color="bg.surface"
            _hover={{ bg: "bg.surface/10" }}
            aria-label="Cerrar menú"
            onClick={close}
          >
            <X size={20} aria-hidden="true" style={{ flexShrink: 0 }} />
          </Button>
        </HStack>

        {/* Línea de revelado: se dibuja cuando el telón ya cayó */}
        <Box
          mx="6"
          h="1px"
          bg="bg.surface/30"
          aria-hidden="true"
          style={{
            transformOrigin: "left center",
            transform: open ? "scaleX(1)" : "scaleX(0)",
            transition: open
              ? `transform ${DUR_CSS.panelIn} ${EASE_TEXT} ${DUR_MS.textDelayAfterPanel}ms`
              : `transform ${DUR_CSS.fast} ${EASE_PANEL}`,
          }}
          _motionReduce={{ transition: "none", transform: "none !important" }}
        />

        <Box flex="1" minH="0" overflowY="auto" overscrollBehavior="contain" px="3" pt="6">
          <VStack as="nav" aria-label="Enlaces de navegación" align="stretch" gap="1">
            {LAB_ITEMS.map((item, index) => (
              <LabNavLink
                key={item.href}
                number={String(index + 1).padStart(2, "0")}
                label={item.label}
                href={item.href}
                index={index}
                open={open}
                active={active === item.href}
                tone="invert"
                size="lg"
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
          <Box asChild alignSelf="center" borderRadius="md">
            <a href={LAB_PHONE_HREF} style={{ textDecoration: "none" }}>
              <HStack gap="2" minH="11" px="3">
                <Phone size={16} aria-hidden="true" style={{ flexShrink: 0 }} />
                <Text fontSize="md" fontWeight="600" color="bg.surface" whiteSpace="nowrap">
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
