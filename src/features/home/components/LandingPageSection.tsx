"use client";

import React from "react";
import {
    Box,
    Button,
    Flex,
    Heading,
    HStack,
    Image,
    Text,
    VStack,
} from "@chakra-ui/react";
import Link from "next/link";

// @ts-ignore
import logoGYA from "@/assets/branding/LogoCompanytrans.png";

const LandingPageSection = React.memo(() => {
    return (
        <Flex
            w="full"
            minH="100dvh"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            px={2}
            position="relative"
        >
            <VStack
                gap="phi_md"
                textAlign="center"
                maxW="5xl"
            >
                <Image
                    src={logoGYA?.src || (logoGYA as unknown as string)}
                    alt="Glass & Aluminum Company Logo"
                    w={{ base: "55%", sm: "50%", md: "40%", lg: "36%" }}
                    maxW="400px"
                    h="auto"
                    loading="eager"
                    // @ts-ignore
                    fetchpriority="high"
                />

                <Box mt="phi_md">
                    <Heading
                        as="h2"
                        fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
                        fontWeight="bold"
                        letterSpacing="widest"
                        color="text.accent"
                        textTransform="uppercase"
                        mb="phi_xs"
                    >
                        Vidriería &amp; Aluminio
                    </Heading>

                    <Heading
                        as="h1"
                        fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
                        fontWeight="extrabold"
                        lineHeight="1.1"
                        color="text.body"
                    >
                        GLASS &amp; ALUMINUM <br />
                        COMPANY S.A.C.
                    </Heading>

                    <Text
                        fontSize={{ base: "md", md: "xl" }}
                        mt="phi_lg"
                        color="text.muted"
                        fontWeight="medium"
                        maxW="3xl"
                        mx="auto"
                    >
                        Empresa Comercial especializada en la instalación de
                        cristales y aluminios.
                    </Text>

                    <HStack gap="phi_md" mt="phi_xl" justify="center" w="full" px={4} flexWrap="wrap">
                        <Button asChild variant="solid" colorPalette="primary" size="lg">
                            <Link href="/servicios">
                                Ver Servicios
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg">
                            <Link href="/proyectos">
                                Nuestros Proyectos
                            </Link>
                        </Button>
                    </HStack>
                </Box>
            </VStack>
        </Flex>
    );
});

LandingPageSection.displayName = "LandingPageSection";

export default LandingPageSection;
