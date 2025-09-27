import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowForwardIcon } from "@chakra-ui/icons";
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

function ItemService(props) {
    const { image, name, plink } = props;

    const [isLoaded, setIsLoaded] = useState(false);
    const navigate = useNavigate();
    const colorWhite = "gray.200";
    const colorBlack = "blackAlpha.500";
    const bg = useColorModeValue(colorWhite, colorBlack);

    return (
        <Card
            w="375px"
            maxW={{ base: "full", md: "375px" }}
            maxH={{ base: "452px", md: "512px" }}
            mb={4}
            boxShadow={"md"}
            rounded="xl"
            bg={bg}
            overflow="hidden"
            _hover={{
                boxShadow: "md",
                borderColor: "gray.100",
                transform: {
                    base: "",
                    md: "scale(1.02)",
                },
            }}
        >
            <CardBody textAlign="center">
                <Skeleton
                    isLoaded={isLoaded}
                    borderRadius="lg"
                    fadeDuration={0.3}
                >
                    <Image
                        w="full"
                        h={{ base: "320px", md: "385px" }}
                        src={image}
                        alt={`Servicio de ${name}`}
                        borderRadius="lg"
                        objectFit="cover"
                        boxShadow={"base"}
                        onLoad={() => setIsLoaded(true)}
                    />
                    <Stack mt="2" spacing="2">
                        <Flex
                            justifyContent="space-between"
                            alignItems="center"
                        >
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
                </Skeleton>
            </CardBody>
        </Card>
    );
}

export default ItemService;
