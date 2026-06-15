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
 * --------------------------------------------------------------------
 * @description
 * Un layout reutilizable para mostrar colecciones de elementos.
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
            textAlign="center"
            mt={{ base: "8", md: "14" }}
            {...containerProps}
        >
            <VStack gap={{ base: "4", md: "6" }} w="full">
                {/* Header Section */}
                <VStack gap={{ base: "4", md: "6" }}>
                    <Heading
                        as={headingAs}
                        color="text.accent"
                        fontSize={{ base: "3xl", md: "5xl" }}
                        fontWeight="900"
                        letterSpacing="0.2em"
                        textAlign="center"
                        textTransform="uppercase"
                        position="relative"
                    >
                        {title}
                    </Heading>
                    {subtitle && (
                        <Text
                            color="text.body"
                            fontSize={{ base: "md", md: "xl" }}
                            fontWeight="500"
                            maxW="3xl"
                            mx="auto"
                            lineHeight="tall"
                        >
                            {subtitle}
                        </Text>
                    )}
                </VStack>

                <SimpleGrid
                    columns={columns}
                    gap={gap}
                    w="full"
                    justifyItems="center"
                    alignItems="start"
                    style={{
                        contain: "layout style",
                        transform: "translateZ(0)",
                        willChange: "transform, opacity",
                    }}
                >
                    {children}
                </SimpleGrid>
            </VStack>
        </Container>
    );
};

ItemGridLayout.Item = ItemGridItem;

export default ItemGridLayout;
