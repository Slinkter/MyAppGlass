import React from "react";
import {
  Container,
  Heading,
  Text,
  useColorModeValue,
  SimpleGrid,
} from "@chakra-ui/react";
import HelmetWrapper from "@/components/HelmetWrapper";
import DataLoader from "@/components/common/DataLoader";

const ItemGridLayout = ({
  title,
  subtitle,
  items,
  ItemComponent,
  SkeletonComponent,
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
      <DataLoader loadingComponent={<SkeletonComponent />}>
        <Container
          maxW="7xl"
          my={6}
          p={0}
          mx={0}
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
          >
            {subtitle}
          </Text>

          <SimpleGrid columns={columns} spacing={spacing}>
            {items.map((item) => (
              <ItemComponent key={item.id} {...item} />
            ))}
          </SimpleGrid>
        </Container>
      </DataLoader>
    </>
  );
};

export default ItemGridLayout;
