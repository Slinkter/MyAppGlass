"use client";

/**
 * @file WindowResult.tsx
 * @description Bloque "Cómo queda su ventana": hojas y precio de una ventana con medidas válidas.
 * Todo sale del motor (`computeSashes`, `priceWindow`); aquí solo se muestra.
 */

import React, { useId } from "react";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import { Alert } from "@/shared/ui/alert";
import { Button } from "@/shared/ui/button";
import {
  computeSashes,
  formatSoles,
  priceWindow,
  type WindowFinish,
  type WindowGlass,
  type WindowGlassColor,
  type WindowProfileColor,
} from "@/entities/quote";
import { DefinitionRow } from "./DefinitionRow";
import { QUOTE_TEXTS } from "./quoteTexts";
import { Window2DPreview } from "./Window2DPreview";

const formText = QUOTE_TEXTS.form;

interface WindowResultProps {
  widthM: number;
  heightM: number;
  glass: WindowGlass;
  finish: WindowFinish;
  glassColor?: WindowGlassColor;
  profileColor?: WindowProfileColor;
  onRequestVisit: () => void;
}

export const WindowResult: React.FC<WindowResultProps> = ({
  widthM,
  heightM,
  glass,
  finish,
  glassColor,
  profileColor,
  onRequestVisit,
}) => {
  const headingId = useId();
  const sashes = computeSashes(widthM);
  const price = priceWindow({ widthM, heightM, glass, finish });
  const warn = sashes.recommendFixed || sashes.needsTechnician;

  return (
    <Box
      as="section"
      aria-labelledby={headingId}
      borderTopWidth="1px"
      borderTopStyle="solid"
      borderColor="border.default"
      pt="4"
    >
      <VStack align="stretch" gap="4">
        <Heading as="h3" id={headingId} fontFamily="heading" fontWeight="700" color="text.heading" fontSize="xl" lineHeight="title">
          {formText.sashesTitle}
        </Heading>

        <VStack align="stretch" gap="4" aria-live="polite">
          {warn ? (
            <Alert variant="warning">{sashes.note}</Alert>
          ) : (
            <Text fontSize="md">
              <Text as="span" fontWeight="semibold">{formText.sashesLabel}: </Text>
              {sashes.note}
            </Text>
          )}

          {!warn && (
            <Window2DPreview
              sashesCount={sashes.count}
              glassColor={glassColor || "incoloro"}
              profileColor={profileColor || "negro"}
              widthM={widthM}
              heightM={heightM}
            />
          )}

          <VStack as="dl" align="stretch" gap="1" m="0">
            <DefinitionRow amount align="baseline" label={formText.priceLabel}>
              {formatSoles(price.baseAmount)}
            </DefinitionRow>
            {price.finishAmount > 0 && (
              <DefinitionRow amount align="baseline" label={formText.finish.extraLine}>
                {formatSoles(price.finishAmount)}
              </DefinitionRow>
            )}
          </VStack>
        </VStack>

        {sashes.needsTechnician && (
          <Button variant="outline" w="full" minH="11" onClick={onRequestVisit}>
            {formText.visitButton}
          </Button>
        )}
      </VStack>
    </Box>
  );
};
