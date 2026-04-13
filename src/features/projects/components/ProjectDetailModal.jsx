import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Flex,
  Skeleton,
} from "@chakra-ui/react";
import VisualViewer from "./modal/VisualViewer";
import ProjectInfo from "./modal/ProjectInfo";

/**
 * @component ProjectDetailModal
 * @description Refactored for peak performance with deferred content loading.
 */
const ProjectDetailModal = (props) => {
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

  const [viewMode, setViewMode] = useState("map"); // 'map' | 'gallery'
  const [isContentReady, setIsContentReady] = useState(false);

  // Defer content rendering to prevent modal opening lag
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

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      motionPreset="slideInBottom"
      size={{ base: "full", md: "5xl", lg: "6xl" }}
      scrollBehavior="inside"
      isCentered
      preserveScrollBarGap
    >
      <ModalOverlay backdropFilter="blur(8px)" />
      <ModalContent
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
        <ModalCloseButton
          zIndex={100}
          size="lg"
          bg="surface.container"
          _hover={{ bg: "primary.900", color: "white" }}
          _dark={{ _hover: { bg: "primary.100", color: "primary.900" } }}
          borderRadius="full"
          top="phi_md"
          right="phi_md"
          shadow="md"
        />
        <ModalBody p={{ base: 0, md: "phi_lg" }}>
          <Skeleton 
            isLoaded={isContentReady} 
            h="full" 
            w="full" 
            fadeDuration={0.6}
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
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

ProjectDetailModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  residencial: PropTypes.string,
  name: PropTypes.string,
  address: PropTypes.string,
  year: PropTypes.string,
  lat: PropTypes.number,
  lng: PropTypes.number,
  photos: PropTypes.array,
};

export default React.memo(ProjectDetailModal);
