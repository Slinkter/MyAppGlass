"use client";

/**
 * @file QuoteCart.tsx
 * @description Carrito del cotizador (Ventana · Sistema Nova): líneas, zona de instalación,
 * totales y acciones. Solo muestra; precios y hojas salen del motor de `entities/quote`.
 */

import React, { useId, useMemo } from "react";
import { Box, Heading, HStack, Text, VStack } from "@chakra-ui/react";
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
}

const LocationChoice: React.FC<{
  outside: boolean;
  onChange: (outside: boolean) => void;
  labelId: string;
}> = ({ outside, onChange, labelId }) => {
  const options = [
    { value: false, label: cartText.location.yes },
    { value: true, label: cartText.location.no },
  ];
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"].includes(e.key)) {
      e.preventDefault();
      onChange(!outside);
    }
  };
  return (
    <HStack role="radiogroup" aria-labelledby={labelId} gap="2" onKeyDown={onKeyDown}>
      {options.map((o) => {
        const checked = outside === o.value;
        return (
          <Button
            key={o.label}
            type="button"
            role="radio"
            aria-checked={checked}
            tabIndex={checked ? 0 : -1}
            variant={checked ? "primary" : "outline"}
            flex="1"
            minH="11"
            onClick={() => onChange(o.value)}
          >
            {o.label}
          </Button>
        );
      })}
    </HStack>
  );
};

export const QuoteCart: React.FC<QuoteCartProps> = ({
  items,
  outsideLaMolina,
  onOutsideLaMolinaChange,
  editingId = null,
  onEdit,
  onRemove,
  onClear,
  onGenerate,
}) => {
  const headingId = useId();
  const questionId = useId();
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

        <VStack align="stretch" gap="2">
          <Text id={questionId} fontWeight="semibold">
            {cartText.location.question}
          </Text>
          <LocationChoice outside={outsideLaMolina} onChange={onOutsideLaMolinaChange} labelId={questionId} />
          <Text fontSize="md" color="text.muted">
            {cartText.freightNotice(formatSoles(WINDOW_PRICING.freightOutsideLaMolina))}
          </Text>
        </VStack>

        {!empty && <QuoteTotalsPanel totals={totals} />}

        <VStack align="stretch" gap="2">
          <Button
            type="button"
            variant="primary"
            size="lg"
            w="full"
            minH="11"
            disabled={empty}
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
