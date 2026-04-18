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
  Button,
  HStack,
  Icon,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { MessageSquareText, Mail, Phone, Send } from "lucide-react";
import GlassCard from "@/shared/components/common/GlassCard";
import { useColorModeValue } from "@/components/ui/color-mode-hooks";

/**
 * @component ContactPage
 * @description Centralized quotation and contact hub.
 */
export default function ContactPage() {
  const accentColor = useColorModeValue("primary.900", "primary.300");
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

        <SimpleGrid columns={{ base: 1, lg: 2 }} gap={10}>
          {/* LEFT: WhatsApp & Direct Info (The "Quick" way) */}
          <VStack gap={6} align="stretch">
            <GlassCard p={10} bg="primary.900" color="white" border="none" boxShadow="2xl">
              <VStack align="flex-start" gap={6}>
                <Box bg="whiteAlpha.200" p={4} borderRadius="2xl">
                  <MessageSquareText size={32} />
                </Box>
                <Box>
                  <Heading size="md" mb={2}>Asesoría por WhatsApp</Heading>
                  <Text opacity={0.8} mb={8}>Ideal para consultas rápidas, envío de fotos de obra y presupuestos inmediatos.</Text>
                </Box>
                <Button 
                  as="a"
                  // @ts-expect-error - Chakra v3 Button as link typing
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
                  whileTap={{ scale: 0.98 }}
                >
                  CONTACTAR AHORA
                </Button>
              </VStack>
            </GlassCard>

            <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
              <Box p={6} borderRadius="2xl" border="1px solid" borderColor="border.glass" bg={cardBg}>
                <HStack gap={4}>
                  <Icon as={Phone} color={accentColor} />
                  <VStack align="flex-start" gap={0}>
                    <Text fontSize="xs" fontWeight="bold" opacity={0.6}>Teléfono</Text>
                    <Text fontWeight="bold">974 278 303</Text>
                  </VStack>
                </HStack>
              </Box>
              <Box p={6} borderRadius="2xl" border="1px solid" borderColor="border.glass" bg={cardBg}>
                <HStack gap={4}>
                  <Icon as={Mail} color={accentColor} />
                  <VStack align="flex-start" gap={0}>
                    <Text fontSize="xs" fontWeight="bold" opacity={0.6}>Email Técnico</Text>
                    <Text fontWeight="bold">gyacompany.ventas@gmail.com</Text>
                  </VStack>
                </HStack>
              </Box>
            </SimpleGrid>
          </VStack>

          {/* RIGHT: Email Form (The "Formal" way) */}
          <GlassCard p={10} bg={cardBg}>
            <VStack align="flex-start" gap={8} as="form">
              <Heading size="md">Formulario de Cotización</Heading>
              
              <VStack w="full" gap={6}>
                {/* Inputs mock - Integration with existing InputRecipe */}
                <Box w="full">
                  <Text fontSize="xs" fontWeight="bold" mb={2} ml={1}>NOMBRE COMPLETO</Text>
                  <Input w="full" bg="bg.page" p={4} borderRadius="xl" border="1px solid" borderColor="border.glass" placeholder="Ej. Juan Pérez" />
                </Box>

                <Box w="full">
                  <Text fontSize="xs" fontWeight="bold" mb={2} ml={1}>CORREO ELECTRÓNICO</Text>
                  <Input w="full" bg="bg.page" p={4} borderRadius="xl" border="1px solid" borderColor="border.glass" placeholder="tu@email.com" />
                </Box>

                <Box w="full">
                  <Text fontSize="xs" fontWeight="bold" mb={2} ml={1}>MENSAJE / DETALLES DEL PROYECTO</Text>
                  <Textarea w="full" bg="bg.page" p={4} borderRadius="xl" border="1px solid" borderColor="border.glass" placeholder="Describe las medidas o el sistema que necesitas..." rows={4} />
                </Box>
              </VStack>

              <Button 
                // @ts-expect-error - Chakra custom variant typing
                variant="aura" 
                size="xl" 
                w="full" 
                borderRadius="full"
                rightIcon={<Send size={18} />}
              >
                ENVIAR SOLICITUD
              </Button>
              <Text fontSize="xs" color="text.muted" textAlign="center" w="full">
                Te responderemos en un plazo máximo de 24 horas hábiles.
              </Text>
            </VStack>
          </GlassCard>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
