import React from "react";
import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { companyData } from "@/config/company-data";
import { useReclamoForm } from "../hooks/useReclamoForm";
import PersonalInfoSection from "./PersonalInfoSection";
import ProductSection from "./ProductSection";
import ClaimDetailSection from "./ClaimDetailSection";
import DeclarationSection from "./DeclarationSection";
import SuccessModal from "./SuccessModal";

/**
 * @component ReclamationForm
 * @description Formulario principal para el Libro de Reclamaciones Virtual.
 * Contenedor que coordina todas las secciones del formulario.
 * @returns {JSX.Element} Formulario completo con validación
 */
const ReclamationForm = () => {
  const { formData, errors, handleInputsChange, handleBtnSubmit, modalProps } =
    useReclamoForm();

  const inputStyles = {
    bg: "surface.container",
    borderColor: "border.glass",
    _placeholder: { color: "text.muted" },
    _hover: { borderColor: "border.strong" },
    _focus: {
      borderColor: "ring.primary",
      boxShadow: `0 0 0 1px var(--chakra-colors-ring-primary)`,
    },
  };

  const selectStyles = {
    ...inputStyles,
    option: {
      background: "var(--chakra-colors-surface-card)",
      color: "var(--chakra-colors-text-body)"
    },
  };

  return (
    <Box>
      <br />
      <Box
        p={{ base: 4, md: 8 }}
        maxW="3xl"
        mx="auto"
        mb={8}
        bg="surface.card"
        border="1px solid"
        borderColor="border.default"
        boxShadow="0 4px 30px rgba(0,0,0,0.1)"
        borderRadius="2xl"
        color="text.body"
      >
        <Heading
          as="h2"
          size="lg"
          mb={4}
          textAlign="center"
          color="text.heading"
        >
          Libro de Reclamaciones Virtual
        </Heading>

        <Box
          bg="surface.container"
          rounded="md"
          p={4}
          mb={6}
          borderWidth={1}
          borderColor="border.glass"
        >
          <Text fontWeight="bold" color="text.heading">Razón Social:</Text>
          <Text mb={2} color="text.muted">{companyData.razonSocial}</Text>
          <Text fontWeight="bold" color="text.heading">RUC:</Text>
          <Text mb={2} color="text.muted">{companyData.ruc}</Text>
          <Text fontWeight="bold" color="text.heading">Dirección:</Text>
          <Text color="text.muted">{companyData.direccion}</Text>
        </Box>

        <form onSubmit={handleBtnSubmit}>
          <Stack spacing={5}>
            <PersonalInfoSection
              formData={formData}
              handleInputsChange={handleInputsChange}
              errors={errors}
              inputStyles={inputStyles}
              selectStyles={selectStyles}
            />

            <ProductSection
              formData={formData}
              handleInputsChange={handleInputsChange}
              errors={errors}
              inputStyles={inputStyles}
              selectStyles={selectStyles}
            />

            <ClaimDetailSection
              formData={formData}
              handleInputsChange={handleInputsChange}
              errors={errors}
              inputStyles={inputStyles}
              selectStyles={selectStyles}
            />

            <DeclarationSection
              formData={formData}
              handleInputsChange={handleInputsChange}
              handleBtnSubmit={handleBtnSubmit}
              errors={errors}
            />
          </Stack>
        </form>

        <SuccessModal
          isOpen={modalProps.isOpen}
          onClose={modalProps.onClose}
          trackingId={modalProps.newReclamoId}
        />
      </Box>
    </Box>
  );
};

export default ReclamationForm;
