"use client";

import React, { useState, useCallback } from "react";
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
import VisualViewer from "./modal/VisualViewer";
import ProjectInfo from "./modal/ProjectInfo";
import { ProjectPhoto } from "../data/projects";

interface ProjectDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  residencial?: string;
  name?: string;
  address?: string;
  year?: string;
  lat?: number | null;
  lng?: number | null;
  photos: ProjectPhoto[];
}

/**
 * @component ProjectDetailModal
 * @description Refactored for Chakra UI v3 with Dialog component.
 */
const ProjectDetailModal: React.FC<ProjectDetailModalProps> = (props) => {
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
  } = props;

  const [viewMode, setViewMode] = useState<"map" | "gallery">("map");

  const handleClose = useCallback(() => {
    setViewMode("map");
    onClose();
  }, [onClose]);

  return (
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
            {/* Header Inmersivo */}
            <Box px={{ base: "phi_md", md: 0 }} pt={{ base: "phi_xl", md: 0 }}>
              <Text fontSize="xs" fontWeight="900" color="primary.500" letterSpacing="0.4em" textTransform="uppercase" mb={2}>
                Portfolio de Ingeniería
              </Text>
              <Heading as="h2" fontFamily="heading" size={{ base: "2xl", md: "3xl" }} color="text.heading">
                {residencial}
              </Heading>
            </Box>

            <Flex
              w="full"
              flex="1"
              h={{ base: "auto", lg: "full" }}
              flexDirection={{ base: "column", lg: "row" }}
              gap="phi_lg"
              align="stretch"
            >
              <VisualViewer
                viewMode={viewMode}
                lat={lat}
                lng={lng}
                photos={photos}
              />

              <ProjectInfo
                residencial={residencial}
                name={name}
                address={address}
                year={year}
                viewMode={viewMode}
                setViewMode={setViewMode}
                onClose={onClose}
              />
            </Flex>
          </DialogBody>
        </Box>
      </DialogContent>
    </DialogRoot>
  );
};

export default React.memo(ProjectDetailModal);
