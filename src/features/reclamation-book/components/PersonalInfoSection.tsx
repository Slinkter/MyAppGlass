import React from "react";
import {
  Input,
  SimpleGrid,
  Heading,
  VStack,
  HStack,
  Box,
} from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import {
  NativeSelectField,
  NativeSelectRoot,
} from "@/components/ui/native-select";
import { useReclamationFormContext } from "./ReclamationFormContext";
import { ReclamationFormState, InputChangeEvent } from "@features/reclamation-book/types";

interface FormFieldProps {
  label: string;
  name: keyof ReclamationFormState;
  value: string;
  onChange: (e: InputChangeEvent) => void;
  error?: string;
  required?: boolean;
  type?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  value,
  onChange,
  error,
  required = true,
  type = "text",
}) => (
  <Field 
    label={label} 
    invalid={!!error} 
    errorText={error} 
    required={required}
  >
    <Input
      variant="subtle"
      type={type}
      name={name}
      value={value}
      onChange={onChange}
    />
  </Field>
);

interface FormSelectProps {
  label: string;
  name: keyof ReclamationFormState;
  value: string;
  onChange: (e: InputChangeEvent) => void;
  error?: string;
  children: React.ReactNode;
}

const FormSelect: React.FC<FormSelectProps> = ({
  label,
  name,
  value,
  onChange,
  error,
  children,
}) => (
  <Field 
    label={label} 
    invalid={!!error} 
    errorText={error} 
    required
  >
    <NativeSelectRoot variant="subtle">
      <NativeSelectField
        name={name}
        value={value}
        onChange={onChange}
        placeholder="Seleccionar"
      >
        {children}
      </NativeSelectField>
    </NativeSelectRoot>
  </Field>
);

/**
 * @component PersonalInfoSection
 * @description Sección de información personal del formulario de reclamaciones
 */
const PersonalInfoSection: React.FC = () => {
  const { formData, handleInputsChange, errors } = useReclamationFormContext();

  return (
    <VStack gap="5" align="stretch">
      <HStack gap="2.5" pb="2" borderBottomWidth="1px" borderColor="border.default">
        <Box 
          w="24px" 
          h="24px" 
          borderRadius="full" 
          bg="primary.500" 
          color="white" 
          fontSize="xs" 
          fontWeight="900"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          1
        </Box>
        <Heading
          as="h3"
          size="sm"
          fontWeight="800"
          color="text.heading"
          letterSpacing="tight"
        >
          Identificación del Consumidor
        </Heading>
      </HStack>

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

      <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
        <FormField
          label="Correo Electrónico"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputsChange}
          error={errors.email}
        />

        <FormField
          label="Teléfono de Contacto"
          type="tel"
          name="telefono"
          value={formData.telefono}
          onChange={handleInputsChange}
          error={errors.telefono}
        />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
        <FormSelect
          label="Tipo de Documento"
          name="tipoDocumento"
          value={formData.tipoDocumento}
          onChange={handleInputsChange}
          error={errors.tipoDocumento}
        >
          <option value="DNI">DNI (Documento Nacional de Identidad)</option>
          <option value="CE">CE (Carnet de Extranjería)</option>
          <option value="PASAPORTE">Pasaporte</option>
        </FormSelect>

        <FormField
          label="Número de Documento"
          name="numeroDocumento"
          value={formData.numeroDocumento}
          onChange={handleInputsChange}
          error={errors.numeroDocumento}
        />
      </SimpleGrid>

      <FormField
        label="Padre, Madre o Tutor (Obligatorio en caso de menores de edad)"
        name="nombrePadreMadre"
        value={formData.nombrePadreMadre || ""}
        onChange={handleInputsChange}
        required={false}
      />
    </VStack>
  );
};

export default PersonalInfoSection;
