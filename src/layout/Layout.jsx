import React from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";
import Navbar from "./common/Navbar";
import Footer from "./common/Footer";
import FloatWhatsapp from "./floating-whatsapp";

import bg_mainland from "../assets/common/mainland.jpg"; // Corrected import the background image

const Layout = ({ children }) => {
    const overlayColor = useColorModeValue("rgba(255,255,255,0.6)", "rgba(0,0,0,0.6)"); // Semi-transparent overlay

    return (
        <Box
            // minH="100vh" // Removed minH
            backgroundImage={`url(${bg_mainland})`}
            backgroundSize="cover"
            backgroundPosition="center"
            backgroundAttachment="fixed"
            position="relative"
            _before={{
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                bg: overlayColor,
                zIndex: 0,
                width: "100%", // Ensure it covers the full width
                height: "100%", // Ensure it covers the full height
            }}
        >
            <Box maxW="7xl" mx="auto" px={{ base: 4, md: 8 }} position="relative" zIndex={1}>
                <Navbar />
                <main>{children}</main>
                <Footer />
            </Box>
            <FloatWhatsapp />
        </Box>
    );
};

export default Layout;