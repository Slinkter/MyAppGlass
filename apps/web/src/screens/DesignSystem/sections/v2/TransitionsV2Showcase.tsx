"use client";

/**
 * @file TransitionsV2Showcase.tsx
 * @description Catálogo vivo de transiciones entre componentes y secciones (solo /design-system).
 * Todas usan `shared/constants/motion.ts`, solo `transform`/`opacity` y respetan reduced-motion.
 */

import React from "react";
import { Box, HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { Check, ChevronDown, Copy, X } from "lucide-react";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Reveal } from "@shared/components/motion/Reveal";
import { NewClientModal } from "@/features/admin/components/clients/NewClientModal";
import { EMPTY_NEW_CLIENT } from "@/features/admin/components/clients/newClientForm";
import { CreateProductModal } from "@/features/admin/components/inventory/CreateProductModal";
import { ReplenishStockModal } from "@/features/admin/components/inventory/ReplenishStockModal";
import { EMPTY_PRODUCT_FORM } from "@/features/admin/components/inventory/productForm";
import { PrintOrderModal } from "@/features/admin/components/reports/PrintOrderModal";
import { DUR_CSS, EASE_SOFT, EASE_TEXT } from "@/shared/constants/motion";
import { useMotionBudget } from "@/shared/hooks/ui/useMotionBudget";
import { DrawLine, ShowcaseCard, ShowcasePanel, ShowcaseStack, SubsectionLabel, TabFade } from "../../components";

const TABS = ["Ventanas", "Mamparas", "Techos"] as const;

/** Pestañas con indicador deslizante (solo transform). */
const SlidingTabs: React.FC = () => {
  const [active, setActive] = React.useState(0);
  return (
    <Box position="relative" borderBottomWidth="1px" borderColor="border.default" role="tablist" aria-label="Servicios de ejemplo">
      <HStack gap="0" align="stretch">
        {TABS.map((label, i) => (
          <Button
            key={label}
            role="tab"
            aria-selected={active === i}
            variant="ghost"
            flex="1"
            minH="11"
            borderRadius="0"
            color={active === i ? "accent.ink" : "text.muted"}
            fontWeight="semibold"
            onClick={() => setActive(i)}
          >
            {label}
          </Button>
        ))}
      </HStack>
      <Box
        position="absolute"
        bottom="-1px"
        left="0"
        h="0.5"
        w={`${100 / TABS.length}%`}
        bg="brand.ink"
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
      <Button
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
      </Button>
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
      <SubsectionLabel>Cascada de tarjetas (máximo 5, 40 ms entre cada una; se repite con «Reiniciar»)</SubsectionLabel>
      <RevealDemo />
      <SubsectionLabel>Entrada de cada tarjeta del catálogo (Reveal) y línea que se dibuja bajo el título</SubsectionLabel>
      <ShowcasePanel>
        <Text fontWeight="700" color="text.heading" fontFamily="heading" fontSize="xl">Título de ejemplo</Text>
        <LineDemo />
        <RuleList
          rules={[
            "Cada ShowcaseCard entra con Reveal: sube 16 px y aparece una sola vez al entrar en pantalla (450 ms).",
            "La línea bajo el título usa scaleX de 0 a 1 en 500 ms, con 200 ms de espera; una sola vez, sin bucle.",
            "Máximo 1 o 2 elementos animándose a la vez; en dispositivos lite o con movimiento reducido no se anima.",
          ]}
        />
      </ShowcasePanel>
      <SubsectionLabel>Cambio de pestaña con Fade-Through MD3 (TabFade)</SubsectionLabel>
      <TabFadeDemo />
      <SubsectionLabel>Micro-interacciones MD3 (confirmación de copia y hoja inferior)</SubsectionLabel>
      <Md3MicroInteractionsDemo />
      <SubsectionLabel>Pestañas con indicador deslizante</SubsectionLabel>
      <SlidingTabs />
      <SubsectionLabel>Acordeón (0fr → 1fr)</SubsectionLabel>
      <GridAccordion />
      <SubsectionLabel>Los 4 modales reales de administración (datos de ejemplo)</SubsectionLabel>
      <DialogDemo />
    </ShowcaseStack>
  </ShowcaseCard>
);

const RuleList: React.FC<{ rules: string[] }> = ({ rules }) => (
  <VStack as="ul" align="start" gap="1" mt="4" pl="4" listStyleType="disc">
    {rules.map((r) => (
      <Text as="li" key={r} fontSize="sm" color="text.muted">
        {r}
      </Text>
    ))}
  </VStack>
);

const LineDemo: React.FC = () => {
  const [run, setRun] = React.useState(0);
  return (
    <HStack mt="3" gap="4" align="center">
      <Box flex="1" key={run}>
        <DrawLine />
      </Box>
      <Button variant="outline" minH="11" onClick={() => setRun((n) => n + 1)}>
        Repetir línea
      </Button>
    </HStack>
  );
};

const Md3MicroInteractionsDemo: React.FC = () => {
  const level = useMotionBudget();
  const skip = level !== "full";
  const [copied, setCopied] = React.useState(false);
  const [sheetOpen, setSheetOpen] = React.useState(false);

  React.useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(id);
  }, [copied]);

  React.useEffect(() => {
    if (!sheetOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSheetOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [sheetOpen]);

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
      <ShowcasePanel>
        <VStack align="start" gap="3">
          <Text fontWeight="600" color="text.heading" fontSize="sm">
            Confirmación de copia (scale + opacity)
          </Text>
          <HStack gap="3" wrap="wrap">
            <Button variant="outline" minH="11" onClick={() => setCopied(true)}>
              <Copy size={16} aria-hidden="true" />
              Copiar código
            </Button>
            <Box
              role="status"
              aria-live="polite"
              style={{
                opacity: copied ? 1 : 0,
                transform: copied || skip ? "scale(1)" : "scale(0.95)",
                transition: skip
                  ? undefined
                  : `opacity ${DUR_CSS.fast} ${EASE_SOFT}, transform ${DUR_CSS.fast} ${EASE_SOFT}`,
              }}
            >
              {copied && (
                <Badge variant={"chipSuccess" as never}>
                  <Check size={12} aria-hidden="true" />
                  Copiado
                </Badge>
              )}
            </Box>
          </HStack>
        </VStack>
      </ShowcasePanel>

      <ShowcasePanel position="relative" overflow="hidden" minH="44">
        <VStack align="start" gap="3">
          <Text fontWeight="600" color="text.heading" fontSize="sm">
            Hoja inferior MD3 (translateY, 300 ms / 200 ms)
          </Text>
          <Button variant="primary" minH="11" onClick={() => setSheetOpen(true)}>
            Abrir hoja inferior
          </Button>
        </VStack>
        <Box
          position="absolute"
          inset="0"
          bg="overlay.scrim"
          pointerEvents={sheetOpen ? "auto" : "none"}
          onClick={() => setSheetOpen(false)}
          style={{
            opacity: sheetOpen ? 1 : 0,
            transition: skip ? undefined : `opacity ${DUR_CSS.fast} ${EASE_SOFT}`,
          }}
          aria-hidden={!sheetOpen}
        />
        <Box
          role="dialog"
          aria-label="Ejemplo de hoja inferior"
          aria-modal="false"
          position="absolute"
          left="0"
          right="0"
          bottom="0"
          p="4"
          bg="bg.surface"
          borderTopWidth="1px"
          borderColor="border.warm"
          borderTopRadius="card"
          style={{
            transform: sheetOpen ? "translateY(0)" : "translateY(100%)",
            transition: skip
              ? undefined
              : `transform ${sheetOpen ? DUR_CSS.toggle : DUR_CSS.fast} ${sheetOpen ? EASE_TEXT : EASE_SOFT}`,
          }}
        >
          <HStack justify="space-between" align="center" gap="3">
            <Text fontSize="sm" fontWeight="600" color="text.heading">
              Opciones rápidas (Escape para cerrar)
            </Text>
            <Button
              variant="ghost"
              size="sm"
              minH="11"
              minW="11"
              aria-label="Cerrar hoja inferior"
              onClick={() => setSheetOpen(false)}
            >
              <X size={16} aria-hidden="true" />
            </Button>
          </HStack>
        </Box>
      </ShowcasePanel>
    </SimpleGrid>
  );
};

