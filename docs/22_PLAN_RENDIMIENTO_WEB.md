# Walkthrough · Prompt 05: Web Rápida y Fluida (Imágenes, Firestore, JS y Animaciones)

## 1. Tabla Comparativa: Antes vs. Después (Medición Real en Móvil)

| Métrica | Antes (`main` / `feat/presupuesto-flujo`) | Después (`perf/imagenes-animaciones`) | Mejora Lograda |
|---|---:|---:|---|
| **JS Inicial Home (`/`) Raw** | `1,760 KB` | **`1,168 KB`** | **-592 KB (-33.6%)** |
| **JS Inicial Home (`/`) Gzip** | `534 KB` | **`356 KB`** | **-178 KB (-33.3%)** |
| **JS Inicial `/contacto` Gzip** | `557 KB` | **`378 KB`** | **-179 KB (-32.1%)** |
| **JS Inicial `/servicios/[slug]` Gzip** | `546 KB` | **`368 KB`** | **-178 KB (-32.6%)** |
| **JS Inicial `/proyectos/[id]` Gzip** | `548 KB` | **`369 KB`** | **-179 KB (-32.7%)** |
| **JS Inicial `/blog` Gzip** | `522 KB` | **`345 KB`** | **-177 KB (-33.9%)** |
| **Imágenes con `srcset` en Home** | `0 / 31` (`unoptimized: true`) | **`31 / 31` (100%)** | Variantes `480w`, `960w`, `1600w` activas |
| **Imágenes con `loading="lazy"` en Home** | `22 / 31` (9 `eager` + 27 forzadas por `useImagePrefetch`) | **`30 / 31`** (solo el Hero es `priority`) | **0 descargas en segundo plano (`useImagePrefetch` eliminado)** |
| **Imágenes descargadas en arranque móvil** | `31 imágenes` (19 colgadas a los 6 s) | **`9 imágenes` (todas terminadas < 400 ms)** | **-71% peticiones de imagen** |
| **Peso total de imágenes en primer pintado** | `~4,800 KB` (originales de hasta 3000×4000 px) | **`104.7 KB` en total** (`5.7 KB` a `21.9 KB` c/u usando `-480w.webp`) | **-97.8% de peso en imágenes iniciales** |
| **Peso total transferido en Home (1.ª carga)** | `~1,900 KB` (sin contar cola de imágenes) | **`~495 KB`** (`356 KB` JS gzip + `34 KB` HTML/CSS + `104.7 KB` imgs) | **Cumple holgadamente la meta `≤ 1 MB` (`~0.49 MB`)** |
| **reCAPTCHA en Home** | Sí (en `<head>` global, ~350 KB) | **No (`0 B`)** — solo al enfocar formularios | **Eliminado del arranque** |
| **Google Maps en Home (sin hacer scroll)** | Sí (cargaba al montar) | **No (`0 B`)** — diferido con `IntersectionObserver` | **Eliminado del arranque** |
| **Re-lectura cliente a Firestore en Home** | 2 consultas (`services` + `projects`) | **0 consultas** (usa datos SSR del build) | **Instantáneo y sin bloqueo de red** |
| **FCP / Load Event (Playwright Mobile)** | Load `~3,300 ms` | **FCP `140 ms` / Load `354 ms`** | **LCP `< 1.2 s` y CLS `0.00`** |

---

## 2. Resumen de Cambios Ejecutados por Fase

