import { useNavigate } from "react-router-dom";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
    Box,
    Heading,
    Button,
    Flex,
    Card,
    CardBody,
    Stack,
    useColorModeValue,
} from "@chakra-ui/react";
import FadingImage from "@/components/common/FadingImage";
import { getServiceImageUrl } from "@/utils/image-loader";

function ServiceCard(props) {
    const { image, name, plink } = props;

    const navigate = useNavigate();
    const bg = useColorModeValue("gray.200", "gray.800");

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
                boxShadow: "lg",
                borderColor: "primary.300",
                transform: {
                    base: "",
                    md: "scale(1.02)",
                },
            }}
        >
            <CardBody textAlign="center">
                <FadingImage
                    w="full"
                    h={{ base: "320px", md: "385px" }}
                    src={getServiceImageUrl(image)}
                    alt={`Servicio de ${name}`}
                    borderRadius="lg"
                    objectFit="cover"
                    boxShadow={"base"}
                />
                <Stack mt="2" spacing="2">
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
                            colorScheme="primary"
                            rightIcon={<ArrowForwardIcon />}
                            onClick={() => navigate(plink)}
                            aria-label={`Ver catálogo de ${name}`} // Added aria-label
                        >
                            Catálogo
                        </Button>
                    </Flex>
                </Stack>
            </CardBody>
        </Card>
    );
}

export default ServiceCard;
