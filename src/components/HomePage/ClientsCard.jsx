import {
    Box,
    Button,
    Center,
    Heading,
    Image,
    Stack,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

const ClientsCard = ({ IMAGE, nameClient, descClient }) => {
    return (
        <Box
            maxW={{ base: "full", md: "375px" }}
            w={"full"}
            p={6}
            boxShadow={"2xl"}
            rounded={"lg"}
            pos={"relative"}
            zIndex={1}
            borderWidth="2px"
        >
            <Box
                w={"full"}
                maxW={{ base: "full", md: "375px" }}
                px={6}
                rounded={"lg"}
                height={380}
            >
                <Image
                    rounded={"lg"}
                    width={280}
                    height={380}
                    objectFit={"cover"}
                    src={IMAGE}
                    alt="#"
                />
            </Box>

            <Stack pt={2} align={"center"} px={6}>
                <Stack pt={4} align={"center"}>
                    <Heading
                        as="h3"
                        fontWeight={"600"}
                        textTransform={"uppercase"}
                    >
                        {nameClient}
                    </Heading>

                    <Stack direction={"row"} align={"center"}>
                        <Text
                            color={"gray.500"}
                            fontSize={"sm"}
                            align={"center"}
                        >
                            {descClient}
                        </Text>
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    );
};

export default ClientsCard;
