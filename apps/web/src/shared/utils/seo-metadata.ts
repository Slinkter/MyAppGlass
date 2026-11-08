import type { Metadata } from "next";
import { SITE_URL } from "@/shared/config/company-data";

/**
 * @file seo-metadata.ts
 * @description Helpers de construcción de Next.js Metadata, normalización de URLs y saneamiento de títulos.
 */

const BRAND_SUFFIX_REGEX =
  /\s*\|\s*(?:Glass\s*&\s*Aluminum\s*Company(?:\s*S\.?A\.?C\.?)?|GYA\s*Glass\s*&\s*Aluminum|GYA\s*Company|GYA\s*La\s*Molina|GYA\s*Lima|GYA)\s*$/i;

/**
 * Elimina sufijos redundantes de marca al final del título para evitar duplicación
 * con el `template: "%s | Glass & Aluminum Company S.A.C."` de `app/layout.tsx`.
 */
export const cleanSeoTitle = (rawTitle: string): string => {
  let cleaned = rawTitle.trim();
  while (BRAND_SUFFIX_REGEX.test(cleaned)) {
    cleaned = cleaned.replace(BRAND_SUFFIX_REGEX, "").trim();
  }
  return cleaned;
};

export interface BuildPageMetadataOptions {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  tags?: string[];
  keywords?: string[];
  useAbsoluteTitle?: boolean;
}

/**
 * Normaliza cualquier ruta de imagen (relativa o absoluta de Firebase Storage) a una URL absoluta canónica.
 */
export const resolveSeoImageUrl = (
  image?: string,
  fallbackPath = "/images/branding-LogoCompanytrans.webp"
): string => {
  const target = image?.trim() || fallbackPath;
  if (target.startsWith("http://") || target.startsWith("https://")) {
    return target;
  }
  return `${SITE_URL}${target.startsWith("/") ? target : `/${target}`}`;
};

/**
 * Construye un objeto `Metadata` completo de Next.js con canonical, OpenGraph y Twitter Card coherentes.
 */
export const buildPageMetadata = (options: BuildPageMetadataOptions): Metadata => {
  const cleanTitle = cleanSeoTitle(options.title);
  const fullTitle = `${cleanTitle} | Glass & Aluminum Company S.A.C.`;
  const canonicalUrl =
    options.path === "/"
      ? SITE_URL
      : `${SITE_URL}${options.path.startsWith("/") ? options.path : `/${options.path}`}`;

  const hasCustomImage = Boolean(options.image?.trim());
  const imageUrl = resolveSeoImageUrl(options.image, "/logovcr.png");

  return {
    title: options.useAbsoluteTitle ? { absolute: fullTitle } : cleanTitle,
    description: options.description,
    ...(options.keywords ? { keywords: options.keywords } : {}),
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      title: fullTitle,
      description: options.description,
      url: canonicalUrl,
      siteName: "Glass & Aluminum Company S.A.C.",
      locale: "es_PE",
      type: options.type ?? "website",
      images: [
        {
          url: imageUrl,
          width: hasCustomImage ? 1200 : 906,
          height: hasCustomImage ? 630 : 904,
          alt: cleanTitle,
        },
      ],
      ...(options.publishedTime ? { publishedTime: options.publishedTime } : {}),
      ...(options.tags ? { tags: options.tags } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: options.description,
      images: [imageUrl],
    },
  };
};
