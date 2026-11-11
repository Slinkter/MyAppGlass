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
import { Box } from "@chakra-ui/react";
import ItemGridLayout from "@shared/components/Layout/ItemGridLayout";
import ProjectCard from "./ProjectCard";
import { useProjects } from "@/entities/project/api/useProjects";
import { ProjectCardSkeletons } from "./ProjectSkeletons";
import type { Project } from "@shared/types/project";
import type { Project as FirestoreProject } from "@/shared/api/firebase/types";
import { EmptyState } from "@/shared/ui/empty-state";
import { AlertTriangle } from "lucide-react";
import useFilterableList from "@shared/hooks/ui/useFilterableList";

export interface ProjectsListProps {
  /** Proyectos leídos de Firestore en build (primer render, para el HTML exportado). */
  initialData?: FirestoreProject[];
  /** Nivel del título: `h1` en su página propia, `h2` cuando se incrusta (p. ej. en la home). */
  headingAs?: "h1" | "h2";
  /** Movimiento de entrada del grid (`cine` en la home). */
  motion?: "default" | "cine";
}

/**
 * @component ProjectsList
 * @description Orchestrator for the projects gallery, implementing Infinite Scroll (O1) for high performance.
 */
const ProjectsList: React.FC<ProjectsListProps> = React.memo(({ initialData, headingAs = "h1", motion = "default" }) => {
  // Primer render con los datos de build; Firestore en cliente los refresca (ver useProjects).
  // Ya viene más reciente primero.
  const { data, isLoading, error } = useProjects(initialData);
  const allProjects = useMemo<Project[]>(() => data ?? [], [data]);

  // Sin filtros por año: se muestran todas las obras entregadas (se conserva la paginación progresiva).
  const filterFn = useCallback((items: Project[]) => items, []);

  const {
    paginatedItems: preloadedProjects,
    isPending,
    loaderRef,
    hasMore,
  } = useFilterableList({
    items: allProjects,
    filterFn,
  });

  return (
    <ItemGridLayout
      motion={motion}
      title="PROYECTOS"
      headingAs={headingAs}
      subtitle="Obras Entregadas"
      seoTitle="Proyectos de Vidriería y Aluminio en La Molina - GYA Company"
      seoDescription="Descubre nuestros proyectos de instalación de vidriería y aluminio en La Molina. Calidad y experiencia en cada obra."
      seoCanonicalUrl={`${SITE_URL}/#proyectos`}
      columns={{ base: 1, md: 2, lg: 3 }}
      gap={{ base: "4", md: "5" }}
      headerMb={{ base: "5", md: "7" }}
      containerProps={{ pt: { base: "4", md: "6" }, pb: { base: "6", md: "8" } }}
    >
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
          <ItemGridLayout.Item key={project.id}>
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
