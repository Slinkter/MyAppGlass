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
      <Box p={2}>
        <Skeleton
          height={{ base: "245px", md: "375px" }}
          w="full"
          borderRadius="xl"
        />

        <Stack p={4} spacing={2}>
          {/* Heading Skeleton */}
          <Skeleton height="28px" width="60%" mx="auto" />

          {/* Details Skeleton */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={0}
            mt={2}
          >
            <Flex alignItems="center">
              <Skeleton boxSize="20px" mr={2} />
              <Skeleton height="16px" width="100px" />
            </Flex>
            <Flex alignItems="center">
              <Skeleton boxSize="20px" mr={2} />
              <Skeleton height="16px" width="60px" />
            </Flex>
          </Stack>

          {/* Button Skeleton */}
          <Skeleton height="40px" width="full" borderRadius="md" mt={2} />
        </Stack>
      </Box>
    </Box>
  );
};

export default ProjectCardSkeleton;
