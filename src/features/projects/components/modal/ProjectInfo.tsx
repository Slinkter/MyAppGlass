import React from "react";
import {
  Box,
  Heading,
  Grid,
  Text,
  VStack,
  Flex,
} from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { useColorModeValue } from "@/components/ui/color-mode-hooks";
import { m } from "framer-motion";

import {
  Map,
  Image as Photo,
  Home,
  Building2,
  MapPin,
  Calendar,
} from "lucide-react";
import ProjectDetailItem from "../ProjectDetailItem";



interface ProjectInfoProps {
  residencial?: string;
  name?: string;
  address?: string;
  year?: string;
  viewMode: "map" | "gallery";
  setViewMode: (mode: "map" | "gallery") => void;
  onClose: () => void;
}

/**
 * @component ProjectInfo
 * @description Presentational component for project details inside the modal.
 */
const ProjectInfo: React.FC<ProjectInfoProps> = ({
  residencial,
  name,
  address,
  year,
  viewMode,
  setViewMode,
}) => {
  const activeBg = useColorModeValue("var(--chakra-colors-primary-900)", "var(--chakra-colors-primary-100)");
  const activeColor = useColorModeValue("white", "var(--chakra-colors-primary-900)");
  const inactiveColor = useColorModeValue("var(--chakra-colors-text-muted)", "var(--chakra-colors-text-body)");

  return (
      <VStack
        flex={{ base: "none", lg: "1" }}
        w="100%"
        p={{ base: "6", md: "8" }}
        bg="bg.subtle"
        borderRadius="2xl"
        border="1px solid"
        borderColor="border.glass"
        h={{ base: "auto", lg: "full" }}
        align="stretch"
        justify="space-between"
        gap="6"
        overflowY="auto"
      >
        <Box>
          <Heading
            size="xs"
            fontWeight="900"
            color="primary.500"
            textTransform="uppercase"
            letterSpacing="0.3em"
            mb="8"
            display="flex"
            alignItems="center"
            gap="4"
          >
            <Box w="20px" h="1px" bg="primary.500" /> Especificaciones Técnicas
          </Heading>
          
          <Grid
            templateColumns={{ base: "1fr", sm: "1fr 1fr", lg: "1fr" }}
            gap="6"
          >
            <Box>
              <ProjectDetailItem
                icon={Home}
                label="Residencial"
                value={residencial}
              />
            </Box>

            <Box>
              <ProjectDetailItem
                icon={Building2}
                label="Constructora"
                value={name}
              />
            </Box>

            <Box>
              <ProjectDetailItem
                icon={MapPin}
                label="Dirección"
                value={address}
              />
            </Box>

            <Box>
              <ProjectDetailItem
                icon={Calendar}
                label="Año Entrega"
                value={year}
              />
            </Box>
          </Grid>
        </Box>

        {/* View Switcher - Reubicado al pie de la ficha */}
        <VStack gap="6" w="full" pt="6" borderTop="1px solid" borderColor="border.glass">
          <Text fontSize="10px" fontWeight="bold" color="text.muted" letterSpacing="0.1em" textTransform="uppercase">
            Visualización de Obra
          </Text>
          <Box w="full" position="relative" bg="bg.panel" borderRadius="full" p="1" border="1px solid" borderColor="border.default">
            <Flex w="full" gap="1" position="relative">
              <Button
                flex="1"
                onClick={() => setViewMode("map")}
                variant="ghost"
                borderRadius="full"
                position="relative"
                color={viewMode === "map" ? activeColor : inactiveColor}
                _hover={{ bg: "transparent" }}
                transition="color 0.25s ease"
                py="6"
              >
                {viewMode === "map" && (
                  <m.div
                    layoutId="activeModalTabIndicator"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "9999px",
                      background: activeBg,
                      zIndex: 0,
                    }}
                  />
                )}
                <Box zIndex={1} display="flex" alignItems="center" gap="2">
                  <Map size={16} /> UBICACIÓN
                </Box>
              </Button>
              <Button
                flex="1"
                onClick={() => setViewMode("gallery")}
                variant="ghost"
                borderRadius="full"
                position="relative"
                color={viewMode === "gallery" ? activeColor : inactiveColor}
                _hover={{ bg: "transparent" }}
                transition="color 0.25s ease"
                py="6"
              >
                {viewMode === "gallery" && (
                  <m.div
                    layoutId="activeModalTabIndicator"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "9999px",
                      background: activeBg,
                      zIndex: 0,
                    }}
                  />
                )}
                <Box zIndex={1} display="flex" alignItems="center" gap="2">
                  <Photo size={16} /> GALERÍA
                </Box>
              </Button>
            </Flex>
          </Box>
        </VStack>
      </VStack>
  );
};

export default ProjectInfo;