const TabFadeDemo: React.FC = () => {
  const [tab, setTab] = React.useState(0);
  return (
    <VStack align="stretch" gap="3">
      <HStack gap="2" wrap="wrap">
        {["Tokens", "Tarjetas", "Navegación"].map((label, i) => (
          <Button key={label} variant={tab === i ? "primary" : "outline"} minH="11" onClick={() => setTab(i)}>
            {label}
          </Button>
        ))}
      </HStack>
      <ShowcasePanel minH="20">
        <TabFade key={tab}>
          <Text color="text.body">Contenido de la pestaña «{["Tokens", "Tarjetas", "Navegación"][tab]}».</Text>
        </TabFade>
      </ShowcasePanel>
      <RuleList
        rules={[
          "Fade-Through MD3: opacity + translateY(6 px → 0) en 200 ms (EASE_SOFT) al montar el contenido.",
          "Sin movimiento en dispositivos lite o con prefers-reduced-motion activo.",
        ]}
      />
    </VStack>
  );
};

const RevealDemo: React.FC = () => {
  const [run, setRun] = React.useState(0);
  return (
    <VStack align="stretch" gap="3">
      <SimpleGrid key={run} columns={{ base: 1, sm: 3 }} gap="3">
        {["Medimos en tu casa", "Fabricamos en taller", "Instalamos con garantía"].map((t, i) => (
          <Reveal key={t} index={i}>
            <Box bg="bg.surface" borderWidth="1px" borderColor="border.default" borderRadius="xl" p="4" minH="20">
              <Text fontWeight="semibold" color="accent.ink">
                {t}
              </Text>
            </Box>
          </Reveal>
        ))}
      </SimpleGrid>
      <Button variant="outline" alignSelf="start" minH="11" onClick={() => setRun((n) => n + 1)}>
        Reiniciar
      </Button>
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
          <Button key={key} id={"modal-demo-" + key} variant="outline" minH="11" onClick={() => setOpen(key)}>
            {label}
          </Button>
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
