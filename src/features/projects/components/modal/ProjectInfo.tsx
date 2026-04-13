"use client";

import React from "react";
import {
  Button,
  ButtonGroup,
  Heading,
  Grid,
  Icon,
  VStack,
} from "@chakra-ui/react";
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

export interface ProjectInfoProps {
  residencial: string;
  name?: string;
  address: string;
  year: string | number;
  viewMode: "map" | "gallery";
  setViewMode: (_mode: "map" | "gallery") => void;
  onClose: () => void;
}

/**
 * @component ProjectInfo
 * @description Presentational component for project details inside the modal.
 */
const ProjectInfo = ({
  residencial,
  name,
  address,
  year,
  viewMode,
  setViewMode,
}: ProjectInfoProps) => {
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
        flex={{ base: "1", lg: "2" }}
        w="100%"
        p={{ base: "phi_md", md: "phi_lg" }}
        h={{ base: "auto", lg: "100%" }}
        align="stretch"
        justify="space-between"
        gap="phi_md"
        overflowY={{ base: "auto", lg: "visible" }}
      >
        {/* View Switcher */}
        <ButtonGroup w="full" attached variant="outline" size="md">
          <Button
            w="full"
            onClick={() => setViewMode("map")}
            variant={viewMode === "map" ? "solid" : "outline"}
            borderRadius="full"
            borderRightRadius={0}
          >
            <Icon as={Map} /> Ubicación
          </Button>
          <Button
            w="full"
            onClick={() => setViewMode("gallery")}
            variant={viewMode === "gallery" ? "solid" : "outline"}
            borderRadius="full"
            borderLeftRadius={0}
          >
            <Icon as={Photo} /> Galería
          </Button>
        </ButtonGroup>

        <m.div initial="hidden" animate="show" variants={containerVariants}>
          <m.div variants={itemVariants}>
            <Heading
              as="h2"
              size="sm"
              fontWeight="900"
              color="primary.500"
              textTransform="uppercase"
              letterSpacing="0.2em"
              mb="phi_md"
              pb={2}
              borderBottom="2px solid"
              borderColor="border.glass"
              width="fit-content"
            >
              Especificaciones
            </Heading>
          </m.div>
          
          <Grid
            templateColumns={{ base: "1fr", sm: "1fr 1fr", lg: "1fr" }}
            gap="phi_md"
          >
            <m.div variants={itemVariants}>
              <ProjectDetailItem
                icon={Home}
                label="Residencial"
                value={residencial}
              />
            </m.div>

            <m.div variants={itemVariants}>
              <ProjectDetailItem
                icon={Building2}
                label="Constructora"
                value={name}
              />
            </m.div>

            <m.div variants={itemVariants}>
              <ProjectDetailItem
                icon={MapPin}
                label="Dirección"
                value={address}
              />
            </m.div>

            <m.div variants={itemVariants}>
              <ProjectDetailItem
                icon={Calendar}
                label="Año"
                value={year}
              />
            </m.div>
          </Grid>
        </m.div>
      </VStack>
    </LazyMotion>
  );
};

export default ProjectInfo;
