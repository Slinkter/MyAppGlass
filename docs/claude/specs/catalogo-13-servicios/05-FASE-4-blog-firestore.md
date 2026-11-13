# Fase 4 — Blog en Firestore y artículos originales

**Objetivo:** que el dueño pueda crear y editar artículos desde `/admin`, sin perder el SEO del blog
actual, y publicar 6 artículos originales nuevos.

**Duración estimada:** 2 días.
**Depende de:** Fase 3.
**Agentes:** `frontend-fsd` (migración y panel), `redactor-tecnico-marca` + `arquitecto-vidrieria` +
`ingeniero-civil-vidrieria` (contenido).

---

## Parte A — Migrar el blog a Firestore

### A.1 Esquema

**Archivo:** `packages/shared/src/schemas/firebase-types.ts`

```ts
export const BlogPostSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().min(1),
  description: z.string().min(1),   // meta description, 120–160 caracteres
  excerpt: z.string().min(1),
  date: z.string().min(1),          // YYYY-MM-DD
  author: z.string().min(1),
  image: z.string().min(1),
  content: z.string().min(1),       // HTML permitido, mismo contrato que hoy
  tags: z.array(z.string()).default([]),
  published: z.boolean().default(true),
  createdAt: z.unknown().optional(),
  updatedAt: z.unknown().optional(),
});
```

### A.2 Capa de datos

1. **Lectura en build:** `shared/api/firebase/publicRest.ts`
   - `getBuildBlogPosts()` con el mismo patrón que `getBuildServices()` (REST pública, caché 30 s,
     devuelve `[]` si falla).
2. **Lectura en cliente:** `features/blog/api/blogRepository.ts`
   - `getBlogPosts({ publishedOnly })`, `getBlogPostBySlug`, `createBlogPost`, `updateBlogPost`,
     `deleteBlogPost`. Usa el SDK, igual que `servicesRepository`.
3. `features/blog/services/blogService.ts`
   - Pasa a recibir los posts como parámetro o a leer del repositorio; deja de importar
     `BLOG_POSTS` directamente.
4. `features/blog/data/blog-posts.ts`
   - Se conserva **solo como semilla** de la migración. Se marca como tal en el encabezado y se deja
     de importar desde la UI y el sitemap.

### A.3 Rutas (export estático — trampa importante)

`output: 'export'` significa que las rutas dinámicas se congelan en build. Por eso:

1. `app/blog/[slug]/page.tsx`
   - `generateStaticParams()` lee de Firestore en build (`getBuildBlogPosts`).
   - `generateMetadata` y la página resuelven el post desde Firestore, con fallback al archivo de
     semilla si la lectura falla.
2. **Nueva ruta de respaldo:** `app/blog/ver/page.tsx`
   - Lee `?slug=` y renderiza el post desde el SDK en cliente.
   - Mismo patrón que `/servicios/ver?slug=`.
   - `robots: { index: false, follow: true }` si el post no existe.
3. `app/sitemap.ts`
   - Los posts salen de Firestore en build, no de `BLOG_POSTS`.
   - Aviso documentado: un artículo publicado **después** del build no entra al sitemap hasta el
     siguiente deploy. Si eso importa, programar rebuild.

### A.4 Panel

- Nueva ruta `app/admin/blog/page.tsx` con `AdminRouteGuard`.
- `features/admin/components/BlogPostFormModal.tsx`: título, slug (auto desde título, editable),
  descripción, extracto, fecha, autor, imagen (subida a Storage `blog/{slug}/cover.webp`), tags,
  contenido HTML, publicado.
- Vista previa del HTML antes de guardar.
- **Seguridad:** el HTML se renderiza con `dangerouslySetInnerHTML`; solo el administrador autenticado
  puede escribirlo. No permitir `<script>`, `<iframe>` ni `on*=` (sanitizar en el formulario con una
  lista blanca de etiquetas).

### A.5 Migración de los 11 posts existentes

Script `scripts/migrate-blog-to-firestore.mjs`:
- Lee `BLOG_POSTS` del archivo de semilla.
- Crea cada documento con **el mismo slug** (no romper URLs indexadas).
- Idempotente: si el slug existe, no sobrescribe.
- `--dry-run` por defecto.
- Backup de los 11 slugs en `docs/proveedores/backup-blog-YYYYMMDD.json`.

**Aceptación Parte A:** los 11 posts se ven igual que antes desde Firestore; una edición hecha en
`/admin/blog` se refleja en `/blog/{slug}` tras recargar.

---

## Parte B — 6 artículos originales

**Archivo de destino:** documentos en Firestore, colección `blogPosts`.

| # | Título propuesto | Ángulo propio | Servicios enlazados | Líder |
| --- | --- | --- | --- | --- |
| 1 | Vidrio laminado en ventanas y mamparas: qué protege de verdad y qué no | Cuándo es obligatorio y cuándo es gasto innecesario | `ventana`, `mampara` | ingeniero |
| 2 | Vidrio templado: dónde sí, dónde no y por qué no se puede perforar después | Guía de decisión; el error de cambiar la manija tarde | `mampara`, `ducha`, `pvidrio` | ingeniero |
| 3 | Low-E en Lima: cuánto ahorra, cuándo conviene y cuándo no | En Lima el problema es el sol de la tarde, no el frío | `ventana` | arquitecto |
| 4 | Ruido urbano y ventanas de aluminio: qué atenúa y qué no | Expectativa realista: serie + vidrio + sellado, sin promesas | `ventana` | ingeniero |
| 5 | Elegir serie de ventana sin equivocarse: 20, 25, 35, 62 y línea europea | Comparativa de qué cambia entre series | `ventana`, `pserie` | arquitecto |
| 6 | Mantenimiento de vidrio y aluminio en el clima de Lima | Salitre, polvo, felpas, garruchas, silicona | `mantenimiento`, `ventana` | diseñador |

### Requisitos por artículo

- 800–1200 palabras.
- Estructura: pregunta del cliente → explicación → decisión → cuándo llamar a un especialista.
- 2–3 enlaces internos a servicios existentes.
- 1 imagen propia (`apps/web/public/images/**` o Storage) con `alt` descriptivo.
- `tags` de 3–5 términos.
- Fecha: noviembre 2026.
- Cero marcas, cero "fabricamos/importamos", cero porcentajes absolutos.

### Artículo a reescribir

`blog-posts.ts` tiene un post que afirma "hasta 80 %" y "32–42 dB". Debe reescribirse con el mismo
slug (para no perder posiciones) y el nuevo enfoque: "atenuación estimada según serie y composición
del vidrio", sin cifras absolutas.

**Aceptación Parte B:** 6 artículos nuevos publicados; el post de 80 % reescrito; todos enlazan a
servicios reales; `FAQPage`/`BlogPosting` válidos.

---

## Checklist de cierre de fase

- [ ] `BlogPostSchema` creado y exportado.
- [ ] `getBuildBlogPosts` en `publicRest.ts`.
- [ ] Repositorio cliente con CRUD.
- [ ] `/blog/[slug]` lee Firestore.
- [ ] `/blog/ver?slug=` funciona.
- [ ] Sitemap lee Firestore.
- [ ] `/admin/blog` operativo con preview y sanitización.
- [ ] 11 posts migrados sin cambiar slug.
- [ ] 6 artículos nuevos + 1 reescrito.
- [ ] Gates verdes.
