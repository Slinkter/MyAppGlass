"use client";
/**
 * @file ProjectsList.tsx
 * @description Orchestrator for the projects gallery, leveraging `ItemGridLayout` for consistency.
 * @module projects/components
 * @remarks
 * - Implements built-in SEO optimizations via metadata props.
 * - Handles eager loading for items above the fold (first 2 items) to improve LCP.
 * - Each card reveals itself when its photo loads (no staggered mount animation).
 */

import { SITE_URL } from "@/shared/config/company-data";
import React, { useMemo, useCallback } from "react";
import { Box, HStack } from "@chakra-ui/react";
import { FilterPill } from "@/shared/components/ui/FilterPill";
import { createGroupMap } from "@/shared/utils/algorithm-utils";
import ItemGridLayout from "@shared/components/Layout/ItemGridLayout";
import ProjectCard from "./ProjectCard";
import { useProjects } from "@features/projects/hooks/useProjects";
import { ProjectCardSkeletons } from "./ProjectSkeletons";
import type { Project } from "@shared/types/project";
import type { Project as FirestoreProject } from "@/shared/api/firebase/types";
import { EmptyState } from "@/components/ui/empty-state";
import { AlertTriangle } from "lucide-react";
import useFilterableList from "@shared/hooks/ui/useFilterableList";

/**
 * Normaliza nombres de años para extraer solo el año de 4 dígitos (ej. 2024, 2023).
 */
const normalizeYear = (year?: string | number): string => {
  if (!year) return "Otros";
  const yearString = String(year).trim();
  const match = yearString.match(/\b(20\d{2})\b/);
  return match ? match[1] : "Otros";
};

export interface ProjectsListProps {
  /** Proyectos leídos de Firestore en build (primer render, para el HTML exportado). */
  initialData?: FirestoreProject[];
  /** Nivel del título: `h1` en su página propia, `h2` cuando se incrusta (p. ej. en la home). */
  headingAs?: "h1" | "h2";
}

/**
 * @component ProjectsList
 * @description Orchestrator for the projects gallery, implementing Infinite Scroll (O1) for high performance.
 */
const ProjectsList: React.FC<ProjectsListProps> = React.memo(({ initialData, headingAs = "h1" }) => {
  // Primer render con los datos de build; Firestore en cliente los refresca (ver useProjects).
  // Ya viene más reciente primero.
  const { data, isLoading, error } = useProjects(initialData);
  const allProjects = useMemo<Project[]>(() => data ?? [], [data]);

  // Get unique years
  const years = useMemo(() => {
    const rawYears = allProjects.map((p) => normalizeYear(p.year));
    const unique = [...new Set(rawYears)].sort((a, b) => b.localeCompare(a));
    // Move "Otros" to the end if it exists
    const othersIndex = unique.indexOf("Otros");
    if (othersIndex > -1) {
      unique.splice(othersIndex, 1);
      unique.push("Otros");
    }
    return ["Todos", ...unique];
  }, [allProjects]);

  const projectsByYear = useMemo(() => {
    return createGroupMap(allProjects, (p) => normalizeYear(p.year));
  }, [allProjects]);

  const filterFn = useCallback((items: Project[], category: string) => {
    if (category === "Todos") return items;
    return projectsByYear.get(category) ?? [];
  }, [projectsByYear]);

  const {
    paginatedItems: preloadedProjects,
    activeCategory: activeYear,
    handleFilterChange: handleYearChange,
    isPending,
    loaderRef,
    hasMore,
  } = useFilterableList({
    items: allProjects,
    filterFn,
  });

  return (
    <ItemGridLayout
      title="PROYECTOS"
      headingAs={headingAs}
      subtitle="Obras Entregadas"
      seoTitle="Proyectos de Vidriería y Aluminio en La Molina - GYA Company"
      seoDescription="Descubre nuestros proyectos de instalación de vidriería y aluminio en La Molina. Calidad y experiencia en cada obra."
      seoCanonicalUrl={`${SITE_URL}/#proyectos`}
      columns={{ base: 1, md: 2, lg: 3 }}
    >
      {/* Filter Pills */}
      <Box gridColumn="1 / -1" w="full" mt="5">
        <HStack gap="2" justify="center" flexWrap="wrap" pb="5">
          {years.map((year) => {
            return (
              <FilterPill
                key={year}
                label={String(year)}
                isActive={activeYear === year}
                onClick={() => handleYearChange(year)}
              />
            );
          })}
        </HStack>
      </Box>

      <Box
        gridColumn="1 / -1"
        display="contents"
        style={{
          opacity: isPending ? 0.7 : 1,
          transition: "opacity 0.2s ease-in-out",
          pointerEvents: isPending ? "none" : "auto",
        }}
      >
        {isLoading && <ProjectCardSkeletons />}
        {!isLoading && Boolean(error) && !data && (
          <Box gridColumn="1 / -1" py="22">
            <EmptyState
              icon={<AlertTriangle />}
              title="No pudimos cargar los proyectos"
              description={error instanceof Error ? error.message : undefined}
            />
          </Box>
        )}
        {!isLoading && preloadedProjects.map((project, index) => (
          // Sin `delay`/animación de montaje: cada card se revela sola cuando su foto
          // termina de cargar (ver ProjectCardContent).
          <ItemGridLayout.Item key={`${activeYear}-${project.id}`}>
            <ProjectCard
              {...project}
              isLCP={headingAs === "h1" && index === 0}
              loading={headingAs === "h1" && index < 2 ? "eager" : "lazy"}
              fetchPriority={headingAs === "h1" && index === 0 ? "high" : "auto"}
            />
          </ItemGridLayout.Item>
        ))}
      </Box>
      
      {/* Intersection Sensor for O1 Rendering */}
      {hasMore && (
        <Box ref={loaderRef} w="full" h="20px" py="8" />
      )}
    </ItemGridLayout>
  );
});

ProjectsList.displayName = "ProjectsList";
export default ProjectsList;
