import {
    Box,
    Flex,
    HStack,
    Heading,
    Text,
    useColorModeValue,
    useMediaQuery,
} from "@chakra-ui/react";
import React from "react";

const Franja = ({ title, text }) => {
    const bgColor = useColorModeValue("#e9ecef", "gray.600"); // Light mode bg from original CSS
    const textColor = useColorModeValue("black", "white");
    const [isMobile] = useMediaQuery("(max-width: 768px)"); // Adjust breakpoint as needed

    return (
        <>
            <Box color={textColor} pt="2rem" pb="2rem">
                <Box bg={bgColor} mx="auto" py={8}>
                    <Flex
                        justifyContent="center"
                        alignItems={"center"}
                        direction={{ base: "column" }}
                    >
                        <Heading as="h2" fontSize={"2.5rem"} fontWeight={"600"}>
                            {title}
                        </Heading>
                        <Text
                            width={isMobile ? "95%" : "95%"}
                            my={isMobile ? "10px" : "10px"}
                            mt={1}
                            size={"lg"}
                            color={useColorModeValue("gray.500", "white")}
                            align={"center"}
                        >
                            {text}
                        </Text>
                    </Flex>
                </Box>
            </Box>
        </>
    );
};

export default Franja;
