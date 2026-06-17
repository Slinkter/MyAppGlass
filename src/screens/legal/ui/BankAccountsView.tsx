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
    Card,
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
import {
    GridSkeleton,
    BannerSkeleton,
} from "@shared/components/aura/AuraSkeleton";
import AuraSkeleton from "@shared/components/aura/AuraSkeleton";
import { InfoItem } from "@/shared/components/ui/info-item";
import { CopyButton } from "@/shared/components/ui/copy-button";
import { BankAccountCard } from "../components/bank-account-card";

const BankAccountsView: React.FC = () => {
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

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

    if (isLoading) {
        return (
            <AuraContainer>
                <VStack gap="8" align="stretch">
                    <AuraSkeleton h="100px" w="full" mb="4" />
                    <Box>
                        <AuraSkeleton h="32px" w="250px" mb="6" />
                        <GridSkeleton columns={{ base: 1, md: 2 }} count={4} />
                    </Box>
                    <Box>
                        <AuraSkeleton h="32px" w="250px" mb="6" />
                        <BannerSkeleton />
                    </Box>
                    <Box>
                        <AuraSkeleton h="32px" w="250px" mb="6" />
                        <VStack gap="6" w="full">
                            <AuraSkeleton
                                h="160px"
                                w="full"
                                borderRadius="2xl"
                            />
                        </VStack>
                    </Box>
                </VStack>
            </AuraContainer>
        );
    }

    return (
        <>
            <Toaster />

            <AuraContainer>
                <VStack gap="8" align="stretch">
                    <AuraHeader
                        title="Cuentas Bancarias y Facturación"
                        overline="Información Bancaria"
                        description="Encuentre a continuación nuestros datos fiscales y bancarios para gestionar sus pagos con seguridad y confianza."
                        mb={0}
                    />

                    <Box>
                        <Heading
                            as="h2"
                            size="lg"
                            mb="6"
                            color="text.heading"
                            fontWeight="800"
                        >
                            Identificación Fiscal
                        </Heading>
                        <SimpleGrid columns={{ base: 1, md: 2 }} gap="6">
                            {fiscalData.map((item, index) => (
                                <InfoItem key={index} {...item} />
                            ))}
                        </SimpleGrid>
                    </Box>

                    <Box>
                        <Heading
                            as="h2"
                            size="lg"
                            mb="6"
                            color="text.heading"
                            fontWeight="800"
                        >
                            Billeteras Digitales
                        </Heading>

                        <Card.Root
                            p={{ base: "6", md: "8" }}
                            borderColor="border.default"
                            bg="surface.card"
                            borderRadius="card"
                            boxShadow="sm"
                            transition="background-color 0.2s, box-shadow 0.2s, transform 0.2s"
                            _hover={{
                                bg: { _light: "rgba(255,255,255,0.35)", _dark: "rgba(24,24,27,0.5)" },
                                boxShadow: "glassHover",
                                transform: "translateY(-2px)",
                            }}
                        >
                            <Card.Body
                                p={0}
                                display="flex"
                                flexDirection={{ base: "column", md: "row" }}
                                alignItems="center"
                                gap={{ base: "8", md: "14" }}
                                w="full"
                            >
                                <Box
                                    w={{ base: "full", md: "280px" }}
                                    p="4"
                                    bg="white"
                                    borderRadius="2xl"
                                    boxShadow="xl"
                                    position="relative"
                                    overflow="hidden"
                                >
                                    <Image
                                        src={"/images/glassqr2026.webp"}
                                        alt="QR Transferencias"
                                        w="full"
                                        h="auto"
                                        borderRadius="xl"
                                    />
                                    <Box
                                        position="absolute"
                                        bottom={0}
                                        left={0}
                                        right={0}
                                        bg="primary.500"
                                        h="6px"
                                    />
                                </Box>

                                <VStack align="flex-start" flex="1" gap="6">
                                    <HStack gap="4">
                                        <Badge
                                            colorPalette="purple"
                                            size="lg"
                                            variant="solid"
                                            px={3}
                                            borderRadius="full"
                                        >
                                            YAPE
                                        </Badge>
                                        <Badge
                                            colorPalette="blue"
                                            size="lg"
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
                                            mt={2}
                                            color="text.body"
                                            fontSize="sm"
                                            lineHeight="tall"
                                        >
                                            Facilitamos sus pagos inmediatos.
                                            Escanee el código QR desde su aplicación
                                            favorita
                                            <strong>
                                                (Yape, Plin, Tunki u otras
                                                aplicaciones bancarias compatibles)
                                            </strong>
                                            para realizar un depósito directo y
                                            seguro sin necesidad de números de
                                            cuenta complejos.
                                        </Text>
                                    </Box>

                                    <VStack
                                        align="flex-start"
                                        gap="2"
                                        w="full"
                                    >
                                        <Text
                                            fontSize="xs"
                                            fontWeight="900"
                                            color="text.accent"
                                            textTransform="uppercase"
                                            letterSpacing="widest"
                                        >
                                            Titularidad
                                        </Text>
                                        <HStack
                                            w="full"
                                            p="4"
                                            bg="bg.subtle"
                                            borderRadius="xl"
                                            border="1px solid"
                                            borderColor="border.glass"
                                            justify="space-between"
                                        >
                                            <VStack align="flex-start" gap={0}>
                                                <Text
                                                    fontWeight="800"
                                                    fontSize="md"
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
                                </VStack>
                            </Card.Body>
                        </Card.Root>
                    </Box>

                    <Box>
                        <Heading
                            as="h2"
                            size="lg"
                            mb="6"
                            color="text.heading"
                            fontWeight="800"
                        >
                            Cuentas Bancarias
                        </Heading>
                        <Stack gap="6">
                            {bankAccountsData.map((bankAccount, index) => (
                                <BankAccountCard key={index} {...bankAccount} />
                            ))}
                        </Stack>
                    </Box>

                    <Card.Root
                        p="8"
                        textAlign="center"
                        borderColor="border.default"
                        bg="glass.bg"
                        borderRadius="card"
                        boxShadow="sm"
                    >
                        <Card.Body p={0}>
                            <Text fontSize="md" color="text.body">
                                ¿Necesita confirmar un pago o requiere asistencia
                                adicional?
                                <Text
                                    as="span"
                                    display="block"
                                    mt={1}
                                    fontWeight="800"
                                    color="text.accent"
                                    letterSpacing="wide"
                                >
                                    CONTÁCTENOS EN: {companyData.contactEmail}
                                </Text>
                            </Text>
                        </Card.Body>
                    </Card.Root>
                </VStack>
            </AuraContainer>
        </>
    );
};

export default BankAccountsView;
