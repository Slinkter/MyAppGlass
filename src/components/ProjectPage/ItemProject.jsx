import {
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardFooter,
    Divider,
    Flex,
    Heading,
    Image,
    Stack,
    Text,
} from "@chakra-ui/react";
import React from "react";

const ItemProject = ({ image, residencial, address, year }) => {
    // Estado para controlar la animación de desvanecimiento
    const [show, setShow] = React.useState(false);

    React.useEffect(() => {
        // Mostrar el componente con una animación de desvanecimiento
        setShow(true);
    }, []);
    /* 
    
    {
        id: 1,
        image: obra01,
        residencial: "Residencial Miraflores",
        name: "Inversiones Beraca S.A.C.",
        address: "Miraflores",
        numdpto: "20",
        year: "Mayo 2012",
    },
    */

    return (
        <div>
            <Card
                mb={4}
                w={"375px"}
                maxW={{ base: "full", md: "385px" }}
                overflow="hidden"
                boxShadow={{ base: "base", md: "lg" }}
                pos="relative"
                rounded="lg"
                opacity={show ? 1 : 0} // Aplicar la animación de desvanecimiento
                transition="all .3s ease-in-out" // Duración y tipo de transición
                _hover={{
                    transform: "scale(1.03)", // Escala al pasar el cursor sobre el componente
                }}
                h={{ base: "320px", md: "512px" }}
            >
                <CardBody>
                    <Image
                        src={image}
                        alt="       "
                        borderRadius="lg"
                        objectFit="cover"
                        w="full"
                        h={{ base: "320px", md: "385px" }}
                        mb={4}
                        shadow={"base"}
                    />

                    <Stack mt="2" spacing="3">
                        <Flex
                            flexDir={"column"}
                            justifyContent={"space-between"}
                        >
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
                            <Flex justifyContent={"space-between"}>
                                <Text>{address}</Text>
                                <Text>[{year}]</Text>
                            </Flex>
                        </Flex>
                    </Stack>
                </CardBody>
            </Card>
        </div>
    );
};

export default ItemProject;
