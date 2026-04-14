import React from "react";
import {
  Textarea,
  Heading,
} from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import {
  NativeSelectField,
  NativeSelectRoot,
} from "@/components/ui/native-select";
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

      <Field 
        label="Tipo de Solicitud" 
        required 
        invalid={!!errors.tipoSolicitud} 
        errorText={errors.tipoSolicitud}
      >
        <NativeSelectRoot>
          <NativeSelectField
            name="tipoSolicitud"
            value={formData.tipoSolicitud}
            onChange={handleInputsChange}
            placeholder="Seleccionar"
          >
            <option value="Reclamo">
              Reclamo: Disconformidad con el producto o servicio.
            </option>
            <option value="Queja">Queja: Malestar respecto a la atención.</option>
          </NativeSelectField>
        </NativeSelectRoot>
      </Field>

      <Field 
        label="Detalle de la Solicitud" 
        required 
        invalid={!!errors.detalle} 
        errorText={errors.detalle}
      >
        <Textarea
          name="detalle"
          value={formData.detalle}
          onChange={handleInputsChange}
          placeholder="Describa aquí qué sucedió..."
        />
      </Field>

      <Field 
        label="Pedido del Consumidor" 
        required 
        invalid={!!errors.pedido} 
        errorText={errors.pedido}
      >
        <Textarea
          name="pedido"
          value={formData.pedido}
          onChange={handleInputsChange}
          placeholder="Ej: Devolución del dinero, cambio del producto, etc."
        />
      </Field>
    </>
  );
};

export default ClaimDetailSection;
