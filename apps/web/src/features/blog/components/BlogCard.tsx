"use client";

import React, { useMemo } from "react";
import { Box, Heading, Text, VStack, HStack, Flex } from "@chakra-ui/react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { BlogPost } from "@/features/blog/data/blog-posts";
import { LucideCalendar, LucideUser, LucideArrowRight } from "lucide-react";
import ResponsiveImage from "@shared/components/Image/ResponsiveImage";
import { ImageRevealSkeleton, useImageReveal } from "@shared/components/Image/ImageReveal";

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

const BLOG_DATE_FORMATTER = new Intl.DateTimeFormat("es-ES", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

function formatBlogDate(dateStr: string): string {
  try {
    return BLOG_DATE_FORMATTER.format(new Date(dateStr));
  } catch {
    return dateStr;
  }
}

/**
 * @component BlogCard
 * @description Tarjeta de artículo: plana en reposo, elevación suave solo en hover/foco.
 */
const BlogCard: React.FC<BlogCardProps> = ({ post, index }) => {
  // La tarjeta se revela (foto + textos) cuando la portada termina de cargar.
  const { loaded, onLoad, reveal } = useImageReveal();
  const formattedDate = useMemo(() => formatBlogDate(post.date), [post.date]);
  return (
    <Box
      asChild
      display="block"
      w="full"
      h="full"
      borderRadius="card"
      _focusVisible={{ outline: "2px solid", outlineColor: "ring.primary", outlineOffset: "2px" }}
    >
      <Link href={`/blog/${post.slug}`}>
        <Box
          role="group"
          w="full"
          h="full"
          bg="surface.card"
          border="1px solid"
          borderColor="border.default"
          borderRadius="card"
          overflow="hidden"
          animation={`slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s both`}
          transition="box-shadow 0.3s ease, transform 0.3s ease"
          _hover={{ boxShadow: "elevatedLg", transform: "translateY(-4px)" }}
          _motionReduce={{ animation: "none", transition: "none", _hover: { transform: "none" } }}
          display="flex"
          flexDirection="column"
          position="relative"
        >
          <Box position="relative" h="240px" overflow="hidden">
            <ImageRevealSkeleton loaded={loaded} />
            <Box position="absolute" inset={0} {...reveal}>
              <ResponsiveImage
                src={post.image}
                alt={post.title}
                w="full"
                h="full"
                objectFit="cover"
                loading="lazy"
                onLoad={onLoad}
                transition="transform 0.5s ease"
                _groupHover={{ transform: "scale(1.04)" }}
                _motionReduce={{ transition: "none", transform: "none" }}
              />
            </Box>

            <HStack position="absolute" top={{ base: "4", md: "6" }} left={{ base: "4", md: "6" }} gap="2" {...reveal}>
              {post.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="inkSolid" borderRadius="full" px="3" textTransform="none">
                  {tag}
                </Badge>
              ))}
            </HStack>
          </Box>

          <VStack p={{ base: "4", md: "6" }} align="flex-start" gap={{ base: "4", md: "6" }} flex="1">
            <VStack align="flex-start" gap="2" w="full">
              <HStack color="text.muted" fontSize="xs" gap="6">
                <HStack gap="2">
                  <LucideCalendar size={14} />
                  <Text>{formattedDate}</Text>
                </HStack>
                <HStack gap="2">
                  <LucideUser size={14} />
                  <Text>{post.author}</Text>
                </HStack>
              </HStack>

              <Heading
                as="h3"
                fontSize="xl"
                color="text.heading"
                lineHeight="1.4"
                transition="color 0.3s ease"
                _groupHover={{ color: "text.accent" }}
              >
                {post.title}
              </Heading>
            </VStack>

            <Text color="text.body" fontSize="sm" lineClamp={3} lineHeight="tall">
              {post.excerpt}
            </Text>

            <Flex mt="auto" w="full" justify="flex-end" align="center" color="text.accent" fontWeight="bold" fontSize="sm" gap="2">
              <Text
                opacity={{ base: 1, md: 0 }}
                _groupHover={{ opacity: 1 }}
                transition="opacity 0.3s ease"
                _motionReduce={{ transition: "none" }}
              >
                Leer más
              </Text>
              <Box
                minW="11"
                minH="11"
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderRadius="full"
                bg="bg.subtle"
                _groupHover={{ bg: "text.accent", color: "white" }}
                transition="background-color 0.3s ease"
                _motionReduce={{ transition: "none" }}
              >
                <LucideArrowRight size={16} style={{ flexShrink: 0 }} />
              </Box>
            </Flex>
          </VStack>
        </Box>
      </Link>
    </Box>
  );
};

export default BlogCard;
