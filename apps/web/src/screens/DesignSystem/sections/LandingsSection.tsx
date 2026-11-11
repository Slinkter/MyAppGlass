"use client";

/**
 * @file ProposalLandings.tsx
 * @description Propuesta UI · Landings y formularios: landing de servicio, de proyecto y de distrito, formulario
 * de presupuesto, estados y footer. Datos solo de lo decidido por el dueño; lo que falta se marca como pendiente.
 */

import React from "react";
import { Box, Heading, HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { ArrowRight, Building2, CalendarDays, Check, Layers, MapPin, Phone, Ruler, ShieldCheck } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { companyData } from "@/shared/config/company-data";
import { ShowcaseCard } from "../components";
import { Accent, Dock, DockFact, DockPill, PlaceActions, PlaceCard, PlaceTitle, Stage, StatusLine } from "../components/PatternB";

const ZONES = ["La Molina", "Surco", "San Borja", "San Isidro", "Miraflores"] as const;
const PENDING = "[Por confirmar con el dueño]";

const Eyebrow: React.FC<{ children: React.ReactNode; color?: string }> = ({ children, color = "text.muted" }) => (
  <Text fontSize="xs" fontWeight="bold" letterSpacing="label" textTransform="uppercase" color={color}>
    {children}
  </Text>
);

const Panel: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <VStack align="stretch" gap="2">
    <Eyebrow>{label}</Eyebrow>
    <Box borderWidth="1px" borderColor="border.subtle" borderRadius="modal" overflow="hidden" bg="bg.page">
      {children}
    </Box>
  </VStack>
);

const CtaBand: React.FC<{ title: string; text: string; action: string }> = ({ title, text, action }) => (
  <HStack
    bg="brand.ink"
    color="white"
    borderRadius="modal"
    p={{ base: "6", md: "8" }}
    justify="space-between"
    align={{ base: "flex-start", md: "center" }}
    direction={{ base: "column", md: "row" }}
    gap="5"
  >
    <VStack align="flex-start" gap="1.5" maxW="pageNarrow">
      <Heading as="h3" fontFamily="heading" fontWeight="700" fontSize={{ base: "xl", md: "2xl" }} lineHeight="title" color="white">
        {title}
      </Heading>
      <Text color="whiteAlpha.800" fontSize="sm" lineHeight="body">
        {text}
      </Text>
    </VStack>
    <Button variant="whatsapp" minH="11" flexShrink={0}>
      <Phone size={16} aria-hidden="true" />
      {action}
    </Button>
  </HStack>
);

/* ---------- Landing de servicio ---------- */
const FAQ = [
  ["¿Cuánto cuesta?", "Depende de la medida, el vidrio y el acabado. Medimos sin costo y le enviamos el presupuesto por WhatsApp. El precio que se muestra incluye IGV."],
  ["¿Cuánto demora?", "El plazo de su obra se confirma en la visita técnica."],
  ["¿Tienen garantía?", "Sí: 3 meses en todo lo instalado."],
  ["¿Atienden en mi distrito?", `Atendemos en ${ZONES.slice(0, -1).join(", ")} y ${ZONES[ZONES.length - 1]}.`],
] as const;

const ServiceLanding: React.FC = () => (
  <VStack align="stretch" gap="8" p={{ base: "3", md: "5" }}>
    <Stage image="/images/services-products-02.Mampara-save-mampara01.webp" imageAlt="Mampara de vidrio con marco de aluminio">
      <PlaceCard label="Mamparas de vidrio">
        <StatusLine label="Servicios · Mamparas" meta="A medida" dot="brand.ink" />
        <PlaceTitle>
            Mamparas de vidrio <Accent>a su medida</Accent>
          </PlaceTitle>
        <Text mt="3" fontSize="sm" color="text.muted" lineHeight="body">
          Medimos en su obra, ensamblamos en nuestro taller e instalamos.
        </Text>
        <PlaceActions>
          <Button variant="primary" minH="11" flex="1">
            Pedir presupuesto <ArrowRight size={16} aria-hidden="true" />
          </Button>
          <Button variant="outline" minH="11" flex="1">Ver instaladas</Button>
        </PlaceActions>
      </PlaceCard>
      <Dock label="Resumen del servicio">
        <DockFact icon={Ruler} title="Aperturas" text="Corrediza y batiente" />
        <DockFact icon={Layers} title="Perfiles" text="Aluminio en 5 colores" />
        <DockFact icon={Check} title="Vidrio" text="Crudo, laminado o templado" />
        <DockFact icon={ShieldCheck} title="Garantía de 3 meses" text="En todo lo instalado" />
      </Dock>
    </Stage>

    <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: "8", lg: "12" }} px={{ base: "2", md: "5" }}>
      <VStack align="stretch" gap="4">
        <Heading as="h3" fontFamily="heading" fontWeight="700" fontSize="2xl" color="text.heading">Especificaciones</Heading>
        {[
          ["Aperturas", "Corrediza y batiente"],
          ["Perfiles", "Aluminio: negro, mate, blanco, madera o champagne"],
          ["Vidrio", "Crudo, laminado o templado; incoloro, bronce o gris"],
          ["Series y espesores", PENDING],
        ].map(([k, v]) => (
          <HStack key={k} justify="space-between" align="flex-start" gap="4" pb="3" borderBottomWidth="1px" borderColor="border.subtle">
            <Text fontSize="sm" color="text.muted" flexShrink={0}>{k}</Text>
            <Text fontSize="sm" fontWeight="600" color="text.heading" textAlign="right">{v}</Text>
          </HStack>
        ))}
      </VStack>
      <VStack align="stretch" gap="4">
        <Heading as="h3" fontFamily="heading" fontWeight="700" fontSize="2xl" color="text.heading">Preguntas frecuentes</Heading>
        {FAQ.map(([q, a]) => (
          <VStack key={q} align="stretch" gap="1" pb="3" borderBottomWidth="1px" borderColor="border.subtle">
            <Text fontWeight="600" color="text.heading">{q}</Text>
            <Text fontSize="sm" color="text.muted" lineHeight="body">{a}</Text>
          </VStack>
        ))}
      </VStack>
    </SimpleGrid>
    <CtaBand title="Pida su presupuesto" text="Coordinamos una visita técnica sin costo y le respondemos por WhatsApp." action="Escribir por WhatsApp" />
  </VStack>
);

