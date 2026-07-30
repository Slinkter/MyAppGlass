"use client";

import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Input,
  Textarea,
  SimpleGrid,
} from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import AuraSurface from "@/shared/components/aura/AuraSurface";
import { ArrowRight, ArrowLeft, CheckCircle2, Building2, Shield, Wrench, Sparkles } from "lucide-react";

interface ContactFormSectionProps {
  step: number;
  nextStep: () => void;
  prevStep: () => void;
  formData: {
    name: string;
    email: string;
    phone: string;
    projectType: string;
    message: string;
    acceptedTerms: boolean;
    hp_confirm: string;
  };
  errors: {
    name?: string;
    email?: string;
    phone?: string;
    projectType?: string;
    message?: string;
    acceptedTerms?: string;
  };
  isSubmitting: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  setProjectType: (type: string) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleCheckedChange: (checked: boolean) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const PROJECT_TYPES = [
  { id: "Vidrio Templado", label: "Vidrio Templado", icon: Shield, desc: "Mamparas, fachadas y divisiones" },
  { id: "Aluminio Arquitectónico", label: "Estructuras Aluminio", icon: Building2, desc: "Ventanas y perfiles serie 20/25/80" },
  { id: "Barandas y Fachadas", label: "Barandas y Muros Cortina", icon: Sparkles, desc: "Cristal laminado e inox" },
  { id: "Mantenimiento / Otro", label: "Servicio / Mantenimiento", icon: Wrench, desc: "Reparación o diseño a medida" },
];

export function ContactFormSection({
  step,
  nextStep,
  prevStep,
  formData,
  errors,
  isSubmitting,
  handleChange,
  setProjectType,
  handleBlur,
  handleCheckedChange,
  handleSubmit,
}: ContactFormSectionProps) {
  return (
    <AuraSurface p={{ base: "6", md: "8" }} variant="glass" boxShadow="2xl">
      <VStack align="flex-start" gap="6" as="form" onSubmit={handleSubmit}>
        {/* Step Header Indicator */}
        <VStack align="flex-start" gap="2" w="full">
          <HStack justify="space-between" w="full">
            <HStack gap="2">
              <Box 
                bg={step >= 1 ? "primary.500" : "surface.icon"} 
                color="white" 
                w="6" 
                h="6" 
                borderRadius="full" 
                display="flex" 
                alignItems="center" 
                justifyContent="center"
                fontSize="xs"
                fontWeight="900"
              >
                1
              </Box>
              <Text fontSize="xs" fontWeight="800" color={step === 1 ? "text.heading" : "text.muted"}>
                Datos de Contacto
              </Text>
              <Text fontSize="xs" color="text.muted">•</Text>
              <Box 
                bg={step >= 2 ? "primary.500" : "surface.icon"} 
                color={step >= 2 ? "white" : "text.muted"} 
                w="6" 
                h="6" 
                borderRadius="full" 
                display="flex" 
                alignItems="center" 
                justifyContent="center"
                fontSize="xs"
                fontWeight="900"
              >
                2
              </Box>
              <Text fontSize="xs" fontWeight="800" color={step === 2 ? "text.heading" : "text.muted"}>
                Detalles del Proyecto
              </Text>
            </HStack>
            <Text fontSize="xs" color="text.muted" fontWeight="700">
              Paso {step} de 2
            </Text>
          </HStack>

          {/* Progress bar line */}
          <Box w="full" bg="whiteAlpha.200" h="1.5" borderRadius="full" overflow="hidden">
            <Box 
              bg="primary.500" 
              h="full" 
              w={step === 1 ? "50%" : "100%"} 
              transition="width 0.3s ease" 
            />
          </Box>

          <Heading size="md" color="text.heading" fontWeight="800" mt={2}>
            {step === 1 ? "1. Tus Datos Principales" : "2. ¿Qué proyecto deseas cotizar?"}
          </Heading>
          <Text fontSize="xs" color="text.muted">
            {step === 1 
              ? "Para enviarte la cotización detallada y contactarte directamente." 
              : "Selecciona la categoría y cuéntanos las medidas o requerimiento."}
          </Text>
        </VStack>

        <VStack w="full" gap="5">
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

          {/* STEP 1: Personal / Contact Data */}
          {step === 1 && (
            <VStack w="full" gap="4">
              <Box w="full">
                <Text fontSize="xs" fontWeight="black" mb="1.5" ml={1} color="text.muted" letterSpacing="widest">
                  NOMBRE Y APELLIDO *
                </Text>
                <Input 
                  variant="subtle" 
                  w="full" 
                  placeholder="Ej. Juan Pérez" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  borderRadius="xl"
                  borderColor={errors.name ? "red.500" : undefined}
                  _focus={{ borderColor: errors.name ? "red.500" : "primary.500" }}
                />
                {errors.name && (
                  <Text fontSize="xs" color="red.500" mt={1} ml={1} fontWeight="600">
                    {errors.name}
                  </Text>
                )}
              </Box>

              <Box w="full">
                <Text fontSize="xs" fontWeight="black" mb="1.5" ml={1} color="text.muted" letterSpacing="widest">
                  CORREO ELECTRÓNICO *
                </Text>
                <Input 
                  variant="subtle" 
                  w="full" 
                  placeholder="tu@email.com" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="email"
                  borderRadius="xl"
                  borderColor={errors.email ? "red.500" : undefined}
                  _focus={{ borderColor: errors.email ? "red.500" : "primary.500" }}
                />
                {errors.email && (
                  <Text fontSize="xs" color="red.500" mt={1} ml={1} fontWeight="600">
                    {errors.email}
                  </Text>
                )}
              </Box>

              <Box w="full">
                <Text fontSize="xs" fontWeight="black" mb="1.5" ml={1} color="text.muted" letterSpacing="widest">
                  TELÉFONO / WHATSAPP (OPCIONAL)
                </Text>
                <Input 
                  variant="subtle" 
                  w="full" 
                  placeholder="Ej. 987 654 321" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="tel"
                  borderRadius="xl"
                  borderColor={errors.phone ? "red.500" : undefined}
                  _focus={{ borderColor: errors.phone ? "red.500" : "primary.500" }}
                />
                {errors.phone && (
                  <Text fontSize="xs" color="red.500" mt={1} ml={1} fontWeight="600">
                    {errors.phone}
                  </Text>
                )}
              </Box>

              <Button 
                type="button"
                onClick={nextStep}
                variant="aura" 
                size="xl" 
                w="full" 
                borderRadius="full"
                fontWeight="900"
                letterSpacing="widest"
                mt={2}
              >
                CONTINUAR <ArrowRight size={18} style={{ marginLeft: '8px' }} />
              </Button>
            </VStack>
          )}

          {/* STEP 2: Project Specifications */}
          {step === 2 && (
            <VStack w="full" gap="5">
              {/* Category Cards */}
              <Box w="full">
                <Text fontSize="xs" fontWeight="black" mb="2" ml={1} color="text.muted" letterSpacing="widest">
                  TIPO DE ESTRUCTURA / VIDRIO
                </Text>
                <SimpleGrid columns={{ base: 1, sm: 2 }} gap="3">
                  {PROJECT_TYPES.map((type) => {
                    const IconComp = type.icon;
                    const isSelected = formData.projectType === type.id;
                    return (
                      <Box
                        key={type.id}
                        onClick={() => setProjectType(type.id)}
                        p="3.5"
                        borderRadius="xl"
                        border="2px solid"
                        borderColor={isSelected ? "primary.500" : "border.glass"}
                        bg={isSelected ? "whiteAlpha.100" : "transparent"}
                        cursor="pointer"
                        transition="all 0.2s ease"
                        _hover={{ borderColor: isSelected ? "primary.500" : "text.accent" }}
                      >
                        <HStack gap="3" align="flex-start">
                          <Box 
                            p="2" 
                            borderRadius="lg" 
                            bg={isSelected ? "primary.500" : "surface.icon"} 
                            color={isSelected ? "white" : "text.accent"}
                          >
                            <IconComp size={18} />
                          </Box>
                          <VStack align="flex-start" gap="0">
                            <Text fontSize="xs" fontWeight="bold" color="text.heading">
                              {type.label}
                            </Text>
                            <Text fontSize="2xs" color="text.muted">
                              {type.desc}
                            </Text>
                          </VStack>
                        </HStack>
                      </Box>
                    );
                  })}
                </SimpleGrid>
              </Box>

              <Box w="full">
                <Text fontSize="xs" fontWeight="black" mb="1.5" ml={1} color="text.muted" letterSpacing="widest">
                  DESCRIPCIÓN O MEDIDAS *
                </Text>
                <Textarea 
                  variant="subtle" 
                  w="full" 
                  placeholder="Ej. Requiero mampara de vidrio templado de 10mm para oficina (medidas aprox: 2.40m x 3.00m)..." 
                  rows={4} 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  borderRadius="xl"
                  borderColor={errors.message ? "red.500" : undefined}
                  _focus={{ borderColor: errors.message ? "red.500" : "primary.500" }}
                />
                {errors.message && (
                  <Text fontSize="xs" color="red.500" mt={1} ml={1} fontWeight="600">
                    {errors.message}
                  </Text>
                )}
              </Box>

              <Box w="full" pt={1}>
                <Checkbox 
                  name="acceptedTerms"
                  checked={formData.acceptedTerms}
                  onCheckedChange={(details) => handleCheckedChange(!!details.checked)}
                >
                  <Text fontSize="xs" color="text.muted" fontWeight="600">
                    Acepto las <Text as="span" color="text.accent" cursor="pointer" textDecoration="underline">Políticas de Privacidad</Text> y el uso de mis datos para la cotización.
                  </Text>
                </Checkbox>
                {errors.acceptedTerms && (
                  <Text fontSize="xs" color="red.500" mt={1} ml={1} fontWeight="600">
                    {errors.acceptedTerms}
                  </Text>
                )}
              </Box>

              <HStack w="full" gap="3" pt={2}>
                <Button 
                  type="button"
                  onClick={prevStep}
                  variant="outline" 
                  size="xl" 
                  w="35%" 
                  borderRadius="full"
                  fontWeight="800"
                >
                  <ArrowLeft size={16} style={{ marginRight: '6px' }} /> ATRÁS
                </Button>

                <Button 
                  type="submit"
                  variant="aura" 
                  size="xl" 
                  w="65%" 
                  borderRadius="full"
                  fontWeight="900"
                  letterSpacing="widest"
                  loading={isSubmitting}
                  loadingText="ENVIANDO..."
                >
                  ENVIAR SOLICITUD <CheckCircle2 size={18} style={{ marginLeft: '8px' }} />
                </Button>
              </HStack>
            </VStack>
          )}
        </VStack>

        <Text fontSize="xs" color="text.muted" textAlign="center" w="full" fontWeight="500">
          🔒 Tus datos están protegidos. Respuesta en menos de 24 horas hábiles.
        </Text>
      </VStack>
    </AuraSurface>
  );
}
