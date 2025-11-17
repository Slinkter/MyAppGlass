import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
    Box, // Changed from Card
    Heading,
    Button,
    Flex,
    Stack,
    useColorModeValue,
} from "@chakra-ui/react";
import FadingImage from "@/components/common/FadingImage";

function ServiceCard(props) {
    const { image, name, plink } = props;
    const navigate = useNavigate();

    const bgColor = useColorModeValue("rgba(255, 255, 255, 0.1)", "rgba(0, 0, 0, 0.1)"); // More subtle background
    const textColor = useColorModeValue("gray.800", "gray.100");
    const buttonBg = useColorModeValue("rgba(255, 255, 255, 0.4)", "rgba(0, 0, 0, 0.4)");
    const buttonHoverBg = useColorModeValue("rgba(255, 255, 255, 0.6)", "rgba(0, 0, 0, 0.6)");

    return (
        <Box // Changed from Card
            maxW={{ base: "full", md: "sm" }}
            maxH={{ base: "452px", md: "512px" }}
            mb={4}
            overflow="hidden"
            // Glassmorphism effects (GlassSection rules)
            bg={bgColor}
            backdropFilter="blur(10px)" // Suave blur
            border="none" // SIN borde
            boxShadow="sm" // Subtle shadow
            borderRadius="2xl"
            color={textColor}
            transition="all 0.3s ease"
            _hover={{
                boxShadow: "md", // More pronounced shadow on hover
                transform: "scale(1.02)",
            }}
        >
            <Box textAlign="center" p={4}> {/* Replaced CardBody with Box and added padding */}
                <FadingImage
                    w="full"
                    h={{ base: "320px", md: "385px" }}
                    src={image}
                    alt={`Servicio de ${name}`}
                    rounded="lg"
                    objectFit="cover"
                    boxShadow="base"
                />
                <Stack mt={2} spacing={2}>
                    <Flex justifyContent="space-between" alignItems="center">
                        <Box>
                            <Heading
                                as="h3"
                                size="md"
                                fontWeight="600"
                                textTransform="uppercase"
                            >
                                {name}
                            </Heading>
                        </Box>
                        <Button
                            rightIcon={<ArrowForwardIcon />}
                            onClick={() => navigate(plink)}
                            aria-label={`Ver catálogo de ${name}`}
                            bg={buttonBg}
                            color={textColor}
                            _hover={{ bg: buttonHoverBg }}
                        >
                            Catálogo
                        </Button>
                    </Flex>
                </Stack>
            </Box>
        </Box>
    );
}

export default ServiceCard;
