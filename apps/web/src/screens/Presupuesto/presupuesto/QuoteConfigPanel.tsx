"use client";

import React from "react";
import { Box, Heading, VStack, SimpleGrid, Field, NativeSelect, Input } from "@chakra-ui/react";
import { Calculator } from "lucide-react";
import { QUOTE_PRICING } from "@/features/presupuesto/config/pricing";
import type { QuoteCalculationInput } from "@/features/presupuesto/utils/quoteCalculator";

interface QuoteConfigPanelProps {
  params: QuoteCalculationInput;
  setParams: React.Dispatch<React.SetStateAction<QuoteCalculationInput>>;
}

export const QuoteConfigPanel: React.FC<QuoteConfigPanelProps> = ({ params, setParams }) => {
  return (
    <Box
      bg="surface.card"
      p={{ base: "4", md: "6" }}
      borderRadius="2xl"
      border="1px solid"
      borderColor="border.default"
      backdropFilter="blur(12px)"
    >
      <Heading size="md" mb="6" display="flex" alignItems="center" gap="2">
        <Calculator size={20} /> Parámetros del Sistema
      </Heading>

      <VStack gap="4">
        <Field.Root>
          <Field.Label>Tipo de Sistema / Estructura</Field.Label>
          <NativeSelect.Root>
            <NativeSelect.Field
              value={params.systemType}
              onChange={(e) =>
                setParams({ ...params, systemType: e.target.value as QuoteCalculationInput["systemType"] })
              }
            >
              {Object.entries(QUOTE_PRICING.systems).map(([k, v]) => (
                <option key={k} value={k}>{v.label}</option>
              ))}
            </NativeSelect.Field>
          </NativeSelect.Root>
        </Field.Root>

        <SimpleGrid columns={2} gap="4" w="full">
          <Field.Root>
            <Field.Label>Ancho (Metros)</Field.Label>
            <Input
              type="number"
              step="0.05"
              value={params.width}
              onChange={(e) =>
                setParams({ ...params, width: parseFloat(e.target.value) || 0.1 })
              }
            />
          </Field.Root>
          <Field.Root>
            <Field.Label>Alto (Metros)</Field.Label>
            <Input
              type="number"
              step="0.05"
              value={params.height}
              onChange={(e) =>
                setParams({ ...params, height: parseFloat(e.target.value) || 0.1 })
              }
            />
          </Field.Root>
        </SimpleGrid>

        <SimpleGrid columns={2} gap="4" w="full">
          <Field.Root>
            <Field.Label>Tipo de Cristal</Field.Label>
            <NativeSelect.Root>
              <NativeSelect.Field
                value={params.glassType}
                onChange={(e) =>
                  setParams({ ...params, glassType: e.target.value as QuoteCalculationInput["glassType"] })
                }
              >
                {Object.entries(QUOTE_PRICING.glass).map(([k, v]) => (
                  <option key={k} value={k}>{v.label}</option>
                ))}
              </NativeSelect.Field>
            </NativeSelect.Root>
          </Field.Root>

          <Field.Root>
            <Field.Label>Color de Aluminio</Field.Label>
            <NativeSelect.Root>
              <NativeSelect.Field
                value={params.aluminumColor}
                onChange={(e) =>
                  setParams({ ...params, aluminumColor: e.target.value as QuoteCalculationInput["aluminumColor"] })
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
          <Field.Label>Servicio de Instalación y Montaje</Field.Label>
          <NativeSelect.Root>
            <NativeSelect.Field
              value={params.includeInstallation ? params.difficulty : "sin_instalacion"}
              onChange={(e) => {
                if (e.target.value === "sin_instalacion") {
                  setParams({ ...params, includeInstallation: false });
                } else {
                  setParams({
                    ...params,
                    includeInstallation: true,
                    difficulty: e.target.value as QuoteCalculationInput["difficulty"],
                  });
                }
              }}
            >
              {Object.entries(QUOTE_PRICING.installation.surcharge).map(([k, v]) => (
                <option key={k} value={k}>{v.label}</option>
              ))}
              <option value="sin_instalacion">Solo Fabricación (Sin Instalación)</option>
            </NativeSelect.Field>
          </NativeSelect.Root>
        </Field.Root>
      </VStack>
    </Box>
  );
};
