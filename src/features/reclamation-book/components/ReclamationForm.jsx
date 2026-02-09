import React from "react";
import { Box, Heading, Stack, Text, useColorModeValue } from "@chakra-ui/react";
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

  const bgColor = useColorModeValue(
    "rgba(255, 255, 255, 0.25)",
    "rgba(0, 0, 0, 0.25)",
  );
  const borderColor = useColorModeValue(
    "rgba(255, 255, 255, 0.35)",
    "rgba(255, 255, 255, 0.15)",
  );
  const textColor = useColorModeValue("gray.800", "gray.100");
  const headingColor = useColorModeValue("gray.900", "white");
  const inputBg = useColorModeValue(
    "rgba(255, 255, 255, 0.4)",
    "rgba(0, 0, 0, 0.4)",
  );
  const inputBorder = useColorModeValue(
    "rgba(255, 255, 255, 0.5)",
    "rgba(0, 0, 0, 0.5)",
  );
  const placeholderColor = useColorModeValue("gray.500", "gray.400");

  const inputStyles = {
    bg: inputBg,
    borderColor: inputBorder,
    _placeholder: { color: placeholderColor },
    _hover: { borderColor: useColorModeValue("gray.400", "gray.500") },
    _focus: {
      borderColor: useColorModeValue("purple.500", "purple.300"),
      boxShadow: `0 0 0 1px ${useColorModeValue("primary.500", "primary.300")}`,
    },
  };

  const selectStyles = {
    ...inputStyles,
    option: {
      background: useColorModeValue("#FFFFFF", "#2D3748"),
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
        bg={bgColor}
        backdropFilter="blur(20px)"
        border="1px solid"
        borderColor={borderColor}
        boxShadow="0 4px 30px rgba(0,0,0,0.1)"
        borderRadius="2xl"
        color={textColor}
      >
        <Heading
          as="h2"
          size="lg"
          mb={4}
          textAlign="center"
          color={headingColor}
        >
          Libro de Reclamaciones Virtual
        </Heading>

        <Box
          bg={inputBg}
          rounded="md"
          p={4}
          mb={6}
          borderWidth={1}
          borderColor={borderColor}
        >
          <Text fontWeight="bold">Razón Social:</Text>
          <Text mb={2}>{companyData.razonSocial}</Text>
          <Text fontWeight="bold">RUC:</Text>
          <Text mb={2}>{companyData.ruc}</Text>
          <Text fontWeight="bold">Dirección:</Text>
          <Text>{companyData.direccion}</Text>
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
