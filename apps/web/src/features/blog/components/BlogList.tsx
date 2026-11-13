"use client";

import React from "react";
import ItemGridLayout from "@/shared/components/Layout/ItemGridLayout";
import BlogCard from "./BlogCard";
import type { BlogPost } from "@/shared/api/firebase/types";
import { useImagePrefetch } from "@shared/hooks/ui/useImagePrefetch";

interface BlogListProps {
  posts: BlogPost[];
}

/**
 * @component BlogList
 * @description Orchestrator for the blog gallery, leveraging ItemGridLayout.
 */
const BlogList: React.FC<BlogListProps> = ({ posts }) => {
  // Precarga las portadas del listado para que las tarjetas se revelen sin esperar.
  useImagePrefetch(posts.map((post) => post.image));
  return (
    <ItemGridLayout
      motion="cine"
      title="Blog de Expertos en Vidriería y Aluminio"
      subtitle="Explora las últimas noticias, tendencias y consejos expertos sobre el mundo de la vidriería y el aluminio."
      columns={{ base: 1, md: 2, lg: 2 }} // Using 2 columns for a more focused reading experience
      gap="8"
      headingAs="h1"
    >
      {posts.map((post, index) => (
        <ItemGridLayout.Item key={post.id}>
          <BlogCard post={post} index={index} />
        </ItemGridLayout.Item>
      ))}
    </ItemGridLayout>
  );
};

export default React.memo(BlogList);
BlogList.displayName = "BlogList";
