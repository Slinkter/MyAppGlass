"use client";

import React from "react";
import { Box, Heading, HStack, Text, VStack, SimpleGrid, Field, NativeSelect, Input } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { Calculator, Plus, Trash2 } from "lucide-react";
import { QUOTE_PRICING } from "@/features/presupuesto/config/pricing";
import { QUOTE_LIMITS, type FieldErrors } from "@/features/presupuesto/schemas/quote-form-schema";
import { createQuoteLine } from "@/features/presupuesto/utils/quoteLines";
import type { QuoteLineInput } from "@/features/presupuesto/types";

interface QuoteLinesPanelProps {
  lines: QuoteLineInput[];
  setLines: React.Dispatch<React.SetStateAction<QuoteLineInput[]>>;
  errors: Record<string, FieldErrors>;
}

const toNumber = (raw: string) => (raw === "" ? Number.NaN : parseFloat(raw));

export const QuoteLinesPanel: React.FC<QuoteLinesPanelProps> = ({ lines, setLines, errors }) => {
  const update = (id: string, patch: Partial<QuoteLineInput>) =>
    setLines((prev) => prev.map((l) => (l.id === id ? { ...l, ...patch } : l)));
  const remove = (id: string) => setLines((prev) => (prev.length > 1 ? prev.filter((l) => l.id !== id) : prev));
  const atLimit = lines.length >= QUOTE_LIMITS.maxLines;

  return (
    <Box
      bg="surface.card"
      p={{ base: "4", md: "6" }}
      borderRadius="2xl"
      border="1px solid"
      borderColor="border.default"
     
    >
      <Heading size="md" mb="2" display="flex" alignItems="center" gap="2">
        <Calculator size={20} style={{ flexShrink: 0 }} /> 1. ¿Qué necesitas cotizar?
      </Heading>
      <Text fontSize="sm" color="text.muted" mb="6">
        Agrega una partida por cada ventana, mampara, box o techo. Las medidas son en metros.
      </Text>

      <VStack gap="4" align="stretch">
        {lines.map((line, index) => {
          const e = errors[line.id] ?? {};
          const system = QUOTE_PRICING.systems[line.systemType];
          const pending = "pricePending" in system && system.pricePending === true;
          return (
            <Box key={line.id} p={{ base: "3", md: "5" }} borderRadius="xl" border="1px solid" borderColor="border.default">
              <HStack justify="space-between" mb="3">
                <Text fontWeight="semibold">Partida {index + 1}</Text>
                {lines.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    minH="11"
                    minW="11"
                    aria-label={`Quitar partida ${index + 1}`}
                    onClick={() => remove(line.id)}
                  >
                    <Trash2 size={16} style={{ flexShrink: 0 }} /> Quitar
                  </Button>
                )}
              </HStack>

              <VStack gap="4">
                <Field.Root invalid={!!e.ambiente}>
                  <Field.Label>Ambiente (opcional)</Field.Label>
                  <Input
                    placeholder="Ej. Sala, Dormitorio 1"
                    value={line.ambiente}
                    onChange={(ev) => update(line.id, { ambiente: ev.target.value })}
                  />
                  {e.ambiente && <Field.ErrorText>{e.ambiente}</Field.ErrorText>}
                </Field.Root>

                <Field.Root>
                  <Field.Label>Tipo de sistema</Field.Label>
                  <NativeSelect.Root>
                    <NativeSelect.Field
                      value={line.systemType}
                      onChange={(ev) => update(line.id, { systemType: ev.target.value as QuoteLineInput["systemType"] })}
                    >
                      {Object.entries(QUOTE_PRICING.systems).map(([k, v]) => (
                        <option key={k} value={k}>{v.label}</option>
                      ))}
                    </NativeSelect.Field>
                  </NativeSelect.Root>
                  {pending && <Field.HelperText>Precio de este sistema por definir: el total será referencial.</Field.HelperText>}
                </Field.Root>

                <SimpleGrid columns={{ base: 1, sm: 2 }} gap="4" w="full">
                  <Field.Root invalid={!!e.width}>
                    <Field.Label>Ancho (m)</Field.Label>
                    <Input
                      type="number"
                      inputMode="decimal"
                      step="0.05"
                      min={QUOTE_LIMITS.minSide}
                      max={QUOTE_LIMITS.maxWidth}
                      value={Number.isNaN(line.width) ? "" : line.width}
                      onChange={(ev) => update(line.id, { width: toNumber(ev.target.value) })}
                    />
                    {e.width && <Field.ErrorText>{e.width}</Field.ErrorText>}
                  </Field.Root>
                  <Field.Root invalid={!!e.height}>
                    <Field.Label>Alto (m)</Field.Label>
                    <Input
                      type="number"
                      inputMode="decimal"
                      step="0.05"
                      min={QUOTE_LIMITS.minSide}
                      max={QUOTE_LIMITS.maxHeight}
                      value={Number.isNaN(line.height) ? "" : line.height}
                      onChange={(ev) => update(line.id, { height: toNumber(ev.target.value) })}
                    />
                    {e.height && <Field.ErrorText>{e.height}</Field.ErrorText>}
                  </Field.Root>
                </SimpleGrid>

                <SimpleGrid columns={{ base: 1, sm: 2 }} gap="4" w="full">
                  <Field.Root>
                    <Field.Label>Tipo de cristal</Field.Label>
                    <NativeSelect.Root>
                      <NativeSelect.Field
                        value={line.glassType}
                        onChange={(ev) => update(line.id, { glassType: ev.target.value as QuoteLineInput["glassType"] })}
                      >
                        {Object.entries(QUOTE_PRICING.glass).map(([k, v]) => (
                          <option key={k} value={k}>{v.label}</option>
                        ))}
                      </NativeSelect.Field>
                    </NativeSelect.Root>
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>Color de aluminio</Field.Label>
                    <NativeSelect.Root>
                      <NativeSelect.Field
                        value={line.aluminumColor}
                        onChange={(ev) =>
                          update(line.id, { aluminumColor: ev.target.value as QuoteLineInput["aluminumColor"] })
                        }
                      >
                        {Object.entries(QUOTE_PRICING.aluminum).map(([k, v]) => (
                          <option key={k} value={k}>{v.label}</option>
                        ))}
                      </NativeSelect.Field>
                    </NativeSelect.Root>
                  </Field.Root>
                </SimpleGrid>

                <Field.Root>
                  <Field.Label>Instalación y montaje</Field.Label>
                  <NativeSelect.Root>
                    <NativeSelect.Field
                      value={line.includeInstallation ? line.difficulty : "sin_instalacion"}
                      onChange={(ev) => {
                        if (ev.target.value === "sin_instalacion") update(line.id, { includeInstallation: false });
                        else
                          update(line.id, {
                            includeInstallation: true,
                            difficulty: ev.target.value as QuoteLineInput["difficulty"],
                          });
                      }}
                    >
                      {Object.entries(QUOTE_PRICING.installation.surcharge).map(([k, v]) => (
                        <option key={k} value={k}>{v.label}</option>
                      ))}
                      <option value="sin_instalacion">Solo ensamblaje en taller (sin instalación)</option>
                    </NativeSelect.Field>
                  </NativeSelect.Root>
                </Field.Root>
              </VStack>
            </Box>
          );
        })}

        <Button
          variant="outline"
          minH="11"
          disabled={atLimit}
          onClick={() => setLines((prev) => [...prev, createQuoteLine()])}
        >
          <Plus size={18} style={{ flexShrink: 0 }} /> Agregar otra partida
        </Button>
      </VStack>
    </Box>
  );
};
