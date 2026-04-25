"use client";
import React, { useMemo, useState, useEffect, useCallback } from "react";
import { Box, HStack } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import ItemGridLayout from "@shared/components/Layout/ItemGridLayout";
import ServiceCard from "./ServiceCard";
import { getServices } from "../services/serviceService";
import { useFilterableList } from "@shared/hooks";
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
    const allServices = useMemo(() => getServices() as ServiceData[], []);

    const filterFn = useCallback((items: ServiceData[], category: string) => {
        if (category === "Todos") return items;
        return items.filter((s) => s.category === category);
    }, []);

    const {
        paginatedItems: preparedServices,
        activeCategory,
        handleFilterChange: handleCategoryChange,
        isPending,
        loaderRef,
        totalFilteredCount,
        hasMore,
    } = useFilterableList({
        items: allServices,
        filterFn,
    });

    const activeBg = useColorModeValue("primary.700", "primary.300");
    const activeColor = useColorModeValue("white", "primary.900");
    const inactiveBg = useColorModeValue("gray.100", "whiteAlpha.100");
    const inactiveColor = useColorModeValue("gray.700", "gray.300");
    const inactiveHoverBg = useColorModeValue("gray.200", "whiteAlpha.200");

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <ServiceListSkeleton />;
    }

    return (
        <ItemGridLayout
            title=" Servicios "
            subtitle="Descubre nuestros servicios de fabricacion e instalación "
            headingAs="h1"
            seoTitle="Servicios de Vidriería y Aluminio en La Molina - GYA Company"
            seoDescription="Descubre nuestros servicios de instalación y fabricación de productos de vidriería y aluminio de alta calidad en La Molina. Ventanas, mamparas y más."
            seoCanonicalUrl="https://www.gyacompany.com/servicios"
            columns={{ base: 1, sm: 2, md: 3 }}
        >
            <Box gridColumn="1 / -1" w="full" mt="phi_sm">
                <HStack gap="phi_xs" justify="center" flexWrap="wrap" pb="phi_md">
                    {CATEGORIES.map((cat) => {
                        const isActive = activeCategory === cat;
                        return (
                            <Button
                                key={cat}
                                size="sm"
                                px="phi_md"
                                mt="phi_xs"
                                borderRadius="full"
                                fontWeight="semibold"
                                fontSize="xs"
                                letterSpacing="wider"
                                textTransform="uppercase"
                                bg={isActive ? activeBg : inactiveBg}
                                color={isActive ? activeColor : inactiveColor}
                                _hover={{
                                    bg: isActive ? activeBg : inactiveHoverBg,
                                }}
                                transition="all 0.2s ease"
                                onClick={() => handleCategoryChange(cat)}
                            >
                                {cat}
                            </Button>
                        );
                    })}
                </HStack>
            </Box>

            {totalFilteredCount === 0 ? (
                <Box gridColumn="1 / -1" py="phi_2xl">
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

            {hasMore && (
                <Box
                    ref={loaderRef}
                    gridColumn="1 / -1"
                    w="full"
                    h="20px"
                    py="phi_lg"
                />
            )}
        </ItemGridLayout>
    );
});

ServiceList.displayName = "ServiceList";
export default ServiceList;
