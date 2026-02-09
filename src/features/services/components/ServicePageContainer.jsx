import React, { useState, useEffect, Suspense } from "react";
import { useParams } from "react-router-dom";
import { getServicePageData } from "../services/serviceService";
import ErrorDisplay from "@shared/components/DataLoader/ErrorDisplay";
import ServiceSkeleton from "./ServiceSkeleton";

// Lazy load del layout para mejorar el tiempo de carga inicial
const ServicePageLayout = React.lazy(() => import("./ServicePageLayout"));

/**
 * @component ServicePageContainer
 * @description Contenedor que maneja la carga de datos y la carga diferida (lazy loading)
 * del layout de la página de servicios.
 */
const ServicePageContainer = () => {
    const { serviceSlug } = useParams();
    const [pageData, setPageData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const data = await getServicePageData(serviceSlug);
                setPageData(data);
            } catch (err) {
                setError(
                    err.message ||
                        `No se encontraron datos para el servicio: "${serviceSlug}".`
                );
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [serviceSlug]);

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
