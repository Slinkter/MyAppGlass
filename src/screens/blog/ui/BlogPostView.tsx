"use client";

import React from "react";
import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  VStack, 
  HStack, 
  Separator,
  Badge,
  Flex
} from "@chakra-ui/react";
import { BlogPost } from "@/features/blog/data/blog-posts";
import { LucideCalendar, LucideUser, LucideChevronRight, LucideClock, LucideArrowRight } from "lucide-react";
import Link from "next/link";
import ResponsiveImage from "@shared/components/Image/ResponsiveImage";

interface BlogPostViewProps {
  post: BlogPost;
}

/**
 * @component BlogPostView
 * @description Premium reading experience for blog articles.
 */
const BlogPostView: React.FC<BlogPostViewProps> = ({ post }) => {
  // Estimate reading time
  const wordsPerMinute = 200;
  const wordCount = post.content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);

  return (
    <Box as="article" py={{ base: "8", md: "20" }}>
      <Container maxW="4xl">
        <VStack align="flex-start" gap="8" w="full">
          {/* Breadcrumbs */}
          <HStack gap="2" color="text.muted" fontSize="sm">
             <Link href="/">Inicio</Link>
             <LucideChevronRight size={14} />
             <Link href="/blog">Blog</Link>
             <LucideChevronRight size={14} />
             <Text color="text.accent" fontWeight="500" lineClamp={1}>{post.title}</Text>
          </HStack>

          {/* Header */}
          <VStack align="flex-start" gap="6" w="full">
            <HStack gap="4">
              {post.tags.map(tag => (
                <Badge key={tag} variant="subtle" colorPalette="primary" px="4" borderRadius="full">
                  {tag}
                </Badge>
              ))}
            </HStack>
            
            <Heading 
              as="h1" 
              fontSize={{ base: "3xl", md: "5xl" }} 
              color="text.heading" 
              lineHeight="1.2"
              fontWeight="900"
            >
              {post.title}
            </Heading>

            <HStack color="text.muted" fontSize="md" gap="8" wrap="wrap">
              <HStack gap="2">
                <LucideUser size={18} />
                <Text fontWeight="600">{post.author}</Text>
              </HStack>
              <HStack gap="2">
                <LucideCalendar size={18} />
                <Text>{new Date(post.date).toLocaleDateString('es-ES', { month: 'long', day: 'numeric', year: 'numeric' })}</Text>
              </HStack>
              <HStack gap="2">
                <LucideClock size={18} />
                <Text>{readingTime} min de lectura</Text>
              </HStack>
            </HStack>
          </VStack>

          {/* Featured Image */}
          <Box 
            w="full" 
            h={{ base: "300px", md: "500px" }} 
            borderRadius="3xl" 
            overflow="hidden" 
            boxShadow="md"
            border="1px solid"
            borderColor="border.glass"
          >
            <ResponsiveImage 
              src={post.image} 
              alt={post.title} 
              w="full" 
              h="full" 
              objectFit="cover" 
              loading="eager"
            />
          </Box>

          {/* Content with optimized typography */}
          <Box 
            w="full" 
            color="text.body" 
            fontSize={{ base: "lg", md: "xl" }}
            lineHeight="1.618" // Phi line-height for readability
            css={{
              "& h2": {
                fontSize: "2xl",
                fontWeight: "900",
                color: "text.heading",
                mt: "14",
                mb: "6",
              },
              "& h3": {
                fontSize: "xl",
                fontWeight: "bold",
                color: "text.heading",
                mt: "8",
                mb: "4",
              },
              "& p": {
                mb: "6",
              },
              "& blockquote": {
                borderLeft: "4px solid",
                borderColor: "text.accent",
                pl: "6",
                fontStyle: "italic",
                color: "text.heading",
                bg: "bg.subtle",
                py: "6",
                borderRadius: "md",
                my: "8",
              }
            }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <Separator borderColor="border.glass" my="14" />

          {/* Footer of the article */}
          <Flex w="full" justify="space-between" align="center">
            <HStack gap="4">
               <Text fontWeight="bold" color="text.heading">Compartir:</Text>
               {/* Simplified social sharing */}
               <Box p="2" borderRadius="full" border="1px solid" borderColor="border.glass" _hover={{ bg: "text.accent", color: "white" }} cursor="pointer" transition="all 0.3s">
                 <LucideArrowRight size={18} />
               </Box>
            </HStack>
            <Link href="/blog">
               <Text color="text.accent" fontWeight="bold" _hover={{ textDecoration: "underline" }}>
                 ← Volver al blog
               </Text>
            </Link>
          </Flex>
        </VStack>
      </Container>
    </Box>
  );
};

export default BlogPostView;
