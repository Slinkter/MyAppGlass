import React, { Suspense } from "react";
import { useParams } from "react-router-dom";
import ErrorDisplay from "@shared/components/DataLoader/ErrorDisplay";
import ServiceSkeleton from "./ServiceSkeleton";
import { useServiceData } from "../hooks/useServiceData";

// Lazy load del layout para mejorar el tiempo de carga inicial
const ServicePageLayout = React.lazy(() => import("./ServicePageLayout"));

/**
 * @component ServicePageContainer
 * @description Contenedor que maneja la carga de datos y la carga diferida (lazy loading)
 * del layout de la página de servicios.
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
