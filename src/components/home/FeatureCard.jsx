import {
    Card,
    CardBody,
    Flex,
    Heading,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
/**
 * Componente FeatureCard
 * Tarjeta para mostrar una característica destacada.
 * @component
 * @param {Object} props
 * @param {string} props.label - Etiqueta de la característica
 * @param {React.ReactNode} props.icon - Icono a mostrar
 * @returns {JSX.Element}
 */
// ...existing code...

const FeatureCard = ({ heading, description, icon }) => {
    return (
        <Card
            w={"full"}
            maxW={{ base: "full", md: "375px" }}
            h={{ base: "auto", md: "base" }}
            p={{ base: 3, md: 6 }}
            rounded={"lg"}
            boxShadow={{ base: "base", md: "lg" }}
            border={"1px solid"}
            borderColor={useColorModeValue("gray.200", "gray.900")}
            _hover={{
                transform: "scale(1.02)",
            }}
        >
            <CardBody textAlign="center">
                <Flex
                    w={24}
                    h={24}
                    mx="auto"
                    mb={4}
                    align={"center"}
                    justify={"center"}
                    rounded={"full"}
                    bg={useColorModeValue("gray.200", "gray.700")}
                >
                    {icon}
                </Flex>
                <Heading size="md" mb={3}>
                    {heading}
                </Heading>
                <Text mt={1} fontSize={"md"} color={"gray.500"}>
                    {description}
                </Text>
            </CardBody>
        </Card>
    );
};

export default FeatureCard;
