"use client";
/**
 * @file ProjectsList.tsx
 * @description Orchestrator for the projects gallery, leveraging `ItemGridLayout` for consistency.
 * @module projects/components
 * @remarks
 * - Implements built-in SEO optimizations via metadata props.
 * - Handles eager loading for items above the fold (first 2 items) to improve LCP.
 * - Cascade animation effect for each item.
 */

import React, { useMemo, useCallback } from "react";
import { Box, HStack } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import ItemGridLayout from "@shared/components/Layout/ItemGridLayout";
import ProjectCard from "./ProjectCard";
import { getProjects, Project } from "../services/projectService";
import { useFilterableList } from "@shared/hooks";
import logger from "@shared/utils/logger";

/**
 * Normaliza nombres de años para extraer solo el año de 4 dígitos (ej. 2024, 2023).
 */
const normalizeYear = (year?: string | number): string => {
  if (!year) return "Otros";
  const yearString = String(year).trim();
  const match = yearString.match(/\b(20\d{2})\b/);
  return match ? match[1] : "Otros";
};

/**
 * @component ProjectsList
 * @description Orchestrator for the projects gallery, implementing Infinite Scroll (O1) for high performance.
 */
const ProjectsList: React.FC = React.memo(() => {
  const allProjects = useMemo(() => {
    const projects = [...getProjects()].reverse();
    logger.debug({ total: projects.length }, "Projects loaded");
    return projects;
  }, []);

  // Get unique years
  const years = useMemo(() => {
    const allNormalized = allProjects.map(p => ({ id: p.id, year: p.year, normalized: normalizeYear(p.year) }));
    logger.debug({ allNormalized }, "normalizeYear for all projects");
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

  logger.info({ years: years.slice(1), allYears: allProjects.map(p => ({ id: p.id, year: p.year, normalized: normalizeYear(p.year) })) }, "Available filter years");

  logger.info({ years: years.slice(1) }, "Available filter years");

  const filterFn = useCallback((items: Project[], category: string) => {
    logger.debug({ category, totalItems: items.length }, "Filter function called");
    if (category === "Todos") {
      logger.debug({ result: items.length }, "Returning all items for 'Todos'");
      return items;
    }
    const filtered = items.filter((p) => {
      const normalized = normalizeYear(p.year);
      const matches = normalized === category;
      return matches;
    });
    logger.debug({ category, filtered: filtered.length, items: filtered.map(p => p.id) }, "Filter result");
    return filtered;
  }, []);

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
      subtitle="Obras Entregadas"
      seoTitle="Proyectos de Vidriería y Aluminio en La Molina - GYA Company"
      seoDescription="Descubre nuestros proyectos de instalación de vidriería y aluminio en La Molina. Calidad y experiencia en cada obra."
      seoCanonicalUrl="https://www.gyacompany.com/proyectos"
      columns={{ base: 1, md: 2, lg: 3 }}
    >
      {/* Filter Pills */}
      <Box gridColumn="1 / -1" w="full" mt="4">
        <HStack gap="2" justify="center" flexWrap="wrap" pb="6">
          {years.map((year) => {
            const isActive = activeYear === year;
            return (
              <Button
                key={year}
                size="sm"
                px={5}
                mt="2"
                borderRadius="full"
                fontWeight="semibold"
                fontSize="xs"
                letterSpacing="wider"
                textTransform="uppercase"
                colorPalette="primary"
                variant={isActive ? "solid" : "subtle"}
                transition="background-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease"
                onClick={() => {
                  handleYearChange(year);
                }}
              >
                {year}
              </Button>
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
        onMouseEnter={() => {}}
      >
        {preloadedProjects.map((project, index) => (
          <ItemGridLayout.Item key={`${activeYear}-${project.id}`} delay={(index % 6) * 0.1}>
            <ProjectCard
              {...project}
              isLCP={index < 3}
              loading={index < 2 ? "eager" : "lazy"}
              fetchPriority={index < 2 ? "high" : "auto"}
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
