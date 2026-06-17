"use client";
/**
 * @file ProjectDetailView.tsx
 * @description Inmersive detail view for projects.
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
  Container,
  Flex,
} from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { Map, Image as Photo, Home, Building2, MapPin, Calendar } from "lucide-react";
import { getProjectById } from "@features/projects/services/projectService";
import VisualViewer from "@features/projects/components/modal/VisualViewer";
import ProjectDetailItem from "@features/projects/components/ProjectDetailItem";
import BackButton from "@shared/components/navigation/BackButton";
import { ErrorView as ErrorPage } from "@/screens/error";
import AuraSkeleton from "@shared/components/aura/AuraSkeleton";

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

const ProjectDetailView: React.FC = () => {
  const params = useParams();
  const projectId = params?.projectId as string | undefined;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const project = useMemo(() => getProjectById(projectId || ""), [projectId]);
  const [viewMode, setViewMode] = useState<"map" | "gallery">("map");
  const [isPending, startTransition] = useTransition();

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleSelect = useCallback((mode: string) => {
    startTransition(() => {
      setViewMode(mode as "map" | "gallery");
    });
  }, []);

  if (!project) return <ErrorPage />;

  if (isLoading) {
    return (
      <Box bg="bg.page" minH="100vh">
        <Container maxW="7xl" pt={{ base: 4, md: 8 }} pb={32}>
          <VStack gap={{ base: 12, lg: 16 }} align="stretch" w="full">
            {/* Header Sync */}
            <Flex 
              direction={{ base: "column", md: "row" }} 
              justify="space-between" 
              align={{ base: "flex-start", md: "flex-end" }} 
              gap={8}
            >
              <VStack gap={4} align="flex-start">
                <Box mb={2}>
                  <AuraSkeleton h="24px" w="100px" borderRadius="full" />
                </Box>
                <AuraSkeleton h={{ base: "36px", md: "56px" }} w={{ base: "250px", md: "400px" }} />
              </VStack>
              <AuraSkeleton h="44px" w={{ base: "100%", md: "240px" }} borderRadius="full" />
            </Flex>

            {/* Viewer Sync */}
            <Box
              w="full"
              h={{ base: "350px", md: "500px", lg: "65vh" }}
              minH={{ md: "500px" }}
              maxH={{ lg: "800px" }}
            >
              <AuraSkeleton h="full" w="full" borderRadius="3xl" />
            </Box>

            {/* Specifications Sync */}
            <VStack align="flex-start" gap={8} w="full">
              <HStack gap={3}>
                <Box w="20px" h="1px" bg="border.glass" _dark={{ bg: "whiteAlpha.200" }} /> 
                <AuraSkeleton h="16px" w="180px" />
              </HStack>
              <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap={6} w="full">
                <AuraSkeleton h="80px" borderRadius="xl" />
                <AuraSkeleton h="80px" borderRadius="xl" />
                <AuraSkeleton h="80px" borderRadius="xl" />
                <AuraSkeleton h="80px" borderRadius="xl" />
              </SimpleGrid>
            </VStack>
          </VStack>
        </Container>
      </Box>
    );
  }

  return (
    <>
      <Box bg="bg.page" minH="100vh">
        <Container maxW="7xl" pt={{ base: 4, md: 8 }} pb={32}>
          <VStack gap={{ base: 12, lg: 16 }} align="stretch" w="full">
            <Flex 
              direction={{ base: "column", md: "row" }} 
              justify="space-between" 
              align={{ base: "flex-start", md: "flex-end" }} 
              gap={8}
            >
              <VStack gap={4} align="flex-start">
                <Box mb={2}>
                  <BackButton to="/proyectos" />
                </Box>
                <Heading
                  as="h1"
                  size={{ base: "xl", md: "4xl" }}
                  fontWeight="black"
                  letterSpacing="tight"
                  color="text.heading"
                >
                  {project.residencial}
                </Heading>
              </VStack>

              <ViewSelector activeMode={viewMode} onSelect={handleSelect} />
            </Flex>

            <Box
              w="full"
              h={{ base: "350px", md: "500px", lg: "65vh" }}
              minH={{ md: "500px" }}
              maxH={{ lg: "800px" }}
              position="relative"
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
                  photos={project.photosObra}
                  projectData={project}
                />
              </Skeleton>
            </Box>

            <VStack align="flex-start" gap={8} w="full">
              <Heading
                size="xs"
                fontWeight="800"
                color="text.accent"
                textTransform="uppercase"
                letterSpacing="0.3em"
                display="flex"
                alignItems="center"
                gap={3}
              >
                <Box w="20px" h="1px" bg="primary.500" /> Especificaciones Técnicas
              </Heading>

              <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap={6} w="full">
                <ProjectDetailItem icon={Home} label="Residencial" value={project.residencial} />
                <ProjectDetailItem icon={Building2} label="Constructora" value={project.name} />
                <ProjectDetailItem icon={MapPin} label="Dirección" value={project.address} />
                <ProjectDetailItem icon={Calendar} label="Año Entrega" value={project.year} />
              </SimpleGrid>
            </VStack>
          </VStack>
        </Container>
      </Box>
    </>
  );
};

export default ProjectDetailView;
