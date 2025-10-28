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
            <Box my="2rem">
                <Box bg={bgColor} mx="auto" pt={8} pb={4} boxShadow="md">
                    <Flex
                        justifyContent="space-around"
                        direction={{ base: "column", md: "row" }}
                    >
                        <VStack spacing={2} marginBottom={4}>
                            <Heading
                                as="h1"
                                fontSize={{ base: "4xl", md: "4xl" }}
                                fontWeight={600}
                                mb={1}
                            >
                                CONTACTO
                            </Heading>

                            <HStack spacing={2} alignItems="center">
                                <Icon as={FaWhatsapp} />
                                <Text fontSize={"lg"}>974-278-303</Text>
                            </HStack>
                            <HStack spacing={2} alignItems="center">
                                <Icon as={FaWhatsapp} />
                                <Text fontSize={"lg"}>996-537-435</Text>
                            </HStack>
                        </VStack>
                        <VStack spacing={2} marginBottom={4}>
                            <Heading
                                as="h1"
                                fontSize={{ base: "4xl", md: "4xl" }}
                                fontWeight={600}
                                mb={1}
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
                        <VStack spacing={2} marginBottom={4}>
                            <Heading
                                as="h1"
                                fontSize={{ base: "4xl", md: "4xl" }}
                                fontWeight={600}
                                mb={1}
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
                                    Av. Los Fresnos MZ. H LT. 16
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
            <VStack spacing={4} m={"20px"}>
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
