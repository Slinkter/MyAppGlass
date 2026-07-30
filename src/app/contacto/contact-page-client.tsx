"use client";

import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  SimpleGrid,
  HStack,
  Badge,
} from "@chakra-ui/react";
import { Clock, ShieldCheck } from "lucide-react";
import { useContactForm } from "@/features/contacto/hooks/useContactForm";
import { WhatsAppSection } from "@/features/contacto/components/WhatsAppSection";
import { ContactInfoCards } from "@/features/contacto/components/ContactInfoCards";
import { ContactFormSection } from "@/features/contacto/components/ContactFormSection";
import { TrackingSection } from "@/features/contacto/components/TrackingSection";
import AuraSurface from "@/shared/components/aura/AuraSurface";

export default function ContactPageClient() {
  const { 
    step, nextStep, prevStep, setProjectType,
    formData, errors, isSubmitting, handleChange, handleBlur, handleCheckedChange, handleSubmit,
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

      <Container maxW="7xl" position="relative" zIndex={1}>
        {/* Header Section */}
        <VStack gap={4} align="flex-start" mb={12}>
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
            Asesoría técnica en vidriería templada, mamparas y carpintería de aluminio.
          </Text>
        </VStack>

        {/* SECCIÓN 1: COTIZA (Formulario + Canales Inmediatos) */}
        <SimpleGrid columns={{ base: 1, lg: 2 }} gap="8" alignItems="start" mb={16}>
          {/* Formulario Principal de Cotización */}
          <ContactFormSection 
            step={step}
            nextStep={nextStep}
            prevStep={prevStep}
            formData={formData}
            errors={errors}
            isSubmitting={isSubmitting}
            handleChange={handleChange}
            setProjectType={setProjectType}
            handleBlur={handleBlur}
            handleCheckedChange={handleCheckedChange}
            handleSubmit={handleSubmit}
          />

          {/* Canales Directos WhatsApp y Contacto */}
          <VStack gap="6" align="stretch">
            <WhatsAppSection />
            <ContactInfoCards />

            <AuraSurface p="5" variant="glass">
              <HStack gap="4">
                <Box p="2.5" borderRadius="xl" bg="whiteAlpha.200" color="text.accent">
                  <ShieldCheck size={24} />
                </Box>
                <VStack align="flex-start" gap="0">
                  <Text fontSize="xs" fontWeight="bold" color="text.heading">
                    Garantía y Asesoría Técnica Especializada
                  </Text>
                  <Text fontSize="2xs" color="text.muted">
                    Contamos con ingenieros y técnicos certificados para medición en obra y diseño de perfiles a medida.
                  </Text>
                </VStack>
              </HStack>
            </AuraSurface>
          </VStack>
        </SimpleGrid>

        {/* SECCIÓN 2: CONSULTA TU COTIZACIÓN */}
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

          <Box w="full" maxW="3xl">
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
