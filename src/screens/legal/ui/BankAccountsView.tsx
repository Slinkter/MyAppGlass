"use client";
/**
 * @file BankAccountsView.tsx
 * @description Informational view displaying company fiscal data and bank account details.
 */

import React from "react";
import {
    Box,
    Heading,
    Text,
    VStack,
    Stack,
    SimpleGrid,
    HStack,
    Badge,
    Image,
    Flex,
} from "@chakra-ui/react";
import { Toaster } from "@/components/ui/toaster";
import {
    Building,
    Contact,
    MapPin,
    Mail,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { companyData } from "@/shared/config/company-data";
import { bankAccountsData } from "@/shared/data/bank-accounts";
import AuraContainer from "@shared/components/aura/AuraContainer";
import AuraHeader from "@shared/components/aura/AuraHeader";
import { InfoItem } from "@/shared/components/ui/info-item";
import { CopyButton } from "@/shared/components/ui/copy-button";
import { BankAccountCard } from "@screens/legal/components/bank-account-card";

const fiscalData: Array<{
    icon: LucideIcon;
    label: string;
    value: string;
    copyable?: boolean;
}> = [
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

const BankAccountsView: React.FC = () => {
    return (
        <>
            <Toaster />

            <AuraContainer>
                <VStack gap="10" align="stretch">
                    <AuraHeader
                        title="Cuentas Bancarias y Facturación"
                        overline="Información Bancaria"
                        description="Encuentre a continuación nuestros datos fiscales y bancarios para gestionar sus pagos con seguridad y confianza."
                        headingAs="h1"
                        mb={0}
                    />

                    {/* Identificación Fiscal */}
                    <Box>
                        <Heading
                            as="h2"
                            size="lg"
                            mb="4"
                            color="text.heading"
                            fontWeight="800"
                        >
                            Identificación Fiscal
                        </Heading>
                        <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
                            {fiscalData.map((item) => (
                                <InfoItem key={item.label} {...item} />
                            ))}
                        </SimpleGrid>
                    </Box>

                    {/* Billeteras Digitales Aplanado */}
                    <Box>
                        <Heading
                            as="h2"
                            size="lg"
                            mb="4"
                            color="text.heading"
                            fontWeight="800"
                        >
                            Billeteras Digitales
                        </Heading>

                        <Box
                            p={{ base: "5", md: "8" }}
                            borderColor="border.default"
                            bg="bg.subtle"
                            borderRadius="3xl"
                            borderWidth="1px"
                        >
                            <Flex
                                direction={{ base: "column", md: "row" }}
                                alignItems="center"
                                gap={{ base: "6", md: "10" }}
                                w="full"
                            >
                                <Box
                                    w={{ base: "full", md: "240px" }}
                                    p="3"
                                    bg="white"
                                    borderRadius="2xl"
                                    boxShadow="md"
                                    position="relative"
                                    overflow="hidden"
                                    flexShrink={0}
                                >
                                    <Image
                                        src={"/images/glassqr2026.webp"}
                                        alt="QR Transferencias"
                                        w="full"
                                        h="auto"
                                        borderRadius="xl"
                                    />
                                </Box>

                                <VStack align="flex-start" flex="1" gap="4">
                                    <HStack gap="3">
                                        <Badge
                                            colorPalette="purple"
                                            size="md"
                                            variant="solid"
                                            px={3}
                                            borderRadius="full"
                                        >
                                            YAPE
                                        </Badge>
                                        <Badge
                                            colorPalette="blue"
                                            size="md"
                                            variant="solid"
                                            px={3}
                                            borderRadius="full"
                                        >
                                            PLIN
                                        </Badge>
                                    </HStack>

                                    <Box>
                                        <Heading
                                            size="md"
                                            color="text.heading"
                                            fontWeight="800"
                                        >
                                            Pago con Billetera Digital
                                        </Heading>
                                        <Text
                                            mt={1}
                                            color="text.muted"
                                            fontSize="xs"
                                            lineHeight="relaxed"
                                        >
                                            Escanee el código QR desde su aplicación preferida para un depósito directo y seguro sin necesidad de números de cuenta complejos.
                                        </Text>
                                    </Box>

                                    <HStack
                                        w="full"
                                        p="3.5"
                                        bg="surface.card"
                                        borderRadius="2xl"
                                        border="1px solid"
                                        borderColor="border.default"
                                        justify="space-between"
                                    >
                                        <VStack align="flex-start" gap={0}>
                                            <Text
                                                fontWeight="800"
                                                fontSize="sm"
                                                color="text.heading"
                                            >
                                                GLASS & ALUMINIO COMPANY S.A.C.
                                            </Text>
                                            <Text
                                                fontSize="xs"
                                                color="text.muted"
                                            >
                                                RUC: {companyData.ruc}
                                            </Text>
                                        </VStack>
                                        <CopyButton
                                            value={companyData.ruc}
                                            label="RUC"
                                        />
                                    </HStack>
                                </VStack>
                            </Flex>
                        </Box>
                    </Box>

                    {/* Cuentas Bancarias */}
                    <Box>
                        <Heading
                            as="h2"
                            size="lg"
                            mb="4"
                            color="text.heading"
                            fontWeight="800"
                        >
                            Cuentas Bancarias
                        </Heading>
                        <Stack gap="4">
                            {bankAccountsData.map((bankAccount) => (
                                <BankAccountCard key={bankAccount.bankName} {...bankAccount} />
                            ))}
                        </Stack>
                    </Box>

                    {/* Banner de Contacto */}
                    <Box
                        p="6"
                        textAlign="center"
                        borderColor="border.default"
                        borderWidth="1px"
                        bg="bg.subtle"
                        borderRadius="3xl"
                    >
                        <Text fontSize="sm" color="text.muted">
                            ¿Necesita confirmar un pago o requiere asistencia adicional?{" "}
                            <Text
                                as="span"
                                fontWeight="800"
                                color="primary.500"
                            >
                                Contacte a: {companyData.contactEmail}
                            </Text>
                        </Text>
                    </Box>
                </VStack>
            </AuraContainer>
        </>
    );
};

export default BankAccountsView;
