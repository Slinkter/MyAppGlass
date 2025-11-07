import React from "react";
import {
    Box,
    Flex,
    HStack,
    Text,
    VStack,
    useColorModeValue,
    Icon,
    Heading,
} from "@chakra-ui/react";
import { FaWhatsapp, FaCalendar, FaClock, FaMap } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import { IoBookOutline } from "react-icons/io5";

const Footer = () => {
    const bgColor = useColorModeValue("gray.200", "gray.800");

    return (
        <>
            <Box my={8}>
                {" "}
                {/* Changed from "2rem" to token 8 */}
                <Box bg={bgColor} mx="auto" pt={8} pb={4} boxShadow="md">
                    <Flex
                        justifyContent="space-around"
                        direction={{ base: "column", md: "row" }}
                    >
                        <VStack spacing={2} mb={4}>
                            {" "}
                            {/* Changed marginBottom to mb */}
                            <Heading
                                as="h3" // Changed to h3 as these are sub-sections of the page
                                fontSize={{ base: "xl", md: "2xl" }} // Adjusted font size
                                fontWeight="semibold" // Adjusted font weight
                                mb={2} // Adjusted margin bottom
                            >
                                CONTACTO
                            </Heading>
                            <HStack spacing={2} alignItems="center">
                                <Icon as={FaWhatsapp} />
                                <Text fontSize="md">974-278-303</Text>{" "}
                                {/* Changed to md token */}
                            </HStack>
                            <HStack spacing={2} alignItems="center">
                                <Icon as={FaWhatsapp} />
                                <Text fontSize="md">996-537-435</Text>{" "}
                                {/* Changed to md token */}
                            </HStack>
                        </VStack>
                        <VStack spacing={2} mb={4}>
                            {" "}
                            {/* Changed marginBottom to mb */}
                            <Heading
                                as="h3" // Changed to h3
                                fontSize={{ base: "xl", md: "2xl" }} // Adjusted font size
                                fontWeight="semibold" // Adjusted font weight
                                mb={2} // Adjusted margin bottom
                            >
                                HORARIOS
                            </Heading>
                            <HStack spacing={2} alignItems="center">
                                <Icon as={FaCalendar} />
                                <Text fontSize="md">Lunes a Sábado</Text>
                            </HStack>
                            <HStack spacing={2} alignItems="center">
                                <Icon as={FaClock} />
                                <Text fontSize="md">9:00 am - 5:00 pm</Text>
                            </HStack>
                        </VStack>
                        <VStack spacing={2} mb={4}>
                            {" "}
                            {/* Changed marginBottom to mb */}
                            <Heading
                                as="h3" // Changed to h3
                                fontSize={{ base: "xl", md: "2xl" }} // Adjusted font size
                                fontWeight="semibold" // Adjusted font weight
                                mb={2} // Adjusted margin bottom
                            >
                                DIRECCIÓN
                            </Heading>
                            <HStack
                                spacing={2}
                                alignItems="center"
                                justifyContent={"center"}
                            >
                                <Icon as={FaMap} />
                                <Text fontSize="md">
                                    Av. Los Fresnos MZ. H LT. 1250
                                </Text>
                            </HStack>
                            <HStack
                                spacing={2}
                                alignItems="center"
                                justifyContent={"center"}
                            >
                                <Icon as={MdEmail} />
                                <Text fontSize="md">acueva@gyacompany.com</Text>
                            </HStack>
                        </VStack>
                    </Flex>
                </Box>
            </Box>
            <VStack spacing={4} m={5}>
                {" "}
                {/* Changed from "20px" to token 5 */}
                <Text> Copyright ©2025</Text>
                <Link
                    to="/libro-de-reclamacion"
                    _hover={{ textDecoration: "none", color: "primary.500" }}
                >
                    <HStack align="center" spacing={1}>
                        <Icon as={IoBookOutline} />
                        <Text>Libro de Reclamaciones</Text>
                    </HStack>
                </Link>
            </VStack>
        </>
    );
};

export default Footer;
