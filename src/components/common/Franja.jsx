import { Box, Flex, Heading, Text, useColorModeValue } from "@chakra-ui/react";
/**
 * Componente Franja
 * Muestra una franja decorativa en la página.
 * @component
 * @returns {JSX.Element}
 */
// ...existing code...

/**
 * Muestra una franja de color a lo ancho de la página con un título y un texto descriptivo.
 * Es utilizado para separar secciones de contenido de una manera visualmente atractiva.
 *
 * @param {{ title: string, text: string }} props - Props del componente.
 * @param {string} props.title - El título principal que se mostrará en la franja.
 * @param {string} props.text - El texto descriptivo o subtítulo que acompaña al título.
 * @returns {JSX.Element}
 */
const Franja = ({ title, text }) => {
    const bgColor = useColorModeValue("gray.200", "blackAlpha.500");
    const textColor = useColorModeValue("gray.800", "gray.100");

    return (
        <Box py={8} bg={bgColor} boxShadow="md">
            <Flex
                justifyContent="center"
                alignItems="center"
                direction="column"
            >
                <Heading
                    as="h1"
                    fontSize={{ base: "4xl", md: "4xl" }}
                    fontWeight="bold"
                    color={textColor}
                >
                    {title}
                </Heading>
                <Text
                    width={{ base: "90%", md: "70%" }}
                    mt={1}
                    fontSize="lg"
                    color={useColorModeValue("gray.500", "white")}
                    textAlign="center"
                >
                    {text}
                </Text>
            </Flex>
        </Box>
    );
};

export default Franja;
