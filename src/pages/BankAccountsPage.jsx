/**
 * @file BankAccountsPage.jsx
 * @description Informational page displaying company fiscal data and bank account details for payments.
 * Refactored to use semantic tokens for full theme compatibility.
 */

import React from "react";
import { Box, Heading, Text, VStack, Stack, SimpleGrid, HStack, IconButton, Flex, Badge, Image } from "@chakra-ui/react";
import { Toaster, toaster } from "@/components/ui/toaster";
import { Tooltip } from "@/components/ui/tooltip";
import {
  Building, Contact, MapPin, Mail, Copy, Check,
} from "lucide-react";
import HelmetWrapper from "@shared/components/HelmetWrapper";
import { companyData } from "@/config/company-data";
import { bankAccountsData } from "../data/bank-accounts";
import AuraContainer from "@shared/components/aura/AuraContainer";
import AuraHeader from "@shared/components/aura/AuraHeader";
import AuraSurface from "@shared/components/aura/AuraSurface";
import AuraSkeleton, { AuraHeaderSkeleton, GridSkeleton, BannerSkeleton } from "@shared/components/aura/AuraSkeleton";
import qrYapePlin from "@/assets/glassqr2026.jpg";

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
      p={4}
      gap={4}
      align="center"
      w="full"
      borderWidth="1px"
      borderColor="border.glass"
      borderRadius="xl"
      bg="bg.glass"
      transition="all 0.2s"
      _hover={{ borderColor: "border.strong", transform: "translateY(-2px)" }}
    >
      <Flex
        align="center" justify="center"
        w={12} h={12} borderRadius="lg"
        bg="surface.icon" color="text.accent" flexShrink={0}
      >
        <Box as={icon} boxSize={5} />
      </Flex>
      <Box flex="1">
        <Text fontSize="xs" fontWeight="700" textTransform="uppercase" color="text.muted" letterSpacing="wide">
          {label}
        </Text>
        <Text fontSize="md" fontWeight="600" color="text.heading" mt={0.5} lineHeight="shorter">
          {value}
        </Text>
      </Box>
      {copyable && (
        <Flex align="center" h="full">
          <CopyButton value={value} label={label} />
        </Flex>
      )}
    </HStack>
  );
};

