import { useState, useEffect } from "react";
import { Container, Heading, Text, useColorModeValue, Flex, Skeleton, SkeletonText, Box, Stack } from "@chakra-ui/react";
import listService from "../../data/services-data";
import ItemService from "./ServiceCard";
import HelmetWrapper from "../../components/HelmetWrapper";

const ServiceList = () => {
    const textColor = useColorModeValue("gray.600", "gray.100");
    const [loading, setLoading] = useState(true); // Simulate loading

    useEffect(() => {
        // In a real application, this would be set to false after data is fetched
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000); // Simulate a 1-second loading time
        return () => clearTimeout(timer);
    }, []);

    const renderSkeletons = () => {
        return Array.from({ length: 6 }).map((_, index) => (
            <Box
                key={index}
                w="375px"
                maxW={{ base: "full", md: "375px" }}
                mb={4}
                boxShadow={"md"}
                rounded="xl"
                overflow="hidden"
                p={4} // Add padding to mimic CardBody
            >
                <Skeleton height="320px" borderRadius="lg" mb="4" />
                <Stack mt="2" spacing="2">
                    <Flex justifyContent="space-between" alignItems="center">
                        <Box>
                            <SkeletonText noOfLines={1} skeletonHeight="20px" width="100px" />
                        </Box>
                        <Skeleton height="40px" width="100px" />
                    </Flex>
                </Stack>
            </Box>
        ));
    };

    return (
        <>
            <HelmetWrapper
                title="Servicios de Vidriería y Aluminio en La Molina - GYA Company"
                description="Descubre nuestros servicios de instalación y fabricación de productos de vidriería y aluminio de alta calidad en La Molina."
                canonicalUrl="https://www.gyacompany.com/servicios"
            >
            </HelmetWrapper>
            <Container maxW={"8xl"} my={6} textAlign="center">
                <Heading
                    as="h2"
                    color="primary.500"
                    mb={{ base: "2", md: "2" }}
                    fontSize={{ base: "4xl", md: "4xl" }}
                    mt={4}
                    textTransform={"uppercase"}
                    fontWeight={600}
                    letterSpacing={"wide"}
                    textAlign="center"
                    borderBottom={"4px"}
                    borderColor={"primary.500"}
                    width={"fit-content"}
                    mx={"auto"}
                >
                    SERVICIOS
                </Heading>
                <Text
                    mb={{ base: "2", md: "4" }}
                    fontSize={{ base: "2xl", md: "2xl" }}
                    color={textColor}
                    textAlign="center"
                >
                    Fabricación & Instalación
                </Text>

                <Flex
                    direction={{ base: "column", md: "row" }}
                    flexWrap={"wrap"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    mx={"auto"}
                    gap={6}
                >
                    {loading ? (
                        renderSkeletons()
                    ) : (
                        listService.map((servicio) => (
                            <ItemService key={servicio.id} {...servicio} />
                        ))
                    )}
                </Flex>
            </Container>
        </>
    );
};

export default ServiceList;
