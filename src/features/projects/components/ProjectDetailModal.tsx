"use client";

import React, { useState, useCallback, useEffect } from "react";
import {
  Dialog,
  Flex,
  Skeleton,
} from "@chakra-ui/react";
import VisualViewer from "./modal/VisualViewer";
import ProjectInfo from "./modal/ProjectInfo";

export interface ProjectDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  residencial: string;
  name?: string;
  address: string;
  year: string | number;
  lat?: number | null;
  lng?: number | null;
  photos?: any[];
  g_maps?: string;
}

/**
 * @component ProjectDetailModal
 * @description Refactored for peak performance with deferred content loading.
 * Migrated to Chakra UI v3 Dialog component.
 */
const ProjectDetailModal = (props: ProjectDetailModalProps) => {
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
  const [isContentReady, setIsContentReady] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setIsContentReady(true), 350);
      return () => clearTimeout(timer);
    } else {
      setIsContentReady(false);
    }
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setViewMode("map");
    onClose();
  }, [onClose]);

  const handleOpenChange = useCallback((details: { open: boolean }) => {
    if (!details.open) {
      handleClose();
    }
  }, [handleClose]);

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={handleOpenChange}
      placement="center"
      size={{ base: "full", md: "xl", lg: "cover" }}
      scrollBehavior="inside"
      closeOnInteractOutside
    >
      <Dialog.Backdrop backdropFilter="blur(8px)" />
      <Dialog.Positioner>
        <Dialog.Content
          role="dialog"
          aria-modal="true"
          borderRadius={{ base: 0, md: "3xl" }}
          bg="bg.section"
          border="1px solid"
          borderColor="border.glass"
          boxShadow="2xl"
          color="text.body"
          maxH={{ base: "100dvh", md: "auto" }}
          overflow="hidden"
          mx={{ base: 0, md: 4 }}
        >
          <Dialog.CloseTrigger
            position="absolute"
            zIndex={100}
            top="phi_md"
            right="phi_md"
            bg="surface.container"
            _hover={{ bg: "primary.900", color: "white" }}
            _dark={{ _hover: { bg: "primary.100", color: "primary.900" } }}
            borderRadius="full"
            shadow="md"
          />
          <Dialog.Body p={{ base: 0, md: "phi_lg" }}>
            <Skeleton 
              loading={!isContentReady}
              h="full" 
              w="full" 
              borderRadius="2xl"
            >
              <Flex
                w="full"
                h={{ base: "100%", lg: "full" }}
                flexDirection={{ base: "column", lg: "row" }}
                gap={{ base: 0, lg: "phi_lg" }}
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
            </Skeleton>
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};

export default React.memo(ProjectDetailModal);
