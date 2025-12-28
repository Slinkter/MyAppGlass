import React, { useState, useEffect, useMemo } from "react";
import { Box, Spinner } from "@chakra-ui/react";
import ItemGridLayout from "@/components/common/ItemGridLayout";
import ProjectCard from "@/components/projects/ProjectCard";
import ProjectListSkeleton from "@/components/projects/ProjectListSkeleton";
import DataLoader from "@/components/common/DataLoader";
import { getProjects } from "@/services/projectService";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
// Componente wrapper eliminado para optimización

/**
 * @component ProjectsList
 * @description Lista de proyectos usando el componente genérico ItemGridLayout.
 * Muestra todos los proyectos completados en orden inverso (más recientes primero).
 * Implementa Infinite Scroll para optimizar el rendimiento.
 * @returns {JSX.Element} Grid de proyectos con SEO y loading state
 */
const ProjectsList = React.memo(() => {
    /* variable locales */
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [projects, setProjects] = useState([]);

    // Ref para el sentinel del Infinite Scroll (Usamos useState para callback ref)
    const [sentinelRef, setSentinelRef] = useState(null);

    // Pasamos el nodo directamente al hook
    const isSentinelVisible = useIntersectionObserver(sentinelRef, {
        threshold: 0.1, // Bajamos umbral para mejor detección
    });

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

    // --- Lógica de Infinite Scroll ---
    const [visibleCount, setVisibleCount] = useState(6); // Cargar solo 6 al inicio
    const visibleProjects = projectsList.slice(0, visibleCount);
    const hasMore = visibleCount < projectsList.length;

    const handleLoadMore = () => {
        if (hasMore) {
            // Pequeño delay artificial para sentir la carga (opcional) o carga directa
            setVisibleCount((prev) => Math.min(prev + 6, projectsList.length));
        }
    };

    // Efecto que reacciona cuando el usuario llega al final
    useEffect(() => {
        if (isSentinelVisible && hasMore && !isLoading) {
            handleLoadMore();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSentinelVisible, hasMore, isLoading]);

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
                containerProps={{ pb: 0 }}
            />

            {/* Sentinel para Infinite Scroll */}
            {/* Se renderiza solo si hay más elementos para cargar y no estamos cargando inicialmente */}
            {!isLoading && hasMore && (
                <Box
                    ref={setSentinelRef}
                    h="60px"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    mb={12}
                >
                    {/* Spinner opcional para indicar que se están cargando más */}
                    <Spinner size="md" color="primary.500" thickness="3px" />
                </Box>
            )}

            {/* Si ya no hay más, un espacio al final para estética */}
            {!hasMore && !isLoading && <Box _h="20px" mb={12} />}
        </DataLoader>
    );
});

ProjectsList.displayName = "ProjectsList";

export default ProjectsList;
