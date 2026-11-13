"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  HStack,
  Input,
  SimpleGrid,
  Text,
  Textarea,
  VStack,
  chakra,
} from "@chakra-ui/react";
import { Code2, Eye, X } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Badge } from "@/shared/ui/badge";
import { Field } from "@/shared/ui/field";
import { AdminDialog } from "./form/AdminDialog";
import { TitleSlugFields } from "./form/TitleSlugFields";
import { PublishedCheckbox } from "./form/PublishedCheckbox";
import { ImageUploadZone } from "./ImageUploadZone";
import { useAutoSlug } from "../hooks/useAutoSlug";
import { sanitizeBlogHtml } from "../lib/sanitizeBlogHtml";

export interface BlogPostFormValues {
  title: string;
  slug: string;
  description: string;
  excerpt: string;
  date: string;
  author: string;
  image: string;
  tags: string[];
  content: string;
  published: boolean;
}

export interface BlogPostEditable extends BlogPostFormValues {
  id: string;
}

export interface BlogPostFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  post?: BlogPostEditable | null;
  onSubmit: (data: BlogPostFormValues) => Promise<void>;
  loading?: boolean;
}

const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

const getTodayIsoDate = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const parseTagsInput = (raw: string): string[] =>
  Array.from(
    new Set(
      raw
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    )
  );

