import React from "react";
import PropTypes from "prop-types";
import {
  Box,
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
    show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 400, damping: 30 } },
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
        <ButtonGroup w="full" isAttached variant="outline" size="md">
          <Button
            w="full"
            leftIcon={<Icon as={Map} />}
            onClick={() => setViewMode("map")}
            variant={viewMode === "map" ? "aura" : "outline"}
            borderRadius="full"
            borderRightRadius={0}
          >
            Ubicación
          </Button>
          <Button
            w="full"
            leftIcon={<Icon as={Photo} />}
            onClick={() => setViewMode("gallery")}
            variant={viewMode === "gallery" ? "aura" : "outline"}
            borderRadius="full"
            borderLeftRadius={0}
          >
            Galería
          </Button>
        </ButtonGroup>

        <Box as={m.div} initial="hidden" animate="show" variants={containerVariants}>
          <Heading
            as={m.h2}
            variants={itemVariants}
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
          
          <Grid
            templateColumns={{ base: "1fr", sm: "1fr 1fr", lg: "1fr" }}
            gap="phi_md"
          >
            <Box as={m.div} variants={itemVariants}>
              <ProjectDetailItem
                icon={Home}
                label="Residencial"
                value={residencial}
              />
            </Box>

            <Box as={m.div} variants={itemVariants}>
              <ProjectDetailItem
                icon={Building2}
                label="Constructora"
                value={name}
              />
            </Box>

            <Box as={m.div} variants={itemVariants}>
              <ProjectDetailItem
                icon={MapPin}
                label="Dirección"
                value={address}
              />
            </Box>

            <Box as={m.div} variants={itemVariants}>
              <ProjectDetailItem
                icon={Calendar}
                label="Año"
                value={year}
              />
            </Box>
          </Grid>
        </Box>
      </VStack>
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
