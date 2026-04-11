/**
 * @file ServiceList.jsx
 * @description Orchestrator for the services gallery, showing all services at once.
 * @module services/components
 */

import React, { useMemo, useState, useRef, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import ItemGridLayout from "@shared/components/Layout/ItemGridLayout";
import ServiceCard from "./ServiceCard";
import { getServices } from "../services/serviceService";
import useIntersectionObserver from "@shared/hooks/observers/useIntersectionObserver";

/**
 * @component ServiceList
 * @description Renderiza la lista de servicios con Infinite Scroll (O1) para máximo rendimiento.
 */
const ServiceList = React.memo(() => {
  const allServices = useMemo(() => getServices(), []);
  const [displayCount, setDisplayCount] = useState(6);
  const loaderRef = useRef(null);
  const isIntersecting = useIntersectionObserver(loaderRef, { 
    threshold: 0.01,
    rootMargin: "400px" // Carga proactiva: 400px antes de llegar al final
  });

  // Infinite Scroll Logic: Load more pro-actively
  useEffect(() => {
    if (isIntersecting && displayCount < allServices.length) {
      // Sincronización con el refresco de pantalla
      const frame = requestAnimationFrame(() => {
        setDisplayCount((prev) => Math.min(prev + 6, allServices.length));
      });
      return () => cancelAnimationFrame(frame);
    }
  }, [isIntersecting, allServices.length, displayCount]);

  const preparedServices = useMemo(() => {
    return allServices.slice(0, displayCount).map((s) => ({ ...s, preloaded: true }));
  }, [allServices, displayCount]);

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
          delay={(index % 6) * 0.1}
        >
          <ServiceCard
            image={service.image}
            name={service.name}
            description={service.description}
            plink={service.plink}
            isLCP={index < 3}
            loading={index < 3 ? "eager" : "lazy"}
            fetchpriority={index < 3 ? "high" : "auto"}
          />
        </ItemGridLayout.Item>
      ))}

      {/* Intersection Sensor for O1 Rendering */}
      {displayCount < allServices.length && (
        <Box ref={loaderRef} w="full" h="20px" py={10} />
      )}
    </ItemGridLayout>
  );
});

ServiceList.displayName = "ServiceList";
export default ServiceList;
