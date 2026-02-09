import React from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  SimpleGrid,
  Select,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";

/**
 * @component PersonalInfoSection
 * @description Sección de información personal del formulario de reclamaciones
 * @param {Object} props - Props del componente
 * @param {Object} props.formData - Datos del formulario
 * @param {Function} props.handleInputsChange - Función para manejar cambios
 * @param {Object} props.errors - Errores de validación
 * @param {Object} props.inputStyles - Estilos aplicados a inputs
 * @param {Object} props.selectStyles - Estilos aplicados a selects
 */
const PersonalInfoSection = ({
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
        color={headingColor}
      >
        1. Identificación del consumidor
      </Heading>

      <FormControl isRequired isInvalid={!!errors.nombreCompleto}>
        <FormLabel>Nombre Completo</FormLabel>
        <Input
          name="nombreCompleto"
          value={formData.nombreCompleto}
          onChange={handleInputsChange}
          {...inputStyles}
        />
        <FormErrorMessage>{errors.nombreCompleto}</FormErrorMessage>
      </FormControl>

      <FormControl isRequired isInvalid={!!errors.domicilio}>
        <FormLabel>Domicilio</FormLabel>
        <Input
          name="domicilio"
          value={formData.domicilio}
          onChange={handleInputsChange}
          {...inputStyles}
        />
        <FormErrorMessage>{errors.domicilio}</FormErrorMessage>
      </FormControl>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        <FormControl isRequired isInvalid={!!errors.email}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputsChange}
            {...inputStyles}
          />
          <FormErrorMessage>{errors.email}</FormErrorMessage>
        </FormControl>

        <FormControl isRequired isInvalid={!!errors.telefono}>
          <FormLabel>Teléfono</FormLabel>
          <Input
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleInputsChange}
            {...inputStyles}
          />
          <FormErrorMessage>{errors.telefono}</FormErrorMessage>
        </FormControl>
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        <FormControl isRequired isInvalid={!!errors.tipoDocumento}>
          <FormLabel>Tipo de Documento</FormLabel>
          <Select
            name="tipoDocumento"
            value={formData.tipoDocumento}
            onChange={handleInputsChange}
            placeholder="Seleccionar"
            sx={selectStyles}
          >
            <option value="DNI">DNI</option>
            <option value="CE">CE</option>
            <option value="PASAPORTE">PASAPORTE</option>
          </Select>
          <FormErrorMessage>{errors.tipoDocumento}</FormErrorMessage>
        </FormControl>

        <FormControl isRequired isInvalid={!!errors.numeroDocumento}>
          <FormLabel>Nº de Documento</FormLabel>
          <Input
            name="numeroDocumento"
            value={formData.numeroDocumento}
            onChange={handleInputsChange}
            {...inputStyles}
          />
          <FormErrorMessage>{errors.numeroDocumento}</FormErrorMessage>
        </FormControl>
      </SimpleGrid>

      <FormControl>
        <FormLabel>Padre, madre o tutor (si es menor de edad)</FormLabel>
        <Input
          name="nombrePadreMadre"
          value={formData.nombrePadreMadre}
          onChange={handleInputsChange}
          {...inputStyles}
        />
      </FormControl>
    </>
  );
};

export default PersonalInfoSection;
