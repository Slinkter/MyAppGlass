"use client";
import { SITE_URL } from "@/shared/config/company-data";
import React, { useMemo, useCallback } from "react";
import { Box, HStack } from "@chakra-ui/react";
import { FilterPill } from "@/shared/components/ui/FilterPill";
import ItemGridLayout from "@shared/components/Layout/ItemGridLayout";
import ServiceCard from "./ServiceCard";
import { useServices, type ServiceListItem } from "@features/services/hooks/useServices";
import { ServiceCardSkeletons } from "./ServiceSkeletons";
import useFilterableList from "@shared/hooks/ui/useFilterableList";
import { EmptyState } from "@/components/ui/empty-state";
import { AlertTriangle, Search } from "lucide-react";
import type { Service } from "@/shared/api/firebase/types";

const CATEGORIES = ["Todos", "Vidrio", "Aluminio", "Cerramientos"];

export type ServiceData = ServiceListItem;

export interface ServiceListProps {
    /** Servicios leídos de Firestore en build (primer render, para el HTML exportado). */
    initialData?: Service[];
    /** Nivel del título: `h1` en su página propia, `h2` cuando se incrusta (p. ej. en la home). */
    headingAs?: "h1" | "h2";
}

/**
 * @component ServiceList
 * @description Renderiza la lista de servicios con filtro por categoría e Infinite Scroll.
 */
const ServiceList: React.FC<ServiceListProps> = React.memo(({ initialData, headingAs = "h1" }) => {
    // Primer render con los datos de build; Firestore en cliente los refresca (ver useServices).
    const { data, isLoading, error } = useServices(initialData);
    const allServices = useMemo<ServiceData[]>(() => data ?? [], [data]);

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
            headingAs={headingAs}
            seoTitle="Servicios de Vidriería y Aluminio en La Molina - GYA Company"
            seoDescription="Descubre nuestros servicios de instalación y fabricación de productos de vidriería y aluminio de alta calidad en La Molina. Ventanas, mamparas y más."
            seoCanonicalUrl={`${SITE_URL}/servicios`}
            columns={{ base: 1, md: 2, lg: 3 }}
        >
            <Box gridColumn="1 / -1" w="full" mt="5">
                <HStack gap="2" justify="center" flexWrap="wrap" pb="5">
                    {CATEGORIES.map((cat) => {
                        return (
                          <FilterPill
                            key={cat}
                            label={String(cat)}
                            isActive={activeCategory === cat}
                            onClick={() => handleCategoryChange(cat)}
                          />
                        );
                    })}
                </HStack>
            </Box>

            {isLoading ? (
                <ServiceCardSkeletons />
            ) : error && !data ? (
                <Box gridColumn="1 / -1" py="22">
                    <EmptyState
                        icon={<AlertTriangle />}
                        title="No pudimos cargar los servicios"
                        description={error instanceof Error ? error.message : undefined}
                    />
                </Box>
            ) : totalFilteredCount === 0 ? (
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
