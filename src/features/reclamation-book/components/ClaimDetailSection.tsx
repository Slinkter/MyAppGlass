"use client";

import React from "react";
import {
  Textarea,
  Heading,
} from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { useReclamationFormContext } from "./ReclamationFormContext";

/**
 * @component ClaimDetailSection
 * @description Sección de detalle de la solicitud/reclamo
 */
const ClaimDetailSection = () => {
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
        3. Detalle de su solicitud
      </Heading>

      <Field label="Tipo de Solicitud" invalid={!!errors.tipoSolicitud} errorText={errors.tipoSolicitud} required>
        <select
          name="tipoSolicitud"
          value={formData.tipoSolicitud}
          onChange={handleInputsChange}
          style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              background: 'transparent',
              border: '1px solid var(--chakra-colors-border-glass)'
          }}
        >
          <option value="">Seleccionar</option>
          <option value="Reclamo">
            Reclamo: Disconformidad con el producto o servicio.
          </option>
          <option value="Queja">Queja: Malestar respecto a la atención.</option>
        </select>
      </Field>

      <Field label="Detalle de la Solicitud" invalid={!!errors.detalle} errorText={errors.detalle} required>
        <Textarea
          name="detalle"
          value={formData.detalle}
          onChange={handleInputsChange}
          placeholder="Describa aquí qué sucedió..."
        />
      </Field>

      <Field label="Pedido del Consumidor" invalid={!!errors.pedido} errorText={errors.pedido} required>
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
