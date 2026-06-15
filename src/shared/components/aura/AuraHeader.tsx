/**
 * @file AuraHeader.tsx
 * @description Standardized header for feature pages (Proyectos, Servicios).
 * Uses Aura typography tokens and Fibonacci spacing.
 */

import React from "react";
import { Flex, VStack, HStack, Text, Heading, Box } from "@chakra-ui/react";
import BackButton from "../navigation/BackButton";

interface AuraHeaderProps {
  title: React.ReactNode;
  overline?: string;
  description?: string;
  backTo?: string;
  action?: React.ReactNode;
  centered?: boolean;
  mb?: any;
}

/**
 * @component AuraHeader
 * @param {string} title - The main heading text.
 * @param {string} overline - The small text above the heading.
 * @param {string} backTo - Route path for the back button.
 * @param {React.ReactNode} action - Optional element to show on the right (e.g., ViewSelector).
 * @param {boolean} centered - Whether to center all text and elements.
 * @param {any} mb - Custom margin bottom.
 */
const AuraHeader: React.FC<AuraHeaderProps> = ({ title, overline, description, backTo, action, centered = false, mb }) => {
  return (
    <Box w="full" mb={mb ?? { base: "6", md: "8" }}>
      {/* Top Navigation Row (Always Left Aligned for UX) */}
      <Flex justify="space-between" align="center" mb={2}>
        {backTo ? (
          <HStack gap={4}>
            <BackButton to={backTo} />
            {overline && (
              <Text 
                fontSize={{ base: "10px", md: "xs" }} 
                fontWeight="900" 
                color="text.accent" 
                letterSpacing="0.4em" 
                textTransform="uppercase"
                display={{ base: "none", sm: "block" }}
              >
                {overline}
              </Text>
            )}
          </HStack>
        ) : (
          <Box />
        )}
      </Flex>

      {/* Main Content Area (Title) */}
      <VStack gap={{ base: "6", md: "8" }} align={centered ? "center" : "flex-start"} w="full" textAlign={centered ? "center" : "left"}>
        {!backTo && overline && (
          <Text 
            fontSize={{ base: "10px", md: "xs" }} 
            fontWeight="900" 
            color="text.accent" 
            letterSpacing="0.4em" 
            textTransform="uppercase"
          >
            {overline}
          </Text>
        )}
        <Heading 
          size={{ base: "3xl", md: "4xl" }} 
          fontWeight="black" 
          letterSpacing="tight" 
          color="text.heading" 
          fontFamily="heading"
          maxW={centered ? "800px" : "full"}
        >
          {title}
        </Heading>
        {description && (
          <Text 
            fontSize={{ base: "sm", md: "md" }} 
            color="text.muted" 
            maxW="800px"
            lineHeight="tall"
          >
            {description}
          </Text>
        )}
        {action && (
          <Box pt="6" w="full" display="flex" justifyContent={centered ? "center" : "flex-start"}>
            {action}
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default React.memo(AuraHeader);
