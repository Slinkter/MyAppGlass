# 🚀 Diagnóstico SEO y Plan de Posicionamiento

**Fecha:** 26 de Noviembre de 2025
**Sitio Web:** GYA Company (Vidriería y Aluminio)
**Estado Técnico:** ✅ Saludable (SPA con React + Vite)

---

## 1. 📊 Diagnóstico del Estado Actual

### ✅ Puntos Fuertes (Lo que ya funciona bien)

1.  **Infraestructura SEO:** Tienes `sitemap.xml` y `robots.txt` correctamente configurados.
2.  **Metadatos Dinámicos:** El componente `HelmetWrapper` inyecta títulos y descripciones personalizados por página.
3.  **Datos Estructurados (JSON-LD):** Tienes implementado el esquema `LocalBusiness` en `index.html`, lo cual es **excelente** para aparecer en mapas y búsquedas locales ("vidriería cerca de mí").
4.  **Jerarquía de Encabezados:** La página de inicio usa correctamente `<h1>` para el título principal y `<h2>` para subtítulos.
5.  **URLs Amigables:** Rutas limpias como `/servicios` y `/proyectos`.

### ⚠️ Áreas de Mejora (Oportunidades)

1.  **Metadatos Duplicados:** `index.html` contiene meta tags estáticos que compiten con los dinámicos de `HelmetWrapper`. Esto ensucia el código.
2.  **Atributos ALT Genéricos:** En `LandingPageSection`, el logo tiene `alt="Logo"`. Debería ser más descriptivo: `alt="Logo de Glass & Aluminum Company - Vidriería en La Molina"`.
3.  **Renderizado Cliente (CSR):** Al ser una aplicación React, los robots de redes sociales (Facebook/WhatsApp) a veces no leen bien los metadatos dinámicos al compartir enlaces, mostrando solo lo que hay en `index.html`.

---

## 2. 🗺️ Plan de Acción SEO (Estrategia)

### Fase 1: Optimización Técnica (Inmediato)

1.  **Limpieza de `index.html`:**

    - Eliminar meta tags redundantes (`og:title`, `description`) del HTML estático y dejar que `HelmetWrapper` los maneje al 100%.
    - Mantener solo los tags críticos en `index.html` como fallback.

2.  **Mejora de Textos Alternativos (ALT):**
    - Revisar todas las imágenes y asegurar que el atributo `alt` describa la imagen e incluya palabras clave locales (ej: "Instalación de ventana de aluminio en La Molina").

### Fase 2: SEO Local (Crucial para tu negocio)

1.  **Google My Business (GMB):**

    - Si no lo tienes, **REGISTRA TU NEGOCIO** en Google Maps.
    - Asegúrate de que el Nombre, Dirección y Teléfono (NAP) en Google coincidan _exactamente_ con los de tu web (`Footer` y `company-data.js`).
    - Sube las fotos de tus proyectos (las mismas de la web) a tu perfil de GMB.

2.  **Palabras Clave Locales:**
    - Asegúrate de que frases como "Vidriería en La Molina", "Instalación de vidrios en Lima", "Ventanas de aluminio cerca de mí" aparezcan naturalmente en tus textos de `h1`, `h2` y párrafos.

### Fase 3: Contenido y Autoridad (Largo Plazo)

1.  **Blog de Proyectos:**

    - Cada vez que termines un proyecto, crea una página o entrada simple con fotos del "Antes y Después". A Google le encanta el contenido fresco y original.
    - Ejemplo de título: "Instalación de Mamparas Antirruido en Departamento de La Molina".

2.  **Backlinks Locales:**
    - Pide a proveedores o socios que enlacen a tu web.

---

## 3. 🛠️ Recomendaciones Técnicas Específicas

### A. Ajuste de `index.html`

Mantén el JSON-LD, pero limpia los meta tags duplicados. Deja que React Helmet sea el "jefe" de los metadatos.

### B. Prerenderizado (Opcional Avanzado)

Si notas que al compartir tu web en Facebook no sale la imagen o el título correcto, considera usar una herramienta de "Prerendering" o migrar a Next.js en el futuro. Por ahora, para Google, tu configuración actual es suficiente.

---

**Conclusión:**
Tienes una base técnica muy sólida, mejor que el 90% de las webs de negocios locales. Tu mayor oportunidad de crecimiento ahora no es código, sino **SEO Local (Google Maps)** y **Contenido** (fotos y descripciones ricas con palabras clave).
