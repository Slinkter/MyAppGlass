/**
 * @file BankAccountsPage.jsx
 * @description Informational page displaying company fiscal data and bank account details for payments.
 * Refactored to use semantic tokens for full theme compatibility.
 */

import React from "react";
import { Box, Heading, Text, VStack, Container, Image, Stack, SimpleGrid, HStack, IconButton, Flex } from "@chakra-ui/react";
import { Toaster, toaster } from "@/components/ui/toaster";
import { Tooltip } from "@/components/ui/tooltip";
import {
  Building, Contact, MapPin, Mail, Copy, Check,
} from "lucide-react";
import HelmetWrapper from "@shared/components/HelmetWrapper";
import { companyData } from "@/config/company-data";
import { bankAccountsData } from "../data/bank-accounts";

/** v3: useToast → toaster object from snippet */
const CopyButton = ({ value, label }) => {
  const [hasCopied, setHasCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setHasCopied(true);
    toaster.create({
      title: "Copiado",
      description: `${label} copiado al portapapeles.`,
      type: "success",
      duration: 2000,
    });
    setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <Tooltip content={`Copiar ${label}`}>
      <IconButton
        size="sm"
        aria-label={`Copiar ${label}`}
        onClick={handleCopy}
        variant="ghost"
        colorPalette={hasCopied ? "green" : "gray"}
        borderRadius="full"
      >
        {hasCopied ? <Check size={16} /> : <Copy size={16} />}
      </IconButton>
    </Tooltip>
  );
};

const InfoItem = ({ icon, label, value, copyable = false }) => {
  return (
    <HStack
      bg="bg.section"
      p={4}
      h={{ base: "120px", md: "100px" }}
      borderRadius="xl"
      borderWidth="1px"
      borderColor="border.default"
      boxShadow="sm"
      gap={4}
      align="center"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-2px)", boxShadow: "md" }}
    >
      <Flex
        align="center" justify="center"
        w={10} h={10} borderRadius="full"
        bg="bg.subtle"
        color="text.accent" flexShrink={0}
      >
        <Box as={icon} boxSize={5} />
      </Flex>
      <Box flex="1">
        <Text fontSize="xs" fontWeight="bold" textTransform="uppercase" color="text.muted" letterSpacing="wider">
          {label}
        </Text>
        <Text fontSize="md" fontWeight="medium" color="text.heading">
          {value}
        </Text>
      </Box>
      {copyable && <CopyButton value={value} label={label} />}
    </HStack>
  );
};

/** v3: Card/CardBody → Box with manual styling */
const BankAccountCard = ({ logo, bankName, accountType, accounts, logoBg = "gray.50" }) => {
  return (
    <Box
      h={{ base: "auto", md: "245px" }}
      display="flex"
      flexDirection={{ base: "column", md: "row" }}
      overflow="hidden"
      bg="bg.section"
      borderWidth="1px"
      borderColor="border.default"
      borderRadius="2xl"
      boxShadow="md"
      transition="all 0.3s"
      _hover={{ shadow: "lg" }}
    >
      <Flex
        align="center" justify="center"
        bg={logoBg}
        _dark={{ bg: "whiteAlpha.900" }}
        p={6}
        minW={{ md: "220px" }} maxW={{ md: "240px" }}
        borderRightWidth={{ md: "1px" }}
        borderBottomWidth={{ base: "1px", md: "0" }}
        borderColor="border.default"
      >
        <Image
          objectFit="contain" w="full" h="auto" maxH="60px"
          src={logo} alt={`Logo ${bankName}`} loading="lazy" decoding="async"
        />
      </Flex>

      <Box p={{ base: 5, md: 6 }} flex="1">
        <Stack gap={4}>
          <Box>
            <Text
              fontSize="sm" fontWeight="bold"
              color="text.accent"
              textTransform="uppercase" letterSpacing="wide" mb={1}
            >
              {bankName}
            </Text>
            <Heading size="md" fontWeight="bold" color="text.heading">{accountType}</Heading>
          </Box>

          <Stack gap={3}>
            {accounts.map((acc, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && (
                  <Box borderBottomWidth="1px" borderColor="border.default" />
                )}
                <Flex justify="space-between" align="center" wrap="wrap" gap={2}>
                  <Box>
                    <Text fontSize="xs" color="text.muted" fontWeight="bold">{acc.label}</Text>
                    <Text fontFamily="mono" fontSize="md" fontWeight="medium" color="text.body">{acc.value}</Text>
                    {acc.note && (
                      <Text fontSize="xs" color="orange.500" fontStyle="italic" mt={0.5}>
                        {acc.note}
                      </Text>
                    )}
                  </Box>
                  <CopyButton value={acc.value} label={acc.label} />
                </Flex>
              </React.Fragment>
            ))}
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

const BankAccountsPage = () => {
  const fiscalData = [
    { icon: Building, label: "Razón Social", value: companyData.razonSocial, copyable: true },
    { icon: Contact, label: "R.U.C", value: companyData.ruc, copyable: true },
    { icon: MapPin, label: "Dirección Fiscal", value: companyData.direccion },
    { icon: Mail, label: "Facturación", value: companyData.contactEmail, copyable: true },
  ];

  return (
    <>
      <Toaster />
      <HelmetWrapper
        title="Cuentas Bancarias y Datos de Facturación - GYA Company"
        description="Información detallada de cuentas bancarias y datos fiscales para pagos y facturación a GYA Company."
        canonicalUrl="https://www.gyacompany.com/cuentas-bancarias"
      />
      <Container maxW="7xl" py={{ base: 8, md: 12 }}>
        <VStack gap={10} align="stretch">
          <Box textAlign={{ base: "left", md: "center" }} maxW="4xl" mx="auto">
            <Heading
              as="h1" size={{ base: "xl", md: "2xl" }}
              color="text.heading" mb={4} lineHeight="shorter"
            >
              Cuentas Bancarias y <br />
              <Text as="span" color="text.accent">
                Datos de Facturación
              </Text>
            </Heading>
            <Text fontSize={{ base: "md", md: "lg" }} color="text.body">
              Facilitamos sus transacciones con información clara y accesible.
              Encuentre a continuación nuestros datos fiscales y bancarios para
              gestionar sus pagos con seguridad y confianza.
            </Text>
          </Box>

          <Box>
            <Heading as="h2" size="lg" mb={6} color="text.heading">
              Identificación Fiscal
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={5}>
              {fiscalData.map((item, index) => (
                <InfoItem key={index} {...item} />
              ))}
            </SimpleGrid>
          </Box>

          <Box>
            <Heading as="h2" size="lg" mb={6} color="text.heading">
              Cuentas Bancarias
            </Heading>
            <Stack gap={6}>
              {bankAccountsData.map((bankAccount, index) => (
                <BankAccountCard key={index} {...bankAccount} />
              ))}
            </Stack>
          </Box>

          <Box
            bg="bg.subtle"
            p={6} borderRadius="xl" textAlign="center"
          >
            <Text fontSize="md" color="text.body">
              ¿Necesita confirmar un pago o requiere asistencia adicional?
              <Text as="span" display="block" mt={1} fontWeight="bold" color="text.accent">
                Contáctenos en: {companyData.contactEmail}
              </Text>
            </Text>
          </Box>
        </VStack>
      </Container>
    </>
  );
};

export default BankAccountsPage;