/** v3: Card/CardBody → Box with manual styling */
const BankAccountCard = ({ logo, bankName, accountType, accounts, logoBg = "gray.50" }) => {
  return (
    <AuraSurface
      display="flex"
      flexDirection={{ base: "column", md: "row" }}
      overflow="hidden"
      p={0}
      borderRadius="2xl"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
    >
      <Flex
        align="center" justify="center"
        bg={logoBg}
        _dark={{ bg: "whiteAlpha.900" }}
        p={6}
        minW={{ md: "220px" }} maxW={{ md: "240px" }}
        borderRightWidth={{ md: "1px" }}
        borderBottomWidth={{ base: "1px", md: "0" }}
        borderColor="border.glass"
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
              fontSize="sm" fontWeight="700"
              color="text.accent"
              textTransform="uppercase" letterSpacing="wide" mb={1}
            >
              {bankName}
            </Text>
            <Heading size="md" fontWeight="600" color="text.heading" lineHeight="1.3">
              {accountType}
            </Heading>
          </Box>

          <Stack gap={3}>
            {accounts.map((acc, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && (
                  <Box borderBottomWidth="1px" borderColor="border.glass" />
                )}
                <Flex justify="space-between" align="flex-start" gap={3}>
                  <Box flex="1">
                    <Text fontSize="xs" color="text.muted" fontWeight="600" textTransform="uppercase" letterSpacing="wide">
                      {acc.label}
                    </Text>
                    <Text fontSize="md" fontWeight="600" color="text.heading" mt={0.5}>
                      {acc.value}
                    </Text>
                    {acc.note && (
                      <Text fontSize="xs" color="orange.500" fontStyle="italic" mt={1}>
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
    </AuraSurface>
  );
};

const BankAccountsPage = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulamos carga de datos para mostrar los Skeletons premium
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const fiscalData = [
    { icon: Building, label: "Razón Social", value: companyData.razonSocial, copyable: true },
    { icon: Contact, label: "R.U.C", value: companyData.ruc, copyable: true },
    { icon: MapPin, label: "Dirección Fiscal", value: companyData.direccion },
    { icon: Mail, label: "Facturación", value: companyData.contactEmail, copyable: true },
  ];

  if (isLoading) {
    return (
      <AuraContainer>
        <VStack gap={12} align="stretch">
          <AuraHeaderSkeleton centered={false} />
          <Box>
             <AuraSkeleton h="32px" w="250px" mb="phi_lg" />
             <GridSkeleton columns={{ base: 1, md: 2 }} count={4} />
          </Box>
          <Box>
             <AuraSkeleton h="32px" w="250px" mb="phi_lg" />
             <BannerSkeleton />
          </Box>
          <Box>
             <AuraSkeleton h="32px" w="250px" mb="phi_lg" />
             <VStack gap="phi_md" w="full">
               <AuraSkeleton h="160px" w="full" borderRadius="2xl" />
               <AuraSkeleton h="160px" w="full" borderRadius="2xl" />
             </VStack>
          </Box>
        </VStack>
      </AuraContainer>
    );
  }

  return (
    <>
      <Toaster />
      <HelmetWrapper
        title="Cuentas Bancarias y Facturación - GYA Company"
        description="Información detallada de cuentas bancarias y datos fiscales para pagos y facturación."
        canonicalUrl="https://www.gyacompany.com/cuentas-bancarias"
      />
      
      <AuraContainer>
        <VStack gap={12} align="stretch">
          
          <AuraHeader 
            title={
              <>
                Cuentas Bancarias y <Text as="span" color="text.accent">Facturación</Text>
              </>
            }
            overline="Información Bancaria"
            description="Encuentre a continuación nuestros datos fiscales y bancarios para gestionar sus pagos con seguridad y confianza."
          />

          <Box>
            <Heading as="h2" size="lg" mb="phi_lg" color="text.heading" fontWeight="800">
              Identificación Fiscal
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap="phi_md">
              {fiscalData.map((item, index) => (
                <AuraSurface key={index} p={0}>
                   <InfoItem {...item} />
                </AuraSurface>
              ))}
            </SimpleGrid>
          </Box>

          {/* NUEVA SECCIÓN: BILLETERAS DIGITALES (YAPE / PLIN) */}
          <Box>
            <Heading as="h2" size="lg" mb="phi_lg" color="text.heading" fontWeight="800">
              Billeteras Digitales
            </Heading>
            
            <AuraSurface 
              variant="interactive" 
              p={{ base: "phi_md", md: "phi_lg" }}
              display="flex"
              flexDirection={{ base: "column", md: "row" }}
              align="center"
              gap={{ base: "phi_lg", md: "phi_xl" }}
            >
              {/* Contenedor del QR */}
              <Box 
                w={{ base: "full", md: "280px" }} 
                p="phi_sm"
                bg="white" 
                borderRadius="2xl" 
                boxShadow="xl"
                position="relative"
                overflow="hidden"
              >
                <Image 
                  src={qrYapePlin} 
                  alt="QR Transferencias"
                  w="full"
                  h="auto"
                  borderRadius="xl"
                />
                <Box 
                  position="absolute" 
                  bottom={0} left={0} right={0} 
                  bg="primary.500" 
                  h="6px" 
                />
              </Box>

              {/* Información de Billeteras */}
              <VStack align="flex-start" flex="1" gap="phi_md">
                <HStack gap="phi_sm">
                  <Badge colorPalette="purple" size="lg" variant="solid" px={3} borderRadius="full">YAPE</Badge>
                  <Badge colorPalette="blue" size="lg" variant="solid" px={3} borderRadius="full">PLIN</Badge>
                </HStack>
                
                <Box>
                  <Heading size="md" color="text.heading" fontWeight="800">Pago con Billetera Digital</Heading>
                  <Text mt={2} color="text.body" fontSize="sm" lineHeight="tall">
                    Facilitamos sus pagos inmediatos. Escanee el código QR desde su aplicación favorita 
                    <strong>(Yape, Plin, Tunki u otras aplicaciones bancarias compatibles)</strong> 
                    para realizar un depósito directo y seguro sin necesidad de números de cuenta complejos.
                  </Text>
                </Box>

                <VStack align="flex-start" gap="phi_xs" w="full">
                  <Text fontSize="xs" fontWeight="900" color="text.accent" textTransform="uppercase" letterSpacing="widest">
                    Titularidad
                  </Text>
                  <HStack 
                    w="full" p="phi_sm" bg="bg.subtle" borderRadius="xl" 
                    border="1px solid" borderColor="border.glass" justify="space-between"
                  >
                    <VStack align="flex-start" gap={0}>
                      <Text fontWeight="800" fontSize="md" color="text.heading">GIA & ALUMINIO S.A.C.</Text>
                      <Text fontSize="xs" color="text.muted">RUC: {companyData.ruc}</Text>
                    </VStack>
                    <CopyButton value={companyData.ruc} label="RUC" />
                  </HStack>
                </VStack>
              </VStack>
            </AuraSurface>
          </Box>

          <Box>
            <Heading as="h2" size="lg" mb="phi_lg" color="text.heading" fontWeight="800">
              Cuentas Bancarias
            </Heading>
            <Stack gap="phi_md">
              {bankAccountsData.map((bankAccount, index) => (
                <BankAccountCard key={index} {...bankAccount} />
              ))}
            </Stack>
          </Box>

          <AuraSurface
            p="phi_lg" textAlign="center" variant="strong"
          >
            <Text fontSize="md" color="text.body">
              ¿Necesita confirmar un pago o requiere asistencia adicional?
              <Text as="span" display="block" mt={1} fontWeight="800" color="text.accent" letterSpacing="wide">
                CONTÁCTENOS EN: {companyData.contactEmail}
              </Text>
            </Text>
          </AuraSurface>
        </VStack>
      </AuraContainer>
    </>
  );
};

export default BankAccountsPage;
