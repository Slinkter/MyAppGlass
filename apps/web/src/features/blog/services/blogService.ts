/**
 * @file blogService.ts
 * @description Servicio de datos para el blog de autoridad SEO.
 * Utiliza los datos centralizados de blog-posts.ts.
 */

import BLOG_POSTS, { BlogPost } from "@/features/blog/data/blog-posts";

export const getPosts = (): BlogPost[] => BLOG_POSTS;

// O(1) Lookup Map para Blog Posts
const blogPostsBySlugMap = new Map<string, BlogPost>(
  BLOG_POSTS.map(post => [post.slug, post])
);

export const getPostBySlug = (slug: string): BlogPost | undefined => 
  blogPostsBySlugMap.get(slug);
