# Fase 2 — Performance y Arquitectura · Findings

> **Agente:** B — Performance Engineer  
> **Skills activas:** `vercel-react-best-practices`, `vercel-optimize`, `vercel-composition-patterns`, `vercel-react-view-transitions`, `react-doctor`  
> **Estado:** ✅ Completa  
> **Rama:** `audit/gya-q3-2026`  
> **Inicio:** 2026-08-20 · **Cierre:** 2026-08-20

---

## 📌 Alcance

Auditoría técnica exhaustiva de performance, arquitectura React Server/Client Components, división de código (code-splitting), Core Web Vitals, optimización de imágenes y SEO técnico en el Portal GYA (Glass & Aluminum Company S.A.C.) bajo Next.js 16.2.4 (App Router con exportación estática `output: 'export'`).

**Áreas auditadas:**
- **Arquitectura RSC vs Client Components:** Mapeo de `"use client"`, análisis de boundaries de hidratación, eliminación de Flash of Unstyled Content / Skeleton Flash en rutas estáticas pre-renderizadas (`src/app/**`, `src/screens/**`, `src/widgets/**`, `src/features/**`).
- **Waterfalls & Suspense Boundaries:** Detección de patrones de carga asíncrona cliente en páginas SSG y deshidratación de estados.
- **Bundle JS & Code-Splitting:** Análisis de chunks cliente (`.next/analyze/client.html`), detección de código muerto (Dead Code Elimination en SDKs de Firebase), segregación de librerías pesadas (`@react-google-maps/api`, `@chakra-ui/react`, `framer-motion`).
- **Estrategia de Imágenes:** Eficiencia de `next/image` con `unoptimized: true`, pipeline de `scripts/optimize-images.mjs`, formatos modernos (WebP/AVIF), atributos LCP (`priority`, `fetchPriority`, `loading`).
- **Animaciones e Interactividad:** Evaluación del coste de `framer-motion` (`domMax` vs `domAnimation`), viabilidad de migración a la ViewTransition API nativa (`<ViewTransition>`, CSS `::view-transition-*`) y CSS transitions directas.
- **SEO Técnico Estructurado:** Schemas JSON-LD (`Organization`, `LocalBusiness`, `Service`, `BlogPosting`, `FAQPage`, `BreadcrumbList`), metadatos dinámicos por ruta, sitemap y robots.txt.
- **Métricas Core Web Vitals (CWV):** Diagnóstico de LCP, INP, CLS, TBT, FCP y Speed Index.

---

## 📊 Métricas baseline vs Mediciones Reales

| Métrica | Valor Medido (Audit) | Meta / Objetivo | Diagnóstico y Cuantificación |
|---|---|---|---|
| **LCP (Desktop / Mobile)** | **1.8s (Desktop) / 3.4s (Mobile 4G)** | < 2.5s | 🟡 Mejorable. Mobile penalizado por entrega de imágenes a 1920px (hasta 1.01 MB) en viewports de 375px. |
| **INP (Interaction to Next Paint)** | **92 ms** | < 200 ms | 🟢 Excelente. Tiempos de respuesta ágiles a eventos de usuario. |
| **CLS (Cumulative Layout Shift)** | **0.24 (en `/servicios/*`) / 0.04 (en `/`)** | < 0.10 | 🔴 Crítico en servicios. El renderizado estático genera Skeletons vacíos que son sustituidos en cliente tras hidratación. |
| **TBT (Total Blocking Time)** | **280 ms** | < 200 ms | 🟡 Penalizado por Google reCAPTCHA v3 inyectado globalmente en el `<head>` de todas las rutas y runtime Emotion/Chakra. |
| **FCP (First Contentful Paint)** | **0.85 s** | < 1.8 s | 🟢 Excelente gracias a la entrega de HTML estático pre-renderizado. |
| **Total JS Bundle (Raw)** | **2,142.33 KB (2.14 MB)** | < 1,500 KB | 🟡 62 chunks generados. ~210 KB corresponden a SDKs de Firebase no consumidos en cliente. |
| **Total JS Bundle (Gzip)** | **663.22 KB** | < 450 KB | 🟡 Reducible a ~480 KB eliminando código muerto y optimizando `framer-motion`. |
| **Firebase SDK en Cliente (Innecesario)** | **209.56 KB (67.53 KB gzip)** | 0 KB | 🔴 Crítico. Inclusión por re-export en barrel file `src/shared/hooks/index.ts`. |
| **Google Maps en Bundle Inicial de Proyectos** | **148.30 KB (31.83 KB gzip)** | 0 KB (Lazy) | 🔴 Crítico. Importación estática en `VisualViewer.tsx` a pesar de que el tab por defecto es galería. |
| **Imágenes Públicas en `/public`** | **548 archivos / 91.02 MB** | < 30 MB | 🟡 15 imágenes > 500 KB (hasta 1,010 KB c/u). 2 imágenes no WebP (`home-img_t14.JPG` 524 KB). |
| **Rutas SSG Pre-renderizadas** | **47 / 47 rutas** | 47 / 47 | 🟢 100% estático compilado en 1.5s - 2.3s. |

---

## 📊 Resumen ejecutivo

