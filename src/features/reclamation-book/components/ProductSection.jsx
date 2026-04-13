import React from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  SimpleGrid,
  Select,
  Textarea,
  Heading,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import { useReclamationFormContext } from "./ReclamationFormContext";

/**
 * @component ProductSection
 * @description Sección de información del producto o servicio
 */
const ProductSection = () => {
  const { formData, handleInputsChange, errors } = useReclamationFormContext();

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

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        <FormControl isRequired isInvalid={!!errors.tipoBien}>
          <FormLabel>Tipo de Bien</FormLabel>
          <Select
            name="tipoBien"
            value={formData.tipoBien}
            onChange={handleInputsChange}
            placeholder="Seleccionar"
          >
            <option value="producto">Producto</option>
            <option value="servicio">Servicio</option>
          </Select>
          <FormErrorMessage>{errors.tipoBien}</FormErrorMessage>
        </FormControl>

        <FormControl>
          <FormLabel>Monto Reclamado (S/.)</FormLabel>
          <InputGroup>
            <InputLeftAddon>S/.</InputLeftAddon>
            <Input
              type="number"
              name="montoReclamado"
              value={formData.montoReclamado}
              onChange={handleInputsChange}
            />
          </InputGroup>
        </FormControl>
      </SimpleGrid>

      <FormControl isRequired isInvalid={!!errors.descripcionBien}>
        <FormLabel>Descripción del Producto o Servicio</FormLabel>
        <Textarea
          name="descripcionBien"
          value={formData.descripcionBien}
          onChange={handleInputsChange}
        />
        <FormErrorMessage>{errors.descripcionBien}</FormErrorMessage>
      </FormControl>
    </>
  );
};

export default ProductSection;
