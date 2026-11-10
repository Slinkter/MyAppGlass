import { SITE_URL } from "@/shared/config/company-data";
import { MetadataRoute } from "next";

export const dynamic = "force-static";

const DISALLOW_PATHS = [
  "/api/",
  "/admin",
  "/auth",
  "/design-system",
  "/design-system-ubicacion",
  "/navbarmobil",
  "/tienda",
  "/tienda/",
  "/mi-cuenta",
  "/servicios/ver",
  "/proyectos/ver",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: DISALLOW_PATHS,
      },
      {
        userAgent: [
          "OAI-SearchBot",
          "ChatGPT-User",
          "Claude-SearchBot",
          "Claude-User",
          "PerplexityBot",
        ],
        allow: "/",
        disallow: DISALLOW_PATHS,
      },
      {
        userAgent: "Bytespider",
        disallow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
