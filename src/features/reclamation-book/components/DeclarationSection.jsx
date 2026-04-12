import React from "react";
import {
  FormControl,
  FormErrorMessage,
  Checkbox,
  Button,
  Text,
  Heading,
} from "@chakra-ui/react";
import { useReclamationFormContext } from "./ReclamationFormContext";

/**
 * @component DeclarationSection
 * @description Sección de declaración, aceptación y envío
 */
const DeclarationSection = () => {
  const { formData, handleInputsChange, handleBtnSubmit, errors } = useReclamationFormContext();

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

      <FormControl isRequired isInvalid={!!errors.autorizaEmail} mb={4}>
        <Checkbox
          name="autorizaEmail"
          isChecked={formData.autorizaEmail}
          onChange={handleInputsChange}
        >
          Autorizo que la respuesta a mi reclamo sea enviada al correo
          electrónico consignado.
        </Checkbox>
        <FormErrorMessage>{errors.autorizaEmail}</FormErrorMessage>
      </FormControl>

      <FormControl isRequired isInvalid={!!errors.aceptaTerminos}>
        <Checkbox
          name="aceptaTerminos"
          isChecked={formData.aceptaTerminos}
          onChange={handleInputsChange}
        >
          Declaro que la información proporcionada es veraz y acepto la Política
          de Privacidad y Protección de Datos.
        </Checkbox>
        <FormErrorMessage>{errors.aceptaTerminos}</FormErrorMessage>
      </FormControl>

      <Button
        type="submit"
        variant="aura"
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

export default DeclarationSection;
