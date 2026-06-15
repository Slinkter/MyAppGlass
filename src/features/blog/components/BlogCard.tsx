"use client";

import React from "react";
import { Box, Heading, Text, VStack, Image, HStack, Badge, Flex } from "@chakra-ui/react";
import Link from "next/link";
import { BlogPost } from "@/features/blog/data/blog-posts";
import { LucideCalendar, LucideUser, LucideArrowRight } from "lucide-react";

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

/**
 * @component BlogCard
 * @description Premium blog card with smooth 120Hz hover effects.
 */
const BlogCard: React.FC<BlogCardProps> = ({ post, index }) => {
  return (
    <Link href={`/blog/${post.slug}`} style={{ width: "100%", height: "100%" }}>
      <Box
        role="group"
        w="full"
        h="full"
        bg="surface.card"
        border="1px solid"
        borderColor="border.default"
        borderRadius="3xl"
        overflow="hidden"
        boxShadow="md"
        animation={`slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s both`}
        _hover={{ 
          boxShadow: "lg",
          borderColor: "whiteAlpha.300",
          transform: "translateY(-12px) scale(1.02)",
        }}
        transition="box-shadow 0.4s cubic-bezier(0.33, 1, 0.68, 1), border-color 0.4s cubic-bezier(0.33, 1, 0.68, 1), transform 0.4s cubic-bezier(0.33, 1, 0.68, 1)"
        display="flex"
        flexDirection="column"
        position="relative"
      >
        {/* Image Container */}
        <Box position="relative" h="240px" overflow="hidden">
          <Image
            src={post.image}
            alt={post.title}
            w="full"
            h="full"
            objectFit="cover"
            transition="transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)"
            _groupHover={{ transform: "scale(1.1)" }}
          />
          <Box 
            position="absolute" 
            inset={0} 
            bgGradient="linear(to-t, blackAlpha.600, transparent)" 
            opacity={0.4}
          />
          
          {/* Tag Overlay */}
          <HStack position="absolute" top="6" left="6" gap="2">
            {post.tags.slice(0, 2).map((tag) => (
              <Badge 
                key={tag} 
                bg="whiteAlpha.200"
                color="white" 
                border="1px solid"
                borderColor="whiteAlpha.300"
                px="4" 
                py="0.5"
                borderRadius="full"
                fontSize="xs"
                textTransform="none"
              >
                {tag}
              </Badge>
            ))}
          </HStack>
        </Box>

        {/* Content Container */}
        <VStack p="8" align="flex-start" gap="6" flex="1">
          <VStack align="flex-start" gap="2" w="full">
            <HStack color="text.muted" fontSize="xs" gap="6">
              <HStack gap="2">
                <LucideCalendar size={14} />
                <Text>{new Date(post.date).toLocaleDateString('es-ES', { month: 'long', day: 'numeric', year: 'numeric' })}</Text>
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

          {/* Read More Link */}
          <Flex 
            mt="auto" 
            w="full" 
            justify="flex-end" 
            align="center" 
            color="text.accent"
            fontWeight="bold"
            fontSize="sm"
            gap="2"
            transition="color 0.3s ease"
          >
            <Text opacity={0} transform="translateX(10px)" _groupHover={{ opacity: 1, transform: "translateX(0)" }} transition="opacity 0.4s ease, transform 0.4s ease">
              Leer más
            </Text>
            <Box 
              p="2" 
              borderRadius="full" 
              bg="bg.subtle" 
              _groupHover={{ bg: "text.accent", color: "white", transform: "rotate(-45deg)" }}
              transition="background-color 0.4s ease, color 0.4s ease, transform 0.4s ease"
            >
              <LucideArrowRight size={16} />
            </Box>
          </Flex>
        </VStack>

        {/* Aura Glow Effect */}
        <Box 
          position="absolute"
          bottom="-20%"
          right="-10%"
          w="150px"
          h="150px"
          bg="text.accent"
          filter="blur(60px)"
          opacity={0}
          _groupHover={{ opacity: 0.1 }}
          transition="opacity 0.6s ease"
          pointerEvents="none"
        />
      </Box>
    </Link>
  );
};

export default BlogCard;