export const BlogPostFormModal: React.FC<BlogPostFormModalProps> = ({
  isOpen,
  onClose,
  post,
  onSubmit,
  loading = false,
}) => {
  const isEditing = Boolean(post);

  const [title, setTitle] = useState("");
  const { slug, syncFromTitle, setManualSlug, resetSlug } = useAutoSlug();
  const [description, setDescription] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [date, setDate] = useState(getTodayIsoDate);
  const [author, setAuthor] = useState("GYA Company");
  const [image, setImage] = useState("");
  const [tagsText, setTagsText] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(true);
  const [contentMode, setContentMode] = useState<"edit" | "preview">("edit");
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    if (post) {
      setTitle(post.title || "");
      resetSlug(post.slug || "", false);
      setDescription(post.description || "");
      setExcerpt(post.excerpt || "");
      setDate(post.date || getTodayIsoDate());
      setAuthor(post.author || "GYA Company");
      setImage(post.image || "");
      setTagsText((post.tags || []).join(", "));
      setContent(post.content || "");
      setPublished(post.published ?? true);
    } else {
      setTitle("");
      resetSlug("", true);
      setDescription("");
      setExcerpt("");
      setDate(getTodayIsoDate());
      setAuthor("GYA Company");
      setImage("");
      setTagsText("");
      setContent("");
      setPublished(true);
    }
    setContentMode("edit");
    setFormError(null);
  }, [post, isOpen, resetSlug]);

  const parsedTags = useMemo(() => parseTagsInput(tagsText), [tagsText]);
  const sanitizedPreviewHtml = useMemo(() => sanitizeBlogHtml(content), [content]);

  const descriptionLength = description.trim().length;
  const descriptionStatus =
    descriptionLength === 0
      ? { label: "Recomendado: 120–160 caracteres", color: "text.muted" }
      : descriptionLength < 120
        ? { label: `${descriptionLength}/160 caracteres (muy corta, ideal 120–160)`, color: "status.warning" }
        : descriptionLength <= 160
          ? { label: `${descriptionLength}/160 caracteres (longitud óptima SEO)`, color: "status.success" }
          : { label: `${descriptionLength}/160 caracteres (excede 160)`, color: "status.danger" };

  if (!isOpen) return null;

  const handleTitleChange = (val: string) => {
    setTitle(val);
    syncFromTitle(val);
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const remaining = parsedTags.filter((tag) => tag !== tagToRemove);
    setTagsText(remaining.join(", "));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const trimmedTitle = title.trim();
    const trimmedSlug = slug.trim();
    const trimmedDescription = description.trim();
    const trimmedExcerpt = excerpt.trim();
    const trimmedDate = date.trim();
    const trimmedAuthor = author.trim();
    const trimmedImage = image.trim();
    const sanitizedContent = sanitizeBlogHtml(content);

    if (!trimmedTitle) {
      setFormError("El título del artículo es obligatorio.");
      return;
    }
    if (!trimmedSlug || !SLUG_REGEX.test(trimmedSlug)) {
      setFormError("El slug es obligatorio y solo puede contener minúsculas, números y guiones.");
      return;
    }
    if (!trimmedDescription) {
      setFormError("La meta descripción es obligatoria.");
      return;
    }
    if (!trimmedExcerpt) {
      setFormError("El extracto del artículo es obligatorio.");
      return;
    }
    if (!DATE_REGEX.test(trimmedDate)) {
      setFormError("La fecha debe tener formato YYYY-MM-DD.");
      return;
    }
    if (!trimmedAuthor) {
      setFormError("El autor es obligatorio.");
      return;
    }
    if (!trimmedImage) {
      setFormError("Debes subir una portada o ingresar una URL de imagen.");
      return;
    }
    if (!sanitizedContent) {
      setFormError("El contenido HTML del artículo es obligatorio.");
      return;
    }

    try {
      await onSubmit({
        title: trimmedTitle,
        slug: trimmedSlug,
        description: trimmedDescription,
        excerpt: trimmedExcerpt,
        date: trimmedDate,
        author: trimmedAuthor,
        image: trimmedImage,
        tags: parsedTags,
        content: sanitizedContent,
        published,
      });
    } catch (err: unknown) {
      setFormError(
        err instanceof Error ? err.message : "Error al guardar el artículo."
      );
    }
  };

  return (
    <AdminDialog
      title={isEditing ? `Editar Artículo: ${post?.title}` : "Nuevo Artículo del Blog"}
      eyebrow="Blog Corporativo"
      onClose={onClose}
      maxW="820px"
      onSubmit={handleSubmit}
    >
      <VStack align="stretch" gap="5">
        {formError && (
          <Box
            p="3"
            borderRadius="field"
            bg="status.dangerSoft"
            border="1px solid"
            borderColor="status.dangerBorder"
            color="status.danger"
            fontSize="sm"
          >
            {formError}
          </Box>
        )}

        <TitleSlugFields
          titleLabel="Título del artículo"
          titlePlaceholder="Ej: Vidrio laminado en ventanas y mamparas"
          title={title}
          onTitleChange={handleTitleChange}
          slugLabel="Slug (URL)"
          slugPlaceholder="vidrio-laminado-ventanas-mamparas"
          slug={slug}
          onSlugChange={setManualSlug}
          routePrefix="/blog/"
          slugFallback="nuevo-articulo"
        />

        <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
          <Field label="Fecha de publicación" required>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              minH="12"
            />
          </Field>

          <Field label="Autor" required>
            <Input
              placeholder="GYA Company"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              minH="12"
            />
          </Field>
        </SimpleGrid>

        <Field
          label="Meta descripción (SEO)"
          required
          helperText={
            <Text fontSize="xs" color={descriptionStatus.color} fontWeight="medium">
              {descriptionStatus.label}
            </Text>
          }
        >
          <Textarea
            placeholder="Resumen conciso para buscadores (entre 120 y 160 caracteres)..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            required
          />
        </Field>

        <Field label="Extracto (tarjeta de listado)" required>
          <Textarea
            placeholder="Introducción breve que aparece en la tarjeta del blog..."
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={2}
            required
          />
        </Field>

        <VStack align="stretch" gap="3">
          <ImageUploadZone
            value={image}
            onChange={setImage}
            entity="blog"
            entityId={slug.trim() || "borrador"}
            fileName="cover.webp"
            exactFileName
            label="Imagen de portada (Storage blog/{slug}/cover.webp)"
            helperText="Sube la portada a Firebase Storage o ingresa abajo una ruta local (/images/...)"
            disabled={loading || !slug.trim()}
          />

          <Field
            label="URL de imagen (Storage o local)"
            required
            helperText={
              !slug.trim()
                ? "Ingresa el título o slug para habilitar la subida directa a blog/{slug}/cover.webp."
                : "Puedes usar la URL subida a Storage o una ruta local como /images/home-img_t01.webp."
            }
          >
            <Input
              placeholder="/images/home-img_t01.webp"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
              minH="12"
            />
          </Field>
        </VStack>

        <Field
          label="Etiquetas (separadas por coma)"
          helperText="Recomendado: 3 a 5 términos técnicos."
        >
          <VStack align="stretch" gap="2" w="full">
            <Input
              placeholder="Vidrio Laminado, Seguridad, Ventanas"
              value={tagsText}
              onChange={(e) => setTagsText(e.target.value)}
              minH="12"
            />
            {parsedTags.length > 0 && (
              <HStack gap="2" wrap="wrap">
                {parsedTags.map((tag) => (
                  <Badge key={tag} variant="chipInk" gap="1.5">
                    <span>{tag}</span>
                    <chakra.button
                      type="button"
                      aria-label={`Quitar etiqueta ${tag}`}
                      onClick={() => handleRemoveTag(tag)}
                      display="inline-flex"
                      alignItems="center"
                      cursor="pointer"
                    >
                      <X size={12} aria-hidden />
                    </chakra.button>
                  </Badge>
                ))}
              </HStack>
            )}
          </VStack>
        </Field>

        <VStack align="stretch" gap="2">
          <HStack justify="space-between" wrap="wrap" gap="2">
            <Text fontSize="sm" fontWeight="semibold" color="text.heading">
              Contenido HTML *
            </Text>
            <HStack gap="2" role="tablist" aria-label="Modo de edición de contenido">
              <Button
                type="button"
                size="sm"
                minH="11"
                variant={contentMode === "edit" ? "primary" : "outline"}
                onClick={() => setContentMode("edit")}
                aria-selected={contentMode === "edit"}
                role="tab"
              >
                <Code2 size={15} aria-hidden />
                Editar HTML
              </Button>
              <Button
                type="button"
                size="sm"
                minH="11"
                variant={contentMode === "preview" ? "primary" : "outline"}
                onClick={() => setContentMode("preview")}
                aria-selected={contentMode === "preview"}
                role="tab"
              >
                <Eye size={15} aria-hidden />
                Vista previa
              </Button>
            </HStack>
          </HStack>

          {contentMode === "edit" ? (
            <Field
              helperText="Se permiten etiquetas seguras (h2, h3, p, ul, ol, li, blockquote, a, img, strong, em, code, table). Al guardar se eliminan <script>, <iframe>, atributos on*= y javascript:."
            >
              <Textarea
                placeholder="<h2>Subtítulo</h2>&#10;<p>Contenido del artículo...</p>"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={12}
                fontFamily="mono"
                fontSize="sm"
              />
            </Field>
          ) : (
            <Box
              p={{ base: "4", md: "6" }}
              borderRadius="card"
              bg="surface.card"
              border="1px solid"
              borderColor="border.default"
              minH="64"
              maxH="96"
              overflowY="auto"
            >
              {sanitizedPreviewHtml ? (
                <Box
                  color="text.body"
                  fontSize="md"
                  lineHeight="tall"
                  css={{
                    "& h2": {
                      fontFamily: "var(--chakra-fonts-heading)",
                      fontSize: "var(--chakra-font-sizes-2xl)",
                      fontWeight: 700,
                      color: "var(--chakra-colors-text-heading)",
                      marginTop: "var(--chakra-spacing-6)",
                      marginBottom: "var(--chakra-spacing-3)",
                    },
                    "& h3": {
                      fontFamily: "var(--chakra-fonts-heading)",
                      fontSize: "var(--chakra-font-sizes-xl)",
                      fontWeight: 700,
                      color: "var(--chakra-colors-text-heading)",
                      marginTop: "var(--chakra-spacing-5)",
                      marginBottom: "var(--chakra-spacing-2)",
                    },
                    "& p": {
                      marginBottom: "var(--chakra-spacing-4)",
                    },
                    "& ul, & ol": {
                      paddingLeft: "var(--chakra-spacing-6)",
                      marginBottom: "var(--chakra-spacing-4)",
                    },
                    "& li": {
                      marginBottom: "var(--chakra-spacing-1)",
                    },
                    "& blockquote": {
                      borderLeftWidth: "3px",
                      borderLeftStyle: "solid",
                      borderLeftColor: "var(--chakra-colors-border-strong)",
                      paddingLeft: "var(--chakra-spacing-4)",
                      fontStyle: "italic",
                      color: "var(--chakra-colors-text-muted)",
                      marginY: "var(--chakra-spacing-4)",
                    },
                    "& a": {
                      textDecoration: "underline",
                      color: "var(--chakra-colors-text-heading)",
                    },
                  }}
                  dangerouslySetInnerHTML={{ __html: sanitizedPreviewHtml }}
                />
              ) : (
                <Text fontSize="sm" color="text.muted">
                  Escribe contenido HTML en la pestaña &ldquo;Editar HTML&rdquo; para ver la vista previa sanitizada.
                </Text>
              )}
            </Box>
          )}
        </VStack>

        <Box
          p="4"
          borderRadius="field"
          bg="bg.subtle"
          border="1px solid"
          borderColor="border.default"
        >
          <PublishedCheckbox
            checked={published}
            onChange={setPublished}
            label="Publicar artículo"
            description="Si está activo, el artículo será visible en /blog y se incluirá en el próximo build del sitemap."
          />
        </Box>

        <HStack justify="flex-end" gap="3" pt="2">
          <Button
            type="button"
            variant="outline"
            minH="11"
            onClick={onClose}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button type="submit" minH="11" loading={loading}>
            {isEditing ? "Guardar cambios" : "Crear artículo"}
          </Button>
        </HStack>
      </VStack>
    </AdminDialog>
  );
};