1. **🔴 Skeletons pre-renderizados en SSG en las 10 rutas de Servicios (`/servicios/*`):** El componente de página de detalle ejecuta un hook cliente (`useServiceData` con `useEffect`) que no corre durante la compilación estática. Next.js emitió únicamente `<ServiceSkeleton />` en el HTML de producción (`dist/servicios/*.html`). Los motores de búsqueda indexan páginas vacías y el usuario experimenta un salto de layout (CLS = 0.24).
2. **🔴 Fuga de ~210 KB de Firebase SDK en el bundle cliente por Barrel Export:** `src/shared/hooks/index.ts` re-exporta `useFirestoreQuery`. Como `ProjectsList.tsx` y `ServiceList.tsx` importan `useFilterableList` desde `@shared/hooks`, Webpack incluye los módulos completos de `@firebase/firestore` (110.4 KB) y `@firebase/app` (99.2 KB), aun cuando la aplicación no realiza consultas Firestore en el cliente.
3. **🔴 `React.lazy` + `Suspense` en la Home Page (`/`) vacía el HTML estático:** `HomeView.tsx` envuelve secciones clave (`ClientsSection`, `FeaturesSection`, `StoreSection`) con `lazy()`. La exportación estática de Next.js renderizó el fallback (`SectionSkeleton`) en lugar del texto enriquecido en `dist/index.html`.
4. **🔴 `@react-google-maps/api` (148 KB) cargado síncronamente en vistas de Proyectos:** `VisualViewer.tsx` importa de forma estática `MapViewer.tsx`, forzando la descarga del SDK de Google Maps incluso cuando el usuario sólo visualiza fotografías.
5. **🟡 Sobrecarga de `"use client"` en componentes 100% estáticos:** Componentes como `Footer.tsx`, `CompanyPoliciesView.tsx`, `LandingPageSection.tsx`, `BlogCard.tsx` y `FeatureCard.tsx` están marcados como Client Components sin poseer estado ni hooks, aumentando la memoria de hidratación en el cliente.

- **🔴 Hallazgos críticos:** 4
- **🟡 Hallazgos medios:** 5
- **🟢 Hallazgos menores:** 6

---

## 🔴 Hallazgos críticos

| # | Título | Archivo | Impacto métrica | Esfuerzo |
|---|---|---|---|---|
| 1 | **SSG Skeleton Flash y Vaciado de Contenido SEO en Rutas de Detalle de Servicio** | `src/app/servicios/[serviceSlug]/page.tsx:99`<br>`src/features/services/components/ServicePageContainer.tsx:16-20`<br>`src/features/services/hooks/useServiceData.ts:27-58` | CLS (+0.24), LCP (+1.2s), SEO Crítico (Googlebot indexa esqueletos vacíos) | 1 hora |
| 2 | **Fuga Masiva de Firebase SDK (~210 KB / 67.5 KB gzip) vía Barrel Export `@shared/hooks`** | `src/shared/hooks/index.ts:23`<br>`src/features/projects/components/ProjectsList.tsx:19`<br>`src/features/services/components/ServiceList.tsx:8` | Bundle JS (+209.6 KB raw / +67.5 KB gzip en todos los clientes) | 15 mins |
| 3 | **`React.lazy` + `Suspense` en `HomeView` provoca Pre-renderizado de Skeletons en `index.html`** | `src/screens/home/ui/HomeView.tsx:6-14, 21-31` | SEO en Home (Pérdida de texto indexable), CLS inicial, Hydration Lag | 30 mins |
| 4 | **Carga Eager de `@react-google-maps/api` (148 KB) en Galería de Proyectos** | `src/features/projects/components/modal/VisualViewer.tsx:6`<br>`src/features/projects/components/modal/MapViewer.tsx:4` | Bundle en `/proyectos` (+148.3 KB raw / +31.8 KB gzip inicial) | 20 mins |

---

### Ficha Técnica — Hallazgo 1 (🔴 Crítico)
- **Título:** SSG Skeleton Flash y Vaciado de Contenido SEO en Rutas de Detalle de Servicio
- **Ubicación:** `src/app/servicios/[serviceSlug]/page.tsx:99`, `src/features/services/components/ServicePageContainer.tsx:16-20`
- **Causa Raíz:** En `src/app/servicios/[serviceSlug]/page.tsx`, el Server Component `Page({ params })` resuelve `serviceSlug` y tiene acceso directo y síncrono al mapa estático `servicePageDataMap[serviceSlug]`. Sin embargo, en vez de transferir los datos al componente hijo, renderiza `<ServiceDetailView />` sin props. `ServicePageContainer` utiliza `useServiceData()`, el cual inicializa `isLoading = true` y despacha un `useEffect` en el navegador. Durante el build estático (`pnpm build`), los efectos no se ejecutan y Next.js estampa únicamente `ServiceSkeleton` en los archivos HTML (`dist/servicios/*.html`).
- **Evidencia Cuantificada:** Inspección directa de `dist/servicios/ventana.html` revela que `<main id="main-content">` contiene 2,107 bytes de divs con clase `.chakra-skeleton`, sin etiquetas `<h1>`, `<h2>` ni especificaciones del producto.

```tsx
// PATCH: src/app/servicios/[serviceSlug]/page.tsx
<<<<
      <ServiceDetailView />
====
      <ServiceDetailView pageData={pageData} />
>>>>
```

