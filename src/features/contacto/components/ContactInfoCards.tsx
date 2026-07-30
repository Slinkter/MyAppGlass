"use client";

import { Box, VStack, HStack, Text, Icon } from "@chakra-ui/react";
import { Phone, Mail } from "lucide-react";
import { companyData } from "@/shared/config/company-data";
import { toaster } from "@/components/ui/toaster-instance";
import { useColorModeValue } from "@/components/ui/color-mode-hooks";

export function ContactInfoCards() {
  const cardBg = useColorModeValue("whiteAlpha.800", "whiteAlpha.50");

  return (
    <VStack gap="4" align="stretch">
      <Box p="6" borderRadius="2xl" border="1px solid" borderColor="border.glass" bg={cardBg}>
        <HStack gap="5">
          <Box bg="surface.icon" p="3" borderRadius="xl">
            <Icon as={Phone} color="text.accent" boxSize={5} />
          </Box>
          <VStack align="flex-start" gap={0}>
            <Text fontSize="xs" fontWeight="black" color="text.muted" letterSpacing="widest" textTransform="uppercase">
              Atención Telefónica
            </Text>
            <Text fontSize="xl" fontWeight="900" color="text.heading">
              {companyData.contactPhone}
            </Text>
          </VStack>
        </HStack>
      </Box>

      <Box p="6" borderRadius="2xl" border="1px solid" borderColor="border.glass" bg={cardBg}>
        <HStack gap="5" wrap={{ base: "wrap", sm: "nowrap" }}>
          <Box bg="surface.icon" p="3" borderRadius="xl">
            <Icon as={Mail} color="text.accent" boxSize={5} />
          </Box>
          <VStack align="flex-start" gap={0} overflow="hidden" w="full">
            <Text fontSize="xs" fontWeight="black" color="text.muted" letterSpacing="widest" textTransform="uppercase">
              Email Técnico & Ventas
            </Text>
            <Text 
              fontSize={{ base: "md", sm: "lg" }} 
              fontWeight="900" 
              color="text.heading" 
              truncate 
              maxW="full"
              _hover={{ color: "text.accent" }}
              cursor="pointer"
              title="Haz clic para copiar"
              onClick={() => {
                navigator.clipboard.writeText(companyData.contactEmail);
                toaster.create({
                  title: "Copiado",
                  description: "Correo copiado al portapapeles.",
                  type: "success",
                  duration: 2000,
                });
              }}
            >
              {companyData.contactEmail}
            </Text>
          </VStack>
        </HStack>
      </Box>
    </VStack>
  );
}
