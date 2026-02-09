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
  useColorModeValue,
} from "@chakra-ui/react";

/**
 * @component ProductSection
 * @description Sección de información del producto o servicio
 * @param {Object} props - Props del componente
 * @param {Object} props.formData - Datos del formulario
 * @param {Function} props.handleInputsChange - Función para manejar cambios
 * @param {Object} props.errors - Errores de validación
 * @param {Object} props.inputStyles - Estilos aplicados a inputs
 * @param {Object} props.selectStyles - Estilos aplicados a selects
 */
const ProductSection = ({
  formData,
  handleInputsChange,
  errors,
  inputStyles,
  selectStyles,
}) => {
  const headingColor = useColorModeValue("gray.900", "white");

  return (
    <>
      <Heading
        as="h3"
        size="md"
        borderBottomWidth={2}
        pb={2}
        pt={4}
        color={headingColor}
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
            sx={selectStyles}
          >
            <option value="producto">Producto</option>
            <option value="servicio">Servicio</option>
          </Select>
          <FormErrorMessage>{errors.tipoBien}</FormErrorMessage>
        </FormControl>

        <FormControl>
          <FormLabel>Monto Reclamado (S/.)</FormLabel>
          <InputGroup>
            <InputLeftAddon {...inputStyles}>S/.</InputLeftAddon>
            <Input
              type="number"
              name="montoReclamado"
              value={formData.montoReclamado}
              onChange={handleInputsChange}
              {...inputStyles}
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
          {...inputStyles}
        />
        <FormErrorMessage>{errors.descripcionBien}</FormErrorMessage>
      </FormControl>
    </>
  );
};

export default ProductSection;
