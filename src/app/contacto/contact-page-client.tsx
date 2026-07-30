"use client";

import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Badge,
  HStack,
  SimpleGrid,
} from "@chakra-ui/react";
import { Clock, Shield, Building2, Sparkles, Wrench } from "lucide-react";
import { useContactForm } from "@/features/contacto/hooks/useContactForm";
import { ContactFormSection } from "@/features/contacto/components/ContactFormSection";
import { TrackingSection } from "@/features/contacto/components/TrackingSection";
import AuraSurface from "@/shared/components/aura/AuraSurface";

export default function ContactPageClient() {
  const { 
    formData, errors, selectedCategory, setSelectedCategory, isSubmitting, 
    handleChange, handleBlur, handleCheckedChange, handleSubmit,
    trackingId, isTracking, trackingResult, handleTrackingChange, handleTrackingSubmit
  } = useContactForm();

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

      <Container maxW="5xl" position="relative" zIndex={1}>
        {/* Header Section */}
        <VStack gap={4} align="flex-start" mb={10}>
          <HStack gap="2" wrap="wrap">
            <Badge colorPalette="red" variant="subtle" px="3" py="1" borderRadius="full" fontSize="xs" fontWeight="800" textTransform="uppercase" letterSpacing="0.15em">
              Cotización & Asesoría Técnica
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
            Asesoría especializada en vidriería templada, mamparas, muros cortina y perfiles de aluminio a medida.
          </Text>
        </VStack>

        {/* Feature Highlights Grid according to Hallmark Editorial Guidelines */}
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} gap="4" mb={8}>
          <AuraSurface p="4" variant="glass">
            <HStack gap="3">
              <Box p="2" borderRadius="lg" bg="primary.500/10" color="primary.500">
                <Shield size={20} />
              </Box>
              <VStack align="flex-start" gap="0">
                <Text fontSize="xs" fontWeight="800" color="text.heading">Vidrio Templado</Text>
                <Text fontSize="2xs" color="text.muted">6mm, 8mm, 10mm, 12mm</Text>
              </VStack>
            </HStack>
          </AuraSurface>

          <AuraSurface p="4" variant="glass">
            <HStack gap="3">
              <Box p="2" borderRadius="lg" bg="primary.500/10" color="primary.500">
                <Building2 size={20} />
              </Box>
              <VStack align="flex-start" gap="0">
                <Text fontSize="xs" fontWeight="800" color="text.heading">Aluminio Serie</Text>
                <Text fontSize="2xs" color="text.muted">S-20, S-25, S-80, Perfiles</Text>
              </VStack>
            </HStack>
          </AuraSurface>

          <AuraSurface p="4" variant="glass">
            <HStack gap="3">
              <Box p="2" borderRadius="lg" bg="primary.500/10" color="primary.500">
                <Sparkles size={20} />
              </Box>
              <VStack align="flex-start" gap="0">
                <Text fontSize="xs" fontWeight="800" color="text.heading">Barandas e Inox</Text>
                <Text fontSize="2xs" color="text.muted">Cristal laminado y acerado</Text>
              </VStack>
            </HStack>
          </AuraSurface>

          <AuraSurface p="4" variant="glass">
            <HStack gap="3">
              <Box p="2" borderRadius="lg" bg="primary.500/10" color="primary.500">
                <Wrench size={20} />
              </Box>
              <VStack align="flex-start" gap="0">
                <Text fontSize="xs" fontWeight="800" color="text.heading">Medición en Obra</Text>
                <Text fontSize="2xs" color="text.muted">Técnicos calificados</Text>
              </VStack>
            </HStack>
          </AuraSurface>
        </SimpleGrid>

        {/* SECCIÓN 1: Formulario Principal de Cotización Elevado con Hallmark */}
        <Box mb={16}>
          <ContactFormSection 
            formData={formData}
            errors={errors}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
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
    </Box>
  );
}
