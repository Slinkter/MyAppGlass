# Fase 3 — Frontend: panel, ficha técnica en página, 13 tarjetas y copy

**Objetivo:** que el panel permita editar todo lo nuevo, que la página de servicio muestre la ficha
técnica y que la home muestre las 13 tarjetas con el copy corregido.

**Duración estimada:** 2–3 días.
**Depende de:** Fase 2 (esquema y datos).
**Agente:** `frontend-fsd`. Revisión: `ux-reviewer`. Gates: `qa-verify`.

---

## Tarea 3.1 — Bug bloqueante: preservar `gallery[].system`

**Problema:** `ServiceFormModal` reconstruye la galería como `{ id, url, alt }` y **descarta
`system`**. Al guardar cualquier servicio se pierden las pestañas Nova / Serie 25 / 62 / etc.

**Archivos:**

1. `apps/web/src/features/admin/components/AlbumGalleryUploader.tsx`
   - Ampliar `GalleryPhotoItem` con `system?: string`.
   - Verificar que al editar `alt`/`caption` o reordenar no se pierdan campos desconocidos
     (usar spread del item original, no reconstrucción).
2. `apps/web/src/features/admin/components/ServiceFormModal.tsx`
   - Inicialización: incluir `system: g.system`.
   - En `handleSubmit`: `system: item.system || undefined`.
3. `GalleryPhotoItem` se reutiliza en proyectos: el campo es opcional, no rompe nada.

**Aceptación:** abrir `ventana` en `/admin/servicios`, guardar sin tocar la galería y comprobar en
Firestore que cada elemento conserva su `system`.

---

## Tarea 3.2 — Editores nuevos en el modal de servicios

Crear en `apps/web/src/features/admin/components/form/`:

| Componente | Campos | Reglas |
| --- | --- | --- |
| `SpecsEditor.tsx` | lista de `{ grupo?, label, value }` | agregar, editar, reordenar, eliminar; botones ≥ 44 px |
| `SystemSheetsEditor.tsx` | lista de `{ nombre, resumen, specs[], usos[] }` | el `nombre` se sugiere desde los `gallery[].system` existentes |
| `FaqsEditor.tsx` | lista de `{ question, answer }` | `answer` en `Textarea` con contador de palabras |

Integrarlos en `ServiceFormModal` dentro de un acordeón "Ficha técnica" y otro "Preguntas
frecuentes", para no alargar el formulario principal.

**UI:** Chakra v3, tokens del tema, sin hex ni `px` sueltos, máximo 2 propiedades en `transition`,
targets ≥ 44 px. Ver `apps/web/DESIGN.md` §3.

**Aceptación:** crear y editar un servicio con 3 `specs`, 1 `systemSheet` y 2 `faqs`; recargar y
comprobar que persisten.

---

## Tarea 3.3 — Mostrar la ficha técnica en la página de servicio

**Archivos:**

1. `apps/web/src/entities/service/model/index.ts`
   - Extender `ServicePageData` con `specs: ServiceSpec[]` y `systemSheets: ServiceSystemSheet[]`.
2. `apps/web/src/entities/service/api/serviceMappers.ts`
   - Mapear ambos campos con default `[]`.
3. **Nuevo** `apps/web/src/features/services/components/ServiceSpecsSection.tsx`
   - Tabla de dos columnas (`label` / `value`), agrupada por `grupo` con subtítulo.
   - En móvil: lista de pares, no tabla con scroll horizontal.
   - `Heading as="h2"`, sin duplicar el `h1` del header.
4. `apps/web/src/features/services/components/ServicePageLayout.tsx`
   - Insertar `<ServiceSpecsSection specs={specs} serviceTitle={seo.title} />` entre
     `UnifiedTechnicalCard` y `ServiceFaqSection`.
5. Pestañas de sistema: si `systemSheets` existe, el panel del sistema activo muestra `resumen` y
   `usos` además de las fotos. Si no existe, se mantiene el comportamiento actual.

**Aceptación:** `/servicios/baranda` muestra la tabla técnica y, al cambiar de pestaña, el resumen
del sistema correspondiente. Sin `systemSheets`, la página se ve igual que antes.

---

## Tarea 3.4 — Home con las 13 tarjetas de golpe

**Archivos:**

1. `apps/web/src/entities/service/ui/ServiceList.tsx`
   - Añadir prop `pageSize?: number`.
   - Pasarla a `useFilterableList({ items, filterFn, pageSize })`.
2. `apps/web/src/screens/Home/ui/HomeView.tsx`
   - `<ServiceList initialData={initialServices} headingAs="h2" motion="cine" pageSize={13} />`.
3. Página `/servicios`: mismo `pageSize={13}` (o `100`, para que crezca sin tocar código cuando se
   agreguen servicios 14+).

**Aceptación:** `/#servicios` renderiza 13 tarjetas en el HTML exportado, sin loader de scroll.

---

## Tarea 3.5 — Navegación alineada al catálogo

