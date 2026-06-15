import React from "react";
import {
  Input,
  SimpleGrid,
  Textarea,
  Heading,
  Group,
  InputAddon,
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
    <>
      <Heading
        as="h3"
        size="md"
        borderBottomWidth={2}
        pb="2"
        pt="4"
        color="text.heading"
      >
        2. Identificación del bien contratado
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
        <Field 
          label="Tipo de Bien" 
          required 
          invalid={!!errors.tipoBien} 
          errorText={errors.tipoBien}
        >
          <NativeSelectRoot>
            <NativeSelectField
              name="tipoBien"
              value={formData.tipoBien}
              onChange={handleInputsChange as React.ChangeEventHandler<HTMLSelectElement>}
              placeholder="Seleccionar"
            >
              <option value="producto">Producto</option>
              <option value="servicio">Servicio</option>
            </NativeSelectField>
          </NativeSelectRoot>
        </Field>

        <Field label="Monto Reclamado (S/.)">
          <Group attached w="full">
            <InputAddon>S/.</InputAddon>
            <Input
              type="number"
              name="montoReclamado"
              value={formData.montoReclamado}
              onChange={handleInputsChange as React.ChangeEventHandler<HTMLInputElement>}
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
          name="descripcionBien"
          value={formData.descripcionBien}
          onChange={handleInputsChange as React.ChangeEventHandler<HTMLTextAreaElement>}
        />
      </Field>
    </>
  );
};

export default ProductSection;
