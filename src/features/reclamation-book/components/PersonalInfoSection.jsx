import React from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  SimpleGrid,
  Select,
  Heading,
} from "@chakra-ui/react";
import { useReclamationFormContext } from "./ReclamationFormContext";

const FormField = ({
  label,
  name,
  value,
  onChange,
  error,
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
  children,
}) => (
  <FormControl isRequired isInvalid={!!error}>
    <FormLabel>{label}</FormLabel>
    <Select
      name={name}
      value={value}
      onChange={onChange}
      placeholder="Seleccionar"
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
const PersonalInfoSection = () => {
  const { formData, handleInputsChange, errors } = useReclamationFormContext();

  return (
    <>
      <Heading
        as="h3"
        size="md"
        borderBottomWidth={2}
        pb={2}
        color="text.heading"
      >
        1. Identificación del consumidor
      </Heading>

      <FormField
        label="Nombre Completo"
        name="nombreCompleto"
        value={formData.nombreCompleto}
        onChange={handleInputsChange}
        error={errors.nombreCompleto}
      />

      <FormField
        label="Domicilio"
        name="domicilio"
        value={formData.domicilio}
        onChange={handleInputsChange}
        error={errors.domicilio}
      />

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        <FormField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputsChange}
          error={errors.email}
        />

        <FormField
          label="Teléfono"
          type="tel"
          name="telefono"
          value={formData.telefono}
          onChange={handleInputsChange}
          error={errors.telefono}
        />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        <FormSelect
          label="Tipo de Documento"
          name="tipoDocumento"
          value={formData.tipoDocumento}
          onChange={handleInputsChange}
          error={errors.tipoDocumento}
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
        />
      </SimpleGrid>

      <FormField
        label="Padre, madre o tutor (si es menor de edad)"
        name="nombrePadreMadre"
        value={formData.nombrePadreMadre}
        onChange={handleInputsChange}
        isRequired={false}
      />
    </>
  );
};

export default PersonalInfoSection;

export default PersonalInfoSection;
