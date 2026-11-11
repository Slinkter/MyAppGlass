"use client";

/**
 * @file HeroSection.tsx
 * @description Pestaña "Tarjetas editoriales": hero de inicio con el patrón B, tarjetas de servicio con foto y leyenda de vidrio,
 * y tarjetas de obra con marcador visible cuando falta la foto (nunca una imagen inventada).
 */

import React from "react";
import { Box, Heading, HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { ArrowRight, Check, MapPin, Ruler, ShieldCheck, Store } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { MediaCard } from "@/shared/components/Card/MediaCard";
import { glassSurface } from "@/shared/constants/glass";
import { ShowcaseCard, SubsectionLabel } from "../components";
import { Accent, Dock, DockFact, PlaceActions, PlaceCard, PlaceTitle, Stage, StatusLine } from "../components/PatternB";

const ZONES = ["La Molina", "Surco", "San Borja", "San Isidro", "Miraflores"] as const;

const TRUST = [
  { icon: Ruler, title: "Visita técnica", text: "Medimos sin costo" },
  { icon: Store, title: "Taller y show room", text: "Vea el producto antes" },
  { icon: ShieldCheck, title: "Garantía de 3 meses", text: "En todo lo instalado" },
  { icon: Check, title: "Boleta o factura", text: "Empresa formal con RUC" },
] as const;

const SERVICES = [
  { title: "Ventanas", badge: "Aluminio y vidrio", image: "/images/services-products-01.Ventanas-nova-a10.webp" },
  { title: "Mamparas", badge: "Corredizas y batientes", image: "/images/services-products-02.Mampara-save-mampara01.webp" },
  { title: "Duchas", badge: "Vidrio templado", image: "/images/services-products-03.Ducha-ducha01.webp" },
  { title: "Techos", badge: "Policarbonato y vidrio", image: "/images/services-products-04.Techo-techopoli01.webp" },
] as const;

const PROJECTS = [
  { name: "Palmer", meta: "Breña · 2025" },
  { name: "Vittorie", meta: "Surquillo · 2024" },
  { name: "Elenor", meta: "Magdalena del Mar · 2023" },
] as const;

const HeroStage: React.FC = () => (
  <Stage image="/images/services-general-init01.webp" imageAlt="Ventana corrediza de aluminio con paño fijo superior, instalada en un departamento" objectPosition="center 45%">
    <PlaceCard label="Glass & Aluminum Company">
      <StatusLine label="Vidriería y aluminio" meta="La Molina" />
      <PlaceTitle>
        Ventanas y mamparas <Accent>a su medida</Accent>
      </PlaceTitle>
      <Text mt="3" fontSize="sm" color="text.muted" lineHeight="body">
        Medimos, ensamblamos en nuestro taller e instalamos en {ZONES.slice(0, -1).join(", ")} y {ZONES[ZONES.length - 1]}.
      </Text>
      <PlaceActions>
        <Button variant="primary" flex="1">
          Pedir presupuesto
          <ArrowRight size={16} aria-hidden="true" />
        </Button>
        <Button variant="outline" flex="1">
          Ver obras
        </Button>
      </PlaceActions>
    </PlaceCard>
    <Dock label="Por qué elegirnos">
      {TRUST.map((t) => (
        <DockFact key={t.title} icon={t.icon} title={t.title} text={t.text} />
      ))}
    </Dock>
  </Stage>
);

/** Obra sin foto: mismo marco y misma leyenda de vidrio que las tarjetas con foto. */
const ProjectPending: React.FC<{ name: string; meta: string }> = ({ name, meta }) => (
  <Box position="relative" h={{ base: "260px", sm: "280px", md: "310px" }} borderRadius="card" overflow="hidden" borderWidth="1px" borderColor="border.default" bg="bg.subtle">
    <Text position="absolute" top="4" left="4" fontSize="xs" fontWeight="bold" letterSpacing="label" textTransform="uppercase" color="text.muted">
      [PENDIENTE] Foto de la obra
    </Text>
    <VStack position="absolute" left={{ base: "2", md: "3" }} right={{ base: "2", md: "3" }} bottom={{ base: "2", md: "3" }} align="flex-start" gap="1" p={{ base: "3", md: "4" }} borderRadius="card" {...glassSurface}>
      <Heading as="h3" fontSize={{ base: "xl", md: "2xl" }} fontWeight="700" color="text.heading" lineHeight="tight">
        {name}
      </Heading>
      <HStack gap="1.5" color="text.muted" fontSize="sm">
        <MapPin size={14} aria-hidden="true" />
        <Text>{meta}</Text>
      </HStack>
      <Text fontSize="sm" color="text.muted">
        Cliente: [PENDIENTE]
      </Text>
    </VStack>
  </Box>
);

export const HeroSection: React.FC = () => (
  <VStack align="stretch" gap={{ base: "8", md: "12" }}>
    <ShowcaseCard
      title="Inicio · patrón B"
      description="La foto ocupa el escenario; una tarjeta de vidrio flota arriba a la izquierda con una acción principal negra y una barra inferior resume las pruebas. Es el mismo patrón del mapa inmersivo de ubicación."
    >
      <HeroStage />
    </ShowcaseCard>
    <ShowcaseCard title="Tarjetas de servicio y de obra" description="Foto protagonista con leyenda de vidrio. Sin foto de obra se muestra el marcador, nunca una imagen inventada.">
      <VStack align="stretch" gap="8">
        <VStack align="stretch" gap="4">
          <SubsectionLabel>Servicios</SubsectionLabel>
          <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap="4">
            {SERVICES.map((s) => (
              <MediaCard key={s.title} image={s.image} imageAlt={s.title} badge={s.badge} title={s.title} actionIcon={ArrowRight} />
            ))}
          </SimpleGrid>
        </VStack>
        <VStack align="stretch" gap="4">
          <SubsectionLabel>Obras</SubsectionLabel>
          <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap="4">
            {PROJECTS.map((p) => (
              <ProjectPending key={p.name} name={p.name} meta={p.meta} />
            ))}
          </SimpleGrid>
        </VStack>
      </VStack>
    </ShowcaseCard>
  </VStack>
);
