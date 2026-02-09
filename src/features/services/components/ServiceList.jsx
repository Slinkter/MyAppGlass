import React, { useState, useEffect } from "react";
import ItemGridLayout from "@shared/components/Layout/ItemGridLayout";
import ServiceCard from "./ServiceCard";
import ServiceListSkeleton from "./ServiceListSkeleton";
import DataLoader from "@shared/components/DataLoader/DataLoader";
import { getServices } from "../services/serviceService";

/**
 * @component ServiceList
 * @description Lista de servicios usando el componente genérico ItemGridLayout.
 * Muestra todos los servicios ofrecidos por la empresa en un grid responsive.
 * Con animación escalonada para mejor experiencia visual.
 *
 * @returns {JSX.Element} Grid de servicios con SEO y loading state
 */
const ServiceList = React.memo(() => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [services, setServices] = useState([]);

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
                items={services}
                ItemComponent={ServiceCard}
                containerProps={{ pb: 12 }}
            />
        </DataLoader>
    );
});

ServiceList.displayName = "ServiceList";
export default ServiceList;
