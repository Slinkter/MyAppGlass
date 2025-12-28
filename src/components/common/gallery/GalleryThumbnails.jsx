import React from "react";
import PropTypes from "prop-types";
import { Box, Flex, Image, useColorModeValue } from "@chakra-ui/react";

const GalleryThumbnails = ({ images, selectedIndex, setSelectedIndex }) => {
    const activeBorderColor = useColorModeValue("primary.500", "primary.300");

    return (
        <Flex
            direction={{ base: "row", md: "column" }}
            gap={{ base: 2, md: 2 }}
            w={{ base: "100%", md: "100px", lg: "100px" }}
            h={{ base: "60px", sm: "70px", md: "100%" }}
            minW={0}
            maxW="100%"
            scrollBehavior="smooth"
            overflowX={{ base: "auto", md: "hidden" }}
            overflowY={{ base: "hidden", md: "scroll" }}
        >
            {images.map((img, index) => (
                <Box
                    key={img.id}
                    flexShrink={0}
                    w={{ base: "60px", sm: "70px", md: "90%" }}
                    h={{ base: "100%", md: "80px", lg: "90px" }}
                    cursor="pointer"
                    borderRadius={{ base: "lg", md: "lg" }}
                    borderColor={
                        selectedIndex === index
                            ? "transparent"
                            : activeBorderColor
                    }
                    transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                    onClick={() => setSelectedIndex(index)}
                    position="relative"
                    overflow="hidden"
                    _hover={{
                        borderColor: activeBorderColor,
                        boxShadow: "lg",
                        border: "1px solid",
                    }}
                >
                    <Image
                        w="100%"
                        h="100%"
                        src={img.image}
                        overflow="hidden"
                        alt={`Miniatura ${index + 1}`}
                        objectFit="cover"
                        loading="lazy"
                        opacity={selectedIndex === index ? 1 : 0.5}
                        transition="opacity 0.3s ease"
                        _hover={{ opacity: 1 }}
                    />
                </Box>
            ))}
        </Flex>
    );
};

GalleryThumbnails.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            image: PropTypes.string.isRequired,
            name: PropTypes.string,
        })
    ).isRequired,
    selectedIndex: PropTypes.number.isRequired,
    setSelectedIndex: PropTypes.func.isRequired,
};

export default GalleryThumbnails;
