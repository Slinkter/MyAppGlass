import React from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select,
  Textarea,
  Heading,
} from "@chakra-ui/react";
import { useReclamationFormContext } from "./ReclamationFormContext";

/**
 * @component ClaimDetailSection
 * @description Sección de detalle de la solicitud/reclamo
 */
const ClaimDetailSection = () => {
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
        3. Detalle de su solicitud
      </Heading>

      <FormControl isRequired isInvalid={!!errors.tipoSolicitud}>
        <FormLabel>Tipo de Solicitud</FormLabel>
        <Select
          name="tipoSolicitud"
          value={formData.tipoSolicitud}
          onChange={handleInputsChange}
          placeholder="Seleccionar"
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
        />
        <FormErrorMessage>{errors.pedido}</FormErrorMessage>
      </FormControl>
    </>
  );
};

export default ClaimDetailSection;

export default ClaimDetailSection;
