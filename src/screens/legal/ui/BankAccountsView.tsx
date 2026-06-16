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
    IconButton,
    Flex,
    Badge,
    Image,
    Card,
} from "@chakra-ui/react";
import { Toaster } from "@/components/ui/toaster";
import { toaster } from "@/components/ui/toaster-instance";
import { Tooltip } from "@/components/ui/tooltip";
import {
    Building,
    Contact,
    MapPin,
    Mail,
    Copy,
    Check,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { companyData } from "@/shared/config/company-data";
import { bankAccountsData, type BankAccount } from "@/shared/data/bank-accounts";
import AuraContainer from "@shared/components/aura/AuraContainer";
import AuraHeader from "@shared/components/aura/AuraHeader";
import {
    GridSkeleton,
    BannerSkeleton,
} from "@shared/components/aura/AuraSkeleton";
import AuraSkeleton from "@shared/components/aura/AuraSkeleton";

interface CopyButtonProps {
    value: string;
    label: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ value, label }) => {
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

interface InfoItemProps {
    icon: LucideIcon;
    label: string;
    value: string;
    copyable?: boolean;
}

const InfoItem: React.FC<InfoItemProps> = ({
    icon,
    label,
    value,
    copyable = false,
}) => {
    return (
        <Card.Root
            flexDirection="row"
            p={4}
            gap={4}
            alignItems="center"
            w="full"
            borderWidth="1px"
            borderColor="border.default"
            borderRadius="xl"
            bg="surface.container"
            transition="all 0.2s"
            _hover={{
                borderColor: "border.strong",
                transform: "translateY(-2px)",
            }}
        >
            <Card.Body p={0} display="flex" flexDirection="row" alignItems="center" gap={4} w="full">
                <Flex
                    align="center"
                    justify="center"
                    w={12}
                    h={12}
                    borderRadius="lg"
                    bg="surface.icon"
                    color="text.accent"
                    flexShrink={0}
                >
                    <Box as={icon} boxSize={5} />
                </Flex>
                <Box flex="1">
                    <Text
                        fontSize="xs"
                        fontWeight="700"
                        textTransform="uppercase"
                        color="text.muted"
                        letterSpacing="wide"
                    >
                        {label}
                    </Text>
                    <Text
                        fontSize="md"
                        fontWeight="600"
                        color="text.heading"
                        mt={0.5}
                        lineHeight="shorter"
                    >
                        {value}
                    </Text>
                </Box>
                {copyable && (
                    <Flex align="center" h="full">
                        <CopyButton value={value} label={label} />
                    </Flex>
                )}
            </Card.Body>
        </Card.Root>
    );
};

const BankAccountCard: React.FC<BankAccount> = ({
    logo,
    bankName,
    accountType,
    accounts,
    logoBg = "gray.50",
}) => {
    return (
        <Card.Root
            flexDirection={{ base: "column", md: "row" }}
            overflow="hidden"
            p={0}
            borderRadius="2xl"
            borderColor="border.default"
            bg="surface.card"
            transition="all 0.3s"
            _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
        >
            <Flex
                align="center"
                justify="center"
                bg={logoBg}
                _dark={{ bg: "whiteAlpha.900" }}
                p={6}
                minW={{ md: "220px" }}
                maxW={{ md: "240px" }}
                borderRightWidth={{ md: "1px" }}
                borderBottomWidth={{ base: "1px", md: "0" }}
                borderColor="border.default"
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

            <Card.Body p={{ base: 5, md: 6 }} flex="1">
                <Stack gap={4}>
                    <Box>
                        <Text
                            fontSize="sm"
                            fontWeight="700"
                            color="text.accent"
                            textTransform="uppercase"
                            letterSpacing="wide"
                            mb={1}
                        >
                            {bankName}
                        </Text>
                        <Heading
                            size="md"
                            fontWeight="600"
                            color="text.heading"
                            lineHeight="1.3"
                        >
                            {accountType}
                        </Heading>
                    </Box>

                    <Stack gap={3}>
                        {accounts.map((acc, idx) => (
                            <React.Fragment key={idx}>
                                {idx > 0 && (
                                    <Box
                                        borderBottomWidth="1px"
                                        borderColor="border.default"
                                    />
                                )}
                                <Flex
                                    justify="space-between"
                                    align="flex-start"
                                    gap={3}
                                >
                                    <Box flex="1">
                                        <Text
                                            fontSize="xs"
                                            color="text.muted"
                                            fontWeight="600"
                                            textTransform="uppercase"
                                            letterSpacing="wide"
                                        >
                                            {acc.label}
                                        </Text>
                                        <Text
                                            fontSize="md"
                                            fontWeight="600"
                                            color="text.heading"
                                            mt={0.5}
                                        >
                                            {acc.value}
                                        </Text>
                                        {acc.note && (
                                            <Text
                                                fontSize="xs"
                                                color="orange.500"
                                                fontStyle="italic"
                                                mt={1}
                                            >
                                                {acc.note}
                                            </Text>
                                        )}
                                    </Box>
                                    <CopyButton
                                        value={acc.value}
                                        label={acc.label}
                                    />
                                </Flex>
                            </React.Fragment>
                        ))}
                    </Stack>
                </Stack>
            </Card.Body>
        </Card.Root>
    );
};

const BankAccountsView: React.FC = () => {
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    const fiscalData: InfoItemProps[] = [
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
