import React from "react";
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
    useMediaQuery,
} from "@chakra-ui/react";
import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
} from "@heroicons/react/24/solid";

const Ventana = () => {
    const [open, setOpen] = React.useState(0);

    const imagesNova = [
        "https://gyacompany.com/static/media/vn10.7451a921c216b3ce59d4.jpeg",
        "https://gyacompany.com/static/media/vn10.7451a921c216b3ce59d4.jpeg",
        "https://gyacompany.com/static/media/vn10.7451a921c216b3ce59d4.jpeg",
        "https://gyacompany.com/static/media/vn10.7451a921c216b3ce59d4.jpeg",
        "https://gyacompany.com/static/media/vn10.7451a921c216b3ce59d4.jpeg",
        "https://gyacompany.com/static/media/vn10.7451a921c216b3ce59d4.jpeg",
        "https://gyacompany.com/static/media/vn10.7451a921c216b3ce59d4.jpeg",
        "https://gyacompany.com/static/media/vn10.7451a921c216b3ce59d4.jpeg",
        "https://gyacompany.com/static/media/vn10.7451a921c216b3ce59d4.jpeg",
    ];

    const imagesSerie25 = [
        "https://gyacompany.com/static/media/IMG_0294.ea32b5e568bcfdfb6c73.jpeg",
        "https://gyacompany.com/static/media/IMG_0300.3cb7bb3eb14e3c836156.jpeg",
        "https://gyacompany.com/static/media/IMG_0300.3cb7bb3eb14e3c836156.jpeg",
        "https://gyacompany.com/static/media/IMG_0294.ea32b5e568bcfdfb6c73.jpeg",
        "https://gyacompany.com/static/media/IMG_0300.3cb7bb3eb14e3c836156.jpeg",
        "https://gyacompany.com/static/media/IMG_0300.3cb7bb3eb14e3c836156.jpeg",
        "https://gyacompany.com/static/media/IMG_0294.ea32b5e568bcfdfb6c73.jpeg",
        "https://gyacompany.com/static/media/IMG_0300.3cb7bb3eb14e3c836156.jpeg",
        "https://gyacompany.com/static/media/IMG_0300.3cb7bb3eb14e3c836156.jpeg",
        "https://gyacompany.com/static/media/IMG_0294.ea32b5e568bcfdfb6c73.jpeg",
        "https://gyacompany.com/static/media/IMG_0300.3cb7bb3eb14e3c836156.jpeg",
        "https://gyacompany.com/static/media/IMG_0300.3cb7bb3eb14e3c836156.jpeg",
    ];

    return (
        <Box display="flex" flexDirection={{ base: "column", md: "row" }}>
            <Box
                ml="2rem"
                mt="2rem"
                mr={{ base: "2rem", md: "2rem" }}
                p={4}
                boxShadow="lg"
                bg={useColorModeValue("white", "gray.800")}
                rounded="md"
                h={{ base: "auto", md: "80vh" }}
                w={{ base: "full-20rem", md: "15rem" }}
                border={"1px solid "}
                borderColor={"red.100"}
                _hover={{
                    borderColor: "red.500",
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
                        icon={PresentationChartBarIcon}
                        label="Nova"
                        onClick={() => setOpen(0)}
                    />
                    <SidebarItem
                        icon={ShoppingBagIcon}
                        label="Serie 25"
                        onClick={() => setOpen(1)}
                    />
                </Stack>
            </Box>
            <Box
                flex="1"
                m="2rem"
                p={4}
                boxShadow="lg"
                bg={useColorModeValue("white", "gray.800")}
                rounded="lg"
                h={{ base: "auto", md: "80vh" }}
            >
                {open === 0 ? (
                    <Gallery images={imagesNova} columns={6} />
                ) : (
                    <Gallery images={imagesSerie25} columns={6} />
                )}
            </Box>
        </Box>
    );
};

export default Ventana;

const SidebarItem = ({ icon, label, suffix, onClick }) => {
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
            transition={"all .3 ease"}
        >
            <Stack direction="row" align="center" spacing={4}>
                <Icon as={icon} w={5} h={5} />
                <Text transition={"all .2 ease"} fontWeight={500}>
                    {label}
                </Text>
            </Stack>
            {suffix}
        </Stack>
    );
};

const Gallery = ({ images, columns }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [isMobile] = useMediaQuery("(max-width: 768px)");
    const responsiveColumns = useBreakpointValue({
        base: 1,
        sm: 2,
        md: columns,
    });

    const onClose = () => setIsOpen(false);

    return (
        <>
            <Grid
                templateColumns={`repeat(${responsiveColumns}, 1fr)`}
                gap={4}
                transition={"all .6 ease"}
            >
                {images.map((src, index) => (
                    <GridItem key={index} transition={"all .6 ease"}>
                        <Image
                            transition={"all .6 ease"}
                            src={src}
                            alt={`gallery-${index}`}
                            boxSize="150px"
                            borderRadius="lg"
                            objectFit="cover"
                            w="full"
                            h={{ base: "380px", md: "180px" }}
                            mb={4}
                            shadow={"base"}
                            cursor={"pointer"}
                            onClick={() => {
                                setSelectedImage(src);
                                setIsOpen(true);
                            }}
                        />
                    </GridItem>
                ))}
            </Grid>

            {!isMobile && (
                <Modal isOpen={isOpen} onClose={onClose} size="lg">
                    <ModalOverlay />
                    <ModalContent>
                        <ModalCloseButton />
                        <Image
                            src={selectedImage}
                            alt=""
                            maxH="80vh"
                            objectFit="cover"
                            align={"center"}
                            borderRadius="base"
                            shadow={"lg"}
                        />
                    </ModalContent>
                </Modal>
            )}
        </>
    );
};
