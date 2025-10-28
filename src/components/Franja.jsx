import {
    Box,
    Flex,
    Heading,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import useIsMobile from "../hooks/useIsMobile";

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
    const colorWhite = "gray.200";
    const colorBlack = "blackAlpha.500";
    const bgColor = useColorModeValue(colorWhite, colorBlack);
    const textColor = useColorModeValue("black", "white");
    const isMobile = useIsMobile();

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
                    fontStyle={"600"}
                >
                    {title}
                </Heading>
                <Text
                    width={isMobile ? "90%" : "70%"}
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
