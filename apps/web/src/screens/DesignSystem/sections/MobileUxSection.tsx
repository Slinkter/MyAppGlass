"use client";

/**
 * @file MobileUxSection.tsx
 * @description Pestaña "UX móvil": propuestas de la auditoría UX del 2026-11-10 llevadas a patrones de Material Design 3
 * (área táctil de 48 px, zona del pulgar, una acción principal, hoja inferior y movimiento corto) con la estética de la marca.
 * Todo es propuesta: el sitio real no cambia hasta que el dueño apruebe cada bloque. Solo se usa dentro de `/design-system`.
 */

import React, { useRef, useState } from "react";
import { Box, HStack, Input, SimpleGrid, Text, VStack, type BoxProps } from "@chakra-ui/react";
import { ArrowLeft, ArrowRight, ChevronDown, Menu, MessageCircle, Phone } from "lucide-react";
import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field } from "@/components/ui/field";
import { NativeSelectField, NativeSelectRoot } from "@/components/ui/native-select";
import { companyData } from "@/shared/config/company-data";
import { TRANSITIONS } from "@/shared/constants/motion";
import { useMotionBudget } from "@/shared/hooks/ui/useMotionBudget";
import { ShowcaseCard, SubsectionLabel } from "../components";
import { BrandMark } from "../components/BrandMark";

/** Variante propia del tema que el tipado de Chakra todavía no conoce. */
const FIELD = "field" as never;
const CHIP = "chip" as never;

/** Zona de atención decidida por el dueño (AGENTS.md §3). */
const ZONES = ["La Molina", "Surco", "San Borja", "San Isidro", "Miraflores"] as const;
/** Servicios que hoy muestra la home. */
const SERVICES = ["Ventanas", "Mamparas", "Duchas", "Barandas", "Parapetos", "Balcones"] as const;

const waHref = (text: string) => `https://wa.me/${companyData.whatsappNumber}?text=${encodeURIComponent(text)}`;
const TEL_HREF = `tel:+${companyData.whatsappNumber}`;
const HERO_TEXT =
  "Suministro, ensamblaje en taller e instalación de ventanas antirruido, mamparas y carpintería de aluminio en Lima.";

const PRINCIPLES = [
  { title: "Área táctil de 48 px", text: "Material pide 48 × 48 dp y la marca fija 44 px como mínimo. En móvil, acciones y casillas miden 48 px." },
  { title: "Zona del pulgar", text: "La acción principal va en la mitad inferior de la pantalla, donde llega el pulgar con una sola mano." },
  { title: "Una acción principal", text: "Un solo botón destacado por pantalla: cotizar por WhatsApp. Lo demás va en contorno o como texto." },
  { title: "Hoja inferior", text: "El menú sube desde abajo y se cierra con X, tocando el fondo, con Escape o con el botón Atrás." },
  { title: "Movimiento corto", text: "200 ms, solo transform y opacity, una vez. Sin movimiento si el usuario pidió reducirlo." },
] as const;

const DEMO_PARAGRAPHS = [1, 2, 3, 4, 5, 6, 7, 8] as const;

/* ------------------------------------------------------------------ */
/* Primitivas                                                          */
/* ------------------------------------------------------------------ */

interface PhoneFrameProps extends BoxProps {
  label: string;
}

/** Marco de teléfono con la proporción de 360 × 800 px (pantalla de referencia del sitio). */
const PhoneFrame: React.FC<PhoneFrameProps> = ({ label, children, ...rest }) => (
  <VStack align="stretch" gap="3" w="full" maxW="xs" mx="auto">
    <SubsectionLabel>{label}</SubsectionLabel>
    <Box
      position="relative"
      w="full"
      aspectRatio="9 / 20"
      overflow="hidden"
      bg="bg.page"
      borderWidth="1px"
      borderColor="border.warm"
      borderRadius="modal"
      {...rest}
    >
      {children}
    </Box>
  </VStack>
);

/** Representación del botón flotante del menú (MenuFab). Decorativa. */
const FakeFab: React.FC<BoxProps> = (props) => (
  <Box
    as="span"
    aria-hidden="true"
    position="absolute"
    right="4"
    bottom="4"
    w="12"
    h="12"
    borderRadius="full"
    bg="text.heading"
    color="bg.page"
    display="inline-flex"
    alignItems="center"
    justifyContent="center"
    {...props}
  >
    <Menu size={20} />
  </Box>
);

const Eyebrow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Text fontSize="xs" fontWeight="700" letterSpacing="label" textTransform="uppercase" color="text.muted">
    {children}
  </Text>
);

const HeroTitle: React.FC = () => (
  <Text fontFamily="heading" fontWeight="700" fontSize="2xl" lineHeight="title" color="text.heading">
    GLASS &amp; ALUMINUM COMPANY S.A.C.
  </Text>
);

