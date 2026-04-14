import React from "react";
import { Box, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";

/**
 * @component FeatureCard
 * @description Premium benefit card with Aura 2.0 aesthetics.
 */
const FeatureCard = React.memo(({ heading, description, icon }) => {
  return (
    <Box
      as={motion.div}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: [0.175, 0.885, 0.32, 1.275] }}
      role="group"
      w="full"
      h="full"
      minH="300px"
      p="phi_lg"
      bg="bg.glass"
      backdropFilter="blur(12px)"
      border="1px solid"
      borderColor="border.glass"
      borderRadius="3xl"
      boxShadow="sm"
      _hover={{ 
        boxShadow: "xl",
        borderColor: "text.accent" 
      }}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      cursor="default"
      position="relative"
      overflow="hidden"
    >
      {/* Inner Glow/Refraction */}
      <Box 
        position="absolute"
        top="-20%"
        right="-20%"
        w="150px"
        h="150px"
        bgGradient="radial(text.accent, transparent)"
        opacity={0}
        _groupHover={{ opacity: 0.1 }}
        transition="opacity 0.4s ease"
        zIndex={0}
      />

      <VStack gap="phi_md" zIndex={1}>
        <Flex
          w="phi_xl"
          h="phi_xl"
          align="center"
          justify="center"
          borderRadius="2xl"
          bg="bg.muted"
          color="text.accent"
          transition="all 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
          _groupHover={{ 
            bg: "text.accent",
            color: "white",
            transform: "rotate(12deg) scale(1.1)",
            boxShadow: "0 0 20px rgba(113, 113, 122, 0.3)"
          }}
        >
          {React.cloneElement(icon, { size: 32 })}
        </Flex>

        <Box textAlign="center">
          <Heading 
            fontSize="md" 
            mb="phi_xs" 
            textTransform="uppercase" 
            color="text.heading"
            letterSpacing="0.2em"
            fontWeight="900"
          >
            {heading}
          </Heading>
          <Text 
            fontSize="sm" 
            color="text.body" 
            lineHeight="relaxed"
            fontWeight="500"
          >
            {description}
          </Text>
        </Box>
      </VStack>
    </Box>
  );
});

FeatureCard.displayName = "FeatureCard";

export default FeatureCard;
