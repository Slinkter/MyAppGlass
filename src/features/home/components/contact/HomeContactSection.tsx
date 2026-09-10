"use client";

import React from "react";
import { Box, Container, VStack, Heading, Text } from "@chakra-ui/react";
import { useContactForm } from "@/features/contacto/hooks/useContactForm";
import { ContactFormSection } from "@/features/contacto/components/ContactFormSection";
import { ContactSuccessModal } from "@/features/contacto/components/ContactSuccessModal";

export const HomeContactSection: React.FC = React.memo(() => {
  const {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleCheckedChange,
    handleMathChange,
    handleSubmit,
    isSuccessOpen,
    handleCloseModal,
    successTrackingId,
  } = useContactForm();

  return (
    <Box id="contacto" as="section" scrollMarginTop={{ base: "80px", md: "110px" }} w="full">
      <Container maxW="7xl" px={{ base: 4, sm: 6, md: 8 }} mb={{ base: "8", md: "10" }}>
        <VStack gap="2" textAlign="center" align="center">
          <Heading
            as="h2"
            size={{ base: "2xl", md: "3xl" }}
            fontWeight="900"
            letterSpacing="tight"
            color="text.heading"
            textTransform="uppercase"
          >
            Contacto & Cotizaciones
          </Heading>
          <Text color="text.muted" fontSize={{ base: "sm", md: "md" }} maxW="2xl">
            Déjanos tu requerimiento técnico y nuestro equipo de ingenieros te responderá a la brevedad.
          </Text>
        </VStack>
      </Container>

      <Container maxW="4xl" px={{ base: 4, sm: 6, md: 8 }}>
        <Box
          bg="surface.card"
          borderWidth="1px"
          borderColor="border.default"
          borderRadius="3xl"
          p={{ base: "6", md: "10" }}
          boxShadow="sm"
        >
          <ContactFormSection
            formData={formData}
            errors={errors}
            isSubmitting={isSubmitting}
            handleChange={handleChange}
            handleBlur={handleBlur}
            handleCheckedChange={handleCheckedChange}
            handleMathChange={handleMathChange}
            handleSubmit={handleSubmit}
          />
        </Box>
      </Container>

      <ContactSuccessModal
        isOpen={isSuccessOpen}
        onClose={handleCloseModal}
        trackingId={successTrackingId}
      />
    </Box>
  );
});

HomeContactSection.displayName = "HomeContactSection";
export default HomeContactSection;
