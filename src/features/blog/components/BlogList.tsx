"use client";

import React from "react";
import ItemGridLayout from "@/shared/components/Layout/ItemGridLayout";
import BlogCard from "./BlogCard";
import BLOG_POSTS from "@/features/blog/data/blog-posts";

/**
 * @component BlogList
 * @description Orchestrator for the blog gallery, leveraging ItemGridLayout.
 */
const BlogList: React.FC = () => {
  return (
    <ItemGridLayout
      title="Blog de Expertos en Vidriería y Aluminio"
      subtitle="Explora las últimas noticias, tendencias y consejos expertos sobre el mundo de la vidriería y el aluminio."
      columns={{ base: 1, md: 2, lg: 2 }} // Using 2 columns for a more focused reading experience
      gap="8"
      headingAs="h1"
    >
      {BLOG_POSTS.map((post, index) => (
        <ItemGridLayout.Item key={post.id} delay={index * 0.1}>
          <BlogCard post={post} index={index} />
        </ItemGridLayout.Item>
      ))}
    </ItemGridLayout>
  );
};

export default BlogList;