/* ------------------------------------------------------------------ */
/* 1. Hero móvil                                                       */
/* ------------------------------------------------------------------ */

const HeroBefore: React.FC = () => (
  <PhoneFrame label="Hoy · sin acción visible">
    <VStack h="full" justify="center" gap="4" px="6" textAlign="center">
      <BrandMark size="20" />
      <Eyebrow>Vidriería &amp; Aluminio</Eyebrow>
      <HeroTitle />
      <Text fontSize="sm" color="text.muted" lineHeight="body">
        {HERO_TEXT}
      </Text>
    </VStack>
    <Box position="absolute" bottom="6" left="0" right="0" display="flex" justifyContent="center" color="text.muted">
      <ChevronDown size={24} aria-hidden="true" />
    </Box>
    <FakeFab />
  </PhoneFrame>
);

const HeroAfter: React.FC = () => (
  <PhoneFrame label="Propuesta · acción en el primer pantallazo">
    {/* pb reserva el espacio del botón flotante: ningún texto queda debajo */}
    <VStack h="full" align="stretch" justify="space-between" gap="4" px="5" pt="8" pb="20">
      <VStack align="flex-start" gap="3">
        <HStack gap="2.5">
          <BrandMark size="10" />
          <Eyebrow>Vidriería &amp; Aluminio</Eyebrow>
        </HStack>
        <HeroTitle />
        <Text fontSize="sm" color="text.muted" lineHeight="body">
          {HERO_TEXT}
        </Text>
      </VStack>

      <VStack align="stretch" gap="3">
        <HStack gap="2" wrap="wrap">
          <Badge variant={CHIP}>Garantía de 3 meses</Badge>
          <Badge variant={CHIP}>Visita técnica sin costo</Badge>
          <Badge variant={CHIP}>Boleta o factura</Badge>
        </HStack>
        <Button asChild variant="whatsapp" w="full" minH="12">
          <a href={waHref(companyData.whatsappMessage)} target="_blank" rel="noopener noreferrer">
            <MessageCircle size={20} aria-hidden="true" />
            Cotizar por WhatsApp
          </a>
        </Button>
        <Button asChild variant="outline" w="full" minH="12">
          <a href={TEL_HREF}>
            <Phone size={20} aria-hidden="true" />
            Llamar al {companyData.whatsappDisplay}
          </a>
        </Button>
      </VStack>
    </VStack>
    <FakeFab />
  </PhoneFrame>
);

/* ------------------------------------------------------------------ */
/* 2. Casilla de consentimiento                                        */
/* ------------------------------------------------------------------ */

const ConsentBefore: React.FC = () => (
  <VStack align="stretch" gap="3">
    <SubsectionLabel>Hoy · texto de 12 px y enlace de 35 px dentro de la casilla</SubsectionLabel>
    <Checkbox size="sm">
      <Text fontSize="xs" color="text.muted" fontWeight="600">
        He leído y acepto las{" "}
        <Text as="span" textDecoration="underline">
          Políticas de Privacidad (Ley N° 29733)
        </Text>{" "}
        y el tratamiento de mis datos para la cotización solicitada.
      </Text>
    </Checkbox>
  </VStack>
);

const ConsentAfter: React.FC = () => {
  const [checked, setChecked] = useState(false);
  const [touched, setTouched] = useState(false);
  return (
    <VStack align="stretch" gap="2">
      <SubsectionLabel>Propuesta · toda la fila es táctil (48 px) y el enlace va aparte</SubsectionLabel>
      <Field invalid={touched && !checked} errorText="Debe aceptar para enviar la solicitud">
        <Checkbox
          checked={checked}
          onCheckedChange={(d) => {
            setChecked(!!d.checked);
            setTouched(true);
          }}
          w="full"
          minH="12"
          px="4"
          py="3"
          gap="3"
          alignItems="center"
          borderWidth="1px"
          borderColor={checked ? "text.heading" : "border.warm"}
          borderRadius="field"
          cursor="pointer"
        >
          <Text fontSize="sm" color="text.body" lineHeight="body">
            Acepto el tratamiento de mis datos para esta cotización.
          </Text>
        </Checkbox>
      </Field>
      <Button asChild variant="ghost" size="sm" alignSelf="flex-start" minH="11" whiteSpace="normal" textAlign="left" h="auto" py="2">
        <a href="/politicas-empresa" target="_blank" rel="noopener noreferrer">
          Leer la política de privacidad (Ley N° 29733)
        </a>
      </Button>
    </VStack>
  );
};

/* ------------------------------------------------------------------ */
/* 3. Presupuesto express sin cuenta                                   */
/* ------------------------------------------------------------------ */

