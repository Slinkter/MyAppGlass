import React from "react";
import {
  Input,
  SimpleGrid,
  Heading,
} from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import {
  NativeSelectField,
  NativeSelectRoot,
} from "@/components/ui/native-select";
import { useReclamationFormContext } from "./ReclamationFormContext";
import { ReclamoFormState } from "../types";

interface FormFieldProps {
  label: string;
  name: keyof ReclamoFormState;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
      type={type}
      name={name}
      value={value}
      onChange={onChange}
    />
  </Field>
);

interface FormSelectProps {
  label: string;
  name: keyof ReclamoFormState;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
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
    <NativeSelectRoot>
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

  // Cast handleInputsChange to specific types for sub-components if needed, 
  // but since it's compatible with ChangeEvent, it should work.

  return (
    <>
      <Heading
        as="h3"
        size="md"
        borderBottomWidth={2}
        pb="2"
        color="text.heading"
      >
        1. Identificación del consumidor
      </Heading>

      <FormField
        label="Nombre Completo"
        name="nombreCompleto"
        value={formData.nombreCompleto}
        onChange={handleInputsChange as unknown as React.ChangeEventHandler<HTMLInputElement>}
        error={errors.nombreCompleto}
      />

      <FormField
        label="Domicilio"
        name="domicilio"
        value={formData.domicilio}
        onChange={handleInputsChange as unknown as React.ChangeEventHandler<HTMLInputElement>}
        error={errors.domicilio}
      />

      <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
        <FormField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputsChange as unknown as React.ChangeEventHandler<HTMLInputElement>}
          error={errors.email}
        />

        <FormField
          label="Teléfono"
          type="tel"
          name="telefono"
          value={formData.telefono}
          onChange={handleInputsChange as unknown as React.ChangeEventHandler<HTMLInputElement>}
          error={errors.telefono}
        />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
        <FormSelect
          label="Tipo de Documento"
          name="tipoDocumento"
          value={formData.tipoDocumento}
          onChange={handleInputsChange as unknown as React.ChangeEventHandler<HTMLSelectElement>}
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
          onChange={handleInputsChange as unknown as React.ChangeEventHandler<HTMLInputElement>}
          error={errors.numeroDocumento}
        />
      </SimpleGrid>

      <FormField
        label="Padre, madre o tutor (si es menor de edad)"
        name="nombrePadreMadre"
        value={formData.nombrePadreMadre}
        onChange={handleInputsChange as unknown as React.ChangeEventHandler<HTMLInputElement>}
        required={false}
      />
    </>
  );
};

export default PersonalInfoSection;
