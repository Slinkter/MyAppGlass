/**
 * @file HelmetWrapper.jsx
 * @description SEO orchestrator component that manages document metadata and Open Graph tags.
 * @module shared/components
 * @remarks
 * Encapsulates the SEO strategy for the application, providing sensible defaults while allowing per-page overrides.
 */

import React from "react";
import { Helmet } from "react-helmet-async";

/**
 * @component HelmetWrapper
 * @description Wrapper reutilizable para gestionar metaetiquetas SEO críticas
 * usando `react-helmet-async`.
 * Establece valores predeterminados optimizados para títulos, descripciones y URLs canónicas,
 * permitiendo sobrescribirlos vía props. También incluye etiquetas Open Graph esenciales.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {string} [props.title] - Título específico para la página.
 * @param {string} [props.description] - Descripción meta específica para la página.
 * @param {string} [props.canonicalUrl] - URL canónica absoluta para la página.
 * @param {React.ReactNode} [props.children] - Permite pasar etiquetas helmet adicionales como hijos.
 * @returns {JSX.Element} Contenedor Helmet configurado.
 */
const HelmetWrapper = ({ title, description, canonicalUrl, children }) => {
  // --- SEO Strategy: Defaults optimized for Local SEO ---
  const siteName = "GYA Company";
  const defaultTitle = `Vidriería y Servicios en La Molina | ${siteName}`; // 50 chars
  const defaultDescription =
    "vidriería en La Molina. Ofrecemos completos servicios de instalación y fabricación para ventanas, mamparas y más. ¡Cotiza tu proyecto hoy!"; // 158 chars
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
