import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Box, Stack, useColorModeValue, Heading } from "@chakra-ui/react";
import SidebarItem from "../../SidebarItem";
import Gallery from "../../Gallery";

const ServicePageLayout = ({ pageData }) => {
    const { seo, systems, features, imageLists } = pageData;
    const [activeIndex, setActiveIndex] = useState(0);

    const colorWhite = "gray.200";
    const colorBlack = "blackAlpha.500";
    const bgTheme = useColorModeValue(colorWhite, colorBlack);

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
                    bgTheme={bgTheme}
                    setActiveIndex={setActiveIndex}
                    activeIndex={activeIndex}
                />
                {/* 2. Galería */}
                <RenderGallery bgTheme={bgTheme} imageList={activeImageList} />
            </Box>
        </>
    );
};

const RenderSidebar = ({
    title,
    systems,
    features,
    setActiveIndex,
    bgTheme,
    activeIndex,
}) => {
    return (
        <Box
            bg={bgTheme}
            minW={{ base: "full", md: "16vw", lg: "16vw" }}
            h={{ base: "auto", md: "85vh" }}
            p={4}
            rounded="xl"
            shadow="xl"
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

const RenderGallery = ({ bgTheme, imageList }) => {
    return (
        <Box
            bg={bgTheme}
            w={{ base: "full", md: "64vw" }}
            h={{ base: "auto", md: "85vh" }}
            p={4}
            rounded="xl"
            shadow="xl"
            overflowY="auto"
        >
            <Gallery images={imageList} />
        </Box>
    );
};

export default ServicePageLayout;