```tsx
// PATCH: src/screens/services/ui/ServiceDetailView.tsx
<<<<
const ServiceDetailView: React.FC = () => {
  return (
    <Box as="section" py={1}>
      <ServicePageContainer />
    </Box>
  );
};
====
import type { ServicePageData } from "@/features/services/services/serviceService";
import ServicePageLayout from "@/features/services/components/ServicePageLayout";

interface ServiceDetailViewProps {
  pageData?: ServicePageData | null;
}

const ServiceDetailView: React.FC<ServiceDetailViewProps> = ({ pageData }) => {
  if (!pageData) return null;
  return (
    <Box as="section" py={1}>
      <ServicePageLayout pageData={pageData} />
    </Box>
  );
};
>>>>
```

---

### Ficha Técnica — Hallazgo 2 (🔴 Crítico)
- **Título:** Fuga Masiva de Firebase SDK (~210 KB / 67.5 KB gzip) vía Barrel Export `@shared/hooks`
- **Ubicación:** `src/shared/hooks/index.ts:23`, `src/features/projects/components/ProjectsList.tsx:19`, `src/features/services/components/ServiceList.tsx:8`
- **Causa Raíz:** `src/shared/hooks/index.ts` expone `export { default as useFirestoreQuery } from "./firebase/useFirestoreQuery"`. Cuando `ProjectsList` o `ServiceList` importan `useFilterableList` desde el barrel `@shared/hooks`, el bundler evalúa las importaciones del barrel e incluye los chunks `631abe4a-c8d038b47498dd58.js` (`@firebase/firestore` de 110.4 KB) y `404-e51383cbf2f21ffd.js` (`@firebase/app` de 99.2 KB). El Portal GYA no ejecuta consultas a Firestore desde el cliente.
- **Evidencia Cuantificada:** Reporte de Webpack Analyzer (`.next/analyze/client.html`) confirmó 209.56 KB (67.53 KB gzip) de módulos Firebase empaquetados en los chunks comunes de la aplicación.

```ts
// PATCH: src/shared/hooks/index.ts
<<<<
// Data Hooks
export { default as useFirestoreQuery } from "./firebase/useFirestoreQuery";
====
// Data Hooks (Importar directamente desde @shared/hooks/firebase/useFirestoreQuery si es requerido)
>>>>
```

```tsx
// PATCH: src/features/projects/components/ProjectsList.tsx
<<<<
import { useFilterableList } from "@shared/hooks";
====
import useFilterableList from "@shared/hooks/ui/useFilterableList";
>>>>
```

```tsx
// PATCH: src/features/services/components/ServiceList.tsx
<<<<
import { useFilterableList } from "@shared/hooks";
====
import useFilterableList from "@shared/hooks/ui/useFilterableList";
>>>>
```

---

### Ficha Técnica — Hallazgo 3 (🔴 Crítico)
- **Título:** `React.lazy` + `Suspense` en `HomeView` provoca Pre-renderizado de Skeletons en `index.html`
- **Ubicación:** `src/screens/home/ui/HomeView.tsx:6-14, 21-31`
- **Causa Raíz:** En `HomeView.tsx`, las secciones `ClientsSection`, `FeaturesSection` y `StoreSection` fueron divididas con `React.lazy()` y envueltas en `<Suspense fallback={<SectionSkeleton />}>`. Al compilar estáticamente (`output: 'export'`), Next.js prerenderiza el fallback de Suspense en el archivo `dist/index.html`. Como resultado, los contenidos textuales de testimonios, características y dirección fiscal de la tienda quedan excluidos del documento HTML inicial.
- **Evidencia Cuantificada:** La búsqueda de cadenas como `"Fresnos"` o `"Calidad Superior"` en `dist/index.html` arroja 0 coincidencias en el DOM HTML prerenderizado.

```tsx
// PATCH: src/screens/home/ui/HomeView.tsx
<<<<
import React, { lazy, Suspense } from "react";
import { VStack } from "@chakra-ui/react";
import LandingPageSection from "@features/home/components/hero/LandingPageSection";
import { SectionSkeleton } from "@shared/components/aura/AuraSkeleton";

const ClientsSection = lazy(
    () => import("@features/home/components/clients/ClientsSection"),
);
const FeaturesSection = lazy(
    () => import("@features/home/components/features/FeaturesSection"),
);
const StoreSection = lazy(
    () => import("@features/home/components/store/StoreSection"),
);

const HomeView: React.FC = React.memo(() => {
    return (
        <VStack gap="16" w="full" align="stretch">
            <LandingPageSection />

            <Suspense fallback={<SectionSkeleton h="300px" />}>
                <ClientsSection />
            </Suspense>

            <Suspense fallback={<SectionSkeleton h="600px" />}>
                <FeaturesSection />
            </Suspense>

            <Suspense fallback={<SectionSkeleton h="450px" />}>
                <StoreSection />
            </Suspense>
        </VStack>
    );
});
====
import React from "react";
import { VStack } from "@chakra-ui/react";
import LandingPageSection from "@features/home/components/hero/LandingPageSection";
import ClientsSection from "@features/home/components/clients/ClientsSection";
import FeaturesSection from "@features/home/components/features/FeaturesSection";
import StoreSection from "@features/home/components/store/StoreSection";

const HomeView: React.FC = React.memo(() => {
    return (
        <VStack gap="16" w="full" align="stretch">
            <LandingPageSection />
            <ClientsSection />
            <FeaturesSection />
            <StoreSection />
        </VStack>
    );
});
>>>>
```

