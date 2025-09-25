import {
    Box,
    Flex,
    Heading,
    Text,
    useColorModeValue,
    useMediaQuery,
} from "@chakra-ui/react";

const Franja = ({ title, text }) => {
    const colorWhite = "gray.200";
    const colorBlack = "blackAlpha.500";
    const bgColor = useColorModeValue(colorWhite, colorBlack);
    const textColor = useColorModeValue("black", "white");
    const [isMobile] = useMediaQuery("(max-width: 768px)");

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
