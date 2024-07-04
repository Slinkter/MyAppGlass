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

const Footer = () => {
  const bgColor = useColorModeValue("#e9ecef", "gray.600"); // Light mode bg from original CSS
  const textColor = useColorModeValue("black", "white");

  return (
    <>
      <Box color={textColor} pt="2rem" pb="2rem">
        <Box bg={bgColor} mx="auto" py={8}>
          <Flex
            justifyContent="space-around"
            direction={{ base: "column", md: "row" }}
          >
            <VStack spacing={1} marginBottom={4}>
              <Heading
                as="h2"
                size="2xl"
                fontSize={"2.5rem"}
                fontWeight={"600"}
              >
                CONTACTO
              </Heading>

              <HStack spacing={2} alignItems="center">
                <Icon as={FaWhatsapp} />
                <Text>996-537-435</Text>
              </HStack>
              <HStack spacing={2} alignItems="center">
                <Icon as={FaWhatsapp} />
                <Text>974-278-303</Text>
              </HStack>
            </VStack>
            <VStack spacing={1} marginBottom={4}>
              <Heading
                as="h2"
                size="2xl"
                fontSize={"2.5rem"}
                fontWeight={"600"}
              >
                HORARIOS
              </Heading>

              <HStack spacing={2} alignItems="center">
                <Icon as={FaCalendar} />
                <Text fontSize="">Lunes a Sábado</Text>
              </HStack>
              <HStack spacing={2} alignItems="center">
                <Icon as={FaClock} />
                <Text>9:00 am - 5:00 pm</Text>
              </HStack>
            </VStack>
            <VStack spacing={1} marginBottom={4}>
              <Heading
                as="h2"
                size="2xl"
                fontSize={"2.5rem"}
                fontWeight={"600"}
              >
                DIRECCIÓN
              </Heading>

              <HStack spacing={2} alignItems="center">
                <Icon as={FaMap} />
                <Text>Av. Los Fresnos MZ. H LT. 16</Text>
              </HStack>
              <HStack spacing={2} alignItems="center">
                <Icon as={FaMap} />
                <Text>La Molina</Text>
              </HStack>
            </VStack>
          </Flex>
        </Box>
      </Box>
      <Flex justifyContent={"center"} alignItems={"center"} mb={"20px"}>
        <Text> Copyright ©2024</Text>
      </Flex>
    </>
  );
};

export default Footer;
