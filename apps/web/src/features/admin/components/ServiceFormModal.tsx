"use client";

import React, { useState, useEffect } from "react";
import { Box, Input, Textarea, SimpleGrid } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { Layers } from "lucide-react";
import { FeaturesEditor } from "./form/FeaturesEditor";
import { type GalleryPhotoItem } from "./AlbumGalleryUploader";
import { FormModalShell } from "./form/FormModalShell";
import { TitleSlugFields } from "./form/TitleSlugFields";
import { MediaFields } from "./form/MediaFields";
import { PublishedCheckbox } from "./form/PublishedCheckbox";
import { useAutoSlug } from "../hooks/useAutoSlug";
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
  const { slug, syncFromTitle, setManualSlug, resetSlug } = useAutoSlug();
  const [shortDescription, setShortDescription] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [order, setOrder] = useState<number>(0);
  const [published, setPublished] = useState(true);
  const [coverImage, setCoverImage] = useState("");
  const [features, setFeatures] = useState<string[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryPhotoItem[]>([]);
  const [formError, setFormError] = useState<string | null>(null);

  // Inicialización al abrir o cambiar de servicio
  useEffect(() => {
    if (service) {
      setTitle(service.title || "");
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
      resetSlug(service.slug || "", false);
    } else {
      // Modo creación
      setTitle("");
      setShortDescription("");
      setFullDescription("");
      setOrder(0);
      setPublished(true);
      setCoverImage("");
      setFeatures([]);
      setGalleryItems([]);
      resetSlug("", true);
    }
    setFormError(null);
  }, [service, isOpen, resetSlug]);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    syncFromTitle(val);
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
    <FormModalShell
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      maxW="780px"
      icon={<Layers size={20} style={{ flexShrink: 0 }} />}
      iconBg="rgba(56, 189, 248, 0.12)"
      iconColor="#38bdf8"
      title={isEditing ? `Editar Servicio: ${service?.title}` : "Crear Nuevo Servicio"}
      subtitle="Completa la información técnica, galería y estado de publicación"
      formError={formError}
      loading={loading}
      colorPalette="blue"
      submitLabel={isEditing ? "Guardar Cambios" : "Publicar Servicio"}
    >
      <TitleSlugFields
        titleLabel="Título del Servicio"
        titlePlaceholder="Ej. Ventanas de Aluminio Antirruido"
        title={title}
        onTitleChange={handleTitleChange}
        slugLabel="Slug (URL amigable)"
        slugPlaceholder="ej. ventanas-antirruido"
        slug={slug}
        onSlugChange={setManualSlug}
        routePrefix="/servicios/"
        slugFallback="slug-del-servicio"
      />

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

      <FeaturesEditor key={`${service?.id ?? "new"}-${isOpen}`} features={features} onChange={setFeatures} />

      <MediaFields
        entity="services"
        entityId={service?.id || slug || "nuevo-servicio"}
        coverImage={coverImage}
        onCoverChange={setCoverImage}
        coverLabel="Imagen de Portada Principal"
        galleryItems={galleryItems}
        onGalleryChange={setGalleryItems}
        albumLabel="Galería de Fotos del Servicio"
        captionFieldLabel="Texto alternativo (Alt)"
        maxFiles={15}
      />

      {/* Orden y Publicación */}
      <SimpleGrid columns={{ base: 1, sm: 2 }} gap="4" pt="3" borderTop="1px solid" borderColor="border.subtle">
        <Field label="Orden de visualización (prioridad)">
          <Input type="number" value={order} onChange={(e) => setOrder(Number(e.target.value))} min={0} />
        </Field>

        <Box display="flex" alignItems="center" pt={{ base: 0, sm: 6 }}>
          <PublishedCheckbox
            checked={published}
            onChange={setPublished}
            label="Publicado en el sitio web"
            description="Si está desmarcado, se guardará como borrador interno"
          />
        </Box>
      </SimpleGrid>
    </FormModalShell>
  );
};
