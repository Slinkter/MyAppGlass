import React, { useState } from "react";
import {
    AspectRatio,
    Box,
    Button,
    Container,
    Flex,
    useColorModeValue,
    Spinner,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import Franja from "@/components/common/Franja";
import { Icon } from "@chakra-ui/react";
import { FaMapLocationDot } from "react-icons/fa6";

/**
 * Componente StoreSection
 * Muestra la sección de la ubicación de la tienda con un mapa interactivo y un enlace a Google Maps.
 * @component
 * @returns {JSX.Element}
 */
const StoreSection = React.memo(() => {
    const [isMapLoaded, setIsMapLoaded] = useState(false);

    const buttonBg = useColorModeValue(
        "rgba(255, 255, 255, 0.4)",
        "rgba(0, 0, 0, 0.4)"
    );
    const buttonHoverBg = useColorModeValue(
        "rgba(255, 255, 255, 0.6)",
        "rgba(0, 0, 0, 0.6)"
    );
    const buttonActiveBg = useColorModeValue(
        "rgba(255, 255, 255, 0.8)",
        "rgba(0, 0, 0, 0.8)"
    );
    const textColor = useColorModeValue("gray.800", "white");
    const spinnerColor = useColorModeValue("primary.500", "primary.300");
    const spinnerBg = useColorModeValue("gray.100", "gray.800");

    return (
        <Box
            height={{ base: "auto", md: "auto" }}
            display="flex"
            flexDirection="column"
        >
            <Franja
                title="TIENDA "
                text="Av. Los Fresnos MZ. H LT. 1250 - La Molina - Lima"
                minHeight="20vh"
            />
            <Container maxW={"7xl"} mt={12} mb={12} px={{ base: 4, md: 8 }}>
                <Flex
                    alignItems="center"
                    justifyContent="center"
                    minHeight={{ base: "auto", md: "auto" }}
                    flexDir="column"
                    textAlign={"center"}
                >
                    <Box
                        position="relative"
                        width={{ base: "full", md: "full" }}
                        rounded="2xl"
                        overflow="hidden"
                        boxShadow="xl"
                        bg={spinnerBg}
                    >
                        <AspectRatio
                            ratio={16 / 9}
                            width="full"
                            height={{ base: "auto", md: "600px" }}
                        >
                            <>
                                {!isMapLoaded && (
                                    <Flex
                                        position="absolute"
                                        top="0"
                                        left="0"
                                        right="0"
                                        bottom="0"
                                        align="center"
                                        justify="center"
                                        zIndex={1}
                                    >
                                        <Spinner
                                            size="xl"
                                            color={spinnerColor}
                                            thickness="4px"
                                            emptyColor="gray.200"
                                        />
                                    </Flex>
                                )}
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7802.259991971398!2d-76.94203500000003!3d-12.103251999999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c714bd26b5ab%3A0xc27e03d844952799!2sGlass%20%26%20Aluminum%20Company!5e0!3m2!1sen!2spe!4v1704232992639!5m2!1sen!2spe"
                                    allowFullScreen
                                    loading="lazy"
                                    onLoad={() => setIsMapLoaded(true)}
                                    style={{
                                        opacity: isMapLoaded ? 1 : 0,
                                        transition: "opacity 0.6s ease-in-out",
                                        border: 0,
                                    }}
                                />
                            </>
                        </AspectRatio>
                    </Box>
                    <Link
                        href="https://maps.app.goo.gl/Nvr7jiQmJdUvQVd36"
                        isExternal
                    >
                        <Button
                            mt={{ base: 8, md: 5 }}
                            leftIcon={<Icon as={FaMapLocationDot} />}
                            bg={buttonBg}
                            color={textColor}
                            _hover={{ bg: buttonHoverBg }}
                            _active={{ bg: buttonActiveBg }}
                            type="submit"
                            colorScheme="primary"
                            width={{ base: "full", md: "lg" }}
                        >
                            Google Mapas
                        </Button>
                    </Link>
                </Flex>
            </Container>
        </Box>
    );
});

StoreSection.displayName = "StoreSection";

export default StoreSection;
