# Métricas de Bundle y Rendimiento · Portal GYA (Fase 2)

> **Fecha de captura:** 2026-08-20  
> **Entorno:** Next.js 16.2.4 (Turbopack / Webpack analyzer) · Node v20+ · pnpm v11.22.0  
> **Modo de compilación:** `output: 'export'` (Static Site Generation - 47/47 rutas)

---

## 📦 1. Resumen Global del Bundle Cliente

| Métrica | Valor Medido | Meta / Baseline | Estado |
|---|---|---|---|
| **Total Chunks JS** | 62 archivos | — | Informativo |
| **Total JS Bundle (Raw / Sin comprimir)** | **2,142.33 KB (2.14 MB)** | < 1.5 MB | 🟡 Mejorable |
| **Total JS Bundle (Gzip)** | **663.22 KB (0.66 MB)** | < 450 KB | 🟡 Mejorable |
| **Código Firebase Muerto en Cliente** | **209.56 KB (67.53 KB gzip)** | 0 KB | 🔴 Crítico |
| **Librería Google Maps en Bundle Inicial** | **148.30 KB (31.83 KB gzip)** | Lazy on interaction | 🔴 Crítico |
| **Framer Motion (`domMax`)** | **82.77 KB (27.39 KB gzip)** | < 15 KB (domAnimation) | 🟡 Mejorable |
| **Chakra UI v3 + Emotion Runtime** | **436.51 KB (111.47 KB gzip)** | Tree-shaken | 🟡 Evaluado |
| **Imágenes Públicas en `/public`** | **548 archivos (91.02 MB)** | < 30 MB optimizado | 🟡 Mejorable |

---

## 📊 2. Top 20 Chunks de JavaScript por Tamaño

| # | Archivo Chunk | Tamaño Raw (KB) | Tamaño Gzip (KB) | Módulos Principales Identificados |
|---|---|---|---|---|
| 1 | `4177-3ab7303b9fd32123.js` | 219.35 KB | 51.66 KB | `@chakra-ui/react` (Componentes y recetas Aura) + `@emotion/react` |
| 2 | `2256-f532a316d84737a7.js` | 217.16 KB | 59.81 KB | `@chakra-ui/react` v3 Core System & Anatomy |
| 3 | `8e203853-a22f63997403bf00.js` | 195.19 KB | 61.41 KB | `react-dom` runtime (React 18.3.1) |
| 4 | `a5e60f21-9c581d9b59eb918c.js` | 148.30 KB | 31.83 KB | `@react-google-maps/api` |
| 5 | `framework-35256df14265b061.js` | 136.49 KB | 43.95 KB | Next.js Framework & React Client Core |
| 6 | `main-316aa25bbc31e188.js` | 128.41 KB | 37.33 KB | Next.js App Router Client Runtime & Router |
| 7 | `631abe4a-c8d038b47498dd58.js` | 110.41 KB | 33.44 KB | `@firebase/firestore` (Código no utilizado en cliente) |
| 8 | `polyfills-42372ed130431b0a.js` | 109.96 KB | 38.70 KB | Polyfills estándar para navegadores modernos |
| 9 | `2176-ceafac7019bb8ad0.js` | 100.04 KB | 32.42 KB | `zod` ^4 schemas & validaciones cliente |
| 10 | `404-e51383cbf2f21ffd.js` | 99.16 KB | 34.09 KB | `@firebase/app` SDK (Código no utilizado en cliente) |
| 11 | `6055.a2279a2d6237c18d.js` | 82.77 KB | 27.39 KB | `framer-motion` (`domMax` lazy features bundle) |
| 12 | `7106-660df3c152d26e0d.js` | 48.01 KB | 13.22 KB | `src` visual helpers + `lucide-react` icons |
| 13 | `7967-a3465c7b6b088b0e.js` | 42.66 KB | 15.14 KB | `next-themes` + UI state providers |
| 14 | `1487-aab74126ec6c47f2.js` | 37.57 KB | 13.48 KB | Map marker overlays & Google Maps utils |
| 15 | `159-e4c83167aaa6822d.js` | 27.98 KB | 8.46 KB | `src/features/home` UI subcomponents |
| 16 | `layout-987475a876cffb1d.js` | 27.60 KB | 9.36 KB | `src/app/layout.tsx` (Navbar, Footer, Providers) |
| 17 | `6330-c0ad59cba225074c.js` | 27.23 KB | 9.63 KB | Shared utilities & formatters |
| 18 | `9297-c3b4073da95b5561.js` | 26.81 KB | 9.53 KB | Shared UI layouts & containers |
| 19 | `357-17531acacfaaf9e7.js` | 26.36 KB | 9.33 KB | Services catalog data & mapping |
| 20 | `page-316789c486775521.js` | 25.37 KB | 8.32 KB | `src/app/page.tsx` client bundle |

---

## 🖼️ 3. Auditoría de Imágenes en `/public/images/`

- **Total de imágenes:** 548 archivos
- **Peso total acumulado:** 91.02 MB
- **Imágenes mayores a 500 KB:** 15 archivos
- **Archivos no WebP/SVG:** 2 archivos (`home-img_t14.JPG` con 524.3 KB y `logovcr.png` con 61.0 KB)

### Top 5 Imágenes más Pesadas
1. `public/images/services-products-02.Mampara-IMG_0694.webp`: 1,010.6 KB (1.01 MB)
2. `public/images/services-products-02.Mampara-m_serie04.webp`: 1,010.6 KB (1.01 MB)
3. `public/images/services-products-05.Parapeto-IMG_20250808_131220.webp`: 1,001.9 KB (1.00 MB)
4. `public/images/services-products-06.Baranda-IMG_2731.webp`: 927.8 KB
5. `public/images/services-products-06.Baranda-IMG_2733.webp`: 870.3 KB

---

## ⚡ 4. Estimación de Core Web Vitals

| Métrica | Estimación Baseline | Target Objetivo | Diagnóstico |
|---|---|---|---|
| **LCP (Largest Contentful Paint)** | ~1.8s - 2.6s (Desktop) / ~3.2s - 4.1s (Mobile 4G) | < 2.5s | 🟡 LCP en móvil penalizado por imágenes de 1920px no reducidas para viewport móvil |
| **INP (Interaction to Next Paint)** | ~80ms - 140ms | < 200ms | 🟢 Bueno, interacción ágil tras hidratación |
| **CLS (Cumulative Layout Shift)** | ~0.15 - 0.28 (en rutas `/servicios/*` y `/`) | < 0.1 | 🔴 Crítico debido a Skeleton Flash y reemplazo de DOM post-hidratación |
| **TBT (Total Blocking Time)** | ~220ms - 340ms | < 200ms | 🟡 Penalizado por Google reCAPTCHA v3 en `<head>` global y ejecución de Chakra/Emotion |
| **FCP (First Contentful Paint)** | ~0.9s | < 1.8s | 🟢 Bueno gracias a Next.js Static Export |
| **Speed Index** | ~2.1s | < 3.4s | 🟢 Bueno |
