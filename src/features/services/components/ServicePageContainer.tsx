"use client";

import React from "react";
import ErrorDisplay from "@shared/components/DataLoader/ErrorDisplay";
import ServiceSkeleton from "./ServiceSkeleton";
import ServicePageLayout from "./ServicePageLayout";
import { useServiceData } from "../hooks/useServiceData";

export interface ServicePageContainerProps {
  serviceSlug: string | undefined;
}

/**
 * @component ServicePageContainer
 * @description Contenedor que maneja la carga de datos del servicio.
 * Optimizado para Next.js recibiendo el slug como prop.
 */
const ServicePageContainer = ({ serviceSlug }: ServicePageContainerProps) => {
  const { pageData, isLoading, error } = useServiceData(serviceSlug);

  if (isLoading) {
    return <ServiceSkeleton />;
  }

  if (error || !pageData) {
    return <ErrorDisplay message={error || "Servicio no encontrado"} />;
  }

  return <ServicePageLayout pageData={pageData} />;
};

export default ServicePageContainer;
