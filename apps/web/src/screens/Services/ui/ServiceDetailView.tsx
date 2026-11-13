"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Box } from "@chakra-ui/react";
import type { Service } from "@/shared/api/firebase/types";
import { BUILD_SENTINEL } from "@/shared/config/build-sentinel";
import ServicePageLayout from "@/features/services/components/ServicePageLayout";
import { ServiceDetailSkeleton } from "@/entities/service/ui/ServiceSkeletons";
import { useService } from "@/entities/service/api/useServices";
import type { ServicePageData } from "@/entities/service/model";
import { usePublishedSystems } from "@/entities/system";
import { ChevronRight } from "lucide-react";
import ErrorPage from "@/shared/components/ErrorView";

interface ServiceDetailViewProps {
  serviceSlug?: string;
  /** Servicio leído de Firestore en build (primer render, para el HTML exportado). */
  initialData?: Service;
}

/**
 * Detalle de servicio: el primer render usa `initialData` y luego Firestore en cliente
 * lo refresca. Se usa en `/servicios/[serviceSlug]` y en la ruta cliente `/servicios/ver?slug=`.
 * En la página centinela (`/servicios/_`, sin datos de build) el slug sale de la URL.
 */
const ServiceDetailView: React.FC<ServiceDetailViewProps> = ({ serviceSlug, initialData }) => {
  const pathname = usePathname();
  const slug =
    serviceSlug === BUILD_SENTINEL
      ? pathname?.split("/").filter(Boolean).pop()
      : serviceSlug;
  const { data: baseData, isLoading } = useService(slug, initialData);
  const publishedSystems = usePublishedSystems(slug);

  // Sistemas publicados desde /admin/sistemas: se suman a los que ya tiene el servicio.
  // Si uno coincide por nombre, solo aporta su descripción; si es nuevo, entra sin fotos.
  const pageData = React.useMemo<ServicePageData | null | undefined>(() => {
    if (!baseData || publishedSystems.length === 0) return baseData;
    const norm = (v: string) => v.trim().toLowerCase();
    const systems = baseData.systems.map((s) => {
      const match = publishedSystems.find((p) => norm(p.nombre) === norm(s.label));
      return match ? { ...s, description: match.descripcion } : s;
    });
    const imageLists = [...baseData.imageLists];
    for (const p of publishedSystems) {
      if (systems.some((s) => norm(s.label) === norm(p.nombre))) continue;
      systems.push({ label: p.nombre, icon: ChevronRight, description: p.descripcion });
      imageLists.push([]);
    }
    return { ...baseData, systems, imageLists };
  }, [baseData, publishedSystems]);

  if (!slug || slug === BUILD_SENTINEL) return <ErrorPage />;
  if (isLoading) return <ServiceDetailSkeleton />;
  if (!pageData) return <ErrorPage />;

  return (
    <Box as="section" py={1}>
      <ServicePageLayout pageData={pageData} serviceSlug={slug} />
    </Box>
  );
};

export default ServiceDetailView;
