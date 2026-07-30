"use client";

import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Badge,
  HStack,
} from "@chakra-ui/react";
import { Clock } from "lucide-react";
import { useContactForm } from "@/features/contacto/hooks/useContactForm";
import { ContactFormSection } from "@/features/contacto/components/ContactFormSection";
import { TrackingSection } from "@/features/contacto/components/TrackingSection";

export default function ContactPageClient() {
  const { 
    formData, isSubmitting, handleChange, handleCheckedChange, handleSubmit,
    trackingId, isTracking, trackingResult, handleTrackingChange, handleTrackingSubmit
  } = useContactForm();

  return (
    <Box bg="bg.page" minH="100dvh" pt={{ base: 24, md: 32 }} pb={20} position="relative" overflow="hidden">
      {/* Background Ambient Lights */}
      <Box 
        position="absolute" 
        top="-10%" 
        right="-5%" 
        w="45%" 
        h="60%" 
        bgGradient="radial(circle, primary.900, transparent)" 
        opacity={0.08} 
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
        opacity={0.05} 
        filter="blur(120px)" 
        zIndex={0}
        pointerEvents="none"
      />

      <Container maxW="4xl" position="relative" zIndex={1}>
        {/* Header Section */}
        <VStack gap={4} align="flex-start" mb={10}>
          <HStack gap="2" wrap="wrap">
            <Badge colorPalette="red" variant="subtle" px="3" py="1" borderRadius="full" fontSize="xs" fontWeight="800" textTransform="uppercase" letterSpacing="0.15em">
              Cotización & Asesoría
            </Badge>
            <HStack gap="1" color="text.muted" fontSize="xs">
              <Clock size={14} />
              <Text fontWeight="600">Atención Lu - Sáb: 8:00 AM - 6:00 PM</Text>
            </HStack>
          </HStack>

          <Heading as="h1" size={{ base: "2xl", md: "4xl" }} fontWeight="900" letterSpacing="tighter">
            Cotiza tu Proyecto <br />
            <Text as="span" color="text.accent">con Glass & Aluminum Company S.A.C.</Text>
          </Heading>
          <Text color="text.muted" fontSize="lg" maxW="2xl">
            Asesoría técnica especializada en vidriería templada, mamparas y carpintería de aluminio.
          </Text>
        </VStack>

        {/* SECCIÓN 1: Formulario Original Directo */}
        <Box mb={16}>
          <ContactFormSection 
            formData={formData}
            isSubmitting={isSubmitting}
            handleChange={handleChange}
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
    </Box>
  );
}
