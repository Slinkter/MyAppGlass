/**
 * @file ProjectsList.jsx
 * @description Orchestrator for the projects gallery, leveraging `ItemGridLayout` for consistency.
 * @module projects/components
 * @remarks
 * - Implements built-in SEO optimizations via metadata props.
 * - Handles eager loading for items above the fold (first 2 items) to improve LCP.
 */

import React, { useMemo } from "react";
import ItemGridLayout from "@/shared/components/Layout/ItemGridLayout";
import ProjectCard from "./ProjectCard";
import { getProjects } from "../services/projectService";
const ProjectsList = React.memo(() => {
  // Get data synchronously
  const projects = getProjects();

  // Invert order and add preloaded flag
  const projectsList = useMemo(() => {
    return [...projects].reverse().map((p) => ({ ...p, preloaded: true }));
  }, [projects]);

  return (
    <ItemGridLayout
      title="PROYECTOS"
      subtitle="Obras Entregadas"
      containerProps={{ pb: 12 }}
    >
      {projectsList.map((project, index) => (
        <ItemGridLayout.Item key={project.id}>
          <ProjectCard
            {...project}
            // LCP Optimization
            loading={index < 2 ? "eager" : "lazy"}
            fetchPriority={index < 2 ? "high" : "auto"}
          />
        </ItemGridLayout.Item>
      ))}
    </ItemGridLayout>
  );
});

ProjectsList.displayName = "ProjectsList";

export default ProjectsList;
