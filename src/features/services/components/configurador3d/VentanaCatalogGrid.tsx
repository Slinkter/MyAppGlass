"use client";

import React from "react";
import {
    Box,
    Flex,
    Text,
    SimpleGrid,
    Badge,
    VStack,
} from "@chakra-ui/react";
import { Wrench, Box as BoxIcon } from "lucide-react";
import { WINDOW_CATALOG, WindowCatalogItem } from "./constants";

interface VentanaCatalogGridProps {
    onSelectType: (typeId: string) => void;
}

export const VentanaCatalogGrid: React.FC<VentanaCatalogGridProps> = React.memo(({ onSelectType }) => {
    return (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="6" w="full">
            {WINDOW_CATALOG.map((item: WindowCatalogItem) => {
                const IconComponent = item.icon;
                return (
                    <Box
                        key={item.id}
                        as="article"
                        role="group"
                        bg="surface.card"
                        borderRadius="2xl"
                        borderWidth="1px"
                        borderColor="border.default"
                        boxShadow="xs"
                        cursor="pointer"
                        position="relative"
                        overflow="hidden"
                        display="flex"
                        flexDirection="column"
                        transition="all 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
                        _hover={{
                            transform: "translateY(-4px)",
                            boxShadow: "lg",
                            borderColor: "primary.500",
                        }}
                        onClick={() => onSelectType(item.id)}
                    >
                        <Flex p="6" direction="column" flex="1">
                            {/* Cabecera: Icono + Badge */}
                            <Flex justify="space-between" align="center" mb="4">
                                <Flex
                                    w="10"
                                    h="10"
                                    borderRadius="xl"
                                    bg="bg.subtle"
                                    borderWidth="1px"
                                    borderColor="border.default"
                                    align="center"
                                    justify="center"
                                    color="primary.500"
                                    transition="transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
                                    _groupHover={{ transform: "scale(1.1)" }}
                                >
                                    <IconComponent size={20} strokeWidth={2} />
                                </Flex>
                                <Badge
                                    colorPalette={item.colorPalette}
                                    variant="subtle"
                                    borderRadius="full"
                                    px="2.5"
                                    py="0.5"
                                    fontSize="xs"
                                    fontWeight="bold"
                                >
                                    {item.badge}
                                </Badge>
                            </Flex>

                            {/* Título y Descripción */}
                            <Text
                                fontSize="lg"
                                fontWeight="bold"
                                color="text.heading"
                                mb="1.5"
                                letterSpacing="tight"
                            >
                                {item.title}
                            </Text>
                            <Text
                                fontSize="xs"
                                color="text.muted"
                                mb="4"
                                lineHeight="relaxed"
                                minH="36px"
                            >
                                {item.description}
                            </Text>

                            {/* Mecánica & Bullets */}
                            <Box
                                mt="auto"
                                pt="3"
                                borderTopWidth="1px"
                                borderColor="border.subtle"
                            >
                                <Flex
                                    align="center"
                                    gap="2"
                                    fontSize="xs"
                                    fontWeight="semibold"
                                    color="text.body"
                                    mb="2.5"
                                >
                                    <Wrench size={13} className="text-primary-500" />
                                    <Text fontSize="11px">{item.mechanics}</Text>
                                </Flex>
                                <VStack align="start" gap="1.5">
                                    {item.bullets.map((bullet, i) => (
                                        <Flex key={i} align="flex-start" gap="2">
                                            <Box
                                                w="1.5"
                                                h="1.5"
                                                borderRadius="full"
                                                bg="primary.500"
                                                mt="1.5"
                                                flexShrink={0}
                                            />
                                            <Text
                                                fontSize="11px"
                                                color="text.muted"
                                                lineHeight="short"
                                            >
                                                {bullet}
                                            </Text>
                                        </Flex>
                                    ))}
                                </VStack>
                            </Box>
                        </Flex>

                        {/* Footer de acción */}
                        <Flex
                            px="6"
                            py="3.5"
                            bg="bg.subtle"
                            borderTopWidth="1px"
                            borderColor="border.subtle"
                            justify="space-between"
                            align="center"
                            transition="all 0.2s ease"
                            _groupHover={{ bg: "primary.50", _dark: { bg: "primary.900/30" } }}
                        >
                            <Text
                                fontSize="xs"
                                fontWeight="bold"
                                color="text.body"
                                _groupHover={{ color: "primary.500" }}
                            >
                                Diseñar y Cotizar en 3D
                            </Text>
                            <BoxIcon size={15} />
                        </Flex>
                    </Box>
                );
            })}
        </SimpleGrid>
    );
});

VentanaCatalogGrid.displayName = "VentanaCatalogGrid";
