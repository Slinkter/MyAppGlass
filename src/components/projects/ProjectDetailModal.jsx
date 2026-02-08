import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import VisualViewer from "./modal/VisualViewer";
import ProjectInfo from "./modal/ProjectInfo";

// Re-using the Project typedef from projectService.js
/**
 * @typedef {Object} Project - Representa la estructura de un proyecto individual.
 * @property {number} id - Identificador único del proyecto.
 * @property {string} image - Ruta de la imagen principal del proyecto.
 * @property {string} residencial - Nombre del edificio o residencial.
 * @property {string} name - Nombre de la empresa o cliente.
 * @property {string} address - Dirección del proyecto.
 * @property {string} numdpto - Número de departamentos asociados al proyecto.
 * @property {string} year - Año de ejecución del proyecto.
 * @property {string} g_maps - Enlace o dirección de Google Maps del proyecto.
 * @property {Array<Object>} photosObra - Array de objetos de imagen de la obra.
 */

/**
 * @typedef {'map' | 'gallery'} ViewMode - Representa el modo de visualización actual del modal (mapa o galería).
 */

/**
 * @component ProjectDetailModal
 * @description Este componente actúa como un contenedor principal (Smart Component) para la visualización
 * detallada de un proyecto. Implementa el patrón "Modal" de Chakra UI y orquesta
 * la lógica de presentación entre dos vistas principales: Mapa de Ubicación y Galería de Fotos.
 *
 * Responsabilidades:
 * 1. Gestionar el estado de apertura/cierre del modal.
 * 2. Determinar qué vista mostrar (Mapa o Galería) mediante el estado `viewMode`.
 * 3. Preparar la URL segura para el iframe de Google Maps.
 * 4. Pasar los datos necesarios a los componentes de presentación hijos (`VisualViewer` y `ProjectInfo`).
 *
 * @param {Object} props - Propiedades del componente.
 * @param {boolean} props.isOpen - Controla si el modal está visible.
 * @param {function(): void} props.onClose - Función para cerrar el modal.
 * @param {string} props.residencial - Nombre del residencial o proyecto.
 * @param {string} props.name - Nombre de la constructora o cliente.
 * @param {string} props.address - Dirección corta o distrito.
 * @param {string} props.year - Año y mes de entrega del proyecto.
 * @param {string} props.g_maps - Dirección completa para buscar en Google Maps.
 * @param {Array<Object>} props.photos - Array de objetos de imágenes para la galería del proyecto (tipo ProjectImage[]).
 * @returns {JSX.Element} El componente Modal que muestra los detalles del proyecto.
 *
 * @example
 * // Ejemplo de uso en un componente padre:
 * import { useDisclosure, Button } from '@chakra-ui/react';
 * import ProjectDetailModal from './ProjectDetailModal';
 *
 * const sampleProjectData = {
 *   residencial: "Residencial Central",
 *   name: "Constructora X",
 *   address: "Calle Falsa 123",
 *   year: "2024",
 *   g_maps: "Centro de la Ciudad",
 *   photos: [{ id: 1, image: "/path/to/img1.jpg", name: "Fachada" }],
 * };
 *
 * function MyComponent() {
 *   const { isOpen, onOpen, onClose } = useDisclosure();
 *   return (
 *     <>
 *       <Button onClick={onOpen}>Ver Detalles del Proyecto</Button>
 *       <ProjectDetailModal
 *         isOpen={isOpen}
 *         onClose={onClose}
 *         {...sampleProjectData}
 *       />
 *     </>
 *   );
 * }
 */
const ProjectDetailModal = ({
  isOpen,
  onClose,
  residencial,
  name,
  address,
  year,
  g_maps,
  photos,
}) => {
  const [googleMapsUrl, setGoogleMapsUrl] = useState("");
  const [viewMode, setViewMode] = useState("map"); // 'map' | 'gallery'

  const modalBg = useColorModeValue(
    "rgba(255, 255, 255, 0.92)",
    "rgba(20, 20, 20, 0.95)"
  );
  const borderColor = useColorModeValue(
    "rgba(255, 255, 255, 0.35)",
    "rgba(255, 255, 255, 0.15)"
  );
  const textColor = useColorModeValue("gray.800", "gray.100");

  useEffect(() => {
    if (isOpen) {
      setViewMode("map"); // Reset to map on open
      setGoogleMapsUrl(
        `https://www.google.com/maps?q=${encodeURIComponent(
          g_maps
        )}&output=embed`
      );
    }
  }, [isOpen, g_maps]);

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
      >
        <ModalBody p={{ base: 4, md: 6 }} pb={{ base: 6, md: 8 }}>
          <Flex
            w="full"
            h={{ base: "auto", lg: "full" }}
            flexDirection={{ base: "column", lg: "row" }}
            gap={{ base: 6, lg: 8 }}
          >
            <VisualViewer
              viewMode={viewMode}
              googleMapsUrl={googleMapsUrl}
              photos={photos}
            />

            <ProjectInfo
              residencial={residencial}
              name={name}
              address={address}
              year={year}
              g_maps={g_maps}
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
  g_maps: PropTypes.string,
  photos: PropTypes.array,
};

export default React.memo(ProjectDetailModal);