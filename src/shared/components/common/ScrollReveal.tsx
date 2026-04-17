/**
 * @file ScrollReveal.tsx
 * @description Animation wrapper that reveals content as it enters the viewport using staggered fade-ups.
 * @module shared/components
 */

import React from "react";
import { motion } from "framer-motion";
import { Box } from "@chakra-ui/react";

// Crear componente Box animado con Framer Motion
const MotionBox = motion.create(Box);

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  width?: string | number;
  yOffset?: number;
}

/**
 * @component ScrollReveal
 * @description Envoltorio que anima sus hijos cuando entran en el viewport (Fade Up).
 * Utiliza Framer Motion para un rendimiento óptimo.
 *
 * @param {ScrollRevealProps} props - Propiedades del componente.
 * @returns {JSX.Element} Contenedor animado.
 *
 * @example
 * // Ejemplo de uso con un retraso y duración personalizados
 * <ScrollReveal delay={0.2} duration={0.8} yOffset={50}>
 *   <Text>Este texto aparecerá suavemente con un retraso y una duración extendida.</Text>
 * </ScrollReveal>
 */
const ScrollReveal: React.FC<ScrollRevealProps> = ({
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

export default ScrollReveal;