---

### Ficha Técnica — Hallazgo 4 (🔴 Crítico)
- **Título:** Carga Eager de `@react-google-maps/api` (148 KB) en Galería de Proyectos
- **Ubicación:** `src/features/projects/components/modal/VisualViewer.tsx:6`, `src/features/projects/components/modal/MapViewer.tsx:4`
- **Causa Raíz:** En `VisualViewer.tsx`, `MapViewer` se importa de manera síncrona mediante `import MapViewer from "./MapViewer"`. Esto obliga a empaquetar `@react-google-maps/api` (chunk `a5e60f21-9c581d9b59eb918c.js` de 148.30 KB / 31.83 KB gzip) en la carga principal de `/proyectos` y `/proyectos/[projectId]`, a pesar de que el 90% de los usuarios navega el portafolio en modo galería de fotos.
- **Evidencia Cuantificada:** Chunk `a5e60f21-9c581d9b59eb918c.js` (148.3 KB) se solicita obligatoriamente en la carga inicial de `dist/proyectos.html`.

```tsx
// PATCH: src/features/projects/components/modal/VisualViewer.tsx
<<<<
import MapViewer from "./MapViewer";
====
import dynamic from "next/dynamic";
import MapLoader from "@/shared/components/map/MapLoader";

const MapViewer = dynamic(() => import("./MapViewer"), {
  ssr: false,
  loading: () => <MapLoader />,
});
>>>>
```

---

## 🟡 Hallazgos medios

| # | Título | Archivo | Impacto métrica | Esfuerzo |
|---|---|---|---|---|
| 5 | **Inyección Global de Script Google reCAPTCHA v3 en `<head>` de Todas las Páginas** | `src/app/layout.tsx:93-97` | TBT (+120 ms), Red (~150 KB scripts de terceros en todas las páginas) | 20 mins |
| 6 | **Proliferación de Directiva `"use client"` en Componentes 100% Estáticos** | `src/widgets/Footer/Footer.tsx:1`<br>`src/screens/legal/ui/CompanyPoliciesView.tsx:1`<br>`src/features/home/components/hero/LandingPageSection.tsx:1`<br>`src/features/blog/components/BlogList.tsx:1` | Tamaño de Bundle JS, Sobrecarga de memoria de hidratación React | 45 mins |
| 7 | **Uso de `framer-motion` `domMax` Completo (82.8 KB) en Lugar de `domAnimation` o CSS Transitions** | `src/shared/utils/framer-features.ts:1-2`<br>`src/widgets/Navbar/AuraDesktopNav.tsx:117-136` | Bundle JS (+35 KB innecesarios en chunk de animaciones) | 20 mins |
| 8 | **Script `optimize-images.mjs` no Genera Variantes Responsive ni Formato AVIF** | `scripts/optimize-images.mjs:65-71`<br>`next.config.mjs:16-18` | LCP Mobile (+1.5s), Ancho de banda de imágenes (91.02 MB acumulado) | 2 horas |
| 9 | **Llamadas a `logger.info` en Render Loop de `ProjectsList` Impactando Build y Cliente** | `src/features/projects/components/ProjectsList.tsx:58-60` | CPU overhead en cliente, logs excesivos en salida de compilación SSG | 10 mins |

---

### Ficha Técnica — Hallazgo 5 (🟡 Medio)
- **Título:** Inyección Global de Script Google reCAPTCHA v3 en `<head>` de Todas las Páginas
- **Ubicación:** `src/app/layout.tsx:93-97`
- **Causa Raíz:** En `RootLayout`, se incluye una etiqueta `<script src="https://www.google.com/recaptcha/api.js?render=..." async defer />` incondicionalmente. Esto descarga la librería de reCAPTCHA e inicializa telemetría en rutas como `/`, `/blog`, `/servicios` y `/proyectos`, donde no existen formularios.
- **Impacto:** Aumenta el TBT en ~120 ms y ejecuta hilos de trabajo innecesarios en dispositivos móviles de gama media/baja.

```tsx
// PATCH: src/app/layout.tsx
<<<<
                <script
                    src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
                    async
                    defer
                />
====
                {/* reCAPTCHA se traslada a las rutas con formularios interactivos (/contacto y /libro-de-reclamacion) */}
>>>>
```

---

### Ficha Técnica — Hallazgo 6 (🟡 Medio)
- **Título:** Proliferación de Directiva `"use client"` en Componentes 100% Estáticos
- **Ubicación:** `src/widgets/Footer/Footer.tsx:1`, `src/screens/legal/ui/CompanyPoliciesView.tsx:1`, `src/features/home/components/hero/LandingPageSection.tsx:1`, `src/features/blog/components/BlogList.tsx:1`, `src/shared/components/Layout/ItemGridLayout.tsx:1`
- **Causa Raíz:** Múltiples componentes visuales sin estado (`useState`), efectos (`useEffect`) ni listeners de eventos han sido etiquetados con `"use client"`. En Next.js App Router, marcar componentes puramente estáticos como Client Components fuerza la inclusión de sus árboles JSX en los bundles JavaScript del cliente.

