import React from "react";
import { Box, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode-hooks";

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
  const activeBg = useColorModeValue(
    "linear-gradient(135deg, #a80100 0%, #800000 100%)", 
    "linear-gradient(135deg, #cc0202 0%, #a80100 100%)"
  );
  const activeColor = "white";
  const cardInnerGradient = useColorModeValue(
    "radial-gradient(circle at top, rgba(255,255,255,0.15) 0%, transparent 70%)",
    "radial-gradient(circle at top, rgba(255,255,255,0.05) 0%, transparent 70%)"
  );

  return (
    <Box
      role="group"
      w="full"
      h="full"
      minH={{ base: "auto", md: "320px" }}
      p="14"
      bg="surface.card"
      backdropFilter="blur(24px)"
      border="1px solid"
      borderColor="border.glass"
      borderRadius="3xl"
      boxShadow="sm"
       _hover={{ 
          boxShadow: "0 30px 60px -12px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(255,255,255,0.1)",
          borderColor: "whiteAlpha.200",
          transform: "translateY(-10px)"
        }}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      position="relative"
      overflow="hidden"
    >
      {/* Glass Depth Surface */}
      <Box 
        position="absolute"
        inset={0}
        bg={cardInnerGradient}
        zIndex={0}
        pointerEvents="none"
      />

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
        zIndex={2}
      />


      {/* Internal Zinc/Orange Aura */}
       <Box 
         position="absolute"
         bottom="-10%"
         left="50%"
         transform="translateX(-50%)"
         w="70%"
         h="40%"
         bg={activeBg}
         opacity={0}
         filter="blur(50px)"
         _groupHover={{ opacity: 0.15 }}
         transition="opacity 0.6s ease"
         zIndex={0}
         pointerEvents="none"
       />

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
             transition="all 0.5s cubic-bezier(0.19, 1, 0.22, 1)"
             _groupHover={{ 
               bg: activeBg,
               color: activeColor,
               borderColor: "transparent",
               transform: "scale(1.15)",
               boxShadow: "0 15px 35px -8px rgba(168, 1, 0, 0.6)",
             }}
           >
             {/* Icon Glow Layer */}
             <Box 
               position="absolute"
               inset={0}
               borderRadius="full"
               bg={activeBg}
               filter="blur(12px)"
               opacity={0}
               _groupHover={{ opacity: 0.4 }}
               transition="opacity 0.5s ease"
               zIndex={-1}
             />
             {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement, { size: 24, strokeWidth: 1.5 }) : icon}
           </Flex>
         )}


         <VStack gap="2" textAlign="center">
           <Heading 
             fontSize="sm" 
             textTransform="uppercase" 
             color="text.heading"
             letterSpacing="0.25em"
             fontWeight="black"
             transition="all 0.4s cubic-bezier(0.19, 1, 0.22, 1)"
             _groupHover={{ 
               color: "red.600",
               transform: "scale(1.02)",
               textShadow: "0 0 15px rgba(168, 1, 0, 0.2)"
             }}
           >
             {heading}
           </Heading>
           <Text 
             fontSize="sm" 
             color="text.muted" 
             lineHeight="1.8"
             fontWeight="500"
             transition="all 0.4s ease"
             _groupHover={{ opacity: 0.8, transform: "translateY(-2px)" }}
           >
             {description}
           </Text>
         </VStack>
      </VStack>
    </Box>
  );
});

FeatureCard.displayName = "FeatureCard";

export default FeatureCard;
