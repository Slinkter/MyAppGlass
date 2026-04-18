# 🤖 AGENTS.md - Developer Guide (Aura 2026 Edition)

Guía maestra para agentes y desarrolladores sobre la arquitectura y estándares de **GYA Glass & Aluminum**.

## 🛠️ Stack Tecnológico
- **Core:** React 18/19 (Vite) + Next.js 16 (Static Export).
- **UI:** Chakra UI v3 (Aura Design System) + Framer Motion.
- **Backend:** Firebase (Hosting, Functions, Firestore).
- **Assets:** Pipeline WebP optimizado con Sharp.

## 📐 Estándares de Arquitectura (FBA + Clean)

### Feature-Based Architecture
Cada funcionalidad reside en `src/features/[feature-name]`.
- **Servicios:** La lógica de datos debe estar en `services/[name]Service.ts`. No importar de `src/data` directamente.
- **Componentes:** Dividir componentes de >200 líneas en sub-componentes especializados.

### Compound Components
Para componentes complejos (Galería, Modales), usar el patrón de composición:
```tsx
<Gallery.Root>
  <Gallery.Viewer />
  <Gallery.Thumbnails />
</Gallery.Root>
```

## 🖼️ Gestión de Imágenes (WebP Pipeline)
**REGLA DE ORO:** Nunca usar `src/assets` en producción.
1. Guardar originales en `src/assets`.
2. Ejecutar `pnpm dev` o `node optimize-images.mjs`.
3. Usar la ruta `/images/[name].webp` en el código.
4. Usar `<ImageWithFallback />` para carga diferida y prioridad (LCP).

## ⚡ Rendimiento React 19
- **useTransition:** Obligatorio para cambios de estado pesados (filtrado de listas).
- **Server Components:** Las páginas en `src/app/` deben ser Server Components para SEO.
- **Zero Layout Shift:** Usar Skeletons de alta fidelidad con dimensiones fijas (`65vh`, `500px`).

## ✍️ Documentación JSDoc (Why over What)
Todo Servicio, Hook o Contexto debe estar documentado explicando el **contexto** y las **restricciones**.
```typescript
/**
 * @remarks Explica por qué se tomó esta decisión técnica aquí.
 */
```

## 🛡️ Calidad de Código
- **Cero Advertencias:** `pnpm lint` debe pasar sin un solo warning.
- **React Doctor:** Puntaje objetivo de 100/100 en auditorías de salud.
- **Mobile First:** Todas las interacciones deben incluir `whileTap={{ scale: 0.98 }}`.

## 🚀 Comandos Críticos
- `pnpm dev`: Inicia el entorno con optimización incremental de imágenes.
- `pnpm build`: Genera el build estático optimizado para Firebase.
- `node optimize-images.mjs`: Procesa manualmente nuevos assets.

---
*GYA Glass & Aluminum - Ingeniería de Software y Diseño de Vanguardia.*