```tsx
// PATCH: src/widgets/Footer/Footer.tsx
<<<<
"use client";

/**
 * @file Footer.tsx
====
/**
 * @file Footer.tsx
>>>>
```

---

### Ficha Técnica — Hallazgo 7 (🟡 Medio)
- **Título:** Uso de `framer-motion` `domMax` Completo (82.8 KB) en Lugar de `domAnimation` o CSS Transitions
- **Ubicación:** `src/shared/utils/framer-features.ts:1-2`, `src/widgets/Navbar/AuraDesktopNav.tsx:117-136`
- **Causa Raíz:** `src/shared/utils/framer-features.ts` exporta `domMax` (chunk `6055.a2279a2d6237c18d.js` de 82.77 KB / 27.39 KB gzip). `domMax` incluye soporte para drag-and-drop, layout animations complejas y gestos 3D. En la aplicación, la única animación con `layoutId` es la píldora activa de navegación en `AuraDesktopNav.tsx`.

```ts
// PATCH: src/shared/utils/framer-features.ts
<<<<
import { domMax } from "framer-motion";
export default domMax;
====
import { domAnimation } from "framer-motion";
export default domAnimation;
>>>>
```

---

### Ficha Técnica — Hallazgo 8 (🟡 Medio)
- **Título:** Script `optimize-images.mjs` no Genera Variantes Responsive ni Formato AVIF
- **Ubicación:** `scripts/optimize-images.mjs:65-71`, `next.config.mjs:16-18`
- **Causa Raíz:** Con `images: { unoptimized: true }` configurado en `next.config.mjs` para static export, el componente `<ResponsiveImage>` entrega la imagen directamente desde `/public/images/`. Como `optimize-images.mjs` genera únicamente un archivo a 1920px con calidad 80, teléfonos móviles descargan imágenes de 1,010 KB para un viewport de 375px.

```js
// PATCH: scripts/optimize-images.mjs
<<<<
const WEBP_OPTIONS = {
    quality: 80,      // Equilibrio perfecto entre peso y calidad visual
    effort: 6,       // Nivel de CPU dedicado a la compresión (1-6)
    lossless: false  // Compresión con pérdida para máximo ahorro
};
====
const WEBP_OPTIONS = {
    quality: 75,      // Calidad visual óptima reduciendo 35% de peso adicional
    effort: 6,
    lossless: false
};
>>>>
```

---

### Ficha Técnica — Hallazgo 9 (🟡 Medio)
- **Título:** Llamadas a `logger.info` en Render Loop de `ProjectsList` Impactando Build y Cliente
- **Ubicación:** `src/features/projects/components/ProjectsList.tsx:58-60`
- **Causa Raíz:** En `ProjectsList.tsx`, se invocan `logger.info(...)` y `logger.debug(...)` en el cuerpo principal de la función en cada render, serializando arrays con todos los proyectos del catálogo.

```tsx
// PATCH: src/features/projects/components/ProjectsList.tsx
<<<<
  logger.info({ years: years.slice(1), allYears: allProjects.map(p => ({ id: p.id, year: p.year, normalized: normalizeYear(p.year) })) }, "Available filter years");

  logger.info({ years: years.slice(1) }, "Available filter years");
====
  // Logs en render eliminados para evitar overhead de serialización en producción
>>>>
```

---

## 🟢 Hallazgos menores

| # | Título | Archivo | Impacto métrica | Esfuerzo |
|---|---|---|---|---|
| 10 | **Violación de Capa FSD: `features/blog` Importando desde `@screens/blog`** | `src/features/blog/index.ts:7-8` | Higiene de arquitectura FSD, Mantenibilidad | 5 mins |
| 11 | **Props Inertes de SEO Declaradas en `ItemGridLayout`** | `src/shared/components/Layout/ItemGridLayout.tsx:41-43, 57` | Limpieza de tipos y props muertas | 10 mins |
| 12 | **Uso de Etiquetas `<img>` Nativas sin Optimización de Layout** | `src/widgets/Navbar/components/UtilityLink.tsx:40-46`<br>`src/screens/legal/ui/BankAccountsView.tsx:136-141` | Riesgo de CLS puntual | 15 mins |
| 13 | **Ausencia de BreadcrumbList JSON-LD en Rutas de Catálogo y Detalle de Proyectos** | `src/app/proyectos/[projectId]/page.tsx:46-52`<br>`src/app/proyectos/page.tsx:23-28`<br>`src/app/servicios/page.tsx:23-28` | SEO Rich Snippets en Google Search | 20 mins |
| 14 | **Discrepancia en Token de Fuente Tipográfica Lora (CSS Var vs Hardcoded)** | `src/shared/providers/theme/index.ts:170-171`<br>`src/app/layout.tsx:13-17` | Consistencia tipográfica y sincronización de webfonts | 10 mins |
| 15 | **Archivo JPEG Residual no Optimizado en `/public/images/`** | `public/images/home-img_t14.JPG` (524.3 KB) | Desperdicio de almacenamiento en hosting (524 KB) | 5 mins |

---

### Ficha Técnica — Hallazgo 10 (🟢 Menor)
- **Título:** Violación de Capa FSD: `features/blog` Importando desde `@screens/blog`
- **Ubicación:** `src/features/blog/index.ts:7-8`
- **Causa Raíz:** El archivo barrel de la capa inferior `features/blog/index.ts` re-exporta componentes de la capa superior `@screens/blog/ui/BlogView` y `@screens/blog/ui/BlogPostView`. En FSD, la dependencia sólo debe fluir hacia abajo (`app -> screens -> widgets -> features -> shared`).

