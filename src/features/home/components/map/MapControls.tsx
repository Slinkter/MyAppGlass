import { useColorModeValue } from "@/components/ui/color-mode-hooks";
import React from "react";
import {
  Box,
  Button,
} from "@chakra-ui/react";
import { Tooltip } from "@/components/ui/tooltip";
import { Compass } from "lucide-react";

interface MapControlsProps {
  onFitBounds: () => void;
}

/**
 * MapControls Component
 * Provides a button to re-center the map view.
 */
const MapControls: React.FC<MapControlsProps> = ({ onFitBounds }) => {
  const btnBg = useColorModeValue("white", "gray.800");
  const btnColor = useColorModeValue("gray.600", "white");
  const btnHoverBg = useColorModeValue("gray.100", "gray.700");

  return (
    <Box position="absolute" top={4} right={4} zIndex={10}>
      <Tooltip content="Centrar mapa" positioning={{ placement: "left" }} showArrow>
        <Button
          onClick={onFitBounds}
          bg={btnBg}
          color={btnColor}
          size="sm"
          shadow="lg"
          _hover={{ bg: btnHoverBg }}
          borderRadius="lg"
          aria-label="Re-centrar mapa"
        >
          <Box as={Compass} boxSize={5} />
        </Button>
      </Tooltip>
    </Box>
  );
};

export default React.memo(MapControls);
