"use client";
/**
 * @file ProjectDetailPage.tsx
 * @description Inmersive detail page for projects, mirroring the Service Detail architecture.
 */

import React, { useMemo, useState, useTransition, useCallback } from "react";
import { useParams } from "next/navigation";
import {
  Box,
  Heading,
  VStack,
  Skeleton,
  SimpleGrid,
  HStack,
  Button,
} from "@chakra-ui/react";
import { Map, Image as Photo, Home, Building2, MapPin, Calendar } from "lucide-react";
import { getProjectById } from "@features/projects/services/projectService";
import VisualViewer from "@features/projects/components/modal/VisualViewer";
import ProjectDetailItem from "@features/projects/components/ProjectDetailItem";
import ErrorPage from "./ErrorPage";
import AuraContainer from "@shared/components/aura/AuraContainer";
import AuraHeader from "@shared/components/aura/AuraHeader";
import AuraSkeleton, { AuraHeaderSkeleton, GallerySkeleton } from "@shared/components/aura/AuraSkeleton";

export interface ViewSelectorProps {
  activeMode: string;
  onSelect: (mode: string) => void;
}

/**
 * @component ViewSelector
 * @description Clon del SystemSelector de servicios para conmutar Map/Gallery.
 */
const ViewSelector: React.FC<ViewSelectorProps> = React.memo(({ activeMode, onSelect }) => {
  const options = [
    { id: "map", label: "UBICACIÓN", icon: Map },
    { id: "gallery", label: "GALERÍA", icon: Photo },
  ];

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
      {options.map((opt) => (
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
          <Box as={opt.icon} size={16} /> {opt.label}
        </Button>
      ))}
    </HStack>
  );
});

ViewSelector.displayName = "ViewSelector";

/**
 * @page ProjectDetailPage
 */
const ProjectDetailPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const project = useMemo(() => getProjectById(projectId), [projectId]);
  const [viewMode, setViewMode] = useState<string>("map");
  const [isPending, startTransition] = useTransition();

  React.useEffect(() => {
    // Simulamos carga para el efecto premium
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleSelect = useCallback((mode: string) => {
    startTransition(() => {
      setViewMode(mode);
    });
  }, []);

  if (!project) return <ErrorPage />;

  if (isLoading) {
    return (
      <AuraContainer>
        <VStack gap="phi_lg" align="stretch" w="full">
           <AuraHeaderSkeleton centered={true} />
           <GallerySkeleton />
           <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap="phi_md" w="full">
             <AuraSkeleton h="80px" borderRadius="xl" />
             <AuraSkeleton h="80px" borderRadius="xl" />
             <AuraSkeleton h="80px" borderRadius="xl" />
             <AuraSkeleton h="80px" borderRadius="xl" />
           </SimpleGrid>
        </VStack>
      </AuraContainer>
    );
  }

  return (
    <>
      <AuraContainer>
        <VStack gap={{ base: "phi_lg", lg: "phi_xl" }} align="center" w="full">
          
          <AuraHeader 
            title={project.residencial}
            overline="Proyecto de Ingeniería"
            backTo="/proyectos"
            centered={true}
            action={<ViewSelector activeMode={viewMode} onSelect={handleSelect} />}
          />

          {/* 2. VISUALIZADOR PRINCIPAL CON SKELETON (para transiciones de modo) */}
          <Box
            w="full"
            maxW="7xl"
            h={{ base: "420px", md: "700px" }}
            position="relative"
            borderRadius={{ base: "2xl", md: "3xl" }}
            overflow="hidden"
            border="1px solid"
            borderColor="border.glass"
            boxShadow="2xl"
          >
            <Skeleton
              loading={isPending}
              h="full"
              w="full"
            >
              <VisualViewer
                viewMode={viewMode}
                lat={project.lat}
                lng={project.lng}
                photos={project.photosObra}
                projectData={project}
              />
            </Skeleton>
          </Box>

          {/* 3. BENTO GRID DE ESPECIFICACIONES */}
          <VStack align="center" gap={{ base: "phi_md", md: "phi_lg" }} w="full">
            <Heading
              size="xs"
              fontWeight="800"
              color="text.accent"
              textTransform="uppercase"
              letterSpacing="0.3em"
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={3}
              w="full"
            >
              <Box w="20px" h="1px" bg="primary.500" /> Especificaciones Técnicas <Box w="20px" h="1px" bg="primary.500" />
            </Heading>

            <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap={{ base: "phi_sm", md: "phi_md" }} w="full">
              <ProjectDetailItem icon={Home} label="Residencial" value={project.residencial} />
              <ProjectDetailItem icon={Building2} label="Constructora" value={project.name} />
              <ProjectDetailItem icon={MapPin} label="Dirección" value={project.address} />
              <ProjectDetailItem icon={Calendar} label="Año Entrega" value={project.year} />
            </SimpleGrid>
          </VStack>

        </VStack>
      </AuraContainer>
    </>
  );
};

export default ProjectDetailPage;
