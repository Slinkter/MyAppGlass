/**
 * @file BankAccountsPage.jsx
 * @description Informational page displaying company fiscal data and bank account details for payments.
 * @module pages
 */

import React from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  Container,
  useColorModeValue,
  Card,
  Image,
  CardBody,
  Stack,
  SimpleGrid,
  HStack,
  Icon,
  Tooltip,
  IconButton,
  useToast,
  Flex,
} from "@chakra-ui/react";
import {
  FaBuilding,
  FaIdCard,
  FaMapMarkerAlt,
  FaEnvelope,
  FaCopy,
  FaCheck,
} from "react-icons/fa";
import HelmetWrapper from "@shared/components/HelmetWrapper";
import { companyData } from "@/config/company-data"; // Import companyData
import { bankAccountsData } from "../data/bank-accounts"; // Import bankAccountsData

const CopyButton = ({ value, label }) => {
  const toast = useToast();
  const [hasCopied, setHasCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setHasCopied(true);
    toast({
      title: "Copiado",
      description: `${label} copiado al portapapeles.`,
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top-right",
    });
    setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <Tooltip label={`Copiar ${label}`} hasArrow>
      <IconButton
        size="sm"
        icon={hasCopied ? <FaCheck /> : <FaCopy />}
        aria-label={`Copiar ${label}`}
        onClick={handleCopy}
        variant="ghost"
        colorScheme={hasCopied ? "green" : "gray"}
        isRound
      />
    </Tooltip>
  );
};

const InfoItem = ({ icon, label, value, copyable = false }) => {
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
      spacing={4}
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
        <Icon as={icon} boxSize={5} />
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

const BankAccountCard = ({
  logo,
  bankName,
  accountType,
  accounts,
  logoBg = "gray.50",
}) => {
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Card
      h={{ base: "auto", md: "245px" }}
      direction={{ base: "column", md: "row" }}
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
          decoding="async"
        />
      </Flex>

      <CardBody p={{ base: 5, md: 6 }}>
        <Stack spacing={4}>
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
            spacing={3}
            divider={
              <Box
                borderBottomWidth="1px"
                borderColor={useColorModeValue("gray.100", "gray.600")}
              />
            }
          >
            {accounts.map((acc, idx) => (
              <Flex
                key={idx}
                justify="space-between"
                align="center"
                wrap="wrap"
                gap={2}
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
      </CardBody>
    </Card>
  );
};

const BankAccountsPage = () => {
  const textColor = useColorModeValue("gray.600", "gray.300");
  const headingColor = useColorModeValue("primary.700", "primary.300");

  const fiscalData = [
    {
      icon: FaBuilding,
      label: "Razón Social",
      value: companyData.razonSocial,
      copyable: true,
    },
    {
      icon: FaIdCard,
      label: "R.U.C",
      value: companyData.ruc,
      copyable: true,
    },
    {
      icon: FaMapMarkerAlt,
      label: "Dirección Fiscal",
      value: companyData.direccion,
    },
    {
      icon: FaEnvelope,
      label: "Facturación",
      value: companyData.contactEmail,
      copyable: true,
    },
  ];

  return (
    <>
      <HelmetWrapper
        title="Cuentas Bancarias y Datos de Facturación - GYA Company"
        description="Información detallada de cuentas bancarias y datos fiscales para pagos y facturación a GYA Company."
        canonicalUrl="https://www.gyacompany.com/cuentas-bancarias"
      />
      <Container maxW="7xl" py={{ base: 8, md: 12 }}>
        <VStack spacing={10} align="stretch">
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
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
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
            <Stack spacing={6}>
              {bankAccountsData.map((bankAccount, index) => (
                <BankAccountCard key={index} {...bankAccount} />
              ))}
            </Stack>
          </Box>

          {/* Footer / Contact Hint */}
          <Box
            bg={useColorModeValue("blue.50", "whiteAlpha.100")}
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
    </>
  );
};

export default BankAccountsPage;
