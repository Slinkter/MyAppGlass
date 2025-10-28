import React from "react";
import { Helmet } from "react-helmet-async";

/**
 * @component HelmetWrapper
 * @description A reusable wrapper to manage and apply crucial SEO meta tags
 * to any page using `react-helmet-async`. It sets optimized defaults for titles,
 * descriptions, and canonical URLs, while allowing overrides via props. It also
 * includes essential Open Graph tags for social media sharing.
 *
 * @param {{ 
 *   title?: string, 
 *   description?: string, 
 *   canonicalUrl?: string, 
 *   children?: React.ReactNode 
 * }} props - The props for the component.
 * @param {string} [props.title] - The specific title for the page.
 * @param {string} [props.description] - The specific meta description for the page.
 * @param {string} [props.canonicalUrl] - The absolute canonical URL for the page.
 * @param {React.ReactNode} [props.children] - Allows for additional helmet tags to be passed as children.
 * @returns {JSX.Element}
 */
const HelmetWrapper = ({ title, description, canonicalUrl, children }) => {
    // --- SEO Strategy: Defaults optimized for Local SEO ---
    const siteName = "GYA Company";
    const defaultTitle = `Vidriería y Servicios en La Molina | ${siteName}`; // 50 chars
    const defaultDescription = "Expertos en vidriería en La Molina. Ofrecemos completos servicios de instalación y fabricación para ventanas, mamparas y más. ¡Cotiza tu proyecto hoy!"; // 158 chars
    const defaultCanonicalUrl = "https://www.gyacompany.com";

    // --- Final values to be rendered ---
    const finalTitle = title || defaultTitle;
    const finalDescription = description || defaultDescription;
    const finalCanonicalUrl = canonicalUrl || defaultCanonicalUrl;

    return (
        <Helmet>
            {/* --- Standard SEO Tags --- */}
            <title>{finalTitle}</title>
            <meta name="description" content={finalDescription} />
            <link rel="canonical" href={finalCanonicalUrl} />

            {/* --- Open Graph Tags for Social Media --- */}
            <meta property="og:title" content={finalTitle} />
            <meta property="og:description" content={finalDescription} />
            <meta property="og:url" content={finalCanonicalUrl} />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content={siteName} />

            {/* --- Allow for additional custom tags --- */}
            {children}
        </Helmet>
    );
};

export default HelmetWrapper;

