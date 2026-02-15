import React from "react";
import {
  Box,
  Tooltip,
  Button,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaCompass } from "react-icons/fa";

const MapControls = ({ onFitBounds }) => {
  const btnBg = useColorModeValue("white", "gray.800");
  const btnColor = useColorModeValue("gray.600", "white");
  const btnHoverBg = useColorModeValue("gray.100", "gray.700");

  return (
    <Box position="absolute" top={4} right={4} zIndex={10}>
      <Tooltip label="Centrar mapa" placement="left" hasArrow>
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
      </Tooltip>
    </Box>
  );
};

export default MapControls;
