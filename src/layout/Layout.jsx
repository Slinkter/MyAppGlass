// Layout.jsx

import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { Box, Flex } from "@chakra-ui/react";

const Layout = ({ children }) => {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    );
};

export default Layout;
