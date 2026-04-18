name: gya-cms
description: "Gestión automatizada de contenidos (obras y servicios) para GYA Glass & Aluminum. Automatiza la optimización de imágenes WebP y la actualización de los servicios de datos."

# 🛠️ GYA CMS Skill

Esta habilidad gestiona el ciclo de vida de los contenidos del proyecto.

## 🚀 Flujo de Trabajo para Nuevas Obras/Servicios

Cuando el usuario pida "agregar una nueva obra" o "nuevo servicio":

1.  **Validación de Activos:** Verifica que las imágenes originales estén en `src/assets/projects/` o `src/assets/services/`.
2.  **Optimización WebP:** Ejecuta `node optimize-images.mjs` para procesar los activos.
3.  **Mapeo de Rutas:** Genera la ruta pública `/images/[flattened-name].webp`.
4.  **Actualización de Datos:** Inserta la nueva entrada en `src/features/projects/data/projects.ts` o `src/features/services/data/services.ts`.
5.  **Verificación:** Ejecuta `npx eslint src` para asegurar que el tipado y la sintaxis sean correctos.

## 📐 Estándares de Datos

- **Proyectos:** Siempre incluir `id`, `residencial`, `address`, `year`, e `image`.
- **Servicios:** Siempre incluir `category` (Vidrio, Aluminio, Cerramientos) y `plink`.

---
*Skill diseñada específicamente para el ecosistema de GYA Company.*
