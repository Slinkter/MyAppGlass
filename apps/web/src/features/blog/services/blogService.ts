/**
 * @file blogService.ts
 * @description Servicio de dominio para el blog técnico.
 * Opera sobre colecciones recibidas por parámetro o delega en el repositorio de Firestore.
 */

import type { BlogPost } from "@/shared/api/firebase/types";
import {
  getBlogPostBySlug,
  getBlogPosts,
} from "@/features/blog/api/blogRepository";

export const sortPostsByDate = (posts: BlogPost[]): BlogPost[] =>
  [...posts].sort((a, b) => b.date.localeCompare(a.date));

export const findPostBySlug = (
  posts: BlogPost[],
  slug: string
): BlogPost | undefined => posts.find((post) => post.slug === slug);

export const getPublishedPosts = async (): Promise<BlogPost[]> =>
  getBlogPosts({ publishedOnly: true });

export const getPublishedPostBySlug = async (
  slug: string
): Promise<BlogPost | null> => {
  const post = await getBlogPostBySlug(slug);
  if (!post || !post.published) return null;
  return post;
};
