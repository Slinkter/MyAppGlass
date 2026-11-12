"use client";
import React from "react";
import Link from "next/link";
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

const BentoCTAContent = ({ systemName }: { systemName: string }) => (
  <Box
    bg="brand.ink"
    color="white"
    w="full"
    h="full"
    display="flex"
    flexDirection="column"
    justifyContent="center"
    alignItems="center"
    textAlign="center"
    borderRadius="3xl"
    px={{ base: "4", md: "6" }}
    py={{ base: "4", md: "6" }}
    borderWidth="1px"
    borderColor="border.default"
    boxShadow="md"
    willChange="transform"
    transition="transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
    cursor="pointer"
    role="group"
    _hover={{
      transform: "translateY(-3px)",
      boxShadow: "lg",
    }}
    _motionReduce={{ transition: "none", transform: "none", _hover: { transform: "none" } }}
  >
    <Box
      as={MessageSquareText}
      boxSize={8}
      mb="2.5"
      color="white"
      transition="transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
      _groupHover={{ transform: "scale(1.12)" }}
      _motionReduce={{ transition: "none", transform: "none" }}
    />
    <Heading size="md" mb="1" letterSpacing="tight" color="white" fontWeight="700">
      Cotizar {systemName}
    </Heading>
    <Text opacity={0.9} mb="0" fontSize="xs" maxW="xs" mx="auto" color="whiteAlpha.900" fontWeight="500">
      Recibe asesoría técnica personalizada y presupuesto inmediato.
    </Text>
  </Box>
);

const CTA_LINK_STYLE = { width: "100%", height: "100%", textDecoration: "none" } as const;

export const BentoCTA = React.memo(({ systemName, quoteHref }: { systemName: string; quoteHref?: string | null }) =>
  quoteHref ? (
    <Link href={quoteHref} style={CTA_LINK_STYLE}>
      <BentoCTAContent systemName={systemName} />
    </Link>
  ) : (
    <a
      href={`https://wa.me/${companyData.whatsappNumber}?text=${encodeURIComponent(`Hola, quisiera cotizar el servicio de ${systemName}.`)}`}
      target="_blank"
      rel="noopener noreferrer"
      style={CTA_LINK_STYLE}
    >
      <BentoCTAContent systemName={systemName} />
    </a>
  ),
);
BentoCTA.displayName = "BentoCTA";

export const UnifiedTechnicalCard = React.memo(({ description, features, systemName, quoteHref }: { description: string; features?: { label: string }[]; systemName: string; quoteHref?: string | null }) => (
  <Box
    bg="bg.subtle"
    borderRadius="3xl"
    borderWidth="1px"
    borderColor="border.default"
    px={{ base: "4", md: "6" }}
    py={{ base: "4", md: "6" }}
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
    _motionReduce={{ transition: "none" }}
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
                <Box as={CheckCircle2} color="primary.500" _dark={{ color: "primary.300" }} boxSize={4} mt="0.5" style={{ flexShrink: 0 }} />
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
      <BentoCTA systemName={systemName} quoteHref={quoteHref} />
    </Box>
  </Box>
));
UnifiedTechnicalCard.displayName = "UnifiedTechnicalCard";
