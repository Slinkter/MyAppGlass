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

import { motion, AnimatePresence } from "framer-motion";

/**
 * Componente: ItemGridLayout
 * --------------------------------------------------------------------
 * @description
 * Un layout reutilizable para mostrar colecciones de elementos.
 * Refactorizado para Aura 2.0 y Chakra v3.
 */
const ItemGridLayout = ({
  title,
  subtitle,
  children,
  seoTitle,
  seoDescription,
  seoCanonicalUrl,
  columns = { base: 1, md: 2, lg: 3 },
  gap = "phi_lg",
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
      <Container maxW="7xl" textAlign="center" mt="phi_2xl" {...containerProps}>
        <VStack gap="phi_xl" w="full">
          {/* Header Section */}
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
              _after={{
                content: '""',
                position: "absolute",
                bottom: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: "60px",
                height: "4px",
                bg: "text.accent",
                borderRadius: "full"
              }}
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
                mt="phi_md"
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
            viewport={{ once: true, margin: "-100px" }}
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1], // Custom easeOutExpo
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
  spacing: PropTypes.number,
  containerProps: PropTypes.object,
};

ItemGridItem.propTypes = {
  children: PropTypes.node.isRequired,
  delay: PropTypes.number,
};

export default ItemGridLayout;
