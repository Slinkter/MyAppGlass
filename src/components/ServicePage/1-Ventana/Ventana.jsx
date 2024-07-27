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
} from "@chakra-ui/react";
import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
} from "@heroicons/react/24/solid";

const Ventana = () => {
    const [open, setOpen] = React.useState(0);

    const imagesNova = [
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
    ];

    const imagesSerie25 = [
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
    ];

    return (
        <Box display="flex" flexDirection={{ base: "column", md: "row" }}>
            <Box
                m="2rem"
                p={4}
                boxShadow="base"
                bg={useColorModeValue("white", "gray.800")}
                rounded="lg"
                h={{ base: "auto", md: "calc(100vh - 20rem)" }}
                w={{ base: "full", md: "20rem" }}
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
                <Stack spacing={4}>
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
            <Box flex="1" m="2rem" p={4}>
                {open === 0 ? (
                    <Gallery images={imagesNova} columns={3} />
                ) : (
                    <Gallery images={imagesSerie25} columns={4} />
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
        >
            <Stack direction="row" align="center" spacing={4}>
                <Icon as={icon} w={5} h={5} />
                <Text>{label}</Text>
            </Stack>
            {suffix}
        </Stack>
    );
};

const Gallery = ({ images, columns }) => {
    const responsiveColumns = useBreakpointValue({
        base: 1,
        sm: 2,
        md: columns,
    });

    return (
        <Grid templateColumns={`repeat(${responsiveColumns}, 1fr)`} gap={4}>
            {images.map((src, index) => (
                <GridItem key={index}>
                    <Image
                        src={src}
                        alt={`gallery-${index}`}
                        boxSize="150px"
                        objectFit="cover"
                    />
                </GridItem>
            ))}
        </Grid>
    );
};
