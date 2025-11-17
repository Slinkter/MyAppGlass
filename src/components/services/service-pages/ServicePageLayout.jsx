import React from "react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Box, Stack, Heading, useColorModeValue } from "@chakra-ui/react";
import SidebarItem from "@/components/common/SidebarItem";
import Gallery from "@/components/common/Gallery";

/**
 * Layout reutilizable para las páginas de cada servicio.
 * Organiza el contenido en una barra lateral (Sidebar) para la navegación y las características,
 * y una galería principal para mostrar las imágenes del servicio seleccionado.
 *
 * @param {{ pageData: object }} props - Props del componente.
 * @param {object} props.pageData - Objeto que contiene toda la información de la página, incluyendo SEO, sistemas, características y listas de imágenes.
 * @returns {JSX.Element}
 */
const ServicePageLayout = ({ pageData }) => {
    const { seo, systems, features, imageLists } = pageData;
    const [activeIndex, setActiveIndex] = useState(0);

    // Selecciona la lista de imágenes basada en el índice activo
    const activeImageList = imageLists[activeIndex] || [];

    return (
        <>
            <Helmet>
                <title>{seo.title}</title>
                <meta name="description" content={seo.description} />
            </Helmet>
            <Box
                display="flex"
                flexDirection={{ base: "column", md: "row" }}
                justifyContent={{ base: "", md: "center" }}
                p={{ base: 4, md: 8 }}
                gap={6}
            >
                {/* 1. Sidebar */}
                <RenderSidebar
                    title={seo.title}
                    systems={systems}
                    features={features}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                />
                {/* 2. Galería */}
                <RenderGallery imageList={activeImageList} />
            </Box>
        </>
    );
};

const RenderSidebar = (props) => {
    const { title, systems, features, setActiveIndex, activeIndex } =
        props;
    const bgColor = useColorModeValue("rgba(255, 255, 255, 0.25)", "rgba(0, 0, 0, 0.25)");
    const borderColor = useColorModeValue("rgba(255, 255, 255, 0.35)", "rgba(255, 255, 255, 0.15)");
    const textColor = useColorModeValue("gray.800", "gray.100");

    return (
        <Box
            bg={bgColor}
            backdropFilter="blur(20px)"
            border="1px solid"
            borderColor={borderColor}
            boxShadow="0 4px 30px rgba(0,0,0,0.1)"
            borderRadius="2xl"
            transition="all 0.3s ease"
            color={textColor}
            minW={{ base: "full", md: "16vw", lg: "16vw" }}
            h={{ base: "auto", md: "85vh" }}
            p={4}
        >
            <Box mb={6}>
                <Heading as="h3" size="lg" mb={4} p={2}>
                    {title}
                </Heading>
                <Stack spacing={1}>
                    {systems.map((item, index) => (
                        <SidebarItem
                            key={item.label}
                            icon={item.icon}
                            label={item.label}
                            isActive={activeIndex === index}
                            onClick={() => setActiveIndex(index)}
                        />
                    ))}
                </Stack>
            </Box>

            {features && features.length > 0 && (
                <Box display={{ base: "none", md: "block" }}>
                    <Heading as="h3" size="lg" mb={4} p={2}>
                        Características
                    </Heading>
                    <Stack spacing={1}>
                        {features.map((item, index) => (
                            <SidebarItem
                                key={index}
                                label={item.label}
                                icon={item.icon}
                            />
                        ))}
                    </Stack>
                </Box>
            )}
        </Box>
    );
};

const RenderGallery = ({ imageList }) => {
    const bgColor = useColorModeValue("rgba(255, 255, 255, 0.25)", "rgba(0, 0, 0, 0.25)");
    const borderColor = useColorModeValue("rgba(255, 255, 255, 0.35)", "rgba(255, 255, 255, 0.15)");
    const textColor = useColorModeValue("gray.800", "gray.100");

    return (
        <Box
            bg={bgColor}
            backdropFilter="blur(20px)"
            border="1px solid"
            borderColor={borderColor}
            boxShadow="0 4px 30px rgba(0,0,0,0.1)"
            borderRadius="2xl"
            transition="all 0.3s ease"
            color={textColor}
            w={{ base: "full", md: "64vw" }}
            h={{ base: "auto", md: "85vh" }}
            p={4}
            overflowY="auto"
        >
            <Gallery images={imageList} />
        </Box>
    );
};

export default ServicePageLayout;