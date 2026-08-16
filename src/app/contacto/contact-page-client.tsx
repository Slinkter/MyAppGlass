"use client";

import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Badge,
} from "@chakra-ui/react";
import { useContactForm } from "@/features/contacto/hooks/useContactForm";
import { ContactFormSection } from "@/features/contacto/components/ContactFormSection";
import { TrackingSection } from "@/features/contacto/components/TrackingSection";
import { ContactSuccessModal } from "@/features/contacto/components/ContactSuccessModal";
import { useRouter } from "next/navigation";

export default function ContactPageClient() {
  const router = useRouter();
  const { 
    formData, errors, isSubmitting, 
    handleChange, handleBlur, handleCheckedChange, handleSubmit,
    trackingId, isTracking, trackingResult, handleTrackingChange, handleTrackingSubmit,
    isSuccessOpen, setIsSuccessOpen, successTrackingId
  } = useContactForm();

  const handleRedirect = () => {
    setIsSuccessOpen(false);
    router.push("/");
  };

  return (
    <Box bg="bg.page" minH="100dvh" pt={{ base: 24, md: 32 }} pb={20} position="relative" overflow="hidden">
      {/* Background Ambient Glow Orbs */}
      <Box 
        position="absolute" 
        top="-10%" 
        right="-5%" 
        w="45%" 
        h="60%" 
        bgGradient="radial(circle, primary.900, transparent)" 
        opacity={0.12} 
        filter="blur(140px)" 
        zIndex={0}
        pointerEvents="none"
      />
      <Box 
        position="absolute" 
        bottom="-10%" 
        left="-5%" 
        w="35%" 
        h="50%" 
        bgGradient="radial(circle, text.accent, transparent)" 
        opacity={0.08} 
        filter="blur(120px)" 
        zIndex={0}
        pointerEvents="none"
      />

      <Container maxW="4xl" position="relative" zIndex={1}>
        {/* Header Section */}
        <VStack gap={3} align="flex-start" mb={10}>
          <Heading as="h1" size={{ base: "2xl", md: "4xl" }} fontWeight="900" letterSpacing="tighter">
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
            handleSubmit={handleSubmit}
          />
        </Box>

        {/* SECCIÓN 2: Consulta tu Cotización */}
        <VStack gap={6} align="flex-start" pt={8} borderTop="1px solid" borderColor="border.glass">
          <Box>
            <Badge colorPalette="blue" variant="subtle" px="3" py="1" borderRadius="full" fontSize="xs" fontWeight="800" textTransform="uppercase" letterSpacing="0.15em" mb="2">
              Seguimiento
            </Badge>
            <Heading as="h2" size={{ base: "xl", md: "2xl" }} fontWeight="800" letterSpacing="tight">
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
        onClose={handleRedirect}
        trackingId={successTrackingId}
      />
    </Box>
  );
}
