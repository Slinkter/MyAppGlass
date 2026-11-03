import { SITE_URL } from "@/shared/config/company-data";
import { MetadataRoute } from "next";
import BLOG_POSTS from "@/features/blog/data/blog-posts";
import { getBuildProjects, getBuildServices } from "@/shared/api/firebase/publicRest";

export const dynamic = "force-static";

const DEFAULT_LAST_MODIFIED = new Date("2026-11-02");

const PRIORITY_SERVICE_SLUGS = new Set(["ventana", "mampara", "baranda", "techo", "ducha"]);

const resolveLastModified = (value: unknown, fallback: Date): Date => {
  if (!value) return fallback;
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? fallback : value;
  }
  if (typeof value === "string") {
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? fallback : parsed;
  }
  if (typeof value === "object" && value !== null && "seconds" in value) {
    const seconds = (value as { seconds?: unknown }).seconds;
    if (typeof seconds === "number" && Number.isFinite(seconds)) {
      return new Date(seconds * 1000);
    }
  }
  return fallback;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Servicios y proyectos salen de Firestore (lectura REST en build); si falla, quedan solo las páginas fijas.
  const [services, projects] = await Promise.all([getBuildServices(), getBuildProjects()]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: DEFAULT_LAST_MODIFIED, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/contacto`, lastModified: DEFAULT_LAST_MODIFIED, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/presupuesto`, lastModified: DEFAULT_LAST_MODIFIED, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/simulador-ai`, lastModified: DEFAULT_LAST_MODIFIED, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/blog`, lastModified: DEFAULT_LAST_MODIFIED, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/libro-de-reclamacion`, lastModified: DEFAULT_LAST_MODIFIED, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE_URL}/cuentas-bancarias`, lastModified: DEFAULT_LAST_MODIFIED, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE_URL}/politicas-empresa`, lastModified: DEFAULT_LAST_MODIFIED, changeFrequency: "yearly", priority: 0.3 },
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${SITE_URL}/servicios/${service.slug}`,
    lastModified: resolveLastModified(service.updatedAt ?? service.createdAt, DEFAULT_LAST_MODIFIED),
    changeFrequency: "monthly",
    priority: PRIORITY_SERVICE_SLUGS.has(service.slug) ? 0.9 : 0.85,
    images: service.coverImage
      ? [service.coverImage.startsWith("http") ? service.coverImage : `${SITE_URL}${service.coverImage}`]
      : undefined,
  }));

  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: resolveLastModified(post.date, DEFAULT_LAST_MODIFIED),
    changeFrequency: "monthly",
    priority: 0.7,
    images: post.image ? [`${SITE_URL}${post.image}`] : undefined,
  }));

  const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${SITE_URL}/proyectos/${project.id}`,
    lastModified: resolveLastModified(project.updatedAt ?? project.createdAt, DEFAULT_LAST_MODIFIED),
    changeFrequency: "monthly",
    priority: 0.75,
    images: project.coverImage
      ? [project.coverImage.startsWith("http") ? project.coverImage : `${SITE_URL}${project.coverImage}`]
      : undefined,
  }));

  return [...staticPages, ...servicePages, ...blogPages, ...projectPages];
}
