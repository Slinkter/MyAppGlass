import React from "react";
import {
    Box,
    Heading,
    Stack,
    VStack,
    Text,
    HStack,
    Icon,
    Divider,
    Button,
    useColorModeValue,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import SidebarItem from "@/components/common/SidebarItem";
import GlassCard from "@/components/common/GlassCard";

/**
 * Panel lateral con información del servicio, navegación de sistemas y especificaciones.
 */
const ServiceSidebar = (props) => {
    const {
        seo,
        systems,
        activeIndex,
        setActiveIndex,
        activeSystem,
        features,
    } = props;

    const headingColor = useColorModeValue("gray.900", "white");
    const textColor = useColorModeValue("gray.600", "gray.400");
    const accentColor = useColorModeValue("blue.600", "blue.300");
    const borderColor = useColorModeValue("whiteAlpha.300", "whiteAlpha.100");
    const itemBg = useColorModeValue("whiteAlpha.200", "whiteAlpha.50");
    const iconBg = useColorModeValue("blue.50", "whiteAlpha.100");

    return (
        <GlassCard
            display="flex"
            flexDirection="column"
            h={{ base: "auto", lg: "85vh" }}
            overflow={{ base: "visible", lg: "hidden" }}
            w="100%"
            p={4}
        >
            <VStack
                spacing={{ base: 4, md: 5, lg: 6 }}
                align="stretch"
                flex="1"
                pr={{ base: 0, lg: 2 }}
                overflowY={{ base: "visible", lg: "auto" }}
            >
                {/* Sección: Navegación de Sistemas */}
                <Box>
                    <Heading
                        as="h3"
                        size={{ base: "sm", md: "md" }}
                        mb={{ base: 3, md: 4 }}
                        color={headingColor}
                        letterSpacing="tight"
                    >
                        {seo.title}
                    </Heading>
                    <Stack spacing={2}>
                        {systems.map((item, index) => (
                            <SidebarItem
                                key={item.label}
                                icon={item.icon}
                                label={item.label}
                                isActive={activeIndex === index}
                                onClick={() => setActiveIndex(index)}
                            />
                        ))}
                    </Stack>
                </Box>

                {/* Sección: Especificaciones Técnicas */}
                {features && features.length > 0 && (
                    <Box>
                        <Text
                            fontSize="xs"
                            fontWeight="bold"
                            textTransform="uppercase"
                            letterSpacing="wider"
                            color={textColor}
                            opacity={0.7}
                            mb={{ base: 3, md: 4 }}
                        >
                            Especificaciones Técnicas
                        </Text>
                        <Stack spacing={3}>
                            {features.map((item, index) => (
                                <HStack
                                    key={index}
                                    p={3}
                                    bg={itemBg}
                                    borderRadius="lg"
                                    border="1px solid"
                                    borderColor={borderColor}
                                    align="center"
                                    justify="space-between"
                                    spacing={4}
                                >
                                    <HStack spacing={3} align="center" flex="1">
                                        <Box
                                            p={2}
                                            bg={iconBg}
                                            color={accentColor}
                                            borderRadius="md"
                                        >
                                            <Icon as={item.icon} w={4} h={4} />
                                        </Box>
                                        <Text
                                            fontSize="sm"
                                            fontWeight="medium"
                                            color={textColor}
                                            whiteSpace="normal"
                                            wordBreak="break-word"
                                        >
                                            {item.label.split(":")[0]}
                                        </Text>
                                    </HStack>
                                    <Text
                                        fontSize="sm"
                                        fontWeight="bold"
                                        color={headingColor}
                                        textAlign="right"
                                        whiteSpace="normal"
                                        wordBreak="break-word"
                                        maxW="40%"
                                    >
                                        {item.label.split(":")[1] || "Estándar"}
                                    </Text>
                                </HStack>
                            ))}
                        </Stack>
                    </Box>
                )}

                <Divider borderColor={borderColor} />

                {/* Sección: Call to Action */}
                <Box>
                    <Button
                        as="a"
                        href={`https://wa.me/51974278303?text=Quisiera una cotización para ${
                            activeSystem?.label || seo.title
                        }`}
                        target="_blank"
                        rel="noopener noreferrer"
                        size={{ base: "md", md: "lg" }}
                        w="full"
                        bg={accentColor}
                        color="white"
                        rightIcon={<ArrowForwardIcon />}
                        _hover={{
                            bg: useColorModeValue("blue.700", "blue.400"),
                            transform: "translateY(-2px)",
                            boxShadow: "xl",
                            textDecoration: "none",
                        }}
                        _active={{
                            transform: "translateY(0)",
                        }}
                        boxShadow="lg"
                        transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                    >
                        Cotizar Ahora
                    </Button>
                    <Text
                        fontSize="xs"
                        color={textColor}
                        textAlign="center"
                        mt={2}
                        opacity={0.7}
                    >
                        Obtén una cotización personalizada en 24 horas
                    </Text>
                </Box>
            </VStack>
        </GlassCard>
    );
};

export default ServiceSidebar;
