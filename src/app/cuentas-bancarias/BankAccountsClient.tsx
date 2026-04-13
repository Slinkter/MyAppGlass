"use client";

import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  Container,
  Card,
  Image,
  Stack,
  SimpleGrid,
  HStack,
  Icon,
  IconButton,
  Flex,
} from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import {
  Building,
  Contact,
  MapPin,
  Mail,
  Copy,
  Check,
} from "lucide-react";
import { companyData } from "@/config/company-data";
import { bankAccountsData } from "@/data/bank-accounts";

const CopyButton = ({ value, label }: { value: string; label: string }) => {
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <IconButton
      size="sm"
      onClick={handleCopy}
      variant="ghost"
      colorPalette={hasCopied ? "green" : "gray"}
      title={`Copiar ${label}`}
    >
      <Icon as={hasCopied ? Check : Copy} />
    </IconButton>
  );
};

interface InfoItemProps {
  icon: React.ElementType;
  label: string;
  value: string;
  copyable?: boolean;
}

const InfoItem = ({ icon, label, value, copyable = false }: InfoItemProps) => {
  const bg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.100", "gray.600");
  const iconColor = useColorModeValue("primary.500", "primary.300");

  return (
    <HStack
      bg={bg}
      p={4}
      h={{ base: "120px", md: "100px" }}
      borderRadius="xl"
      borderWidth="1px"
      borderColor={borderColor}
      boxShadow="sm"
      gap={4}
      align="center"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-2px)", boxShadow: "md" }}
    >
      <Flex
        align="center"
        justify="center"
        w={10}
        h={10}
        borderRadius="full"
        bg={useColorModeValue("primary.50", "whiteAlpha.200")}
        color={iconColor}
        flexShrink={0}
      >
        <Icon as={icon} size="md" />
      </Flex>
      <Box flex="1">
        <Text
          fontSize="xs"
          fontWeight="bold"
          textTransform="uppercase"
          color="gray.500"
          letterSpacing="wider"
        >
          {label}
        </Text>
        <Text
          fontSize="md"
          fontWeight="medium"
          color={useColorModeValue("gray.800", "white")}
        >
          {value}
        </Text>
      </Box>
      {copyable && <CopyButton value={value} label={label} />}
    </HStack>
  );
};

interface BankAccountCardProps {
  logo: string;
  bankName: string;
  accountType: string;
  accounts: { label: string; value: string; note?: string }[];
  logoBg?: string;
}

const BankAccountCard = ({
  logo,
  bankName,
  accountType,
  accounts,
  logoBg = "gray.50",
}: BankAccountCardProps) => {
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const itemBorderColor = useColorModeValue("gray.100", "gray.600");

  return (
    <Card.Root
      h={{ base: "auto", md: "245px" }}
      flexDirection={{ base: "column", md: "row" }}
      overflow="hidden"
      variant="outline"
      bg={cardBg}
      borderColor={borderColor}
      borderRadius="2xl"
      boxShadow="md"
      transition="all 0.3s"
      _hover={{ shadow: "lg" }}
    >
      <Flex
        align="center"
        justify="center"
        bg={useColorModeValue(logoBg, "whiteAlpha.900")}
        p={6}
        minW={{ md: "220px" }}
        maxW={{ md: "240px" }}
        borderRightWidth={{ md: "1px" }}
        borderBottomWidth={{ base: "1px", md: "0" }}
        borderColor={borderColor}
      >
        <Image
          objectFit="contain"
          w="full"
          h="auto"
          maxH="60px"
          src={logo}
          alt={`Logo ${bankName}`}
          loading="lazy"
        />
      </Flex>

      <Card.Body p={{ base: 5, md: 6 }}>
        <Stack gap={4}>
          <Box>
            <Text
              fontSize="sm"
              fontWeight="bold"
              color={useColorModeValue("primary.600", "primary.300")}
              textTransform="uppercase"
              letterSpacing="wide"
              mb={1}
            >
              {bankName}
            </Text>
            <Heading size="md" fontWeight="bold">
              {accountType}
            </Heading>
          </Box>

          <Stack
            gap={3}
          >
            {accounts.map((acc, idx) => (
              <Flex
                key={idx}
                justify="space-between"
                align="center"
                wrap="wrap"
                gap={2}
                borderTop={idx > 0 ? "1px solid" : "none"}
                borderColor={itemBorderColor}
                pt={idx > 0 ? 3 : 0}
              >
                <Box>
                  <Text fontSize="xs" color="gray.500" fontWeight="bold">
                    {acc.label}
                  </Text>
                  <Text fontFamily="mono" fontSize="md" fontWeight="medium">
                    {acc.value}
                  </Text>
                  {acc.note && (
                    <Text
                      fontSize="xs"
                      color="orange.500"
                      fontStyle="italic"
                      mt={0.5}
                    >
                      {acc.note}
                    </Text>
                  )}
                </Box>
                <CopyButton value={acc.value} label={acc.label} />
              </Flex>
            ))}
          </Stack>
        </Stack>
      </Card.Body>
    </Card.Root>
  );
};

