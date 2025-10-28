// Layout.jsx
import React, { memo } from "react";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import FloatWhatsapp from "./FloatWhatsapp";

const Layout = memo(function Layout({ children }) {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
            <FloatWhatsapp />
        </>
    );
});

export default Layout;
