import { useEffect } from "react";
import {
    useColorModeValue,
    Container,
    Heading,
    Text,
    Flex,
    Skeleton,
    SkeletonText,
    Box,
    Stack,
} from "@chakra-ui/react";
import ItemService from "./ServiceCard";
import HelmetWrapper from "../../components/HelmetWrapper";
import { useSelector, useDispatch } from "react-redux";
import { fetchServices } from "../../features/services/servicesSlice";

const ServiceList = () => {
    const textColor = useColorModeValue("gray.600", "gray.100");
    const dispatch = useDispatch();
    const services = useSelector((state) => state.services.items);
    const serviceStatus = useSelector((state) => state.services.status);
    const error = useSelector((state) => state.services.error);

    useEffect(() => {
        if (serviceStatus === "idle") {
            dispatch(fetchServices());
        }
    }, [serviceStatus, dispatch]);

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
                            <SkeletonText
                                noOfLines={1}
                                skeletonHeight="20px"
                                width="100px"
                            />
                        </Box>
                        <Skeleton height="40px" width="100px" />
                    </Flex>
                </Stack>
            </Box>
        ));
    };

    if (serviceStatus === "loading") {
        return (
            <Container maxW={"8xl"} my={6} textAlign="center">
                <Flex
                    direction={{ base: "column", md: "row" }}
                    flexWrap={"wrap"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    mx={"auto"}
                    gap={6}
                >
                    {renderSkeletons()}
                </Flex>
            </Container>
        );
    }

    if (serviceStatus === "failed") {
        return <Text>Error: {error}</Text>;
    }

    return (
        <>
            <HelmetWrapper
                title="Servicios de Vidriería y Aluminio en La Molina - GYA Company"
                description="Descubre nuestros servicios de instalación y fabricación de productos de vidriería y aluminio de alta calidad en La Molina."
                canonicalUrl="https://www.gyacompany.com/servicios"
            ></HelmetWrapper>
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
        </>
    );
};

export default ServiceList;
