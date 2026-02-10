import React, { useMemo } from "react";
import ItemGridLayout from "@/shared/components/Layout/ItemGridLayout";
import ProjectCard from "./ProjectCard";
import { getProjects } from "../services/projectService";

/**
 * @component ProjectsList
 * @description Lista de proyectos usando el componente genérico ItemGridLayout.
 * Muestra todos los proyectos completados en orden inverso (más recientes primero).
 * Con animación escalonada para mejor experiencia visual.
 * @returns {JSX.Element} Grid de proyectos con SEO y loading state
 */
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
      seoTitle="Proyectos de Vidriería y Aluminio en La Molina - GYA Company"
      seoDescription="Descubre nuestros proyectos de instalación de vidriería y aluminio en La Molina. Calidad y experiencia en cada obra."
      seoCanonicalUrl="https://www.gyacompany.com/proyectos"
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
