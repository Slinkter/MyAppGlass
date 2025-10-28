import React from "react";
import { useColorModeValue, Container, Heading, Text, Flex } from "@chakra-ui/react";
import ItemService from "./ServiceCard";
import HelmetWrapper from "@/components/HelmetWrapper";
import { useServices } from "@/hooks/useServices";
import DataLoader from "@/components/common/DataLoader";
import ServiceListSkeleton from "./ServiceListSkeleton";

const ServiceList = () => {
    const textColor = useColorModeValue("gray.600", "gray.100");
    const { services, isLoading, error } = useServices();

    return (
        <>
            <HelmetWrapper
                title="Servicios de Vidriería y Aluminio en La Molina - GYA Company"
                description="Descubre nuestros servicios de instalación y fabricación de productos de vidriería y aluminio de alta calidad en La Molina."
                canonicalUrl="https://www.gyacompany.com/servicios"
            />
            <DataLoader
                isLoading={isLoading}
                error={error}
                loadingComponent={<ServiceListSkeleton />}
            >
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
                        {services.map((servicio) => (
                            <ItemService key={servicio.id} {...servicio} />
                        ))}
                    </Flex>
                </Container>
            </DataLoader>
        </>
    );
};

export default ServiceList;
