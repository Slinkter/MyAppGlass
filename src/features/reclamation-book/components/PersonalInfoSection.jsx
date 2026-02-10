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

const FormField = ({
  label,
  name,
  value,
  onChange,
  error,
  styles,
  isRequired = true,
  type = "text",
}) => (
  <FormControl isRequired={isRequired} isInvalid={!!error}>
    <FormLabel>{label}</FormLabel>
    <Input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      {...styles}
    />
    <FormErrorMessage>{error}</FormErrorMessage>
  </FormControl>
);

const FormSelect = ({
  label,
  name,
  value,
  onChange,
  error,
  styles,
  children,
}) => (
  <FormControl isRequired isInvalid={!!error}>
    <FormLabel>{label}</FormLabel>
    <Select
      name={name}
      value={value}
      onChange={onChange}
      placeholder="Seleccionar"
      sx={styles}
    >
      {children}
    </Select>
    <FormErrorMessage>{error}</FormErrorMessage>
  </FormControl>
);

/**
 * @component PersonalInfoSection
 * @description Sección de información personal del formulario de reclamaciones
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

      <FormField
        label="Nombre Completo"
        name="nombreCompleto"
        value={formData.nombreCompleto}
        onChange={handleInputsChange}
        error={errors.nombreCompleto}
        styles={inputStyles}
      />

      <FormField
        label="Domicilio"
        name="domicilio"
        value={formData.domicilio}
        onChange={handleInputsChange}
        error={errors.domicilio}
        styles={inputStyles}
      />

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        <FormField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputsChange}
          error={errors.email}
          styles={inputStyles}
        />

        <FormField
          label="Teléfono"
          type="tel"
          name="telefono"
          value={formData.telefono}
          onChange={handleInputsChange}
          error={errors.telefono}
          styles={inputStyles}
        />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        <FormSelect
          label="Tipo de Documento"
          name="tipoDocumento"
          value={formData.tipoDocumento}
          onChange={handleInputsChange}
          error={errors.tipoDocumento}
          styles={selectStyles}
        >
          <option value="DNI">DNI</option>
          <option value="CE">CE</option>
          <option value="PASAPORTE">PASAPORTE</option>
        </FormSelect>

        <FormField
          label="Nº de Documento"
          name="numeroDocumento"
          value={formData.numeroDocumento}
          onChange={handleInputsChange}
          error={errors.numeroDocumento}
          styles={inputStyles}
        />
      </SimpleGrid>

      <FormField
        label="Padre, madre o tutor (si es menor de edad)"
        name="nombrePadreMadre"
        value={formData.nombrePadreMadre}
        onChange={handleInputsChange}
        styles={inputStyles}
        isRequired={false}
      />
    </>
  );
};

export default PersonalInfoSection;
