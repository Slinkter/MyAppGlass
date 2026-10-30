import { SITE_URL } from "@/shared/config/company-data";
import { MetadataRoute } from "next";

export const dynamic = "force-static";
import BLOG_POSTS from "@/features/blog/data/blog-posts";
import { getBuildProjects, getBuildServices } from "@/shared/api/firebase/publicRest";

const SITE_LAUNCH = new Date("2025-06-01");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Servicios y proyectos salen de Firestore (lectura REST en build); si falla, quedan solo las páginas fijas.
  const [services, projects] = await Promise.all([getBuildServices(), getBuildProjects()]);

  const staticPages = [
    { url: SITE_URL, lastModified: SITE_LAUNCH, changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${SITE_URL}/servicios`, lastModified: SITE_LAUNCH, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${SITE_URL}/proyectos`, lastModified: SITE_LAUNCH, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${SITE_URL}/blog`, lastModified: SITE_LAUNCH, changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${SITE_URL}/contacto`, lastModified: SITE_LAUNCH, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${SITE_URL}/cuentas-bancarias`, lastModified: SITE_LAUNCH, changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${SITE_URL}/politicas-empresa`, lastModified: SITE_LAUNCH, changeFrequency: "yearly" as const, priority: 0.2 },
    { url: `${SITE_URL}/libro-de-reclamacion`, lastModified: SITE_LAUNCH, changeFrequency: "yearly" as const, priority: 0.3 },
  ];

  const servicePages = services.map((service) => ({
    url: `${SITE_URL}/servicios/${service.slug}`,
    lastModified: SITE_LAUNCH,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const blogPages = BLOG_POSTS.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const projectPages = projects.map((project) => ({
    url: `${SITE_URL}/proyectos/${project.id}`,
    lastModified: SITE_LAUNCH,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...servicePages, ...blogPages, ...projectPages];
}
