"use client";

import { Box, Container, VStack, Heading, Text } from "@chakra-ui/react";
import { Badge } from "@/components/ui/badge";
import { useContactForm } from "@/features/contacto/hooks/useContactForm";
import { ContactFormSection } from "@/features/contacto/components/ContactFormSection";
import { TrackingSection } from "@/features/contacto/components/TrackingSection";
import { ContactSuccessModal } from "@/features/contacto/components/ContactSuccessModal";

export default function ContactPageClient() {
  const { 
    formData, errors, isSubmitting, 
    handleChange, handleBlur, handleCheckedChange, handleMathChange, handleSubmit,
    trackingId, isTracking, trackingResult, handleTrackingChange, handleTrackingSubmit,
    isSuccessOpen, handleCloseModal, successTrackingId
  } = useContactForm();

  return (
    <Box bg="bg.page" minH="100dvh" pt={{ base: 24, md: 32 }} pb={20} position="relative" overflow="hidden">
      <Container maxW="pageNarrow" position="relative" zIndex={1}>
        {/* Header Section */}
        <VStack gap={3} align="flex-start" mb={10}>
          <Heading as="h1" size={{ base: "2xl", md: "4xl" }} fontWeight="700" letterSpacing="tighter">
            Cotiza tu Proyecto <br />
            <Text as="span" color="text.accent">con Glass & Aluminum Company S.A.C.</Text>
          </Heading>
          <Text color="text.muted" fontSize="lg" maxW="2xl">
            Asesoría especializada en vidriería templada, mamparas, muros cortina y perfiles de aluminio a medida.
          </Text>
        </VStack>

        {/* SECCIÓN 1: Formulario Principal de Cotización */}
        <Box mb={16}>
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

        {/* SECCIÓN 2: Consulta tu Cotización */}
        <VStack gap={6} align="flex-start" pt={8} borderTop="1px solid" borderColor="border.default">
          <Box>
            <Badge variant="info" px="3" py="1" borderRadius="full" fontSize="xs" fontWeight="700" textTransform="uppercase" letterSpacing="0.15em" mb="2">
              Seguimiento
            </Badge>
            <Heading as="h2" size={{ base: "xl", md: "2xl" }} fontWeight="700" letterSpacing="tight">
              Consulta tu Cotización
            </Heading>
            <Text color="text.muted" fontSize="sm" maxW="xl" mt="1">
              ¿Ya realizaste una cotización o reclamo previamente? Ingresa tu código único de seguimiento para verificar el estado en tiempo real.
            </Text>
          </Box>

          <Box w="full">
            <TrackingSection 
              trackingId={trackingId}
              isTracking={isTracking}
              trackingResult={trackingResult}
              handleTrackingChange={handleTrackingChange}
              handleTrackingSubmit={handleTrackingSubmit}
            />
          </Box>
        </VStack>
      </Container>

      <ContactSuccessModal 
        isOpen={isSuccessOpen}
        onClose={handleCloseModal}
        trackingId={successTrackingId}
      />
    </Box>
  );
}