export const BankAccountsClient = () => {
  const textColor = useColorModeValue("gray.600", "gray.300");
  const headingColor = useColorModeValue("primary.700", "primary.300");

  const fiscalData = [
    {
      icon: Building,
      label: "Razón Social",
      value: companyData.razonSocial,
      copyable: true,
    },
    {
      icon: Contact,
      label: "R.U.C",
      value: companyData.ruc,
      copyable: true,
    },
    {
      icon: MapPin,
      label: "Dirección Fiscal",
      value: companyData.direccion,
    },
    {
      icon: Mail,
      label: "Facturación",
      value: companyData.contactEmail,
      copyable: true,
    },
  ];

  return (
    <Container maxW="7xl" py={{ base: 8, md: 12 }}>
      <VStack gap={10} align="stretch">
        {/* Header Section */}
        <Box textAlign={{ base: "left", md: "center" }} maxW="4xl" mx="auto">
          <Heading
            as="h1"
            size={{ base: "xl", md: "2xl" }}
            color={headingColor}
            mb={4}
            lineHeight="shorter"
          >
            Cuentas Bancarias y <br />
            <Text as="span" color={useColorModeValue("gray.800", "white")}>
              Datos de Facturación
            </Text>
          </Heading>
          <Text fontSize={{ base: "md", md: "lg" }} color={textColor}>
            Facilitamos sus transacciones con información clara y accesible.
            Encuentre a continuación nuestros datos fiscales y bancarios para
            gestionar sus pagos con seguridad y confianza.
          </Text>
        </Box>

        {/* Fiscal Identification Section */}
        <Box>
          <Heading
            as="h2"
            size="lg"
            mb={6}
            color={useColorModeValue("gray.700", "white")}
          >
            Identificación Fiscal
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={5}>
            {fiscalData.map((item, index) => (
              <InfoItem key={index} {...item} />
            ))}
          </SimpleGrid>
        </Box>

        {/* Bank Accounts Section */}
        <Box>
          <Heading
            as="h2"
            size="lg"
            mb={6}
            color={useColorModeValue("gray.700", "white")}
          >
            Cuentas Bancarias
          </Heading>
          <Stack gap={6}>
            {bankAccountsData.map((bankAccount, index) => (
              <BankAccountCard key={index} {...bankAccount} />
            ))}
          </Stack>
        </Box>

        {/* Footer / Contact Hint */}
        <Box
          bg={useColorModeValue("primary.50", "whiteAlpha.100")}
          p={6}
          borderRadius="xl"
          textAlign="center"
        >
          <Text fontSize="md" color={textColor}>
            ¿Necesita confirmar un pago o requiere asistencia adicional?
            <Text
              as="span"
              display="block"
              mt={1}
              fontWeight="bold"
              color={headingColor}
            >
              Contáctenos en: {companyData.contactEmail}
            </Text>
          </Text>
        </Box>
      </VStack>
    </Container>
  );
}
