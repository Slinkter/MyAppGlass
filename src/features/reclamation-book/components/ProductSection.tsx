import React from "react";
import {
  Input,
  SimpleGrid,
  Textarea,
  Heading,
  Group,
  InputAddon,
  VStack,
  HStack,
  Box,
} from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import {
  NativeSelectField,
  NativeSelectRoot,
} from "@/components/ui/native-select";
import { useReclamationFormContext } from "./ReclamationFormContext";

/**
 * @component ProductSection
 * @description Sección de información del producto o servicio
 */
const ProductSection: React.FC = () => {
  const { formData, handleInputsChange, errors } = useReclamationFormContext();

  return (
    <VStack gap="5" align="stretch">
      <HStack gap="2.5" pb="2" borderBottomWidth="1px" borderColor="border.default">
        <Box 
          w="24px" 
          h="24px" 
          borderRadius="full" 
          bg="primary.500" 
          color="white" 
          fontSize="xs" 
          fontWeight="900"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          2
        </Box>
        <Heading
          as="h3"
          size="sm"
          fontWeight="800"
          color="text.heading"
          letterSpacing="tight"
        >
          Identificación del Bien Contratado
        </Heading>
      </HStack>

      <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
        <Field 
          label="Tipo de Bien" 
          required 
          invalid={!!errors.tipoBien} 
          errorText={errors.tipoBien}
        >
          <NativeSelectRoot variant="subtle">
            <NativeSelectField
              name="tipoBien"
              value={formData.tipoBien}
              onChange={handleInputsChange}
              placeholder="Seleccionar tipo"
            >
              <option value="producto">Producto (Ej: Ventana, Mampara, Espejo)</option>
              <option value="servicio">Servicio (Ej: Instalación, Mantenimiento)</option>
            </NativeSelectField>
          </NativeSelectRoot>
        </Field>

        <Field label="Monto Reclamado (S/.)">
          <Group attached w="full">
            <InputAddon>S/.</InputAddon>
            <Input
              variant="subtle"
              type="number"
              name="montoReclamado"
              value={formData.montoReclamado}
              onChange={handleInputsChange}
              placeholder="0.00"
            />
          </Group>
        </Field>
      </SimpleGrid>

      <Field 
        label="Descripción del Producto o Servicio" 
        required 
        invalid={!!errors.descripcionBien} 
        errorText={errors.descripcionBien}
      >
        <Textarea
          variant="subtle"
          name="descripcionBien"
          value={formData.descripcionBien}
          onChange={handleInputsChange}
          placeholder="Ingrese detalles del producto o servicio contratado..."
          rows={3}
        />
      </Field>
    </VStack>
  );
};

export default ProductSection;
