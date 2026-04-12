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
import { Box } from "@chakra-ui/react";
import ItemGridLayout from "@shared/components/Layout/ItemGridLayout";
import ProjectCard from "./ProjectCard";
import { getProjects } from "../services/projectService";
import useIntersectionObserver from "@shared/hooks/observers/useIntersectionObserver";

/**
 * @component ProjectsList
 * @description Orchestrator for the projects gallery, implementing Infinite Scroll (O1) for high performance.
 */
const ProjectsList = React.memo(() => {
  const allProjects = useMemo(() => [...getProjects()].reverse(), []);
  const [displayCount, setDisplayCount] = useState(6);
  const loaderRef = useRef(null);
  const rafRef = useRef(null);

  const rootMargin = typeof window !== "undefined" && window.innerWidth < 768 ? "200px" : "400px";

  useIntersectionObserver(
    loaderRef,
    () => {
      // Guard: don't schedule if already at full count
      if (displayCount >= allProjects.length) return;
      rafRef.current = requestAnimationFrame(() => {
        setDisplayCount((prev) => Math.min(prev + 6, allProjects.length));
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

  const projectsList = useMemo(() => {
    return allProjects.slice(0, displayCount).map((p) => ({ ...p, preloaded: true }));
  }, [allProjects, displayCount]);

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
      {projectsList.map((project, index) => (
        <ItemGridLayout.Item key={project.id} delay={(index % 6) * 0.1}>
          <ProjectCard
            {...project}
            isLCP={index < 3}
            loading={index < 2 ? "eager" : "lazy"}
            fetchpriority={index < 2 ? "high" : "auto"}
          />
        </ItemGridLayout.Item>
      ))}
      
      {/* Intersection Sensor for O1 Rendering */}
      {displayCount < allProjects.length && (
        <Box ref={loaderRef} w="full" h="20px" py={10} />
      )}
    </ItemGridLayout>
  );
});

ProjectsList.displayName = "ProjectsList";
export default ProjectsList;
