"use client";
import React from "react";
import { useParams } from "next/navigation";
import ErrorDisplay from "@shared/components/DataLoader/ErrorDisplay";
import ServiceSkeleton from "./ServiceSkeleton";
import ServicePageLayout from "./ServicePageLayout";
import { useServiceData } from "../hooks/useServiceData";

/**
 * @component ServicePageContainer
 * @description Contenedor que maneja la carga de datos del servicio.
 */
const ServicePageContainer: React.FC = () => {
  const { serviceSlug } = useParams<{ serviceSlug: string }>();
  const { pageData, isLoading, error } = useServiceData(serviceSlug || "");

  if (isLoading) {
    return <ServiceSkeleton />;
  }

  if (error) {
    return <ErrorDisplay message={error} />;
  }

  if (!pageData) {
    return null;
  }

  return <ServicePageLayout pageData={pageData} />;
};

export default ServicePageContainer;
