"use client";
import React, { useMemo, useCallback } from "react";
import { Box, HStack } from "@chakra-ui/react";
import ItemGridLayout from "@shared/components/Layout/ItemGridLayout";
import ProjectCard from "./ProjectCard";
import { useFilterableList } from "@shared/hooks";
import { Project, getProjects } from "@shared/services/projectService";
import { logger } from "@shared/utils/logger";
import { useColorModeValue } from "@/components/ui/color-mode-hooks";

// Helper inline para normalizar el año
const normalizeYear = (year?: string | number): string => {
  if (!year) return "Otros";
  const str = String(year).trim();
  if (/^\d{4}$/.test(str)) return str;
  return "Otros";
};

/**
 * @component ProjectsList
 * @description Renderiza la lista de proyectos filtrados por año en píldoras visualmente contrastadas.
 */
const ProjectsList: React.FC = React.memo(() => {
  const allProjects = useMemo(() => getProjects(), []);

  const years = useMemo(() => {
    const list = allProjects.map((p) => normalizeYear(p.year));
    const unique = Array.from(new Set(list)).sort((a, b) => {
      const isANum = !isNaN(Number(a));
      const isBNum = !isNaN(Number(b));
      if (isANum && isBNum) return Number(b) - Number(a);
      if (isANum) return -1;
      if (isBNum) return 1;
      return a.localeCompare(b);
    });

    const othersIndex = unique.indexOf("Otros");
    if (othersIndex > -1) {
      unique.splice(othersIndex, 1);
      unique.push("Otros");
    }
    return ["Todos", ...unique];
  }, [allProjects]);

  logger.info({ years: years.slice(1), allYears: allProjects.map(p => ({ id: p.id, year: p.year, normalized: normalizeYear(p.year) })) }, "Available filter years");

  const filterFn = useCallback((items: Project[], category: string) => {
    logger.debug({ category, totalItems: items.length }, "Filter function called");
    if (category === "Todos") {
      return items;
    }
    const filtered = items.filter((p) => {
      const normalized = normalizeYear(p.year);
      const matches = normalized === category;
      return matches;
    });
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

  // Estilos de alto contraste para las píldoras de filtrado por año
  const inactiveBg = useColorModeValue("rgba(228, 228, 231, 0.75)", "rgba(39, 39, 42, 0.75)");
  const inactiveHoverBg = useColorModeValue("rgba(212, 212, 216, 0.9)", "rgba(63, 63, 70, 0.9)");
  const inactiveText = useColorModeValue("#27272a", "#e4e4e7");
  const inactiveBorder = useColorModeValue("rgba(161, 161, 170, 0.5)", "rgba(113, 113, 122, 0.5)");

  const activeBg = useColorModeValue("#18181b", "#f4f4f5");
  const activeText = useColorModeValue("#ffffff", "#18181b");

  return (
    <ItemGridLayout
      title="PROYECTOS"
      headingAs="h1"
      subtitle="Obras Entregadas"
      seoTitle="Proyectos de Vidriería y Aluminio en La Molina - GYA Company"
      seoDescription="Descubre nuestros proyectos de instalación de vidriería y aluminio en La Molina. Calidad y experiencia en cada obra."
      seoCanonicalUrl="https://www.gyacompany.com/proyectos"
      columns={{ base: 1, md: 2, lg: 3 }}
    >
      {/* Filter Pills con contraste visual garantizado */}
      <Box gridColumn="1 / -1" w="full" mt="5">
        <HStack gap="3" justify="center" flexWrap="wrap" pb="6">
          {years.map((year) => {
            const isActive = activeYear === year;
            return (
              <Box
                key={year}
                onClick={() => handleYearChange(year)}
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
                {year}
              </Box>
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
        {preloadedProjects.map((project, index) => (
          <ItemGridLayout.Item
            key={`${activeYear}-${project.id}`}
            delay={(index % 6) * 0.08}
          >
            <ProjectCard
              project={project}
              index={index}
              isLCP={index < 3}
              loading={index < 3 ? "eager" : "lazy"}
            />
          </ItemGridLayout.Item>
        ))}
      </Box>

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

ProjectsList.displayName = "ProjectsList";
export default ProjectsList;
