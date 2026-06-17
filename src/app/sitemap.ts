import { MetadataRoute } from "next";

export const dynamic = "force-static";
import { services } from "@/features/services/data/services";
import BLOG_POSTS from "@/features/blog/data/blog-posts";
import { projects } from "@/features/projects/data/projects";

const BASE_URL = "https://www.gyacompany.com";

const SITE_LAUNCH = new Date("2025-06-01");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: BASE_URL, lastModified: SITE_LAUNCH, changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${BASE_URL}/servicios`, lastModified: SITE_LAUNCH, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${BASE_URL}/proyectos`, lastModified: SITE_LAUNCH, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${BASE_URL}/blog`, lastModified: SITE_LAUNCH, changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${BASE_URL}/contacto`, lastModified: SITE_LAUNCH, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${BASE_URL}/cuentas-bancarias`, lastModified: SITE_LAUNCH, changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${BASE_URL}/politicas-empresa`, lastModified: SITE_LAUNCH, changeFrequency: "yearly" as const, priority: 0.2 },
    { url: `${BASE_URL}/libro-de-reclamacion`, lastModified: SITE_LAUNCH, changeFrequency: "yearly" as const, priority: 0.3 },
  ];

  const servicePages = services.map((service) => ({
    url: `${BASE_URL}${service.plink}`,
    lastModified: SITE_LAUNCH,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const blogPages = BLOG_POSTS.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const projectPages = projects.map((project) => ({
    url: `${BASE_URL}/proyectos/${project.id}`,
    lastModified: SITE_LAUNCH,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...servicePages, ...blogPages, ...projectPages];
}
