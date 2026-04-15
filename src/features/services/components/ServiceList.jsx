/**
 * @file ServiceList.jsx
 * @description Orchestrator for the services gallery with category filter.
 * Refactored to match ProjectsList aesthetics (Button Pills).
 * @module services/components
 */

import React, { useMemo, useState, useRef, useEffect } from "react";
import { Box, HStack, Button } from "@chakra-ui/react";
import ItemGridLayout from "@shared/components/Layout/ItemGridLayout";
import ServiceCard from "./ServiceCard";
import { services } from "../data/services";
import useIntersectionObserver from "@shared/hooks/observers/useIntersectionObserver";
import { EmptyState } from "@/components/ui/empty-state";
import { LuSearch } from "react-icons/lu";

const CATEGORIES = ["Todos", "Vidrio", "Aluminio", "Cerramientos"];

/**
 * @component ServiceList
 * @description Renderiza la lista de servicios con filtro por categoría e Infinite Scroll.
 */
const ServiceList = React.memo(() => {
  const allServices = useMemo(() => services, []);
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [displayCount, setDisplayCount] = useState(6);
  const loaderRef = useRef(null);

  // Filter services by active category
  const filteredServices = useMemo(() => {
    if (activeCategory === "Todos") return allServices;
    return allServices.filter((s) => s.category === activeCategory);
  }, [allServices, activeCategory]);

  // Reset display count when filter changes
  useEffect(() => {
    setDisplayCount(6);
  }, [activeCategory]);

  const rootMargin = typeof window !== "undefined" && window.innerWidth < 768 ? "200px" : "400px";

  useIntersectionObserver(
    loaderRef,
    () => {
      if (displayCount >= filteredServices.length) return;
      setDisplayCount((prev) => Math.min(prev + 6, filteredServices.length));
    },
    { threshold: 0.01, rootMargin }
  );

  const preparedServices = useMemo(() => {
    return filteredServices.slice(0, displayCount).map((s) => ({ ...s, preloaded: true }));
  }, [filteredServices, displayCount]);

  return (
    <ItemGridLayout
      title="SERVICIOS"
      subtitle="Soluciones en Vidrio y Aluminio"
      seoTitle="Servicios de Vidriería y Aluminio en La Molina - GYA Company"
      seoDescription="Descubre nuestros servicios de instalación y fabricación de productos de vidriería y aluminio de alta calidad en La Molina."
      seoCanonicalUrl="https://www.gyacompany.com/servicios"
      columns={{ base: 1, sm: 2, md: 3 }}
    >
      {/* Filter Pills (Matching Projects Style) */}
      <Box gridColumn="1 / -1" w="full" mb={8}>
        <HStack gap={2} justify="center" flexWrap="wrap">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <Button
                key={cat}
                size="sm"
                px={6}
                borderRadius="full"
                fontWeight="bold"
                fontSize="xs"
                letterSpacing="wider"
                textTransform="uppercase"
                variant={isActive ? "solid" : "ghost"}
                bg={isActive ? "primary.900" : "bg.subtle"}
                color={isActive ? "white" : "text.body"}
                _dark={{
                  bg: isActive ? "primary.300" : "whiteAlpha.100",
                  color: isActive ? "primary.900" : "gray.300",
                }}
                _hover={{
                  bg: isActive ? "primary.800" : "bg.muted",
                  _dark: { bg: isActive ? "primary.200" : "whiteAlpha.200" }
                }}
                transition="all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </Button>
            );
          })}
        </HStack>
      </Box>

      {filteredServices.length === 0 ? (
        <Box gridColumn="1 / -1" py={20}>
          <EmptyState
            icon={<LuSearch />}
            title="No se encontraron servicios"
            description={`No hay resultados para la categoría "${activeCategory}" en este momento.`}
          />
        </Box>
      ) : (
        preparedServices.map((service, index) => (
          <ItemGridLayout.Item
            key={`${activeCategory}-${service.id}`}
            delay={(index % 6) * 0.08}
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
        ))
      )}

      {/* Intersection Sensor for Infinite Scroll */}
      {displayCount < filteredServices.length && (
        <Box ref={loaderRef} gridColumn="1 / -1" w="full" h="20px" py={10} />
      )}
    </ItemGridLayout>
  );
});

ServiceList.displayName = "ServiceList";
export default ServiceList;
