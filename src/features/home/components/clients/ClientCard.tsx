"use client";

import React from "react";
import { Box, Card, Text, VStack } from "@chakra-ui/react";
import ResponsiveImage from "@shared/components/Image/ResponsiveImage";

interface ClientCardProps {
  image: string;
  nameClient: string;
  descClient: string;
}

/**
 * @component ClientCard
 * @description Premium client card with Aura 2.0 aesthetics.
 */
const ClientCard: React.FC<ClientCardProps> = React.memo(({ image, nameClient, descClient }) => {
  const bgOverlay =
    "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)";

  return (
    <Card.Root
      as="article"
      role="group"
      cursor="pointer"
      position="relative"
      w="full"
      minH="320px"
      borderRadius="xl"
      overflow="hidden"
      boxShadow="sm"
      transform="translateZ(0)"
      transition="box-shadow 0.3s ease-out, transform 0.3s ease-out"
      _hover={{ boxShadow: "2xl", transform: "translateY(-4px)" }}
      _active={{ boxShadow: "2xl", transform: "translateY(-4px)" }}
      borderWidth="0"
      bg="transparent"
      css={{
        '@media (prefers-reduced-motion: reduce)': {
          '*': { transition: 'none !important', animation: 'none !important', transform: 'none !important' }
        }
      }}
    >
      <Card.Body p="0" position="absolute" inset={0} overflow="hidden" borderRadius="xl">
        <ResponsiveImage
          src={image}
          alt={nameClient}
          objectFit="cover"
          w="full"
          h="full"
          loading="eager"
          decoding="async"
          transition="transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)"
          _groupHover={{ transform: "scale(1.08)" }}
          _active={{ transform: "scale(1.08)" }}
        />

        <Box position="absolute" inset="0" css={{ background: bgOverlay }} />

        <VStack
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          p="8"
          gap="2"
          align="center"
          justify="flex-end"
          textAlign="center"
        >
          <Text
            color="white"
            fontSize={{ base: "lg", md: "2xl" }}
            fontWeight="900"
            textTransform="uppercase"
            letterSpacing="0.2em"
            position="relative"
          >
            {nameClient}
          </Text>

          <Text
            color="whiteAlpha.800"
            fontSize="sm"
            fontWeight="500"
            mt="2"
            lineClamp={2}
          >
            {descClient}
          </Text>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
});

ClientCard.displayName = "ClientCard";

export default ClientCard;
