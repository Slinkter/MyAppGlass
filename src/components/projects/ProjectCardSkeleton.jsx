import React from "react";
import {
  Box,
  Flex,
  Stack,
  Skeleton,
  useColorModeValue,
} from "@chakra-ui/react";

/**
 * @component ProjectCardSkeleton
 * @description Componente de carga (Skeleton) para las tarjetas de proyecto.
 * Mantiene la misma estructura visual que ProjectCard para evitar saltos de layout.
 */
const ProjectCardSkeleton = () => {
  const styles = {
    bg: useColorModeValue("rgba(255, 255, 255, 0.25)", "rgba(0, 0, 0, 0.25)"),
    border: useColorModeValue(
      "rgba(255, 255, 255, 0.72)",
      "rgba(255, 255, 255, 0.15)"
    ),
  };

  return (
    <Box
      w="full"
      maxW={{ base: "full", md: "md" }}
      h="auto"
      mb={4}
      overflow="hidden"
      bg={styles.bg}
      backdropFilter="blur(10px)"
      borderRadius="2xl"
      boxShadow="lg"
      borderWidth="1px"
      borderColor={styles.border}
    >
      {/* Image Skeleton */}
      <Skeleton
        height={{ base: "320px", md: "325px" }}
        w="full"
        borderRadius="none"
      />

      <Stack p={4} spacing={3}>
        {/* Heading Skeleton */}
        <Skeleton height="24px" width="60%" mx="auto" />
        {/* Details Skeleton */}
        <Stack spacing={2}>
          <Flex alignItems="center">
            <Skeleton boxSize="20px" mr={2} />
            <Skeleton height="16px" width="80%" />
          </Flex>
          <Flex alignItems="center">
            <Skeleton boxSize="20px" mr={2} />
            <Skeleton height="16px" width="40%" />
          </Flex>
        </Stack>
        {/* Button Skeleton */}
        <Skeleton height="40px" width="full" borderRadius="md" mt={2} />
      </Stack>
    </Box>
  );
};

export default ProjectCardSkeleton;
