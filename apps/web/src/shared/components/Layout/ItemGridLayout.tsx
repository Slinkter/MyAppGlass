"use client";

import React from "react";
import {
    Container,
    Heading,
    Text,
    SimpleGrid,
    VStack,
    Box,
    ContainerProps,
} from "@chakra-ui/react";

interface ItemGridItemProps {
    children: React.ReactNode;
    delay?: number;
}

const ItemGridItem: React.FC<ItemGridItemProps> = ({ children, delay }) => {
    return (
        <Box
            w="full"
            h="full"
            animation={delay !== undefined ? `slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s both` : "none"}
            css={{
                '@media (prefers-reduced-motion: reduce)': {
                    animation: 'none !important',
                    transition: 'none !important',
                }
            }}
        >
            {children}
        </Box>
    );
};

interface ItemGridLayoutProps {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    seoTitle?: string;
    seoDescription?: string;
    seoCanonicalUrl?: string;
    columns?: number | Record<string, number>;
    gap?: string | number | Record<string, string | number>;
    containerProps?: ContainerProps;
    headingAs?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

/**
 * Componente: ItemGridLayout
 * @description Layout universal para listas de productos y servicios con reglas estéticas de alta gama.
 */
const ItemGridLayout: React.FC<ItemGridLayoutProps> & {
    Item: typeof ItemGridItem;
} = ({
    title,
    subtitle,
    children,
    columns = { base: 1, md: 2, lg: 3 },
    gap = { base: "6", md: "8" },
    containerProps = {},
    headingAs = "h2",
}) => {
    return (
        <Container
            maxW="7xl"
            px={{ base: 4, sm: 6, md: 8 }}
            pt={{ base: "6", md: "10" }}
            pb={{ base: "12", md: "16" }}
            {...containerProps}
        >
            <VStack gap={{ base: "3", md: "5" }} textAlign="center" w="full" mb={{ base: "8", md: "12" }}>
                <Heading
                    as={headingAs}
                    fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
                    fontWeight="900"
                    letterSpacing="tight"
                    color="text.body"
                    lineHeight="1.1"
                >
                    {title}
                </Heading>

                {subtitle && (
                    <Text
                        fontSize={{ base: "sm", md: "lg" }}
                        color="text.muted"
                        maxW="2xl"
                        fontWeight="500"
                        lineHeight="relaxed"
                    >
                        {subtitle}
                    </Text>
                )}
            </VStack>

            <SimpleGrid
                columns={columns}
                gap={gap}
                w="full"
                alignItems="stretch"
            >
                {children}
            </SimpleGrid>
        </Container>
    );
};

ItemGridLayout.Item = ItemGridItem;

export default ItemGridLayout;
