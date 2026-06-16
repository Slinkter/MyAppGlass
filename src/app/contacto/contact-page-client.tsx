"use client";

import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  SimpleGrid,
  HStack,
  Icon,
  Input,
  Textarea,
  Badge,
} from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { MessageSquareText, Mail, Phone, Search } from "lucide-react";
import GlassCard from "@/shared/components/common/GlassCard";
import { useColorModeValue } from "@/components/ui/color-mode-hooks";
import { useContactForm } from "@/features/contacto/hooks/useContactForm";
import { Checkbox } from "@/components/ui/checkbox";

export default function ContactPageClient() {
  const cardBg = useColorModeValue("whiteAlpha.800", "whiteAlpha.50");
  const { 
    formData, isSubmitting, handleChange, handleCheckedChange, handleSubmit,
    trackingId, isTracking, trackingResult, handleTrackingChange, handleTrackingSubmit
  } = useContactForm();

  return (
    <Box bg="bg.page" minH="100dvh" pt={{ base: 24, md: 32 }} pb={20} position="relative" overflow="hidden">
      <Box 
        position="absolute" 
        top="-10%" 
        right="-5%" 
        w="40%" 
        h="60%" 
        bgGradient="radial(circle, primary.900, transparent)" 
        opacity={0.05} 
        filter="blur(120px)" 
        zIndex={0}
      />

      <Container maxW="7xl" position="relative" zIndex={1}>
        <VStack gap={4} align="flex-start" mb={12}>
          <Text 
            fontSize="xs" 
            fontWeight="900" 
            color="primary.500" 
            letterSpacing="0.3em" 
            textTransform="uppercase"
          >
            Contacto Directo
          </Text>
          <Heading size={{ base: "2xl", md: "4xl" }} fontWeight="900" letterSpacing="tighter">
            Cotiza tu Proyecto <br />
            <Text as="span" color="text.accent">con Glass & Aluminum Company S.A.C.</Text>
          </Heading>
          <Text color="text.muted" fontSize="lg" maxW="2xl">
            Elige tu canal preferido para recibir asesoría técnica especializada en vidriería y aluminio.
          </Text>
        </VStack>

        <SimpleGrid columns={{ base: 1, lg: 2 }} gap="8">
          <VStack gap="6" align="stretch">
            <GlassCard p="8" bg="primary.900" color="white" border="none" boxShadow="2xl">
              <VStack align="flex-start" gap="6">
                <Box bg="whiteAlpha.200" p="2" borderRadius="2xl">
                  <MessageSquareText size={32} />
                </Box>
                <Box>
                  <Heading size="md" mb="2">Asesoría por WhatsApp</Heading>
                  <Text opacity={0.8} mb="6">Ideal para consultas rápidas, Envío de fotos de obra y presupuestos inmediatos.</Text>
                </Box>
                <Button 
                  as="a"
                  href="https://wa.me/51974278303?text=Hola, deseo cotizar un proyecto."
                  target="_blank"
                  bg="white" 
                  color="primary.900" 
                  w="full" 
                  size="xl" 
                  borderRadius="full"
                  fontWeight="900"
                  letterSpacing="0.1em"
                  _hover={{ transform: "translateY(-4px)", boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
                >
                  CONTACTAR AHORA
                </Button>
              </VStack>
            </GlassCard>

            <GlassCard p="6" bg={cardBg} border="1px solid" borderColor="text.accent">
              <VStack align="flex-start" gap="6">
                <HStack gap="2" color="text.accent">
                  <Search size={18} />
                  <Heading size="xs" textTransform="uppercase" letterSpacing="widest">Consultar Estado de Solicitud</Heading>
                </HStack>
                <Text fontSize="xs" color="text.muted">¿Ya realizaste una cotización o reclamo? Ingresa tu código aquí.</Text>
                
                <HStack w="full" as="form" onSubmit={handleTrackingSubmit}>
                  <Input 
                    variant="subtle" 
                    placeholder="resend-id-..." 
                    size="sm" 
                    value={trackingId}
                    onChange={handleTrackingChange}
                  />
                  <Button 
                    size="sm" 
                    variant="aura" 
                    type="submit" 
                    loading={isTracking}
                  >
                    BUSCAR
                  </Button>
                </HStack>

                {trackingResult && (
                  <Box w="full" p="2" bg="whiteAlpha.100" borderRadius="md" borderLeft="4px solid" borderColor="text.accent">
                    <VStack align="flex-start" gap={1}>
                      <Text fontSize="2xs" color="text.muted" textTransform="uppercase">{trackingResult.type}</Text>
                      <HStack justify="space-between" w="full">
                        <Text fontWeight="bold" fontSize="sm">{trackingResult.name}</Text>
                        <Badge colorScheme={trackingResult.status === "RECIBIDO" ? "blue" : "green"} variant="solid" fontSize="10px">
                          {trackingResult.status}
                        </Badge>
                      </HStack>
                      <Text fontSize="2xs" color="text.muted">
                        ID: {trackingResult.id.substring(0, 15)}...
                      </Text>
                      <Text fontSize="2xs" color="text.muted">
                        Fecha: {new Date(trackingResult.createdAt).toLocaleDateString()}
                      </Text>
                    </VStack>
                  </Box>
                )}
              </VStack>
            </GlassCard>

            <VStack gap="4" align="stretch">
              <Box p="6" borderRadius="2xl" border="1px solid" borderColor="border.glass" bg={cardBg}>
                <HStack gap="6">
                  <Box bg="surface.icon" p="2" borderRadius="full">
                    <Icon as={Phone} color="text.accent" />
                  </Box>
                  <VStack align="flex-start" gap={0}>
                    <Text fontSize="xs" fontWeight="black" color="text.muted" letterSpacing="widest" textTransform="uppercase">Atención Comercial</Text>
                    <Text fontSize="xl" fontWeight="900" color="text.heading">974 278 303</Text>
                  </VStack>
                </HStack>
              </Box>

              <Box p="6" borderRadius="2xl" border="1px solid" borderColor="border.glass" bg={cardBg}>
                <HStack gap="6" wrap={{ base: "wrap", sm: "nowrap" }}>
                  <Box bg="surface.icon" p="2" borderRadius="full">
                    <Icon as={Mail} color="text.accent" />
                  </Box>
                  <VStack align="flex-start" gap={0} overflow="hidden" w="full">
                    <Text fontSize="xs" fontWeight="black" color="text.muted" letterSpacing="widest" textTransform="uppercase">Email Técnico & Ventas</Text>
                    <Text 
                      fontSize={{ base: "md", sm: "lg" }} 
                      fontWeight="900" 
                      color="text.heading" 
                      truncate 
                      maxW="full"
                      _hover={{ color: "text.accent" }}
                      cursor="pointer"
                      title="Haz clic para copiar"
                      onClick={() => {
                        navigator.clipboard.writeText("acueva@gyacompany.com");
                        alert("Email copiado al portapapeles");
                      }}
                    >
                      acueva@gyacompany.com
                    </Text>
                  </VStack>
                </HStack>
              </Box>
            </VStack>
          </VStack>

          <GlassCard p="8" bg={cardBg}>
            <VStack align="flex-start" gap="8" as="form" onSubmit={handleSubmit}>
              <VStack align="flex-start" gap="2">
                <Heading size="md" color="text.heading">Formulario de Cotización</Heading>
                <Text fontSize="sm" color="text.muted">Completa los datos y adjunta tu requerimiento.</Text>
              </VStack>
              
              <VStack w="full" gap="6">
                <Box w="full">
                  <Text fontSize="xs" fontWeight="black" mb="2" ml={1} color="text.muted" letterSpacing="widest">NOMBRE COMPLETO</Text>
                  <Input 
                    variant="subtle" 
                    w="full" 
                    placeholder="Ej. Juan Pérez" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </Box>

                <Box w="full">
                  <Text fontSize="xs" fontWeight="black" mb="2" ml={1} color="text.muted" letterSpacing="widest">CORREO ELECTRÓNICO</Text>
                  <Input 
                    variant="subtle" 
                    w="full" 
                    placeholder="tu@email.com" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                  />
                </Box>

                <Box w="full">
                  <Text fontSize="xs" fontWeight="black" mb="2" ml={1} color="text.muted" letterSpacing="widest">DETALLES DEL PROYECTO</Text>
                  <Textarea 
                    variant="subtle" 
                    w="full" 
                    placeholder="Describe las medidas o el sistema que necesitas..." 
                    rows={4} 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                  />
                </Box>

                <Box w="full" pt={2}>
                  <Checkbox 
                    name="acceptedTerms"
                    checked={formData.acceptedTerms}
                    onCheckedChange={(details) => handleCheckedChange(!!details.checked)}
                  >
                    <Text fontSize="xs" color="text.muted" fontWeight="600">
                      He leído y acepto las <Text as="span" color="text.accent" cursor="pointer" textDecoration="underline">Políticas de Privacidad</Text> y el uso de mis datos para fines comerciales.
                    </Text>
                  </Checkbox>
                </Box>
              </VStack>

              <Button 
                type="submit"
                variant="aura" 
                size="xl" 
                w="full" 
                borderRadius="full"
                fontWeight="900"
                letterSpacing="widest"
                loading={isSubmitting}
                loadingText="ENVIANDO..."
              >
                ENVIAR SOLICITUD
              </Button>
              <Text fontSize="xs" color="text.muted" textAlign="center" w="full" fontWeight="500">
                Respuesta garantizada en menos de 24 horas hábiles.
              </Text>
            </VStack>
          </GlassCard>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
