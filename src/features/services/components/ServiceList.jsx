import React, { useState, useEffect, useMemo } from "react";
import { Box, Spinner } from "@chakra-ui/react";
import ItemGridLayout from "@shared/components/Layout/ItemGridLayout";
import ServiceCard from "./ServiceCard";
import ServiceListSkeleton from "./ServiceListSkeleton";
import DataLoader from "@shared/components/DataLoader/DataLoader";
import { getServices } from "../services/serviceService";
import useIntersectionObserver from "@shared/hooks/observers/useIntersectionObserver";
// Componente wrapper eliminado para optimización

/**
 * @component ServiceList
 * @description Lista de servicios usando el componente genérico ItemGridLayout.
 * Muestra todos los servicios ofrecidos por la empresa en un grid responsive.
 * Implementa Infinite Scroll para optimizar el rendimiento.
 *
 * @returns {JSX.Element} Grid de servicios con SEO y loading state
 */
const ServiceList = React.memo(() => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [services, setServices] = useState([]);

    // Ref para el sentinel del Infinite Scroll (Callback Ref)
    const [sentinelRef, setSentinelRef] = useState(null);
    const isSentinelVisible = useIntersectionObserver(sentinelRef, {
        threshold: 0.1,
    });

    useEffect(() => {
        const fetchServices = async () => {
            setIsLoading(true);
            try {
                const data = await getServices();
                setServices(data);
            } catch (err) {
                setError(err.message || "Error al cargar los servicios.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchServices();
    }, []);

    // --- Lógica de Infinite Scroll ---
    const [visibleCount, setVisibleCount] = useState(6); // Cargar solo 6 al inicio
    const visibleServices = useMemo(
        () => services.slice(0, visibleCount),
        [services, visibleCount]
    );
    const hasMore = visibleCount < services.length;

    const handleLoadMore = () => {
        if (hasMore) {
            setVisibleCount((prev) => Math.min(prev + 6, services.length));
        }
    };

    // Efecto que reacciona cuando el usuario llega al final
    useEffect(() => {
        if (isSentinelVisible && hasMore && !isLoading) {
            handleLoadMore();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSentinelVisible, hasMore, isLoading]);

    return (
        <DataLoader
            isLoading={isLoading}
            error={error}
            loadingComponent={<ServiceListSkeleton />}
        >
            <ItemGridLayout
                title="SERVICIOS"
                subtitle="Fabricación & Instalación"
                seoTitle="Servicios de Vidriería y Aluminio en La Molina - GYA Company"
                seoDescription="Descubre nuestros servicios de instalación y fabricación de productos de vidriería y aluminio de alta calidad en La Molina."
                seoCanonicalUrl="https://www.gyacompany.com/servicios"
                items={visibleServices}
                ItemComponent={ServiceCard}
                containerProps={{ pb: 0 }}
            />

            {/* Sentinel para Infinite Scroll */}
            {!isLoading && hasMore && (
                <Box
                    ref={setSentinelRef}
                    h="60px"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    mb={12}
                >
                    {/* Spinner opcional para indicar que se están cargando más */}
                    <Spinner size="md" color="primary.500" thickness="3px" />
                </Box>
            )}

            {/* Espacio final */}
            {!hasMore && !isLoading && <Box h="20px" mb={12} />}
        </DataLoader>
    );
});

ServiceList.displayName = "ServiceList";
export default ServiceList;
