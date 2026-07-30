"use client";
import React from "react";
import { Box, Heading, Stack, Text, VStack, HStack, SimpleGrid, Badge } from "@chakra-ui/react";
import { companyData } from "@/shared/config/company-data";
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
    <Box
      mt={{ base: "6", md: "10" }}
      mb="16"
      maxW="4xl"
      mx="auto"
      px={{ base: "4", sm: "6", md: "10" }}
      py={{ base: "6", md: "10" }}
      bg="bg.subtle"
      borderWidth="1px"
      borderColor="border.default"
      borderRadius="3xl"
      boxShadow="sm"
    >
      {/* Header del Libro de Reclamaciones */}
      <VStack gap="3" align="center" textAlign="center" mb="8">
        <HStack gap="2">
          <Badge
            colorPalette="primary"
            size="md"
            variant="solid"
            px="3"
            borderRadius="full"
            fontWeight="800"
            letterSpacing="wider"
          >
            INDECOPI COMPLIANT
          </Badge>
          <Badge
            variant="outline"
            colorPalette="gray"
            size="md"
            px="3"
            borderRadius="full"
            fontWeight="700"
          >
            D.S. N° 006-2014-PCM
          </Badge>
        </HStack>

        <Heading
          as="h1"
          fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
          fontWeight="900"
          letterSpacing="tight"
          color="text.heading"
        >
          Libro de Reclamaciones Virtual
        </Heading>

        <Text fontSize="xs" color="text.muted" maxW="xl">
          Conforme a lo establecido en el Código de Protección y Defensa del Consumidor, nuestra empresa pone a su disposición este libro virtual.
        </Text>
      </VStack>

      {/* Ficha Proveedor / Razón Social */}
      <Box
        bg="surface.card"
        borderRadius="2xl"
        p={{ base: "4", md: "5" }}
        mb="8"
        borderWidth="1px"
        borderColor="border.default"
      >
        <SimpleGrid columns={{ base: 1, sm: 3 }} gap="4" alignContent="center">
          <Box>
            <Text fontSize="10px" fontWeight="900" color="primary.500" textTransform="uppercase" letterSpacing="0.15em">
              Razón Social
            </Text>
            <Text fontSize="xs" fontWeight="700" color="text.heading" mt="0.5">
              {companyData.razonSocial}
            </Text>
          </Box>
          <Box>
            <Text fontSize="10px" fontWeight="900" color="primary.500" textTransform="uppercase" letterSpacing="0.15em">
              R.U.C.
            </Text>
            <Text fontSize="xs" fontWeight="700" color="text.heading" mt="0.5">
              {companyData.ruc}
            </Text>
          </Box>
          <Box>
            <Text fontSize="10px" fontWeight="900" color="primary.500" textTransform="uppercase" letterSpacing="0.15em">
              Dirección Fiscal
            </Text>
            <Text fontSize="xs" fontWeight="700" color="text.heading" mt="0.5">
              {companyData.direccion}
            </Text>
          </Box>
        </SimpleGrid>
      </Box>

      {/* Formulario por Secciones */}
      <form onSubmit={handleBtnSubmit}>
        <Stack gap="8">
          <PersonalInfoSection />
          <ProductSection />
          <ClaimDetailSection />
          <DeclarationSection />
        </Stack>
      </form>

      <SuccessModal
        isOpen={modalProps.isOpen}
        onClose={modalProps.onClose}
        trackingId={modalProps.newReclamationId}
      />
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
