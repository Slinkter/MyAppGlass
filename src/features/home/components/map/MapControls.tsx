"use client";

import React from "react";
import {
  Box,
  Button,
  Icon,
  TooltipRoot,
  TooltipTrigger,
  TooltipContent,
} from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { FaCompass } from "react-icons/fa";

export interface MapControlsProps {
  onFitBounds: () => void;
}

const MapControls = ({ onFitBounds }: MapControlsProps) => {
  const btnBg = useColorModeValue("white", "gray.800");
  const btnColor = useColorModeValue("gray.600", "white");
  const btnHoverBg = useColorModeValue("gray.100", "gray.700");

  return (
    <Box position="absolute" top={4} right={4} zIndex={10}>
      <TooltipRoot positioning={{ placement: "left" }}>
        <TooltipTrigger asChild>
          <Button
            onClick={onFitBounds}
            bg={btnBg}
            color={btnColor}
            size="sm"
            shadow="lg"
            _hover={{ bg: btnHoverBg }}
            borderRadius="lg"
          >
            <Icon as={FaCompass} boxSize={5} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          Centrar mapa
        </TooltipContent>
      </TooltipRoot>
    </Box>
  );
};

export default MapControls;
