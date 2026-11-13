# Fase 2 — Firestore: modelo, seed y carga del catálogo

**Objetivo:** que Firestore tenga los 13 servicios, en orden 1–13, con ficha técnica y copy corregido.

**Duración estimada:** 1 día.
**Depende de:** Fase 1 (fichas en JSON).
**Agente:** `frontend-fsd` (script y seed) + `qa-verify` (verificación).

---

## Tarea 2.1 — Ampliar el esquema de servicio

**Archivo:** `packages/shared/src/schemas/firebase-types.ts`

Agregar, **opcionales con default**, para no romper los 10 documentos existentes:

```ts
export const ServiceSpecSchema = z.object({
  grupo: z.string().optional(),
  label: z.string().min(1),
  value: z.string().min(1),
});
export type ServiceSpec = z.infer<typeof ServiceSpecSchema>;

export const ServiceSystemSheetSchema = z.object({
  nombre: z.string().min(1),
  resumen: z.string().min(1),
  specs: z.array(ServiceSpecSchema).default([]),
  usos: z.array(z.string()).default([]),
});
export type ServiceSystemSheet = z.infer<typeof ServiceSystemSheetSchema>;

// Dentro de ServiceSchema:
specs: z.array(ServiceSpecSchema).optional().default([]),
systemSheets: z.array(ServiceSystemSheetSchema).optional().default([]),
```

Notas:
- `CreateServiceSchema` / `UpdateServiceSchema` deben heredar los mismos campos opcionales.
- Esto **no** toca el contrato de Functions (`docs/api/openapi.json`): es solo Firestore.
- Exportar los tipos nuevos desde `entities/service/model` y `entities/service/index`.

**Aceptación:** `pnpm run typecheck` verde y los 10 servicios existentes siguen validando con
`ServiceSchema.parse`.

---

## Tarea 2.2 — Corregir `approvedNewServices.ts`

**Archivo:** `apps/web/src/entities/service/api/approvedNewServices.ts`

Errores actuales que hay que eliminar:

| Actual | Problema | Reemplazo |
| --- | --- | --- |
| "Fabricación e instalación de espejos…" | La empresa no fabrica | "Suministro e instalación de espejos a medida…" |
| "marcas importadas certificadas" | Certificación heredada | "frenos de piso de uso comercial" |
| "felpas antirruido" (mantenimiento) | Término reservado a PVC | "felpa de sellado perimetral" |
| `coverImage`/`gallery` con URLs de Unsplash | Imagen de tercero | `/images/services/{slug}-placeholder.webp` |
| `features` de 6 ítems sin datos | Copy vago | Reemplazar por la ficha de la Fase 1 |

Además, completar los tres servicios con `specs`, `systemSheets` y `faqs` de su ficha JSON, y con
`gallery: []` (el dueño subirá fotos reales desde el panel).

**Regla:** `seedApprovedNewServices()` sigue siendo idempotente: si el documento existe, **no lo
sobrescribe**.

**Aceptación:** el archivo no contiene "fabricación", "certificadas" ni URLs externas.

---

## Tarea 2.3 — Script `scripts/apply-service-catalog.mjs`

**Responsabilidad:** aplicar a Firestore el catálogo de 13 desde `docs/contenido/servicios/*.json`.

### Comportamiento obligatorio

1. `--dry-run` (por defecto): imprime tabla diff por servicio y **no escribe nada**.
2. `--apply`: escribe.
3. `--only=slug1,slug2`: limita el alcance.
4. Antes de escribir, genera backup:
   `docs/proveedores/backup-services-YYYYMMDD-HHmm.json` con los 13 documentos completos.
5. Escribe con merge (`updateDoc` o `setDoc(..., { merge: true })`), **solo** estos campos:
   `title`, `shortDescription`, `fullDescription`, `specs`, `features`, `benefits`,
   `systemSheets`, `faqs`, `order`, `category`.
6. **Nunca toca:** `coverImage` de los 10 existentes, `gallery`, `published`, `createdAt`, `slug`.
7. Si un servicio no existe en Firestore, lo crea con `published: true` y el placeholder como
   `coverImage` (solo para `espejos`, `frenos-hidraulicos`, `mantenimiento`).
8. `order` final: 1 ventana · 2 mampara · 3 ducha · 4 pvidrio · 5 pserie · 6 parapeto ·
   7 baranda · 8 balcones · 9 techo · 10 celosias · 11 espejos · 12 frenos-hidraulicos ·
   13 mantenimiento.
9. Al final imprime: documentos leídos, actualizados, creados, omitidos y ruta del backup.

### Credenciales

Reutiliza el patrón de los scripts existentes en `scripts/` (Firebase Admin o REST con token).
No crees `apps/functions/.env`.

**Aceptación:**
- `node scripts/apply-service-catalog.mjs --dry-run` no produce escrituras y muestra el diff.
- `--apply` deja 13 documentos con `order` 1–13.
- El backup existe y contiene los 13 documentos.

---

## Tarea 2.4 — Verificación por REST público

```powershell
$r = Invoke-WebRequest "https://firestore.googleapis.com/v1/projects/gya-app-4c8a9/databases/(default)/documents/services?pageSize=300" -UseBasicParsing
$j = $r.Content | ConvertFrom-Json
$j.documents | ForEach-Object { "{0} | {1} | {2}" -f $_.fields.order.integerValue, $_.fields.slug.stringValue, $_.fields.title.stringValue }
```

Debe devolver exactamente 13 filas, orden 1–13, sin slugs duplicados, todas `published: true`.

---

## Tarea 2.5 — Datos que no se publican

| Dato | Tratamiento |
| --- | --- |
| Precio de espejos, frenos y mantenimiento | `"Precio a definir"` |
| Porcentaje de atenuación acústica | Texto "atenuación estimada según serie y composición del vidrio"; sin cifras |
| Plazos de entrega | `[POR CONFIRMAR]` hasta que el dueño los defina |
| Garantía | `[POR CONFIRMAR]` |
| Fotografías reales | Placeholder hasta que el dueño suba las suyas |

---

## Checklist de cierre de fase

- [ ] Esquema ampliado y `typecheck` verde.
- [ ] `approvedNewServices.ts` sin "fabricación", "certificadas" ni Unsplash.
- [ ] Script con `--dry-run` y `--apply` funcionando.
- [ ] Backup generado.
- [ ] 13 documentos en Firestore, orden 1–13.
- [ ] Verificación REST documentada.
