"use client";

import React from "react";
import { Box, Heading, VStack, SimpleGrid, Field, NativeSelect, Input } from "@chakra-ui/react";
import { Calculator } from "lucide-react";
import type { QuoteCalculationInput } from "@/features/presupuesto/utils/quoteCalculator";

interface QuoteConfigPanelProps {
  params: QuoteCalculationInput;
  setParams: React.Dispatch<React.SetStateAction<QuoteCalculationInput>>;
}

export const QuoteConfigPanel: React.FC<QuoteConfigPanelProps> = ({ params, setParams }) => {
  return (
    <Box
      bg="surface.card"
      p="6"
      borderRadius="2xl"
      border="1px solid"
      borderColor="border.glass"
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
              <option value="mampara_serie25">Mampara Corrediza Serie 25 (2 o 4 Hojas)</option>
              <option value="ventana_nova">Ventana Corrediza Sistema Nova Hermética</option>
              <option value="ducha_cristal">Puerta / Box de Ducha en Cristal Templado</option>
              <option value="techo_policarbonato">Techo de Policarbonato / Cobertura de Vidrio</option>
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
                <option value="8mm_incoloro">Templado 8mm Incoloro</option>
                <option value="10mm_incoloro">Templado 10mm Incoloro</option>
                <option value="6mm_incoloro">Templado 6mm Incoloro</option>
                <option value="8mm_laminado">Laminado de Seguridad 8mm</option>
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
                <option value="negro_mate">Negro Mate Anodizado</option>
                <option value="aluminio_mate">Aluminio Mate Natural</option>
                <option value="blanco">Blanco Esmaltado</option>
                <option value="champagne">Champagne Titanio</option>
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
              <option value="primer_piso">Instalación en Primer Piso / Fácil Acceso</option>
              <option value="piso_alto_sin_andamio">Piso Alto (Ascensor / Escalera Amplia)</option>
              <option value="piso_alto_con_andamio">Piso Alto con Andamio / Fachada Exterior</option>
              <option value="sin_instalacion">Solo Fabricación (Sin Instalación)</option>
            </NativeSelect.Field>
          </NativeSelect.Root>
        </Field.Root>
      </VStack>
    </Box>
  );
};
