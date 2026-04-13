"use client";

import React from "react";
import {
  Button,
  Text,
  Heading,
} from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import { useReclamationFormContext } from "./ReclamationFormContext";

/**
 * @component DeclarationSection
 * @description Sección de declaración, aceptación y envío
 */
const DeclarationSection = () => {
  const { formData, setFieldValue, handleBtnSubmit, errors }: any = useReclamationFormContext();

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
        4. Declaración y Envío
      </Heading>

      <Text fontSize="sm" color="text.muted">
        * La respuesta a la presente será remitida al correo electrónico
        consignado en un plazo no mayor a 15 días hábiles, según el D.S. N°
        006-2014-PCM.
      </Text>

      <Field invalid={!!errors.autorizaEmail} errorText={errors.autorizaEmail} required>
        <Checkbox
          name="autorizaEmail"
          checked={formData.autorizaEmail}
          onCheckedChange={(e) => setFieldValue("autorizaEmail", !!e.checked)}
          label="Autorizo que la respuesta a mi reclamo sea enviada al correo electrónico consignado."
        />
      </Field>

      <Field invalid={!!errors.aceptaTerminos} errorText={errors.aceptaTerminos} required>
        <Checkbox
          name="aceptaTerminos"
          checked={formData.aceptaTerminos}
          onCheckedChange={(e) => setFieldValue("aceptaTerminos", !!e.checked)}
          label="Declaro que la información proporcionada es veraz y acepto la Política de Privacidad y Protección de Datos."
        />
      </Field>

      <Button
        type="submit"
        size="lg"
        width="full"
        onClick={handleBtnSubmit}
        colorPalette="blue"
      >
        Enviar Reclamo/Queja
      </Button>
    </>
  );
};

export default DeclarationSection;
