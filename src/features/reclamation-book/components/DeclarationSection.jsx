import React from "react";
import {
  FormControl,
  FormErrorMessage,
  Checkbox,
  Button,
  Text,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";

/**
 * @component DeclarationSection
 * @description Sección de declaración, aceptación y envío
 * @param {Object} props - Props del componente
 * @param {Object} props.formData - Datos del formulario
 * @param {Function} props.handleInputsChange - Función para manejar cambios
 * @param {Function} props.handleBtnSubmit - Función para enviar formulario
 * @param {Object} props.errors - Errores de validación
 */
const DeclarationSection = ({
  formData,
  handleInputsChange,
  handleBtnSubmit,
  errors,
}) => {
  const headingColor = useColorModeValue("gray.900", "white");
  const textColor = useColorModeValue("gray.600", "gray.300");

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
        4. Declaración y Envío
      </Heading>

      <Text fontSize="sm" color={textColor}>
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
        colorScheme="primary"
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
