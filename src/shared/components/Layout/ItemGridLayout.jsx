import React from "react";
import {
  Container,
  Heading,
  Text,
  useColorModeValue,
  SimpleGrid,
  VStack,
  Box,
} from "@chakra-ui/react";
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
  subtitle,
  children,
  seoTitle,
  seoDescription,
  seoCanonicalUrl,
  columns = { base: 1, md: 2, lg: 3 },
  spacing = 10,
  containerProps = EMPTY_OBJ,
}) => {
  const headingColor = "text.accent";
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
      <Container maxW={"7xl"} textAlign="center" mt={{ base: 10, md: 16 }} {...containerProps}>
        <VStack spacing={{ base: 10, md: 12 }} w="full">
          {/* Cabecera */}
          <VStack spacing={3}>
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
              mt={2}
              mb={1}
              display="block"
            >
              {title}
            </Heading>
            {subtitle && (
              <Text
                color="text.muted"
                fontSize={{ base: "md", md: "lg" }}
                maxW="2xl"
                mx="auto"
              >
                {subtitle}
              </Text>
            )}
          </VStack>

          <SimpleGrid
            as={m.div}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            columns={columns}
            spacing={{ base: 10, md: spacing }}
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
      minH={{ base: "320px", md: "460px" }}
    >
      {children}
    </Box>
  );
};

ItemGridLayout.Item = ItemGridItem;

ItemGridLayout.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
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
