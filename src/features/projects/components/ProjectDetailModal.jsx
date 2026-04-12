import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Flex,
} from "@chakra-ui/react";
import VisualViewer from "./modal/VisualViewer";
import ProjectInfo from "./modal/ProjectInfo";

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
      <ModalOverlay />
      <ModalContent
        role="dialog"
        aria-modal="true"
        borderRadius={{ base: 0, md: "2xl" }}
        bg="surface.card"
        border="1px solid"
        borderColor="border.default"
        boxShadow="2xl"
        color="text.body"
        maxH={{ base: "100dvh", md: "auto" }}
        overflow="hidden"
      >
        <ModalCloseButton
          zIndex={10}
          size="lg"
          bg="surface.containerHover"
          _hover={{ bg: "red.500", color: "white" }}
          borderRadius="full"
          top={4}
          right={4}
        />
        <ModalBody p={{ base: 0, md: 6 }} pb={{ base: 0, md: 8 }}>
          <Flex
            w="full"
            h={{ base: "100%", lg: "full" }}
            flexDirection={{ base: "column", lg: "row" }}
            gap={{ base: 0, lg: 8 }}
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
