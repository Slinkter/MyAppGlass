"use client";

import React from "react";
import { Box, HStack, SimpleGrid, Text } from "@chakra-ui/react";
import { ShowcaseCard, ShowcaseStack } from "../components";
import { Button } from "@/shared/ui/button";
import ServiceCard from "@/entities/service/ui/ServiceCard";
import ProjectCardContent from "@/entities/project/ui/ProjectCardContent";
import { ClientTestimonialCard } from "@/features/home/components/clients/ClientTestimonialCard";

const CARD_GRID = { base: 1, md: 2, lg: 3 } as const;

const GROUP_LABEL_PROPS = {
  fontSize: "xs",
  fontWeight: "medium",
  textTransform: "uppercase",
  letterSpacing: "0.14em",
  color: "text.muted",
} as const;

export const EditorialCardsShowcase: React.FC = () => {
  return (
    <ShowcaseStack>
      {/* 1. Tarjetas Reales del Catálogo de Servicios */}
      <Box minW="0" maxW="100%" overflowWrap="break-word">
        <ShowcaseCard
          title="Servicios — Tarjetas editoriales del catálogo"
          description="Tarjeta real de servicios con fotografía a sangre, luz suave y zoom lento al pasar el cursor. Cada tarjeta lleva a su ficha técnica."
          badge="entities/service"
        >
          <HStack justify="space-between" wrap="wrap" gap="4" mb="6">
            <Text {...GROUP_LABEL_PROPS}>Catálogo · 3 líneas destacadas</Text>
            <Button variant="outline" size="md" asChild>
              <a href="#servicios">Ver todos los servicios</a>
            </Button>
          </HStack>
          <SimpleGrid columns={CARD_GRID} gap={{ base: "4", md: "6" }}>
            <ServiceCard
              name="Ventanas de Aluminio"
              category="Serie 62"
              description="Aislamiento antirruido y térmico con perfiles de alta hermeticidad."
              image="/images/services-products-01.Ventanas-nova-a10.webp"
              plink="/servicios/ventana"
            />
            <ServiceCard
              name="Mamparas de Cristal"
              category="Templado"
              description="Apertura telescópica y perfiles anodizados de alta resistencia."
              image="/images/services-products-02.Mampara-save-mampara01.webp"
              plink="/servicios/mampara"
            />
            <ServiceCard
              name="Duchas & Baños"
              category="Templado"
              description="Sistemas corredizos y batientes con herrajes importados."
              image="/images/services-products-03.Ducha-ducha01.webp"
              plink="/servicios/ducha"
            />
          </SimpleGrid>
        </ShowcaseCard>
      </Box>

      {/* 2. Tarjetas Reales de Proyectos */}
      <Box minW="0" maxW="100%" overflowWrap="break-word">
        <ShowcaseCard
          title="Proyectos — Tarjetas de obras terminadas"
          description="Tarjeta real de proyectos con ubicación, año de finalización y botón circular para ver la obra."
          badge="entities/project"
        >
          <HStack justify="space-between" wrap="wrap" gap="4" mb="6">
            <Text {...GROUP_LABEL_PROPS}>Obras recientes</Text>
            <Button variant="outline" size="md" asChild>
              <a href="#proyectos">Ver todas las obras</a>
            </Button>
          </HStack>
          <SimpleGrid columns={CARD_GRID} gap={{ base: "4", md: "6" }}>
            <ProjectCardContent
              residencial="Residencial Los Fresnos"
              address="La Molina, Lima"
              year="2026"
              image="/images/home-img_t01.webp"
              onExplore={() => {}}
            />
            <ProjectCardContent
              residencial="Edificio Corporativo El Derby"
              address="Surco, Lima"
              year="2025"
              image="/images/home-img_t02.webp"
              onExplore={() => {}}
            />
          </SimpleGrid>
        </ShowcaseCard>
      </Box>

      {/* 3. Tarjeta de Cliente Corporativo */}
      <Box minW="0" maxW="100%" overflowWrap="break-word">
        <ShowcaseCard
          title="Clientes — Tarjetas de referencia por sector"
          description="Tarjeta real de clientes con microbordes finos y valoración del proyecto."
          badge="features/home"
        >
          <HStack justify="space-between" wrap="wrap" gap="4" mb="6">
            <Text {...GROUP_LABEL_PROPS}>Sectores atendidos</Text>
            <Button variant="ghost" size="md" asChild>
              <a href="#clientes">Ver clientes</a>
            </Button>
          </HStack>
          <SimpleGrid columns={CARD_GRID} gap={{ base: "4", md: "6" }}>
            <ClientTestimonialCard
              nameClient="Constructora Palmer"
              descClient="Ventanas Serie 35 & Mamparas"
              image="/images/clients-building.webp"
            />
            <ClientTestimonialCard
              nameClient="Vittorie Arquitectura"
              descClient="Barandas de Vidrio Templado"
              image="/images/clients-sectoroffices.webp"
            />
            <ClientTestimonialCard
              nameClient="Residencial Los Fresnos"
              descClient="Fachada Integral & Techos"
              image="/images/clients-sectorhogar.webp"
            />
          </SimpleGrid>
        </ShowcaseCard>
      </Box>
    </ShowcaseStack>
  );
};
