import React, { useState, useEffect, useMemo } from "react";
import { Box, Button } from "@chakra-ui/react";
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

  // --- Paginación para optimizar rendimiento ---
  const [visibleCount, setVisibleCount] = useState(6); // Cargar solo 6 al inicio
  const visibleProjects = projectsList.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
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
        seoTitle="Proyectos de Vidriería y Aluminio en La Molina - GYA Company"
        seoDescription="Descubre nuestros proyectos de instalación de vidriería y aluminio en La Molina. Calidad y experiencia en cada obra."
        seoCanonicalUrl="https://www.gyacompany.com/proyectos"
        // Pasamos solo los visibles
        items={visibleProjects}
        ItemComponent={ProjectCard}
        // Pasamos children para el botón de "Ver más"
        containerProps={{ pb: 12 }} // Espacio extra al final
      />

      {/* Botón "Ver más" si hay más proyectos para cargar */}
      {visibleCount < projectsList.length && (
        <Box display="flex" justifyContent="center" mb={12}>
          <Button
            onClick={handleLoadMore}
            colorScheme="primary"
            size="lg"
            variant="solid"
            rounded="full"
            px={8}
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg",
            }}
          >
            Ver más proyectos
          </Button>
        </Box>
      )}

      {/* 
        Nota: Para mantener la consistencia de estilos con Chakra, 
        lo ideal sería importar Button de itemGridLayout o pasarlo como prop, 
        pero para no romper la estructura actual de ItemGridLayout, 
        lo renderizaremos a continuación usando componentes de Chakra si los importamos.
      */}
    </DataLoader>
  );
});

ProjectsList.displayName = "ProjectsList";

export default ProjectsList;
