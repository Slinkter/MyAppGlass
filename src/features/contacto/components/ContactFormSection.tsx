"use client";

import Link from "next/link";
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field } from "@/components/ui/field";
import { Send, Lock } from "lucide-react";
import { useColorModeValue } from "@/components/ui/color-mode-hooks";

/**
 * @file ContactFormSection.tsx
 * @description Formulario directo de cotización con validación inline usando Chakra UI v3 Field.
 * @module features/contacto/components
 */

interface ContactFormSectionProps {
  formData: {
    name: string;
    email: string;
    phone: string;
    message: string;
    acceptedTerms: boolean;
    middleName: string;
  };
  errors: {
    name?: string;
    email?: string;
    phone?: string;
    message?: string;
    acceptedTerms?: string;
  };
  isSubmitting: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleCheckedChange: (checked: boolean) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

/**
 * @component ContactFormSection
 * @description Renderiza el formulario unificado de cotización técnica en tarjeta de cristal.
 */
export function ContactFormSection({
  formData,
  errors,
  isSubmitting,
  handleChange,
  handleBlur,
  handleCheckedChange,
  handleSubmit,
}: ContactFormSectionProps) {
  const inputBg = useColorModeValue("rgba(240, 242, 245, 0.85)", "rgba(24, 24, 27, 0.75)");
  const inputBorderColor = useColorModeValue("rgba(0, 0, 0, 0.15)", "rgba(255, 255, 255, 0.18)");
  const inputHoverBorderColor = useColorModeValue("rgba(0, 0, 0, 0.3)", "rgba(255, 255, 255, 0.35)");
  return (
    <Box w="full">
      <VStack align="flex-start" gap="7" as="form" onSubmit={handleSubmit}>
        <VStack align="flex-start" gap="1">
          <HStack gap="2">
            <Box w="2" h="2" borderRadius="full" bg="text.accent" />
            <Text fontSize="xs" fontWeight="900" color="text.accent" letterSpacing="0.2em" textTransform="uppercase">
              Solicitud Directa
            </Text>
          </HStack>
          <Heading size="lg" color="text.heading" fontWeight="900" letterSpacing="tight">
            Formulario de Cotización
          </Heading>
          <Text fontSize="sm" color="text.muted">
            Ingresa tus datos y detallamos tu requerimiento en menos de 24 horas.
          </Text>
        </VStack>

        <VStack w="full" gap="5">
          <div style={{ display: 'none', position: 'absolute', left: '-9999px' }} aria-hidden="true">
            <input 
              type="text" 
              name="middleName" 
              tabIndex={-1} 
              autoComplete="off"
              value={formData.middleName}
              onChange={handleChange}
            />
          </div>

          {/* Campo Nombre usando Chakra UI Field */}
          <Field 
            label="NOMBRE COMPLETO" 
            invalid={!!errors?.name}
            errorText={errors?.name}
            required
            w="full"
          >
            <Input 
              variant="outline" 
              w="full" 
              placeholder="Ej. Juan Pérez" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              borderRadius="xl"
              size="lg"
              bg={inputBg}
              borderWidth="1px"
              borderColor={errors?.name ? "red.500" : inputBorderColor}
              _hover={{ borderColor: errors?.name ? "red.500" : inputHoverBorderColor }}
              _focus={{ 
                bg: useColorModeValue("white", "blackAlpha.800"),
                borderColor: errors?.name ? "red.500" : "primary.500",
                boxShadow: errors?.name ? "0 0 0 1px var(--chakra-colors-red-500)" : "0 0 0 2px var(--chakra-colors-primary-500)" 
              }}
            />
          </Field>

          {/* Campo Correo usando Chakra UI Field */}
          <Field 
            label="CORREO ELECTRÓNICO" 
            invalid={!!errors?.email}
            errorText={errors?.email}
            required
            w="full"
          >
            <Input 
              variant="outline" 
              w="full" 
              placeholder="tu@email.com" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              type="email"
              borderRadius="xl"
              size="lg"
              bg={inputBg}
              borderWidth="1px"
              borderColor={errors?.email ? "red.500" : inputBorderColor}
              _hover={{ borderColor: errors?.email ? "red.500" : inputHoverBorderColor }}
              _focus={{ 
                bg: useColorModeValue("white", "blackAlpha.800"),
                borderColor: errors?.email ? "red.500" : "primary.500",
                boxShadow: errors?.email ? "0 0 0 1px var(--chakra-colors-red-500)" : "0 0 0 2px var(--chakra-colors-primary-500)" 
              }}
            />
          </Field>

          {/* Campo Teléfono usando Chakra UI Field */}
          <Field 
            label="TELÉFONO DE CONTACTO (OPCIONAL)" 
            invalid={!!errors?.phone}
            errorText={errors?.phone}
            w="full"
          >
            <Input 
              variant="outline" 
              w="full" 
              placeholder="Ej. +51 987 654 321" 
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              type="tel"
              borderRadius="xl"
              size="lg"
              bg={inputBg}
              borderWidth="1px"
              borderColor={errors?.phone ? "red.500" : inputBorderColor}
              _hover={{ borderColor: errors?.phone ? "red.500" : inputHoverBorderColor }}
              _focus={{ 
                bg: useColorModeValue("white", "blackAlpha.800"),
                borderColor: errors?.phone ? "red.500" : "primary.500",
                boxShadow: errors?.phone ? "0 0 0 1px var(--chakra-colors-red-500)" : "0 0 0 2px var(--chakra-colors-primary-500)" 
              }}
            />
          </Field>

          {/* Campo Detalles usando Chakra UI Field */}
          <Field 
            label="DETALLES DEL PROYECTO" 
            invalid={!!errors?.message}
            errorText={errors?.message}
            required
            w="full"
          >
            <Textarea 
              variant="outline" 
              w="full" 
              placeholder="Describe las medidas aproximadas, ubicación de obra o tipo de sistema..." 
              rows={4} 
              name="message"
              value={formData.message}
              onChange={handleChange}
              onBlur={handleBlur}
              borderRadius="xl"
              bg={inputBg}
              borderWidth="1px"
              borderColor={errors?.message ? "red.500" : inputBorderColor}
              _hover={{ borderColor: errors?.message ? "red.500" : inputHoverBorderColor }}
              _focus={{ 
                bg: useColorModeValue("white", "blackAlpha.800"),
                borderColor: errors?.message ? "red.500" : "primary.500",
                boxShadow: errors?.message ? "0 0 0 1px var(--chakra-colors-red-500)" : "0 0 0 2px var(--chakra-colors-primary-500)" 
              }}
            />
          </Field>

          {/* Checkbox Términos usando Chakra UI Field */}
          <Field 
            invalid={!!errors?.acceptedTerms}
            errorText={errors?.acceptedTerms}
            w="full"
            pt={1}
          >
            <Checkbox 
              name="acceptedTerms"
              checked={formData.acceptedTerms}
              onCheckedChange={(details) => handleCheckedChange(!!details.checked)}
            >
              <Text fontSize="xs" color="text.muted" fontWeight="600">
                He leído y acepto las{" "}
                <Text as="span" color="text.accent" textDecoration="underline">
                  <Link href="/politicas-empresa" target="_blank" rel="noopener noreferrer">
                    Políticas de Privacidad (Ley N° 29733)
                  </Link>
                </Text>{" "}
                y el tratamiento de mis datos para la cotización solicitada.
              </Text>
            </Checkbox>
          </Field>
        </VStack>

        <VStack w="full" gap="3" pt={2}>
          <Button 
            type="submit"
            variant="aura" 
            size="xl" 
            w="full" 
            borderRadius="full"
            fontWeight="900"
            letterSpacing="widest"
            loading={isSubmitting}
            loadingText="ENVIANDO SOLICITUD..."
            boxShadow="0 8px 24px rgba(204, 2, 2, 0.35)"
            _hover={{ transform: "translateY(-2px)", boxShadow: "0 12px 28px rgba(204, 2, 2, 0.45)" }}
            transition="all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
          >
            ENVIAR SOLICITUD <Send size={18} style={{ marginLeft: '8px' }} />
          </Button>
          <HStack gap="1" color="text.muted" fontSize="2xs" justify="center">
            <Lock size={12} />
            <Text fontWeight="600">Tus datos están protegidos. Respuesta en menos de 24 horas hábiles.</Text>
          </HStack>
        </VStack>
      </VStack>
    </Box>
  );
}
