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
const ReclamationFormInner = () => {
  const { handleBtnSubmit, modalProps }: any = useReclamationFormContext();

  return (
    <Box>
      <br />
      <Box
        p={{ base: 4, md: 8 }}
        maxW="3xl"
        mx="auto"
        mb={8}
        bg="bg.panel"
        borderWidth="1px"
        borderColor="border.glass"
        borderRadius="2xl"
        boxShadow="2xl"
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
          bg="bg.muted"
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
          <Stack gap={8}>
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
 */
const ReclamationForm = () => {
  return (
    <ReclamationFormProvider>
      <ReclamationFormInner />
    </ReclamationFormProvider>
  );
};

export default ReclamationForm;
