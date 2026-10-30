"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Box } from "@chakra-ui/react";
import type { Service } from "@/shared/api/firebase/types";
import { BUILD_SENTINEL } from "@/shared/config/build-sentinel";
import ServicePageLayout from "@/features/services/components/ServicePageLayout";
import { ServiceDetailSkeleton } from "@/features/services/components/ServiceSkeletons";
import { useService } from "@/features/services/hooks/useServices";
import { ErrorView as ErrorPage } from "@/screens/Error";

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
  const { data: pageData, isLoading } = useService(slug, initialData);

  if (!slug || slug === BUILD_SENTINEL) return <ErrorPage />;
  if (isLoading) return <ServiceDetailSkeleton />;
  if (!pageData) return <ErrorPage />;

  return (
    <Box as="section" py={1}>
      <ServicePageLayout pageData={pageData} />
    </Box>
  );
};

export default ServiceDetailView;
