import React from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select,
  Textarea,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";

/**
 * @component ClaimDetailSection
 * @description Sección de detalle de la solicitud/reclamo
 * @param {Object} props - Props del componente
 * @param {Object} props.formData - Datos del formulario
 * @param {Function} props.handleInputsChange - Función para manejar cambios
 * @param {Object} props.errors - Errores de validación
 * @param {Object} props.inputStyles - Estilos aplicados a inputs
 * @param {Object} props.selectStyles - Estilos aplicados a selects
 */
const ClaimDetailSection = ({
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
        3. Detalle de su solicitud
      </Heading>

      <FormControl isRequired isInvalid={!!errors.tipoSolicitud}>
        <FormLabel>Tipo de Solicitud</FormLabel>
        <Select
          name="tipoSolicitud"
          value={formData.tipoSolicitud}
          onChange={handleInputsChange}
          placeholder="Seleccionar"
          sx={selectStyles}
        >
          <option value="Reclamo">
            Reclamo: Disconformidad con el producto o servicio.
          </option>
          <option value="Queja">Queja: Malestar respecto a la atención.</option>
        </Select>
        <FormErrorMessage>{errors.tipoSolicitud}</FormErrorMessage>
      </FormControl>

      <FormControl isRequired isInvalid={!!errors.detalle}>
        <FormLabel>Detalle de la Solicitud</FormLabel>
        <Textarea
          name="detalle"
          value={formData.detalle}
          onChange={handleInputsChange}
          placeholder="Describa aquí qué sucedió..."
          {...inputStyles}
        />
        <FormErrorMessage>{errors.detalle}</FormErrorMessage>
      </FormControl>

      <FormControl isRequired isInvalid={!!errors.pedido}>
        <FormLabel>Pedido del Consumidor</FormLabel>
        <Textarea
          name="pedido"
          value={formData.pedido}
          onChange={handleInputsChange}
          placeholder="Ej: Devolución del dinero, cambio del producto, etc."
          {...inputStyles}
        />
        <FormErrorMessage>{errors.pedido}</FormErrorMessage>
      </FormControl>
    </>
  );
};

export default ClaimDetailSection;
