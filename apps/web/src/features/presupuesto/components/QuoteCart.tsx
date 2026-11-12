"use client";

/**
 * @file QuoteCart.tsx
 * @description Carrito del cotizador (Ventana · Sistema Nova): líneas, zona de instalación,
 * totales y acciones. Solo muestra; precios y hojas salen del motor de `entities/quote`.
 */

import React, { useId, useMemo } from "react";
import { Box, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { Checkbox } from "@chakra-ui/react";
import { Button } from "@/shared/ui/button";
import { EmptyState } from "@/shared/ui/empty-state";
import { WINDOW_PRICING, formatSoles, priceWindow, quoteTotals, type WindowQuoteItem } from "@/entities/quote";
import { QuoteCartLine } from "./QuoteCartLine";
import { QuoteTotalsPanel } from "./QuoteTotalsPanel";
import { QUOTE_TEXTS } from "./quoteTexts";

const cartText = QUOTE_TEXTS.cart;

export interface QuoteCartProps {
  items: WindowQuoteItem[];
  outsideLaMolina: boolean;
  onOutsideLaMolinaChange: (outside: boolean) => void;
  editingId?: string | null;
  onEdit: (id: string) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
  onGenerate: () => void;
  loading?: boolean;
}

export const QuoteCart: React.FC<QuoteCartProps> = ({
  items,
  outsideLaMolina,
  onOutsideLaMolinaChange,
  editingId = null,
  onEdit,
  onRemove,
  onClear,
  onGenerate,
  loading = false,
}) => {
  const headingId = useId();
  const helpId = useId();
  const empty = items.length === 0;

  const totals = useMemo(
    () => quoteTotals(items.map((i) => priceWindow(i).subtotal), outsideLaMolina),
    [items, outsideLaMolina],
  );

  return (
    <Box as="section" aria-labelledby={headingId} w="full" minW="0">
      <VStack align="stretch" gap="4">
        <Heading as="h2" id={headingId} fontFamily="heading" fontWeight="700" color="text.heading" fontSize="2xl" lineHeight="title">
          {cartText.title}
        </Heading>

        {empty ? (
          <EmptyState title={cartText.empty} />
        ) : (
          <VStack as="ul" aria-label={cartText.items} align="stretch" gap="3" m="0" p="0">
            {items.map((item, index) => (
              <QuoteCartLine
                key={item.id}
                item={item}
                index={index}
                editing={item.id === editingId}
                onEdit={onEdit}
                onRemove={onRemove}
              />
            ))}
          </VStack>
        )}

        <Box
          p="4"
          borderRadius="xl"
          bg="bg.subtle"
          border="1px solid"
          borderColor="border.subtle"
        >
          <HStack align="flex-start" gap="3">
            <Checkbox.Root
              checked={!outsideLaMolina}
              onCheckedChange={(details) => onOutsideLaMolinaChange(!details.checked)}
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control />
            </Checkbox.Root>
            <VStack align="start" gap="0.5">
              <Text fontWeight="semibold" fontSize="sm" color="text.heading">
                La instalación se realizará dentro de La Molina
              </Text>
              <Text fontSize="xs" color="text.muted">
                {outsideLaMolina
                  ? `Se aplica costo adicional de flete (${formatSoles(WINDOW_PRICING.freightOutsideLaMolina)} sin IGV) para otros distritos.`
                  : "¡Instalación gratuita en La Molina incluida en el precio base!"}
              </Text>
            </VStack>
          </HStack>
        </Box>

        {!empty && <QuoteTotalsPanel totals={totals} />}

        <VStack align="stretch" gap="2">
          <Button
            type="button"
            variant="primary"
            size="lg"
            w="full"
            minH="11"
            disabled={empty}
            loading={loading}
            aria-describedby={empty ? helpId : undefined}
            onClick={onGenerate}
          >
            {cartText.generate}
          </Button>
          {empty && (
            <Text id={helpId} fontSize="sm" color="text.muted">
              {cartText.generateDisabled}
            </Text>
          )}
          {!empty && (
            <Button type="button" variant="ghost" w="full" minH="11" onClick={onClear}>
              {cartText.clear}
            </Button>
          )}
        </VStack>
      </VStack>
    </Box>
  );
};
