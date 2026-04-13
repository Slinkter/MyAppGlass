"use client";

import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";

export interface FeatureCardProps {
  heading: string;
  description: string;
  icon: React.ReactNode;
}

const FeatureCard = React.memo(({ heading, description, icon }: FeatureCardProps) => {
  const cardBg = useColorModeValue("white", "primary.800");
  const cardBorder = useColorModeValue("gray.100", "whiteAlpha.100");
  const shadowColor = useColorModeValue("rgba(0,0,0,0.08)", "rgba(0,0,0,0.4)");

  return (
    <Box
      role="group"
      w="full"
      h="full"
      minH={{ base: "240px", md: "280px" }}
      p={{ base: 8, md: 10 }}
      overflow="hidden"
      bg={cardBg}
      border="1px solid"
      borderColor={cardBorder}
      borderRadius="3xl"
      boxShadow={`0 10px 30px ${shadowColor}`}
      color="text.body"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      cursor="default"
      transition="all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
      _hover={{ 
        boxShadow: `0 20px 50px ${shadowColor}`,
        transform: "translateY(-8px)",
        borderColor: "text.accent"
      }}
    >
      <Box w="full">
        <Box
          w={{ base: 16, md: 20 }}
          h={{ base: 16, md: 20 }}
          mx="auto"
          mb={8}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="2xl"
          bg="surface.icon"
          color="text.accent"
          boxShadow="inner"
          _groupHover={{ 
            bg: "text.accent",
            color: "white",
            transform: "rotate(10deg) scale(1.1)"
          }}
        >
          {icon}
        </Box>
        <Heading 
          size="md" 
          mb={4} 
          textTransform="uppercase" 
          color="text.heading"
          letterSpacing="widest"
          fontWeight="700"
        >
          {heading}
        </Heading>
        <Text 
          fontSize="sm" 
          color="text.muted" 
          lineHeight="tall"
          fontWeight="500"
        >
          {description}
        </Text>
      </Box>
    </Box>
  );
});

FeatureCard.displayName = "FeatureCard";

export default FeatureCard;