const STEPS = ["Servicio", "Distrito y medidas", "Enviar por WhatsApp"] as const;
const OTHER_ZONE = "otro";

const ExpressQuote: React.FC = () => {
  const motion = useMotionBudget();
  const [step, setStep] = useState(0);
  const [service, setService] = useState<string | null>(null);
  const [zone, setZone] = useState("");
  const [notes, setNotes] = useState("");

  const outOfZone = zone === OTHER_ZONE;
  const canNext = step === 0 ? service !== null : step === 1 ? zone !== "" && !outOfZone : false;
  const detail = notes.trim();
  const message =
    `Hola, quisiera una cotización de ${(service ?? "").toLowerCase()} en ${zone}.` +
    (detail ? ` Medidas o detalle: ${detail}.` : "");

  return (
    <Box maxW="sm" mx="auto" w="full" p="5" borderWidth="1px" borderColor="border.warm" borderRadius="modal" bg="bg.page">
      <VStack align="stretch" gap="5">
        <VStack align="stretch" gap="2">
          <Text fontSize="sm" fontWeight="600" color="text.heading" aria-live="polite">
            Paso {step + 1} de {STEPS.length} · {STEPS[step]}
          </Text>
          <Box h="1" bg="bg.subtle" borderRadius="full" overflow="hidden" aria-hidden="true">
            <Box
              h="full"
              bg="text.heading"
              transformOrigin="left"
              transform={`scaleX(${(step + 1) / STEPS.length})`}
              transition={motion === "none" ? "none" : TRANSITIONS.fadeTransform}
            />
          </Box>
        </VStack>

        {step === 0 && (
          <SimpleGrid columns={2} gap="2" role="group" aria-label="Elija el servicio">
            {SERVICES.map((s) => (
              <Button
                key={s}
                variant={service === s ? "primary" : "outline"}
                aria-pressed={service === s}
                minH="12"
                onClick={() => setService(s)}
              >
                {s}
              </Button>
            ))}
          </SimpleGrid>
        )}

        {step === 1 && (
          <VStack align="stretch" gap="4">
            <Field label="Distrito" required>
              <NativeSelectRoot variant={FIELD}>
                <NativeSelectField value={zone} onChange={(e) => setZone(e.currentTarget.value)}>
                  <option value="" disabled>
                    Elija su distrito
                  </option>
                  {ZONES.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                  <option value={OTHER_ZONE}>Otro distrito</option>
                </NativeSelectField>
              </NativeSelectRoot>
            </Field>
            {outOfZone && (
              <Alert variant="warning" title="Fuera de la zona de atención">
                Por ahora solo atendemos proyectos en {ZONES.join(", ")}.
              </Alert>
            )}
            <Field label="Medidas aproximadas" optionalText="Opcional" helperText="Si no las tiene, las tomamos en la visita técnica">
              <Input
                variant={FIELD}
                value={notes}
                onChange={(e) => setNotes(e.currentTarget.value)}
                placeholder="Ejemplo: 2 ventanas de 1,20 × 1,00 m"
              />
            </Field>
          </VStack>
        )}

        {step === 2 && (
          <VStack align="stretch" gap="4">
            <Box p="4" bg="bg.subtle" borderRadius="card">
              <SubsectionLabel mb="2">Mensaje que se enviará</SubsectionLabel>
              <Text fontSize="sm" color="text.body" lineHeight="body">
                {message}
              </Text>
            </Box>
            <Button asChild variant="whatsapp" w="full" minH="12">
              <a href={waHref(message)} target="_blank" rel="noopener noreferrer">
                <MessageCircle size={20} aria-hidden="true" />
                Enviar por WhatsApp
              </a>
            </Button>
            <Text fontSize="xs" color="text.muted" lineHeight="body">
              ¿Necesita el presupuesto formal con membrete? Ingrese a Mi cuenta.
            </Text>
          </VStack>
        )}

        {/* Barra de acciones abajo: zona del pulgar */}
        <HStack justify="space-between" pt="4" borderTopWidth="1px" borderColor="border.warm">
          <Button variant="ghost" minH="12" disabled={step === 0} onClick={() => setStep((s) => Math.max(0, s - 1))}>
            <ArrowLeft size={16} aria-hidden="true" />
            Atrás
          </Button>
          {step < STEPS.length - 1 && (
            <Button variant="primary" minH="12" disabled={!canNext} onClick={() => setStep((s) => s + 1)}>
              Siguiente
              <ArrowRight size={16} aria-hidden="true" />
            </Button>
          )}
        </HStack>
      </VStack>
    </Box>
  );
};

/* ------------------------------------------------------------------ */
/* 4. Botón flotante que se oculta al bajar                            */
/* ------------------------------------------------------------------ */

const HideOnScrollDemo: React.FC = () => {
  const motion = useMotionBudget();
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const y = e.currentTarget.scrollTop;
    const delta = y - lastY.current;
    if (Math.abs(delta) < 8) return;
    setHidden(delta > 0 && y > 48);
    lastY.current = y;
  };

  return (
    <PhoneFrame label="Desplace el contenido dentro del marco" aspectRatio="auto" h="md">
      <Box
        h="full"
        overflowY="auto"
        onScroll={onScroll}
        px="5"
        pt="6"
        pb="24"
        tabIndex={0}
        aria-label="Contenido de ejemplo con desplazamiento"
      >
        <VStack align="stretch" gap="5">
          {DEMO_PARAGRAPHS.map((n) => (
            <VStack key={n} align="stretch" gap="2">
              <Box h="3" w={n % 2 ? "70%" : "55%"} bg="bg.subtle" borderRadius="full" />
              <Text fontSize="sm" color="text.muted" lineHeight="body">
                Párrafo de ejemplo {n}. El texto llega hasta el borde derecho, donde hoy queda tapado por el botón del menú.
              </Text>
            </VStack>
          ))}
        </VStack>
      </Box>
      <FakeFab
        transform={hidden ? "translateY(160%)" : "translateY(0)"}
        opacity={hidden ? 0 : 1}
        transition={motion === "none" ? "none" : TRANSITIONS.fadeTransform}
      />
    </PhoneFrame>
  );
};