/* ---------- Landing de proyecto ---------- */
const ProjectLanding: React.FC = () => (
  <VStack align="stretch" gap="8" p={{ base: "3", md: "5" }}>
    <Stage pendingLabel="Foto de obra pendiente · se carga desde el panel de administración">
      <PlaceCard label="Proyecto Palmer">
        <StatusLine label="Proyectos · Breña" meta="2025" dot="brand.ink" />
        <PlaceTitle>
            Palmer, una obra <Accent>entregada</Accent>
          </PlaceTitle>
        <HStack mt="3" gap="1.5" color="text.muted" fontSize="sm">
          <MapPin size={14} aria-hidden="true" />
          <Text>Breña, Lima</Text>
        </HStack>
        <PlaceActions>
          <Button variant="primary" minH="11" flex="1">Coordinar visita</Button>
          <Button variant="outline" minH="11" flex="1">Más obras</Button>
        </PlaceActions>
      </PlaceCard>
      <Dock label="Datos de la obra">
        <DockFact icon={MapPin} title="Distrito" text="Breña" />
        <DockFact icon={CalendarDays} title="Año" text="2025" />
        <DockFact icon={Building2} title="Departamentos" text="[Dato pendiente]" />
        <DockFact icon={ShieldCheck} title="Cliente" text="[Pendiente de autorización]" />
      </Dock>
    </Stage>
    <CtaBand title="¿Tiene una obra similar?" text="Coordinamos una visita técnica y le entregamos el presupuesto por partidas." action="Coordinar visita" />
  </VStack>
);

/* ---------- Landing de distrito ---------- */
const DistrictLanding: React.FC = () => (
  <VStack align="stretch" gap="8" p={{ base: "3", md: "5" }}>
    <Stage image="/images/services-products-01.Ventanas-nova-a10.webp" imageAlt="Ventana de aluminio instalada en un departamento">
      <PlaceCard label="Atención en Surco">
        <StatusLine label="Atención por distrito" meta="Surco" dot="brand.ink" />
        <PlaceTitle>
            Vidriería y aluminio en <Accent>Surco</Accent>
          </PlaceTitle>
        <Text mt="3" fontSize="sm" color="text.muted" lineHeight="body">
          Medimos, ensamblamos en nuestro taller de La Molina e instalamos en su casa o en su obra.
        </Text>
        <PlaceActions>
          <Button variant="primary" minH="11" flex="1">Pedir presupuesto</Button>
          <Button variant="whatsapp" minH="11" flex="1">
            <Phone size={16} aria-hidden="true" />
            {companyData.whatsappDisplay}
          </Button>
        </PlaceActions>
      </PlaceCard>
      <Dock label="Distritos de atención">
        {ZONES.map((z) => (
          <DockPill key={z} icon={MapPin} title={z} text="Atendemos aquí" pressed={z === "Surco"} />
        ))}
      </Dock>
    </Stage>
  </VStack>
);

export const LandingsSection: React.FC = () => (
  <ShowcaseCard title="Landings" description="Plantillas con el patrón B: foto propia en el escenario, tarjeta de vidrio flotante y barra de datos. La de proyecto y la de distrito usan los datos reales de Palmer y de Surco; lo que falta va como marcador.">
    <VStack align="stretch" gap="8">
      <Panel label="Landing de servicio · Mamparas"><ServiceLanding /></Panel>
      <Panel label="Landing de proyecto · Palmer"><ProjectLanding /></Panel>
      <Panel label="Landing de distrito · Surco"><DistrictLanding /></Panel>
    </VStack>
  </ShowcaseCard>
);
