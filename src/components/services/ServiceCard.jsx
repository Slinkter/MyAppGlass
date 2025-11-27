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

/**
 * @component ServiceCard
 * @description Renders a card for a service, displaying its image, name,
 * and a button to navigate to the service's detail page.
 * Optimized with React.memo to prevent unnecessary re-renders.
 *
 * @param {{
 *   image: string,
 *   name: string,
 *   plink: string,
 * }} props - Props for the component.
 * @returns {JSX.Element} The rendered service card.
 */
const ServiceCard = React.memo((props) => {
  const { image, name, plink } = props;
  const navigate = useNavigate();

  const bgColor = useColorModeValue(
    "rgba(255, 255, 255, 0.1)",
    "rgba(0, 0, 0, 0.1)"
  ); // More subtle background
  const textColor = useColorModeValue("gray.800", "gray.100");
  // New glassmorphism styles for the button
  const buttonGlassBg = useColorModeValue(
    "rgba(193, 20, 20, 0.13)",
    "rgba(193, 20, 20, 0.13)"
  );
  const buttonGlassBorder = useColorModeValue(
    "rgba(193, 20, 20, 0.6)",
    "rgba(193, 20, 20, 0.6)"
  );
  const buttonGlassColor = useColorModeValue("red.700", "red.300");
  const buttonGlassHoverBg = useColorModeValue(
    "rgba(193, 20, 20, 0.2)",
    "rgba(193, 20, 20, 0.2)"
  );
  const buttonGlassHoverBorder = useColorModeValue(
    "rgba(193, 20, 20, 0.8)",
    "rgba(193, 20, 20, 0.8)"
  );

  return (
    <Box // Changed from Card
      w="full"
      maxW={{ base: "full", md: "md" }}
      h={{ base: "auto", md: "auto" }}
      maxH={{ base: "452px", md: "512px" }}
      mb={4}
      p={{ base: 2, md: 2 }}
      overflow="hidden"
      // Glassmorphism effects (GlassSection rules)
      bg={bgColor}
      backdropFilter="blur(10px)" // Suave blur
      border="lg" // SIN borde
      boxShadow="lg" // Subtle shadow
      borderRadius="2xl"
      color={textColor}
      transition="all 0.3s ease"
      _hover={{
        transform: "scale(1.02)",
        boxShadow: "md", // More pronounced shadow on hover
      }}
    >
      <Box textAlign="center" p={4}>
        <FadingImage
          w="full"
          h={{ base: "320px", md: "385px" }}
          src={image}
          alt={`Servicio de ${name}`}
          rounded="lg"
          objectFit="cover"
          boxShadow="base"
        />
        <Stack mt={2} spacing={2}>
          <Flex justifyContent="space-between" alignItems="center">
            <Box>
              <Heading
                as="h3"
                size="md"
                fontWeight="600"
                textTransform="uppercase"
              >
                {name}
              </Heading>
            </Box>
            <Button
              rightIcon={<ArrowForwardIcon />}
              onClick={() => navigate(plink)}
              aria-label={`Ver catálogo de ${name}`}
              bg={buttonGlassBg}
              color={buttonGlassColor}
              backdropFilter="blur(3.9px)"
              border="1px solid"
              borderColor={buttonGlassBorder}
              borderRadius="16px"
              boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
              _hover={{
                bg: buttonGlassHoverBg,
                borderColor: buttonGlassHoverBorder,
                boxShadow: "0 6px 40px rgba(0, 0, 0, 0.15)", // Slightly more pronounced hover shadow
              }}
              transition="all 0.2s ease-in-out"
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
