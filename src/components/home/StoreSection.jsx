import React from "react";
import { AspectRatio, Box, Button, Container, Flex } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import Franja from "../common/Franja";
import { Icon } from "@chakra-ui/react";
import { FaMapLocationDot } from "react-icons/fa6";

/**
 * Componente StoreSection
 * Muestra la sección de la ubicación de la tienda con un mapa interactivo y un enlace a Google Maps.
 * @component
 * @returns {JSX.Element}
 */
const StoreSection = React.memo(() => {
    return (
        <Box
            height={{ base: "auto", md: "100vh" }}
            display="flex"
            flexDirection="column"
        >
            <Franja
                title="TIENDA "
                text="Av. Los Fresnos MZ. H LT. 1250 - La Molina - Lima"
                minHeight="20vh"
            />
            <Container maxW="8xl" mt={6} mb={6}>
                <Flex
                    alignItems="center"
                    justifyContent="center"
                    minHeight={{ base: "auto", md: "80vh" }}
                    flexDir="column"
                >
                    <AspectRatio
                        ratio={16 / 9}
                        width={{ base: "full", md: "full" }}
                        height={{ base: "300px", md: "600px" }}
                    >
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7802.259991971398!2d-76.94203500000003!3d-12.103251999999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c714bd26b5ab%3A0xc27e03d844952799!2sGlass%20%26%20Aluminum%20Company!5e0!3m2!1sen!2spe!4v1704232992639!5m2!1sen!2spe"
                            allowFullScreen
                        />
                    </AspectRatio>
                    <Link href="https://maps.app.goo.gl/Nvr7jiQmJdUvQVd36">
                        <Button
                            w={{ base: "full", md: "50" }} // Standardized width to Chakra token
                            size="lg"
                            mt={{ base: 8, md: 5 }} // Standardized mt to Chakra tokens
                            leftIcon={<Icon as={FaMapLocationDot} />}
                            colorScheme="green"
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
