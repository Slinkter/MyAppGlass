import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { Box } from "@chakra-ui/react";

// Crear componente Box animado con Framer Motion
const MotionBox = motion(Box);

/**
 * @component ScrollReveal
 * @description Envoltorio que anima sus hijos cuando entran en el viewport (Fade Up).
 * Utiliza Framer Motion para un rendimiento óptimo.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Elementos a animar.
 * @param {number} [props.delay=0] - Retraso en segundos antes de iniciar la animación.
 * @param {number} [props.duration=0.5] - Duración de la animación en segundos.
 * @param {string} [props.width="100%"] - Ancho del contenedor.
 * @param {number} [props.yOffset=30] - Distancia en píxeles desde donde inicia el movimiento vertical.
 * @returns {JSX.Element} Contenedor animado.
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
