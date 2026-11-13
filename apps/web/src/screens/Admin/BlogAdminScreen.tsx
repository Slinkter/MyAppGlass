"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import {
  Box,
  HStack,
  Image,
  Input,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  BookOpen,
  CheckCircle2,
  ExternalLink,
  PlusCircle,
  Search,
  XCircle,
} from "lucide-react";
import { AdminLayout } from "@/widgets/AdminLayout/AdminLayout";
import {
  BlogPostFormModal,
  type BlogPostEditable,
  type BlogPostFormValues,
} from "@/features/admin/components/BlogPostFormModal";
import { ConfirmDeleteDialog } from "@/features/admin/components/ConfirmDeleteDialog";
import AdminRowActions from "@/features/admin/components/AdminRowActions";
import {
  getBlogPosts,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
} from "@/features/blog/api/blogRepository";
import { Button } from "@/shared/ui/button";
import { Badge } from "@/shared/ui/badge";
import { toaster } from "@/shared/ui/toaster-instance";
import { logger } from "@/shared/utils/logger";

type StatusFilter = "all" | "published" | "draft";

export const BlogAdminScreen: React.FC = () => {
  const [posts, setPosts] = useState<BlogPostEditable[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPostEditable | null>(null);
  const [postToDelete, setPostToDelete] = useState<BlogPostEditable | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getBlogPosts({ publishedOnly: false });
      const normalized: BlogPostEditable[] = data.map((item) => ({
        id: item.id,
        title: item.title,
        slug: item.slug,
        description: item.description,
        excerpt: item.excerpt,
        date: item.date,
        author: item.author,
        image: item.image,
        tags: item.tags || [],
        content: item.content,
        published: item.published ?? true,
      }));
      setPosts(normalized);
    } catch (err) {
      logger.error("Error al cargar artículos del blog desde Firestore", err);
      toaster.create({
        title: "Error al cargar artículos",
        description: "No se pudieron recuperar los artículos del blog desde Firestore.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const filteredPosts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "published" && post.published) ||
        (statusFilter === "draft" && !post.published);

      if (!matchesStatus) return false;
      if (!q) return true;

      return (
        post.title.toLowerCase().includes(q) ||
        post.slug.toLowerCase().includes(q) ||
        post.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    });
  }, [posts, searchQuery, statusFilter]);

  const handleCreate = () => {
    setSelectedPost(null);
    setModalOpen(true);
  };

  const handleEdit = (post: BlogPostEditable) => {
    setSelectedPost(post);
    setModalOpen(true);
  };

  const handleDelete = (post: BlogPostEditable) => {
    setPostToDelete(post);
  };

  const handleTogglePublish = async (post: BlogPostEditable) => {
    try {
      await updateBlogPost(post.id, {
        published: !post.published,
      });
      toaster.create({
        title: post.published ? "Artículo pasado a borrador" : "Artículo publicado",
        description: `Se actualizó el estado de "${post.title}".`,
        type: "info",
      });
      await fetchPosts();
    } catch (err) {
      logger.error("Error al cambiar estado de publicación del artículo", err, {
        id: post.id,
      });
      toaster.create({
        title: "Error al cambiar estado",
        description: "No se pudo actualizar el estado de publicación.",
        type: "error",
      });
    }
  };

  const handleConfirmDelete = async () => {
    if (!postToDelete) return;
    setDeleting(true);
    try {
      await deleteBlogPost(postToDelete.id);
      toaster.create({
        title: "Artículo eliminado",
        description: `Se eliminó "${postToDelete.title}" exitosamente.`,
        type: "success",
      });
      setPostToDelete(null);
      await fetchPosts();
    } catch (err) {
      logger.error("Error al eliminar artículo del blog", err, {
        id: postToDelete.id,
      });
      toaster.create({
        title: "Error al eliminar",
        description: "No se pudo eliminar el artículo seleccionado.",
        type: "error",
      });
    } finally {
      setDeleting(false);
    }
  };

  const handleSubmit = async (data: BlogPostFormValues) => {
    setSubmitting(true);
    try {
      if (selectedPost) {
        await updateBlogPost(selectedPost.id, data);
        toaster.create({
          title: "Artículo actualizado",
          description: `Se guardaron los cambios para "${data.title}".`,
          type: "success",
        });
      } else {
        await createBlogPost(data);
        toaster.create({
          title: "Artículo creado",
          description: `Se registró "${data.title}" en Firestore.`,
          type: "success",
        });
      }
      setModalOpen(false);
      await fetchPosts();
    } catch (err) {
      logger.error("Error al guardar artículo del blog", err);
      toaster.create({
        title: "Error al guardar",
        description:
          err instanceof Error ? err.message : "Ocurrió un error inesperado.",
        type: "error",
      });
      throw err;
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AdminLayout
      title="Gestión de Blog"
      subtitle="Administración de artículos técnicos, guías de vidrio y aluminio y SEO"
      badge="Blog Corporativo"
    >
      <Box
        borderRadius="card"
        bg="surface.card"
        border="1px solid"
        borderColor="border.default"
        overflow="hidden"
        boxShadow="adminTable"
      >
        {/* Cabecera del módulo */}
        <HStack
          p={{ base: "4", md: "6" }}
          justify="space-between"
          wrap="wrap"
          gap="4"
          borderBottom="1px solid"
          borderColor="border.default"
          bg="bg.subtle"
        >
          <VStack align="start" gap="0.5">
            <HStack gap="2">
              <BookOpen size={18} aria-hidden />
              <Text fontSize="md" fontWeight="bold" color="text.heading">
                Artículos del Blog
              </Text>
              <Badge variant="chipInfo">{posts.length} registros</Badge>
            </HStack>
            <Text fontSize="xs" color="text.muted">
              Crea, edita y previsualiza artículos HTML sanitizados antes de publicarlos
            </Text>
          </VStack>

          <Button minH="11" size="sm" onClick={handleCreate}>
            <PlusCircle size={16} aria-hidden />
            Nuevo Artículo
          </Button>
        </HStack>

        {/* Filtros y búsqueda */}
        <HStack
          p={{ base: "4", md: "5" }}
          justify="space-between"
          wrap="wrap"
          gap="3"
          borderBottom="1px solid"
          borderColor="border.default"
        >
          <HStack gap="2" flex="1" minW={{ base: "full", md: "72" }} maxW="md">
            <Search size={16} aria-hidden />
            <Input
              placeholder="Buscar por título, slug o etiqueta..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              minH="11"
            />
          </HStack>

          <HStack gap="2" wrap="wrap">
            {(
              [
                { id: "all", label: "Todos" },
                { id: "published", label: "Publicados" },
                { id: "draft", label: "Borradores" },
              ] as const
            ).map((tab) => (
              <Button
                key={tab.id}
                size="sm"
                minH="11"
                variant={statusFilter === tab.id ? "primary" : "outline"}
                onClick={() => setStatusFilter(tab.id)}
              >
                {tab.label}
              </Button>
            ))}
          </HStack>
        </HStack>

        {/* Contenido */}
        {loading ? (
          <VStack py="16" gap="3">
            <Spinner size="lg" />
            <Text fontSize="sm" color="text.muted">
              Cargando artículos desde Firestore...
            </Text>
          </VStack>
        ) : filteredPosts.length === 0 ? (
          <VStack py="16" px="6" gap="3" textAlign="center">
            <BookOpen size={32} aria-hidden />
            <Text fontSize="md" fontWeight="semibold" color="text.heading">
              No hay artículos que coincidan con el filtro
            </Text>
            <Text fontSize="sm" color="text.muted" maxW="md">
              {posts.length === 0
                ? "Aún no hay artículos registrados en Firestore. Crea el primero desde el botón Nuevo Artículo."
                : "Prueba limpiando la búsqueda o cambiando el filtro de estado."}
            </Text>
          </VStack>
        ) : (
          <VStack align="stretch" gap="0" divideY="1px" divideColor="border.default">
            {filteredPosts.map((post) => (
              <HStack
                key={post.id}
                p={{ base: "4", md: "5" }}
                justify="space-between"
                align={{ base: "start", md: "center" }}
                flexDirection={{ base: "column", md: "row" }}
                gap="4"
              >
                <HStack gap="4" align="start" flex="1" minW="0">
                  <Box
                    w="20"
                    h="14"
                    borderRadius="field"
                    overflow="hidden"
                    bg="bg.subtle"
                    border="1px solid"
                    borderColor="border.default"
                    flexShrink={0}
                  >
                    {post.image ? (
                      <Image
                        src={post.image}
                        alt={post.title}
                        w="full"
                        h="full"
                        objectFit="cover"
                      />
                    ) : null}
                  </Box>

                  <VStack align="start" gap="1" minW="0">
                    <HStack gap="2" wrap="wrap">
                      <Text
                        fontSize="sm"
                        fontWeight="bold"
                        color="text.heading"
                        lineClamp={1}
                      >
                        {post.title}
                      </Text>
                      <Badge variant={post.published ? "chipSuccess" : "chipWarning"}>
                        {post.published ? (
                          <CheckCircle2 size={12} aria-hidden />
                        ) : (
                          <XCircle size={12} aria-hidden />
                        )}
                        {post.published ? "Publicado" : "Borrador"}
                      </Badge>
                    </HStack>

                    <Text fontSize="xs" color="text.muted" fontFamily="mono">
                      /blog/{post.slug} · {post.date} · {post.author}
                    </Text>

                    {post.tags.length > 0 && (
                      <HStack gap="1.5" wrap="wrap" pt="1">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="chip">
                            {tag}
                          </Badge>
                        ))}
                      </HStack>
                    )}
                  </VStack>
                </HStack>

                <HStack gap="2" wrap="wrap" flexShrink={0}>
                  <Button
                    asChild
                    size="xs"
                    minH="11"
                    variant="outline"
                  >
                    <Link
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink size={14} aria-hidden />
                      Ver
                    </Link>
                  </Button>

                  <Button
                    size="xs"
                    minH="11"
                    variant="outline"
                    onClick={() => handleTogglePublish(post)}
                  >
                    {post.published ? "Ocultar" : "Publicar"}
                  </Button>

                  <AdminRowActions
                    onEdit={() => handleEdit(post)}
                    onDelete={() => handleDelete(post)}
                  />
                </HStack>
              </HStack>
            ))}
          </VStack>
        )}
      </Box>

      <BlogPostFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        post={selectedPost}
        onSubmit={handleSubmit}
        loading={submitting}
      />

      <ConfirmDeleteDialog
        isOpen={Boolean(postToDelete)}
        onClose={() => !deleting && setPostToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Eliminar Artículo"
        description={`¿Estás seguro de que deseas eliminar el artículo "${postToDelete?.title}"? Esta acción no se puede deshacer.`}
        loading={deleting}
      />
    </AdminLayout>
  );
};
