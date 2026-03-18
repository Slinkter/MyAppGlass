import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Flex,
  useColorModeValue,
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

  const modalBg = useColorModeValue(
    "rgba(255, 255, 255, 0.95)",
    "rgba(20, 20, 20, 0.98)"
  );
  const borderColor = useColorModeValue(
    "rgba(255, 255, 255, 0.35)",
    "rgba(255, 255, 255, 0.15)"
  );
  const textColor = useColorModeValue("gray.800", "gray.100");

  useEffect(() => {
    if (isOpen) {
      setViewMode("map"); // Reset to map on open
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="slideInBottom"
      size={{ base: "full", md: "5xl", lg: "6xl" }}
      scrollBehavior="inside"
      isCentered
      preserveScrollBarGap
    >
      <ModalOverlay backdropFilter={"blur(10px)"} />
      <ModalContent
        role="dialog"
        aria-modal="true"
        borderRadius={{ base: 0, md: "2xl" }}
        bg={modalBg}
        backdropFilter="blur(20px)"
        border="1px solid"
        borderColor={borderColor}
        boxShadow="2xl"
        color={textColor}
        maxH={{ base: "100dvh", md: "auto" }}
        overflow="hidden"
      >
        <ModalCloseButton
          zIndex={10}
          size="lg"
          bg={useColorModeValue("whiteAlpha.800", "blackAlpha.600")}
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
