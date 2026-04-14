"use client";

import React from "react";
import {
  Input,
  SimpleGrid,
  Heading,
  VStack,
} from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { useReclamationFormContext } from "./ReclamationFormContext";

interface FormFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (_e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  error?: string;
  isRequired?: boolean;
  type?: string;
}

const FormField = ({
  label,
  name,
  value,
  onChange,
  error,
  isRequired = true,
  type = "text",
}: FormFieldProps) => (
  <Field label={label} invalid={!!error} errorText={error} required={isRequired}>
    <Input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
    />
  </Field>
);

// Note: Select will be updated once snippet is ready
const FormSelect = ({
  label,
  name,
  value,
  onChange,
  error,
  children,
}: any) => (
  <Field label={label} invalid={!!error} errorText={error} required>
    <select
      name={name}
      value={value}
      onChange={onChange}
      style={{
          width: '100%',
          padding: '10px 12px',
          borderRadius: '12px',
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid var(--chakra-colors-border-glass)',
          color: 'inherit',
          fontSize: '14px',
          appearance: 'none',
          cursor: 'pointer',
          outline: 'none',
          transition: 'all 0.2s'
      }}
    >
      <option value="" style={{ background: 'var(--chakra-colors-bg-panel)' }}>Seleccionar</option>
      {children}
    </select>
  </Field>
);

/**
 * @component PersonalInfoSection
 * @description Sección de información personal del formulario de reclamaciones
 */
const PersonalInfoSection = () => {
  const { formData, handleInputsChange, errors }: any = useReclamationFormContext();

  return (
    <>
      <Heading
        as="h3"
        size="md"
        borderBottomWidth={2}
        pb="phi_xs"
        color="text.heading"
        mb="phi_md"
      >
        1. Identificación del consumidor
      </Heading>

      <VStack gap="phi_sm" align="stretch">
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

        <SimpleGrid columns={{ base: 1, md: 2 }} gap="phi_md">
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

        <SimpleGrid columns={{ base: 1, md: 2 }} gap="phi_md">
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
      </VStack>
    </>
  );
};

export default PersonalInfoSection;
