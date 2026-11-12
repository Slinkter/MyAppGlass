"use client";

/**
 * @file QuoteCartLine.tsx
 * @description Una ventana del carrito como tarjeta de lista de definición. Hojas, cuerpos
 * y precio se derivan del motor al pintar; el ítem solo trae datos de entrada.
 */

import React from "react";
import { Box, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { Button } from "@/shared/ui/button";
import { computeSashes, formatMeasure, formatSoles, priceWindow, splitBodies, type WindowQuoteItem } from "@/entities/quote";
import { DefinitionRow } from "./DefinitionRow";
import { QUOTE_TEXTS } from "./quoteTexts";

const cartText = QUOTE_TEXTS.cart;
const formText = QUOTE_TEXTS.form;

export interface QuoteCartLineProps {
  item: WindowQuoteItem;
  index: number;
  editing: boolean;
  onEdit: (id: string) => void;
  onRemove: (id: string) => void;
}

export const QuoteCartLine = React.memo<QuoteCartLineProps>(function QuoteCartLine({
  item,
  index,
  editing,
  onEdit,
  onRemove,
}) {
  const n = index + 1;
  const price = priceWindow(item);
  const sashes = computeSashes(item.widthM);
  const bodies = splitBodies(item.widthM, item.heightM);

  return (
    <Box
      as="li"
      listStyleType="none"
      bg="surface.card"
      p={{ base: "4", md: "6" }}
      borderRadius="card"
      borderWidth={editing ? "2px" : "1px"}
      borderStyle="solid"
      borderColor={editing ? "text.heading" : "border.default"}
      aria-current={editing ? "true" : undefined}
    >
      <VStack align="stretch" gap="4">
        <Heading as="h3" fontFamily="heading" fontWeight="700" color="text.heading" fontSize="xl" lineHeight="title">
          {cartText.line.title(n)}
        </Heading>

        <VStack as="dl" align="stretch" gap="1" m="0">
          <DefinitionRow label={cartText.line.size}>{cartText.line.sizeValue(formatMeasure(item.widthM), formatMeasure(item.heightM))}</DefinitionRow>
          <DefinitionRow label={cartText.line.glass}>
            {cartText.line.glassValue(formText.glassType.options[item.glass].label, formText.glassColor.options[item.glassColor])}
          </DefinitionRow>
          <DefinitionRow label={cartText.line.profile}>{formText.profileColor.options[item.profileColor]}</DefinitionRow>
          <DefinitionRow label={cartText.line.sashes}>{sashes.note}</DefinitionRow>
          {bodies.length > 1 && (
            <DefinitionRow label={cartText.line.bodies}>
              {bodies.map((b) => (
                <Text as="span" key={b.kind} display="block">
                  {`${b.kind}: ${cartText.line.sizeValue(formatMeasure(b.widthM), formatMeasure(b.heightM))}`}
                </Text>
              ))}
            </DefinitionRow>
          )}
          {item.finish !== "ninguno" && (
            <DefinitionRow amount align="baseline" label={`${cartText.line.finish}: ${formText.finish.options[item.finish].label}`}>
              {formatSoles(price.finishAmount)}
            </DefinitionRow>
          )}
        </VStack>

        <VStack
          as="dl"
          align="stretch"
          m="0"
          borderTopWidth="1px"
          borderTopStyle="solid"
          borderColor="border.default"
          pt="4"
        >
          <DefinitionRow amount strong align="baseline" label={cartText.line.price}>
            {formatSoles(price.subtotal)}
          </DefinitionRow>
        </VStack>

        <HStack gap="2">
          <Button
            type="button"
            variant="outline"
            flex="1"
            minH="11"
            aria-label={cartText.editLabel(n)}
            onClick={() => onEdit(item.id)}
          >
            {cartText.edit}
          </Button>
          <Button
            type="button"
            variant="ghost"
            flex="1"
            minH="11"
            aria-label={cartText.removeLabel(n)}
            onClick={() => onRemove(item.id)}
          >
            {cartText.remove}
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
});