**Archivo:** `apps/web/src/widgets/Navbar/mobile/ServicesAccordion.tsx`

- `OFFICIAL_SERVICE_SLUGS`: de 10 a **13**, en el orden del índice.
- `FEATURED_SERVICE_SLUGS`: los 6 primeros del catálogo → `ventana, mampara, ducha, pvidrio,
  pserie, parapeto`.
- Corregir la etiqueta de `ventana`: "Sistema Nova · Series 20/25/62 y europea" (hoy dice 25/35/62;
  la 35 es puerta).
- Actualizar el comentario del archivo: ya no hay "3 servicios proyectados", están publicados.

**Aceptación:** el menú móvil enlaza a las 13 rutas y ninguna devuelve 404.

---

## Tarea 3.6 — Retirar "antirruido" del aluminio (12 archivos públicos)

Regla: "antirruido" solo se usa para **PVC**. En aluminio se escribe "atenuación acústica según
serie y composición del vidrio".

| Archivo | Qué cambiar |
| --- | --- |
| `app/page.tsx` | Title y description: ventanas de aluminio + atenuación acústica; keywords sin "antirruido" |
| `app/layout.tsx` | Description global y keywords (3 apariciones) |
| `app/manifest.ts` | Description |
| `app/blog/page.tsx` | Description del listado |
| `app/contacto/page.tsx` | Description y keyword |
| `app/presupuesto/page.tsx` | Description y keyword |
| `app/vidrieria/[distrito]/page.tsx` | "vidrio laminado, templado y antirruido" → "vidrio laminado y templado" |
| `widgets/Footer/Footer.tsx` | "Ventanas Antirruido" → "Ventanas de aluminio" |
| `widgets/Navbar/mobile/ServicesAccordion.tsx` | Nombre y categoría del ítem ventana |
| `features/home/components/hero/LandingPageSection.tsx` | Texto del hero |
| `shared/utils/seo-schemas.ts` | `"Ventanas antirruido"` y su descripción con 4 sistemas |
| `entities/service/api/serviceMappers.ts` | `SERVICE_SEO_FALLBACKS.ventana` |
| `features/ai-simulator/data/aiProducts.ts` | "Ventana Antirruido Sistema Nova" → "Ventana de aluminio" |
| `features/local-landings/data/distritos.ts` | "Vidrio antirruido" → "Vidrio laminado acústico" |
| `entities/quote/config/pricing.ts` | Revisar `noiseReductionPct`; ver Tarea 3.7 |

**Fuera de alcance:** `screens/DesignSystem*` (laboratorio, no público).

**Aceptación:** `grep -ri "antirruido" apps/web/src` solo devuelve PVC, comentarios internos y
`DesignSystem*`.

---

## Tarea 3.7 — Atenuación estimada en el cotizador

**Archivo:** `apps/web/src/entities/quote/config/pricing.ts`

- Mantener los valores en `noiseReductionPct` como dato interno, pero cambiar la UI para que diga
  **"atenuación estimada"** y no "antirruido".
- `ventana_acustica` (hoy 80 %): si no hay ficha que lo respalde, se etiqueta como estimación y se
  anota `[POR CONFIRMAR]` en el archivo.
- Los servicios sin precio (`ventana_pvc_abatible`, `ventana_acustica` si aplica) muestran
  **"Precio a definir"**.

**Aceptación:** el cotizador no promete un porcentaje como garantía; el texto dice "estimada".

---

## Tarea 3.8 — SEO

**Archivos:**

1. `apps/web/src/entities/service/api/serviceMappers.ts`
   - Agregar `SERVICE_SEO_FALLBACKS["frenos-hidraulicos"]` (hoy no existe → 404 de metadata).
   - Corregir `ventana` y `pserie` (serie 35/36 batiente, no enrollables).
2. `apps/web/src/shared/utils/seo-schemas.ts`
   - `"Ventanas antirruido"` → `"Ventanas de aluminio"`.
   - Descripción con las series reales, sin "antirruido".
   - Añadir `Service` JSON-LD para los 3 servicios nuevos si el patrón lo requiere.
3. `apps/web/src/app/page.tsx`
   - Title: "Vidriería en La Molina | Ventanas de aluminio y mamparas".
   - Description con los 13 servicios resumidos en 2 líneas.

**Aceptación:** las 13 rutas generan metadata propia; ninguna cae al fallback genérico.

---

## Checklist de cierre de fase

- [ ] `gallery[].system` se conserva al guardar.
- [ ] Editores de `specs`, `systemSheets` y `faqs` funcionando.
- [ ] Ficha técnica visible en las 13 páginas.
- [ ] Home con 13 tarjetas.
- [ ] Navbar con 13 slugs.
- [ ] "antirruido" fuera del aluminio en los 12 archivos.
- [ ] `frenos-hidraulicos` con metadata propia.
- [ ] `pnpm run typecheck && pnpm run lint && pnpm run build` verdes.