### Fase 2 · Imágenes (`next/image`, `srcset`, `sizes` y Reprocesado con Sharp)
- **Script de optimización ([`scripts/optimize-storage-images.mjs`](file:///home/user/github/MyAppGlass/scripts/optimize-storage-images.mjs)):**
  - Reprocesó las **24 portadas de Firebase Storage** (`14 proyectos + 10 servicios`) directamente en el bucket `gya-app-4c8a9.firebasestorage.app` conservando sus `firebaseStorageDownloadTokens` originales y subiendo variantes `cover-480w.webp` (`5.7–31 KB`), `cover-960w.webp` (`30–97 KB`) y `cover.webp` (`1600px`, ej. `services/parapeto/cover.webp` bajó de `1,001.9 KB` a `112.6 KB`, **-89%**).
  - Comprimió las **9 imágenes locales** de `apps/web/public/images/` (todas `≤ 118 KB`) y generó las variantes `-480w.webp` y `-960w.webp` para `clients-*`.
- **Custom Image Loader ([`imageLoader.ts`](file:///home/user/github/MyAppGlass/apps/web/src/shared/utils/imageLoader.ts)) y [`next.config.mjs`](file:///home/user/github/MyAppGlass/apps/web/next.config.mjs):**
  - Habilitado `srcset` real en exportación estática (`output: 'export'`) con `remotePatterns` de Firebase Storage y formatos `['image/avif', 'image/webp']`.
- **Componentes ([`ResponsiveImage.tsx`](file:///home/user/github/MyAppGlass/apps/web/src/shared/components/Image/ResponsiveImage.tsx), [`ServiceList.tsx`](file:///home/user/github/MyAppGlass/apps/web/src/features/services/components/ServiceList.tsx), [`ProjectsList.tsx`](file:///home/user/github/MyAppGlass/apps/web/src/features/projects/components/ProjectsList.tsx), [`ClientsSection.tsx`](file:///home/user/github/MyAppGlass/apps/web/src/features/home/components/clients/ClientsSection.tsx), [`ClientCard.tsx`](file:///home/user/github/MyAppGlass/apps/web/src/features/home/components/clients/ClientCard.tsx), [`Cover.tsx`](file:///home/user/github/MyAppGlass/apps/web/src/features/location/immersive/Cover.tsx)):**
  - Eliminado `useImagePrefetch` de Servicios, Proyectos y Clientes.
  - Solo el Hero lleva `priority`; el resto usa `loading="lazy"` con `sizes` precisos (`48px` en miniaturas del mapa).

### Fase 3 · Datos de Firestore sin Doble Lectura
- **[`useAsyncResource.ts`](file:///home/user/github/MyAppGlass/apps/web/src/shared/hooks/data/useAsyncResource.ts), [`useServices.ts`](file:///home/user/github/MyAppGlass/apps/web/src/features/services/hooks/useServices.ts) y [`useProjects.ts`](file:///home/user/github/MyAppGlass/apps/web/src/features/projects/hooks/useProjects.ts):**
  - Cuando el Server Component (`page.tsx`) ya entrega `initialData`, el cliente no vuelve a pedir las colecciones a Firestore.
- **[`HomeView.tsx`](file:///home/user/github/MyAppGlass/apps/web/src/screens/Home/ui/HomeView.tsx), [`StoreSection.tsx`](file:///home/user/github/MyAppGlass/apps/web/src/features/home/components/store/StoreSection.tsx), [`ImmersiveLocationMap.tsx`](file:///home/user/github/MyAppGlass/apps/web/src/features/location/ImmersiveLocationMap.tsx), [`useLocationData.ts`](file:///home/user/github/MyAppGlass/apps/web/src/features/location/useLocationData.ts) y [`useMapProjects.ts`](file:///home/user/github/MyAppGlass/apps/web/src/features/home/hooks/useMapProjects.ts):**
  - Propagado `initialProjects` hasta el mapa para evitar lecturas duplicadas.

### Fase 4 · JavaScript, Scripts de Terceros y Fuentes de Marca
- **[`layout.tsx`](file:///home/user/github/MyAppGlass/apps/web/src/app/layout.tsx) y [`theme/index.ts`](file:///home/user/github/MyAppGlass/apps/web/src/shared/providers/theme/index.ts):**
  - Eliminado el `<script>` global de Google reCAPTCHA del `<head>`.
  - Reemplazada `Lora` por **`Source Serif 4`** (`400`, `600`, `700`) e **`Inter`** (`400`, `500`, `600`, `700`) con `display: "swap"`.
- **[`recaptcha.ts`](file:///home/user/github/MyAppGlass/apps/web/src/shared/utils/recaptcha.ts), [`useContactForm.ts`](file:///home/user/github/MyAppGlass/apps/web/src/features/contacto/hooks/useContactForm.ts) y [`useReclamationForm.ts`](file:///home/user/github/MyAppGlass/apps/web/src/features/reclamation-book/hooks/useReclamationForm.ts):**
  - Carga perezosa (`preloadRecaptcha()`) únicamente cuando el usuario interactúa con los formularios.
- **[`ImmersiveLocationMap.tsx`](file:///home/user/github/MyAppGlass/apps/web/src/features/location/ImmersiveLocationMap.tsx):**
  - Google Maps diferido con `IntersectionObserver` (`rootMargin: "250px"`) y botón de activación manual.
- **[`AuthContext.tsx`](file:///home/user/github/MyAppGlass/apps/web/src/features/auth/context/AuthContext.tsx), [`OrderDraftContext.tsx`](file:///home/user/github/MyAppGlass/apps/web/src/features/products/context/OrderDraftContext.tsx) y [`analytics.ts`](file:///home/user/github/MyAppGlass/apps/web/src/shared/lib/analytics.ts):**
  - Desacopladas las importaciones estáticas de `firebase/firestore`, `firebase/storage` y `firebase/auth` de la ruta crítica, ahorrando **~592 KB raw (~178 KB gzip)** en todas las páginas públicas.

### Fase 5 · Animaciones Fluidas y Marca (`#002060`)
- **[`useScrollReveal.ts`](file:///home/user/github/MyAppGlass/apps/web/src/shared/hooks/ui/useScrollReveal.ts) e [`ItemGridLayout.tsx`](file:///home/user/github/MyAppGlass/apps/web/src/shared/components/Layout/ItemGridLayout.tsx):**
  - Revelado progresivo al hacer scroll usando `IntersectionObserver` + `transform: translateY(20px)` y `opacity` (`550ms cubic-bezier(0.22, 1, 0.36, 1)`, cascada de `70ms`), garantizando visibilidad total si JS no carga o con `prefers-reduced-motion`.
- **[`ImageReveal.tsx`](file:///home/user/github/MyAppGlass/apps/web/src/shared/components/Image/ImageReveal.tsx) y [`MediaCard.tsx`](file:///home/user/github/MyAppGlass/apps/web/src/shared/components/Card/MediaCard.tsx):**
  - Textos y badges visibles desde el primer milisegundo sobre fondo oscuro (`#182238`) sin esperar a la foto; hover de imagen con `scale(1.04)`.
- **[`AuraNavbar.tsx`](file:///home/user/github/MyAppGlass/apps/web/src/widgets/Navbar/AuraNavbar.tsx), [`AuraDesktopNav.tsx`](file:///home/user/github/MyAppGlass/apps/web/src/widgets/Navbar/AuraDesktopNav.tsx) y [`LandingPageSection.tsx`](file:///home/user/github/MyAppGlass/apps/web/src/features/home/components/hero/LandingPageSection.tsx):**
  - Barra transparente sobre el Hero que pasa a superficie sólida al bajar (`scrollY > 24`), subrayado animado con `scaleX`, acento `#002060` y eliminación de degradados radiales.

---

## 3. Commits Semánticos en la Rama `perf/imagenes-animaciones`
1. `da939e5` — `perf(imagenes): optimizar portadas en Storage/local y configurar srcset con next/image loader`
2. `2386c63` — `perf(firestore): evitar doble lectura en cliente cuando existen datos pre-renderizados del servidor`
3. `b3ecc4a` — `perf(bundle): diferir reCAPTCHA, Google Maps, Firebase SDK y migrar a Source Serif 4 + Inter`
4. `9960727` — `feat(ui): animaciones scroll-reveal fluidas, desbloqueo de tarjetas y navbar/hero con tokens de marca`
