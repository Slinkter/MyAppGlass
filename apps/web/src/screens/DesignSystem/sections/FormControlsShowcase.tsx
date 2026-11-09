"use client";

import React, { useState } from "react";
import {
  Box,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Input,
  Textarea,
  IconButton,
  Separator,
} from "@chakra-ui/react";
import {
  ArrowRight,
  Eye,
  Sliders,
  Copy,
  Check,
  AlertCircle,
  MessageCircle,
} from "lucide-react";
import { FloatingWhatsAppButton, ThemeToggleButton } from "@/widgets/FloatingActions";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { NativeSelectRoot, NativeSelectField } from "@/components/ui/native-select";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert } from "@/components/ui/alert";
import { ShowcaseCard, ShowcaseStack, SubsectionLabel } from "../components";

export const FormControlsShowcase: React.FC = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("974278303");
  const [systemChoice, setSystemChoice] = useState("nova");
  const [glassChoice, setGlassChoice] = useState("templado");
  const [isTempered, setIsTempered] = useState(true);

  return (
    <ShowcaseStack>
      {/* 1. Botones del Sistema Aura & Matriz de 9 Estados */}
      <ShowcaseCard
        title="Botones & Acciones Oficiales — Matriz de 9 Estados (v2)"
        description="Sistema de botones con tokens semánticos nativos de Chakra UI v3 y contraste WCAG >= 4.5:1 en claro y oscuro."
      >
        <VStack gap="6" align="stretch">
          {/* Matriz de los 9 Estados Reglamentarios */}
          <Box>
            <SubsectionLabel mb="3">
              MATRIZ DE LOS 9 ESTADOS (WCAG CONTRASTE &gt;= 4.5:1 GARANTIZADO)
            </SubsectionLabel>
            <HStack gap={{ base: "2", md: "4" }} wrap="wrap">
              {/* 1. Default */}
              <Button variant="navy">
                Default <ArrowRight size={16} aria-hidden="true" style={{ flexShrink: 0 }} />
              </Button>

              {/* 2. Hover */}
              <Button variant="navy" bg={{ base: "brand.navyHover", _dark: "blue.200" }}>
                Hover
              </Button>

              {/* 3. Focus-visible */}
              <Button
                variant="navy"
                outlineWidth="2"
                outlineStyle="solid"
                outlineColor="ring.primary"
                outlineOffset="0"
              >
                Foco Visible
              </Button>

              {/* 4. Active */}
              <Button variant="navy" bg={{ base: "brand.navyActive", _dark: "blue.300" }} transform="scale(0.98)">
                Activo
              </Button>

              {/* 5. Disabled */}
              <Button variant="navy" disabled aria-disabled="true">
                Disabled
              </Button>

              {/* 6. Loading */}
              <Button variant="navy" loading loadingText="Cargando...">
                Cargar
              </Button>

              {/* 7. Error / Peligro */}
              <Button
                bg="status.dangerSoft"
                color="status.dangerText"
                border="1px solid"
                borderColor="status.dangerBorder"
                minH="11"
                minW="11"
                px="6"
              >
                <AlertCircle size={16} aria-hidden="true" style={{ flexShrink: 0 }} />
                Alerta
              </Button>

              {/* 8. Vacío / Outline */}
              <Button variant={"outlineNavy" as any}>
                Vacío
              </Button>

              {/* 9. Éxito */}
              <Button
                bg="status.successSoft"
                color="status.successText"
                border="1px solid"
                borderColor="status.successBorder"
                minH="11"
                minW="11"
                px="6"
              >
                <Check size={16} aria-hidden="true" style={{ flexShrink: 0 }} />
                Éxito
              </Button>
            </HStack>
          </Box>

          <Separator borderColor="border.subtle" />

          {/* Variantes Oficiales */}
          <Box>
            <SubsectionLabel mb="3">
              VARIANTES OFICIALES DE MARCA (NAVY PRIMARIO / OUTLINE / GHOST / WHATSAPP ACCESIBLE)
            </SubsectionLabel>
            <HStack gap={{ base: "2", md: "4" }} wrap="wrap">
              <Button variant="navy">
                Navy Primario <ArrowRight size={16} aria-hidden="true" style={{ flexShrink: 0 }} />
              </Button>
              <Button variant={"outlineNavy" as any}>Outline Navy</Button>
              <Button variant="ghost">Ghost Sutil</Button>
              {/* WhatsApp con token accesible v2 (ratio 5.02:1 con texto blanco) */}
              <Button
                bg="brand.whatsappAccessible"
                color="white"
                minH="11"
                minW="11"
                px="6"
                borderRadius="full"
                fontWeight="600"
                textTransform="uppercase"
                letterSpacing="wider"
              >
                <MessageCircle size={16} aria-hidden="true" style={{ flexShrink: 0 }} />
                WhatsApp Cotización
              </Button>
            </HStack>
          </Box>

          <Separator borderColor="border.subtle" />

          {/* Tamaños Estandarizados */}
          <Box>
            <SubsectionLabel mb="3">
              TAMAÑOS ESTANDARIZADOS (SM / MD / LG / XL — TODOS CON MINH=&quot;11&quot; &gt;= 44)
            </SubsectionLabel>
            <HStack gap={{ base: "2", md: "4" }} wrap="wrap" align="center">
              <Button variant="navy" size="sm">Small</Button>
              <Button variant="navy" size="md">Medium</Button>
              <Button variant="navy" size="lg">Large</Button>
              <Button variant="navy" size="xl">Extra Large</Button>
            </HStack>
          </Box>

          <Separator borderColor="border.subtle" />

          {/* Botones de Icono */}
          <Box>
            <SubsectionLabel mb="3">
              BOTONES DE ICONO &amp; ACCIONES FLOTANTES HOMOLOGADAS
            </SubsectionLabel>
            <HStack gap={{ base: "2", md: "4" }} wrap="wrap" align="center">
              <IconButton
                aria-label="Ver ficha técnica"
                variant="subtle"
                size="md"
                minW="11"
                minH="11"
              >
                <Eye size={16} aria-hidden="true" style={{ flexShrink: 0 }} />
              </IconButton>
              <IconButton
                aria-label="Ajustar parámetros de ventana"
                variant="outline"
                borderColor="border.default"
                size="md"
                minW="11"
                minH="11"
              >
                <Sliders size={20} aria-hidden="true" style={{ flexShrink: 0 }} />
              </IconButton>
              <Button
                aria-label="Copiar especificación de presupuesto"
                variant="navy"
                size="md"
                px="0"
                minW="11"
                minH="11"
              >
                <Copy size={20} aria-hidden="true" style={{ flexShrink: 0 }} />
              </Button>
              <FloatingWhatsAppButton />
              <ThemeToggleButton />
            </HStack>
            <Text fontSize="xs" color="text.muted" mt="2" wordBreak="break-word" overflowWrap="anywhere">
              Estándar de controles interactivos: área mínima táctil <code>minH=&quot;11&quot;</code> y <code>minW=&quot;11&quot;</code> (&gt;= 44) con escala de iconos 16, 20 o 24.
            </Text>
          </Box>
        </VStack>
      </ShowcaseCard>

      {/* 2. Snippets Oficiales: Field, Select, Checkbox */}
      <SimpleGrid columns={{ base: 1, md: 2 }} gap="6">
        <ShowcaseCard
          title="Formularios Estructurados & Estados Accesibles"
          description="Campos enriquecidos con labels visibles, autocomplete, inputmode y estados default, focus, error, disabled y readOnly."
        >
          <VStack gap="5" align="stretch">
            {/* Estado 1: Default */}
            <Field
              label="Correo Electrónico de Contacto"
              helperText="Le enviaremos la cotización formal con membrete."
            >
              <Input
                id="form-email-contact"
                w="full"
                minH="11"
                type="email"
                autoComplete="email"
                inputMode="email"
                placeholder="ejemplo@cliente.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Field>

            {/* Estado 2: Error / Validación */}
            <Field
              invalid
              label="Teléfono Celular de Obra (Validación Requerida)"
              errorText="Verifique que el número contenga 9 dígitos (ej. 974 278 303)."
            >
              <Input
                id="form-phone-contact"
                w="full"
                minH="11"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                borderColor="status.dangerBorder"
                aria-invalid="true"
              />
            </Field>

            {/* Estado 3: Focus-Visible Demostrado */}
            <Field
              label="Nombre o Razón Social (Foco Visible Demostrado)"
              helperText="Demostración visual del anillo de foco accesible."
            >
              <Input
                id="form-company-name"
                w="full"
                minH="11"
                autoComplete="organization"
                value="Glass & Aluminum Company S.A.C."
                outlineWidth="2"
                outlineStyle="solid"
                outlineColor="ring.primary"
                outlineOffset="0"
                borderColor="ring.primary"
                readOnly
              />
            </Field>

            {/* Estado 4: Disabled */}
            <Field
              label="Código de Presupuesto (Deshabilitado)"
              helperText="Identificador único generado por el sistema."
            >
              <Input
                id="form-quote-code"
                w="full"
                minH="11"
                value="COT-2026-EXP-482"
                disabled
                aria-disabled="true"
                bg="bg.subtle"
                opacity="0.6"
                cursor="not-allowed"
              />
            </Field>

            {/* Estado 5: ReadOnly */}
            <Field
              label="Dirección de Planta Principal (Solo Lectura)"
              helperText="Sede central contractual de Glass & Aluminum Company S.A.C."
            >
              <Input
                id="form-hq-address"
                w="full"
                minH="11"
                value="Av. Los Fresnos 1250 - La Molina"
                readOnly
                aria-readonly="true"
                bg="bg.subtle"
                borderColor="border.subtle"
                cursor="default"
              />
            </Field>

            {/* Select 1: Sistemas Oficiales (Catálogo Vigente: 6 sistemas) */}
            <Field
              label="Seleccionar Sistema de Ventana Oficial (Catálogo Vigente)"
              helperText="Sistemas de carpintería de aluminio y PVC certificados."
            >
              <NativeSelectRoot w="full" minH="11">
                <NativeSelectField
                  id="form-window-system"
                  minH="11"
                  value={systemChoice}
                  onChange={(e) => setSystemChoice(e.target.value)}
                >
                  <option value="nova">Sistema Nova</option>
                  <option value="s25">Serie 25</option>
                  <option value="s35">Serie 35</option>
                  <option value="s62">Serie 62</option>
                  <option value="acustica">Acústica</option>
                  <option value="pvc">PVC abatible</option>
                </NativeSelectField>
              </NativeSelectRoot>
            </Field>

            {/* Select 2: Vidrios Oficiales (Norma E.040: 3 vidrios) */}
            <Field
              label="Tipo de Vidrio Oficial (Norma Técnica E.040)"
              helperText="Vidrios arquitectónicos homologados para seguridad estructural."
            >
              <NativeSelectRoot w="full" minH="11">
                <NativeSelectField
                  id="form-glass-type"
                  minH="11"
                  value={glassChoice}
                  onChange={(e) => setGlassChoice(e.target.value)}
                >
                  <option value="crudo">Crudo</option>
                  <option value="laminado">Laminado</option>
                  <option value="templado">Templado</option>
                </NativeSelectField>
              </NativeSelectRoot>
            </Field>

            {/* Textarea de Observaciones */}
            <Field
              label="Observaciones de la Obra"
              helperText="Indique medidas aproximadas, ubicación en La Molina o vanos requeridos."
            >
              <Textarea
                id="form-project-notes"
                w="full"
                minH="24"
                variant="outline"
                placeholder="Ej. Ventanas corredizas Serie 62 con vidrio laminado acústico..."
                rows={4}
              />
            </Field>

            {/* Checkbox de Seguridad */}
            <Box pt="1">
              <Checkbox
                checked={isTempered}
                onCheckedChange={(details) => setIsTempered(!!details.checked)}
                minH="11"
              >
                <Text fontSize="sm" fontWeight="medium">
                  Incluir proceso de templado de seguridad (Norma E.040)
                </Text>
              </Checkbox>
            </Box>
          </VStack>
        </ShowcaseCard>

        {/* 3. Alertas Oficiales (Chakra UI Snippet Alert) */}
        <ShowcaseCard
          title="Alertas Semánticas (Snippet Alert)"
          description="Retroalimentación visual oficial (components/ui/alert.tsx) con textos de catálogo y ortografía oficial."
        >
          <VStack gap="4" align="stretch">
            <Alert status="success" title="Cotización registrada">
              Se registró el presupuesto en Firestore y se envió copia formal con membrete al cliente.
            </Alert>

            <Alert status="info" title="Aislamiento acústico antirruido">
              La Serie 62, Acústica y PVC abatible ofrecen aislamiento antirruido de alto rendimiento para vanos residenciales.
            </Alert>

            <Alert status="warning" title="Plazo de entrega de acabados">
              Los perfiles en acabado Champagne y Madera tienen un plazo de entrega de 5 días hábiles.
            </Alert>

            <Alert status="error" title="Validación técnica de vano">
              Verifique que las dimensiones de vano sean mayores a 0.50 m según la norma técnica peruana E.040.
            </Alert>
          </VStack>
        </ShowcaseCard>
      </SimpleGrid>
    </ShowcaseStack>
  );
};
