import React from "react";
import ServicePageContainer from "@features/services/components/ServicePageContainer";

/**
 * @page Detalle de Servicio
 * @description Página dinámica que carga los datos de un servicio específico.
 */
export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ serviceSlug: string }>;
}) {
  const { serviceSlug } = await params;

  return <ServicePageContainer serviceSlug={serviceSlug} />;
}
