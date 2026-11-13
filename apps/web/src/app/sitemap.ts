import { SITE_URL } from "@/shared/config/company-data";
import { MetadataRoute } from "next";
import BLOG_POSTS from "@/features/blog/data/blog-posts";
import { getBuildBlogPosts, getBuildProjects, getBuildServices } from "@/shared/api/firebase/publicRest";

export const dynamic = "force-static";

const DEFAULT_LAST_MODIFIED = new Date("2026-11-02");
const BUILD_DATE = new Date();

const PRIORITY_SERVICE_SLUGS = new Set(["ventana", "mampara", "baranda", "techo", "ducha"]);

/**
 * Convierte rutas de imagen en URLs absolutas y escapa entidades XML (`&` -> `&amp;`),
 * ya que Next.js `MetadataRoute.Sitemap` no escapa query params (como `&token=` de Firebase Storage)
 * dentro de `<image:loc>`, lo que rompería el parser XML de Google Search Console.
 */
const toSitemapImageUrl = (rawUrl: string): string => {
  const absolute = rawUrl.startsWith("http")
    ? rawUrl
    : `${SITE_URL}${rawUrl.startsWith("/") ? rawUrl : `/${rawUrl}`}`;
  return absolute
    .replace(/&(?!amp;|lt;|gt;|quot;|apos;)/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
};

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
  // Servicios, proyectos y artículos salen de Firestore (REST en build); blog hace fallback a semilla si está vacío.
  const [services, projects, remotePosts] = await Promise.all([
    getBuildServices(),
    getBuildProjects(),
    getBuildBlogPosts(),
  ]);
  const posts = remotePosts.length > 0 ? remotePosts : BLOG_POSTS;

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: BUILD_DATE, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/contacto`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/presupuesto`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/simulador-ai`, lastModified: BUILD_DATE, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/blog`, lastModified: BUILD_DATE, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/libro-de-reclamacion`, lastModified: BUILD_DATE, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE_URL}/cuentas-bancarias`, lastModified: BUILD_DATE, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE_URL}/politicas-empresa`, lastModified: BUILD_DATE, changeFrequency: "yearly", priority: 0.3 },
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${SITE_URL}/servicios/${service.slug}`,
    lastModified: resolveLastModified(service.updatedAt ?? service.createdAt, DEFAULT_LAST_MODIFIED),
    changeFrequency: "monthly",
    priority: PRIORITY_SERVICE_SLUGS.has(service.slug) ? 0.9 : 0.85,
    images: service.coverImage ? [toSitemapImageUrl(service.coverImage)] : undefined,
  }));

  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: resolveLastModified(post.date, DEFAULT_LAST_MODIFIED),
    changeFrequency: "monthly",
    priority: 0.7,
    images: post.image ? [toSitemapImageUrl(post.image)] : undefined,
  }));

  const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${SITE_URL}/proyectos/${project.id}`,
    lastModified: resolveLastModified(project.updatedAt ?? project.createdAt, DEFAULT_LAST_MODIFIED),
    changeFrequency: "monthly",
    priority: 0.75,
    images: project.coverImage ? [toSitemapImageUrl(project.coverImage)] : undefined,
  }));

  return [...staticPages, ...servicePages, ...blogPages, ...projectPages];
}
