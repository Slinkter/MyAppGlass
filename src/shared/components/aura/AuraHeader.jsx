/**
 * @file AuraHeader.jsx
 * @description Standardized header for feature pages (Proyectos, Servicios).
 * Uses Aura typography tokens and Fibonacci spacing.
 */

import React from "react";
import { Flex, VStack, Text, Heading, Box } from "@chakra-ui/react";
import BackButton from "../navigation/BackButton";

/**
 * @component AuraHeader
 * @param {string} title - The main heading text.
 * @param {string} overline - The small text above the heading.
 * @param {string} backTo - Route path for the back button.
 * @param {React.ReactNode} action - Optional element to show on the right (e.g., ViewSelector).
 */
const AuraHeader = ({ title, overline, backTo, action }) => {
  return (
    <Flex 
      direction={{ base: "column", md: "row" }} 
      justify="space-between" 
      align={{ base: "flex-start", md: "flex-end" }} 
      gap={{ base: "phi_md", md: "phi_lg" }}
      mb={{ base: "phi_lg", md: "phi_xl" }}
    >
      <VStack gap={{ base: "phi_xs", md: "phi_sm" }} align="flex-start">
        {backTo && (
          <Box mb={{ base: 1, md: 2 }}>
            <BackButton to={backTo} />
          </Box>
        )}
        <VStack align="start" gap={1}>
          {overline && (
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
          >
            {title}
          </Heading>
        </VStack>
      </VStack>
      {action && (
        <Box w={{ base: "full", md: "auto" }}>
          {action}
        </Box>
      )}
    </Flex>
  );
};

export default React.memo(AuraHeader);
