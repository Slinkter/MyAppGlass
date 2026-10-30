"use client";
import React from "react";
import {
  Box,
  Heading,
  Text,
  HStack,
  VStack,
} from "@chakra-ui/react";
import {
  MessageSquareText,
  CheckCircle2,
} from "lucide-react";
import { companyData } from "@/shared/config/company-data";

export const BentoCTA = React.memo(({ systemName }: { systemName: string }) => (
  <a
    href={`https://wa.me/${companyData.whatsappNumber}?text=${encodeURIComponent(`Hola, quisiera cotizar el servicio de ${systemName}.`)}`}
    target="_blank"
    rel="noopener noreferrer"
    style={{ width: "100%", height: "100%", textDecoration: "none" }}
  >
    <Box
      bg="linear-gradient(135deg, #a80100 0%, #700000 100%)"
      color="white"
      w="full"
      h="full"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      borderRadius="3xl"
      px="6"
      py="6"
      borderWidth="1px"
      borderColor="rgba(255, 255, 255, 0.15)"
      boxShadow="0 10px 30px rgba(168, 1, 0, 0.25)"
      willChange="transform"
      transition="all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
      cursor="pointer"
      role="group"
      _hover={{
        transform: "translateY(-3px)",
        boxShadow: "0 15px 35px rgba(168, 1, 0, 0.4)",
      }}
    >
      <Box
        as={MessageSquareText}
        boxSize={8}
        mb="2.5"
        color="white"
        transition="transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
        _groupHover={{ transform: "scale(1.12)" }}
      />
      <Heading size="md" mb="1" letterSpacing="tight" color="white" fontWeight="800">
        Cotizar {systemName}
      </Heading>
      <Text opacity={0.9} mb="0" fontSize="xs" maxW="xs" mx="auto" color="whiteAlpha.900" fontWeight="500">
        Recibe asesoría técnica personalizada y presupuesto inmediato.
      </Text>
    </Box>
  </a>
));
BentoCTA.displayName = "BentoCTA";

export const UnifiedTechnicalCard = React.memo(({ description, features, systemName }: { description: string; features?: { label: string }[]; systemName: string }) => (
  <Box
    bg="bg.subtle"
    borderRadius="3xl"
    borderWidth="1px"
    borderColor="border.default"
    px={{ base: "5", md: "6" }}
    py={{ base: "5", md: "6" }}
    w="full"
    h="full"
    display="flex"
    flexDirection="column"
    justifyContent="space-between"
    boxShadow="none"
    transition="border-color 0.3s ease"
    _hover={{
      borderColor: "border.strong",
    }}
  >
    <Box>
      <Heading as="h2" size={{ base: "sm", md: "md" }} mb="2" letterSpacing="tight" color="text.heading" fontWeight="700">
        Concepto Técnico
      </Heading>
      <Text color="text.muted" fontSize={{ base: "sm", md: "xs" }} lineHeight={{ base: "relaxed", md: "tall" }} mb="3">
        {description}
      </Text>

      {features && features.length > 0 && (
        <>
          <Box h="1px" bg="border.default" my="3" opacity={0.6} />

          <Heading as="h3" size={{ base: "xs", md: "sm" }} mb="2.5" letterSpacing="tight" color="text.heading" fontWeight="700">
            Especificaciones Clave
          </Heading>
          <VStack align="stretch" gap="2">
            {features.map((feat) => (
              <HStack key={feat.label} gap="2.5" align="flex-start">
                <Box as={CheckCircle2} color="primary.500" _dark={{ color: "primary.300" }} boxSize={4} mt="0.5" flexShrink={0} />
                <Text fontSize={{ base: "xs", sm: "sm", md: "xs" }} fontWeight="500" color="text.body" lineHeight="short">
                  {feat.label}
                </Text>
              </HStack>
            ))}
          </VStack>
        </>
      )}
    </Box>

    <Box mt={{ base: "5", md: "4" }} w="full">
      <BentoCTA systemName={systemName} />
    </Box>
  </Box>
));
UnifiedTechnicalCard.displayName = "UnifiedTechnicalCard";
