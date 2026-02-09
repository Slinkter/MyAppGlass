import React, { useState, useEffect, useMemo } from "react";
import ItemGridLayout from "@/shared/components/Layout/ItemGridLayout";
import ProjectCard from "./ProjectCard";
import ProjectListSkeleton from "./ProjectListSkeleton";
import DataLoader from "@/shared/components/DataLoader/DataLoader";
import { getProjects } from "../services/projectService";

/**
 * @component ProjectsList
 * @description Lista de proyectos usando el componente genérico ItemGridLayout.
 * Muestra todos los proyectos completados en orden inverso (más recientes primero).
 * Con animación escalonada para mejor experiencia visual.
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
        items={projectsList}
        ItemComponent={ProjectCard}
        containerProps={{ pb: 12 }}
      />
    </DataLoader>
  );
});

ProjectsList.displayName = "ProjectsList";

export default ProjectsList;
