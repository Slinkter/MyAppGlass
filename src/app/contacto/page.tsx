"use client";

/**
 * @file page.tsx
 * @description Immersive contact and quotation page for GYA Glass & Aluminum.
 * @module contacto
 */

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
} from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { MessageSquareText, Mail, Phone } from "lucide-react";
import GlassCard from "@/shared/components/common/GlassCard";
import { useColorModeValue } from "@/components/ui/color-mode-hooks";

/**
 * @component ContactPage
 * @description Centralized quotation and contact hub.
 */
export default function ContactPage() {
  const cardBg = useColorModeValue("whiteAlpha.800", "whiteAlpha.50");

  return (
    <Box bg="bg.page" minH="100dvh" pt={{ base: 24, md: 32 }} pb={20} position="relative" overflow="hidden">
      {/* Decorative Background Element */}
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
            <Text as="span" color="text.accent">con GYA Company.</Text>
          </Heading>
          <Text color="text.muted" fontSize="lg" maxW="2xl">
            Elige tu canal preferido para recibir asesoría técnica especializada en vidriería y aluminio.
          </Text>
        </VStack>

        <SimpleGrid columns={{ base: 1, lg: 2 }} gap="phi_lg">
          {/* LEFT: WhatsApp & Direct Info (The "Quick" way) */}
          <VStack gap="phi_md" align="stretch">
            <GlassCard p="phi_lg" bg="primary.900" color="white" border="none" boxShadow="2xl">
              <VStack align="flex-start" gap="phi_md">
                <Box bg="whiteAlpha.200" p="phi_xs" borderRadius="2xl">
                  <MessageSquareText size={32} />
                </Box>
                <Box>
                  <Heading size="md" mb="phi_xs">Asesoría por WhatsApp</Heading>
                  <Text opacity={0.8} mb="phi_md">Ideal para consultas rápidas, envío de fotos de obra y presupuestos inmediatos.</Text>
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

            {/* Optimized Contact Info Grid */}
            <VStack gap="phi_sm" align="stretch">
              <Box p="phi_md" borderRadius="2xl" border="1px solid" borderColor="border.glass" bg={cardBg}>
                <HStack gap="phi_md">
                  <Box bg="surface.icon" p="phi_xs" borderRadius="full">
                    <Icon as={Phone} color="text.accent" />
                  </Box>
                  <VStack align="flex-start" gap={0}>
                    <Text fontSize="xs" fontWeight="black" color="text.muted" letterSpacing="widest" textTransform="uppercase">Atención Comercial</Text>
                    <Text fontSize="xl" fontWeight="900" color="text.heading">974 278 303</Text>
                  </VStack>
                </HStack>
              </Box>

              <Box p="phi_md" borderRadius="2xl" border="1px solid" borderColor="border.glass" bg={cardBg}>
                <HStack gap="phi_md" wrap={{ base: "wrap", sm: "nowrap" }}>
                  <Box bg="surface.icon" p="phi_xs" borderRadius="full">
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
                        navigator.clipboard.writeText("gyacompany.ventas@gmail.com");
                        alert("Email copiado al portapapeles");
                      }}
                    >
                      gyacompany.ventas@gmail.com
                    </Text>
                  </VStack>
                </HStack>
              </Box>
            </VStack>
          </VStack>

          {/* RIGHT: Email Form (The "Formal" way) */}
          <GlassCard p="phi_lg" bg={cardBg}>
            <VStack align="flex-start" gap="phi_lg" as="form">
              <VStack align="flex-start" gap="phi_xs">
                <Heading size="md" color="text.heading">Formulario de Cotización</Heading>
                <Text fontSize="sm" color="text.muted">Completa los datos y adjunta tu requerimiento.</Text>
              </VStack>
              
              <VStack w="full" gap="phi_md">
                <Box w="full">
                  <Text fontSize="xs" fontWeight="black" mb="phi_xs" ml={1} color="text.muted" letterSpacing="widest">NOMBRE COMPLETO</Text>
                  <Input variant="subtle" w="full" placeholder="Ej. Juan Pérez" />
                </Box>

                <Box w="full">
                  <Text fontSize="xs" fontWeight="black" mb="phi_xs" ml={1} color="text.muted" letterSpacing="widest">CORREO ELECTRÓNICO</Text>
                  <Input variant="subtle" w="full" placeholder="tu@email.com" />
                </Box>

                <Box w="full">
                  <Text fontSize="xs" fontWeight="black" mb="phi_xs" ml={1} color="text.muted" letterSpacing="widest">DETALLES DEL PROYECTO</Text>
                  <Textarea variant="subtle" w="full" placeholder="Describe las medidas o el sistema que necesitas..." rows={4} />
                </Box>
              </VStack>

              <Button 
                variant="aura" 
                size="xl" 
                w="full" 
                borderRadius="full"
                fontWeight="900"
                letterSpacing="widest"
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
