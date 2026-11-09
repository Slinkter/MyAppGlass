"use client";

/**
 * @file TransitionsV2Showcase.tsx
 * @description Catálogo vivo de transiciones entre componentes y secciones (solo /design-system).
 * Todas usan `shared/constants/motion.ts`, solo `transform`/`opacity` y respetan reduced-motion.
 */

import React from "react";
import { Box, Button as ChakraButton, HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { ChevronDown } from "lucide-react";
import { Reveal } from "@shared/components/motion/Reveal";
import { NewClientModal } from "@/screens/Admin/clients/NewClientModal";
import { EMPTY_NEW_CLIENT } from "@/screens/Admin/clients/newClientForm";
import { CreateProductModal } from "@/screens/Admin/inventory/CreateProductModal";
import { ReplenishStockModal } from "@/screens/Admin/inventory/ReplenishStockModal";
import { EMPTY_PRODUCT_FORM } from "@/screens/Admin/inventory/productForm";
import { PrintOrderModal } from "@/screens/Admin/reports/PrintOrderModal";
import { DUR_CSS, EASE_SOFT, EASE_TEXT } from "@/shared/constants/motion";
import { ShowcaseCard, ShowcaseStack, SubsectionLabel } from "../../components";

const TABS = ["Ventanas", "Mamparas", "Techos"] as const;

/** Pestañas con indicador deslizante (solo transform). */
const SlidingTabs: React.FC = () => {
  const [active, setActive] = React.useState(0);
  return (
    <Box position="relative" borderBottomWidth="1px" borderColor="border.default" role="tablist" aria-label="Servicios de ejemplo">
      <HStack gap="0" align="stretch">
        {TABS.map((label, i) => (
          <ChakraButton
            key={label}
            role="tab"
            aria-selected={active === i}
            variant="ghost"
            flex="1"
            minH="11"
            borderRadius="0"
            color={active === i ? "accent.navy" : "text.muted"}
            fontWeight="semibold"
            onClick={() => setActive(i)}
          >
            {label}
          </ChakraButton>
        ))}
      </HStack>
      <Box
        position="absolute"
        bottom="-1px"
        left="0"
        h="0.5"
        w={`${100 / TABS.length}%`}
        bg="brand.navy"
        style={{
          transform: `translateX(${active * 100}%)`,
          transition: `transform 250ms ${EASE_TEXT}`,
        }}
        aria-hidden="true"
      />
    </Box>
  );
};

/** Acordeón sin medir alturas: grid-template-rows 0fr → 1fr. */
const GridAccordion: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <Box borderWidth="1px" borderColor="border.default" borderRadius="xl" overflow="hidden">
      <ChakraButton
        variant="ghost"
        w="full"
        minH="11"
        justifyContent="space-between"
        borderRadius="0"
        aria-expanded={open}
        aria-controls="acc-demo"
        onClick={() => setOpen((v) => !v)}
      >
        Servicios
        <ChevronDown
          size={20}
          aria-hidden="true"
          style={{
            flexShrink: 0,
            transform: open ? "rotate(180deg)" : "none",
            transition: `transform ${DUR_CSS.toggle} ${EASE_SOFT}`,
          }}
        />
      </ChakraButton>
      <Box
        id="acc-demo"
        display="grid"
        style={{
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: `grid-template-rows ${DUR_CSS.toggle} ${EASE_SOFT}`,
        }}
      >
        <Box overflow="hidden" minH="0">
          <VStack align="start" gap="1" p="4">
            {["Ventanas antirruido", "Mamparas de vidrio", "Techos de policarbonato"].map((s) => (
              <Text key={s} fontSize="sm" color="text.muted">
                {s}
              </Text>
            ))}
          </VStack>
        </Box>
      </Box>
    </Box>
  );
};

export const TransitionsV2Showcase: React.FC = () => (
  <ShowcaseCard
    title="Transiciones entre componentes y secciones"
    description="Revelado de sección en cascada, pestañas con indicador deslizante y acordeón sin saltos. Solo transform y opacity; con movimiento reducido solo hay fundido de 150 ms."
    badge="v2"
  >
    <ShowcaseStack>
      <SubsectionLabel>Revelado de sección (se repite al pulsar «Reiniciar»)</SubsectionLabel>
      <RevealDemo />
      <SubsectionLabel>Pestañas con indicador deslizante</SubsectionLabel>
      <SlidingTabs />
      <SubsectionLabel>Acordeón (0fr → 1fr)</SubsectionLabel>
      <GridAccordion />
      <SubsectionLabel>Los 4 modales reales de administración (datos de ejemplo)</SubsectionLabel>
      <DialogDemo />
    </ShowcaseStack>
  </ShowcaseCard>
);

