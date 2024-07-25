import React from "react";
import {
    Box,
    Flex,
    Heading,
    Text,
    useColorModeValue,
    useMediaQuery,
} from "@chakra-ui/react";

const Franja = ({ title, text }) => {
    const bgColor = useColorModeValue("#e9ecef", "gray.600");
    const textColor = useColorModeValue("black", "white");
    const [isMobile] = useMediaQuery("(max-width: 768px)");

    return (
        <Box color={textColor} py={8} bg={bgColor} height="">
            <Flex
                justifyContent="center"
                alignItems="center"
                direction="column"
            >
                <Heading
                    as="h2"
                    fontSize={isMobile ? "2.0rem" : "2.5rem"}
                    fontWeight="600"
                >
                    {title}
                </Heading>
                <Text
                    width={isMobile ? "90%" : "70%"}
                    my={2}
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
