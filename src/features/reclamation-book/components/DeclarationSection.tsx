import React from "react";
import { Text, Heading } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import { useReclamationFormContext } from "./ReclamationFormContext";

/**
 * @component DeclarationSection
 * @description Sección de declaración, aceptación y envío
 * Migrado a Chakra v3: FormControl+Checkbox → Field + Checkbox snippet (compound component)
 */
const DeclarationSection: React.FC = () => {
  const { formData, handleInputsChange, handleBtnSubmit, errors } = useReclamationFormContext();

  return (
    <>
      <Heading
        as="h3" size="md"
        borderBottomWidth={2} pb="phi_xs" pt="phi_sm"
        color="text.heading"
      >
        4. Declaración y Envío
      </Heading>

      <Text fontSize="sm" color="text.muted">
        * La respuesta a la presente será remitida al correo electrónico
        consignado en un plazo no mayor a 15 días hábiles, según el D.S. N°
        006-2014-PCM.
      </Text>

      {/* v3: Field wrapping Checkbox with errorText prop */}
      <Field
        errorText={errors.autorizaEmail}
        invalid={!!errors.autorizaEmail}
        mb="phi_sm"
      >
        <Checkbox
          name="autorizaEmail"
          checked={formData.autorizaEmail}
          onCheckedChange={(details) =>
            handleInputsChange({ target: { name: "autorizaEmail", type: "checkbox", checked: details.checked } })
          }
        >
          Autorizo que la respuesta a mi reclamo sea enviada al correo electrónico consignado.
        </Checkbox>
      </Field>

      <Field
        errorText={errors.aceptaTerminos}
        invalid={!!errors.aceptaTerminos}
      >
        <Checkbox
          name="aceptaTerminos"
          checked={formData.aceptaTerminos}
          onCheckedChange={(details) =>
            handleInputsChange({ target: { name: "aceptaTerminos", type: "checkbox", checked: details.checked } })
          }
        >
          Declaro que la información proporcionada es veraz y acepto la Política de Privacidad y Protección de Datos.
        </Checkbox>
      </Field>

      <Button
        type="submit"
        size="lg"
        width="full"
        onClick={handleBtnSubmit}
      >
        Enviar Reclamo/Queja
      </Button>
    </>
  );
};

export default DeclarationSection;
