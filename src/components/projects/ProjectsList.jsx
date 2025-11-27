import React, { useMemo } from "react";
import ItemGridLayout from "@/components/common/ItemGridLayout";
import ProjectCard from "@/components/projects/ProjectCard";
import ProjectListSkeleton from "@/components/projects/ProjectListSkeleton";
import { projects } from "@/data/projects";

/**
 * @component ProjectsList
 * @description Lista de proyectos usando el componente genérico ItemGridLayout.
 * Muestra todos los proyectos completados en orden inverso (más recientes primero).
 *
 * @returns {JSX.Element} Grid de proyectos con SEO y loading state
 */
const ProjectsList = React.memo(() => {
  // Invertir el orden de proyectos para mostrar los más recientes primero
  const reversedProjects = useMemo(() => [...projects].reverse(), [projects]);

  return (
    <ItemGridLayout
      title="PROYECTOS"
      subtitle="Obras Entregadas"
      items={reversedProjects}
      ItemComponent={ProjectCard}
      SkeletonComponent={ProjectListSkeleton}
      seoTitle="Proyectos de Vidriería y Aluminio en La Molina - GYA Company"
      seoDescription="Descubre nuestros proyectos de instalación de vidriería y aluminio en La Molina. Calidad y experiencia en cada obra."
      seoCanonicalUrl="https://www.gyacompany.com/proyectos"
    />
  );
});

ProjectsList.displayName = "ProjectsList";
export default ProjectsList;