const RevealDemo: React.FC = () => {
  const [run, setRun] = React.useState(0);
  return (
    <VStack align="stretch" gap="3">
      <SimpleGrid key={run} columns={{ base: 1, sm: 3 }} gap="3">
        {["Medimos en tu casa", "Fabricamos en taller", "Instalamos con garantía"].map((t, i) => (
          <Reveal key={t} index={i}>
            <Box bg="bg.surface" borderWidth="1px" borderColor="border.default" borderRadius="xl" p="4" minH="20">
              <Text fontWeight="semibold" color="accent.navy">
                {t}
              </Text>
            </Box>
          </Reveal>
        ))}
      </SimpleGrid>
      <ChakraButton variant="outline" alignSelf="start" minH="11" onClick={() => setRun((n) => n + 1)}>
        Reiniciar
      </ChakraButton>
    </VStack>
  );
};

type ReplenishProps = React.ComponentProps<typeof ReplenishStockModal>;
type PrintProps = React.ComponentProps<typeof PrintOrderModal>;

/** Datos de EJEMPLO: no son de un cliente ni de un producto reales. */
const SAMPLE_PRODUCT = {
  id: "demo",
  sku: "VID-TEMP-8",
  name: "Vidrio templado 8 mm (ejemplo)",
  stock: 12,
  unit: "m2",
} as unknown as ReplenishProps["product"];

const SAMPLE_ORDER = {
  orderNumber: "GYA-EJEMPLO-0001",
  clientName: "Cliente de ejemplo",
  clientDniRuc: "00000000",
  clientPhone: "999 999 999",
  clientAddress: "La Molina, Lima",
  clientDistrict: "La Molina",
  paymentMethod: "transferencia_bancaria",
  items: [{ sku: "VID-TEMP-8", name: "Vidrio templado 8 mm", quantity: 2, unit: "m2", unitPrice: 135, totalPrice: 270 }],
  subtotal: 270,
  igv: 48.6,
  total: 318.6,
} as unknown as PrintProps["order"];

type ModalKey = "cliente" | "producto" | "stock" | "guia" | null;

const DialogDemo: React.FC = () => {
  const [open, setOpen] = React.useState<ModalKey>(null);
  const [qty, setQty] = React.useState(5);
  const close = () => setOpen(null);
  const noop = (e?: React.FormEvent) => e?.preventDefault();
  const items: Array<[Exclude<ModalKey, null>, string]> = [
    ["cliente", "Nuevo cliente"],
    ["producto", "Nuevo producto"],
    ["stock", "Entrada de stock"],
    ["guia", "Guía de salida"],
  ];
  return (
    <>
      <HStack gap="2" wrap="wrap">
        {items.map(([key, label]) => (
          <ChakraButton key={key} id={"modal-demo-" + key} variant="outline" minH="11" onClick={() => setOpen(key)}>
            {label}
          </ChakraButton>
        ))}
      </HStack>
      {open === "cliente" && (
        <NewClientModal newClient={EMPTY_NEW_CLIENT} onChange={() => {}} onSubmit={noop} onClose={close} actionLoading={false} statusMessage={null} />
      )}
      {open === "producto" && (
        <CreateProductModal formData={EMPTY_PRODUCT_FORM} onChange={() => {}} isEditing={false} onSubmit={noop} onClose={close} actionLoading={false} statusMessage={{ type: "error", text: "Ejemplo de mensaje de error." }} />
      )}
      {open === "stock" && (
        <ReplenishStockModal product={SAMPLE_PRODUCT} qty={qty} onQtyChange={setQty} onConfirm={close} onClose={close} actionLoading={false} statusMessage={{ type: "success", text: "Ejemplo de mensaje de éxito." }} />
      )}
      {open === "guia" && <PrintOrderModal order={SAMPLE_ORDER} onPrint={close} onClose={close} />}
    </>
  );
};
