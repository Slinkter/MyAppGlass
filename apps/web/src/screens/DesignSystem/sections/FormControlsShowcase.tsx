"use client";

import React, { useState } from "react";
import {
  Box,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Button,
  Input,
  IconButton,
  Separator,
  Card,
} from "@chakra-ui/react";
import { ArrowRight, Eye, Sliders, Copy } from "lucide-react";
import { Field } from "@/components/ui/field";
import { NativeSelectRoot, NativeSelectField } from "@/components/ui/native-select";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert } from "@/components/ui/alert";

export const FormControlsShowcase: React.FC = () => {
  const [email, setEmail] = useState("");
  const [systemChoice, setSystemChoice] = useState("nova");
  const [isTempered, setIsTempered] = useState(true);

  return (
    <VStack gap="8" align="stretch">
      {/* 1. Botones del Sistema Aura */}
      <Card.Root bg="bg.surface" borderColor="border.default" p="6" borderRadius="card">
        <Card.Header pb="4">
          <Card.Title fontSize="xl">Botones & Acciones Oficiales</Card.Title>
          <Card.Description>
            Botones con tokens semánticos nativos de Chakra UI v3.
          </Card.Description>
        </Card.Header>
        <Card.Body>
          <VStack gap="6" align="stretch">
            <Box>
              <Text fontWeight="semibold" mb="3" color="text.muted" fontSize="sm">
                BOTONES PRINCIPALES (BLUE / BRAND SOLID)
              </Text>
              <HStack gap="4" wrap="wrap">
                <Button colorPalette="blue" size="sm">Brand Small</Button>
                <Button colorPalette="blue" size="md">
                  Brand Medium <ArrowRight size={16} style={{ flexShrink: 0 }} />
                </Button>
                <Button colorPalette="blue" size="lg">Brand Large</Button>
              </HStack>
            </Box>

            <Separator borderColor="border.subtle" />

            <Box>
              <Text fontWeight="semibold" mb="3" color="text.muted" fontSize="sm">
                VARIANTES SEMÁNTICAS
              </Text>
              <HStack gap="4" wrap="wrap">
                <Button variant="outline" borderColor="border.default" size="md">Outline</Button>
                <Button variant="ghost" size="md">Ghost Button</Button>
                <Button variant="subtle" size="md">Subtle Button</Button>
                <Button bg="brand.whatsapp" color="white" _hover={{ bg: "brand.whatsappHover" }} borderRadius="full" px="6">
                  WhatsApp Contacto
                </Button>
                <Button bg="brand.red" color="white" _hover={{ bg: "brand.redHover" }} borderRadius="full" px="6">
                  Red Brand GYA
                </Button>
              </HStack>
            </Box>

            <Separator borderColor="border.subtle" />

            <Box>
              <Text fontWeight="semibold" mb="3" color="text.muted" fontSize="sm">
                BOTONES DE ICONO
              </Text>
              <HStack gap="4">
                <IconButton aria-label="Ver" variant="subtle" size="sm">
                  <Eye size={16} style={{ flexShrink: 0 }} />
                </IconButton>
                <IconButton aria-label="Ajustes" variant="outline" borderColor="border.default" size="md">
                  <Sliders size={18} style={{ flexShrink: 0 }} />
                </IconButton>
                <IconButton aria-label="Copiar" colorPalette="blue" size="lg">
                  <Copy size={20} style={{ flexShrink: 0 }} />
                </IconButton>
              </HStack>
            </Box>
          </VStack>
        </Card.Body>
      </Card.Root>

      {/* 2. Snippets Oficiales: Field, Select, Checkbox */}
      <SimpleGrid columns={{ base: 1, md: 2 }} gap="6">
        <Card.Root bg="bg.surface" borderColor="border.default" p="6" borderRadius="card">
          <Card.Header pb="4">
            <Card.Title fontSize="xl">Formularios Estructurados (Chakra UI v3 Snippets)</Card.Title>
            <Card.Description>
              Campos enriquecidos con labels, ayuda y selectores nativos.
            </Card.Description>
          </Card.Header>
          <Card.Body>
            <VStack gap="5" align="stretch">
              <Field
                label="Correo Electrónico de Contacto"
                helperText="Le enviaremos la cotización formal con membrete."
              >
                <Input
                  type="email"
                  placeholder="ejemplo@cliente.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Field>

              <Field label="Seleccionar Sistema de Ventana Oficial">
                <NativeSelectRoot>
                  <NativeSelectField
                    value={systemChoice}
                    onChange={(e) => setSystemChoice(e.target.value)}
                  >
                    <option value="nova">Sistema Nova (Estándar)</option>
                    <option value="s25">Serie 25 (Residencial)</option>
                    <option value="s35">Serie 35 (Hermético)</option>
                    <option value="s62">Serie 62 (Acústico Antirruido)</option>
                  </NativeSelectField>
                </NativeSelectRoot>
              </Field>

              <Box pt="2">
                <Checkbox
                  checked={isTempered}
                  onCheckedChange={(details) => setIsTempered(!!details.checked)}
                >
                  <Text fontSize="sm" fontWeight="medium">
                    Incluir proceso de templado de seguridad (Norma E.040)
                  </Text>
                </Checkbox>
              </Box>
            </VStack>
          </Card.Body>
        </Card.Root>

        {/* 3. Alertas Oficiales (Chakra UI Snippet Alert) */}
        <Card.Root bg="bg.surface" borderColor="border.default" p="6" borderRadius="card">
          <Card.Header pb="4">
            <Card.Title fontSize="xl">Alertas Semánticas (Snippet Alert)</Card.Title>
            <Card.Description>
              Retroalimentación visual oficial (`components/ui/alert.tsx`).
            </Card.Description>
          </Card.Header>
          <Card.Body>
            <VStack gap="4" align="stretch">
              <Alert status="success" title="Cotización enviada">
                Se registró el presupuesto en Firestore y se envió copia al cliente.
              </Alert>

              <Alert status="info" title="Sistema Antirruido">
                La Serie 62 cuenta con doble vidriado hermético (DVH) garantizado.
              </Alert>

              <Alert status="warning" title="Stock limitado de perfiles">
                El acabado Champagne tiene un plazo de entrega de 5 días hábiles.
              </Alert>

              <Alert status="error" title="Error de validación">
                Verifique que las dimensiones de obra sean mayores a 0.50m.
              </Alert>
            </VStack>
          </Card.Body>
        </Card.Root>
      </SimpleGrid>
    </VStack>
  );
};
