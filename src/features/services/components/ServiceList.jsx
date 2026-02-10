/**
 * @file ServiceList.jsx
 * @description Orchestrator for the services gallery, using `ItemGridLayout` to list all company services.
 * @module services/components
 */

import React, { useMemo } from "react";
import ItemGridLayout from "@shared/components/Layout/ItemGridLayout";
import ServiceCard from "./ServiceCard";
import { getServices } from "../services/serviceService";
const ServiceList = React.memo(() => {
  // Obtenemos los datos directamente (síncrono)
  const services = getServices();

  // Añadimos la propiedad 'preloaded' o 'forceShow' para indicar que deben mostrarse ya
  // Aunque al ser síncrono, ImageWithFallback manejará la carga natural del navegador.
  // Pasamos forceShow={true} para saltarnos transiciones innecesarias si la imagen ya está en caché.
  const preparedServices = useMemo(() => {
    return services.map((s) => ({ ...s, preloaded: true }));
  }, [services]);

  return (
    <ItemGridLayout
      title="SERVICIOS"
      subtitle="Fabricación & Instalación"
      seoTitle="Servicios de Vidriería y Aluminio en La Molina - GYA Company"
      seoDescription="Descubre nuestros servicios de instalación y fabricación de productos de vidriería y aluminio de alta calidad en La Molina."
      seoCanonicalUrl="https://www.gyacompany.com/servicios"
      containerProps={{ pb: 12 }}
    >
      {preparedServices.map((service, index) => (
        <ItemGridLayout.Item key={service.id}>
          <ServiceCard
            {...service}
            // LCP Optimization: Load first 2 images eagerly
            loading={index < 2 ? "eager" : "lazy"}
            fetchPriority={index < 2 ? "high" : "auto"}
          />
        </ItemGridLayout.Item>
      ))}
    </ItemGridLayout>
  );
});

ServiceList.displayName = "ServiceList";
export default ServiceList;
