import React from "react";
import { Box, Flex, HStack, Image, Text, VStack } from "@chakra-ui/react";
import logoGlass from "../assets/branding/LogoCompanytrans.png";

const TestView = () => {
    return (
        <Flex justify="center" align="center" p={4}>
            <HStack
                p={2}
                spacing={6}
                borderWidth="1px"
                rounded="xl" // Standardized borderRadius to rounded
                boxShadow="lg"
                bgColor="white"
                color="gray.600"
            >
                {/* Logo */}
                <Image
                    src={logoGlass}
                    alt="gyacompany"
                    boxSize="140px"
                    objectFit="contain"
                />

                {/* Divider */}
                <Box
                    alignSelf="stretch"
                    borderLeft="4px solid"
                    borderColor="red.400"
                    rounded="full" // Standardized borderRadius to rounded
                />

                {/* Info */}
                <VStack align="flex-start" spacing={0}>
                    <Text color="red.400" fontWeight="bold" fontSize="lg">
                        GLASS & ALUMINUM COMPANY S.A.C.
                    </Text>
                    <Text fontSize="xl" color="gray.800" fontWeight="semibold">
                        Juan Carlos Cueva Carrasco
                    </Text>
                    <Text color="red.400" fontWeight="medium">
                        Gerente General
                    </Text>
                    <Text fontSize="sm" color="red.400">
                        996-537-435
                    </Text>
                </VStack>
            </HStack>
        </Flex>
    );
};

export default TestView;