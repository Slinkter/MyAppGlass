import React, { useState, useEffect, useMemo } from "react";
import ItemGridLayout from "@/components/common/ItemGridLayout";
import ProjectCard from "@/components/projects/ProjectCard";
import ProjectListSkeleton from "@/components/projects/ProjectListSkeleton";
import DataLoader from "@/components/common/DataLoader";
import { getProjects } from "@/services/projectService";

/**
 * @component ProjectsList
 * @description Lista de proyectos usando el componente genérico ItemGridLayout.
 * Muestra todos los proyectos completados en orden inverso (más recientes primero).
 * @returns {JSX.Element} Grid de proyectos con SEO y loading state
 */
const ProjectsList = React.memo(() => {
  /* variable locales */
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        setError(err.message || "Error al cargar los proyectos.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Invertir el orden de proyectos para mostrar los más recientes primero
  const projectsList = useMemo(() => [...projects].reverse(), [projects]);

  return (
    <DataLoader
      isLoading={isLoading}
      error={error}
      loadingComponent={<ProjectListSkeleton />}
    >
      <ItemGridLayout
        title="PROYECTOS"
        subtitle="Obras Entregadas"
        seoTitle="Proyectos de Vidriería y Aluminio en La Molina - GYA Company"
        seoDescription="Descubre nuestros proyectos de instalación de vidriería y aluminio en La Molina. Calidad y experiencia en cada obra."
        seoCanonicalUrl="https://www.gyacompany.com/proyectos"
        ItemComponent={ProjectCard}
        items={projectsList}
      />
    </DataLoader>
  );
});

ProjectsList.displayName = "ProjectsList";

export default ProjectsList;
