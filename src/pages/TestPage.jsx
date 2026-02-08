import React from "react";
import {
    Box,
    Flex,
    HStack,
    Image,
    Text,
    VStack,
    useColorModeValue,
} from "@chakra-ui/react";
import logoGlass from "@/assets/branding/LogoCompanytrans.png";

const TestView = () => {
    const bgColor = useColorModeValue(
        "rgba(255, 255, 255, 0.25)",
        "rgba(0, 0, 0, 0.25)"
    );
    const borderColor = useColorModeValue(
        "rgba(255, 255, 255, 0.35)",
        "rgba(255, 255, 255, 0.15)"
    );
    const textColor = useColorModeValue("gray.800", "gray.100");
    const secondaryTextColor = useColorModeValue("gray.700", "gray.200");
    const accentColor = useColorModeValue("primary.600", "primary.300");

    return (
        <Flex justify="center" align="center" p={4}>
            <HStack
                p={2}
                spacing={6}
                // Glassmorphism effects
                bg={bgColor}
                backdropFilter="blur(20px)"
                border="1px solid"
                borderColor={borderColor}
                boxShadow="0 4px 30px rgba(0,0,0,0.1)"
                borderRadius="2xl"
                color={textColor}
                transition="all 0.3s ease"
            >
                {/* Logo */}
                <Image
                    src={logoGlass}
                    alt="gyacompany"
                    boxSize="140px"
                    objectFit="contain"
                    loading="lazy"
                    decoding="async"
                />

                {/* Divider */}
                <Box
                    alignSelf="stretch"
                    borderLeft="4px solid"
                    borderColor={accentColor}
                    rounded="full"
                />

                {/* Info */}
                <VStack align="flex-start" spacing={0}>
                    <Text color={accentColor} fontWeight="bold" fontSize="lg">
                        GLASS & ALUMINUM COMPANY S.A.C.
                    </Text>
                    <Text
                        fontSize="xl"
                        color={secondaryTextColor}
                        fontWeight="semibold"
                    >
                        Juan Carlos Cueva Carrasco
                    </Text>
                    <Text color={accentColor} fontWeight="medium">
                        Gerente General
                    </Text>
                    <Text fontSize="sm" color={accentColor}>
                        996-537-435
                    </Text>
                </VStack>
            </HStack>
        </Flex>
    );
};

export default TestView;
