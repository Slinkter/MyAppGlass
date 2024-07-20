import {
    Box,
    Button,
    Flex,
    Heading,
    Stack,
    Text,
    useColorModeValue,
    useMediaQuery,
} from "@chakra-ui/react";
import React from "react";

const FeatureCard = ({ heading, description, icon, href }) => {
    const [isMobile] = useMediaQuery("(max-width: 768px)"); // Adjust breakpoint as needed
    return (
        <Box
            w={"full"}
            maxW={{ base: "full", md: "375px" }}
            borderWidth="1px"
            overflow="hidden"
            p={isMobile ? 3 : 6}
            boxShadow={{ base: "base", md: "lg" }}
            pos={"relative"}
            rounded={"lg"}
        >
            <Stack mb={6} pt={2} align={"center"} spacing={2}>
                <Stack pt={4} align={"center"}>
                    <Flex
                        w={20}
                        h={20}
                        align={"center"}
                        justify={"center"}
                        rounded={"full"}
                        bg={useColorModeValue("gray.100", "gray.700")}
                    >
                        {icon}
                    </Flex>
                    <Box mt={2} align={"center"}>
                        <Heading size="md" mb={3}>
                            {heading}
                        </Heading>
                        <Text
                            mt={1}
                            fontSize={"sm"}
                            color={"gray.500"}
                            align={"center"}
                        >
                            {description}
                        </Text>
                    </Box>
                </Stack>
            </Stack>
        </Box>
    );
};

export default FeatureCard;
