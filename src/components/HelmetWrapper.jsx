import { Helmet } from "react-helmet-async";
import React from "react";

const HelmetWrapper = ({ title, description, canonicalUrl, children }) => {
    const defaultTitle = "Vidriería y Servicios en La Molina - GYA Company";
    const defaultDescription = "GYA Company: Expertos en vidriería y aluminio. Ofrecemos servicios de instalación y fabricación de ventanas, mamparas, duchas y más en La Molina.";
    const defaultCanonicalUrl = "https://www.gyacompany.com"; // Placeholder, replace with actual base URL

    return (
        <Helmet>
            <title>{title || defaultTitle}</title>
            <meta name="description" content={description || defaultDescription} />
            {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
            {!canonicalUrl && <link rel="canonical" href={defaultCanonicalUrl} />}
            {children}
        </Helmet>
    );
};

export default HelmetWrapper;
