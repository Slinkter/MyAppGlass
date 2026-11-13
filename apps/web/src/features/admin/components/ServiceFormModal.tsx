"use client";

import React, { useState, useEffect } from "react";
import { Accordion, Box, Button, HStack, Input, SimpleGrid, Text, Textarea, VStack } from "@chakra-ui/react";
import { Field } from "@/shared/ui/field";
import { Sparkles } from "lucide-react";
import { FeaturesEditor } from "./form/FeaturesEditor";
import { SpecsEditor } from "./form/SpecsEditor";
import { SystemSheetsEditor } from "./form/SystemSheetsEditor";
import { FaqsEditor } from "./form/FaqsEditor";
import { type GalleryPhotoItem } from "./AlbumGalleryUploader";
import { AdminDialog } from "./form/AdminDialog";
import { TitleSlugFields } from "./form/TitleSlugFields";
import { MediaFields } from "./form/MediaFields";
import { PublishedCheckbox } from "./form/PublishedCheckbox";
import { useAutoSlug } from "../hooks/useAutoSlug";
import type {
  Service,
  ServiceFaq,
  ServiceSpec,
  ServiceSystemSheet,
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
  const [specs, setSpecs] = useState<ServiceSpec[]>([]);
  const [systemSheets, setSystemSheets] = useState<ServiceSystemSheet[]>([]);
  const [faqs, setFaqs] = useState<ServiceFaq[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryPhotoItem[]>([]);
  const [formError, setFormError] = useState<string | null>(null);

  // Inicialización al abrir o cambiar de servicio
  useEffect(() => {
    if (!isOpen) return;

    if (service) {
      setTitle(service.title || "");
      setShortDescription(service.shortDescription || "");
      setFullDescription(service.fullDescription || "");
      setOrder(service.order ?? 0);
      setPublished(service.published ?? true);
      setCoverImage(service.coverImage || "");
      setFeatures(service.features || []);
      setSpecs(service.specs || []);
      setSystemSheets(service.systemSheets || []);
      setFaqs(service.faqs || []);
      setGalleryItems(
        (service.gallery || []).map((g) => ({
          id: g.id,
          url: g.url,
          alt: g.alt || "",
          system: g.system,
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
      setSpecs([]);
      setSystemSheets([]);
      setFaqs([]);
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
      specs: specs
        .filter((s) => s.label.trim() && s.value.trim())
        .map((s) => ({
          ...(s.grupo?.trim() ? { grupo: s.grupo.trim() } : {}),
          label: s.label.trim(),
          value: s.value.trim(),
        })),
      systemSheets: systemSheets
        .filter((s) => s.nombre.trim() && s.resumen.trim())
        .map((s) => ({
          nombre: s.nombre.trim(),
          resumen: s.resumen.trim(),
          specs: s.specs
            .filter((sp) => sp.label.trim() && sp.value.trim())
            .map((sp) => ({
              ...(sp.grupo?.trim() ? { grupo: sp.grupo.trim() } : {}),
              label: sp.label.trim(),
              value: sp.value.trim(),
            })),
          usos: s.usos.map((u) => u.trim()).filter(Boolean),
        })),
      faqs: faqs
        .filter((f) => f.question.trim() && f.answer.trim())
        .map((f) => ({
          question: f.question.trim(),
          answer: f.answer.trim(),
        })),
      gallery: galleryItems.map((item) => ({
        id: item.id,
        url: item.url,
        alt: item.alt || item.caption || "",
        system: item.system || undefined,
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

  if (!isOpen) return null;

  return (
    <AdminDialog
      eyebrow="Servicios"
      title={isEditing ? `Editar Servicio: ${service?.title}` : "Crear Nuevo Servicio"}
      maxW="780px"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <VStack gap="5" align="stretch">
        <Text fontSize="xs" color="text.muted">
          Completa la información técnica, galería y estado de publicación
        </Text>

        {formError && (
          <Box
            role="alert"
            p="3"
            borderRadius="xl"
            bg="status.dangerSoft"
            border="1px solid"
            borderColor="status.dangerBorder"
            color="status.dangerText"
            fontSize="sm"
          >
            {formError}
          </Box>
        )}

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

        <Accordion.Root multiple variant="outline" borderRadius="xl" borderColor="border.default">
          <Accordion.Item value="ficha-tecnica">
            <Accordion.ItemTrigger minH="11" px="4" py="3" cursor="pointer">
              <HStack flex="1" justify="space-between">
                <Text fontSize="sm" fontWeight="semibold" color="text.heading">
                  Ficha técnica
                </Text>
                <Text fontSize="xs" color="text.muted">
                  {specs.length} specs · {systemSheets.length} sistemas
                </Text>
              </HStack>
              <Accordion.ItemIndicator />
            </Accordion.ItemTrigger>
            <Accordion.ItemContent>
              <Accordion.ItemBody px="4" pb="4">
                <VStack align="stretch" gap="5">
                  <VStack align="stretch" gap="2">
                    <Text fontSize="xs" fontWeight="semibold" color="text.heading">
                      Especificaciones generales
                    </Text>
                    <SpecsEditor specs={specs} onChange={setSpecs} />
                  </VStack>
                  <VStack align="stretch" gap="2">
                    <Text fontSize="xs" fontWeight="semibold" color="text.heading">
                      Fichas por sistema
                    </Text>
                    <SystemSheetsEditor
                      systemSheets={systemSheets}
                      onChange={setSystemSheets}
                      availableSystems={Array.from(
                        new Set(
                          galleryItems
                            .map((g) => g.system?.trim())
                            .filter((s): s is string => Boolean(s))
                        )
                      )}
                    />
                  </VStack>
                </VStack>
              </Accordion.ItemBody>
            </Accordion.ItemContent>
          </Accordion.Item>

          <Accordion.Item value="preguntas-frecuentes">
            <Accordion.ItemTrigger minH="11" px="4" py="3" cursor="pointer">
              <HStack flex="1" justify="space-between">
                <Text fontSize="sm" fontWeight="semibold" color="text.heading">
                  Preguntas frecuentes
                </Text>
                <Text fontSize="xs" color="text.muted">
                  {faqs.length} preguntas
                </Text>
              </HStack>
              <Accordion.ItemIndicator />
            </Accordion.ItemTrigger>
            <Accordion.ItemContent>
              <Accordion.ItemBody px="4" pb="4">
                <FaqsEditor faqs={faqs} onChange={setFaqs} />
              </Accordion.ItemBody>
            </Accordion.ItemContent>
          </Accordion.Item>
        </Accordion.Root>

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

        {/* Acciones */}
        <HStack justify="flex-end" gap="3" pt="4" borderTop="1px solid" borderColor="border.subtle" wrap="wrap">
          <Button
            variant="outline"
            size="sm"
            borderRadius="xl"
            flex={{ base: "1 1 100%", sm: "0 0 auto" }}
            onClick={onClose}
            disabled={loading}
            type="button"
          >
            Cancelar
          </Button>
          <Button
            size="sm"
            borderRadius="xl"
            flex={{ base: "1 1 100%", sm: "0 0 auto" }}
            type="submit"
            loading={loading}
            disabled={loading}
          >
            <Sparkles size={16} style={{ flexShrink: 0, marginRight: 6 }} />
            {isEditing ? "Guardar Cambios" : "Publicar Servicio"}
          </Button>
        </HStack>
      </VStack>
    </AdminDialog>
  );
};
