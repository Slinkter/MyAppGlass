Para lograr que Google muestre tu sitio con la misma estructura profesional que RIMAC (un resultado de búsqueda enriquecido con **Favicon**, **Sitelinks** limpios y **meta descripciones** optimizadas sin textos repetidos), necesitas estructurar un Agente de IA con roles y directrices sumamente específicas para tu stack (`Next.js`, `TypeScript` y `Firebase Hosting`).

Aquí tienes el prompt maestro diseñado para configurar a tu agente experto. Puedes copiarlo y pegarlo directamente en tu entorno de IA para que asuma el rol y empiece a trabajar en tu código.

---

```text
Asume el rol de un Líder de Ingeniería SEO y Arquitecto Frontend Experto en Next.js (App Router), TypeScript, Metadatos Dinámicos y Firebase Hosting. Tu objetivo es auditar, corregir y optimizar la indexación de nuestro sitio web en Google para pasar de una visualización básica/defectuosa a un resultado enriquecido premium (estilo corporativo como RIMAC Seguros).

Analiza y resuelve los siguientes 4 problemas críticos estructurando tu respuesta en subtareas ejecutables:

1. CONFIGURACIÓN DEL FAVICON (Icono de la empresa al costado del nombre en Google)
   - Explica cómo implementar correctamente los iconos en Next.js (App Router).
   - Detalla el uso de archivos estáticos (icon.png, apple-icon.png, favicon.ico) en la raíz del directorio `/app` o el uso de la API `generateImageMetadata`.
   - Proporciona el tip de TypeScript para asegurar que el navegador y el bot de Google los detecten de inmediato.

2. OPTIMIZACIÓN DE METADATOS Y ELIMINACIÓN DE COPIES REPETIDOS
   - Actualmente, Google muestra textos repetidos como "Saltar al contenido principal...". Esto ocurre por una mala configuración del objeto `Metadata` o por renderizar contenido repetido antes del contenido principal.
   - Diseña una estructura de metadatos optimizada (Static y Dynamic) usando el objeto `export const metadata: Metadata` para el layout principal y páginas individuales (`page.tsx`).
   - Incluye la configuración correcta de 'openGraph' y 'twitter' cards.
   - Asegúrate de que las meta descripciones utilicen variables limpias en TypeScript y no excedan los 155 caracteres.

3. ROBOTS.TXT Y SITEMAP.XML EN NEXT.JS (Para Googlebot)
   - En lugar de archivos estáticos planos, genera la configuración nativa de Next.js para `robots.ts` y `sitemap.ts` que se compilan dinámicamente en producción.
   - El `robots.ts` debe permitir el acceso total al Googlebot (`User-agent: '*'`), definir las reglas de `Allow` y apuntar correctamente al Sitemap.
   - El `sitemap.ts` debe mapear las rutas estáticas y dinámicas del proyecto con sus respectivas propiedades `lastModified`, `changeFrequency` y `priority`.

4. CONFIGURACIÓN Y CONFIGS DE CONFIGURACIÓN DE DESPLIEGUE (Firebase Hosting)
   - Genera el archivo `firebase.json` optimizado para Next.js, asegurando que las cabeceras de caché (`Cache-Control`) sean correctas para que Googlebot no indexe versiones obsoletas de los metadatos.

ENTREGABLES REQUERIDOS POR EL AGENTE:
- Proporciona fragmentos de código limpios, modulares y estrictamente tipados en TypeScript.
- Explica brevemente el porqué de cada corrección y cómo forzar a Google Search Console a realizar una nueva inspección (re-indexación) una vez desplegado en Firebase.

```

---

## 💡 Recomendación Extra para tu Proyecto

Una vez que el agente te genere el código, ten en cuenta estos dos puntos clave que responden directamente a lo que viste en las imágenes:

- **Para el Icono (Favicon):** Google exige que el favicon sea un múltiplo de 48x48 píxeles (por ejemplo: 48x48, 96x96, 144x144). Si le pones un formato o tamaño extraño, Google simplemente no lo mostrará al lado del nombre. En Next.js, basta con colocar un archivo llamado `icon.png` (de 512x512) dentro de la carpeta `app/` y el framework se encarga del resto.
- **Para los Sitelinks (Subpáginas como "Servicios", "Proyectos"):** Los enlaces que ves abajo de RIMAC o de GYA Company los decide el algoritmo de Google de forma automática basándose en la **arquitectura de tu sitio**. Para que salgan limpios y sin el texto _"Saltar al contenido principal"_, el agente te ayudará a limpiar el HTML inicial y a estructurar las etiquetas `<main>` y los encabezados `<h1>`, `<h2>` de Next.js correctamente.

¿Hay alguna sección de los metadatos o del `robots.txt` actual de tu proyecto que te esté generando un error específico para revisarlo a fondo?
