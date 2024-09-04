import { useEffect, useState } from "react";
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
    SkeletonCircle,
} from "@chakra-ui/react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { listMampara } from "../../../assets/webService/s/02.Mampara/db_mampara";
window.document.title = "Mampara";

const Mampara = () => {
    const [open, setOpen] = useState(0);
    const [loading, setLoading] = useState(true);
    /*  */
    useEffect(() => {
        setLoading(true); // Set loading to true whenever the selection changes
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer); // Clear the timer on component unmount or selection change
    }, [open]); // Re-run the effect when 'open' state changes

    return (
        <Box
            display="flex"
            flexDirection={{ base: "column", md: "row" }}
            justifyContent={"center"}
            alignItems={"center"}
            p={8}
        >
            <Box
                w={{ base: "full", md: "20vw" }}
                h={{ base: "auto", md: "80vh" }}
                m={{ base: "20px" }}
                p={4}
                bg={useColorModeValue("white", "gray.800")}
                rounded="lg"
                boxShadow="md"
                border={"1px solid "}
                borderColor={useColorModeValue("gray.200", "gray.600")}
                _hover={{
                    boxShadow: "xl",
                    borderColor: "red.200",
                }}
            >
                <Box mb={1} p={3} opacity={loading ? 0 : 1}>
                    <Text
                        fontSize="2xl"
                        fontWeight="bold"
                        color={useColorModeValue("gray.700", "gray.200")}
                    >
                        MAMPARAS
                    </Text>
                </Box>
                <Stack spacing={1}>
                    <SidebarItem
                        icon={PaperAirplaneIcon}
                        title="Nova"
                        onClick={() => setOpen(0)}
                        loading={loading}
                    />
                    <SidebarItem
                        icon={PaperAirplaneIcon}
                        title="serie 25"
                        onClick={() => setOpen(1)}
                        loading={loading}
                    />
                </Stack>
            </Box>
            <Box
                h={{ base: "auto", md: "80vh" }}
                w={{ base: "full", md: "100vw" }}
                mx={{ base: "20px" }}
                p={4}
                bg={useColorModeValue("white", "gray.800")}
                rounded="lg"
                boxShadow="md"
                border={"1px solid "}
                borderColor={useColorModeValue("gray.200", "gray.600")}
                _hover={{
                    borderColor: "red.200",
                    boxShadow: "xl",
                }}
            >
                {open === 0 ? (
                    <Gallery images={listMampara.nova} loading={loading} />
                ) : (
                    <Gallery images={listMampara.serie} loading={loading} />
                )}
            </Box>
        </Box>
    );
};

export default Mampara;

const SidebarItem = ({ icon, title, onClick, loading }) => {
    return (
        <Stack
            direction="row"
            align="center"
            justify="space-between"
            onClick={onClick}
            cursor="pointer"
            p={2}
            rounded="md"
            _hover={{
                bg: useColorModeValue("gray.50", "gray.900"),
                color: "red.500",
            }}
        >
            {loading && (
                <Stack direction="row" align="center" spacing={4}>
                    <SkeletonCircle w={5} h={5} />
                    <Skeleton height="20px" w={"140px"} />
                </Stack>
            )}

            {!loading && (
                <Stack direction="row" align="center" spacing={4}>
                    <Icon w={5} h={5} as={icon} />
                    <Text fontWeight={600}>{title}</Text>
                </Stack>
            )}
        </Stack>
    );
};

const Gallery = ({ images, loading }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isMobile] = useMediaQuery("(max-width: 768px)");
    const responsiveColumns = useBreakpointValue({ base: 1, md: 5 });
    const onClose = () => setIsOpen(false);

    return (
        <>
            <Grid templateColumns={`repeat(${responsiveColumns}, 1fr)`} gap={4}>
                {loading &&
                    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12].map((_, idx) => (
                        <GridItem key={idx}>
                            <Skeleton
                                w="full"
                                h={{ base: "", md: "24vh" }}
                                rounded="lg"
                            />
                        </GridItem>
                    ))}

                {!loading &&
                    images.map((src, index) => (
                        <GridItem key={index}>
                            <Image
                                w="full"
                                h={{ base: "44vh", md: "24vh" }}
                                src={src.image}
                                rounded="lg"
                                objectFit={"cover"}
                                transition="opacity 0.5s ease-in-out"
                                opacity={loading ? 0 : 1}
                                cursor={"pointer"}
                                onClick={() => {
                                    setSelectedImage(src.image);
                                    setIsOpen(true);
                                }}
                            />
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
