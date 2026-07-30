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
import { Button } from "@/components/ui/button";
import { Clock, Search, MessageSquareText, ShieldCheck } from "lucide-react";
import { useContactForm } from "@/features/contacto/hooks/useContactForm";
import { WhatsAppSection } from "@/features/contacto/components/WhatsAppSection";
import { ContactInfoCards } from "@/features/contacto/components/ContactInfoCards";
import { ContactFormSection } from "@/features/contacto/components/ContactFormSection";
import { TrackingContent } from "@/features/contacto/components/TrackingContent";
import {
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogCloseTrigger,
  DialogTrigger,
} from "@/components/ui/dialog";
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
        {/* Top Bar / Header Section */}
        <VStack gap={4} align="flex-start" mb={10}>
          <HStack justify="space-between" w="full" wrap="wrap" gap="4">
            <HStack gap="2" wrap="wrap">
              <Badge colorPalette="red" variant="subtle" px="3" py="1" borderRadius="full" fontSize="xs" fontWeight="800" textTransform="uppercase" letterSpacing="0.15em">
                Cotización & Asesoría
              </Badge>
              <HStack gap="1" color="text.muted" fontSize="xs">
                <Clock size={14} />
                <Text fontWeight="600">Atención Lu - Sáb: 8:00 AM - 6:00 PM</Text>
              </HStack>
            </HStack>

            {/* Modal Trigger for Consultar Estado */}
            <DialogRoot placement="center">
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" borderRadius="full" px="5" fontWeight="700">
                  <Search size={15} style={{ marginRight: '6px' }} /> Consultar Estado de Solicitud
                </Button>
              </DialogTrigger>
              <DialogContent borderRadius="2xl" p="4">
                <DialogHeader>
                  <DialogTitle fontWeight="800" fontSize="lg" display="flex" alignItems="center" gap="2">
                    <Search size={20} color="var(--chakra-colors-text-accent)" /> Consultar Estado de Cotización o Reclamo
                  </DialogTitle>
                </DialogHeader>
                <DialogBody pb="4">
                  <TrackingContent 
                    trackingId={trackingId}
                    isTracking={isTracking}
                    trackingResult={trackingResult}
                    handleTrackingChange={handleTrackingChange}
                    handleTrackingSubmit={handleTrackingSubmit}
                  />
                </DialogBody>
                <DialogCloseTrigger />
              </DialogContent>
            </DialogRoot>
          </HStack>

          <Heading as="h1" size={{ base: "2xl", md: "4xl" }} fontWeight="900" letterSpacing="tighter">
            Cotiza tu Proyecto <br />
            <Text as="span" color="text.accent">con Glass & Aluminum Company S.A.C.</Text>
          </Heading>
          <Text color="text.muted" fontSize="lg" maxW="2xl">
            Asesoría técnica en vidriería templada, mamparas y carpintería de aluminio. Elige la vía directa o completa el formulario guiado.
          </Text>
        </VStack>

        <SimpleGrid columns={{ base: 1, lg: 2 }} gap="8" alignItems="start">
          {/* Left Column: Direct Communication Channels */}
          <VStack gap="6" align="stretch">
            {/* Direct WhatsApp Channel */}
            <WhatsAppSection />

            {/* Direct Phone & Email Cards */}
            <ContactInfoCards />

            {/* Guarantee / Trust Badge */}
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

          {/* Right Column: Multi-Step Interactive Form */}
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
        </SimpleGrid>
      </Container>
    </Box>
  );
}
