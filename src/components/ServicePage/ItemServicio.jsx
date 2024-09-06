import React from "react";
import {
    Box,
    Heading,
    Button,
    Flex,
    useMediaQuery,
    Card,
    CardBody,
    Image,
    Stack,
    useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ArrowForwardIcon } from "@chakra-ui/icons";

function ItemService({ image, name, plink }) {
    const navigate = useNavigate();

    const [show, setShow] = React.useState(false);

    React.useEffect(() => {
        setShow(true);
    }, []);

    const handleClickProduct = (nameproduct) => {
        navigate(`${nameproduct}`);
    };

    return (
        <Card
            pos="relative"
            w={"375px"}
            maxW={{ base: "full", md: "385px" }}
            maxH={{ base: "452px", md: "512px" }}
            mb={4}
            boxShadow="md"
            border={"1px solid "}
            borderColor={useColorModeValue("gray.200", "gray.600")}
            overflow="hidden"
            opacity={show ? 1 : 0} // Aplicar la animación de desvanecimiento
            transition="all .3s ease-in-out" // Duración y tipo de transición
            _hover={{
                // Escala al pasar el cursor sobre el componente
                boxShadow: "xl",
                borderColor: "gray.300",
                transform: {
                    base: "scale(1.00)",
                    md: "scale(1.02)",
                },
            }}
        >
            <CardBody textAlign="center">
                <Image
                    src={image}
                    borderRadius="lg"
                    objectFit="cover"
                    w="full"
                    h={{ base: "320px", md: "385px" }}
                    mb={4}
                    shadow={"base"}
                />
                <Stack mt="2" spacing="3">
                    <Flex
                        justifyContent={"space-between"}
                        alignItems={"center"}
                    >
                        <Box>
                            <Heading as="h3" size="md" fontWeight="600">
                                {name}
                            </Heading>
                        </Box>
                        <Button
                            colorScheme="red"
                            rightIcon={<ArrowForwardIcon />}
                            onClick={() => handleClickProduct(plink)}
                        >
                            Catálogo
                        </Button>
                    </Flex>
                </Stack>
            </CardBody>
        </Card>
    );
}

export default ItemService;
