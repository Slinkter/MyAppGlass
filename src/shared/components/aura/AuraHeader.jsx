/**
 * @file AuraHeader.jsx
 * @description Standardized header for feature pages (Proyectos, Servicios).
 * Uses Aura typography tokens and Fibonacci spacing.
 */

import React from "react";
import { Flex, VStack, HStack, Text, Heading, Box } from "@chakra-ui/react";
import BackButton from "../navigation/BackButton";

/**
 * @component AuraHeader
 * @param {string} title - The main heading text.
 * @param {string} overline - The small text above the heading.
 * @param {string} backTo - Route path for the back button.
 * @param {React.ReactNode} action - Optional element to show on the right (e.g., ViewSelector).
 * @param {boolean} centered - Whether to center all text and elements.
 */
const AuraHeader = ({ title, overline, backTo, action, centered = false }) => {
  return (
    <Box w="full" mb={{ base: "phi_lg", md: "phi_xl" }}>
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
      <VStack gap="phi_sm" align={centered ? "center" : "flex-start"} w="full" textAlign={centered ? "center" : "left"}>
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
        {action && (
          <Box pt="phi_md" w="full" display="flex" justifyContent={centered ? "center" : "flex-start"}>
            {action}
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default React.memo(AuraHeader);
