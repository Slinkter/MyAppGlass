import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Box, Stack, useColorModeValue, Heading } from "@chakra-ui/react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/solid";
import { listMampara } from "../../../assets/webService/s/02.Mampara/db_mampara";
import Gallery from "../../Gallery";
import SidebarItem from "../../SidebarItem";

const Mampara = () => {
    const [open, setOpen] = useState(0);
    const colorWhite = "gray.200";
    const colorBlack = "blackAlpha.500";

    const renderList = open === 0 ? listMampara.nova : listMampara.serie;

    const type = {
        label: "Mamparas",
        content:
            "Separador de area o espacio , perfectas divisiones de oficina. Sistemas Nova y Serie 25.",
    };

    const typeSystem = [
        { label: "Sistema Nova ", icon: ChevronRightIcon },
        { label: "Sistema Serie 25", icon: ChevronRightIcon },
    ];

    const caracteristicas = [
        { label: "Color: Incoloro , Bronce ", icon: CheckIcon },
        { label: "Tipo: Templado , Crudo", icon: CheckIcon },
        { label: "Aluminio: Natural , Negro", icon: CheckIcon },
        { label: "Diseño: Lámina , Logo", icon: CheckIcon },
        { label: "Espesor: 8mm , 10mm", icon: CheckIcon },
    ];

    const bgTheme = useColorModeValue(colorWhite, colorBlack);

    return (
        <>
            <Helmet>
                <title>{type.label}</title>
                <meta name="description" content={type.content} />
            </Helmet>
            <Box
                display="flex"
                flexDirection={{ base: "column", md: "row" }}
                justifyContent={{ base: "", md: "center" }}
                alignItems={{ base: "stretch", md: "center" }}
                p={{ base: 4, md: 8 }}
                gap={6}
            >
                {/* // 1.Sidebar */}
                <RenderSidebear
                    type={type}
                    typeSystem={typeSystem}
                    list={caracteristicas}
                    setOpen={setOpen}
                    bgTheme={bgTheme}
                    open={open}
                />
                {/* // 2.Galería */}
                <RenderGallery bgTheme={bgTheme} renderList={renderList} />
            </Box>
        </>
    );
};

export default Mampara;

const RenderSidebear = ({ type, typeSystem, list, setOpen, bgTheme, open }) => {
    return (
        <Box
            bg={bgTheme}
            w={{ base: "full", md: "30vw", lg: "16vw", xl: "16vw" }}
            h={{ base: "auto", md: "85vh" }}
            p={4}
            rounded="xl"
            shadow="xl"
            _hover={{
                boxShadow: "md",
                borderColor: "gray.900",
            }}
        >
            <Box mb={6}>
                <Heading as="h3" size="lg" mb={4} p={2}>
                    {type.label}
                </Heading>
                <Stack spacing={1}>
                    {typeSystem.map((item, index) => (
                        <SidebarItem
                            key={item.label}
                            icon={item.icon}
                            label={item.label}
                            isActive={open === index}
                            onClick={() => setOpen(index)}
                        />
                    ))}
                </Stack>
            </Box>

            <Box
                display={{
                    base: "none",
                    md: "block",
                }}
            >
                <Heading as="h3" size="lg" mb={4} p={2}>
                    Características
                </Heading>
                <Stack spacing={1}>
                    {list.map((item, index) => (
                        <SidebarItem
                            key={index}
                            label={item.label}
                            icon={item.icon}
                        />
                    ))}
                </Stack>
            </Box>
        </Box>
    );
};

const RenderGallery = ({ bgTheme, renderList }) => {
    return (
        <Box
            bg={bgTheme}
            w={{ base: "full", md: "30vw", lg: "64vw", xl: "64vw" }}
            h={{ base: "auto", md: "85vh" }}
            p={4}
            rounded="xl"
            shadow="xl"
            _hover={{
                boxShadow: "md",
                borderColor: "gray.300",
            }}
            overflowY="auto" // Permite scroll si el contenido es muy largo
        >
            <Gallery images={renderList} />
        </Box>
    );
};
