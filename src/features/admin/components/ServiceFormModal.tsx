"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Input,
  Textarea,
  Button,
  Spinner,
  Badge,
  IconButton,
  SimpleGrid,
} from "@chakra-ui/react";
import {
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogTitle,
  DialogCloseTrigger,
} from "@/components/ui/dialog";
import { Field } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2, Sparkles, Layers } from "lucide-react";
import { ImageUploadZone } from "./ImageUploadZone";
import { AlbumGalleryUploader, type GalleryPhotoItem } from "./AlbumGalleryUploader";
import type {
  Service,
  CreateServiceInput,
  UpdateServiceInput,
} from "@/shared/api/firebase/types";

export interface ServiceFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  service?: Service | null;
  onSubmit: (data: CreateServiceInput | UpdateServiceInput) => Promise<void>;
  loading?: boolean;
}

export const ServiceFormModal: React.FC<ServiceFormModalProps> = ({
  isOpen,
  onClose,
  service,
  onSubmit,
  loading = false,
}) => {
  const isEditing = Boolean(service);

  // Estados del formulario
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [order, setOrder] = useState<number>(0);
  const [published, setPublished] = useState(true);
  const [coverImage, setCoverImage] = useState("");
  const [features, setFeatures] = useState<string[]>([]);
  const [newFeature, setNewFeature] = useState("");
  const [galleryItems, setGalleryItems] = useState<GalleryPhotoItem[]>([]);
  const [autoSlug, setAutoSlug] = useState(true);
  const [formError, setFormError] = useState<string | null>(null);

  // Inicialización al abrir o cambiar de servicio
  useEffect(() => {
    if (service) {
      setTitle(service.title || "");
      setSlug(service.slug || "");
      setShortDescription(service.shortDescription || "");
      setFullDescription(service.fullDescription || "");
      setOrder(service.order ?? 0);
      setPublished(service.published ?? true);
      setCoverImage(service.coverImage || "");
      setFeatures(service.features || []);
      setGalleryItems(
        (service.gallery || []).map((g) => ({
          id: g.id,
          url: g.url,
          alt: g.alt || "",
        }))
      );
      setAutoSlug(false);
    } else {
      // Modo creación
      setTitle("");
      setSlug("");
      setShortDescription("");
      setFullDescription("");
      setOrder(0);
      setPublished(true);
      setCoverImage("");
      setFeatures([]);
      setGalleryItems([]);
      setAutoSlug(true);
    }
    setNewFeature("");
    setFormError(null);
  }, [service, isOpen]);

  // Generador automático de slug desde el título
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (autoSlug) {
      const generatedSlug = val
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setSlug(generatedSlug);
    }
  };

  const handleAddFeature = () => {
    if (!newFeature.trim()) return;
    setFeatures([...features, newFeature.trim()]);
    setNewFeature("");
  };

  const handleRemoveFeature = (idx: number) => {
    setFeatures(features.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Validaciones básicas
    if (!title.trim()) {
      setFormError("El título del servicio es obligatorio");
      return;
    }
    if (!slug.trim()) {
      setFormError("El slug del servicio es obligatorio");
      return;
    }
    if (!shortDescription.trim()) {
      setFormError("La descripción corta es obligatoria");
      return;
    }
    if (!fullDescription.trim()) {
      setFormError("La descripción completa es obligatoria");
      return;
    }
    if (!coverImage.trim()) {
      setFormError("Debes cargar una imagen de portada para el servicio");
      return;
    }

    const payload = {
      title: title.trim(),
      slug: slug.trim(),
      shortDescription: shortDescription.trim(),
      fullDescription: fullDescription.trim(),
      order: Number(order) || 0,
      published,
      coverImage: coverImage.trim(),
      features,
      gallery: galleryItems.map((item) => ({
        id: item.id,
        url: item.url,
        alt: item.alt || item.caption || "",
      })),
    };

    try {
      await onSubmit(payload);
      onClose();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error al guardar el servicio";
      setFormError(msg);
    }
  };

  return (
    <DialogRoot
      open={isOpen}
      onOpenChange={(details) => !details.open && onClose()}
      size="xl"
      scrollBehavior="inside"
    >
      <DialogContent maxW={{ base: "95vw", md: "780px" }} borderRadius="2xl" p="0" overflow="hidden">
        <form onSubmit={handleSubmit}>
          {/* Header */}
          <DialogHeader p="5" borderBottom="1px solid" borderColor="border.default" bg="bg.subtle">
            <HStack justify="space-between">
              <HStack gap="2.5">
                <Box
                  p="2"
                  borderRadius="lg"
                  bg="rgba(56, 189, 248, 0.12)"
                  color="#38bdf8"
                >
                  <Layers size={20} style={{ flexShrink: 0 }} />
                </Box>
                <VStack align="start" gap="0">
                  <DialogTitle fontSize="lg" fontWeight="bold">
                    {isEditing ? `Editar Servicio: ${service?.title}` : "Crear Nuevo Servicio"}
                  </DialogTitle>
                  <Text fontSize="xs" color="text.muted">
                    Completa la información técnica, galería y estado de publicación
                  </Text>
                </VStack>
              </HStack>
              <DialogCloseTrigger />
            </HStack>
          </DialogHeader>

          {/* Body */}
          <DialogBody p="6">
            <VStack gap="5" align="stretch">
              {formError && (
                <Box
                  p="3"
                  borderRadius="lg"
                  bg="rgba(239, 68, 68, 0.1)"
                  border="1px solid"
                  borderColor="red.500"
                  color="red.500"
                  fontSize="sm"
                >
                  {formError}
                </Box>
              )}

              {/* Título y Slug */}
              <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
                <Field label="Título del Servicio" required>
                  <Input
                    placeholder="Ej. Ventanas de Aluminio Antirruido"
                    value={title}
                    onChange={handleTitleChange}
                    required
                  />
                </Field>

                <Field
                  label="Slug (URL amigable)"
                  required
                  helperText={
                    <Text fontSize="2xs" color="text.muted">
                      Ruta web: /servicios/{slug || "slug-del-servicio"}
                    </Text>
                  }
                >
                  <Input
                    placeholder="ej. ventanas-antirruido"
                    value={slug}
                    onChange={(e) => {
                      setAutoSlug(false);
                      setSlug(e.target.value);
                    }}
                    required
                  />
                </Field>
              </SimpleGrid>

              {/* Descripciones */}
              <Field
                label="Descripción Corta (Resumen para catálogo)"
                required
                helperText="Máximo 160 caracteres recomendado para previsualización"
              >
                <Input
                  placeholder="Sistemas herméticos en vidrio templado y aluminio para aislamiento acústico..."
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  maxLength={250}
                  required
                />
              </Field>

              <Field
                label="Descripción Completa"
                required
                helperText="Detalles técnicos, sistemas disponibles (Nova, Serie 25, 35, 62), ventajas y usos"
              >
                <Textarea
                  placeholder="Describe exhaustivamente los acabados, especificaciones de perfilería y cristalería..."
                  value={fullDescription}
                  onChange={(e) => setFullDescription(e.target.value)}
                  rows={4}
                  required
                />
              </Field>

              {/* Características Clave (Tags / Lista) */}
              <VStack align="stretch" gap="2">
                <Field
                  label="Características Técnicas / Ventajas"
                  helperText="Presiona enter o haz clic en '+' para agregar viñetas"
                >
                  <HStack gap="2">
                    <Input
                      placeholder="Ej. Aislamiento acústico de hasta 35dB"
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddFeature();
                        }
                      }}
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      borderColor="border.default"
                      onClick={handleAddFeature}
                      type="button"
                    >
                      <Plus size={16} style={{ flexShrink: 0 }} />
                    </Button>
                  </HStack>
                </Field>

                {features.length > 0 && (
                  <HStack wrap="wrap" gap="2" pt="1">
                    {features.map((feat, idx) => (
                      <Badge
                        key={idx}
                        size="md"
                        variant="subtle"
                        colorPalette="blue"
                        px="2.5"
                        py="1"
                        borderRadius="md"
                      >
                        <Text as="span" mr="1.5">
                          {feat}
                        </Text>
                        <IconButton
                          aria-label="Remover característica"
                          size="2xs"
                          variant="ghost"
                          color="text.muted"
                          _hover={{ color: "red.500" }}
                          onClick={() => handleRemoveFeature(idx)}
                        >
                          <Trash2 size={12} style={{ flexShrink: 0 }} />
                        </IconButton>
                      </Badge>
                    ))}
                  </HStack>
                )}
              </VStack>

              {/* Cover Image Upload */}
              <Box pt="2">
                <ImageUploadZone
                  value={coverImage}
                  onChange={setCoverImage}
                  entity="services"
                  entityId={service?.id || slug || "nuevo-servicio"}
                  label="Imagen de Portada Principal"
                  aspectRatio="16/9"
                />
              </Box>

              {/* Album Galería Múltiple */}
              <Box pt="2">
                <AlbumGalleryUploader
                  items={galleryItems}
                  onChange={setGalleryItems}
                  entity="services"
                  entityId={service?.id || slug || "nuevo-servicio"}
                  label="Galería de Fotos del Servicio"
                  captionFieldLabel="Texto alternativo (Alt)"
                  maxFiles={15}
                />
              </Box>

              {/* Orden y Publicación */}
              <SimpleGrid columns={{ base: 1, sm: 2 }} gap="4" pt="3" borderTop="1px solid" borderColor="border.subtle">
                <Field label="Orden de visualización (prioridad)">
                  <Input
                    type="number"
                    value={order}
                    onChange={(e) => setOrder(Number(e.target.value))}
                    min={0}
                  />
                </Field>

                <Box display="flex" alignItems="center" pt={{ base: 0, sm: 6 }}>
                  <Checkbox
                    checked={published}
                    onCheckedChange={(details) => setPublished(Boolean(details.checked))}
                  >
                    <VStack align="start" gap="0">
                      <Text fontSize="sm" fontWeight="medium">
                        Publicado en el sitio web
                      </Text>
                      <Text fontSize="xs" color="text.muted">
                        Si está desmarcado, se guardará como borrador interno
                      </Text>
                    </VStack>
                  </Checkbox>
                </Box>
              </SimpleGrid>
            </VStack>
          </DialogBody>

          {/* Footer */}
          <DialogFooter p="5" borderTop="1px solid" borderColor="border.default" bg="bg.subtle">
            <HStack justify="flex-end" gap="3">
              <Button
                variant="outline"
                borderColor="border.default"
                onClick={onClose}
                disabled={loading}
                type="button"
              >
                Cancelar
              </Button>
              <Button
                colorPalette="blue"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner size="xs" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <Sparkles size={16} style={{ flexShrink: 0 }} />
                    {isEditing ? "Guardar Cambios" : "Publicar Servicio"}
                  </>
                )}
              </Button>
            </HStack>
          </DialogFooter>
        </form>
      </DialogContent>
    </DialogRoot>
  );
};
