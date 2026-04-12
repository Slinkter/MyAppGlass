/**
 * @file StatsSection.jsx
 * @description Sección de estadísticas de impacto con contadores animados al entrar en viewport.
 * @module home/components
 */

import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  VStack,
  SimpleGrid,
} from "@chakra-ui/react";
import { m, animate } from "framer-motion";
import useIntersectionObserver from "@shared/hooks/observers/useIntersectionObserver";

/**
 * @component StatItem
 * @description Un ítem individual de estadística con contador animado.
 * @param {object} props
 * @param {number} props.value - Valor numérico final
 * @param {string} props.suffix - Sufijo del número (ej: "+", "%")
 * @param {string} props.label - Etiqueta descriptiva
 */
const StatItem = React.memo(({ value, suffix = "+", label }) => {
  const [hasStarted, setHasStarted] = useState(false);
  const containerRef = useRef(null);
  const numberRef = useRef(null);

  const textColor = "text.body";
  const accentColor = "text.accent";
  const labelColor = "text.subtle";

  useIntersectionObserver(
    containerRef,
    () => {
      if (!hasStarted) setHasStarted(true);
    },
    { threshold: 0.5 }
  );

  useEffect(() => {
    if (!hasStarted) return;

    // Zero React re-renders: Animating the DOM node directly
    const controls = animate(0, value, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate(v) {
        if (numberRef.current) {
          numberRef.current.textContent = Math.floor(v);
        }
      },
    });

    return () => controls.stop();
  }, [hasStarted, value]);

  return (
    <VStack
      ref={containerRef}
      as={m.div}
      spacing={1}
      align="center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Flex align="baseline" gap={1}>
        <Heading
          ref={numberRef}
          as="p"
          fontSize={{ base: "4xl", md: "5xl", lg: "6xl" }}
          fontWeight="extrabold"
          color={textColor}
          lineHeight={1}
        >
          0
        </Heading>
        <Text
          fontSize={{ base: "2xl", md: "3xl" }}
          fontWeight="bold"
          color={accentColor}
        >
          {suffix}
        </Text>
      </Flex>
      <Text
        fontSize={{ base: "sm", md: "md" }}
        color={labelColor}
        fontWeight="medium"
        textTransform="uppercase"
        letterSpacing="wider"
        textAlign="center"
        maxW="140px"
      >
        {label}
      </Text>
    </VStack>
  );
});

StatItem.displayName = "StatItem";

const STATS = [
  { id: 1, value: 150, suffix: "+", label: "Proyectos Entregados" },
  { id: 2, value: 10,  suffix: "+", label: "Años de Experiencia"  },
  { id: 3, value: 500, suffix: "+", label: "Clientes Satisfechos" },
  { id: 4, value: 100, suffix: "%", label: "Garantía de Calidad"  },
];

/**
 * @component StatsSection
 * @description Sección de métricas de impacto visual que refuerza la credibilidad.
 */
const StatsSection = React.memo(() => {
  const borderColor = "border.default";
  const bg = "bg.section";

  return (
    <Container maxW="7xl" px={{ base: 4, md: 8 }}>
      <Box
        border="1px solid"
        borderColor={borderColor}
        borderRadius="3xl"
        bg={bg}
        py={{ base: 10, md: 16 }}
        px={{ base: 6, md: 16 }}
      >
        <SimpleGrid
          columns={{ base: 2, md: 4 }}
          spacing={{ base: 8, md: 4 }}
          justifyItems="center"
        >
          {STATS.map((stat) => (
            <StatItem
              key={stat.id}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </SimpleGrid>
      </Box>
    </Container>
  );
});

StatsSection.displayName = "StatsSection";
export default StatsSection;
