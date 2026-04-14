import React, { useMemo, useState, useTransition, useCallback } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Flex,
  Button,
  HStack,
  Skeleton,
  SimpleGrid,
} from "@chakra-ui/react";
import { Map, Image as Photo } from "lucide-react";
import { getProjectById } from "@features/projects/services/projectService";
import VisualViewer from "@features/projects/components/modal/VisualViewer";
import ProjectDetailItem from "@features/projects/components/ProjectDetailItem";
import HelmetWrapper from "@shared/components/HelmetWrapper";
import BackButton from "@shared/components/navigation/BackButton";
import ErrorPage from "./ErrorPage";
import { LazyMotion, m, domAnimation } from "framer-motion";
import { Home, Building2, MapPin, Calendar } from "lucide-react";

/**
 * @component ViewSelector
 * @description Clon del SystemSelector de servicios para conmutar Map/Gallery.
 */
const ViewSelector = React.memo(({ activeMode, onSelect }) => {
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
 * @description Inmersive detail page for projects, mirroring the Service Detail architecture.
 */
const ProjectDetailPage = () => {
  const { projectId } = useParams();
  const project = useMemo(() => getProjectById(projectId), [projectId]);
  const [viewMode, setViewMode] = useState("map");
  const [isPending, startTransition] = useTransition();

  const handleSelect = useCallback((mode) => {
    startTransition(() => {
      setViewMode(mode);
    });
  }, []);

  if (!project) return <ErrorPage />;

  return (
    <>
      <HelmetWrapper
        title={`${project.residencial} - Proyecto | GYA Company`}
        description={`Ficha técnica y visual del proyecto ${project.residencial}.`}
      />

      <LazyMotion features={domAnimation}>
        <Box
          as={m.div}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          bg="bg.page"
          minH="100vh"
          pb={32}
        >
          <Container maxW="7xl" pt={{ base: 24, md: 32 }}>
            <VStack gap={{ base: 12, lg: 16 }} align="stretch">
              
              {/* 1. CABECERA Y SELECTOR (Igual a Servicios) */}
              <Flex 
                direction={{ base: "column", md: "row" }} 
                justify="space-between" 
                align={{ base: "flex-start", md: "flex-end" }} 
                gap={8}
              >
                <VStack gap={4} align="flex-start">
                  <Box mb={2}><BackButton to="/proyectos" /></Box>
                  <VStack align="start" gap={1}>
                    <Text fontSize="xs" fontWeight="900" color="primary.500" letterSpacing="0.4em" textTransform="uppercase">
                      Proyecto de Ingeniería
                    </Text>
                    <Heading size={{ base: "xl", md: "4xl" }} fontWeight="black" letterSpacing="tight" color="text.heading" fontFamily="heading">
                      {project.residencial}
                    </Heading>
                  </VStack>
                </VStack>
                <ViewSelector activeMode={viewMode} onSelect={handleSelect} />
              </Flex>

              {/* 2. VISUALIZADOR PRINCIPAL CON SKELETON */}
              <Skeleton
                loading={isPending}
                borderRadius="3xl"
                h={{ base: "450px", md: "700px" }}
              >
                <Box
                  h="full"
                  position="relative"
                  borderRadius="3xl"
                  overflow="hidden"
                  border="1px solid"
                  borderColor="border.glass"
                  boxShadow="2xl"
                >
                  <VisualViewer
                    viewMode={viewMode}
                    lat={project.lat}
                    lng={project.lng}
                    photos={project.photosObra}
                    projectData={project}
                  />                </Box>
              </Skeleton>

              {/* 3. BENTO GRID DE ESPECIFICACIONES */}
              <VStack align="stretch" gap={8}>
                <Heading
                  size="xs"
                  fontWeight="900"
                  color="primary.500"
                  textTransform="uppercase"
                  letterSpacing="0.3em"
                  display="flex"
                  alignItems="center"
                  gap={3}
                >
                  <Box w="20px" h="1px" bg="primary.500" /> Especificaciones Técnicas
                </Heading>

                <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap={6}>
                  <ProjectDetailItem icon={Home} label="Residencial" value={project.residencial} />
                  <ProjectDetailItem icon={Building2} label="Constructora" value={project.name} />
                  <ProjectDetailItem icon={MapPin} label="Dirección" value={project.address} />
                  <ProjectDetailItem icon={Calendar} label="Año Entrega" value={project.year} />
                </SimpleGrid>
              </VStack>

            </VStack>
          </Container>
        </Box>
      </LazyMotion>
    </>
  );
};

export default ProjectDetailPage;
