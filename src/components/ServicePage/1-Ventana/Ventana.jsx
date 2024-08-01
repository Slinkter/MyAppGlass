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
} from "@chakra-ui/react";
import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    PaperAirplaneIcon,
} from "@heroicons/react/24/solid";

import vx01 from "../../../assets/webService/s/01.Ventanas/nova/vn07.jpeg";
import vx02 from "../../../assets/webService/s/01.Ventanas/nova/vn11.jpeg";
import vx03 from "../../../assets/webService/s/01.Ventanas/nova/vn10.jpeg";
import vx04 from "../../../assets/webService/s/01.Ventanas/nova/vn14.jpeg";
import vx05 from "../../../assets/webService/s/01.Ventanas/nova/vn15.jpeg";
import vx06 from "../../../assets/webService/s/01.Ventanas/nova/vx07.jpeg";
import vx07 from "../../../assets/webService/s/01.Ventanas/nova/vn04.jpeg";
import vx08 from "../../../assets/webService/s/01.Ventanas/nova/vn08.jpeg";

import vs01 from "../../../assets/webService/s/01.Ventanas/serie/IMG_0292.jpeg";

const Ventana = () => {
    const [open, setOpen] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true); // Set loading to true whenever the selection changes
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer); // Clear the timer on component unmount or selection change
    }, [open]); // Re-run the effect when 'open' state changes

    const imagesNova = [vx01, vx02, vx03, vx04, vx05, vx06, vx07, vx08];
    const imagesSerie25 = [vs01];

    return (
        <Box display="flex" flexDirection={{ base: "column", md: "row" }}>
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
                    borderColor: "gray.200",
                    boxShadow: "lg",
                }}
            >
                <Box mb={2} p={4}>
                    <Text
                        fontSize="2xl"
                        fontWeight="bold"
                        color={useColorModeValue("gray.700", "gray.200")}
                    >
                        Sistema de Ventanas
                    </Text>
                </Box>
                <Stack spacing={1}>
                    <SidebarItem
                        icon={PaperAirplaneIcon}
                        label="Nova"
                        onClick={() => setOpen(0)}
                        loading={loading}
                    />
                    <SidebarItem
                        icon={PaperAirplaneIcon}
                        label="Serie 25"
                        onClick={() => setOpen(1)}
                        loading={loading}
                    />
                </Stack>
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
                    borderColor: "gray.200",
                    boxShadow: "lg",
                }}
            >
                {open === 0 ? (
                    <Gallery images={imagesNova} loading={loading} />
                ) : (
                    <Gallery images={imagesSerie25} loading={loading} />
                )}
            </Box>
        </Box>
    );
};

export default Ventana;

const Gallery = ({ images, loading }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isMobile] = useMediaQuery("(max-width: 768px)");
    const responsiveColumns = useBreakpointValue({ base: 1, md: 4 });

    const onClose = () => setIsOpen(false);

    return (
        <>
            <Grid templateColumns={`repeat(${responsiveColumns}, 1fr)`} gap={4}>
                {images.map((src, index) => (
                    <GridItem key={index}>
                        {loading ? (
                            <>
                                <Skeleton
                                    w={{ base: "full", md: "18vw" }}
                                    minH={"24vh"}
                                    h={"24vh"}
                                    rounded={"lg"}
                                />
                            </>
                        ) : (
                            <Image
                                src={src}
                                alt={`gallery-${index}`}
                                boxSize="150px"
                                borderRadius="lg"
                                objectFit="cover"
                                w={{ base: "full", md: "18vw" }}
                                minH={"24vh"}
                                h={"24vh"}
                                mb={4}
                                shadow={"base"}
                                cursor={"pointer"}
                                onClick={() => {
                                    setSelectedImage(src);
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
                    size={"xl"}
                >
                    <ModalOverlay backdropFilter="blur(10px)" />
                    <ModalContent>
                        <ModalCloseButton />
                        <Image
                            src={selectedImage}
                            alt={`${selectedImage}`}
                            objectFit="cover"
                            align={"center"}
                            borderRadius="base"
                            shadow={"lg"}
                            maxH={"100vh"}
                        />
                    </ModalContent>
                </Modal>
            )}
        </>
    );
};

const SidebarItem = ({ icon, label, suffix, onClick, loading }) => {
    return (
        <Stack
            direction="row"
            align="center"
            justify="space-between"
            onClick={onClick}
            cursor="pointer"
            p={2}
            rounded={"md"}
            _hover={{
                bg: useColorModeValue("gray.50", "gray.900"),
                color: "red.500",
            }}
            transition={"all .3s ease"}
        >
            <Stack direction="row" align="center" spacing={4}>
                {loading ? (
                    <Skeleton height="20px" width="20px" />
                ) : (
                    <Icon as={icon} w={5} h={5} />
                )}
                <Text transition={"all .2s ease"} fontWeight={500}>
                    {loading ? <Skeleton height="20px" width="60px" /> : label}
                </Text>
            </Stack>
            {suffix}
        </Stack>
    );
};
