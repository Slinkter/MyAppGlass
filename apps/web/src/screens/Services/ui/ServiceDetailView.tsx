"use client";

import React from "react";
import { Box } from "@chakra-ui/react";
import ServicePageLayout from "@/features/services/components/ServicePageLayout";
import { ServiceDetailSkeleton } from "@/features/services/components/ServiceSkeletons";
import { useService } from "@/features/services/hooks/useServices";
import { ErrorView as ErrorPage } from "@/screens/Error";

interface ServiceDetailViewProps {
  serviceSlug?: string;
}

/**
 * Detalle de servicio: Firestore en cliente con fallback a datos locales.
 * Se usa en `/servicios/[serviceSlug]` y en la ruta cliente `/servicios/ver?slug=`.
 */
const ServiceDetailView: React.FC<ServiceDetailViewProps> = ({ serviceSlug }) => {
  const { data: pageData, isLoading } = useService(serviceSlug);

  if (!serviceSlug) return <ErrorPage />;
  if (isLoading) return <ServiceDetailSkeleton />;
  if (!pageData) return <ErrorPage />;

  return (
    <Box as="section" py={1}>
      <ServicePageLayout pageData={pageData} serviceSlug={serviceSlug} />
    </Box>
  );
};

export default ServiceDetailView;
