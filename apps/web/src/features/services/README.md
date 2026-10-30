# Services Feature Module

## Overview

Módulo de negocio responsable de presentar el catálogo de servicios corporativos y la vista de detalle de cada servicio (`/servicios/[serviceSlug]`), incluyendo fichas técnicas, preguntas frecuentes (FAQ) y galerías de imágenes.

> Nota: los sistemas oficiales de ventanas son 4: Nova, Serie 25, Serie 35 y Serie 62. El simulador vigente es `/simulador-ai` (superposición visual local).

---

## 🏛️ Componentes (`components/`)

- **`ServicePageLayout.tsx`**: Layout maestro del detalle de servicio; orquesta la galería fotográfica (`Gallery`), las secciones descriptivas y las FAQ.
- **`ServiceList.tsx`**: Listado del catálogo (usa `useFilterableList` e `ItemGridLayout`).
- **`ServiceCard.tsx`**: Tarjeta de cada servicio.
- **`ServiceBentoGrid.tsx`**: Tarjetas de la ficha del servicio (`UnifiedTechnicalCard` y `BentoCTA`).
- **`ServiceHeader.tsx`**: Cabecera de la página de detalle.
- **`ServiceFaqSection.tsx`**: Acordeón de preguntas frecuentes.

---

## 📦 Datos y Servicios

Firebase (Firestore + Storage) es la única fuente de servicios; ya no hay datos locales.

- **Build (SEO del export estático)**: `shared/api/firebase/publicRest.ts` lee `/services` por la API REST pública y alimenta `generateStaticParams`, metadatos, JSON-LD y `initialData`. Si falla, devuelve `[]` y la ruta usa el slug centinela `_`.
- **Cliente**: `hooks/useServices.ts` renderiza primero con `initialData` y luego refresca desde Firestore (`shared/hooks/data/useAsyncResource.ts`).
- **`hooks/serviceMappers.ts`**: Convierte `Service` de Firestore a `ServiceListItem` y `ServicePageData` (galería agrupada por `system`, FAQ desde `faqs`).
- **`types.ts`**: Tipos de vista (`ServicePageData`, `ServiceListItem`, `ServicePageSystem`).
