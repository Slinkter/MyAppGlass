import React from "react";
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

function ServiceCard(props) {
    const { image, name, plink } = props;

    const navigate = useNavigate();
    const bg = useColorModeValue("gray.200", "gray.800");

    return (
        <Card
            w="sm" // Standardized from "375px" to Chakra token
            maxW={{ base: "full", md: "sm" }} // Standardized maxW to Chakra token
            maxH={{ base: "452px", md: "512px" }}
            mb={4}
            boxShadow="md"
            rounded="xl"
            bg={bg}
            overflow="hidden"
            _hover={{
                boxShadow: "xl", // Added shadow for depth
                borderColor: "primary.300",
                transform: "scale(1.015)", // Reduced scale for subtlety
                transition: "all 0.3s ease-out", // Smoother transition
            }}
        >
            <CardBody textAlign="center">
                <FadingImage
                    w="full"
                    h={{ base: "320px", md: "385px" }}
                    src={image}
                    alt={`Servicio de ${name}`}
                    rounded="lg" // Standardized borderRadius to rounded
                    objectFit="cover"
                    boxShadow="base"
                />
                <Stack mt={2} spacing={2}>
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