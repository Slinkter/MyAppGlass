/**
 * @file ProjectsList.jsx
 * @description Orchestrator for the projects gallery, leveraging `ItemGridLayout` for consistency.
 * @module projects/components
 * @remarks
 * - Implements built-in SEO optimizations via metadata props.
 * - Handles eager loading for items above the fold (first 2 items) to improve LCP.
 * - Cascade animation effect for each item.
 */

import React, { useMemo, useState, useRef, useEffect } from "react";
import { Box, Button, HStack, useColorModeValue } from "@chakra-ui/react";
import ItemGridLayout from "@shared/components/Layout/ItemGridLayout";
import ProjectCard from "./ProjectCard";
import { getProjects } from "../services/projectService";
import useIntersectionObserver from "@shared/hooks/observers/useIntersectionObserver";

/**
 * Normaliza nombres de distritos para agruparlos correctamente.
 */
const normalizeDistrict = (address) => {
  if (!address) return "Otros";
  const name = address.trim().toLowerCase();
  if (name.includes("magdalena")) return "Magdalena";
  if (name === "ate") return "Ate";
  return address.trim().charAt(0).toUpperCase() + address.trim().slice(1).toLowerCase();
};

/**
 * @component ProjectsList
 * @description Orchestrator for the projects gallery, implementing Infinite Scroll (O1) for high performance.
 */
const ProjectsList = React.memo(() => {
  const allProjects = useMemo(() => [...getProjects()].reverse(), []);
  const [activeDistrict, setActiveDistrict] = useState("Todos");
  const [displayCount, setDisplayCount] = useState(6);
  const loaderRef = useRef(null);
  const rafRef = useRef(null);

  const activeBg = useColorModeValue("primary.700", "primary.300");
  const activeColor = useColorModeValue("white", "primary.900");
  const inactiveBg = useColorModeValue("gray.100", "whiteAlpha.100");
  const inactiveColor = useColorModeValue("gray.700", "gray.300");
  const inactiveHoverBg = useColorModeValue("gray.200", "whiteAlpha.200");

  // Get unique districts
  const districts = useMemo(() => {
    const rawDistricts = allProjects.map((p) => normalizeDistrict(p.address));
    const unique = [...new Set(rawDistricts)].sort();
    return ["Todos", ...unique];
  }, [allProjects]);

  // Filter projects by district
  const filteredProjects = useMemo(() => {
    if (activeDistrict === "Todos") return allProjects;
    return allProjects.filter((p) => normalizeDistrict(p.address) === activeDistrict);
  }, [allProjects, activeDistrict]);

  // Reset display count when filter changes
  useEffect(() => {
    setDisplayCount(6);
  }, [activeDistrict]);

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
        <HStack spacing={2} justify="center" flexWrap="wrap" pb={4}>
          {districts.map((district) => {
            const isActive = activeDistrict === district;
            return (
              <Button
                key={district}
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
                onClick={() => setActiveDistrict(district)}
              >
                {district}
              </Button>
            );
          })}
        </HStack>
      </Box>

      {preloadedProjects.map((project, index) => (
        <ItemGridLayout.Item key={`${activeDistrict}-${project.id}`} delay={(index % 6) * 0.1}>
          <ProjectCard
            {...project}
            isLCP={index < 3}
            loading={index < 2 ? "eager" : "lazy"}
            fetchpriority={index < 2 ? "high" : "auto"}
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
