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
 * @description Renderiza la lista de servicios con filtro por categoría en píldoras con estilos explícitos de alto contraste.
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

    // Definición explícita de colores para estado Inactivo y Activo de las píldoras
    const inactiveBg = useColorModeValue("rgba(228, 228, 231, 0.75)", "rgba(39, 39, 42, 0.75)");
    const inactiveHoverBg = useColorModeValue("rgba(212, 212, 216, 0.9)", "rgba(63, 63, 70, 0.9)");
    const inactiveText = useColorModeValue("#27272a", "#e4e4e7");
    const inactiveBorder = useColorModeValue("rgba(161, 161, 170, 0.5)", "rgba(113, 113, 122, 0.5)");

    const activeBg = useColorModeValue("#18181b", "#f4f4f5");
    const activeText = useColorModeValue("#ffffff", "#18181b");

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
            {/* Contenedor de Filtros tipo Píldoras con estilos explícitos de alto contraste */}
            <Box gridColumn="1 / -1" w="full" mt="5">
                <HStack gap="3" justify="center" flexWrap="wrap" pb="6">
                    {CATEGORIES.map((cat) => {
                        const isActive = activeCategory === cat;
                        return (
                            <Box
                                key={cat}
                                onClick={() => handleCategoryChange(cat)}
                                as="button"
                                type="button"
                                px="5"
                                py="2"
                                borderRadius="full"
                                fontWeight="700"
                                fontSize="xs"
                                letterSpacing="0.1em"
                                textTransform="uppercase"
                                bg={isActive ? activeBg : inactiveBg}
                                color={isActive ? activeText : inactiveText}
                                border="1px solid"
                                borderColor={isActive ? activeBg : inactiveBorder}
                                boxShadow={isActive ? "0 4px 12px rgba(0, 0, 0, 0.2)" : "0 1px 3px rgba(0, 0, 0, 0.08)"}
                                cursor="pointer"
                                userSelect="none"
                                transition="all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
                                _hover={{
                                    transform: "translateY(-1px)",
                                    boxShadow: isActive ? "0 6px 16px rgba(0, 0, 0, 0.3)" : "0 3px 8px rgba(0, 0, 0, 0.12)",
                                    bg: isActive ? activeBg : inactiveHoverBg
                                }}
                                _active={{
                                    transform: "translateY(0)",
                                    boxShadow: "none"
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
