"use client";

import React from "react";
import { Box, Heading, Text, VStack, Image, HStack, Badge, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BlogPost } from "@/data/blog-posts";
import { LucideCalendar, LucideUser, LucideArrowRight } from "lucide-react";

const MotionBox = motion.create(Box);

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

/**
 * @component BlogCard
 * @description Premium blog card with Aura Glassmorphism and smooth 120Hz hover effects.
 */
const BlogCard: React.FC<BlogCardProps> = ({ post, index }) => {
  return (
    <Link href={`/blog/${post.slug}`} style={{ width: "100%", height: "100%" }}>
      <MotionBox
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.8, 
          delay: index * 0.1, 
          ease: [0.16, 1, 0.3, 1] 
        }}
        whileHover={{ 
          y: -12,
          scale: 1.02,
          transition: { duration: 0.4, ease: [0.33, 1, 0.68, 1] }
        }}
        role="group"
        w="full"
        h="full"
        bg="surface.card"
        backdropFilter="blur(20px)"
        border="1px solid"
        borderColor="border.glass"
        borderRadius="3xl"
        overflow="hidden"
        boxShadow="glass"
        _hover={{ 
          boxShadow: "glassHover",
          borderColor: "whiteAlpha.300",
        }}
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
          <HStack position="absolute" top="phi_md" left="phi_md" gap="phi_xs">
            {post.tags.slice(0, 2).map((tag) => (
              <Badge 
                key={tag} 
                bg="whiteAlpha.200" 
                backdropFilter="blur(8px)"
                color="white" 
                border="1px solid"
                borderColor="whiteAlpha.300"
                px="phi_sm" 
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
        <VStack p="phi_lg" align="flex-start" gap="phi_md" flex="1">
          <VStack align="flex-start" gap="phi_xs" w="full">
            <HStack color="text.muted" fontSize="xs" gap="phi_md">
              <HStack gap="phi_xs">
                <LucideCalendar size={14} />
                <Text>{new Date(post.date).toLocaleDateString('es-ES', { month: 'long', day: 'numeric', year: 'numeric' })}</Text>
              </HStack>
              <HStack gap="phi_xs">
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
            gap="phi_xs"
            transition="all 0.3s ease"
          >
            <Text opacity={0} transform="translateX(10px)" _groupHover={{ opacity: 1, transform: "translateX(0)" }} transition="all 0.4s ease">
              Leer más
            </Text>
            <Box 
              p="phi_xs" 
              borderRadius="full" 
              bg="bg.subtle" 
              _groupHover={{ bg: "text.accent", color: "white", transform: "rotate(-45deg)" }}
              transition="all 0.4s ease"
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
      </MotionBox>
    </Link>
  );
};

export default BlogCard;
