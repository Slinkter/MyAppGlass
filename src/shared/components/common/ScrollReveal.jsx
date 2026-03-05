/**
 * @file ScrollReveal.jsx
 * @description Animation wrapper that reveals content as it enters the viewport using staggered fade-ups.
 * @module shared/components
 */

import React from "react";
import PropTypes from "prop-types";
import { m } from "framer-motion";
import { Box } from "@chakra-ui/react";

/**
 * @component ScrollReveal
 * @description Envoltorio que anima sus hijos cuando entran en el viewport (Fade Up).
 * Utiliza Framer Motion con LazyMotion para un rendimiento óptimo.
 */
const ScrollReveal = ({
  children,
  delay = 0,
  duration = 0.5,
  width = "100%",
  yOffset = 30,
}) => {
  return (
    <Box
      as={m.div}
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }} // Se anima una vez cuando entra en -50px del viewport
      transition={{ duration, delay, ease: "easeOut" }}
      w={width}
    >
      {children}
    </Box>
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
