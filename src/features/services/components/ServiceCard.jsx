import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Stack,
  Heading,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import GlassCard from "@shared/components/common/GlassCard";
import FadingImage from "@shared/components/common/FadingImage";

/**
 * @component ServiceCard
 * @description Tarjeta independiente para servicios. Utiliza GlassCard para el contenedor
 * pero define su propio layout interno específico para servicios (Imagen + Título + Botón).
 */
const ServiceCard = React.memo(({ image, name, plink, preloaded }) => {
  const headingColor = useColorModeValue("primary.700", "primary.300");
  const btnBg = useColorModeValue("rgba(255, 255, 255, 0.4)", "rgba(0, 0, 0, 0.4)");
  const btnHover = useColorModeValue("rgba(255, 255, 255, 0.6)", "rgba(0, 0, 0, 0.6)");
  const textColor = useColorModeValue("gray.800", "gray.100");

  return (
    <GlassCard
      p={2}
      h="full"
      display="flex"
      flexDirection="column"
      transition="transform 0.3s ease, box-shadow 0.3s ease"
      _hover={{
        transform: "scale(1.02)",
        boxShadow: "xl",
      }}
    >
      <Box
        overflow="hidden"
        borderRadius="xl"
        mb={4}
        position="relative"
        h={{ base: "275px", md: "375px" }}
      >
        <FadingImage
          w="full"
          h="full"
          src={image}
          alt={`Servicio de ${name}`}
          objectFit="cover"
          showOverlay={false}
          forceShow={preloaded}
        />
      </Box>

      <Stack spacing={3} px={2} pb={2} flex="1" justify="flex-end">
        <Heading
          size="md"
          textTransform="uppercase"
          color={headingColor}
          fontWeight="bold"
          textAlign="center"
          noOfLines={2}
        >
          {name}
        </Heading>

        <Button
          as={RouterLink}
          to={plink}
          rightIcon={<ArrowForwardIcon />}
          variant="solid"
          width="full"
          bg={btnBg}
          color={textColor}
          _hover={{ bg: btnHover }}
          size="md"
        >
          Catálogo
        </Button>
      </Stack>
    </GlassCard>
  );
});

ServiceCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  plink: PropTypes.string.isRequired,
  preloaded: PropTypes.bool,
};

ServiceCard.displayName = "ServiceCard";
export default ServiceCard;
