# Fase 5 — QA, revisión y publicación

**Objetivo:** verificar que las 13 páginas, la home y el blog funcionan, cumplen marca y están listos
para publicar.

**Duración estimada:** 0.5 día.
**Depende de:** Fases 0–4.
**Agentes:** `qa-verify`, `ux-reviewer`, `general` (deploy).

---

## Tarea 5.1 — Gates técnicos

```bash
pnpm run typecheck && pnpm run lint && pnpm run build
```

Criterios:
- 0 errores de tipos.
- 0 errores de ESLint en `apps/web/src`.
- Build genera `apps/web/out/` sin rutas faltantes.
- No se ejecuta `test:run` salvo que el dueño lo pida.

Si falla algo, reportar **archivo y línea del primer error** antes de seguir.

---

## Tarea 5.2 — Verificación funcional

| # | Prueba | Criterio |
| --- | --- | --- |
| 1 | `/#servicios` | 13 tarjetas, orden 1–13, sin scroll infinito |
| 2 | Click en cada tarjeta | 13 rutas responden, ninguna 404 |
| 3 | `/servicios/baranda` | Ficha técnica visible + pestañas con resumen del sistema |
| 4 | `/servicios/frenos-hidraulicos` | Metadata propia, no fallback genérico |
| 5 | `/admin/servicios` | Guardar `ventana` conserva `gallery[].system` |
| 6 | `/admin/servicios` | Editar `specs`, `systemSheets` y `faqs` persiste |
| 7 | `/blog` | Lista desde Firestore |
| 8 | `/admin/blog` | Crear un post de prueba y verlo en `/blog/{slug}` |
| 9 | `/blog/ver?slug=` | Abre un post publicado después del build |
| 10 | Cotizador | No promete porcentaje; dice "atenuación estimada" |
| 11 | Home móvil 360 px | Sin overflow horizontal; targets ≥ 44 px |
| 12 | `sitemap.xml` | Incluye las 13 rutas y los posts |

---

## Tarea 5.3 — Revisión de marca y contenido (`ux-reviewer`)

Checklist:
- [ ] Un solo acento: coral `#FF5A5F`, solo en texto grande.
- [ ] Sin `#D62828`, `#FF5A5A` ni colores retirados.
- [ ] Copy en "usted", sin jerga innecesaria.
- [ ] Ningún dato inventado: precios, plazos, garantías y certificaciones.
- [ ] Cero marcas de proveedor en páginas públicas.
- [ ] Cero "antirruido" aplicado a aluminio.
- [ ] Cero imágenes de proveedor.
- [ ] `alt` descriptivo en las imágenes.
- [ ] Ortografía: antirruido, vidrio y aluminio, celosías, frenos hidráulicos, boxes de ducha.

---

## Tarea 5.4 — Publicación

**Solo si el dueño lo pide.**

1. Rebuild: `pnpm run build`.
2. Deploy hosting: `pnpm run deploy:hosting`.
3. **No** desplegar functions (no se tocó backend).
4. Verificar en producción:
   - `https://…/#servicios` con 13 tarjetas.
   - Una ficha técnica.
   - Un post del blog.
   - `sitemap.xml` accesible.

---

## Tarea 5.5 — Post-deploy

- Anotar en `docs/05_CHANGELOG.md` lo publicado.
- Dejar en `docs/PENDIENTES.md`:
  - `[POR CONFIRMAR]` pendientes del dueño (precios, plazos, garantías).
  - Fotos reales por servicio (hoy placeholders en los 3 nuevos).
  - Porcentajes de atenuación si algún día se respaldan con ficha.
  - Recordatorio de rebuild si se publican posts nuevos para que entren al sitemap.

---

## Checklist final

- [ ] Gates verdes.
- [ ] 12 pruebas funcionales aprobadas.
- [ ] Revisión de marca aprobada.
- [ ] Changelog y pendientes actualizados.
- [ ] Deploy solo si fue solicitado.
