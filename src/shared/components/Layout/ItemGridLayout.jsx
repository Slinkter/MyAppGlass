import React from "react";
import { Container, Heading, useColorModeValue, SimpleGrid, VStack, Box } from "@chakra-ui/react";
import { LazyMotion, m, domAnimation } from "framer-motion";
import HelmetWrapper from "@shared/components/HelmetWrapper";
import PropTypes from "prop-types";

const EMPTY_OBJ = {};

/**
 * Componente: ItemGridLayout
 * --------------------------------------------------------------------
 * @description
 * Un layout reutilizable para mostrar colecciones de elementos.
 * Refactorizado para usar Patrón de Composición (Compound Components).
 */
const ItemGridLayout = ({
  title,
  children,
  seoTitle,
  seoDescription,
  seoCanonicalUrl,
  columns = { base: 1, md: 2, lg: 3 },
  spacing = 10,
  containerProps = EMPTY_OBJ,
}) => {
  const headingColor = useColorModeValue("primary.700", "primary.300");
  const borderColor = useColorModeValue("primary.500", "primary.300");

  /**
   * Animation Variants
   */
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  return (
    <>
      <HelmetWrapper
        title={seoTitle}
        description={seoDescription}
        canonicalUrl={seoCanonicalUrl}
      />
      <Container maxW={"7xl"} textAlign="center" mt={6} {...containerProps}>
        <VStack spacing={6} w="full">
          {/* Cabecera */}
          <VStack spacing={2}>
            <Heading
              as="h2"
              color={headingColor}
              fontSize={{ base: "3xl", md: "4xl" }}
              textTransform="uppercase"
              fontWeight={600}
              letterSpacing="wide"
              textAlign="center"
              borderBottom="4px"
              borderColor={borderColor}
              width="fit-content"
              mx="auto"
              my={2}
              display={{ base: "block", md: "none" }}
            >
              {title}
            </Heading>
          </VStack>

          {/* Grilla de Contenido Animada */}
          <LazyMotion features={domAnimation}>
          <SimpleGrid
            as={m.div}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            columns={columns}
            spacing={{ base: 4, md: spacing }}
            w="full"
            justifyItems="center"
          >
            {children}
          </SimpleGrid>
          </LazyMotion>
        </VStack>
      </Container>
    </>
  );
};

import useIntersectionObserver from "@shared/hooks/observers/useIntersectionObserver";

const ItemGridItem = ({ children }) => {
  const itemRef = React.useRef(null);
  // Carga el contenido real solo si está a 1000px de distancia
  const isNearViewport = useIntersectionObserver(itemRef, {
    rootMargin: "1000px",
    threshold: 0.01,
  });

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <LazyMotion features={domAnimation}>
      <Box 
        ref={itemRef}
        as={m.div} 
        variants={itemVariants} 
        w="full"
        minH={{ base: "280px", md: "420px" }}
        /* Aura Virtualization: skips rendering for off-screen items */
        sx={{
          contentVisibility: "auto",
          containIntrinsicSize: { base: "280px", md: "420px" },
        }}
      >
        {isNearViewport ? children : null}
      </Box>
    </LazyMotion>
  );
};

ItemGridLayout.Item = ItemGridItem;

ItemGridLayout.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  seoTitle: PropTypes.string.isRequired,
  seoDescription: PropTypes.string.isRequired,
  seoCanonicalUrl: PropTypes.string.isRequired,
  columns: PropTypes.object,
  spacing: PropTypes.number,
  containerProps: PropTypes.object,
};

ItemGridItem.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ItemGridLayout;
