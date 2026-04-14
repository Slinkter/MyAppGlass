import React from "react";
import { Box, Text, VStack, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";

/**
 * @component ClientCard
 * @description Premium client card with Aura 2.0 aesthetics.
 */
const ClientCard = React.memo(({ image, nameClient, descClient }) => {
  const bgOverlay =
    "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)";

  return (
    <Box
      as="article"
      role="group"
      cursor="pointer"
      position="relative"
      w="full"
      h={{ base: "320px", md: "520px" }}
      borderRadius="3xl"
      overflow="hidden"
      boxShadow="sm"
      _hover={{ boxShadow: "2xl" }}
      transition="all 0.4s ease"
    >
      <Box position="relative" h="full" w="full" overflow="hidden">
        <Image
          src={image}
          alt={nameClient}
          objectFit="cover"
          w="full"
          h="full"
          loading="eager"
          decoding="async"
          transition="transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)"
          _groupHover={{ transform: "scale(1.1) rotate(1deg)" }}
        />

        <Box position="absolute" inset="0" bgGradient={bgOverlay} />

        <VStack
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          p="phi_lg"
          gap="phi_xs"
          align="center"
          justify="flex-end"
          textAlign="center"
          as={motion.div}
        >
          <Text
            color="white"
            fontSize={{ base: "lg", md: "2xl" }}
            fontWeight="900"
            textTransform="uppercase"
            letterSpacing="0.2em"
            position="relative"
            transition="all 0.3s ease"
            _groupHover={{ color: "text.accent", transform: "translateY(-4px)" }}
          >
            {nameClient}
          </Text>

          <Box
            w="0"
            h="2px"
            bg="text.accent"
            transition="width 0.4s ease"
            _groupHover={{ w: "60px" }}
          />

          <Text
            color="whiteAlpha.800"
            fontSize="sm"
            fontWeight="500"
            mt="phi_xs"
            opacity={0}
            transform="translateY(10px)"
            transition="all 0.4s ease"
            _groupHover={{ opacity: 1, transform: "translateY(0)" }}
            noOfLines={2}
          >
            {descClient}
          </Text>
        </VStack>
      </Box>
    </Box>
  );
});

ClientCard.displayName = "ClientCard";

export default ClientCard;
