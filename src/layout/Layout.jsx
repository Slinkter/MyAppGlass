// Layout.jsx
import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
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
