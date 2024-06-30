import {
  AspectRatio,
  Box,
  Button,
  Stack,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";

const HomeView = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <div>
      HomeView inicio
      <Stack spacing={4} direction="row" align="center">
        <Button colorScheme="teal" size="xs">
          Button
        </Button>
        <Button colorScheme="teal" size="sm">
          Button
        </Button>
        <Button colorScheme="teal" size="md">
          Button
        </Button>
        <Button colorScheme="teal" size="lg">
          Button
        </Button>
      </Stack>
      <Box p={4}>
        <Button onClick={toggleColorMode}>
          Cambiar a {colorMode === "light" ? "oscuro" : "claro"}
        </Button>

        <AspectRatio ratio={16 / 9}>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7802.259991971398!2d-76.94203500000003!3d-12.103251999999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c714bd26b5ab%3A0xc27e03d844952799!2sGlass%20%26%20Aluminum%20Company!5e0!3m2!1sen!2spe!4v1704232992639!5m2!1sen!2spe" />
        </AspectRatio>
      </Box>
    </div>
  );
};

export default HomeView;
