"use client";
import React, { useMemo, useState, useRef, useEffect, useTransition } from "react";
import { Box, HStack, Button } from "@chakra-ui/react";
import ItemGridLayout from "@shared/components/Layout/ItemGridLayout";
import ServiceCard from "./ServiceCard";
import { getServices } from "../services/serviceService";
import useIntersectionObserver from "@shared/hooks/observers/useIntersectionObserver";
import { EmptyState } from "@/components/ui/empty-state";
import { LuSearch } from "react-icons/lu";
import ServiceListSkeleton from "./ServiceListSkeleton";
import { useColorModeValue } from "@/components/ui/color-mode-hooks";
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
  const [isPending, startTransition] = useTransition();
  const allServices = useMemo(() => getServices() as ServiceData[], []);
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [displayCount, setDisplayCount] = useState(6);
  const loaderRef = useRef<HTMLDivElement>(null);

  const activeBg = useColorModeValue("primary.700", "primary.300");
  const activeColor = useColorModeValue("white", "primary.900");
  const inactiveBg = useColorModeValue("gray.100", "whiteAlpha.100");
  const inactiveColor = useColorModeValue("gray.700", "gray.300");
  const inactiveHoverBg = useColorModeValue("gray.200", "whiteAlpha.200");

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleCategoryChange = (cat: string) => {
    startTransition(() => {
      setActiveCategory(cat);
      setDisplayCount(6);
    });
  };

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
                px={5}
                mt={2}
                borderRadius="full"
                fontWeight="semibold"
                fontSize="xs"
                letterSpacing="wider"
                textTransform="uppercase"
                bg={isActive ? activeBg : inactiveBg}
                color={isActive ? activeColor : inactiveColor}
                _hover={{ bg: isActive ? activeBg : inactiveHoverBg }}
                transition="all 0.2s ease"
                onClick={() => handleCategoryChange(cat)}
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
        <Box
          gridColumn="1 / -1"
          display="contents"
          opacity={isPending ? 0.6 : 1}
          transition="opacity 0.2s ease"
        >
          {preparedServices.map((service, index) => (
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
          ))}
        </Box>
      )}

      {displayCount < filteredServices.length && (
        <Box ref={loaderRef} gridColumn="1 / -1" w="full" h="20px" py={10} />
      )}
    </ItemGridLayout>
  );
});

ServiceList.displayName = "ServiceList";
export default ServiceList;
