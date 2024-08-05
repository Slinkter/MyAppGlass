import {
    Card,
    CardBody,
    Divider,
    Flex,
    Heading,
    Image,
    Stack,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

const ItemProject = ({ image, residencial, address, year }) => {
    // Estado para controlar la animación de desvanecimiento
    const [show, setShow] = React.useState(false);
    React.useEffect(() => {
        setShow(true);
    }, []);

    return (
        <Card
            w={"full"}
            maxW={{ base: "full", md: "375px" }}
            maxH={{ base: "452px", md: "512px" }}
            border={"1px solid"}
            borderColor={useColorModeValue("gray.200", "black")}
            mb={4}
            overflow="hidden"
            boxShadow={{ base: "base", md: "lg" }}
            pos="relative"
            rounded="lg"
            opacity={show ? 1 : 0}
            transition="all .2s ease-in-out"
            _hover={{
                transform: { base: "scale(1.00)", md: "scale(1.02)" },
            }}
        >
            <CardBody>
                <Image
                    src={image}
                    alt="       "
                    borderRadius="lg"
                    objectFit="cover"
                    w="full"
                    h={{ base: "300px", md: "345px" }}
                    mb={4}
                    shadow={"base"}
                />

                <Stack spacing="3">
                    <Flex flexDir={"column"} justifyContent={"space-between"}>
                        <Flex flexDir={"column"} textAlign={"left"}>
                            <Heading size="">RESIDENCIAL </Heading>

                            <Heading
                                size="md"
                                textTransform={"uppercase"}
                                color="red.500"
                            >
                                {residencial}
                            </Heading>
                        </Flex>
                        <Divider my={2} />
                        <Flex justifyContent={"space-between"}>
                            <Text>{address}</Text>
                            <Text>[{year}]</Text>
                        </Flex>
                    </Flex>
                </Stack>
            </CardBody>
        </Card>
    );
};

export default ItemProject;
