"use client";

import React from "react";
import {
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  Box,
} from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { m } from "framer-motion";
import HelmetWrapper from "@shared/components/HelmetWrapper";

export interface ItemGridLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  seoTitle: string;
  seoDescription: string;
  seoCanonicalUrl: string;
  columns?: any;
  gap?: number | string;
  containerProps?: any;
}

const EMPTY_OBJ = {};

const ItemGridLayout = ({
  title,
  subtitle,
  children,
  seoTitle,
  seoDescription,
  seoCanonicalUrl,
  columns = { base: 1, md: 2, lg: 3 },
  gap = 10,
  containerProps = EMPTY_OBJ,
}: ItemGridLayoutProps) => {
  const headingColor = "text.accent";
  const borderColor = useColorModeValue("primary.500", "primary.300");

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
        <VStack gap={{ base: 10, md: 12 }} w="full">
          <VStack gap={3}>
            <Heading
              as="h2"
              color={headingColor}
              fontSize={{ base: "3xl", md: "4xl" }}
              textTransform="uppercase"
              fontWeight={600}
              letterSpacing="wide"
              textAlign="center"
              borderBottom="4px solid"
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
            asChild
            columns={columns}
            gap={{ base: 10, md: gap }}
            w="full"
            justifyItems="center"
          >
            <m.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {children}
            </m.div>
          </SimpleGrid>
        </VStack>
      </Container>
    </>
  );
};

const ItemGridItem = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        delay,
      } as const,
    },
  };

  return (
    <Box
      asChild
      w="full"
      minH={{ base: "320px", md: "460px" }}
    >
      <m.div variants={itemVariants}>
        {children}
      </m.div>
    </Box>
  );
};

ItemGridItem.displayName = "ItemGridItem";
ItemGridLayout.Item = ItemGridItem;

export default ItemGridLayout;
