

import React from "react";
import { Box } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";

const ProductView = () => {
  const bgColor = useColorModeValue("rgba(255, 255, 255, 0.25)", "rgba(0, 0, 0, 0.25)");
  const borderColor = useColorModeValue("rgba(255, 255, 255, 0.35)", "rgba(255, 255, 255, 0.15)");
  const textColor = useColorModeValue("gray.800", "gray.100");

  return (
    <Box
      as="section"
      p={4}
      bg={bgColor}
      border="1px solid"
      borderColor={borderColor}
      boxShadow="0 4px 30px rgba(0,0,0,0.1)"
      borderRadius="2xl"
      transition="all 0.3s ease"
      color={textColor}
    >
      ProductView
    </Box>
  );
};

export default ProductView;
