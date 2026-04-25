/**
 * @file blogService.ts
 * @description Servicio de datos para el blog de autoridad SEO.
 * Utiliza los datos centralizados de blog-posts.ts.
 */

import BLOG_POSTS, { BlogPost } from "@/data/blog-posts";

export const getPosts = (): BlogPost[] => BLOG_POSTS;

export const getPostBySlug = (slug: string): BlogPost | undefined => 
  BLOG_POSTS.find(p => p.slug === slug);
