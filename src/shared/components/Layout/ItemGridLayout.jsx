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
import HelmetWrapper from "@shared/components/HelmetWrapper";
import PropTypes from "prop-types";

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
      <Container maxW={"7xl"} textAlign="center" {...containerProps}>
        <VStack spacing={12} w="full">
          {/* Cabecera */}
          <VStack spacing={4}>
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
            >
              {title}
            </Heading>

            <Text
              fontSize={{ base: "md", md: "lg" }}
              color={textColor}
              textAlign="center"
              textTransform="uppercase"
            >
              {subtitle}
            </Text>
          </VStack>

          {/* Grilla de Contenido */}
          <SimpleGrid
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

const ItemGridItem = ({ children }) => {
  return <Box w="full">{children}</Box>;
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
