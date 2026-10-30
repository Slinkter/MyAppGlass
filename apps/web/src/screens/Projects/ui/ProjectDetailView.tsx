"use client";
/**
 * @file ProjectDetailView.tsx
 * @description Inmersive detail view for projects.
 */

import React, { useState, useTransition, useCallback } from "react";
import { useParams, usePathname } from "next/navigation";
import {
  Box,
  Heading,
  VStack,
  Skeleton,
  SimpleGrid,
  HStack,
  Container,
  Flex,
} from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { Map, Image as Photo, Home, Building2, MapPin, Calendar } from "lucide-react";
import type { Project as FirestoreProject } from "@/shared/api/firebase/types";
import { BUILD_SENTINEL } from "@/shared/config/build-sentinel";
import { useProject } from "@features/projects/hooks/useProjects";
import { ProjectDetailSkeleton } from "@features/projects/components/ProjectSkeletons";
import VisualViewer from "@features/projects/components/modal/VisualViewer";
import ProjectDetailItem from "@features/projects/components/ProjectDetailItem";
import BackButton from "@shared/components/navigation/BackButton";
import { ErrorView as ErrorPage } from "@/screens/Error";

export interface ViewSelectorProps {
  activeMode: string;
  onSelect: (mode: string) => void;
}

const viewSelectorOptions = [
  { id: "map", label: "UBICACIÓN", icon: Map },
  { id: "gallery", label: "GALERÍA", icon: Photo },
];

const ViewSelector: React.FC<ViewSelectorProps> = React.memo(({ activeMode, onSelect }) => {
  return (
    <HStack
      bg="bg.subtle"
      p={1.5}
      borderRadius="full"
      display="inline-flex"
      border="1px solid"
      borderColor="border.glass"
      _dark={{ bg: "blackAlpha.400", borderColor: "whiteAlpha.100" }}
    >
      {viewSelectorOptions.map((opt) => {
        const IconComp = opt.icon;
        return (
          <Button
            key={opt.id}
            onClick={() => onSelect(opt.id)}
            size={{ base: "sm", md: "md" }}
            variant={activeMode === opt.id ? "aura" : "ghost"}
            borderRadius="full"
            px={{ base: 6, md: 8 }}
            flexShrink={0}
            fontWeight={activeMode === opt.id ? "bold" : "medium"}
            gap={2}
          >
            <IconComp size={16} /> {opt.label}
          </Button>
        );
      })}
    </HStack>
  );
});

ViewSelector.displayName = "ViewSelector";

interface ProjectDetailViewProps {
  /** Si se omite se toma de la ruta `/proyectos/[projectId]`. */
  projectId?: string;
  /** Proyecto leído de Firestore en build (primer render, para el HTML exportado). */
  initialData?: FirestoreProject;
}

const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({
  projectId: projectIdProp,
  initialData,
}) => {
  const params = useParams();
  const pathname = usePathname();
  const rawId = projectIdProp ?? (params?.projectId as string | undefined);
  // Página centinela (`/proyectos/_`, sin datos de build): el id sale de la URL.
  const projectId =
    rawId === BUILD_SENTINEL ? pathname?.split("/").filter(Boolean).pop() : rawId;
  const { data: project, isLoading } = useProject(projectId, initialData);
  const [viewMode, setViewMode] = useState<"gallery" | "map">("gallery");
  const [isPending, startTransition] = useTransition();

  const handleSelect = useCallback((mode: string) => {
    startTransition(() => {
      setViewMode(mode as "gallery" | "map");
    });
  }, []);

  if (!projectId || projectId === BUILD_SENTINEL) return <ErrorPage />;
  if (isLoading) return <ProjectDetailSkeleton />;
  if (!project) return <ErrorPage />;

  return (
    <Box bg="bg.page" minH="100vh" pt={{ base: 4, md: 6 }} pb={{ base: 16, md: 24 }}>
      <Container maxW="7xl" px={{ base: 4, sm: 6, md: 8 }}>
        <VStack gap={{ base: 6, md: 8 }} align="stretch" w="full">
          {/* Header Superior con Botón Regresar y Selector */}
          <Flex 
            direction={{ base: "column", md: "row" }} 
            justify="space-between" 
            align={{ base: "flex-start", md: "flex-end" }} 
            gap={4}
          >
            <VStack gap={2} align="flex-start">
              <BackButton to="/proyectos" />
              <Heading
                as="h1"
                fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
                fontWeight="900"
                letterSpacing="tight"
                color="text.heading"
                lineHeight="1.1"
              >
                {project.residencial}
              </Heading>
            </VStack>

            <ViewSelector activeMode={viewMode} onSelect={handleSelect} />
          </Flex>

          {/* Visor Principal Nivelado (Mapa / Galería) */}
          <Box
            w="full"
            h={{ base: "320px", sm: "380px", md: "480px" }}
            position="relative"
            borderRadius="3xl"
            overflow="hidden"
          >
            <Skeleton
              loading={isPending}
              h="full"
              w="full"
              borderRadius="3xl"
            >
              <VisualViewer
                viewMode={viewMode}
                lat={project.lat}
                lng={project.lng}
                photos={project.photos ?? project.photosObra}
                projectData={project}
              />
            </Skeleton>
          </Box>

          {/* Ficha Técnica y Especificaciones del Proyecto */}
          <VStack align="flex-start" gap={4} w="full" mt={2}>
            <Heading
              size="xs"
              fontWeight="800"
              color="primary.500"
              textTransform="uppercase"
              letterSpacing="0.25em"
              display="flex"
              alignItems="center"
              gap={2.5}
            >
              <Box w="16px" h="2px" bg="primary.500" /> Ficha Técnica de la Obra
            </Heading>

            <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap={4} w="full">
              <ProjectDetailItem icon={Home} label="Residencial" value={project.residencial} />
              <ProjectDetailItem icon={Building2} label="Cliente / Constructora" value={project.name} />
              <ProjectDetailItem icon={MapPin} label="Ubicación" value={project.address} />
              <ProjectDetailItem icon={Calendar} label="Año de Entrega" value={String(project.year)} />
            </SimpleGrid>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default ProjectDetailView;
