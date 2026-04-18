import React from "react";
import {
  Box,
  ButtonGroup,
  Heading,
  Grid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { LazyMotion, m, domAnimation } from "framer-motion";
import {
  Map,
  Image as Photo,
  Home,
  Building2,
  MapPin,
  Calendar,
} from "lucide-react";
import ProjectDetailItem from "../ProjectDetailItem";

const MotionBox = m.create(Box);
const MotionHeading = m.create(Heading);

interface ProjectInfoProps {
  residencial?: string;
  name?: string;
  address?: string;
  year?: string;
  viewMode: "map" | "gallery";
  setViewMode: (mode: "map" | "gallery") => void;
  onClose: () => void;
}

/**
 * @component ProjectInfo
 * @description Presentational component for project details inside the modal.
 */
const ProjectInfo: React.FC<ProjectInfoProps> = ({
  residencial,
  name,
  address,
  year,
  viewMode,
  setViewMode,
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -15 },
    show: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 400, damping: 30 } },
  };

  return (
    <LazyMotion features={domAnimation}>
      <VStack
        flex={{ base: "none", lg: "1" }}
        w="100%"
        p={{ base: "phi_md", md: "phi_lg" }}
        bg="bg.subtle"
        borderRadius="2xl"
        border="1px solid"
        borderColor="border.glass"
        h={{ base: "auto", lg: "full" }}
        align="stretch"
        justify="space-between"
        gap="phi_md"
        overflowY="auto"
      >
        <MotionBox initial="hidden" animate="show" variants={containerVariants}>
          <MotionHeading
            variants={itemVariants}
            size="xs"
            fontWeight="900"
            color="primary.500"
            textTransform="uppercase"
            letterSpacing="0.3em"
            mb="phi_lg"
            display="flex"
            alignItems="center"
            gap={3}
          >
            <Box w="20px" h="1px" bg="primary.500" /> Especificaciones Técnicas
          </MotionHeading>
          
          <Grid
            templateColumns={{ base: "1fr", sm: "1fr 1fr", lg: "1fr" }}
            gap={4}
          >
            <MotionBox variants={itemVariants}>
              <ProjectDetailItem
                icon={Home}
                label="Residencial"
                value={residencial}
              />
            </MotionBox>

            <MotionBox variants={itemVariants}>
              <ProjectDetailItem
                icon={Building2}
                label="Constructora"
                value={name}
              />
            </MotionBox>

            <MotionBox variants={itemVariants}>
              <ProjectDetailItem
                icon={MapPin}
                label="Dirección"
                value={address}
              />
            </MotionBox>

            <MotionBox variants={itemVariants}>
              <ProjectDetailItem
                icon={Calendar}
                label="Año Entrega"
                value={year}
              />
            </MotionBox>
          </Grid>
        </MotionBox>

        {/* View Switcher - Reubicado al pie de la ficha */}
        <VStack gap={4} w="full" pt={6} borderTop="1px solid" borderColor="border.glass">
          <Text fontSize="10px" fontWeight="bold" color="text.muted" letterSpacing="0.1em" textTransform="uppercase">
            Visualización de Obra
          </Text>
          <ButtonGroup w="full" gap={2} variant="outline" size="sm">
            <Button
              flex="1"
              onClick={() => setViewMode("map")}
              variant={viewMode === "map" ? "aura" : "ghost"}
              borderRadius="full"
              gap={2}
              py={5}
            >
              <Map size={16} /> UBICACIÓN
            </Button>
            <Button
              flex="1"
              onClick={() => setViewMode("gallery")}
              variant={viewMode === "gallery" ? "aura" : "ghost"}
              borderRadius="full"
              gap={2}
              py={5}
            >
              <Photo size={16} /> GALERÍA
            </Button>
          </ButtonGroup>
        </VStack>
      </VStack>
    </LazyMotion>
  );
};

export default ProjectInfo;
