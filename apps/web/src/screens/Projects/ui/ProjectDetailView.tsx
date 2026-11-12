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
import { Button } from "@/shared/ui/button";
import { Map, Image as Photo, Home, Building2, MapPin, Calendar } from "lucide-react";
import type { Project as FirestoreProject } from "@/shared/api/firebase/types";
import { BUILD_SENTINEL } from "@/shared/config/build-sentinel";
import { useProject } from "@/entities/project/api/useProjects";
import { ProjectDetailSkeleton } from "@/entities/project/ui/ProjectSkeletons";
import VisualViewer from "@/entities/project/ui/modal/VisualViewer";
import ProjectDetailItem from "@/entities/project/ui/ProjectDetailItem";
import BackButton from "@shared/components/navigation/BackButton";
import ErrorPage from "@/shared/components/ErrorView";
import { Reveal } from "@/shared/components/motion/Reveal";
import { ProjectAlbumGrid } from "./ProjectAlbumGrid";

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
      borderColor="border.default"
      _dark={{ bg: "blackAlpha.400", borderColor: "whiteAlpha.100" }}
    >
      {viewSelectorOptions.map((opt) => {
        const IconComp = opt.icon;
        return (
          <Button
            key={opt.id}
            onClick={() => onSelect(opt.id)}
            size={{ base: "sm", md: "md" }}
            variant={activeMode === opt.id ? "primary" : "ghost"}
            borderRadius="full"
            px={{ base: 6, md: 8 }}
            flexShrink={0}
            fontWeight={activeMode === opt.id ? "bold" : "medium"}
            gap={2}
          >
            <IconComp size={16} style={{ flexShrink: 0 }} /> {opt.label}
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
    <Box bg="bg.page" minH="dvh" pt={{ base: 4, md: 6 }} pb={{ base: 16, md: 24 }}>
      <Container maxW="pageWide" px={{ base: 4, sm: 6, md: 8 }}>
        <VStack gap={{ base: 6, md: 8 }} align="stretch" w="full">
          {/* Header Superior con Botón Regresar y Selector */}
          <Reveal motion="cine" index={0}>
            <Flex 
              direction={{ base: "column", md: "row" }} 
              justify="space-between" 
              align={{ base: "flex-start", md: "flex-end" }} 
              gap={4}
            >
              <VStack gap={2} align="flex-start">
                <BackButton to="/#proyectos" />
                <Heading
                  as="h1"
                  fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
                  fontWeight="700"
                  letterSpacing="tight"
                  color="text.heading"
                  lineHeight="1.1"
                >
                  {project.residencial}
                </Heading>
              </VStack>

              <Box display={{ base: "inline-flex", md: "none" }}>
                <ViewSelector activeMode={viewMode} onSelect={handleSelect} />
              </Box>
            </Flex>
          </Reveal>

          {/* Visor Principal: en móvil alterna Álbum/Mapa; en desktop muestra ambos */}
          <Reveal motion="cine" index={1}>
            <VStack gap={6} align="stretch" w="full">
              <Box display={{ base: viewMode === "gallery" ? "block" : "none", md: "block" }}>
                <ProjectAlbumGrid
                  photos={project.photos ?? project.photosObra}
                  projectTitle={project.residencial || project.name || "Proyecto"}
                />
              </Box>

              <Box
                display={{ base: viewMode === "map" ? "block" : "none", md: "block" }}
                w="full"
                h={{ base: "20rem", sm: "23.75rem", md: "26rem" }}
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
                    viewMode="map"
                    lat={project.lat}
                    lng={project.lng}
                    photos={project.photos ?? project.photosObra}
                    projectData={project}
                  />
                </Skeleton>
              </Box>
            </VStack>
          </Reveal>

          {/* Ficha Técnica y Especificaciones del Proyecto */}
          <Reveal motion="cine" index={2}>
            <VStack align="flex-start" gap={4} w="full" mt={2}>
              <Heading
                size="xs"
                fontWeight="700"
                color="text.accent"
                textTransform="uppercase"
                letterSpacing="0.25em"
                display="flex"
                alignItems="center"
                gap={2.5}
              >
                <Box w="16px" h="2px" bg="brand.coral" /> Ficha Técnica de la Obra
              </Heading>

              <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap={4} w="full">
                <ProjectDetailItem icon={Home} label="Residencial" value={project.residencial} />
                <ProjectDetailItem icon={Building2} label="Cliente / Constructora" value={project.name} />
                <ProjectDetailItem icon={MapPin} label="Ubicación" value={project.address} />
                <ProjectDetailItem icon={Calendar} label="Año de Entrega" value={String(project.year)} />
              </SimpleGrid>
            </VStack>
          </Reveal>
        </VStack>
      </Container>
    </Box>
  );
};

export default ProjectDetailView;
