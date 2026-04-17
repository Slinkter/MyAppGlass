"use client";
import { useColorModeValue } from "@/components/ui/color-mode-hooks";
/**
 * @file ProjectsList.tsx
 * @description Orchestrator for the projects gallery, leveraging `ItemGridLayout` for consistency.
 * @module projects/components
 * @remarks
 * - Implements built-in SEO optimizations via metadata props.
 * - Handles eager loading for items above the fold (first 2 items) to improve LCP.
 * - Cascade animation effect for each item.
 */

import React, { useMemo, useState, useRef, useEffect } from "react";
import { Box, Button, HStack } from "@chakra-ui/react";
import ItemGridLayout from "@shared/components/Layout/ItemGridLayout";
import ProjectCard from "./ProjectCard";
import { getProjects } from "../services/projectService";
import useIntersectionObserver from "@shared/hooks/observers/useIntersectionObserver";

/**
 * Normaliza nombres de años para extraer solo el año de 4 dígitos (ej. 2024, 2023).
 */
const normalizeYear = (year?: string): string => {
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
  const allProjects = useMemo(() => [...getProjects()].reverse(), []);
  const [activeYear, setActiveYear] = useState<string>("Todos");
  const [displayCount, setDisplayCount] = useState<number>(6);
  const loaderRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const activeBg = useColorModeValue("primary.700", "primary.300");
  const activeColor = useColorModeValue("white", "primary.900");
  const inactiveBg = useColorModeValue("gray.100", "whiteAlpha.100");
  const inactiveColor = useColorModeValue("gray.700", "gray.300");
  const inactiveHoverBg = useColorModeValue("gray.200", "whiteAlpha.200");

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

  // Filter projects by year
  const filteredProjects = useMemo(() => {
    if (activeYear === "Todos") return allProjects;
    return allProjects.filter((p) => normalizeYear(p.year) === activeYear);
  }, [allProjects, activeYear]);

  // Reset display count when filter changes
  useEffect(() => {
    setDisplayCount(6);
  }, [activeYear]);

  const rootMargin = typeof window !== "undefined" && window.innerWidth < 768 ? "200px" : "400px";

  useIntersectionObserver(
    loaderRef,
    () => {
      // Guard: don't schedule if already at full count
      if (displayCount >= filteredProjects.length) return;
      rafRef.current = requestAnimationFrame(() => {
        setDisplayCount((prev) => Math.min(prev + 6, filteredProjects.length));
      });
    },
    { threshold: 0.01, rootMargin }
  );

  // Cleanup rAF on unmount
  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const preloadedProjects = useMemo(() => {
    return filteredProjects.slice(0, displayCount).map((p) => ({ ...p, preloaded: true }));
  }, [filteredProjects, displayCount]);

  return (
    <ItemGridLayout
      title="PROYECTOS"
      subtitle="Obras Entregadas"
      seoTitle="Proyectos de Vidriería y Aluminio en La Molina - GYA Company"
      seoDescription="Descubre nuestros proyectos de instalación de vidriería y aluminio en La Molina. Calidad y experiencia en cada obra."
      seoCanonicalUrl="https://www.gyacompany.com/proyectos"
      containerProps={{ pb: 12 }}
      columns={{ base: 1, md: 2, lg: 3 }}
    >
      {/* Filter Pills */}
      <Box gridColumn="1 / -1" w="full">
        <HStack gap={2} justify="center" flexWrap="wrap" pb={4}>
          {years.map((year) => {
            const isActive = activeYear === year;
            return (
              <Button
                key={year}
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
                onClick={() => setActiveYear(year)}
              >
                {year}
              </Button>
            );
          })}
        </HStack>
      </Box>

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
      
      {/* Intersection Sensor for O1 Rendering */}
      {displayCount < filteredProjects.length && (
        <Box ref={loaderRef} w="full" h="20px" py={10} />
      )}
    </ItemGridLayout>
  );
});

ProjectsList.displayName = "ProjectsList";
export default ProjectsList;
