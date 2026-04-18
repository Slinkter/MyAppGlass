import React from "react";
import { Box, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion.create(Box);

interface FeatureCardProps {
  heading: string;
  description: string;
  icon?: React.ReactElement | null;
}

/**
 * @component FeatureCard
 * @description Premium benefit card with Aura "Structural Minimalism" aesthetics.
 */
const FeatureCard: React.FC<FeatureCardProps> = React.memo(({ heading, description, icon }) => {
  return (
    <MotionBox
      whileHover={{ y: -6 }}
      transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
      role="group"
      w="full"
      h="full"
      minH={{ base: "auto", md: "320px" }}
      p="phi_xl"
      bg="surface.card"
      backdropFilter="blur(24px)"
      border="1px solid"
      borderColor="border.glass"
      borderRadius="3xl"
      boxShadow="sm"
      _hover={{ 
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.1)",
        borderColor: "orange.300" 
      }}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      position="relative"
      overflow="hidden"
    >
      {/* Edge Lighting Refraction */}
      <Box 
        position="absolute"
        top={0}
        left="20%"
        right="20%"
        h="1px"
        bgGradient="linear(to-r, transparent, whiteAlpha.400, transparent)"
        opacity={0}
        _groupHover={{ opacity: 1 }}
        transition="opacity 0.6s ease"
      />

      {/* Internal Zinc/Orange Aura */}
      <Box 
        position="absolute"
        bottom="-10%"
        left="50%"
        transform="translateX(-50%)"
        w="70%"
        h="40%"
        bg="orange.300"
        opacity={0}
        filter="blur(50px)"
        _groupHover={{ opacity: 0.05 }}
        transition="opacity 0.6s ease"
        zIndex={0}
        pointerEvents="none"
      />

      <VStack gap="phi_lg" zIndex={1} w="full">
        {icon && (
          <Flex
            w="phi_xl"
            h="phi_xl"
            align="center"
            justify="center"
            borderRadius="2xl"
            bg="bg.page"
            color="text.body"
            border="1px solid"
            borderColor="border.default"
            transition="all 0.5s cubic-bezier(0.19, 1, 0.22, 1)"
            _groupHover={{ 
              bg: "orange.300",
              color: "black",
              borderColor: "orange.300",
              transform: "scale(1.08)",
              boxShadow: "0 10px 25px -5px rgba(251, 211, 141, 0.4)"
            }}
          >
            {React.isValidElement(icon) ? React.cloneElement(icon, { size: 28, strokeWidth: 1.5 } as React.Attributes & { size?: number; strokeWidth?: number }) : icon}
          </Flex>
        )}

        <VStack gap="phi_xs" textAlign="center">
          <Heading 
            fontSize="sm" 
            textTransform="uppercase" 
            color="text.heading"
            letterSpacing="0.25em"
            fontWeight="black"
            transition="color 0.4s ease"
            _groupHover={{ color: "orange.300" }}
          >
            {heading}
          </Heading>
          <Text 
            fontSize="sm" 
            color="text.muted" 
            lineHeight="1.8"
            fontWeight="500"
          >
            {description}
          </Text>
        </VStack>
      </VStack>
    </MotionBox>
  );
});

FeatureCard.displayName = "FeatureCard";

export default FeatureCard;
