"use client";
import React, { useMemo, useState, useRef, useEffect } from "react";
import { Box, HStack, Button } from "@chakra-ui/react";
import ItemGridLayout from "@shared/components/Layout/ItemGridLayout";
import ServiceCard from "./ServiceCard";
import { services } from "../data/services";
import useIntersectionObserver from "@shared/hooks/observers/useIntersectionObserver";
import { EmptyState } from "@/components/ui/empty-state";
import { LuSearch } from "react-icons/lu";
import ServiceListSkeleton from "./ServiceListSkeleton";
import { Service } from "../services/serviceService";

const CATEGORIES = ["Todos", "Vidrio", "Aluminio", "Cerramientos"];

export interface ServiceData extends Service {
  category: string;
  description: string;
}

/**
 * @component ServiceList
 * @description Renderiza la lista de servicios con filtro por categoría e Infinite Scroll.
 */
const ServiceList: React.FC = React.memo(() => {
  const [isLoading, setIsLoading] = useState(true);
  const allServices = useMemo(() => services as ServiceData[], []);
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [displayCount, setDisplayCount] = useState(6);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredServices = useMemo(() => {
    if (activeCategory === "Todos") return allServices;
    return allServices.filter((s) => s.category === activeCategory);
  }, [allServices, activeCategory]);

  const rootMargin = typeof window !== "undefined" && window.innerWidth < 768 ? "200px" : "400px";

  useIntersectionObserver(
    loaderRef,
    () => {
      if (displayCount >= filteredServices.length) return;
      setDisplayCount((prev) => Math.min(prev + 6, filteredServices.length));
    },
    { threshold: 0.01, rootMargin }
  );

  useEffect(() => {
    setDisplayCount(6);
  }, [activeCategory]);

  const preparedServices = useMemo(() => {
    return filteredServices.slice(0, displayCount).map((s) => ({ ...s, preloaded: true }));
  }, [filteredServices, displayCount]);

  if (isLoading) {
    return <ServiceListSkeleton />;
  }

  return (
    <ItemGridLayout
      title="SERVICIOS"
      subtitle="Soluciones en Vidrio y Aluminio"
      seoTitle="Servicios de Vidriería y Aluminio en La Molina - GYA Company"
      seoDescription="Descubre nuestros servicios de instalación y fabricación de productos de vidriería y aluminio de alta calidad en La Molina."
      seoCanonicalUrl="https://www.gyacompany.com/servicios"
      columns={{ base: 1, sm: 2, md: 3 }}
    >
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
              index={index}
              isLCP={index < 3}
              loading={index < 3 ? "eager" : "lazy"}
            />
          </ItemGridLayout.Item>
        ))
      )}

      {displayCount < filteredServices.length && (
        <Box ref={loaderRef} gridColumn="1 / -1" w="full" h="20px" py={10} />
      )}
    </ItemGridLayout>
  );
});

ServiceList.displayName = "ServiceList";
export default ServiceList;
