import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  ButtonGroup,
  Heading,
  Grid,
  Icon,
} from "@chakra-ui/react";
import { LazyMotion, m, domAnimation } from "framer-motion";
import {
  MapIcon,
  PhotoIcon,
  HomeIcon,
  BuildingOffice2Icon,
  MapPinIcon,
  CalendarDaysIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import GlassCard from "@shared/components/common/GlassCard";
import ProjectDetailItem from "../ProjectDetailItem";

/**
 * Componente: ProjectInfo
 * --------------------------------------------------------------------
 * @description
 * Componente de presentación que muestra la tarjeta de detalles del proyecto ("GlassCard").
 * Contiene la información textual (metadata) y los controles de interacción del usuario.
 *
 * Elementos que renderiza:
 * 1. `ButtonGroup`: Controles superiores para alternar entre la vista de "Ubicación" y "Galería".
 *    - Gestiona el estado visual de los botones (activo/inactivo) usando colores primarios.
 * 2. Lista de Detalles: Itera sobre los datos del proyecto (Residencial, Dirección, Año) y los
 *    muestra usando el subcomponente `ProjectDetailItem` con iconos vectoriales.
 * 3. Botón de Cierre: Un botón explícito para cerrar el modal, importante para la usabilidad móvil.
 *
 * @param {Object} props
 * @param {string} props.viewMode - Estado actual de la vista ('map' | 'gallery') para resaltar botones.
 * @param {function} props.setViewMode - Función para cambiar la vista.
 * @param {function} props.onClose - Función para cerrar el modal padre.
 * @param {string} [props.residencial] - Información del proyecto.
 * // ... otras props de datos del proyecto
 */
const ProjectInfo = ({
  residencial,
  name,
  address,
  year,
  viewMode,
  setViewMode,
  onClose,
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  return (
    <LazyMotion features={domAnimation}>
    <GlassCard
      flex={{ base: "1", lg: "2" }}
      w="100%"
      p={{ base: 5, md: 6 }}
      h={{ base: "auto", lg: "100%" }}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      gap={4}
      overflowY={{ base: "auto", lg: "visible" }}
      borderRadius={{ base: "0", lg: "2xl" }}
      boxShadow="none"
    >
      {/* View Switcher */}
      <ButtonGroup w="full" isAttached variant="outline">
        <Button
          w="full"
          leftIcon={<Icon as={MapIcon} />}
          onClick={() => setViewMode("map")}
          isActive={viewMode === "map"}
          bg={viewMode === "map" ? "primary.500" : "transparent"}
          color={viewMode === "map" ? "white" : "inherit"}
          _hover={{
            bg: viewMode === "map" ? "primary.600" : "whiteAlpha.200",
          }}
          _active={{
            bg: "primary.600",
          }}
        >
          Ubicación
        </Button>
        <Button
          w="full"
          leftIcon={<Icon as={PhotoIcon} />}
          onClick={() => setViewMode("gallery")}
          isActive={viewMode === "gallery"}
          bg={viewMode === "gallery" ? "primary.500" : "transparent"}
          color={viewMode === "gallery" ? "white" : "inherit"}
          _hover={{
            bg: viewMode === "gallery" ? "primary.600" : "whiteAlpha.200",
          }}
          _active={{
            bg: "primary.600",
          }}
        >
          Galería
        </Button>
      </ButtonGroup>

      <Box as={m.div} initial="hidden" animate="show" variants={containerVariants}>
        <Heading
          as={m.h2}
          variants={itemVariants}
          size="md"
          mb={6}
          borderBottom="2px solid"
          borderColor="primary.500"
          pb={2}
          display="inline-block"
          width="fit-content"
        >
          Detalles del Proyecto
        </Heading>
        <Grid 
          templateColumns={{ base: "1fr 1fr", md: "1fr 1fr", lg: "1fr" }} 
          gap={4}
        >
          <m.div variants={itemVariants}>
            <ProjectDetailItem
              icon={HomeIcon}
              label="Residencial"
              value={residencial}
            />
          </m.div>
          
          <m.div variants={itemVariants}>
            <ProjectDetailItem
              icon={BuildingOffice2Icon}
              label="Constructora"
              value={name}
            />
          </m.div>
          
          <m.div variants={itemVariants}>
            <ProjectDetailItem 
              icon={MapPinIcon} 
              label="Dirección" 
              value={address} 
            />
          </m.div>
          
          <m.div variants={itemVariants}>
            <ProjectDetailItem 
              icon={CalendarDaysIcon} 
              label="Año" 
              value={year} 
            />
          </m.div>
        </Grid>
      </Box>

      {/* Close Button */}
      <Button
        onClick={onClose}
        leftIcon={<Icon as={XMarkIcon} />}
        variant="outline"
        colorScheme="red"
        size="sm"
        w="full"
        _hover={{
          bg: "red.500",
          color: "white",
          borderColor: "red.500",
        }}
      >
        Cerrar Ventana
      </Button>
    </GlassCard>
    </LazyMotion>
  );
};

ProjectInfo.propTypes = {
  residencial: PropTypes.string,
  name: PropTypes.string,
  address: PropTypes.string,
  year: PropTypes.string,
  viewMode: PropTypes.oneOf(["map", "gallery"]).isRequired,
  setViewMode: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ProjectInfo;
