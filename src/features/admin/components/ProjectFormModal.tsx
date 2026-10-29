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
import { Sparkles, Building2 } from "lucide-react";
import { ImageUploadZone } from "./ImageUploadZone";
import { AlbumGalleryUploader, type GalleryPhotoItem } from "./AlbumGalleryUploader";
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
  const [slug, setSlug] = useState("");
  const [client, setClient] = useState("");
  const [location, setLocation] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [description, setDescription] = useState("");
  const [completedAt, setCompletedAt] = useState("");
  const [published, setPublished] = useState(true);
  const [coverImage, setCoverImage] = useState("");
  const [galleryItems, setGalleryItems] = useState<GalleryPhotoItem[]>([]);
  const [autoSlug, setAutoSlug] = useState(true);
  const [formError, setFormError] = useState<string | null>(null);

  // Inicialización al abrir o cambiar de proyecto
  useEffect(() => {
    if (project) {
      setTitle(project.title || "");
      setSlug(project.slug || "");
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
      setAutoSlug(false);
    } else {
      // Modo creación
      setTitle("");
      setSlug("");
      setClient("");
      setLocation("Lima, Perú");
      setServiceId(servicesList[0]?.id ?? "general");
      setDescription("");
      setCompletedAt(new Date().getFullYear().toString());
      setPublished(true);
      setCoverImage("");
      setGalleryItems([]);
      setAutoSlug(true);
    }
    setFormError(null);
  }, [project, isOpen, servicesList]);

  // Generador de slug automático
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Validaciones
    if (!title.trim()) {
      setFormError("El título de la obra es obligatorio");
      return;
    }
    if (!slug.trim()) {
      setFormError("El slug del proyecto es obligatorio");
      return;
    }
    if (!client.trim()) {
      setFormError("El cliente o constructora es obligatorio");
      return;
    }
    if (!location.trim()) {
      setFormError("La ubicación es obligatoria");
      return;
    }
    if (!serviceId.trim()) {
      setFormError("Debes seleccionar el servicio vinculado");
      return;
    }
    if (!description.trim()) {
      setFormError("La descripción técnica del proyecto es obligatoria");
      return;
    }
    if (!coverImage.trim()) {
      setFormError("Debes cargar una foto principal de portada");
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
    <DialogRoot
      open={isOpen}
      onOpenChange={(details) => !details.open && onClose()}
      size="xl"
      scrollBehavior="inside"
    >
      <DialogContent maxW={{ base: "95vw", md: "800px" }} borderRadius="2xl" p="0" overflow="hidden">
        <form onSubmit={handleSubmit}>
          {/* Header */}
          <DialogHeader p="5" borderBottom="1px solid" borderColor="border.default" bg="bg.subtle">
            <HStack justify="space-between">
              <HStack gap="2.5">
                <Box
                  p="2"
                  borderRadius="lg"
                  bg="rgba(168, 85, 247, 0.12)"
                  color="#a855f7"
                >
                  <Building2 size={20} style={{ flexShrink: 0 }} />
                </Box>
                <VStack align="start" gap="0">
                  <DialogTitle fontSize="lg" fontWeight="bold">
                    {isEditing ? `Editar Obra: ${project?.title}` : "Registrar Nueva Obra / Proyecto"}
                  </DialogTitle>
                  <Text fontSize="xs" color="text.muted">
                    Portafolio fotográfico de carpintería de aluminio y cristalería arquitectónica
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
                <Field label="Nombre del Proyecto / Obra" required>
                  <Input
                    placeholder="Ej. Residencial Las Palmeras - Miraflores"
                    value={title}
                    onChange={handleTitleChange}
                    required
                  />
                </Field>

                <Field
                  label="Slug identificador"
                  required
                  helperText={
                    <Text fontSize="2xs" color="text.muted">
                      Ruta web: /proyectos/{slug || "slug-del-proyecto"}
                    </Text>
                  }
                >
                  <Input
                    placeholder="ej. residencial-las-palmeras"
                    value={slug}
                    onChange={(e) => {
                      setAutoSlug(false);
                      setSlug(e.target.value);
                    }}
                    required
                  />
                </Field>
              </SimpleGrid>

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

                <Field label="Servicio Principal" required>
                  <select
                    style={{
                      width: "100%",
                      height: "40px",
                      paddingLeft: "12px",
                      paddingRight: "12px",
                      borderRadius: "6px",
                      border: "1px solid var(--chakra-colors-border-default, #e2e8f0)",
                      backgroundColor: "var(--chakra-colors-surface-card, transparent)",
                      color: "inherit",
                      fontSize: "14px",
                    }}
                    value={serviceId}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setServiceId(e.target.value)}
                    required
                  >
                    {servicesList.length > 0 ? (
                      servicesList.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.title}
                        </option>
                      ))
                    ) : (
                      <>
                        <option value="ventanas">Ventanas de Aluminio</option>
                        <option value="mamparas">Mamparas</option>
                        <option value="duchas">Boxes de Ducha</option>
                        <option value="parapeto">Parapetos de Vidrio</option>
                        <option value="general">Carpintería General</option>
                      </>
                    )}
                  </select>
                </Field>
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

              {/* Cover Image Upload */}
              <Box pt="2">
                <ImageUploadZone
                  value={coverImage}
                  onChange={setCoverImage}
                  entity="projects"
                  entityId={project?.id || slug || "nuevo-proyecto"}
                  label="Foto de Portada de la Obra"
                  aspectRatio="16/9"
                />
              </Box>

              {/* Álbum Galería Múltiple */}
              <Box pt="2">
                <AlbumGalleryUploader
                  items={galleryItems}
                  onChange={setGalleryItems}
                  entity="projects"
                  entityId={project?.id || slug || "nuevo-proyecto"}
                  label="Álbum de Fotos de Obra (Avance y Conclusión)"
                  captionFieldLabel="Leyenda"
                  maxFiles={20}
                />
              </Box>

              {/* Publicación */}
              <Box pt="3" borderTop="1px solid" borderColor="border.subtle">
                <Checkbox
                  checked={published}
                  onCheckedChange={(details) => setPublished(Boolean(details.checked))}
                >
                  <VStack align="start" gap="0">
                    <Text fontSize="sm" fontWeight="medium">
                      Publicado en el catálogo público de Proyectos
                    </Text>
                    <Text fontSize="xs" color="text.muted">
                      Visible inmediatamente en la galería y portafolio de obras de la empresa
                    </Text>
                  </VStack>
                </Checkbox>
              </Box>
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
                colorPalette="purple"
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
                    {isEditing ? "Guardar Cambios" : "Publicar Proyecto"}
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
