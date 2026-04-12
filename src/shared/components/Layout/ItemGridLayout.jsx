import React from "react";
import { Container, Heading, useColorModeValue, SimpleGrid, VStack, Box } from "@chakra-ui/react";
import { m } from "framer-motion";
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
              display="block"
            >
              {title}
            </Heading>
          </VStack>

          <SimpleGrid
            as={m.div}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            columns={columns}
            spacing={{ base: 4, md: spacing }}
            w="full"
            justifyItems="center"
          >
            {children}
          </SimpleGrid>
        </VStack>
      </Container>
    </>
  );
};

/**
 * @component ItemGridItem
 * @description Wrapper animado para cada item de la grilla.
 * @remarks
 * La virtualización DOM per-item fue eliminada para resolver una condición de carrera
 * entre el IntersectionObserver del item y el infinite scroll del padre (ServiceList/ProjectsList).
 * El control de cuántos items se montan en el DOM lo gestiona el componente padre mediante `displayCount`.
 */
const ItemGridItem = ({ children, delay = 0 }) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        delay,
      },
    },
  };

  return (
    <Box
      as={m.div}
      variants={itemVariants}
      w="full"
      minH={{ base: "280px", md: "420px" }}
    >
      {children}
    </Box>
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
  delay: PropTypes.number,
};

export default ItemGridLayout;
