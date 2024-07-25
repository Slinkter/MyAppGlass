import React from "react";
import {
    Box,
    Heading,
    Button,
    useColorModeValue,
    Flex,
    Divider,
    useMediaQuery,
    Card,
    CardHeader,
    CardBody,
    Image,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ArrowForwardIcon } from "@chakra-ui/icons";

function ItemService({ image, name, plink }) {
    const navigate = useNavigate();
    const [isMobile] = useMediaQuery("(max-width: 768px)");

    // Estado para controlar la animación de desvanecimiento
    const [show, setShow] = React.useState(false);

    React.useEffect(() => {
        // Mostrar el componente con una animación de desvanecimiento
        setShow(true);
    }, []);

    const handleClickProduct = (nameproduct) => {
        navigate(`${nameproduct}`);
    };

    return (
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
                <Box mb={2}>
                    <Heading as="h3" size="lg" fontWeight="600">
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
            </CardBody>
        </Card>
    );
}

export default ItemService;
