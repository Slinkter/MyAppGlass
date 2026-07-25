"use client";
import React, { useMemo, useCallback } from "react";
import { Box, HStack } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import ItemGridLayout from "@shared/components/Layout/ItemGridLayout";
import ServiceCard from "./ServiceCard";
import { getServices } from "@features/services/services/serviceService";
import { useFilterableList } from "@shared/hooks";
import { EmptyState } from "@/components/ui/empty-state";
import { Search } from "lucide-react";

import { Service } from "@features/services/services/serviceService";

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
    // Loading state removed; always render content
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



    return (
        <ItemGridLayout
            title="SERVICIOS"
            subtitle="Descubre nuestros servicios de fabricacion e instalación "
            headingAs="h1"
            seoTitle="Servicios de Vidriería y Aluminio en La Molina - GYA Company"
            seoDescription="Descubre nuestros servicios de instalación y fabricación de productos de vidriería y aluminio de alta calidad en La Molina. Ventanas, mamparas y más."
            seoCanonicalUrl="https://www.gyacompany.com/servicios"
            columns={{ base: 1, md: 2, lg: 3 }}
        >
            <Box gridColumn="1 / -1" w="full" mt="5">
                <HStack gap="2" justify="center" flexWrap="wrap" pb="5">
                    {CATEGORIES.map((cat) => {
                        const isActive = activeCategory === cat;
                        return (
                            <Button
                                key={cat}
                                size="sm"
                                px="5"
                                mt="2"
                                borderRadius="full"
                                fontWeight="semibold"
                                fontSize="xs"
                                letterSpacing="wider"
                                textTransform="uppercase"
                                colorPalette="primary"
                                variant={isActive ? "solid" : "subtle"}
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
                <Box gridColumn="1 / -1" py="22">
                    <EmptyState
                        icon={<Search />}
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
                                category={service.category}
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
                    h="5"
                    py="8"
                />
            )}
        </ItemGridLayout>
    );
});

ServiceList.displayName = "ServiceList";
export default ServiceList;
