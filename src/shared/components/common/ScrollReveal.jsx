/**
 * @file ScrollReveal.jsx
 * @description Animation wrapper that reveals content as it enters the viewport using staggered fade-ups.
 * @module shared/components
 */

import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { Box } from "@chakra-ui/react";

// Crear componente Box animado con Framer Motion
const MotionBox = motion.create(Box);

/**
 * @component ScrollReveal
 * @description Envoltorio que anima sus hijos cuando entran en el viewport (Fade Up).
 * Utiliza Framer Motion para un rendimiento óptimo.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Elementos a animar.
 * @param {number} [props.delay=0] - Retraso en segundos antes de iniciar la animación de entrada.
 * @param {number} [props.duration=0.5] - Duración de la animación de entrada en segundos.
 * @param {string} [props.width="100%"] - Ancho del contenedor.
 * @param {number} [props.yOffset=30] - Distancia en píxeles desde donde inicia el movimiento vertical para la animación de entrada.
 * @returns {JSX.Element} Contenedor animado.
 *
 * @example
 * // Ejemplo de uso con un retraso y duración personalizados
 * <ScrollReveal delay={0.2} duration={0.8} yOffset={50}>
 *   <Text>Este texto aparecerá suavemente con un retraso y una duración extendida.</Text>
 * </ScrollReveal>
 *
 * @example
 * // Ejemplo de uso básico
 * <ScrollReveal>
 *   <Heading>Contenido que se revela al hacer scroll</Heading>
 * </ScrollReveal>
 */
const ScrollReveal = ({
  children,
  delay = 0,
  duration = 0.5,
  width = "100%",
  yOffset = 30,
}) => {
  return (
    <MotionBox
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }} // Se anima una vez cuando entra en -50px del viewport
      transition={{ duration, delay, ease: "easeOut" }}
      width={width}
    >
      {children}
    </MotionBox>
  );
};

ScrollReveal.propTypes = {
  children: PropTypes.node.isRequired,
  delay: PropTypes.number,
  duration: PropTypes.number,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  yOffset: PropTypes.number,
};

export default ScrollReveal;
