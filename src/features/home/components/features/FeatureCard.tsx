import React from "react";
import { Card, Flex, Heading, Text, VStack } from "@chakra-ui/react";

interface FeatureCardProps {
  heading: string;
  description: string;
  icon?: React.ReactElement | null;
}

/**
 * @component FeatureCard
 * @description Premium benefit card with minimal, purposeful hover interactions.
 * Only 2 elements animate on hover: card lift and icon — everything else stays clean.
 */
const FeatureCard: React.FC<FeatureCardProps> = React.memo(({ heading, description, icon }) => {
  const activeColor = "white";
  const activeBgStyle = { 
    base: "linear-gradient(135deg, #FF5A5F 0%, #E0484D 100%)", 
    _dark: "linear-gradient(135deg, #FF5A5F 0%, #D9444A 100%)" 
  };

  return (
    <Card.Root
      role="group"
      w="full"
      h="full"
      minH={{ base: "auto", md: "320px" }}
      bg="surface.card"
      borderWidth="1px"
      borderColor="border.default"
      borderRadius="3xl"
      boxShadow="sm"
      transition="box-shadow 0.3s ease-out, transform 0.3s ease-out"
      _hover={{ 
        boxShadow: "0 20px 40px -12px rgba(0,0,0,0.2)",
        transform: "translateY(-4px)"
      }}
      _active={{ 
        boxShadow: "0 20px 40px -12px rgba(0,0,0,0.2)",
        transform: "translateY(-4px)"
      }}
      position="relative"
      overflow="hidden"
      css={{
        '@media (prefers-reduced-motion: reduce)': {
          '*': { transition: 'none !important', animation: 'none !important', transform: 'none !important' }
        }
      }}
    >
      <Card.Body
        p="14"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        zIndex={1}
        w="full"
      >
        <VStack gap="8" zIndex={1} w="full">
          {icon && (
            <Flex
              position="relative"
              w="20"
              h="20"
              align="center"
              justify="center"
              borderRadius="full"
              bg="bg.page"
              color="text.body"
              border="1px solid"
              borderColor="border.default"
              transition="background 0.3s ease-out, color 0.3s ease-out, border-color 0.3s ease-out, transform 0.3s ease-out, box-shadow 0.3s ease-out"
              _groupHover={{ 
                bg: activeBgStyle,
                color: activeColor,
                borderColor: "transparent",
                transform: "scale(1.12)",
                boxShadow: "0 12px 28px -6px rgba(255, 90, 95, 0.5)",
              }}
              _active={{ 
                bg: activeBgStyle,
                color: activeColor,
                borderColor: "transparent",
                transform: "scale(1.12)",
                boxShadow: "0 12px 28px -6px rgba(255, 90, 95, 0.5)",
              }}
            >
              {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement, { size: 24, strokeWidth: 1.5, "aria-hidden": "true" } as any) : icon}
            </Flex>
          )}

          <VStack gap="2" textAlign="center">
            <Heading 
              fontSize="sm" 
              textTransform="uppercase" 
              color="text.heading"
              letterSpacing="0.25em"
              fontWeight="black"
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
      </Card.Body>
    </Card.Root>
  );
});

FeatureCard.displayName = "FeatureCard";

export default FeatureCard;
