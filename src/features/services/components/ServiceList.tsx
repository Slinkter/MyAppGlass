"use client";
import React, { useMemo, useCallback } from "react";
import { Box, HStack } from "@chakra-ui/react";
import ItemGridLayout from "@shared/components/Layout/ItemGridLayout";
import ServiceCard from "./ServiceCard";
import { getServices, Service } from "@features/services/services/serviceService";
import { useFilterableList } from "@shared/hooks";
import { EmptyState } from "@/components/ui/empty-state";
import { Search } from "lucide-react";
import { useColorModeValue } from "@/components/ui/color-mode-hooks";

const CATEGORIES = ["Todos", "Vidrio", "Aluminio", "Cerramientos"];

export interface ServiceData extends Service {
    category: string;
    description: string;
}

/**
 * @component ServiceList
 * @description Renderiza la lista de servicios con filtro por categoría en píldoras (Pills).
 */
const ServiceList: React.FC = React.memo(() => {
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

    // Colores para píldoras (pills) activas e inactivas
    const inactiveBg = useColorModeValue("rgba(241, 245, 249, 0.9)", "rgba(30, 41, 59, 0.7)");
    const inactiveText = useColorModeValue("rgba(51, 65, 85, 1)", "rgba(226, 232, 240, 1)");
    const inactiveBorder = useColorModeValue("rgba(226, 232, 240, 0.8)", "rgba(51, 65, 85, 0.5)");

    const activeBg = "#18181b";
    const activeText = "#ffffff";

    return (
        <ItemGridLayout
            title="SERVICIOS"
            subtitle="Descubre nuestros servicios de fabricación e instalación"
            headingAs="h1"
            seoTitle="Servicios de Vidriería y Aluminio en La Molina - GYA Company"
            seoDescription="Descubre nuestros servicios de instalación y fabricación de productos de vidriería y aluminio de alta calidad en La Molina. Ventanas, mamparas y más."
            seoCanonicalUrl="https://www.gyacompany.com/servicios"
            columns={{ base: 1, md: 2, lg: 3 }}
        >
            {/* Contenedor de Filtros tipo Píldoras (Pills) */}
            <Box gridColumn="1 / -1" w="full" mt="5">
                <HStack gap="3" justify="center" flexWrap="wrap" pb="6">
                    {CATEGORIES.map((cat) => {
                        const isActive = activeCategory === cat;
                        return (
                            <Box
                                key={cat}
                                onClick={() => handleCategoryChange(cat)}
                                as="button"
                                px="6"
                                py="2.5"
                                borderRadius="full"
                                fontWeight="700"
                                fontSize="xs"
                                letterSpacing="0.12em"
                                textTransform="uppercase"
                                bg={isActive ? activeBg : inactiveBg}
                                color={isActive ? activeText : inactiveText}
                                border="1.5px solid"
                                borderColor={isActive ? activeBg : inactiveBorder}
                                boxShadow={isActive ? "0 4px 14px rgba(0, 0, 0, 0.25)" : "0 2px 6px rgba(0, 0, 0, 0.04)"}
                                cursor="pointer"
                                userSelect="none"
                                transition="all 0.25s cubic-bezier(0.4, 0, 0.2, 1)"
                                _hover={{
                                    transform: "translateY(-2px)",
                                    boxShadow: isActive ? "0 6px 18px rgba(0, 0, 0, 0.35)" : "0 4px 12px rgba(0, 0, 0, 0.08)",
                                    bg: isActive ? activeBg : useColorModeValue("rgba(226, 232, 240, 1)", "rgba(51, 65, 85, 0.9)")
                                }}
                                _active={{
                                    transform: "translateY(0)",
                                    boxShadow: "sm"
                                }}
                            >
                                {cat}
                            </Box>
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