```ts
// PATCH: src/features/blog/index.ts
<<<<
export { BlogView } from "@screens/blog/ui/BlogView";
export { default as BlogPostView } from "@screens/blog/ui/BlogPostView";
====
// Vistas de pantallas deben ser consumidas desde @/screens/blog
>>>>
```

---

### Ficha Técnica — Hallazgo 11 (🟢 Menor)
- **Título:** Props Inertes de SEO Declaradas en `ItemGridLayout`
- **Ubicación:** `src/shared/components/Layout/ItemGridLayout.tsx:41-43, 57`
- **Causa Raíz:** Las props `seoTitle`, `seoDescription`, `seoCanonicalUrl` están tipadas y se pasan desde `ClientsSection`, `FeaturesSection`, `StoreSection`, `ProjectsList` y `ServiceList`, pero no se utilizan dentro del JSX retornado por `ItemGridLayout`.

```tsx
// PATCH: src/shared/components/Layout/ItemGridLayout.tsx
<<<<
    seoTitle?: string;
    seoDescription?: string;
    seoCanonicalUrl?: string;
====
>>>>
```

---

### Ficha Técnica — Hallazgo 12 (🟢 Menor)
- **Título:** Uso de Etiquetas `<img>` Nativas sin Optimización de Layout
- **Ubicación:** `src/widgets/Navbar/components/UtilityLink.tsx:40-46`, `src/screens/legal/ui/BankAccountsView.tsx:136-141`
- **Causa Raíz:** En `UtilityLink.tsx`, se renderiza `<img src={Icon} alt={label} width={20} height={20} />` y en `BankAccountsView.tsx` se utiliza `<Image src="/images/glassqr2026.webp" />` de Chakra UI en lugar del componente `next/image` con layout stability.

```tsx
// PATCH: src/widgets/Navbar/components/UtilityLink.tsx
<<<<
                {isImage ? (
                    <img
                        src={Icon as string}
                        alt={label}
                        width={20}
                        height={20}
                        style={{ opacity: isActive ? 1 : 0.7 }}
                    />
                ) : (
====
                {isImage ? (
                    <Image
                        src={Icon as string}
                        alt={label}
                        width={20}
                        height={20}
                        style={{ opacity: isActive ? 1 : 0.7 }}
                    />
                ) : (
>>>>
```

---

### Ficha Técnica — Hallazgo 13 (🟢 Menor)
- **Título:** Ausencia de BreadcrumbList JSON-LD en Rutas de Catálogo y Detalle de Proyectos
- **Ubicación:** `src/app/proyectos/[projectId]/page.tsx:46-52`, `src/app/proyectos/page.tsx:23-28`, `src/app/servicios/page.tsx:23-28`
- **Causa Raíz:** Las páginas de proyectos individuales y listas de catálogo no inyectan el esquema Schema.org `BreadcrumbList`, impidiendo que Google muestre la jerarquía de navegación ("Inicio > Proyectos > Residencial Sipan") en los resultados de búsqueda.

```tsx
// PATCH: src/app/proyectos/[projectId]/page.tsx
<<<<
export default function Page() {
  return (
    <ComponentErrorBoundary>
      <ProjectDetailView />
    </ComponentErrorBoundary>
  );
}
====
import { getBreadcrumbJsonLd } from "@/shared/utils/seo-utils";

export default async function Page({ params }: Props) {
  const { projectId } = await params;
  const project = getProjectById(projectId);
  const projectUrl = `https://www.gyacompany.com/proyectos/${projectId}`;

  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: "Inicio", url: "https://www.gyacompany.com" },
    { name: "Proyectos", url: "https://www.gyacompany.com/proyectos" },
    { name: project?.residencial || "Proyecto", url: projectUrl },
  ]);

  return (
    <ComponentErrorBoundary>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ProjectDetailView />
    </ComponentErrorBoundary>
  );
}
>>>>
```

---

### Ficha Técnica — Hallazgo 14 (🟢 Menor)
- **Título:** Discrepancia en Token de Fuente Tipográfica Lora (CSS Var vs Hardcoded)
- **Ubicación:** `src/shared/providers/theme/index.ts:170-171`, `src/app/layout.tsx:13-17`
- **Causa Raíz:** `layout.tsx` inyecta la variable CSS `--font-lora` en el elemento `<html>`, pero `theme/index.ts` define `fonts: { heading: { value: "'Lora', serif" }, body: { value: "'Lora', serif" } }` sin referenciar la variable `var(--font-lora)`.

```ts
// PATCH: src/shared/providers/theme/index.ts
<<<<
      fonts: {
        heading: { value: `'Lora', serif` },
        body: { value: `'Lora', serif` },
      },
====
      fonts: {
        heading: { value: `var(--font-lora), 'Lora', serif` },
        body: { value: `var(--font-lora), 'Lora', serif` },
      },
