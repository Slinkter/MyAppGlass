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
import { Field } from "@/components/ui/field";
import AuraSurface from "@/shared/components/aura/AuraSurface";
import { Shield, Building2, Sparkles, Wrench, Send, Lock } from "lucide-react";

interface ContactFormSectionProps {
  formData: {
    name: string;
    email: string;
    message: string;
    acceptedTerms: boolean;
    hp_confirm: string;
  };
  errors?: {
    name?: string;
    email?: string;
    message?: string;
    acceptedTerms?: string;
  };
  isSubmitting: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleCheckedChange: (checked: boolean) => void;
  handleSubmit: (e: React.FormEvent) => void;
  selectedCategory?: string;
  setSelectedCategory?: (cat: string) => void;
}

const CATEGORIES = [
  { id: "Vidrio Templado", label: "Vidrio Templado", icon: Shield, desc: "Mamparas y divisiones" },
  { id: "Aluminio Arquitectónico", label: "Carpintería Aluminio", icon: Building2, desc: "Ventanas y perfiles" },
  { id: "Barandas y Fachadas", label: "Barandas y Muros Cortina", icon: Sparkles, desc: "Laminados e inox" },
  { id: "Mantenimiento / Otro", label: "Mantenimiento / Asesoría", icon: Wrench, desc: "Reparaciones o medida" },
];

export function ContactFormSection({
  formData,
  errors,
  isSubmitting,
  handleChange,
  handleBlur,
  handleCheckedChange,
  handleSubmit,
  selectedCategory,
  setSelectedCategory,
}: ContactFormSectionProps) {
  return (
    <AuraSurface p={{ base: "6", md: "8" }} variant="glass" boxShadow="0 20px 40px rgba(0,0,0,0.12)">
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
              name="hp_confirm" 
              tabIndex={-1} 
              autoComplete="off"
              value={formData.hp_confirm}
              onChange={handleChange}
            />
          </div>

          {/* Categorías Rápidas Interactivas */}
          {setSelectedCategory && (
            <Field label="TIPO DE PROYECTO (OPCIONAL)" optionalText="">
              <SimpleGrid columns={{ base: 1, sm: 2 }} gap="2.5" w="full" mt={1}>
                {CATEGORIES.map((cat) => {
                  const IconComp = cat.icon;
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <Box
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id === selectedCategory ? "" : cat.id)}
                      p="3"
                      borderRadius="xl"
                      border="1.5px solid"
                      borderColor={isSelected ? "primary.500" : "border.glass"}
                      bg={isSelected ? "primary.500/10" : "whiteAlpha.50"}
                      cursor="pointer"
                      transition="all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
                      _hover={{ borderColor: isSelected ? "primary.500" : "text.accent", transform: "translateY(-1px)" }}
                    >
                      <HStack gap="2.5">
                        <Box 
                          p="1.5" 
                          borderRadius="lg" 
                          bg={isSelected ? "primary.500" : "surface.icon"} 
                          color={isSelected ? "white" : "text.accent"}
                        >
                          <IconComp size={16} />
                        </Box>
                        <VStack align="flex-start" gap="0">
                          <Text fontSize="xs" fontWeight="bold" color={isSelected ? "primary.500" : "text.heading"}>
                            {cat.label}
                          </Text>
                          <Text fontSize="2xs" color="text.muted">
                            {cat.desc}
                          </Text>
                        </VStack>
                      </HStack>
                    </Box>
                  );
                })}
              </SimpleGrid>
            </Field>
          )}

          {/* Campo Nombre usando Chakra UI Field */}
          <Field 
            label="NOMBRE COMPLETO" 
            invalid={!!errors?.name}
            errorText={errors?.name}
            required
            w="full"
          >
            <Input 
              variant="subtle" 
              w="full" 
              placeholder="Ej. Juan Pérez" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              borderRadius="xl"
              size="lg"
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
              variant="subtle" 
              w="full" 
              placeholder="tu@email.com" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              type="email"
              borderRadius="xl"
              size="lg"
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
              variant="subtle" 
              w="full" 
              placeholder="Describe las medidas aproximadas, ubicación de obra o tipo de sistema..." 
              rows={4} 
              name="message"
              value={formData.message}
              onChange={handleChange}
              onBlur={handleBlur}
              borderRadius="xl"
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
                He leído y acepto las <Text as="span" color="text.accent" cursor="pointer" textDecoration="underline">Políticas de Privacidad</Text> y el uso de mis datos para fines comerciales.
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
    </AuraSurface>
  );
}
