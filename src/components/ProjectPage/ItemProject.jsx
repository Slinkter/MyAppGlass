import React from "react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
    MapPinIcon,
    CalendarDaysIcon,
    BuildingOffice2Icon,
    HomeIcon,
    MapIcon,
} from "@heroicons/react/24/solid";
import {
    Skeleton,
    Card,
    CardBody,
    Button,
    Flex,
    Heading,
    Image,
    Stack,
    Text,
    useColorModeValue,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Box,
    Icon,
    Spinner,
} from "@chakra-ui/react";

const ItemProject = (props) => {
    const { image, residencial, address, year, g_maps, name } = props;
    const [isLoaded, setIsLoaded] = React.useState(false);
    const { isOpen, onOpen: onOpenModal, onClose } = useDisclosure();
    const [isMapLoaded, setIsMapLoaded] = React.useState(false);

    const onOpen = () => {
        setIsMapLoaded(false);
        onOpenModal();
    };

    const colorWhite = "gray.200";
    const colorBlack = "blackAlpha.500";
    const bg = useColorModeValue(colorWhite, colorBlack);

    const googleMapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(
        g_maps
    )}&output=embed`;
    console.log(props);
    console.log(googleMapsUrl);

    return (
        <>
            <Card
                w="375px"
                maxW={{ base: "full", md: "375px" }}
                mb={4}
                boxShadow={"md"}
                rounded="xl"
                bg={bg}
                overflow="hidden"
                opacity={isLoaded ? 1 : 0}
                transition="all .3s ease-in-out"
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
                        fadeDuration={0.3}
                        borderRadius={"lg"}
                    >
                        <Image
                            w="full"
                            h={{ base: "320px", md: "325px" }}
                            src={image}
                            alt={`Obra ${residencial}`}
                            borderRadius="lg"
                            objectFit="cover"
                            boxShadow={"base"}
                            onLoad={() => setIsLoaded(true)}
                        />

                        <Stack mt="4" spacing="2">
                            <Flex
                                direction={"column"}
                                textAlign={"left"}
                                justifyContent={"center"}
                                gap={2}
                            >
                                <Heading size="md" textTransform={"uppercase"}>
                                    residencial
                                </Heading>
                                <Heading
                                    size="md"
                                    textTransform={"uppercase"}
                                    color="red.500"
                                >
                                    {residencial}
                                </Heading>
                            </Flex>
                            <Flex alignItems={"center"}>
                                <Icon
                                    as={MapPinIcon}
                                    w={5}
                                    h={5}
                                    mr={2}
                                    color="gray.500"
                                />
                                <Text fontSize="sm">{address}</Text>
                            </Flex>
                            <Flex alignItems={"center"}>
                                <Icon
                                    as={CalendarDaysIcon}
                                    w={5}
                                    h={5}
                                    mr={2}
                                    color="gray.500"
                                />
                                <Text fontSize="sm">{year}</Text>
                            </Flex>

                            <Button
                                onClick={onOpen}
                                rightIcon={<ArrowForwardIcon />}
                                colorScheme="teal"
                                variant="solid"
                                mt={1}
                            >
                                Ver en Google Maps
                            </Button>
                        </Stack>
                    </Skeleton>
                </CardBody>
            </Card>

            <Modal
                isOpen={isOpen}
                onClose={onClose}
                size={{ base: "full", md: "6xl" }}
                isCentered
            >
                <ModalOverlay bg="blackAlpha.700" />
                <ModalContent
                    bg={useColorModeValue("gray.50", "gray.800")}
                    rounded="lg"
                >
                    <ModalCloseButton />
                    <ModalBody p={{ base: 2, md: 4 }}>
                        <Flex
                            w="full"
                            h="full"
                            flexDirection={{ base: "column", md: "row" }}
                            gap={4}
                        >
                            <Box
                                flex="2"
                                h={{ base: "300px", md: "500px" }}
                                position="relative"
                            >
                                {!isMapLoaded && (
                                    <Flex
                                        position="absolute"
                                        top="0"
                                        left="0"
                                        right="0"
                                        bottom="0"
                                        align="center"
                                        justify="center"
                                        bg={useColorModeValue(
                                            "gray.200",
                                            "gray.700"
                                        )}
                                        borderRadius="md"
                                    >
                                        <Spinner size="xl" />
                                    </Flex>
                                )}
                                <iframe
                                    src={googleMapsUrl}
                                    width="100%"
                                    height="100%"
                                    style={{
                                        border: 0,
                                        borderRadius: "8px",
                                    }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    onLoad={() => setIsMapLoaded(true)}
                                ></iframe>
                            </Box>
                            <Box
                                flex="1"
                                p={{ base: 2, md: 4 }}
                                bg={useColorModeValue("white", "gray.700")}
                                borderRadius="lg"
                                boxShadow="sm"
                            >
                                <Heading size="md" mb={4}>
                                    Detalles del Proyecto
                                </Heading>
                                <Stack spacing={4}>
                                    <Flex align="center">
                                        <Icon
                                            as={HomeIcon}
                                            w={6}
                                            h={6}
                                            mr={3}
                                            color="red.500"
                                        />
                                        <Box>
                                            <Text
                                                fontSize="sm"
                                                color="gray.500"
                                            >
                                                Residencial
                                            </Text>
                                            <Text fontWeight="bold">
                                                {residencial}
                                            </Text>
                                        </Box>
                                    </Flex>
                                    <Flex align="center">
                                        <Icon
                                            as={BuildingOffice2Icon}
                                            w={6}
                                            h={6}
                                            mr={3}
                                            color="red.500"
                                        />
                                        <Box>
                                            <Text
                                                fontSize="sm"
                                                color="gray.500"
                                            >
                                                Constructora
                                            </Text>
                                            <Text fontWeight="bold">
                                                {name}
                                            </Text>
                                        </Box>
                                    </Flex>
                                    <Flex align="center">
                                        <Icon
                                            as={MapIcon}
                                            w={6}
                                            h={6}
                                            mr={3}
                                            color="red.500"
                                        />
                                        <Box>
                                            <Text
                                                fontSize="sm"
                                                color="gray.500"
                                            >
                                                Direccion
                                            </Text>
                                            <Text fontWeight="bold">
                                                {g_maps}
                                            </Text>
                                        </Box>
                                    </Flex>
                                    <Flex align="center">
                                        <Icon
                                            as={MapPinIcon}
                                            w={6}
                                            h={6}
                                            mr={3}
                                            color="red.500"
                                        />
                                        <Box>
                                            <Text
                                                fontSize="sm"
                                                color="gray.500"
                                            >
                                                Distrito
                                            </Text>
                                            <Text fontWeight="bold">
                                                {address}
                                            </Text>
                                        </Box>
                                    </Flex>
                                    <Flex align="center">
                                        <Icon
                                            as={CalendarDaysIcon}
                                            w={6}
                                            h={6}
                                            mr={3}
                                            color="red.500"
                                        />
                                        <Box>
                                            <Text
                                                fontSize="sm"
                                                color="gray.500"
                                            >
                                                Año
                                            </Text>
                                            <Text fontWeight="bold">
                                                {year}
                                            </Text>
                                        </Box>
                                    </Flex>
                                </Stack>
                            </Box>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ItemProject;
