import React from "react";
import { HStack, Text } from "@chakra-ui/react";

/**
 * @component SpecItem
 * @description Muestra una especificación técnica individual (Clave: Valor) con icono.
 */
const SpecItem = ({ label, value }) => {
    return (
        <HStack
            w="full"
            p={3}
            bg="surface.container"
            rounded="xl"
            borderWidth="1px"
            borderColor="border.default"
            justify="space-between"
            align="center"
            spacing={4}
            transition="all 0.2s"
            _hover={{
                borderColor: "text.accent",
                transform: "translateY(-1px)",
                shadow: "sm",
            }}
        >
            <HStack spacing={3} overflow="hidden">
                <Text
                    fontSize="xs"
                    fontWeight="semibold"
                    textTransform="uppercase"
                    letterSpacing="wider"
                    color="text.muted"
                    noOfLines={2}
                >
                    {label}
                </Text>
            </HStack>

            <Text
                fontSize="sm"
                fontWeight="bold"
                color="text.body"
                textAlign="right"
                noOfLines={2}
                maxW="50%"
            >
                {value}
            </Text>
        </HStack>
    );
};

export default SpecItem;
