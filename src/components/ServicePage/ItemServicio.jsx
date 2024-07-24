import React from "react";
import { Box, Heading, Button, useColorModeValue } from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import { ArrowForwardIcon } from "@chakra-ui/icons";

function ItemService({ image, name, plink }) {
    const navigate = useNavigate();

    const handleClickProduct = (nameproduct) => {
        navigate(`${nameproduct}`);
    };

    return (
        <Box
            borderRadius="lg"
            overflow="hidden"
            boxShadow="lg"
            bgImage={`linear-gradient(90deg, rgba(0, 0, 0, 0.283), rgba(4, 4, 4, 0.284)), url(${image})`}
            bgSize="cover"
            bgPos="center"
            minH="55vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            position={"relative"}
            flexDir={"column"}
        >
            <Box p={6} borderRadius="lg" w={80}>
                <Heading as="h3" size="xl" color="white" mb={2}>
                    {name}
                </Heading>
            </Box>
            <Box position={"relative"} bottom={0} mb={2}>
                <Button
                    rightIcon={<ArrowForwardIcon />}
                    colorScheme="red"
                    onClick={() => handleClickProduct(plink)}
                >
                    Catálogo
                </Button>
            </Box>
        </Box>
    );
}

export default ItemService;
