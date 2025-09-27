import {
    Box,
    HStack,
    Text,
    VStack,
    useColorModeValue,
    Icon,
    Heading,
    SimpleGrid,
    Divider,
    Center,
} from "@chakra-ui/react";
import { FaWhatsapp, FaCalendar, FaClock, FaMap } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import { IoBookOutline } from "react-icons/io5";

const Footer = () => {
    const bgColor = useColorModeValue("gray.100", "gray.900");
    const textColor = useColorModeValue("gray.700", "gray.200");

    return (
        <>
            <Box as="footer" bg={bgColor} color={textColor} boxShadow="inner">
                <Box maxW="8xl" mx="auto" pt={10} pb={6} px={6}>
                    <SimpleGrid
                        columns={{ base: 1, md: 3 }}
                        spacing={{ base: 8, md: 4 }}
                        textAlign="center"
                    >
                        {/* --- Columna Contacto --- */}
                        <VStack spacing={3} alignItems="center">
                            <Heading
                                as="h3"
                                size="md"
                                textTransform="uppercase"
                            >
                                Contacto
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

                        {/* --- Columna Horarios --- */}
                        <VStack spacing={3} alignItems="center">
                            <Heading
                                as="h3"
                                size="md"
                                textTransform="uppercase"
                            >
                                Horarios
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

                        {/* --- Columna Dirección --- */}
                        <VStack spacing={3} alignItems="center">
                            <Heading
                                as="h3"
                                size="md"
                                textTransform="uppercase"
                            >
                                Dirección
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
                    </SimpleGrid>

                    <Divider my={6} />

                    <Center>
                        <VStack spacing={3}>
                            <Text fontSize="sm">
                                Copyright © {new Date().getFullYear()}
                            </Text>
                            <Link to="/libro-de-reclamacion">
                                <HStack
                                    _hover={{ color: "red.500" }}
                                    transition="color 0.2s"
                                >
                                    <Icon as={IoBookOutline} />
                                    <Text>Libro de Reclamaciones</Text>
                                </HStack>
                            </Link>
                        </VStack>
                    </Center>
                </Box>
            </Box>
        </>
    );
};

export default Footer;
