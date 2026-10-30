import { z } from "zod";

/**
 * Representa una fecha serializable (string ISO, Date, o Timestamp de Firestore)
 */
export const DateSchema = z.union([
  z.date(),
  z.string(),
  z.object({
    seconds: z.number(),
    nanoseconds: z.number(),
    toDate: z.custom<() => Date>((val) => typeof val === "function").optional(),
  }),
]);

/**
 * Item de galería para Servicios
 */
export const ServiceGalleryItemSchema = z.object({
  id: z.string().min(1, "El id del item de galería es obligatorio"),
  url: z.string().min(1, "Ruta o URL de imagen requerida"),
  alt: z.string().optional(),
  /** Sistema al que pertenece la foto (agrupa el álbum por sistema). */
  system: z.string().optional(),
});

export const ServiceFaqSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
});

export type ServiceFaq = z.infer<typeof ServiceFaqSchema>;

export type ServiceGalleryItem = z.infer<typeof ServiceGalleryItemSchema>;

/**
 * Esquema completo de un Servicio
 */
export const ServiceSchema = z.object({
  id: z.string().min(1, "El ID del servicio es obligatorio"),
  slug: z.string().min(1, "El slug del servicio es obligatorio"),
  title: z.string().min(1, "El título del servicio es obligatorio"),
  category: z.string().optional(),
  shortDescription: z.string().min(1, "La descripción corta es obligatoria"),
  fullDescription: z.string().min(1, "La descripción completa es obligatoria"),
  features: z.array(z.string()).default([]),
  systems: z.array(z.string()).optional().default([]),
  benefits: z.array(z.string()).optional().default([]),
  coverImage: z.string().min(1, "Ruta o URL de imagen de portada requerida"),
  gallery: z.array(ServiceGalleryItemSchema).default([]),
  faqs: z.array(ServiceFaqSchema).optional().default([]),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  order: z.number().int().default(0),
  published: z.boolean().default(true),
  createdAt: DateSchema.optional(),
  updatedAt: DateSchema.optional(),
});

export type Service = z.infer<typeof ServiceSchema>;

/**
 * Esquema para crear un nuevo Servicio
 */
export const CreateServiceSchema = ServiceSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  id: z.string().min(1).optional(),
});

export type CreateServiceInput = z.infer<typeof CreateServiceSchema>;

/**
 * Esquema para actualizar un Servicio existente
 */
export const UpdateServiceSchema = CreateServiceSchema.partial();

export type UpdateServiceInput = z.infer<typeof UpdateServiceSchema>;

/**
 * Item de galería para Proyectos
 */
export const ProjectGalleryItemSchema = z.object({
  id: z.string().min(1, "El id del item de galería es obligatorio"),
  url: z.string().min(1, "Ruta o URL de imagen requerida"),
  caption: z.string().optional(),
});

export type ProjectGalleryItem = z.infer<typeof ProjectGalleryItemSchema>;

/**
 * Esquema completo de un Proyecto
 */
export const ProjectSchema = z.object({
  id: z.string().min(1, "El ID del proyecto es obligatorio"),
  slug: z.string().min(1, "El slug del proyecto es obligatorio"),
  title: z.string().min(1, "El título del proyecto es obligatorio"),
  client: z.string().min(1, "El cliente es obligatorio"),
  location: z.string().min(1, "La ubicación es obligatoria"),
  address: z.string().optional(),
  serviceId: z.string().min(1, "El ID del servicio asociado es obligatorio"),
  description: z.string().min(1, "La descripción es obligatoria"),
  coverImage: z.string().min(1, "Ruta o URL de imagen de portada requerida"),
  gallery: z.array(ProjectGalleryItemSchema).default([]),
  completedAt: z.string().optional(),
  numdpto: z.string().optional(),
  lat: z.number().nullable().optional(),
  lng: z.number().nullable().optional(),
  published: z.boolean().default(true),
  createdAt: DateSchema.optional(),
  updatedAt: DateSchema.optional(),
});

export type Project = z.infer<typeof ProjectSchema>;

/**
 * Esquema para crear un nuevo Proyecto
 */
export const CreateProjectSchema = ProjectSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  id: z.string().min(1).optional(),
});

export type CreateProjectInput = z.infer<typeof CreateProjectSchema>;

/**
 * Esquema para actualizar un Proyecto existente
 */
export const UpdateProjectSchema = CreateProjectSchema.partial();

export type UpdateProjectInput = z.infer<typeof UpdateProjectSchema>;
