"use client";

import React from "react";
import {
  Box,
  VStack,
  HStack,
  SimpleGrid,
  Card,
  Badge,
} from "@chakra-ui/react";
import ServiceCard from "@/features/services/components/ServiceCard";
import ProjectCardContent from "@/features/projects/components/ProjectCardContent";
import ClientCard from "@/features/home/components/clients/ClientCard";

export const EditorialCardsShowcase: React.FC = () => {
  return (
    <VStack gap="8" align="stretch">
      {/* 1. Tarjetas Reales del Catálogo de Servicios */}
      <Card.Root bg="bg.surface" borderColor="border.default" p="6" borderRadius="card">
        <Card.Header pb="4">
          <HStack justify="space-between" wrap="wrap">
            <Box>
              <Card.Title fontSize="xl">ServiceCard — Tarjeta Editorial de Servicios (Producción)</Card.Title>
              <Card.Description>
                Componente real (`features/services/components/ServiceCard.tsx`) con fotografía a sangre, gradación de luz fina, píldora frosted glass y zoom cinemático al hover.
              </Card.Description>
            </Box>
            <Badge colorPalette="blue" px="3" py="1" borderRadius="full">features/services</Badge>
          </HStack>
        </Card.Header>
        <Card.Body>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="6">
            <ServiceCard
              name="Ventanas de Aluminio"
              category="Serie 62 Antirruido"
              description="Aislamiento acústico y térmico con doble vidriado hermético."
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
              category="Acero Inox"
              description="Sistemas corredizos y batientes con herrajes importados."
              image="/images/services-products-03.Ducha-ducha01.webp"
              plink="/servicios/ducha"
            />
          </SimpleGrid>
        </Card.Body>
      </Card.Root>

      {/* 2. Tarjetas Reales de Proyectos */}
      <Card.Root bg="bg.surface" borderColor="border.default" p="6" borderRadius="card">
        <Card.Header pb="4">
          <HStack justify="space-between" wrap="wrap">
            <Box>
              <Card.Title fontSize="xl">ProjectCardContent — Tarjeta Arquitectónica de Obras</Card.Title>
              <Card.Description>
                Componente real (`features/projects/components/ProjectCardContent.tsx`) con ubicación geográfica, año de finalización y botón circular de navegación.
              </Card.Description>
            </Box>
            <Badge colorPalette="purple" px="3" py="1" borderRadius="full">features/projects</Badge>
          </HStack>
        </Card.Header>
        <Card.Body>
          <SimpleGrid columns={{ base: 1, md: 2 }} gap="6">
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
        </Card.Body>
      </Card.Root>

      {/* 3. Tarjeta de Cliente Corporativo */}
      <Card.Root bg="bg.surface" borderColor="border.default" p="6" borderRadius="card">
        <Card.Header pb="4">
          <HStack justify="space-between" wrap="wrap">
            <Box>
              <Card.Title fontSize="xl">ClientCard — Testimonial & Sector Corporativo</Card.Title>
              <Card.Description>
                Componente real (`features/home/components/clients/ClientCard.tsx`) con microbordes y rating.
              </Card.Description>
            </Box>
            <Badge colorPalette="teal" px="3" py="1" borderRadius="full">features/home</Badge>
          </HStack>
        </Card.Header>
        <Card.Body>
          <SimpleGrid columns={{ base: 1, md: 3 }} gap="6">
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
        </Card.Body>
      </Card.Root>
    </VStack>
  );
};
