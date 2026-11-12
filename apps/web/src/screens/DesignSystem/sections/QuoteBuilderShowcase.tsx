"use client";

/**
 * @file QuoteBuilderShowcase.tsx
 * @description Pestaña "Formularios y botones": los tres componentes del cotizador de presupuesto
 * (selector de opción, formulario de ventana y carrito) con estado local de demostración.
 * No toca Firestore ni localStorage.
 */

import React, { useCallback, useRef, useState } from "react";
import { Box, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import type { WindowQuoteItem } from "@/entities/quote";
import { OptionChooser } from "@/features/presupuesto/components/OptionChooser";
import { QuoteCart } from "@/features/presupuesto/components/QuoteCart";
import { WindowForm } from "@/features/presupuesto/components/WindowForm";
import { ShowcaseCard, SubsectionLabel } from "../components";

const CATEGORY = "Ventana";
const SYSTEM = "Sistema Nova";

const REFERENCE_ITEMS: WindowQuoteItem[] = [
  { id: "ref-1", widthM: 1.2, heightM: 1.6, glass: "crudo", finish: "ninguno", glassColor: "incoloro", profileColor: "negro" },
  { id: "ref-2", widthM: 1.45, heightM: 1.6, glass: "crudo", finish: "ninguno", glassColor: "incoloro", profileColor: "negro" },
  { id: "ref-3", widthM: 1.48, heightM: 1.8, glass: "crudo", finish: "ninguno", glassColor: "incoloro", profileColor: "negro" },
];

const noop = () => undefined;

const StatusLine: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Text role="status" fontSize="sm" color="text.muted" bg="surface.container" borderRadius="card" px="4" py="3">
    {children}
  </Text>
);

const ChooserDemo: React.FC = () => {
  const [status, setStatus] = useState("Aún no eligió ninguna opción.");
  return (
    <VStack align="stretch" gap="4">
      <OptionChooser
        categoryLabel={CATEGORY}
        systemLabel={SYSTEM}
        onChooseQuote={() => setStatus("Demo: eligió «Cotizar en línea».")}
        onChooseVisit={() => setStatus("Demo: eligió «Agendar visita técnica».")}
      />
      <StatusLine>{status}</StatusLine>
    </VStack>
  );
};

const BuilderDemo: React.FC = () => {
  const [items, setItems] = useState<WindowQuoteItem[]>([]);
  const [outside, setOutside] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [status, setStatus] = useState("Agregue una ventana para verla en el carrito.");
  const counter = useRef(0);

  const editing = items.find((i) => i.id === editingId);

  const handleSubmit = useCallback(
    (data: Omit<WindowQuoteItem, "id">) => {
      if (editingId) {
        setItems((prev) => prev.map((i) => (i.id === editingId ? { ...data, id: editingId } : i)));
        setEditingId(null);
        setStatus("Demo: ventana actualizada.");
      } else {
        counter.current += 1;
        const id = `demo-${counter.current}`;
        setItems((prev) => [...prev, { ...data, id }]);
        setStatus("Demo: ventana agregada al carrito.");
      }
    },
    [editingId],
  );

  return (
    <VStack align="stretch" gap="4">
      <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: "6", lg: "8" }} alignItems="start">
        <Box minW="0">
          <WindowForm
            key={editing?.id ?? "new"}
            systemLabel={SYSTEM}
            initial={editing}
            onSubmit={handleSubmit}
            onCancelEdit={() => setEditingId(null)}
            onRequestVisit={() => setStatus("Demo: pidió una visita técnica.")}
          />
        </Box>
        <Box minW="0">
          <QuoteCart
            items={items}
            outsideLaMolina={outside}
            onOutsideLaMolinaChange={setOutside}
            editingId={editingId}
            onEdit={setEditingId}
            onRemove={(id) => {
              setItems((prev) => prev.filter((i) => i.id !== id));
              setEditingId((cur) => (cur === id ? null : cur));
              setStatus("Demo: ventana quitada.");
            }}
            onClear={() => {
              setItems([]);
              setEditingId(null);
              setStatus("Demo: carrito vaciado.");
            }}
            onGenerate={() => setStatus("Demo: aquí se generaría el presupuesto (no hace nada).")}
          />
        </Box>
      </SimpleGrid>
      <StatusLine>{status}</StatusLine>
    </VStack>
  );
};

const CartStatesDemo: React.FC = () => {
  const [outsideFilled, setOutsideFilled] = useState(false);
  const [outsideEmpty, setOutsideEmpty] = useState(false);
  return (
    <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: "6", lg: "8" }} alignItems="start">
      <VStack align="stretch" gap="3" minW="0">
        <SubsectionLabel>Con las 3 ventanas de referencia (vidrio crudo, sin acabado)</SubsectionLabel>
        <QuoteCart
          items={REFERENCE_ITEMS}
          outsideLaMolina={outsideFilled}
          onOutsideLaMolinaChange={setOutsideFilled}
          onEdit={noop}
          onRemove={noop}
          onClear={noop}
          onGenerate={noop}
        />
      </VStack>
      <VStack align="stretch" gap="3" minW="0">
        <SubsectionLabel>Carrito vacío</SubsectionLabel>
        <QuoteCart
          items={[]}
          outsideLaMolina={outsideEmpty}
          onOutsideLaMolinaChange={setOutsideEmpty}
          onEdit={noop}
          onRemove={noop}
          onClear={noop}
          onGenerate={noop}
        />
      </VStack>
    </SimpleGrid>
  );
};

export const QuoteBuilderShowcase: React.FC = () => (
  <VStack align="stretch" gap={{ base: "8", md: "12" }}>
    <ShowcaseCard
      title="Cotizador · elegir opción"
      description="Primera pantalla de /presupuesto: el cliente elige entre cotizar en línea o agendar una visita técnica. Los botones solo cambian el texto de abajo."
    >
      <ChooserDemo />
    </ShowcaseCard>
    <ShowcaseCard
      title="Cotizador · formulario y carrito"
      description="Funcionan juntos como en la página real: agregue ventanas, edite una línea, quítela o cambie la zona de instalación. Es una demostración; no se guarda nada."
    >
      <BuilderDemo />
    </ShowcaseCard>
    <ShowcaseCard
      title="Cotizador · estados del carrito"
      description="Totales con las tres ventanas de referencia y estado vacío, para revisarlos de una vez."
    >
      <CartStatesDemo />
    </ShowcaseCard>
  </VStack>
);
