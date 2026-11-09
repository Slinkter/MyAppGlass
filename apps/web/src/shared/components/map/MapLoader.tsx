import React from "react";
import { Box, Spinner } from "@chakra-ui/react";

const MapLoader: React.FC = () => {
  return (
    <Box
      w="full"
      h="full"
      minH={{ base: "25rem", lg: "43.75rem" }}
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="bg.section"
    >
      <Spinner
        size="xl"
        borderWidth="2px"
        animationDuration="0.8s"
        color="text.accent"
      />
    </Box>
  );
};

export default MapLoader;
