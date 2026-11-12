"use client";

/**
 * @file WindowForm.tsx
 * @description Formulario de una ventana del cotizador (Ventana · Sistema Nova). Valida y calcula con
 * el motor de `entities/quote`; los textos salen de `QUOTE_TEXTS.form`. No guarda precio ni hojas.
 * Para cambiar de ventana en edición, el padre debe usar `key={initial.id}`.
 */

import React, { useRef, useState } from "react";
import { Box, chakra, Heading, Input, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { Button } from "@/shared/ui/button";
import { Field } from "@/shared/ui/field";
import { NativeSelectField, NativeSelectRoot } from "@/shared/ui/native-select";
import {
  formatMeasure,
  parseMeasure,
  validateWindow,
  WINDOW_PRICING,
  type WindowFinish,
  type WindowGlass,
  type WindowGlassColor,
  type WindowProfileColor,
  type WindowQuoteItem,
} from "@/entities/quote";
import { QUOTE_TEXTS } from "./quoteTexts";
import { WindowResult } from "./WindowResult";

const formText = QUOTE_TEXTS.form;
const limits = WINDOW_PRICING.limits;
// "field" es una variante del tema (Input); sin `chakra typegen` los tipos solo conocen las de Chakra.
const FIELD_VARIANT = "field" as never;

/** Medidas de ejemplo y de apoyo, derivadas de los límites del motor. */
const midWidth = (limits.widthMinM + limits.widthMaxM) / 2;
const midHeight = (limits.heightMinM + limits.heightMaxM) / 2;
const toText = (n: number) => String(n).replace(".", ",");

const keys = <K extends string>(o: Record<K, unknown>) => Object.keys(o) as K[];

interface WindowFormProps {
  systemLabel: string;
  initial?: WindowQuoteItem;
  onSubmit: (item: Omit<WindowQuoteItem, "id">) => void;
  onCancelEdit?: () => void;
  onRequestVisit: () => void;
}

export const WindowForm: React.FC<WindowFormProps> = ({ systemLabel, initial, onSubmit, onCancelEdit, onRequestVisit }) => {
  const [widthText, setWidthText] = useState(initial ? toText(initial.widthM) : "");
  const [heightText, setHeightText] = useState(initial ? toText(initial.heightM) : "");
  const [glass, setGlass] = useState<WindowGlass>(initial?.glass ?? "crudo");
  const [glassColor, setGlassColor] = useState<WindowGlassColor>(initial?.glassColor ?? "incoloro");
  const [profileColor, setProfileColor] = useState<WindowProfileColor>(initial?.profileColor ?? "negro");
  const [finish, setFinish] = useState<WindowFinish>(initial?.finish ?? "ninguno");
  const [touched, setTouched] = useState({ width: false, height: false });
  const widthRef = useRef<HTMLInputElement>(null);
  const heightRef = useRef<HTMLInputElement>(null);

  const widthM = parseMeasure(widthText);
  const heightM = parseMeasure(heightText);
  // Cada campo se valida por separado para mostrar su propio mensaje.
  const widthCheck = validateWindow(widthM, midHeight);
  const heightCheck = validateWindow(midWidth, heightM);
  const whole = validateWindow(widthM, heightM);
  const widthError = touched.width && !widthCheck.ok ? widthCheck : null;
  const heightError = touched.height && !heightCheck.ok ? heightCheck : null;
  const needsVisit = Boolean(widthError?.requiresVisit || heightError?.requiresVisit);

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    setTouched({ width: true, height: true });
    if (!whole.ok) {
      (!widthCheck.ok ? widthRef : heightRef).current?.focus();
      return;
    }
    onSubmit({ widthM, heightM, glass, finish, glassColor, profileColor });
    if (!initial) {
      setWidthText("");
      setHeightText("");
      setTouched({ width: false, height: false });
      widthRef.current?.focus();
    }
  };

  const glassHelp = formText.glassType.options[glass].help;
  const finishHelp = formText.finish.options[finish].help;

  return (
    <chakra.form
      noValidate
      onSubmit={handleSubmit}
      bg="surface.card"
      p={{ base: "4", md: "6" }}
      borderRadius="card"
      borderWidth="1px"
      borderStyle="solid"
      borderColor="border.default"
    >
      <VStack align="stretch" gap="4">
        <Box>
          <Text fontSize="sm" color="text.muted">{systemLabel}</Text>
          <Heading as="h2" fontFamily="heading" fontWeight="700" color="text.heading" fontSize="2xl" lineHeight="title">
            {formText.title}
          </Heading>
        </Box>

        <SimpleGrid columns={{ base: 1, sm: 2 }} gap="4">
          <Field label={formText.width.label} invalid={!!widthError} errorText={widthError?.message} helperText={formText.width.help(formatMeasure(midWidth))}>
            <Input
              ref={widthRef}
              variant={FIELD_VARIANT}
              inputMode="decimal"
              autoComplete="off"
              value={widthText}
              onChange={(e) => setWidthText(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, width: true }))}
            />
          </Field>
          <Field label={formText.height.label} invalid={!!heightError} errorText={heightError?.message} helperText={formText.height.help(formatMeasure(midHeight))}>
            <Input
              ref={heightRef}
              variant={FIELD_VARIANT}
              inputMode="decimal"
              autoComplete="off"
              value={heightText}
              onChange={(e) => setHeightText(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, height: true }))}
            />
          </Field>
        </SimpleGrid>

        {needsVisit && (
          <VStack align="stretch" gap="2">
            <Text fontSize="sm" color="text.muted">{formText.visitHelp}</Text>
            <Button variant="outline" w="full" minH="11" onClick={onRequestVisit}>{formText.visitButton}</Button>
          </VStack>
        )}

        <VStack align="stretch" gap="2">
          <Field label={formText.glassType.label} helperText={glassHelp}>
            <NativeSelectRoot>
              <NativeSelectField value={glass} onChange={(e) => setGlass(e.target.value as WindowGlass)}>
                {keys(formText.glassType.options).map((k) => (
                  <option key={k} value={k}>{formText.glassType.options[k].label}</option>
                ))}
              </NativeSelectField>
            </NativeSelectRoot>
          </Field>
  <Text fontSize="sm" color="text.muted">{formText.thickness(WINDOW_PRICING.glassMm)}</Text>
        </VStack>

        <VStack align="stretch" gap="2">
          <SimpleGrid columns={{ base: 1, sm: 2 }} gap="4">
            <Field label={formText.glassColor.label}>
              <NativeSelectRoot>
                <NativeSelectField value={glassColor} onChange={(e) => setGlassColor(e.target.value as WindowGlassColor)}>
                  {keys(formText.glassColor.options).map((k) => (
                    <option key={k} value={k}>{formText.glassColor.options[k]}</option>
                  ))}
                </NativeSelectField>
              </NativeSelectRoot>
            </Field>
            <Field label={formText.profileColor.label}>
              <NativeSelectRoot>
                <NativeSelectField value={profileColor} onChange={(e) => setProfileColor(e.target.value as WindowProfileColor)}>
                  {keys(formText.profileColor.options).map((k) => (
                    <option key={k} value={k}>{formText.profileColor.options[k]}</option>
                  ))}
                </NativeSelectField>
              </NativeSelectRoot>
            </Field>
          </SimpleGrid>
  <Text fontSize="sm" color="text.muted">{formText.colorNote}</Text>
        </VStack>

        <Field label={formText.finish.label} helperText={finishHelp}>
          <NativeSelectRoot>
            <NativeSelectField value={finish} onChange={(e) => setFinish(e.target.value as WindowFinish)}>
              {keys(formText.finish.options).map((k) => (
                <option key={k} value={k}>{formText.finish.options[k].label}</option>
              ))}
            </NativeSelectField>
          </NativeSelectRoot>
        </Field>

        {whole.ok && (
          <WindowResult
            widthM={widthM}
            heightM={heightM}
            glass={glass}
            finish={finish}
            glassColor={glassColor}
            profileColor={profileColor}
            onRequestVisit={onRequestVisit}
          />
        )}

        <VStack align="stretch" gap="2">
          <Button type="submit" variant="primary" size="lg" w="full" minH="11">
            {initial ? formText.saveEditButton : formText.addButton}
          </Button>
          {initial && onCancelEdit && (
            <Button type="button" variant="ghost" w="full" minH="11" onClick={onCancelEdit}>{formText.cancelEditButton}</Button>
          )}
        </VStack>
      </VStack>
    </chakra.form>
  );
};
