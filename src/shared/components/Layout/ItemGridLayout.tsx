"use client";

import React from "react";
import { Container, Heading, Text, SimpleGrid, VStack, Box, ContainerProps } from "@chakra-ui/react";
import { m, Variants } from "framer-motion";

const MotionBox = m.create(Box);
const MotionSimpleGrid = m.create(SimpleGrid);

interface ItemGridItemProps {
  children: React.ReactNode;
  delay?: number;
}

const ItemGridItem: React.FC<ItemGridItemProps> = ({ children, delay = 0 }) => {
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        delay: delay,
      },
    },
  };

  return (
    <MotionBox
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "50px" }}
      w="full"
      h="full"
    >
      {children}
    </MotionBox>
  );
};

interface ItemGridLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  seoTitle?: string;
  seoDescription?: string;
  seoCanonicalUrl?: string;
  columns?: number | Record<string, number>;
  gap?: string | number | Record<string, string | number>;
  containerProps?: ContainerProps;
}

/**
 * Componente: ItemGridLayout
 * --------------------------------------------------------------------
 * @description
 * Un layout reutilizable para mostrar colecciones de elementos.
 */
const ItemGridLayout: React.FC<ItemGridLayoutProps> & { Item: typeof ItemGridItem } = ({
  title,
  subtitle,
  children,
  columns = { base: 1, md: 2, lg: 3 },
  gap = { base: "phi_md", md: "phi_lg" },
  containerProps = {},
}) => {
  /**
   * Animation Variants
   */
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <Container 
      maxW="7xl" 
      textAlign="center" 
      mt={{ base: "phi_lg", md: "phi_2xl" }}
      {...containerProps}
    >
        <VStack gap={{ base: "phi_md", md: "phi_xl" }} w="full">
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

          <MotionSimpleGrid
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
          </MotionSimpleGrid>
        </VStack>
      </Container>
  );
};

ItemGridLayout.Item = ItemGridItem;

export default ItemGridLayout;
