// Layout.jsx
import React from "react";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import FloatWhatsapp from "./FloatWhatsapp";

const Layout = ({ children }) => {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
            <FloatWhatsapp />
        </>
    );
};

export default Layout;
