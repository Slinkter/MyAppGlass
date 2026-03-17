import React from "react";
import { useParams } from "react-router-dom";
import ErrorDisplay from "@shared/components/DataLoader/ErrorDisplay";
import ServiceSkeleton from "./ServiceSkeleton";
import ServicePageLayout from "./ServicePageLayout";
import { useServiceData } from "../hooks/useServiceData";

/**
 * @component ServicePageContainer
 * @description Contenedor que maneja la carga de datos del servicio.
 * Optimizado para renderizado directo para evitar lags en transiciones.
 */
const ServicePageContainer = () => {
  const { serviceSlug } = useParams();
  const { pageData, isLoading, error } = useServiceData(serviceSlug);

  if (isLoading) {
    return <ServiceSkeleton />;
  }

  if (error) {
    return <ErrorDisplay message={error} />;
  }

  return (
    <Suspense fallback={<ServiceSkeleton />}>
      <ServicePageLayout pageData={pageData} />
    </Suspense>
  );
};

export default ServicePageContainer;
