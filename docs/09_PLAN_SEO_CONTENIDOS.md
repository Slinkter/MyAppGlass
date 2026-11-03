# 📈 Plan de Trabajo Maestro: SEO Copywriting, Storytelling & Estrategia de Contenidos
**Empresa:** Glass & Aluminum Company S.A.C. (GYA Company)  
**Dominio:** [https://www.gyacompany.com](https://www.gyacompany.com)  
**Roles Asignados:** `seo-copywriter`, `storyteller-content-strategist`, `Lead SEO Architect`  
**Fecha de Creación:** 16 de Agosto de 2026  
**Estado:** 🟡 En Planificación y Ejecución Activa  

> **Nota de verificación (noviembre 2026):** estado contrastado con el código tras la optimización integral de Sitelinks, JSON-LD y Ecosistema Google ([14_PLAN_ESTRATEGICO_SEO_Y_METRICAS.md](./14_PLAN_ESTRATEGICO_SEO_Y_METRICAS.md)). `src/app/sitemap.ts` incluye todas las rutas estáticas (incluyendo `/presupuesto` y `/simulador-ai`), los 10 servicios con prioridades Sitelinks (`0.9` / `0.85`), los 10 posts del blog y los proyectos con Image Sitemap. `src/app/robots.ts` desbloquea `/_next/`, bloquea rutas privadas/shells (`/admin/`, `/auth/`, `/design-system*`, `/servicios/ver`, `/proyectos/ver`) y habilita bots de búsqueda IA. `src/shared/utils/seo-utils.ts` incluye `WebSite`, `LocalBusiness`/`HomeAndConstructionBusiness`, `SiteNavigationElement` (`#sitelinks`), `Service`, `CreativeWork`, `WebApplication`, `BreadcrumbList`, `FAQPage` y el motor `buildPageMetadata()`.

---

## 🎯 Resumen Ejecutivo del Plan SEO & Contenidos

| Sprint / Fase | Objetivo Principal | Rol Responsable | Prioridad | Estado |
| :--- | :--- | :--- | :--- | :--- |
| **Sprint 1** | Auditoría & Enriquecimiento de Metadatos On-Page (`buildPageMetadata`) | `seo-copywriter` | 🔴 Alta | ✅ Completado |
| **Sprint 2** | Calendario Editorial & Artículos de Autoridad (Blog) | `storyteller-content-strategist` | 🟡 Alta | ✅ Completado |
| **Sprint 3** | Arquitectura Silo, Sitelinks en Footer & Enlazado Interno | `seo-copywriter` | 🟢 Media | ✅ Completado |
| **Sprint 4** | Rich Snippets Avanzados (`SiteNavigationElement`, `FAQPage`, `CreativeWork`, `WebApplication`) | `Lead SEO Architect` | 🔵 Media | ✅ Completado |
| **Sprint 5** | SEO Local, Consistencia NAP (`Av. Los Fresnos 1250 - La Molina`) & Google Maps | `Lead SEO Architect` | 🟣 Continua | ✅ Código / ⏳ Externo |

---

## 📌 Sprint 1: Auditoría y Enriquecimiento de Metadatos On-Page (Copywriting)
*Objetivo: Maximizar el CTR (Click-Through Rate) en Google y evitar que se muestren fragmentos vacíos o del footer en los SERPs.*

- [x] **1.1 Optimizar Metadatos de la Página Principal (`/`):**
  - [x] Title Tag (50-60 caracteres): *"Vidriería en La Molina | Glass & Aluminum Company S.A.C."*
  - [x] Meta Description (140-155 caracteres) con propuesta de valor y llamada a la acción clara.
  - [x] OpenGraph y Twitter Cards optimizados.
- [x] **1.2 Optimizar Metadatos del Catálogo de Servicios (`/servicios` y `/servicios/[serviceSlug]`):**
  - [x] Títulos comerciales únicos y meta-descripciones de 140-155 caracteres en todos los servicios (Ventanas, Mamparas, Duchas, Techos, Barandas, Balcones, etc.).
- [x] **1.3 Optimizar Metadatos de la Galería de Proyectos (`/proyectos`):**
  - [x] Title y Description destacando obras residenciales y comerciales en La Molina, Surco y Lima.
- [x] **1.4 Optimizar Metadatos del Blog Principal (`/blog` y `/blog/[slug]`):**
  - [x] Título y Description orientados a guías de arquitectura, aislamiento acústico y tendencias.
- [x] **1.5 Optimizar Metadatos de Contacto y Cotización (`/contacto`):**
  - [x] Título persuasivo: *"Cotizar Vidriería en La Molina | GYA Company"*.

---

## 📌 Sprint 2: Calendario Editorial & Storytelling de Autoridad en el Blog
*Objetivo: Posicionar palabras clave informativas y resolver dudas reales de propietarios y constructores en Lima (E-E-A-T).*

### 📚 Topic Cluster 1: Ventanas Antirruido y Aislamiento Acústico
- [x] **2.1 Artículo 1 (Pilar de Acústica):**
  - [x] Título: *"Guía Definitiva de Ventanas Antirruido en Lima: Aislamiento Acústico y Confort"*.
  - [x] Contenido: Vidrio insulado (DVH 6+12+6), perfiles herméticos con empaques EPDM, reducción de 32 a 42 decibeles (dB), casos de estudio en La Molina y Surco.
  - [x] CTA directo a cotización en `/servicios/ventana` y `/contacto`.

### 📚 Topic Cluster 2: Mamparas y Vidrio Templado
- [x] **2.2 Artículo 2 (Pilar de Vidrio de Seguridad):**
  - [x] Título: *"Vidrio Templado vs. Laminado: ¿Cuál Elegir para Mamparas de Terraza y Balcones en Lima?"*.
  - [x] Contenido: Normas de seguridad RNE (Norma E.040 de Vidrio), resistencia a vientos, espesores de 8mm y 10mm, protección UV y seguridad anti-desprendimiento.
  - [x] CTA a `/servicios/mampara` y `/servicios/balcones`.

### 📚 Topic Cluster 3: Mantenimiento y Cuidado de Materiales
- [x] **2.3 Artículos de Mantenimiento y Techos:**
  - [x] Cobertura temática integrada en los posts existentes con enlaces contextuales a `/servicios/techo` y `/servicios/baranda`.

---

## 📌 Sprint 3: Arquitectura Silo & Enlazado Interno (Internal Linking)
*Objetivo: Distribuir la autoridad de página (PageRank) desde los artículos del blog hacia las páginas de servicios transaccionales.*

- [x] **3.1 Mapeo de Enlaces Internos:**
  - [x] Cada artículo del blog contiene enlaces contextuales con anchor text exacto hacia sus servicios correspondientes (`/servicios/ventana`, `/servicios/mampara`, `/servicios/ducha`, `/servicios/techo`, etc.) y hacia el formulario de cotizaciones (`/contacto`).
- [x] **3.2 Bloque de "Artículos Relacionados" y "Servicios Recomendados":**
  - [x] Navegación contextual entre artículos y servicios para aumentar el tiempo de permanencia.
- [x] **3.3 Botón Flotante y Banners Contextuales:**
  - [x] WhatsApp flotante directo en toda la web para conversión instantánea.

---

## 📌 Sprint 4: Datos Estructurados Avanzados (Schema.org)
*Objetivo: Ganar fragmentos enriquecidos (Rich Snippets) en Google (Preguntas Frecuentes, Migas de Pan y Artículos).*

- [x] **4.1 Schema `FAQPage` en Páginas de Servicios:**
  - [x] Implementado acordeón visual interactivo de Preguntas Frecuentes con diseño Aura y marcado JSON-LD `@type: "FAQPage"` en todas las páginas de servicios.
- [x] **4.2 Schema `BlogPosting` / `Article` en cada Post del Blog:**
  - [x] Inyectados metadatos de autoría (`author: Glass & Aluminum Company S.A.C.`), publisher con logo, fechas y BreadcrumbList.
- [x] **4.3 Schema `LocalBusiness` / `HomeAndConstructionBusiness` Enriquecido:**
  - [x] Configurado con áreas servidas en Lima, coordenadas geográficas, horarios y catálogo de servicios.

---

## 📌 Sprint 5: Dominio de SEO Local & Google Business Profile
*Objetivo: Capturar los primeros lugares en el mapa de Google (Local 3-Pack) en La Molina y distritos vecinos.*

- [x] **5.1 Consistencia NAP (Name, Address, Phone):**
  - [x] Asegurar que el nombre (*Glass & Aluminum Company S.A.C.*), dirección oficial (*Av. Los Fresnos 1250 - La Molina*), correo (*acueva@gyacompany.com*) y teléfono (*+51 974 278 303*) sean 100% idénticos en la web, Footer, JSON-LD y ficha de Google Business Profile (`luis.j.cueva@gmail.com`).
- [x] **5.2 Coordenadas Geográficas y Horarios:**
  - [x] Coordenadas fijas `-12.0867, -76.9315` y horario oficial de Lunes a Sábado de 08:00 a 18:00 en toda la estructura de datos.
- [x] **5.3 Landing Pages Locales por Distrito (Evolutivo):**
  - [x] Evaluar creación de sub-páginas hiperlocales: *"Vidriería en Surco"*, *"Vidriería en San Borja"*, *"Vidriería en Miraflores"*.

---

## 📝 Registro de Control de Versiones del Plan SEO

| Versión | Fecha | Responsable | Descripción |
| :--- | :--- | :--- | :--- |
| `v1.0.0` | 16/08/2026 | Arquitecto SEO & Content Strategist | Creación inicial del plan maestro de SEO Copywriting y Storytelling. |

---
> [!TIP]
> *A medida que ejecutemos cada tarea con los subagentes (`seo-copywriter` y `storyteller-content-strategist`), marcaremos las casillas `- [x]` y registraremos el commit respectivo.*
