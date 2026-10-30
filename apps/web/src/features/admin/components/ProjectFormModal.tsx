"use client";

import React, { useState, useEffect } from "react";
import { Box, Input, Textarea, SimpleGrid } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { Building2 } from "lucide-react";
import { type GalleryPhotoItem } from "./AlbumGalleryUploader";
import { ProjectServiceSelect } from "./form/ProjectServiceSelect";
import { validateProjectForm } from "./form/projectFormValidation";
import { FormModalShell } from "./form/FormModalShell";
import { TitleSlugFields } from "./form/TitleSlugFields";
import { MediaFields } from "./form/MediaFields";
import { PublishedCheckbox } from "./form/PublishedCheckbox";
import { useAutoSlug } from "../hooks/useAutoSlug";
import type {
  Project,
  CreateProjectInput,
  UpdateProjectInput,
  Service,
} from "@/shared/api/firebase/types";

export interface ProjectFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  project?: Project | null;
  servicesList?: Service[];
  onSubmit: (data: CreateProjectInput | UpdateProjectInput) => Promise<void>;
  loading?: boolean;
}

export const ProjectFormModal: React.FC<ProjectFormModalProps> = ({
  isOpen,
  onClose,
  project,
  servicesList = [],
  onSubmit,
  loading = false,
}) => {
  const isEditing = Boolean(project);

  // Estados del formulario
  const [title, setTitle] = useState("");
  const { slug, syncFromTitle, setManualSlug, resetSlug } = useAutoSlug();
  const [client, setClient] = useState("");
  const [location, setLocation] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [description, setDescription] = useState("");
  const [completedAt, setCompletedAt] = useState("");
  const [published, setPublished] = useState(true);
  const [coverImage, setCoverImage] = useState("");
  const [galleryItems, setGalleryItems] = useState<GalleryPhotoItem[]>([]);
  const [formError, setFormError] = useState<string | null>(null);

  // Inicialización al abrir o cambiar de proyecto
  useEffect(() => {
    if (project) {
      setTitle(project.title || "");
      setClient(project.client || "");
      setLocation(project.location || "");
      setServiceId(project.serviceId || (servicesList[0]?.id ?? "general"));
      setDescription(project.description || "");
      setCompletedAt(project.completedAt || "");
      setPublished(project.published ?? true);
      setCoverImage(project.coverImage || "");
      setGalleryItems(
        (project.gallery || []).map((g) => ({
          id: g.id,
          url: g.url,
          caption: g.caption || "",
        }))
      );
      resetSlug(project.slug || "", false);
    } else {
      // Modo creación
      setTitle("");
      setClient("");
      setLocation("Lima, Perú");
      setServiceId(servicesList[0]?.id ?? "general");
      setDescription("");
      setCompletedAt(new Date().getFullYear().toString());
      setPublished(true);
      setCoverImage("");
      setGalleryItems([]);
      resetSlug("", true);
    }
    setFormError(null);
  }, [project, isOpen, servicesList, resetSlug]);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    syncFromTitle(val);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const validationError = validateProjectForm({ title, slug, client, location, serviceId, description, coverImage });
    if (validationError) {
      setFormError(validationError);
      return;
    }

    const payload = {
      title: title.trim(),
      slug: slug.trim(),
      client: client.trim(),
      location: location.trim(),
      serviceId: serviceId.trim(),
      description: description.trim(),
      completedAt: completedAt.trim() || undefined,
      published,
      coverImage: coverImage.trim(),
      gallery: galleryItems.map((item) => ({
        id: item.id,
        url: item.url,
        caption: item.caption || item.alt || "",
      })),
    };

    try {
      await onSubmit(payload);
      onClose();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error al guardar el proyecto";
      setFormError(msg);
    }
  };

  return (
    <FormModalShell
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      maxW="800px"
      icon={<Building2 size={20} style={{ flexShrink: 0 }} />}
      iconBg="rgba(168, 85, 247, 0.12)"
      iconColor="var(--chakra-colors-accent-violet)"
      title={isEditing ? `Editar Obra: ${project?.title}` : "Registrar Nueva Obra / Proyecto"}
      subtitle="Portafolio fotográfico de carpintería de aluminio y cristalería arquitectónica"
      formError={formError}
      loading={loading}
      colorPalette="purple"
      submitLabel={isEditing ? "Guardar Cambios" : "Publicar Proyecto"}
    >
      <TitleSlugFields
        titleLabel="Nombre del Proyecto / Obra"
        titlePlaceholder="Ej. Residencial Las Palmeras - Miraflores"
        title={title}
        onTitleChange={handleTitleChange}
        slugLabel="Slug identificador"
        slugPlaceholder="ej. residencial-las-palmeras"
        slug={slug}
        onSlugChange={setManualSlug}
        routePrefix="/proyectos/"
        slugFallback="slug-del-proyecto"
      />

      {/* Cliente, Ubicación, Año y Servicio */}
      <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} gap="4">
        <Field label="Cliente / Constructora" required>
          <Input
            placeholder="Ej. Inmobiliaria Panorama"
            value={client}
            onChange={(e) => setClient(e.target.value)}
            required
          />
        </Field>

        <Field label="Ubicación" required>
          <Input
            placeholder="Ej. San Isidro, Lima"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </Field>

        <Field label="Año / Conclusión">
          <Input
            placeholder="Ej. 2025"
            value={completedAt}
            onChange={(e) => setCompletedAt(e.target.value)}
          />
        </Field>

        <ProjectServiceSelect value={serviceId} onChange={setServiceId} servicesList={servicesList} />
      </SimpleGrid>

      {/* Descripción */}
      <Field
        label="Memoria Descriptiva de la Obra"
        required
        helperText="Detalla los sistemas empleados (ej. Serie 35 con vidrio laminado 8mm incoloro, muro cortina, etc.)"
      >
        <Textarea
          placeholder="Instalación integral de mamparas corredizas Serie 35 y ventanas herméticas antirruido con herrajes importados..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          required
        />
      </Field>

      <MediaFields
        entity="projects"
        entityId={project?.id || slug || "nuevo-proyecto"}
        coverImage={coverImage}
        onCoverChange={setCoverImage}
        coverLabel="Foto de Portada de la Obra"
        galleryItems={galleryItems}
        onGalleryChange={setGalleryItems}
        albumLabel="Álbum de Fotos de Obra (Avance y Conclusión)"
        captionFieldLabel="Leyenda"
        maxFiles={20}
      />

      {/* Publicación */}
      <Box pt="3" borderTop="1px solid" borderColor="border.subtle">
        <PublishedCheckbox
          checked={published}
          onChange={setPublished}
          label="Publicado en el catálogo público de Proyectos"
          description="Visible inmediatamente en la galería y portafolio de obras de la empresa"
        />
      </Box>
    </FormModalShell>
  );
};
