"use client";

import React from "react";
import { Box, Heading, Stack, Text as ChakraText, VStack, SimpleGrid } from "@chakra-ui/react";
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
        p={{ base: 6, md: 10 }}
        maxW="4xl"
        mx="auto"
        mb={16}
        bg="bg.panel"
        backdropFilter="blur(16px)"
        borderWidth="1px"
        borderColor="border.glass"
        borderRadius="3xl"
        boxShadow="0 25px 50px -12px rgba(0, 0, 0, 0.5)"
        color="text.body"
      >
        <VStack gap={2} mb={10} textAlign="center">
          <Heading
            as="h2"
            size="2xl"
            color="text.heading"
            letterSpacing="tight"
            fontWeight="black"
          >
            Libro de Reclamaciones
          </Heading>
          <ChakraText color="text.muted" fontSize="lg">
            Plataforma virtual de atención al consumidor conforme a ley.
          </ChakraText>
        </VStack>

        <SimpleGrid
          columns={{ base: 1, md: 3 }}
          gap={6}
          bg="rgba(255, 255, 255, 0.03)"
          rounded="2xl"
          p={6}
          mb={10}
          borderWidth={1}
          borderColor="border.glass"
        >
          <Box>
            <ChakraText fontSize="xs" fontWeight="900" color="primary.500" letterSpacing="0.2em" mb={1}>RAZÓN SOCIAL</ChakraText>
            <ChakraText fontWeight="bold" color="text.heading" fontSize="sm">{companyData.razonSocial}</ChakraText>
          </Box>
          <Box>
            <ChakraText fontSize="xs" fontWeight="900" color="primary.500" letterSpacing="0.2em" mb={1}>RUC</ChakraText>
            <ChakraText fontWeight="bold" color="text.heading" fontSize="sm">{companyData.ruc}</ChakraText>
          </Box>
          <Box>
            <ChakraText fontSize="xs" fontWeight="900" color="primary.500" letterSpacing="0.2em" mb={1}>DIRECCIÓN</ChakraText>
            <ChakraText fontWeight="bold" color="text.heading" fontSize="sm">{companyData.direccion}</ChakraText>
          </Box>
        </SimpleGrid>

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
