import React from "react";
import {
    useColorModeValue,
    Container,
    Heading,
    Text,
    SimpleGrid,
} from "@chakra-ui/react";
import ItemService from "./ServiceCard";
import HelmetWrapper from "@/components/HelmetWrapper";
import { services } from "@/data/services";
import DataLoader from "@/components/common/DataLoader";
import ServiceListSkeleton from "./ServiceListSkeleton";

const ServiceList = () => {
    const headingColor = useColorModeValue("primary.700", "primary.300");
    const textColor = useColorModeValue("gray.700", "gray.200");
    const borderColor = useColorModeValue("primary.500", "primary.300");
    const servicesData = services;

    return (
        <>
            <HelmetWrapper
                title="Servicios de Vidriería y Aluminio en La Molina - GYA Company"
                description="Descubre nuestros servicios de instalación y fabricación de productos de vidriería y aluminio de alta calidad en La Molina."
                canonicalUrl="https://www.gyacompany.com/servicios"
            />
            <DataLoader loadingComponent={<ServiceListSkeleton />}>
                <Container maxW={"7xl"} my={6} textAlign="center">
                    <Heading
                        as="h2"
                        color={headingColor}
                        mb={{ base: "2", md: "2" }}
                        fontSize={{ base: "4xl", md: "4xl" }}
                        mt={4}
                        textTransform={"uppercase"}
                        fontWeight={600}
                        letterSpacing={"wide"}
                        textAlign="center"
                        borderBottom={"4px"}
                        borderColor={borderColor}
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

                    <SimpleGrid
                        columns={{ base: 1, md: 2, lg: 3 }} // 1 column on base, 2 on md, 3 on lg
                        spacing={10} // Adjusted as per instruction
                    >
                        {servicesData.map((servicio) => (
                            <ItemService key={servicio.id} {...servicio} />
                        ))}
                    </SimpleGrid>
                </Container>
            </DataLoader>
        </>
    );
};

export default ServiceList;
