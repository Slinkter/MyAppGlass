import { useState } from "react";
import {
    Box,
    Heading,
    Button,
    Flex,
    Card,
    CardBody,
    Image,
    Stack,
    useColorModeValue,
    Skeleton,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ArrowForwardIcon } from "@chakra-ui/icons";

function ItemService({ image, name, plink }) {
    const [isLoaded, setIsLoaded] = useState(false);
    const navigate = useNavigate();

    return (
        <Card
            w="375px"
            maxW={{ base: "full", md: "385px" }}
            maxH={{ base: "452px", md: "512px" }}
            mb={4}
            boxShadow="md"
            border="1px solid"
            borderColor={useColorModeValue("gray.100", "gray.600")}
            overflow="hidden"
            opacity={isLoaded ? 1 : 0}
            transition="all .3s ease-in-out"
            _hover={{
                boxShadow: "md",
                borderColor: "gray.100",
                transform: {
                    base: "",
                    md: "scale(1.01)",
                },
            }}
        >
            <CardBody textAlign="center">
                <Skeleton
                    isLoaded={isLoaded}
                    borderRadius="lg"
                    mb={4}
                    fadeDuration={0.1}
                >
                    <Image
                        w="full"
                        h={{ base: "320px", md: "385px" }}
                        src={image}
                        alt={`Servicio de ${name}`}
                        borderRadius="md"
                        objectFit="cover"
                        onLoad={() => setIsLoaded(true)}
                    />
                </Skeleton>
                <Stack mt="2" spacing="3">
                    <Flex justifyContent="space-between" alignItems="center">
                        <Box>
                            <Heading
                                as="h3"
                                size="md"
                                fontWeight="600"
                                textTransform="uppercase"
                            >
                                {name}
                            </Heading>
                        </Box>
                        <Button
                            colorScheme="red"
                            rightIcon={<ArrowForwardIcon />}
                            onClick={() => navigate(plink)}
                            size="md"
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
