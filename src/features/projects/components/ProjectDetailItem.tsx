import React from "react";
import { Box, VStack } from "@chakra-ui/react";
import { DataListItem, DataListRoot } from "@/components/ui/data-list";
import { LucideIcon } from "lucide-react";

interface ProjectDetailItemProps {
  icon: LucideIcon;
  label: string;
  value?: string;
}

/**
 * @component ProjectDetailItem
 * @description Muestra un ítem de detalle individual para un proyecto usando DataList v3 y tokens semánticos Aura.
 * Eliminado useColorModeValue para optimizar el rendimiento del cambio de tema.
 */
const ProjectDetailItem: React.FC<ProjectDetailItemProps> = ({ icon, label, value }) => {
  return (
    <VStack
      align="start"
      gap={3}
      p={4}
      bg="bg.subtle"
      borderRadius="xl"
      border="1px solid"
      borderColor="border.glass"
      transition="all 0.2s"
      _hover={{ transform: "translateX(2px)", borderColor: "primary.500" }}
    >
      <Box as={icon} size={20} color="text.accent" strokeWidth={1.5} />
      <DataListRoot w="full">
        <DataListItem
            label={label}
            value={value || "No especificado"}
            labelProps={{
                fontSize: "10px",
                fontWeight: "900",
                color: "text.muted",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                mb: 1
            }}
            valueProps={{
                fontSize: "sm",
                fontWeight: "bold",
                color: "text.heading",
                lineHeight: "shorter"
            }}
        />
      </DataListRoot>
    </VStack>
  );
};

export default ProjectDetailItem;
