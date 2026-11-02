"use client";

import React from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { RESPONSIVE_GRIDS } from "@/shared/constants/layout";
import { ShowcaseCard, ShowcaseStack } from "../components";
import ServiceCard from "@/features/services/components/ServiceCard";
import ProjectCardContent from "@/features/projects/components/ProjectCardContent";
import ClientCard from "@/features/home/components/clients/ClientCard";

export const EditorialCardsShowcase: React.FC = () => {
  return (
    <ShowcaseStack>
      {/* 1. Tarjetas Reales del Catálogo de Servicios */}
      <Box minW="0" maxW="100%" overflowWrap="break-word">
        <ShowcaseCard
          title="ServiceCard — Tarjeta Editorial de Servicios"
          description="Componente real (`features/services/components/ServiceCard.tsx`) con fotografía a sangre, gradación de luz fina, píldora frosted glass y zoom cinemático al hover."
          badge="features/services"
        >
          <SimpleGrid columns={RESPONSIVE_GRIDS.cards} gap={{ base: "4", md: "6" }}>
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
          title="ProjectCardContent — Tarjeta Arquitectónica de Obras"
          description="Componente real (`features/projects/components/ProjectCardContent.tsx`) con ubicación geográfica, año de finalización y botón circular de navegación."
          badge="features/projects"
        >
          <SimpleGrid columns={RESPONSIVE_GRIDS.cards} gap={{ base: "4", md: "6" }}>
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
          title="ClientCard — Testimonial & Sector Corporativo"
          description="Componente real (`features/home/components/clients/ClientCard.tsx`) con microbordes y rating."
          badge="features/home"
        >
          <SimpleGrid columns={RESPONSIVE_GRIDS.cards} gap={{ base: "4", md: "6" }}>
            <ClientCard
              nameClient="Constructora Palmer"
              descClient="Ventanas Serie 35 & Mamparas"
              image="/images/clients-building.webp"
            />
            <ClientCard
              nameClient="Vittorie Arquitectura"
              descClient="Barandas de Vidrio Templado"
              image="/images/clients-sectoroffices.webp"
            />
            <ClientCard
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
