import React from "react";
import { Box } from "@chakra-ui/react";

/**
 * Componente Base para Tarjetas de Vidrio (Glassmorphism)
 * @param {Object} props
 * @param {Object} props.styles - Objeto de estilos proveniente de useGlassStyles
 * @param {React.ReactNode} props.children - Contenido de la tarjeta
 */
const GlassCard = ({ children, styles, ...props }) => (
  <Box
    bg={styles.bg}
    backdropFilter="blur(20px)"
    borderRadius={{ base: "2xl", md: "3xl" }}
    border="1px solid"
    borderColor={styles.border}
    boxShadow={{ base: "xl", md: "2xl" }}
    p={{ base: 4, md: 6 }}
    transition="all 0.3s ease"
    {...props}
  >
    {children}
  </Box>
);

export default GlassCard;
