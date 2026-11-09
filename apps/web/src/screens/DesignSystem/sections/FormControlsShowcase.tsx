"use client";

import React, { useState } from "react";
import { Box, Text, VStack, HStack, SimpleGrid, Input, Textarea, Separator } from "@chakra-ui/react";
import { ArrowRight, Eye, Sliders, Copy, Check, AlertCircle, MessageCircle } from "lucide-react";
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
      {/* 1. Botones Aura Studio & matriz de 9 estados */}
      <ShowcaseCard
        title="Botones y acciones"
        description="Botones en pastilla con texto en oración, negro de marca y contraste AA en claro y oscuro. Los estados hover y activo se ven al interactuar con el botón."
      >
        <VStack gap="6" align="stretch">
          {/* Matriz de los 9 estados */}
          <Box>
            <SubsectionLabel mb="3">Los 9 estados del botón</SubsectionLabel>
            <HStack gap={{ base: "2", md: "4" }} wrap="wrap">
              {/* 1. Default */}
              <Button variant={"studio" as never}>
                Default <ArrowRight size={16} aria-hidden="true" style={{ flexShrink: 0 }} />
              </Button>

              {/* 2. Hover (interactivo: pase el cursor sobre el botón) */}
              <Button variant={"studio" as never}>Hover</Button>

              {/* 3. Foco visible */}
              <Button
                variant={"studio" as never}
                outlineWidth="2"
                outlineStyle="solid"
                outlineColor="ring.primary"
                outlineOffset="0"
              >
                Foco visible
              </Button>

              {/* 4. Activo (interactivo: mantenga pulsado el botón) */}
              <Button variant={"studio" as never}>Activo</Button>

              {/* 5. Disabled */}
              <Button variant={"studio" as never} disabled aria-disabled="true">
                Deshabilitado
              </Button>

              {/* 6. Loading */}
              <Button variant={"studio" as never} loading loadingText="Cargando…">
                Cargar
              </Button>

              {/* 7. Error / peligro */}
              <Button
                variant={"studioOutline" as never}
                color="status.dangerText"
                borderColor="status.dangerBorder"
              >
                <AlertCircle size={16} aria-hidden="true" style={{ flexShrink: 0 }} />
                Revisar
              </Button>

              {/* 8. Vacío / outline */}
              <Button variant={"studioOutline" as never}>Vacío</Button>

              {/* 9. Éxito */}
              <Button
                variant={"studioOutline" as never}
                color="status.successText"
                borderColor="status.successBorder"
              >
                <Check size={16} aria-hidden="true" style={{ flexShrink: 0 }} />
                Confirmado
              </Button>
            </HStack>
          </Box>

          <Separator borderColor="border.subtle" />

          {/* Variantes de marca */}
          <Box>
            <SubsectionLabel mb="3">Variantes de marca</SubsectionLabel>
            <HStack gap={{ base: "2", md: "4" }} wrap="wrap">
              <Button variant={"studio" as never}>
                Primario <ArrowRight size={16} aria-hidden="true" style={{ flexShrink: 0 }} />
              </Button>
              <Button variant={"studioOutline" as never}>Contorno</Button>
              <Button variant={"studioGhost" as never}>Sutil</Button>
              {/* WhatsApp con token accesible (ratio 5.02:1 con texto blanco) */}
              <Button variant="whatsapp">
                <MessageCircle size={16} aria-hidden="true" style={{ flexShrink: 0 }} />
                Escribir por WhatsApp
              </Button>
            </HStack>
          </Box>

          <Separator borderColor="border.subtle" />

          {/* Tamaños */}
          <Box>
            <SubsectionLabel mb="3">Tamaños (sm, md, lg, xl; todos con altura mínima de 44 px)</SubsectionLabel>
            <HStack gap={{ base: "2", md: "4" }} wrap="wrap" align="center">
              <Button variant={"studio" as never} size="sm">Pequeño</Button>
              <Button variant={"studio" as never} size="md">Mediano</Button>
              <Button variant={"studio" as never} size="lg">Grande</Button>
              <Button variant={"studio" as never} size="xl">Extra grande</Button>
            </HStack>
          </Box>

          <Separator borderColor="border.subtle" />

          {/* Botones de ícono */}
          <Box>
            <SubsectionLabel mb="3">Botones de ícono y acciones flotantes</SubsectionLabel>
            <HStack gap={{ base: "2", md: "4" }} wrap="wrap" align="center">
              <Button
                aria-label="Ver ficha técnica"
                variant={"studioGhost" as never}
                size="md"
                px="0"
                minW="11"
                minH="11"
              >
                <Eye size={16} aria-hidden="true" style={{ flexShrink: 0 }} />
              </Button>
              <Button
                aria-label="Ajustar parámetros de ventana"
                variant={"studioOutline" as never}
                size="md"
                px="0"
                minW="11"
                minH="11"
              >
                <Sliders size={20} aria-hidden="true" style={{ flexShrink: 0 }} />
              </Button>
              <Button
                aria-label="Copiar especificación de presupuesto"
                variant={"studio" as never}
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
              Los controles interactivos miden al menos 44 px (minH y minW en 11) y usan íconos de 16, 20 o 24 px.
            </Text>
          </Box>
        </VStack>
      </ShowcaseCard>

      {/* 2. Campos, selectores y casilla */}
      <SimpleGrid columns={{ base: 1, md: 2 }} gap="6">
        <ShowcaseCard
          title="Formularios"
          description="Campos con etiqueta visible, autocompletado y estados: normal, error, foco, deshabilitado y solo lectura."
        >
          <VStack gap="5" align="stretch">
            {/* Estado 1: normal */}
            <Field label="Correo electrónico" helperText="Le enviaremos la cotización formal con membrete.">
              <Input
                id="form-email-contact"
                variant={"studio" as never}
                w="full"
                type="email"
                autoComplete="email"
                inputMode="email"
                placeholder="ejemplo@cliente.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Field>

            {/* Estado 2: error */}
            <Field
              invalid
              label="Teléfono celular de obra"
              errorText="Revise que el número tenga 9 dígitos, por ejemplo 974 278 303."
            >
              <Input
                id="form-phone-contact"
                variant={"studio" as never}
                w="full"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                borderColor="status.dangerBorder"
                aria-invalid="true"
              />
            </Field>

            {/* Estado 3: foco visible (demostración) */}
            <Field label="Razón social" helperText="Muestra el anillo de foco accesible.">
              <Input
                id="form-company-name"
                variant={"studio" as never}
                w="full"
                autoComplete="organization"
                value="Glass & Aluminum Company S.A.C."
                outlineWidth="2"
                outlineStyle="solid"
                outlineColor="ring.primary"
                outlineOffset="0"
                readOnly
              />
            </Field>

            {/* Estado 4: deshabilitado */}
            <Field label="Código de presupuesto" helperText="Identificador generado por el sistema.">
              <Input
                id="form-quote-code"
                variant={"studio" as never}
                w="full"
                value="COT-2026-EXP-482"
                disabled
                aria-disabled="true"
              />
            </Field>

            {/* Estado 5: solo lectura */}
            <Field label="Dirección de planta principal" helperText="Sede central de Glass & Aluminum Company S.A.C.">
              <Input
                id="form-hq-address"
                variant={"studio" as never}
                w="full"
                value="Av. Los Fresnos 1250 - La Molina"
                readOnly
                aria-readonly="true"
              />
            </Field>

            {/* Selector 1: sistemas (catálogo vigente: 6 sistemas) */}
            <Field label="Sistema de ventana" helperText="Sistemas de carpintería de aluminio y PVC certificados.">
              <NativeSelectRoot w="full" variant={"studio" as never}>
                <NativeSelectField
                  id="form-window-system"
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

            {/* Selector 2: vidrios (norma E.040) */}
            <Field label="Tipo de vidrio" helperText="Vidrios arquitectónicos homologados según la norma E.040.">
              <NativeSelectRoot w="full" variant={"studio" as never}>
                <NativeSelectField
                  id="form-glass-type"
                  value={glassChoice}
                  onChange={(e) => setGlassChoice(e.target.value)}
                >
                  <option value="crudo">Crudo</option>
                  <option value="laminado">Laminado</option>
                  <option value="templado">Templado</option>
                </NativeSelectField>
              </NativeSelectRoot>
            </Field>

            {/* Área de texto */}
            <Field label="Observaciones de la obra" helperText="Indique medidas aproximadas, ubicación en La Molina o vanos requeridos.">
              <Textarea
                id="form-project-notes"
                variant={"studio" as never}
                w="full"
                placeholder="Por ejemplo: ventanas corredizas Serie 62 con vidrio laminado acústico…"
                rows={4}
              />
            </Field>

            {/* Casilla */}
            <Box pt="1">
              <Checkbox
                checked={isTempered}
                onCheckedChange={(details) => setIsTempered(!!details.checked)}
                minH="11"
              >
                <Text fontSize="sm" fontWeight="medium">
                  Incluir templado de seguridad (norma E.040)
                </Text>
              </Checkbox>
            </Box>
          </VStack>
        </ShowcaseCard>

        {/* 3. Alertas */}
        <ShowcaseCard
          title="Alertas"
          description="Mensajes de estado con el estilo Aura Studio (components/ui/alert.tsx) y textos en lenguaje claro."
        >
          <VStack gap="4" align="stretch">
            <Alert variant={"studio" as never} status="success" title="Cotización registrada">
              Guardamos el presupuesto y enviamos al cliente una copia formal con membrete.
            </Alert>

            <Alert variant={"studio" as never} status="info" title="Aislamiento acústico">
              La Serie 62, Acústica y PVC abatible ofrecen aislamiento acústico alto para vanos residenciales.
            </Alert>

            <Alert variant={"studio" as never} status="warning" title="Plazo de entrega de acabados">
              Los perfiles en acabado champagne y madera tardan 5 días hábiles en entregarse.
            </Alert>

            <Alert variant={"studio" as never} status="error" title="Revise la medida del vano">
              La medida debe ser mayor a 0.50 m según la norma técnica peruana E.040.
            </Alert>
          </VStack>
        </ShowcaseCard>
      </SimpleGrid>
    </ShowcaseStack>
  );
};
