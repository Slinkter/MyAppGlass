import React, { Suspense } from "react";
import { useParams } from "react-router-dom";
import { servicePageDataMap } from "@/data/servicePageDataMap";
import ErrorDisplay from "@/components/common/ErrorDisplay";
import ServiceSkeleton from "./components/ServiceSkeleton";

// Lazy load del layout para mejorar el tiempo de carga inicial
const ServicePageLayout = React.lazy(() => import("./ServicePageLayout"));

/**
 * @component ServicePageContainer
 * @description Contenedor que maneja la carga de datos y la carga diferida (lazy loading)
 * del layout de la página de servicios.
 */
const ServicePageContainer = () => {
  const { serviceSlug } = useParams();
  const pageData = servicePageDataMap[serviceSlug];

  if (!pageData) {
    return (
      <ErrorDisplay
        message={`No se encontraron datos para el servicio: "${serviceSlug}". Por favor, verifique la URL.`}
      />
    );
  }

  return (
    <Suspense fallback={<ServiceSkeleton />}>
      <ServicePageLayout pageData={pageData} />
    </Suspense>
  );
};

export default ServicePageContainer;
