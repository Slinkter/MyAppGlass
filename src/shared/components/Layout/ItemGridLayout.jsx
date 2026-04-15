import React from "react";
import { Container, Heading, Text, SimpleGrid, VStack, Box } from "@chakra-ui/react";

import HelmetWrapper from "@shared/components/HelmetWrapper";
import PropTypes from "prop-types";

const EMPTY_OBJ = {};

import { motion } from "framer-motion";

/**
 * Componente: ItemGridLayout
 * --------------------------------------------------------------------
 * @description
 * Un layout reutilizable para mostrar colecciones de elementos.
 * Refactored for a cleaner, more minimalist UI (Underline removed).
 */
const ItemGridLayout = ({
  title,
  subtitle,
  children,
  seoTitle,
  seoDescription,
  seoCanonicalUrl,
  columns = { base: 1, md: 2, lg: 3 },
  gap = { base: "phi_md", md: "phi_lg" },
  containerProps = EMPTY_OBJ,
}) => {
  /**
   * Animation Variants
   */
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  return (
    <>
      <HelmetWrapper
        title={seoTitle}
        description={seoDescription}
        canonicalUrl={seoCanonicalUrl}
      />
      <Container 
        maxW="7xl" 
        textAlign="center" 
        mt={{ base: "phi_lg", md: "phi_2xl" }}
        {...containerProps}
      >
        <VStack gap={{ base: "phi_md", md: "phi_xl" }} w="full">
          {/* Header Section - Underline Removed for a cleaner look */}
          <VStack gap="phi_xs">
            <Heading
              as="h2"
              color="text.accent"
              fontSize={{ base: "3xl", md: "5xl" }}
              fontWeight="900"
              letterSpacing="0.2em"
              textAlign="center"
              textTransform="uppercase"
              position="relative"
              pb="phi_xs"
            >
              {title}
            </Heading>
            {subtitle && (
              <Text
                color="text.body"
                fontSize={{ base: "md", md: "xl" }}
                fontWeight="500"
                maxW="3xl"
                mx="auto"
                mt={{ base: "phi_sm", md: "phi_md" }}
                lineHeight="tall"
              >
                {subtitle}
              </Text>
            )}
          </VStack>

          <SimpleGrid
            as={motion.div}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            columns={columns}
            gap={gap}
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

const ItemGridItem = ({ children, delay = 0 }) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1], 
        delay,
      },
    },
  };

  return (
    <Box
      as={motion.div}
      variants={itemVariants}
      w="full"
      h="full"
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
  gap: PropTypes.any,
  containerProps: PropTypes.object,
};

ItemGridItem.propTypes = {
  children: PropTypes.node.isRequired,
  delay: PropTypes.number,
};

export default ItemGridLayout;
