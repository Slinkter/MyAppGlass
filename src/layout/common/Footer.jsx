import {
  Box,
  Flex,
  HStack,
  Text,
  VStack,
  useColorModeValue,
  Icon,
  Heading,
  Image,
} from "@chakra-ui/react";
import {
  FaWhatsapp,
  FaCalendar,
  FaClock,
  FaMap,
  FaLandmark,
} from "react-icons/fa"; // Added FaLandmark
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import { IoDocumentTextOutline } from "react-icons/io5"; // Added IoDocumentTextOutline
import LibroReclamacionesIcon from "@/assets/libro.svg";

const Footer = () => {
  const bgColor = useColorModeValue(
    "rgba(255, 255, 255, 0.1)",
    "rgba(0, 0, 0, 0.1)"
  ); // More subtle background
  const textColor = useColorModeValue("gray.800", "gray.100");
  const headingColor = useColorModeValue("gray.900", "white");
  const copyrightColor = useColorModeValue("gray.600", "gray.400");

  return (
    <>
      <Box as="footer" my={8} px={{ base: 4, md: 0 }}>
        <Box
          bg={bgColor}
          backdropFilter="blur(10px)" // Suave blur
          border="none" // SIN borde
          boxShadow="md" // SIN shadow
          borderRadius="2xl"
          transition="all 0.3s ease"
          color={textColor}
          maxW="7xl" // Constrain width to align with other content
          mx="auto"
          pt={8}
          pb={4}
        >
          <Flex
            justifyContent="space-around"
            direction={{ base: "column", md: "row" }}
            textAlign={{ base: "center", md: "left" }}
          >
            <VStack spacing={2} mb={{ base: 6, md: 4 }}>
              <Heading
                as="h3"
                fontSize={{ base: "xl", md: "2xl" }}
                fontWeight="semibold"
                mb={2}
                color={headingColor}
              >
                CONTACTO
              </Heading>
              <HStack spacing={2} alignItems="center">
                <Icon as={FaWhatsapp} />
                <Text fontSize="md">974-278-303</Text>
              </HStack>
              <HStack spacing={2} alignItems="center">
                <Icon as={FaWhatsapp} />
                <Text fontSize="md">996-537-435</Text>
              </HStack>
            </VStack>
            <VStack spacing={2} mb={{ base: 6, md: 4 }}>
              <Heading
                as="h3"
                fontSize={{ base: "xl", md: "2xl" }}
                fontWeight="semibold"
                mb={2}
                color={headingColor}
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
            <VStack spacing={2} mb={{ base: 6, md: 4 }}>
              <Heading
                as="h3"
                fontSize={{ base: "xl", md: "2xl" }}
                fontWeight="semibold"
                mb={2}
                color={headingColor}
              >
                DIRECCIÓN
              </Heading>
              <HStack spacing={2} alignItems="center" justifyContent={"center"}>
                <Icon as={FaMap} />
                <Text fontSize="md">Av. Los Fresnos MZ. H LT. 1250</Text>
              </HStack>
              <HStack spacing={2} alignItems="center" justifyContent={"center"}>
                <Icon as={MdEmail} />
                <Text fontSize="md">acueva@gyacompany.com</Text>
              </HStack>
            </VStack>
            <VStack spacing={2} mb={{ base: 6, md: 4 }}>
              <Heading
                as="h3"
                fontSize={{ base: "xl", md: "2xl" }}
                fontWeight="semibold"
                mb={2}
                color={headingColor}
              >
                LINKS
              </Heading>
              <Link to="/politicas-empresa" style={{ textDecoration: "none" }}>
                <HStack
                  spacing={2}
                  alignItems="center"
                  _hover={{
                    color: useColorModeValue("primary.600", "primary.300"),
                  }}
                >
                  <Icon as={IoDocumentTextOutline} />
                  <Text fontSize="md">Políticas de la Empresa</Text>
                </HStack>
              </Link>
              <Link
                to="/libro-de-reclamacion"
                style={{ textDecoration: "none" }}
              >
                <HStack
                  spacing={2}
                  alignItems="center"
                  _hover={{
                    color: useColorModeValue("primary.600", "primary.300"),
                  }}
                >
                  <Image
                    src={LibroReclamacionesIcon}
                    alt="Libro de Reclamaciones"
                    h="30px"
                    w="auto"
                  />
                  <Text fontSize="md">Libro de Reclamaciones</Text>
                </HStack>
              </Link>
              <Link to="/cuentas-bancarias" style={{ textDecoration: "none" }}>
                <HStack
                  spacing={2}
                  alignItems="center"
                  _hover={{
                    color: useColorModeValue("primary.600", "primary.300"),
                  }}
                >
                  <Icon as={FaLandmark} />
                  <Text fontSize="md">Cuentas Bancarias</Text>
                </HStack>
              </Link>
            </VStack>
          </Flex>
        </Box>
      </Box>
      <VStack color={copyrightColor}>
        <Text mt={2} mb={6}>
          Copyright ©2025
        </Text>
      </VStack>
    </>
  );
};

export default Footer;
