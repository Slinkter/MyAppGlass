"use client";

import {
  Box,
  Heading,
  Text,
  VStack,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import GlassCard from "@/shared/components/common/GlassCard";
import { useColorModeValue } from "@/components/ui/color-mode-hooks";

interface ContactFormSectionProps {
  formData: {
    name: string;
    email: string;
    message: string;
    acceptedTerms: boolean;
    hp_confirm: string;
  };
  isSubmitting: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleCheckedChange: (checked: boolean) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export function ContactFormSection({
  formData,
  isSubmitting,
  handleChange,
  handleCheckedChange,
  handleSubmit,
}: ContactFormSectionProps) {
  const cardBg = useColorModeValue("whiteAlpha.800", "whiteAlpha.50");

  return (
    <GlassCard p={{ base: "6", md: "8" }} bg={cardBg}>
      <VStack align="flex-start" gap="8" as="form" onSubmit={handleSubmit}>
        <VStack align="flex-start" gap="2">
          <Heading size="md" color="text.heading">
            Formulario de Cotización
          </Heading>
          <Text fontSize="sm" color="text.muted">
            Completa los datos y adjunta tu requerimiento.
          </Text>
        </VStack>
        
        <VStack w="full" gap="6">
          <div style={{ display: 'none', position: 'absolute', left: '-9999px' }} aria-hidden="true">
            <input 
              type="text" 
              name="hp_confirm" 
              tabIndex={-1} 
              autoComplete="off"
              value={formData.hp_confirm}
              onChange={handleChange}
            />
          </div>

          <Box w="full">
            <Text fontSize="xs" fontWeight="black" mb="2" ml={1} color="text.muted" letterSpacing="widest">
              NOMBRE COMPLETO
            </Text>
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
            <Text fontSize="xs" fontWeight="black" mb="2" ml={1} color="text.muted" letterSpacing="widest">
              CORREO ELECTRÓNICO
            </Text>
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
            <Text fontSize="xs" fontWeight="black" mb="2" ml={1} color="text.muted" letterSpacing="widest">
              DETALLES DEL PROYECTO
            </Text>
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
  );
}
