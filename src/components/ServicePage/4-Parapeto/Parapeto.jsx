import {
    Box,
    Icon,
    Text,
    Stack,
    Grid,
    GridItem,
    Image,
    useColorModeValue,
    useBreakpointValue,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    Skeleton,
    useMediaQuery,
    Container,
    Heading,
    Flex,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { listParapeto } from "../../../assets/webService/s/05.Parapeto/db_parapeto";

const Parapeto = () => {
    window.document.title = "Parapeto";
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true); // Set loading to true whenever the selection changes
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer); // Clear the timer on component unmount or selection change
    }, []); // Re-run the effect when 'open' state changes

    return (
        <Box display={"flex"} flexDir={{ base: "column", md: "row" }}>
            <Box
                ml="2rem"
                mt="2rem"
                mr={{ base: "2rem", md: "2rem" }}
                p={4}
                bg={useColorModeValue("white", "gray.800")}
                h={{ base: "auto", md: "80vh" }}
                w={{ base: "full-20rem", md: "15rem" }}
                rounded="lg"
                boxShadow="md"
                border={"1px solid "}
                borderColor={useColorModeValue("gray.200", "gray.600")}
                _hover={{
                    borderColor: "gray.300",
                    boxShadow: "lg",
                }}
            >
                <Box mb={2} p={4}>
                    <Heading as="h2" fontWeight="600" color="red.500" mt={4}>
                        Parapeto de Vidrio
                    </Heading>

                    <Stack spacing={1}>
                        <SidebarItem
                            icon={PaperAirplaneIcon}
                            title="Vidrio templado de 8mm"
                            loading={loading}
                        />
                        <SidebarItem
                            icon={PaperAirplaneIcon}
                            title="Estructura de Acero"
                            loading={loading}
                        />
                        <SidebarItem
                            icon={PaperAirplaneIcon}
                            title="Estructura de Aluminio"
                            loading={loading}
                        />
                        <SidebarItem
                            icon={PaperAirplaneIcon}
                            title="Accesorios "
                            loading={loading}
                        />
                    </Stack>
                </Box>
            </Box>

            <Box
                display={"flex"}
                justifyContent={"start"}
                alignItems={"start"}
                mt="2rem"
                mr="2rem"
                mb="2rem"
                ml={{ base: "2rem", md: "0rem" }}
                p={4}
                bg={useColorModeValue("white", "gray.800")}
                h={{ base: "auto", md: "80vh" }}
                rounded="lg"
                boxShadow="md"
                border={"1px solid "}
                borderColor={useColorModeValue("gray.200", "gray.600")}
                _hover={{
                    borderColor: "gray.300",
                    boxShadow: "lg",
                }}
            >
                <Gallery images={listParapeto.parapeto} loading={loading} />
            </Box>
        </Box>
    );
};

export default Parapeto;

const Gallery = ({ images, loading }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isMobile] = useMediaQuery();
    const resposiveColmns = useBreakpointValue({ base: 1, md: 4 });
    const onClose = () => setIsOpen(false);

    console.log("images", images);
    return (
        <>
            <Grid templateColumns={`repeat(${resposiveColmns} ,1fr)`} gap={4}>
                {images.map((item) => (
                    <GridItem key={item.id}>
                        {loading ? (
                            <Skeleton
                                w={{ base: "full", md: "18vw" }}
                                minH={"24vh"}
                                h={"24vh"}
                                rounded={"lg"}
                            />
                        ) : (
                            <Image
                                w={{ base: "full", md: "18vw" }}
                                minH={"24vh"}
                                h={"24vh"}
                                rounded={"lg"}
                                src={item.image}
                                objectFit={"cover"}
                                mb={{ base: 4, md: 0 }}
                                shadow={"base"}
                                cursor={"pointer"}
                                onClick={() => {
                                    setSelectedImage(item.image);
                                    setIsOpen(true);
                                }}
                            />
                        )}
                    </GridItem>
                ))}
            </Grid>
            {!isMobile && (
                <Modal
                    isOpen={isOpen}
                    onClose={onClose}
                    isCentered
                    motionPreset="slideInBottom"
                >
                    <ModalOverlay backdropFilter={"blur(10px)"} />
                    <ModalContent>
                        <ModalCloseButton />
                        <Image
                            src={selectedImage}
                            alt={selectedImage}
                            objectFit={"cover"}
                            align={"center"}
                            borderRadius={"base"}
                            shadow={"lg"}
                        />
                    </ModalContent>
                </Modal>
            )}
        </>
    );
};

const SidebarItem = ({ icon, title, onClick, loading }) => {
    return (
        <Stack
            direction={"row"}
            align={"center"}
            justifyContent={"space-between"}
            onClick={onClick}
            cursor={"pointer"}
            p={2}
            rounded={"md"}
            _hover={{
                bg: useColorModeValue("gray.50", "gray.900"),
                color: "red.500",
            }}
            transition={"all .1s ease"}
        >
            <Stack direction={"row"} align={"center"} spacing={4}>
                {loading ? (
                    <>
                        <Skeleton height={"20px"} width={"20px"} />
                        <Skeleton height={"20px"} width={"60px"} />
                    </>
                ) : (
                    <>
                        <Icon as={icon} w={5} h={5} />
                        <Text fontWeight={500}>{title}</Text>
                    </>
                )}
            </Stack>
        </Stack>
    );
};
