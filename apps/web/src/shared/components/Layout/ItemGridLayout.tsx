"use client";

import React, { createContext, useContext } from "react";
import {
    Container,
    Heading,
    Text,
    SimpleGrid,
    VStack,
    Box,
    ContainerProps,
    type BoxProps,
} from "@chakra-ui/react";
import { useScrollReveal } from "@/shared/hooks/ui/useScrollReveal";
import { useMotionBudget } from "@/shared/hooks/ui/useMotionBudget";
import { EASE_CINE } from "@/shared/constants/motion";

/** `cine` activa el movimiento cinematográfico (solo en la home por ahora); `default` no cambia nada. */
export type GridMotion = "default" | "cine";

/** Indica a los ítems si el grid usa movimiento cinematográfico (ya filtrado por useMotionBudget). */
const CineContext = createContext(false);

interface ItemGridItemProps {
    children: React.ReactNode;
    index?: number;
    delay?: number;
}

const ItemGridItem: React.FC<ItemGridItemProps> = ({ children, index, delay }) => {
    const { ref, isVisible, isArmed } = useScrollReveal<HTMLDivElement>();
    const cine = useContext(CineContext);
    const rawStagger = delay !== undefined ? Math.round(delay * 1000) : ((index ?? 0) % 3) * 70;
    // Cine: cascada más amplia pero acotada (máximo 5 pasos de 90 ms) para no alargar la espera.
    const staggerMs = cine ? Math.min(rawStagger, 450) : rawStagger;
    const hidden = isArmed && !isVisible;

    return (
        <Box
            ref={ref}
            w="full"
            h="full"
            opacity={hidden ? 0 : 1}
            transform={hidden ? (cine ? "translateY(36px) scale(0.97)" : "translateY(20px)") : "translateY(0) scale(1)"}
            transition={
                cine
                    ? `opacity 1s ${EASE_CINE} ${staggerMs}ms, transform 1s ${EASE_CINE} ${staggerMs}ms`
                    : `opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1) ${staggerMs}ms, transform 0.55s cubic-bezier(0.22, 1, 0.36, 1) ${staggerMs}ms`
            }
            _motionReduce={{ transition: "none", transform: "none", opacity: 1 }}
        >
            {children}
        </Box>
    );
};

interface ItemGridLayoutProps {
    /** Opcional: sin título no se muestra cabecera (solo la cuadrícula). */
    title?: string;
    subtitle?: string;
    /** Margen bajo la cabecera (por defecto 8 móvil / 12 escritorio). Opcional: otras secciones no cambian. */
    headerMb?: BoxProps["mb"];
    children: React.ReactNode;
    seoTitle?: string;
    seoDescription?: string;
    seoCanonicalUrl?: string;
    columns?: number | Record<string, number>;
    gap?: string | number | Record<string, string | number>;
    containerProps?: ContainerProps;
    headingAs?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    /** Movimiento de entrada. Por defecto el de siempre; `cine` es el cinematográfico de la home. */
    motion?: GridMotion;
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
    headerMb = { base: "8", md: "12" },
    children,
    columns = { base: 1, md: 2, lg: 3 },
    gap = { base: "6", md: "8" },
    containerProps = {},
    headingAs = "h2",
    motion = "default",
}) => {
    const { ref: headerRef, isVisible: headerVisible, isArmed: headerArmed } = useScrollReveal<HTMLDivElement>();
    const level = useMotionBudget();
    // Cine solo en dispositivos que lo soportan; en gama baja o con reducción de movimiento se usa el modo normal.
    const cine = motion === "cine" && level === "full";
    const headerHidden = headerArmed && !headerVisible;

    return (
        <Container
            maxW="pageWide"
            px={{ base: 4, sm: 6, md: 8 }}
            pt={{ base: "6", md: "10" }}
            pb={{ base: "12", md: "16" }}
            {...containerProps}
        >
            {title && (
            <VStack
                ref={headerRef}
                gap={{ base: "3", md: "5" }}
                textAlign="center"
                w="full"
                mb={headerMb}
                opacity={cine || !headerHidden ? 1 : 0}
                transform={cine || !headerHidden ? "translateY(0)" : "translateY(16px)"}
                transition={cine ? undefined : "opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1), transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)"}
                _motionReduce={{ transition: "none", transform: "none", opacity: 1 }}
            >
                {/* En modo cine el título sube desde detrás de una máscara; en modo normal no hay envoltorio extra */}
                <Box overflow={cine ? "hidden" : undefined} py={cine ? "0.5" : undefined}>
                    <Heading
                        as={headingAs}
                        fontFamily="heading"
                        fontWeight="700"
                        letterSpacing="-0.02em"
                        color="text.heading"
                        fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
                        lineHeight="1.1"
                        style={
                            cine
                                ? {
                                      transform: headerHidden ? "translateY(105%)" : "translateY(0)",
                                      transition: `transform 1.1s ${EASE_CINE}`,
                                  }
                                : undefined
                        }
                    >
                        {title}
                    </Heading>
                </Box>

                {cine && (
                    <Box
                        h="1px"
                        w={{ base: "12", md: "16" }}
                        bg="text.heading"
                        aria-hidden="true"
                        style={{
                            transformOrigin: "center",
                            transform: headerHidden ? "scaleX(0)" : "scaleX(1)",
                            transition: `transform 1s ${EASE_CINE} 350ms`,
                        }}
                    />
                )}

                {subtitle && (
                    <Text
                        fontSize={{ base: "sm", md: "lg" }}
                        color="text.muted"
                        maxW="2xl"
                        fontWeight="500"
                        lineHeight="relaxed"
                        style={
                            cine
                                ? {
                                      opacity: headerHidden ? 0 : 1,
                                      transform: headerHidden ? "translateY(16px)" : "translateY(0)",
                                      transition: `opacity 0.9s ${EASE_CINE} 450ms, transform 0.9s ${EASE_CINE} 450ms`,
                                  }
                                : undefined
                        }
                    >
                        {subtitle}
                    </Text>
                )}
            </VStack>
            )}

            <CineContext.Provider value={cine}>
                <SimpleGrid
                    columns={columns}
                    gap={gap}
                    w="full"
                    alignItems="stretch"
                >
                    {children}
                </SimpleGrid>
            </CineContext.Provider>
        </Container>
    );
};

ItemGridLayout.Item = ItemGridItem;

export default ItemGridLayout;
