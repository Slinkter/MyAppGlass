# 🖼️ Guía de Optimización de Imágenes - GYA Glass & Aluminum

Este proyecto utiliza un pipeline de optimización automatizado para garantizar una carga instantánea y un rendimiento LCP (Largest Contentful Paint) de grado A.

## 🚀 Arquitectura de Assets

1.  **Directorio Fuente (`src/assets/`):** Contiene las imágenes originales en alta resolución (JPG, PNG). **Nunca** se deben usar directamente en el código de producción.
2.  **Directorio de Producción (`public/images/`):** Contiene las imágenes optimizadas en formato **WebP**. Estas son las que el navegador descarga.

## 🛠️ Cómo optimizar nuevas imágenes

Cada vez que agregues nuevas imágenes a `src/assets/`, sigue estos pasos:

1.  **Guardar:** Coloca los archivos JPG/PNG en la subcarpeta correspondiente dentro de `src/assets/`.
2.  **Ejecutar Script:** Ejecuta el siguiente comando en la terminal:
    ```bash
    node optimize-images.mjs
    ```
3.  **Verificar:** El script generará una versión `.webp` en `public/images/` con un nombre basado en su ruta original (ej: `projects-nueva_obra.webp`).

## 📐 Estándares de Calidad

- **Formato de Salida:** WebP (Calidad 80).
- **Dimensiones Máximas:** 1920px de ancho (Full HD). El script redimensiona automáticamente imágenes más grandes para ahorrar ancho de banda.
- **Naming:** El script aplana la estructura de carpetas usando guiones (ej: `services-products-ventanas-img01.webp`).

## 💻 Implementación en el Código

Usa siempre el componente `ResponsiveImage` o `ImageWithFallback` pasando la ruta estática:

```tsx
<ResponsiveImage 
  src="/images/projects-obra01.webp" 
  alt="Descripción de la obra" 
  isLCP={true} // Solo si es la imagen principal de la página
/>
```

---
*Documentación generada automáticamente por Gemini CLI para el proyecto GYA Glass & Aluminum.*