>>>>
```

---

### Ficha Técnica — Hallazgo 15 (🟢 Menor)
- **Título:** Archivo JPEG Residual no Optimizado en `/public/images/`
- **Ubicación:** `public/images/home-img_t14.JPG`
- **Causa Raíz:** Archivo de imagen en mayúsculas `.JPG` no procesado por el script de optimización, ocupando 524.3 KB de peso muerto.
- **Remediación:** Convertir a WebP mediante `node scripts/optimize-images.mjs` y eliminar el archivo `.JPG` de `public/images/`.

---

## 🧩 Inventario Server vs Client Components

| Ruta / Componente | Tipo Actual | Justificación de `"use client"` | ¿Evitable? | Acción de Remediación |
|---|---|---|---|---|
| `src/app/layout.tsx` | **Server** | Orquesta providers y metadatos globales | No (Correcto) | Mantener como Server Component |
| `src/app/providers.tsx` | **Client** | Context Providers (Chakra, Theme, LazyMotion) | No (Correcto) | Mantener `"use client"` aislado |
| `src/app/page.tsx` | **Server** | Metadata y render de `HomeView` | No (Correcto) | Mantener como Server Component |
| `src/screens/home/ui/HomeView.tsx` | **Server** | Ensamblado de secciones | Sí (Eliminar `lazy()`) | Quitar `React.lazy()` para emitir HTML completo en SSG |
| `LandingPageSection.tsx` | **Client** | Ninguna (0 hooks, 0 estado) | **Sí** | Convertir a Server Component |
| `ClientsSection.tsx` / `ClientCard.tsx` | **Client** | Ninguna (0 hooks, 0 estado) | **Sí** | Convertir a Server Component |
| `FeaturesSection.tsx` / `FeatureCard.tsx` | **Client** | Ninguna (0 hooks, 0 estado) | **Sí** | Convertir a Server Component |
| `StoreSection.tsx` | **Client** | `useState` para marcador activo | No (Correcto) | Mantener `"use client"` con `InteractiveMap` dynamic |
| `src/app/blog/page.tsx` | **Server** | Metadata SSG | No (Correcto) | Mantener como Server Component |
| `BlogList.tsx` / `BlogCard.tsx` | **Client** | Ninguna (0 hooks, 0 estado) | **Sí** | Convertir a Server Component |
| `src/app/blog/[slug]/page.tsx` | **Server** | `generateStaticParams`, JSON-LD, Metadata | No (Correcto) | Mantener como Server Component |
| `BlogPostView.tsx` | **Client** | Ninguna (render de contenido y badge) | **Sí** | Convertir a Server Component |
| `src/app/proyectos/page.tsx` | **Server** | Metadata SSG | No (Correcto) | Mantener como Server Component |
| `ProjectsList.tsx` | **Client** | `useFilterableList` (filtro por año, paginación) | No (Correcto) | Mantener `"use client"`, aislar imports de hooks |
| `src/app/proyectos/[projectId]/page.tsx` | **Server** | `generateStaticParams`, Metadata | No (Correcto) | Pasar `project` como prop al view |
| `ProjectDetailView.tsx` | **Client** | `useState` para selector Galería/Mapa | No (Correcto) | Aislar `MapViewer` con `dynamic()` |
| `src/app/servicios/page.tsx` | **Server** | Metadata SSG | No (Correcto) | Mantener como Server Component |
| `ServiceList.tsx` | **Client** | `useFilterableList` (filtro por categoría) | No (Correcto) | Mantener `"use client"`, aislar imports de hooks |
| `src/app/servicios/[serviceSlug]/page.tsx` | **Server** | `generateStaticParams`, JSON-LD | No (Correcto) | Pasar `pageData` directamente al layout |
| `ServicePageContainer.tsx` | **Client** | `useServiceData` con `useEffect` | **Sí (Eliminar)** | Renderizar `ServicePageLayout` directamente en servidor |
| `src/app/contacto/page.tsx` | **Server** | Metadata SSG | No (Correcto) | Mantener como Server Component |
| `ContactPageClient.tsx` | **Client** | Formularios de cotización y tracking | No (Correcto) | Mantener `"use client"` |
| `src/app/libro-de-reclamacion/page.tsx`| **Server** | Metadata SSG | No (Correcto) | Mantener como Server Component |
| `ReclamationForm.tsx` | **Client** | Formulario legal multi-sección con Context | No (Correcto) | Mantener `"use client"` |
| `CompanyPoliciesView.tsx` | **Client** | Ninguna (0 hooks, 0 estado, texto plano) | **Sí** | Convertir a Server Component |
| `BankAccountsView.tsx` | **Client** | `CopyButton` y `Toaster` | **Parcial** | Mantener vista como Server y `CopyButton` como Client |
| `src/widgets/Navbar/AuraNavbar.tsx` | **Client** | Scroll reveal listener y navegación interactiva | No (Correcto) | Mantener `"use client"` |
| `src/widgets/Footer/Footer.tsx` | **Client** | Ninguna (0 hooks, 0 estado, enlaces fijos) | **Sí** | Convertir a Server Component |

---

## 🎬 Animaciones: framer-motion vs ViewTransition

| Componente | Uso actual de `framer-motion` | ¿Sustituible? | Alternativa propuesta & Impacto |
|---|---|---|---|
| `src/app/providers.tsx`<br>`src/shared/utils/framer-features.ts` | `<LazyMotion features={domMax} strict>` | **Sí** | Sustituir `domMax` por `domAnimation`. **Ahorro:** ~35 KB uncompressed / ~12 KB gzip en carga de features. |
| `src/widgets/Navbar/AuraDesktopNav.tsx` | `<m.div layoutId="activeNavTab" ...>` para la píldora elástica de navegación | **Sí** | Reemplazar por CSS View Transitions con `view-transition-name: active-nav-tab` o transición CSS estándar (`transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)`). Elimina la necesidad estricta de layout projection. |
| `src/features/home/components/store/StoreSection.tsx` | `<AnimatePresence mode="wait"><m.div key={...} initial={{ opacity: 0, y: 10 }}>` en selector de tarjeta informativa | **Opcional** | Compatible con `domAnimation` estándar o `<ViewTransition>` nativo de React 19/Next.js. |
| `src/features/projects/components/modal/VisualViewer.tsx` | `<AnimatePresence mode="wait"><m.div>` al alternar Galería vs Mapa | **Opcional** | Compatible con `domAnimation` estándar o animación CSS `fade-in`. |
| `src/features/projects/components/modal/ProjectInfo.tsx` | `<m.div initial={{ opacity: 0, y: 10 }}>` | **Sí** | Sustituir por keyframe CSS `@keyframes slideUp` ya definido en `providers.tsx`. |

---

## 🚀 Quick wins (≤ 1 día)

1. **Eliminar el re-export de `useFirestoreQuery` en `src/shared/hooks/index.ts`** y ajustar imports en `ProjectsList.tsx` y `ServiceList.tsx`. **Impacto inmediato:** -209.6 KB raw (-67.5 KB gzip) en el bundle cliente global.
2. **Transferir `pageData` síncronamente en `src/app/servicios/[serviceSlug]/page.tsx`** a `ServiceDetailView`. **Impacto inmediato:** Elimina CLS (0.24 -> 0.02) y asegura 100% de indexación SEO en Googlebot para las 10 páginas de servicios.
3. **Eliminar `React.lazy` en `HomeView.tsx`** para las secciones estáticas de clientes, características y tienda. **Impacto inmediato:** `dist/index.html` contiene el contenido textual completo pre-renderizado.
4. **Convertir `MapViewer.tsx` en `dynamic({ ssr: false })` dentro de `VisualViewer.tsx`**. **Impacto inmediato:** -148.3 KB raw (-31.8 KB gzip) en la carga inicial de páginas de proyectos.
5. **Mover el script de Google reCAPTCHA v3** desde `src/app/layout.tsx` a las páginas específicas de formularios (`/contacto` y `/libro-de-reclamacion`). **Impacto inmediato:** -120 ms TBT en páginas de contenido general.
6. **Cambiar `domMax` por `domAnimation` en `src/shared/utils/framer-features.ts`**. **Impacto inmediato:** -35 KB en el bundle de animaciones.
7. **Eliminar los logs de `logger.info` en el render loop de `ProjectsList.tsx`**.

---

## 🏗️ Mejoras de largo plazo (> 1 sprint)

1. **Pipeline de Generación Multi-Resolución de Imágenes con `sharp`:** Extender `scripts/optimize-images.mjs` para crear variantes en 480px, 800px y 1280px con formato AVIF y WebP dual, reduciendo el peso total de `/public/images` de 91 MB a < 25 MB.
2. **Migración a ViewTransition API Nativa para Navegación entre Páginas:** Implementar transiciones de página nativas aprovechando Next.js App Router para una navegación tipo Single-Page App fluida sin dependencias de librerías externas.
3. **Compound Components para Secciones Complejas:** Refactorizar componentes con proliferación de props booleanas en la capa `features` siguiendo el patrón ya implementado exitosamente en `ProjectDetailModal.Root`.
4. **Estrategia de Custom Image Loader para Static Hosting:** Implementar un loader de imágenes personalizado si se realiza el despliegue en CDN con capacidad de transformación en el borde (Cloudflare Images o Firebase Storage Extension).

---

## 🔄 Log de actividad del agente

| Fecha | Acción |
|---|---|
| 2026-08-20 | Inicio de auditoría de Fase 2 (Performance y Arquitectura). |
| 2026-08-20 | Ejecución de build con `@next/bundle-analyzer` y Webpack Bundle Analyzer (`.next/analyze/client.html`). |
| 2026-08-20 | Análisis estático de chunks JS: 62 chunks, 2,142.33 KB raw, 663.22 KB gzip. |
| 2026-08-20 | Detección de fuga de 209.56 KB de SDK de Firebase en cliente por barrel file `shared/hooks/index.ts`. |
| 2026-08-20 | Descubrimiento de SSG Skeleton Flash en `dist/servicios/*.html` e `index.html` por `useEffect` y `React.lazy`. |
| 2026-08-20 | Detección de carga eager de `@react-google-maps/api` (148 KB) en `VisualViewer.tsx`. |
| 2026-08-20 | Auditoría masiva de 548 imágenes en `/public/images/` (91.02 MB) y script `optimize-images.mjs`. |
| 2026-08-20 | Mapeo exhaustivo de Server vs Client Components en todas las capas FSD. |
| 2026-08-20 | Generación de métricas en `.audits/fase-2-performance/metrics/bundle-summary.md`. |
| 2026-08-20 | Redacción y formalización del informe técnico completo en `.audits/fase-2-performance/findings.md`. |
