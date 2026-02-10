import React from "react";
import {
  Container,
  Heading,
  Text,
  useColorModeValue,
  SimpleGrid,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import HelmetWrapper from "@shared/components/HelmetWrapper";
import PropTypes from "prop-types";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

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
  containerProps = {},
}) => {
  const headingColor = useColorModeValue("primary.700", "primary.300");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const borderColor = useColorModeValue("primary.500", "primary.300");

  return (
    <>
      <HelmetWrapper
        title={seoTitle}
        description={seoDescription}
        canonicalUrl={seoCanonicalUrl}
      />
      <Container
        maxW={"7xl"}
        mt={6}
        mb={0}
        textAlign="center"
        {...containerProps}
      >
        <Heading
          as="h2"
          color={headingColor}
          mb={{ base: "2", md: "2" }}
          fontSize={{ base: "4xl", md: "4xl" }}
          mt={4}
          textTransform="uppercase"
          fontWeight={600}
          letterSpacing="wide"
          textAlign="center"
          borderBottom="4px"
          borderColor={borderColor}
          width="fit-content"
          mx="auto"
        >
          {title}
        </Heading>

        <Text
          mb={{ base: "2", md: "4" }}
          fontSize={{ base: "2xl", md: "2xl" }}
          color={textColor}
          textAlign="center"
          textTransform="uppercase"
        >
          {subtitle}
        </Text>

        <SimpleGrid
          as={motion.div}
          columns={columns}
          spacing={spacing}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {children}
        </SimpleGrid>
      </Container>
    </>
  );
};

const ItemGridItem = ({ children }) => {
  return <motion.div variants={itemVariants}>{children}</motion.div>;
};

ItemGridLayout.Item = ItemGridItem;

ItemGridLayout.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  seoTitle: PropTypes.string.isRequired,
  seoDescription: PropTypes.string.isRequired,
  seoCanonicalUrl: PropTypes.string.isRequired,
  columns: PropTypes.object,
  spacing: PropTypes.number,
  containerProps: PropTypes.object,
};

export default ItemGridLayout;
