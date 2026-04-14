"use client";

import React from "react";
import {
  Input,
  SimpleGrid,
  Textarea,
  Heading,
  Flex,
  Box,
} from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { useReclamationFormContext } from "./ReclamationFormContext";

/**
 * @component ProductSection
 * @description Sección de información del producto o servicio
 */
const ProductSection = () => {
  const { formData, handleInputsChange, errors }: any = useReclamationFormContext();

  return (
    <>
      <Heading
        as="h3"
        size="md"
        borderBottomWidth={2}
        pb={2}
        pt={4}
        color="text.heading"
      >
        2. Identificación del bien contratado
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
        <Field label="Tipo de Bien" invalid={!!errors.tipoBien} errorText={errors.tipoBien} required>
          <select
            name="tipoBien"
            value={formData.tipoBien}
            onChange={handleInputsChange}
            style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--chakra-colors-border-glass)',
                color: 'inherit',
                fontSize: '14px',
                appearance: 'none',
                cursor: 'pointer',
                outline: 'none'
            }}
          >
            <option value="">Seleccionar</option>
            <option value="producto">Producto</option>
            <option value="servicio">Servicio</option>
          </select>
        </Field>

        <Field label="Monto Reclamado (S/.)">
          <Flex>
            <Box px={3} py={2} bg="bg.muted" border="1px solid" borderColor="border.glass" borderRight="none" borderLeftRadius="md">
              S/.
            </Box>
            <Input
              type="number"
              name="montoReclamado"
              value={formData.montoReclamado}
              onChange={handleInputsChange}
              borderLeftRadius="none"
            />
          </Flex>
        </Field>
      </SimpleGrid>

      <Field label="Descripción del Producto o Servicio" invalid={!!errors.descripcionBien} errorText={errors.descripcionBien} required>
        <Textarea
          name="descripcionBien"
          value={formData.descripcionBien}
          onChange={handleInputsChange}
        />
      </Field>
    </>
  );
};

export default ProductSection;