/* ------------------------------------------------------------------ */
/* Sección                                                             */
/* ------------------------------------------------------------------ */

export const MobileUxSection: React.FC = () => (
  <VStack align="stretch" gap={{ base: "8", md: "12" }}>
    <ShowcaseCard
      title="Principios de Material Design 3 aplicados"
      description="Se adopta la ergonomía de Material (tamaños, zona del pulgar, patrones de interacción), no su estética: los colores, la tipografía y las superficies siguen el manual de marca."
      badge="Auditoría UX 2026-11-10"
    >
      <SimpleGrid columns={{ base: 1, sm: 2, lg: 5 }} gap="4">
        {PRINCIPLES.map((p, i) => (
          <VStack key={p.title} align="flex-start" gap="2" p="4" borderWidth="1px" borderColor="border.warm" borderRadius="card">
            <Eyebrow>{String(i + 1).padStart(2, "0")}</Eyebrow>
            <Text fontFamily="heading" fontWeight="700" fontSize="md" color="text.heading">
              {p.title}
            </Text>
            <Text fontSize="sm" color="text.muted" lineHeight="body">
              {p.text}
            </Text>
          </VStack>
        ))}
      </SimpleGrid>
    </ShowcaseCard>

    <ShowcaseCard
      title="Hero móvil con acción en el primer pantallazo"
      description="Hoy, en 360 × 800 px, el inicio solo muestra el nombre y una flecha. La propuesta deja WhatsApp y Llamar en la zona del pulgar, con tres datos confirmados por el dueño, y reserva el espacio del botón flotante."
      badge="Propuesta · espera aprobación"
    >
      <SimpleGrid columns={{ base: 1, md: 2 }} gap="8">
        <HeroBefore />
        <HeroAfter />
      </SimpleGrid>
    </ShowcaseCard>

    <ShowcaseCard
      title="Casilla de consentimiento táctil"
      description="En /contacto el enlace de privacidad mide 35 px y vive dentro de la casilla: un toque puede marcarla o abrir otra pestaña. La propuesta hace táctil toda la fila y saca el enlace a su propio botón de 44 px."
      badge="Propuesta · espera aprobación"
    >
      <SimpleGrid columns={{ base: 1, md: 2 }} gap="8">
        <ConsentBefore />
        <ConsentAfter />
      </SimpleGrid>
    </ShowcaseCard>

    <ShowcaseCard
      title="Presupuesto express sin cuenta"
      description="Hoy /presupuesto pide iniciar sesión y «Cotizar sin cuenta» lleva a un formulario largo. La propuesta: tres pasos cortos que arman el mensaje y lo envían por WhatsApp. Sin precios hasta aprobar el catálogo; el presupuesto con membrete queda para Mi cuenta."
      badge="Propuesta · espera aprobación"
    >
      <ExpressQuote />
    </ShowcaseCard>

    <ShowcaseCard
      title="Botón del menú que se oculta al bajar"
      description="El botón flotante tapa texto a la derecha. Al bajar se esconde y al subir vuelve (200 ms, transform y opacity); el contenido además reserva su espacio al final. Sin animación si el usuario pidió reducir el movimiento."
      badge="Propuesta · espera aprobación"
    >
      <HideOnScrollDemo />
    </ShowcaseCard>
  </VStack>
);
