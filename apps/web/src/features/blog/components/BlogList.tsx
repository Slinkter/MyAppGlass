"use client";

import React from "react";
import ItemGridLayout from "@/shared/components/Layout/ItemGridLayout";
import BlogCard from "./BlogCard";
import BLOG_POSTS from "@/features/blog/data/blog-posts";
import { useImagePrefetch } from "@shared/hooks/ui/useImagePrefetch";

/**
 * @component BlogList
 * @description Orchestrator for the blog gallery, leveraging ItemGridLayout.
 */
const BlogList: React.FC = () => {
  // Precarga las portadas del listado para que las tarjetas se revelen sin esperar.
  useImagePrefetch(BLOG_POSTS.map((post) => post.image));
  return (
    <ItemGridLayout
      title="Blog de Expertos en Vidriería y Aluminio"
      subtitle="Explora las últimas noticias, tendencias y consejos expertos sobre el mundo de la vidriería y el aluminio."
      columns={{ base: 1, md: 2, lg: 2 }} // Using 2 columns for a more focused reading experience
      gap="8"
      headingAs="h1"
    >
      {BLOG_POSTS.map((post, index) => (
        <ItemGridLayout.Item key={post.id}>
          <BlogCard post={post} index={index} />
        </ItemGridLayout.Item>
      ))}
    </ItemGridLayout>
  );
};

export default React.memo(BlogList);
BlogList.displayName = "BlogList";
