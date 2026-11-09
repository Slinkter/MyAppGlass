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
import { useScrollReveal } from "@/shared/hooks/ui/useScrollReveal";

interface ItemGridItemProps {
    children: React.ReactNode;
    index?: number;
    delay?: number;
}

const ItemGridItem: React.FC<ItemGridItemProps> = ({ children, index, delay }) => {
    const { ref, isVisible, isArmed } = useScrollReveal<HTMLDivElement>();
    const staggerMs = delay !== undefined ? Math.round(delay * 1000) : ((index ?? 0) % 3) * 70;

    return (
        <Box
            ref={ref}
            w="full"
            h="full"
            opacity={isArmed && !isVisible ? 0 : 1}
            transform={isArmed && !isVisible ? "translateY(20px)" : "translateY(0)"}
            transition={`opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1) ${staggerMs}ms, transform 0.55s cubic-bezier(0.22, 1, 0.36, 1) ${staggerMs}ms`}
            _motionReduce={{ transition: "none", transform: "none", opacity: 1 }}
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
    const { ref: headerRef, isVisible: headerVisible, isArmed: headerArmed } = useScrollReveal<HTMLDivElement>();

    return (
        <Container
            maxW="7xl"
            px={{ base: 4, sm: 6, md: 8 }}
            pt={{ base: "6", md: "10" }}
            pb={{ base: "12", md: "16" }}
            {...containerProps}
        >
            <VStack
                ref={headerRef}
                gap={{ base: "3", md: "5" }}
                textAlign="center"
                w="full"
                mb={{ base: "8", md: "12" }}
                opacity={headerArmed && !headerVisible ? 0 : 1}
                transform={headerArmed && !headerVisible ? "translateY(16px)" : "translateY(0)"}
                transition="opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1), transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)"
                _motionReduce={{ transition: "none", transform: "none", opacity: 1 }}
            >
                <Heading
                    as={headingAs}
                    fontFamily="heading"
                    fontWeight="700"
                    letterSpacing="-0.02em"
                    color="text.heading"
                    fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
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
