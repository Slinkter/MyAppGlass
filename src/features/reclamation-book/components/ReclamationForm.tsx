"use client";
import React from "react";
import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { companyData } from "@/config/company-data";
import { ReclamationFormProvider, useReclamationFormContext } from "./ReclamationFormContext";
import PersonalInfoSection from "./PersonalInfoSection";
import ProductSection from "./ProductSection";
import ClaimDetailSection from "./ClaimDetailSection";
import DeclarationSection from "./DeclarationSection";
import SuccessModal from "./SuccessModal";

/**
 * @component ReclamationFormInner
 * @description Internal component that consumes the context for cleaner logic.
 */
const ReclamationFormInner: React.FC = () => {
  const { handleBtnSubmit, modalProps } = useReclamationFormContext();

  return (
    <Box>
      <br />
      <Box
        p={{ base: "phi_sm", md: "phi_lg" }}
        maxW="3xl"
        mx="auto"
        mb="phi_lg"
        bg="bg.section"
        backdropFilter="blur(16px)"
        border="1px solid"
        borderColor="border.glass"
        borderRadius="2xl"
        boxShadow="2xl"
        color="text.body"
      >
        <Heading
          as="h2"
          size="lg"
          mb="phi_sm"
          textAlign="center"
          color="text.heading"
        >
          Libro de Reclamaciones Virtual
        </Heading>

        <Box
          bg="surface.container"
          rounded="md"
          p="phi_sm"
          mb="phi_md"
          borderWidth={1}
          borderColor="border.glass"
        >
          <Text fontWeight="bold" color="text.heading">Razón Social:</Text>
          <Text mb="phi_xs" color="text.muted">{companyData.razonSocial}</Text>
          <Text fontWeight="bold" color="text.heading">RUC:</Text>
          <Text mb="phi_xs" color="text.muted">{companyData.ruc}</Text>
          <Text fontWeight="bold" color="text.heading">Dirección:</Text>
          <Text color="text.muted">{companyData.direccion}</Text>
        </Box>

        <form onSubmit={handleBtnSubmit}>
          <Stack gap="phi_md">
            <PersonalInfoSection />
            <ProductSection />
            <ClaimDetailSection />
            <DeclarationSection />
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

/**
 * @component ReclamationForm
 * @description Formulario principal para el Libro de Reclamaciones Virtual.
 * Contenedor que coordina todas las secciones del formulario.
 * @returns {JSX.Element} Formulario completo con validación y contexto centralizado.
 */
const ReclamationForm: React.FC = () => {
  return (
    <ReclamationFormProvider>
      <ReclamationFormInner />
    </ReclamationFormProvider>
  );
};

export default ReclamationForm;
