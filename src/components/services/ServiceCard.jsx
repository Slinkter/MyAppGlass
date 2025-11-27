import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  Button,
  Flex,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import FadingImage from "@/components/common/FadingImage";

const ServiceCard = React.memo(({ image, name, plink }) => {
  const navigate = useNavigate();

  const borderColor = useColorModeValue(
    "rgba(255, 255, 255, 0.25)",
    "rgba(0, 0, 0, 0.25)"
  );

  const bgColor = useColorModeValue(
    "rgba(255, 255, 255, 0.25)",
    "rgba(0, 0, 0, 0.25)"
  ); // More subtle background
  const textColor = useColorModeValue("gray.800", "gray.100");
  // New glassmorphism styles for the button
  const buttonGlassBg = useColorModeValue(
    "rgba(193, 20, 20, 0.13)",
    "rgba(193, 20, 20, 0.13)"
  );

  const btnTextColor = useColorModeValue("red.700", "red.300");

  return (
    <Box // Changed from Card
      w="full"
      maxW={{ base: "full", md: "md" }}
      h={{ base: "auto", md: "auto" }}
      maxH={{ base: "452px", md: "512px" }}
      mb={4}
      p={{ base: 4, md: 6 }}
      overflow="hidden"
      // Glassmorphism effects (GlassSection rules)
      bg={bgColor}
      backdropFilter="blur(10px)" // Suave blur
      border="lg" // SIN borde
      boxShadow="lg" // Subtle shadow
      borderRadius="2xl"
      textAlign="none"
      borderColor={borderColor}
      color={textColor}
      transition="all 0.3s ease"
      _hover={{
        transform: "scale(1.02)",
        boxShadow: "xl",
      }}
    >
      <Box textAlign="center" p={2}>
        <FadingImage
          w="full"
          h={{ base: "320px", md: "385px" }}
          src={image}
          alt={`Servicio de ${name}`}
          rounded="lg"
          objectFit="cover"
          boxShadow="base"
        />
        <Stack mt={4} spacing={2}>
          <Flex
            direction="column"
            textAlign="left"
            justifyContent="center"
            gap={2}
          >
            <Heading
              as="h3"
              size="md"
              fontWeight="600"
              textTransform="uppercase"
            >
              {name}
            </Heading>
            <Button
              mt={1}
              rightIcon={<ArrowForwardIcon />}
              onClick={() => navigate(plink)}
              aria-label={`Ver catálogo de ${name}`}
              bg={buttonGlassBg}
              color={btnTextColor}
              border="1px solid"
              borderColor={borderColor}
            >
              Catálogo
            </Button>
          </Flex>
        </Stack>
      </Box>
    </Box>
  );
});
ServiceCard.displayName = "ServiceCard";
export default ServiceCard;
