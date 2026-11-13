"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Box, Container, Heading, Skeleton, Text, VStack } from "@chakra-ui/react";
import { Button } from "@/shared/ui/button";
import { getPublishedPostBySlug } from "@/features/blog/services/blogService";
import type { BlogPost } from "@/shared/api/firebase/types";
import BlogPostView from "./BlogPostView";

export function BlogPostSkeleton() {
  return (
    <Box py={{ base: "8", md: "20" }}>
      <Container maxW="pageNarrow">
        <VStack align="flex-start" gap="6" w="full">
          <Skeleton h="5" w="48" borderRadius="md" />
          <Skeleton h="12" w="full" borderRadius="md" />
          <Skeleton h="5" w="72" borderRadius="md" />
          <Skeleton h={{ base: "18.75rem", md: "31.25rem" }} w="full" borderRadius="3xl" />
          <Skeleton h="40" w="full" borderRadius="md" />
        </VStack>
      </Container>
    </Box>
  );
}

/**
 * Vista cliente para artículos creados en `/admin/blog` después del build estático:
 * resuelve `/blog/ver?slug=<slug>` desde Firestore vía SDK cliente.
 */
export function BlogPostClientView() {
  const router = useRouter();
  const slug = useSearchParams().get("slug") ?? undefined;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) {
      router.replace("/blog");
    }
  }, [slug, router]);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    setLoading(true);
    getPublishedPostBySlug(slug)
      .then((found) => {
        if (cancelled) return;
        setPost(found);
        if (found) {
          document.title = `${found.title} | GYA Company`;
        }
      })
      .catch(() => {
        if (!cancelled) setPost(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (!slug) return null;
  if (loading) return <BlogPostSkeleton />;

  if (!post) {
    return (
      <Box py={{ base: "14", md: "24" }}>
        <Container maxW="pageNarrow">
          <VStack align="flex-start" gap="6">
            <Heading as="h1" fontSize={{ base: "2xl", md: "4xl" }} color="text.heading">
              Artículo no encontrado
            </Heading>
            <Text color="text.muted" fontSize="lg">
              El artículo que busca no está disponible o fue retirado del catálogo.
            </Text>
            <Button asChild variant="solid">
              <Link href="/blog">Volver al blog</Link>
            </Button>
          </VStack>
        </Container>
      </Box>
    );
  }

  return <BlogPostView post={post} />;
}
