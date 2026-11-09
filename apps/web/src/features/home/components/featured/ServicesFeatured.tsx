"use client";

/**
 * @file ServicesFeatured.tsx
 * @description Servicios destacados de la home: 6 tarjetas + enlace a todos los servicios.
 * Los datos vienen de Firestore (`useServices`), igual que la lista completa; no hay catálogo local.
 */

import React from "react";
import { Container } from "@chakra-ui/react";
import type { Service } from "@/shared/api/firebase/types";
import { useServices } from "@features/services/hooks/useServices";
import ServiceCard from "@features/services/components/ServiceCard";
import { Reveal } from "@shared/components/motion/Reveal";
import { SectionHeader } from "../shared/SectionHeader";
import { CardRail } from "./CardRail";

const FEATURED_COUNT = 6;

export interface ServicesFeaturedProps {
  initialData?: Service[];
}

export const ServicesFeatured: React.FC<ServicesFeaturedProps> = ({ initialData }) => {
  const { data } = useServices(initialData);
  const all = data ?? [];
  const items = all.slice(0, FEATURED_COUNT);

  return (
    <Container maxW="7xl" px={{ base: 4, sm: 6, md: 8 }}>
      <SectionHeader
        eyebrow="Servicios"
        title="Lo que fabricamos e instalamos"
        description="Ventanas, mamparas, duchas, techos y más, a la medida de tu espacio."
        action={{
          href: "/servicios/ver",
          label: all.length > FEATURED_COUNT ? `Ver los ${all.length} servicios` : "Ver todos los servicios",
        }}
      />
      <CardRail label="Servicios destacados">
        {items.map((service, index) => (
          <Reveal key={service.id} index={index % 3}>
            <ServiceCard
              image={service.image}
              name={service.name}
              category={service.category}
              description={service.description}
              plink={service.plink}
              index={index}
            />
          </Reveal>
        ))}
      </CardRail>
    </Container>
  );
};

export default ServicesFeatured;
