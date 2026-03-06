/**
 * @file ProjectsList.jsx
 * @description Orchestrator for the projects gallery, leveraging `ItemGridLayout` for consistency.
 * @module projects/components
 * @remarks
 * - Implements built-in SEO optimizations via metadata props.
 * - Handles eager loading for items above the fold (first 2 items) to improve LCP.
 */

import React, { useMemo, useState } from "react";
import ItemGridLayout from "@/shared/components/Layout/ItemGridLayout";
import ProjectCard from "./ProjectCard";
import { getProjects } from "../services/projectService";
import { useAsyncData } from "@/shared/hooks/data/useAsyncData";
import DataLoader from "@/shared/components/DataLoader/DataLoader";
import ProjectListSkeleton from "./ProjectListSkeleton";
import { Button, Center } from "@chakra-ui/react";
import { m } from "framer-motion";

const PROJECTS_PER_PAGE = 6;

const ProjectsList = React.memo(() => {
  const { data: projects, isLoading, error } = useAsyncData(getProjects, []);
  const [visibleCount, setVisibleCount] = useState(PROJECTS_PER_PAGE);

  // Invert order and add preloaded flag
  const projectsList = useMemo(() => {
    if (!projects) return [];
    return [...projects].reverse().map((p) => ({ ...p, preloaded: true }));
  }, [projects]);

  const visibleProjects = projectsList.slice(0, visibleCount);
  const hasMore = visibleCount < projectsList.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + PROJECTS_PER_PAGE);
  };

  return (
    <DataLoader
      isLoading={isLoading}
      error={error}
      loadingComponent={<ProjectListSkeleton />}
    >
      <ItemGridLayout
        title="PROYECTOS"
        subtitle="Obras Entregadas"
        containerProps={{ pb: 12 }}
      >
        {visibleProjects.map((project, index) => (
          <ItemGridLayout.Item key={project.id}>
            <ProjectCard
              {...project}
              // LCP Optimization: Only eager load the very first visible items
              loading={index < 2 ? "eager" : "lazy"}
              fetchPriority={index < 2 ? "high" : "auto"}
            />
          </ItemGridLayout.Item>
        ))}
      </ItemGridLayout>

      {hasMore && (
        <Center pb={16}>
          <Button
            as={m.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLoadMore}
            size="lg"
            colorScheme="primary"
            variant="outline"
            borderWidth="2px"
            borderRadius="full"
            px={10}
            fontFamily="heading"
            letterSpacing="widest"
          >
            Ver Más Proyectos
          </Button>
        </Center>
      )}
    </DataLoader>
  );
});

ProjectsList.displayName = "ProjectsList";

export default ProjectsList;
