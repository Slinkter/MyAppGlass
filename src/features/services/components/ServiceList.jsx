/**
 * @file ServiceList.jsx
 * @description Orchestrator for the services gallery, showing all services at once.
 * @module services/components
 */

import React, { useMemo } from "react";
import ItemGridLayout from "@shared/components/Layout/ItemGridLayout";
import ServiceCard from "./ServiceCard";
import { getServices } from "../services/serviceService";

/**
 * @component ServiceList
 * @description Renderiza la lista completa de servicios de la empresa.
 * Renderizado en cascada con delay progresivo.
 */
const ServiceList = React.memo(() => {
  const services = getServices();

  const preparedServices = useMemo(() => {
    return services.map((s) => ({ ...s, preloaded: true }));
  }, [services]);

  return (
    <ItemGridLayout
      title="SERVICIOS"
      subtitle=""
      seoTitle="Servicios de Vidriería y Aluminio en La Molina - GYA Company"
      seoDescription="Descubre nuestros servicios de instalación y fabricación de productos de vidriería y aluminio de alta calidad en La Molina."
      seoCanonicalUrl="https://www.gyacompany.com/servicios"
      columns={{ base: 1, sm: 2, md: 3 }}
    >
      {preparedServices.map((service, index) => (
        <ItemGridLayout.Item 
          key={service.id}
          delay={index * 0.15}
        >
          <ServiceCard
            image={service.image}
            name={service.name}
            description={service.description}
            plink={service.plink}
            loading={index < 3 ? "eager" : "lazy"}
            fetchPriority={index < 3 ? "high" : "auto"}
          />
        </ItemGridLayout.Item>
      ))}
    </ItemGridLayout>
  );
});

ServiceList.displayName = "ServiceList";
export default ServiceList;
