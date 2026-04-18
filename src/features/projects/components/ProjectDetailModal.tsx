"use client";

import React, { useState, useCallback, createContext, useContext, useMemo } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import {
  DialogRoot,
  DialogContent,
  DialogBody,
  DialogCloseTrigger,
} from "@/components/ui/dialog";
import { m } from "framer-motion";
import VisualViewer from "./modal/VisualViewer";
import ProjectInfo from "./modal/ProjectInfo";
import { ProjectPhoto } from "../services/projectService";

// 1. Context definition
interface ProjectDetailContextValue {
  residencial?: string;
  name?: string;
  address?: string;
  year?: string;
  lat?: number | null;
  lng?: number | null;
  photos: ProjectPhoto[];
  viewMode: "map" | "gallery";
  setViewMode: (mode: "map" | "gallery") => void;
  onClose: () => void;
}

const ProjectDetailContext = createContext<ProjectDetailContextValue | null>(null);

const useProjectDetail = () => {
  const context = useContext(ProjectDetailContext);
  if (!context) {
    throw new Error("ProjectDetail compound components must be used within ProjectDetailModal.Root");
  }
  return context;
};

// 2. Compound Components

/**
 * ProjectDetailModal.Root - Manages state and context
 */
const ProjectDetailRoot: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  residencial?: string;
  name?: string;
  address?: string;
  year?: string;
  lat?: number | null;
  lng?: number | null;
  photos: ProjectPhoto[];
  children: React.ReactNode;
}> = (props) => {
  const {
    isOpen,
    onClose,
    residencial,
    name,
    address,
    year,
    lat,
    lng,
    photos,
    children,
  } = props;

  const [viewMode, setViewMode] = useState<"map" | "gallery">("map");

  const handleClose = useCallback(() => {
    setViewMode("map");
    onClose();
  }, [onClose]);

  const value = useMemo(() => ({
    residencial,
    name,
    address,
    year,
    lat,
    lng,
    photos,
    viewMode,
    setViewMode,
    onClose: handleClose,
  }), [residencial, name, address, year, lat, lng, photos, viewMode, handleClose]);

  return (
    <ProjectDetailContext.Provider value={value}>
      <DialogRoot
        open={isOpen}
        onOpenChange={(e) => !e.open && handleClose()}
        placement="center"
        motionPreset="none"
        size={{ base: "full", md: "5xl", lg: "7xl" }}
        scrollBehavior="inside"
        preserveScrollBarGap
      >
        <DialogContent
          asChild
          borderRadius={{ base: 0, md: "3xl" }}
          bg="surface.card"
          backdropFilter="blur(32px)"
          border="1px solid"
          borderColor="border.glass"
          boxShadow="2xl"
          color="text.body"
          maxH={{ base: "100dvh", md: "90vh" }}
          overflow="hidden"
          mx={{ base: 0, md: 4 }}
        >
          {/* Custom immersive expansion animation */}
          <Box
            as={m.div}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            w="full"
            h="full"
            display="flex"
            flexDirection="column"
          >
            {/* Focus Anchor: Prevents focus-trap crash in v3 */}
            <Box as="button" position="absolute" opacity={0} pointerEvents="none" aria-hidden="true" />

            <DialogCloseTrigger
              zIndex={100}
              bg="surface.container"
              _hover={{ bg: "primary.900", color: "white" }}
              _dark={{ _hover: { bg: "primary.100", color: "primary.900" } }}
              borderRadius="full"
              top="phi_md"
              right="phi_md"
              boxShadow="md"
            />
            
            <DialogBody p={{ base: 0, md: "phi_lg" }} display="flex" flexDirection="column" gap="phi_lg" overflowY="auto">
              {children}
            </DialogBody>
          </Box>
        </DialogContent>
      </DialogRoot>
    </ProjectDetailContext.Provider>
  );
};

/**
 * ProjectDetailModal.Header - Renders project titles
 */
const ProjectDetailHeader: React.FC = () => {
  const { residencial } = useProjectDetail();
  
  return (
    <Box px={{ base: "phi_md", md: 0 }} pt={{ base: "phi_xl", md: 0 }}>
      <Text fontSize="xs" fontWeight="900" color="primary.500" letterSpacing="0.4em" textTransform="uppercase" mb={2}>
        Portfolio de Ingeniería
      </Text>
      <Heading as="h2" fontFamily="heading" size={{ base: "2xl", md: "3xl" }} color="text.heading">
        {residencial}
      </Heading>
    </Box>
  );
};

/**
 * ProjectDetailModal.Visuals - Renders the visual viewer (Map or Gallery)
 */
const ProjectDetailVisuals: React.FC = () => {
  const { viewMode, lat, lng, photos } = useProjectDetail();
  
  return (
    <VisualViewer
      viewMode={viewMode}
      lat={lat}
      lng={lng}
      photos={photos}
    />
  );
};

/**
 * ProjectDetailModal.Content - Renders project info and controls
 */
const ProjectDetailContent: React.FC = () => {
  const { residencial, name, address, year, viewMode, setViewMode, onClose } = useProjectDetail();
  
  return (
    <ProjectInfo
      residencial={residencial}
      name={name}
      address={address}
      year={year}
      viewMode={viewMode}
      setViewMode={setViewMode}
      onClose={onClose}
    />
  );
};

/**
 * ProjectDetailModal.Body - Layout container for visuals and content
 */
const ProjectDetailBody: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Flex
      w="full"
      flex="1"
      h={{ base: "auto", lg: "full" }}
      flexDirection={{ base: "column", lg: "row" }}
      gap="phi_lg"
      align="stretch"
    >
      {children}
    </Flex>
  );
};

/**
 * @component ProjectDetailModal
 * @description Refactored for Compound Components pattern to reduce prop drilling.
 */
const ProjectDetailModal = Object.assign(ProjectDetailRoot, {
  Root: ProjectDetailRoot,
  Header: ProjectDetailHeader,
  Visuals: ProjectDetailVisuals,
  Content: ProjectDetailContent,
  Body: ProjectDetailBody,
});

export default ProjectDetailModal;
